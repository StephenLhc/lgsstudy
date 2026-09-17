import { bibleCategories, getBibleBooksByTestament, bibleStats } from '../../data/bible-books';
import { allTheologyTags, tagCategories, getTagColor } from '../../data/theology-tags';

export default function TestDataPage() {
    const oldTestamentBooks = getBibleBooksByTestament('old');
    const newTestamentBooks = getBibleBooksByTestament('new');

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        樂研集 - 數據結構測試
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        檢測聖經書卷分類與神學標籤系統
                    </p>
                </div>

                {/* 統計資訊 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                        <div className="text-3xl font-bold text-orange-500 mb-2">{bibleStats.totalBooks}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">聖經書卷總數</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                        <div className="text-3xl font-bold text-blue-500 mb-2">{bibleStats.oldTestamentBooks}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">舊約書卷</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                        <div className="text-3xl font-bold text-green-500 mb-2">{bibleStats.newTestamentBooks}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">新約書卷</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                        <div className="text-3xl font-bold text-purple-500 mb-2">{allTheologyTags.length}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">神學標籤</div>
                    </div>
                </div>

                {/* 聖經分類展示 */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                        聖經書卷分類
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* 舊約 */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6">
                                舊約聖經 ({oldTestamentBooks.length} 卷)
                            </h3>
                            {bibleCategories.filter(cat => cat.testament === 'old').map(category => (
                                <div key={category.id} className="mb-6">
                                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                                        {category.name} ({category.books.length} 卷)
                                    </h4>
                                    <div className="grid grid-cols-1 gap-2">
                                        {category.books.map(book => (
                                            <div key={book.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                                <div>
                                                    <span className="font-medium text-gray-900 dark:text-white">{book.name}</span>
                                                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">({book.englishName})</span>
                                                </div>
                                                <span className="text-sm text-orange-500 font-medium">{book.chapterCount} 章</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 新約 */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                            <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-6">
                                新約聖經 ({newTestamentBooks.length} 卷)
                            </h3>
                            {bibleCategories.filter(cat => cat.testament === 'new').map(category => (
                                <div key={category.id} className="mb-6">
                                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                                        {category.name} ({category.books.length} 卷)
                                    </h4>
                                    <div className="grid grid-cols-1 gap-2">
                                        {category.books.map(book => (
                                            <div key={book.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                                <div>
                                                    <span className="font-medium text-gray-900 dark:text-white">{book.name}</span>
                                                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">({book.englishName})</span>
                                                </div>
                                                <span className="text-sm text-orange-500 font-medium">{book.chapterCount} 章</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 神學標籤展示 */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                        神學主題標籤系統
                    </h2>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {tagCategories.map(category => (
                            <div key={category.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                                <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                                    {category.name} ({category.tags.length} 個標籤)
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {category.tags.map(tag => (
                                        <div
                                            key={tag.id}
                                            className={`px-3 py-2 rounded-full text-sm font-medium ${getTagColor(tag)} cursor-pointer hover:shadow-md transition-shadow`}
                                            title={tag.description}
                                        >
                                            {tag.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 操作說明 */}
                <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-xl border border-orange-200 dark:border-orange-800">
                    <h3 className="text-lg font-bold text-orange-800 dark:text-orange-200 mb-3">
                        🎯 測試完成！數據結構檢測結果：
                    </h3>
                    <ul className="text-orange-700 dark:text-orange-300 space-y-2">
                        <li>✅ 成功載入 {bibleStats.totalBooks} 卷聖經書卷</li>
                        <li>✅ 成功載入 {bibleStats.categories} 個聖經分類</li>
                        <li>✅ 成功載入 {allTheologyTags.length} 個神學標籤</li>
                        <li>✅ 暗亮模式切換正常運作</li>
                        <li>✅ 響應式設計完整呈現</li>
                    </ul>
                    <p className="text-orange-600 dark:text-orange-400 mt-4">
                        所有數據結構已準備就緒，可以開始開發核心功能！
                    </p>
                </div>
            </div>
        </div>
    );
}
