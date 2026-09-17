"use client";
import Link from "next/link";
import { useState } from "react";
import Footer from "@/components/Footer";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");
        if (!email.match(/^\S+@\S+\.\S+$/)) {
            setErrorMsg("請輸入正確的電子郵件格式");
            return;
        }
        // TODO: 串接 Supabase 忘記密碼 API
        setSuccessMsg("重設密碼信件已寄出，請檢查您的信箱。");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 px-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-large border border-gray-100 dark:border-gray-700 p-8 mt-8 mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">忘記密碼</h2>
                {errorMsg && <div className="mb-4 text-center text-red-500 font-medium text-sm animate-pulse">{errorMsg}</div>}
                {successMsg && <div className="mb-4 text-center text-green-500 font-medium text-sm animate-pulse">{successMsg}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">電子郵件</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors" placeholder="example@email.com" />
                    </div>
                    <button type="submit" className="w-full bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 shadow-soft hover:shadow-medium">寄送重設密碼信件</button>
                </form>
                <div className="text-center mt-6">
                    <Link href="/login" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors">返回登入</Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}
