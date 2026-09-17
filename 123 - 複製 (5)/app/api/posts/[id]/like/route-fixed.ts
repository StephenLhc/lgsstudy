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
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    const user = session?.user as SessionUser | undefined;

    if (!user?.id) {
      return NextResponse.json({ error: "請先登入" }, { status: 401 });
    }

    const userId = user.id;
    const postId = parseInt(params.id);

    if (isNaN(postId)) {
      return NextResponse.json({ error: "無效的文章 ID" }, { status: 400 });
    }

    // 檢查是否已經按讚
    const existingLike = await prisma.postLike.findUnique({
      where: {
        postId_userId: {
          postId: postId.toString(),
          userId,
        },
      },
    });

    if (existingLike) {
      return NextResponse.json(
        { error: "您已經對此文章按過讚了" },
        { status: 400 }
      );
    }

    // 建立按讚記錄
    await prisma.postLike.create({
      data: {
        userId,
        postId: postId.toString(),
      },
    });

    // 取得更新後的按讚數
    const likeCount = await prisma.postLike.count({
      where: { postId: postId.toString() },
    });

    return NextResponse.json({
      success: true,
      likeCount,
      liked: true,
    });
  } catch (error) {
    console.error("Like post error:", error);
    return NextResponse.json({ error: "按讚失敗" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    const user = session?.user as SessionUser | undefined;
    if (!user?.id) {
      return NextResponse.json({ error: "請先登入" }, { status: 401 });
    }

    const userId = user.id;
    const postId = parseInt(params.id);

    if (isNaN(postId)) {
      return NextResponse.json({ error: "無效的文章 ID" }, { status: 400 });
    }

    // 移除按讚記錄
    await prisma.postLike.delete({
      where: {
        postId_userId: {
          postId: postId.toString(),
          userId,
        },
      },
    });

    // 取得更新後的按讚數
    const likeCount = await prisma.postLike.count({
      where: { postId: postId.toString() },
    });

    return NextResponse.json({
      success: true,
      likeCount,
      liked: false,
    });
  } catch (error) {
    console.error("Unlike post error:", error);
    return NextResponse.json({ error: "取消按讚失敗" }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const postId = parseInt(params.id);

    if (isNaN(postId)) {
      return NextResponse.json({ error: "無效的文章 ID" }, { status: 400 });
    }

    // 取得按讚數
    const likeCount = await prisma.postLike.count({
      where: { postId: postId.toString() },
    });

    // 檢查當前用戶是否已按讚
    let liked = false;
    const user = session?.user as SessionUser | undefined;
    if (user?.id) {
      const existingLike = await prisma.postLike.findUnique({
        where: {
          postId_userId: {
            postId: postId.toString(),
            userId: user.id,
          },
        },
      });
      liked = !!existingLike;
    }

    return NextResponse.json({
      likeCount,
      liked,
    });
  } catch (error) {
    console.error("Get like status error:", error);
    return NextResponse.json({ error: "取得按讚狀態失敗" }, { status: 500 });
  }
}
