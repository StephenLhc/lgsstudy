import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("獲取分類列表失敗:", error);
    return NextResponse.json({ error: "獲取分類列表失敗" }, { status: 500 });
  }
}
