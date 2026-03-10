import { Router } from "express";
import { pool } from "../database.js";
import { Article } from "../types/index.js";
import {
  authenticateToken,
  validateArticle,
} from "../middleware/authMiddleware.js";
import { ResultSetHeader } from "mysql2";

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

// GET /articles (public)
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

/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Create a new article (requires authentication)
 *     tags:
 *       - Articles
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - body
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 example: Ken's First Article
 *               body:
 *                 type: string
 *                 example: This is a great article about fashion
 *               category:
 *                 type: string
 *                 example: Fashion
 *     responses:
 *       201:
 *         description: Article created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Article created successfully
 *                 article:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 3
 *                     title:
 *                       type: string
 *                       example: Ken's First Article
 *                     body:
 *                       type: string
 *                       example: This is a great article about fashion
 *                     category:
 *                       type: string
 *                       example: Fashion
 *                     submitted_by:
 *                       type: integer
 *                       example: 7
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: 2026-03-10T14:06:48.000Z
 *       400:
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Title is required
 *       401:
 *         description: Access token required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Access token required
 *       403:
 *         description: Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid or expired token
 *       500:
 *         description: Failed to create article
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to create article
 */

// POST /articles (protected)
router.post("/", authenticateToken, validateArticle, async (req, res) => {
  try {
    const { title, body, category } = req.body;
    const userId = (req as any).user.userId;

    const [result] = await pool.execute<ResultSetHeader>(
      "INSERT INTO articles (title, body, category, submitted_by) VALUES (?, ?, ?, ?)",
      [title, body, category, userId],
    );

    const newArticle: Article = {
      id: result.insertId,
      title,
      body,
      category,
      submitted_by: userId,
      created_at: new Date(),
    };

    res.status(201).json({
      message: "Article created successfully",
      article: newArticle,
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to create article" });
  }
});

/**
 * @swagger
 * /articles/{id}:
 *   delete:
 *     summary: Delete an article (author only)
 *     tags:
 *       - Articles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Article ID
 *     responses:
 *       200:
 *         description: Article deleted successfully
 *       401:
 *         description: Access token required
 *       403:
 *         description: You can only delete your own articles
 *       404:
 *         description: Article not found
 *       500:
 *         description: Failed to delete article
 */

// DELETE /articles/:id (protected, author only)
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const articleId = parseInt(req.params.id as string, 10);
    const userId = (req as any).user.userId;

    // Check if article exists and get the author
    const [rows] = await pool.execute(
      "SELECT submitted_by FROM articles WHERE id = ?",
      [articleId],
    );
    const articles = rows as Article[];

    if (articles.length === 0) {
      return res.status(404).json({ error: "Article not found" });
    }

    // Check if the current user is the author
    if (articles[0].submitted_by !== userId) {
      return res
        .status(403)
        .json({ error: "You can only delete your own articles" });
    }

    // Delete the article
    await pool.execute("DELETE FROM articles WHERE id = ?", [articleId]);

    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to delete article" });
  }
});

export default router;
