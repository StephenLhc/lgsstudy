/**
 * 網站標頭組件 - 包含標誌、導航和主題切換
 * 提供響應式設計和完整的使用者體驗
 */

"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import NavigationLinks, { MAIN_NAVIGATION_LINKS } from "./NavigationLinks";
import ThemeToggleButton from "./ThemeToggleButton";

export default function Header() {
  const [mounted, setMounted] = useState(false);

  // 避免 hydration 不匹配問題
  useEffect(() => {
    setMounted(true);
  }, []);

  // 在客戶端渲染前返回靜態內容
  if (!mounted) {
    return (
      <header className="flex justify-between items-center py-9 px-5 md:px-0">
        <Logo />
        <div className="flex space-x-10 items-center">
          <NavigationLinks links={MAIN_NAVIGATION_LINKS} />
          <ThemeToggleButton />
        </div>
      </header>
    );
  }

  return (
    <header className="flex justify-between items-center py-9 px-5 md:px-0">
      <Logo />
      <div className="flex space-x-10 items-center">
        <NavigationLinks links={MAIN_NAVIGATION_LINKS} />
        <ThemeToggleButton />
      </div>
    </header>
  );
}
