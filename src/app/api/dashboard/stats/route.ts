import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // Get total tryouts registered by user
    const totalTryoutsResult = await query(
      `SELECT COUNT(*) as total 
       FROM user_tryout_registrations 
       WHERE user_id = ? AND status IN ('registered', 'approved')`,
      [userId]
    );
    const totalTryouts = (totalTryoutsResult as any[])[0]?.total || 0;

    // Get average score from user_tryout_sessions
    const averageScoreResult = await query(
      `SELECT AVG(total_score) as average 
       FROM user_tryout_sessions 
       WHERE user_id = ? AND status = 'completed'`,
      [userId]
    );
    const averageScore = Math.round(
      (averageScoreResult as any[])[0]?.average || 0
    );

    // Get discussions created by user
    const discussionsResult = await query(
      `SELECT COUNT(*) as total 
       FROM discussions 
       WHERE user_id = ?`,
      [userId]
    );
    const discussionsCreated = (discussionsResult as any[])[0]?.total || 0;

    // Get user rank (based on average score)
    const rankResult = await query(
      `SELECT COUNT(*) + 1 as rank
       FROM users 
       WHERE average_score > (
         SELECT average_score 
         FROM users 
         WHERE id = ?
       )`,
      [userId]
    );
    const rank = (rankResult as any[])[0]?.rank || 0;

    // Get total students count
    const totalStudentsResult = await query(
      `SELECT COUNT(*) as total 
       FROM users 
       WHERE role = 'user' AND status = 'active'`
    );
    const totalStudents = (totalStudentsResult as any[])[0]?.total || 0;

    // Get study streak (consecutive days with activity)
    // For now, we'll set it to 0 as calculating streak is complex
    const studyStreak = 0;

    const stats = {
      totalTryouts,
      averageScore,
      discussionsCreated,
      studyStreak,
      rank,
      totalStudents,
    };

    return NextResponse.json({ success: true, stats });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat mengambil data statistik" },
      { status: 500 }
    );
  }
}
