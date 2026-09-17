"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return; // 還在加載中

        if (!session) {
            router.push("/auth/signin?callbackUrl=/admin");
            return;
        }
    }, [session, status, router]);

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">載入中...</p>
                </div>
            </div>
        );
    }

    if (!session) {
        return null; // 重定向中
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* 頂部導航 */}
            <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Link href="/admin" className="text-xl font-bold text-gray-900 dark:text-white">
                                📚 聖經研讀管理系統
                            </Link>
                        </div>

                        <div className="flex items-center space-x-4">
                            <Link
                                href="/"
                                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                                🏠 回到首頁
                            </Link>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    歡迎, {session.user?.name || session.user?.email}
                                </span>
                                <Link
                                    href="/api/auth/signout"
                                    className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                >
                                    登出
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* 側邊欄和主內容 */}
            <div className="flex">
                {/* 側邊欄 */}
                <aside className="w-64 min-h-screen bg-white dark:bg-gray-800 shadow-sm border-r border-gray-200 dark:border-gray-700">
                    <nav className="mt-8">
                        <div className="px-4">
                            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                                內容管理
                            </h3>
                            <ul className="space-y-1">
                                <li>
                                    <Link
                                        href="/admin"
                                        className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                                    >
                                        📊 總覽
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/admin/posts"
                                        className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                                    >
                                        📝 文章管理
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/admin/comments"
                                        className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                                    >
                                        💬 評論管理
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/admin/authors"
                                        className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                                    >
                                        👥 作者管理
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/admin/categories"
                                        className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                                    >
                                        🏷️ 分類管理
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/admin/tags"
                                        className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                                    >
                                        🏷️ 標籤管理
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </aside>

                {/* 主內容區域 */}
                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
