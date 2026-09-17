"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AuthCallback() {
    const router = useRouter();

    useEffect(() => {
        const handleAuthCallback = async () => {
            try {
                const { data, error } = await supabase.auth.getSession();

                if (error) {
                    console.error('認證回調錯誤:', error);
                    router.push('/login?error=auth_callback_failed');
                    return;
                }

                if (data.session) {
                    // 登入成功，重定向到首頁
                    router.push('/');
                } else {
                    // 沒有會話，重定向到登入頁
                    router.push('/login');
                }
            } catch (error) {
                console.error('處理認證回調時發生錯誤:', error);
                router.push('/login?error=unknown_error');
            }
        };

        handleAuthCallback();
    }, [router]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    處理認證中...
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    請稍候，正在完成登入程序
                </p>
            </div>
        </div>
    );
}
