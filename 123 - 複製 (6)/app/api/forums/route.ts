import { NextRequest, NextResponse } from "next/server";

// 臨時模擬數據，直到 Prisma 客戶端更新
const mockForums = [
  {
    id: "1",
    name: "聖經研讀",
    slug: "bible-study",
    description: "討論聖經內容、經文解釋和神學思考",
    icon: "📖",
    color: "#3B82F6",
    category: "神學",
    isPublic: true,
    topicsCount: 25,
    repliesCount: 150,
    latestTopic: {
      id: "1",
      title: "創世記第一章的創造順序",
      slug: "genesis-1-creation-order",
      author: {
        id: "user1",
        name: "張牧師",
      },
      lastReplyAt: new Date("2024-01-15T10:30:00Z"),
      lastReplyBy: {
        id: "user2",
        name: "李弟兄",
      },
    },
  },
  {
    id: "2",
    name: "禱告與靈修",
    slug: "prayer-devotion",
    description: "分享禱告心得、靈修感動和屬靈成長",
    icon: "🙏",
    color: "#10B981",
    category: "靈修",
    isPublic: true,
    topicsCount: 18,
    repliesCount: 89,
    latestTopic: {
      id: "2",
      title: "如何建立穩定的晨禱生活",
      slug: "establishing-morning-prayer",
      author: {
        id: "user3",
        name: "王姊妹",
      },
      lastReplyAt: new Date("2024-01-14T08:15:00Z"),
      lastReplyBy: {
        id: "user4",
        name: "陳長老",
      },
    },
  },
  {
    id: "3",
    name: "信仰生活",
    slug: "christian-living",
    description: "討論基督徒生活、職場見證和人際關係",
    icon: "🌟",
    color: "#8B5CF6",
    category: "生活",
    isPublic: true,
    topicsCount: 32,
    repliesCount: 201,
    latestTopic: {
      id: "3",
      title: "在職場中如何活出信仰",
      slug: "faith-in-workplace",
      author: {
        id: "user5",
        name: "林弟兄",
      },
      lastReplyAt: new Date("2024-01-16T14:45:00Z"),
      lastReplyBy: {
        id: "user6",
        name: "黃姊妹",
      },
    },
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 50);
    const category = searchParams.get("category") || "";

    // 篩選論壇
    let filteredForums = mockForums;
    if (category) {
      filteredForums = mockForums.filter((forum) =>
        forum.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    // 分頁處理
    const total = filteredForums.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedForums = filteredForums.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: {
        forums: paginatedForums,
        pagination: {
          current: page,
          total: Math.ceil(total / limit),
          count: total,
          limit,
        },
      },
    });
  } catch (error) {
    console.error("Forums API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "獲取論壇列表時發生錯誤",
      },
      { status: 500 }
    );
  }
}
