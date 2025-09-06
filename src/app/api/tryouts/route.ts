import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const difficulty = searchParams.get("difficulty");
    const priceRange = searchParams.get("priceRange");
    const search = searchParams.get("search");

    // Build the base query - menggunakan struktur database yang benar
    let sqlQuery = `
      SELECT 
        t.id,
        t.title,
        t.description,
        t.passing_score,
        t.is_active,
        t.type_tryout,
        t.price,
        DATE(t.start_date) as start_date,
        DATE(t.end_date) as end_date,
        t.created_at,
        t.updated_at,
        COALESCE(cat_stats.category_count, 0) as total_categories,
        COALESCE(q_stats.question_count, 0) as total_questions,
        COALESCE(q_stats.total_weight, 0) as total_weight
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
      WHERE t.is_active = 1
    `;
    
    const queryParams: any[] = [];

    // Add filters
    if (type && type !== "all") {
      // Filter berdasarkan type_tryout dari database
      if (type === "free") {
        sqlQuery += " AND t.type_tryout = 'free'";
      } else if (type === "premium") {
        sqlQuery += " AND t.type_tryout = 'paid'";
      }
    }

    if (difficulty && difficulty !== "all") {
      // Karena tidak ada kolom difficulty, kita akan filter berdasarkan passing_score
      if (difficulty === "easy") {
        sqlQuery += " AND t.passing_score <= 600";
      } else if (difficulty === "medium") {
        sqlQuery += " AND t.passing_score > 600 AND t.passing_score <= 750";
      } else if (difficulty === "hard") {
        sqlQuery += " AND t.passing_score > 750";
      }
    }

    if (priceRange && priceRange !== "all") {
      // Filter berdasarkan price dari database
      if (priceRange === "free") {
        sqlQuery += " AND t.price = 0";
      } else if (priceRange === "cheap") {
        sqlQuery += " AND t.price > 0 AND t.price <= 50000";
      } else if (priceRange === "expensive") {
        sqlQuery += " AND t.price > 50000";
      }
    }

    if (search) {
      sqlQuery += " AND (t.title LIKE ? OR t.description LIKE ?)";
      const searchTerm = `%${search}%`;
      queryParams.push(searchTerm, searchTerm);
    }

    // Add ordering
    sqlQuery += " ORDER BY t.created_at DESC";

    console.log("Tryouts API - Query:", sqlQuery);
    console.log("Tryouts API - Params:", queryParams);

    const rows = await query(sqlQuery, queryParams) as any[];

    if (!Array.isArray(rows)) {
      return NextResponse.json(
        { success: false, message: "Data tidak ditemukan" },
        { status: 404 }
      );
    }

    // Transform the data to match the frontend structure
    const tryouts = rows.map((row: any) => {
      // Gunakan type_tryout dari database
      const type = row.type_tryout === 'free' ? "free" : "premium";
      
      // Tentukan difficulty berdasarkan passing_score
      let difficulty = "medium";
      if (row.passing_score <= 600) difficulty = "easy";
      else if (row.passing_score > 750) difficulty = "hard";
      
      // Gunakan price dari database
      const price = row.price || 0;
      const originalPrice = type === "premium" ? price * 1.2 : 0; // 20% markup untuk premium
      
      // Tentukan discount (random untuk demo)
      const discount = type === "premium" ? Math.floor(Math.random() * 30) + 10 : 0;
      
      // Tentukan participants (random untuk demo)
      const participants = Math.floor(Math.random() * 1000) + 50;

      return {
        id: row.id,
        title: row.title,
        price: price,
        originalPrice: originalPrice,
        type: type,
        difficulty: difficulty,
        participants: participants,
        discount: discount,
        startDate: row.start_date,
        endDate: row.end_date,
        status: row.is_active ? "active" : "inactive",
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        // Tambahan data dari database
        description: row.description,
        passingScore: row.passing_score,
        totalCategories: row.total_categories,
        totalQuestions: row.total_questions,
        totalWeight: row.total_weight,
        typeTryout: row.type_tryout, // Tambahkan field type_tryout
      };
    });

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
