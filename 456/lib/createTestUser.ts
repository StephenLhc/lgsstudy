import { supabase } from "./supabaseClient";

export async function createTestUser() {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: "admin@test.com",
      password: "pass12#",
      options: {
        data: {
          full_name: "Admin",
          role: "admin",
        },
      },
    });

    if (error) {
      console.error("建立測試用戶失敗:", error);
      return { success: false, error };
    }

    console.log("測試用戶建立成功:", data);
    return { success: true, data };
  } catch (error) {
    console.error("建立測試用戶時發生錯誤:", error);
    return { success: false, error };
  }
}

// 如果直接執行此腳本
if (require.main === module) {
  createTestUser().then((result) => {
    if (result.success) {
      console.log("✅ 測試用戶建立成功！");
      console.log("📧 Email: admin@test.com");
      console.log("🔑 Password: pass12#");
    } else {
      console.log("❌ 建立失敗:", result.error);
    }
  });
}
