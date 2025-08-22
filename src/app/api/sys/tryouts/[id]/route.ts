import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET - Ambil tryout berdasarkan ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
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
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, message: "ID tryout tidak valid" },
        { status: 400 }
      );
    }
    
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
    
    const updateQuery = `
      UPDATE tryouts 
      SET 
        title = ?,
        description = ?,
        passing_score = ?,
        is_active = ?,
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
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, message: "ID tryout tidak valid" },
        { status: 400 }
      );
    }
    
    // Cek apakah tryout memiliki kategori atau soal
    const checkQuery = `
      SELECT 
        (SELECT COUNT(*) FROM categories WHERE tryout_id = ?) as category_count,
        (SELECT COUNT(*) FROM questions q 
         JOIN categories c ON q.category_id = c.id 
         WHERE c.tryout_id = ?) as question_count
    `;
    
    const checkResult = await query(checkQuery, [id, id]) as any[];
    const { category_count, question_count } = checkResult[0];
    
    if (category_count > 0 || question_count > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Tidak dapat menghapus tryout. Masih ada ${category_count} kategori dan ${question_count} soal yang terkait.` 
        },
        { status: 400 }
      );
    }
    
    const deleteQuery = "DELETE FROM tryouts WHERE id = ?";
    await query(deleteQuery, [id]);
    
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
