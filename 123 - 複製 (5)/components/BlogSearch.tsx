"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface SearchFilters {
    searchTerm: string
    categoryId: string
    tagId: string
    difficulty: string
}

interface BlogSearchProps {
    categories: Array<{ id: string; name: string }>;
    tags: Array<{ id: string; name: string }>;
    onSearch?: (filters: SearchFilters) => void;
    onClear?: () => void;
}

export default function BlogSearch({ categories, tags, onSearch, onClear }: BlogSearchProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
    const [selectedTag, setSelectedTag] = useState(searchParams.get('tag') || '');
    const [difficulty, setDifficulty] = useState(searchParams.get('difficulty') || '');

    const handleSearch = () => {
        // 如果有回調函數則使用回調，否則使用路由導航
        if (onSearch) {
            onSearch({
                searchTerm,
                categoryId: selectedCategory,
                tagId: selectedTag,
                difficulty
            });
            return;
        }
        const params = new URLSearchParams();

        if (searchTerm) params.set('search', searchTerm);
        if (selectedCategory) params.set('category', selectedCategory);
        if (selectedTag) params.set('tag', selectedTag);
        if (difficulty) params.set('difficulty', difficulty);

        const queryString = params.toString();
        router.push(`/blog${queryString ? `?${queryString}` : ''}`);
    };

    const clearFilters = () => {
        // 如果有回調函數則使用回調，否則重置本地狀態
        if (onClear) {
            onClear();
            // 同時重置本地狀態
            setSearchTerm('');
            setSelectedCategory('');
            setSelectedTag('');
            setDifficulty('');
            return;
        }

        setSearchTerm('');
        setSelectedCategory('');
        setSelectedTag('');
        setDifficulty('');
        router.push('/blog');
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                🔍 搜索文章
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {/* 搜索框 */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        關鍵字
                    </label>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="搜索標題或內容..."
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                </div>

                {/* 分類選擇 */}
                <div>
                    <label htmlFor="category-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        分類
                    </label>
                    <select
                        id="category-select"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                        <option value="">所有分類</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* 標籤選擇 */}
                <div>
                    <label htmlFor="tag-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        標籤
                    </label>
                    <select
                        id="tag-select"
                        value={selectedTag}
                        onChange={(e) => setSelectedTag(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                        <option value="">所有標籤</option>
                        {tags.map((tag) => (
                            <option key={tag.id} value={tag.id}>
                                {tag.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* 難度選擇 */}
                <div>
                    <label htmlFor="difficulty-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        難度
                    </label>
                    <select
                        id="difficulty-select"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                        <option value="">所有難度</option>
                        <option value="BEGINNER">初級</option>
                        <option value="INTERMEDIATE">中級</option>
                        <option value="ADVANCED">高級</option>
                    </select>
                </div>
            </div>

            {/* 操作按鈕 */}
            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    onClick={handleSearch}
                    className="flex-1 sm:flex-none px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                    🔍 搜索
                </button>
                <button
                    onClick={clearFilters}
                    className="flex-1 sm:flex-none px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                    🔄 清除篩選
                </button>
            </div>
        </div>
    );
}
