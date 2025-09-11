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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const headersList = await headers();
    const userId = headersList.get('x-user-id');
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { action, notes } = body; // action: 'approve' | 'reject'

    if (!action || !['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action. Must be approve or reject' },
        { status: 400 }
      );
    }

    const connection = await mysql.createConnection(dbConfig);

    // Check if transaction exists and is in correct status
    const checkQuery = `
      SELECT utr.*, t.type_tryout, t.price
      FROM user_tryout_registrations utr
      LEFT JOIN tryouts t ON utr.tryout_id = t.id
      WHERE utr.id = ? AND utr.status = 'registered' AND utr.payment_status = 'paid'
    `;

    const [checkResult] = await connection.execute(checkQuery, [id]);
    
    if ((checkResult as any).length === 0) {
      await connection.end();
      return NextResponse.json(
        { error: 'Transaction not found or not eligible for approval/rejection' },
        { status: 404 }
      );
    }

    const transaction = (checkResult as any)[0];
    const newStatus = action === 'approve' ? 'approved' : 'rejected';
    const now = new Date().toISOString();

    // Update transaction status
    const updateQuery = `
      UPDATE user_tryout_registrations 
      SET 
        status = ?,
        approved_by = ?,
        approved_at = ?,
        notes = ?,
        updated_at = ?
      WHERE id = ?
    `;

    await connection.execute(updateQuery, [
      newStatus,
      userId,
      now,
      notes || null,
      now,
      id
    ]);

    await connection.end();

    return NextResponse.json({
      success: true,
      message: `Transaction ${action}d successfully`,
      data: {
        id: parseInt(id),
        status: newStatus,
        approved_by: parseInt(userId),
        approved_at: now,
      },
    });

  } catch (error) {
    console.error('Error updating transaction:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const headersList = await headers();
    const userId = headersList.get('x-user-id');
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const connection = await mysql.createConnection(dbConfig);

    const query = `
      SELECT 
        utr.*,
        u.name as user_name,
        u.email as user_email,
        u.phone,
        u.school,
        u.grade,
        t.title as tryout_title,
        t.description as tryout_description,
        t.type_tryout as tryout_type,
        t.price as tryout_price,
        t.start_date,
        t.end_date
      FROM user_tryout_registrations utr
      LEFT JOIN users u ON utr.user_id = u.id
      LEFT JOIN tryouts t ON utr.tryout_id = t.id
      WHERE utr.id = ?
    `;

    const [result] = await connection.execute(query, [id]);
    
    if ((result as any).length === 0) {
      await connection.end();
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }

    const transaction = (result as any)[0];

    await connection.end();

    return NextResponse.json({
      success: true,
      data: transaction,
    });

  } catch (error) {
    console.error('Error fetching transaction details:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
