import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET - Ambil semua tryouts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "all";
    
    const offset = (page - 1) * limit;
    
    let whereClause = "WHERE 1=1";
    const params: any[] = [];
    
    if (search) {
      whereClause += " AND (title LIKE ? OR description LIKE ?)";
      params.push(`%${search}%`, `%${search}%`);
    }
    
    if (status !== "all") {
      whereClause += " AND is_active = ?";
      params.push(status === "active" ? 1 : 0);
    }
    
    // Hitung total tryouts
    const countQuery = `SELECT COUNT(*) as total FROM tryouts ${whereClause}`;
    const countResult = await query(countQuery, params) as any[];
    const total = countResult[0]?.total || 0;
    
    // Ambil data tryouts dengan pagination
    const selectQuery = `
      SELECT 
        t.id,
        t.title,
        t.description,
        t.total_categories,
        t.total_questions,
        t.total_weight,
        t.passing_score,
        t.is_active,
        t.start_date,
        t.end_date,
        t.created_at,
        t.updated_at
      FROM tryouts t
      ${whereClause}
      ORDER BY t.created_at DESC
      LIMIT ? OFFSET ?
    `;
    
    const tryouts = await query(selectQuery, [...params, limit, offset]);
    
    return NextResponse.json({
      success: true,
      data: tryouts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error("Error fetching tryouts:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data tryouts" },
      { status: 500 }
    );
  }
}

// POST - Buat tryout baru
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      passing_score,
      is_active,
      start_date,
      end_date
    } = body;
    
    // Validasi input
    if (!title || !description || !passing_score) {
      return NextResponse.json(
        { success: false, message: "Title, description, dan passing score wajib diisi" },
        { status: 400 }
      );
    }
    
    const insertQuery = `
      INSERT INTO tryouts (
        title, description, total_categories, total_questions, 
        total_weight, passing_score, is_active, start_date, end_date
      ) VALUES (?, ?, 0, 0, 0, ?, ?, ?, ?)
    `;
    
    const result = await query(insertQuery, [
      title,
      description,
      passing_score,
      is_active ? 1 : 0,
      start_date || null,
      end_date || null
    ]) as any;
    
    return NextResponse.json({
      success: true,
      message: "Tryout berhasil dibuat",
      data: { id: result.insertId }
    });
    
  } catch (error) {
    console.error("Error creating tryout:", error);
    return NextResponse.json(
      { success: false, message: "Gagal membuat tryout" },
      { status: 500 }
    );
  }
}
