import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { accountId: string } }
) {
  try {
    const accountId = params.accountId;

    // Check if account exists
    const account = (await query(
      `
      SELECT id FROM payment_accounts WHERE id = ?
    `,
      [accountId]
    )) as any[];

    if (!account.length) {
      return NextResponse.json(
        { error: "Payment account not found" },
        { status: 404 }
      );
    }

    // Delete payment account
    await query(
      `
      DELETE FROM payment_accounts WHERE id = ?
    `,
      [accountId]
    );

    return NextResponse.json({
      message: "Payment account deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting payment account:", error);
    return NextResponse.json(
      { error: "Failed to delete payment account" },
      { status: 500 }
    );
  }
}
