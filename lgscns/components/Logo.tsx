/**
 * Logo 組件 - 顯示網站標誌和名稱
 * 根據當前主題自動切換對應的圖示
 */

"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface LogoProps {
    /** Logo 大小，預設為 84px (進一步放大以更好匹配文字) */
    size?: number;
    /** 是否顯示文字，預設為 true */
    showText?: boolean;
    /** 文字大小的 CSS 類別，預設為 "text-2xl" */
    textSize?: string;
}

export default function Logo({
    size = 84,
    showText = true,
    textSize = "text-2xl"
}: LogoProps) {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // 載入前顯示預設的亮色版本
    if (!mounted) {
        return (
            <Link href="/" className="flex space-x-2 items-center">
                <Image
                    src="/images/lgsLight.PNG"
                    width={size}
                    height={size}
                    alt="樂研集 標誌"
                    priority
                    className="rounded-lg bg-transparent drop-shadow-sm dark:invert"
                />
                {showText && (
                    <div className={textSize}>
                        樂研集
                    </div>
                )}
            </Link>
        );
    }

    // 根據主題選擇對應的圖示
    const logoSrc = theme === "light" ? "/images/lgsLight.PNG" : "/images/lgsDark.PNG";

    return (
        <Link href="/" className="flex space-x-2 items-center">
            <Image
                src={logoSrc}
                width={size}
                height={size}
                alt="樂研集 標誌"
                priority
                className="rounded-lg bg-transparent drop-shadow-sm dark:invert"
            />
            {showText && (
                <div className={textSize}>
                    樂研集
                </div>
            )}
        </Link>
    );
}