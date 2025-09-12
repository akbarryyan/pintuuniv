import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { is_active } = body;

    if (typeof is_active !== "boolean") {
      return NextResponse.json(
        { message: "is_active harus berupa boolean" },
        { status: 400 }
      );
    }

    // Update account status
    await query(
      `UPDATE payment_accounts 
       SET is_active = ?, updated_at = NOW() 
       WHERE id = ?`,
      [is_active ? 1 : 0, id]
    );

    // Get updated account
    const updatedAccount = await query(
      `SELECT 
        id,
        payment_method_id,
        name,
        account,
        account_name,
        CAST(is_active AS UNSIGNED) as is_active,
        created_at,
        updated_at
       FROM payment_accounts 
       WHERE id = ?`,
      [id]
    );

    if ((updatedAccount as any[]).length === 0) {
      return NextResponse.json(
        { message: "Akun pembayaran tidak ditemukan" },
        { status: 404 }
      );
    }

    const accountData = (updatedAccount as any[])[0];
    accountData.is_active = Boolean(accountData.is_active);

    return NextResponse.json(accountData);
  } catch (error) {
    console.error("Error toggling account status:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat mengubah status akun" },
      { status: 500 }
    );
  }
}
