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

// GET - Ambil category berdasarkan ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, message: "ID category tidak valid" },
        { status: 400 }
      );
    }
    
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
      WHERE c.id = ?
    `;
    
    const categories = await query(selectQuery, [id]) as any[];
    
    if (categories.length === 0) {
      return NextResponse.json(
        { success: false, message: "Category tidak ditemukan" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: categories[0]
    });
    
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data category" },
      { status: 500 }
    );
  }
}

// PUT - Update category
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, message: "ID category tidak valid" },
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
    
    const updateQuery = `
      UPDATE categories 
      SET 
        name = ?,
        description = ?,
        tryout_id = ?,
        duration_minutes = ?,
        is_active = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    
    await query(updateQuery, [
      name,
      description || "",
      tryout_id,
      duration_minutes,
      is_active ? 1 : 0,
      id
    ]);
    
    // Update statistik tryout setelah category diupdate
    await updateTryoutStats(tryout_id);
    
    return NextResponse.json({
      success: true,
      message: "Category berhasil diupdate"
    });
    
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengupdate category" },
      { status: 500 }
    );
  }
}

// DELETE - Hapus category
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, message: "ID category tidak valid" },
        { status: 400 }
      );
    }
    
    // Cek apakah category memiliki soal
    const checkQuery = "SELECT COUNT(*) as question_count FROM questions WHERE category_id = ?";
    const checkResult = await query(checkQuery, [id]) as any[];
    const { question_count } = checkResult[0];
    
    if (question_count > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Tidak dapat menghapus category. Masih ada ${question_count} soal yang terkait.` 
        },
        { status: 400 }
      );
    }
    
    // Ambil tryout_id sebelum menghapus category
    const getTryoutIdQuery = "SELECT tryout_id FROM categories WHERE id = ?";
    const tryoutResult = await query(getTryoutIdQuery, [id]) as any[];
    const tryoutId = tryoutResult[0]?.tryout_id;
    
    const deleteQuery = "DELETE FROM categories WHERE id = ?";
    await query(deleteQuery, [id]);
    
    // Update statistik tryout setelah category dihapus
    if (tryoutId) {
      await updateTryoutStats(tryoutId);
    }
    
    return NextResponse.json({
      success: true,
      message: "Category berhasil dihapus"
    });
    
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus category" },
      { status: 500 }
    );
  }
}
