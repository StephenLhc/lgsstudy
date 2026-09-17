"use client";

import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import SearchAndFilter from "../components/SearchAndFilter";
import { bibleStudies } from "../posts";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [filteredStudies, setFilteredStudies] = useState(bibleStudies);

  // const handleFilteredStudies = useCallback((filtered: typeof bibleStudies) => {
  //   setFilteredStudies(filtered);
  // }, []);

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* 聖經研讀文章區塊 */}
      <section className="py-20 px-5 md:px-0 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            聖經研讀文章
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            深入探索神的話語，與弟兄姊妹一同成長
          </p>
        </div>

        {/* 搜尋和篩選組件 */}
        <SearchAndFilter
          studies={bibleStudies}
          onFilteredStudies={setFilteredStudies}
        />        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredStudies.map((p, idx: number) => (
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
                {/* Bible reference and category */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 font-medium px-3 py-1 rounded-full">
                    {p.category}
                  </span>
                  {p.bibleBook && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {p.bibleBook} {p.bibleChapter}
                    </span>
                  )}
                </div>

                {/* title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-orange-500 transition-colors">
                  {p.title}
                </h3>

                {/* Bible verse */}
                {p.bibleVerse && (
                  <blockquote className="text-sm text-gray-600 dark:text-gray-300 italic mb-3 line-clamp-2 border-l-2 border-orange-200 dark:border-orange-800 pl-3">
                    {p.bibleVerse}
                  </blockquote>
                )}

                {/* excerpt */}
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {p.excerpt}
                </p>

                {/* theology tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {p.theologyTags.slice(0, 2).map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {p.theologyTags.length > 2 && (
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      +{p.theologyTags.length - 2}
                    </span>
                  )}
                </div>

                {/* meta info */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <span>{p.author}</span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    <span>{p.readingTime} 分鐘</span>
                  </div>
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
