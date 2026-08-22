import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/token.js";

import authRouter from "./routes/authroute.js";
import productRouter from "./routes/productroute.js";
import cartRouter from "./routes/cartroute.js";
import orderRouter from "./routes/orderroute.js";

import path from "path";
import { fileURLToPath } from "url";

// =====================================================
// PATH SETUP
// =====================================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// =====================================================
// DATABASE
// =====================================================

connectDB();

// =====================================================
// MIDDLEWARE
// =====================================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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
    ],
    credentials: true,
  })
);

// =====================================================
// API ROUTES
// =====================================================

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// =====================================================
// FRONTEND PATH
// =====================================================

const frontendPath = path.join(
  __dirname,
  "../.frontend/dist"
);

console.log("Frontend path:", frontendPath);

// =====================================================
// SERVE FRONTEND STATIC FILES
// =====================================================

app.use(
  express.static(frontendPath)
);

// =====================================================
// REACT ROUTER FALLBACK
// IMPORTANT FOR REFRESHING:
// /profile
// /profile/collection
// /profile/orders
// /profile/cart
// /login
// /signup
// etc.
// =====================================================

app.use((req, res, next) => {
  // Never send index.html for API requests
  if (
    req.method !== "GET" ||
    req.path.startsWith("/api/")
  ) {
    return next();
  }

  return res.sendFile(
    path.join(frontendPath, "index.html"),
    (err) => {
      if (err) {
        console.error(
          "❌ Error serving index.html:",
          err
        );

        return res.status(500).send(
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT}`
  );
});
