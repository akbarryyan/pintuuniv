import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET - Ambil daftar categories untuk dropdown
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tryout_id = searchParams.get("tryout_id");
    
    let whereClause = "WHERE c.is_active = 1";
    const params: any[] = [];
    
    if (tryout_id && tryout_id !== "all") {
      whereClause += " AND c.tryout_id = ?";
      params.push(tryout_id);
    }
    
    const selectQuery = `
      SELECT 
        c.id, 
        c.name, 
        c.description,
        t.title as tryout_title
      FROM categories c
      JOIN tryouts t ON c.tryout_id = t.id
      ${whereClause}
      ORDER BY c.name ASC
    `;
    
    const categories = await query(selectQuery, params) as any[];
    
    return NextResponse.json({
      success: true,
      data: categories
    });
    
  } catch (error) {
    console.error("Error fetching category options:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data category options" },
      { status: 500 }
    );
  }
}
