'use client';

import React from 'react';
import Link from 'next/link';

interface Activity {
    id: string;
    type: 'article_read' | 'bookmark_added' | 'forum_reply' | 'note_created';
    title: string;
    timestamp: Date;
    category: string;
}

interface ActivityTimelineProps {
    activities: Activity[];
}

export default function ActivityTimeline({ activities }: ActivityTimelineProps) {
    const getActivityIcon = (type: Activity['type']) => {
        switch (type) {
            case 'article_read':
                return '📖';
            case 'bookmark_added':
                return '🔖';
            case 'forum_reply':
                return '💬';
            case 'note_created':
                return '✍️';
            default:
                return '📝';
        }
    };

    const getActivityAction = (type: Activity['type']) => {
        switch (type) {
            case 'article_read':
                return '閱讀了';
            case 'bookmark_added':
                return '收藏了';
            case 'forum_reply':
                return '回覆了';
            case 'note_created':
                return '寫了筆記';
            default:
                return '進行了';
        }
    };

    const formatTime = (timestamp: Date) => {
        const now = new Date();
        const diff = now.getTime() - timestamp.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days} 天前`;
        } else if (hours > 0) {
            return `${hours} 小時前`;
        } else {
            return '剛剛';
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                最近活動
            </h3>

            {activities.length === 0 ? (
                <div className="text-center py-8">
                    <div className="text-gray-400 dark:text-gray-500 mb-2">
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
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                        還沒有任何活動記錄
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {activities.map((activity, index) => (
                        <div key={activity.id} className="flex items-start space-x-3">
                            {/* 時間軸線 */}
                            <div className="flex flex-col items-center">
                                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                    <span className="text-sm">{getActivityIcon(activity.type)}</span>
                                </div>
                                {index < activities.length - 1 && (
                                    <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mt-2" />
                                )}
                            </div>

                            {/* 活動內容 */}
                            <div className="flex-1 min-w-0">
                                <div className="text-sm text-gray-900 dark:text-white">
                                    <span className="font-medium">
                                        {getActivityAction(activity.type)}
                                    </span>
                                    <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer ml-1">
                                        {activity.title}
                                    </span>
                                </div>
                                <div className="flex items-center mt-1 space-x-2 text-xs text-gray-500 dark:text-gray-400">
                                    <span>{activity.category}</span>
                                    <span>•</span>
                                    <span>{formatTime(activity.timestamp)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activities.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Link
                        href="/profile/activity"
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        查看所有活動
                    </Link>
                </div>
            )}
        </div>
    );
}
