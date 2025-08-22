import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET - Ambil category berdasarkan ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
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
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, message: "ID category tidak valid" },
        { status: 400 }
      );
    }
    
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
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
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
    
    const deleteQuery = "DELETE FROM categories WHERE id = ?";
    await query(deleteQuery, [id]);
    
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
