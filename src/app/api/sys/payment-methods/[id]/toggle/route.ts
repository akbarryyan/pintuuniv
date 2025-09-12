import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { is_active } = body;

    if (typeof is_active !== "boolean") {
      return NextResponse.json(
        { error: "is_active must be a boolean" },
        { status: 400 }
      );
    }

    // Update payment method status
    await query(
      `
      UPDATE payment_methods 
      SET is_active = ?, updated_at = NOW()
      WHERE id = ?
    `,
      [is_active, id]
    );

    return NextResponse.json({
      message: `Payment method ${
        is_active ? "activated" : "deactivated"
      } successfully`,
    });
  } catch (error) {
    console.error("Error toggling payment method status:", error);
    return NextResponse.json(
      { error: "Failed to toggle payment method status" },
      { status: 500 }
    );
  }
}
