'use client'

import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function SignIn() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [testCredentials, setTestCredentials] = useState({
        username: '',
        password: ''
    })
    const [testLoginError, setTestLoginError] = useState('')

    useEffect(() => {
        // 檢查用戶是否已經登入
        const checkSession = async () => {
            const session = await getSession()
            if (session) {
                router.push('/')
            }
        }
        checkSession()
    }, [router])

    const handleGoogleSignIn = async () => {
        setIsLoading(true)
        try {
            await signIn('google', { callbackUrl: '/' })
        } catch (error) {
            console.error('Google 登入錯誤:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleMicrosoftSignIn = async () => {
        setIsLoading(true)
        try {
            await signIn('azure-ad', { callbackUrl: '/' })
        } catch (error) {
            console.error('Microsoft 登入錯誤:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleTestLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setTestLoginError('')

        // 添加調試信息
        console.log('開始登入嘗試:', {
            username: testCredentials.username,
            password: testCredentials.password,
            usernameLength: testCredentials.username.length,
            passwordLength: testCredentials.password.length
        })

        try {
            const result = await signIn('credentials', {
                username: testCredentials.username,
                password: testCredentials.password,
                redirect: false,
            })

            console.log('登入結果:', result)

            if (result?.error) {
                setTestLoginError(`登入失敗，請檢查您的用戶名和密碼。錯誤: ${result.error}`)
            } else if (result?.ok) {
                console.log('登入成功，準備重定向')
                router.push('/')
            } else {
                setTestLoginError('登入過程中發生未知錯誤')
            }
        } catch (error) {
            console.error('測試帳戶登入錯誤:', error)
            setTestLoginError('登入過程中發生錯誤')
        } finally {
            setIsLoading(false)
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
                    登入您的帳戶
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                    開始您的聖經研讀之旅
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-200 dark:border-gray-700">

                    {/* 測試帳戶登入表單 */}
                    <div className="mb-8">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 text-center">
                            測試帳戶登入
                        </h3>
                        <form onSubmit={handleTestLogin} className="space-y-4">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    用戶名
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    required
                                    value={testCredentials.username}
                                    onChange={(e) => setTestCredentials(prev => ({ ...prev, username: e.target.value }))}
                                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                    placeholder="請輸入用戶名 (提示: 123)"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    密碼
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    value={testCredentials.password}
                                    onChange={(e) => setTestCredentials(prev => ({ ...prev, password: e.target.value }))}
                                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                    placeholder="請輸入密碼 (提示: abc123)"
                                />
                            </div>
                            {testLoginError && (
                                <div className="text-red-600 dark:text-red-400 text-sm text-center">
                                    {testLoginError}
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {isLoading ? '登入中...' : '登入測試帳戶'}
                            </button>
                        </form>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                                或使用第三方登入
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 space-y-4">
                        {/* Google 登入按鈕 */}
                        <button
                            onClick={handleGoogleSignIn}
                            disabled={isLoading}
                            className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            {isLoading ? '登入中...' : '使用 Google 登入'}
                        </button>

                        {/* Microsoft 登入按鈕 */}
                        <button
                            onClick={handleMicrosoftSignIn}
                            disabled={isLoading}
                            className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                                <path fill="#f25022" d="M1 1h10v10H1z" />
                                <path fill="#00a4ef" d="M13 1h10v10H13z" />
                                <path fill="#7fba00" d="M1 13h10v10H1z" />
                                <path fill="#ffb900" d="M13 13h10v10H13z" />
                            </svg>
                            {isLoading ? '登入中...' : '使用 Microsoft 登入'}
                        </button>
                    </div>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                                    安全登入
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            登入即表示您同意我們的{' '}
                            <Link href="/privacy" className="text-orange-500 hover:text-orange-600">
                                隱私政策
                            </Link>{' '}
                            和{' '}
                            <Link href="/terms" className="text-orange-500 hover:text-orange-600">
                                服務條款
                            </Link>
                        </p>
                    </div>
                </div>

                {/* 返回首頁連結 */}
                <div className="mt-6 text-center">
                    <Link
                        href="/"
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors"
                    >
                        ← 返回首頁
                    </Link>
                </div>
            </div>
        </div>
    )
}
