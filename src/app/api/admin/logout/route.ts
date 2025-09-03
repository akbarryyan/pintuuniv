import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    // Get token from headers
    const token = request.headers.get('authorization')?.replace('Bearer ', '') ||
                  request.cookies.get('adminToken')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Token tidak ditemukan' },
        { status: 401 }
      );
    }

    // Invalidate session in database
    await query(
      'UPDATE user_sessions SET is_active = 0 WHERE jwt_token = ?',
      [token]
    );

    // Create response with cleared cookie
    const response = NextResponse.json({
      success: true,
      message: 'Logout berhasil'
    });

    // Clear admin token cookie
    response.cookies.set('adminToken', '', {
      expires: new Date(0),
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    return response;

  } catch (error) {
    console.error('Admin logout error:', error);
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}
