'use client'

import { useEffect } from 'react'

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Global error:', error)
    }, [error])

    return (
        <html>
            <body>
                <div className="min-h-screen flex items-center justify-center bg-red-50">
                    <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 border border-red-200">
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4">
                                <svg
                                    className="w-16 h-16 text-red-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-red-900 mb-2">
                                系統錯誤
                            </h2>
                            <p className="text-red-700 mb-6">
                                應用程式發生嚴重錯誤，請重新載入頁面或聯繫管理員。
                            </p>
                            <button
                                onClick={reset}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
                            >
                                重新載入
                            </button>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    )
}