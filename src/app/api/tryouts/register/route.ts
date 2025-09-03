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

    // Cek apakah tryout ada dan aktif
    const [tryout] = await query(
      'SELECT id, title, is_active FROM tryouts WHERE id = ? AND is_active = 1',
      [tryoutId]
    );

    if (!tryout) {
      return NextResponse.json(
        { success: false, message: 'Tryout tidak ditemukan atau tidak aktif' },
        { status: 404 }
      );
    }

    // Daftarkan user ke tryout gratis
    const result = await query(
      `INSERT INTO user_tryout_registrations 
       (user_id, tryout_id, registration_date, status, payment_status, payment_method) 
       VALUES (?, ?, NOW(), 'registered', 'paid', 'free')`,
      [userId, tryoutId]
    );

    return NextResponse.json({
      success: true,
      message: 'Berhasil mendaftar tryout gratis',
      registrationId: result.insertId
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
