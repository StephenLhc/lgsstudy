import React from 'react';
import Link from 'next/link';

interface ReadingPlan {
    name: string;
    progress: number;
    currentBook: string;
    currentChapter: string;
    todayReading: string;
    nextReading: string;
}

interface ReadingPlanCardProps {
    readingPlan: ReadingPlan;
}

export default function ReadingPlanCard({ readingPlan }: ReadingPlanCardProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    讀經計劃
                </h3>
                <Link
                    href="/reading-plan"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                    管理計劃
                </Link>
            </div>

            {/* 計劃信息 */}
            <div className="mb-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    {readingPlan.name}
                </h4>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                    目前進度：{readingPlan.currentBook} {readingPlan.currentChapter}
                </div>
            </div>

            {/* 進度條 */}
            <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">完成進度</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                        {readingPlan.progress}%
                    </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 relative overflow-hidden">
                    <div
                        className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-300 absolute top-0 left-0"
                        data-progress={Math.min(Math.max(readingPlan.progress, 0), 100)}
                    />
                </div>
                <style jsx>{`
                    div[data-progress] {
                        width: ${Math.min(Math.max(readingPlan.progress, 0), 100)}%;
                    }
                `}</style>
            </div>

            {/* 今日讀經 */}
            <div className="space-y-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-1">
                        今日讀經
                    </div>
                    <div className="text-blue-800 dark:text-blue-200">
                        {readingPlan.todayReading}
                    </div>
                </div>

                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        明日讀經
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                        {readingPlan.nextReading}
                    </div>
                </div>
            </div>

            {/* 行動按鈕 */}
            <div className="mt-4 flex space-x-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    開始今日讀經
                </button>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors">
                    查看筆記
                </button>
            </div>
        </div>
    );
}
