"use client";

import { useTheme } from "next-themes";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function TestFeaturesPage() {
    const { theme, setTheme } = useTheme();
    const { data: session, status } = useSession();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">功能測試頁面</h1>

                {/* 暗亮模式測試 */}
                <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">暗亮模式測試</h2>
                    <p className="mb-4">當前主題: {theme}</p>
                    <div className="space-x-4">
                        <button
                            onClick={() => setTheme('light')}
                            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                            淺色模式
                        </button>
                        <button
                            onClick={() => setTheme('dark')}
                            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                        >
                            深色模式
                        </button>
                        <button
                            onClick={() => setTheme('system')}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            系統設定
                        </button>
                    </div>
                </section>

                {/* 登入功能測試 */}
                <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">登入功能測試</h2>
                    <p className="mb-4">登入狀態: {status}</p>

                    {session ? (
                        <div>
                            <p className="mb-4">歡迎, {session.user?.name || session.user?.email}!</p>
                            <button
                                onClick={() => signOut()}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                登出
                            </button>
                        </div>
                    ) : (
                        <div className="space-x-4">
                            <button
                                onClick={() => signIn('google')}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                使用 Google 登入
                            </button>
                            <button
                                onClick={() => signIn()}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                查看所有登入選項
                            </button>
                        </div>
                    )}
                </section>

                {/* RWD 測試 */}
                <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">RWD 響應式設計測試</h2>

                    {/* 網格佈局 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded">
                            <h3 className="font-semibold">手機版 (1列)</h3>
                            <p className="text-sm">在小螢幕顯示</p>
                        </div>
                        <div className="bg-green-100 dark:bg-green-900 p-4 rounded">
                            <h3 className="font-semibold">平板版 (2列)</h3>
                            <p className="text-sm">在中等螢幕顯示</p>
                        </div>
                        <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded">
                            <h3 className="font-semibold">桌面版 (3列)</h3>
                            <p className="text-sm">在大螢幕顯示</p>
                        </div>
                    </div>

                    {/* 隱藏/顯示元素 */}
                    <div className="space-y-2">
                        <div className="block md:hidden bg-red-100 dark:bg-red-900 p-2 rounded">
                            只在手機版顯示
                        </div>
                        <div className="hidden md:block lg:hidden bg-yellow-100 dark:bg-yellow-900 p-2 rounded">
                            只在平板版顯示
                        </div>
                        <div className="hidden lg:block bg-indigo-100 dark:bg-indigo-900 p-2 rounded">
                            只在桌面版顯示
                        </div>
                    </div>
                </section>

                {/* 回到首頁 */}
                <div className="text-center">
                    <Link
                        href="/"
                        className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        回到首頁
                    </Link>
                </div>
            </div>
        </div>
    );
}
