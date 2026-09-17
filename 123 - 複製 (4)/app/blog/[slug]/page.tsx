import { notFound } from 'next/navigation';
import { bibleStudies } from '../../../posts';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPostProps {
    params: {
        slug: string;
    };
}

// 生成靜態路由
export async function generateStaticParams() {
    return bibleStudies.map((study) => ({
        slug: study.slug,
    }));
}

// 生成 metadata
export async function generateMetadata({ params }: BlogPostProps) {
    const resolvedParams = await params;
    const study = bibleStudies.find((s) => s.slug === resolvedParams.slug);

    if (!study) {
        return {
            title: '文章不存在 - 樂研集',
        };
    }

    return {
        title: `${study.title} - 樂研集`,
        description: study.excerpt,
        keywords: [...study.theologyTags, study.bibleBook],
    };
}

export default async function BlogPost({ params }: BlogPostProps) {
    const resolvedParams = await params;
    const study = bibleStudies.find((s) => s.slug === resolvedParams.slug);

    if (!study) {
        notFound();
    }

    return (
        <div>
            <Header />

            <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-800 dark:to-gray-900 py-16">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="text-center space-y-6">
                            {/* 麵包屑導航 */}
                            <nav className="text-sm text-gray-600 dark:text-gray-400">
                                <Link href="/" className="hover:text-orange-500">首頁</Link>
                                <span className="mx-2">/</span>
                                <Link href="/blog" className="hover:text-orange-500">聖經研讀</Link>
                                <span className="mx-2">/</span>
                                <span className="text-gray-900 dark:text-white">{study.title}</span>
                            </nav>

                            {/* 文章標題 */}
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                                {study.title}
                            </h1>

                            {/* 文章描述 */}
                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                {study.excerpt}
                            </p>

                            {/* 文章元資訊 */}
                            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{study.bibleBook} {study.bibleChapter}:{study.bibleVerse}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <span>難度：{study.difficulty}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                    </svg>
                                    <span>閱讀時間：{study.readingTime} 分鐘</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </svg>
                                    <span>{study.date}</span>
                                </div>
                            </div>

                            {/* 標籤 */}
                            <div className="flex flex-wrap justify-center gap-2">
                                {study.theologyTags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-orange-500 text-white text-sm rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 文章內容 */}
                <section className="py-16">
                    <div className="max-w-4xl mx-auto px-4">
                        <article className="prose prose-lg dark:prose-invert max-w-none">
                            {/* 縮圖 */}
                            <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
                                <Image
                                    src={study.thumbnail}
                                    alt={study.title}
                                    width={800}
                                    height={400}
                                    className="w-full h-64 md:h-80 object-cover"
                                />
                            </div>

                            {/* 文章內容 - 目前先顯示描述，稍後會加入 MDX 內容 */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    研讀重點
                                </h2>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                    {study.excerpt}
                                </p>

                                {/* 這裡稍後會加入實際的 MDX 內容 */}
                                <div className="space-y-6 text-gray-700 dark:text-gray-300">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        經文背景
                                    </h3>
                                    <p>
                                        {study.bibleBook} {study.bibleChapter}:{study.bibleVerse} 是一段充滿智慧和啟示的經文。
                                        透過深入研讀這段經文，我們可以更深刻地理解神的心意和祂對我們生命的計劃。
                                    </p>

                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        研讀指引
                                    </h3>
                                    <p>
                                        在研讀這段經文時，建議您準備好聖經、筆記本和禱告的心。
                                        讓聖靈引導您的思考，並思考這段經文如何應用在您的日常生活中。
                                    </p>

                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        反思問題
                                    </h3>
                                    <ul className="list-disc list-inside space-y-2">
                                        <li>這段經文向我們啟示了神的哪些屬性？</li>
                                        <li>我們可以從中學到什麼實用的生活原則？</li>
                                        <li>這段經文如何幫助我們更好地愛神和愛人？</li>
                                    </ul>
                                </div>
                            </div>
                        </article>

                        {/* 相關文章 */}
                        <section className="mt-16">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                                相關研讀文章
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {bibleStudies
                                    .filter(s => s.slug !== study.slug)
                                    .slice(0, 2)
                                    .map((relatedStudy) => (
                                        <Link
                                            key={relatedStudy.slug}
                                            href={`/blog/${relatedStudy.slug}`}
                                            className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
                                        >
                                            <div className="h-48 w-full relative overflow-hidden">
                                                <Image
                                                    src={relatedStudy.thumbnail}
                                                    alt={relatedStudy.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                            <div className="p-6">
                                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-orange-500 transition-colors">
                                                    {relatedStudy.title}
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                                                    {relatedStudy.excerpt}
                                                </p>
                                                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-500">
                                                    <span>{relatedStudy.bibleBook} {relatedStudy.bibleChapter}:{relatedStudy.bibleVerse}</span>
                                                    <span>{relatedStudy.readingTime} 分鐘</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                            </div>
                        </section>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
