import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";


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
    <html lang="zh-Hant-HK" dir="ltr">
      <head>
        {/* 香港地區專用的 meta tag */}
        <meta name="geo.region" content="HK" />
      </head>
      <body className="antialiased bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 max-w-7xl mx-auto font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}