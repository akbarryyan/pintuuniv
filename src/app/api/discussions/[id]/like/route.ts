import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const discussionId = params.id;

    // For now, just increment like count
    // In a real app, you'd check if user already liked and handle accordingly
    const query = `
      UPDATE discussions 
      SET like_count = like_count + 1 
      WHERE id = ? AND is_deleted = 0
    `;

    await db.execute(query, [discussionId]);

    return NextResponse.json({
      success: true,
      message: 'Like count updated'
    });

  } catch (error) {
    console.error('Error updating like count:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update like count' },
      { status: 500 }
    );
  }
}
