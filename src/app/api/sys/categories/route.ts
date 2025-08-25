import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// Helper function untuk update statistik tryout
async function updateTryoutStats(tryoutId: number) {
  try {
    const statsQuery = `
      SELECT 
        COALESCE(cat_count.category_count, 0) as total_categories,
        COALESCE(q_stats.question_count, 0) as total_questions,
        COALESCE(q_stats.total_weight, 0) as total_weight
      FROM tryouts t
      LEFT JOIN (
        SELECT 
          c.tryout_id,
          COUNT(c.id) as category_count
        FROM categories c
        WHERE c.tryout_id = ?
        GROUP BY c.tryout_id
      ) cat_count ON t.id = cat_count.tryout_id
      LEFT JOIN (
        SELECT 
          c.tryout_id,
          COUNT(q.id) as question_count,
          COALESCE(SUM(q.weight), 0) as total_weight
        FROM categories c
        LEFT JOIN questions q ON c.id = q.category_id
        WHERE c.tryout_id = ?
        GROUP BY c.tryout_id
      ) q_stats ON t.id = q_stats.tryout_id
      WHERE t.id = ?
    `;
    
    const stats = await query(statsQuery, [tryoutId, tryoutId, tryoutId]) as any[];
    
    if (stats.length > 0) {
      const { total_categories, total_questions, total_weight } = stats[0];
      
      const updateQuery = `
        UPDATE tryouts 
        SET 
          total_categories = ?,
          total_questions = ?,
          total_weight = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `;
      
      await query(updateQuery, [total_categories, total_questions, total_weight, tryoutId]);
    }
  } catch (error) {
    console.error("Error updating tryout stats:", error);
  }
}

// GET - Ambil semua categories
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "all";
    const tryout = searchParams.get("tryout") || "all";
    const duration = searchParams.get("duration") || "all";
    
    const offset = (page - 1) * limit;
    
    let whereClause = "WHERE 1=1";
    const params: any[] = [];
    
    if (search) {
      whereClause += " AND (c.name LIKE ? OR c.description LIKE ?)";
      params.push(`%${search}%`, `%${search}%`);
    }
    
    if (status !== "all") {
      whereClause += " AND c.is_active = ?";
      params.push(status === "active" ? 1 : 0);
    }
    
    if (tryout !== "all") {
      whereClause += " AND c.tryout_id = ?";
      params.push(tryout);
    }
    
    if (duration !== "all") {
      switch (duration) {
        case "cepat":
          whereClause += " AND c.duration_minutes <= 20";
          break;
        case "sedang":
          whereClause += " AND c.duration_minutes BETWEEN 21 AND 30";
          break;
        case "lama":
          whereClause += " AND c.duration_minutes > 30";
          break;
      }
    }
    
    // Hitung total categories
    const countQuery = `
      SELECT COUNT(*) as total 
      FROM categories c 
      JOIN tryouts t ON c.tryout_id = t.id 
      ${whereClause}
    `;
    const countResult = await query(countQuery, params) as any[];
    const total = countResult[0]?.total || 0;
    
    // Ambil data categories dengan pagination
    const selectQuery = `
      SELECT 
        c.id,
        c.name,
        c.description,
        c.tryout_id,
        t.title as tryout_title,
        c.duration_minutes,
        c.total_weight,
        c.total_questions,
        c.is_active,
        c.created_at,
        c.updated_at
      FROM categories c
      JOIN tryouts t ON c.tryout_id = t.id
      ${whereClause}
      ORDER BY c.created_at DESC
      LIMIT ? OFFSET ?
    `;
    
    const categories = await query(selectQuery, [...params, limit, offset]) as any[];
    
    return NextResponse.json({
      success: true,
      data: categories,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data categories" },
      { status: 500 }
    );
  }
}

// POST - Buat category baru
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      description,
      tryout_id,
      duration_minutes,
      is_active
    } = body;
    
    // Validasi input
    if (!name || !tryout_id || !duration_minutes) {
      return NextResponse.json(
        { success: false, message: "Name, tryout_id, dan duration_minutes wajib diisi" },
        { status: 400 }
      );
    }
    
    const insertQuery = `
      INSERT INTO categories (
        name, description, tryout_id, duration_minutes, 
        total_weight, total_questions, is_active
      ) VALUES (?, ?, ?, ?, 0, 0, ?)
    `;
    
    const result = await query(insertQuery, [
      name,
      description || "",
      tryout_id,
      duration_minutes,
      is_active ? 1 : 0
    ]) as any;
    
    // Update statistik tryout setelah category dibuat
    await updateTryoutStats(tryout_id);
    
    return NextResponse.json({
      success: true,
      message: "Category berhasil dibuat",
      data: { id: result.insertId }
    });
    
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { success: false, message: "Gagal membuat category" },
      { status: 500 }
    );
  }
}
