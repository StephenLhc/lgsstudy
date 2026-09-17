import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

// 模擬用戶活動數據
const mockUserStats = {
  articlesRead: 25,
  bookmarks: 12,
  forumPosts: 8,
  notes: 15,
  readingStreak: 7,
  totalReadingTime: 1200, // 分鐘
};

// 模擬最近活動
const mockRecentActivity = [
  {
    id: "1",
    type: "article_read",
    title: "創世記第一章的創造順序",
    timestamp: new Date("2024-01-16T10:30:00Z"),
    category: "聖經研讀",
  },
  {
    id: "2",
    type: "bookmark_added",
    title: "約翰福音3:16的深層含義",
    timestamp: new Date("2024-01-15T14:20:00Z"),
    category: "書籤",
  },
  {
    id: "3",
    type: "forum_reply",
    title: "在職場中如何活出信仰",
    timestamp: new Date("2024-01-14T09:15:00Z"),
    category: "論壇討論",
  },
  {
    id: "4",
    type: "note_created",
    title: "詩篇23篇默想筆記",
    timestamp: new Date("2024-01-13T16:45:00Z"),
    category: "個人筆記",
  },
];

// 模擬閱讀計劃
const mockReadingPlan = {
  name: "新約一年讀經計劃",
  progress: 35,
  currentBook: "馬太福音",
  currentChapter: "第5章",
  todayReading: "馬太福音 5:1-16",
  nextReading: "馬太福音 5:17-32",
};

// 模擬推薦文章
const mockRecommendedArticles = [
  {
    id: "1",
    title: "馬太福音5-7章：登山寶訓的品格",
    slug: "matthew-5-7-sermon-on-the-mount-character",
    category: "新約研讀",
    readTime: 8,
    thumbnail: null,
  },
  {
    id: "2",
    title: "詩篇23篇：耶和華是我的牧者",
    slug: "psalm-23-the-lord-is-my-shepherd",
    category: "詩篇默想",
    readTime: 6,
    thumbnail: null,
  },
  {
    id: "3",
    title: "腓立比書4章：在基督裡的喜樂與平安",
    slug: "philippians-4-joy-peace-in-christ",
    category: "新約研讀",
    readTime: 7,
    thumbnail: null,
  },
];

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: "請先登入",
        },
        { status: 401 }
      );
    }

    // 在實際應用中，這裡會從數據庫獲取真實的用戶數據
    const dashboardData = {
      user: {
        name: session.user?.name || "用戶",
        email: session.user?.email,
        avatar: session.user?.image,
      },
      stats: mockUserStats,
      recentActivity: mockRecentActivity,
      readingPlan: mockReadingPlan,
      recommendedArticles: mockRecommendedArticles,
      quickActions: [
        {
          name: "開始今日讀經",
          icon: "📖",
          href: "/reading-plan",
          description: "繼續您的讀經計劃",
        },
        {
          name: "瀏覽文章",
          icon: "📚",
          href: "/blog",
          description: "探索聖經研讀文章",
        },
        {
          name: "參與討論",
          icon: "💬",
          href: "/forums",
          description: "加入論壇討論",
        },
        {
          name: "寫筆記",
          icon: "✍️",
          href: "/notes",
          description: "記錄您的感想",
        },
        // 為管理員用戶添加管理面板連結
        ...((session.user as { role?: string })?.role === "admin"
          ? [
              {
                name: "管理面板",
                icon: "⚙️",
                href: "/admin",
                description: "管理網站內容",
              },
            ]
          : []),
      ],
    };

    return NextResponse.json({
      success: true,
      data: dashboardData,
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "獲取儀表板數據時發生錯誤",
      },
      { status: 500 }
    );
  }
}
