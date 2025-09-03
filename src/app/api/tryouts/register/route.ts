import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tryoutId, userId } = body;

    if (!tryoutId || !userId) {
      return NextResponse.json(
        { success: false, message: 'Tryout ID dan User ID diperlukan' },
        { status: 400 }
      );
    }

    // Cek apakah user sudah terdaftar di tryout ini
    const [existingRegistration] = await query(
      'SELECT id FROM user_tryout_registrations WHERE user_id = ? AND tryout_id = ?',
      [userId, tryoutId]
    );

    if (existingRegistration) {
      return NextResponse.json(
        { success: false, message: 'Anda sudah terdaftar di tryout ini' },
        { status: 400 }
      );
    }

    // Cek apakah tryout ada dan aktif, serta ambil informasi total questions
        const [tryout] = await query(
      `SELECT
         t.id,
         t.title,
         t.is_active,
         t.type_tryout,
         COALESCE(q_stats.question_count, 0) as total_questions
       FROM tryouts t
       LEFT JOIN (
         SELECT
           c.tryout_id,
           COUNT(q.id) as question_count
         FROM categories c
         LEFT JOIN questions q ON c.id = q.category_id
         GROUP BY c.tryout_id
       ) q_stats ON t.id = q_stats.tryout_id
       WHERE t.id = ? AND t.is_active = 1`,
      [tryoutId]
    );

    if (!tryout) {
      return NextResponse.json(
        { success: false, message: 'Tryout tidak ditemukan atau tidak aktif' },
        { status: 404 }
      );
    }

    // Tentukan apakah tryout gratis atau berbayar berdasarkan type_tryout dari database
    const isFreeTryout = tryout.type_tryout === 'free';
    
    // Tentukan status dan payment status berdasarkan type tryout
    const status = isFreeTryout ? 'approved' : 'registered';
    const paymentStatus = isFreeTryout ? 'paid' : 'pending';
    const paymentMethod = isFreeTryout ? 'free' : 'pending';

    // Daftarkan user ke tryout
    const result = await query(
      `INSERT INTO user_tryout_registrations 
       (user_id, tryout_id, registration_date, status, payment_status, payment_method) 
       VALUES (?, ?, NOW(), ?, ?, ?)`,
      [userId, tryoutId, status, paymentStatus, paymentMethod]
    );

    return NextResponse.json({
      success: true,
      message: isFreeTryout 
        ? 'Berhasil mendaftar tryout gratis! Anda dapat langsung mengakses tryout.' 
        : 'Berhasil mendaftar tryout berbayar! Menunggu persetujuan admin.',
      registrationId: result.insertId,
      isApproved: isFreeTryout
    });

  } catch (error) {
    console.error('Error registering for tryout:', error);
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan saat mendaftar' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const tryoutId = searchParams.get('tryoutId');

    if (!userId || !tryoutId) {
      return NextResponse.json(
        { success: false, message: 'User ID dan Tryout ID diperlukan' },
        { status: 400 }
      );
    }

    // Cek status registrasi user
    const [registration] = await query(
      `SELECT id, status, payment_status, registration_date 
       FROM user_tryout_registrations 
       WHERE user_id = ? AND tryout_id = ?`,
      [userId, tryoutId]
    );

    return NextResponse.json({
      success: true,
      isRegistered: !!registration,
      registration: registration || null
    });

  } catch (error) {
    console.error('Error checking registration status:', error);
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan saat mengecek status registrasi' },
      { status: 500 }
    );
  }
}
