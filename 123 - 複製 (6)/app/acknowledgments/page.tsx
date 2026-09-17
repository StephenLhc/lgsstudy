import Footer from "../../components/Footer";

export default function AcknowledgmentsPage() {
    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-800 dark:to-gray-900 py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        鳴謝
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                        感謝所有為樂研集平台貢獻心力的朋友們，沒有你們的支持就沒有今天的成果
                    </p>
                </div>
            </section>

            {/* 感謝詞 */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg mb-20">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                致謝詞
                            </h2>
                            <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
                        </div>

                        <div className="prose prose-lg dark:prose-invert mx-auto">
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-center">
                                「我栽種了，亞波羅澆灌了，惟有神叫他生長。」（哥林多前書 3:6）
                            </p>

                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                樂研集能夠成立並持續服事香港的基督徒群體，實在是神的恩典和眾多弟兄姊妹的愛心支持所成就的。
                                我們深深感謝每一位在這個平台建立過程中給予幫助、鼓勵和支持的朋友們。
                            </p>

                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                願神賜福每一位參與其中的同工，也願樂研集能夠成為神手中的器皿，
                                幫助更多人深入認識神的話語，在真理中得著生命的改變和成長。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 核心團隊感謝 */}
            <section className="bg-gray-50 dark:bg-gray-800 py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            核心團隊
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            感謝每一位無私奉獻的同工
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-white">李</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                李牧師
                            </h3>
                            <p className="text-orange-500 font-medium mb-3">
                                神學顧問
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                提供神學內容審核和指導，確保所有教導符合聖經真理。
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-white">陳</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                陳弟兄
                            </h3>
                            <p className="text-orange-500 font-medium mb-3">
                                技術開發
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                負責網站開發和維護，確保平台穩定運行和用戶體驗。
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-white">王</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                王姊妹
                            </h3>
                            <p className="text-orange-500 font-medium mb-3">
                                內容編輯
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                負責文章編輯和內容策劃，確保每篇文章的質量和可讀性。
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-white">張</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                張姊妹
                            </h3>
                            <p className="text-orange-500 font-medium mb-3">
                                視覺設計
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                負責網站視覺設計和用戶介面，創造美觀實用的使用體驗。
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-white">黃</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                黃弟兄
                            </h3>
                            <p className="text-orange-500 font-medium mb-3">
                                社群管理
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                負責社群媒體管理和用戶互動，建立活躍的學習社群。
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-white">林</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                林姊妹
                            </h3>
                            <p className="text-orange-500 font-medium mb-3">
                                禱告支持
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                負責組織禱告團隊，為平台和所有用戶代禱守望。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 協作夥伴 */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            協作夥伴
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            感謝與我們同行的教會和機構
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                香港聖經公會
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                提供聖經文本和翻譯資源
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                播道神學院
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                神學課程和師資支援
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                協作教會
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                各地方教會的內容分享
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                技術夥伴
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                提供技術平台和支援服務
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 特別感謝 */}
            <section className="bg-gray-50 dark:bg-gray-800 py-20">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            特別感謝
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            向以下的支持者獻上最誠摯的謝意
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                內容貢獻者
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                                感謝所有投稿作者和內容貢獻者，你們的分享豐富了平台的內容，
                                讓更多人能夠從中得到屬靈的餵養和造就。
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full text-sm">
                                    神學教授們
                                </span>
                                <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full text-sm">
                                    資深牧者
                                </span>
                                <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full text-sm">
                                    研經同工
                                </span>
                                <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full text-sm">
                                    平信徒領袖
                                </span>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                測試和回饋
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                                感謝beta測試用戶和早期使用者的寶貴意見，
                                你們的回饋幫助我們不斷改進平台的功能和使用體驗。
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                                    小組組長
                                </span>
                                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                                    主日學教師
                                </span>
                                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                                    青年導師
                                </span>
                                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                                    長者學員
                                </span>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                禱告支持
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                最重要的是，感謝所有為樂研集代禱的弟兄姊妹。
                                我們深信這個平台的建立和發展，都是在神的恩典和眾聖徒的禱告中成就的。
                                願神記念每一位代禱者的愛心和忠心。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 版權聲明 */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                            版權聲明
                        </h2>

                        <div className="space-y-6 text-gray-600 dark:text-gray-300">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                                    聖經經文
                                </h3>
                                <p className="leading-relaxed">
                                    除非另有說明，本網站使用的聖經經文皆出自《和合本聖經》，
                                    版權歸屬香港聖經公會。其他譯本經文均已獲得相關版權持有者的授權使用。
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                                    原創內容
                                </h3>
                                <p className="leading-relaxed">
                                    本網站的原創文章、研經材料和教學內容，版權歸樂研集所有。
                                    歡迎在註明出處的情況下分享和轉載，但請勿作商業用途。
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                                    第三方內容
                                </h3>
                                <p className="leading-relaxed">
                                    網站中引用的第三方內容、圖片和資源，版權歸原作者所有。
                                    如有版權疑問，請聯繫我們，我們將立即處理。
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                © 2024 樂研集 (Loveable Study Collection). 版權所有。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
