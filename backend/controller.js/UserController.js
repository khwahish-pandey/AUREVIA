import User from "../model/usermodel.js";
import validator from "validator";
export const getUserProfile = async(req,res)=>{
    try {
        let user=await User.findById(req.userId).select("-password");
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        return res.status(200).json({user});
        
    } catch (error) {
        console.log("Error in getting user profile",error);
        return res.status(500).json({message:"Internal server error"});
        
    }
}