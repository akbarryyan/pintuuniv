import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { verifyToken, validateEmail } from "@/lib/auth";

interface UpdateProfileRequest {
  name: string;
  email: string;
  phone?: string;
  school?: string;
  grade?: string;
  avatar?: string;
  targetUniversity?: string;
  targetMajor?: string;
  utbkTarget?: number;
}

export async function PUT(request: NextRequest) {
  try {
    console.log("Profile update API called");

    // Get token from Authorization header or cookie
    const authHeader = request.headers.get("authorization");
    const token =
      authHeader?.replace("Bearer ", "") ||
      request.cookies.get("auth-token")?.value;

    console.log("Token:", token ? "Present" : "Not found");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token tidak ditemukan" },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: "Token tidak valid" },
        { status: 401 }
      );
    }

    const userId = decoded.userId;
    const body: UpdateProfileRequest = await request.json();

    // Validate required fields
    const { name, email } = body;
    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: "Nama dan email wajib diisi" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { success: false, message: "Format email tidak valid" },
        { status: 400 }
      );
    }

    // Check if email is already used by another user
    const [existingUsers] = await db.execute(
      "SELECT id FROM users WHERE email = ? AND id != ?",
      [email, userId]
    );

    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      return NextResponse.json(
        { success: false, message: "Email sudah digunakan pengguna lain" },
        { status: 400 }
      );
    }

    // Prepare update data
    const updateFields = [];
    const updateValues = [];

    // Basic profile fields
    updateFields.push("name = ?", "email = ?");
    updateValues.push(name, email);

    // Optional fields - only update if provided
    if (body.phone !== undefined) {
      updateFields.push("phone = ?");
      updateValues.push(body.phone);
    }

    if (body.school !== undefined) {
      updateFields.push("school = ?");
      updateValues.push(body.school);
    }

    if (body.grade !== undefined) {
      updateFields.push("grade = ?");
      updateValues.push(body.grade);
    }

    if (body.avatar !== undefined) {
      updateFields.push("avatar = ?");
      updateValues.push(body.avatar);
    }

    if (body.targetUniversity !== undefined) {
      updateFields.push("target_university = ?");
      updateValues.push(body.targetUniversity);
    }

    if (body.targetMajor !== undefined) {
      updateFields.push("target_major = ?");
      updateValues.push(body.targetMajor);
    }

    if (body.utbkTarget !== undefined) {
      updateFields.push("utbk_target = ?");
      updateValues.push(body.utbkTarget);
    }

    // Add updated_at timestamp
    updateFields.push("updated_at = CURRENT_TIMESTAMP");

    // Add user ID for WHERE clause
    updateValues.push(userId);

    // Execute update query
    const updateQuery = `UPDATE users SET ${updateFields.join(
      ", "
    )} WHERE id = ?`;
    console.log("Update query:", updateQuery);
    console.log("Update values:", updateValues);

    const [updateResult] = await db.execute(updateQuery, updateValues);
    console.log("Update result:", updateResult);

    // Get updated user data
    const [updatedUser] = await db.execute(
      "SELECT id, email, name, phone, school, grade, avatar, target_university, target_major, utbk_target, subscription_type, created_at FROM users WHERE id = ?",
      [userId]
    );

    if (!Array.isArray(updatedUser) || updatedUser.length === 0) {
      return NextResponse.json(
        { success: false, message: "User tidak ditemukan setelah update" },
        { status: 404 }
      );
    }

    const user = updatedUser[0] as any;

    // Return updated user data
    const responseData = {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      school: user.school,
      grade: user.grade,
      avatar: user.avatar,
      targetUniversity: user.target_university,
      targetMajor: user.target_major,
      utbkTarget: user.utbk_target,
      subscriptionType: user.subscription_type,
      createdAt: user.created_at,
    };

    return NextResponse.json(
      {
        success: true,
        message: "Profile berhasil diperbarui!",
        user: responseData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan server. Silakan coba lagi.",
      },
      { status: 500 }
    );
  }
}
