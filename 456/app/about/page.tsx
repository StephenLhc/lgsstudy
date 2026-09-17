import Image from "next/image";
import Footer from "@/components/Footer";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-secondary-400/20"></div>
                <div className="relative container mx-auto px-4 lg:px-8 py-20">
                    <div className="text-center">
                        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                            關於<span className="text-primary-600 dark:text-primary-400">樂研集</span>
                        </h1>
                        <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            專為香港40歲以上成年人設計的聖經研讀平台
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 lg:px-8 py-16">
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
                    {/* Left Column - Image */}
                    <div className="relative">
                        <div className="relative z-10">
                            <Image
                                src="/images/chinese-675456_1920.jpg"
                                alt="樂研集團隊"
                                width={600}
                                height={400}
                                className="rounded-2xl shadow-large"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-200 dark:bg-primary-800 rounded-full opacity-60"></div>
                        <div className="absolute -top-6 -left-6 w-24 h-24 bg-secondary-200 dark:bg-secondary-800 rounded-full opacity-60"></div>
                    </div>

                    {/* Right Column - Content */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                            我們的使命
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            樂研集致力於為香港的基督徒提供高品質的聖經研讀資源，透過現代科技讓信仰生活更加豐富多彩。
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700">
                                <div className="text-2xl mb-2">📖</div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">深度研讀</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">提供深入的聖經解析和神學思考</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700">
                                <div className="text-2xl mb-2">👥</div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">社群互動</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">建立溫暖的信仰社群，互相學習成長</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                        平台特色
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 text-center hover:shadow-large transition-all duration-300 hover:-translate-y-2">
                            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl">🎯</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">高齡友善設計</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                專為40歲以上用戶設計，字體清晰、操作簡單、色彩對比適中
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 text-center hover:shadow-large transition-all duration-300 hover:-translate-y-2">
                            <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl">💡</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">多元內容</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                文章、影音、音頻等多種形式，滿足不同學習偏好
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 text-center hover:shadow-large transition-all duration-300 hover:-translate-y-2">
                            <div className="w-16 h-16 bg-bible-old/20 dark:bg-bible-old/30 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl">🤝</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">互動討論</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                支援評論、點讚、收藏等互動功能，促進信仰交流
                            </p>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 p-8 lg:p-12">
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                        我們的團隊
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">👨‍💼</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">牧者團隊</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">提供神學指導和牧養關懷</p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 bg-secondary-100 dark:bg-secondary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">👩‍🎓</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">學者專家</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">深入聖經研究和學術探討</p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 bg-bible-gospel/20 dark:bg-bible-gospel/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">👨‍💻</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">技術團隊</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">確保平台穩定運行和用戶體驗</p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 bg-bible-new/20 dark:bg-bible-new/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">👥</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">社群夥伴</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">支持平台發展和內容創作</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
