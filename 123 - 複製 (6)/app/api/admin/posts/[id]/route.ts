import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";
import { prisma } from "../../../../../lib/prisma";

interface SessionUser {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

// 更新文章
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "未登入" }, { status: 401 });
    }

    const user = session.user as SessionUser;

    // 檢查管理員權限
    if (user.role !== "ADMIN") {
      return NextResponse.json({ error: "權限不足" }, { status: 403 });
    }

    const body = await request.json();
    const {
      title,
      slug,
      description,
      content,
      status,
      difficulty,
      readingTime,
      categoryId,
      authorId,
      tagIds,
    } = body;

    // 驗證必填字段
    if (!title || !content || !categoryId || !authorId) {
      return NextResponse.json(
        { error: "請填寫所有必填字段" },
        { status: 400 }
      );
    }

    // 檢查文章是否存在
    const existingPost = await prisma.post.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return NextResponse.json({ error: "文章不存在" }, { status: 404 });
    }

    // 檢查 slug 是否重複（排除自己）
    const slugExists = await prisma.post.findFirst({
      where: {
        slug,
        NOT: { id },
      },
    });

    if (slugExists) {
      return NextResponse.json({ error: "URL Slug 已存在" }, { status: 400 });
    }

    // 更新文章
    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt: description, // 使用 excerpt 而不是 description
        content,
        status,
        difficulty,
        readingTime,
        categoryId,
        authorId,
        tags: {
          set: [], // 先清空現有標籤
          connect: tagIds ? tagIds.map((tagId: string) => ({ id: tagId })) : [],
        },
        updatedAt: new Date(),
      },
      include: {
        category: true,
        author: true,
        tags: true,
        _count: {
          select: {
            likes: true,
            comments: true,
            bookmarks: true,
            shares: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: "文章更新成功",
      post: updatedPost,
    });
  } catch (error) {
    console.error("更新文章失敗:", error);
    return NextResponse.json({ error: "更新文章失敗" }, { status: 500 });
  }
}

// 刪除文章
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "未登入" }, { status: 401 });
    }

    const user = session.user as SessionUser;

    // 檢查管理員權限
    if (user.role !== "ADMIN") {
      return NextResponse.json({ error: "權限不足" }, { status: 403 });
    }

    // 檢查文章是否存在
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      return NextResponse.json({ error: "文章不存在" }, { status: 404 });
    }

    // 刪除相關數據（級聯刪除）
    await prisma.$transaction(async (tx) => {
      // 刪除評論
      await tx.comment.deleteMany({
        where: { postId: id },
      });

      // 刪除喜歡記錄
      await tx.postLike.deleteMany({
        where: { postId: id },
      });

      // 刪除收藏記錄
      await tx.postBookmark.deleteMany({
        where: { postId: id },
      });

      // 刪除分享記錄
      await tx.postShare.deleteMany({
        where: { postId: id },
      });

      // 刪除文章
      await tx.post.delete({
        where: { id },
      });
    });

    return NextResponse.json({
      message: "文章刪除成功",
      deletedPost: {
        id: post.id,
        title: post.title,
      },
    });
  } catch (error) {
    console.error("刪除文章失敗:", error);
    return NextResponse.json({ error: "刪除文章失敗" }, { status: 500 });
  }
}
