import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      // 高齢友善字體設定
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.5" }], // 12px
        sm: ["0.875rem", { lineHeight: "1.5" }], // 14px
        base: ["1rem", { lineHeight: "1.6" }], // 16px (最小正文)
        lg: ["1.125rem", { lineHeight: "1.6" }], // 18px
        xl: ["1.25rem", { lineHeight: "1.5" }], // 20px
        "2xl": ["1.5rem", { lineHeight: "1.4" }], // 24px
        "3xl": ["1.875rem", { lineHeight: "1.3" }], // 30px
        "4xl": ["2.25rem", { lineHeight: "1.2" }], // 36px
        "5xl": ["3rem", { lineHeight: "1.1" }], // 48px
      },

      // 高齢友善色彩系統
      colors: {
        // 主色調 - 溫暖親和
        primary: {
          50: "#fff5f0", // 背景色
          100: "#ffe8d6",
          200: "#ffd1b3",
          300: "#ffb380",
          400: "#ff9a76", // 主色 #ff9a76
          500: "#ff7a4d",
          600: "#ff5a24",
          700: "#e64a1a",
          800: "#cc3a10",
          900: "#b32a06",
        },

        // 輔助色調
        secondary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },

        // 聖經主題色調
        bible: {
          old: "#8B4513", // 舊約 - 棕色
          new: "#4169E1", // 新約 - 藍色
          wisdom: "#FFD700", // 智慧書 - 金色
          prophecy: "#DC143C", // 先知書 - 紅色
          gospel: "#32CD32", // 福音書 - 綠色
        },

        // 高齢友善對比色
        accessible: {
          text: "#1a1a1a", // 深色文字
          textLight: "#4a4a4a", // 淺色文字
          background: "#ffffff", // 白色背景
          surface: "#f8f9fa", // 表面色
          border: "#e9ecef", // 邊框色
        },
      },

      // 高齢友善間距
      spacing: {
        "18": "4.5rem", // 72px
        "22": "5.5rem", // 88px
        "26": "6.5rem", // 104px
        "30": "7.5rem", // 120px
      },

      // 高齢友善圓角
      borderRadius: {
        xl: "1rem", // 16px
        "2xl": "1.5rem", // 24px
        "3xl": "2rem", // 32px
      },

      // 高齢友善陰影
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        medium:
          "0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        large:
          "0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 25px -5px rgba(0, 0, 0, 0.1)",
      },

      // 高齢友善動畫
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
      },

      // 自定義動畫關鍵幀
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },

      // 高齢友善容器
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1536px",
        },
      },

      // 高齢友善網格
      gridTemplateColumns: {
        "bible-layout": "300px 1fr",
        "bible-mobile": "1fr",
      },

      // 響應式斷點
      screens: {
        xs: "475px",
        "3xl": "1600px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
