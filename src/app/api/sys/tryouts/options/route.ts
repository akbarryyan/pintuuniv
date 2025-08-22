import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET - Ambil daftar tryouts untuk dropdown
export async function GET(request: NextRequest) {
  try {
    const selectQuery = `
      SELECT id, title, description
      FROM tryouts 
      WHERE is_active = 1
      ORDER BY title ASC
    `;
    
    const tryouts = await query(selectQuery) as any[];
    
    return NextResponse.json({
      success: true,
      data: tryouts
    });
    
  } catch (error) {
    console.error("Error fetching tryout options:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data tryout options" },
      { status: 500 }
    );
  }
}
