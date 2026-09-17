"use client";

import { IBibleStudy, bibleStudies } from "@/posts";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Thumbnail() {
  const pathname = usePathname().split("/")[2];
  const post = bibleStudies.find((p: IBibleStudy) => p.slug === pathname);
  const [imageError, setImageError] = useState(false);
  const [fallbackIndex, setFallbackIndex] = useState(0);

  // 多層備用圖片系統
  const fallbackImages = [
    "/images/errorpage.png",
    "/images/errorpage1.png",
    "/images/hero.png",
    "/images/normalpage.png"
  ];

  const handleImageError = () => {
    if (fallbackIndex < fallbackImages.length - 1) {
      setFallbackIndex(prev => prev + 1);
    } else {
      setImageError(true);
    }
  };

  if (imageError) {
    return (
      <div className="h-[250px] md:h-[500px] mb-10 overflow-hidden rounded-lg relative">
        <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
          <div className="text-center text-gray-800 dark:text-gray-200">
            <div className="text-6xl mb-4">📖</div>
            <h3 className="text-2xl font-bold mb-2">聖經研讀</h3>
            <p className="text-lg opacity-80">{post?.title || "經文分享"}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[250px] md:h-[500px] mb-10 overflow-hidden rounded-lg relative">
      <Image
        src={imageError ? fallbackImages[fallbackIndex] : (post?.thumbnail || fallbackImages[0])}
        alt={post?.title || "文章圖片"}
        fill
        sizes="100vh"
        className="object-cover"
        onError={handleImageError}
      />
    </div>
  );
}
