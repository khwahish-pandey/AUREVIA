import uploadOnCloudinary from "../config/cloudinary.js";
import Product from "../model/productmodel.js";

export const addProduct = async (req, res) => {
    try {
        const { name, description, price,size, category, subcategory, bestseller } = req.body;
        let iamge1= await uploadOnCloudinary(req.files.image1[0].path);
        let iamge2= await uploadOnCloudinary(req.files.image2[0].path);
        let iamge3= await uploadOnCloudinary(req.files.image3[0].path);
        let iamge4= await uploadOnCloudinary(req.files.image4[0].path);
        const product = new Product({
            name,
            image1: iamge1,
            image2: iamge2,
            image3: iamge3,
            image4: iamge4,
            description,
            size:size,
            price:Number(price),
            category,
            subcategory,
            bestseller:bestseller === "true" ? true : false,
        });
       const savedProduct = await Product.create(product);
        res.status(201).json({ message: "Product added successfully", product: savedProduct });
    }
    catch (error) {
        console.log("Error in adding product", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const listProduct=async(req,res)=>{
    try {
        const products=await Product.find({});
        res.status(200).json({products});
    } catch (error) {
        console.log("Error in listing products", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const removeProduct=async(req,res)=>{
    try {
        const {id}=req.params;
        const product=await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        res.status(200).json({message:"Product removed successfully"}); 
        
    } catch (error) {
        
    }
}
