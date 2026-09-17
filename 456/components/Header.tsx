"use client";


import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const links = [
  { displayName: "首頁", herf: "/" },
  { displayName: "關於頁", herf: "/about" },
  { displayName: "聯絡頁", herf: "/contact" },
  { displayName: "其他頁", herf: "/other" },
  { displayName: "鳴謝頁", herf: "/thanks" },
];

export default function Header() {

  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 禁止背景滾動
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // 點擊外部區域關閉選單 & ESC 關閉 & RWD自動收合
  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEsc);
    window.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEsc);
      window.removeEventListener("resize", handleResize);
    };
  }, [menuOpen]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="flex justify-between items-center py-9 px-5 md:px-0 relative">
      <Link href={"/"} className="flex space-x-2 items-center">
        <Image
          src={theme === "light" ? "/images/lgsLight.png" : "/images/lgsDark.png"}
          width={36}
          height={36}
          alt="logo"
          priority
        />
        <div className="text-2xl">
          Meta<span className="font-bold">Blog</span>
        </div>
      </Link>
      {/* 桌面版選單 */}
      <div className="hidden md:flex space-x-10">
        <nav className="space-x-10">
          {links.map((l, idx) => (
            <Link href={l.herf} key={idx}>
              {l.displayName}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={toggleTheme}
          className="focus:outline-none"
          aria-label="Toggle theme"
        >
          <Image
            src={theme === "light" ? "/darkmode.svg" : "/lightmode.svg"}
            alt="theme toggle"
            width={32}
            height={32}
            priority
          />
        </button>
      </div>
      {/* 行動版漢堡選單按鈕 */}
      <div className="md:hidden flex items-center">
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="focus:outline-none p-2"
          aria-label={menuOpen ? "關閉選單" : "開啟選單"}
        >
          {menuOpen ? (
            // X icon
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-gray-200">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            // 漢堡icon
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-gray-200">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>
      {/* 行動版選單內容 */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute top-full left-0 w-full bg-white dark:bg-[#242535] shadow-lg z-50 flex flex-col items-center py-6 animate-fade-in"
        >
          <nav className="flex flex-col space-y-6 w-full items-center">
            {links.map((l, idx) => (
              <Link
                href={l.herf}
                key={idx}
                className="text-lg font-semibold"
                onClick={() => setMenuOpen(false)}
              >
                {l.displayName}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            onClick={toggleTheme}
            className="mt-6 focus:outline-none"
            aria-label="Toggle theme"
          >
            <Image
              src={theme === "light" ? "/darkmode.svg" : "/lightmode.svg"}
              alt={theme === "light" ? "切換暗模式" : "切換明亮模式"}
              width={24}
              height={24}
              priority
            />
          </button>
        </div>
      )}
      {/* 動畫 keyframes */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
}
