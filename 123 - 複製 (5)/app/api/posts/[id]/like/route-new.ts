import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";
import { prisma } from "../../../../../lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "請先登入" }, { status: 401 });
    }

    const postId = params.id;
    const userId =
      (session.user as { id?: string }).id || session.user.email || "";

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
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const postId = params.id;

    if (!session?.user) {
      // 未登入用戶只返回點讚數
      const post = await prisma.post.findUnique({
        where: { id: postId },
        select: { likeCount: true },
      });

      return NextResponse.json({
        liked: false,
        likeCount: post?.likeCount || 0,
      });
    }

    const userId =
      (session.user as { id?: string }).id || session.user.email || "";

    // 檢查用戶是否已點讚
    const existingLike = await prisma.postLike.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { likeCount: true },
    });

    return NextResponse.json({
      liked: !!existingLike,
      likeCount: post?.likeCount || 0,
    });
  } catch (error) {
    console.error("獲取點讚狀態失敗:", error);
    return NextResponse.json({ error: "操作失敗" }, { status: 500 });
  }
}
