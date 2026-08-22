import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { ShopContext } from "../context/ShopContext.jsx";
import { UserContext } from "../context/UserContext.jsx";
import AuthContext from "../context/AuthContext.jsx";

function PlaceOrder() {
  const navigate = useNavigate();

  // =========================================================
  // SHOP CONTEXT
  // =========================================================

  const {
    products = [],
    currency = "₹",
    cartItems = {},
    getCartAmount,
    deliveryCharges = 0,
  } = useContext(ShopContext) || {};

  // =========================================================
  // USER CONTEXT
  // =========================================================

  const {
    user,
    getUserProfile,
  } = useContext(UserContext) || {};

  // =========================================================
  // AUTH CONTEXT
  // =========================================================

  const authContext =
    useContext(AuthContext) || {};

  const value =
    authContext.value || {};

  const serverurl =
    value?.serverurl;

  // =========================================================
  // FORM STATE
  // =========================================================

  const [formData, setFormData] =
    useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      pinCode: "",
      country: "India",
    });

  // =========================================================
  // PAYMENT STATE
  // =========================================================

  const [paymentMethod, setPaymentMethod] =
    useState("cod");

  // =========================================================
  // OTHER STATE
  // =========================================================

  const [placingOrder, setPlacingOrder] =
    useState(false);

  const [error, setError] =
    useState("");

  // =========================================================
  // LOAD USER PROFILE
  // =========================================================

  useEffect(() => {
    if (
      !user &&
      typeof getUserProfile === "function"
    ) {
      getUserProfile().catch((err) => {
        console.log(
          "Could not load user profile:",
          err
        );
      });
    }
  }, [user, getUserProfile]);

  // =========================================================
  // AUTO FILL USER DETAILS
  // =========================================================

  useEffect(() => {
    if (!user) return;

    const fullName =
      user.name ||
      user.fullName ||
      "";

    const nameParts =
      fullName
        .trim()
        .split(/\s+/);

    const firstName =
      user.firstName ||
      nameParts[0] ||
      "";

    const lastName =
      user.lastName ||
      nameParts
        .slice(1)
        .join(" ") ||
      "";

    setFormData((previous) => ({
      ...previous,

      firstName:
        previous.firstName ||
        firstName,

      lastName:
        previous.lastName ||
        lastName,

      email:
        previous.email ||
        user.email ||
        "",

      phone:
        previous.phone ||
        user.phone ||
        user.mobile ||
        "",
    }));
  }, [user]);

  // =========================================================
  // HANDLE INPUT
  // =========================================================

  const onChangeHandler = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  // =========================================================
  // CREATE ORDER ITEMS FROM CART
  // =========================================================

  const orderItems = useMemo(() => {
    const items = [];

    if (
      !cartItems ||
      !products ||
      products.length === 0
    ) {
      return items;
    }

    Object.keys(cartItems).forEach(
      (productId) => {
        const productSizes =
          cartItems[productId];

        if (!productSizes) return;

        Object.keys(productSizes).forEach(
          (size) => {
            const quantity =
              Number(
                productSizes[size]
              ) || 0;

            if (quantity <= 0) return;

            const product =
              products.find(
                (item) =>
                  String(
                    item._id || item.id
                  ) ===
                  String(productId)
              );

            if (!product) return;

            items.push({
              ...product,
              size,
              quantity,
            });
          }
        );
      }
    );

    return items;
  }, [cartItems, products]);

  // =========================================================
  // SUBTOTAL
  // =========================================================

  const subtotal = useMemo(() => {
    if (
      typeof getCartAmount ===
      "function"
    ) {
      const amount =
        Number(getCartAmount());

      if (!Number.isNaN(amount)) {
        return amount;
      }
    }

    return orderItems.reduce(
      (total, item) => {
        return (
          total +
          Number(item.price || 0) *
            Number(item.quantity || 0)
        );
      },
      0
    );
  }, [getCartAmount, orderItems]);

  // =========================================================
  // DELIVERY
  // =========================================================

  const deliveryCharge =
    Number(deliveryCharges) || 0;

  // =========================================================
  // TOTAL
  // =========================================================

  const totalAmount =
    subtotal + deliveryCharge;

  // =========================================================
  // RAZORPAY KEY
  // =========================================================

  const razorpayKey =
    import.meta.env
      .VITE_RAZORPAY_KEY_ID;

  // =========================================================
  // VALIDATE FORM
  // =========================================================

  const validateForm = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "street",
      "city",
      "state",
      "pinCode",
    ];

    for (
      const field of requiredFields
    ) {
      if (
        !String(
          formData[field] || ""
        ).trim()
      ) {
        return false;
      }
    }

    return true;
  };

  // =========================================================
  // OPEN RAZORPAY
  // =========================================================

  const openRazorpayCheckout = async (
    orderData
  ) => {
    try {
      // -------------------------------------------------------
      // CHECK RAZORPAY SCRIPT
      // -------------------------------------------------------

      if (
        typeof window.Razorpay !==
        "function"
      ) {
        setError(
          "Razorpay Checkout could not be loaded. Please refresh the page and try again."
        );

        return;
      }

      // -------------------------------------------------------
      // CHECK RAZORPAY KEY
      // -------------------------------------------------------

      if (!razorpayKey) {
        console.error(
          "Razorpay Key is missing"
        );

        setError(
          "Razorpay is not configured. Please check your frontend .env file."
        );

        return;
      }

      // -------------------------------------------------------
      // CREATE RAZORPAY ORDER
      // -------------------------------------------------------

      console.log(
        "========== CREATING RAZORPAY ORDER =========="
      );

      const response =
        await axios.post(
          `/api/order/razorpay`,
          orderData,
          {
            withCredentials: true,
          }
        );

      console.log(
        "RAZORPAY BACKEND RESPONSE:",
        response.data
      );

      if (
        !response.data?.success
      ) {
        setError(
          response.data?.message ||
            "Unable to create Razorpay order."
        );

        return;
      }

      const razorpayOrder =
        response.data?.razorpayOrder;

      const databaseOrderId =
        response.data?.orderId;

      if (!razorpayOrder?.id) {
        setError(
          "Razorpay order ID was not returned by the server."
        );

        return;
      }

      // -------------------------------------------------------
      // RAZORPAY CHECKOUT OPTIONS
      // -------------------------------------------------------

      const options = {
        key: razorpayKey,

        amount:
          razorpayOrder.amount,

        currency:
          razorpayOrder.currency ||
          "INR",

        name: "Aurevia",

        description:
          "Aurevia Order Payment",

        order_id:
          razorpayOrder.id,

        prefill: {
          name:
            `${formData.firstName} ${formData.lastName}`.trim(),

          email:
            formData.email,

          contact:
            formData.phone,
        },

        notes: {
          address:
            `${formData.street}, ${formData.city}, ${formData.state}, ${formData.pinCode}, ${formData.country}`,
        },

        theme: {
          color: "#3d5a45",
        },

        // -----------------------------------------------------
        // PAYMENT SUCCESS
        // -----------------------------------------------------

        handler: async function (
          razorpayResponse
        ) {
          try {
            console.log(
              "========== RAZORPAY SUCCESS =========="
            );

            console.log(
              "RAZORPAY RESPONSE:",
              razorpayResponse
            );

            // -------------------------------------------------
            // VERIFY PAYMENT ON BACKEND
            // -------------------------------------------------

            const verifyResponse =
              await axios.post(
                `/api/order/verifyrazorpay`,
                {
                  razorpay_payment_id:
                    razorpayResponse.razorpay_payment_id,

                  razorpay_order_id:
                    razorpayResponse.razorpay_order_id,

                  razorpay_signature:
                    razorpayResponse.razorpay_signature,

                  orderId:
                    databaseOrderId,
                },
                {
                  withCredentials: true,
                }
              );

            console.log(
              "VERIFY RESPONSE:",
              verifyResponse.data
            );

            if (
              !verifyResponse.data
                ?.success
            ) {
              setError(
                verifyResponse.data
                  ?.message ||
                  "Payment verification failed."
              );

              return;
            }

            // -------------------------------------------------
            // PAYMENT VERIFIED
            // -------------------------------------------------

            console.log(
              "✅ PAYMENT VERIFIED SUCCESSFULLY"
            );

            navigate(
              "/profile/orders",
              {
                state: {
                  order:
                    verifyResponse.data,
                  paymentMethod:
                    "RAZORPAY",
                },
              }
            );
          } catch (verifyError) {
            console.error(
              "❌ PAYMENT VERIFICATION ERROR:",
              verifyError
            );

            console.error(
              "Backend response:",
              verifyError?.response
                ?.data
            );

            setError(
              verifyError?.response
                ?.data?.message ||
                "Payment was completed but verification failed. Please contact support."
            );
          } finally {
            setPlacingOrder(false);
          }
        },

        // -----------------------------------------------------
        // PAYMENT FAILURE
        // -----------------------------------------------------

        modal: {
          ondismiss: function () {
            console.log(
              "Razorpay checkout closed."
            );

            setPlacingOrder(false);
          },
        },
      };

      console.log(
        "RAZORPAY CHECKOUT OPTIONS:",
        {
          ...options,
          key: razorpayKey
            ? "KEY_PRESENT"
            : "KEY_MISSING",
        }
      );

      // -------------------------------------------------------
      // OPEN RAZORPAY
      // -------------------------------------------------------

      const razorpay =
        new window.Razorpay(
          options
        );

      razorpay.on(
        "payment.failed",
        function (response) {
          console.error(
            "❌ RAZORPAY PAYMENT FAILED:",
            response
          );

          setError(
            response?.error
              ?.description ||
              "Payment failed. Please try again."
          );

          setPlacingOrder(false);
        }
      );

      razorpay.open();
    } catch (error) {
      console.error(
        "❌ ERROR OPENING RAZORPAY:",
        error
      );

      console.error(
        "Backend response:",
        error?.response?.data
      );

      setError(
        error?.response?.data
          ?.message ||
          "Unable to start Razorpay payment."
      );

      setPlacingOrder(false);
    }
  };

  // =========================================================
  // SUBMIT ORDER
  // =========================================================

  const submitOrder = async (
    event
  ) => {
    event.preventDefault();

    setError("");

    // ---------------------------------------------------------
    // CHECK LOGIN
    // ---------------------------------------------------------

    if (!user) {
      setError(
        "Please login before placing your order."
      );

      return;
    }

    // ---------------------------------------------------------
    // CHECK CART
    // ---------------------------------------------------------

    if (
      orderItems.length === 0
    ) {
      setError(
        "Your cart is empty. Please add products before placing your order."
      );

      return;
    }

    // ---------------------------------------------------------
    // CHECK FORM
    // ---------------------------------------------------------

    if (!validateForm()) {
      setError(
        "Please fill in all the required delivery details."
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    // ---------------------------------------------------------
    // CHECK SERVER URL
    // ---------------------------------------------------------

    if (!serverurl) {
      setError(
        "Server URL is not configured."
      );

      console.error(
        "serverurl is missing from AuthContext"
      );

      return;
    }

    // ---------------------------------------------------------
    // CHECK RAZORPAY KEY
    // ---------------------------------------------------------

    if (
      paymentMethod ===
        "razorpay" &&
      !razorpayKey
    ) {
      setError(
        "Razorpay key is missing. Please check frontend/.env."
      );

      console.error(
        "Missing VITE_RAZORPAY_KEY_ID"
      );

      return;
    }

    try {
      setPlacingOrder(true);

      // =======================================================
      // ORDER DATA
      // =======================================================

      const orderData = {
        address: {
          firstName:
            formData.firstName.trim(),

          lastName:
            formData.lastName.trim(),

          email:
            formData.email.trim(),

          phone:
            formData.phone.trim(),

          street:
            formData.street.trim(),

          city:
            formData.city.trim(),

          state:
            formData.state.trim(),

          pinCode:
            formData.pinCode.trim(),

          country:
            formData.country.trim(),
        },

        items:
          orderItems.map((item) => ({
            productId:
              item._id,

            name:
              item.name,

            image:
              item.image1 ||
              item.image ||
              "",

            price:
              Number(
                item.price || 0
              ),

            size:
              item.size,

            quantity:
              Number(
                item.quantity || 0
              ),
          })),

        amount:
          Number(totalAmount),

        paymentMethod:
          paymentMethod ===
          "razorpay"
            ? "RAZORPAY"
            : "COD",
      };

      console.log(
        "================================"
      );

      console.log(
        "🛍️ ORDER DATA"
      );

      console.log(
        orderData
      );

      console.log(
        "👤 USER"
      );

      console.log(
        user
      );

      console.log(
        "💳 PAYMENT METHOD"
      );

      console.log(
        paymentMethod
      );

      console.log(
        "🌐 SERVER URL"
      );

      console.log(
        serverurl
      );

      console.log(
        "================================"
      );

      // =======================================================
      // COD
      // =======================================================

      if (
        paymentMethod ===
        "cod"
      ) {
        console.log(
          "========== COD ORDER =========="
        );

        const response =
          await axios.post(
            `/api/order/placeorder`,
            orderData,
            {
              withCredentials: true,
            }
          );

        console.log(
          "✅ COD ORDER RESPONSE:",
          response.data
        );

        if (
          response.data
            ?.success === false
        ) {
          setError(
            response.data
              ?.message ||
              "Unable to place the order."
          );

          return;
        }

        // -----------------------------------------------------
        // COD SUCCESS
        // -----------------------------------------------------

        navigate(
          "/profile/orders",
          {
            state: {
              order:
                response.data,
              paymentMethod:
                "COD",
            },
          }
        );

        return;
      }

      // =======================================================
      // RAZORPAY
      // =======================================================

      if (
        paymentMethod ===
        "razorpay"
      ) {
        console.log(
          "========== RAZORPAY ORDER =========="
        );

        await openRazorpayCheckout(
          orderData
        );

        return;
      }
    } catch (err) {
      console.error(
        "❌ PLACE ORDER ERROR:",
        err
      );

      console.error(
        "Backend response:",
        err?.response?.data
      );

      if (
        err?.response?.status ===
        401
      ) {
        setError(
          "Your login session has expired. Please login again."
        );

        return;
      }

      setError(
        err?.response?.data
          ?.message ||
          "Something went wrong while placing your order."
      );

      setPlacingOrder(false);
    }
  };

  // =========================================================
  // EMPTY CART
  // =========================================================

  if (
    orderItems.length === 0
  ) {
    return (
      <main className="min-h-screen bg-[#fdf5ee] text-[#2a2a2a]">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 py-24">
          <div className="text-center">

            <span className="text-[9px] uppercase tracking-[0.35em] text-[#d4845a]">
              Your Bag
            </span>

            <h1
              className="mt-4 text-5xl md:text-6xl"
              style={{
                fontFamily:
                  "'Cormorant Garamond', serif",
              }}
            >
              Your cart is empty
            </h1>

            <p className="mt-4 text-sm text-gray-500">
              Add something beautiful to
              your bag before continuing
              to checkout.
            </p>

            <Link
              to="/profile/collection"
              className="inline-flex mt-8 items-center justify-center bg-[#3d5a45] text-white px-8 py-4 text-[9px] uppercase tracking-[0.2em] hover:bg-[#d4845a] transition"
            >
              Continue Shopping
            </Link>

          </div>
        </div>
      </main>
    );
  }

  // =========================================================
  // MAIN PAGE
  // =========================================================

  return (
    <main className="min-h-screen bg-[#fdf5ee] text-[#2a2a2a]">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        .place-order-page {
          font-family: 'DM Sans', sans-serif;
        }

        .place-order-serif {
          font-family: 'Cormorant Garamond', serif;
        }

        .place-input::placeholder {
          color: #aaa39c;
        }

        .place-input:focus {
          outline: none;
          border-color: #d4845a;
        }
      `}</style>

      <div className="place-order-page">

        {/* ===================================================
            PROGRESS
        ==================================================== */}

        <section className="border-b border-[#e4d7cc]">

          <div className="max-w-7xl mx-auto px-6 lg:px-12">

            <div className="py-8 flex items-center gap-4">

              <div className="w-8 h-8 rounded-full bg-[#3d5a45] text-white flex items-center justify-center text-xs">
                1
              </div>

              <span className="text-[9px] uppercase tracking-[0.2em] text-[#3d5a45]">
                Address
              </span>

              <div className="w-10 h-px bg-[#d8cdc3]" />

              <div className="w-8 h-8 rounded-full border border-[#d8cdc3] text-gray-400 flex items-center justify-center text-xs">
                2
              </div>

              <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400">
                Payment
              </span>

            </div>

          </div>

        </section>

        {/* ===================================================
            FORM
        ==================================================== */}

        <form
          onSubmit={submitOrder}
          className="max-w-7xl mx-auto px-6 lg:px-12 py-14 lg:py-20"
        >

          {/* HEADER */}

          <div className="mb-12">

            <span className="text-[9px] uppercase tracking-[0.35em] text-[#d4845a]">
              Checkout
            </span>

            <h1 className="place-order-serif mt-3 text-5xl md:text-6xl">
              Place your order.
            </h1>

            <p className="mt-3 text-sm text-gray-500">
              Complete your delivery details
              and choose your preferred payment
              method.
            </p>

          </div>

          {/* ERROR */}

          {error && (
            <div className="mb-8 border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* TWO COLUMNS */}

          <div className="grid lg:grid-cols-[1fr_380px] gap-12 lg:gap-20 items-start">

            {/* =================================================
                LEFT
            ================================================== */}

            <div>

              {/* DELIVERY */}

              <section>

                <div className="flex items-center gap-4 mb-7">

                  <div className="w-10 h-10 rounded-full bg-[#3d5a45] text-white flex items-center justify-center">
                    <span className="text-xs">
                      01
                    </span>
                  </div>

                  <div>

                    <h2 className="place-order-serif text-3xl">
                      Delivery details
                    </h2>

                    <p className="text-[10px] text-gray-500">
                      Where should we deliver
                      your order?
                    </p>

                  </div>

                </div>

                {/* FORM FIELDS */}

                <div className="grid sm:grid-cols-2 gap-4">

                  {/* FIRST NAME */}

                  <div>

                    <label className="block mb-2 text-[9px] uppercase tracking-[0.18em] text-gray-500">
                      First Name *
                    </label>

                    <input
                      type="text"
                      name="firstName"
                      value={
                        formData.firstName
                      }
                      onChange={
                        onChangeHandler
                      }
                      placeholder="First name"
                      className="place-input w-full border border-[#d8cdc3] bg-white px-4 py-3.5 text-sm"
                    />

                  </div>

                  {/* LAST NAME */}

                  <div>

                    <label className="block mb-2 text-[9px] uppercase tracking-[0.18em] text-gray-500">
                      Last Name *
                    </label>

                    <input
                      type="text"
                      name="lastName"
                      value={
                        formData.lastName
                      }
                      onChange={
                        onChangeHandler
                      }
                      placeholder="Last name"
                      className="place-input w-full border border-[#d8cdc3] bg-white px-4 py-3.5 text-sm"
                    />

                  </div>

                  {/* EMAIL */}

                  <div>

                    <label className="block mb-2 text-[9px] uppercase tracking-[0.18em] text-gray-500">
                      Email *
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={
                        formData.email
                      }
                      onChange={
                        onChangeHandler
                      }
                      placeholder="you@example.com"
                      className="place-input w-full border border-[#d8cdc3] bg-white px-4 py-3.5 text-sm"
                    />

                  </div>

                  {/* PHONE */}

                  <div>

                    <label className="block mb-2 text-[9px] uppercase tracking-[0.18em] text-gray-500">
                      Phone Number *
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={
                        formData.phone
                      }
                      onChange={
                        onChangeHandler
                      }
                      placeholder="+91"
                      className="place-input w-full border border-[#d8cdc3] bg-white px-4 py-3.5 text-sm"
                    />

                  </div>

                  {/* ADDRESS */}

                  <div className="sm:col-span-2">

                    <label className="block mb-2 text-[9px] uppercase tracking-[0.18em] text-gray-500">
                      Address *
                    </label>

                    <input
                      type="text"
                      name="street"
                      value={
                        formData.street
                      }
                      onChange={
                        onChangeHandler
                      }
                      placeholder="House number, street, area"
                      className="place-input w-full border border-[#d8cdc3] bg-white px-4 py-3.5 text-sm"
                    />

                  </div>

                  {/* CITY */}

                  <div>

                    <label className="block mb-2 text-[9px] uppercase tracking-[0.18em] text-gray-500">
                      City *
                    </label>

                    <input
                      type="text"
                      name="city"
                      value={
                        formData.city
                      }
                      onChange={
                        onChangeHandler
                      }
                      placeholder="City"
                      className="place-input w-full border border-[#d8cdc3] bg-white px-4 py-3.5 text-sm"
                    />

                  </div>

                  {/* STATE */}

                  <div>

                    <label className="block mb-2 text-[9px] uppercase tracking-[0.18em] text-gray-500">
                      State *
                    </label>

                    <input
                      type="text"
                      name="state"
                      value={
                        formData.state
                      }
                      onChange={
                        onChangeHandler
                      }
                      placeholder="State"
                      className="place-input w-full border border-[#d8cdc3] bg-white px-4 py-3.5 text-sm"
                    />

                  </div>

                  {/* PIN */}

                  <div>

                    <label className="block mb-2 text-[9px] uppercase tracking-[0.18em] text-gray-500">
                      PIN Code *
                    </label>

                    <input
                      type="text"
                      name="pinCode"
                      value={
                        formData.pinCode
                      }
                      onChange={
                        onChangeHandler
                      }
                      placeholder="6-digit PIN code"
                      maxLength={6}
                      className="place-input w-full border border-[#d8cdc3] bg-white px-4 py-3.5 text-sm"
                    />

                  </div>

                  {/* COUNTRY */}

                  <div>

                    <label className="block mb-2 text-[9px] uppercase tracking-[0.18em] text-gray-500">
                      Country
                    </label>

                    <input
                      type="text"
                      name="country"
                      value={
                        formData.country
                      }
                      onChange={
                        onChangeHandler
                      }
                      className="place-input w-full border border-[#d8cdc3] bg-white px-4 py-3.5 text-sm"
                    />

                  </div>

                </div>

              </section>

              {/* =================================================
                  PAYMENT METHOD
              ================================================== */}

              <section className="mt-12">

                <div className="flex items-center gap-4 mb-7">

                  <div className="w-10 h-10 rounded-full bg-[#3d5a45] text-white flex items-center justify-center">
                    <span className="text-xs">
                      02
                    </span>
                  </div>

                  <div>

                    <h2 className="place-order-serif text-3xl">
                      Payment method
                    </h2>

                    <p className="text-[10px] text-gray-500">
                      Choose how you'd like to
                      pay.
                    </p>

                  </div>

                </div>

                <div className="space-y-4">

                  {/* COD */}

                  <label
                    className={`
                      flex items-center gap-4
                      border
                      px-5
                      py-5
                      bg-white
                      cursor-pointer
                      transition
                      ${
                        paymentMethod ===
                        "cod"
                          ? "border-[#3d5a45] ring-1 ring-[#3d5a45]"
                          : "border-[#d8cdc3]"
                      }
                    `}
                  >

                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={
                        paymentMethod ===
                        "cod"
                      }
                      onChange={(e) => {
                        setPaymentMethod(
                          e.target.value
                        );
                        setError("");
                      }}
                      className="accent-[#3d5a45]"
                    />

                    <div>

                      <p className="text-sm font-medium">
                        Cash on Delivery
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Pay when your order
                        arrives.
                      </p>

                    </div>

                  </label>

                  {/* RAZORPAY */}

                  <label
                    className={`
                      flex items-center gap-4
                      border
                      px-5
                      py-5
                      bg-white
                      cursor-pointer
                      transition
                      ${
                        paymentMethod ===
                        "razorpay"
                          ? "border-[#3d5a45] ring-1 ring-[#3d5a45]"
                          : "border-[#d8cdc3]"
                      }
                    `}
                  >

                    <input
                      type="radio"
                      name="paymentMethod"
                      value="razorpay"
                      checked={
                        paymentMethod ===
                        "razorpay"
                      }
                      onChange={(e) => {
                        setPaymentMethod(
                          e.target.value
                        );
                        setError("");
                      }}
                      className="accent-[#3d5a45]"
                    />

                    <div>

                      <p className="text-sm font-medium">
                        Pay Online
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        UPI, Cards, Net Banking
                        & more via Razorpay.
                      </p>

                    </div>

                  </label>

                </div>

              </section>

            </div>

            {/* =================================================
                ORDER SUMMARY
            ================================================== */}

            <aside className="lg:sticky lg:top-8 border border-[#ded2c7] bg-white">

              {/* HEADER */}

              <div className="px-6 py-6 border-b border-[#e4d7cc]">

                <span className="text-[9px] uppercase tracking-[0.3em] text-[#d4845a]">
                  Your Selection
                </span>

                <h2 className="place-order-serif mt-2 text-3xl">
                  Order Summary
                </h2>

              </div>

              {/* ITEMS */}

              <div className="px-6 py-5 max-h-[420px] overflow-y-auto">

                {orderItems.map(
                  (item, index) => (
                    <div
                      key={`${item._id}-${item.size}-${index}`}
                      className={`
                        flex
                        gap-4
                        ${
                          index !== 0
                            ? "pt-5 mt-5 border-t border-[#eee5de]"
                            : ""
                        }
                      `}
                    >

                      {/* IMAGE */}

                      <div className="w-20 h-24 flex-shrink-0 overflow-hidden bg-[#eee3d9]">

                        <img
                          src={
                            item.image1 ||
                            item.image ||
                            ""
                          }
                          alt={
                            item.name ||
                            "Product"
                          }
                          className="w-full h-full object-cover"
                        />

                      </div>

                      {/* INFO */}

                      <div className="min-w-0 flex-1">

                        <p className="text-[8px] uppercase tracking-[0.15em] text-gray-400">
                          {item.category ||
                            "Aurevia"}
                        </p>

                        <h3 className="mt-1 text-sm leading-5 font-medium">
                          {item.name}
                        </h3>

                        <div className="mt-2 flex gap-3 text-[10px] text-gray-500">

                          <span>
                            Size:{" "}
                            {item.size}
                          </span>

                          <span>
                            Qty:{" "}
                            {item.quantity}
                          </span>

                        </div>

                        <p className="mt-2 text-sm text-[#d4845a]">

                          {currency}

                          {(
                            Number(
                              item.price ||
                                0
                            ) *
                            Number(
                              item.quantity ||
                                0
                            )
                          ).toFixed(2)}

                        </p>

                      </div>

                    </div>
                  )
                )}

              </div>

              {/* TOTALS */}

              <div className="border-t border-[#e4d7cc] px-6 py-6">

                {/* SUBTOTAL */}

                <div className="flex justify-between text-xs">

                  <span className="text-gray-500">
                    Subtotal
                  </span>

                  <span>
                    {currency}
                    {subtotal.toFixed(
                      2
                    )}
                  </span>

                </div>

                {/* DELIVERY */}

                <div className="flex justify-between text-xs mt-3">

                  <span className="text-gray-500">
                    Delivery
                  </span>

                  <span>
                    {deliveryCharge ===
                    0
                      ? "FREE"
                      : `${currency}${deliveryCharge.toFixed(
                          2
                        )}`}
                  </span>

                </div>

                {/* TOTAL */}

                <div className="border-t border-[#e4d7cc] mt-5 pt-5 flex justify-between items-end">

                  <div>

                    <p className="text-[8px] uppercase tracking-[0.2em] text-gray-400">
                      Total
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Inclusive of all
                      applicable charges
                    </p>

                  </div>

                  <span className="place-order-serif text-3xl text-[#d4845a]">
                    {currency}
                    {totalAmount.toFixed(
                      2
                    )}
                  </span>

                </div>

                {/* PLACE ORDER */}

                <button
                  type="submit"
                  disabled={placingOrder}
                  className="
                    mt-6
                    w-full
                    bg-[#3d5a45]
                    text-white
                    py-4
                    text-[9px]
                    uppercase
                    tracking-[0.25em]
                    hover:bg-[#d4845a]
                    disabled:opacity-60
                    disabled:cursor-not-allowed
                    transition-all
                  "
                >
                  {placingOrder
                    ? paymentMethod ===
                      "razorpay"
                      ? "Opening Payment..."
                      : "Placing Order..."
                    : paymentMethod ===
                      "razorpay"
                    ? "Pay with Razorpay"
                    : "Place Order"}
                </button>

                <Link
                  to="/profile/cart"
                  className="
                    block
                    mt-4
                    text-center
                    text-[9px]
                    uppercase
                    tracking-[0.2em]
                    text-gray-400
                    hover:text-[#d4845a]
                    transition
                  "
                >
                  ← Back to Cart
                </Link>

              </div>

            </aside>

          </div>

        </form>

      </div>

    </main>
  );
}

export default PlaceOrder;
