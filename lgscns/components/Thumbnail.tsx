/**
 * 文章縮略圖組件 - 顯示文章的主要圖片
 * 根據當前路徑自動尋找對應的文章縮略圖
 */

"use client";

import { IPost, posts } from "@/posts";
import Image from "next/image";
import { usePathname } from "next/navigation";

/**
 * 從路徑中取得文章 slug
 * @param pathname - 當前頁面路徑
 * @returns 文章的 slug
 */
function getArticleSlugFromPath(pathname: string): string {
  return pathname.split("/")[2] || "";
}

/**
 * 根據 slug 尋找對應的文章
 * @param slug - 文章 slug
 * @returns 找到的文章物件或 undefined
 */
function findPostBySlug(slug: string): IPost | undefined {
  return posts.find((post: IPost) => post.slug === slug);
}

export default function ArticleThumbnail() {
  const currentPath = usePathname();
  const articleSlug = getArticleSlugFromPath(currentPath);
  const currentPost = findPostBySlug(articleSlug);

  // 使用文章縮略圖或預設圖片
  const thumbnailImage = currentPost?.thumbnail || "/images/hero.png";
  const altText = currentPost?.title ? `${currentPost.title} 的縮略圖` : "文章縮略圖";

  return (
    <div className="h-[250px] md:h-[500px] mb-10 overflow-hidden rounded-lg relative">
      <Image
        src={thumbnailImage}
        alt={altText}
        fill
        sizes="100vh"
        priority
      />
    </div>
  );
}
