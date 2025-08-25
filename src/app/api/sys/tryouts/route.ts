import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// Helper function untuk format tanggal tanpa timezone issues
function formatDateToYYYYMMDD(dateInput: string | Date): string {
  if (typeof dateInput === 'string') {
    // Data sudah dalam format DATE dari MySQL, return langsung
    if (dateInput.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return dateInput;
    } else {
      // Fallback untuk format lain - gunakan string manipulation
      const dateStr = dateInput.toString();
      if (dateStr.includes(' ')) {
        // Jika ada spasi, ambil bagian sebelum spasi (YYYY-MM-DD)
        return dateStr.split(' ')[0];
      }
      return dateStr;
    }
  } else {
    // Jika input adalah Date object, gunakan string manipulation
    const year = dateInput.getFullYear();
    const month = String(dateInput.getMonth() + 1).padStart(2, '0');
    const day = String(dateInput.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}

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
        DATE(t.start_date) as start_date,
        DATE(t.end_date) as end_date,
        t.created_at,
        t.updated_at
      FROM tryouts t
      ${whereClause}
      ORDER BY t.created_at DESC
      LIMIT ? OFFSET ?
    `;
    
    const tryouts = await query(selectQuery, [...params, limit, offset]) as any[];
    
    // Format tanggal untuk konsistensi - menggunakan UTC untuk menghindari timezone issues
    const formattedTryouts = tryouts.map(tryout => ({
      ...tryout,
      start_date: tryout.start_date ? formatDateToYYYYMMDD(tryout.start_date) : null,
      end_date: tryout.end_date ? formatDateToYYYYMMDD(tryout.end_date) : null,
      created_at: tryout.created_at ? new Date(tryout.created_at).toISOString() : null,
      updated_at: tryout.updated_at ? new Date(tryout.updated_at).toISOString() : null,
    }));
    
    return NextResponse.json({
      success: true,
      data: formattedTryouts,
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
