import Order from "../model/orderModel.js";
import User from "../model/usermodel.js";
import razorpay from 'razorpay'
import "dotenv/config";
import crypto from "crypto";

const razor_pay_instance=new razorpay(
  {
    key_id:process.env.RAZOR_PAY_KEY,
    key_secret:process.env.RAZOR_PAY_SECRET,
  }
)
console.log("========== RAZORPAY CONFIG ==========");
console.log(
  "KEY PREFIX:",
  process.env.RAZOR_PAY_KEY?.substring(0, 12)
);
console.log(
  "KEY LENGTH:",
  process.env.RAZOR_PAY_KEY?.length
);
console.log(
  "SECRET LENGTH:",
  process.env.RAZOR_PAY_SECRET?.length
);
console.log(
  "SECRET HAS QUOTES:",
  process.env.RAZOR_PAY_SECRET?.startsWith('"') ||
  process.env.RAZOR_PAY_SECRET?.endsWith('"')
);
console.log("=====================================");
// =========================================================
// PLACE ORDER
// =========================================================

export const placeOrder = async (req, res) => {
  try {
    console.log(
      "========== PLACE ORDER =========="
    );

    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    const {
      items,
      amount,
      address,
      paymentMethod,
    } = req.body;

    const userId =
      req.user?._id ||
      req.user?.id ||
      req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "User is not authenticated",
      });
    }

    if (
      !items ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Order items are required",
      });
    }

    if (!address) {
      return res.status(400).json({
        success: false,
        message:
          "Delivery address is required",
      });
    }

    if (
      amount === undefined ||
      amount === null
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Order amount is required",
      });
    }

    const orderData = {
      userId: String(userId),

      items,

      amount: Number(amount),

      address,

      paymentMethod:
        paymentMethod || "COD",

      payment: false,

      status: "Order Placed",

      date: Date.now(),
    };

    const newOrder =
      new Order(orderData);

    await newOrder.save();

    await User.findByIdAndUpdate(
      userId,
      {
        cartData: {},
      }
    );

    console.log(
      "✅ ORDER SAVED:",
      newOrder._id
    );

    return res.status(200).json({
      success: true,
      message:
        "Order placed successfully",
      orderId: newOrder._id,
      order: newOrder,
    });

  } catch (error) {
    console.error(
      "❌ ERROR PLACING ORDER:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Error placing order",
      error: error.message,
    });
  }
};


// =========================================================
// USER ORDERS
// =========================================================

export const userOrders = async (
  req,
  res
) => {
  try {
    const userId =
      req.user?._id ||
      req.user?.id ||
      req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "User is not authenticated",
      });
    }

    const orders =
      await Order.find({
        userId: String(userId),
      }).sort({
        date: -1,
      });

    return res.status(200).json({
      success: true,
      orders,
    });

  } catch (error) {
    console.error(
      "❌ ERROR FETCHING USER ORDERS:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Error fetching user orders",
      error: error.message,
    });
  }
};


// =========================================================
// ADMIN - ALL ORDERS
// =========================================================

export const allOrder = async (
  req,
  res
) => {
  try {
    console.log(
      "========== ADMIN ALL ORDERS =========="
    );

    const orders =
      await Order.find({}).sort({
        date: -1,
      });

    console.log(
      "TOTAL ORDERS:",
      orders.length
    );

    return res.status(200).json({
      success: true,
      orders,
    });

  } catch (error) {
    console.error(
      "❌ ERROR FETCHING ALL ORDERS:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Error fetching all orders",
      error: error.message,
    });
  }
};


// =========================================================
// ADMIN - UPDATE ORDER STATUS
// =========================================================

export const updateOrderStatus = async (
  req,
  res
) => {
  try {
    const {
      orderId,
      status,
    } = req.body;

    console.log(
      "========== UPDATE ORDER STATUS =========="
    );

    console.log(
      "ORDER ID:",
      orderId
    );

    console.log(
      "STATUS:",
      status
    );

    if (!orderId || !status) {
      return res.status(400).json({
        success: false,
        message:
          "Order ID and status are required",
      });
    }

    const allowedStatuses = [
      "Order Placed",
      "Processing",
      "Shipped",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];

    if (
      !allowedStatuses.includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid order status",
      });
    }

    const updatedOrder =
      await Order.findByIdAndUpdate(
        orderId,
        {
          status,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message:
          "Order not found",
      });
    }

    console.log(
      "✅ STATUS UPDATED:"
    );

    console.log(
      updatedOrder.status
    );

    return res.status(200).json({
      success: true,
      message:
        "Order status updated successfully",
      order: updatedOrder,
    });

  } catch (error) {
    console.error(
      "❌ ERROR UPDATING ORDER STATUS:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Error updating order status",
      error: error.message,
    });
  }
};
export const createRazorpayOrder = async (req, res) => {
  try {
    console.log("========== CREATE RAZORPAY ORDER ==========");

    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    const {
      items,
      amount,
      address,
    } = req.body;

    const userId =
      req.user?._id ||
      req.user?.id ||
      req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User is not authenticated",
      });
    }

    if (
      !items ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Order items are required",
      });
    }

    const numericAmount = Number(amount);

    if (
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid order amount",
      });
    }

    if (!address) {
      return res.status(400).json({
        success: false,
        message: "Delivery address is required",
      });
    }

    // ==========================================
    // CREATE DATABASE ORDER FIRST
    // ==========================================

    const orderData = {
      userId: String(userId),

      items,

      amount: numericAmount,

      address,

      paymentMethod: "RAZORPAY",

      payment: false,

      status: "Order Placed",

      date: Date.now(),
    };

    const newOrder = new Order(orderData);

    await newOrder.save();

    console.log(
      "✅ DATABASE ORDER CREATED:",
      newOrder._id
    );

    // ==========================================
    // CREATE RAZORPAY ORDER
    // ==========================================

    const options = {
      amount: Math.round(
        numericAmount * 100
      ),

      currency: "INR",

      // IMPORTANT:
      // Use MongoDB Order ID as receipt
      receipt: newOrder._id.toString(),
    };

    console.log(
      "RAZORPAY OPTIONS:",
      options
    );

    const razorpayOrder =
      await razor_pay_instance.orders.create(
        options
      );

    console.log(
      "✅ RAZORPAY ORDER CREATED:",
      razorpayOrder
    );

    // ==========================================
    // SAVE RAZORPAY ORDER ID
    // ==========================================

    newOrder.razorpayOrderId =
      razorpayOrder.id;

    await newOrder.save();

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,

      message:
        "Razorpay order created successfully",

      orderId:
        newOrder._id,

      razorpayOrder,
    });

  } catch (error) {

    console.error(
      "❌ ERROR CREATING RAZORPAY ORDER:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Error creating Razorpay order",

      error:
        error.message,
    });
  }
};
export const verifyrazorpayPayment = async (req, res) => {
  try {
    console.log("========== VERIFY RAZORPAY PAYMENT ==========");

    const userId =
      req.user?._id ||
      req.user?.id ||
      req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User is not authenticated",
      });
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    console.log("DATABASE ORDER ID:", orderId);
    console.log("RAZORPAY ORDER ID:", razorpay_order_id);
    console.log("RAZORPAY PAYMENT ID:", razorpay_payment_id);
    console.log(
      "SIGNATURE RECEIVED:",
      !!razorpay_signature
    );

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !orderId
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing payment verification details",
      });
    }

    // ==========================================
    // FIND OUR DATABASE ORDER
    // ==========================================

    const order = await Order.findOne({
      _id: orderId,
      userId: String(userId),
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    console.log(
      "DATABASE RAZORPAY ORDER ID:",
      order.razorpayOrderId
    );

    // ==========================================
    // MAKE SURE RAZORPAY ORDER MATCHES
    // ==========================================

    if (
      order.razorpayOrderId !==
      razorpay_order_id
    ) {
      return res.status(400).json({
        success: false,
        message: "Razorpay order ID mismatch",
      });
    }

    // ==========================================
    // VERIFY RAZORPAY SIGNATURE
    // ==========================================

    const body =
      `${order.razorpayOrderId}|${razorpay_payment_id}`;

    const expectedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env.RAZOR_PAY_SECRET
        )
        .update(body)
        .digest("hex");

    const signaturesMatch =
      expectedSignature === razorpay_signature;

    if (!signaturesMatch) {
      console.error(
        "❌ INVALID RAZORPAY SIGNATURE"
      );

      return res.status(400).json({
        success: false,
        message: "Invalid Razorpay payment signature",
      });
    }

    console.log(
      "✅ RAZORPAY SIGNATURE VERIFIED"
    );

    // ==========================================
    // UPDATE ORDER
    // ==========================================

    order.payment = true;
    order.status = "Processing";
    order.razorpayPaymentId =
      razorpay_payment_id;
    order.razorpaySignature =
      razorpay_signature;

    await order.save();

    // ==========================================
    // CLEAR CART
    // ==========================================

    await User.findByIdAndUpdate(
      userId,
      {
        cartData: {},
      }
    );

    console.log(
      "✅ PAYMENT VERIFIED SUCCESSFULLY"
    );

    console.log(
      "✅ ORDER UPDATED:",
      order._id
    );

    console.log(
      "✅ CART CLEARED"
    );

    return res.status(200).json({
      success: true,
      message:
        "Payment verified successfully",
      order,
    });

  } catch (error) {
    console.error(
      "❌ ERROR VERIFYING RAZORPAY PAYMENT:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Error verifying Razorpay payment",
      error: error.message,
    });
  }
};
