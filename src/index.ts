import express from "express";
import authRoutes from "./routes/authRoutes";
import articleRoutes from "./routes/articleRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();
const PORT = process.env.PORT || 3000;

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Dev platforms API",
      version: "1.0.0",
      description: "A simple API for managing users and posts",
    },
    servers: [{ url: `http://localhost:${PORT}` }],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(express.json());

// API documentation endpoint
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/auth", authRoutes);
app.use("/articles", articleRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
