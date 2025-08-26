import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET - Ambil semua users dengan pagination dan filter
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const subscription = searchParams.get("subscription") || "";
    const sortBy = searchParams.get("sortBy") || "created_at";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const offset = (page - 1) * limit;

    // Build WHERE clause
    let whereConditions = [];
    let params = [];

    if (search) {
      whereConditions.push("(u.name LIKE ? OR u.email LIKE ? OR u.phone LIKE ? OR u.school LIKE ?)");
      params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (status && status !== "all") {
      whereConditions.push("u.status = ?");
      params.push(status);
    }

    if (subscription && subscription !== "all") {
      whereConditions.push("u.subscription_type = ?");
      params.push(subscription);
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(" AND ")}` : "";

    // Count total users
    const countQuery = `
      SELECT COUNT(*) as total
      FROM users u
      ${whereClause}
    `;
    const countResult = await query(countQuery, params) as any[];
    const totalUsers = countResult[0].total;

    // Get users with pagination
    const usersQuery = `
      SELECT 
        u.id,
        u.name,
        u.email,
        u.phone,
        u.school,
        u.grade,
        u.subscription_type,
        u.target_university,
        u.target_major,
        u.target_score,
        u.total_score,
        u.total_attempts,
        u.average_score,
        u.rank_position,
        u.subscription_expires,
        u.role,
        u.status,
        u.last_activity,
        u.created_at as join_date,
        u.updated_at as last_active,
        u.total_attempts as tryouts_completed
      FROM users u
      ${whereClause}
      ORDER BY ${sortBy} ${sortOrder.toUpperCase()}
      LIMIT ? OFFSET ?
    `;

    const users = await query(usersQuery, [...params, limit, offset]) as any[];

    return NextResponse.json({
      success: true,
      data: users,
      pagination: {
        page,
        limit,
        total: totalUsers,
        totalPages: Math.ceil(totalUsers / limit)
      }
    });

  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data users" },
      { status: 500 }
    );
  }
}

// POST - Buat user baru
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      school,
      grade,
      subscription_type,
      target_university,
      target_major,
      password
    } = body;

    // Validasi input
    if (!name || !email || !phone || !school || !grade || !password) {
      return NextResponse.json(
        { success: false, message: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    // Cek apakah email sudah ada
    const checkEmailQuery = "SELECT id FROM users WHERE email = ?";
    const existingUser = await query(checkEmailQuery, [email]) as any[];
    
    if (existingUser.length > 0) {
      return NextResponse.json(
        { success: false, message: "Email sudah terdaftar" },
        { status: 400 }
      );
    }

    // Insert user baru
    const insertQuery = `
      INSERT INTO users (
        name, email, phone, school, grade, subscription_type, 
        target_university, target_major, target_score, password_hash, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `;

    const result = await query(insertQuery, [
      name,
      email,
      phone,
      school,
      grade,
      subscription_type || 'free',
      target_university || '',
      target_major || '',
      null, // target_score
      password // password_hash
    ]) as any;

    return NextResponse.json({
      success: true,
      message: "User berhasil dibuat",
      data: { id: result.insertId }
    });

  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { success: false, message: "Gagal membuat user" },
      { status: 500 }
    );
  }
}
