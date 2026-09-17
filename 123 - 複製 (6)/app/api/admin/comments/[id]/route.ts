import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../../lib/auth";
import { prisma } from "../../../../../lib/prisma";

// 更新評論狀態
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions); // 檢查管理員權限
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!session?.user?.email || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { status } = await request.json();

    // 驗證狀態值
    if (!["PENDING", "APPROVED", "REJECTED", "SPAM"].includes(status)) {
      return NextResponse.json({ error: "無效的狀態值" }, { status: 400 });
    }

    const comment = await prisma.comment.update({
      where: { id },
      data: { status },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
            title: true,
          },
        },
        post: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error("更新評論狀態失敗:", error);
    return NextResponse.json({ error: "更新失敗" }, { status: 500 });
  }
}

// 刪除評論
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    // 檢查管理員權限
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!session?.user?.email || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 使用事務刪除評論及其相關數據
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await prisma.$transaction(async (tx: any) => {
      // 先刪除回覆
      await tx.comment.deleteMany({
        where: { parentId: id },
      });

      // 再刪除評論本身
      await tx.comment.delete({
        where: { id },
      });
    });
    return NextResponse.json({ message: "評論刪除成功" });
  } catch (error) {
    console.error("刪除評論失敗:", error);
    return NextResponse.json({ error: "刪除失敗" }, { status: 500 });
  }
}
