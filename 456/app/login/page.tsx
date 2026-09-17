"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    rememberMe: false
  });
  const [errorMsg, setErrorMsg] = useState<string>("");
  const router = useRouter();
  const { signIn, signInWithGoogle } = useAuth();

  // Google 登入處理
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        setErrorMsg("Google 登入失敗：" + error.message);
      }
    } catch (error) {
      console.error("Google 登入失敗:", error);
      setErrorMsg("Google 登入失敗，請稍後再試");
    } finally {
      setIsLoading(false);
    }
  };

  // 表單登入處理
  const handleFormLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const email = loginMethod === "email" ? formData.email : formData.phone;
      const { error } = await signIn(email, formData.password);

      if (error) {
        setErrorMsg("登入失敗：" + error.message);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("登入失敗:", error);
      setErrorMsg("登入失敗，請檢查帳號密碼");
    } finally {
      setIsLoading(false);
    }
  };

  // 處理輸入變化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo 和標題 */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/lgsLight.png"
              alt="樂研集 Logo"
              width={64}
              height={64}
              className="rounded-full shadow-soft"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            歡迎回來
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            登入您的樂研集帳號，繼續聖經研讀之旅
          </p>
        </div>

        {/* 登入卡片 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-large border border-gray-100 dark:border-gray-700 p-8">

          {/* Google 登入按鈕 */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-3 px-6 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Image
                src="https://www.google.com/favicon.ico"
                alt="Google"
                width={20}
                height={20}
              />
            )}
            <span>{isLoading ? "登入中..." : "使用 Google 帳號登入"}</span>
          </button>

          {/* 分隔線 */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                或使用其他方式登入
              </span>
            </div>
          </div>

          {/* 登入方式切換 */}
          <div className="flex mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setLoginMethod("email")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${loginMethod === "email"
                ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-soft"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
            >
              📧 電子郵件
            </button>
            <button
              onClick={() => setLoginMethod("phone")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${loginMethod === "phone"
                ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-soft"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
            >
              📱 手機號碼
            </button>
          </div>

          {/* 登入表單 */}
          <form onSubmit={handleFormLogin} className="space-y-4">
            {/* 錯誤提示 */}
            {errorMsg && (
              <div className="mb-4 text-center text-red-500 font-medium text-sm animate-pulse">{errorMsg}</div>
            )}
            {/* 帳號輸入 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {loginMethod === "email" ? "電子郵件" : "手機號碼"}
              </label>
              <input
                type={loginMethod === "email" ? "email" : "tel"}
                name={loginMethod}
                value={loginMethod === "email" ? formData.email : formData.phone}
                onChange={handleInputChange}
                placeholder={loginMethod === "email" ? "example@email.com" : "0912-345-678"}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                required
              />
            </div>
            {/* 密碼輸入 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                密碼
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="請輸入密碼"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                required
              />
            </div>
            {/* 記住我和忘記密碼 */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  記住我
                </span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
              >
                忘記密碼？
              </Link>
            </div>

            {/* 登入按鈕 */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-soft hover:shadow-medium"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>登入中...</span>
                </div>
              ) : (
                "登入"
              )}
            </button>
          </form>

          {/* 註冊連結 */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              還沒有帳號？{" "}
              <Link
                href="/register"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
              >
                立即註冊
              </Link>
            </p>
          </div>
        </div>

        {/* 返回首頁 */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            ← 返回首頁
          </Link>
        </div>
      </div >
    </div >
  );
}
