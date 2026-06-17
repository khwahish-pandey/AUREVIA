import jwt from "jsonwebtoken";
import { generateToken } from "../config/token.js";
export const isUserAuthenticated = async(req,res,next)=>{
    try {
       const token =req.cookies.token;
       if(!token){
        return res.status(401).json({message:"Unauthorized"});
       }
       const verify=jwt.verify(token,process.env.JWT_SECRET);
       if(!verify){
        return res.status(401).json({message:"Unauthorized"});
       }
       req.userId=verify.userId;
       next();
    } catch (error) {
        return res.status(401).json({message:"Unauthorized"});
    }
}