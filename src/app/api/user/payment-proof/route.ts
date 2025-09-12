import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { query } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    // Get auth token from Authorization header
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, error: "No valid authorization token provided" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token);

    if (!payload) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    console.log("Payment proof - User payload:", payload); // Debug log
    const userId = payload.userId;
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

    // Check if tryout is paid or free to determine status
    const tryoutQuery = `SELECT type_tryout FROM tryouts WHERE id = ?`;
    const tryoutResult = await query(tryoutQuery, [parseInt(tryoutId)]);
    const tryoutRows = Array.isArray(tryoutResult) ? tryoutResult : [];
    const tryoutData = tryoutRows.length > 0 ? (tryoutRows[0] as any) : null;

    // Check if user already has a registration for this tryout
    const existingRegistrationQuery = `SELECT id, status FROM user_tryout_registrations WHERE user_id = ? AND tryout_id = ?`;
    const existingRegistration = await query(existingRegistrationQuery, [
      userId,
      parseInt(tryoutId),
    ]);
    const existingRows = Array.isArray(existingRegistration)
      ? existingRegistration
      : [];

    if (existingRows.length > 0) {
      // Update existing registration with payment proof instead of creating new one
      const registrationId = (existingRows[0] as any).id;

      const updateQuery = `
        UPDATE user_tryout_registrations 
        SET payment_reference = ?, notes = ?, status = ?, updated_at = NOW()
        WHERE id = ?
      `;

      const registrationStatus =
        tryoutData?.type_tryout === "free"
          ? "registered"
          : "waiting_confirmation";
      const proofUrl = `/uploads/payment-proofs/${fileName}`;
      const notes = `Payment proof uploaded: ${fileName}${
        accountId ? `, Account ID: ${accountId}` : ""
      }`;

      await query(updateQuery, [
        proofUrl,
        notes,
        registrationStatus,
        registrationId,
      ]);

      return NextResponse.json({
        success: true,
        message: "Payment proof uploaded and registration updated successfully",
        data: {
          proofUrl,
          fileName,
        },
      });
    }

    // Determine status based on tryout type (for new registrations)
    const registrationStatus =
      tryoutData?.type_tryout === "free"
        ? "registered"
        : "waiting_confirmation";

    // Save to database
    const insertQuery = `
      INSERT INTO user_tryout_registrations 
      (user_id, tryout_id, registration_date, status, payment_status, payment_method_id, payment_reference, payment_date, notes, created_at, updated_at)
      VALUES (?, ?, NOW(), ?, 'pending', ?, ?, NOW(), ?, NOW(), NOW())
    `;

    const proofUrl = `/uploads/payment-proofs/${fileName}`;
    const notes = `Payment proof uploaded: ${fileName}${
      accountId ? `, Account ID: ${accountId}` : ""
    }`;

    console.log(
      "Inserting registration with userId:",
      userId,
      "tryoutId:",
      parseInt(tryoutId)
    ); // Debug log

    await query(insertQuery, [
      userId,
      parseInt(tryoutId),
      registrationStatus,
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
