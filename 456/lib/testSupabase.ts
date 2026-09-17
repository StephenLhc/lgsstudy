import { supabase } from "./supabaseClient";

export async function testSupabaseConnection() {
  try {
    console.log("🔍 測試 Supabase 連線...");
    console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log(
      "Key:",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ 已設定" : "❌ 未設定"
    );

    // 測試基本連線
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error("❌ Supabase 連線失敗:", error);
      return { success: false, error };
    }

    console.log("✅ Supabase 連線成功!");
    console.log("Session:", data.session ? "有會話" : "無會話");
    return { success: true, data };
  } catch (error) {
    console.error("❌ 測試過程中發生錯誤:", error);
    return { success: false, error };
  }
}

// 如果直接執行此腳本
if (require.main === module) {
  testSupabaseConnection().then((result) => {
    if (result.success) {
      console.log("🎉 Supabase 連線測試通過！");
    } else {
      console.log("💥 Supabase 連線測試失敗！");
    }
  });
}
