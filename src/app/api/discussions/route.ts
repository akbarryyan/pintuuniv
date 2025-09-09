import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const tagId = searchParams.get('tagId') || '';
    const sortBy = searchParams.get('sortBy') || 'latest';

    const offset = (page - 1) * limit;

    // Build WHERE conditions
    let whereConditions = ['d.is_deleted = 0'];
    let queryParams: any[] = [];

    if (search) {
      whereConditions.push('(d.title LIKE ? OR d.content LIKE ?)');
      queryParams.push(`%${search}%`, `%${search}%`);
    }

    if (tagId) {
      whereConditions.push('dtm.tag_id = ?');
      queryParams.push(tagId);
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    // Build ORDER BY clause
    let orderBy = 'ORDER BY d.is_pinned DESC, d.created_at DESC';
    if (sortBy === 'popular') {
      orderBy = 'ORDER BY d.is_pinned DESC, d.like_count DESC, d.created_at DESC';
    } else if (sortBy === 'replies') {
      orderBy = 'ORDER BY d.is_pinned DESC, d.reply_count DESC, d.created_at DESC';
    }

    // Main query
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
      ${whereClause}
      GROUP BY d.id
      ${orderBy}
      LIMIT ? OFFSET ?
    `;

    queryParams.push(limit, offset);

    const [discussions] = await db.execute(query, queryParams);

    // Get total count for pagination
    const countQuery = `
      SELECT COUNT(DISTINCT d.id) as total
      FROM discussions d
      LEFT JOIN discussion_tag_map dtm ON d.id = dtm.discussion_id
      ${whereClause}
    `;

    const [countResult] = await db.execute(countQuery, queryParams.slice(0, -2));
    const total = (countResult as any)[0]?.total || 0;

    // Format discussions
    const formattedDiscussions = (discussions as any[]).map(discussion => ({
      id: discussion.id,
      title: discussion.title,
      content: discussion.content,
      author: {
        name: discussion.user_name,
        avatar: discussion.avatar || '👤',
        school: discussion.school || 'Unknown',
        grade: discussion.grade || 'Unknown'
      },
      category: 'general', // For now, all discussions are general
      tags: discussion.tags ? discussion.tags.split(',') : [],
      tagColors: discussion.tag_colors ? discussion.tag_colors.split(',') : [],
      replies: discussion.reply_count || 0,
      likes: discussion.like_count || 0,
      views: discussion.view_count || 0,
      isLiked: false, // Will be determined by user session
      isPinned: Boolean(discussion.is_pinned),
      createdAt: new Date(discussion.created_at).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      lastReply: new Date(discussion.updated_at).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short'
      })
    }));

    return NextResponse.json({
      success: true,
      data: {
        discussions: formattedDiscussions,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Error fetching discussions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch discussions' },
      { status: 500 }
    );
  }
}
