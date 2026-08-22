import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
    {
        userId:{
            type: String,
            required: true
        },
        items:{
            type: Array,
            required: true
        },
        amount:{
            type: Number,
            required: true
        },
        address:{
            type: Object,
            required: true
        },
        status:{
            type: String,
            enum: [
    "Order Placed",
    "Processing",
    "Shipped",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
  ],
            default: "pending"
        },
        paymentMethod:{
            type: String,
            required: true
        },
        payment:{
            type:Boolean,
            default: false
        },
        razorpayOrderId: {
    type: String,
    default: null
},

razorpayPaymentId: {
    type: String,
    default: null
},

razorpaySignature: {
    type: String,
    default: null
},
        date:{
            type: Number,
            default: Date.now
        }
    },{timestamps: true})
    const Order = mongoose.model("Order", orderSchema);
    export default Order;
