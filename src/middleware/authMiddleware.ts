import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const requiredUserDataSchema = z.object({
  email: z.string().email({ message: "Email must be a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(50, { message: "Password must not exceed 50 characters" }),
});

const userIdSchema = z.object({
  id: z.string().regex(/^\d+$/, { message: "ID must be a positive number" }),
});

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
