// 測試頁面 - 驗證 Prisma 數據庫連接
import { prisma } from "../../lib/prisma";

type CategoryWithBooks = {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    testament: string;
    bookType: string | null;
    order: number;
    bibleBooks: Array<{
        id: string;
        name: string;
    }>;
};

type TagType = {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    tagType: string;
    color: string | null;
};

type AuthorType = {
    id: string;
    name: string;
    displayName: string | null;
    bio: string | null;
    title: string | null;
    church: string | null;
    website: string | null;
    email: string | null;
};

type SettingType = {
    id: string;
    key: string;
    value: string;
    type: string;
    createdAt: Date;
    updatedAt: Date;
};

export default async function TestDataPage() {
    // 獲取一些測試數據
    const categories: CategoryWithBooks[] = await prisma.category.findMany({
        take: 5,
        include: {
            bibleBooks: true,
        },
    });

    const tags: TagType[] = await prisma.tag.findMany({
        take: 10,
    });

    const authors: AuthorType[] = await prisma.author.findMany();

    const settings: SettingType[] = await prisma.siteSetting.findMany();

    return (
        <div className="container mx-auto p-8 min-h-screen bg-gray-50 dark:bg-gray-900">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                Prisma 數據庫測試頁面
            </h1>

            {/* 分類測試 */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                    聖經分類 ({categories.length})
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category: CategoryWithBooks) => (
                        <div
                            key={category.id}
                            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
                        >
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                                {category.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {category.description}
                            </p>
                            <div className="mt-2">
                                <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                                    {category.testament === 'OLD_TESTAMENT' ? '舊約' : '新約'}
                                </span>
                                <span className="ml-2 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                                    {category.bibleBooks.length} 書卷
                                </span>
                            </div>
                            {category.bibleBooks.length > 0 && (
                                <div className="mt-2">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        書卷: {category.bibleBooks.map((book: { id: string; name: string }) => book.name).join(', ')}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* 標籤測試 */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                    神學標籤 ({tags.length})
                </h2>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag: TagType) => (
                        <span
                            key={tag.id}
                            className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm"
                        >
                            {tag.name}
                        </span>
                    ))}
                </div>
            </section>

            {/* 作者測試 */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                    作者 ({authors.length})
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                    {authors.map((author: AuthorType) => (
                        <div
                            key={author.id}
                            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
                        >
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                                {author.displayName || author.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {author.bio}
                            </p>
                            <div className="mt-2 flex gap-2">
                                <span className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-2 py-1 rounded">
                                    {author.title === 'PASTOR' ? '牧師' :
                                        author.title === 'SCHOLAR' ? '學者' :
                                            author.title === 'THEOLOGIAN' ? '神學家' :
                                                author.title === 'TEACHER' ? '教師' :
                                                    author.title === 'LAYPERSON' ? '平信徒' : author.title}
                                </span>
                                {author.church && (
                                    <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded">
                                        {author.church}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 網站設定測試 */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                    網站設定 ({settings.length})
                </h2>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                    <div className="grid gap-2">
                        {settings.map((setting: SettingType) => (
                            <div key={setting.id} className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {setting.key}:
                                </span>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {setting.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
                    ✅ Prisma 數據庫連接成功！
                </h3>
                <p className="text-green-700 dark:text-green-300">
                    數據庫已成功創建並填入種子資料。您可以在 Prisma Studio (http://localhost:5555) 中查看完整的數據。
                </p>
            </div>
        </div>
    );
}
