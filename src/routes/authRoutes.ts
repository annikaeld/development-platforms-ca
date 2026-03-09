import { Router } from "express";
import { pool } from "../database.js";
import { ResultSetHeader } from "mysql2";
import { User, UserResponse } from "../types/index.js";
import bcrypt from "bcrypt";
import { validateRegistration } from "../middleware/authMiddleware.js";

const router = Router();

// ...existing code...
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: newuser1@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: secret123
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 3
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: newuser1@example.com
 *       400:
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Email and password are required
 *       409:
 *         description: User with this email already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User with this email already exists
 *       500:
 *         description: Failed to create user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to create user
 */

// Create a new user
router.post("/register", validateRegistration, async (req, res) => {
  try {
    const { email, password } = req.body ?? {};

    // Check if user already exists
    const [rows] = await pool.execute("SELECT id FROM users WHERE email = ?", [
      email,
    ]);
    const existingUsers = rows as User[];

    if (existingUsers.length > 0) {
      return res.status(409).json({
        error: "User with this email already exists",
      });
    }

    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the new user into the database
    const [result]: [ResultSetHeader, any] = await pool.execute(
      "INSERT INTO users (email, password_hash) VALUES (?, ?)",
      [email, hashedPassword],
    );

    const user: UserResponse = {
      id: result.insertId,
      email,
    };

    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({
      error: "Failed to create user",
    });
  }
});

export default router;
