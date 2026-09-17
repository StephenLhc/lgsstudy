"use client";

import { useState } from "react";
import Image from "next/image";

interface Comment {
    id: string;
    content: string;
    author: {
        id: string;
        name: string;
        avatar?: string;
    };
    createdAt: string;
    isApproved: boolean;
    isReported: boolean;
    likeCount: number;
    replies?: Comment[];
    level: number; // 評論層級：0=頂層，1=一級回覆，2=二級回覆
}

interface CommentSystemProps {
    postId: string;
    comments: Comment[];
    onCommentSubmit: (content: string, parentId?: string) => void;
    onCommentLike: (commentId: string) => void;
    onCommentReply: (commentId: string) => void;
    onCommentReport: (commentId: string) => void;
}

export default function CommentSystem({
    postId,
    comments,
    onCommentSubmit,
    onCommentLike,
    onCommentReply,
    onCommentReport
}: CommentSystemProps) {
    const [newComment, setNewComment] = useState("");
    const [replyTo, setReplyTo] = useState<string | null>(null);
    const [replyContent, setReplyContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmitComment = async () => {
        if (!newComment.trim()) return;

        setIsSubmitting(true);
        try {
            await onCommentSubmit(newComment);
            setNewComment("");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmitReply = async (parentId: string) => {
        if (!replyContent.trim()) return;

        setIsSubmitting(true);
        try {
            await onCommentSubmit(replyContent, parentId);
            setReplyContent("");
            setReplyTo(null);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancelReply = () => {
        setReplyTo(null);
        setReplyContent("");
    };

    const renderComment = (comment: Comment) => {
        const canReply = comment.level < 2; // 最多三層嵌套

        return (
            <div key={comment.id} className={`border-l-4 ${comment.level === 0 ? 'border-primary-500' : comment.level === 1 ? 'border-secondary-500' : 'border-bible-gospel'} pl-4 mb-6`}>
                <div className="flex items-start space-x-3">
                    {/* 用戶頭像 */}
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-100 dark:bg-primary-900/20 flex-shrink-0">
                        {comment.author.avatar ? (
                            <Image
                                src={comment.author.avatar}
                                alt={comment.author.name}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-primary-600 dark:text-primary-400">
                                👤
                            </div>
                        )}
                    </div>

                    {/* 評論內容 */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                            <span className="font-semibold text-gray-900 dark:text-white">
                                {comment.author.name}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {new Date(comment.createdAt).toLocaleDateString('zh-TW')}
                            </span>

                            {/* 審核狀態標籤 */}
                            {!comment.isApproved && (
                                <span className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded-full">
                                    待審核
                                </span>
                            )}

                            {comment.isReported && (
                                <span className="px-2 py-1 text-xs bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded-full">
                                    已舉報
                                </span>
                            )}
                        </div>

                        {/* 評論文字 */}
                        <div className={`text-gray-700 dark:text-gray-300 mb-3 ${!comment.isApproved ? 'opacity-60' : ''}`}>
                            {comment.content}
                        </div>

                        {/* 互動按鈕 */}
                        <div className="flex items-center space-x-4 text-sm">
                            <button
                                onClick={() => onCommentLike(comment.id)}
                                className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                            >
                                <span>👍</span>
                                <span>{comment.likeCount}</span>
                            </button>

                            {canReply && (
                                <button
                                    onClick={() => setReplyTo(comment.id)}
                                    className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                                >
                                    <span>💬</span>
                                    <span>回覆</span>
                                </button>
                            )}

                            <button
                                onClick={() => onCommentReport(comment.id)}
                                className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                            >
                                <span>🚨</span>
                                <span>舉報</span>
                            </button>
                        </div>

                        {/* 回覆表單 */}
                        {replyTo === comment.id && (
                            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                <textarea
                                    value={replyContent}
                                    onChange={(e) => setReplyContent(e.target.value)}
                                    placeholder={`回覆 ${comment.author.name}...`}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-600 dark:text-white transition-colors resize-none"
                                />
                                <div className="flex items-center space-x-2 mt-3">
                                    <button
                                        onClick={() => handleSubmitReply(comment.id)}
                                        disabled={isSubmitting || !replyContent.trim()}
                                        className="px-4 py-2 bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? "發送中..." : "發送回覆"}
                                    </button>
                                    <button
                                        onClick={handleCancelReply}
                                        className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-700"
                                    >
                                        取消
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* 子評論 */}
                        {comment.replies && comment.replies.length > 0 && (
                            <div className="mt-4 space-y-4">
                                {comment.replies.map((reply) => (
                                    <div key={reply.id} className="ml-6">
                                        {renderComment(reply)}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                評論區 ({comments.length})
            </h3>

            {/* 發表評論表單 */}
            <div className="mb-8">
                <div className="flex items-start space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-100 dark:bg-primary-900/20 flex-shrink-0">
                        <div className="w-full h-full flex items-center justify-center text-primary-600 dark:text-primary-400">
                            👤
                        </div>
                    </div>
                    <div className="flex-1">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="分享您的想法..."
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors resize-none"
                        />
                        <div className="flex justify-between items-center mt-3">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                評論將經過審核後顯示
                            </span>
                            <button
                                onClick={handleSubmitComment}
                                disabled={isSubmitting || !newComment.trim()}
                                className="bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white font-semibold py-2 px-6 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "發送中..." : "發表評論"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 評論列表 */}
            <div className="space-y-6">
                {comments.length > 0 ? (
                    comments.map((comment) => renderComment(comment))
                ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <div className="text-4xl mb-4">💬</div>
                        <p>還沒有評論，來發表第一個評論吧！</p>
                    </div>
                )}
            </div>

            {/* 評論指南 */}
            <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    💡 評論指南
                </h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• 保持友善和尊重的態度</li>
                    <li>• 評論將經過人工審核後顯示</li>
                    <li>• 支援最多三層嵌套回覆</li>
                    <li>• 如發現不當內容，請使用舉報功能</li>
                </ul>
            </div>
        </div>
    );
}
