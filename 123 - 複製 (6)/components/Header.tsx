"use client";

import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const links = [
  { displayName: "首頁", href: "/" },
  { displayName: "聖經研讀", href: "/blog" },
  { displayName: "討論版", href: "/forums" },
  { displayName: "關於頁", href: "/about" },
  { displayName: "聯絡頁", href: "/contact" },
  { displayName: "鳴謝頁", href: "/acknowledgments" }
];

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  // 根據登入狀態和用戶角色選擇導航連結
  const getNavigationLinks = () => {
    if (!session) return links;

    const baseLinks = [
      { displayName: "首頁", href: "/" },
      { displayName: "儀表板", href: "/dashboard" },
      { displayName: "聖經研讀", href: "/blog" },
      { displayName: "討論版", href: "/forums" },
      { displayName: "個人檔案", href: "/profile" },
    ];

    // 如果是管理員，添加管理頁面連結
    if ((session.user as { role?: string })?.role === "admin") {
      baseLinks.splice(2, 0, { displayName: "管理面板", href: "/admin" });
    }

    return baseLinks;
  };

  const navigationLinks = getNavigationLinks();

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
          <div className="text-2xl text-gray-900 dark:text-white">
            樂<span className="font-bold">研集</span>
          </div>
        </Link>

        <div className="flex items-center space-x-4">
          {/* 桌面版導航 */}
          <nav className="hidden md:flex space-x-8">
            {navigationLinks.map((l, idx) => (
              <Link href={l.href} key={idx} className="text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-colors">
                {l.displayName}
              </Link>
            ))}
          </nav>

          {/* 暗亮模式切換按鈕 */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              /* 明亮模式時顯示月亮圖標（點擊切換到暗黑模式） */
              <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            ) : (
              /* 暗黑模式時顯示太陽圖標（點擊切換到明亮模式） */
              <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
              </svg>
            )}
          </button>

          {/* 用戶認證區域 */}
          {status === "loading" ? (
            <div className="hidden md:block px-4 py-2">
              <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-8 w-16 rounded"></div>
            </div>
          ) : session ? (
            <div className="hidden md:flex items-center space-x-3">
              {/* 用戶頭像 */}
              <div className="flex items-center space-x-2">
                <Image
                  src={session.user?.image || '/images/default-avatar.png'}
                  alt={session.user?.name || '用戶'}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="text-sm text-gray-700 dark:text-gray-200">
                  {session.user?.name}
                </span>
              </div>
              {/* 登出按鈕 */}
              <button
                onClick={handleSignOut}
                className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-3 py-2 rounded-lg transition-colors text-sm"
              >
                登出
              </button>
            </div>
          ) : (
            <Link
              href="/auth/signin"
              className="hidden md:block bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              登入
            </Link>
          )}

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
            {navigationLinks.map((l, idx) => (
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
              {status === "loading" ? (
                <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-12 rounded-lg"></div>
              ) : session ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Image
                      src={session.user?.image || '/images/default-avatar.svg'}
                      alt={session.user?.name || '用戶'}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-200 flex-1">
                      {session.user?.name}
                    </span>
                  </div>
                  <Link
                    href="/profile"
                    className="block bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg transition-colors w-full font-medium text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    個人資料
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-3 rounded-lg transition-colors w-full font-medium"
                  >
                    登出
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/signin"
                  className="block bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg transition-colors w-full font-medium text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  登入
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
