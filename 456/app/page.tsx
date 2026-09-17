import BlogCard from "@/components/BlogCard";
import BibleSection from "@/components/BibleSection";
import Footer from "@/components/Footer";
import { bibleBooks } from "@/lib/bibleData";

// 臨時靜態數據，避免 Prisma 錯誤
const mockPosts = [
  {
    id: "1",
    title: "深入探討馬太福音的登山寶訓",
    slug: "matthew-sermon-on-mount",
    excerpt: "登山寶訓是耶穌最重要的教導之一，包含了基督徒生活的核心原則...",
    author: "張牧師",
    date: "2024年1月15日",
    viewCount: 1250,
    likeCount: 89,
    commentCount: 23,
    category: "新約研究",
    coverImage: "/images/thumbnails/react-hooks.jpg",
    bibleBook: {
      name: "馬太福音",
      color: "bg-bible-gospel"
    },
    categories: [
      {
        category: {
          name: "新約研究",
          color: "bg-blue-500",
          icon: "📖"
        }
      }
    ],
    tags: [
      {
        tag: {
          name: "登山寶訓",
          color: "bg-primary-500"
        }
      },
      {
        tag: {
          name: "馬太福音",
          color: "bg-bible-gospel"
        }
      }
    ]
  },
  {
    id: "2",
    title: "創世記中的創造神學",
    slug: "genesis-creation-theology",
    excerpt: "創世記第一章揭示了神創造的偉大和人類在創造中的特殊地位...",
    author: "李教授",
    date: "2024年1月10日",
    viewCount: 980,
    likeCount: 67,
    commentCount: 18,
    category: "舊約研究",
    coverImage: "/images/thumbnails/typescript.jpg",
    bibleBook: {
      name: "創世記",
      color: "bg-bible-old"
    },
    categories: [
      {
        category: {
          name: "舊約研究",
          color: "bg-orange-500",
          icon: "📚"
        }
      }
    ],
    tags: [
      {
        tag: {
          name: "創世記",
          color: "bg-bible-old"
        }
      },
      {
        tag: {
          name: "創造神學",
          color: "bg-green-500"
        }
      }
    ]
  },
  {
    id: "3",
    title: "羅馬書的因信稱義",
    slug: "romans-justification-by-faith",
    excerpt: "保羅在羅馬書中詳細闡述了因信稱義的真理，這是基督教信仰的根基...",
    author: "王牧師",
    date: "2024年1月5日",
    viewCount: 756,
    likeCount: 45,
    commentCount: 12,
    category: "新約研究",
    coverImage: "/images/thumbnails/nextjs-optimizing.jpg",
    bibleBook: {
      name: "羅馬書",
      color: "bg-bible-new"
    },
    categories: [
      {
        category: {
          name: "新約研究",
          color: "bg-blue-500",
          icon: "📖"
        }
      }
    ],
    tags: [
      {
        tag: {
          name: "羅馬書",
          color: "bg-bible-new"
        }
      },
      {
        tag: {
          name: "因信稱義",
          color: "bg-purple-500"
        }
      }
    ]
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-secondary-400/20"></div>
        <div className="relative container mx-auto px-4 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              歡迎來到<span className="text-primary-600 dark:text-primary-400">樂研集</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              專為香港40歲以上成年人設計的聖經研讀平台，提供文章、影音、互動討論，讓信仰生活更豐富
            </p>
            <span className="inline-block px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl shadow-soft hover:shadow-medium transition-all duration-200">
              開始探索
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* 左側內容區域 */}
          <div className="flex-1">
            {/* 特色文章 */}
            {mockPosts.length > 0 && (
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                  特色文章
                </h2>
                <div className="grid gap-8">
                  <BlogCard post={mockPosts[0]} variant="featured" />
                </div>
              </div>
            )}

            {/* 最新文章 */}
            {mockPosts.length > 1 && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                  最新文章
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {mockPosts.slice(1).map((post) => (
                    <BlogCard key={post.id} post={post} variant="default" />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 右側聖經側邊欄 */}
          <BibleSection books={bibleBooks} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
