import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import { posts } from "../posts";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* 聖經研讀文章區塊 */}
      <section className="py-20 px-5 md:px-0 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            最新研讀文章
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            深入探索神的話語，與弟兄姊妹一同成長
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((p: typeof posts[number], idx: number) => (
            <Link
              key={idx}
              href={`/blog/${p.slug}`}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
            >
              {/* image */}
              <div className="h-60 w-full relative overflow-hidden">
                <Image
                  src={p.thumbnail}
                  alt={`${p.title} - thumbnail`}
                  sizes="100vh"
                  fill
                  className="object-cover group-hover:scale-105 duration-300 transition-all"
                />
              </div>

              <div className="p-6">
                {/* category */}
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-sm bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 font-medium px-3 py-1 rounded-full">
                    {p.category}
                  </span>
                </div>

                {/* title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-orange-500 transition-colors">
                  {p.title}
                </h3>

                {/* author and date */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{p.author}</span>
                  <span>{p.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
