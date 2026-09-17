#!/usr/bin/env tsx

import { runFullDiagnostic } from "../lib/supabaseConfig";

async function main() {
  console.log("🔧 Supabase 系統診斷工具");
  console.log("========================\n");

  try {
    const result = await runFullDiagnostic();

    if (result.success) {
      console.log("\n🎉 診斷完成：所有系統正常！");
      process.exit(0);
    } else {
      console.log("\n💥 診斷完成：發現問題，請檢查上述錯誤訊息");
      process.exit(1);
    }
  } catch (error) {
    console.error("\n❌ 診斷過程中發生未預期的錯誤:", error);
    process.exit(1);
  }
}

// 執行診斷
main();
