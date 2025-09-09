import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const discussionId = params.id;

    const query = `
      SELECT 
        dr.id,
        dr.content,
        dr.created_at,
        u.name as user_name,
        u.school,
        u.grade,
        u.avatar
      FROM discussion_replies dr
      LEFT JOIN users u ON dr.user_id = u.id
      WHERE dr.discussion_id = ? AND dr.is_deleted = 0
      ORDER BY dr.created_at ASC
    `;

    const [replies] = await db.execute(query, [discussionId]);

    const formattedReplies = (replies as any[]).map(reply => ({
      id: reply.id,
      content: reply.content,
      created_at: reply.created_at,
      user_name: reply.user_name,
      school: reply.school || 'Unknown',
      grade: reply.grade || 'Unknown',
      avatar: reply.avatar || '👤'
    }));

    return NextResponse.json({
      success: true,
      data: formattedReplies
    });

  } catch (error) {
    console.error('Error fetching replies:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch replies' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const discussionId = params.id;
    const { content } = await request.json();

    if (!content || !content.trim()) {
      return NextResponse.json(
        { success: false, error: 'Content is required' },
        { status: 400 }
      );
    }

    // For now, use user_id = 1 as default
    // In a real app, you'd get this from authentication
    const userId = 1;

    const query = `
      INSERT INTO discussion_replies (discussion_id, user_id, content, created_at, updated_at)
      VALUES (?, ?, ?, NOW(), NOW())
    `;

    await db.execute(query, [discussionId, userId, content.trim()]);

    // Update reply count in discussions table
    const updateQuery = `
      UPDATE discussions 
      SET reply_count = reply_count + 1 
      WHERE id = ? AND is_deleted = 0
    `;

    await db.execute(updateQuery, [discussionId]);

    return NextResponse.json({
      success: true,
      message: 'Reply created successfully'
    });

  } catch (error) {
    console.error('Error creating reply:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create reply' },
      { status: 500 }
    );
  }
}
