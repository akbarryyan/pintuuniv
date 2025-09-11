import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "pintuuniv",
  port: parseInt(process.env.DB_PORT || "3306"),
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let connection;
  
  try {
    const { id } = await params;
    
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { success: false, error: "ID tryout tidak valid" },
        { status: 400 }
      );
    }

    connection = await mysql.createConnection(dbConfig);

    // Query untuk mengambil data tryout berdasarkan ID
    const [rows] = await connection.execute(
      `SELECT 
        t.id,
        t.title,
        t.description,
        t.total_categories,
        t.total_questions,
        t.total_weight,
        t.passing_score,
        t.is_active,
        t.type_tryout as type,
        t.price,
        t.start_date as startDate,
        t.end_date as endDate,
        t.created_at as createdAt,
        t.updated_at as updatedAt,
        COUNT(DISTINCT utr.user_id) as participants
      FROM tryouts t
      LEFT JOIN user_tryout_registrations utr ON t.id = utr.tryout_id 
        AND utr.status = 'approved'
      WHERE t.id = ? AND t.is_active = 1
      GROUP BY t.id`,
      [id]
    );

    const tryouts = rows as any[];

    if (tryouts.length === 0) {
      return NextResponse.json(
        { success: false, error: "Tryout tidak ditemukan" },
        { status: 404 }
      );
    }

    const tryout = tryouts[0];

    // Hitung diskon jika ada (contoh: jika harga lebih dari 100000, diskon 20%)
    let discount = 0;
    let originalPrice = tryout.price;
    
    if (tryout.price > 100000) {
      discount = 20;
      originalPrice = Math.round(tryout.price / (1 - discount / 100));
    }

    // Format data sesuai interface
    const formattedTryout = {
      id: tryout.id,
      title: tryout.title,
      price: tryout.price,
      originalPrice: originalPrice,
      type: tryout.type,
      difficulty: "hard", // Default difficulty
      participants: tryout.participants || 0,
      discount: discount,
      startDate: tryout.startDate,
      endDate: tryout.endDate,
      status: tryout.is_active ? "active" : "inactive",
      createdAt: tryout.createdAt,
      updatedAt: tryout.updatedAt,
    };

    return NextResponse.json({
      success: true,
      tryout: formattedTryout,
    });

  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
