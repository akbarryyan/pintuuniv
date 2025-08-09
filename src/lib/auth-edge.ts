import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-fallback-secret-key-change-this-in-production"
);

export async function verifyTokenEdge(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as {
      userId: number;
      email: string;
      subscriptionType: string;
    };
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}

export async function generateTokenEdge(payload: {
  userId: number;
  email: string;
  subscriptionType: string;
}) {
  try {
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret);

    return token;
  } catch (error) {
    console.error("JWT generation failed:", error);
    throw error;
  }
}
