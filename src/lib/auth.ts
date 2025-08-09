import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

// Password hashing
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

// JWT functions
export interface JWTPayload {
  userId: number;
  email: string;
  subscriptionType: string;
}

export function generateToken(payload: JWTPayload): string {
  const options: SignOptions = { expiresIn: JWT_EXPIRES_IN as string };
  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}

// Generate random tokens for email verification and password reset
export function generateRandomToken(length: number = 32): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Input validation
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): {
  isValid: boolean;
  message: string;
} {
  if (password.length < 8) {
    return { isValid: false, message: "Password harus minimal 8 karakter" };
  }

  if (!/(?=.*[a-z])/.test(password)) {
    return { isValid: false, message: "Password harus mengandung huruf kecil" };
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    return { isValid: false, message: "Password harus mengandung huruf besar" };
  }

  if (!/(?=.*\d)/.test(password)) {
    return { isValid: false, message: "Password harus mengandung angka" };
  }

  return { isValid: true, message: "Password valid" };
}

export function validatePhone(phone: string): boolean {
  // Indonesian phone number validation
  const phoneRegex = /^(\+62|62|0)[2-9][0-9]{7,11}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
}
