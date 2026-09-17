import Footer from "@/components/Footer";

export default function ThanksPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800">

            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-bible-gospel/20 to-bible-new/20"></div>
                <div className="relative container mx-auto px-4 lg:px-8 py-20">
                    <div className="text-center">
                        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                            鳴<span className="text-bible-gospel dark:text-bible-gospel/80">謝</span>
                        </h1>
                        <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            感謝所有支持樂研集的朋友、作者、技術團隊及合作夥伴，讓這個平台得以成長
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 lg:px-8 py-16">
                {/* Content Contributors */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                        內容貢獻者
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 p-8 text-center hover:shadow-large transition-all duration-300 hover:-translate-y-2">
                            <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl">👨‍💼</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">牧者團隊</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                提供神學指導和牧養關懷，確保內容的準確性和實用性
                            </p>
                            <div className="text-sm text-primary-600 dark:text-primary-400">
                                張牧師、李牧師、王牧師
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 p-8 text-center hover:shadow-large transition-all duration-300 hover:-translate-y-2">
                            <div className="w-20 h-20 bg-secondary-100 dark:bg-secondary-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl">👩‍🎓</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">學者專家</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                深入聖經研究和學術探討，提供專業的釋經和神學分析
                            </p>
                            <div className="text-sm text-secondary-600 dark:text-secondary-400">
                                陳教授、劉博士、黃學者
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 p-8 text-center hover:shadow-large transition-all duration-300 hover:-translate-y-2">
                            <div className="w-20 h-20 bg-bible-old/20 dark:bg-bible-old/30 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl">✍️</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">專欄作家</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                分享個人信仰經歷和靈修心得，豐富平台內容的多樣性
                            </p>
                            <div className="text-sm text-bible-old dark:text-bible-old/80">
                                林姊妹、吳弟兄、鄭姊妹
                            </div>
                        </div>
                    </div>
                </div>

                {/* Technical Support */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                        技術支援
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 p-8">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                開發團隊
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                                        <span className="text-blue-600 dark:text-blue-400">💻</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">前端開發</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Next.js 15 + React + TypeScript</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                                        <span className="text-green-600 dark:text-green-400">🗄️</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">後端服務</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Supabase + Prisma + PostgreSQL</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                                        <span className="text-purple-600 dark:text-purple-400">🎨</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">UI/UX 設計</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Tailwind CSS + 高齡友善設計</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 p-8">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                技術顧問
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                                        <span className="text-orange-600 dark:text-orange-400">🔒</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">安全顧問</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">網絡安全與數據保護</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                                        <span className="text-red-600 dark:text-red-400">📱</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">移動端顧問</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">響應式設計與移動體驗</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                    <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
                                        <span className="text-yellow-600 dark:text-yellow-400">♿</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">無障礙顧問</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">高齡友善與無障礙設計</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Community Partners */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 p-8 lg:p-12">
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                        社群夥伴
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🏛️</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">教會夥伴</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">提供場地、資源和人力支持</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🎓</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">神學院</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">學術資源和專業指導</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-bible-gospel/20 dark:bg-bible-gospel/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">📚</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">出版社</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">書籍和教材資源</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-bible-new/20 dark:bg-bible-new/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🤝</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">志願者</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">無私奉獻時間和精力</p>
                        </div>
                    </div>
                </div>

                {/* Special Thanks */}
                <div className="mt-20 text-center">
                    <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 lg:p-12 text-white">
                        <h2 className="text-3xl font-bold mb-6">
                            特別鳴謝
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            感謝每一位使用樂研集的朋友，你們的支持是我們前進的動力
                        </p>
                        <div className="text-2xl mb-4">🙏</div>
                        <p className="text-lg opacity-80">
                            願神賜福給每一位參與這個平台的同工和朋友
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
