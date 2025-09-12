import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { payment_method_id, name, account, account_name, is_active } = body;

    // Validasi input
    if (!payment_method_id || !name || !account || !account_name) {
      return NextResponse.json(
        { message: "Semua field harus diisi" },
        { status: 400 }
      );
    }

    // Insert new payment account
    const result = await query(
      `INSERT INTO payment_accounts 
       (payment_method_id, name, account, account_name, is_active, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
      [payment_method_id, name, account, account_name, is_active ? 1 : 0]
    );

    // Get the inserted account with proper type casting
    const insertId = (result as any).insertId;
    const newAccount = await query(
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
      [insertId]
    );

    const account_data = (newAccount as any[])[0];

    // Convert is_active to boolean
    account_data.is_active = Boolean(account_data.is_active);

    return NextResponse.json(account_data, { status: 201 });
  } catch (error) {
    console.error("Error creating payment account:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat membuat akun pembayaran" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const accounts = await query(
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
       ORDER BY created_at DESC`
    );

    // Convert is_active to boolean for all accounts
    const accountsData = (accounts as any[]).map((account) => ({
      ...account,
      is_active: Boolean(account.is_active),
    }));

    return NextResponse.json(accountsData);
  } catch (error) {
    console.error("Error fetching payment accounts:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat mengambil data akun pembayaran" },
      { status: 500 }
    );
  }
}
