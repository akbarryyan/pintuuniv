import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

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
    const registrationRows = Array.isArray(registrations) ? registrations : [];

    // Format data untuk frontend
    const formattedRegistrations = registrationRows.map((reg: any) => ({
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
      deadline: reg.end_date
        ? new Date(reg.end_date).toLocaleDateString("id-ID")
        : "Tidak ada batas waktu",
    }));

    return NextResponse.json({
      success: true,
      data: formattedRegistrations,
      total: formattedRegistrations.length,
    });
  } catch (error) {
    console.error("Error fetching user registrations:", error);
    return NextResponse.json(
      { error: "Failed to fetch user registrations" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tryoutId, paymentMethod, paymentStatus } = body;

    if (!tryoutId) {
      return NextResponse.json(
        { success: false, error: "Tryout ID is required" },
        { status: 400 }
      );
    }

    // Verifikasi JWT token
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, error: "Authorization token required" },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const payload = verifyToken(token);

    if (!payload) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const userId = payload.userId;

    // Check tryout type to determine appropriate status
    const tryoutQuery = `SELECT type_tryout FROM tryouts WHERE id = ?`;
    const tryoutResult = await query(tryoutQuery, [tryoutId]);
    const tryoutRows = Array.isArray(tryoutResult) ? tryoutResult : [];
    const tryoutData = tryoutRows.length > 0 ? (tryoutRows[0] as any) : null;

    if (!tryoutData) {
      return NextResponse.json(
        { success: false, error: "Tryout not found" },
        { status: 404 }
      );
    }

    // Cek apakah user sudah terdaftar ke tryout ini
    const existingRegistration = await query(
      "SELECT id FROM user_tryout_registrations WHERE user_id = ? AND tryout_id = ?",
      [userId, tryoutId]
    );
    const existingRows = Array.isArray(existingRegistration)
      ? existingRegistration
      : [];

    if (existingRows.length > 0) {
      return NextResponse.json(
        { success: false, error: "User sudah terdaftar ke tryout ini" },
        { status: 400 }
      );
    }

    // Determine status based on tryout type
    let registrationStatus: string;
    let finalPaymentStatus: string;

    if (tryoutData.type_tryout === "free") {
      // Free tryouts: immediately registered with paid status
      registrationStatus = "registered";
      finalPaymentStatus = "paid";
    } else {
      // Paid tryouts: waiting for confirmation
      registrationStatus = "waiting_confirmation";
      finalPaymentStatus = paymentStatus || "pending";
    }

    // Daftarkan user ke tryout
    const registrationResult = await query(
      `INSERT INTO user_tryout_registrations 
       (user_id, tryout_id, registration_date, status, payment_status, payment_method, payment_date, created_at, updated_at) 
       VALUES (?, ?, NOW(), ?, ?, ?, NOW(), NOW(), NOW())`,
      [
        userId,
        tryoutId,
        registrationStatus,
        finalPaymentStatus,
        paymentMethod || "free",
      ]
    );
    const resultData = Array.isArray(registrationResult)
      ? (registrationResult[0] as any)
      : (registrationResult as any);

    const message =
      tryoutData.type_tryout === "free"
        ? "Berhasil terdaftar ke tryout gratis"
        : "Berhasil terdaftar ke tryout berbayar, menunggu konfirmasi pembayaran";

    return NextResponse.json({
      success: true,
      message,
      registrationId: resultData.insertId || null,
      status: registrationStatus,
    });
  } catch (error) {
    console.error("Error registering user to tryout:", error);
    return NextResponse.json(
      { success: false, error: "Failed to register to tryout" },
      { status: 500 }
    );
  }
}
