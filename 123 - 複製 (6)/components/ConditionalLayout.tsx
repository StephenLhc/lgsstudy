'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'

interface ConditionalLayoutProps {
    children: React.ReactNode
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
    const pathname = usePathname()

    // 如果是 admin 路徑，不顯示 Header
    const isAdminRoute = pathname?.startsWith('/admin')

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
            {!isAdminRoute && <Header />}
            <div className="max-w-7xl mx-auto px-2">
                {children}
            </div>
        </div>
    )
}
