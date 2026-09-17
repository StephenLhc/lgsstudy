import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function OtherPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800">

            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-bible-old/20 to-bible-new/20"></div>
                <div className="relative container mx-auto px-4 lg:px-8 py-20">
                    <div className="text-center">
                        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                            其他<span className="text-bible-old dark:text-bible-old/80">資源</span>
                        </h1>
                        <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            本頁收錄各類聖經工具、推薦網站、信仰生活資源，助你更全面認識聖經
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 lg:px-8 py-16">
                {/* Bible Study Tools */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                        聖經研讀工具
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 p-6 hover:shadow-large transition-all duration-300 hover:-translate-y-2">
                            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🔍</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">聖經查詢</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                                快速搜尋經文、關鍵字、主題索引
                            </p>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                                    <span className="text-gray-600 dark:text-gray-400">章節導覽</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                                    <span className="text-gray-600 dark:text-gray-400">關鍵字搜尋</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                                    <span className="text-gray-600 dark:text-gray-400">主題分類</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 p-6 hover:shadow-large transition-all duration-300 hover:-translate-y-2">
                            <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">📚</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">註釋資源</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                                多種聖經註釋和釋經資料
                            </p>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-secondary-500 rounded-full"></span>
                                    <span className="text-gray-600 dark:text-gray-400">歷史背景</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-secondary-500 rounded-full"></span>
                                    <span className="text-gray-600 dark:text-gray-400">文化脈絡</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-secondary-500 rounded-full"></span>
                                    <span className="text-gray-600 dark:text-gray-400">神學解釋</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 p-6 hover:shadow-large transition-all duration-300 hover:-translate-y-2">
                            <div className="w-16 h-16 bg-bible-gospel/20 dark:bg-bible-gospel/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🗺️</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">地圖資源</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                                聖經時代地理和歷史地圖
                            </p>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-bible-gospel rounded-full"></span>
                                    <span className="text-gray-600 dark:text-gray-400">古代地圖</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-bible-gospel rounded-full"></span>
                                    <span className="text-gray-600 dark:text-gray-400">旅程路線</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-bible-gospel rounded-full"></span>
                                    <span className="text-gray-600 dark:text-gray-400">城市位置</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recommended Websites */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                        推薦網站
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 p-8">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                聖經資源網站
                            </h3>
                            <div className="space-y-4">
                                <a href="#" className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                                            <span className="text-blue-600 dark:text-blue-400">🌐</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white">Bible Gateway</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">多語言聖經版本和搜尋工具</p>
                                        </div>
                                    </div>
                                </a>
                                <a href="#" className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                                            <span className="text-green-600 dark:text-green-400">📖</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white">Blue Letter Bible</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">希伯來文和希臘文研究工具</p>
                                        </div>
                                    </div>
                                </a>
                                <a href="#" className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                                            <span className="text-purple-600 dark:text-purple-400">🎯</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white">Bible Study Tools</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">註釋、字典和研讀資源</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 p-8">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                信仰生活資源
                            </h3>
                            <div className="space-y-4">
                                <a href="#" className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                                            <span className="text-orange-600 dark:text-orange-400">🙏</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white">禱告資源</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">禱告文、靈修材料和默想指引</p>
                                        </div>
                                    </div>
                                </a>
                                <a href="#" className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                                            <span className="text-red-600 dark:text-red-400">👨‍👩‍👧‍👦</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white">家庭靈修</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">家庭崇拜和兒童聖經教育</p>
                                        </div>
                                    </div>
                                </a>
                                <a href="#" className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
                                            <span className="text-yellow-600 dark:text-yellow-400">🎵</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white">敬拜音樂</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">詩歌、敬拜音樂和靈修音樂</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* External Links */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 p-8 lg:p-12">
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                        外部連結
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🏛️</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">教會資源</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">教會管理和牧養資源</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🎓</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">神學教育</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">神學院和培訓課程</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-bible-gospel/20 dark:bg-bible-gospel/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">📱</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">手機應用</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">聖經和靈修手機應用</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-bible-new/20 dark:bg-bible-new/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">📺</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">媒體資源</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">基督教電視和廣播節目</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
