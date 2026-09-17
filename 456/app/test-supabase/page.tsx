"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function TestSupabasePage() {
    const [status, setStatus] = useState<string>('測試中...');
    const [testResults, setTestResults] = useState<any[]>([]);

    useEffect(() => {
        runTests();
    }, []);

    const runTests = async () => {
        const results = [];

        try {
            // 測試 1: 基本連線
            setStatus('測試 Supabase 連線...');
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

            if (sessionError) {
                results.push({ test: '基本連線', status: '❌ 失敗', error: sessionError.message });
            } else {
                results.push({ test: '基本連線', status: '✅ 成功', data: '連線正常' });
            }

            // 測試 2: 用戶註冊
            setStatus('測試用戶註冊...');
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                email: 'test@example.com',
                password: 'testpassword123'
            });

            if (signUpError) {
                results.push({ test: '用戶註冊', status: '❌ 失敗', error: signUpError.message });
            } else {
                results.push({ test: '用戶註冊', status: '✅ 成功', data: `用戶 ID: ${signUpData.user?.id}` });
            }

            // 測試 3: 用戶登入
            setStatus('測試用戶登入...');
            const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
                email: 'test@example.com',
                password: 'testpassword123'
            });

            if (signInError) {
                results.push({ test: '用戶登入', status: '❌ 失敗', error: signInError.message });
            } else {
                results.push({ test: '用戶登入', status: '✅ 成功', data: `用戶 ID: ${signInData.user?.id}` });
            }

            setStatus('測試完成');
            setTestResults(results);

        } catch (error) {
            setStatus('測試過程中發生錯誤');
            results.push({ test: '整體測試', status: '❌ 錯誤', error: error.message });
            setTestResults(results);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                    🔧 Supabase 連線測試
                </h1>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-large border border-gray-100 dark:border-gray-700 p-8 mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        測試狀態: {status}
                    </h2>

                    <button
                        onClick={runTests}
                        className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors duration-200"
                    >
                        重新執行測試
                    </button>
                </div>

                {testResults.length > 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-large border border-gray-100 dark:border-gray-700 p-8">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            測試結果
                        </h2>

                        <div className="space-y-4">
                            {testResults.map((result, index) => (
                                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {result.test}
                                        </span>
                                        <span className={`font-semibold ${result.status.includes('✅') ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            {result.status}
                                        </span>
                                    </div>

                                    {result.data && (
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            資料: {result.data}
                                        </p>
                                    )}

                                    {result.error && (
                                        <p className="text-sm text-red-600 dark:text-red-400">
                                            錯誤: {result.error}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-8 text-center">
                    <a
                        href="/"
                        className="text-primary-600 dark:text-primary-400 hover:underline"
                    >
                        ← 返回首頁
                    </a>
                </div>
            </div>
        </div>
    );
}
