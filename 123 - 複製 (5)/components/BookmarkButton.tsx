'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { BookmarkIcon } from '@heroicons/react/24/outline'
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid'

interface BookmarkButtonProps {
    postId: string
    className?: string
}

export default function BookmarkButton({ postId, className = '' }: BookmarkButtonProps) {
    const { data: session } = useSession()
    const [bookmarked, setBookmarked] = useState(false)
    const [loading, setLoading] = useState(false)

    // 載入收藏狀態
    useEffect(() => {
        const fetchBookmarkStatus = async () => {
            try {
                const response = await fetch(`/api/posts/${postId}/bookmark`)
                if (response.ok) {
                    const data = await response.json()
                    setBookmarked(data.bookmarked)
                }
            } catch (error) {
                console.error('載入收藏狀態失敗:', error)
            }
        }

        if (session) {
            fetchBookmarkStatus()
        }
    }, [postId, session])

    // 處理收藏
    const handleBookmark = async () => {
        if (!session) {
            // 未登入用戶提示登入
            alert('請先登入後再收藏')
            return
        }

        if (loading) return

        setLoading(true)
        try {
            const response = await fetch(`/api/posts/${postId}/bookmark`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.ok) {
                const data = await response.json()
                setBookmarked(data.bookmarked)

                // 顯示操作結果
                if (data.message) {
                    // 可以使用 toast 通知，這裡先用 alert
                    alert(data.message)
                }
            } else {
                const error = await response.json()
                alert(error.error || '操作失敗')
            }
        } catch (error) {
            console.error('收藏操作失敗:', error)
            alert('操作失敗，請稍後再試')
        } finally {
            setLoading(false)
        }
    }

    return (
        <button
            onClick={handleBookmark}
            disabled={loading}
            className={`
        flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-200
        ${bookmarked
                    ? 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20'
                    : 'text-gray-600 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                }
        ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
        ${className}
      `}
            title={bookmarked ? '取消收藏' : '收藏文章'}
        >
            {bookmarked ? (
                <BookmarkSolidIcon className="w-5 h-5" />
            ) : (
                <BookmarkIcon className="w-5 h-5" />
            )}
            <span className="text-sm font-medium">
                {bookmarked ? '已收藏' : '收藏'}
            </span>
            {loading && (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            )}
        </button>
    )
}
