"use client";

import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
    return (
        <div>
            {/* 404 Error Section */}
            <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-800 dark:to-gray-900 py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">

                    {/* 錯誤圖片 */}
                    <div className="mb-8">
                        <div className="relative w-64 h-48 mx-auto mb-6">
                            <Image
                                src="/images/errorpage.png"
                                alt="頁面未找到"
                                fill
                                className="object-contain opacity-80"
                                sizes="(max-width: 768px) 90vw, 256px"
                            />
                        </div>
                        <h1 className="text-8xl md:text-9xl font-bold text-orange-500 dark:text-orange-400 mb-4">
                            404
                        </h1>
                        <div className="w-32 h-1 bg-orange-500 mx-auto rounded-full"></div>
                    </div>

                    {/* 錯誤訊息 */}
                    <div className="mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                            找不到頁面
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                            抱歉，你所尋找的頁面不存在或已被移動。<br />
                            讓我們幫你找到正確的方向。
                        </p>
                    </div>

                    {/* 聖經經文 */}
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg mb-12">
                        <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-300 italic mb-4">
                            「你的話是我腳前的燈，是我路上的光。」
                        </blockquote>
                        <cite className="text-orange-500 font-medium">
                            — 詩篇 119:105
                        </cite>
                    </div>

                    {/* 導航選項 */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        <Link href="/" className="group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-600 transition-colors">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                回到首頁
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                瀏覽最新的聖經研讀文章
                            </p>
                        </Link>

                        <Link href="/blog" className="group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                瀏覽文章
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                探索所有聖經研讀文章
                            </p>
                        </Link>

                        <Link href="/about" className="group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600 transition-colors">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                關於我們
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                了解樂研集的使命與願景
                            </p>
                        </Link>
                    </div>

                    {/* 搜尋區域 */}
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            或者試試搜尋
                        </h3>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="text"
                                placeholder="搜尋文章、經文或主題..."
                                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                            <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors">
                                搜尋
                            </button>
                        </div>
                    </div>

                    {/* 返回按鈕 */}
                    <div className="mt-12">
                        <button
                            onClick={() => window.history.back()}
                            className="inline-flex items-center px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
                        >
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0L2.586 11H12a1 1 0 110 2H2.586l3.707 3.707a1 1 0 01-1.414 1.414l-5.414-5.414a1 1 0 010-1.414L5.293 6.293a1 1 0 011.414 1.414L3.414 11H12a1 1 0 110 2H7.707z" clipRule="evenodd" />
                            </svg>
                            返回上一頁
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
