"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import Footer from "@/components/Footer";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { signUp } = useAuth();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");
        setIsLoading(true);

        try {
            if (!formData.email.match(/^\S+@\S+\.\S+$/)) {
                setErrorMsg("請輸入正確的電子郵件格式");
                return;
            }
            if (!formData.password || formData.password.length < 6) {
                setErrorMsg("密碼至少需 6 位字元");
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                setErrorMsg("密碼不一致");
                return;
            }

            const { error } = await signUp(formData.email, formData.password);

            if (error) {
                setErrorMsg("註冊失敗：" + error.message);
            } else {
                setSuccessMsg("註冊成功！請檢查您的電子郵件以驗證帳號。");
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            }
        } catch (error) {
            console.error("註冊失敗:", error);
            setErrorMsg("註冊失敗，請稍後再試");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 px-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-large border border-gray-100 dark:border-gray-700 p-8 mt-8 mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">註冊新帳號</h2>
                {errorMsg && <div className="mb-4 text-center text-red-500 font-medium text-sm animate-pulse">{errorMsg}</div>}
                {successMsg && <div className="mb-4 text-center text-green-500 font-medium text-sm animate-pulse">{successMsg}</div>}
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">電子郵件</label>
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors" placeholder="example@email.com" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">密碼</label>
                        <input type="password" name="password" value={formData.password} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors" placeholder="請輸入密碼" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">確認密碼</label>
                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors" placeholder="再次輸入密碼" />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 shadow-soft hover:shadow-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>註冊中...</span>
                            </div>
                        ) : (
                            "註冊"
                        )}
                    </button>
                </form>
                <div className="text-center mt-6">
                    <Link href="/login" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors">已有帳號？前往登入</Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}
