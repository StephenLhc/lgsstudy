"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="relative bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-800 dark:to-gray-900 py-20 px-5 md:px-0 overflow-hidden">
            {/* 背景裝飾 */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-20 h-20 bg-orange-300 rounded-full"></div>
                <div className="absolute bottom-20 right-20 w-16 h-16 bg-orange-200 rounded-full"></div>
                <div className="absolute top-1/2 right-10 w-12 h-12 bg-orange-400 rounded-full"></div>
            </div>

            <div className="max-w-7xl mx-auto relative">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* 左側文字內容 */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="inline-block bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                                香港聖經研讀平台
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                                歡迎來到
                                <span className="text-orange-500 block">樂研集</span>
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                                與香港教會群體一起深入研讀聖經，透過文章、影音分享，
                                在神的話語中成長，建立豐盛的屬靈生命。
                            </p>
                        </div>

                        {/* 行動按鈕 */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/blog"
                                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
                            >
                                開始研讀聖經
                            </Link>
                            <Link
                                href="/about"
                                className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 text-center"
                            >
                                了解更多
                            </Link>
                        </div>

                        {/* 統計數據 */}
                        <div className="grid grid-cols-3 gap-8 pt-8 border-t border-orange-200 dark:border-gray-700">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-orange-500">66</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">聖經書卷</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-orange-500">100+</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">研讀文章</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-orange-500">1000+</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">會員參與</div>
                            </div>
                        </div>
                    </div>

                    {/* 右側圖片 */}
                    <div className="relative">
                        <div className="relative w-full h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="/images/spirituality-religion-hands-folded-prayer-holy-bible-church-concept-faith.jpg"
                                alt="聖經研讀 - 樂研集"
                                fill
                                className="object-cover"
                                priority
                            />
                            {/* 圖片覆蓋層 */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>

                        {/* 浮動卡片 */}
                        <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl border border-orange-100 dark:border-gray-700">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900 dark:text-white">每日靈修</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">與神同行</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
