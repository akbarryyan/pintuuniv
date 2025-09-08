import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const tagId = searchParams.get('tagId');

    const offset = (page - 1) * limit;

    let sqlQuery = `
      SELECT 
        d.id,
        d.title,
        d.content,
        d.view_count,
        d.reply_count,
        d.like_count,
        d.is_pinned,
        d.created_at,
        u.id as user_id,
        u.name as user_name,
        u.email as user_email
      FROM discussions d
      LEFT JOIN users u ON d.user_id = u.id
      WHERE d.is_deleted = 0
    `;

    const params: any[] = [];

    if (search) {
      sqlQuery += ` AND (d.title LIKE ? OR d.content LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`);
    }

    if (tagId) {
      sqlQuery += ` AND d.id IN (
        SELECT dtm.discussion_id 
        FROM discussion_tag_map dtm 
        WHERE dtm.tag_id = ?
      )`;
      params.push(tagId);
    }

    sqlQuery += ` ORDER BY d.is_pinned DESC, d.created_at DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const discussions = await query(sqlQuery, params);

    // Get tags for each discussion
    const discussionsWithTags = await Promise.all(
      discussions.map(async (discussion: any) => {
        const tagsQuery = `
          SELECT dt.id, dt.name, dt.color
          FROM discussion_tags dt
          INNER JOIN discussion_tag_map dtm ON dt.id = dtm.tag_id
          WHERE dtm.discussion_id = ? AND dt.is_active = 1
        `;
        const tags = await query(tagsQuery, [discussion.id]);

        return {
          id: discussion.id,
          title: discussion.title,
          content: discussion.content,
          view_count: discussion.view_count,
          reply_count: discussion.reply_count,
          like_count: discussion.like_count,
          is_pinned: Boolean(discussion.is_pinned),
          created_at: discussion.created_at,
          user: {
            id: discussion.user_id,
            name: discussion.user_name,
            email: discussion.user_email
          },
          tags: tags
        };
      })
    );

    return NextResponse.json({
      success: true,
      discussions: discussionsWithTags,
      pagination: {
        page,
        limit,
        total: discussionsWithTags.length
      }
    });

  } catch (error) {
    console.error('Error fetching discussions:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const discussionId = searchParams.get('id');

    if (!discussionId) {
      return NextResponse.json(
        { success: false, error: 'Discussion ID is required' },
        { status: 400 }
      );
    }

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
