import User from "../model/usermodel.js";

// =========================================================
// ADD TO CART
// POST /api/cart/add
// =========================================================

export const AddtoCart = async (req, res) => {
  try {
    const {
      itemId,
      size,
      quantity = 1,
    } = req.body;

    console.log("======================================");
    console.log("🛒 ADD TO CART REQUEST");
    console.log("USER ID:", req.userId);
    console.log("ITEM ID:", itemId);
    console.log("SIZE:", size);
    console.log("QUANTITY:", quantity);
    console.log("======================================");

    // -------------------------------------------------------
    // VALIDATION
    // -------------------------------------------------------

    if (!itemId) {
      return res.status(400).json({
        message: "Product ID is required",
      });
    }

    if (!size) {
      return res.status(400).json({
        message: "Size is required",
      });
    }

    const qty = Number(quantity);

    if (!Number.isInteger(qty) || qty < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1",
      });
    }

    // -------------------------------------------------------
    // GET LOGGED-IN USER
    // -------------------------------------------------------

    const userData = await User.findById(req.userId);

    if (!userData) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // -------------------------------------------------------
    // GET EXISTING CART
    // -------------------------------------------------------

    const cartData = userData.cartData || {};

    // -------------------------------------------------------
    // MAKE SURE PRODUCT EXISTS
    // -------------------------------------------------------

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    // -------------------------------------------------------
    // CURRENT QUANTITY
    // -------------------------------------------------------

    const currentQuantity =
      Number(cartData[itemId][size]) || 0;

    // -------------------------------------------------------
    // NEW QUANTITY
    // -------------------------------------------------------

    const newQuantity =
      currentQuantity + qty;

    // -------------------------------------------------------
    // UPDATE CART
    // -------------------------------------------------------

    cartData[itemId][size] = newQuantity;

    userData.cartData = cartData;

    // Important for nested/Mixed cartData
    userData.markModified("cartData");

    // -------------------------------------------------------
    // SAVE
    // -------------------------------------------------------

    await userData.save();

    console.log(
      "✅ ITEM ADDED TO CART:"
    );

    console.log(
      "📦 UPDATED CART:",
      userData.cartData
    );

    // -------------------------------------------------------
    // RESPONSE
    // -------------------------------------------------------

    return res.status(200).json({
      message: "Item added to cart successfully",
      cartData: userData.cartData,
    });

  } catch (error) {
    console.error(
      "❌ ERROR ADDING ITEM TO CART:",
      error
    );

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};


// =========================================================
// UPDATE CART
// POST /api/cart/:itemId
// =========================================================

export const UpdateCart = async (req, res) => {
  try {
    const {
      itemId,
      size,
      quantity,
    } = req.body;

    console.log("======================================");
    console.log("🔄 UPDATE CART REQUEST");
    console.log("USER ID:", req.userId);
    console.log("ITEM ID:", itemId);
    console.log("SIZE:", size);
    console.log("QUANTITY:", quantity);
    console.log("======================================");

    // -------------------------------------------------------
    // VALIDATION
    // -------------------------------------------------------

    if (!itemId) {
      return res.status(400).json({
        message: "Product ID is required",
      });
    }

    if (!size) {
      return res.status(400).json({
        message: "Size is required",
      });
    }

    if (
      quantity === undefined ||
      quantity === null
    ) {
      return res.status(400).json({
        message: "Quantity is required",
      });
    }

    const qty = Number(quantity);

    if (
      !Number.isInteger(qty) ||
      qty < 0
    ) {
      return res.status(400).json({
        message:
          "Quantity must be a non-negative integer",
      });
    }

    // =======================================================
    // REMOVE ITEM
    // =======================================================

    if (qty === 0) {
      const userData =
        await User.findById(req.userId);

      if (!userData) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const cartData =
        userData.cartData || {};

      console.log(
        "🛒 CART BEFORE REMOVAL:",
        cartData
      );

      // -----------------------------------------------------
      // CHECK PRODUCT
      // -----------------------------------------------------

      if (cartData[itemId]) {

        // Remove selected size
        delete cartData[itemId][size];

        console.log(
          "🗑️ SIZE REMOVED:",
          {
            itemId,
            size,
          }
        );

        // ---------------------------------------------------
        // REMOVE PRODUCT IF NO SIZES REMAIN
        // ---------------------------------------------------

        if (
          Object.keys(
            cartData[itemId]
          ).length === 0
        ) {
          delete cartData[itemId];

          console.log(
            "🗑️ PRODUCT REMOVED COMPLETELY:",
            itemId
          );
        }
      }

      // -----------------------------------------------------
      // SAVE
      // -----------------------------------------------------

      userData.cartData = cartData;

      userData.markModified(
        "cartData"
      );

      await userData.save();

      console.log(
        "✅ ITEM REMOVED FROM DATABASE"
      );

      console.log(
        "📦 CART AFTER REMOVAL:",
        userData.cartData
      );

      return res.status(200).json({
        message:
          "Item removed from cart",

        cartData:
          userData.cartData,
      });
    }

    // =======================================================
    // UPDATE QUANTITY
    // =======================================================

    console.log(
      "🔢 UPDATING PRODUCT QUANTITY..."
    );

    // -------------------------------------------------------
    // CREATE MONGODB NESTED FIELD
    // -------------------------------------------------------

    const cartField =
      `cartData.${itemId}.${size}`;

    console.log(
      "📍 MONGODB FIELD:",
      cartField
    );

    console.log(
      "🔢 NEW QUANTITY:",
      qty
    );

    // -------------------------------------------------------
    // DIRECT DATABASE UPDATE
    // -------------------------------------------------------

    const updatedUser =
      await User.findByIdAndUpdate(
        req.userId,

        {
          $set: {
            [cartField]: qty,
          },
        },

        {
          new: true,
          runValidators: true,
        }
      );

    // -------------------------------------------------------
    // USER NOT FOUND
    // -------------------------------------------------------

    if (!updatedUser) {
      return res.status(404).json({
        message:
          "User not found",
      });
    }

    // -------------------------------------------------------
    // LOG RESULT
    // -------------------------------------------------------

    console.log(
      "✅ QUANTITY UPDATED IN DATABASE"
    );

    console.log(
      "📦 UPDATED CART:",
      updatedUser.cartData
    );

    // -------------------------------------------------------
    // RESPONSE
    // -------------------------------------------------------

    return res.status(200).json({
      message:
        "Cart quantity updated successfully",

      cartData:
        updatedUser.cartData,
    });

  } catch (error) {
    console.error(
      "❌ ERROR UPDATING CART:",
      error
    );

    return res.status(500).json({
      message:
        "Internal server error",

      error:
        error.message,
    });
  }
};


// =========================================================
// GET USER CART
// GET /api/cart/get
// =========================================================

export const getUserCart = async (req, res) => {
  try {
    console.log("======================================");
    console.log("🛒 GET USER CART");
    console.log("USER ID:", req.userId);
    console.log("======================================");

    // -------------------------------------------------------
    // GET LOGGED-IN USER
    // -------------------------------------------------------

    const userData =
      await User.findById(req.userId);

    if (!userData) {
      return res.status(404).json({
        message:
          "User not found",
      });
    }

    // -------------------------------------------------------
    // GET CART
    // -------------------------------------------------------

    const cartData =
      userData.cartData || {};

    console.log(
      "✅ USER CART:",
      cartData
    );

    // -------------------------------------------------------
    // RESPONSE
    // -------------------------------------------------------

    return res.status(200).json({
      cartData,
    });

  } catch (error) {
    console.error(
      "❌ ERROR GETTING USER CART:",
      error
    );

    return res.status(500).json({
      message:
        "Internal server error",

      error:
        error.message,
    });
  }
};
