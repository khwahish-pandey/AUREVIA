import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext.jsx";

function Orders() {
  const navigate = useNavigate();

  // =========================================================
  // AUTH CONTEXT
  // =========================================================

  const authContext = useContext(AuthContext) || {};
  const value = authContext.value || {};

  const serverurl = value?.serverurl;

  // =========================================================
  // STATE
  // =========================================================

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // FETCH USER ORDERS
  // =========================================================

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      if (!serverurl) {
        console.error(
          "serverurl is missing from AuthContext"
        );

        setError(
          "Server URL is not configured."
        );

        setLoading(false);
        return;
      }

      console.log(
        "================================"
      );

      console.log("📦 FETCHING USER ORDERS");
      console.log(
        "🌐 SERVER URL:",
        serverurl
      );

      console.log(
        "================================"
      );

      const response = await axios.get(
        `${serverurl}/api/order/userorders`,
        {
          withCredentials: true,
        }
      );

      console.log(
        "✅ ORDERS RESPONSE:",
        response.data
      );

      if (response.data?.success) {
        const fetchedOrders =
          response.data.orders || [];

        fetchedOrders.sort(
          (a, b) =>
            new Date(b.date) -
            new Date(a.date)
        );

        setOrders(fetchedOrders);
      } else {
        setError(
          response.data?.message ||
            "Unable to fetch orders."
        );
      }
    } catch (err) {
      console.error(
        "❌ FETCH ORDERS ERROR:",
        err
      );

      console.error(
        "Backend response:",
        err?.response?.data
      );

      if (err?.response?.status === 401) {
        setError(
          "Your login session has expired. Please login again."
        );

        return;
      }

      setError(
        err?.response?.data?.message ||
          "Something went wrong while fetching your orders."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // FETCH WHEN PAGE LOADS
  // =========================================================

  useEffect(() => {
    if (serverurl) {
      fetchOrders();
    }
  }, [serverurl]);

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =========================================================
  // FORMAT PRICE
  // =========================================================

  const formatPrice = (price) => {
    return `₹${Number(
      price || 0
    ).toLocaleString("en-IN")}`;
  };

  // =========================================================
  // PRODUCT NAME
  // =========================================================

  const getProductName = (item) => {
    return (
      item?.name ||
      item?.productName ||
      item?.title ||
      "Product"
    );
  };

  // =========================================================
  // PRODUCT IMAGE
  // =========================================================

  const getProductImage = (item) => {
    if (Array.isArray(item?.image)) {
      return item.image[0];
    }

    if (Array.isArray(item?.images)) {
      return item.images[0];
    }

    return (
      item?.image1 ||
      item?.image ||
      item?.images ||
      ""
    );
  };

  // =========================================================
  // PRODUCT PRICE
  // =========================================================

  const getProductPrice = (item) => {
    return (
      item?.price ||
      item?.amount ||
      item?.productPrice ||
      0
    );
  };

  // =========================================================
  // PRODUCT QUANTITY
  // =========================================================

  const getProductQuantity = (item) => {
    return (
      item?.quantity ||
      item?.qty ||
      1
    );
  };

  // =========================================================
  // PAYMENT STATUS
  // =========================================================

  const getPaymentStatus = (order) => {
    if (order?.payment) {
      return "Paid";
    }

    if (
      order?.paymentMethod?.toLowerCase() ===
      "cod"
    ) {
      return "Cash on Delivery";
    }

    return "Pending";
  };

  // =========================================================
  // ORDER STATUS
  // =========================================================

  const getOrderStatus = (order) => {
    return order?.status || "Order Placed";
  };

  // =========================================================
  // STATUS INDEX
  // =========================================================

  const getStatusIndex = (status) => {
    const statuses = [
      "Order Placed",
      "Processing",
      "Shipped",
      "Out for Delivery",
      "Delivered",
    ];

    return statuses.findIndex(
      (item) =>
        item.toLowerCase() ===
        status?.toLowerCase()
    );
  };

  // =========================================================
  // ADDRESS
  // =========================================================

  const getAddress = (address) => {
    if (!address) {
      return "Address unavailable";
    }

    if (typeof address === "string") {
      return address;
    }

    return [
      address.firstName,
      address.lastName,
      address.street,
      address.city,
      address.state,
      address.pinCode,
      address.country,
    ]
      .filter(Boolean)
      .join(", ");
  };

  // =========================================================
  // STATUS COLOR
  // =========================================================

  const getStatusColor = (status) => {
    switch (
      status?.toLowerCase()
    ) {
      case "delivered":
        return "bg-[#e6f0e7] text-[#426247]";

      case "shipped":
        return "bg-[#e8eef7] text-[#4b6382]";

      case "out for delivery":
        return "bg-[#f5eddf] text-[#876d42]";

      case "processing":
        return "bg-[#eee9f5] text-[#69547f]";

      case "cancelled":
        return "bg-[#f5e5e3] text-[#87524b]";

      default:
        return "bg-[#f1ebe5] text-[#6c6259]";
    }
  };

  // =========================================================
  // STATUS ICON
  // =========================================================

  const StatusIcon = ({
    completed,
    active,
  }) => {
    return (
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all ${
          completed || active
            ? "border-[#3d5a45] bg-[#3d5a45] text-white"
            : "border-[#d8cec5] bg-white text-[#aaa19a]"
        }`}
      >
        {completed ? (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M5 12L10 17L19 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <div className="h-2 w-2 rounded-full bg-current" />
        )}
      </div>
    );
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fdf5ee] text-[#2a2a2a]">

        <section className="border-b border-[#e4d7cc]">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">

            <span className="text-[9px] uppercase tracking-[0.35em] text-[#d4845a]">
              Aurevis
            </span>

            <h1
              className="mt-3 text-5xl md:text-6xl"
              style={{
                fontFamily:
                  "'Cormorant Garamond', serif",
              }}
            >
              Your Orders
            </h1>

            <p className="mt-3 text-sm text-gray-500">
              View your order history and
              track your purchases.
            </p>

          </div>
        </section>

        <div className="flex min-h-[450px] items-center justify-center">

          <div className="text-center">

            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#ddd1c7] border-t-[#3d5a45]" />

            <p className="mt-4 text-xs text-gray-500">
              Loading your orders...
            </p>

          </div>

        </div>

      </main>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error) {
    return (
      <main className="min-h-screen bg-[#fdf5ee] text-[#2a2a2a]">

        <section className="border-b border-[#e4d7cc]">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">

            <span className="text-[9px] uppercase tracking-[0.35em] text-[#d4845a]">
              Aurevis
            </span>

            <h1
              className="mt-3 text-5xl md:text-6xl"
              style={{
                fontFamily:
                  "'Cormorant Garamond', serif",
              }}
            >
              Your Orders
            </h1>

          </div>
        </section>

        <div className="flex min-h-[450px] items-center justify-center px-6">

          <div className="max-w-md text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#ded2c7] text-lg text-[#77716a]">
              !
            </div>

            <h2
              className="mt-6 text-3xl"
              style={{
                fontFamily:
                  "'Cormorant Garamond', serif",
              }}
            >
              Unable to load orders
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              {error}
            </p>

            <div className="mt-7 flex justify-center gap-3">

              {error.includes("login") && (
                <button
                  onClick={() =>
                    navigate("/login")
                  }
                  className="bg-[#3d5a45] px-7 py-3 text-[9px] uppercase tracking-[0.2em] text-white transition hover:bg-[#d4845a]"
                >
                  Login
                </button>
              )}

              <button
                onClick={fetchOrders}
                className="border border-[#d8cdc3] bg-white px-7 py-3 text-[9px] uppercase tracking-[0.2em] text-gray-600 transition hover:bg-[#f5eee8]"
              >
                Try Again
              </button>

            </div>

          </div>

        </div>

      </main>
    );
  }

  // =========================================================
  // EMPTY ORDERS
  // =========================================================

  if (orders.length === 0) {
    return (
      <main className="min-h-screen bg-[#fdf5ee] text-[#2a2a2a]">

        <section className="border-b border-[#e4d7cc]">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">

            <span className="text-[9px] uppercase tracking-[0.35em] text-[#d4845a]">
              Aurevis
            </span>

            <h1
              className="mt-3 text-5xl md:text-6xl"
              style={{
                fontFamily:
                  "'Cormorant Garamond', serif",
              }}
            >
              Your Orders
            </h1>

          </div>
        </section>

        <div className="flex min-h-[500px] items-center justify-center px-6">

          <div className="text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#ded2c7] text-[#77716a]">

              <svg
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 7H18L20 21H4L6 7Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />

                <path
                  d="M9 7C9 4.8 10.34 3 12 3C13.66 3 15 4.8 15 7"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />

              </svg>

            </div>

            <h2
              className="mt-7 text-3xl"
              style={{
                fontFamily:
                  "'Cormorant Garamond', serif",
              }}
            >
              No orders yet
            </h2>

            <p className="mt-3 text-sm text-gray-500">
              You haven't placed any orders
              with Aurevis yet.
            </p>

            <button
              onClick={() =>
                navigate("/profile/collection")
              }
              className="mt-8 bg-[#3d5a45] px-8 py-4 text-[9px] uppercase tracking-[0.2em] text-white transition hover:bg-[#d4845a]"
            >
              Continue Shopping
            </button>

          </div>

        </div>

      </main>
    );
  }

  // =========================================================
  // ORDERS PAGE
  // =========================================================

  return (
    <main className="min-h-screen bg-[#fdf5ee] text-[#2a2a2a]">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        .orders-page {
          font-family: 'DM Sans', sans-serif;
        }

        .orders-serif {
          font-family: 'Cormorant Garamond', serif;
        }
      `}</style>

      <div className="orders-page">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <section className="border-b border-[#e4d7cc]">

          <div className="mx-auto max-w-7xl px-6 py-14 lg:px-12 lg:py-20">

            <span className="text-[9px] uppercase tracking-[0.35em] text-[#d4845a]">
              Aurevis
            </span>

            <h1 className="orders-serif mt-3 text-5xl md:text-6xl">
              Your Orders
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
              Track your purchases and revisit
              everything you've ordered from Aurevis.
            </p>

          </div>

        </section>

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <section className="mx-auto max-w-7xl px-5 py-10 lg:px-12 lg:py-14">

          {/* TOP BAR */}

          <div className="mb-6 flex items-center justify-between">

            <p className="text-sm">

              <span className="font-semibold">
                {orders.length}
              </span>

              <span className="ml-1 text-gray-500">
                {orders.length === 1
                  ? "order"
                  : "orders"}
              </span>

            </p>

            <button
              onClick={fetchOrders}
              className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-gray-500 transition hover:text-black"
            >

              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M20 11A8 8 0 0 0 5.5 6.5L4 8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M4 4V8H8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M4 13A8 8 0 0 0 18.5 17.5L20 16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M20 20V16H16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

              </svg>

              Refresh

            </button>

          </div>

          {/* =====================================================
              ORDER CARDS
          ===================================================== */}

          <div className="space-y-7">

            {orders.map(
              (order, index) => {

                const orderItems =
                  Array.isArray(
                    order.items
                  )
                    ? order.items
                    : [];

                const paymentStatus =
                  getPaymentStatus(
                    order
                  );

                const orderStatus =
                  getOrderStatus(
                    order
                  );

                const statusIndex =
                  getStatusIndex(
                    orderStatus
                  );

                const isCancelled =
                  orderStatus.toLowerCase() ===
                  "cancelled";

                return (
                  <article
                    key={
                      order._id ||
                      order.id ||
                      index
                    }
                    className="overflow-hidden border border-[#ded2c7] bg-white"
                  >

                    {/* =================================================
                        ORDER HEADER
                    ================================================= */}

                    <div className="flex flex-col gap-5 border-b border-[#e8ddd5] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">

                      <div className="flex flex-wrap gap-x-12 gap-y-4">

                        <div>
                          <p className="mb-1 text-[8px] uppercase tracking-[0.2em] text-gray-400">
                            Order
                          </p>

                          <p className="text-xs font-medium tracking-wide">
                            #
                            {String(
                              order._id ||
                                order.id ||
                                ""
                            )
                              .slice(-8)
                              .toUpperCase()}
                          </p>
                        </div>

                        <div>
                          <p className="mb-1 text-[8px] uppercase tracking-[0.2em] text-gray-400">
                            Placed On
                          </p>

                          <p className="text-xs font-medium">
                            {formatDate(
                              order.date
                            )}
                          </p>
                        </div>

                      </div>

                      <div className="flex items-center justify-between gap-5 sm:justify-end">

                        {/* ORDER STATUS */}

                        <span
                          className={`px-3 py-1.5 text-[9px] uppercase tracking-wide ${getStatusColor(
                            orderStatus
                          )}`}
                        >
                          {orderStatus}
                        </span>

                        {/* TOTAL */}

                        <span className="text-sm font-semibold">
                          {formatPrice(
                            order.amount
                          )}
                        </span>

                      </div>

                    </div>

                    {/* =================================================
                        ORDER TRACKER
                    ================================================= */}

                    {!isCancelled ? (
                      <div className="border-b border-[#eee7e1] px-5 py-7 sm:px-7">

                        <div className="mx-auto max-w-4xl">

                          <div className="relative">

                            {/* LINE */}

                            <div className="absolute left-[4%] right-[4%] top-4 h-px bg-[#ddd4cc]" />

                            {/* ACTIVE LINE */}

                            {statusIndex > 0 && (
                              <div
                                className="absolute left-[4%] top-4 h-px bg-[#3d5a45] transition-all"
                                style={{
                                  width: `${Math.min(
                                    statusIndex /
                                      4,
                                    1
                                  ) * 92}%`,
                                }}
                              />
                            )}

                            <div className="relative grid grid-cols-5">

                              {[
                                "Order Placed",
                                "Processing",
                                "Shipped",
                                "Out for Delivery",
                                "Delivered",
                              ].map(
                                (
                                  status,
                                  statusNumber
                                ) => {

                                  const completed =
                                    statusNumber <=
                                    statusIndex;

                                  const active =
                                    statusNumber ===
                                    statusIndex;

                                  return (
                                    <div
                                      key={
                                        status
                                      }
                                      className="flex flex-col items-center"
                                    >

                                      <StatusIcon
                                        completed={
                                          completed
                                        }
                                        active={
                                          active
                                        }
                                      />

                                      <p
                                        className={`mt-3 text-center text-[8px] uppercase tracking-[0.05em] sm:text-[9px] ${
                                          completed
                                            ? "font-medium text-[#3d5a45]"
                                            : "text-gray-400"
                                        }`}
                                      >
                                        {status}
                                      </p>

                                    </div>
                                  );
                                }
                              )}

                            </div>

                          </div>

                        </div>

                      </div>
                    ) : (
                      <div className="border-b border-[#eee7e1] bg-[#fdf5f3] px-5 py-6 sm:px-7">

                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5e5e3] text-[#87524b]">

                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M6 6L18 18"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                              />

                              <path
                                d="M18 6L6 18"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                              />

                            </svg>

                          </div>

                          <div>

                            <p className="text-xs font-medium text-[#87524b]">
                              Order Cancelled
                            </p>

                            <p className="mt-1 text-[10px] text-gray-500">
                              This order has been
                              cancelled.
                            </p>

                          </div>

                        </div>

                      </div>
                    )}

                    {/* =================================================
                        PRODUCTS
                    ================================================= */}

                    <div className="px-5 sm:px-7">

                      {orderItems.map(
                        (
                          item,
                          itemIndex
                        ) => {

                          const image =
                            getProductImage(
                              item
                            );

                          return (
                            <div
                              key={
                                item._id ||
                                item.id ||
                                itemIndex
                              }
                              className="flex gap-4 border-b border-[#eee7e1] py-5 last:border-0"
                            >

                              {/* IMAGE */}

                              <div className="h-24 w-20 flex-shrink-0 overflow-hidden bg-[#eee3d9] sm:h-28 sm:w-24">

                                {image ? (
                                  <img
                                    src={image}
                                    alt={getProductName(
                                      item
                                    )}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center font-serif text-2xl text-[#aaa39b]">
                                    A
                                  </div>
                                )}

                              </div>

                              {/* DETAILS */}

                              <div className="flex min-w-0 flex-1 flex-col justify-center">

                                <h3 className="orders-serif text-xl">
                                  {getProductName(
                                    item
                                  )}
                                </h3>

                                {item.category && (
                                  <p className="mt-1 text-[8px] uppercase tracking-[0.18em] text-gray-400">
                                    {item.category}
                                  </p>
                                )}

                                <div className="mt-3 flex flex-wrap gap-4 text-[10px] text-gray-500">

                                  <span>
                                    Qty:{" "}
                                    {getProductQuantity(
                                      item
                                    )}
                                  </span>

                                  {item.size && (
                                    <span>
                                      Size:{" "}
                                      {item.size}
                                    </span>
                                  )}

                                  {item.color && (
                                    <span>
                                      Color:{" "}
                                      {item.color}
                                    </span>
                                  )}

                                </div>

                              </div>

                              {/* PRICE */}

                              <div className="flex items-center">

                                <span className="text-sm font-medium">
                                  {formatPrice(
                                    getProductPrice(
                                      item
                                    )
                                  )}
                                </span>

                              </div>

                            </div>
                          );
                        }
                      )}

                    </div>

                    {/* =================================================
                        FOOTER
                    ================================================= */}

                    <div className="grid gap-6 border-t border-[#e8ddd5] bg-[#fcf8f4] px-5 py-6 sm:grid-cols-[2fr_1fr_auto] sm:px-7">

                      {/* ADDRESS */}

                      <div>

                        <p className="mb-2 text-[8px] uppercase tracking-[0.2em] text-gray-400">
                          Delivery Address
                        </p>

                        <p className="max-w-lg text-[11px] leading-5 text-gray-600">
                          {getAddress(
                            order.address
                          )}
                        </p>

                      </div>

                      {/* PAYMENT */}

                      <div>

                        <p className="mb-2 text-[8px] uppercase tracking-[0.2em] text-gray-400">
                          Payment
                        </p>

                        <div className="flex items-center gap-2">

                          <span
                            className={`px-2.5 py-1 text-[8px] uppercase tracking-wide ${
                              order.payment
                                ? "bg-[#e6eee6] text-[#526352]"
                                : "bg-[#f1ebe5] text-[#665f57]"
                            }`}
                          >
                            {paymentStatus}
                          </span>

                        </div>

                      </div>

                      {/* TOTAL */}

                      <div className="sm:text-right">

                        <p className="mb-2 text-[8px] uppercase tracking-[0.2em] text-gray-400">
                          Total
                        </p>

                        <p className="orders-serif text-2xl text-[#d4845a]">
                          {formatPrice(
                            order.amount
                          )}
                        </p>

                      </div>

                    </div>

                  </article>
                );
              }
            )}

          </div>

        </section>

      </div>

    </main>
  );
}

export default Orders;