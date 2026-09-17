/**
 * 導航連結組件 - 處理網站的主要導航
 * 提供清晰的連結結構和懸停效果
 */

import Link from "next/link";

// 導航連結的資料結構
export interface NavigationLink {
    /** 顯示文字 */
    displayName: string;
    /** 連結路徑 */
    href: string;
}

interface NavigationLinksProps {
    /** 導航連結陣列 */
    links: NavigationLink[];
    /** CSS 類別名稱 */
    className?: string;
}

// 主要導航連結資料
export const MAIN_NAVIGATION_LINKS: NavigationLink[] = [
    { displayName: "Blog", href: "/blog" }
];

// 頁腳連結資料  
export const FOOTER_LINKS: NavigationLink[] = [
    { displayName: "Terms of Use", href: "/terms" },
    { displayName: "Privacy Policy", href: "/privacy" },
    { displayName: "Cookie Policy", href: "/cookies" }
];

export default function NavigationLinks({
    links,
    className = "space-x-10"
}: NavigationLinksProps) {
    return (
        <nav className={className}>
            {links.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                    {link.displayName}
                </Link>
            ))}
        </nav>
    );
}