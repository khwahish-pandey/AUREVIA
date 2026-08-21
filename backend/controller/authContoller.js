import validator from "validator";
import User from "../model/usermodel.js";
import bcrypt from "bcryptjs";
import { generateToken, generateToken1 } from "../config/token.js";

// Shared cookie configuration for localhost dev environment
const isProduction = process.env.NODE_ENV === "production";

const isProduction = process.env.NODE_ENV === "production";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

res.cookie("token", token, COOKIE_OPTIONS);
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const hashhpass = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashhpass,
    });

    const token = await generateToken(user._id);

    res.cookie("token", token, COOKIE_OPTIONS);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.log("Error in registering user", error);
    res.status(500).json({ message: `Internal server error: ${error.message}` });
  }
};

export const loginuser = async (req, res) => {
  try {
    let { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = await generateToken(user);

    res.cookie("token", token, COOKIE_OPTIONS);
    res.status(200).json({ message: "User logged in successfully", user });
  } catch (error) {
    console.log("Error in logging in user", error);
    res.status(500).json({ message: `Internal server error: ${error.message}` });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log("Error in logging out user", error);
    res.status(500).json({ message: `Internal server error: ${error.message}` });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { name, email } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        password: "",
      });
    }

    const token = await generateToken(user._id);

    res.cookie("token", token, COOKIE_OPTIONS);
    return res.status(200).json({ message: "User authenticated successfully", user });
  } catch (error) {
    console.log("Error in Google authentication", error);
    res.status(500).json({ message: `Internal server error: ${error.message}` });
  }
};

export const adminlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = await generateToken1(email);

      // 1. Set cookie with sameSite: "lax" so Vite on port 5173/5174 receives and sends it
      res.cookie("token", token, COOKIE_OPTIONS);

      // 2. Return admin details in response payload so AdminContext updates instantly
      const adminPayload = {
        name: "Administrator",
        email: process.env.ADMIN_EMAIL,
        role: "admin",
      };

      return res.status(200).json({
        success: true,
        message: "Admin logged in successfully",
        admin: adminPayload,
      });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log("Error in admin login", error);
    res.status(500).json({ message: `Internal server error: ${error.message}` });
  }
};
