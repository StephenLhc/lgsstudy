import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const limit = Math.min(parseInt(searchParams.get("limit") || "5"), 10);

    if (!query || query.length < 2) {
      return NextResponse.json({
        success: true,
        suggestions: [],
      });
    }

    // 搜尋建議 - 從標題中尋找相似的內容
    const titleSuggestions = await prisma.post.findMany({
      where: {
        status: "PUBLISHED",
        title: {
          contains: query,
        },
      },
      select: {
        id: true,
        title: true,
        slug: true,
      },
      take: limit,
      orderBy: {
        viewCount: "desc",
      },
    });

    // 標籤建議
    const tagSuggestions = await prisma.tag.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      select: {
        id: true,
        name: true,
        color: true,
      },
      take: Math.max(1, Math.floor(limit / 2)),
    });

    // 作者建議
    const authorSuggestions = await prisma.author.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { displayName: { contains: query } },
        ],
      },
      select: {
        id: true,
        name: true,
        displayName: true,
        title: true,
      },
      take: Math.max(1, Math.floor(limit / 3)),
    });

    // 分類建議
    const categorySuggestions = await prisma.category.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      select: {
        id: true,
        name: true,
        testament: true,
      },
      take: Math.max(1, Math.floor(limit / 3)),
    });

    return NextResponse.json({
      success: true,
      suggestions: {
        posts: titleSuggestions.map((post) => ({
          type: "post",
          id: post.id,
          title: post.title,
          slug: post.slug,
        })),
        tags: tagSuggestions.map((tag) => ({
          type: "tag",
          id: tag.id,
          name: tag.name,
          color: tag.color,
        })),
        authors: authorSuggestions.map((author) => ({
          type: "author",
          id: author.id,
          name: author.displayName || author.name,
          title: author.title,
        })),
        categories: categorySuggestions.map((category) => ({
          type: "category",
          id: category.id,
          name: category.name,
          testament: category.testament,
        })),
      },
    });
  } catch (error) {
    console.error("Search suggestions error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "搜尋建議過程中發生錯誤",
      },
      { status: 500 }
    );
  }
}
