import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const tagId = params.id;
    const body = await request.json();
    const { name, description, color, is_active } = body;

    // Check if tag exists
    const existingTag = await query(
      'SELECT id FROM discussion_tags WHERE id = ?',
      [tagId]
    );

    if (existingTag.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Tag not found' },
        { status: 404 }
      );
    }

    // Check if name already exists (excluding current tag)
    if (name) {
      const duplicateTag = await query(
        'SELECT id FROM discussion_tags WHERE name = ? AND id != ?',
        [name, tagId]
      );

      if (duplicateTag.length > 0) {
        return NextResponse.json(
          { success: false, error: 'Tag name already exists' },
          { status: 400 }
        );
      }
    }

    // Build update query dynamically
    const updateFields = [];
    const updateValues = [];

    if (name !== undefined) {
      updateFields.push('name = ?');
      updateValues.push(name);
    }

    if (description !== undefined) {
      updateFields.push('description = ?');
      updateValues.push(description);
    }

    if (color !== undefined) {
      updateFields.push('color = ?');
      updateValues.push(color);
    }

    if (is_active !== undefined) {
      updateFields.push('is_active = ?');
      updateValues.push(is_active ? 1 : 0);
    }

    if (updateFields.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No fields to update' },
        { status: 400 }
      );
    }

    updateValues.push(tagId);

    const sqlQuery = `UPDATE discussion_tags SET ${updateFields.join(', ')} WHERE id = ?`;
    await query(sqlQuery, updateValues);

    return NextResponse.json({
      success: true,
      message: 'Tag updated successfully'
    });

  } catch (error) {
    console.error('Error updating tag:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const tagId = params.id;

    // Check if tag exists
    const existingTag = await query(
      'SELECT id FROM discussion_tags WHERE id = ?',
      [tagId]
    );

    if (existingTag.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Tag not found' },
        { status: 404 }
      );
    }

    // Check if tag is being used in discussions
    const tagUsage = await query(
      'SELECT COUNT(*) as count FROM discussion_tag_map WHERE tag_id = ?',
      [tagId]
    );

    if (tagUsage[0].count > 0) {
      // Soft delete - just deactivate the tag
      await query(
        'UPDATE discussion_tags SET is_active = 0 WHERE id = ?',
        [tagId]
      );

      return NextResponse.json({
        success: true,
        message: 'Tag deactivated successfully (still in use)'
      });
    } else {
      // Hard delete - remove the tag completely
      await query(
        'DELETE FROM discussion_tags WHERE id = ?',
        [tagId]
      );

      return NextResponse.json({
        success: true,
        message: 'Tag deleted successfully'
      });
    }

  } catch (error) {
    console.error('Error deleting tag:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
