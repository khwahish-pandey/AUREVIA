import jwt from "jsonwebtoken";
import { generateToken1 } from "../config/token.js";
const adminAuth = async (req, res, next) => {
    try {
       const {token }=req.cookies;
         if(!token){
          return res.status(401).json({message:"Unauthorized"});
         }  
        const verify=jwt.verify(token,process.env.JWT_SECRET);
        if(!verify){
            return res.status(401).json({message:"Unauthorized"});
        }
        req.adminemail=process.env.ADMIN_EMAIL;
        next();
    } catch (error) {
        return res.status(401).json({message:"Unauthorized"});
    }
}
export default adminAuth;