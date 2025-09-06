import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET - Ambil tryout berdasarkan ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, message: "ID tryout tidak valid" },
        { status: 400 }
      );
    }
    
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
        t.type_tryout,
        t.price,
        t.start_date,
        t.end_date,
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
      WHERE t.id = ?
    `;
    
    const tryouts = await query(selectQuery, [id]) as any[];
    
    if (tryouts.length === 0) {
      return NextResponse.json(
        { success: false, message: "Tryout tidak ditemukan" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: tryouts[0]
    });
    
  } catch (error) {
    console.error("Error fetching tryout:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data tryout" },
      { status: 500 }
    );
  }
}

// PUT - Update tryout
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, message: "ID tryout tidak valid" },
        { status: 400 }
      );
    }
    
    // Cek apakah request body ada dan valid
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { success: false, message: "Content-Type harus application/json" },
        { status: 400 }
      );
    }
    
    let body;
    try {
      body = await request.json();
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return NextResponse.json(
        { success: false, message: "Request body tidak valid" },
        { status: 400 }
      );
    }
    const {
      title,
      description,
      passing_score,
      is_active,
      type_tryout,
      price,
      start_date,
      end_date
    } = body;
    
    // Validasi input
    if (!title || !description || !passing_score || !type_tryout) {
      return NextResponse.json(
        { success: false, message: "Title, description, passing score, dan type tryout wajib diisi" },
        { status: 400 }
      );
    }

    // Validasi untuk tryout berbayar
    if (type_tryout === 'paid' && (!price || price <= 0)) {
      return NextResponse.json(
        { success: false, message: "Harga wajib diisi untuk tryout berbayar" },
        { status: 400 }
      );
    }
    
    const updateQuery = `
      UPDATE tryouts 
      SET 
        title = ?,
        description = ?,
        passing_score = ?,
        is_active = ?,
        type_tryout = ?,
        price = ?,
        start_date = ?,
        end_date = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    
    await query(updateQuery, [
      title,
      description,
      passing_score,
      is_active ? 1 : 0,
      type_tryout,
      type_tryout === 'free' ? 0 : price,
      start_date || null,
      end_date || null,
      id
    ]);
    
    return NextResponse.json({
      success: true,
      message: "Tryout berhasil diupdate"
    });
    
  } catch (error) {
    console.error("Error updating tryout:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengupdate tryout" },
      { status: 500 }
    );
  }
}

// DELETE - Hapus tryout
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, message: "ID tryout tidak valid" },
        { status: 400 }
      );
    }
    
    // Cek apakah tryout ada
    const checkQuery = "SELECT id FROM tryouts WHERE id = ?";
    const checkResult = await query(checkQuery, [id]) as any[];
    
    if (checkResult.length === 0) {
      return NextResponse.json(
        { success: false, message: "Tryout tidak ditemukan" },
        { status: 404 }
      );
    }
    
    // Hapus data terkait secara berurutan (cascade delete)
    // 1. Hapus user_answers yang terkait dengan questions dari tryout ini
    await query(`
      DELETE ua FROM user_answers ua
      JOIN questions q ON ua.question_id = q.id
      JOIN categories c ON q.category_id = c.id
      WHERE c.tryout_id = ?
    `, [id]);
    
    // 2. Hapus answers yang terkait dengan questions dari tryout ini
    await query(`
      DELETE a FROM answers a
      JOIN questions q ON a.question_id = q.id
      JOIN categories c ON q.category_id = c.id
      WHERE c.tryout_id = ?
    `, [id]);
    
    // 3. Hapus questions yang terkait dengan categories dari tryout ini
    await query(`
      DELETE q FROM questions q
      JOIN categories c ON q.category_id = c.id
      WHERE c.tryout_id = ?
    `, [id]);
    
    // 4. Hapus user_category_scores yang terkait dengan tryout ini
    await query(`
      DELETE FROM user_category_scores WHERE tryout_id = ?
    `, [id]);
    
    // 5. Hapus user_category_sessions yang terkait dengan tryout ini
    await query(`
      DELETE FROM user_category_sessions WHERE tryout_id = ?
    `, [id]);
    
    // 6. Hapus user_tryout_sessions yang terkait dengan tryout ini
    await query(`
      DELETE FROM user_tryout_sessions WHERE tryout_id = ?
    `, [id]);
    
    // 7. Hapus user_tryout_registrations yang terkait dengan tryout ini
    await query(`
      DELETE FROM user_tryout_registrations WHERE tryout_id = ?
    `, [id]);
    
    // 8. Hapus categories yang terkait dengan tryout ini
    await query(`
      DELETE FROM categories WHERE tryout_id = ?
    `, [id]);
    
    // 9. Hapus tryout itu sendiri
    await query(`
      DELETE FROM tryouts WHERE id = ?
    `, [id]);
    
    return NextResponse.json({
      success: true,
      message: "Tryout berhasil dihapus"
    });
    
  } catch (error) {
    console.error("Error deleting tryout:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus tryout" },
      { status: 500 }
    );
  }
}
