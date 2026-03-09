import { Router } from "express";
import { pool } from "../database";
import { Article } from "../types/index.js";

const router = Router();

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Get all articles
 *     tags:
 *       - Articles
 *     responses:
 *       200:
 *         description: List of articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 3
 *                   title:
 *                     type: string
 *                     example: Test Article
 *                   body:
 *                     type: string
 *                     example: This is a test body
 *                   category:
 *                     type: string
 *                     example: Technology
 *                   submitted_by:
 *                     type: integer
 *                     example: 1
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     example: 2026-03-09T14:06:48.000Z
 *       500:
 *         description: Failed to fetch articles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to fetch articles
 */

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM articles");
    const articles = rows as Article[];

    // Return the articles array to the frontend
    res.json(articles);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({
      error: "Failed to fetch articles",
    });
  }
});

export default router;
