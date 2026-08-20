import React, {
  useContext,
  useMemo,
} from "react";

import {
  ShopContext,
} from "../context/ShopContext.jsx";

import {
  Link,
} from "react-router-dom";

console.log(
  "🔥🔥🔥 LatestCollection FILE LOADED 🔥🔥🔥"
);

function LatestCollection() {

  const {
    products = [],
    currency = "₹",
  } = useContext(ShopContext) || {};

  console.log(
    "LATEST COLLECTION PRODUCTS:",
    products
  );

  // =========================================================
  // GET LATEST PRODUCTS
  // =========================================================

  const latestProducts = useMemo(() => {

    return products.slice(0, 8);

  }, [products]);

  return (

    <section className="min-h-screen bg-[#fdf5ee] py-16">

      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="text-center mb-14">

          <span className="text-[10px] tracking-[0.3em] uppercase text-[#d4845a]">
            Just Arrived
          </span>

          <h1
            className="mt-3 text-5xl md:text-6xl text-[#2a2a2a]"
            style={{
              fontFamily:
                "'Cormorant Garamond', serif",
            }}
          >
            Latest Collection
          </h1>

          <p className="mt-4 max-w-xl mx-auto text-sm text-[#4a4a4a] leading-6">
            Discover our newest arrivals, thoughtfully selected for
            the modern Aurevia wardrobe.
          </p>

        </div>

        {/* =====================================================
            PRODUCTS
        ====================================================== */}

        {latestProducts.length === 0 ? (

          <div className="text-center py-20">

            <h2
              className="text-3xl text-[#2a2a2a]"
              style={{
                fontFamily:
                  "'Cormorant Garamond', serif",
              }}
            >
              No new arrivals yet
            </h2>

            <p className="mt-3 text-sm text-gray-500">
              New pieces will appear here soon.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">

            {latestProducts.map((product) => {

              const productId =
                product._id || product.id;

              const subcategory =
                product.subcategory ||
                product.subCategory ||
                "";

              return (

                <Link
                  key={productId}
                  to={`/profile/product/${productId}`}
                  className="group block"
                >

                  {/* =================================================
                      IMAGE
                  ================================================== */}

                  <div className="relative aspect-[0.82] overflow-hidden bg-[#eee3d9]">

                    <img
                      src={
                        product.image1 ||
                        product.image ||
                        product.images?.[0]
                      }
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* NEW BADGE */}

                    <span className="absolute top-3 left-3 bg-[#d4845a] text-white px-3 py-1 text-[8px] uppercase tracking-[0.18em]">
                      New
                    </span>

                    {/* HOVER OVERLAY */}

                    <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">

                      <div className="bg-[#3d5a45]/95 text-white text-center py-3">

                        <span className="text-[9px] uppercase tracking-[0.2em]">
                          View Product
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* =================================================
                      DETAILS
                  ================================================== */}

                  <div className="mt-5">

                    <p className="text-[9px] uppercase tracking-[0.2em] text-[#2a2a2a]/50">
                      {product.category}
                    </p>

                    <div className="flex justify-between items-start gap-4">

                      <div>

                        <h2
                          className="mt-1 text-[23px] text-[#2a2a2a]"
                          style={{
                            fontFamily:
                              "'Cormorant Garamond', serif",
                            fontWeight: 600,
                          }}
                        >
                          {product.name}
                        </h2>

                        <p className="mt-1 text-[10px] text-gray-500">
                          {subcategory}
                        </p>

                      </div>

                      <span
                        className="text-lg whitespace-nowrap text-[#d4845a]"
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

        )}

      </div>

    </section>
  );
}

export default LatestCollection;