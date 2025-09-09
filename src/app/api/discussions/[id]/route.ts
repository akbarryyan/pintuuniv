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
        d.id,
        d.title,
        d.content,
        d.view_count,
        d.reply_count,
        d.like_count,
        d.is_pinned,
        d.created_at,
        d.updated_at,
        u.name as user_name,
        u.school,
        u.grade,
        u.avatar,
        GROUP_CONCAT(DISTINCT dt.name) as tags,
        GROUP_CONCAT(DISTINCT dt.color) as tag_colors
      FROM discussions d
      LEFT JOIN users u ON d.user_id = u.id
      LEFT JOIN discussion_tag_map dtm ON d.id = dtm.discussion_id
      LEFT JOIN discussion_tags dt ON dtm.tag_id = dt.id AND dt.is_active = 1
      WHERE d.id = ? AND d.is_deleted = 0
      GROUP BY d.id
    `;

    const [discussions] = await db.execute(query, [discussionId]);

    if (!discussions || (discussions as any[]).length === 0) {
      return NextResponse.json(
        { success: false, error: 'Discussion not found' },
        { status: 404 }
      );
    }

    const discussion = (discussions as any[])[0];

    const formattedDiscussion = {
      id: discussion.id,
      title: discussion.title,
      content: discussion.content,
      view_count: discussion.view_count || 0,
      reply_count: discussion.reply_count || 0,
      like_count: discussion.like_count || 0,
      is_pinned: Boolean(discussion.is_pinned),
      created_at: discussion.created_at,
      updated_at: discussion.updated_at,
      user_name: discussion.user_name,
      school: discussion.school || 'Unknown',
      grade: discussion.grade || 'Unknown',
      avatar: discussion.avatar || '👤',
      tags: discussion.tags ? discussion.tags.split(',') : [],
      tag_colors: discussion.tag_colors ? discussion.tag_colors.split(',') : []
    };

    return NextResponse.json({
      success: true,
      data: formattedDiscussion
    });

  } catch (error) {
    console.error('Error fetching discussion:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch discussion' },
      { status: 500 }
    );
  }
}
