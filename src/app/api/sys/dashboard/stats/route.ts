import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    // Get total users
    const totalUsersResult = await query(
      `SELECT COUNT(*) as total 
       FROM users 
       WHERE role = 'user'`
    );
    const totalUsers = (totalUsersResult as any[])[0]?.total || 0;

    // Get total tryouts
    const totalTryoutsResult = await query(
      `SELECT COUNT(*) as total 
       FROM tryouts`
    );
    const totalTryouts = (totalTryoutsResult as any[])[0]?.total || 0;

    // Get active users (users with activity in last 30 days)
    const activeUsersResult = await query(
      `SELECT COUNT(DISTINCT user_id) as total 
       FROM user_sessions 
       WHERE last_activity > DATE_SUB(NOW(), INTERVAL 30 DAY)`
    );
    const activeUsers = (activeUsersResult as any[])[0]?.total || 0;

    // Get completed tryouts
    const completedTryoutsResult = await query(
      `SELECT COUNT(*) as total 
       FROM user_tryout_sessions 
       WHERE status = 'completed'`
    );
    const completedTryouts = (completedTryoutsResult as any[])[0]?.total || 0;

    // Get pending approvals (registered but not approved tryouts)
    const pendingApprovalsResult = await query(
      `SELECT COUNT(*) as total 
       FROM user_tryout_registrations 
       WHERE status = 'registered'`
    );
    const pendingApprovals = (pendingApprovalsResult as any[])[0]?.total || 0;

    // Calculate total revenue (assume we have payment data)
    // For now, we'll calculate based on completed tryouts with price
    const totalRevenueResult = await query(
      `SELECT SUM(t.price) as total 
       FROM user_tryout_registrations utr
       JOIN tryouts t ON utr.tryout_id = t.id
       WHERE utr.payment_status = 'paid'`
    );
    const totalRevenue = (totalRevenueResult as any[])[0]?.total || 0;

    const stats = {
      totalUsers,
      totalTryouts,
      totalRevenue,
      activeUsers,
      completedTryouts,
      pendingApprovals,
    };

    return NextResponse.json({ success: true, stats });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat mengambil data statistik admin" },
      { status: 500 }
    );
  }
}
