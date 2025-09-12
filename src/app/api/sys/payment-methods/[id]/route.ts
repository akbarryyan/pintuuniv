import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { writeFile, mkdir, unlink } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { ResultSetHeader } from "mysql2";

// PUT - Update payment method
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
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

    // Get current payment method to check for existing files
    const currentMethod = (await query(
      `
      SELECT qr_code, logo FROM payment_methods WHERE id = ?
    `,
      [id]
    )) as any[];

    if (!currentMethod.length) {
      return NextResponse.json(
        { error: "Payment method not found" },
        { status: 404 }
      );
    }

    let qr_code_path = currentMethod[0].qr_code;
    let logo_path = currentMethod[0].logo;

    // Handle QR code upload
    if (qr_code_file && qr_code_file.size > 0) {
      // Delete old QR code file if exists
      if (
        qr_code_path &&
        existsSync(join(process.cwd(), "public", qr_code_path))
      ) {
        await unlink(join(process.cwd(), "public", qr_code_path));
      }

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
      // Delete old logo file if exists
      if (logo_path && existsSync(join(process.cwd(), "public", logo_path))) {
        await unlink(join(process.cwd(), "public", logo_path));
      }

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

    // Update payment method
    await query(
      `
      UPDATE payment_methods 
      SET name = ?, type = ?, icon = ?, color = ?, qr_code = ?, logo = ?, is_active = ?, is_popular = ?, updated_at = NOW()
      WHERE id = ?
    `,
      [
        name,
        type,
        icon,
        color,
        qr_code_path,
        logo_path,
        is_active,
        is_popular,
        id,
      ]
    );

    // Update or create account if type is not qris and account details are provided
    if (type !== "qris" && account_name && account_number) {
      // Check if account exists
      const existingAccount = (await query(
        `
        SELECT id FROM payment_accounts WHERE payment_method_id = ?
      `,
        [id]
      )) as any[];

      if (existingAccount.length > 0) {
        // Update existing account
        await query(
          `
          UPDATE payment_accounts 
          SET name = ?, account = ?, account_name = ?, updated_at = NOW()
          WHERE payment_method_id = ?
        `,
          [name, account_number, account_name, id]
        );
      } else {
        // Create new account
        await query(
          `
          INSERT INTO payment_accounts (payment_method_id, name, account, account_name, is_active, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, NOW(), NOW())
        `,
          [id, name, account_number, account_name, true]
        );
      }
    } else if (type === "qris") {
      // Remove accounts if type is changed to qris
      await query(
        `
        DELETE FROM payment_accounts WHERE payment_method_id = ?
      `,
        [id]
      );
    }

    // Fetch the updated payment method with accounts
    const updatedMethod = (await query(
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
      [id]
    )) as any[];

    const updatedAccounts = (await query(
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
      [id]
    )) as any[];

    const result = {
      ...updatedMethod[0],
      accounts: updatedAccounts,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating payment method:", error);
    return NextResponse.json(
      { error: "Failed to update payment method" },
      { status: 500 }
    );
  }
}

// DELETE - Delete payment method
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Get payment method to check for files to delete
    const paymentMethod = (await query(
      `
      SELECT qr_code, logo FROM payment_methods WHERE id = ?
    `,
      [id]
    )) as any[];

    if (!paymentMethod.length) {
      return NextResponse.json(
        { error: "Payment method not found" },
        { status: 404 }
      );
    }

    // Delete associated accounts first
    await query(
      `
      DELETE FROM payment_accounts WHERE payment_method_id = ?
    `,
      [id]
    );

    // Delete payment method
    await query(
      `
      DELETE FROM payment_methods WHERE id = ?
    `,
      [id]
    );

    // Delete files
    const method = paymentMethod[0];
    if (
      method.qr_code &&
      existsSync(join(process.cwd(), "public", method.qr_code))
    ) {
      await unlink(join(process.cwd(), "public", method.qr_code));
    }
    if (method.logo && existsSync(join(process.cwd(), "public", method.logo))) {
      await unlink(join(process.cwd(), "public", method.logo));
    }

    return NextResponse.json({
      message: "Payment method deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting payment method:", error);
    return NextResponse.json(
      { error: "Failed to delete payment method" },
      { status: 500 }
    );
  }
}
