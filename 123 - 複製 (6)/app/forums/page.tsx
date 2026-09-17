'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

// 根據顏色代碼返回對應的 Tailwind CSS 類
const getForumColorClass = (color: string): string => {
    const colorMap: Record<string, string> = {
        '#3B82F6': 'bg-blue-500',
        '#10B981': 'bg-emerald-500',
        '#8B5CF6': 'bg-violet-500',
        '#F59E0B': 'bg-amber-500',
        '#EF4444': 'bg-red-500',
        '#06B6D4': 'bg-cyan-500',
        '#84CC16': 'bg-lime-500',
        '#F97316': 'bg-orange-500',
        '#EC4899': 'bg-pink-500',
        '#6366F1': 'bg-indigo-500',
    };

    return colorMap[color] || 'bg-gray-500';
};

interface Forum {
    id: string;
    name: string;
    slug: string;
    description: string;
    icon: string;
    color: string;
    category: string;
    isPublic: boolean;
    topicsCount: number;
    repliesCount: number;
    latestTopic: {
        id: string;
        title: string;
        slug: string;
        author: {
            id: string;
            name: string;
        };
        lastReplyAt: string;
        lastReplyBy: {
            id: string;
            name: string;
        };
    } | null;
}

interface ForumsResponse {
    success: boolean;
    data: {
        forums: Forum[];
        pagination: {
            current: number;
            total: number;
            count: number;
            limit: number;
        };
    };
}

export default function ForumsPage() {
    const { data: session } = useSession();
    const [forums, setForums] = useState<Forum[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    useEffect(() => {
        const loadForums = async () => {
            try {
                setLoading(true);
                const params = new URLSearchParams();
                if (selectedCategory) {
                    params.append('category', selectedCategory);
                }

                const response = await fetch(`/api/forums?${params}`);
                const data: ForumsResponse = await response.json();

                if (data.success) {
                    setForums(data.data.forums);
                } else {
                    setError('獲取論壇列表失敗');
                }
            } catch (err) {
                setError('網路錯誤，請稍後再試');
                console.error('Error fetching forums:', err);
            } finally {
                setLoading(false);
            }
        };

        loadForums();
    }, [selectedCategory]);

    const fetchForums = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (selectedCategory) {
                params.append('category', selectedCategory);
            }

            const response = await fetch(`/api/forums?${params}`);
            const data: ForumsResponse = await response.json();

            if (data.success) {
                setForums(data.data.forums);
            } else {
                setError('獲取論壇列表失敗');
            }
        } catch (err) {
            setError('網路錯誤，請稍後再試');
            console.error('Error fetching forums:', err);
        } finally {
            setLoading(false);
        }
    };

    const categories = Array.from(new Set(forums.map(forum => forum.category)));

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

        if (diffInHours < 1) {
            return '剛剛';
        } else if (diffInHours < 24) {
            return `${diffInHours} 小時前`;
        } else if (diffInHours < 72) {
            return `${Math.floor(diffInHours / 24)} 天前`;
        } else {
            return date.toLocaleDateString('zh-TW');
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <div className="text-red-500 mb-4">{error}</div>
                    <button
                        onClick={fetchForums}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        重新載入
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* 頁面標題 */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    討論版
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    與其他信徒一起討論聖經、信仰和生活話題
                </p>
            </div>

            {/* 分類篩選 */}
            {categories.length > 0 && (
                <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setSelectedCategory('')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === ''
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                        >
                            全部
                        </button>
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* 論壇列表 */}
            <div className="space-y-4">
                {forums.map(forum => (
                    <div
                        key={forum.id}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                    >
                        <Link href={`/forums/${forum.slug}`} className="block p-6">
                            <div className="flex items-start gap-4">
                                {/* 論壇圖示 */}
                                <div
                                    className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl font-bold ${getForumColorClass(forum.color)}`}
                                >
                                    {forum.icon}
                                </div>                                {/* 論壇資訊 */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {forum.name}
                                        </h3>
                                        <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                                            {forum.category}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                                        {forum.description}
                                    </p>
                                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                        <span>{forum.topicsCount} 主題</span>
                                        <span>{forum.repliesCount} 回覆</span>
                                    </div>
                                </div>

                                {/* 最新主題 */}
                                <div className="flex-shrink-0 w-64 text-right">
                                    {forum.latestTopic ? (
                                        <div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-white mb-1 truncate">
                                                {forum.latestTopic.title}
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                <div>由 {forum.latestTopic.lastReplyBy.name} 回覆</div>
                                                <div>{formatDate(forum.latestTopic.lastReplyAt)}</div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-sm text-gray-400 dark:text-gray-500">
                                            尚無主題
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            {/* 空狀態 */}
            {forums.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-gray-400 dark:text-gray-500 mb-4">
                        <svg
                            className="mx-auto h-12 w-12"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        沒有找到論壇
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                        {selectedCategory ? '該分類下沒有論壇' : '目前沒有可用的論壇'}
                    </p>
                </div>
            )}

            {/* 登入提示 */}
            {!session && (
                <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-800 dark:text-blue-300">
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span className="text-sm">
                            <Link href="/auth/signin" className="font-medium hover:underline">
                                登入
                            </Link>
                            後即可參與討論和發表主題
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
