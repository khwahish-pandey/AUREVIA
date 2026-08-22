import uploadOnCloudinary from "../config/cloudinary.js";
import Product from "../model/productmodel.js";

export const addProduct = async (req, res) => {
  try {
    console.log("========== ADD PRODUCT ==========");
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const {
      name,
      description,
      price,
      size,
      category,
      subcategory,
      bestseller,
    } = req.body;

    if (!req.files) {
      return res.status(400).json({
        message: "No files received",
      });
    }

    if (
      !req.files.image1 ||
      !req.files.image2 ||
      !req.files.image3 ||
      !req.files.image4
    ) {
      return res.status(400).json({
        message: "All 4 images are required",
      });
    }

    console.log("☁️ Uploading image 1...");
    const image1 = await uploadOnCloudinary(
      req.files.image1[0].path
    );

    console.log("☁️ Uploading image 2...");
    const image2 = await uploadOnCloudinary(
      req.files.image2[0].path
    );

    console.log("☁️ Uploading image 3...");
    const image3 = await uploadOnCloudinary(
      req.files.image3[0].path
    );

    console.log("☁️ Uploading image 4...");
    const image4 = await uploadOnCloudinary(
      req.files.image4[0].path
    );

    console.log("✅ All images uploaded");

    const product = new Product({
      name,
      image1,
      image2,
      image3,
      image4,
      description,
      size,
      price: Number(price),
      category,
      subcategory,
      bestseller: bestseller === "true",
    });

    const savedProduct = await product.save();

    console.log("✅ PRODUCT SAVED:", savedProduct._id);

    return res.status(201).json({
      message: "Product added successfully",
      product: savedProduct,
    });

  } catch (error) {
    console.error("❌ ERROR IN ADD PRODUCT:", error);
    console.error("❌ ERROR MESSAGE:", error.message);
    console.error("❌ ERROR STACK:", error.stack);

    return res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
};
