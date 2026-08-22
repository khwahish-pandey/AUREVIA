import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import authroute from "./routes/authroute.js";
import userRoute from "./routes/userRoute.js";
import productRouter from "./routes/productroute.js";
import cartRouter from "./routes/cartRoutes.js";
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
    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "OPTIONS",
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

// =====================================================
// BODY PARSERS
// =====================================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// =====================================================
// JSON PARSING ERROR HANDLER
// =====================================================

app.use((err, req, res, next) => {
  if (
    err instanceof SyntaxError &&
    err.status === 400 &&
    "body" in err
  ) {
    console.error("❌ Invalid JSON received");

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
// API HEALTH CHECK
// =====================================================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Aurevia backend is running",
  });
});

// =====================================================
// FRONTEND PATHS
// =====================================================
//
// Render build command creates:
//
// backend/
//   dist/
//     index.html
//     assets/
//     admin/
//       index.html
//       assets/
//

const frontendPath = path.join(
  __dirname,
  "dist"
);

const adminPath = path.join(
  __dirname,
  "dist",
  "admin"
);

console.log("======================================");
console.log("FRONTEND PATH:", frontendPath);
console.log("ADMIN PATH:", adminPath);
console.log("======================================");

// =====================================================
// ADMIN STATIC FILES
// URL:
// https://aurevia-2.onrender.com/admin/
// =====================================================

app.use(
  "/admin",
  express.static(adminPath)
);

// =====================================================
// ADMIN REACT ROUTER FALLBACK
//
// Handles:
//
// /admin
// /admin/
// /admin/login
// /admin/orders
// /admin/page1
// /admin/page2
//
// IMPORTANT:
// We use app.use() instead of app.get("*")
// because Express 5 does not accept "*"
// =====================================================

app.use("/admin", (req, res, next) => {
  // Only handle browser GET requests
  if (req.method !== "GET") {
    return next();
  }

  const adminIndexPath = path.join(
    adminPath,
    "index.html"
  );

  console.log(
    "Admin route requested:",
    req.originalUrl
  );

  console.log(
    "Serving admin index:",
    adminIndexPath
  );

  return res.sendFile(
    adminIndexPath,
    (err) => {
      if (err) {
        console.error(
          "❌ Error serving Admin index.html:",
          err
        );

        return next(err);
      }
    }
  );
});

// =====================================================
// CUSTOMER FRONTEND STATIC FILES
// =====================================================

app.use(
  express.static(frontendPath)
);

// =====================================================
// CUSTOMER REACT ROUTER FALLBACK
//
// Handles:
//
// /
// /login
// /signup
// /profile
// /profile/collection
// /profile/orders
// /profile/cart
// etc.
//
// API requests are excluded.
// Admin requests are excluded.
// =====================================================

app.use((req, res, next) => {
  // Never serve React for non-GET requests
  if (req.method !== "GET") {
    return next();
  }

  // Never serve React index.html for APIs
  if (req.path.startsWith("/api/")) {
    return next();
  }

  // Admin has its own React application
  if (req.path.startsWith("/admin")) {
    return next();
  }

  const frontendIndexPath = path.join(
    frontendPath,
    "index.html"
  );

  console.log(
    "Customer route requested:",
    req.originalUrl
  );

  console.log(
    "Serving customer index:",
    frontendIndexPath
  );

  return res.sendFile(
    frontendIndexPath,
    (err) => {
      if (err) {
        console.error(
          "❌ Error serving customer index.html:",
          err
        );

        return next(err);
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
// GLOBAL ERROR HANDLER
// =====================================================

app.use((err, req, res, next) => {
  console.error(
    "❌ SERVER ERROR:",
    err
  );

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
});
