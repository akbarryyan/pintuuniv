import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { verifyPassword, validateEmail, generateToken } from "@/lib/auth";
import { RowDataPacket } from "mysql2";

interface LoginRequestBody {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface UserRow extends RowDataPacket {
  id: number;
  email: string;
  password: string;
  full_name: string;
  subscription_type: string;
  avatar: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequestBody = await request.json();

    // Validate required fields
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email dan password wajib diisi" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { success: false, message: "Format email tidak valid" },
        { status: 400 }
      );
    }

    // Get user by email
    const [users] = await db.execute<UserRow[]>(
      "SELECT id, email, password, full_name, subscription_type, avatar FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return NextResponse.json(
        { success: false, message: "Email atau password salah" },
        { status: 401 }
      );
    }

    const user = users[0];

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Email atau password salah" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      subscriptionType: user.subscription_type,
    });

    // Store session in database
    const expiresAt = new Date();
    const expirationDays = body.rememberMe ? 30 : 7; // 30 days if remember me, otherwise 7 days
    expiresAt.setDate(expiresAt.getDate() + expirationDays);

    // Clean up old sessions for this user (optional - keep only latest sessions)
    await db.execute(
      "DELETE FROM user_sessions WHERE user_id = ? AND expires_at < NOW()",
      [user.id]
    );

    // Insert new session
    await db.execute(
      "INSERT INTO user_sessions (user_id, session_token, expires_at) VALUES (?, ?, ?)",
      [user.id, token, expiresAt]
    );

    // Return success response (don't include password)
    return NextResponse.json(
      {
        success: true,
        message: "Login berhasil! Selamat datang kembali!",
        user: {
          id: user.id,
          email: user.email,
          fullName: user.full_name,
          subscriptionType: user.subscription_type,
          avatar: user.avatar,
        },
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan server. Silakan coba lagi.",
      },
      { status: 500 }
    );
  }
}
