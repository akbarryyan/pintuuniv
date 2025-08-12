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
  name: string;
  password_hash: string;
  subscription_type: string;
  status: string;
  avatar: string;
  phone: string | null;
  school: string | null;
  grade: string | null;
  target_university: string | null;
  target_major: string | null;
  utbk_target: number | null;
  created_at: Date;
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
      "SELECT id, email, name, password_hash, subscription_type, status, avatar, phone, school, grade, target_university, target_major, utbk_target, created_at FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return NextResponse.json(
        { success: false, message: "Email atau password salah" },
        { status: 401 }
      );
    }

    const user = users[0];

    // Check if user account is active
    if (user.status !== "active") {
      return NextResponse.json(
        {
          success: false,
          message: "Akun Anda sedang tidak aktif. Silakan hubungi admin.",
        },
        { status: 403 }
      );
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password_hash);

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
    const sessionToken = `session_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    const expiresAt = new Date();
    const expirationDays = body.rememberMe ? 30 : 7; // 30 days if remember me, otherwise 7 days
    expiresAt.setDate(expiresAt.getDate() + expirationDays);

    // Get client info
    const clientIP =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Clean up old sessions for this user (optional - keep only latest sessions)
    await db.execute(
      "DELETE FROM user_sessions WHERE user_id = ? AND expires_at < NOW()",
      [user.id]
    );

    // Insert new session
    await db.execute(
      "INSERT INTO user_sessions (user_id, session_token, jwt_token, expires_at, ip_address, user_agent) VALUES (?, ?, ?, ?, ?, ?)",
      [user.id, sessionToken, token, expiresAt, clientIP, userAgent]
    );

    // Update last activity
    await db.execute(
      "UPDATE users SET last_activity = CURRENT_TIMESTAMP WHERE id = ?",
      [user.id]
    );

    // Return success response (don't include password)
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      subscriptionType: user.subscription_type,
      avatar: user.avatar,
      phone: user.phone,
      school: user.school,
      grade: user.grade,
      targetUniversity: user.target_university,
      targetMajor: user.target_major,
      utbkTarget: user.utbk_target,
      createdAt: user.created_at,
    };

    // Create response
    const response = NextResponse.json(
      {
        success: true,
        message: "Login berhasil! Selamat datang kembali di PintuUniv!",
        user: userData,
        token,
      },
      { status: 200 }
    );

    // Set HTTP-only cookie for additional security
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: expirationDays * 24 * 60 * 60, // Convert days to seconds
      path: "/",
    });

    return response;
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
