/**
 * MDX 文章佈局組件 - 為 MDX 文章提供統一的頁面結構
 * 包含標頭、內容區域和頁腳
 */

import Footer from "./Footer";
import Header from "./Header";
import SyntaxHighlighter from "./SyntaxHighlighter";
import ArticleThumbnail from "./Thumbnail";

interface MdxLayoutProps {
  /** 文章內容 */
  children: React.ReactNode;
}

/**
 * 檢查是否為生產環境
 * @returns 是否為生產環境
 */
function isProductionEnvironment(): boolean {
  return process.env.NODE_ENV === "production";
}

export default function MdxLayout({ children }: MdxLayoutProps) {
  const showSyntaxHighlighting = isProductionEnvironment();

  return (
    <div>
      <Header />
      <main className="px-5 md:px-0 max-w-4xl mx-auto prose dark:prose-invert">
        <ArticleThumbnail />
        {showSyntaxHighlighting ? (
          <SyntaxHighlighter>{children}</SyntaxHighlighter>
        ) : (
          <div>{children}</div>
        )}
      </main>
      <Footer />
    </div>
  );
}
