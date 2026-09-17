import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    const authors = await prisma.author.findMany({
      select: {
        id: true,
        name: true,
        title: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(authors);
  } catch (error) {
    console.error("獲取作者列表失敗:", error);
    return NextResponse.json({ error: "獲取作者列表失敗" }, { status: 500 });
  }
}
