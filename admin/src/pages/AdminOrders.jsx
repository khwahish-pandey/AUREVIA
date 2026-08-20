import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { AuthContext } from "../context/AuthContext.jsx";

function Orders() {
  // =========================================================
  // AUTH CONTEXT
  // =========================================================

  const authContext = useContext(AuthContext);

  /*
    Depending on how your AuthContext is written,
    serverUrl may be directly inside the context.
  */

  const serverUrl =
    authContext?.serverUrl ||
    authContext?.serverurl ||
    authContext?.value?.serverUrl ||
    authContext?.value?.serverurl ||
    "";

  // =========================================================
  // STATE
  // =========================================================

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [updatingOrder, setUpdatingOrder] =
    useState(null);

  const [notification, setNotification] =
    useState({
      show: false,
      type: "",
      message: "",
    });

  // =========================================================
  // SHOW NOTIFICATION
  // =========================================================

  const showNotification = (
    type,
    message
  ) => {
    setNotification({
      show: true,
      type,
      message,
    });

    setTimeout(() => {
      setNotification({
        show: false,
        type: "",
        message: "",
      });
    }, 3000);
  };

  // =========================================================
  // FETCH ALL ORDERS
  // =========================================================

  const fetchAllOrders = async () => {
    try {
      setError("");

      console.log(
        "================================"
      );

      console.log(
        "📦 ADMIN - FETCHING ALL ORDERS"
      );

      console.log(
        "🌐 SERVER URL:",
        serverUrl
      );

      console.log(
        "================================"
      );

      // -------------------------------------------------------
      // SERVER URL CHECK
      // -------------------------------------------------------

      if (!serverUrl) {
        console.error(
          "❌ SERVER URL NOT FOUND"
        );

        setError(
          "Server URL is not available from AuthContext."
        );

        return;
      }

      // -------------------------------------------------------
      // BACKEND REQUEST
      // -------------------------------------------------------

      /*
        Backend:

        POST /api/order/allorders

        So axios.post() is required.
      */

      const response = await axios.post(
        `${serverUrl}/api/order/allorders`,
        {},
        {
          withCredentials: true,
        }
      );

      console.log(
        "✅ ALL ORDERS RESPONSE:",
        response.data
      );

      // -------------------------------------------------------
      // HANDLE RESPONSE
      // -------------------------------------------------------

      if (response.data?.success) {
        const fetchedOrders =
          Array.isArray(
            response.data.orders
          )
            ? response.data.orders
            : [];

        setOrders(fetchedOrders);

        setError("");
      } else {
        setError(
          response.data?.message ||
            "Unable to fetch orders."
        );
      }
    } catch (err) {
      console.error(
        "❌ ERROR FETCHING ALL ORDERS:",
        err
      );

      console.error(
        "STATUS:",
        err?.response?.status
      );

      console.error(
        "BACKEND RESPONSE:",
        err?.response?.data
      );

      setError(
        err?.response?.data?.message ||
          "Error fetching orders."
      );
    }
  };

  // =========================================================
  // INITIAL FETCH
  // =========================================================

  useEffect(() => {
    if (!serverUrl) {
      setLoading(false);

      setError(
        "Server URL is not available from AuthContext."
      );

      return;
    }

    const loadOrders = async () => {
      setLoading(true);

      await fetchAllOrders();

      setLoading(false);
    };

    loadOrders();
  }, [serverUrl]);

  // =========================================================
  // UPDATE ORDER STATUS
  // =========================================================

  const updateOrderStatus = async (
    orderId,
    newStatus
  ) => {
    try {
      setUpdatingOrder(orderId);

      console.log(
        "================================"
      );

      console.log(
        "🔄 UPDATING ORDER STATUS"
      );

      console.log(
        "ORDER ID:",
        orderId
      );

      console.log(
        "NEW STATUS:",
        newStatus
      );

      console.log(
        "================================"
      );

      const response =
        await axios.put(
          `${serverUrl}/api/order/updateorderstatus`,
          {
            orderId,
            status: newStatus,
          },
          {
            withCredentials: true,
          }
        );

      console.log(
        "✅ STATUS UPDATE RESPONSE:",
        response.data
      );

      if (response.data?.success) {
        // -----------------------------------------------------
        // UPDATE LOCAL ORDER
        // -----------------------------------------------------

        setOrders(
          (previousOrders) =>
            previousOrders.map(
              (order) => {
                if (
                  String(order._id) ===
                  String(orderId)
                ) {
                  return {
                    ...order,
                    status:
                      response.data?.order
                        ?.status ||
                      newStatus,
                  };
                }

                return order;
              }
            )
        );

        showNotification(
          "success",
          `Order status changed to "${newStatus}"`
        );
      } else {
        showNotification(
          "error",
          response.data?.message ||
            "Unable to update order status."
        );
      }
    } catch (err) {
      console.error(
        "❌ UPDATE STATUS ERROR:",
        err
      );

      console.error(
        "BACKEND RESPONSE:",
        err?.response?.data
      );

      showNotification(
        "error",
        err?.response?.data?.message ||
          "Error updating order status."
      );
    } finally {
      setUpdatingOrder(null);
    }
  };

  // =========================================================
  // REFRESH
  // =========================================================

  const handleRefresh = async () => {
    try {
      setLoading(true);

      await fetchAllOrders();

      showNotification(
        "success",
        "Orders refreshed"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    const parsedDate =
      new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return "N/A";
    }

    return parsedDate.toLocaleDateString(
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
  // ORDER STATUS
  // =========================================================

  const getOrderStatus = (order) => {
    return (
      order?.status ||
      "Order Placed"
    );
  };

  // =========================================================
  // STATUS STYLE
  // =========================================================

  const getStatusStyle = (status) => {
    switch (
      String(status || "").toLowerCase()
    ) {
      case "delivered":
        return "bg-[#e5efe6] text-[#426247]";

      case "shipped":
        return "bg-[#e7edf5] text-[#4b6382]";

      case "out for delivery":
        return "bg-[#f5eddd] text-[#876d42]";

      case "processing":
        return "bg-[#eee8f4] text-[#69547d]";

      case "cancelled":
        return "bg-[#f5e4e1] text-[#87524b]";

      default:
        return "bg-[#f1ebe5] text-[#6b6259]";
    }
  };

  // =========================================================
  // PRODUCT IMAGE
  // =========================================================

  const getProductImage = (item) => {
    if (
      Array.isArray(item?.image)
    ) {
      return item.image[0];
    }

    if (
      Array.isArray(item?.images)
    ) {
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
  // PAYMENT
  // =========================================================

  const getPaymentMethod = (order) => {
    if (order?.payment) {
      return "Paid";
    }

    return (
      order?.paymentMethod ||
      "COD"
    );
  };

  // =========================================================
  // ADDRESS
  // =========================================================

  const getAddress = (address) => {
    if (!address) {
      return "Address unavailable";
    }

    if (
      typeof address === "string"
    ) {
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
  // STATUS COUNTS
  // =========================================================

  const processingCount =
    orders.filter(
      (order) =>
        getOrderStatus(
          order
        ).toLowerCase() ===
        "processing"
    ).length;

  const shippedCount =
    orders.filter(
      (order) =>
        getOrderStatus(
          order
        ).toLowerCase() ===
        "shipped"
    ).length;

  const deliveredCount =
    orders.filter(
      (order) =>
        getOrderStatus(
          order
        ).toLowerCase() ===
        "delivered"
    ).length;

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f7f4]">

        <div className="flex min-h-screen items-center justify-center">

          <div className="text-center">

            <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-[#ddd7cf] border-t-[#3d5a45]" />

            <p className="mt-4 text-xs tracking-wide text-gray-500">
              Loading orders...
            </p>

          </div>

        </div>

      </div>
    );
  }

  // =========================================================
  // MAIN PAGE
  // =========================================================

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-[#292725]">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .admin-orders-page {
          font-family: 'DM Sans', sans-serif;
        }

        .admin-orders-serif {
          font-family: 'Cormorant Garamond', serif;
        }
      `}</style>

      {/* =====================================================
          NOTIFICATION
      ===================================================== */}

      {notification.show && (
        <div
          className={`fixed right-5 top-5 z-[9999] flex min-w-[280px] items-center gap-3 border bg-white px-5 py-4 shadow-lg ${
            notification.type ===
            "success"
              ? "border-[#cbdcca]"
              : "border-[#e3c9c5]"
          }`}
        >

          <div
            className={`flex h-7 w-7 items-center justify-center rounded-full text-xs ${
              notification.type ===
              "success"
                ? "bg-[#e5efe6] text-[#426247]"
                : "bg-[#f5e4e1] text-[#87524b]"
            }`}
          >
            {notification.type ===
            "success"
              ? "✓"
              : "!"}
          </div>

          <p className="text-xs text-gray-600">
            {notification.message}
          </p>

        </div>
      )}

      <div className="admin-orders-page">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="border-b border-[#dfdad3] bg-white">

          <div className="mx-auto max-w-7xl px-6 py-9 lg:px-10">

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-[9px] uppercase tracking-[0.35em] text-[#d4845a]">
                  Aurevis Admin
                </p>

                <h1 className="admin-orders-serif mt-2 text-5xl">
                  Orders
                </h1>

                <p className="mt-2 text-xs text-gray-500">
                  Manage customer orders and
                  delivery status.
                </p>

              </div>

              <button
                onClick={handleRefresh}
                disabled={loading}
                className="flex w-fit items-center gap-2 border border-[#dcd6cf] bg-white px-5 py-3 text-[9px] uppercase tracking-[0.18em] text-gray-600 transition hover:bg-[#f5f1ed] disabled:opacity-50"
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

          </div>

        </header>

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <main className="mx-auto max-w-7xl px-5 py-8 lg:px-10">

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <div className="mb-6 border border-[#e3c9c5] bg-[#fdf5f3] px-5 py-4">

              <div className="flex items-start gap-3">

                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f5e4e1] text-xs text-[#87524b]">
                  !
                </div>

                <div>

                  <p className="text-xs font-medium text-[#87524b]">
                    Unable to load orders
                  </p>

                  <p className="mt-1 text-[11px] text-gray-500">
                    {error}
                  </p>

                </div>

              </div>

            </div>
          )}

          {/* =================================================
              STATS
          ================================================= */}

          <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">

            <div className="border border-[#dfdad3] bg-white p-5">

              <p className="text-[8px] uppercase tracking-[0.2em] text-gray-400">
                Total Orders
              </p>

              <p className="mt-2 text-3xl">
                {orders.length}
              </p>

            </div>

            <div className="border border-[#dfdad3] bg-white p-5">

              <p className="text-[8px] uppercase tracking-[0.2em] text-gray-400">
                Processing
              </p>

              <p className="mt-2 text-3xl">
                {processingCount}
              </p>

            </div>

            <div className="border border-[#dfdad3] bg-white p-5">

              <p className="text-[8px] uppercase tracking-[0.2em] text-gray-400">
                Shipped
              </p>

              <p className="mt-2 text-3xl">
                {shippedCount}
              </p>

            </div>

            <div className="border border-[#dfdad3] bg-white p-5">

              <p className="text-[8px] uppercase tracking-[0.2em] text-gray-400">
                Delivered
              </p>

              <p className="mt-2 text-3xl">
                {deliveredCount}
              </p>

            </div>

          </div>

          {/* =================================================
              NO ORDERS
          ================================================= */}

          {orders.length === 0 ? (

            <div className="border border-[#dfdad3] bg-white py-24 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#ded6ce] text-gray-500">

                <svg
                  width="26"
                  height="26"
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

              <h2 className="admin-orders-serif mt-6 text-3xl">
                No orders yet
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Customer orders will appear
                here.
              </p>

            </div>

          ) : (

            /* =================================================
               ORDER LIST
            ================================================= */

            <div className="space-y-6">

              {orders.map(
                (order, index) => {

                  const status =
                    getOrderStatus(
                      order
                    );

                  const items =
                    Array.isArray(
                      order.items
                    )
                      ? order.items
                      : [];

                  return (
                    <article
                      key={
                        order._id ||
                        index
                      }
                      className="overflow-hidden border border-[#dfdad3] bg-white"
                    >

                      {/* =========================================
                          ORDER HEADER
                      ========================================= */}

                      <div className="border-b border-[#ebe6df] px-5 py-5 lg:px-7">

                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                          {/* ORDER INFO */}

                          <div className="flex flex-wrap gap-x-10 gap-y-4">

                            <div>

                              <p className="text-[8px] uppercase tracking-[0.2em] text-gray-400">
                                Order ID
                              </p>

                              <p className="mt-1 text-xs font-semibold">
                                #
                                {String(
                                  order._id ||
                                    ""
                                )
                                  .slice(-8)
                                  .toUpperCase()}
                              </p>

                            </div>

                            <div>

                              <p className="text-[8px] uppercase tracking-[0.2em] text-gray-400">
                                Date
                              </p>

                              <p className="mt-1 text-xs">
                                {formatDate(
                                  order.date
                                )}
                              </p>

                            </div>

                            <div>

                              <p className="text-[8px] uppercase tracking-[0.2em] text-gray-400">
                                Payment
                              </p>

                              <p className="mt-1 text-xs capitalize">
                                {getPaymentMethod(
                                  order
                                )}
                              </p>

                            </div>

                            <div>

                              <p className="text-[8px] uppercase tracking-[0.2em] text-gray-400">
                                Total
                              </p>

                              <p className="mt-1 text-xs font-semibold">
                                {formatPrice(
                                  order.amount
                                )}
                              </p>

                            </div>

                          </div>

                          {/* STATUS CONTROL */}

                          <div className="flex flex-wrap items-center gap-3">

                            <span
                              className={`px-3 py-2 text-[9px] uppercase tracking-wide ${getStatusStyle(
                                status
                              )}`}
                            >
                              {status}
                            </span>

                            <select
                              value={status}
                              disabled={
                                updatingOrder ===
                                order._id
                              }
                              onChange={(
                                event
                              ) => {
                                updateOrderStatus(
                                  order._id,
                                  event.target
                                    .value
                                );
                              }}
                              className="cursor-pointer border border-[#d8d2cb] bg-white px-4 py-2 text-[10px] outline-none transition focus:border-[#3d5a45] disabled:cursor-not-allowed disabled:opacity-50"
                            >

                              <option value="Order Placed">
                                Order Placed
                              </option>

                              <option value="Processing">
                                Processing
                              </option>

                              <option value="Shipped">
                                Shipped
                              </option>

                              <option value="Out for Delivery">
                                Out for Delivery
                              </option>

                              <option value="Delivered">
                                Delivered
                              </option>

                              <option value="Cancelled">
                                Cancelled
                              </option>

                            </select>

                            {updatingOrder ===
                              order._id && (
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#ddd7cf] border-t-[#3d5a45]" />
                            )}

                          </div>

                        </div>

                      </div>

                      {/* =========================================
                          PRODUCTS
                      ========================================= */}

                      <div className="px-5 lg:px-7">

                        {items.map(
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
                                  itemIndex
                                }
                                className="flex gap-4 border-b border-[#eee9e3] py-5 last:border-b-0"
                              >

                                {/* IMAGE */}

                                <div className="h-24 w-20 shrink-0 overflow-hidden bg-[#eee7e0] sm:h-28 sm:w-24">

                                  {image ? (

                                    <img
                                      src={image}
                                      alt={getProductName(
                                        item
                                      )}
                                      className="h-full w-full object-cover"
                                    />

                                  ) : (

                                    <div className="flex h-full w-full items-center justify-center font-serif text-2xl text-gray-400">
                                      A
                                    </div>

                                  )}

                                </div>

                                {/* DETAILS */}

                                <div className="flex min-w-0 flex-1 flex-col justify-center">

                                  <h3 className="admin-orders-serif text-xl">
                                    {getProductName(
                                      item
                                    )}
                                  </h3>

                                  <div className="mt-2 flex flex-wrap gap-4 text-[10px] text-gray-500">

                                    <span>
                                      Qty:{" "}
                                      {item.quantity ||
                                        item.qty ||
                                        1}
                                    </span>

                                    {item.size && (
                                      <span>
                                        Size:{" "}
                                        {
                                          item.size
                                        }
                                      </span>
                                    )}

                                    {item.color && (
                                      <span>
                                        Color:{" "}
                                        {
                                          item.color
                                        }
                                      </span>
                                    )}

                                  </div>

                                </div>

                                {/* PRICE */}

                                <div className="flex items-center">

                                  <span className="text-sm font-medium">
                                    {formatPrice(
                                      item.price ||
                                        item.amount ||
                                        0
                                    )}
                                  </span>

                                </div>

                              </div>
                            );
                          }
                        )}

                      </div>

                      {/* =========================================
                          CUSTOMER INFORMATION
                      ========================================= */}

                      <div className="grid gap-7 border-t border-[#ebe6df] bg-[#faf8f5] px-5 py-6 lg:grid-cols-2 lg:px-7">

                        {/* ADDRESS */}

                        <div>

                          <p className="mb-2 text-[8px] uppercase tracking-[0.2em] text-gray-400">
                            Delivery Address
                          </p>

                          <p className="max-w-xl text-[11px] leading-5 text-gray-600">
                            {getAddress(
                              order.address
                            )}
                          </p>

                        </div>

                        {/* CUSTOMER */}

                        <div>

                          <p className="mb-2 text-[8px] uppercase tracking-[0.2em] text-gray-400">
                            Customer
                          </p>

                          <div className="space-y-1 text-[11px] text-gray-600">

                            {order.address
                              ?.firstName && (
                              <p>
                                {
                                  order.address
                                    .firstName
                                }{" "}
                                {
                                  order.address
                                    .lastName
                                }
                              </p>
                            )}

                            {order.address
                              ?.email && (
                              <p>
                                {
                                  order.address
                                    .email
                                }
                              </p>
                            )}

                            {order.address
                              ?.phone && (
                              <p>
                                {
                                  order.address
                                    .phone
                                }
                              </p>
                            )}

                          </div>

                        </div>

                      </div>

                    </article>
                  );
                }
              )}

            </div>
          )}

        </main>

      </div>

    </div>
  );
}

export default Orders;