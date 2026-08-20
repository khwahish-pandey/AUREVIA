import express from "express";

const cartRouter = express.Router();

import {
  AddtoCart,
  UpdateCart,
  getUserCart,
} from "../controller/CartController.js";

import {
  isUserAuthenticated,
} from "../middleware/isAuth.js";


// =====================================================
// ADD ITEM TO CART
// POST /api/cart/add
// =====================================================

cartRouter.post(
  "/add",
  isUserAuthenticated,
  AddtoCart
);


// =====================================================
// GET USER CART
// GET /api/cart/get
// =====================================================

cartRouter.get(
  "/get",
  isUserAuthenticated,
  getUserCart
);


// =====================================================
// UPDATE CART ITEM
// POST /api/cart/:itemId
// =====================================================

cartRouter.post(
  "/:itemId",
  isUserAuthenticated,
  UpdateCart
);


export default cartRouter;