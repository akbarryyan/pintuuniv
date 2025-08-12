import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    // Ambil token dari cookie atau Authorization
    const authHeader = request.headers.get("authorization");
    const token =
      authHeader?.replace("Bearer ", "") ||
      request.cookies.get("auth-token")?.value;

    if (token) {
      // Hapus sesi yang terkait token ini (jika ada)
      try {
        await db.execute("DELETE FROM user_sessions WHERE jwt_token = ?", [token]);
      } catch (e) {
        console.warn("Logout: gagal menghapus sesi, lanjut clear cookie", e);
      }
    }

    // Buat response dan hapus cookie HttpOnly dengan set maxAge 0
    const response = NextResponse.json(
      { success: true, message: "Logout berhasil" },
      { status: 200 }
    );

    response.cookies.set("auth-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server saat logout" },
      { status: 500 }
    );
  }
}


