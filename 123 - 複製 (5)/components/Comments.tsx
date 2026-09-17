'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { ChatBubbleLeftIcon, UserIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

interface User {
    id: string
    name: string
    image?: string
}

interface Author {
    id: string
    name: string
    avatar?: string
    title: string
}

interface Comment {
    id: string
    content: string
    createdAt: string
    guestName?: string
    user?: User
    author?: Author
    replies: Comment[]
}

interface CommentsProps {
    postId: string
    className?: string
}

export default function Comments({ postId, className = '' }: CommentsProps) {
    const { data: session } = useSession()
    const [comments, setComments] = useState<Comment[]>([])
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [newComment, setNewComment] = useState('')
    const [replyTo, setReplyTo] = useState<string | null>(null)
    const [replyContent, setReplyContent] = useState('')
    const [guestName, setGuestName] = useState('')
    const [guestEmail, setGuestEmail] = useState('')
    const [showCommentForm, setShowCommentForm] = useState(false)

    // 載入評論
    const fetchComments = useCallback(async () => {
        try {
            setLoading(true)
            const response = await fetch(`/api/posts/${postId}/comments`)
            if (response.ok) {
                const data = await response.json()
                setComments(data.comments)
            }
        } catch (error) {
            console.error('載入評論失敗:', error)
        } finally {
            setLoading(false)
        }
    }, [postId])

    useEffect(() => {
        fetchComments()
    }, [fetchComments])    // 提交評論
    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!newComment.trim()) {
            alert('請輸入評論內容')
            return
        }

        if (!session && (!guestName.trim() || !guestEmail.trim())) {
            alert('請填寫姓名和 Email')
            return
        }

        setSubmitting(true)
        try {
            const requestBody: { content: string; guestName?: string; guestEmail?: string } = {
                content: newComment.trim()
            }

            if (!session) {
                requestBody.guestName = guestName.trim()
                requestBody.guestEmail = guestEmail.trim()
            }

            const response = await fetch(`/api/posts/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })

            if (response.ok) {
                const data = await response.json()
                alert(data.message)
                setNewComment('')
                setGuestName('')
                setGuestEmail('')
                setShowCommentForm(false)

                // 重新載入評論
                fetchComments()
            } else {
                const error = await response.json()
                alert(error.error || '提交失敗')
            }
        } catch (error) {
            console.error('提交評論失敗:', error)
            alert('提交失敗，請稍後再試')
        } finally {
            setSubmitting(false)
        }
    }

    // 提交回覆
    const handleSubmitReply = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!replyContent.trim()) {
            alert('請輸入回覆內容')
            return
        }

        if (!session) {
            alert('請先登入後再回覆')
            return
        }

        setSubmitting(true)
        try {
            const response = await fetch(`/api/posts/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: replyContent.trim(),
                    parentId: replyTo
                })
            })

            if (response.ok) {
                const data = await response.json()
                alert(data.message)
                setReplyContent('')
                setReplyTo(null)

                // 重新載入評論
                fetchComments()
            } else {
                const error = await response.json()
                alert(error.error || '回覆失敗')
            }
        } catch (error) {
            console.error('回覆失敗:', error)
            alert('回覆失敗，請稍後再試')
        } finally {
            setSubmitting(false)
        }
    }

    // 渲染用戶頭像和名稱
    const renderUserInfo = (comment: Comment) => {
        if (comment.author) {
            return (
                <div className="flex items-center space-x-2">
                    {comment.author.avatar ? (
                        <Image
                            src={comment.author.avatar}
                            alt={comment.author.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                        />
                    ) : (
                        <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                            <UserIcon className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                        </div>
                    )}
                    <div>
                        <span className="font-medium text-gray-900 dark:text-white">
                            {comment.author.name}
                        </span>
                        <span className="ml-2 text-xs text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900 px-2 py-0.5 rounded">
                            {comment.author.title === 'PASTOR' ? '牧者' :
                                comment.author.title === 'SCHOLAR' ? '學者' :
                                    comment.author.title === 'THEOLOGIAN' ? '神學家' : '作者'}
                        </span>
                    </div>
                </div>
            )
        }

        if (comment.user) {
            return (
                <div className="flex items-center space-x-2">
                    {comment.user.image ? (
                        <Image
                            src={comment.user.image}
                            alt={comment.user.name || '用戶'}
                            width={32}
                            height={32}
                            className="rounded-full"
                        />
                    ) : (
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                            <UserIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                    )}
                    <span className="font-medium text-gray-900 dark:text-white">
                        {comment.user.name}
                    </span>
                </div>
            )
        }

        // 訪客評論
        return (
            <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <UserIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </div>
                <span className="font-medium text-gray-900 dark:text-white">
                    {comment.guestName}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">訪客</span>
            </div>
        )
    }

    // 渲染單個評論
    const renderComment = (comment: Comment, isReply = false) => (
        <div key={comment.id} className={`${isReply ? 'ml-8 border-l-2 border-gray-200 dark:border-gray-700 pl-4' : ''}`}>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start mb-3">
                    {renderUserInfo(comment)}
                    <div className="text-right">
                        <time className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(comment.createdAt).toLocaleDateString('zh-TW', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </time>
                    </div>
                </div>

                <div className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                    {comment.content}
                </div>

                {!isReply && session && (
                    <button
                        onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        {replyTo === comment.id ? '取消回覆' : '回覆'}
                    </button>
                )}

                {replyTo === comment.id && (
                    <form onSubmit={handleSubmitReply} className="mt-4">
                        <textarea
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            rows={3}
                            placeholder="輸入您的回覆..."
                            disabled={submitting}
                        />
                        <div className="flex justify-end space-x-2 mt-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setReplyTo(null)
                                    setReplyContent('')
                                }}
                                className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                                disabled={submitting}
                            >
                                取消
                            </button>
                            <button
                                type="submit"
                                disabled={submitting || !replyContent.trim()}
                                className="px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? '提交中...' : '回覆'}
                            </button>
                        </div>
                    </form>
                )}
            </div>

            {/* 渲染回覆 */}
            {comment.replies.length > 0 && (
                <div className="mt-4 space-y-4">
                    {comment.replies.map(reply => renderComment(reply, true))}
                </div>
            )}
        </div>
    )

    return (
        <div className={`${className}`}>
            {/* 評論標題和按鈕 */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                    <ChatBubbleLeftIcon className="w-6 h-6 mr-2" />
                    評論 ({comments.length})
                </h3>
                <button
                    onClick={() => setShowCommentForm(!showCommentForm)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    {showCommentForm ? '隱藏評論框' : '發表評論'}
                </button>
            </div>

            {/* 評論表單 */}
            {showCommentForm && (
                <form onSubmit={handleSubmitComment} className="mb-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        發表評論
                    </h4>

                    {!session && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <input
                                type="text"
                                value={guestName}
                                onChange={(e) => setGuestName(e.target.value)}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="您的姓名 *"
                                disabled={submitting}
                                required
                            />
                            <input
                                type="email"
                                value={guestEmail}
                                onChange={(e) => setGuestEmail(e.target.value)}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="您的 Email *"
                                disabled={submitting}
                                required
                            />
                        </div>
                    )}

                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        rows={5}
                        placeholder={session ? "分享您的想法..." : "分享您的想法...（訪客評論需要審核）"}
                        disabled={submitting}
                        maxLength={1000}
                    />

                    <div className="flex justify-between items-center mt-4">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {newComment.length}/1000 字
                        </span>
                        <div className="flex space-x-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowCommentForm(false)
                                    setNewComment('')
                                    setGuestName('')
                                    setGuestEmail('')
                                }}
                                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                                disabled={submitting}
                            >
                                取消
                            </button>
                            <button
                                type="submit"
                                disabled={submitting || !newComment.trim() || (!session && (!guestName.trim() || !guestEmail.trim()))}
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {submitting ? '發布中...' : '發布評論'}
                            </button>
                        </div>
                    </div>
                </form>
            )}

            {/* 評論列表 */}
            {loading ? (
                <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">載入評論中...</p>
                </div>
            ) : comments.length === 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <ChatBubbleLeftIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>還沒有評論，來發表第一個評論吧！</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {comments.map(comment => renderComment(comment))}
                </div>
            )}
        </div>
    )
}
