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

    const connection = await mysql.createConnection(dbConfig);

    // Get transaction statistics
    const statsQuery = `
      SELECT 
        COUNT(*) as total_transactions,
        COALESCE(SUM(CASE WHEN utr.payment_status = 'paid' THEN t.price ELSE 0 END), 0) as total_revenue,
        COUNT(CASE WHEN utr.payment_status = 'pending' THEN 1 END) as pending_payments,
        COUNT(CASE WHEN utr.payment_status = 'paid' THEN 1 END) as successful_payments,
        COUNT(CASE WHEN utr.payment_status = 'failed' THEN 1 END) as failed_payments,
        COUNT(CASE WHEN utr.payment_status = 'refunded' THEN 1 END) as refunded_payments
      FROM user_tryout_registrations utr
      LEFT JOIN tryouts t ON utr.tryout_id = t.id
      WHERE t.type_tryout = 'paid'
    `;

    const [statsResult] = await connection.execute(statsQuery);
    const stats = (statsResult as any)[0];

    await connection.end();

    return NextResponse.json({
      success: true,
      data: {
        total_transactions: parseInt(stats.total_transactions),
        total_revenue: parseFloat(stats.total_revenue),
        pending_payments: parseInt(stats.pending_payments),
        successful_payments: parseInt(stats.successful_payments),
        failed_payments: parseInt(stats.failed_payments),
        refunded_payments: parseInt(stats.refunded_payments),
      },
    });

  } catch (error) {
    console.error('Error fetching transaction stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
