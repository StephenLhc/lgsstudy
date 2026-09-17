"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "./AuthContext";

const navItems = [
    { name: "首頁", href: "/" },
    { name: "關於頁", href: "/about" },
    { name: "聯絡頁", href: "/contact" },
    { name: "其他頁", href: "/other" },
    { name: "鳴謝頁", href: "/thanks" },
];

export default function Navbar() {
    const { theme, setTheme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, signOut: handleLogout } = useAuth();
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
        if (theme) {
            setTheme(theme === "light" ? "dark" : "light");
        }
    };

    // 登出處理
    const logout = async () => {
        try {
            await handleLogout();
        } catch (error) {
            console.error('登出失敗:', error);
        }
    };

    return (
        <nav className="w-full bg-white dark:bg-gray-800 shadow-soft dark:shadow-lg rounded-b-xl px-2 md:px-3 py-4 flex justify-between items-center relative">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
                <Image
                    src={theme === "light" ? "/images/lgsLight.png" : "/images/lgsDark.png"}
                    alt="樂研集 Logo"
                    width={40}
                    height={40}
                    className="rounded-full shadow-soft"
                    priority
                />
                <span className="text-xl font-bold tracking-wide text-primary-600 dark:text-primary-400">樂研集</span>
            </Link>

            {/* 桌面版選單 */}
            <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="text-base font-medium px-3 py-2 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                    >
                        {item.name}
                    </Link>
                ))}

                {/* 暗亮模式切換 */}
                <button
                    type="button"
                    onClick={toggleTheme}
                    className="p-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-soft focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 hover:shadow-medium"
                    aria-label="切換暗亮模式"
                >
                    <Image
                        src={theme === "light" ? "/darkmode.svg" : "/lightmode.svg"}
                        alt={theme === "light" ? "切換暗模式" : "切換明亮模式"}
                        width={24}
                        height={24}
                        priority
                    />
                </button>

                {/* 用戶區域 */}
                {user ? (
                    <div className="flex items-center space-x-3">
                        <Link href="/profile" className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-150">
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-primary-100 dark:bg-primary-900/20">
                                {user.user_metadata?.avatar_url ? (
                                    <Image
                                        src={user.user_metadata.avatar_url}
                                        alt={user.user_metadata?.full_name || user.email}
                                        width={32}
                                        height={32}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-primary-600 dark:text-primary-400">
                                        👤
                                    </div>
                                )}
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden lg:block">
                                {user.user_metadata?.full_name || user.email}
                            </span>
                        </Link>
                        <button
                            onClick={logout}
                            className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-150"
                        >
                            登出
                        </button>
                    </div>
                ) : (
                    <Link
                        href="/login"
                        className="px-6 py-2 rounded-xl bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white font-semibold shadow-soft hover:shadow-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200"
                    >
                        <span>登入</span>
                    </Link>
                )}
            </div>

            {/* 行動版漢堡選單按鈕 */}
            <div className="md:hidden flex items-center space-x-2">
                {user && (
                    <Link href="/profile" className="w-8 h-8 rounded-full overflow-hidden bg-primary-100 dark:bg-primary-900/20">
                        {user.user_metadata?.avatar_url ? (
                            <Image
                                src={user.user_metadata.avatar_url}
                                alt={user.user_metadata?.full_name || user.email}
                                width={32}
                                height={32}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-primary-600 dark:text-primary-400 text-sm">
                                👤
                            </div>
                        )}
                    </Link>
                )}

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="focus:outline-none p-2"
                    aria-label={menuOpen ? "關閉選單" : "開啟選單"}
                >
                    {menuOpen ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600 dark:text-primary-400">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600 dark:text-primary-400">
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
                    className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-large z-50 flex flex-col items-center py-6 animate-fade-in"
                >
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="w-11/12 text-base font-medium px-3 py-3 rounded-xl mb-2 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                            onClick={() => setMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}

                    <div className="flex flex-col space-y-3 mt-4 w-11/12">
                        <button
                            onClick={toggleTheme}
                            className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-soft focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 flex items-center justify-center space-x-2"
                            aria-label="切換暗亮模式"
                        >
                            <Image
                                src={theme === "light" ? "/darkmode.svg" : "/lightmode.svg"}
                                alt={theme === "light" ? "切換暗模式" : "切換明亮模式"}
                                width={20}
                                height={20}
                                priority
                            />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {theme === "light" ? "切換暗模式" : "切換明亮模式"}
                            </span>
                        </button>

                        {user ? (
                            <button
                                onClick={logout}
                                className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                            >
                                登出
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                className="w-full px-4 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white font-semibold shadow-soft focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 text-center"
                                onClick={() => setMenuOpen(false)}
                            >
                                登入
                            </Link>
                        )}
                    </div>
                </div>
            )}

            {/* 動畫 keyframes */}
            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.2s ease-out;
                }
            `}</style>
        </nav>
    );
}
