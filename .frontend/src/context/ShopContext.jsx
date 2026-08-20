import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";
import { AuthContext } from "./AuthContext.jsx";

export const ShopContext = createContext(null);

function ShopProvider({ children }) {
  // =========================================================
  // PRODUCTS
  // =========================================================

  const [products, setProducts] = useState([]);

  // =========================================================
  // CART
  //
  // Structure:
  //
  // {
  //   productId: {
  //     M: 2,
  //     S: 1
  //   }
  // }
  //
  // =========================================================

  const [cartItems, setCartItems] = useState({});

  // =========================================================
  // AUTH
  // =========================================================

  const { value } =
    useContext(AuthContext) || {};

  const serverurl =
    value?.serverurl;

  // =========================================================
  // SHOP SETTINGS
  // =========================================================

  const currency = "₹";

  const deliveryCharges = 40;

  // =========================================================
  // GET PRODUCTS
  // =========================================================

  const getProducts = async () => {
    try {
      if (!serverurl) {
        console.log(
          "❌ SERVER URL NOT AVAILABLE - PRODUCTS NOT LOADED"
        );

        return;
      }

      const url =
        `${serverurl}/api/product/listproduct`;

      console.log(
        "📦 REQUESTING PRODUCTS:",
        url
      );

      const response =
        await axios.get(
          url,
          {
            withCredentials: true,
          }
        );

      console.log(
        "📦 PRODUCT RESPONSE STATUS:",
        response.status
      );

      const productData =
        response.data?.products ||
        response.data ||
        [];

      if (
        !Array.isArray(
          productData
        )
      ) {
        console.error(
          "❌ PRODUCTS RESPONSE IS NOT AN ARRAY:",
          productData
        );

        setProducts([]);

        return;
      }

      setProducts(
        productData
      );

      console.log(
        "✅ PRODUCTS LOADED:",
        productData.length
      );

    } catch (error) {

      console.error(
        "❌ ERROR FETCHING PRODUCTS:",
        error.response?.data ||
          error.message
      );

      setProducts([]);
    }
  };

  // =========================================================
  // GET USER CART FROM DATABASE
  // =========================================================

  const getUserCart = async () => {
    try {

      if (!serverurl) {
        console.log(
          "❌ SERVER URL NOT AVAILABLE - CART NOT LOADED"
        );

        return;
      }

      console.log(
        "🛒 FETCHING USER CART FROM DATABASE..."
      );

      const response =
        await axios.get(
          `${serverurl}/api/cart/get`,
          {
            withCredentials: true,
          }
        );

      console.log(
        "🛒 CART SERVER RESPONSE:",
        response.data
      );

      const serverCart =
        response.data?.cartData ||
        {};

      // =====================================================
      // VALID CART
      // =====================================================

      if (
        serverCart &&
        typeof serverCart ===
          "object" &&
        !Array.isArray(
          serverCart
        )
      ) {

        setCartItems(
          serverCart
        );

        console.log(
          "✅ USER CART RESTORED:",
          serverCart
        );

      } else {

        console.log(
          "ℹ️ NO VALID CART FOUND"
        );

        setCartItems({});
      }

    } catch (error) {

      // =====================================================
      // USER NOT LOGGED IN
      // =====================================================

      if (
        error.response?.status ===
        401
      ) {

        console.log(
          "ℹ️ USER NOT LOGGED IN - EMPTY CART"
        );

        setCartItems({});

        return;
      }

      // =====================================================
      // OTHER ERROR
      // =====================================================

      console.error(
        "❌ ERROR FETCHING USER CART:",
        error.response?.data ||
          error.message
      );
    }
  };

  // =========================================================
  // CLEAR CART
  // =========================================================
  //
  // IMPORTANT:
  //
  // The backend already clears:
  //
  // User.findByIdAndUpdate(
  //   userId,
  //   { cartData: {} }
  // )
  //
  // after an order is successfully saved.
  //
  // This function clears the FRONTEND React state so the
  // cart becomes empty immediately without refreshing.
  //
  // =========================================================

  const clearCart = () => {

    console.log(
      "🧹 CLEARING FRONTEND CART..."
    );

    setCartItems({});

    console.log(
      "✅ FRONTEND CART CLEARED"
    );
  };

  // =========================================================
  // GET QUANTITY OF PARTICULAR PRODUCT + SIZE
  // =========================================================

  const getCart = (
    itemId,
    size
  ) => {

    if (
      !itemId ||
      !size
    ) {
      return 0;
    }

    const quantity =
      cartItems?.[
        itemId
      ]?.[size];

    return (
      Number(quantity) ||
      0
    );
  };

  // =========================================================
  // ADD TO CART
  // =========================================================

  const addtoCart = async (
    itemId,
    size,
    quantity = 1
  ) => {

    // -------------------------------------------------------
    // VALIDATION
    // -------------------------------------------------------

    if (!itemId) {

      console.log(
        "❌ PRODUCT ID MISSING"
      );

      return;
    }

    if (!size) {

      console.log(
        "❌ SIZE NOT SELECTED"
      );

      return;
    }

    let qty =
      Number(quantity);

    if (
      !qty ||
      qty < 1
    ) {
      qty = 1;
    }

    console.log(
      "🛒 ADDING TO CART:",
      {
        itemId,
        size,
        quantity: qty,
      }
    );

    // -------------------------------------------------------
    // UPDATE LOCAL CART
    // -------------------------------------------------------

    const updatedCart =
      structuredClone(
        cartItems || {}
      );

    if (
      !updatedCart[itemId]
    ) {
      updatedCart[itemId] = {};
    }

    const currentQuantity =
      Number(
        updatedCart[itemId][size]
      ) || 0;

    updatedCart[itemId][size] =
      currentQuantity + qty;

    // -------------------------------------------------------
    // UPDATE UI IMMEDIATELY
    // -------------------------------------------------------

    setCartItems(
      updatedCart
    );

    console.log(
      "🛒 LOCAL CART UPDATED:",
      updatedCart
    );

    // -------------------------------------------------------
    // SERVER URL CHECK
    // -------------------------------------------------------

    if (!serverurl) {

      console.log(
        "⚠️ SERVER URL NOT AVAILABLE"
      );

      return;
    }

    // -------------------------------------------------------
    // SAVE TO DATABASE
    // -------------------------------------------------------

    try {

      const response =
        await axios.post(
          `${serverurl}/api/cart/add`,
          {
            itemId,
            size,
            quantity: qty,
          },
          {
            withCredentials: true,
          }
        );

      console.log(
        "✅ CART SAVED TO DATABASE:",
        response.data
      );

      // -----------------------------------------------------
      // SYNCHRONIZE ONLY IF BACKEND RETURNS CART
      // -----------------------------------------------------

      if (
        response.data?.cartData
      ) {

        setCartItems(
          response.data.cartData
        );

        console.log(
          "✅ CART SYNCHRONIZED:",
          response.data.cartData
        );
      }

    } catch (error) {

      console.error(
        "❌ ERROR SAVING CART:",
        error.response?.data ||
          error.message
      );

      /*
        Keep the local cart visible.

        The user can continue using the cart even if the
        database request fails.
      */
    }
  };

  // =========================================================
  // UPDATE CART QUANTITY
  // =========================================================

  const updateCartQuantity =
    async (
      itemId,
      size,
      quantity
    ) => {

      // -----------------------------------------------------
      // VALIDATION
      // -----------------------------------------------------

      if (
        !itemId ||
        !size
      ) {

        console.log(
          "❌ PRODUCT ID OR SIZE MISSING"
        );

        return;
      }

      const newQuantity =
        Number(quantity);

      if (
        Number.isNaN(
          newQuantity
        ) ||
        newQuantity < 0
      ) {

        console.log(
          "❌ INVALID QUANTITY:",
          quantity
        );

        return;
      }

      console.log(
        "🔄 UPDATING CART:",
        {
          itemId,
          size,
          quantity:
            newQuantity,
        }
      );

      // =====================================================
      // UPDATE LOCAL STATE IMMEDIATELY
      // =====================================================

      setCartItems(
        (previousCart) => {

          const updatedCart =
            structuredClone(
              previousCart || {}
            );

          // -------------------------------------------------
          // PRODUCT DOESN'T EXIST
          // -------------------------------------------------

          if (
            !updatedCart[itemId]
          ) {

            return updatedCart;
          }

          // -------------------------------------------------
          // REMOVE SIZE
          // -------------------------------------------------

          if (
            newQuantity === 0
          ) {

            delete updatedCart[
              itemId
            ][size];

            // -----------------------------------------------
            // REMOVE PRODUCT IF NO SIZES REMAIN
            // -----------------------------------------------

            if (
              Object.keys(
                updatedCart[itemId]
              ).length === 0
            ) {

              delete updatedCart[
                itemId
              ];
            }

          }

          // -------------------------------------------------
          // UPDATE QUANTITY
          // -------------------------------------------------

          else {

            updatedCart[
              itemId
            ][size] =
              newQuantity;
          }

          console.log(
            "🛒 LOCAL CART AFTER UPDATE:",
            updatedCart
          );

          return updatedCart;
        }
      );

      // =====================================================
      // SERVER URL
      // =====================================================

      if (!serverurl) {

        console.log(
          "⚠️ SERVER URL NOT AVAILABLE"
        );

        return;
      }

      // =====================================================
      // UPDATE DATABASE
      // =====================================================

      try {

        const response =
          await axios.post(
            `${serverurl}/api/cart/${itemId}`,
            {
              itemId,
              size,
              quantity:
                newQuantity,
            },
            {
              withCredentials: true,
            }
          );

        console.log(
          "✅ CART UPDATE SAVED TO DATABASE:",
          response.data
        );

        /*
          IMPORTANT:

          Do NOT replace local cart with response.cartData
          here.

          Local state has already been updated correctly.

          If backend returns stale cartData, replacing it
          could make a removed item appear again.
        */

      } catch (error) {

        console.error(
          "❌ ERROR UPDATING CART:",
          error.response?.data ||
            error.message
        );

        /*
          Database update failed.

          Restore the actual database cart so frontend and
          MongoDB stay synchronized.
        */

        await getUserCart();
      }
    };

  // =========================================================
  // REMOVE CART ITEM
  // =========================================================

  const removeFromCart =
    async (
      itemId,
      size
    ) => {

      if (
        !itemId ||
        !size
      ) {

        console.log(
          "❌ REMOVE FAILED: ID OR SIZE MISSING"
        );

        return;
      }

      console.log(
        "🗑️ REMOVING FROM CART:",
        {
          itemId,
          size,
        }
      );

      await updateCartQuantity(
        itemId,
        size,
        0
      );
    };

  // =========================================================
  // GET TOTAL CART COUNT
  // =========================================================

  const getCartCount =
    () => {

      let count = 0;

      for (
        const itemId in cartItems
      ) {

        if (
          !cartItems[itemId]
        ) {
          continue;
        }

        for (
          const size in
          cartItems[itemId]
        ) {

          const quantity =
            Number(
              cartItems[itemId][size]
            ) || 0;

          count +=
            quantity;
        }
      }

      return count;
    };

  // =========================================================
  // GET TOTAL CART PRICE
  // =========================================================

  const getCartAmount =
    () => {

      let total = 0;

      for (
        const itemId in cartItems
      ) {

        const product =
          products.find(
            (item) =>
              String(
                item?._id ||
                  item?.id
              ) ===
              String(itemId)
          );

        if (!product) {
          continue;
        }

        const price =
          Number(
            product.price ||
              product.sellingPrice ||
              0
          );

        for (
          const size in
          cartItems[itemId]
        ) {

          const quantity =
            Number(
              cartItems[
                itemId
              ][size]
            ) || 0;

          total +=
            price *
            quantity;
        }
      }

      return total;
    };

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {

    console.log(
      "🚀 SHOP PROVIDER STARTED"
    );

    console.log(
      "SERVER URL:",
      serverurl
    );

    if (!serverurl) {

      console.log(
        "⏳ WAITING FOR SERVER URL..."
      );

      return;
    }

    // -------------------------------------------------------
    // LOAD PRODUCTS
    // -------------------------------------------------------

    getProducts();

    // -------------------------------------------------------
    // LOAD LOGGED-IN USER'S CART
    // -------------------------------------------------------

    getUserCart();

  }, [serverurl]);

  // =========================================================
  // CONTEXT DATA
  // =========================================================

  const shopData = {

    // =======================================================
    // PRODUCTS
    // =======================================================

    products,

    setProducts,

    getProducts,

    // =======================================================
    // SHOP
    // =======================================================

    currency,

    deliveryCharges,

    // =======================================================
    // CART
    // =======================================================

    cartItems,

    setCartItems,

    getCart,

    addtoCart,

    updateCartQuantity,

    removeFromCart,

    getCartCount,

    getCartAmount,

    getUserCart,

    // =======================================================
    // ⭐ CLEAR CART AFTER SUCCESSFUL ORDER
    // =======================================================

    clearCart,
  };

  // =========================================================
  // PROVIDER
  // =========================================================

  return (
    <ShopContext.Provider
      value={shopData}
    >
      {children}
    </ShopContext.Provider>
  );
}

export default ShopProvider;