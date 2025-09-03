import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email dan password harus diisi' },
        { status: 400 }
      );
    }

    // Query admin user from database
    const adminUsers = await query(
      'SELECT id, name, email, password_hash, role, status, created_at FROM users WHERE email = ? AND role = "admin" AND status = "active"',
      [email]
    ) as any[];

    if (!adminUsers || adminUsers.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Email atau password salah' },
        { status: 401 }
      );
    }

    const adminUser = adminUsers[0];

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, adminUser.password_hash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'Email atau password salah' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: adminUser.id, 
        email: adminUser.email, 
        role: adminUser.role,
        type: 'admin'
      },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: '24h' }
    );

    // Create session record
    const sessionToken = `admin_${adminUser.id}_${Date.now()}`;
    await query(
      'INSERT INTO user_sessions (user_id, session_token, jwt_token, expires_at, ip_address, user_agent, is_active) VALUES (?, ?, ?, DATE_ADD(NOW(), INTERVAL 24 HOUR), ?, ?, 1)',
      [
        adminUser.id,
        sessionToken,
        token,
        request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
        request.headers.get('user-agent') || 'unknown'
      ]
    );

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Login berhasil',
      data: {
        user: {
          id: adminUser.id,
          name: adminUser.name,
          email: adminUser.email,
          role: adminUser.role,
          createdAt: adminUser.created_at
        },
        token: token,
        sessionToken: sessionToken
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
