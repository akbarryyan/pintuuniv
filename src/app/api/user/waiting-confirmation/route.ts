import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    const query = `
      SELECT 
        utr.id,
        utr.tryout_id,
        t.title as tryout_title,
        t.type_tryout as tryout_type,
        utr.registration_date,
        utr.status,
        utr.payment_status,
        utr.payment_method,
        utr.payment_date,
        t.price as payment_amount,
        pm.name as payment_method_name
      FROM user_tryout_registrations utr
      JOIN tryouts t ON utr.tryout_id = t.id
      LEFT JOIN payment_methods pm ON utr.payment_method_id = pm.id
      WHERE utr.user_id = ? 
        AND utr.status IN ('waiting_confirmation', 'rejected')
      ORDER BY utr.registration_date DESC
    `;

    const [rows] = await pool.execute<RowDataPacket[]>(query, [userId]);

    return NextResponse.json({
      success: true,
      tryouts: rows,
    });
  } catch (error) {
    console.error("Error fetching waiting confirmation tryouts:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch waiting confirmation tryouts",
      },
      { status: 500 }
    );
  }
}
