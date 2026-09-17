import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";
import { prisma } from "../../../../../lib/prisma";

interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: postId } = await params;
    const session = await getServerSession(authOptions);

    if (!session?.user || !(session.user as SessionUser).id) {
      return NextResponse.json({ error: "請先登入" }, { status: 401 });
    }

    const userId = (session.user as SessionUser).id;

    // 確保 User 存在（自動創建如果不存在）
    await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        name: session.user.name || "匿名用戶",
        email: session.user.email || "",
      },
    });

    // 確保 Post 存在（自動創建如果不存在）
    await prisma.post.upsert({
      where: { id: postId },
      update: {},
      create: {
        id: postId,
        slug: postId,
        title: postId
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        content: "",
        excerpt: "",
        authorId: userId, // 使用當前用戶作為默認作者
        categoryId: "default", // 需要確保有默認分類
      },
    });

    // 檢查是否已經收藏
    const existingBookmark = await prisma.postBookmark.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });

    if (existingBookmark) {
      // 取消收藏
      await prisma.postBookmark.delete({
        where: {
          postId_userId: {
            postId,
            userId,
          },
        },
      });

      return NextResponse.json({
        bookmarked: false,
        message: "已取消收藏",
      });
    } else {
      // 新增收藏
      await prisma.postBookmark.create({
        data: {
          postId,
          userId,
        },
      });

      return NextResponse.json({
        bookmarked: true,
        message: "已加入收藏",
      });
    }
  } catch (error) {
    console.error("收藏操作失敗:", error);
    return NextResponse.json({ error: "操作失敗" }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: postId } = await params;
    const session = await getServerSession(authOptions);

    if (!session?.user || !(session.user as SessionUser).id) {
      return NextResponse.json({
        bookmarked: false,
      });
    }

    const userId = (session.user as SessionUser).id;

    // 檢查用戶是否已收藏
    const existingBookmark = await prisma.postBookmark.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });

    return NextResponse.json({
      bookmarked: !!existingBookmark,
    });
  } catch (error) {
    console.error("獲取收藏狀態失敗:", error);
    return NextResponse.json({ error: "操作失敗" }, { status: 500 });
  }
}
