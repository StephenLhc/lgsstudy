'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ErrorImageProps {
    src: string;
    alt: string;
    className?: string;
    fallbackTitle?: string;
    fallbackSubtitle?: string;
    fill?: boolean;
    width?: number;
    height?: number;
    sizes?: string;
    priority?: boolean;
}

export default function ErrorImage({
    src,
    alt,
    className = '',
    fallbackTitle = '圖片載入失敗',
    fallbackSubtitle = '使用預設圖片顯示',
    fill = false,
    width,
    height,
    sizes,
    priority = false
}: ErrorImageProps) {
    const [imageError, setImageError] = useState(false);

    if (imageError) {
        return (
            <div className={`relative overflow-hidden ${className}`}>
                <Image
                    src="/images/errorpage.png"
                    alt="錯誤頁面圖片"
                    fill={fill}
                    width={!fill ? width : undefined}
                    height={!fill ? height : undefined}
                    className="object-cover"
                    sizes={sizes}
                    priority={priority}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center text-white p-4">
                        <div className="text-2xl mb-2">📖</div>
                        <h3 className="text-sm font-bold mb-1">{fallbackTitle}</h3>
                        <p className="text-xs opacity-80">{fallbackSubtitle}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Image
            src={src}
            alt={alt}
            fill={fill}
            width={!fill ? width : undefined}
            height={!fill ? height : undefined}
            className={className}
            sizes={sizes}
            priority={priority}
            onError={() => setImageError(true)}
        />
    );
}
