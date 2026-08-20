import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Link } from "react-router-dom";

import { ShopContext } from "../context/ShopContext.jsx";

// =========================================================
// BACKGROUND IMAGES
// SAME AS YOUR BOHEMIAN SECTION
// =========================================================

import leftBg from "../assets/left.png";
import rightBg from "../assets/right.png";


// =========================================================
// HOME PRODUCT SHOWCASE
// =========================================================

function HomeProductShowcase() {

  const {
    products = [],
    currency = "₹",
    addToCart,
  } = useContext(ShopContext) || {};


  // =======================================================
  // CATEGORIES
  // =======================================================

  const categories = [
    {
      label: "Men's Clothing",
      value: "Men",
    },
    {
      label: "Women's Clothing",
      value: "Women",
    },
    {
      label: "Kids Clothing",
      value: "Kids",
    },
    {
      label: "Accessories",
      value: "Accessories",
    },
  ];


  // =======================================================
  // ACTIVE CATEGORY
  //
  // WOMEN IS DEFAULT
  // =======================================================

  const [activeCategory, setActiveCategory] =
    useState("Women");


  // =======================================================
  // SLIDER
  // =======================================================

  const [startIndex, setStartIndex] =
    useState(0);


  // =======================================================
  // FILTER PRODUCTS
  // =======================================================

  const filteredProducts = useMemo(() => {

    if (
      !Array.isArray(products) ||
      products.length === 0
    ) {
      return [];
    }


    return products.filter(
      (product) => {

        const productCategory =
          String(
            product?.category || ""
          )
            .trim()
            .toLowerCase();


        const selectedCategory =
          String(
            activeCategory
          )
            .trim()
            .toLowerCase();


        return (
          productCategory ===
          selectedCategory
        );
      }
    );

  }, [
    products,
    activeCategory,
  ]);


  // =======================================================
  // RESET SLIDER WHEN CATEGORY CHANGES
  // =======================================================

  useEffect(() => {

    setStartIndex(0);

  }, [activeCategory]);


  // =======================================================
  // CURRENT VISIBLE PRODUCTS
  // =======================================================

  const visibleProducts =
    filteredProducts.slice(
      startIndex,
      startIndex + 4
    );


  // =======================================================
  // NEXT
  // =======================================================

  const handleNext = () => {

    if (
      startIndex + 4 <
      filteredProducts.length
    ) {

      setStartIndex(
        (prev) => prev + 1
      );

    }

  };


  // =======================================================
  // PREVIOUS
  // =======================================================

  const handlePrevious = () => {

    if (startIndex > 0) {

      setStartIndex(
        (prev) => prev - 1
      );

    }

  };


  // =======================================================
  // ADD TO CART
  // =======================================================

  const handleAddToCart = async (
    e,
    product
  ) => {

    e.preventDefault();
    e.stopPropagation();


    if (!addToCart) {

      console.warn(
        "addToCart is not available in ShopContext"
      );

      return;

    }


    try {

      const productId =
        product?._id ||
        product?.id;


      const size =
        product?.sizes?.[0] ||
        product?.size ||
        "M";


      await addToCart(
        productId,
        size,
        1
      );

    } catch (error) {

      console.error(
        "❌ Error adding product:",
        error
      );

    }

  };


  // =======================================================
  // DISCOUNT
  // =======================================================

  const getDiscount = (
    product
  ) => {

    if (
      product?.discount !== undefined &&
      product?.discount !== null &&
      product?.discount !== ""
    ) {

      const discount =
        Number(product.discount);


      if (
        Number.isFinite(discount) &&
        discount > 0
      ) {

        return Math.round(
          discount
        );

      }

    }


    if (
      product?.oldPrice &&
      Number(product.oldPrice) >
        Number(product.price)
    ) {

      return Math.round(
        (
          (
            Number(product.oldPrice) -
            Number(product.price)
          ) /
          Number(product.oldPrice)
        ) * 100
      );

    }


    if (
      product?.originalPrice &&
      Number(product.originalPrice) >
        Number(product.price)
    ) {

      return Math.round(
        (
          (
            Number(product.originalPrice) -
            Number(product.price)
          ) /
          Number(product.originalPrice)
        ) * 100
      );

    }


    return 0;

  };


  // =======================================================
  // OLD PRICE
  // =======================================================

  const getOldPrice = (
    product
  ) => {

    if (
      product?.oldPrice &&
      Number(product.oldPrice) >
        Number(product.price)
    ) {

      return Number(
        product.oldPrice
      );

    }


    if (
      product?.originalPrice &&
      Number(product.originalPrice) >
        Number(product.price)
    ) {

      return Number(
        product.originalPrice
      );

    }


    return null;

  };


  // =======================================================
  // FORMAT PRICE
  // =======================================================

  const formatPrice = (
    value
  ) => {

    return Number(
      value || 0
    ).toLocaleString(
      "en-IN"
    );

  };


  // =======================================================
  // CATEGORY HEADING
  // =======================================================

  const getCategoryHeading = () => {

    if (
      activeCategory === "Men"
    ) {

      return "Men's Clothing";

    }


    if (
      activeCategory === "Women"
    ) {

      return "Women's Clothing";

    }


    if (
      activeCategory === "Kids"
    ) {

      return "Kids Clothing";

    }


    if (
      activeCategory ===
      "Accessories"
    ) {

      return "Fashion Accessories";

    }


    return "Our Collection";

  };


  // =======================================================
  // RETURN
  // =======================================================

  return (

    <section
      className="
        relative
        w-full
        overflow-hidden
        py-16
        lg:py-24
      "
      style={{
        backgroundColor:
          "#fdf5ee",
      }}
    >

      {/* =====================================================
          LEFT BACKGROUND IMAGE

          EXACT SAME STYLE AS BOHEMIAN SECTION
      ====================================================== */}
{/* LEFT BACKGROUND IMAGE */}
<div
  className="
    absolute
    left-0
    top-0
    bottom-0
    w-[18%]
    max-w-[220px]
    z-10
    opacity-50
    pointer-events-none
  "
>
  <img
    src={leftBg}
    alt=""
    className="w-full h-full object-cover"
    style={{
      filter: "blur(8px)",
    }}
  />
</div>


{/* RIGHT BACKGROUND IMAGE */}
<div
  className="
    absolute
    right-0
    top-0
    bottom-0
    w-[18%]
    max-w-[220px]
    z-10
    opacity-50
    pointer-events-none
  "
>
  <img
    src={rightBg}
    alt=""
    className="w-full h-full object-cover"
    style={{
      filter: "blur(8px)",
    }}
  />
</div>


      {/* =====================================================
          MAIN CONTENT

          MUST BE ABOVE BACKGROUND
      ====================================================== */}

      <div
        className="
          relative
          z-20
          max-w-7xl
          mx-auto
          px-6
          lg:px-12
        "
      >


        {/* ===================================================
            HEADER
        ==================================================== */}

        <div
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-end
            lg:justify-between
            gap-8
            mb-12
          "
        >


          {/* ===============================================
              TITLE
          ================================================ */}

          <div
            className="
              max-w-2xl
            "
          >

            <span
              className="
                text-sm
                tracking-widest
                text-[#2a2a2a]/60
                mb-3
                block
              "
            >
              Fashion
            </span>


            <h2
              className="
                leading-tight
              "
              style={{
                fontSize:
                  "clamp(2.2rem, 4vw, 3.8rem)",
              }}
            >

              <span
                className="
                  block
                  text-[#d4845a]
                  italic
                "
                style={{
                  fontFamily:
                    "'Cormorant Garamond', serif",
                  fontWeight: 700,
                }}
              >
                Immerse yourself
              </span>


              <span
                className="
                  block
                  text-[#2a2a2a]
                "
                style={{
                  fontFamily:
                    "'Cormorant Garamond', serif",
                  fontWeight: 400,
                }}
              >
                in the amazing
              </span>


              <span
                className="
                  block
                  text-[#2a2a2a]
                "
                style={{
                  fontFamily:
                    "'Cormorant Garamond', serif",
                  fontWeight: 400,
                }}
              >
                wardrobe
              </span>

            </h2>


            <p
              className="
                mt-5
                text-[#4a4a4a]
                text-sm
                leading-relaxed
                max-w-xl
              "
            >
              Discover thoughtfully selected
              pieces designed for comfort,
              confidence, and effortless
              everyday style.
            </p>

          </div>


          {/* ===============================================
              CATEGORY BUTTONS
          ================================================ */}

          <div
            className="
              flex
              flex-wrap
              gap-3
              lg:max-w-xl
              lg:justify-end
            "
          >

            {categories.map(
              (category) => {

                const isActive =
                  activeCategory ===
                  category.value;


                return (

                  <button
                    key={
                      category.value
                    }
                    type="button"
                    onClick={() => {

                      setActiveCategory(
                        category.value
                      );

                    }}
                    className={`
                      px-5
                      py-3
                      rounded-full
                      text-[11px]
                      font-semibold
                      whitespace-nowrap
                      transition-all
                      duration-300
                      border

                      ${
                        isActive
                          ? "bg-[#3d5a45] text-white border-[#3d5a45] shadow-md"
                          : "bg-transparent text-[#3d5a45] border-[#8da08f] hover:bg-[#3d5a45] hover:text-white"
                      }
                    `}
                  >

                    {category.label}

                  </button>

                );

              }
            )}

          </div>

        </div>


        {/* ===================================================
            CURRENT CATEGORY
        ==================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            mb-5
          "
        >

          <div>

            <span
              className="
                text-[10px]
                uppercase
                tracking-[0.25em]
                text-[#d4845a]
                font-semibold
              "
            >
              Featured Collection
            </span>


            <h3
              className="
                mt-1
                text-3xl
                text-[#2a2a2a]
              "
              style={{
                fontFamily:
                  "'Cormorant Garamond', serif",
              }}
            >
              {getCategoryHeading()}
            </h3>

          </div>


          <span
            className="
              hidden
              sm:block
              text-xs
              text-[#4a4a4a]/70
            "
          >
            {filteredProducts.length}{" "}
            products
          </span>

        </div>


        {/* ===================================================
            PRODUCT AREA
        ==================================================== */}

        <div
          className="
            relative
          "
        >


          {/* ===============================================
              NO PRODUCTS
          ================================================ */}

          {visibleProducts.length === 0 ? (

            <div
              className="
                min-h-[400px]
                flex
                flex-col
                items-center
                justify-center
                text-center
              "
            >

              <span
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.3em]
                  text-[#d4845a]
                "
              >
                Coming Soon
              </span>


              <h3
                className="
                  mt-3
                  text-4xl
                  text-[#2a2a2a]
                "
                style={{
                  fontFamily:
                    "'Cormorant Garamond', serif",
                }}
              >
                No products found
              </h3>


              <p
                className="
                  mt-3
                  text-sm
                  text-gray-500
                "
              >
                New pieces will appear
                here soon.
              </p>

            </div>

          ) : (

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-4
                gap-5
              "
            >

              {visibleProducts.map(
                (product) => {

                  const productId =
                    product?._id ||
                    product?.id;


                  const image =
                    product?.image1 ||
                    product?.image ||
                    product?.images?.[0];


                  const discount =
                    getDiscount(
                      product
                    );


                  const oldPrice =
                    getOldPrice(
                      product
                    );


                  return (

                    <Link
                      key={productId}
                      to={`/product/${productId}`}
                      className="
                        group
                        block
                      "
                    >

                      {/* ==================================
                          PRODUCT CARD
                      =================================== */}

                      <div
                        className="
                          relative
                          bg-[#f7dcc5]
                          rounded-2xl
                          overflow-hidden
                          min-h-[490px]
                          transition-all
                          duration-300
                          hover:-translate-y-1
                          hover:shadow-xl
                        "
                      >


                        {/* =================================
                            DISCOUNT
                        ================================== */}

                        {discount > 0 && (

                          <div
                            className="
                              absolute
                              top-4
                              left-4
                              z-10
                            "
                          >

                            <span
                              className="
                                inline-flex
                                items-center
                                justify-center
                                px-3
                                py-1.5
                                rounded-full
                                border
                                border-[#3d3d3d]
                                bg-[#fdf5ee]/80
                                backdrop-blur-sm
                                text-[10px]
                                font-semibold
                                text-[#333]
                              "
                            >
                              {discount}%
                            </span>

                          </div>

                        )}


                        {/* =================================
                            IMAGE
                        ================================== */}

                        <div
                          className="
                            h-[285px]
                            flex
                            items-center
                            justify-center
                            overflow-hidden
                            px-8
                            pt-8
                          "
                        >

                          <img
                            src={image}
                            alt={
                              product?.name ||
                              "Product"
                            }
                            className="
                              w-full
                              h-full
                              object-contain
                              transition-transform
                              duration-700
                              group-hover:scale-105
                            "
                          />

                        </div>


                        {/* =================================
                            PRODUCT DETAILS
                        ================================== */}

                        <div
                          className="
                            px-5
                            pb-5
                          "
                        >

                          {/* CATEGORY */}

                          <p
                            className="
                              text-[11px]
                              text-[#2a2a2a]/70
                              mb-2
                            "
                          >
                            {
                              product?.category
                            }
                          </p>


                          {/* PRODUCT NAME */}

                          <h3
                            className="
                              text-[21px]
                              leading-tight
                              text-[#242424]
                              line-clamp-2
                              min-h-[52px]
                            "
                            style={{
                              fontFamily:
                                "'Cormorant Garamond', serif",
                              fontWeight: 600,
                            }}
                          >
                            {
                              product?.name
                            }
                          </h3>


                          {/* STARS */}

                          <div
                            className="
                              flex
                              items-center
                              gap-1
                              mt-3
                            "
                          >

                            {[1, 2, 3, 4, 5].map(
                              (star) => (

                                <span
                                  key={star}
                                  className="
                                    text-[#78917d]
                                    text-sm
                                  "
                                >
                                  ☆
                                </span>

                              )
                            )}

                          </div>


                          {/* PRICE + CART */}

                          <div
                            className="
                              flex
                              items-end
                              justify-between
                              gap-3
                              mt-4
                            "
                          >

                            {/* PRICE */}

                            <div>

                              <p
                                className="
                                  font-semibold
                                  text-[15px]
                                  leading-tight
                                  text-[#202020]
                                "
                              >

                                {currency}
                                {formatPrice(
                                  product?.price
                                )}

                              </p>


                              {oldPrice && (

                                <p
                                  className="
                                    text-[12px]
                                    text-gray-500
                                    line-through
                                    mt-1
                                  "
                                >

                                  {currency}
                                  {formatPrice(
                                    oldPrice
                                  )}

                                </p>

                              )}

                            </div>


                            {/* ADD TO CART */}

                            <button
                              type="button"
                              onClick={(
                                e
                              ) =>
                                handleAddToCart(
                                  e,
                                  product
                                )
                              }
                              className="
                                shrink-0
                                px-5
                                py-3
                                rounded-full
                                bg-[#ed965d]
                                hover:bg-[#d9834c]
                                text-white
                                text-[11px]
                                font-semibold
                                transition-all
                                duration-300
                                hover:shadow-md
                              "
                            >

                              Add to Cart

                              <span className="ml-2">
                                ♡
                              </span>

                            </button>

                          </div>

                        </div>

                      </div>

                    </Link>

                  );

                }
              )}

            </div>

          )}


          {/* =================================================
              PREVIOUS
          ================================================== */}

          <button
            type="button"
            onClick={
              handlePrevious
            }
            disabled={
              startIndex === 0
            }
            className={`
              absolute
              left-2
              lg:-left-5
              top-1/2
              -translate-y-1/2
              z-30
              w-10
              h-10
              rounded-lg
              flex
              items-center
              justify-center
              bg-white/90
              shadow-md
              transition-all

              ${
                startIndex === 0
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-[#3d5a45] hover:text-white"
              }
            `}
            aria-label="Previous products"
          >

            <span
              className="
                text-xl
              "
            >
              ←
            </span>

          </button>


          {/* =================================================
              NEXT
          ================================================== */}

          <button
            type="button"
            onClick={
              handleNext
            }
            disabled={
              startIndex + 4 >=
              filteredProducts.length
            }
            className={`
              absolute
              right-2
              lg:-right-5
              top-1/2
              -translate-y-1/2
              z-30
              w-10
              h-10
              rounded-lg
              flex
              items-center
              justify-center
              bg-white/90
              shadow-md
              transition-all

              ${
                startIndex + 4 >=
                filteredProducts.length
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-[#3d5a45] hover:text-white"
              }
            `}
            aria-label="Next products"
          >

            <span
              className="
                text-xl
              "
            >
              →
            </span>

          </button>

        </div>


        {/* ===================================================
            CHECK MORE PRODUCTS
        ==================================================== */}

        <div
          className="
            flex
            justify-center
            mt-12
          "
        >

          <Link
            to={`/profile/collection?category=${activeCategory}`}
            className="
              inline-flex
              items-center
              gap-3
              bg-[#3d5a45]
              hover:bg-[#304936]
              text-white
              px-7
              py-3.5
              rounded-full
              text-[11px]
              uppercase
              tracking-[0.18em]
              font-semibold
              transition-all
              duration-300
            "
          >

            Check More Products

            <span
              className="
                text-lg
                leading-none
              "
            >
              →
            </span>

          </Link>

        </div>

      </div>

    </section>
  );
}


export default HomeProductShowcase;