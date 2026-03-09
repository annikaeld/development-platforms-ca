import { Request, Response, NextFunction } from "express";
import { z } from "zod";

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

const postSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  body: z.string().min(1, { message: "Content is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  submitted_by: z.number({ message: "Submitted_by must be a number" }),
  published: z.boolean().default(false),
});

const userIdSchema = z.object({
  id: z.string().regex(/^\d+$/, { message: "ID must be a positive number" }),
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
      error: "Validation failed",
      details: result.error.issues.map((issue) => issue.message),
    });
  }

  next();
};
