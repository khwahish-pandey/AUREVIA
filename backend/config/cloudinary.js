import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) {
      throw new Error("File path is required for upload");
    }

    const uploadResult = await cloudinary.uploader.upload(filePath);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return uploadResult.secure_url;
  } catch (error) {
    console.error("❌ Cloudinary upload failed:", error);

    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    throw error;
  }
};

export default uploadOnCloudinary;
