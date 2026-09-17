import Footer from "@/components/Footer";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800">

            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-400/20 to-primary-400/20"></div>
                <div className="relative container mx-auto px-4 lg:px-8 py-20">
                    <div className="text-center">
                        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                            聯絡<span className="text-secondary-600 dark:text-secondary-400">我們</span>
                        </h1>
                        <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            有任何意見、合作或技術問題，歡迎透過以下方式聯絡我們
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 lg:px-8 py-16">
                <div className="grid lg:grid-cols-2 gap-12 mb-20">
                    {/* Left Column - Contact Form */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            發送訊息
                        </h2>
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        姓名 *
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                        placeholder="請輸入您的姓名"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        電郵 *
                                    </label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                        placeholder="your@email.com"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    主題
                                </label>
                                <select
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                    aria-label="選擇聯絡主題"
                                >
                                    <option>一般查詢</option>
                                    <option>技術支援</option>
                                    <option>內容建議</option>
                                    <option>合作提案</option>
                                    <option>其他</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    訊息內容 *
                                </label>
                                <textarea
                                    rows={6}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors resize-none"
                                    placeholder="請詳細描述您的問題或建議..."
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                            >
                                發送訊息
                            </button>
                        </form>
                    </div>

                    {/* Right Column - Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 p-8">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                                聯絡方式
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                                        <span className="text-xl">📧</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">電子郵件</h4>
                                        <p className="text-primary-600 dark:text-primary-400">info@biblestudy.hk</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900/20 rounded-full flex items-center justify-center">
                                        <span className="text-xl">📱</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">Facebook</h4>
                                        <p className="text-secondary-600 dark:text-secondary-400">樂研集 Bible Study</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-bible-gospel/20 dark:bg-bible-gospel/30 rounded-full flex items-center justify-center">
                                        <span className="text-xl">💬</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">WhatsApp</h4>
                                        <p className="text-gray-600 dark:text-gray-400">+852 9123 4567</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 p-8">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                                辦公時間
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">星期一至五</span>
                                    <span className="font-medium text-gray-900 dark:text-white">09:00 - 18:00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">星期六</span>
                                    <span className="font-medium text-gray-900 dark:text-white">09:00 - 14:00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">星期日</span>
                                    <span className="font-medium text-gray-900 dark:text-white">休息</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 p-8 lg:p-12">
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                        常見問題
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="border-l-4 border-primary-500 pl-4">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                    如何註冊成為會員？
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    點擊右上角的登入按鈕，選擇 Google 登入即可快速註冊。
                                </p>
                            </div>
                            <div className="border-l-4 border-secondary-500 pl-4">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                    忘記密碼怎麼辦？
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    使用 Google 登入的用戶無需擔心密碼問題，直接點擊登入即可。
                                </p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="border-l-4 border-bible-gospel pl-4">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                    如何提交文章建議？
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    透過聯絡表單選擇「內容建議」主題，詳細描述您的想法。
                                </p>
                            </div>
                            <div className="border-l-4 border-bible-new pl-4">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                    技術問題回覆時間？
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    我們會在 24 小時內回覆您的技術問題。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
