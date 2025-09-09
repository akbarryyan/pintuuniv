import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const discussionId = params.id;

    // Increment view count
    const query = `
      UPDATE discussions 
      SET view_count = view_count + 1 
      WHERE id = ? AND is_deleted = 0
    `;

    await db.execute(query, [discussionId]);

    return NextResponse.json({
      success: true,
      message: 'View count updated'
    });

  } catch (error) {
    console.error('Error updating view count:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update view count' },
      { status: 500 }
    );
  }
}
