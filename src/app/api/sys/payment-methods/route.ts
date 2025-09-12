import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { ResultSetHeader } from "mysql2";

// GET - Fetch all payment methods with their accounts
export async function GET() {
  try {
    // Fetch payment methods
    const paymentMethods = (await query(`
      SELECT 
        pm.id,
        pm.name,
        pm.type,
        pm.icon,
        pm.color,
        pm.qr_code,
        pm.logo,
        pm.is_active,
        pm.is_popular,
        pm.created_at,
        pm.updated_at
      FROM payment_methods pm
      ORDER BY pm.created_at DESC
    `)) as any[];

    // Fetch accounts for each payment method
    const accounts = (await query(`
      SELECT 
        pa.id,
        pa.payment_method_id,
        pa.name,
        pa.account,
        pa.account_name,
        pa.is_active,
        pa.created_at,
        pa.updated_at
      FROM payment_accounts pa
      ORDER BY pa.created_at ASC
    `)) as any[];

    // Group accounts by payment method
    const methodsWithAccounts = paymentMethods.map((method: any) => ({
      ...method,
      accounts: accounts.filter(
        (account: any) => account.payment_method_id === method.id
      ),
    }));

    return NextResponse.json(methodsWithAccounts);
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    return NextResponse.json(
      { error: "Failed to fetch payment methods" },
      { status: 500 }
    );
  }
}

// POST - Create new payment method
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const type = formData.get("type") as string;
    const color = formData.get("color") as string;
    const is_popular = formData.get("is_popular") === "true";
    const is_active = formData.get("is_active") === "true";
    const qr_code_file = formData.get("qr_code") as File | null;
    const logo_file = formData.get("logo") as File | null;
    const account_name = formData.get("account_name") as string;
    const account_number = formData.get("account_number") as string;

    if (!name || !type) {
      return NextResponse.json(
        { error: "Name and type are required" },
        { status: 400 }
      );
    }

    let qr_code_path = null;
    let logo_path = null;

    // Handle QR code upload
    if (qr_code_file && qr_code_file.size > 0) {
      const bytes = await qr_code_file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadsDir = join(process.cwd(), "public/uploads/payment-methods");
      if (!existsSync(uploadsDir)) {
        await mkdir(uploadsDir, { recursive: true });
      }

      const filename = `qr_${Date.now()}_${qr_code_file.name}`;
      const filepath = join(uploadsDir, filename);
      await writeFile(filepath, buffer);
      qr_code_path = `/uploads/payment-methods/${filename}`;
    }

    // Handle logo upload
    if (logo_file && logo_file.size > 0) {
      const bytes = await logo_file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadsDir = join(process.cwd(), "public/uploads/payment-methods");
      if (!existsSync(uploadsDir)) {
        await mkdir(uploadsDir, { recursive: true });
      }

      const filename = `logo_${Date.now()}_${logo_file.name}`;
      const filepath = join(uploadsDir, filename);
      await writeFile(filepath, buffer);
      logo_path = `/uploads/payment-methods/${filename}`;
    }

    // Set icon based on type
    let icon = "CreditCard";
    switch (type) {
      case "qris":
        icon = "QrCode";
        break;
      case "e_wallet":
        icon = "Smartphone";
        break;
      case "bank_transfer":
        icon = "Building2";
        break;
    }

    // Insert payment method
    const paymentMethodResult = (await query(
      `
      INSERT INTO payment_methods (name, type, icon, color, qr_code, logo, is_active, is_popular, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `,
      [name, type, icon, color, qr_code_path, logo_path, is_active, is_popular]
    )) as ResultSetHeader;

    const paymentMethodId = paymentMethodResult.insertId;

    // Create account if type is not qris and account details are provided
    let accountId = null;
    if (type !== "qris" && account_name && account_number) {
      const accountResult = (await query(
        `
        INSERT INTO payment_accounts (payment_method_id, name, account, account_name, is_active, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, NOW(), NOW())
      `,
        [paymentMethodId, name, account_number, account_name, true]
      )) as ResultSetHeader;

      accountId = accountResult.insertId;
    }

    // Fetch the created payment method with accounts
    const createdMethod = (await query(
      `
      SELECT 
        pm.id,
        pm.name,
        pm.type,
        pm.icon,
        pm.color,
        pm.qr_code,
        pm.logo,
        pm.is_active,
        pm.is_popular,
        pm.created_at,
        pm.updated_at
      FROM payment_methods pm
      WHERE pm.id = ?
    `,
      [paymentMethodId]
    )) as any[];

    const createdAccounts = (await query(
      `
      SELECT 
        pa.id,
        pa.payment_method_id,
        pa.name,
        pa.account,
        pa.account_name,
        pa.is_active,
        pa.created_at,
        pa.updated_at
      FROM payment_accounts pa
      WHERE pa.payment_method_id = ?
    `,
      [paymentMethodId]
    )) as any[];

    const result = {
      ...createdMethod[0],
      accounts: createdAccounts,
    };

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error creating payment method:", error);
    return NextResponse.json(
      { error: "Failed to create payment method" },
      { status: 500 }
    );
  }
}
