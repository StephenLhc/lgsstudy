'use client'

import LikeButton from './LikeButton'
import BookmarkButton from './BookmarkButton'
import ShareButton from './ShareButton'
import Comments from './Comments'

interface PostInteractionsProps {
    postId: string
    postTitle: string
    showComments?: boolean
    className?: string
}

export default function PostInteractions({
    postId,
    postTitle,
    showComments = true,
    className = ''
}: PostInteractionsProps) {
    return (
        <div className={`${className}`}>
            {/* 互動按鈕區域 */}
            <div className="flex flex-wrap items-center gap-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-4">
                    <LikeButton postId={postId} />
                    <BookmarkButton postId={postId} />
                    <ShareButton postId={postId} title={postTitle} />
                </div>

                <div className="flex-1" />

                <div className="text-sm text-gray-500 dark:text-gray-400">
                    覺得這篇文章有幫助嗎？分享給更多人吧！
                </div>
            </div>

            {/* 評論區域 */}
            {showComments && (
                <div className="mt-8">
                    <Comments postId={postId} />
                </div>
            )}
        </div>
    )
}
