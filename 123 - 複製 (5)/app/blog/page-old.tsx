import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { prisma } from "../../lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function BlogPage() {
  // 從 Prisma 數據庫獲取文章數據
  const posts = await prisma.post.findMany({
    where: {
      status: 'PUBLISHED'
    },
    include: {
      author: true,
      category: true,
      bibleBook: true,
      tags: {
        include: {
          tag: true
        }
      },
      _count: {
        select: {
          likes: true,
          comments: true,
          bookmarks: true
        }
      }
    },
    orderBy: {
      publishedAt: 'desc'
    }
  });

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
                共有 <span className="font-semibold text-orange-500">{posts.length}</span> 篇研讀文章
              </p>
            </div>

            {/* 文章網格 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
                >
                  {/* 縮圖 */}
                  <div className="h-48 w-full relative overflow-hidden">
                    <Image
                      src={post.coverImage || '/images/thumbnails/default.jpg'}
                      alt={`${post.title} - 縮圖`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* 難度標籤 */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${post.difficulty === 'BEGINNER'
                          ? 'bg-green-500 text-white'
                          : post.difficulty === 'INTERMEDIATE'
                            ? 'bg-yellow-500 text-white'
                            : 'bg-red-500 text-white'
                        }`}>
                        {post.difficulty === 'BEGINNER' ? '初級' :
                          post.difficulty === 'INTERMEDIATE' ? '中級' : '高級'}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* 分類 */}
                    <p className="text-sm text-orange-500 font-semibold mb-2">
                      {post.category.name}
                    </p>

                    {/* 標題 */}
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-orange-500 transition-colors">
                      {post.title}
                    </h2>

                    {/* 摘要 */}
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* 聖經經文 */}
                    {post.bibleVerse && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                          📖 {post.bibleBook?.name} {post.bibleChapter} - {post.bibleVerse}
                        </p>
                      </div>
                    )}

                    {/* 標籤 */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 2).map((postTag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                        >
                          {postTag.tag.name}
                        </span>
                      ))}
                      {post.tags.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                          +{post.tags.length - 2}
                        </span>
                      )}
                    </div>

                    {/* 作者和資訊 */}
                    <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-500">
                      <div className="flex items-center gap-4">
                        <span>✍️ {post.author.displayName || post.author.name}</span>
                        <span>⏱️ {post.readingTime || 10} 分鐘</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>❤️ {post._count.likes}</span>
                        <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('zh-TW') : ''}</span>
                      </div>
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
