export interface IBibleStudy {
  title: string;
  slug: string;
  author: string;
  date: string;
  category: string;
  thumbnail: string;
  // 聖經相關欄位
  bibleBook?: string; // 相關聖經書卷
  bibleChapter?: string; // 相關章節
  bibleVerse?: string; // 主要經文
  theologyTags: string[]; // 神學標籤
  difficulty: "beginner" | "intermediate" | "advanced"; // 難度等級
  readingTime: number; // 預估閱讀時間（分鐘）
  excerpt: string; // 文章摘要
}

export const bibleStudies: IBibleStudy[] = [
  {
    title: "創世記第一章：神的創造之工",
    slug: "genesis-1-gods-work-of-creation",
    author: "123",
    date: "2024-08-15",
    category: "創世記研讀",
    thumbnail: "/images/thumbnails/green-coding.jpg",
    bibleBook: "創世記",
    bibleChapter: "第1章",
    bibleVerse: "起初，神創造天地。（創世記 1:1）",
    theologyTags: ["創造論", "神的屬性", "聖經基礎"],
    difficulty: "beginner",
    readingTime: 15,
    excerpt:
      "探討創世記第一章中神創造宇宙萬物的過程，認識神作為創造主的權能和智慧，以及人類在受造界中的獨特地位。",
  },
  {
    title: "詩篇二十三篇：耶和華是我的牧者",
    slug: "psalm-23-the-lord-is-my-shepherd",
    author: "123",
    date: "2024-08-12",
    category: "詩篇默想",
    thumbnail: "/images/thumbnails/react-hooks.jpg",
    bibleBook: "詩篇",
    bibleChapter: "第23篇",
    bibleVerse: "耶和華是我的牧者，我必不致缺乏。（詩篇 23:1）",
    theologyTags: ["神的眷顧", "信心", "安慰"],
    difficulty: "beginner",
    readingTime: 12,
    excerpt:
      "深入分析詩篇二十三篇中大衛對神作為牧者的描述，學習如何在神的看顧下過安穩的生活，並在困難中得著盼望。",
  },
  {
    title: "羅馬書第八章：聖靈的工作與得勝生活",
    slug: "romans-8-spirit-work-victorious-life",
    author: "123",
    date: "2024-08-10",
    category: "新約神學",
    thumbnail: "/images/thumbnails/machine-learning.jpg",
    bibleBook: "羅馬書",
    bibleChapter: "第8章",
    bibleVerse: "如今，那些在基督耶穌裡的就不定罪了。（羅馬書 8:1）",
    theologyTags: ["聖靈論", "救恩", "成聖"],
    difficulty: "intermediate",
    readingTime: 25,
    excerpt:
      "研讀羅馬書第八章關於聖靈在信徒生命中的工作，了解如何靠聖靈過得勝的基督徒生活，以及神兒女的確據與盼望。",
  },
  {
    title: "馬太福音登山寶訓：天國子民的品格",
    slug: "matthew-5-7-sermon-on-the-mount-character",
    author: "123",
    date: "2024-08-08",
    category: "耶穌教導",
    thumbnail: "/images/thumbnails/cybersecurity.jpg",
    bibleBook: "馬太福音",
    bibleChapter: "第5-7章",
    bibleVerse: "虛心的人有福了！因為天國是他們的。（馬太福音 5:3）",
    theologyTags: ["登山寶訓", "品格塑造", "天國倫理"],
    difficulty: "intermediate",
    readingTime: 20,
    excerpt:
      "深入學習耶穌在登山寶訓中教導的天國子民應有的品格，探討八福的深層含義以及實踐天國倫理的重要性。",
  },
  {
    title: "約翰福音第三章：重生的必要性",
    slug: "john-3-necessity-of-new-birth",
    author: "123",
    date: "2024-08-05",
    category: "救恩真理",
    thumbnail: "/images/thumbnails/nextjs-optimizing.jpg",
    bibleBook: "約翰福音",
    bibleChapter: "第3章",
    bibleVerse:
      "耶穌回答說：我實實在在的告訴你，人若不重生，就不能見神的國。（約翰福音 3:3）",
    theologyTags: ["重生", "救恩", "聖靈工作"],
    difficulty: "intermediate",
    readingTime: 18,
    excerpt:
      "透過耶穌與尼哥底母的對話，理解重生的屬靈意義，認識聖靈在救恩中的角色，以及如何經歷屬靈的新生命。",
  },
  {
    title: "以弗所書第二章：恩典中的救恩",
    slug: "ephesians-2-salvation-by-grace",
    author: "林姊妹",
    date: "2024-08-03",
    category: "保羅書信",
    thumbnail: "/images/thumbnails/typescript.jpg",
    bibleBook: "以弗所書",
    bibleChapter: "第2章",
    bibleVerse:
      "你們得救是本乎恩，也因著信；這並不是出於自己，乃是神所賜的。（以弗所書 2:8）",
    theologyTags: ["救恩論", "恩典", "信心"],
    difficulty: "beginner",
    readingTime: 16,
    excerpt:
      "清楚闡述基督教救恩的核心真理，了解恩典與行為的關係，以及信徒在基督裡的新身份和盼望。",
  },
  {
    title: "雅各書第一章：試煉中的喜樂",
    slug: "james-1-joy-in-trials",
    author: "黃傳道",
    date: "2024-08-01",
    category: "實用神學",
    thumbnail: "/images/thumbnails/web-development.jpg",
    bibleBook: "雅各書",
    bibleChapter: "第1章",
    bibleVerse:
      "我的弟兄們，你們落在百般試煉中，都要以為大喜樂。（雅各書 1:2）",
    theologyTags: ["試煉", "信心成長", "實用信仰"],
    difficulty: "intermediate",
    readingTime: 14,
    excerpt:
      "探討基督徒如何在困難和試煉中保持喜樂，理解試煉對靈命成長的意義，以及培養成熟信心的重要性。",
  },
  {
    title: "腓立比書第四章：在基督裡的喜樂與平安",
    slug: "philippians-4-joy-peace-in-christ",
    author: "劉牧師",
    date: "2024-07-30",
    category: "保羅書信",
    thumbnail: "/images/thumbnails/css-grid.jpg",
    bibleBook: "腓立比書",
    bibleChapter: "第4章",
    bibleVerse: "你們要靠主常常喜樂。我再說，你們要喜樂。（腓立比書 4:4）",
    theologyTags: ["喜樂", "平安", "知足"],
    difficulty: "beginner",
    readingTime: 13,
    excerpt:
      "學習保羅在腓立比書中關於真正喜樂和平安的教導，了解如何在任何環境中都能靠主喜樂，並經歷超越環境的神的平安。",
  },
  {
    title: "哥林多前書第十三章：愛的真諦",
    slug: "1-corinthians-13-nature-of-love",
    author: "趙姊妹",
    date: "2024-07-28",
    category: "品格建造",
    thumbnail: "/images/thumbnails/blockchain.jpg",
    bibleBook: "哥林多前書",
    bibleChapter: "第13章",
    bibleVerse:
      "如今常存的有信，有望，有愛這三樣，其中最大的是愛。（哥林多前書 13:13）",
    theologyTags: ["愛", "品格", "人際關係"],
    difficulty: "beginner",
    readingTime: 11,
    excerpt:
      "深入探討聖經中最著名的愛的篇章，理解神聖之愛的特質，學習如何在日常生活中實踐真正的基督徒愛心。",
  },
  {
    title: "啟示錄第二十一章：新天新地的盼望",
    slug: "revelation-21-hope-new-heaven-earth",
    author: "吳傳道",
    date: "2024-07-25",
    category: "末世論",
    thumbnail: "/images/thumbnails/cloud-computing.jpg",
    bibleBook: "啟示錄",
    bibleChapter: "第21章",
    bibleVerse: "看哪，我將一切都更新了！（啟示錄 21:5）",
    theologyTags: ["末世論", "永恆", "復活盼望"],
    difficulty: "advanced",
    readingTime: 22,
    excerpt:
      "探索基督教末世論的核心盼望，認識新天新地的榮耀景象，以及這個永恆盼望如何影響我們現在的生活方式。",
  },
  {
    title: "哥林多後書第五章：新造的人",
    slug: "2-corinthians-5-new-creation",
    author: "馬牧師",
    date: "2024-07-23",
    category: "保羅書信",
    thumbnail: "/images/thumbnails/green-coding.jpg",
    bibleBook: "哥林多後書",
    bibleChapter: "第5章",
    bibleVerse:
      "若有人在基督裡，他就是新造的人，舊事已過，都變成新的了。（哥林多後書 5:17）",
    theologyTags: ["重生", "新生命", "和好"],
    difficulty: "intermediate",
    readingTime: 17,
    excerpt:
      "理解在基督裡成為新造之人的深刻含義，探討屬靈生命的轉化過程，以及信徒作為和好使者的使命。",
  },
];
