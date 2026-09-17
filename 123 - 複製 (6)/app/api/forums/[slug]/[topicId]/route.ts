import { NextRequest, NextResponse } from "next/server";

// 模擬回覆數據
const mockReplies = [
  {
    id: "1",
    content: "很好的問題！我認為創世記的創造順序體現了神的智慧和計劃...",
    author: {
      id: "user2",
      name: "李弟兄",
      avatar: null,
      role: "member",
    },
    topicId: "1",
    createdAt: new Date("2024-01-11T10:15:00Z"),
    updatedAt: new Date("2024-01-11T10:15:00Z"),
    likesCount: 3,
    isModified: false,
  },
  {
    id: "2",
    content: "補充一下，從希伯來文的角度來看...",
    author: {
      id: "user4",
      name: "陳長老",
      avatar: null,
      role: "moderator",
    },
    topicId: "1",
    createdAt: new Date("2024-01-12T09:30:00Z"),
    updatedAt: new Date("2024-01-12T09:45:00Z"),
    likesCount: 5,
    isModified: true,
  },
  {
    id: "3",
    content: "感謝分享！這讓我對創造有了新的理解。",
    author: {
      id: "user6",
      name: "黃姊妹",
      avatar: null,
      role: "member",
    },
    topicId: "1",
    createdAt: new Date("2024-01-15T10:30:00Z"),
    updatedAt: new Date("2024-01-15T10:30:00Z"),
    likesCount: 1,
    isModified: false,
  },
];

// 主題詳情
const mockTopicDetails = {
  "1": {
    id: "1",
    title: "創世記第一章的創造順序",
    slug: "genesis-1-creation-order",
    content: `想請教大家對於創世記第一章中神創造的順序有什麼看法？

特別是關於：
1. 第一日創造光，第四日創造日月星辰
2. 植物在第三日創造，但太陽在第四日
3. 動物的創造順序

這些是否有特殊的神學意義？歡迎大家分享看法！`,
    author: {
      id: "user1",
      name: "張牧師",
      avatar: null,
      role: "author",
    },
    forumSlug: "bible-study",
    createdAt: new Date("2024-01-10T09:00:00Z"),
    updatedAt: new Date("2024-01-10T09:00:00Z"),
    lastReplyAt: new Date("2024-01-15T10:30:00Z"),
    lastReplyBy: {
      id: "user6",
      name: "黃姊妹",
    },
    viewsCount: 45,
    repliesCount: 3,
    likesCount: 8,
    isSticky: false,
    isLocked: false,
    tags: ["創世記", "創造", "神學"],
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; topicId: string }> }
) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 50);

    const { topicId } = await params;

    // 獲取主題詳情
    const topic = mockTopicDetails[topicId as keyof typeof mockTopicDetails];
    if (!topic) {
      return NextResponse.json(
        {
          success: false,
          error: "找不到該主題",
        },
        { status: 404 }
      );
    }

    // 獲取該主題的回覆
    const topicReplies = mockReplies.filter(
      (reply) => reply.topicId === topicId
    );

    // 排序（按時間順序）
    topicReplies.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    // 分頁處理
    const total = topicReplies.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedReplies = topicReplies.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: {
        topic,
        replies: paginatedReplies,
        pagination: {
          current: page,
          total: Math.ceil(total / limit),
          count: total,
          limit,
        },
      },
    });
  } catch (error) {
    console.error("Topic details API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "獲取主題詳情時發生錯誤",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; topicId: string }> }
) {
  try {
    const { topicId } = await params;
    const body = await request.json();
    const { content } = body;

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "回覆內容不能為空",
        },
        { status: 400 }
      );
    }

    // 這裡應該檢查用戶認證
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json(
    //     { success: false, error: "請先登入" },
    //     { status: 401 }
    //   );
    // }

    // 模擬創建新回覆
    const newReply = {
      id: String(Date.now()),
      content: content.trim(),
      author: {
        id: "current-user",
        name: "當前用戶",
        avatar: null,
        role: "member",
      },
      topicId,
      createdAt: new Date(),
      updatedAt: new Date(),
      likesCount: 0,
      isModified: false,
    };

    // 在實際應用中，這裡會保存到數據庫
    console.log("New reply created:", newReply);

    return NextResponse.json({
      success: true,
      data: {
        reply: newReply,
        message: "回覆發表成功",
      },
    });
  } catch (error) {
    console.error("Create reply API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "發表回覆時發生錯誤",
      },
      { status: 500 }
    );
  }
}
