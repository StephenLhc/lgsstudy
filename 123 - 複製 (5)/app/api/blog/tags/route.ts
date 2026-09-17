import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(tags);
  } catch (error) {
    console.error("獲取標籤列表失敗:", error);
    return NextResponse.json({ error: "獲取標籤列表失敗" }, { status: 500 });
  }
}
