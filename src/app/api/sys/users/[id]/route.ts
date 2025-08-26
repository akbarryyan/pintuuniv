import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET - Ambil user berdasarkan ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, message: "ID user tidak valid" },
        { status: 400 }
      );
    }
    
    const selectQuery = `
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
      WHERE u.id = ?
    `;
    
    const users = await query(selectQuery, [id]) as any[];
    
    if (users.length === 0) {
      return NextResponse.json(
        { success: false, message: "User tidak ditemukan" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: users[0]
    });
    
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data user" },
      { status: 500 }
    );
  }
}

// PUT - Update user
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, message: "ID user tidak valid" },
        { status: 400 }
      );
    }
    
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
      status
    } = body;
    
    // Validasi input
    if (!name || !email || !phone || !school || !grade) {
      return NextResponse.json(
        { success: false, message: "Semua field wajib diisi" },
        { status: 400 }
      );
    }
    
    // Cek apakah email sudah ada (kecuali untuk user yang sedang diupdate)
    const checkEmailQuery = "SELECT id FROM users WHERE email = ? AND id != ?";
    const existingUser = await query(checkEmailQuery, [email, id]) as any[];
    
    if (existingUser.length > 0) {
      return NextResponse.json(
        { success: false, message: "Email sudah terdaftar" },
        { status: 400 }
      );
    }
    
    // Update user
    const updateQuery = `
      UPDATE users 
      SET 
        name = ?,
        email = ?,
        phone = ?,
        school = ?,
        grade = ?,
        subscription_type = ?,
        target_university = ?,
        target_major = ?,
        target_score = ?,
        status = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    
    await query(updateQuery, [
      name,
      email,
      phone,
      school,
      grade,
      subscription_type || 'free',
      target_university || '',
      target_major || '',
      null, // target_score (bisa diubah nanti jika diperlukan)
      status || 'active',
      id
    ]);
    
    return NextResponse.json({
      success: true,
      message: "User berhasil diupdate"
    });
    
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengupdate user" },
      { status: 500 }
    );
  }
}

// DELETE - Hapus user
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, message: "ID user tidak valid" },
        { status: 400 }
      );
    }
    
    // Cek apakah user ada
    const checkUserQuery = "SELECT id FROM users WHERE id = ?";
    const userExists = await query(checkUserQuery, [id]) as any[];
    
    if (userExists.length === 0) {
      return NextResponse.json(
        { success: false, message: "User tidak ditemukan" },
        { status: 404 }
      );
    }
    
    // Hapus user (hard delete - benar-benar hapus dari database)
    const deleteQuery = "DELETE FROM users WHERE id = ?";
    
    await query(deleteQuery, [id]);
    
    return NextResponse.json({
      success: true,
      message: "User berhasil dihapus"
    });
    
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus user" },
      { status: 500 }
    );
  }
}
