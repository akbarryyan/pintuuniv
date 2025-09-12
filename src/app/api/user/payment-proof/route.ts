import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { query } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const proof = formData.get("proof") as File;
    const tryoutId = formData.get("tryoutId") as string;
    const paymentMethodId = formData.get("paymentMethodId") as string;
    const accountId = formData.get("accountId") as string;

    if (!proof) {
      return NextResponse.json(
        { success: false, error: "No file uploaded" },
        { status: 400 }
      );
    }

    if (!tryoutId || !paymentMethodId) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!proof.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, error: "File must be an image" },
        { status: 400 }
      );
    }

    // Validate file size (5MB)
    if (proof.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "File size must be less than 5MB" },
        { status: 400 }
      );
    }

    // Create upload directory if it doesn't exist
    const uploadDir = join(
      process.cwd(),
      "public",
      "uploads",
      "payment-proofs"
    );
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      // Directory might already exist
    }

    // Generate unique filename
    const timestamp = Date.now();
    const fileExtension = proof.name.split(".").pop();
    const fileName = `proof_${tryoutId}_${timestamp}.${fileExtension}`;
    const filePath = join(uploadDir, fileName);

    // Save file
    const bytes = await proof.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Save to database
    const insertQuery = `
      INSERT INTO user_tryout_registrations 
      (user_id, tryout_id, registration_date, status, payment_status, payment_method_id, payment_reference, payment_date, notes, created_at, updated_at)
      VALUES (?, ?, NOW(), 'registered', 'pending', ?, ?, NOW(), ?, NOW(), NOW())
    `;

    // Get user ID from auth token (you might need to implement JWT verification here)
    // For now, using a placeholder - you should implement proper auth verification
    const userId = 1; // This should come from JWT token verification

    const proofUrl = `/uploads/payment-proofs/${fileName}`;
    const notes = `Payment proof uploaded: ${fileName}${
      accountId ? `, Account ID: ${accountId}` : ""
    }`;

    await query(insertQuery, [
      userId,
      parseInt(tryoutId),
      parseInt(paymentMethodId),
      proofUrl,
      notes,
    ]);

    return NextResponse.json({
      success: true,
      message: "Payment proof uploaded successfully",
      data: {
        proofUrl,
        fileName,
      },
    });
  } catch (error) {
    console.error("Error uploading payment proof:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to upload payment proof",
      },
      { status: 500 }
    );
  }
}
