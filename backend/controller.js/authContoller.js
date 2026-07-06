import validator from "validator";
import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/token.js";
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message:"User already exists"})
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({message:"Invalid email"})
        }
        if(password.length < 6){
            return res.status(400).json({message:"Password must be at least 6 characters"})
        }
        const hashhpass= await bcrypt.hash(password,10);
        const user = await User.create({
            name,
            email,
            password:hashhpass
        })
        
        const token=await generateToken(user._id);
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000
        })
        res.status(201).json({message:"User registered successfully",user})
        
    } catch (error) {
        console.log("Error in registering user",error);
        res.status(500).json({message:"Internal server error ${error.message}"}) ;
    }
}
export const loginuser=async(req,res)=>{
    try {
        let {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token=await generateToken(user);
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000
        })
        res.status(200).json({message:"User logged in successfully",user})
        
    } catch (error) {
        
        console.log("Error in logging in user",error);
        res.status(500).json({message:"Internal server error ${error.message}"}) ;
    }
}
export const logout = async (req, res) => {
    try {
        // ✅ Pass identical configurations so the browser permits the deletion
        res.clearCookie("token", {
            httpOnly: true,
            secure: false, // matches your login settings
            sameSite: "strict"
        });
        
        return res.status(200).json({ message: "User logged out successfully" });
        
    } catch (error) {
        console.log("Error in logging out user", error);
        res.status(500).json({ message: `Internal server error ${error.message}` });
    }
}
export const googleAuth=async(req,res)=>{
    try {
        const {name,email}=req.body;
        let user=await User.findOne({email});
        if(!user){
            user=await User.create({
                name,
                email,
                password:""
            })
        }
          const token=await generateToken(user._id);
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000
        })
        return res.status(200).json({message:"User authenticated successfully",user})
        
    } catch (error) {
        console.log("Error in Google authentication",error);
        res.status(500).json({message:"Internal server error ${error.message}"}) ;
    }
}