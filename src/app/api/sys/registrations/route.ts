import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const paymentStatus = searchParams.get('paymentStatus');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'registration_date';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const offset = (page - 1) * limit;

    // Build WHERE conditions
    let whereConditions = [];
    let queryParams = [];

    if (status) {
      whereConditions.push('utr.status = ?');
      queryParams.push(status);
    }

    if (paymentStatus) {
      whereConditions.push('utr.payment_status = ?');
      queryParams.push(paymentStatus);
    }

    if (search) {
      whereConditions.push('(u.name LIKE ? OR u.email LIKE ? OR t.title LIKE ?)');
      queryParams.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    // Get total count
    const [countResult] = await query(
      `SELECT COUNT(*) as total 
       FROM user_tryout_registrations utr
       JOIN users u ON utr.user_id = u.id
       JOIN tryouts t ON utr.tryout_id = t.id
       ${whereClause}`,
      queryParams
    );

    const total = countResult.total;

    // Get registrations with pagination
    const registrations = await query(
      `SELECT 
         utr.id,
         utr.user_id,
         utr.tryout_id,
         utr.registration_date,
         utr.status,
         utr.payment_status,
         utr.payment_method,
         utr.payment_reference,
         utr.payment_date,
         utr.approved_by,
         utr.approved_at,
         utr.notes,
         utr.created_at,
         utr.updated_at,
         u.name as user_name,
         u.email as user_email,
         u.phone as user_phone,
         u.school as user_school,
         u.grade as user_grade,
         t.title as tryout_title,
         t.description as tryout_description,
         t.start_date as tryout_start_date,
         t.end_date as tryout_end_date,
         admin.name as approved_by_name
       FROM user_tryout_registrations utr
       JOIN users u ON utr.user_id = u.id
       JOIN tryouts t ON utr.tryout_id = t.id
       LEFT JOIN users admin ON utr.approved_by = admin.id
       ${whereClause}
       ORDER BY utr.${sortBy} ${sortOrder.toUpperCase()}
       LIMIT ? OFFSET ?`,
      [...queryParams, limit, offset]
    );

    return NextResponse.json({
      success: true,
      registrations,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan saat mengambil data registrasi' },
      { status: 500 }
    );
  }
}
