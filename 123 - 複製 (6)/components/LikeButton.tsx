'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

interface LikeButtonProps {
    postId: string
    className?: string
}

export default function LikeButton({ postId, className = '' }: LikeButtonProps) {
    const { data: session } = useSession()
    const [liked, setLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(0)
    const [loading, setLoading] = useState(false)

    // 載入點讚狀態
    useEffect(() => {
        const fetchLikeStatus = async () => {
            try {
                const response = await fetch(`/api/posts/${postId}/like`)
                if (response.ok) {
                    const data = await response.json()
                    setLiked(data.liked)
                    setLikeCount(data.likeCount)
                }
            } catch (error) {
                console.error('載入點讚狀態失敗:', error)
            }
        }

        fetchLikeStatus()
    }, [postId])

    // 處理點讚
    const handleLike = async () => {
        if (!session) {
            // 未登入用戶提示登入
            alert('請先登入後再點讚')
            return
        }

        if (loading) return

        setLoading(true)
        try {
            const response = await fetch(`/api/posts/${postId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.ok) {
                const data = await response.json()
                setLiked(data.liked)
                setLikeCount(data.likeCount)
            } else {
                const error = await response.json()
                alert(error.error || '操作失敗')
            }
        } catch (error) {
            console.error('點讚操作失敗:', error)
            alert('操作失敗，請稍後再試')
        } finally {
            setLoading(false)
        }
    }

    return (
        <button
            onClick={handleLike}
            disabled={loading}
            className={`
        flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-200
        ${liked
                    ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
                    : 'text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
                }
        ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
        ${className}
      `}
            title={liked ? '取消點讚' : '點讚'}
        >
            {liked ? (
                <HeartSolidIcon className="w-5 h-5" />
            ) : (
                <HeartIcon className="w-5 h-5" />
            )}
            <span className="text-sm font-medium">{likeCount}</span>
            {loading && (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            )}
        </button>
    )
}
