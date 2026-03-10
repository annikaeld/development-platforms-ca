import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { verifyToken } from "../utils/jwt.js";

const requiredUserDataSchema = z.object({
  email: z
    .string()
    .email({ message: "Email must be a valid email" })
    .transform((val) => val.trim().toLowerCase()),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(50, { message: "Password must not exceed 50 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])/, {
      message:
        "Password must contain at least one uppercase letter and one lowercase letter",
    }),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Email must be a valid email" })
    .transform((val) => val.trim().toLowerCase()),
  password: z.string(),
});

const articleSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }),
  body: z.string().trim().min(1, { message: "Body is required" }),
  category: z.string().trim().min(1, { message: "Category is required" }),
});

// Registration validation middleware
export const validateRegistration = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = requiredUserDataSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: result.error.issues[0].message,
    });
  }
  req.body = result.data;
  next();
};

// Login validation middleware
export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: result.error.issues[0].message,
    });
  }
  req.body = result.data;

  next();
};

// Authentication middleware
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }

  (req as any).user = { userId: decoded.userId };
  next();
};

// Article validation middleware
export const validateArticle = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = articleSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: result.error.issues[0].message,
    });
  }

  req.body = result.data;
  next();
};
