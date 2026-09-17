import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        },
        category: true,
        tags: true,
      },
      orderBy: {
        publishedAt: "desc",
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("獲取文章列表失敗:", error);
    return NextResponse.json({ error: "獲取文章列表失敗" }, { status: 500 });
  }
}
