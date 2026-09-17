import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 獲取所有聖經書卷
export async function getAllBibleBooks() {
  try {
    return await prisma.bibleBook.findMany({
      orderBy: { order: "asc" },
    });
  } catch (error) {
    console.error("獲取聖經書卷失敗:", error);
    throw error;
  }
}

// 根據新舊約獲取聖經書卷
export async function getBibleBooksByTestament(testament: "OLD" | "NEW") {
  try {
    return await prisma.bibleBook.findMany({
      where: { testament },
      orderBy: { order: "asc" },
    });
  } catch (error) {
    console.error("根據新舊約獲取聖經書卷失敗:", error);
    throw error;
  }
}

// 獲取所有分類
export async function getAllCategories() {
  try {
    return await prisma.category.findMany({
      orderBy: { order: "asc" },
    });
  } catch (error) {
    console.error("獲取分類失敗:", error);
    throw error;
  }
}

// 獲取所有標籤
export async function getAllTags() {
  try {
    return await prisma.tag.findMany({
      orderBy: { count: "desc" },
    });
  } catch (error) {
    console.error("獲取標籤失敗:", error);
    throw error;
  }
}

// 獲取文章列表（支援分頁和篩選）
export async function getPosts({
  page = 1,
  limit = 12,
  categoryId,
  tagId,
  bibleBookId,
  search,
}: {
  page?: number;
  limit?: number;
  categoryId?: string;
  tagId?: string;
  bibleBookId?: string;
  search?: string;
}) {
  try {
    const skip = (page - 1) * limit;

    const where: any = {
      published: true,
    };

    if (categoryId) {
      where.categories = {
        some: { categoryId },
      };
    }

    if (tagId) {
      where.tags = {
        some: { tagId },
      };
    }

    if (bibleBookId) {
      where.bibleBookId = bibleBookId;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { excerpt: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
      ];
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              avatar: true,
              title: true,
            },
          },
          bibleBook: {
            select: {
              id: true,
              name: true,
              color: true,
            },
          },
          categories: {
            include: {
              category: {
                select: {
                  id: true,
                  name: true,
                  color: true,
                  icon: true,
                },
              },
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
        },
        orderBy: { publishedAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.post.count({ where }),
    ]);

    return {
      posts,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    };
  } catch (error) {
    console.error("獲取文章列表失敗:", error);
    throw error;
  }
}

// 根據 slug 獲取單篇文章
export async function getPostBySlug(slug: string) {
  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
            title: true,
            bio: true,
          },
        },
        bibleBook: {
          select: {
            id: true,
            name: true,
            color: true,
            description: true,
          },
        },
        categories: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
                color: true,
                icon: true,
              },
            },
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
          where: { published: true, parentId: null },
          include: {
            author: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
            replies: {
              where: { published: true },
              include: {
                author: {
                  select: {
                    id: true,
                    name: true,
                    avatar: true,
                  },
                },
                replies: {
                  where: { published: true },
                  include: {
                    author: {
                      select: {
                        id: true,
                        name: true,
                        avatar: true,
                      },
                    },
                  },
                },
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (post) {
      // 增加閱讀次數
      await prisma.post.update({
        where: { id: post.id },
        data: { viewCount: { increment: 1 } },
      });
    }

    return post;
  } catch (error) {
    console.error("獲取文章失敗:", error);
    throw error;
  }
}

// 獲取相關文章
export async function getRelatedPosts(postId: string, limit = 3) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: {
        bibleBookId: true,
        categories: { select: { categoryId: true } },
        tags: { select: { tagId: true } },
      },
    });

    if (!post) return [];

    const where: any = {
      published: true,
      id: { not: postId },
      OR: [],
    };

    if (post.bibleBookId) {
      where.OR.push({ bibleBookId: post.bibleBookId });
    }

    if (post.categories.length > 0) {
      where.OR.push({
        categories: {
          some: {
            categoryId: { in: post.categories.map((c) => c.categoryId) },
          },
        },
      });
    }

    if (post.tags.length > 0) {
      where.OR.push({
        tags: {
          some: {
            tagId: { in: post.tags.map((t) => t.tagId) },
          },
        },
      });
    }

    return await prisma.post.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        bibleBook: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
      },
      orderBy: { viewCount: "desc" },
      take: limit,
    });
  } catch (error) {
    console.error("獲取相關文章失敗:", error);
    throw error;
  }
}

// 獲取熱門文章
export async function getPopularPosts(limit = 6) {
  try {
    return await prisma.post.findMany({
      where: { published: true },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        bibleBook: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
      },
      orderBy: [
        { viewCount: "desc" },
        { likeCount: "desc" },
        { commentCount: "desc" },
      ],
      take: limit,
    });
  } catch (error) {
    console.error("獲取熱門文章失敗:", error);
    throw error;
  }
}

// 獲取標籤雲數據
export async function getTagCloud() {
  try {
    return await prisma.tag.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        color: true,
        count: true,
        _count: {
          select: { posts: true },
        },
      },
      orderBy: { count: "desc" },
      take: 20,
    });
  } catch (error) {
    console.error("獲取標籤雲失敗:", error);
    throw error;
  }
}

// 關閉資料庫連接
export async function closeDatabase() {
  await prisma.$disconnect();
}
