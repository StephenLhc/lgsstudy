/**
 * 網站頁腳組件 - 包含標誌和法律連結
 * 提供簡潔的頁腳佈局和導航
 */

"use client";

import Logo from "./Logo";
import NavigationLinks, { FOOTER_LINKS } from "./NavigationLinks";

export default function Footer() {
  return (
    <footer className="py-8 flex px-5 md:px-0 justify-between items-center border-t border-gray-300 dark:border-gray-600 mt-10">
      <Logo />
      <NavigationLinks
        links={FOOTER_LINKS}
        className="flex flex-col md:flex-row text-gray-700 dark:text-gray-400 md:space-x-10"
      />
    </footer>
  );
}
