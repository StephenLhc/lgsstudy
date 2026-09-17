'use client';

import { useEffect } from 'react';
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Global error:', error);
    }, [error]);

    return (
        <html>
            <body>
                <div>
                    {/* Error Section */}
                    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 dark:from-gray-800 dark:to-gray-900 py-20">
                        <div className="max-w-4xl mx-auto px-4 text-center">

                            {/* Error Image */}
                            <div className="mb-8">
                                <div className="relative w-64 h-48 mx-auto mb-6">
                                    <Image
                                        src="/images/errorpage.png"
                                        alt="系統錯誤"
                                        fill
                                        className="object-contain opacity-80"
                                        sizes="(max-width: 768px) 90vw, 256px"
                                    />
                                </div>
                                <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold text-red-600 dark:text-red-400 mb-4">
                                    發生錯誤
                                </h1>
                                <div className="w-32 h-1 bg-red-500 mx-auto rounded-full"></div>
                            </div>

                            {/* Error Message */}
                            <div className="mb-12">
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                                    系統遇到了一些問題
                                </h2>
                                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                                    很抱歉，網站遇到了一個意外的錯誤。<br />
                                    我們的技術團隊已收到錯誤報告，正在努力修復中。
                                </p>
                            </div>

                            {/* Bible Verse */}
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg mb-12">
                                <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-300 italic mb-4">
                                    「我雖然行過死蔭的幽谷，也不怕遭害，因為你與我同在；你的杖，你的竿，都安慰我。」
                                </blockquote>
                                <cite className="text-orange-500 font-medium">
                                    — 詩篇 23:4
                                </cite>
                            </div>

                            {/* Error Details (for development) */}
                            {process.env.NODE_ENV === 'development' && (
                                <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl mb-8 text-left">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                                        錯誤詳情 (開發模式)：
                                    </h3>
                                    <pre className="text-sm text-gray-600 dark:text-gray-300 overflow-x-auto">
                                        {error.message}
                                    </pre>
                                    {error.digest && (
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                            錯誤代碼: {error.digest}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                                <button
                                    onClick={reset}
                                    className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
                                >
                                    重新嘗試
                                </button>

                                <Link
                                    href="/"
                                    className="px-8 py-3 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
                                >
                                    回到首頁
                                </Link>

                                <Link
                                    href="/contact"
                                    className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
                                >
                                    聯絡支援
                                </Link>
                            </div>

                            {/* Navigation Options */}
                            <div className="grid md:grid-cols-3 gap-6">
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
                                        探索聖經研讀文章
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
                                        了解樂研集的使命
                                    </p>
                                </Link>

                                <Link href="/other" className="group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-600 transition-colors">
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                        其他資源
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                                        查看更多學習資源
                                    </p>
                                </Link>
                            </div>
                        </div>
                    </section>

                    <Footer />
                </div>
            </body>
        </html>
    );
}
