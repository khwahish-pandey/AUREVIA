import React, { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";

function RelatedProducts({ currentProduct }) {
  const {
    products = [],
    currency = "₹",
  } = useContext(ShopContext) || {};

  // =========================================================
  // FIND RELATED PRODUCTS
  // =========================================================

  const relatedProducts = useMemo(() => {
    if (!currentProduct || !products.length) {
      return [];
    }

    const currentId =
      currentProduct._id || currentProduct.id;

    const currentCategory =
      String(currentProduct.category || "")
        .trim()
        .toLowerCase();

    const currentSubcategory =
      String(
        currentProduct.subcategory ||
        currentProduct.subCategory ||
        ""
      )
        .trim()
        .toLowerCase();

    // -------------------------------------------------------
    // REMOVE CURRENT PRODUCT
    // -------------------------------------------------------

    const otherProducts = products.filter((product) => {
      const productId =
        product._id || product.id;

      return String(productId) !== String(currentId);
    });

    // -------------------------------------------------------
    // SAME SUBCATEGORY
    // -------------------------------------------------------

    const sameSubcategory = otherProducts.filter(
      (product) => {

        const subcategory =
          String(
            product.subcategory ||
            product.subCategory ||
            ""
          )
            .trim()
            .toLowerCase();

        return (
          currentSubcategory &&
          subcategory === currentSubcategory
        );
      }
    );

    // -------------------------------------------------------
    // SAME CATEGORY
    // -------------------------------------------------------

    const sameCategory = otherProducts.filter(
      (product) => {

        const category =
          String(product.category || "")
            .trim()
            .toLowerCase();

        return (
          currentCategory &&
          category === currentCategory
        );
      }
    );

    // -------------------------------------------------------
    // COMBINE
    //
    // Same subcategory products come first.
    // Same category products fill remaining spaces.
    // -------------------------------------------------------

    const combined = [
      ...sameSubcategory,
      ...sameCategory,
    ];

    // -------------------------------------------------------
    // REMOVE DUPLICATES
    // -------------------------------------------------------

    const uniqueProducts = [];

    const seenIds = new Set();

    combined.forEach((product) => {

      const id =
        product._id || product.id;

      if (!seenIds.has(String(id))) {

        seenIds.add(String(id));

        uniqueProducts.push(product);
      }
    });

    // -------------------------------------------------------
    // ONLY SHOW 4
    // -------------------------------------------------------

    return uniqueProducts.slice(0, 4);

  }, [products, currentProduct]);


  // =========================================================
  // DON'T SHOW SECTION IF NOTHING RELATED EXISTS
  // =========================================================

  if (!relatedProducts.length) {
    return null;
  }


  // =========================================================
  // UI
  // =========================================================

  return (
    <section
      className="w-full py-16 md:py-20"
      style={{
        backgroundColor: "#fdf5ee",
      }}
    >

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* =================================================
            SECTION HEADER
        ================================================= */}

        <div className="flex items-center justify-between mb-8">

          <h2
            className="text-2xl md:text-3xl text-[#2a2a2a]"
            style={{
              fontFamily:
                "'Cormorant Garamond', serif",
              fontWeight: 600,
            }}
          >
            You may also like
          </h2>


          <Link
            to="../collection"
            className="hidden sm:block text-xs text-[#2a2a2a] underline underline-offset-4 hover:text-[#d4845a] transition-colors"
          >
            See all collection
          </Link>

        </div>


        {/* =================================================
            PRODUCT GRID
        ================================================= */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">

          {relatedProducts.map((product) => {

            const productId =
              product._id || product.id;

            const image =
              product.image1 ||
              product.image ||
              product.images?.[0];

            const subcategory =
              product.subcategory ||
              product.subCategory ||
              "";

            return (

              <Link
                key={productId}
                to={`../product/${productId}`}
                className="group block"
              >

                {/* =================================================
                    IMAGE
                ================================================= */}

                <div
                  className="relative w-full overflow-hidden"
                  style={{
                    aspectRatio: "0.82",
                    backgroundColor: "#eee5dc",
                  }}
                >

                  {image ? (

                    <img
                      src={image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                  ) : (

                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                      No image
                    </div>

                  )}


                  {/* =================================================
                      HOVER BUTTON
                  ================================================= */}

                  <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">

                    <div className="bg-[#3d5a45]/95 text-white text-center py-3">

                      <span className="text-[9px] uppercase tracking-[0.2em]">
                        View Product
                      </span>

                    </div>

                  </div>

                </div>


                {/* =================================================
                    PRODUCT DETAILS
                ================================================= */}

                <div className="mt-4">

                  {/* CATEGORY */}

                  <p className="text-[9px] uppercase tracking-[0.18em] text-[#2a2a2a]/45 mb-1">
                    {product.category}
                  </p>


                  {/* NAME + PRICE */}

                  <div className="flex justify-between items-start gap-3">

                    <div className="min-w-0">

                      <h3
                        className="text-[17px] md:text-[19px] leading-tight text-[#2a2a2a] group-hover:text-[#d4845a] transition-colors"
                        style={{
                          fontFamily:
                            "'Cormorant Garamond', serif",
                          fontWeight: 600,
                        }}
                      >
                        {product.name}
                      </h3>


                      {subcategory && (

                        <p className="text-[9px] text-gray-500 mt-1">
                          {subcategory}
                        </p>

                      )}

                    </div>


                    <span
                      className="text-sm md:text-base whitespace-nowrap text-[#d4845a]"
                      style={{
                        fontFamily:
                          "'Cormorant Garamond', serif",
                      }}
                    >
                      {currency}
                      {Number(
                        product.price || 0
                      ).toLocaleString("en-IN")}
                    </span>

                  </div>

                </div>

              </Link>

            );

          })}

        </div>


        {/* =================================================
            MOBILE LINK
        ================================================= */}

        <div className="sm:hidden text-center mt-8">

          <Link
            to="../collection"
            className="text-xs text-[#2a2a2a] underline underline-offset-4"
          >
            See all collection
          </Link>

        </div>

      </div>

    </section>
  );
}

export default RelatedProducts;