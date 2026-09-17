'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import StatCard from '../../components/StatCard';
import ActivityTimeline from '../../components/ActivityTimeline';
import ReadingPlanCard from '../../components/ReadingPlanCard';
import QuickActions from '../../components/QuickActions';
import RecommendedArticles from '../../components/RecommendedArticles';

interface DashboardData {
    user: {
        name: string;
        email?: string;
        avatar?: string;
    };
    stats: {
        articlesRead: number;
        bookmarks: number;
        forumPosts: number;
        notes: number;
        readingStreak: number;
        totalReadingTime: number;
    };
    recentActivity: Array<{
        id: string;
        type: 'article_read' | 'bookmark_added' | 'forum_reply' | 'note_created';
        title: string;
        timestamp: Date;
        category: string;
    }>;
    readingPlan: {
        name: string;
        progress: number;
        currentBook: string;
        currentChapter: string;
        todayReading: string;
        nextReading: string;
    };
    recommendedArticles: Array<{
        id: string;
        title: string;
        slug: string;
        category: string;
        readTime: number;
        thumbnail?: string | null;
    }>;
    quickActions: Array<{
        name: string;
        icon: string;
        href: string;
        description: string;
    }>;
}

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/signin');
            return;
        }

        if (status === 'authenticated') {
            fetchDashboardData();
        }
    }, [status, router]);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/dashboard');
            const data = await response.json();

            if (data.success) {
                // 轉換日期字符串為 Date 對象
                const processedData = {
                    ...data.data,
                    recentActivity: data.data.recentActivity.map((activity: {
                        id: string;
                        type: string;
                        title: string;
                        timestamp: string;
                        category: string;
                    }) => ({
                        ...activity,
                        timestamp: new Date(activity.timestamp),
                    })),
                };
                setDashboardData(processedData);
            } else {
                setError(data.error || '獲取數據失敗');
            }
        } catch (err) {
            setError('網路錯誤，請稍後再試');
            console.error('Dashboard fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    // 載入狀態
    if (loading || status === 'loading') {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // 錯誤狀態
    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <div className="text-red-500 mb-4">{error}</div>
                    <button
                        onClick={fetchDashboardData}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        重新載入
                    </button>
                </div>
            </div>
        );
    }

    // 未登入狀態
    if (!session || !dashboardData) {
        return null;
    }

    const { stats, recentActivity, readingPlan, recommendedArticles, quickActions } = dashboardData;

    return (
        <div className="container mx-auto px-4 py-8">
            {/* 歡迎標題 */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    歡迎回來，{dashboardData.user.name}！
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    繼續您的聖經研讀之旅
                </p>
            </div>

            {/* 統計卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="已讀文章"
                    value={stats.articlesRead}
                    icon="📖"
                    description="篇"
                />
                <StatCard
                    title="收藏書籤"
                    value={stats.bookmarks}
                    icon="🔖"
                    description="個"
                />
                <StatCard
                    title="論壇貢獻"
                    value={stats.forumPosts}
                    icon="💬"
                    description="則"
                />
                <StatCard
                    title="個人筆記"
                    value={stats.notes}
                    icon="✍️"
                    description="篇"
                />
            </div>

            {/* 額外統計 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <StatCard
                    title="連續讀經"
                    value={stats.readingStreak}
                    icon="🔥"
                    description="天"
                    trend={{ value: 12, isPositive: true }}
                />
                <StatCard
                    title="閱讀時間"
                    value={`${Math.floor(stats.totalReadingTime / 60)}h ${stats.totalReadingTime % 60}m`}
                    icon="⏰"
                    description="本月累計"
                />
            </div>

            {/* 主要內容區域 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 左側列 */}
                <div className="lg:col-span-2 space-y-6">
                    {/* 閱讀計劃 */}
                    <ReadingPlanCard readingPlan={readingPlan} />

                    {/* 最近活動 */}
                    <ActivityTimeline activities={recentActivity} />
                </div>

                {/* 右側列 */}
                <div className="space-y-6">
                    {/* 快速操作 */}
                    <QuickActions actions={quickActions} />

                    {/* 推薦文章 */}
                    <RecommendedArticles articles={recommendedArticles} />
                </div>
            </div>
        </div>
    );
}
