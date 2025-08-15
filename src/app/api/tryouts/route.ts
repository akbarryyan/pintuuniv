import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const difficulty = searchParams.get("difficulty");
    const priceRange = searchParams.get("priceRange");
    const search = searchParams.get("search");

    // Build the base query
    let query = `
      SELECT 
        id, title, price, original_price, type, difficulty, participants, 
        discount, start_date, end_date, status, created_at, updated_at
      FROM tryouts 
      WHERE status = 'active'
    `;
    
    const queryParams: any[] = [];

    // Add filters
    if (type && type !== "all") {
      query += " AND type = ?";
      queryParams.push(type);
    }

    if (difficulty && difficulty !== "all") {
      query += " AND difficulty = ?";
      queryParams.push(difficulty);
    }

    if (priceRange && priceRange !== "all") {
      if (priceRange === "free") {
        query += " AND price = 0";
      } else if (priceRange === "cheap") {
        query += " AND price > 0 AND price <= 50000";
      } else if (priceRange === "expensive") {
        query += " AND price > 50000";
      }
    }

    if (search) {
      query += " AND title LIKE ?";
      const searchTerm = `%${search}%`;
      queryParams.push(searchTerm);
    }

    // Add ordering
    query += " ORDER BY created_at DESC";

    console.log("Tryouts API - Query:", query);
    console.log("Tryouts API - Params:", queryParams);

    const [rows] = await db.execute(query, queryParams);

    if (!Array.isArray(rows)) {
      return NextResponse.json(
        { success: false, message: "Data tidak ditemukan" },
        { status: 404 }
      );
    }

    // Transform the data to match the frontend structure
    const tryouts = rows.map((row: any) => ({
      id: row.id,
      title: row.title,
      price: parseFloat(row.price),
      originalPrice: parseFloat(row.original_price),
      type: row.type,
      difficulty: row.difficulty,
      participants: row.participants,
      discount: row.discount,
      startDate: row.start_date,
      endDate: row.end_date,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));

    console.log("Tryouts API - Found tryouts:", tryouts.length);

    return NextResponse.json(
      {
        success: true,
        tryouts: tryouts,
        total: tryouts.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get tryouts error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
