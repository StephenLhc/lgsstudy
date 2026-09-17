import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const post = await prisma.post.findUnique({
      where: { id },
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

    if (!post) {
      return NextResponse.json({ error: "文章不存在" }, { status: 404 });
    }

    // 轉換格式以匹配前端期望
    const formattedPost = {
      ...post,
      description: post.excerpt, // 將 excerpt 映射為 description
    };

    return NextResponse.json(formattedPost);
  } catch (error) {
    console.error("獲取文章失敗:", error);
    return NextResponse.json({ error: "獲取文章失敗" }, { status: 500 });
  }
}
