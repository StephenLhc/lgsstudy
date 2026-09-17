"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const links = [
  { displayName: "首頁", href: "/" },
  { displayName: "關於頁", href: "/about" },
  { displayName: "聯絡頁", href: "/contact" },
  { displayName: "其他頁", href: "/other" },
  { displayName: "鳴謝頁", href: "/acknowledgments" }
];

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="relative w-full">
      <header className="flex justify-between items-center py-9 px-5 md:px-0 max-w-7xl mx-auto">
        <Link href={"/"} className="flex space-x-2 items-center">
          <Image
            src={theme === "light" ? "/images/lgsLight.png" : "/images/lgsDark.PNG"}
            width={36}
            height={36}
            alt="樂研集 logo"
            priority
          />
          <div className="text-2xl">
            樂<span className="font-bold">研集</span>
          </div>
        </Link>

        <div className="flex items-center space-x-4">
          {/* 桌面版導航 */}
          <nav className="hidden md:flex space-x-8">
            {links.map((l, idx) => (
              <Link href={l.href} key={idx} className="hover:text-orange-500 transition-colors">
                {l.displayName}
              </Link>
            ))}
          </nav>

          {/* 暗亮模式切換按鈕 */}
          <button
            onClick={toggleTheme}
            className="focus:outline-none"
            aria-label="Toggle theme"
          >
            <Image
              src={theme === "light" ? "/light-toggle.svg" : "/dark-toggle.svg"}
              alt="theme toggle"
              width={48}
              height={28}
              priority
            />
          </button>

          {/* 登入按鈕 */}
          <button className="hidden md:block bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors">
            登入
          </button>

          {/* 移動端漢堡選單按鈕 */}
          <button
            onClick={toggleMenu}
            className="md:hidden focus:outline-none z-50 relative p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center relative">
              <span className={`absolute block h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${isMenuOpen
                  ? 'rotate-45 translate-y-0'
                  : '-translate-y-2'
                }`}></span>
              <span className={`absolute block h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${isMenuOpen
                  ? 'opacity-0 rotate-180'
                  : 'opacity-100 translate-y-0'
                }`}></span>
              <span className={`absolute block h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${isMenuOpen
                  ? '-rotate-45 translate-y-0'
                  : 'translate-y-2'
                }`}></span>
            </div>
          </button>
        </div>
      </header>

      {/* 移動端選單 - 使用 fixed 定位確保全寬覆蓋 */}
      <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 md:hidden z-30 transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setIsMenuOpen(false)}>
        <div
          className={`absolute top-[120px] left-0 w-full bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="flex flex-col p-5">
            {links.map((l, idx) => (
              <Link
                href={l.href}
                key={idx}
                className="hover:text-orange-500 transition-colors py-3 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600 last:border-b-0"
                onClick={() => setIsMenuOpen(false)}
              >
                {l.displayName}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-600">
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg transition-colors w-full font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                登入
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
