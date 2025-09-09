import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeStats = searchParams.get('includeStats') === 'true';

    let query = `
      SELECT 
        dt.id,
        dt.name,
        dt.description,
        dt.color,
        dt.is_active,
        dt.created_at
    `;

    if (includeStats) {
      query += `,
        COUNT(DISTINCT dtm.discussion_id) as discussion_count
      `;
    }

    query += `
      FROM discussion_tags dt
    `;

    if (includeStats) {
      query += `
        LEFT JOIN discussion_tag_map dtm ON dt.id = dtm.tag_id
        LEFT JOIN discussions d ON dtm.discussion_id = d.id AND d.is_deleted = 0
      `;
    }

    query += `
      WHERE dt.is_active = 1
    `;

    if (includeStats) {
      query += `
        GROUP BY dt.id
        ORDER BY discussion_count DESC, dt.name ASC
      `;
    } else {
      query += `
        ORDER BY dt.name ASC
      `;
    }

    const [tags] = await db.execute(query);

    // Format tags for frontend
    const formattedTags = (tags as any[]).map(tag => ({
      id: tag.id.toString(),
      name: tag.name,
      description: tag.description,
      color: tag.color,
      postCount: includeStats ? (tag.discussion_count || 0) : 0,
      icon: getTagIcon(tag.name),
      isActive: Boolean(tag.is_active)
    }));

    return NextResponse.json({
      success: true,
      data: {
        tags: formattedTags
      }
    });

  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tags' },
      { status: 500 }
    );
  }
}

// Helper function to assign icons based on tag name
function getTagIcon(tagName: string): string {
  const iconMap: { [key: string]: string } = {
    'matematika': '📐',
    'fisika': '⚡',
    'kimia': '🧪',
    'biologi': '🧬',
    'bahasa indonesia': '📝',
    'bahasa inggris': '🌍',
    'sejarah': '📚',
    'geografi': '🌍',
    'ekonomi': '💰',
    'sosiologi': '👥',
    'umum': '💬',
    'tips': '💡',
    'motivasi': '🔥',
    'pertanyaan': '❓',
    'diskusi': '💭',
    'tryout': '📝',
    'ujian': '📊',
    'pendidikan': '🎓',
    'universitas': '🏛️',
    'karir': '💼'
  };

  const lowerTagName = tagName.toLowerCase();
  
  // Check for exact matches first
  if (iconMap[lowerTagName]) {
    return iconMap[lowerTagName];
  }

  // Check for partial matches
  for (const [key, icon] of Object.entries(iconMap)) {
    if (lowerTagName.includes(key) || key.includes(lowerTagName)) {
      return icon;
    }
  }

  // Default icon
  return '🏷️';
}
