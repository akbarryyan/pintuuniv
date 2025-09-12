import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    // Check if account exists
    const existingAccount = await query(
      "SELECT id FROM payment_accounts WHERE id = ?",
      [id]
    );

    if ((existingAccount as any[]).length === 0) {
      return NextResponse.json(
        { message: "Akun pembayaran tidak ditemukan" },
        { status: 404 }
      );
    }

    // Delete the account
    await query("DELETE FROM payment_accounts WHERE id = ?", [id]);

    return NextResponse.json(
      { message: "Akun pembayaran berhasil dihapus" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting payment account:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat menghapus akun pembayaran" },
      { status: 500 }
    );
  }
}
