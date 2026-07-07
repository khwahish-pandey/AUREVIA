import jwt from "jsonwebtoken";
export const generateToken = async(user) => {
    try {
        const token =await jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        return token;
    } catch (error) {
        console.log("Error in generating token",error);
        
    }
}
export const generateToken1 = async(email) => {
    try {
        const token =await jwt.sign({email},process.env.JWT_SECRET,{expiresIn:"7d"});
        return token;
    } catch (error) {
        console.log("Error in generating token",error);
        
    }
}