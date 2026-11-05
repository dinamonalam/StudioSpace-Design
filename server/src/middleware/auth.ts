import { Request, Response, NextFunction } from "express";
import { verifyToken, TokenPayload } from "../utils/jwt.js";

// Extend Express Request type to include authenticated user
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  // Read token from HTTPOnly cookie or fallback to Authorization header
  const tokenFromCookie = req.cookies?.studiospace_token || req.cookies?.token;
  const authHeader = req.headers.authorization;
  const tokenFromHeader = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : undefined;

  const token = tokenFromCookie || tokenFromHeader;

  if (!token) {
    res.status(401).json({
      success: false,
      error: "Authentication required. Please log in to proceed.",
    });
    return;
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    res.status(401).json({
      success: false,
      error: "Session expired or invalid token. Please log in again.",
    });
    return;
  }

  // Attach verified user payload directly from session
  req.user = decoded;
  next();
}

export function optionalAuth(req: Request, _res: Response, next: NextFunction): void {
  const token = req.cookies?.studiospace_token || req.cookies?.token || (req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization.split(" ")[1] : undefined);
  if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
    }
  }
  next();
}

