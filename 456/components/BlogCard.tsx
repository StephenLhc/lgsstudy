"use client";

import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
    post: {
        id: string;
        title: string;
        slug: string;
        excerpt?: string;
        coverImage?: string;
        thumbnail?: string;
        category?: string;
        author: string;
        date: string;
        viewCount?: number;
        likeCount?: number;
        commentCount?: number;
        bibleBook?: {
            name: string;
            color: string;
        };
        categories?: Array<{
            category: {
                name: string;
                color: string;
                icon: string;
            };
        }>;
        tags?: Array<{
            tag: {
                name: string;
                color: string;
            };
        }>;
    };
    variant?: "default" | "featured" | "compact";
}

export default function BlogCard({ post, variant = "default" }: BlogCardProps) {
    // 獲取封面圖片
    const coverImage = post.coverImage || post.thumbnail || "/images/hero.png";

    // 獲取主要分類
    const mainCategory = post.bibleBook?.name || post.category || "聖經研讀";

    // 根據聖經書卷或分類選擇顏色
    const getCategoryColor = () => {
        if (post.bibleBook?.color) {
            return post.bibleBook.color;
        }

        // 根據分類名稱返回對應的顏色
        const categoryColors: { [key: string]: string } = {
            '創世記': 'bg-bible-old',
            '馬太福音': 'bg-bible-gospel',
            '羅馬書': 'bg-bible-new',
            '救贖論': 'bg-red-500',
            '教會論': 'bg-blue-500',
            '末世論': 'bg-purple-500',
            '基督論': 'bg-green-500',
            '聖靈論': 'bg-yellow-500',
            '聖經研讀': 'bg-primary-500',
        };

        return categoryColors[mainCategory] || 'bg-primary-500';
    };

    if (variant === "featured") {
        return (
            <Link
                href={`/blog/${post.slug}`}
                className="group block bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl dark:hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
                {/* 特色圖片 */}
                <div className="h-80 w-full relative overflow-hidden">
                    <Image
                        src={coverImage}
                        alt={`${post.title} - 特色圖片`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* 分類標籤 */}
                    <div className="absolute top-4 left-4">
                        <span className={`px-3 py-2 text-white text-sm font-bold rounded-lg shadow-lg ${getCategoryColor()}`}>
                            {mainCategory}
                        </span>
                    </div>
                    {/* 聖經書卷標籤 */}
                    {post.bibleBook && (
                        <div className="absolute top-4 right-4">
                            <span className="px-3 py-2 bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white text-sm font-medium rounded-lg shadow-lg">
                                📖 {post.bibleBook.name}
                            </span>
                        </div>
                    )}
                </div>

                {/* 內容 */}
                <div className="p-6">
                    {/* 標題 */}
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                        {post.title}
                    </h2>

                    {/* 摘要 */}
                    <p className="text-gray-600 dark:text-gray-400 text-base mb-4 line-clamp-3">
                        {post.excerpt || "深入探討聖經真理，幫助您建立穩固的信仰根基，在基督裡成長..."}
                    </p>

                    {/* 分類和標籤 */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {post.categories?.slice(0, 3).map((cat, idx) => (
                            <span
                                key={idx}
                                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md"
                            >
                                {cat.category.icon} {cat.category.name}
                            </span>
                        ))}
                        {post.tags?.slice(0, 2).map((tag, idx) => (
                            <span
                                key={idx}
                                className="px-2 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-xs rounded-md"
                            >
                                #{tag.tag.name}
                            </span>
                        ))}
                    </div>

                    {/* 作者和日期 */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                                <span className="text-primary-600 dark:text-primary-400 text-sm font-bold">
                                    {post.author.charAt(0)}
                                </span>
                            </div>
                            <div>
                                <div className="font-medium text-gray-900 dark:text-white">{post.author}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">{post.date}</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-gray-500 dark:text-gray-400">閱讀時間</div>
                            <div className="font-medium text-gray-900 dark:text-white">5 分鐘</div>
                        </div>
                    </div>

                    {/* 統計信息 */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <span>{post.viewCount || "1.2k"}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <span>{post.likeCount || "45"}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                <span>{post.commentCount || "12"}</span>
                            </div>
                        </div>
                        <div className="text-primary-600 dark:text-primary-400 font-medium">
                            閱讀全文 →
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    if (variant === "compact") {
        return (
            <Link
                href={`/blog/${post.slug}`}
                className="group flex bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md dark:hover:shadow-lg transition-all duration-200"
            >
                {/* 圖片 */}
                <div className="w-24 h-24 flex-shrink-0 relative overflow-hidden">
                    <Image
                        src={coverImage}
                        alt={`${post.title} - 縮略圖`}
                        sizes="96px"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                </div>

                {/* 內容 */}
                <div className="flex-1 p-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {post.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        {post.author} • {post.date}
                    </p>
                    <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-white text-xs rounded text-center ${getCategoryColor()}`}>
                            {mainCategory}
                        </span>
                    </div>
                </div>
            </Link>
        );
    }

    // 默認樣式
    return (
        <Link
            href={`/blog/${post.slug}`}
            className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg dark:hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
            {/* 圖片 */}
            <div className="h-48 w-full relative overflow-hidden">
                <Image
                    src={coverImage}
                    alt={`${post.title} - 封面圖片`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* 分類標籤 */}
                <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 text-white text-xs font-medium rounded-md shadow-sm ${getCategoryColor()}`}>
                        {mainCategory}
                    </span>
                </div>
                {/* 聖經書卷標籤 */}
                {post.bibleBook && (
                    <div className="absolute top-3 right-3">
                        <span className="px-2 py-1 bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white text-xs font-medium rounded-sm">
                            📖 {post.bibleBook.name}
                        </span>
                    </div>
                )}
            </div>

            {/* 內容 */}
            <div className="p-4">
                {/* 標題 */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {post.title}
                </h3>

                {/* 摘要 */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                    {post.excerpt || "深入探討聖經真理，幫助您建立穩固的信仰根基..."}
                </p>

                {/* 作者和日期 */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                            <span className="text-primary-600 dark:text-primary-400 text-xs font-medium">
                                {post.author.charAt(0)}
                            </span>
                        </div>
                        <span>{post.author}</span>
                    </div>
                    <span>{post.date}</span>
                </div>

                {/* 統計信息 */}
                <div className="flex items-center space-x-4 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span>{post.viewCount || "1.2k"}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>{post.likeCount || "45"}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>{post.commentCount || "12"}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
