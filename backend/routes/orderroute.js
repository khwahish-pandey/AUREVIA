import express from "express";

import {
  isUserAuthenticated,
} from "../middleware/isAuth.js";

import adminAuth from "../middleware/adminAuth.js";

import {
  placeOrder,
  userOrders,
  allOrder,
  updateOrderStatus,
  createRazorpayOrder,
  verifyrazorpayPayment

} from "../controller/OrderController.js";

const orderRouter =
  express.Router();


// USER - PLACE ORDER
orderRouter.post(
  "/placeorder",
  isUserAuthenticated,
  placeOrder
);
orderRouter.post(
  "/razorpay",
  isUserAuthenticated,
  createRazorpayOrder
);


// USER - VIEW THEIR ORDERS
orderRouter.get(
  "/userorders",
  isUserAuthenticated,
  userOrders
);


// ADMIN - VIEW ALL ORDERS
orderRouter.post(
  "/allorders",
  adminAuth,
  allOrder
);


// ADMIN - UPDATE STATUS
orderRouter.put(
  "/updateorderstatus",
  adminAuth,
  updateOrderStatus
);

// USER - VERIFY RAZORPAY PAYMENT
orderRouter.post(
  "/verifyrazorpay",
  isUserAuthenticated,
  verifyrazorpayPayment
);


export default orderRouter;