import express from "express";
import { pool } from "./database";
import authRoutes from "./routes/authRoutes";
import articleRoutes from "./routes/articleRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/articles", articleRoutes);

interface User {
  id: number;
  email: string;
  password_hash: string;
  created_at: Date;
}

interface Articles {
  id: number;
  title: string;
  body: string;
  category: string;
  submitted_by: number; // This should reference the user ID of the submitter
  created_at: Date;
}

app.get("/user", async (req, res) => {
  try {
    // This is the same SQL query you used in Lesson 1
    const [rows] = await pool.execute("SELECT * FROM users");
    const users = rows as User[]; // Type the result for clarity

    // Return the users array to the frontend
    res.json(users);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({
      error: "Failed to fetch users",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
