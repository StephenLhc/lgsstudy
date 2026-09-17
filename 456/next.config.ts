import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  // 圖片優化設定
  images: {
    domains: ["localhost"],
    formats: ["image/webp", "image/avif"],
  },

  // 實驗性功能
  experimental: {
    // 啟用 App Router 功能
    appDir: true,
  },

  // 編譯優化
  compiler: {
    // 移除 console.log (生產環境)
    removeConsole: process.env.NODE_ENV === "production",
  },

  // 環境變數
  env: {
    CUSTOM_KEY: "bible-study-app",
  },

  // 重定向設定 (可選)
  async redirects() {
    return [
      {
        source: "/bible",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
