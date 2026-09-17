'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface RecommendedArticle {
    id: string;
    title: string;
    slug: string;
    category: string;
    readTime: number;
    thumbnail?: string | null;
}

interface RecommendedArticlesProps {
    articles: RecommendedArticle[];
}

export default function RecommendedArticles({ articles }: RecommendedArticlesProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    推薦閱讀
                </h3>
                <Link
                    href="/blog"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                    查看更多
                </Link>
            </div>

            {articles.length === 0 ? (
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
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                        </svg>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                        暫無推薦文章
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {articles.map((article) => (
                        <Link
                            key={article.id}
                            href={`/blog/${article.slug}`}
                            className="block p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <div className="flex items-start space-x-3">
                                {/* 文章縮圖或圖標 */}
                                <div className="flex-shrink-0">
                                    {article.thumbnail ? (
                                        <Image
                                            src={article.thumbnail}
                                            alt={article.title}
                                            width={48}
                                            height={48}
                                            className="w-12 h-12 rounded-lg object-cover"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                            <svg
                                                className="w-6 h-6 text-blue-600 dark:text-blue-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                                />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                {/* 文章信息 */}
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-gray-900 dark:text-white text-sm leading-5 mb-1">
                                        {article.title}
                                    </h4>
                                    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                                            {article.category}
                                        </span>
                                        <span>•</span>
                                        <span>{article.readTime} 分鐘閱讀</span>
                                    </div>
                                </div>

                                {/* 箭頭圖標 */}
                                <div className="flex-shrink-0 text-gray-400 dark:text-gray-500">
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
