'use client'

import { useState, useEffect } from 'react'

interface User {
    id: string;
    name?: string;
    image?: string;
}

interface Author {
    id: string;
    name: string;
    avatar?: string;
    title?: string;
}

interface Post {
    id: string;
    title: string;
    slug: string;
}

interface Comment {
    id: string;
    content: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SPAM';
    createdAt: string;
    user?: User;
    author?: Author;
    guestName?: string;
    guestEmail?: string;
    post: Post;
    replies?: Comment[];
    parentId?: string;
}

const statusLabels = {
    PENDING: '待審核',
    APPROVED: '已通過',
    REJECTED: '已拒絕',
    SPAM: '垃圾評論'
}

const statusColors = {
    PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    APPROVED: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    REJECTED: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    SPAM: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
}

export default function AdminCommentsPage() {
    const [comments, setComments] = useState<Comment[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'SPAM'>('ALL')
    const [updating, setUpdating] = useState<string | null>(null)

    // 載入評論
    useEffect(() => {
        const fetchComments = async () => {
            try {
                setLoading(true)
                const response = await fetch('/api/admin/comments')
                if (response.ok) {
                    const data = await response.json()
                    setComments(data)
                }
            } catch (error) {
                console.error('載入評論失敗:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchComments()
    }, [])

    // 更新評論狀態
    const updateCommentStatus = async (commentId: string, status: Comment['status']) => {
        setUpdating(commentId)
        try {
            const response = await fetch(`/api/admin/comments/${commentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status })
            })

            if (response.ok) {
                setComments(prev =>
                    prev.map(comment =>
                        comment.id === commentId
                            ? { ...comment, status }
                            : comment
                    )
                )
                alert('狀態更新成功')
            } else {
                const error = await response.json()
                alert(error.error || '更新失敗')
            }
        } catch (error) {
            console.error('更新評論狀態失敗:', error)
            alert('更新失敗，請稍後再試')
        } finally {
            setUpdating(null)
        }
    }

    // 刪除評論
    const deleteComment = async (commentId: string) => {
        if (!confirm('確定要刪除這個評論嗎？此操作不可撤銷。')) {
            return
        }

        setUpdating(commentId)
        try {
            const response = await fetch(`/api/admin/comments/${commentId}`, {
                method: 'DELETE'
            })

            if (response.ok) {
                setComments(prev => prev.filter(comment => comment.id !== commentId))
                alert('評論刪除成功')
            } else {
                const error = await response.json()
                alert(error.error || '刪除失敗')
            }
        } catch (error) {
            console.error('刪除評論失敗:', error)
            alert('刪除失敗，請稍後再試')
        } finally {
            setUpdating(null)
        }
    }

    // 過濾評論
    const filteredComments = comments.filter(comment => {
        if (filter === 'ALL') return true
        return comment.status === filter
    })

    // 統計數據
    const stats = {
        total: comments.length,
        pending: comments.filter(c => c.status === 'PENDING').length,
        approved: comments.filter(c => c.status === 'APPROVED').length,
        rejected: comments.filter(c => c.status === 'REJECTED').length,
        spam: comments.filter(c => c.status === 'SPAM').length
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">評論管理</h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">管理和審核用戶評論</p>
            </div>

            {/* 統計卡片 */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">總評論數</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">待審核</div>
                    <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">已通過</div>
                    <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">已拒絕</div>
                    <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">垃圾評論</div>
                    <div className="text-2xl font-bold text-gray-600">{stats.spam}</div>
                </div>
            </div>

            {/* 過濾器 */}
            <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                    {(['ALL', 'PENDING', 'APPROVED', 'REJECTED', 'SPAM'] as const).map(status => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === status
                                ? 'bg-orange-500 text-white'
                                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                                }`}
                        >
                            {status === 'ALL' ? '全部' : statusLabels[status]}
                        </button>
                    ))}
                </div>
            </div>

            {/* 評論列表 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                {filteredComments.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                        沒有找到評論
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredComments.map(comment => (
                            <div key={comment.id} className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        {/* 評論者資訊 */}
                                        <div className="flex items-center space-x-2 mb-2">
                                            <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                                                <span className="text-orange-600 dark:text-orange-400 text-sm font-semibold">
                                                    {comment.user?.name?.[0] || comment.author?.name?.[0] || comment.guestName?.[0] || '?'}
                                                </span>
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900 dark:text-white">
                                                    {comment.user?.name || comment.author?.name || comment.guestName || '匿名用戶'}
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    {new Date(comment.createdAt).toLocaleString('zh-TW')}
                                                </div>
                                            </div>
                                        </div>

                                        {/* 評論內容 */}
                                        <div className="mb-3">
                                            <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                                        </div>

                                        {/* 文章資訊 */}
                                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                                            在文章：
                                            <a
                                                href={`/blog/${comment.post.slug}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-orange-600 dark:text-orange-400 hover:underline ml-1"
                                            >
                                                {comment.post.title}
                                            </a>
                                        </div>

                                        {/* 狀態標籤 */}
                                        <div className="flex items-center space-x-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[comment.status]}`}>
                                                {statusLabels[comment.status]}
                                            </span>
                                        </div>
                                    </div>

                                    {/* 操作按鈕 */}
                                    <div className="flex items-center space-x-2 ml-4">
                                        {comment.status !== 'APPROVED' && (
                                            <button
                                                onClick={() => updateCommentStatus(comment.id, 'APPROVED')}
                                                disabled={updating === comment.id}
                                                className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 disabled:opacity-50"
                                            >
                                                ✓ 通過
                                            </button>
                                        )}
                                        {comment.status !== 'REJECTED' && (
                                            <button
                                                onClick={() => updateCommentStatus(comment.id, 'REJECTED')}
                                                disabled={updating === comment.id}
                                                className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 disabled:opacity-50"
                                            >
                                                ✗ 拒絕
                                            </button>
                                        )}
                                        {comment.status !== 'SPAM' && (
                                            <button
                                                onClick={() => updateCommentStatus(comment.id, 'SPAM')}
                                                disabled={updating === comment.id}
                                                className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 disabled:opacity-50"
                                            >
                                                垃圾
                                            </button>
                                        )}
                                        <button
                                            onClick={() => deleteComment(comment.id)}
                                            disabled={updating === comment.id}
                                            className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 disabled:opacity-50"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
