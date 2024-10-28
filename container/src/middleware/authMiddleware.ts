import * as jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
export function VerifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token is required" });
  const decodedToken = verify(token);
  if (!decodedToken) return res.status(403).json({ error: "Invalid token" });
  next();
}

function verify(token: string): any {
  try {
    const secret = process.env.JWT_SECRET!;
    return jwt.verify(token, secret!);
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
}
