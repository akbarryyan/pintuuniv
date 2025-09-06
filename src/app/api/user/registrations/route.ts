import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Query untuk mengambil data tryout yang sudah didaftar user
    const sqlQuery = `
      SELECT 
        utr.id as registration_id,
        utr.status as registration_status,
        utr.payment_status,
        utr.registration_date,
        utr.approved_at,
        t.id,
        t.title,
        t.description,
        t.total_categories,
        t.total_questions,
        t.total_weight,
        t.passing_score,
        t.type_tryout,
        t.price,
        t.start_date,
        t.end_date,
        t.created_at
      FROM user_tryout_registrations utr
      JOIN tryouts t ON utr.tryout_id = t.id
      WHERE utr.user_id = ? 
        AND utr.status IN ('registered', 'approved')
      ORDER BY utr.registration_date DESC
    `;

    const registrations = await query(sqlQuery, [parseInt(userId)]);

    // Format data untuk frontend
    const formattedRegistrations = registrations.map((reg: any) => ({
      id: reg.id,
      title: reg.title,
      description: reg.description,
      total_categories: reg.total_categories,
      total_questions: reg.total_questions,
      total_weight: reg.total_weight,
      passing_score: reg.passing_score,
      type_tryout: reg.type_tryout,
      price: reg.price,
      start_date: reg.start_date,
      end_date: reg.end_date,
      created_at: reg.created_at,
      registration_id: reg.registration_id,
      registration_status: reg.registration_status,
      payment_status: reg.payment_status,
      registration_date: reg.registration_date,
      approved_at: reg.approved_at,
      // Mock data untuk UI
      subject: "UTBK/SNBT",
      duration: "120 menit",
      difficulty: "Sedang",
      participants: Math.floor(Math.random() * 1000) + 100,
      rating: 4.5,
      deadline: reg.end_date ? new Date(reg.end_date).toLocaleDateString('id-ID') : "Tidak ada batas waktu"
    }));

    return NextResponse.json({
      success: true,
      data: formattedRegistrations,
      total: formattedRegistrations.length
    });

  } catch (error) {
    console.error("Error fetching user registrations:", error);
    return NextResponse.json(
      { error: "Failed to fetch user registrations" },
      { status: 500 }
    );
  }
}
