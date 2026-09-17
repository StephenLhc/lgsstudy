import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";
import { prisma } from "../../../../../lib/prisma";

interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: postId } = await params;
    const session = await getServerSession(authOptions);
    const body = await request.json();
    const { platform } = body;

    if (!platform) {
      return NextResponse.json({ error: "缺少分享平台參數" }, { status: 400 });
    }

    const validPlatforms = [
      "WHATSAPP",
      "FACEBOOK",
      "TELEGRAM",
      "WECHAT",
      "EMAIL",
      "COPY_LINK",
    ];
    if (!validPlatforms.includes(platform)) {
      return NextResponse.json({ error: "不支援的分享平台" }, { status: 400 });
    }

    // 記錄分享行為
    await prisma.postShare.create({
      data: {
        postId,
        userId: (session?.user && (session.user as SessionUser).id) || null,
        platform,
      },
    });

    // 更新文章分享數
    await prisma.post.update({
      where: { id: postId },
      data: {
        shareCount: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "分享記錄成功",
    });
  } catch (error) {
    console.error("記錄分享失敗:", error);
    return NextResponse.json({ error: "記錄分享失敗" }, { status: 500 });
  }
}
