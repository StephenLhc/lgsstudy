import Footer from "../../components/Footer";

export default function OtherPage() {
    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-800 dark:to-gray-900 py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        其他資源
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                        探索更多聖經研讀工具、外部資源和有用連結，豐富你的靈性成長之旅
                    </p>
                </div>
            </section>

            {/* 主要資源分類 */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4">

                    {/* 聖經工具 */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                            聖經研讀工具
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                    聖經字典
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    收錄聖經中重要詞彙、人物、地名的詳細解釋，幫助深入理解經文含義。
                                </p>
                                <a href="#" className="text-orange-500 hover:text-orange-600 font-medium">
                                    瀏覽字典 →
                                </a>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                    經文對照表
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    提供不同中文聖經譯本的經文對照，包括和合本、新譯本、現代中文譯本等。
                                </p>
                                <a href="#" className="text-orange-500 hover:text-orange-600 font-medium">
                                    查看對照 →
                                </a>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                    讀經計劃
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    提供多種讀經計劃，幫助你有系統地閱讀和研讀聖經，建立穩定的靈修習慣。
                                </p>
                                <a href="#" className="text-orange-500 hover:text-orange-600 font-medium">
                                    選擇計劃 →
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* 外部連結 */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                            推薦網站連結
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">

                            {/* 聖經資源 */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                                    聖經資源
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium text-gray-900 dark:text-white">信望愛聖經工具</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">提供多種聖經工具和資源</p>
                                        </div>
                                        <a href="https://bible.fhl.net" target="_blank" rel="noopener noreferrer" title="前往信望愛聖經工具" className="text-orange-500 hover:text-orange-600">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </a>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium text-gray-900 dark:text-white">Blue Letter Bible</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">英文聖經研讀工具</p>
                                        </div>
                                        <a href="https://www.blueletterbible.org" target="_blank" rel="noopener noreferrer" title="前往 Blue Letter Bible" className="text-orange-500 hover:text-orange-600">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </a>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium text-gray-900 dark:text-white">Bible Gateway</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">多語言聖經閱讀平台</p>
                                        </div>
                                        <a href="https://www.biblegateway.com" target="_blank" rel="noopener noreferrer" title="前往 Bible Gateway" className="text-orange-500 hover:text-orange-600">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* 香港教會機構 */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                                    香港教會機構
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium text-gray-900 dark:text-white">香港聖經公會</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">聖經翻譯與推廣</p>
                                        </div>
                                        <a href="https://www.hkbs.org.hk" target="_blank" rel="noopener noreferrer" title="前往香港聖經公會" className="text-orange-500 hover:text-orange-600">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </a>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium text-gray-900 dark:text-white">播道神學院</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">神學教育與培訓</p>
                                        </div>
                                        <a href="https://www.evangel.edu.hk" target="_blank" rel="noopener noreferrer" title="前往播道神學院" className="text-orange-500 hover:text-orange-600">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </a>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium text-gray-900 dark:text-white">香港教會更新運動</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">教會發展與更新</p>
                                        </div>
                                        <a href="https://www.hkchurch.org" target="_blank" rel="noopener noreferrer" title="前往香港教會更新運動" className="text-orange-500 hover:text-orange-600">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 應用程式推薦 */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                            推薦應用程式
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">YouVersion</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    全球最受歡迎的聖經應用程式，提供多種語言版本和讀經計劃。
                                </p>
                                <div className="flex space-x-2 justify-center">
                                    <a href="#" className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition-colors">
                                        App Store
                                    </a>
                                    <a href="#" className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors">
                                        Google Play
                                    </a>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Logos</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    專業的聖經研讀軟體，提供豐富的註釋書和研經工具。
                                </p>
                                <div className="flex space-x-2 justify-center">
                                    <a href="#" className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition-colors">
                                        App Store
                                    </a>
                                    <a href="#" className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors">
                                        Google Play
                                    </a>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">PrayerMate</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    幫助你建立有組織的代禱生活，記錄禱告事項和感恩內容。
                                </p>
                                <div className="flex space-x-2 justify-center">
                                    <a href="#" className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition-colors">
                                        App Store
                                    </a>
                                    <a href="#" className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors">
                                        Google Play
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 學習資源 */}
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                            學習資源
                        </h2>
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-800 dark:to-gray-900 p-8 rounded-xl">
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">免費課程</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        提供基礎聖經研讀課程
                                    </p>
                                </div>

                                <div className="text-center">
                                    <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">研經工具</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        各種實用的研經方法
                                    </p>
                                </div>

                                <div className="text-center">
                                    <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">小組討論</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        小組研經指南與材料
                                    </p>
                                </div>

                                <div className="text-center">
                                    <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">經文背誦</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        系統化背誦計劃
                                    </p>
                                </div>
                            </div>

                            <div className="text-center mt-8">
                                <a href="/contact" className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors">
                                    申請更多資源
                                    <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
