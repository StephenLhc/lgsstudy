import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";
import { prisma } from "../../../../../lib/prisma";

interface CommentData {
  content: string;
  postId: string;
  parentId?: string;
  userId?: string;
  guestName?: string;
  guestEmail?: string;
  status?: "PENDING" | "APPROVED" | "REJECTED" | "SPAM";
  ipAddress?: string | null;
  userAgent?: string | null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = params.id;
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // 獲取評論列表（只獲取頂層評論，包含回覆）
    const comments = await prisma.comment.findMany({
      where: {
        postId,
        parentId: null,
        status: "APPROVED",
      },
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
        replies: {
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
            replies: {
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
              },
              orderBy: {
                createdAt: "asc",
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    });

    // 獲取總評論數
    const totalComments = await prisma.comment.count({
      where: {
        postId,
        status: "APPROVED",
      },
    });

    return NextResponse.json({
      comments,
      pagination: {
        page,
        limit,
        total: totalComments,
        totalPages: Math.ceil(totalComments / limit),
      },
    });
  } catch (error) {
    console.error("獲取評論失敗:", error);
    return NextResponse.json({ error: "獲取評論失敗" }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const postId = params.id;

    const body = await request.json();
    const { content, parentId, guestName, guestEmail } = body;

    if (!content || content.trim().length === 0) {
      return NextResponse.json({ error: "評論內容不能為空" }, { status: 400 });
    }

    // 內容長度限制
    if (content.length > 1000) {
      return NextResponse.json(
        { error: "評論內容不能超過1000字" },
        { status: 400 }
      );
    }

    const commentData: CommentData = {
      content: content.trim(),
      postId,
    };

    if (parentId) {
      // 驗證父評論是否存在
      const parentComment = await prisma.comment.findUnique({
        where: { id: parentId },
      });

      if (!parentComment) {
        return NextResponse.json(
          { error: "回覆的評論不存在" },
          { status: 400 }
        );
      }

      commentData.parentId = parentId;
    }

    if (session?.user) {
      // 登入用戶評論
      const userId =
        (session.user as { id?: string }).id || session.user.email || "";
      commentData.userId = userId;
      commentData.status = "APPROVED"; // 登入用戶直接通過審核
    } else {
      // 訪客評論
      if (!guestName || !guestEmail) {
        return NextResponse.json(
          { error: "訪客評論需要提供姓名和 Email" },
          { status: 400 }
        );
      }

      // 簡單的 Email 驗證
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(guestEmail)) {
        return NextResponse.json(
          { error: "Email 格式不正確" },
          { status: 400 }
        );
      }

      commentData.guestName = guestName.trim();
      commentData.guestEmail = guestEmail.trim().toLowerCase();
      commentData.status = "PENDING"; // 訪客評論需要審核
    }

    // 獲取 IP 位址和 User Agent
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded
      ? forwarded.split(",")[0]
      : request.headers.get("x-real-ip");
    commentData.ipAddress = ip;
    commentData.userAgent = request.headers.get("user-agent");

    // 創建評論
    const comment = await prisma.comment.create({
      data: commentData,
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
      },
    });

    // 更新文章評論數
    await prisma.post.update({
      where: { id: postId },
      data: {
        commentCount: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({
      comment,
      message: session?.user ? "評論發布成功" : "評論已提交，等待審核",
    });
  } catch (error) {
    console.error("發布評論失敗:", error);
    return NextResponse.json({ error: "發布評論失敗" }, { status: 500 });
  }
}
