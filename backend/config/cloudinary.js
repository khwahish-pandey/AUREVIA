import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
const uploadOnCloudinary = async (filePath) => {
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });
    try {
         if(!filePath){
        throw new Error("File path is required for upload");
    }
    const uploadResult = await cloudinary.uploader.upload(filePath);
    fs.unlinkSync(filePath); // Delete the file from local storage after upload
       return uploadResult.secure_url; // Return the secure URL of the uploaded image
        
    } catch (error) {
        fs.unlinkSync(filePath); // Ensure the file is deleted even if upload fails
        console.error("Error uploading to Cloudinary:", error);

        
    }
   

}
export default uploadOnCloudinary;