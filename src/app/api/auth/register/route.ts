import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import {
  hashPassword,
  validateEmail,
  validatePassword,
  validatePhone,
  generateToken,
} from "@/lib/auth";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface RegisterRequestBody {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  school?: string;
  grade: "10" | "11" | "12";
  phone?: string;
  agreeTerms: boolean;
}

interface UserRow extends RowDataPacket {
  id: number;
  email: string;
  full_name: string;
  subscription_type: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: RegisterRequestBody = await request.json();

    // Validate required fields
    const { email, password, confirmPassword, fullName, grade, agreeTerms } =
      body;

    if (!email || !password || !confirmPassword || !fullName || !grade) {
      return NextResponse.json(
        { success: false, message: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    if (!agreeTerms) {
      return NextResponse.json(
        {
          success: false,
          message: "Anda harus menyetujui syarat dan ketentuan",
        },
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

    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { success: false, message: passwordValidation.message },
        { status: 400 }
      );
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Password dan konfirmasi password tidak sama",
        },
        { status: 400 }
      );
    }

    // Validate phone if provided
    if (body.phone && !validatePhone(body.phone)) {
      return NextResponse.json(
        { success: false, message: "Format nomor telepon tidak valid" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const [existingUsers] = await db.execute<UserRow[]>(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Email sudah terdaftar. Silakan gunakan email lain atau login.",
        },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Insert new user
    const [result] = await db.execute<ResultSetHeader>(
      `INSERT INTO users (email, password, full_name, school, grade, phone, avatar) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        email,
        hashedPassword,
        fullName,
        body.school || null,
        grade,
        body.phone || null,
        "👤", // default avatar
      ]
    );

    const userId = result.insertId;

    // Get the created user
    const [newUser] = await db.execute<UserRow[]>(
      "SELECT id, email, full_name, subscription_type FROM users WHERE id = ?",
      [userId]
    );

    const user = newUser[0];

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      subscriptionType: user.subscription_type,
    });

    // Store session in database
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now

    await db.execute(
      "INSERT INTO user_sessions (user_id, session_token, expires_at) VALUES (?, ?, ?)",
      [userId, token, expiresAt]
    );

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Registrasi berhasil! Selamat datang di PintuUniv!",
        user: {
          id: user.id,
          email: user.email,
          fullName: user.full_name,
          subscriptionType: user.subscription_type,
        },
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);

    // Handle specific database errors
    if (error instanceof Error) {
      if (error.message.includes("Duplicate entry")) {
        return NextResponse.json(
          { success: false, message: "Email sudah terdaftar" },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan server. Silakan coba lagi.",
      },
      { status: 500 }
    );
  }
}
