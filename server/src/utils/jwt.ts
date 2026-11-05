import jwt from "jsonwebtoken";
import { Response } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "studiospace_jwt_secret_creative_key_2026";
const COOKIE_NAME = "studiospace_token";

export interface TokenPayload {
  id: string;
  email: string;
  name: string;
  role?: string;
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export function setAuthCookie(res: Response, token: string): void {
  const isProduction = process.env.NODE_ENV === "production";
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true, // Prevents XSS script access
    secure: isProduction, // HTTPS in production
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: "/",
  });
}

export function clearAuthCookie(res: Response): void {
  const isProduction = process.env.NODE_ENV === "production";
  res.cookie(COOKIE_NAME, "", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 0,
    path: "/",
  });
}

