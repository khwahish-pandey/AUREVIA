import express from "express";
import { registerUser,loginuser, logout,googleAuth,adminlogin } from "../controller.js/authContoller.js";

const authroute=express.Router();
authroute.post("/register",registerUser);
authroute.post("/login",loginuser);
authroute.get("/logout",logout);
authroute.post("/google",googleAuth);
authroute.post("/adminlogin",adminlogin)
export default authroute;