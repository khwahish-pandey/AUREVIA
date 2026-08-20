import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext.jsx";

const ProductList = () => {
  const { serverurl } = useContext(AuthContext) || {};

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);

  const [activeImages, setActiveImages] = useState({});

  // ==========================================
  // FETCH PRODUCTS
  // ==========================================

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${serverurl}/api/product/listproduct`
      );

      console.log("PRODUCT RESPONSE:", response.data);

      const productData =
        response.data.products || response.data;

      setProducts(productData);

    } catch (error) {
      console.error("Error fetching products:", error);

      alert(
        error.response?.data?.message ||
          "Failed to load products"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // FETCH ON PAGE LOAD
  // ==========================================

  useEffect(() => {
    if (serverurl) {
      fetchProducts();
    }
  }, [serverurl]);

  // ==========================================
  // GET PRODUCT IMAGES
  // ==========================================

  const getImages = (product) => {
    return [
      product.image1,
      product.image2,
      product.image3,
      product.image4,
    ].filter(Boolean);
  };

  // ==========================================
  // CHANGE ACTIVE IMAGE
  // ==========================================

  const handleImageSelect = (productId, index) => {
    setActiveImages((prev) => ({
      ...prev,
      [productId]: index,
    }));
  };

  // ==========================================
  // DELETE PRODUCT
  // ==========================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      const response = await axios.post(
        `${serverurl}/api/product/removeproduct/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setProducts((prev) =>
          prev.filter((product) => product._id !== id)
        );
      }

    } catch (error) {
      console.error("Delete product error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete product"
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      {/* ========================================
          FONTS + CUSTOM STYLES
      ======================================== */}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600&display=swap');

        .products-page {
          font-family: 'DM Sans', sans-serif;
        }

        .products-heading {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 500;
          letter-spacing: -0.02em;
        }

        .product-name {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 600;
        }

        .editorial-label {
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.2em;
        }

        .product-image {
          transition:
            transform 0.6s ease,
            opacity 0.3s ease;
        }

        .product-card:hover .product-image {
          transform: scale(1.025);
        }

        .thumbnail-image {
          transition: opacity 0.25s ease;
        }

        .thumbnail-image:hover {
          opacity: 1;
        }

        .delete-button {
          transition:
            color 0.25s ease,
            border-color 0.25s ease;
        }

        .delete-button:hover {
          color: #d4845a;
          border-color: #d4845a;
        }

        .image-modal {
          animation: fadeIn 0.25s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }
      `}</style>


      {/* ========================================
          PAGE
      ======================================== */}

      <div
        className="products-page min-h-screen w-full overflow-hidden py-12 lg:py-16"
        style={{
          backgroundColor: "#fdf5ee",
          color: "#2a2a2a",
        }}
      >

        <div className="mx-auto max-w-7xl px-6 lg:px-12">

          {/* ======================================
              HEADER
          ====================================== */}

          <div className="mb-12 flex flex-col justify-between gap-8 border-b border-[#2a2a2a]/15 pb-8 md:flex-row md:items-end">

            <div>

              <span className="editorial-label mb-3 block text-[10px] font-medium uppercase text-[#2a2a2a]/50">
                Store Management
              </span>

              <h1
                className="products-heading text-5xl leading-none md:text-6xl"
                style={{
                  color: "#2a2a2a",
                }}
              >
                Product Collection
              </h1>

              <p className="mt-4 max-w-lg text-sm font-light leading-6 text-[#4a4a4a]">
                Browse, review and manage the pieces currently
                available in your collection.
              </p>

            </div>


            {/* PRODUCT COUNT */}

            <div className="flex items-center gap-4">

              <div className="h-px w-10 bg-[#d4845a]" />

              <div>

                <span className="editorial-label block text-[9px] uppercase text-[#2a2a2a]/50">
                  Collection
                </span>

                <span
                  className="products-heading text-3xl"
                  style={{
                    color: "#d4845a",
                  }}
                >
                  {products.length}
                </span>

              </div>

            </div>

          </div>


          {/* ======================================
              LOADING
          ====================================== */}

          {loading && (

            <div className="flex min-h-[350px] items-center justify-center">

              <div className="text-center">

                <div
                  className="mx-auto h-8 w-8 animate-spin rounded-full border"
                  style={{
                    borderColor: "#d8c8bb",
                    borderTopColor: "#d4845a",
                  }}
                />

                <p className="editorial-label mt-5 text-[9px] uppercase text-[#2a2a2a]/50">
                  Loading collection
                </p>

              </div>

            </div>

          )}


          {/* ======================================
              EMPTY STATE
          ====================================== */}

          {!loading && products.length === 0 && (

            <div className="py-28 text-center">

              <div
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border"
                style={{
                  borderColor: "#2a2a2a",
                }}
              >
                <span
                  className="products-heading text-2xl"
                  style={{
                    color: "#d4845a",
                  }}
                >
                  +
                </span>
              </div>

              <h2 className="products-heading mt-6 text-3xl">
                Your collection is empty
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm font-light leading-6 text-[#4a4a4a]">
                Products added through your Add Product
                page will appear here.
              </p>

            </div>

          )}


          {/* ======================================
              PRODUCT GRID
          ====================================== */}

          {!loading && products.length > 0 && (

            <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">

              {products.map((product) => {

                const images = getImages(product);

                const activeIndex =
                  activeImages[product._id] ?? 0;

                const mainImage =
                  images[activeIndex] || images[0];

                return (

                  <div
                    key={product._id}
                    className="product-card min-w-0"
                  >

                    {/* ==================================
                        MAIN IMAGE
                    ================================== */}

                    <div className="relative">

                      <button
                        type="button"
                        onClick={() =>
                          setSelectedImage(mainImage)
                        }
                        className="relative block aspect-[0.95] w-full overflow-hidden bg-[#eee3d9]"
                      >

                        <img
                          src={mainImage}
                          alt={product.name}
                          className="product-image h-full w-full object-cover"
                        />

                      </button>


                      {/* IMAGE COUNT */}

                      <div
                        className="absolute right-3 top-3 px-2.5 py-1 text-[8px] uppercase tracking-[0.15em]"
                        style={{
                          backgroundColor:
                            "rgba(253,245,238,0.9)",
                          color: "#2a2a2a",
                        }}
                      >
                        {images.length} Images
                      </div>


                      {/* BESTSELLER */}

                      {product.bestseller && (

                        <div
                          className="absolute left-3 top-3 px-2.5 py-1 text-[8px] uppercase tracking-[0.15em]"
                          style={{
                            backgroundColor: "#d4845a",
                            color: "white",
                          }}
                        >
                          Bestseller
                        </div>

                      )}

                    </div>


                    {/* ==================================
                        IMAGE THUMBNAILS
                    ================================== */}

                    <div className="mt-2 grid grid-cols-4 gap-1.5">

                      {images.map((image, index) => (

                        <button
                          key={index}
                          type="button"
                          onClick={() =>
                            handleImageSelect(
                              product._id,
                              index
                            )
                          }
                          className="relative aspect-square overflow-hidden"
                          style={{
                            border:
                              activeIndex === index
                                ? "1px solid #d4845a"
                                : "1px solid transparent",
                          }}
                        >

                          <img
                            src={image}
                            alt={`${product.name} ${index + 1}`}
                            className={`thumbnail-image h-full w-full object-cover ${
                              activeIndex === index
                                ? "opacity-100"
                                : "opacity-60"
                            }`}
                          />

                        </button>

                      ))}

                    </div>


                    {/* ==================================
                        PRODUCT DETAILS
                    ================================== */}

                    <div className="mt-5">

                      <div className="flex items-start justify-between gap-4">

                        <div className="min-w-0">

                          <p
                            className="editorial-label mb-1 text-[8px] uppercase"
                            style={{
                              color: "#2a2a2a",
                              opacity: 0.5,
                            }}
                          >
                            {product.category}
                          </p>

                          <h2 className="product-name text-[23px] leading-none">
                            {product.name}
                          </h2>

                          <p className="mt-1.5 text-[10px] font-light text-[#4a4a4a]/70">
                            {product.subcategory}
                          </p>

                        </div>


                        {/* PRICE */}

                        <span
                          className="products-heading whitespace-nowrap text-xl"
                          style={{
                            color: "#d4845a",
                          }}
                        >
                          ₹{product.price}
                        </span>

                      </div>


                      {/* ==================================
                          BOTTOM INFORMATION
                      ================================== */}

                      <div className="mt-4 flex items-center justify-between border-t border-[#2a2a2a]/10 pt-3">

                        <div className="flex items-center gap-2">

                          <span className="editorial-label text-[8px] uppercase text-[#2a2a2a]/45">
                            Size
                          </span>

                          <span className="border border-[#2a2a2a]/20 px-2.5 py-1 text-[9px]">
                            {product.size}
                          </span>

                        </div>


                        {/* DELETE */}

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(product._id)
                          }
                          disabled={
                            deletingId === product._id
                          }
                          className="delete-button border-b border-[#2a2a2a]/20 pb-0.5 text-[9px] font-medium uppercase tracking-[0.15em]"
                          style={{
                            color: "#2a2a2a",
                          }}
                        >
                          {deletingId === product._id
                            ? "Deleting..."
                            : "Remove"}
                        </button>

                      </div>

                    </div>

                  </div>

                );

              })}

            </div>

          )}

        </div>


        {/* ========================================
            FULLSCREEN IMAGE VIEWER
        ======================================== */}

        {selectedImage && (

          <div
            className="image-modal fixed inset-0 z-50 flex items-center justify-center bg-[#2a2a2a]/90 p-6"
            onClick={() => setSelectedImage(null)}
          >

            {/* CLOSE */}

            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center border border-white/30 text-2xl font-light text-white transition hover:bg-white/10"
            >
              ×
            </button>


            {/* IMAGE */}

            <img
              src={selectedImage}
              alt="Product preview"
              onClick={(e) =>
                e.stopPropagation()
              }
              className="max-h-[88vh] max-w-[88vw] object-contain"
            />

          </div>

        )}

      </div>
    </>
  );
};

export default ProductList;