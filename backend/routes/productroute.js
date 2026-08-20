import express from "express";
import upload from "../middleware/multer.js";
import  {addProduct} from "../controller/ProductController.js";
import e from "express";
let productRouter=express.Router();
import adminAuth from "../middleware/adminAuth.js";
import { listProduct, removeProduct } from "../controller/ProductController.js";
productRouter.post("/addproduct",upload.fields([{ name: 'image1', maxCount: 1 },
     { name: 'image2', maxCount: 1 }, 
     { name: 'image3', maxCount: 1 }, 
     { name: 'image4', maxCount: 1 }])
     ,addProduct);
 productRouter.get("/listproduct",listProduct);
 productRouter.post("/removeproduct/:id",adminAuth,removeProduct);

export default productRouter;    