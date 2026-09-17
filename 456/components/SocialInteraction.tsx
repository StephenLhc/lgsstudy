"use client";

import { useState } from "react";

interface SocialInteractionProps {
    postId: string;
    initialLikeCount: number;
    initialIsLiked: boolean;
    initialIsFavorited: boolean;
    onLike: (postId: string) => void;
    onFavorite: (postId: string) => void;
    onShare: (postId: string, platform: string) => void;
}

export default function SocialInteraction({
    postId,
    initialLikeCount,
    initialIsLiked,
    initialIsFavorited,
    onLike,
    onFavorite,
    onShare
}: SocialInteractionProps) {
    const [likeCount, setLikeCount] = useState(initialLikeCount);
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
    const [showShareMenu, setShowShareMenu] = useState(false);

    const handleLike = () => {
        const newLikeCount = isLiked ? likeCount - 1 : likeCount + 1;
        setLikeCount(newLikeCount);
        setIsLiked(!isLiked);
        onLike(postId);
    };

    const handleFavorite = () => {
        setIsFavorited(!isFavorited);
        onFavorite(postId);
    };

    const handleShare = (platform: string) => {
        onShare(postId, platform);
        setShowShareMenu(false);
    };

    const sharePlatforms = [
        { name: "WhatsApp", icon: "📱", color: "bg-green-500 hover:bg-green-600" },
        { name: "Facebook", icon: "📘", color: "bg-blue-500 hover:bg-blue-600" },
        { name: "Twitter", icon: "🐦", color: "bg-sky-500 hover:bg-sky-600" },
        { name: "Line", icon: "💬", color: "bg-green-400 hover:bg-green-500" },
        { name: "複製連結", icon: "🔗", color: "bg-gray-500 hover:bg-gray-600" }
    ];

    return (
        <div className="flex items-center space-x-4">
            {/* 點讚按鈕 */}
            <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${isLiked
                    ? "bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
            >
                <span className={`text-lg ${isLiked ? "animate-bounce" : ""}`}>
                    {isLiked ? "❤️" : "🤍"}
                </span>
                <span className="font-medium">{likeCount}</span>
            </button>

            {/* 收藏按鈕 */}
            <button
                onClick={handleFavorite}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${isFavorited
                    ? "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
            >
                <span className={`text-lg ${isFavorited ? "animate-pulse" : ""}`}>
                    {isFavorited ? "⭐" : "☆"}
                </span>
                <span className="font-medium">
                    {isFavorited ? "已收藏" : "收藏"}
                </span>
            </button>

            {/* 分享按鈕 */}
            <div className="relative">
                <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                >
                    <span className="text-lg">📤</span>
                    <span className="font-medium">分享</span>
                </button>

                {/* 分享選單 */}
                {showShareMenu && (
                    <>
                        {/* 背景遮罩 */}
                        <div
                            className="fixed inset-0 z-10"
                            onClick={() => setShowShareMenu(false)}
                        />

                        {/* 分享選單內容 */}
                        <div className="absolute bottom-full right-0 mb-2 bg-white dark:bg-gray-800 rounded-2xl shadow-large border border-gray-100 dark:border-gray-700 p-4 z-20 min-w-[200px]">
                            <div className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                                分享到
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {sharePlatforms.map((platform) => (
                                    <button
                                        key={platform.name}
                                        onClick={() => handleShare(platform.name)}
                                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-white font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 ${platform.color}`}
                                    >
                                        <span>{platform.icon}</span>
                                        <span className="text-sm">{platform.name}</span>
                                    </button>
                                ))}
                            </div>

                            {/* 箭頭指示器 */}
                            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white dark:border-t-gray-800"></div>
                        </div>
                    </>
                )}
            </div>

            {/* 統計信息 */}
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                    <span>👁️</span>
                    <span>閱讀</span>
                </div>
                <div className="flex items-center space-x-1">
                    <span>💬</span>
                    <span>評論</span>
                </div>
            </div>
        </div>
    );
}
