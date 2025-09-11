import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { headers } from 'next/headers';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'pintuuniv',
  port: parseInt(process.env.DB_PORT || '3306'),
};

export async function GET(request: NextRequest) {
  try {
    const headersList = await headers();
    const userId = headersList.get('x-user-id');
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const payment_status = searchParams.get('payment_status') || '';
    const registration_status = searchParams.get('registration_status') || '';
    const payment_method = searchParams.get('payment_method') || '';
    const date_range = searchParams.get('date_range') || '';

    const offset = (page - 1) * limit;

    const connection = await mysql.createConnection(dbConfig);

    // Build WHERE clause
    let whereConditions = ['utr.id IS NOT NULL'];
    let params: any[] = [];

    if (search) {
      whereConditions.push('(u.name LIKE ? OR u.email LIKE ? OR t.title LIKE ?)');
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (payment_status) {
      whereConditions.push('utr.payment_status = ?');
      params.push(payment_status);
    }

    if (registration_status) {
      whereConditions.push('utr.status = ?');
      params.push(registration_status);
    }

    if (payment_method) {
      whereConditions.push('utr.payment_method = ?');
      params.push(payment_method);
    }

    if (date_range) {
      const now = new Date();
      let dateCondition = '';
      
      switch (date_range) {
        case 'today':
          dateCondition = 'DATE(utr.created_at) = CURDATE()';
          break;
        case 'week':
          dateCondition = 'utr.created_at >= DATE_SUB(NOW(), INTERVAL 1 WEEK)';
          break;
        case 'month':
          dateCondition = 'utr.created_at >= DATE_SUB(NOW(), INTERVAL 1 MONTH)';
          break;
        case 'year':
          dateCondition = 'utr.created_at >= DATE_SUB(NOW(), INTERVAL 1 YEAR)';
          break;
      }
      
      if (dateCondition) {
        whereConditions.push(dateCondition);
      }
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    // Get transactions
    const transactionsQuery = `
      SELECT 
        utr.id,
        utr.user_id,
        utr.tryout_id,
        u.name as user_name,
        u.email as user_email,
        t.title as tryout_title,
        t.type_tryout as tryout_type,
        t.price as tryout_price,
        utr.payment_method,
        utr.payment_reference,
        utr.payment_status,
        utr.status as registration_status,
        utr.payment_date,
        utr.registration_date,
        utr.approved_by,
        utr.approved_at,
        utr.notes,
        utr.created_at,
        utr.updated_at
      FROM user_tryout_registrations utr
      LEFT JOIN users u ON utr.user_id = u.id
      LEFT JOIN tryouts t ON utr.tryout_id = t.id
      ${whereClause}
      ORDER BY utr.created_at DESC
      LIMIT ? OFFSET ?
    `;

    const [transactions] = await connection.execute(transactionsQuery, [...params, limit, offset]);

    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total
      FROM user_tryout_registrations utr
      LEFT JOIN users u ON utr.user_id = u.id
      LEFT JOIN tryouts t ON utr.tryout_id = t.id
      ${whereClause}
    `;

    const [countResult] = await connection.execute(countQuery, params);
    const total = (countResult as any)[0].total;

    await connection.end();

    return NextResponse.json({
      success: true,
      data: transactions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
