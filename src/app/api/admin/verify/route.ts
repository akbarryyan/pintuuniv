import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    // Get token from headers
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Token tidak ditemukan' },
        { status: 401 }
      );
    }

    try {
      // Verify JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key') as any;
      
      // Check if user is admin
      if (decoded.role !== 'admin' || decoded.type !== 'admin') {
        return NextResponse.json(
          { success: false, message: 'Akses ditolak' },
          { status: 403 }
        );
      }

      // Check if session is still active in database
      const sessions = await query(
        'SELECT id, user_id, expires_at, is_active FROM user_sessions WHERE jwt_token = ? AND is_active = 1',
        [token]
      ) as any[];

      if (!sessions || sessions.length === 0) {
        return NextResponse.json(
          { success: false, message: 'Session tidak valid' },
          { status: 401 }
        );
      }

      const session = sessions[0];
      
      // Check if session is expired
      const now = new Date();
      const expiresAt = new Date(session.expires_at);
      
      if (now > expiresAt) {
        // Mark session as inactive
        await query(
          'UPDATE user_sessions SET is_active = 0 WHERE id = ?',
          [session.id]
        );
        
        return NextResponse.json(
          { success: false, message: 'Session expired' },
          { status: 401 }
        );
      }

      // Get current user info
      const users = await query(
        'SELECT id, name, email, role, status FROM users WHERE id = ? AND role = "admin" AND status = "active"',
        [decoded.id]
      ) as any[];

      if (!users || users.length === 0) {
        return NextResponse.json(
          { success: false, message: 'User tidak ditemukan' },
          { status: 404 }
        );
      }

      const user = users[0];

      // Update last activity
      await query(
        'UPDATE user_sessions SET last_activity = NOW() WHERE id = ?',
        [session.id]
      );

      return NextResponse.json({
        success: true,
        message: 'Token valid',
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        }
      });

    } catch (jwtError) {
      return NextResponse.json(
        { success: false, message: 'Token tidak valid' },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}
