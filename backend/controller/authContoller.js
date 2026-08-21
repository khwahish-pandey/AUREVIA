import validator from "validator";
import User from "../model/usermodel.js";
import bcrypt from "bcryptjs";
import { generateToken, generateToken1 } from "../config/token.js";

// ===============================
// COOKIE CONFIGURATION
// ===============================

const isProduction = process.env.NODE_ENV === "production";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

// ===============================
// REGISTER USER
// ===============================

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }

    // Validate password
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    // Hash password
    const hashhpass = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashhpass,
    });

    // Generate JWT
    const token = await generateToken(user._id);

    // Set authentication cookie
    res.cookie("token", token, COOKIE_OPTIONS);

    return res.status(201).json({
      message: "User registered successfully",
      user,
    });

  } catch (error) {
    console.log("Error in registering user:", error);

    return res.status(500).json({
      message: `Internal server error: ${error.message}`,
    });
  }
};

// ===============================
// LOGIN USER
// ===============================

export const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // Generate JWT using user ID
    const token = await generateToken(user._id);

    // Set authentication cookie
    res.cookie("token", token, COOKIE_OPTIONS);

    return res.status(200).json({
      message: "User logged in successfully",
      user,
    });

  } catch (error) {
    console.log("Error in logging in user:", error);

    return res.status(500).json({
      message: `Internal server error: ${error.message}`,
    });
  }
};

// ===============================
// LOGOUT USER
// ===============================

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });

    return res.status(200).json({
      message: "User logged out successfully",
    });

  } catch (error) {
    console.log("Error in logging out user:", error);

    return res.status(500).json({
      message: `Internal server error: ${error.message}`,
    });
  }
};

// ===============================
// GOOGLE AUTHENTICATION
// ===============================

export const googleAuth = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Find existing user
    let user = await User.findOne({ email });

    // Create user if not found
    if (!user) {
      user = await User.create({
        name,
        email,
        password: "",
      });
    }

    // Generate JWT using user ID
    const token = await generateToken(user._id);

    // Set authentication cookie
    res.cookie("token", token, COOKIE_OPTIONS);

    return res.status(200).json({
      message: "User authenticated successfully",
      user,
    });

  } catch (error) {
    console.log("Error in Google authentication:", error);

    return res.status(500).json({
      message: `Internal server error: ${error.message}`,
    });
  }
};

// ===============================
// ADMIN LOGIN
// ===============================

export const adminlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check admin credentials
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // Generate admin token
      const token = await generateToken1(email);

      // Set admin authentication cookie
      res.cookie("token", token, COOKIE_OPTIONS);

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
    }

    return res.status(401).json({
      message: "Invalid credentials",
    });

  } catch (error) {
    console.log("Error in admin login:", error);

    return res.status(500).json({
      message: `Internal server error: ${error.message}`,
    });
  }
};
