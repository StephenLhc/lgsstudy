import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";
import { prisma } from "../../../../../lib/prisma";
import { Testament, BookType, PostStatus } from "@prisma/client";

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
    const { id: postSlug } = await params;
    const session = await getServerSession(authOptions);

    if (!session?.user || !(session.user as SessionUser).id) {
      return NextResponse.json({ error: "請先登入" }, { status: 401 });
    }

    const userId = (session.user as SessionUser).id;

    // 確保用戶在數據庫中存在
    let user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      // 如果用戶不存在，創建用戶記錄
      user = await prisma.user.create({
        data: {
          id: userId,
          email: session.user.email || "",
          name: session.user.name,
          image: session.user.image,
          displayName: session.user.name,
        },
      });
    }

    // 先嘗試通過 slug 查找 Post，如果不存在則創建
    let post = await prisma.post.findUnique({
      where: { slug: postSlug },
      select: { id: true, likeCount: true },
    });

    if (!post) {
      // 為 MDX 博文創建 Post 記錄
      // 需要創建一個默認的作者和分類
      let defaultAuthor = await prisma.author.findFirst({
        where: { email: "default@example.com" },
      });

      if (!defaultAuthor) {
        defaultAuthor = await prisma.author.create({
          data: {
            email: "default@example.com",
            name: "系統管理員",
            displayName: "系統管理員",
          },
        });
      }

      let defaultCategory = await prisma.category.findFirst({
        where: { name: "默認分類" },
      });

      if (!defaultCategory) {
        defaultCategory = await prisma.category.create({
          data: {
            name: "默認分類",
            slug: "default",
            description: "MDX 博文默認分類",
            testament: Testament.NEW_TESTAMENT,
            bookType: BookType.GENERAL,
            order: 999,
          },
        });
      }

      post = await prisma.post.create({
        data: {
          title: postSlug
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
          slug: postSlug,
          content: "MDX 博文內容",
          categoryId: defaultCategory.id,
          authorId: defaultAuthor.id,
          status: PostStatus.PUBLISHED,
          publishedAt: new Date(),
        },
        select: { id: true, likeCount: true },
      });
    }

    const postId = post.id;

    // 檢查是否已經點讚
    const existingLike = await prisma.postLike.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });

    if (existingLike) {
      // 取消點讚
      await prisma.postLike.delete({
        where: {
          postId_userId: {
            postId,
            userId,
          },
        },
      });

      // 更新文章點讚數
      const updatedPost = await prisma.post.update({
        where: { id: postId },
        data: {
          likeCount: {
            decrement: 1,
          },
        },
      });

      return NextResponse.json({
        liked: false,
        likeCount: updatedPost.likeCount,
      });
    } else {
      // 新增點讚
      await prisma.postLike.create({
        data: {
          postId,
          userId,
        },
      });

      // 更新文章點讚數
      const updatedPost = await prisma.post.update({
        where: { id: postId },
        data: {
          likeCount: {
            increment: 1,
          },
        },
      });

      return NextResponse.json({
        liked: true,
        likeCount: updatedPost.likeCount,
      });
    }
  } catch (error) {
    console.error("點讚操作失敗:", error);
    return NextResponse.json({ error: "操作失敗" }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: postSlug } = await params;
    const session = await getServerSession(authOptions);

    // 先嘗試通過 slug 查找 Post
    const post = await prisma.post.findUnique({
      where: { slug: postSlug },
      select: { id: true, likeCount: true },
    });

    if (!post) {
      // 如果 Post 不存在，返回默認值
      return NextResponse.json({
        liked: false,
        likeCount: 0,
      });
    }

    if (!session?.user || !(session.user as SessionUser).id) {
      // 未登入用戶只返回點讚數
      return NextResponse.json({
        liked: false,
        likeCount: post.likeCount || 0,
      });
    }

    const userId = (session.user as SessionUser).id;
    const postId = post.id;

    // 檢查用戶是否已點讚
    const existingLike = await prisma.postLike.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });

    return NextResponse.json({
      liked: !!existingLike,
      likeCount: post.likeCount || 0,
    });
  } catch (error) {
    console.error("獲取點讚狀態失敗:", error);
    return NextResponse.json({ error: "操作失敗" }, { status: 500 });
  }
}
