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
// FRONTEND PATHS
// =====================================================

const frontendPath = path.join(
  __dirname,
  "../.frontend/dist"
);

const adminPath = path.join(
  __dirname,
  "../admin/dist"
);

console.log("======================================");
console.log("FRONTEND PATH:", frontendPath);
console.log("ADMIN PATH:", adminPath);
console.log("======================================");


// =====================================================
// ADMIN FRONTEND
// URL: /admin
// =====================================================

app.use(
  "/admin",
  express.static(adminPath)
);


// =====================================================
// ADMIN REACT ROUTER FALLBACK
//
// /admin
// /admin/login
// /admin/orders
// /admin/page1
// /admin/page2
// =====================================================

app.use("/admin", (req, res, next) => {
  if (req.method !== "GET") {
    return next();
  }

  return res.sendFile(
    path.join(adminPath, "index.html"),
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
// CUSTOMER FRONTEND
// =====================================================

app.use(
  express.static(frontendPath)
);


// =====================================================
// CUSTOMER REACT ROUTER FALLBACK
// =====================================================

app.use((req, res, next) => {

  // Never send frontend index.html for API requests
  if (
    req.method !== "GET" ||
    req.path.startsWith("/api/")
  ) {
    return next();
  }

  // Don't allow admin requests to reach customer frontend
  if (req.path.startsWith("/admin")) {
    return next();
  }

  return res.sendFile(
    path.join(frontendPath, "index.html"),
    (err) => {
      if (err) {
        console.error(
          "❌ Error serving React index.html:",
          err
        );

        return next(err);
      }
    }
  );
});


// =====================================================
// ROOT
// =====================================================

app.get("/", (req, res) => {
  res.sendFile(
    path.join(frontendPath, "index.html")
  );
});


// =====================================================
// 404
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
  console.log(
    `🚀 Server running on port ${PORT}`
  );
});
