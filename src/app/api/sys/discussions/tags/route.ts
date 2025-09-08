import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('activeOnly') === 'true';

    let sqlQuery = `
      SELECT 
        dt.id,
        dt.name,
        dt.description,
        dt.color,
        dt.is_active,
        dt.created_at,
        u.name as created_by_name
      FROM discussion_tags dt
      LEFT JOIN users u ON dt.created_by = u.id
    `;

    const params: any[] = [];

    if (activeOnly) {
      sqlQuery += ` WHERE dt.is_active = 1`;
    }

    sqlQuery += ` ORDER BY dt.name ASC`;

    const tags = await query(sqlQuery, params);

    return NextResponse.json({
      success: true,
      tags: tags
    });

  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, color } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Tag name is required' },
        { status: 400 }
      );
    }

    // Check if tag name already exists
    const existingTag = await query(
      'SELECT id FROM discussion_tags WHERE name = ?',
      [name]
    );

    if (existingTag.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Tag name already exists' },
        { status: 400 }
      );
    }

    // Create new tag (assuming admin user_id = 1)
    const result = await query(
      `INSERT INTO discussion_tags (name, description, color, is_active, created_by) 
       VALUES (?, ?, ?, 1, 1)`,
      [name, description || '', color || '#3B82F6']
    );

    return NextResponse.json({
      success: true,
      message: 'Tag created successfully',
      tagId: result.insertId
    });

  } catch (error) {
    console.error('Error creating tag:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
