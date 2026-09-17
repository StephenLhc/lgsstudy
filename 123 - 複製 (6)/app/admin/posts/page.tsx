'use client'

import Link from "next/link";
import { useState, useEffect } from "react";

interface Post {
    id: string;
    title: string;
    slug: string;
    description: string;
    publishedAt: Date | null;
    createdAt: Date;
    viewCount: number;
    status: 'DRAFT' | 'PUBLISHED';
    featured: boolean;
    author: {
        name: string | null;
        displayName?: string | null;
    };
    category: {
        name: string;
    };
    _count: {
        likes: number;
        comments: number;
        bookmarks: number;
    };
}

export default function AdminPostsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState<string | null>(null);

    // 刪除文章功能
    const handleDeletePost = async (postId: string, postTitle: string) => {
        if (!confirm(`確定要刪除文章「${postTitle}」嗎？此操作不可撤銷。`)) {
            return;
        }

        setDeleting(postId);
        try {
            const response = await fetch(`/api/admin/posts/${postId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                // 從列表中移除已刪除的文章
                setPosts(prev => prev.filter(post => post.id !== postId));
            } else {
                const error = await response.json();
                alert(error.error || '刪除失敗');
            }
        } catch (error) {
            console.error('刪除文章失敗:', error);
            alert('刪除失敗，請稍後再試');
        } finally {
            setDeleting(null);
        }
    };

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await fetch('/api/blog/posts');
                if (response.ok) {
                    const data = await response.json();
                    setPosts(data);
                }
            } catch (error) {
                console.error('載入文章失敗:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">文章管理</h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        管理所有聖經研讀文章
                    </p>
                </div>
                <Link
                    href="/admin/posts/new"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
                >
                    ➕ 新增文章
                </Link>
            </div>

            {/* 統計卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                                    <span className="text-white text-xs">📄</span>
                                </div>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">總計</p>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">{posts.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                                    <span className="text-white text-xs">✅</span>
                                </div>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">已發布</p>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {posts.filter(p => p.status === 'PUBLISHED').length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                                    <span className="text-white text-xs">📝</span>
                                </div>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">草稿</p>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {posts.filter(p => p.status === 'DRAFT').length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                                    <span className="text-white text-xs">⭐</span>
                                </div>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">精選</p>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {posts.filter(p => p.featured).length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 文章列表 */}
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md border border-gray-200 dark:border-gray-700">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {posts.map((post) => (
                        <li key={post.id}>
                            <div className="px-4 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                <div className="flex items-center space-x-4 flex-1 min-w-0">
                                    {/* 狀態指示器 */}
                                    <div className="flex-shrink-0">
                                        <div className={`w-3 h-3 rounded-full ${post.status === 'PUBLISHED'
                                            ? 'bg-green-400'
                                            : post.status === 'DRAFT'
                                                ? 'bg-yellow-400'
                                                : 'bg-gray-400'
                                            }`}></div>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center space-x-2">
                                            <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                {post.title}
                                            </h3>
                                            {post.featured && (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                                                    ⭐ 精選
                                                </span>
                                            )}
                                        </div>
                                        <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                            <span>✍️ {post.author.displayName || post.author.name}</span>
                                            <span>📁 {post.category.name}</span>
                                            <span>📅 {new Date(post.createdAt).toLocaleDateString('zh-TW')}</span>
                                        </div>
                                    </div>

                                    {/* 統計信息 */}
                                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="flex items-center">
                                            <span className="mr-1">👁️</span>
                                            {post.viewCount}
                                        </span>
                                        <span className="flex items-center">
                                            <span className="mr-1">❤️</span>
                                            {post._count.likes}
                                        </span>
                                        <span className="flex items-center">
                                            <span className="mr-1">💬</span>
                                            {post._count.comments}
                                        </span>
                                        <span className="flex items-center">
                                            <span className="mr-1">🔖</span>
                                            {post._count.bookmarks}
                                        </span>
                                    </div>
                                </div>

                                {/* 操作按鈕 */}
                                <div className="flex items-center space-x-2">
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        target="_blank"
                                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                        title="預覽"
                                    >
                                        👁️
                                    </Link>
                                    <Link
                                        href={`/admin/posts/${post.id}/edit`}
                                        className="text-orange-600 hover:text-orange-800 dark:text-orange-400 dark:hover:text-orange-300"
                                        title="編輯"
                                    >
                                        ✏️
                                    </Link>
                                    <button
                                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50"
                                        title="刪除"
                                        disabled={deleting === post.id}
                                        onClick={() => handleDeletePost(post.id, post.title)}
                                    >
                                        {deleting === post.id ? '⏳' : '🗑️'}
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

                {posts.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📝</div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">還沒有文章</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">開始創建您的第一篇聖經研讀文章吧！</p>
                        <Link
                            href="/admin/posts/new"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700"
                        >
                            ➕ 新增文章
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
