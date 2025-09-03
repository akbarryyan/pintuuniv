import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const [registration] = await query(
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
         t.passing_score as tryout_passing_score,
         t.type_tryout,
         COALESCE(q_stats.question_count, 0) as tryout_total_questions,
         admin.name as approved_by_name
       FROM user_tryout_registrations utr
       JOIN users u ON utr.user_id = u.id
       JOIN tryouts t ON utr.tryout_id = t.id
       LEFT JOIN users admin ON utr.approved_by = admin.id
       LEFT JOIN (
         SELECT 
           c.tryout_id,
           COUNT(q.id) as question_count
         FROM categories c
         LEFT JOIN questions q ON c.id = q.category_id
         GROUP BY c.tryout_id
       ) q_stats ON t.id = q_stats.tryout_id
       WHERE utr.id = ?`,
      [id]
    );

    if (!registration) {
      return NextResponse.json(
        { success: false, message: 'Registrasi tidak ditemukan' },
        { status: 404 }
      );
    }

    // Add tryout type information
    const registrationWithType = {
      ...registration,
      tryout_type: registration.type_tryout || (registration.tryout_total_questions <= 50 ? 'free' : 'paid')
    };

    return NextResponse.json({
      success: true,
      registration: registrationWithType
    });

  } catch (error) {
    console.error('Error fetching registration:', error);
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan saat mengambil data registrasi' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, payment_status, notes, approved_by } = body;

    // Validate required fields
    if (!status) {
      return NextResponse.json(
        { success: false, message: 'Status diperlukan' },
        { status: 400 }
      );
    }

    // Update registration
    await query(
      `UPDATE user_tryout_registrations 
       SET status = ?, 
           payment_status = ?, 
           notes = ?, 
           approved_by = ?, 
           approved_at = CASE WHEN ? = 'approved' THEN NOW() ELSE approved_at END,
           updated_at = NOW()
       WHERE id = ?`,
      [status, payment_status, notes, approved_by, status, id]
    );

    return NextResponse.json({
      success: true,
      message: 'Registrasi berhasil diperbarui'
    });

  } catch (error) {
    console.error('Error updating registration:', error);
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan saat memperbarui registrasi' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Delete registration
    await query(
      'DELETE FROM user_tryout_registrations WHERE id = ?',
      [id]
    );

    return NextResponse.json({
      success: true,
      message: 'Registrasi berhasil dihapus'
    });

  } catch (error) {
    console.error('Error deleting registration:', error);
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan saat menghapus registrasi' },
      { status: 500 }
    );
  }
}
