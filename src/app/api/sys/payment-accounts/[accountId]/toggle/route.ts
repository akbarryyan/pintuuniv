import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { accountId: string } }
) {
  try {
    const { accountId } = await params;
    const body = await request.json();
    const { is_active } = body;

    if (typeof is_active !== "boolean") {
      return NextResponse.json(
        { error: "is_active must be a boolean" },
        { status: 400 }
      );
    }

    // Update payment account status
    await query(
      `
      UPDATE payment_accounts 
      SET is_active = ?, updated_at = NOW()
      WHERE id = ?
    `,
      [is_active, accountId]
    );

    return NextResponse.json({
      message: `Payment account ${
        is_active ? "activated" : "deactivated"
      } successfully`,
    });
  } catch (error) {
    console.error("Error toggling payment account status:", error);
    return NextResponse.json(
      { error: "Failed to toggle payment account status" },
      { status: 500 }
    );
  }
}
