import uploadOnCloudinary from "../config/cloudinary.js";
import Product from "../model/productmodel.js";

export const addProduct = async (req, res) => {
  try {
    console.log("========== ADD PRODUCT ==========");
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    // Check files
    if (
      !req.files ||
      !req.files.image1 ||
      !req.files.image2 ||
      !req.files.image3 ||
      !req.files.image4
    ) {
      return res.status(400).json({
        message: "All 4 product images are required",
      });
    }

    const {
      name,
      description,
      price,
      size,
      category,
      subcategory,
      bestseller,
    } = req.body;

    console.log("📦 Product:", name);
    console.log("💰 Price:", price);
    console.log("📁 Category:", category);

    // Upload images to Cloudinary
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

    // Make sure Cloudinary returned URLs
    if (!image1 || !image2 || !image3 || !image4) {
      return res.status(500).json({
        message: "Failed to upload one or more images",
      });
    }

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

    console.log("✅ PRODUCT CREATED:", savedProduct._id);

    return res.status(201).json({
      message: "Product added successfully",
      product: savedProduct,
    });

  } catch (error) {
    console.error("❌ ERROR IN ADD PRODUCT:");
    console.error(error);

    return res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
};


export const listProduct = async (req, res) => {
  try {
    const products = await Product.find({});

    return res.status(200).json({
      products,
    });

  } catch (error) {
    console.error("Error in listing products:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


export const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Product removed successfully",
    });

  } catch (error) {
    console.error("Error removing product:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
