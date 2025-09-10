import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import jwt from 'jsonwebtoken';

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

export async function POST(request: NextRequest) {
  try {
    const { title, content, tagIds = [] } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Get token from cookie or authorization header
    const token = request.cookies.get('auth-token')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '');
    
    console.log('POST /api/discussions - Token:', token ? 'Present' : 'Not found');
    
    if (!token) {
      console.log('POST /api/discussions - No token found');
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
      console.log('POST /api/discussions - Token verified, userId:', payload.userId);
    } catch (error) {
      console.error('POST /api/discussions - JWT verification failed:', error);
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      );
    }

    const userId = payload.userId;

    // Insert discussion
    const discussionQuery = `
      INSERT INTO discussions (user_id, title, content, view_count, reply_count, like_count, is_pinned, is_deleted, created_at, updated_at)
      VALUES (?, ?, ?, 0, 0, 0, 0, 0, NOW(), NOW())
    `;

    const [result] = await db.execute(discussionQuery, [userId, title.trim(), content.trim()]);
    const discussionId = (result as any).insertId;

    // Insert tag mappings if tags are provided
    if (tagIds.length > 0) {
      // Validate that all tag IDs exist
      const tagValidationQuery = `
        SELECT id FROM discussion_tags 
        WHERE id IN (${tagIds.map(() => '?').join(',')}) AND is_active = 1
      `;
      
      const [validTags] = await db.execute(tagValidationQuery, tagIds);
      const validTagIds = (validTags as any[]).map(tag => tag.id);
      
      if (validTagIds.length !== tagIds.length) {
        return NextResponse.json(
          { success: false, error: 'One or more tags are invalid' },
          { status: 400 }
        );
      }

      const tagMappingQuery = `
        INSERT INTO discussion_tag_map (discussion_id, tag_id)
        VALUES ${validTagIds.map(() => '(?, ?)').join(', ')}
      `;
      
      const tagMappingParams = validTagIds.flatMap((tagId: string) => [discussionId, tagId]);
      await db.execute(tagMappingQuery, tagMappingParams);
    }

    return NextResponse.json({
      success: true,
      data: {
        id: discussionId,
        message: 'Discussion created successfully'
      }
    });

  } catch (error) {
    console.error('Error creating discussion:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create discussion' },
      { status: 500 }
    );
  }
}
