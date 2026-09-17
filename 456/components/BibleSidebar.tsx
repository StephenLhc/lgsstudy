"use client";

import { useState } from "react";
import { useTheme } from "next-themes";

interface BibleBook {
    id: string;
    name: string;
    englishName?: string;
    testament: "OLD" | "NEW";
    order: number;
    chapters: number;
    description?: string;
    color?: string;
}

interface BibleSidebarProps {
    books: BibleBook[];
    selectedBook: string;
    onBookSelect: (bookId: string) => void;
}

export default function BibleSidebar({ books, selectedBook, onBookSelect }: BibleSidebarProps) {
    const [expandedOld, setExpandedOld] = useState(true);
    const [expandedNew, setExpandedNew] = useState(true);
    const { theme } = useTheme();

    const oldTestamentBooks = books.filter(book => book.testament === "OLD");
    const newTestamentBooks = books.filter(book => book.testament === "NEW");

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-soft">
            {/* 標題 */}
            <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    📖 聖經書卷導覽
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    選擇書卷開始研讀
                </p>
            </div>

            {/* 舊約 */}
            <div className="mb-6">
                <button
                    onClick={() => setExpandedOld(!expandedOld)}
                    className="flex items-center justify-between w-full p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
                >
                    <div className="flex items-center space-x-2">
                        <span className="text-orange-600 dark:text-orange-400 text-lg">📚</span>
                        <span className="font-semibold text-orange-800 dark:text-orange-200">舊約 (39卷)</span>
                    </div>
                    <span className={`text-orange-600 dark:text-orange-400 transition-transform ${expandedOld ? 'rotate-180' : ''}`}>
                        ▼
                    </span>
                </button>

                {expandedOld && (
                    <div className="mt-3 space-y-1">
                        {oldTestamentBooks.map((book) => (
                            <button
                                key={book.id}
                                onClick={() => onBookSelect(book.id)}
                                className={`w-full text-left p-2 rounded-md text-sm transition-colors ${selectedBook === book.id
                                    ? 'bg-orange-100 dark:bg-orange-800 text-orange-800 dark:text-orange-200'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/10'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-medium">{book.name}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {book.chapters}章
                                    </span>
                                </div>
                                {book.englishName && (
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        {book.englishName}
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* 新約 */}
            <div className="mb-6">
                <button
                    onClick={() => setExpandedNew(!expandedNew)}
                    className="flex items-center justify-between w-full p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                >
                    <div className="flex items-center space-x-2">
                        <span className="text-blue-600 dark:text-blue-400 text-lg">✝️</span>
                        <span className="font-semibold text-blue-800 dark:text-blue-200">新約 (27卷)</span>
                    </div>
                    <span className={`text-blue-600 dark:text-blue-400 transition-transform ${expandedNew ? 'rotate-180' : ''}`}>
                        ▼
                    </span>
                </button>

                {expandedNew && (
                    <div className="mt-3 space-y-1">
                        {newTestamentBooks.map((book) => (
                            <button
                                key={book.id}
                                onClick={() => onBookSelect(book.id)}
                                className={`w-full text-left p-2 rounded-md text-sm transition-colors ${selectedBook === book.id
                                    ? 'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/10'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-medium">{book.name}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {book.chapters}章
                                    </span>
                                </div>
                                {book.englishName && (
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        {book.englishName}
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* 快速統計 */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                        <div className="text-2xl mb-1">📖</div>
                        <div className="text-sm font-medium text-orange-800 dark:text-orange-200">
                            {oldTestamentBooks.length} 卷
                        </div>
                        <div className="text-xs text-orange-600 dark:text-orange-400">舊約</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-2xl mb-1">✝️</div>
                        <div className="text-sm font-medium text-blue-800 dark:text-blue-200">
                            {newTestamentBooks.length} 卷
                        </div>
                        <div className="text-xs text-blue-600 dark:text-blue-400">新約</div>
                    </div>
                </div>
                <div className="text-center mt-3">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {books.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">總書卷數</div>
                </div>
            </div>
        </div>
    );
}
