import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import jwt from 'jsonwebtoken';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: discussionId } = await params;

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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: discussionId } = await params;

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

    // Check if discussion exists and belongs to user
    const checkQuery = `
      SELECT id, user_id FROM discussions 
      WHERE id = ? AND user_id = ? AND is_deleted = 0
    `;
    
    const [checkResult] = await db.execute(checkQuery, [discussionId, userId]);
    
    if (!checkResult || (checkResult as any[]).length === 0) {
      return NextResponse.json(
        { success: false, error: 'Discussion not found or access denied' },
        { status: 404 }
      );
    }

    // Soft delete discussion
    const deleteQuery = `
      UPDATE discussions 
      SET is_deleted = 1, updated_at = NOW() 
      WHERE id = ? AND user_id = ?
    `;
    
    await db.execute(deleteQuery, [discussionId, userId]);

    return NextResponse.json({
      success: true,
      message: 'Discussion deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting discussion:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete discussion' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: discussionId } = await params;
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

    // Check if discussion exists and belongs to user
    const checkQuery = `
      SELECT id, user_id FROM discussions 
      WHERE id = ? AND user_id = ? AND is_deleted = 0
    `;
    
    const [checkResult] = await db.execute(checkQuery, [discussionId, userId]);
    
    if (!checkResult || (checkResult as any[]).length === 0) {
      return NextResponse.json(
        { success: false, error: 'Discussion not found or access denied' },
        { status: 404 }
      );
    }

    // Update discussion
    const updateQuery = `
      UPDATE discussions 
      SET title = ?, content = ?, updated_at = NOW() 
      WHERE id = ? AND user_id = ?
    `;
    
    await db.execute(updateQuery, [title.trim(), content.trim(), discussionId, userId]);

    // Update tags
    // First, remove existing tags
    await db.execute(
      'DELETE FROM discussion_tag_map WHERE discussion_id = ?',
      [discussionId]
    );

    // Then, add new tags
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
      message: 'Discussion updated successfully'
    });

  } catch (error) {
    console.error('Error updating discussion:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update discussion' },
      { status: 500 }
    );
  }
}
