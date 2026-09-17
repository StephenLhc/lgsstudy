import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // 獲取搜尋參數
    const query = searchParams.get("q") || "";
    const category = searchParams.get("category") || "";
    const tag = searchParams.get("tag") || "";
    const author = searchParams.get("author") || "";
    const difficulty = searchParams.get("difficulty") || "";
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 50);

    // 建立搜尋條件
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: Record<string, any> = {
      status: "PUBLISHED",
    };

    // 關鍵字搜尋 - 支援標題和內容
    if (query) {
      where.OR = [
        { title: { contains: query } },
        { content: { contains: query } },
        { excerpt: { contains: query } },
      ];
    }

    // 分類篩選
    if (category) {
      where.category = { name: category };
    }

    // 標籤篩選
    if (tag) {
      where.tags = {
        some: {
          tag: { name: tag },
        },
      };
    }

    // 作者篩選
    if (author) {
      where.author = {
        name: { contains: author },
      };
    }

    // 難度篩選
    if (difficulty) {
      where.difficulty = difficulty;
    }

    // 排序設定
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let orderBy: any = {};
    switch (sortBy) {
      case "title":
        orderBy = { title: sortOrder };
        break;
      case "author":
        orderBy = { author: { name: sortOrder } };
        break;
      case "views":
        orderBy = { viewCount: sortOrder };
        break;
      case "likes":
        orderBy = { likeCount: sortOrder };
        break;
      default:
        orderBy = { createdAt: sortOrder };
    }

    // 執行搜尋
    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        include: {
          category: true,
          author: {
            select: {
              id: true,
              name: true,
              displayName: true,
              title: true,
            },
          },
          tags: {
            include: {
              tag: {
                select: {
                  id: true,
                  name: true,
                  color: true,
                },
              },
            },
          },
          comments: {
            select: { id: true },
          },
        },
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.post.count({ where }),
    ]);

    // 格式化結果
    const formattedPosts = posts.map((post) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      author: {
        id: post.author.id,
        name: post.author.displayName || post.author.name,
        title: post.author.title,
      },
      category: post.category?.name || null,
      tags: post.tags.map((tagRel) => ({
        id: tagRel.tag.id,
        name: tagRel.tag.name,
        color: tagRel.tag.color,
      })),
      difficulty: post.difficulty,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      publishedAt: post.publishedAt,
      viewCount: post.viewCount,
      likeCount: post.likeCount,
      commentsCount: post.comments.length,
      featured: post.featured,
      readingTime: post.readingTime,
    }));

    return NextResponse.json({
      success: true,
      data: {
        posts: formattedPosts,
        pagination: {
          current: page,
          total: Math.ceil(total / limit),
          count: total,
          limit,
        },
        filters: {
          query,
          category,
          tag,
          author,
          difficulty,
          sortBy,
          sortOrder,
        },
      },
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "搜尋過程中發生錯誤",
      },
      { status: 500 }
    );
  }
}
