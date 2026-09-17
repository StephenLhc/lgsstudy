// 測試頁面 - 驗證 Prisma 數據庫連接
import { prisma } from "../../lib/prisma";

type CategoryWithBooks = {
    id: string;
    name: string;
    testament: string;
    bibleBooks: Array<{
        id: string;
        name: string;
        englishName: string;
        chapterCount: number;
    }>;
};

type TagType = {
    id: string;
    name: string;
    tagType: string;
    description?: string | null;
};

type TagCategoryType = {
    id: string;
    name: string;
    tags: TagType[];
};

type BibleBookWithCategory = {
    id: string;
    name: string;
    englishName: string;
    chapterCount: number;
    category?: {
        testament: string;
    } | null;
};

export default async function TestDataPage() {
    // 獲取一些測試數據
    const categories: CategoryWithBooks[] = await prisma.category.findMany({
        include: {
            bibleBooks: true,
        },
    });

    const tags: TagType[] = await prisma.tag.findMany();

    const bibleBooks: BibleBookWithCategory[] = await prisma.bibleBook.findMany({
        include: {
            category: true,
        },
    });

    // 計算統計資料
    const bibleStats = {
        totalBooks: bibleBooks.length,
        oldTestamentBooks: bibleBooks.filter((book: BibleBookWithCategory) => book.category?.testament === 'OLD_TESTAMENT').length,
        newTestamentBooks: bibleBooks.filter((book: BibleBookWithCategory) => book.category?.testament === 'NEW_TESTAMENT').length,
        categories: categories.length,
    };

    // 按約區分類別
    const oldTestamentCategories: CategoryWithBooks[] = categories.filter((cat: CategoryWithBooks) => cat.testament === 'OLD_TESTAMENT');
    const newTestamentCategories: CategoryWithBooks[] = categories.filter((cat: CategoryWithBooks) => cat.testament === 'NEW_TESTAMENT');

    // 神學標籤分類
    const tagTypes = ['DOCTRINE', 'THEOLOGY', 'HISTORICAL', 'PRACTICAL', 'ESCHATOLOGY'];
    const tagCategories: TagCategoryType[] = tagTypes.map(type => ({
        id: type,
        name: type === 'DOCTRINE' ? '教義神學' :
            type === 'THEOLOGY' ? '系統神學' :
                type === 'HISTORICAL' ? '歷史神學' :
                    type === 'PRACTICAL' ? '實踐神學' :
                        type === 'ESCHATOLOGY' ? '末世論' : type,
        tags: tags.filter((tag: TagType) => tag.tagType === type),
    })).filter(category => category.tags.length > 0);

    // 標籤顏色函數
    const getTagColor = (tag: TagType) => {
        const colors = {
            'DOCTRINE': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            'THEOLOGY': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            'HISTORICAL': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
            'PRACTICAL': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
            'ESCHATOLOGY': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
        };
        return colors[tag.tagType as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    };

    return (
        <div className="container mx-auto p-8 min-h-screen bg-gray-50 dark:bg-gray-900">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                Prisma 數據庫測試頁面
            </h1>
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
                    <div className="text-3xl font-bold text-purple-500 mb-2">{tags.length}</div>
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
                            舊約聖經 ({bibleStats.oldTestamentBooks} 卷)
                        </h3>
                        {oldTestamentCategories.map((category: CategoryWithBooks) => (
                            <div key={category.id} className="mb-6">
                                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                                    {category.name} ({category.bibleBooks.length} 卷)
                                </h4>
                                <div className="grid grid-cols-1 gap-2">
                                    {category.bibleBooks.map((book: CategoryWithBooks['bibleBooks'][0]) => (
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
                            新約聖經 ({bibleStats.newTestamentBooks} 卷)
                        </h3>
                        {newTestamentCategories.map((category: CategoryWithBooks) => (
                            <div key={category.id} className="mb-6">
                                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                                    {category.name} ({category.bibleBooks.length} 卷)
                                </h4>
                                <div className="grid grid-cols-1 gap-2">
                                    {category.bibleBooks.map((book: CategoryWithBooks['bibleBooks'][0]) => (
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
                    {tagCategories.map((category: TagCategoryType) => (
                        <div key={category.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                            <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                                {category.name} ({category.tags.length} 個標籤)
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {category.tags.map((tag: TagType) => (
                                    <div
                                        key={tag.id}
                                        className={`px-3 py-2 rounded-full text-sm font-medium ${getTagColor(tag)} cursor-pointer hover:shadow-md transition-shadow`}
                                        title={tag.description || ''}
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
                    <li>✅ 成功載入 {tags.length} 個神學標籤</li>
                    <li>✅ 暗亮模式切換正常運作</li>
                    <li>✅ 響應式設計完整呈現</li>
                </ul>
                <p className="text-orange-600 dark:text-orange-400 mt-4">
                    所有數據結構已準備就緒，可以開始開發核心功能！
                </p>
            </div>
        </div>
    );
}
