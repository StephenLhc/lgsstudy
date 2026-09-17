// 神學主題標籤系統
export interface TheologyTag {
  id: string;
  name: string;
  englishName: string;
  description: string;
  color: string; // Tailwind color class
  category: "doctrine" | "practice" | "eschatology" | "ethics" | "history";
}

// 教義類標籤 (Doctrinal Tags)
export const doctrinalTags: TheologyTag[] = [
  {
    id: "theology-proper",
    name: "神論",
    englishName: "Theology Proper",
    description: "關於神的本性、屬性與工作",
    color: "blue",
    category: "doctrine",
  },
  {
    id: "christology",
    name: "基督論",
    englishName: "Christology",
    description: "關於耶穌基督的位格與工作",
    color: "red",
    category: "doctrine",
  },
  {
    id: "pneumatology",
    name: "聖靈論",
    englishName: "Pneumatology",
    description: "關於聖靈的位格與工作",
    color: "green",
    category: "doctrine",
  },
  {
    id: "anthropology",
    name: "人論",
    englishName: "Anthropology",
    description: "關於人的本性、墮落與需要",
    color: "yellow",
    category: "doctrine",
  },
  {
    id: "soteriology",
    name: "救贖論",
    englishName: "Soteriology",
    description: "關於救恩的計劃與實施",
    color: "purple",
    category: "doctrine",
  },
  {
    id: "ecclesiology",
    name: "教會論",
    englishName: "Ecclesiology",
    description: "關於教會的本質、組織與使命",
    color: "indigo",
    category: "doctrine",
  },
  {
    id: "eschatology",
    name: "末世論",
    englishName: "Eschatology",
    description: "關於末世事件與永恆",
    color: "pink",
    category: "eschatology",
  },
  {
    id: "bibliology",
    name: "聖經論",
    englishName: "Bibliology",
    description: "關於聖經的啟示、默示與權威",
    color: "teal",
    category: "doctrine",
  },
  {
    id: "trinity",
    name: "三一論",
    englishName: "Trinity",
    description: "關於三位一體的教義",
    color: "cyan",
    category: "doctrine",
  },
  {
    id: "providence",
    name: "護理論",
    englishName: "Providence",
    description: "關於神的護理與主權",
    color: "gray",
    category: "doctrine",
  },
];

// 實踐類標籤 (Practical Tags)
export const practicalTags: TheologyTag[] = [
  {
    id: "prayer",
    name: "禱告",
    englishName: "Prayer",
    description: "禱告的原理與實踐",
    color: "blue",
    category: "practice",
  },
  {
    id: "worship",
    name: "敬拜",
    englishName: "Worship",
    description: "敬拜的真諦與形式",
    color: "purple",
    category: "practice",
  },
  {
    id: "discipleship",
    name: "門徒訓練",
    englishName: "Discipleship",
    description: "門徒的成長與訓練",
    color: "green",
    category: "practice",
  },
  {
    id: "evangelism",
    name: "傳福音",
    englishName: "Evangelism",
    description: "福音的傳播與見證",
    color: "red",
    category: "practice",
  },
  {
    id: "missions",
    name: "宣教",
    englishName: "Missions",
    description: "跨文化宣教與全球福音化",
    color: "orange",
    category: "practice",
  },
  {
    id: "stewardship",
    name: "管家職分",
    englishName: "Stewardship",
    description: "資源管理與奉獻",
    color: "yellow",
    category: "practice",
  },
  {
    id: "fellowship",
    name: "團契",
    englishName: "Fellowship",
    description: "信徒相交與群體生活",
    color: "indigo",
    category: "practice",
  },
  {
    id: "spiritual-gifts",
    name: "屬靈恩賜",
    englishName: "Spiritual Gifts",
    description: "恩賜的認識與運用",
    color: "pink",
    category: "practice",
  },
  {
    id: "spiritual-disciplines",
    name: "靈修操練",
    englishName: "Spiritual Disciplines",
    description: "屬靈操練的方法與實踐",
    color: "teal",
    category: "practice",
  },
  {
    id: "bible-study",
    name: "查經",
    englishName: "Bible Study",
    description: "聖經研讀的方法與技巧",
    color: "cyan",
    category: "practice",
  },
];

// 倫理類標籤 (Ethical Tags)
export const ethicalTags: TheologyTag[] = [
  {
    id: "christian-ethics",
    name: "基督教倫理",
    englishName: "Christian Ethics",
    description: "基督徒的道德標準與生活原則",
    color: "gray",
    category: "ethics",
  },
  {
    id: "social-justice",
    name: "社會公義",
    englishName: "Social Justice",
    description: "公義、憐憫與社會關懷",
    color: "green",
    category: "ethics",
  },
  {
    id: "family-marriage",
    name: "婚姻家庭",
    englishName: "Marriage & Family",
    description: "婚姻與家庭的聖經原則",
    color: "red",
    category: "ethics",
  },
  {
    id: "work-calling",
    name: "工作召命",
    englishName: "Work & Calling",
    description: "工作與呼召的神學",
    color: "blue",
    category: "ethics",
  },
  {
    id: "creation-care",
    name: "環境關懷",
    englishName: "Creation Care",
    description: "環境保護與受造秩序",
    color: "green",
    category: "ethics",
  },
  {
    id: "bioethics",
    name: "生命倫理",
    englishName: "Bioethics",
    description: "生命倫理與醫學議題",
    color: "purple",
    category: "ethics",
  },
  {
    id: "political-theology",
    name: "政治神學",
    englishName: "Political Theology",
    description: "信仰與政治參與",
    color: "indigo",
    category: "ethics",
  },
];

// 歷史類標籤 (Historical Tags)
export const historicalTags: TheologyTag[] = [
  {
    id: "church-history",
    name: "教會歷史",
    englishName: "Church History",
    description: "教會歷史的發展與教訓",
    color: "brown",
    category: "history",
  },
  {
    id: "reformation",
    name: "宗教改革",
    englishName: "Reformation",
    description: "宗教改革的歷史與影響",
    color: "orange",
    category: "history",
  },
  {
    id: "early-church",
    name: "初代教會",
    englishName: "Early Church",
    description: "使徒時代的教會",
    color: "yellow",
    category: "history",
  },
  {
    id: "church-fathers",
    name: "教父時期",
    englishName: "Church Fathers",
    description: "教父神學與早期教義發展",
    color: "purple",
    category: "history",
  },
  {
    id: "revival",
    name: "復興運動",
    englishName: "Revival",
    description: "歷史上的屬靈復興",
    color: "red",
    category: "history",
  },
  {
    id: "denominations",
    name: "宗派歷史",
    englishName: "Denominations",
    description: "各宗派的形成與特色",
    color: "blue",
    category: "history",
  },
];

// 末世論標籤 (Eschatological Tags)
export const eschatologicalTags: TheologyTag[] = [
  {
    id: "second-coming",
    name: "基督再來",
    englishName: "Second Coming",
    description: "耶穌基督的再來",
    color: "gold",
    category: "eschatology",
  },
  {
    id: "millennium",
    name: "千禧年",
    englishName: "Millennium",
    description: "千禧年國度的教義",
    color: "silver",
    category: "eschatology",
  },
  {
    id: "resurrection",
    name: "復活",
    englishName: "Resurrection",
    description: "死人復活的教義",
    color: "white",
    category: "eschatology",
  },
  {
    id: "judgment",
    name: "審判",
    englishName: "Judgment",
    description: "最後審判與永恆",
    color: "black",
    category: "eschatology",
  },
  {
    id: "heaven-hell",
    name: "天堂地獄",
    englishName: "Heaven & Hell",
    description: "永恆的歸宿",
    color: "blue",
    category: "eschatology",
  },
  {
    id: "prophecy",
    name: "預言",
    englishName: "Prophecy",
    description: "聖經預言的解釋",
    color: "purple",
    category: "eschatology",
  },
];

// 所有標籤
export const allTheologyTags: TheologyTag[] = [
  ...doctrinalTags,
  ...practicalTags,
  ...ethicalTags,
  ...historicalTags,
  ...eschatologicalTags,
];

// 標籤分類
export const tagCategories = [
  { id: "doctrine", name: "教義神學", tags: doctrinalTags },
  { id: "practice", name: "實踐神學", tags: practicalTags },
  { id: "ethics", name: "倫理神學", tags: ethicalTags },
  { id: "history", name: "歷史神學", tags: historicalTags },
  { id: "eschatology", name: "末世神學", tags: eschatologicalTags },
];

// 輔助函數
export const getTagById = (id: string): TheologyTag | undefined => {
  return allTheologyTags.find((tag) => tag.id === id);
};

export const getTagsByCategory = (category: string): TheologyTag[] => {
  return allTheologyTags.filter((tag) => tag.category === category);
};

export const getTagColor = (tag: TheologyTag): string => {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    yellow:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    purple:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    indigo:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
    pink: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
    teal: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
    cyan: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
    gray: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
    orange:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  };

  return colorMap[tag.color] || colorMap.gray;
};
