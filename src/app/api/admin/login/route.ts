import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Username dan password harus diisi' },
        { status: 400 }
      );
    }

    // Query admin user from database
    const [rows] = await db.execute(
      'SELECT id, username, email, role, created_at FROM admin_users WHERE username = ? AND password = ? AND is_active = 1',
      [username, password] // In production, use proper password hashing
    );

    if (!rows || (rows as any[]).length === 0) {
      return NextResponse.json(
        { success: false, message: 'Username atau password salah' },
        { status: 401 }
      );
    }

    const adminUser = (rows as any[])[0];

    // In production, generate JWT token here
    const token = `admin_${adminUser.id}_${Date.now()}`;

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Login berhasil',
      data: {
        user: {
          id: adminUser.id,
          username: adminUser.username,
          email: adminUser.email,
          role: adminUser.role,
          createdAt: adminUser.created_at
        },
        token: token
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}
