import {
  PrismaClient,
  Testament,
  BookType,
  AuthorTitle,
  TagType,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("開始種子數據...");

  // 創建分類
  const categories = await Promise.all([
    // 舊約分類
    prisma.category.upsert({
      where: { slug: "torah" },
      update: {},
      create: {
        name: "律法書",
        slug: "torah",
        description: "舊約聖經的前五卷書，記載神的律法和以色列民族的起源",
        testament: Testament.OLD_TESTAMENT,
        bookType: BookType.TORAH,
        order: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: "history" },
      update: {},
      create: {
        name: "歷史書",
        slug: "history",
        description: "記載以色列民族的歷史",
        testament: Testament.OLD_TESTAMENT,
        bookType: BookType.HISTORY,
        order: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: "wisdom" },
      update: {},
      create: {
        name: "詩歌智慧書",
        slug: "wisdom",
        description: "包含詩歌、智慧文學和讚美詩",
        testament: Testament.OLD_TESTAMENT,
        bookType: BookType.WISDOM,
        order: 3,
      },
    }),
    prisma.category.upsert({
      where: { slug: "major-prophets" },
      update: {},
      create: {
        name: "大先知書",
        slug: "major-prophets",
        description: "主要先知的預言書",
        testament: Testament.OLD_TESTAMENT,
        bookType: BookType.MAJOR_PROPHETS,
        order: 4,
      },
    }),
    prisma.category.upsert({
      where: { slug: "minor-prophets" },
      update: {},
      create: {
        name: "小先知書",
        slug: "minor-prophets",
        description: "十二小先知的預言書",
        testament: Testament.OLD_TESTAMENT,
        bookType: BookType.MINOR_PROPHETS,
        order: 5,
      },
    }),
    // 新約分類
    prisma.category.upsert({
      where: { slug: "gospels" },
      update: {},
      create: {
        name: "四福音書",
        slug: "gospels",
        description: "記載耶穌基督生平和教導的四本書",
        testament: Testament.NEW_TESTAMENT,
        bookType: BookType.GOSPELS,
        order: 6,
      },
    }),
    prisma.category.upsert({
      where: { slug: "acts" },
      update: {},
      create: {
        name: "使徒行傳",
        slug: "acts",
        description: "早期基督教會的歷史",
        testament: Testament.NEW_TESTAMENT,
        bookType: BookType.HISTORY,
        order: 7,
      },
    }),
    prisma.category.upsert({
      where: { slug: "pauline" },
      update: {},
      create: {
        name: "保羅書信",
        slug: "pauline",
        description: "使徒保羅寫給教會和個人的書信",
        testament: Testament.NEW_TESTAMENT,
        bookType: BookType.PAULINE,
        order: 8,
      },
    }),
    prisma.category.upsert({
      where: { slug: "general" },
      update: {},
      create: {
        name: "一般書信",
        slug: "general",
        description: "其他使徒寫的書信",
        testament: Testament.NEW_TESTAMENT,
        bookType: BookType.GENERAL,
        order: 9,
      },
    }),
    prisma.category.upsert({
      where: { slug: "revelation" },
      update: {},
      create: {
        name: "啟示錄",
        slug: "revelation",
        description: "關於末世的啟示",
        testament: Testament.NEW_TESTAMENT,
        bookType: BookType.PROPHECY,
        order: 10,
      },
    }),
  ]);

  console.log("分類創建完成");

  // 創建聖經書卷
  const bibleBooks = [
    // 律法書
    {
      name: "創世記",
      englishName: "Genesis",
      abbreviation: "Gen",
      chapterCount: 50,
      testament: Testament.OLD_TESTAMENT,
      bookType: BookType.TORAH,
      order: 1,
      categorySlug: "torah",
    },
    {
      name: "出埃及記",
      englishName: "Exodus",
      abbreviation: "Exo",
      chapterCount: 40,
      testament: Testament.OLD_TESTAMENT,
      bookType: BookType.TORAH,
      order: 2,
      categorySlug: "torah",
    },
    {
      name: "利未記",
      englishName: "Leviticus",
      abbreviation: "Lev",
      chapterCount: 27,
      testament: Testament.OLD_TESTAMENT,
      bookType: BookType.TORAH,
      order: 3,
      categorySlug: "torah",
    },
    {
      name: "民數記",
      englishName: "Numbers",
      abbreviation: "Num",
      chapterCount: 36,
      testament: Testament.OLD_TESTAMENT,
      bookType: BookType.TORAH,
      order: 4,
      categorySlug: "torah",
    },
    {
      name: "申命記",
      englishName: "Deuteronomy",
      abbreviation: "Deu",
      chapterCount: 34,
      testament: Testament.OLD_TESTAMENT,
      bookType: BookType.TORAH,
      order: 5,
      categorySlug: "torah",
    },

    // 四福音書
    {
      name: "馬太福音",
      englishName: "Matthew",
      abbreviation: "Mat",
      chapterCount: 28,
      testament: Testament.NEW_TESTAMENT,
      bookType: BookType.GOSPELS,
      order: 40,
      categorySlug: "gospels",
    },
    {
      name: "馬可福音",
      englishName: "Mark",
      abbreviation: "Mar",
      chapterCount: 16,
      testament: Testament.NEW_TESTAMENT,
      bookType: BookType.GOSPELS,
      order: 41,
      categorySlug: "gospels",
    },
    {
      name: "路加福音",
      englishName: "Luke",
      abbreviation: "Luk",
      chapterCount: 24,
      testament: Testament.NEW_TESTAMENT,
      bookType: BookType.GOSPELS,
      order: 42,
      categorySlug: "gospels",
    },
    {
      name: "約翰福音",
      englishName: "John",
      abbreviation: "Joh",
      chapterCount: 21,
      testament: Testament.NEW_TESTAMENT,
      bookType: BookType.GOSPELS,
      order: 43,
      categorySlug: "gospels",
    },

    // 使徒行傳
    {
      name: "使徒行傳",
      englishName: "Acts",
      abbreviation: "Act",
      chapterCount: 28,
      testament: Testament.NEW_TESTAMENT,
      bookType: BookType.HISTORY,
      order: 44,
      categorySlug: "acts",
    },

    // 詩歌智慧書
    {
      name: "詩篇",
      englishName: "Psalms",
      abbreviation: "Psa",
      chapterCount: 150,
      testament: Testament.OLD_TESTAMENT,
      bookType: BookType.WISDOM,
      order: 19,
      categorySlug: "wisdom",
    },
    {
      name: "箴言",
      englishName: "Proverbs",
      abbreviation: "Pro",
      chapterCount: 31,
      testament: Testament.OLD_TESTAMENT,
      bookType: BookType.WISDOM,
      order: 20,
      categorySlug: "wisdom",
    },
  ];

  for (const book of bibleBooks) {
    const category = categories.find((c) => c.slug === book.categorySlug);
    if (category) {
      await prisma.bibleBook.upsert({
        where: { abbreviation: book.abbreviation },
        update: {},
        create: {
          name: book.name,
          englishName: book.englishName,
          abbreviation: book.abbreviation,
          chapterCount: book.chapterCount,
          testament: book.testament,
          bookType: book.bookType,
          order: book.order,
          categoryId: category.id,
        },
      });
    }
  }

  console.log("聖經書卷創建完成");

  // 創建神學標籤
  const tags = [
    { name: "創造論", slug: "creation-theology", tagType: TagType.THEOLOGY },
    { name: "救恩論", slug: "soteriology", tagType: TagType.THEOLOGY },
    { name: "基督論", slug: "christology", tagType: TagType.THEOLOGY },
    { name: "聖靈論", slug: "pneumatology", tagType: TagType.THEOLOGY },
    { name: "教會論", slug: "ecclesiology", tagType: TagType.THEOLOGY },
    { name: "末世論", slug: "eschatology", tagType: TagType.THEOLOGY },
    { name: "神學", slug: "theology", tagType: TagType.THEOLOGY },
    { name: "護教學", slug: "apologetics", tagType: TagType.THEOLOGY },
    { name: "倫理學", slug: "ethics", tagType: TagType.PRACTICE },
    { name: "禱告", slug: "prayer", tagType: TagType.DEVOTIONAL },
    { name: "敬拜", slug: "worship", tagType: TagType.DEVOTIONAL },
    { name: "靈修", slug: "devotion", tagType: TagType.DEVOTIONAL },
    { name: "聖誕節", slug: "christmas", tagType: TagType.SEASONAL },
    { name: "復活節", slug: "easter", tagType: TagType.SEASONAL },
    { name: "受難週", slug: "passion-week", tagType: TagType.SEASONAL },
  ];

  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: {},
      create: {
        name: tag.name,
        slug: tag.slug,
        tagType: tag.tagType,
      },
    });
  }

  console.log("標籤創建完成");

  // 創建示範作者
  await prisma.author.upsert({
    where: { email: "pastor@example.com" },
    update: {},
    create: {
      email: "pastor@example.com",
      name: "李牧師",
      displayName: "李牧師",
      title: AuthorTitle.PASTOR,
      bio: "資深牧師，致力於聖經教導和靈命培育",
      church: "樂研集教會",
      denomination: "福音派",
    },
  });

  await prisma.author.upsert({
    where: { email: "scholar@example.com" },
    update: {},
    create: {
      email: "scholar@example.com",
      name: "王博士",
      displayName: "王博士",
      title: AuthorTitle.SCHOLAR,
      bio: "聖經學者，專攻新約研究",
      church: "學術研究教會",
      denomination: "改革宗",
    },
  });

  console.log("作者創建完成");

  // 創建一些敏感詞
  const sensitiveWords = [
    { word: "政治敏感", category: "政治", severity: 3 },
    { word: "宗教爭議", category: "宗教", severity: 2 },
    { word: "不當言論", category: "言論", severity: 4 },
  ];

  for (const word of sensitiveWords) {
    await prisma.sensitiveWord.upsert({
      where: { word: word.word },
      update: {},
      create: word,
    });
  }

  console.log("敏感詞創建完成");

  // 創建網站設定
  const settings = [
    { key: "site_name", value: "樂研集", type: "string" },
    {
      key: "site_description",
      value: "香港成年人聖經研讀平台",
      type: "string",
    },
    { key: "max_comment_depth", value: "3", type: "number" },
    { key: "comment_moderation", value: "true", type: "boolean" },
    { key: "enable_guest_comments", value: "false", type: "boolean" },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }

  console.log("網站設定創建完成");

  console.log("種子數據完成！");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
