import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google"; // 更換為支援中文的字體
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import AuthProvider from "../components/AuthProvider";
import LayoutWrapper from "../components/LayoutWrapper";

// 使用 Google 的 Noto Sans Traditional Chinese 字體
const notoSansTC = Noto_Sans_TC({
  weight: ['400', '500', '700'],
  subsets: ["latin", "latin-ext"],
  variable: '--font-noto-sans-tc',
  display: 'swap',
});


export const metadata: Metadata = {
  title: "我的Next.js應用程式",
  description: "專為香港用戶打造的網頁應用程式",
  keywords: ["香港", "繁體中文", "Next.js"],
  metadataBase: new URL('https://example.hk'),
  openGraph: {
    siteName: "香港站點",
    locale: "zh_HK",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant-HK" dir="ltr" suppressHydrationWarning>
      <head>
        {/* 香港地區專用的 meta tag */}
        <meta name="geo.region" content="HK" />
      </head>
      <body className={`${notoSansTC.className} antialiased`}>
        <AuthProvider>
          <ThemeProvider>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}