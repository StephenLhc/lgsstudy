// 聖經書卷分類數據結構
export interface BibleBook {
  id: string;
  name: string;
  englishName: string;
  chapterCount: number;
  category: string;
  testament: "old" | "new";
  description?: string;
}

export interface BibleCategory {
  id: string;
  name: string;
  englishName: string;
  testament: "old" | "new";
  books: BibleBook[];
}

// 舊約聖經書卷（39卷）
export const oldTestamentBooks: BibleBook[] = [
  // 摩西五經 (Torah/Pentateuch)
  {
    id: "gen",
    name: "創世記",
    englishName: "Genesis",
    chapterCount: 50,
    category: "torah",
    testament: "old",
    description: "神的創造與人類歷史的開端",
  },
  {
    id: "exo",
    name: "出埃及記",
    englishName: "Exodus",
    chapterCount: 40,
    category: "torah",
    testament: "old",
    description: "以色列人出埃及與律法的頒布",
  },
  {
    id: "lev",
    name: "利未記",
    englishName: "Leviticus",
    chapterCount: 27,
    category: "torah",
    testament: "old",
    description: "祭司制度與聖潔生活的律法",
  },
  {
    id: "num",
    name: "民數記",
    englishName: "Numbers",
    chapterCount: 36,
    category: "torah",
    testament: "old",
    description: "以色列人在曠野的四十年",
  },
  {
    id: "deu",
    name: "申命記",
    englishName: "Deuteronomy",
    chapterCount: 34,
    category: "torah",
    testament: "old",
    description: "摩西的臨別訓言與律法重申",
  },

  // 歷史書 (Historical Books)
  {
    id: "jos",
    name: "約書亞記",
    englishName: "Joshua",
    chapterCount: 24,
    category: "history",
    testament: "old",
    description: "征服迦南地的歷史",
  },
  {
    id: "jdg",
    name: "士師記",
    englishName: "Judges",
    chapterCount: 21,
    category: "history",
    testament: "old",
    description: "士師時代的興衰循環",
  },
  {
    id: "rut",
    name: "路得記",
    englishName: "Ruth",
    chapterCount: 4,
    category: "history",
    testament: "old",
    description: "忠誠與救贖的美麗故事",
  },
  {
    id: "1sa",
    name: "撒母耳記上",
    englishName: "1 Samuel",
    chapterCount: 31,
    category: "history",
    testament: "old",
    description: "從士師時代到王國建立",
  },
  {
    id: "2sa",
    name: "撒母耳記下",
    englishName: "2 Samuel",
    chapterCount: 24,
    category: "history",
    testament: "old",
    description: "大衛王的統治時期",
  },
  {
    id: "1ki",
    name: "列王紀上",
    englishName: "1 Kings",
    chapterCount: 22,
    category: "history",
    testament: "old",
    description: "所羅門王與王國分裂",
  },
  {
    id: "2ki",
    name: "列王紀下",
    englishName: "2 Kings",
    chapterCount: 25,
    category: "history",
    testament: "old",
    description: "分裂王國至被擄",
  },
  {
    id: "1ch",
    name: "歷代志上",
    englishName: "1 Chronicles",
    chapterCount: 29,
    category: "history",
    testament: "old",
    description: "從亞當到大衛的族譜與歷史",
  },
  {
    id: "2ch",
    name: "歷代志下",
    englishName: "2 Chronicles",
    chapterCount: 36,
    category: "history",
    testament: "old",
    description: "所羅門到被擄的歷史",
  },
  {
    id: "ezr",
    name: "以斯拉記",
    englishName: "Ezra",
    chapterCount: 10,
    category: "history",
    testament: "old",
    description: "被擄歸回與聖殿重建",
  },
  {
    id: "neh",
    name: "尼希米記",
    englishName: "Nehemiah",
    chapterCount: 13,
    category: "history",
    testament: "old",
    description: "耶路撒冷城牆重建與改革",
  },
  {
    id: "est",
    name: "以斯帖記",
    englishName: "Esther",
    chapterCount: 10,
    category: "history",
    testament: "old",
    description: "神在隱藏中的護理與拯救",
  },

  // 詩歌智慧書 (Wisdom Literature)
  {
    id: "job",
    name: "約伯記",
    englishName: "Job",
    chapterCount: 42,
    category: "wisdom",
    testament: "old",
    description: "苦難與信心的深度探討",
  },
  {
    id: "psa",
    name: "詩篇",
    englishName: "Psalms",
    chapterCount: 150,
    category: "wisdom",
    testament: "old",
    description: "讚美、禱告與靈修的詩集",
  },
  {
    id: "pro",
    name: "箴言",
    englishName: "Proverbs",
    chapterCount: 31,
    category: "wisdom",
    testament: "old",
    description: "智慧與敬虔生活的教導",
  },
  {
    id: "ecc",
    name: "傳道書",
    englishName: "Ecclesiastes",
    chapterCount: 12,
    category: "wisdom",
    testament: "old",
    description: "人生意義與虛空的思辨",
  },
  {
    id: "sng",
    name: "雅歌",
    englishName: "Song of Solomon",
    chapterCount: 8,
    category: "wisdom",
    testament: "old",
    description: "愛情與屬靈關係的詩歌",
  },

  // 大先知書 (Major Prophets)
  {
    id: "isa",
    name: "以賽亞書",
    englishName: "Isaiah",
    chapterCount: 66,
    category: "major-prophets",
    testament: "old",
    description: "審判與救贖的偉大預言",
  },
  {
    id: "jer",
    name: "耶利米書",
    englishName: "Jeremiah",
    chapterCount: 52,
    category: "major-prophets",
    testament: "old",
    description: "流淚先知的警告與安慰",
  },
  {
    id: "lam",
    name: "耶利米哀歌",
    englishName: "Lamentations",
    chapterCount: 5,
    category: "major-prophets",
    testament: "old",
    description: "為耶路撒冷毀滅的哀歌",
  },
  {
    id: "eze",
    name: "以西結書",
    englishName: "Ezekiel",
    chapterCount: 48,
    category: "major-prophets",
    testament: "old",
    description: "被擄中的異象與復興預言",
  },
  {
    id: "dan",
    name: "但以理書",
    englishName: "Daniel",
    chapterCount: 12,
    category: "major-prophets",
    testament: "old",
    description: "末世預言與神的主權",
  },

  // 小先知書 (Minor Prophets)
  {
    id: "hos",
    name: "何西阿書",
    englishName: "Hosea",
    chapterCount: 14,
    category: "minor-prophets",
    testament: "old",
    description: "神的慈愛與以色列的背叛",
  },
  {
    id: "joe",
    name: "約珥書",
    englishName: "Joel",
    chapterCount: 3,
    category: "minor-prophets",
    testament: "old",
    description: "耶和華的日子與聖靈澆灌",
  },
  {
    id: "amo",
    name: "阿摩司書",
    englishName: "Amos",
    chapterCount: 9,
    category: "minor-prophets",
    testament: "old",
    description: "社會公義與神的審判",
  },
  {
    id: "oba",
    name: "俄巴底亞書",
    englishName: "Obadiah",
    chapterCount: 1,
    category: "minor-prophets",
    testament: "old",
    description: "對以東的審判預言",
  },
  {
    id: "jon",
    name: "約拿書",
    englishName: "Jonah",
    chapterCount: 4,
    category: "minor-prophets",
    testament: "old",
    description: "神的憐憫與宣教使命",
  },
  {
    id: "mic",
    name: "彌迦書",
    englishName: "Micah",
    chapterCount: 7,
    category: "minor-prophets",
    testament: "old",
    description: "公義、慈愛與謙卑行路",
  },
  {
    id: "nah",
    name: "那鴻書",
    englishName: "Nahum",
    chapterCount: 3,
    category: "minor-prophets",
    testament: "old",
    description: "對尼尼微的審判預言",
  },
  {
    id: "hab",
    name: "哈巴谷書",
    englishName: "Habakkuk",
    chapterCount: 3,
    category: "minor-prophets",
    testament: "old",
    description: "信心與神的公義",
  },
  {
    id: "zep",
    name: "西番雅書",
    englishName: "Zephaniah",
    chapterCount: 3,
    category: "minor-prophets",
    testament: "old",
    description: "耶和華的日子與餘民",
  },
  {
    id: "hag",
    name: "哈該書",
    englishName: "Haggai",
    chapterCount: 2,
    category: "minor-prophets",
    testament: "old",
    description: "重建聖殿的呼籲",
  },
  {
    id: "zec",
    name: "撒迦利亞書",
    englishName: "Zechariah",
    chapterCount: 14,
    category: "minor-prophets",
    testament: "old",
    description: "彌賽亞來臨的預言",
  },
  {
    id: "mal",
    name: "瑪拉基書",
    englishName: "Malachi",
    chapterCount: 4,
    category: "minor-prophets",
    testament: "old",
    description: "舊約的最後警告與應許",
  },
];

// 新約聖經書卷（27卷）
export const newTestamentBooks: BibleBook[] = [
  // 福音書 (Gospels)
  {
    id: "mat",
    name: "馬太福音",
    englishName: "Matthew",
    chapterCount: 28,
    category: "gospels",
    testament: "new",
    description: "君王基督的福音",
  },
  {
    id: "mar",
    name: "馬可福音",
    englishName: "Mark",
    chapterCount: 16,
    category: "gospels",
    testament: "new",
    description: "僕人基督的福音",
  },
  {
    id: "luk",
    name: "路加福音",
    englishName: "Luke",
    chapterCount: 24,
    category: "gospels",
    testament: "new",
    description: "完全人基督的福音",
  },
  {
    id: "joh",
    name: "約翰福音",
    englishName: "John",
    chapterCount: 21,
    category: "gospels",
    testament: "new",
    description: "神子基督的福音",
  },

  // 使徒行傳 (Acts)
  {
    id: "act",
    name: "使徒行傳",
    englishName: "Acts",
    chapterCount: 28,
    category: "history",
    testament: "new",
    description: "早期教會的建立與擴展",
  },

  // 保羅書信 (Pauline Epistles)
  {
    id: "rom",
    name: "羅馬書",
    englishName: "Romans",
    chapterCount: 16,
    category: "pauline",
    testament: "new",
    description: "因信稱義的偉大真理",
  },
  {
    id: "1co",
    name: "哥林多前書",
    englishName: "1 Corinthians",
    chapterCount: 16,
    category: "pauline",
    testament: "new",
    description: "教會問題的處理與愛的真諦",
  },
  {
    id: "2co",
    name: "哥林多後書",
    englishName: "2 Corinthians",
    chapterCount: 13,
    category: "pauline",
    testament: "new",
    description: "使徒職分與安慰的神",
  },
  {
    id: "gal",
    name: "加拉太書",
    englishName: "Galatians",
    chapterCount: 6,
    category: "pauline",
    testament: "new",
    description: "基督裡的自由與因信稱義",
  },
  {
    id: "eph",
    name: "以弗所書",
    englishName: "Ephesians",
    chapterCount: 6,
    category: "pauline",
    testament: "new",
    description: "教會的奧秘與屬靈爭戰",
  },
  {
    id: "phi",
    name: "腓立比書",
    englishName: "Philippians",
    chapterCount: 4,
    category: "pauline",
    testament: "new",
    description: "在基督裡的喜樂",
  },
  {
    id: "col",
    name: "歌羅西書",
    englishName: "Colossians",
    chapterCount: 4,
    category: "pauline",
    testament: "new",
    description: "基督的超越與豐滿",
  },
  {
    id: "1th",
    name: "帖撒羅尼迦前書",
    englishName: "1 Thessalonians",
    chapterCount: 5,
    category: "pauline",
    testament: "new",
    description: "主再來的盼望",
  },
  {
    id: "2th",
    name: "帖撒羅尼迦後書",
    englishName: "2 Thessalonians",
    chapterCount: 3,
    category: "pauline",
    testament: "new",
    description: "末世的教導與勸勉",
  },
  {
    id: "1ti",
    name: "提摩太前書",
    englishName: "1 Timothy",
    chapterCount: 6,
    category: "pauline",
    testament: "new",
    description: "教會治理與領袖資格",
  },
  {
    id: "2ti",
    name: "提摩太後書",
    englishName: "2 Timothy",
    chapterCount: 4,
    category: "pauline",
    testament: "new",
    description: "忠心事奉的勸勉",
  },
  {
    id: "tit",
    name: "提多書",
    englishName: "Titus",
    chapterCount: 3,
    category: "pauline",
    testament: "new",
    description: "教會秩序與善行",
  },
  {
    id: "phm",
    name: "腓利門書",
    englishName: "Philemon",
    chapterCount: 1,
    category: "pauline",
    testament: "new",
    description: "基督裡的和好與饒恕",
  },

  // 一般書信 (General Epistles)
  {
    id: "heb",
    name: "希伯來書",
    englishName: "Hebrews",
    chapterCount: 13,
    category: "general",
    testament: "new",
    description: "基督的超越與新約的優越",
  },
  {
    id: "jas",
    name: "雅各書",
    englishName: "James",
    chapterCount: 5,
    category: "general",
    testament: "new",
    description: "實踐的信仰與行為",
  },
  {
    id: "1pe",
    name: "彼得前書",
    englishName: "1 Peter",
    chapterCount: 5,
    category: "general",
    testament: "new",
    description: "苦難中的盼望與聖潔",
  },
  {
    id: "2pe",
    name: "彼得後書",
    englishName: "2 Peter",
    chapterCount: 3,
    category: "general",
    testament: "new",
    description: "防備假教師與主的再來",
  },
  {
    id: "1jo",
    name: "約翰壹書",
    englishName: "1 John",
    chapterCount: 5,
    category: "general",
    testament: "new",
    description: "神就是愛與生命的確據",
  },
  {
    id: "2jo",
    name: "約翰貳書",
    englishName: "2 John",
    chapterCount: 1,
    category: "general",
    testament: "new",
    description: "在真理中的愛心",
  },
  {
    id: "3jo",
    name: "約翰參書",
    englishName: "3 John",
    chapterCount: 1,
    category: "general",
    testament: "new",
    description: "接待與善行",
  },
  {
    id: "jud",
    name: "猶大書",
    englishName: "Jude",
    chapterCount: 1,
    category: "general",
    testament: "new",
    description: "為真道竭力爭辯",
  },

  // 啟示錄 (Revelation)
  {
    id: "rev",
    name: "啟示錄",
    englishName: "Revelation",
    chapterCount: 22,
    category: "prophecy",
    testament: "new",
    description: "末世的啟示與神的得勝",
  },
];

// 聖經分類定義
export const bibleCategories: BibleCategory[] = [
  // 舊約分類
  {
    id: "torah",
    name: "摩西五經",
    englishName: "Torah/Pentateuch",
    testament: "old",
    books: oldTestamentBooks.filter((book) => book.category === "torah"),
  },
  {
    id: "old-history",
    name: "歷史書",
    englishName: "Historical Books",
    testament: "old",
    books: oldTestamentBooks.filter((book) => book.category === "history"),
  },
  {
    id: "wisdom",
    name: "詩歌智慧書",
    englishName: "Wisdom Literature",
    testament: "old",
    books: oldTestamentBooks.filter((book) => book.category === "wisdom"),
  },
  {
    id: "major-prophets",
    name: "大先知書",
    englishName: "Major Prophets",
    testament: "old",
    books: oldTestamentBooks.filter(
      (book) => book.category === "major-prophets"
    ),
  },
  {
    id: "minor-prophets",
    name: "小先知書",
    englishName: "Minor Prophets",
    testament: "old",
    books: oldTestamentBooks.filter(
      (book) => book.category === "minor-prophets"
    ),
  },
  // 新約分類
  {
    id: "gospels",
    name: "福音書",
    englishName: "Gospels",
    testament: "new",
    books: newTestamentBooks.filter((book) => book.category === "gospels"),
  },
  {
    id: "new-history",
    name: "使徒行傳",
    englishName: "Acts",
    testament: "new",
    books: newTestamentBooks.filter((book) => book.category === "history"),
  },
  {
    id: "pauline",
    name: "保羅書信",
    englishName: "Pauline Epistles",
    testament: "new",
    books: newTestamentBooks.filter((book) => book.category === "pauline"),
  },
  {
    id: "general",
    name: "一般書信",
    englishName: "General Epistles",
    testament: "new",
    books: newTestamentBooks.filter((book) => book.category === "general"),
  },
  {
    id: "prophecy",
    name: "啟示錄",
    englishName: "Revelation",
    testament: "new",
    books: newTestamentBooks.filter((book) => book.category === "prophecy"),
  },
];

// 全部聖經書卷
export const allBibleBooks: BibleBook[] = [
  ...oldTestamentBooks,
  ...newTestamentBooks,
];

// 輔助函數
export const getBibleBookById = (id: string): BibleBook | undefined => {
  return allBibleBooks.find((book) => book.id === id);
};

export const getBibleBooksByTestament = (
  testament: "old" | "new"
): BibleBook[] => {
  return allBibleBooks.filter((book) => book.testament === testament);
};

export const getBibleBooksByCategory = (categoryId: string): BibleBook[] => {
  return allBibleBooks.filter((book) => book.category === categoryId);
};

export const getCategoryByTestament = (
  testament: "old" | "new"
): BibleCategory[] => {
  return bibleCategories.filter((category) => category.testament === testament);
};

// 統計數據
export const bibleStats = {
  totalBooks: allBibleBooks.length,
  oldTestamentBooks: oldTestamentBooks.length,
  newTestamentBooks: newTestamentBooks.length,
  totalChapters: allBibleBooks.reduce(
    (sum, book) => sum + book.chapterCount,
    0
  ),
  categories: bibleCategories.length,
};
