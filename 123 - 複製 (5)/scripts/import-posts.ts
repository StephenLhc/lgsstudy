import { PrismaClient } from "@prisma/client";
import { bibleStudies } from "../posts";

const prisma = new PrismaClient();

async function importPosts() {
  console.log("開始導入文章數據...");

  try {
    // 獲取現有的作者和分類
    const authors = await prisma.author.findMany();
    const categories = await prisma.category.findMany();
    const tags = await prisma.tag.findMany();

    console.log(
      `找到 ${authors.length} 位作者, ${categories.length} 個分類, ${tags.length} 個標籤`
    );

    for (const study of bibleStudies) {
      // 查找或創建作者
      let author = authors.find(
        (a) => a.name === study.author || a.displayName === study.author
      );
      if (!author) {
        author = await prisma.author.create({
          data: {
            name: study.author,
            displayName: study.author,
            email: `${study.author
              .toLowerCase()
              .replace(/\s+/g, ".")}@example.com`, // 生成臨時郵箱
            title: "PASTOR", // 預設為牧師
            bio: `${study.author} - 聖經研讀作者`,
          },
        });
        console.log(`創建新作者: ${author.name}`);
      }

      // 查找相關分類
      let category = categories.find(
        (c) =>
          c.name.includes(study.bibleBook || "") ||
          study.category.includes(c.name)
      );

      // 如果找不到匹配的分類，使用第一個分類作為預設
      if (!category && categories.length > 0) {
        category = categories[0];
      }

      // 確保有分類，如果沒有則跳過這篇文章
      if (!category) {
        console.log(`⚠️ 跳過文章 "${study.title}" - 找不到對應的分類`);
        continue;
      }

      // 查找相關標籤
      const postTags = tags.filter((tag) =>
        study.theologyTags.some(
          (studyTag) =>
            tag.name.includes(studyTag) || studyTag.includes(tag.name)
        )
      );

      // 查找相關的聖經書卷
      let bibleBookId = null;
      if (study.bibleBook) {
        const bibleBook = await prisma.bibleBook.findFirst({
          where: {
            name: {
              contains: study.bibleBook,
            },
          },
        });
        bibleBookId = bibleBook?.id || null;
      }

      // 創建文章
      const post = await prisma.post.create({
        data: {
          title: study.title,
          slug: study.slug,
          content: `# ${study.title}

## 經文
> ${study.bibleVerse}

## 摘要
${study.excerpt}

## 正文內容

這是 ${study.title} 的詳細研讀內容。本文探討了 ${study.bibleBook} ${study.bibleChapter} 的深度含義。

### 背景介紹

在這段經文中，我們可以看到神向我們展示的重要真理...

### 經文解析

讓我們逐節來分析這段經文的含義...

### 應用思考

1. 這段經文對我們現代基督徒有什麼意義？
2. 我們如何將這些真理應用到日常生活中？
3. 神通過這段經文想要教導我們什麼？

### 禱告

親愛的天父，感謝祢透過聖經向我們說話...

---

*本文為聖經研讀材料，歡迎分享和討論。*`,
          excerpt: study.excerpt,
          status: "PUBLISHED", // 使用正確的 enum 值
          featured: Math.random() > 0.7, // 隨機設置一些為精選文章
          readingTime: study.readingTime,
          difficulty: study.difficulty.toUpperCase() as
            | "BEGINNER"
            | "INTERMEDIATE"
            | "ADVANCED",

          // 聖經相關資訊
          bibleBookId: bibleBookId,
          bibleChapter: study.bibleChapter,
          bibleVerse: study.bibleVerse,

          // 關聯
          authorId: author.id,
          categoryId: category?.id,

          // SEO
          metaTitle: study.title,
          metaDescription: study.excerpt,

          // 圖片
          coverImage: study.thumbnail,

          // 設置發布時間
          publishedAt: new Date(),
        },
      });

      // 連接標籤
      if (postTags.length > 0) {
        await prisma.postTag.createMany({
          data: postTags.map((tag) => ({
            postId: post.id,
            tagId: tag.id,
          })),
        });
      }

      console.log(`✓ 創建文章: ${post.title}`);
    }

    console.log("✅ 文章導入完成！");

    // 顯示統計
    const postCount = await prisma.post.count();
    const publishedCount = await prisma.post.count({
      where: {
        status: "PUBLISHED",
      },
    });

    console.log(`📊 統計資訊:`);
    console.log(`   總文章數: ${postCount}`);
    console.log(`   已發布: ${publishedCount}`);
  } catch (error) {
    console.error("導入文章時發生錯誤:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// 執行導入
importPosts();
