'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface SearchFilters {
    query: string;
    category: string;
    tag: string;
    author: string;
    difficulty: string;
    sortBy: string;
    sortOrder: string;
}

interface AdvancedSearchProps {
    categories?: Array<{ id: string; name: string }>;
    tags?: Array<{ id: string; name: string; color?: string }>;
    authors?: Array<{ id: string; name: string }>;
    onSearch?: (filters: SearchFilters) => void;
    className?: string;
}

export default function AdvancedSearch({
    categories = [],
    tags = [],
    authors = [],
    onSearch,
    className = ''
}: AdvancedSearchProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // 從 URL 參數初始化篩選器
    const [filters, setFilters] = useState<SearchFilters>({
        query: searchParams.get('q') || '',
        category: searchParams.get('category') || '',
        tag: searchParams.get('tag') || '',
        author: searchParams.get('author') || '',
        difficulty: searchParams.get('difficulty') || '',
        sortBy: searchParams.get('sortBy') || 'createdAt',
        sortOrder: searchParams.get('sortOrder') || 'desc'
    });

    const [isExpanded, setIsExpanded] = useState(false);

    // 處理搜尋
    const handleSearch = () => {
        if (onSearch) {
            onSearch(filters);
        } else {
            // 更新 URL 參數
            const params = new URLSearchParams();
            Object.entries(filters).forEach(([key, value]) => {
                if (value) params.set(key, value);
            });

            router.push(`/blog?${params.toString()}`);
        }
    };

    // 清除篩選器
    const handleClear = () => {
        const clearedFilters: SearchFilters = {
            query: '',
            category: '',
            tag: '',
            author: '',
            difficulty: '',
            sortBy: 'createdAt',
            sortOrder: 'desc'
        };
        setFilters(clearedFilters);

        if (onSearch) {
            onSearch(clearedFilters);
        } else {
            router.push('/blog');
        }
    };

    // 更新單個篩選器
    const updateFilter = (key: keyof SearchFilters, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    // 檢查是否有篩選條件
    const hasFilters = Object.values(filters).some(value =>
        value && value !== 'createdAt' && value !== 'desc'
    );

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 ${className}`}>
            {/* 搜尋標題列 */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        進階搜尋
                    </h3>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium"
                    >
                        {isExpanded ? '收起篩選' : '展開篩選'}
                    </button>
                </div>
            </div>

            {/* 主要搜尋輸入 */}
            <div className="p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="搜尋文章標題、內容或摘要..."
                            value={filters.query}
                            onChange={(e) => updateFilter('query', e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       placeholder-gray-500 dark:placeholder-gray-400
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 
                       transition-colors duration-200"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleSearch}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 
                       text-white rounded-lg font-medium transition-colors duration-200
                       focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                        >
                            搜尋
                        </button>
                        {hasFilters && (
                            <button
                                onClick={handleClear}
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 
                         text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors duration-200"
                            >
                                清除
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* 進階篩選器 */}
            {isExpanded && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
                    {/* 第一行：分類和標籤 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* 分類篩選 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                分類
                            </label>
                            <select
                                value={filters.category}
                                onChange={(e) => updateFilter('category', e.target.value)}
                                title="選擇文章分類"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400"
                            >
                                <option value="">所有分類</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* 標籤篩選 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                標籤
                            </label>
                            <select
                                value={filters.tag}
                                onChange={(e) => updateFilter('tag', e.target.value)}
                                title="選擇文章標籤"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400"
                            >
                                <option value="">所有標籤</option>
                                {tags.map((tag) => (
                                    <option key={tag.id} value={tag.name}>
                                        {tag.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* 第二行：作者和難度 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* 作者篩選 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                作者
                            </label>
                            <select
                                value={filters.author}
                                onChange={(e) => updateFilter('author', e.target.value)}
                                title="選擇文章作者"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400"
                            >
                                <option value="">所有作者</option>
                                {authors.map((author) => (
                                    <option key={author.id} value={author.name}>
                                        {author.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* 難度篩選 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                難度
                            </label>
                            <select
                                value={filters.difficulty}
                                onChange={(e) => updateFilter('difficulty', e.target.value)}
                                title="選擇文章難度"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400"
                            >
                                <option value="">所有難度</option>
                                <option value="BEGINNER">初學者</option>
                                <option value="INTERMEDIATE">中等</option>
                                <option value="ADVANCED">進階</option>
                            </select>
                        </div>
                    </div>

                    {/* 第三行：排序 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* 排序方式 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                排序方式
                            </label>
                            <select
                                value={filters.sortBy}
                                onChange={(e) => updateFilter('sortBy', e.target.value)}
                                title="選擇排序方式"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400"
                            >
                                <option value="createdAt">發布時間</option>
                                <option value="title">標題</option>
                                <option value="author">作者</option>
                                <option value="views">瀏覽次數</option>
                                <option value="likes">按讚數</option>
                            </select>
                        </div>

                        {/* 排序順序 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                排序順序
                            </label>
                            <select
                                value={filters.sortOrder}
                                onChange={(e) => updateFilter('sortOrder', e.target.value)}
                                title="選擇排序順序"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400"
                            >
                                <option value="desc">降序（新到舊）</option>
                                <option value="asc">升序（舊到新）</option>
                            </select>
                        </div>
                    </div>

                    {/* 搜尋按鈕 */}
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex flex-col sm:flex-row gap-3 justify-end">
                            <button
                                onClick={handleClear}
                                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 
                         text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors duration-200"
                            >
                                重設篩選器
                            </button>
                            <button
                                onClick={handleSearch}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 
                         text-white rounded-lg font-medium transition-colors duration-200
                         focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                            >
                                套用篩選器
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
