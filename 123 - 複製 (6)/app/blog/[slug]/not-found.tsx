import Link from 'next/link';
import Footer from '../../../components/Footer';

export default function NotFound() {
    return (
        <div>
            <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-lg border border-gray-100 dark:border-gray-700">
                        {/* 404 圖示 */}
                        <div className="mb-8">
                            <div className="w-24 h-24 mx-auto bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                                <svg
                                    className="w-12 h-12 text-orange-500"
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

                        {/* 標題 */}
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            找不到文章
                        </h1>

                        {/* 描述 */}
                        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                            很抱歉，您所尋找的聖經研讀文章不存在或已被移除。
                        </p>

                        {/* 建議 */}
                        <div className="space-y-4 mb-8">
                            <p className="text-gray-500 dark:text-gray-500">
                                您可以嘗試：
                            </p>
                            <ul className="text-gray-600 dark:text-gray-400 space-y-2">
                                <li>• 檢查網址是否正確</li>
                                <li>• 瀏覽所有聖經研讀文章</li>
                                <li>• 回到首頁探索其他內容</li>
                            </ul>
                        </div>

                        {/* 操作按鈕 */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/blog"
                                className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
                            >
                                瀏覽所有文章
                            </Link>
                            <Link
                                href="/"
                                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            >
                                回到首頁
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
