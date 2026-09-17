"use client";

import { useState } from "react";
import BibleSidebar from "./BibleSidebar";

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

interface BibleSectionProps {
    books: BibleBook[];
}

export default function BibleSection({ books }: BibleSectionProps) {
    const [selectedBook, setSelectedBook] = useState<string>("");

    const handleBookSelect = (bookId: string) => {
        setSelectedBook(bookId);
        // TODO: 實現書卷篩選功能
        console.log('選擇書卷:', bookId);
    };

    return (
        <>
            {/* 桌面版聖經側邊欄 */}
            <div className="hidden lg:block lg:w-80 flex-shrink-0">
                <BibleSidebar
                    books={books}
                    selectedBook={selectedBook}
                    onBookSelect={handleBookSelect}
                />
            </div>

            {/* 移動端聖經側邊欄 - 底部顯示 */}
            <div className="lg:hidden mt-12 px-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        聖經書卷快速導覽
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                            <div className="text-2xl mb-2">📖</div>
                            <div className="text-sm font-medium text-orange-800 dark:text-orange-200">
                                {books.filter(book => book.testament === "OLD").length} 卷
                            </div>
                            <div className="text-xs text-orange-600 dark:text-orange-400">舊約</div>
                        </div>
                        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <div className="text-2xl mb-2">✝️</div>
                            <div className="text-sm font-medium text-blue-800 dark:text-blue-200">
                                {books.filter(book => book.testament === "NEW").length} 卷
                            </div>
                            <div className="text-xs text-blue-600 dark:text-blue-400">新約</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
