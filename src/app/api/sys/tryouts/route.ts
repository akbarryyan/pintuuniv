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
    
    // Ambil data tryouts dengan pagination dan hitung total categories/questions secara real-time
    const selectQuery = `
      SELECT 
        t.id,
        t.title,
        t.description,
        COALESCE(cat_stats.category_count, 0) as total_categories,
        COALESCE(q_stats.question_count, 0) as total_questions,
        COALESCE(q_stats.total_weight, 0) as total_weight,
        t.passing_score,
        t.is_active,
        DATE(t.start_date) as start_date,
        DATE(t.end_date) as end_date,
        t.created_at,
        t.updated_at
      FROM tryouts t
      LEFT JOIN (
        SELECT 
          c.tryout_id,
          COUNT(c.id) as category_count
        FROM categories c
        GROUP BY c.tryout_id
      ) cat_stats ON t.id = cat_stats.tryout_id
      LEFT JOIN (
        SELECT 
          c.tryout_id,
          COUNT(q.id) as question_count,
          COALESCE(SUM(q.weight), 0) as total_weight
        FROM categories c
        LEFT JOIN questions q ON c.id = q.category_id
        GROUP BY c.tryout_id
      ) q_stats ON t.id = q_stats.tryout_id
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
    
    // Update statistik tryout setelah pembuatan
    await updateTryoutStats(result.insertId);

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

// PATCH - Update statistik semua tryout (untuk maintenance)
export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");
    
    if (action === "update-stats") {
      // Ambil semua tryout
      const tryoutsQuery = "SELECT id FROM tryouts";
      const tryouts = await query(tryoutsQuery) as any[];
      
      // Update statistik untuk setiap tryout
      for (const tryout of tryouts) {
        await updateTryoutStats(tryout.id);
      }
      
      return NextResponse.json({
        success: true,
        message: `Statistik berhasil diupdate untuk ${tryouts.length} tryout`
      });
    }
    
    return NextResponse.json(
      { success: false, message: "Action tidak valid" },
      { status: 400 }
    );
    
  } catch (error) {
    console.error("Error updating tryout stats:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengupdate statistik tryout" },
      { status: 500 }
    );
  }
}
