import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { ShopContext } from "../context/ShopContext.jsx";
import RelatedProducts from "./RelatedProducts.jsx";

function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();

  // =========================================================
  // SHOP CONTEXT
  // =========================================================

  const {
    products = [],
    currency = "₹",
    addtoCart,
    getCart,
  } = useContext(ShopContext) || {};

  // =========================================================
  // STATES
  // =========================================================

  const [selectedImage, setSelectedImage] =
    useState(0);

  const [selectedSize, setSelectedSize] =
    useState("");

  const [sizeChartOpen, setSizeChartOpen] =
    useState(false);

  const [openSection, setOpenSection] =
    useState("description");

  const [quantity, setQuantity] =
    useState(1);

  // =========================================================
  // FIND PRODUCT
  // =========================================================

  const product = useMemo(() => {
    return products.find(
      (item) =>
        String(item._id || item.id) ===
        String(productId)
    );
  }, [products, productId]);

  // =========================================================
  // PRODUCT IMAGES
  // =========================================================

  const productImages = useMemo(() => {
    if (!product) return [];

    return [
      product.image1,
      product.image2,
      product.image3,
      product.image4,
    ].filter(Boolean);
  }, [product]);

  // =========================================================
  // PRODUCT SIZES
  // =========================================================

  const sizes = useMemo(() => {
    if (!product) return [];

    if (Array.isArray(product.sizes)) {
      return product.sizes;
    }

    return [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL",
    ];
  }, [product]);

  // =========================================================
  // RESET WHEN PRODUCT CHANGES
  // =========================================================

  useEffect(() => {
    setSelectedImage(0);
    setSelectedSize("");
    setQuantity(1);
  }, [productId]);

  // =========================================================
  // PRODUCT ID
  // =========================================================

  const productIdValue =
    product?._id || product?.id;

  // =========================================================
  // CHECK WHETHER SELECTED PRODUCT + SIZE
  // IS ALREADY IN CART
  // =========================================================

  const cartQuantity =
    selectedSize && productIdValue
      ? getCart?.(
          productIdValue,
          selectedSize
        ) || 0
      : 0;

  const isInCart =
    Number(cartQuantity) > 0;

  // =========================================================
  // LOADING
  // =========================================================

  if (!products || products.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#fdf5ee]">
        <p className="text-sm text-gray-500">
          Loading product...
        </p>
      </div>
    );
  }

  // =========================================================
  // PRODUCT NOT FOUND
  // =========================================================

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#fdf5ee] px-6">
        <h1
          className="text-4xl text-[#3d5a45]"
          style={{
            fontFamily:
              "'Cormorant Garamond', serif",
          }}
        >
          Product not found
        </h1>

        <Link
          to="/profile/collection"
          className="mt-6 px-6 py-3 bg-[#3d5a45] text-white text-xs uppercase tracking-[0.15em]"
        >
          Back to Collection
        </Link>
      </div>
    );
  }

  // =========================================================
  // PRODUCT INFORMATION
  // =========================================================

  const productName =
    product.name ||
    product.title ||
    "Aurevia Collection Piece";

  const price =
    product.price ??
    product.sellingPrice ??
    0;

  const oldPrice =
    product.oldPrice ??
    product.originalPrice ??
    product.mrp ??
    null;

  const description =
    product.description ||
    "A thoughtfully designed piece created to bring timeless elegance and contemporary individuality to your wardrobe.";

  const category =
    product.category ||
    "Fashion";

  const subCategory =
    product.subCategory ||
    product.subcategory ||
    "";

  const color =
    product.color ||
    product.colour ||
    "Classic";

  // =========================================================
  // ADD TO BAG
  // =========================================================

  const handleAddToBag = async () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    if (typeof addtoCart !== "function") {
      console.error(
        "❌ addtoCart is not available in ShopContext."
      );
      return;
    }

    try {
      await addtoCart(
        product._id || product.id,
        selectedSize,
        quantity
      );

      console.log(
        "✅ Added to cart:",
        product.name,
        selectedSize,
        quantity
      );
    } catch (error) {
      console.error(
        "❌ Error adding to cart:",
        error
      );
    }
  };

  // =========================================================
  // BUY NOW
  // =========================================================

  const handleBuyNow = async () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    if (typeof addtoCart !== "function") {
      console.error(
        "❌ addtoCart is not available in ShopContext."
      );
      return;
    }

    try {
      await addtoCart(
        product._id || product.id,
        selectedSize,
        quantity
      );

      navigate("/profile/cart");
    } catch (error) {
      console.error(
        "❌ Error adding item:",
        error
      );
    }
  };

  // =========================================================
  // ACCORDION
  // =========================================================

  const toggleSection = (section) => {
    setOpenSection(
      openSection === section
        ? ""
        : section
    );
  };

  return (
    <>
      {/* =====================================================
          GOOGLE FONTS + PAGE CSS
      ===================================================== */}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&display=swap');

        .product-detail-page {
          font-family: 'DM Sans', sans-serif;
        }

        .product-serif {
          font-family: 'Cormorant Garamond', serif;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .hide-scrollbar {
          scrollbar-width: none;
        }
      `}</style>

      {/* =====================================================
          PAGE
      ===================================================== */}

      <div className="product-detail-page bg-[#fdf5ee] min-h-screen text-[#2a2a2a]">

        {/* ===================================================
            BREADCRUMB
        =================================================== */}

        <div className="max-w-7xl mx-auto px-5 lg:px-10 pt-8">

          <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-gray-500">

            <Link
              to="/"
              className="hover:text-[#d4845a] transition"
            >
              Home
            </Link>

            <span>/</span>

            <Link
              to="/profile/collection"
              className="hover:text-[#d4845a] transition"
            >
              Collection
            </Link>

            <span>/</span>

            <span className="text-[#3d5a45]">
              {productName}
            </span>

          </div>

        </div>

        {/* ===================================================
            MAIN PRODUCT SECTION
        =================================================== */}

        <section className="max-w-7xl mx-auto px-5 lg:px-10 py-8 lg:py-12">

          <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] gap-8 lg:gap-14 items-start">

            {/* =================================================
                LEFT — PRODUCT IMAGES
            ================================================= */}

            <div className="flex gap-4">

              {/* THUMBNAILS */}

              <div className="hidden sm:flex flex-col gap-3 w-[76px] flex-shrink-0">

                {productImages.map(
                  (image, index) => (

                    <button
                      key={index}
                      onClick={() =>
                        setSelectedImage(
                          index
                        )
                      }
                      className={`
                        w-[72px]
                        h-[90px]
                        overflow-hidden
                        bg-[#ebe2d8]
                        transition-all
                        ${
                          selectedImage ===
                          index
                            ? "border-2 border-[#3d5a45]"
                            : "border border-transparent"
                        }
                      `}
                    >

                      <img
                        src={image}
                        alt={`${productName} ${
                          index + 1
                        }`}
                        className="w-full h-full object-cover"
                      />

                    </button>

                  )
                )}

              </div>

              {/* MAIN IMAGE */}

              <div className="flex-1">

                <div className="relative bg-[#ebe2d8] aspect-[0.82] overflow-hidden">

                  {productImages.length >
                  0 ? (

                    <img
                      src={
                        productImages[
                          selectedImage
                        ]
                      }
                      alt={productName}
                      className="w-full h-full object-cover"
                    />

                  ) : (

                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No image available
                    </div>

                  )}

                  {/* PREVIOUS */}

                  {productImages.length >
                    1 && (
                    <button
                      onClick={() =>
                        setSelectedImage(
                          selectedImage ===
                            0
                            ? productImages.length -
                              1
                            : selectedImage -
                              1
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 flex items-center justify-center text-[#3d5a45] hover:bg-white transition"
                    >
                      ←
                    </button>
                  )}

                  {/* NEXT */}

                  {productImages.length >
                    1 && (
                    <button
                      onClick={() =>
                        setSelectedImage(
                          selectedImage ===
                            productImages.length -
                              1
                            ? 0
                            : selectedImage +
                              1
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 flex items-center justify-center text-[#3d5a45] hover:bg-white transition"
                    >
                      →
                    </button>
                  )}

                </div>

                {/* MOBILE THUMBNAILS */}

                <div className="flex sm:hidden gap-2 mt-3 overflow-x-auto hide-scrollbar">

                  {productImages.map(
                    (image, index) => (

                      <button
                        key={index}
                        onClick={() =>
                          setSelectedImage(
                            index
                          )
                        }
                        className={`
                          flex-shrink-0
                          w-16
                          h-20
                          overflow-hidden
                          ${
                            selectedImage ===
                            index
                              ? "border-2 border-[#3d5a45]"
                              : "border border-[#ded2c7]"
                          }
                        `}
                      >

                        <img
                          src={image}
                          alt=""
                          className="w-full h-full object-cover"
                        />

                      </button>

                    )
                  )}

                </div>

              </div>

            </div>

            {/* =================================================
                RIGHT — PRODUCT INFORMATION
            ================================================= */}

            <div className="lg:pt-2">

              {/* BRAND */}

              <p className="text-[9px] uppercase tracking-[0.3em] text-[#d4845a]">
                Aurevia
              </p>

              {/* PRODUCT NAME */}

              <div className="flex items-start justify-between gap-5 mt-3">

                <h1 className="product-serif text-4xl md:text-5xl leading-[0.95] text-[#2a2a2a]">
                  {productName}
                </h1>

                {/* HEART */}

                <button
                  className="w-11 h-11 rounded-full border border-[#d8ccc1] flex-shrink-0 flex items-center justify-center text-xl text-[#3d5a45] hover:border-[#d4845a] hover:text-[#d4845a] transition"
                  aria-label="Add to wishlist"
                >
                  ♡
                </button>

              </div>

              {/* CATEGORY */}

              <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">

                <span>
                  {category}
                </span>

                {subCategory && (
                  <>
                    <span>•</span>

                    <span>
                      {subCategory}
                    </span>
                  </>
                )}

              </div>

              {/* PRICE */}

              <div className="mt-6 flex items-end gap-3">

                <span className="text-2xl font-semibold text-[#3d5a45]">
                  {currency}
                  {Number(
                    price
                  ).toLocaleString(
                    "en-IN"
                  )}
                </span>

                {oldPrice &&
                  Number(oldPrice) >
                    Number(price) && (

                    <span className="text-sm text-gray-400 line-through">
                      {currency}
                      {Number(
                        oldPrice
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </span>

                  )}

              </div>

              {/* TAX */}

              <p className="mt-1 text-[10px] text-gray-400">
                Price inclusive of all applicable taxes
              </p>

              {/* OFFER */}

              <div className="mt-6 border border-[#d4845a]/40 flex">

                <div className="bg-[#d4845a] text-white px-5 py-3 text-[9px] uppercase tracking-[0.15em]">
                  Offer
                </div>

                <div className="flex-1 px-4 py-3 text-[10px] text-[#3d5a45] flex items-center">
                  Special offer available on selected items
                </div>

              </div>

              {/* COLOR */}

              <div className="mt-7">

                <div className="flex items-center gap-2">

                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em]">
                    Colour:
                  </span>

                  <span className="text-sm text-gray-600">
                    {color}
                  </span>

                </div>

                <div className="mt-3 w-12 h-12 bg-[#ebe2d8] border-2 border-[#3d5a45] p-1">

                  {productImages[0] && (
                    <img
                      src={
                        productImages[0]
                      }
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  )}

                </div>

              </div>

              {/* =================================================
                  SIZE SELECTOR
              ================================================= */}

              <div className="mt-7">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-[10px] uppercase tracking-[0.15em] font-semibold">
                      Select Size
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Size*
                    </p>

                  </div>

                  {/* SIZE GUIDE */}

                  <button
                    onClick={() =>
                      setSizeChartOpen(
                        true
                      )
                    }
                    className="flex items-center gap-2 text-xs underline underline-offset-4 text-[#3d5a45] hover:text-[#d4845a] transition"
                  >
                    <span className="text-base">
                      ▤
                    </span>

                    Size Guide
                  </button>

                </div>

                {/* SIZE BUTTONS */}

                <div className="flex flex-wrap gap-2 mt-4">

                  {sizes.map(
                    (size) => (

                      <button
                        key={size}
                        onClick={() =>
                          setSelectedSize(
                            size
                          )
                        }
                        className={`
                          w-12
                          h-12
                          border
                          text-xs
                          transition-all
                          ${
                            selectedSize ===
                            size
                              ? "bg-[#3d5a45] text-white border-[#3d5a45]"
                              : "bg-white border-[#d7ccc2] text-gray-600 hover:border-[#3d5a45]"
                          }
                        `}
                      >
                        {size}
                      </button>

                    )
                  )}

                </div>

              </div>

              {/* =================================================
                  QUANTITY
              ================================================= */}

              <div className="mt-6 flex items-center justify-between">

                <span className="text-[10px] uppercase tracking-[0.15em] font-semibold">
                  Quantity
                </span>

                <div className="flex items-center border border-[#d7ccc2]">

                  <button
                    onClick={() =>
                      setQuantity(
                        (q) =>
                          Math.max(
                            1,
                            q - 1
                          )
                      )
                    }
                    className="w-9 h-9 text-gray-500 hover:text-[#3d5a45]"
                  >
                    −
                  </button>

                  <span className="w-9 text-center text-xs">
                    {quantity}
                  </span>

                  <button
                    onClick={() =>
                      setQuantity(
                        (q) => q + 1
                      )
                    }
                    className="w-9 h-9 text-gray-500 hover:text-[#3d5a45]"
                  >
                    +
                  </button>

                </div>

              </div>

              {/* =================================================
                  BUTTONS
              ================================================= */}

              <div className="grid grid-cols-2 gap-3 mt-6">

                {/* =================================================
                    ADD TO BAG / VIEW BAG
                ================================================= */}

                {isInCart ? (

                  <Link
                    to="/profile/cart"
                    className="py-4 border border-[#3d5a45] bg-[#3d5a45] text-white text-[10px] uppercase tracking-[0.18em] font-semibold hover:bg-[#d4845a] hover:border-[#d4845a] transition flex items-center justify-center"
                  >
                    View Bag
                  </Link>

                ) : (

                  <button
                    onClick={
                      handleAddToBag
                    }
                    className="py-4 border border-[#3d5a45] text-[#3d5a45] text-[10px] uppercase tracking-[0.18em] font-semibold hover:bg-[#3d5a45] hover:text-white transition"
                  >
                    Add to Bag
                  </button>

                )}

                {/* BUY NOW */}

                <button
                  onClick={
                    handleBuyNow
                  }
                  className="py-4 bg-[#3d5a45] text-white text-[10px] uppercase tracking-[0.18em] font-semibold hover:bg-[#d4845a] transition"
                >
                  Buy Now
                </button>

              </div>

              {/* =================================================
                  DELIVERY
              ================================================= */}

              <div className="mt-8">

                <p className="text-[10px] uppercase tracking-[0.15em] font-semibold">
                  Delivery Eligibility
                </p>

                <div className="flex mt-3">

                  <input
                    type="text"
                    placeholder="Enter Pincode"
                    maxLength={6}
                    className="flex-1 min-w-0 px-4 py-3 bg-white border border-[#d7ccc2] outline-none text-sm"
                  />

                  <button
                    className="px-7 bg-[#2a2a2a] text-white text-xs"
                  >
                    Check
                  </button>

                </div>

                <p className="mt-2 text-[10px] text-gray-500">
                  Enter your pincode to check delivery availability.
                </p>

                <button
                  onClick={() =>
                    setSizeChartOpen(
                      true
                    )
                  }
                  className="mt-4 text-xs underline underline-offset-4 text-[#3d5a45]"
                >
                  View delivery & return information
                </button>

              </div>

              {/* =================================================
                  ACCORDIONS
              ================================================= */}

              <div className="mt-8 border-t border-[#d8ccc1]">

                {/* DESCRIPTION */}

                <div className="border-b border-[#d8ccc1]">

                  <button
                    onClick={() =>
                      toggleSection(
                        "description"
                      )
                    }
                    className="w-full py-5 flex items-center justify-between text-left"
                  >

                    <span className="text-xs uppercase tracking-[0.12em] font-semibold">
                      Product Description
                    </span>

                    <span className="text-lg">
                      {openSection ===
                      "description"
                        ? "−"
                        : "+"}
                    </span>

                  </button>

                  {openSection ===
                    "description" && (

                    <div className="pb-6 text-sm leading-7 text-gray-600">

                      {product.productId && (
                        <p className="mb-3 text-xs font-semibold text-[#2a2a2a]">
                          Product ID:{" "}
                          {
                            product.productId
                          }
                        </p>
                      )}

                      <p>
                        {description}
                      </p>

                    </div>

                  )}

                </div>

                {/* SIZE & FIT */}

                <div className="border-b border-[#d8ccc1]">

                  <button
                    onClick={() =>
                      toggleSection(
                        "size"
                      )
                    }
                    className="w-full py-5 flex items-center justify-between text-left"
                  >

                    <span className="text-xs uppercase tracking-[0.12em] font-semibold">
                      Size & Fit
                    </span>

                    <span className="text-lg">
                      {openSection ===
                      "size"
                        ? "−"
                        : "+"}
                    </span>

                  </button>

                  {openSection ===
                    "size" && (

                    <div className="pb-6 text-sm leading-7 text-gray-600">

                      <p>
                        Select your usual size for a comfortable
                        fit. For detailed measurements, refer to
                        our size guide.
                      </p>

                      <button
                        onClick={() =>
                          setSizeChartOpen(
                            true
                          )
                        }
                        className="mt-3 underline underline-offset-4 text-[#3d5a45]"
                      >
                        View Size Chart
                      </button>

                    </div>

                  )}

                </div>

                {/* DETAILS & CARE */}

                <div className="border-b border-[#d8ccc1]">

                  <button
                    onClick={() =>
                      toggleSection(
                        "care"
                      )
                    }
                    className="w-full py-5 flex items-center justify-between text-left"
                  >

                    <span className="text-xs uppercase tracking-[0.12em] font-semibold">
                      Details & Care
                    </span>

                    <span className="text-lg">
                      {openSection ===
                      "care"
                        ? "−"
                        : "+"}
                    </span>

                  </button>

                  {openSection ===
                    "care" && (

                    <div className="pb-6 text-sm leading-7 text-gray-600">

                      <ul className="list-disc pl-5 space-y-1">

                        <li>
                          Refer to the product label for care
                          instructions.
                        </li>

                        <li>
                          Store in a cool, dry place.
                        </li>

                        <li>
                          Avoid prolonged exposure to direct
                          sunlight.
                        </li>

                        <li>
                          Handle delicate fabrics with care.
                        </li>

                      </ul>

                    </div>

                  )}

                </div>

              </div>

              {/* SHARE */}

              <div className="flex items-center gap-4 mt-6">

                <span className="text-xs text-gray-500">
                  Share:
                </span>

                <button
                  className="w-8 h-8 rounded-full bg-[#3d5a45] text-white text-xs hover:bg-[#d4845a] transition"
                  aria-label="Share product"
                >
                  ↗
                </button>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            RELATED PRODUCTS
        ===================================================== */}

        <section className="max-w-7xl mx-auto px-5 lg:px-10 pb-20">

          <div className="border-t border-[#d8ccc1] pt-12">

            <div className="flex items-end justify-between">

              <div>

                <span className="text-[9px] uppercase tracking-[0.3em] text-[#d4845a]">
                  You may also like
                </span>

                <h2 className="product-serif text-4xl mt-2">
                  More from the collection
                </h2>

              </div>

              <Link
                to="/profile/collection"
                className="hidden sm:block text-[9px] uppercase tracking-[0.2em] underline underline-offset-4"
              >
                View Collection
              </Link>

            </div>

          </div>

        </section>

      </div>

      {/* =====================================================
          SIZE CHART MODAL
      ===================================================== */}

      {sizeChartOpen && (

        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center px-5"
          onClick={() =>
            setSizeChartOpen(false)
          }
        >

          {/* BLURRED BACKGROUND */}

          <div className="absolute inset-0 bg-black/45 backdrop-blur-md" />

          {/* SIZE CHART */}

          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#fdf5ee] shadow-2xl"
          >

            {/* HEADER */}

            <div className="sticky top-0 z-20 bg-[#3d5a45] text-white px-6 md:px-8 py-5 flex items-center justify-between">

              <div>

                <p className="text-[8px] uppercase tracking-[0.3em] text-[#d4845a]">
                  Aurevia
                </p>

                <h2 className="product-serif text-3xl">
                  Size Guide
                </h2>

              </div>

              <button
                onClick={() =>
                  setSizeChartOpen(
                    false
                  )
                }
                className="w-9 h-9 border border-white/20 flex items-center justify-center text-lg hover:bg-white hover:text-[#3d5a45] transition"
                aria-label="Close size guide"
              >
                ×
              </button>

            </div>

            {/* CONTENT */}

            <div className="p-6 md:p-8">

              <p className="text-sm text-gray-600 leading-6 mb-6">
                Use the measurements below to find the size
                that best suits you. Measurements may vary
                slightly depending on the style and fabric.
              </p>

              {/* SIZE TABLE */}

              <div className="overflow-x-auto">

                <table className="w-full border-collapse text-sm">

                  <thead>

                    <tr className="bg-[#ebe2d8]">

                      <th className="border border-[#d8ccc1] px-4 py-4 text-left text-xs uppercase tracking-[0.1em]">
                        Size
                      </th>

                      <th className="border border-[#d8ccc1] px-4 py-4 text-left text-xs uppercase tracking-[0.1em]">
                        Bust
                      </th>

                      <th className="border border-[#d8ccc1] px-4 py-4 text-left text-xs uppercase tracking-[0.1em]">
                        Waist
                      </th>

                      <th className="border border-[#d8ccc1] px-4 py-4 text-left text-xs uppercase tracking-[0.1em]">
                        Hip
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {[
                      [
                        "XS",
                        "32",
                        "26",
                        "34",
                      ],
                      [
                        "S",
                        "34",
                        "28",
                        "36",
                      ],
                      [
                        "M",
                        "36",
                        "30",
                        "38",
                      ],
                      [
                        "L",
                        "38",
                        "32",
                        "40",
                      ],
                      [
                        "XL",
                        "40",
                        "34",
                        "42",
                      ],
                      [
                        "XXL",
                        "42",
                        "36",
                        "44",
                      ],
                    ].map(
                      (row) => (

                        <tr
                          key={row[0]}
                          className="hover:bg-[#ebe2d8]/60 transition"
                        >

                          <td className="border border-[#d8ccc1] px-4 py-4 font-semibold text-[#3d5a45]">
                            {row[0]}
                          </td>

                          <td className="border border-[#d8ccc1] px-4 py-4 text-gray-600">
                            {row[1]}"
                          </td>

                          <td className="border border-[#d8ccc1] px-4 py-4 text-gray-600">
                            {row[2]}"
                          </td>

                          <td className="border border-[#d8ccc1] px-4 py-4 text-gray-600">
                            {row[3]}"
                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

              {/* MEASUREMENT HELP */}

              <div className="mt-8 p-5 bg-[#ebe2d8]">

                <h3 className="product-serif text-2xl text-[#3d5a45]">
                  How to measure
                </h3>

                <div className="grid sm:grid-cols-3 gap-5 mt-5">

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-[0.1em]">
                      Bust
                    </p>

                    <p className="mt-2 text-xs leading-5 text-gray-500">
                      Measure around the fullest part of
                      your bust.
                    </p>

                  </div>

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-[0.1em]">
                      Waist
                    </p>

                    <p className="mt-2 text-xs leading-5 text-gray-500">
                      Measure around the narrowest part
                      of your waist.
                    </p>

                  </div>

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-[0.1em]">
                      Hip
                    </p>

                    <p className="mt-2 text-xs leading-5 text-gray-500">
                      Measure around the fullest part of
                      your hips.
                    </p>

                  </div>

                </div>

              </div>

              {/* CLOSE */}

              <button
                onClick={() =>
                  setSizeChartOpen(
                    false
                  )
                }
                className="mt-7 w-full py-4 bg-[#3d5a45] text-white text-[10px] uppercase tracking-[0.2em] hover:bg-[#d4845a] transition"
              >
                Continue Shopping
              </button>

            </div>

          </div>

        </div>

      )}

      {/* =====================================================
          RELATED PRODUCTS
      ===================================================== */}

      <RelatedProducts
        currentProduct={product}
      />

    </>
  );
}

export default ProductDetail;