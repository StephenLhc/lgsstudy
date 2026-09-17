'use client';

import { useSession } from 'next-auth/react';
import LikeButton from './LikeButton';
import BookmarkButton from './BookmarkButton';
import ShareButton from './ShareButton';

interface FloatingInteractionsProps {
    postId: string;
    title: string;
}

export function FloatingInteractions({ postId, title }: FloatingInteractionsProps) {
    const { data: session } = useSession();

    if (!session) return null;

    return (
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 p-2">
                <div className="flex flex-col items-center space-y-3">
                    <LikeButton postId={postId} />
                    <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
                    <BookmarkButton postId={postId} />
                    <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
                    <ShareButton postId={postId} title={title} />
                </div>
            </div>
        </div>
    );
}
