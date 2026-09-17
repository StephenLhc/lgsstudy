"use client";

import { useState, useMemo } from 'react';
import { IBibleStudy } from '../posts';
import { allBibleBooks } from '../data/bible-books';
import { allTheologyTags } from '../data/theology-tags';

interface SearchAndFilterProps {
    studies: IBibleStudy[];
    onFilteredStudies: (filtered: IBibleStudy[]) => void;
}

export default function SearchAndFilter({ studies, onFilteredStudies }: SearchAndFilterProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBook, setSelectedBook] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('');
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    const bibleBooks = allBibleBooks;
    const theologyTags = allTheologyTags;

    // 篩選邏輯
    const filteredStudies = useMemo(() => {
        let filtered = studies;

        // 文字搜尋
        if (searchTerm) {
            filtered = filtered.filter(study =>
                study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                study.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                study.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                study.bibleVerse?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // 聖經書卷篩選
        if (selectedBook) {
            filtered = filtered.filter(study => study.bibleBook === selectedBook);
        }

        // 神學標籤篩選
        if (selectedTag) {
            filtered = filtered.filter(study => study.theologyTags.includes(selectedTag));
        }

        // 難度篩選
        if (selectedDifficulty) {
            filtered = filtered.filter(study => study.difficulty === selectedDifficulty);
        }

        return filtered;
    }, [studies, searchTerm, selectedBook, selectedTag, selectedDifficulty]);

    // 更新篩選結果
    useMemo(() => {
        onFilteredStudies(filteredStudies);
    }, [filteredStudies, onFilteredStudies]);

    // 清除所有篩選
    const clearAllFilters = () => {
        setSearchTerm('');
        setSelectedBook('');
        setSelectedTag('');
        setSelectedDifficulty('');
    };

    // 取得難度的中文顯示
    const getDifficultyLabel = (difficulty: string) => {
        switch (difficulty) {
            case 'beginner': return '初級';
            case 'intermediate': return '中級';
            case 'advanced': return '高級';
            default: return difficulty;
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
            {/* 搜尋框 */}
            <div className="mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="搜尋文章標題、內容、作者或經文..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <svg
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>

            {/* 篩選器切換按鈕 (手機版) */}
            <div className="md:hidden mb-4">
                <button
                    onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                    className="w-full flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                    <span className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                        </svg>
                        篩選器
                    </span>
                    <svg
                        className={`w-5 h-5 transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {/* 篩選器 */}
            <div className={`${isFiltersOpen ? 'block' : 'hidden'} md:block`}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

                    {/* 聖經書卷篩選 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            聖經書卷
                        </label>
                        <select
                            value={selectedBook}
                            onChange={(e) => setSelectedBook(e.target.value)}
                            title="選擇聖經書卷"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                        >
                            <option value="">所有書卷</option>
                            <optgroup label="舊約聖經">
                                {bibleBooks.filter((book) => book.testament === 'old').map((book) => (
                                    <option key={book.name} value={book.name}>
                                        {book.name}
                                    </option>
                                ))}
                            </optgroup>
                            <optgroup label="新約聖經">
                                {bibleBooks.filter((book) => book.testament === 'new').map((book) => (
                                    <option key={book.name} value={book.name}>
                                        {book.name}
                                    </option>
                                ))}
                            </optgroup>
                        </select>
                    </div>

                    {/* 神學標籤篩選 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            神學主題
                        </label>
                        <select
                            value={selectedTag}
                            onChange={(e) => setSelectedTag(e.target.value)}
                            title="選擇神學主題"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                        >
                            <option value="">所有主題</option>
                            {theologyTags.map((tag) => (
                                <option key={tag.name} value={tag.name}>
                                    {tag.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* 難度篩選 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            難度等級
                        </label>
                        <select
                            value={selectedDifficulty}
                            onChange={(e) => setSelectedDifficulty(e.target.value)}
                            title="選擇難度等級"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                        >
                            <option value="">所有難度</option>
                            <option value="beginner">初級</option>
                            <option value="intermediate">中級</option>
                            <option value="advanced">高級</option>
                        </select>
                    </div>

                    {/* 清除按鈕 */}
                    <div className="flex items-end">
                        <button
                            onClick={clearAllFilters}
                            disabled={!searchTerm && !selectedBook && !selectedTag && !selectedDifficulty}
                            className="w-full px-4 py-2 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:dark:bg-gray-600 text-white rounded-lg transition-colors text-sm disabled:cursor-not-allowed"
                        >
                            清除篩選
                        </button>
                    </div>
                </div>

                {/* 當前篩選條件顯示 */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {searchTerm && (
                        <span className="inline-flex items-center px-3 py-1 bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 rounded-full text-sm">
                            搜尋: {searchTerm}
                            <button
                                onClick={() => setSearchTerm('')}
                                className="ml-2 w-4 h-4 rounded-full bg-orange-200 dark:bg-orange-800 hover:bg-orange-300 dark:hover:bg-orange-700 flex items-center justify-center"
                            >
                                ×
                            </button>
                        </span>
                    )}
                    {selectedBook && (
                        <span className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full text-sm">
                            書卷: {selectedBook}
                            <button
                                onClick={() => setSelectedBook('')}
                                className="ml-2 w-4 h-4 rounded-full bg-blue-200 dark:bg-blue-800 hover:bg-blue-300 dark:hover:bg-blue-700 flex items-center justify-center"
                            >
                                ×
                            </button>
                        </span>
                    )}
                    {selectedTag && (
                        <span className="inline-flex items-center px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-full text-sm">
                            主題: {selectedTag}
                            <button
                                onClick={() => setSelectedTag('')}
                                className="ml-2 w-4 h-4 rounded-full bg-green-200 dark:bg-green-800 hover:bg-green-300 dark:hover:bg-green-700 flex items-center justify-center"
                            >
                                ×
                            </button>
                        </span>
                    )}
                    {selectedDifficulty && (
                        <span className="inline-flex items-center px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-full text-sm">
                            難度: {getDifficultyLabel(selectedDifficulty)}
                            <button
                                onClick={() => setSelectedDifficulty('')}
                                className="ml-2 w-4 h-4 rounded-full bg-purple-200 dark:bg-purple-800 hover:bg-purple-300 dark:hover:bg-purple-700 flex items-center justify-center"
                            >
                                ×
                            </button>
                        </span>
                    )}
                </div>
            </div>

            {/* 結果統計 */}
            <div className="text-sm text-gray-600 dark:text-gray-400">
                顯示 {filteredStudies.length} 篇文章
                {filteredStudies.length !== studies.length && (
                    <span> (共 {studies.length} 篇)</span>
                )}
            </div>
        </div>
    );
}
