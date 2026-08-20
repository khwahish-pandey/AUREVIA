import React, { useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";

function Cart() {
  const {
    products = [],
    cartItems = {},
    updateCartQuantity,
    removeFromCart,
    currency = "₹",
    deliveryCharges = 40,
  } = useContext(ShopContext) || {};

  const [updating, setUpdating] = useState(false);
  const [removingItem, setRemovingItem] = useState(null);

  // =========================================================
  // FIND PRODUCT
  // =========================================================

  const findProduct = (itemId) => {
    return products.find(
      (product) =>
        String(product._id || product.id) === String(itemId)
    );
  };

  // =========================================================
  // FLATTEN CART
  // =========================================================

  const cartProducts = useMemo(() => {
    const items = [];

    Object.entries(cartItems || {}).forEach(
      ([itemId, sizes]) => {
        const product = findProduct(itemId);

        if (!product || !sizes) return;

        Object.entries(sizes).forEach(
          ([size, quantity]) => {
            const qty = Number(quantity) || 0;

            if (qty <= 0) return;

            items.push({
              itemId,
              size,
              quantity: qty,
              product,
            });
          }
        );
      }
    );

    return items;
  }, [cartItems, products]);

  // =========================================================
  // TOTAL ITEMS
  // =========================================================

  const totalItems = useMemo(() => {
    return cartProducts.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }, [cartProducts]);

  // =========================================================
  // SUBTOTAL
  // =========================================================

  const subtotal = useMemo(() => {
    return cartProducts.reduce((total, item) => {
      const price = Number(
        item.product.price ||
          item.product.sellingPrice ||
          0
      );

      return total + price * item.quantity;
    }, 0);
  }, [cartProducts]);

  // =========================================================
  // DELIVERY
  // =========================================================

  const deliveryFee =
    subtotal > 0 ? Number(deliveryCharges) : 0;

  // =========================================================
  // TOTAL
  // =========================================================

  const totalAmount = subtotal + deliveryFee;

  // =========================================================
  // FORMAT PRICE
  // =========================================================

  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString("en-IN");
  };

  // =========================================================
  // UPDATE QUANTITY
  // =========================================================

  const updateQuantity = async (
    itemId,
    size,
    newQuantity
  ) => {
    if (newQuantity < 0) return;

    if (typeof updateCartQuantity !== "function") {
      console.error(
        "❌ updateCartQuantity is not available in ShopContext"
      );
      return;
    }

    setUpdating(true);

    try {
      await updateCartQuantity(
        itemId,
        size,
        newQuantity
      );
    } catch (error) {
      console.error(
        "❌ CART UPDATE ERROR:",
        error
      );
    } finally {
      setUpdating(false);
    }
  };

  // =========================================================
  // REMOVE ITEM
  // =========================================================

  const removeItem = async (
    itemId,
    size
  ) => {
    if (!itemId || !size) {
      console.error(
        "❌ Cannot remove item: missing itemId or size"
      );
      return;
    }

    if (typeof removeFromCart !== "function") {
      console.error(
        "❌ removeFromCart is not available in ShopContext"
      );
      return;
    }

    const removeKey = `${itemId}-${size}`;

    setRemovingItem(removeKey);

    try {
      await removeFromCart(itemId, size);
    } catch (error) {
      console.error(
        "❌ REMOVE ITEM ERROR:",
        error
      );
    } finally {
      setRemovingItem(null);
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (!products || products.length === 0) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&display=swap');

          .cart-page {
            font-family: 'DM Sans', sans-serif;
          }

          .cart-serif {
            font-family: 'Cormorant Garamond', serif;
          }
        `}</style>

        <div className="cart-page min-h-screen bg-[#fdf5ee] flex items-center justify-center">

          <div className="text-center">

            <div className="text-5xl mb-5">
              🛍
            </div>

            <h1 className="cart-serif text-4xl text-[#3d5a45]">
              Loading your bag...
            </h1>

            <p className="mt-3 text-sm text-gray-500">
              Please wait while we load your products.
            </p>

          </div>

        </div>
      </>
    );
  }

  // =========================================================
  // EMPTY CART
  // =========================================================

  if (cartProducts.length === 0) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&display=swap');

          .cart-page {
            font-family: 'DM Sans', sans-serif;
          }

          .cart-serif {
            font-family: 'Cormorant Garamond', serif;
          }
        `}</style>

        <div className="cart-page min-h-screen bg-[#fdf5ee]">

          {/* HEADER */}

          <div className="max-w-7xl mx-auto px-5 lg:px-10 pt-10">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-[9px] uppercase tracking-[0.3em] text-[#d4845a]">
                  Aurevia
                </p>

                <h1 className="cart-serif text-5xl text-[#2a2a2a] mt-2">
                  Your Shopping Bag
                </h1>

              </div>

              <div className="hidden sm:flex items-center gap-3 text-xs text-gray-500">

                <span className="text-[#3d5a45] font-semibold">
                  BAG
                </span>

                <span>—</span>

                <span>
                  ADDRESS
                </span>

                <span>—</span>

                <span>
                  PAYMENT
                </span>

              </div>

            </div>

          </div>

          {/* EMPTY */}

          <div className="max-w-7xl mx-auto px-5 lg:px-10 py-20">

            <div className="max-w-xl mx-auto text-center">

              <div className="w-24 h-24 mx-auto rounded-full bg-[#ebe2d8] flex items-center justify-center text-4xl">
                🛍
              </div>

              <h2 className="cart-serif text-4xl text-[#3d5a45] mt-7">
                Your bag is empty
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Looks like you haven't added anything
                to your bag yet. Discover something
                beautiful from our latest collection.
              </p>

              <Link
                to="/profile/collection"
                className="inline-flex mt-8 px-10 py-4 bg-[#3d5a45] text-white text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-[#d4845a] transition"
              >
                Continue Shopping
              </Link>

            </div>

          </div>

        </div>
      </>
    );
  }

  // =========================================================
  // MAIN CART
  // =========================================================

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&display=swap');

        .cart-page {
          font-family: 'DM Sans', sans-serif;
        }

        .cart-serif {
          font-family: 'Cormorant Garamond', serif;
        }

        .cart-scroll::-webkit-scrollbar {
          display: none;
        }

        .cart-scroll {
          scrollbar-width: none;
        }
      `}</style>

      <div className="cart-page min-h-screen bg-[#fdf5ee] text-[#2a2a2a]">

        {/* ===================================================
            TOP HEADER
        =================================================== */}

        <section className="border-b border-[#e4d9cf]">

          <div className="max-w-7xl mx-auto px-5 lg:px-10 py-7">

            <div className="flex items-center justify-between">

              {/* STEPS */}

              <div className="flex items-center gap-2 sm:gap-5">

                <div className="flex items-center gap-2">

                  <span className="w-7 h-7 rounded-full bg-[#3d5a45] text-white flex items-center justify-center text-[10px]">
                    1
                  </span>

                  <span className="text-[9px] uppercase tracking-[0.18em] font-semibold text-[#3d5a45]">
                    Bag
                  </span>

                </div>

                <span className="text-[#c7bbb0]">
                  —
                </span>

                <div className="flex items-center gap-2">

                  <span className="w-7 h-7 rounded-full border border-[#c7bbb0] text-gray-400 flex items-center justify-center text-[10px]">
                    2
                  </span>

                  <span className="hidden sm:block text-[9px] uppercase tracking-[0.18em] text-gray-400">
                    Address
                  </span>

                </div>

                <span className="text-[#c7bbb0]">
                  —
                </span>

                <div className="flex items-center gap-2">

                  <span className="w-7 h-7 rounded-full border border-[#c7bbb0] text-gray-400 flex items-center justify-center text-[10px]">
                    3
                  </span>

                  <span className="hidden sm:block text-[9px] uppercase tracking-[0.18em] text-gray-400">
                    Payment
                  </span>

                </div>

              </div>

              {/* SECURITY */}

              <div className="flex items-center gap-3">

                <div className="w-9 h-9 bg-[#dce9df] text-[#3d5a45] rounded-full flex items-center justify-center">
                  ✓
                </div>

                <div className="hidden sm:block">

                  <p className="text-[9px] uppercase tracking-[0.2em] font-semibold text-[#3d5a45]">
                    100% Secure
                  </p>

                  <p className="text-[9px] text-gray-400 mt-1">
                    Safe & encrypted checkout
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* ===================================================
            MAIN
        =================================================== */}

        <main className="max-w-7xl mx-auto px-5 lg:px-10 py-8 lg:py-12">

          <div className="grid lg:grid-cols-[minmax(0,1fr)_380px] gap-7 lg:gap-10 items-start">

            {/* =================================================
                LEFT
            ================================================= */}

            <div>

              {/* TITLE */}

              <div className="flex items-end justify-between mb-6">

                <div>

                  <p className="text-[9px] uppercase tracking-[0.3em] text-[#d4845a]">
                    Your selections
                  </p>

                  <h1 className="cart-serif text-4xl md:text-5xl text-[#2a2a2a] mt-1">
                    Shopping Bag
                  </h1>

                </div>

                <span className="text-xs text-gray-500">
                  {totalItems}{" "}
                  {totalItems === 1
                    ? "item"
                    : "items"}
                </span>

              </div>

              {/* DELIVERY CHECK */}

              <div className="border border-[#e0d4c9] bg-white/50 px-5 py-5 mb-5">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                  <div>

                    <p className="text-xs font-semibold">
                      Check delivery time & services
                    </p>

                    <p className="text-[10px] text-gray-400 mt-1">
                      Enter your pincode to check
                      delivery availability.
                    </p>

                  </div>

                  <button
                    type="button"
                    className="border border-[#d4845a] text-[#d4845a] px-6 py-3 text-[9px] uppercase tracking-[0.15em] font-semibold hover:bg-[#d4845a] hover:text-white transition"
                  >
                    Enter Pincode
                  </button>

                </div>

              </div>

              {/* SELECTED ITEMS */}

              <div className="flex items-center justify-between mb-4">

                <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#3d5a45]">
                  {totalItems}{" "}
                  {totalItems === 1
                    ? "item"
                    : "items"}{" "}
                  selected
                </p>

                <Link
                  to="/profile/collection"
                  className="text-[9px] uppercase tracking-[0.15em] text-gray-500 underline underline-offset-4 hover:text-[#d4845a]"
                >
                  Continue Shopping
                </Link>

              </div>

              {/* PRODUCT CARDS */}

              <div className="space-y-4">

                {cartProducts.map((item) => {

                  const {
                    itemId,
                    size,
                    quantity,
                    product,
                  } = item;

                  const productName =
                    product.name ||
                    product.title ||
                    "Product";

                  const price = Number(
                    product.price ||
                      product.sellingPrice ||
                      0
                  );

                  const image =
                    product.image1 ||
                    product.image ||
                    product.image2;

                  const itemTotal =
                    price * quantity;

                  const removeKey =
                    `${itemId}-${size}`;

                  return (
                    <div
                      key={removeKey}
                      className="bg-white border border-[#e2d8cf] relative"
                    >

                      <div className="p-4 sm:p-5 flex gap-4 sm:gap-5">

                        {/* IMAGE */}

                        <div className="w-[105px] sm:w-[135px] h-[135px] sm:h-[170px] bg-[#ebe2d8] flex-shrink-0 overflow-hidden">

                          {image ? (
                            <img
                              src={image}
                              alt={productName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                              No Image
                            </div>
                          )}

                        </div>

                        {/* INFORMATION */}

                        <div className="flex-1 min-w-0">

                          <div className="flex justify-between gap-3">

                            <div>

                              <p className="text-[8px] uppercase tracking-[0.25em] text-[#d4845a]">
                                Aurevia
                              </p>

                              <h2 className="cart-serif text-2xl sm:text-3xl leading-none mt-1 text-[#2a2a2a]">
                                {productName}
                              </h2>

                            </div>

                            {/* REMOVE */}

                            <button
                              type="button"
                              onClick={() =>
                                removeItem(
                                  itemId,
                                  size
                                )
                              }
                              disabled={
                                removingItem ===
                                removeKey
                              }
                              className="w-8 h-8 flex items-center justify-center text-xl text-gray-400 hover:text-[#d4845a] transition disabled:opacity-40"
                              aria-label="Remove item"
                            >
                              {removingItem ===
                              removeKey
                                ? "..."
                                : "×"}
                            </button>

                          </div>

                          {/* CATEGORY */}

                          <p className="text-[10px] text-gray-400 mt-2">

                            {product.category ||
                              "Fashion"}

                            {product.subCategory && (
                              <>
                                {" • "}
                                {product.subCategory}
                              </>
                            )}

                          </p>

                          {/* SIZE + QUANTITY */}

                          <div className="flex flex-wrap items-center gap-3 mt-5">

                            <div className="border border-[#d8ccc1] px-3 py-2 text-[10px]">

                              <span className="text-gray-400">
                                Size
                              </span>

                              <span className="ml-2 font-semibold text-[#3d5a45]">
                                {size}
                              </span>

                            </div>

                            <div className="flex items-center border border-[#d8ccc1]">

                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(
                                    itemId,
                                    size,
                                    quantity - 1
                                  )
                                }
                                disabled={
                                  updating ||
                                  removingItem ===
                                    removeKey
                                }
                                className="w-9 h-9 text-gray-500 hover:text-[#3d5a45] disabled:opacity-40"
                              >
                                −
                              </button>

                              <span className="w-9 text-center text-xs font-semibold">
                                {quantity}
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(
                                    itemId,
                                    size,
                                    quantity + 1
                                  )
                                }
                                disabled={
                                  updating ||
                                  removingItem ===
                                    removeKey
                                }
                                className="w-9 h-9 text-gray-500 hover:text-[#3d5a45] disabled:opacity-40"
                              >
                                +
                              </button>

                            </div>

                          </div>

                          {/* PRICE */}

                          <div className="mt-5 flex items-center gap-3">

                            <span className="text-lg font-semibold text-[#3d5a45]">
                              {currency}
                              {formatPrice(
                                itemTotal
                              )}
                            </span>

                            {product.mrp &&
                              Number(product.mrp) >
                                price && (
                                <span className="text-xs text-gray-400 line-through">
                                  {currency}
                                  {formatPrice(
                                    Number(
                                      product.mrp
                                    ) *
                                      quantity
                                  )}
                                </span>
                              )}

                          </div>

                          <p className="text-[10px] text-gray-400 mt-2">
                            ✓ Delivery available
                          </p>

                        </div>

                      </div>

                      {/* BOTTOM ACTIONS */}

                      <div className="border-t border-[#eee6df] px-4 sm:px-5 py-3 flex items-center gap-6">

                        <button
                          type="button"
                          onClick={() =>
                            removeItem(
                              itemId,
                              size
                            )
                          }
                          disabled={
                            removingItem ===
                            removeKey
                          }
                          className="text-[9px] uppercase tracking-[0.15em] font-semibold text-gray-500 hover:text-[#d4845a] disabled:opacity-40"
                        >
                          {removingItem ===
                          removeKey
                            ? "Removing..."
                            : "Remove"}
                        </button>

                        <span className="text-[#ddd2c8]">
                          |
                        </span>

                        <button
                          type="button"
                          className="text-[9px] uppercase tracking-[0.15em] font-semibold text-gray-500 hover:text-[#3d5a45]"
                        >
                          Move to Wishlist
                        </button>

                      </div>

                    </div>
                  );
                })}

              </div>

            </div>

            {/* =================================================
                RIGHT — SUMMARY
            ================================================= */}

            <aside className="lg:sticky lg:top-6">

              {/* COUPONS */}

              <div className="bg-white border border-[#e2d8cf] p-6">

                <p className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-semibold">
                  Coupons
                </p>

                <div className="flex items-center justify-between mt-5">

                  <div className="flex items-center gap-3">

                    <span className="text-xl text-[#3d5a45]">
                      %
                    </span>

                    <span className="text-sm font-semibold">
                      Apply Coupon
                    </span>

                  </div>

                  <button
                    type="button"
                    className="border border-[#d4845a] text-[#d4845a] px-5 py-2 text-[9px] uppercase tracking-[0.12em] font-semibold hover:bg-[#d4845a] hover:text-white transition"
                  >
                    Apply
                  </button>

                </div>

                <p className="text-[10px] text-gray-500 mt-4 leading-5">
                  Have a coupon code? Apply it at
                  checkout to unlock available offers.
                </p>

              </div>

              {/* PRICE DETAILS */}

              <div className="bg-white border border-[#e2d8cf] p-6 mt-4">

                <p className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-semibold">
                  Price Details
                </p>

                <div className="space-y-4 mt-6">

                  <div className="flex justify-between text-sm">

                    <span className="text-gray-500">
                      Total MRP
                    </span>

                    <span>
                      {currency}
                      {formatPrice(subtotal)}
                    </span>

                  </div>

                  <div className="flex justify-between text-sm">

                    <span className="text-gray-500">
                      Discount
                    </span>

                    <span className="text-[#3d5a45]">
                      {currency}0
                    </span>

                  </div>

                  <div className="flex justify-between text-sm">

                    <span className="text-gray-500">
                      Delivery Charges
                    </span>

                    <span>
                      {deliveryFee === 0
                        ? "FREE"
                        : `${currency}${formatPrice(
                            deliveryFee
                          )}`}
                    </span>

                  </div>

                </div>

                <div className="border-t border-dashed border-[#d8ccc1] my-6" />

                <div className="flex justify-between items-end">

                  <span className="text-[10px] uppercase tracking-[0.15em] font-semibold">
                    Total Amount
                  </span>

                  <span className="text-2xl font-semibold text-[#3d5a45]">
                    {currency}
                    {formatPrice(totalAmount)}
                  </span>

                </div>

                {/* =================================================
                    PLACE ORDER
                ================================================= */}

                {/*
                  IMPORTANT:
                  Using Link here instead of onClick/navigate.
                  This directly navigates to the checkout route.
                */}

                <Link
                  to="/profile/checkout"
                  className="w-full mt-7 py-4 bg-[#3d5a45] text-white text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-[#d4845a] transition flex items-center justify-center"
                >
                  Place Order
                </Link>

                <p className="text-[9px] text-gray-400 text-center mt-4 leading-5">
                  By placing your order, you agree to
                  Aurevia's Terms of Use and Privacy Policy.
                </p>

              </div>

              {/* SECURITY */}

              <div className="border border-[#d8ccc1] mt-4 p-5 flex gap-4">

                <div className="w-10 h-10 bg-[#dce9df] rounded-full flex items-center justify-center text-[#3d5a45] flex-shrink-0">
                  ✓
                </div>

                <div>

                  <p className="text-[10px] uppercase tracking-[0.15em] font-semibold">
                    100% Secure Checkout
                  </p>

                  <p className="text-[10px] text-gray-400 leading-5 mt-1">
                    Your account and payment information
                    are protected with secure authentication.
                  </p>

                </div>

              </div>

              {/* TRUST */}

              <div className="grid grid-cols-3 gap-2 mt-4">

                <div className="bg-[#ebe2d8] p-3 text-center">

                  <p className="text-lg">
                    ♡
                  </p>

                  <p className="text-[8px] uppercase tracking-[0.1em] mt-1">
                    Quality
                  </p>

                </div>

                <div className="bg-[#ebe2d8] p-3 text-center">

                  <p className="text-lg">
                    ↺
                  </p>

                  <p className="text-[8px] uppercase tracking-[0.1em] mt-1">
                    Easy Returns
                  </p>

                </div>

                <div className="bg-[#ebe2d8] p-3 text-center">

                  <p className="text-lg">
                    ✓
                  </p>

                  <p className="text-[8px] uppercase tracking-[0.1em] mt-1">
                    Secure
                  </p>

                </div>

              </div>

            </aside>

          </div>

        </main>

      </div>
    </>
  );
}

export default Cart;