'use client'

import { useState } from 'react'
import Image from 'next/image'

interface BlogImageProps {
    index: number
    title: string
    className?: string
}

export default function BlogImage({ index, title, className = '' }: BlogImageProps) {
    const [imageError, setImageError] = useState(false)

    // 圖片映射函數 - 使用更豐富的圖片
    const getPostImage = (index: number) => {
        const images = [
            '/next.svg',
            '/vercel.svg',
            '/next.svg'
        ]
        return images[index % images.length]
    }

    // 備用圖片組件
    const FallbackImage = () => (
        <div className="w-full h-full relative overflow-hidden rounded-lg">
            <Image
                src="/images/errorpage1.png"
                alt="圖片載入失敗"
                fill
                className="object-cover opacity-70"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                    <div className="text-2xl mb-2">📖</div>
                    <div className="text-sm font-medium">
                        {title.length > 20 ? title.substring(0, 20) + '...' : title}
                    </div>
                </div>
            </div>
        </div>
    )

    if (imageError) {
        return <FallbackImage />
    }

    return (
        <Image
            src={getPostImage(index)}
            alt={title}
            width={120}
            height={60}
            className={`opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-300 ${className}`}
            priority={false}
            unoptimized={true}
            onError={() => setImageError(true)}
        />
    )
}
