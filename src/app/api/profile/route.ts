import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const token =
      authHeader?.replace("Bearer ", "") ||
      request.cookies.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token tidak ditemukan" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: "Token tidak valid" },
        { status: 401 }
      );
    }

    const userId = decoded.userId;

    const [rows] = await db.execute(
      "SELECT id, email, name, phone, school, grade, avatar, target_university, target_major, target_score, subscription_type, subscription_expires, created_at FROM users WHERE id = ?",
      [userId]
    );

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    const user = rows[0] as any;

    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      school: user.school,
      grade: user.grade,
      avatar: user.avatar,
      targetUniversity: user.target_university,
      targetMajor: user.target_major,
      utbkTarget: user.target_score,
      subscriptionType: user.subscription_type,
      subscriptionExpiry: user.subscription_expires,
      createdAt: user.created_at,
    };

    return NextResponse.json(
      {
        success: true,
        user: userData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get profile error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}


