import { PrismaClient } from "@prisma/client";
import { bibleBooks, defaultCategories, defaultTags } from "./bibleData";

const prisma = new PrismaClient();

export async function initializeDatabase() {
  try {
    console.log("開始初始化資料庫...");

    // 初始化聖經書卷
    console.log("初始化聖經書卷...");
    for (const book of bibleBooks) {
      await prisma.bibleBook.upsert({
        where: { name: book.name },
        update: {},
        create: {
          name: book.name,
          englishName: book.englishName,
          testament: book.testament,
          order: book.order,
          chapters: book.chapters,
          description: book.description,
          color: book.color,
        },
      });
    }
    console.log("✅ 聖經書卷初始化完成");

    // 初始化分類
    console.log("初始化分類...");
    for (const category of defaultCategories) {
      await prisma.category.upsert({
        where: { slug: category.slug },
        update: {},
        create: {
          name: category.name,
          slug: category.slug,
          description: category.description,
          color: category.color,
          icon: category.icon,
          order: category.order,
        },
      });
    }
    console.log("✅ 分類初始化完成");

    // 初始化標籤
    console.log("初始化標籤...");
    for (const tag of defaultTags) {
      await prisma.tag.upsert({
        where: { slug: tag.slug },
        update: {},
        create: {
          name: tag.name,
          slug: tag.slug,
          description: tag.description,
          color: tag.color,
          count: tag.count,
        },
      });
    }
    console.log("✅ 標籤初始化完成");

    console.log("🎉 資料庫初始化完成！");
  } catch (error) {
    console.error("❌ 資料庫初始化失敗:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// 如果直接執行此腳本
if (require.main === module) {
  initializeDatabase()
    .then(() => {
      console.log("資料庫初始化腳本執行完成");
      process.exit(0);
    })
    .catch((error) => {
      console.error("資料庫初始化腳本執行失敗:", error);
      process.exit(1);
    });
}
