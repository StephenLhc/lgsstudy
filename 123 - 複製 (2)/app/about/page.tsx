import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Image from "next/image";

export default function AboutPage() {
    return (
        <div>
            <Header />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-800 dark:to-gray-900 py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        關於樂研集
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                        致力於深化香港教會群體的聖經研讀，建立以神話語為根基的屬靈生命
                    </p>
                </div>
            </section>

            {/* 主要內容 */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* 左側文字 */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                                    我們的使命
                                </h2>
                                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                                    樂研集是專為香港基督徒群體而設的聖經研讀平台。我們相信神的話語是信仰生活的根基，
                                    透過深入研讀聖經，能夠建立穩固的屬靈生命，在這個時代作光作鹽。
                                </p>
                                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                    我們致力於提供高質素的聖經研讀資源，包括釋經文章、神學探討、實用教導，
                                    幫助弟兄姊妹在真理中成長，建立合神心意的生命品格。
                                </p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                    核心價值
                                </h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-1">1</span>
                                        <span className="text-gray-600 dark:text-gray-300"><strong className="text-gray-900 dark:text-white">以經解經</strong> - 讓聖經自己說話，忠於原文和上下文</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-1">2</span>
                                        <span className="text-gray-600 dark:text-gray-300"><strong className="text-gray-900 dark:text-white">實用應用</strong> - 將聖經真理應用於現代生活的各個層面</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-1">3</span>
                                        <span className="text-gray-600 dark:text-gray-300"><strong className="text-gray-900 dark:text-white">群體建造</strong> - 促進弟兄姊妹在真理中的相交與成長</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-1">4</span>
                                        <span className="text-gray-600 dark:text-gray-300"><strong className="text-gray-900 dark:text-white">本土關懷</strong> - 關注香港教會的具體需要和挑戰</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* 右側圖片 */}
                        <div className="relative">
                            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/images/closeup-shot-open-bible-with-blurred-laptop-coffee.jpg"
                                    alt="聖經研讀 - 樂研集的使命"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 服務內容 */}
            <section className="bg-gray-50 dark:bg-gray-800 py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            我們提供的服務
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            多元化的聖經研讀資源，滿足不同層次的學習需要
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg">
                            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">釋經文章</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                深入淺出的聖經釋義，幫助讀者理解經文的原意和現代應用
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg">
                            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">神學探討</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                系統性的神學主題研究，建立穩固的信仰根基
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg">
                            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">實用教導</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                將聖經原則應用於日常生活的實用指導和見證分享
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 團隊介紹 */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
                        服事團隊
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                        樂研集由一群熱愛神話語的弟兄姊妹組成，包括牧者、神學院老師、資深信徒等，
                        共同致力於推動聖經研讀事工。我們深信透過團隊合作，能夠提供更豐富、更準確的聖經教導。
                    </p>
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-8 rounded-xl border border-orange-200 dark:border-orange-800">
                        <p className="text-orange-800 dark:text-orange-200 font-medium">
                            「你們查考聖經，因你們以為內中有永生；給我作見證的就是這經。」
                        </p>
                        <p className="text-orange-600 dark:text-orange-400 text-sm mt-2">
                            - 約翰福音 5:39
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
