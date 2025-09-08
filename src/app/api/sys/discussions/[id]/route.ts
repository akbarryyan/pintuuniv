import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const discussionId = params.id;
    const body = await request.json();
    const { is_pinned } = body;

    if (is_pinned !== undefined) {
      await query(
        'UPDATE discussions SET is_pinned = ? WHERE id = ?',
        [is_pinned ? 1 : 0, discussionId]
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Discussion updated successfully'
    });

  } catch (error) {
    console.error('Error updating discussion:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const discussionId = params.id;

    // Soft delete discussion
    await query(
      'UPDATE discussions SET is_deleted = 1 WHERE id = ?',
      [discussionId]
    );

    return NextResponse.json({
      success: true,
      message: 'Discussion deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting discussion:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
