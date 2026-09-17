"use client";

import Footer from "./Footer";
import SyntaxHighlighter from "./SyntaxHighlighter";
import Thumbnail from "./Thumbnail";
import LikeButton from "./LikeButton";
import BookmarkButton from "./BookmarkButton";
import ShareButton from "./ShareButton";
import Comments from "./Comments";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { createPortal } from "react-dom";

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  const isProduction = process.env.NODE_ENV === "production";
  const pathname = usePathname();
  const { data: session } = useSession();
  const [showInteractions, setShowInteractions] = useState(false);
  const [titleContainer, setTitleContainer] = useState<Element | null>(null);

  // 從路徑提取 postId（移除 /blog/ 前綴）
  const postId = pathname?.replace('/blog/', '') || '';

  // 提取頁面標題（暫時從路徑推斷，您可以根據需要調整）
  const postTitle = postId.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  // 等待 session 載入後顯示互動按鈕
  useEffect(() => {
    if (!session) return;

    // 等待 DOM 完全載入
    const timer = setTimeout(() => {
      const h1 = document.querySelector('h1');

      if (h1 && !h1.querySelector('.title-interactions')) {
        // 創建互動按鈕容器
        const interactionsContainer = document.createElement('div');
        interactionsContainer.className = 'title-interactions flex items-center space-x-2 ml-4 flex-shrink-0';

        // 將 h1 設為 flex 容器
        h1.style.display = 'flex';
        h1.style.justifyContent = 'space-between';
        h1.style.alignItems = 'center';
        h1.style.flexWrap = 'wrap';
        h1.style.gap = '1rem';

        // 添加響應式支持
        const updateLayout = () => {
          const h1Width = h1.scrollWidth;
          const containerWidth = h1.parentElement?.clientWidth || 0;

          // 如果標題太長，或者在手機上，就垂直堆疊
          if (window.innerWidth < 768 || h1Width > containerWidth * 0.7) {
            // 垂直堆疊：按鈕顯示在標題下方
            h1.style.flexDirection = 'column';
            h1.style.alignItems = 'flex-start';
            interactionsContainer.className = 'title-interactions flex items-center space-x-2 mt-3 flex-shrink-0';
          } else {
            // 水平排列：按鈕顯示在標題右邊
            h1.style.flexDirection = 'row';
            h1.style.alignItems = 'center';
            interactionsContainer.className = 'title-interactions flex items-center space-x-2 ml-4 flex-shrink-0';
          }
        };

        // 初始設置
        updateLayout();

        // 監聽窗口大小變化
        window.addEventListener('resize', updateLayout);

        // 將按鈕添加到 h1 中
        h1.appendChild(interactionsContainer);

        // 設置容器引用
        setTitleContainer(interactionsContainer);
        setShowInteractions(true);

        // 清理函數
        return () => {
          window.removeEventListener('resize', updateLayout);
        };
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [session]);

  return (
    <>
      <div className="px-5 md:px-0 max-w-4xl mx-auto prose dark:prose-invert py-8 relative">
        <Thumbnail />

        {/* 文章內容 */}
        <div className="relative">
          {isProduction ? (
            <SyntaxHighlighter>{children}</SyntaxHighlighter>
          ) : (
            <div>{children}</div>
          )}

          {/* 在文章標題後面添加互動按鈕 - 使用 Portal */}
          {showInteractions && titleContainer && createPortal(
            <>
              <LikeButton postId={postId} />
              <BookmarkButton postId={postId} />
              <ShareButton postId={postId} title={postTitle} />
            </>,
            titleContainer
          )}
        </div>

        {/* 評論區域 */}
        <div className="mt-12">
          <Comments postId={postId} />
        </div>
      </div>

      <Footer />
    </>
  );
}
