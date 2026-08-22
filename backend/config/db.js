import express from "express";


import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL, {
            serverSelectionTimeoutMS: 10000,
        });
        console.log("✅ Connected to database successfully");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
        // Fail fast instead of letting the server run with no DB —
        // silently continuing here is what caused queries (like the
        // Razorpay verify step) to hang and eventually time out.
        process.exit(1);
    }
};

mongoose.connection.on("disconnected", () => {
    console.error("⚠️  MongoDB disconnected");
});

mongoose.connection.on("error", (err) => {
    console.error("⚠️  MongoDB connection error:", err.message);
});

export default connectDB;
