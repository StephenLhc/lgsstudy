'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function AuthError() {
    const searchParams = useSearchParams()
    const error = searchParams.get('error')

    const getErrorMessage = (error: string | null) => {
        switch (error) {
            case 'Configuration':
                return '服務器配置錯誤，請聯繫管理員。'
            case 'AccessDenied':
                return '拒絕存取。您可能沒有權限登入此應用程式。'
            case 'Verification':
                return '驗證連結已過期或無效。'
            case 'OAuthSignin':
                return 'OAuth 登入時發生錯誤。'
            case 'OAuthCallback':
                return 'OAuth 回調時發生錯誤。'
            case 'OAuthCreateAccount':
                return '建立 OAuth 帳戶時發生錯誤。'
            case 'EmailCreateAccount':
                return '建立電子郵件帳戶時發生錯誤。'
            case 'Callback':
                return '回調 URL 發生錯誤。'
            case 'OAuthAccountNotLinked':
                return '此電子郵件地址已與另一個帳戶關聯。請使用原始登入方式。'
            case 'EmailSignin':
                return '無法發送電子郵件。'
            case 'CredentialsSignin':
                return '登入失敗。請檢查您的憑證。'
            case 'SessionRequired':
                return '請先登入才能訪問此頁面。'
            default:
                return '登入時發生未知錯誤。請稍後再試。'
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                {/* Logo */}
                <div className="flex justify-center">
                    <Link href="/" className="flex items-center space-x-2">
                        <Image
                            src="/images/lgsLight.png"
                            width={48}
                            height={48}
                            alt="樂研集 logo"
                            priority
                        />
                        <div className="text-3xl text-gray-900 dark:text-white">
                            樂<span className="font-bold">研集</span>
                        </div>
                    </Link>
                </div>

                <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
                    登入錯誤
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-200 dark:border-gray-700">
                    {/* 錯誤圖示 */}
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                            <svg
                                className="w-8 h-8 text-red-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* 錯誤訊息 */}
                    <div className="text-center">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            登入失敗
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            {getErrorMessage(error)}
                        </p>
                    </div>

                    {/* 操作按鈕 */}
                    <div className="space-y-3">
                        <Link
                            href="/auth/signin"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
                        >
                            重新登入
                        </Link>

                        <Link
                            href="/"
                            className="w-full flex justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
                        >
                            返回首頁
                        </Link>
                    </div>

                    {/* 聯繫支援 */}
                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            如果問題持續發生，請{' '}
                            <Link href="/contact" className="text-orange-500 hover:text-orange-600">
                                聯繫我們
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
