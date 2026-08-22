import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filePath) => {
  if (!filePath) {
    throw new Error("File path is required for Cloudinary upload");
  }

  try {
    console.log("☁️ Uploading to Cloudinary:", filePath);

    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
    });

    console.log("✅ Cloudinary upload successful");

    // Delete temporary file safely
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return uploadResult.secure_url;

  } catch (error) {
    console.error("❌ Cloudinary upload failed:");
    console.error(error);

    // Delete temporary file safely
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // IMPORTANT: don't silently return undefined
    throw error;
  }
};

export default uploadOnCloudinary;
