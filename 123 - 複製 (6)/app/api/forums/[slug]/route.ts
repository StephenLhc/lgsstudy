import { NextRequest, NextResponse } from "next/server";

// 模擬主題數據
const mockTopics = [
  {
    id: "1",
    title: "創世記第一章的創造順序",
    slug: "genesis-1-creation-order",
    content: "想請教大家對於創世記第一章中神創造的順序有什麼看法...",
    author: {
      id: "user1",
      name: "張牧師",
      avatar: null,
    },
    forumSlug: "bible-study",
    createdAt: new Date("2024-01-10T09:00:00Z"),
    lastReplyAt: new Date("2024-01-15T10:30:00Z"),
    lastReplyBy: {
      id: "user2",
      name: "李弟兄",
    },
    viewsCount: 45,
    repliesCount: 8,
    isSticky: false,
    isLocked: false,
    tags: ["創世記", "創造", "神學"],
  },
  {
    id: "2",
    title: "約翰福音3:16的深層含義",
    slug: "john-3-16-deeper-meaning",
    content: "神愛世人，甚至將他的獨生子賜給他們... 這節經文包含多少層意思？",
    author: {
      id: "user3",
      name: "王姊妹",
      avatar: null,
    },
    forumSlug: "bible-study",
    createdAt: new Date("2024-01-12T14:20:00Z"),
    lastReplyAt: new Date("2024-01-14T16:45:00Z"),
    lastReplyBy: {
      id: "user4",
      name: "陳長老",
    },
    viewsCount: 62,
    repliesCount: 12,
    isSticky: true,
    isLocked: false,
    tags: ["約翰福音", "救恩", "愛"],
  },
  {
    id: "3",
    title: "如何建立穩定的晨禱生活",
    slug: "establishing-morning-prayer",
    content: "想請教大家是如何建立每日晨禱的習慣？",
    author: {
      id: "user3",
      name: "王姊妹",
      avatar: null,
    },
    forumSlug: "prayer-devotion",
    createdAt: new Date("2024-01-08T07:30:00Z"),
    lastReplyAt: new Date("2024-01-14T08:15:00Z"),
    lastReplyBy: {
      id: "user4",
      name: "陳長老",
    },
    viewsCount: 38,
    repliesCount: 6,
    isSticky: false,
    isLocked: false,
    tags: ["禱告", "靈修", "習慣"],
  },
  {
    id: "4",
    title: "在職場中如何活出信仰",
    slug: "faith-in-workplace",
    content: "在世俗的工作環境中，基督徒應該如何見證主？",
    author: {
      id: "user5",
      name: "林弟兄",
      avatar: null,
    },
    forumSlug: "christian-living",
    createdAt: new Date("2024-01-13T11:15:00Z"),
    lastReplyAt: new Date("2024-01-16T14:45:00Z"),
    lastReplyBy: {
      id: "user6",
      name: "黃姊妹",
    },
    viewsCount: 71,
    repliesCount: 15,
    isSticky: false,
    isLocked: false,
    tags: ["職場", "見證", "生活"],
  },
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 50);
    const sort = searchParams.get("sort") || "latest"; // latest, popular, oldest
    const tag = searchParams.get("tag") || "";

    const { slug } = await params;

    // 篩選該論壇的主題
    let filteredTopics = mockTopics.filter((topic) => topic.forumSlug === slug);

    // 標籤篩選
    if (tag) {
      filteredTopics = filteredTopics.filter((topic) =>
        topic.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase()))
      );
    }

    // 排序
    switch (sort) {
      case "popular":
        filteredTopics.sort((a, b) => b.viewsCount - a.viewsCount);
        break;
      case "oldest":
        filteredTopics.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "latest":
      default:
        filteredTopics.sort(
          (a, b) =>
            new Date(b.lastReplyAt || b.createdAt).getTime() -
            new Date(a.lastReplyAt || a.createdAt).getTime()
        );
        // 置頂主題排在前面
        filteredTopics.sort((a, b) => {
          if (a.isSticky && !b.isSticky) return -1;
          if (!a.isSticky && b.isSticky) return 1;
          return 0;
        });
        break;
    }

    // 分頁處理
    const total = filteredTopics.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTopics = filteredTopics.slice(startIndex, endIndex);

    // 獲取所有標籤（用於篩選選項）
    const allTags = Array.from(
      new Set(
        mockTopics
          .filter((topic) => topic.forumSlug === slug)
          .flatMap((topic) => topic.tags)
      )
    ).sort();

    return NextResponse.json({
      success: true,
      data: {
        topics: paginatedTopics,
        tags: allTags,
        pagination: {
          current: page,
          total: Math.ceil(total / limit),
          count: total,
          limit,
        },
        meta: {
          forumSlug: slug,
          sort,
          tag: tag || null,
        },
      },
    });
  } catch (error) {
    console.error("Forum topics API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "獲取論壇主題時發生錯誤",
      },
      { status: 500 }
    );
  }
}
