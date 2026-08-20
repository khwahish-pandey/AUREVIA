import React, {
  useContext,
  useMemo,
  useState,
} from "react";

import {
  Link,
  useSearchParams,
} from "react-router-dom";

import { ShopContext } from "../context/ShopContext.jsx";

function Collection() {

  const {
    products = [],
    currency = "₹",
  } = useContext(ShopContext) || {};


  // =========================================================
  // URL SEARCH PARAMS
  // =========================================================

  const [searchParams] = useSearchParams();

  const searchQuery =
    searchParams.get("search")?.trim().toLowerCase() || "";

  const urlCategory =
    searchParams.get("category")?.trim() || "";

  const urlSubcategory =
    searchParams.get("subcategory")?.trim() || "";


  // =========================================================
  // FILTER STATE
  // =========================================================

  const [selectedCategories, setSelectedCategories] =
    useState([]);

  const [selectedSubcategories, setSelectedSubcategories] =
    useState([]);

  const [sortOption, setSortOption] =
    useState("default");


  // =========================================================
  // CATEGORIES
  // =========================================================

  const categories = useMemo(() => {

    return [
      ...new Set(
        products
          .map((product) => product.category)
          .filter(Boolean)
      ),
    ];

  }, [products]);


  // =========================================================
  // SUBCATEGORIES
  // =========================================================

  const subcategories = useMemo(() => {

    return [
      ...new Set(
        products
          .map(
            (product) =>
              product.subcategory ||
              product.subCategory
          )
          .filter(Boolean)
      ),
    ];

  }, [products]);


  // =========================================================
  // CATEGORY FILTER
  // =========================================================

  const handleCategoryChange = (category) => {

    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );

  };


  // =========================================================
  // SUBCATEGORY FILTER
  // =========================================================

  const handleSubcategoryChange = (subcategory) => {

    setSelectedSubcategories((prev) =>
      prev.includes(subcategory)
        ? prev.filter((item) => item !== subcategory)
        : [...prev, subcategory]
    );

  };


  // =========================================================
  // CLEAR FILTERS
  // =========================================================

  const clearFilters = () => {

    setSelectedCategories([]);
    setSelectedSubcategories([]);

  };


  // =========================================================
  // FILTER PRODUCTS
  // =========================================================

  const filteredProducts = useMemo(() => {

    let result = [...products];


    // =======================================================
    // SEARCH
    // =======================================================

    if (searchQuery) {

      const searchWords = searchQuery
        .split(/\s+/)
        .filter(Boolean);


      result = result.filter((product) => {

        const searchableText = [

          product.name,

          product.description,

          product.category,

          product.subcategory,

          product.subCategory,

        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();


        /*
          EVERY search word must be found somewhere
          in the product information.
        */

        return searchWords.every((word) =>
          searchableText.includes(word)
        );

      });

    }


    // =======================================================
    // URL CATEGORY
    // =======================================================

    if (urlCategory) {

      result = result.filter(
        (product) =>
          String(product.category || "")
            .toLowerCase() ===
          urlCategory.toLowerCase()
      );

    }


    // =======================================================
    // URL SUBCATEGORY
    // =======================================================

    if (urlSubcategory) {

      result = result.filter(
        (product) => {

          const subcategory =
            product.subcategory ||
            product.subCategory ||
            "";

          return (
            String(subcategory).toLowerCase() ===
            urlSubcategory.toLowerCase()
          );

        }
      );

    }


    // =======================================================
    // SIDEBAR CATEGORY
    // =======================================================

    if (selectedCategories.length > 0) {

      result = result.filter((product) =>
        selectedCategories.includes(
          product.category
        )
      );

    }


    // =======================================================
    // SIDEBAR SUBCATEGORY
    // =======================================================

    if (selectedSubcategories.length > 0) {

      result = result.filter((product) => {

        const subcategory =
          product.subcategory ||
          product.subCategory ||
          "";

        return selectedSubcategories.includes(
          subcategory
        );

      });

    }


    // =======================================================
    // SORT
    // =======================================================

    if (sortOption === "low-high") {

      result.sort(
        (a, b) =>
          Number(a.price || 0) -
          Number(b.price || 0)
      );

    }


    if (sortOption === "high-low") {

      result.sort(
        (a, b) =>
          Number(b.price || 0) -
          Number(a.price || 0)
      );

    }


    return result;

  }, [
    products,
    searchQuery,
    urlCategory,
    urlSubcategory,
    selectedCategories,
    selectedSubcategories,
    sortOption,
  ]);


  // =========================================================
  // RETURN
  // =========================================================

  return (

    <section className="min-h-screen bg-[#fdf5ee] py-16">

      <div className="max-w-7xl mx-auto px-6 lg:px-12">


        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="text-center mb-14">

          <span className="text-[10px] tracking-[0.3em] uppercase text-[#d4845a]">
            {searchQuery
              ? "Search Results"
              : "Explore"}
          </span>


          <h1
            className="mt-3 text-5xl md:text-6xl text-[#2a2a2a]"
            style={{
              fontFamily:
                "'Cormorant Garamond', serif",
            }}
          >

            {searchQuery
              ? `Results for "${searchQuery}"`
              : "Our Collection"}

          </h1>


          <p className="mt-4 max-w-xl mx-auto text-sm text-[#4a4a4a] leading-6">

            {searchQuery
              ? "Showing products matching your search across product name, description, category and subcategory."
              : "Explore our complete collection, thoughtfully curated for the modern Aurevia wardrobe."}

          </p>


          {searchQuery && (

            <p className="mt-3 text-xs text-gray-500">

              {filteredProducts.length}

              {" "}

              {filteredProducts.length === 1
                ? "product"
                : "products"}

              {" "}found

            </p>

          )}

        </div>



        {/* ===================================================
            MAIN
        =================================================== */}

        <div className="flex flex-col lg:flex-row gap-10">


          {/* =================================================
              SIDEBAR
          ================================================= */}

          <aside className="w-full lg:w-60 flex-shrink-0">

            <div className="bg-white p-6">

              <div className="flex items-center justify-between mb-6">

                <h2
                  className="text-2xl text-[#2a2a2a]"
                  style={{
                    fontFamily:
                      "'Cormorant Garamond', serif",
                  }}
                >
                  Filters
                </h2>


                {(selectedCategories.length > 0 ||
                  selectedSubcategories.length > 0) && (

                  <button
                    onClick={clearFilters}
                    className="text-[9px] uppercase tracking-[0.15em] text-[#d4845a]"
                  >
                    Clear
                  </button>

                )}

              </div>


              {/* CATEGORY */}

              <div className="border-t border-gray-200 pt-5">

                <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#2a2a2a] mb-4">
                  Category
                </h3>


                <div className="space-y-3">

                  {categories.map((category) => (

                    <label
                      key={category}
                      className="flex items-center gap-3 cursor-pointer"
                    >

                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(
                          category
                        )}
                        onChange={() =>
                          handleCategoryChange(
                            category
                          )
                        }
                        className="accent-[#d4845a]"
                      />

                      <span className="text-sm text-gray-600">
                        {category}
                      </span>

                    </label>

                  ))}

                </div>

              </div>


              {/* SUBCATEGORY */}

              <div className="border-t border-gray-200 pt-5 mt-6">

                <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#2a2a2a] mb-4">
                  Subcategory
                </h3>


                <div className="space-y-3">

                  {subcategories.map(
                    (subcategory) => (

                      <label
                        key={subcategory}
                        className="flex items-center gap-3 cursor-pointer"
                      >

                        <input
                          type="checkbox"
                          checked={selectedSubcategories.includes(
                            subcategory
                          )}
                          onChange={() =>
                            handleSubcategoryChange(
                              subcategory
                            )
                          }
                          className="accent-[#d4845a]"
                        />

                        <span className="text-sm text-gray-600">
                          {subcategory}
                        </span>

                      </label>

                    )
                  )}

                </div>

              </div>

            </div>

          </aside>



          {/* =================================================
              PRODUCTS
          ================================================= */}

          <div className="flex-1">


            {/* TOP BAR */}

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">

              <p className="text-xs text-gray-500">

                Showing{" "}

                <span className="text-[#2a2a2a] font-medium">
                  {filteredProducts.length}
                </span>

                {" "}

                {filteredProducts.length === 1
                  ? "product"
                  : "products"}

              </p>


              <div className="flex items-center gap-3">

                <label className="text-[10px] uppercase tracking-[0.15em] text-gray-500">
                  Sort By
                </label>


                <select
                  value={sortOption}
                  onChange={(e) =>
                    setSortOption(e.target.value)
                  }
                  className="bg-white border border-gray-200 px-4 py-2 text-xs text-[#2a2a2a] outline-none"
                >

                  <option value="default">
                    Recommended
                  </option>

                  <option value="low-high">
                    Price: Low to High
                  </option>

                  <option value="high-low">
                    Price: High to Low
                  </option>

                </select>

              </div>

            </div>



            {/* SEARCH */}

            {searchQuery && (

              <div className="mb-6 flex items-center justify-between bg-white px-5 py-4">

                <div>

                  <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400">
                    Active Search
                  </p>

                  <p className="mt-1 text-sm text-[#2a2a2a]">
                    "{searchQuery}"
                  </p>

                </div>


                <Link
                  to="../collection"
                  className="text-[9px] uppercase tracking-[0.15em] text-[#d4845a]"
                >
                  Clear Search
                </Link>

              </div>

            )}



            {/* =================================================
                PRODUCT GRID
            ================================================= */}

            {filteredProducts.length === 0 ? (

              <div className="bg-white py-24 text-center">

                <h2
                  className="text-3xl text-[#2a2a2a]"
                  style={{
                    fontFamily:
                      "'Cormorant Garamond', serif",
                  }}
                >
                  No products found
                </h2>


                <p className="mt-3 text-sm text-gray-500">

                  {searchQuery
                    ? `No products contain "${searchQuery}" in their name, description, category or subcategory.`
                    : "Try changing your filters."}

                </p>


                {searchQuery && (

                  <Link
                    to="../collection"
                    className="inline-block mt-6 px-5 py-2 bg-[#3d5a45] text-white text-xs uppercase tracking-[0.15em]"
                  >
                    View All Products
                  </Link>

                )}

              </div>

            ) : (

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">

                {filteredProducts.map((product) => {

                  const productId =
                    product._id || product.id;

                  const subcategory =
                    product.subcategory ||
                    product.subCategory ||
                    "";


                  return (

                    /*
                     * IMPORTANT:
                     *
                     * ../product/:productId
                     *
                     * is used because Collection and
                     * ProductDetail are siblings inside
                     * Home's nested Routes.
                     */

                    <Link
                      key={productId}
                      to={`../product/${productId}`}
                      className="group block"
                    >


                      {/* IMAGE */}

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


                        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">

                          <div className="bg-[#3d5a45]/95 text-white text-center py-3">

                            <span className="text-[9px] uppercase tracking-[0.2em]">
                              View Product
                            </span>

                          </div>

                        </div>

                      </div>



                      {/* DETAILS */}

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

        </div>

      </div>

    </section>

  );
}

export default Collection;