import express from "express";
import mongoose from "mongoose";
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Connected to database successfully");
    } catch (error) {
        console.log("Error in connecting to database",error);
    }
};
export default connectDB;