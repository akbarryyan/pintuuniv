import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    // Get token from cookie or authorization header
    const token = request.cookies.get('auth-token')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'User not authenticated' },
        { status: 401 }
      );
    }

    // Verify JWT token
    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key') as {
        userId: number;
        email: string;
        subscriptionType: string;
      };
    } catch (error) {
      console.error('JWT verification failed:', error);
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      );
    }

    const userId = payload.userId;

    // Get user's discussions
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
        GROUP_CONCAT(DISTINCT dt.name) as tags,
        GROUP_CONCAT(DISTINCT dt.color) as tag_colors
      FROM discussions d
      LEFT JOIN discussion_tag_map dtm ON d.id = dtm.discussion_id
      LEFT JOIN discussion_tags dt ON dtm.tag_id = dt.id AND dt.is_active = 1
      WHERE d.user_id = ? AND d.is_deleted = 0
      GROUP BY d.id
      ORDER BY d.is_pinned DESC, d.created_at DESC
    `;

    const [discussions] = await db.execute(query, [userId]);

    // Format discussions
    const formattedDiscussions = (discussions as any[]).map(discussion => ({
      id: discussion.id,
      title: discussion.title,
      content: discussion.content,
      view_count: discussion.view_count || 0,
      reply_count: discussion.reply_count || 0,
      like_count: discussion.like_count || 0,
      is_pinned: Boolean(discussion.is_pinned),
      created_at: discussion.created_at,
      updated_at: discussion.updated_at,
      tags: discussion.tags ? discussion.tags.split(',') : [],
      tagColors: discussion.tag_colors ? discussion.tag_colors.split(',') : []
    }));

    return NextResponse.json({
      success: true,
      data: {
        discussions: formattedDiscussions
      }
    });

  } catch (error) {
    console.error('Error fetching user discussions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch discussions' },
      { status: 500 }
    );
  }
}
