import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authroute from "./routes/authroute.js";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import productRouter from "./routes/productroute.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderroute.js";

const app = express();

// --------------------------------------------------
// PATH SETUP
// --------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Your frontend folder is:
// AUREVIA/.frontend
const frontendPath = path.join(__dirname, "../.frontend/dist");

// --------------------------------------------------
// MIDDLEWARE
// --------------------------------------------------

app.use(cookieParser());

app.use(
  cors({
    origin: [
      "https://aurevia-3.onrender.com",
      "http://localhost:5173",
      "http://localhost:5174"
    ],
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --------------------------------------------------
// API ROUTES
// --------------------------------------------------

app.use("/api/auth", authroute);
app.use("/api/user", userRoute);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// --------------------------------------------------
// SERVE REACT FRONTEND
// --------------------------------------------------

app.use(express.static(frontendPath));

// React SPA fallback
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api/")) {
    return res.sendFile(path.join(frontendPath, "index.html"));
  }

  next();
});

// --------------------------------------------------
// SERVER
// --------------------------------------------------

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
