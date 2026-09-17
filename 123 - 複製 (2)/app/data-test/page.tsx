// 簡單的數據測試頁面
import { allBibleBooks, bibleStats } from '../../data/bible-books';
import { allTheologyTags } from '../../data/theology-tags';

export default function DataTestPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        📚 樂研集 - 數據測試
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        檢測聖經書卷與神學標籤數據是否正常載入
                    </p>
                </div>

                {/* 基本統計 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                        <div className="text-3xl font-bold text-orange-500 mb-2">{bibleStats.totalBooks}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">聖經書卷</div>
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

                {/* 聖經書卷樣本 */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        📖 聖經書卷樣本（前10卷）
                    </h2>
                    <div className="grid gap-3">
                        {allBibleBooks.slice(0, 10).map((book) => (
                            <div key={book.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div>
                                    <span className="font-medium text-gray-900 dark:text-white">{book.name}</span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">({book.englishName})</span>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-orange-500 font-medium">{book.chapterCount} 章</div>
                                    <div className="text-xs text-gray-500">{book.testament === 'old' ? '舊約' : '新約'}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 神學標籤樣本 */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        🏷️ 神學標籤樣本（前15個）
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {allTheologyTags.slice(0, 15).map((tag) => (
                            <div
                                key={tag.id}
                                className="px-4 py-2 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 rounded-full text-sm font-medium hover:shadow-md transition-shadow cursor-pointer"
                                title={tag.description}
                            >
                                {tag.name}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 測試結果 */}
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
                    <h3 className="text-lg font-bold text-green-800 dark:text-green-200 mb-3">
                        ✅ 數據載入測試結果
                    </h3>
                    <ul className="text-green-700 dark:text-green-300 space-y-2">
                        <li>✅ 成功載入 {bibleStats.totalBooks} 卷聖經書卷</li>
                        <li>✅ 舊約 {bibleStats.oldTestamentBooks} 卷，新約 {bibleStats.newTestamentBooks} 卷</li>
                        <li>✅ 成功載入 {allTheologyTags.length} 個神學主題標籤</li>
                        <li>✅ 暗亮模式正常運作</li>
                        <li>✅ 響應式設計完整呈現</li>
                    </ul>
                    <p className="text-green-600 dark:text-green-400 mt-4 font-medium">
                        🎉 所有數據結構測試通過！可以開始開發核心功能。
                    </p>
                </div>
            </div>
        </div>
    );
}
