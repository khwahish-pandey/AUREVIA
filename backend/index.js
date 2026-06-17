import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authroute from "./routes/authroute.js";
import cors from "cors";
import userRoute from "./routes/userRoute.js"; 

const app = express();

// 1. CORS MUST come first
app.use(cors({
    origin: "http://localhost:5173", // Ensure this matches your Vite port exactly
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// 2. Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Good practice for form data
app.use(cookieParser());

// 3. Optional: Catch JSON parsing errors to prevent terminal crashes
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error("Bad JSON received. Check your request body for extra spaces/lines.");
    return res.status(400).send({ message: "Invalid JSON format" });
  }
  next();
});

// 4. Routes
app.use("/api/auth", authroute);
app.use("/api/user", userRoute);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});