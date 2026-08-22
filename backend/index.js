import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./config/db.js";

import authroute from "./routes/authroute.js";
import userRoute from "./routes/userRoute.js";
import productRouter from "./routes/productroute.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderroute.js";

const app = express();

// =====================================================
// PATH SETUP
// =====================================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Frontend will be copied here during Render build
const frontendPath = path.join(__dirname, "dist");

console.log("======================================");
console.log("FRONTEND PATH:", frontendPath);
console.log("======================================");

// =====================================================
// CORS
// =====================================================

app.use(
  cors({
    origin: [
      "https://aurevia-2.onrender.com",
      "https://aurevia-3.onrender.com",
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// =====================================================
// MIDDLEWARE
// =====================================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// =====================================================
// API ROUTES
// =====================================================

app.use("/api/auth", authroute);

app.use("/api/user", userRoute);

app.use("/api/product", productRouter);

app.use("/api/cart", cartRouter);

app.use("/api/order", orderRouter);

// =====================================================
// SERVE REACT FRONTEND
// =====================================================

app.use(express.static(frontendPath));

// =====================================================
// REACT ROUTER FALLBACK
// =====================================================

app.get("*", (req, res, next) => {
  // Never send React index.html for API routes
  if (req.path.startsWith("/api/")) {
    return next();
  }

  res.sendFile(
    path.join(frontendPath, "index.html"),
    (err) => {
      if (err) {
        console.error(
          "❌ Error serving React index.html:",
          err
        );

        res.status(500).send(
          "Frontend application could not be loaded."
        );
      }
    }
  );
});

// =====================================================
// 404 HANDLER
// =====================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// =====================================================
// ERROR HANDLER
// =====================================================

app.use((err, req, res, next) => {
  console.error("❌ SERVER ERROR:", err);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// =====================================================
// SERVER
// =====================================================

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);

  connectDB();
});
