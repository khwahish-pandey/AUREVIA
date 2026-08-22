import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authroute from "./routes/authroute.js";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import productRouter from "./routes/productroute.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderroute.js";

import path from "path";
import { fileURLToPath } from "url";

const app = express();

// =====================================================
// PATH SETUP
// =====================================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
// BODY PARSERS
// =====================================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// =====================================================
// JSON ERROR HANDLER
// =====================================================

app.use((err, req, res, next) => {
  if (
    err instanceof SyntaxError &&
    err.status === 400 &&
    "body" in err
  ) {
    console.error(
      "Bad JSON received. Check your request body."
    );

    return res.status(400).json({
      success: false,
      message: "Invalid JSON format",
    });
  }

  next(err);
});

// =====================================================
// API ROUTES
// =====================================================

app.use("/api/auth", authroute);
app.use("/api/user", userRoute);
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
// SERVE REACT / VITE STATIC FILES
// =====================================================

app.use(express.static(frontendPath));

// =====================================================
// REACT ROUTER FALLBACK
// =====================================================
// This is what allows direct refreshes of:
// /profile
// /profile/collection
// /profile/orders
// /profile/cart
// /profile/ai
// /login
// /signup
// etc.
// =====================================================

app.use((req, res, next) => {
  if (
    req.method === "GET" &&
    !req.path.startsWith("/api/")
  ) {
    return res.sendFile(
      path.join(frontendPath, "index.html"),
      (err) => {
        if (err) {
          console.error(
            "❌ Error serving React index.html:",
            err
          );

          if (!res.headersSent) {
            res.status(500).send(
              "Frontend application could not be loaded."
            );
          }
        }
      }
    );
  }

  next();
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
// GLOBAL ERROR HANDLER
// =====================================================

app.use((err, req, res, next) => {
  console.error("❌ SERVER ERROR:", err);

  if (res.headersSent) {
    return next(err);
  }

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
  console.log(
    `🚀 Server running on port ${PORT}`
  );

  connectDB();
});
