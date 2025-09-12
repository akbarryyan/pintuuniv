import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { is_popular } = body;

    if (typeof is_popular !== "boolean") {
      return NextResponse.json(
        { error: "is_popular must be a boolean" },
        { status: 400 }
      );
    }

    // Update payment method popular status
    await query(
      `
      UPDATE payment_methods 
      SET is_popular = ?, updated_at = NOW()
      WHERE id = ?
    `,
      [is_popular, id]
    );

    return NextResponse.json({
      message: `Payment method ${
        is_popular ? "marked as popular" : "unmarked as popular"
      } successfully`,
    });
  } catch (error) {
    console.error("Error toggling payment method popular status:", error);
    return NextResponse.json(
      { error: "Failed to toggle payment method popular status" },
      { status: 500 }
    );
  }
}
