'use client'

import { useState } from 'react'
import { ShareIcon } from '@heroicons/react/24/outline'

interface ShareButtonProps {
    postId: string
    title: string
    className?: string
}

export default function ShareButton({ postId, title, className = '' }: ShareButtonProps) {
    const [showShareMenu, setShowShareMenu] = useState(false)    // 獲取當前頁面 URL
    const getShareUrl = () => {
        if (typeof window !== 'undefined') {
            return `${window.location.origin}/blog/${postId}`
        }
        return ''
    }

    // 記錄分享行為
    const trackShare = async (platform: string) => {
        try {
            await fetch(`/api/posts/${postId}/share`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ platform })
            })
        } catch (error) {
            console.error('記錄分享失敗:', error)
        }
    }

    // 分享到不同平台
    const shareToWhatsApp = () => {
        const url = getShareUrl()
        const text = encodeURIComponent(`${title} - ${url}`)
        window.open(`https://wa.me/?text=${text}`, '_blank')
        trackShare('WHATSAPP')
        setShowShareMenu(false)
    }

    const shareToFacebook = () => {
        const url = getShareUrl()
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
        trackShare('FACEBOOK')
        setShowShareMenu(false)
    }

    const shareToTelegram = () => {
        const url = getShareUrl()
        const text = encodeURIComponent(`${title} - ${url}`)
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${text}`, '_blank')
        trackShare('TELEGRAM')
        setShowShareMenu(false)
    }

    const shareViaEmail = () => {
        const url = getShareUrl()
        const subject = encodeURIComponent(`推薦文章：${title}`)
        const body = encodeURIComponent(`我想與您分享這篇文章：\n\n${title}\n\n${url}`)
        window.open(`mailto:?subject=${subject}&body=${body}`)
        trackShare('EMAIL')
        setShowShareMenu(false)
    }

    const copyLink = async () => {
        const url = getShareUrl()
        try {
            await navigator.clipboard.writeText(url)
            alert('連結已複製到剪貼簿')
            trackShare('COPY_LINK')
            setShowShareMenu(false)
        } catch (error) {
            console.error('複製連結失敗:', error)
            alert('複製失敗，請手動複製')
        }
    }

    return (
        <div className="relative">
            <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className={`
          flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-200
          text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 
          hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:scale-105
          ${className}
        `}
                title="分享文章"
            >
                <ShareIcon className="w-5 h-5" />
                <span className="text-sm font-medium">分享</span>
            </button>

            {showShareMenu && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                    <div className="py-2">
                        <button
                            onClick={shareToWhatsApp}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-3"
                        >
                            <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
                                <span className="text-white text-xs font-bold">W</span>
                            </div>
                            <span>WhatsApp</span>
                        </button>

                        <button
                            onClick={shareToFacebook}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-3"
                        >
                            <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                                <span className="text-white text-xs font-bold">f</span>
                            </div>
                            <span>Facebook</span>
                        </button>

                        <button
                            onClick={shareToTelegram}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-3"
                        >
                            <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center">
                                <span className="text-white text-xs font-bold">T</span>
                            </div>
                            <span>Telegram</span>
                        </button>

                        <button
                            onClick={shareViaEmail}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-3"
                        >
                            <div className="w-5 h-5 bg-gray-500 rounded flex items-center justify-center">
                                <span className="text-white text-xs font-bold">@</span>
                            </div>
                            <span>Email</span>
                        </button>

                        <hr className="my-1 border-gray-200 dark:border-gray-700" />

                        <button
                            onClick={copyLink}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-3"
                        >
                            <div className="w-5 h-5 bg-gray-400 rounded flex items-center justify-center">
                                <span className="text-white text-xs font-bold">📋</span>
                            </div>
                            <span>複製連結</span>
                        </button>
                    </div>
                </div>
            )}

            {/* 點擊外部關閉選單 */}
            {showShareMenu && (
                <div
                    className="fixed inset-0 z-0"
                    onClick={() => setShowShareMenu(false)}
                />
            )}
        </div>
    )
}
