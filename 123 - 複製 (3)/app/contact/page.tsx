import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function ContactPage() {
    return (
        <div>
            <Header />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-800 dark:to-gray-900 py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        聯絡我們
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                        我們樂意聆聽你的意見、建議或查詢，一同建立更美好的聖經研讀平台
                    </p>
                </div>
            </section>

            {/* 聯絡資訊與表格 */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16">

                        {/* 左側聯絡資訊 */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                                    與我們聯繫
                                </h2>
                                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                                    無論你是想提供意見回饋、投稿文章、合作提案，或是有任何關於聖經研讀的問題，
                                    我們都熱切歡迎你與我們聯繫。
                                </p>
                            </div>

                            {/* 聯絡方式 */}
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">電子郵件</h3>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            <a href="mailto:contact@loveable-study.hk" className="text-orange-500 hover:text-orange-600 transition-colors">
                                                contact@loveable-study.hk
                                            </a>
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                            我們會在24小時內回覆你的查詢
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">地址</h3>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            香港特別行政區<br />
                                            九龍尖沙咀<br />
                                            （具體地址將於日後公布）
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">電話</h3>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            +852 xxxx xxxx
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                            辦公時間：週一至五 上午9時至下午6時
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* 社交媒體 */}
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                    關注我們
                                </h3>
                                <div className="flex space-x-4">
                                    <a href="#" title="追蹤我們的 Twitter" className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                        </svg>
                                    </a>
                                    <a href="#" title="關注我們的 Facebook" className="w-12 h-12 bg-blue-800 rounded-xl flex items-center justify-center text-white hover:bg-blue-900 transition-colors">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                    </a>
                                    <a href="#" title="透過 WhatsApp 聯絡我們" className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white hover:bg-green-700 transition-colors">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.085" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* 右側聯絡表格 */}
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                發送訊息
                            </h2>
                            <form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            名字
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                            placeholder="請輸入名字"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            姓氏
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                            placeholder="請輸入姓氏"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        電子郵件
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                        placeholder="your.email@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        主題
                                    </label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    >
                                        <option value="">請選擇主題</option>
                                        <option value="feedback">意見回饋</option>
                                        <option value="article">投稿文章</option>
                                        <option value="collaboration">合作提案</option>
                                        <option value="question">聖經問題</option>
                                        <option value="technical">技術支援</option>
                                        <option value="other">其他</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        訊息內容
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={6}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                        placeholder="請詳細說明你的訊息內容..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                                >
                                    發送訊息
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* 常見問題 */}
            <section className="bg-gray-50 dark:bg-gray-800 py-20">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            常見問題
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            以下是一些常見的問題與回答
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                                如何投稿文章到樂研集？
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                歡迎透過電子郵件寄送你的文章給我們。請在主題選擇「投稿文章」，並在訊息中說明文章主題、字數和預期發布時間。
                                我們的編輯團隊會在一週內回覆。
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                                是否接受教會或機構的合作提案？
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                我們非常歡迎與香港本地教會和基督教機構合作。如有合作意向，請選擇「合作提案」主題，
                                並詳細說明合作內容和預期目標。
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                                如何訂閱樂研集的最新內容？
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                目前我們正在開發訂閱功能。你可以關注我們的社交媒體平台，或定期瀏覽網站來獲得最新內容。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
