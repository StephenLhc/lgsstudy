import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { bibleStudies } from "../../posts";
import Image from "next/image";
import Link from "next/link";

export default function BlogPage() {
  return (
    <div>
      <Header />

      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-800 dark:to-gray-900 py-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              聖經研讀文章
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              深入探討聖經真理，與神更親近。透過系統性的聖經研讀，
              讓我們一同在信仰的路上成長，體驗神話語的豐富和能力。
            </p>
          </div>
        </section>

        {/* 文章列表 */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            {/* 統計資訊 */}
            <div className="text-center mb-12">
              <p className="text-gray-600 dark:text-gray-400">
                共有 <span className="font-semibold text-orange-500">{bibleStudies.length}</span> 篇研讀文章
              </p>
            </div>

            {/* 文章網格 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bibleStudies.map((study, idx) => (
                <Link
                  key={idx}
                  href={`/blog/${study.slug}`}
                  className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
                >
                  {/* 縮圖 */}
                  <div className="h-48 w-full relative overflow-hidden">
                    <Image
                      src={study.thumbnail}
                      alt={`${study.title} - 縮圖`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* 難度標籤 */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${study.difficulty === 'beginner'
                          ? 'bg-green-500 text-white'
                          : study.difficulty === 'intermediate'
                            ? 'bg-yellow-500 text-white'
                            : 'bg-red-500 text-white'
                        }`}>
                        {study.difficulty === 'beginner' ? '初級' :
                          study.difficulty === 'intermediate' ? '中級' : '高級'}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* 分類 */}
                    <p className="text-sm text-orange-500 font-semibold mb-2">
                      {study.category}
                    </p>

                    {/* 標題 */}
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-orange-500 transition-colors">
                      {study.title}
                    </h2>

                    {/* 摘要 */}
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                      {study.excerpt}
                    </p>

                    {/* 聖經經文 */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        📖 {study.bibleBook} {study.bibleChapter}:{study.bibleVerse}
                      </p>
                    </div>

                    {/* 標籤 */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {study.theologyTags.slice(0, 2).map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                      {study.theologyTags.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                          +{study.theologyTags.length - 2}
                        </span>
                      )}
                    </div>

                    {/* 作者和資訊 */}
                    <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-500">
                      <div className="flex items-center gap-4">
                        <span>✍️ {study.author}</span>
                        <span>⏱️ {study.readingTime} 分鐘</span>
                      </div>
                      <span>{study.date}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* 呼籲行動 */}
            <div className="text-center mt-16">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  想要更深入的研讀？
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  加入我們的聖經研讀小組，與弟兄姊妹一同探討神的話語。
                </p>
                <Link
                  href="/contact"
                  className="inline-block px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
                >
                  聯絡我們
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
