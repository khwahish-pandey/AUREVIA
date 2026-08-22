import React, {
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { UserContext } from "../context/UserContext.jsx";
import AuthContext from "../context/AuthContext";

import { ShopContext } from "../context/ShopContext.jsx";

import axios from "axios";


// =========================================================
// ICONS
// =========================================================

const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
    />
  </svg>
);


const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    className="w-5 h-5 text-[#3d5a45]"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
    />
  </svg>
);


const CartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    className="w-4.5 h-4.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974a1.125 1.125 0 0 1 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1-.75 0Z"
    />
  </svg>
);


const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    className="w-4 h-4 mr-1"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a20.373 20.373 0 0 1-6.742-6.742c-.155-.44.01-.927.387-1.21l1.293-.97c.362-.271.528-.733.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
    />
  </svg>
);


const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>
);


const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18 18 6M6 6l12 12"
    />
  </svg>
);


// =========================================================
// LOGO
// =========================================================

const AureviaLogo = () => (
  <Link
    to="/profile/main"
    className="flex items-center gap-3 group"
  >
    <div className="relative w-10 h-10 flex items-center justify-center bg-emerald-950/20 rounded-xl p-1 border border-emerald-700/20 group-hover:border-amber-400/30 transition-all duration-300">

      <svg
        className="w-full h-full text-amber-400"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >

        <path
          d="M22 80 L47 22 C48.5 18.5 51.5 18.5 53 22 L78 80"
          stroke="white"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M12 60 C38 82 62 82 85 60"
          stroke="currentColor"
          strokeWidth="9"
          strokeLinecap="round"
        />

        <path
          d="M74 48 L88 60 L72 72"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

      </svg>
    </div>

    <span className="text-2xl font-black tracking-tight text-white lowercase font-sans">
      aurevia
      <span className="text-amber-400 font-extrabold">
        .
      </span>
    </span>
  </Link>
);


// =========================================================
// NAVBAR
// =========================================================

export function Navbar({
  loggedInUser,
  onLogout,
}) {

  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [activeDropdown, setActiveDropdown] =
    useState(null);


  // =======================================================
  // SEARCH
  // =======================================================

  const [searchQuery, setSearchQuery] =
    useState("");

  const [showSearchResults, setShowSearchResults] =
    useState(false);

  const searchRef = useRef(null);


  // =======================================================
  // USER CONTEXT
  // =======================================================

  const {
    user,
    getUserProfile,
    setUser,
  } = useContext(UserContext);


  // =======================================================
  // AUTH CONTEXT
  // =======================================================

  const { value } =
    useContext(AuthContext) || {};

  const serverurl =
    value?.serverurl;


  // =======================================================
  // SHOP CONTEXT
  // =======================================================

  const {
    products = [],
    getCartCount,
  } = useContext(ShopContext) || {};


  // =======================================================
  // CART COUNT
  // =======================================================

  const cartCount = getCartCount
    ? getCartCount()
    : 0;


  // =======================================================
  // SEARCH RESULTS
  // =======================================================

  const searchResults = products
    .filter((product) => {

      const query =
        searchQuery
          .trim()
          .toLowerCase();

      if (!query) {
        return false;
      }

      const searchableText = `
        ${product.name || ""}
        ${product.description || ""}
        ${product.category || ""}
        ${product.subcategory || ""}
      `.toLowerCase();

      const searchWords =
        query
          .split(/\s+/)
          .filter(Boolean);

      return searchWords.every(
        (word) =>
          searchableText.includes(word)
      );
    })
    .slice(0, 6);


  // =======================================================
  // CLOSE SEARCH OUTSIDE
  // =======================================================

  useEffect(() => {

    const handleClickOutside =
      (event) => {

        if (
          searchRef.current &&
          !searchRef.current.contains(
            event.target
          )
        ) {
          setShowSearchResults(false);
        }
      };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };

  }, []);


  // =======================================================
  // DROPDOWN
  // =======================================================

  const toggleDropdown =
    (name) => {

      setActiveDropdown(
        activeDropdown === name
          ? null
          : name
      );
    };


  // =======================================================
  // CATEGORY NAVIGATION
  // =======================================================

  const handleCategoryNavigate =
    (category) => {

      console.log(
        "🛍️ CATEGORY SELECTED:",
        category
      );

      // Navigate to collection with category
      navigate(
        `/profile/collection?category=${encodeURIComponent(
          category
        )}`
      );

      // Close everything
      setActiveDropdown(null);
      setMobileMenuOpen(false);
      setShowSearchResults(false);
    };


  // =======================================================
  // SEARCH NAVIGATION
  // =======================================================

  const handleSearchNavigate =
    () => {

      const query =
        searchQuery.trim();

      if (!query) {
        return;
      }

      setShowSearchResults(false);
      setMobileMenuOpen(false);
      setActiveDropdown(null);

      navigate(
        `/profile/collection?search=${encodeURIComponent(
          query
        )}`
      );
    };


  // =======================================================
  // SEARCH CHANGE
  // =======================================================

  const handleSearchChange =
    (e) => {

      const value =
        e.target.value;

      setSearchQuery(value);

      setShowSearchResults(
        value.trim().length > 0
      );
    };


  // =======================================================
  // SEARCH KEYBOARD
  // =======================================================

  const handleSearchKeyDown =
    (e) => {

      if (e.key === "Enter") {
        handleSearchNavigate();
      }

      if (e.key === "Escape") {
        setShowSearchResults(false);
      }
    };


  // =======================================================
  // SEARCH RESULT CLICK
  // =======================================================

  const handleSearchResultClick =
    () => {

      setShowSearchResults(false);
      setSearchQuery("");
      setMobileMenuOpen(false);
      setActiveDropdown(null);
    };


  // =======================================================
  // LOGOUT
  // =======================================================

  const handellogout =
    async () => {

      console.log(
        "Logout clicked"
      );

      const cleanServerUrl =
       "https://aurevia-2.onrender.com";

      try {

        const result =
          await axios.get(
            `${cleanServerUrl}/api/auth/logout`,
            {
              withCredentials: true,
            }
          );

        console.log(
          "Backend Response:",
          result.data
        );

        setUser(null);

        await getUserProfile();

        if (onLogout) {
          onLogout();
        }

        window.location.reload();

      } catch (err) {

        console.error(
          "Logout Network Error:",
          err
        );
      }
    };


  // =======================================================
  // RETURN
  // =======================================================

  return (

    <header className="w-full bg-[#3d5a45] text-white font-sans border-b border-[#4d6a55] select-none shadow-md">


      {/* =================================================
          TOP BAR
      ================================================= */}

      <div className="w-full border-b border-[#4d6a55]/60 text-[13px] px-6 py-2.5">

        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-2 text-emerald-100/90">

          <div className="flex items-center gap-1.5 font-light">

            <span className="opacity-80">
              Monday - Friday
            </span>

            <span className="font-semibold text-white">
              8:00 AM - 9:00 PM
            </span>

          </div>


          <div className="flex items-center gap-6 text-xs md:text-[13px]">


            {/* LANGUAGE */}

            <div className="relative group cursor-pointer flex items-center gap-1 hover:text-white transition-colors py-1">

              <span>
                English
              </span>

              <ChevronDownIcon />

              <div className="absolute top-full right-0 mt-1 bg-white text-gray-800 rounded-md shadow-xl py-1 w-32 hidden group-hover:block z-50">

                <div className="px-3 py-1.5 hover:bg-emerald-50 cursor-pointer text-sm">
                  English
                </div>

                <div className="px-3 py-1.5 hover:bg-emerald-50 cursor-pointer text-sm">
                  Español
                </div>

                <div className="px-3 py-1.5 hover:bg-emerald-50 cursor-pointer text-sm">
                  Français
                </div>

              </div>

            </div>


            {/* CURRENCY */}

            <div className="relative group cursor-pointer flex items-center gap-1.5 hover:text-white transition-colors py-1">

              <span className="text-base leading-none">
                🇮🇳
              </span>

              <span>
                INR
              </span>

              <ChevronDownIcon />

              <div className="absolute top-full right-0 mt-1 bg-white text-gray-800 rounded-md shadow-xl py-1 w-32 hidden group-hover:block z-50">

                <div className="px-3 py-1.5 hover:bg-emerald-50 cursor-pointer text-sm">
                  🇮🇳 INR (Rs.)
                </div>

                <div className="px-3 py-1.5 hover:bg-emerald-50 cursor-pointer text-sm">
                  🇺🇸 USD ($)
                </div>

                <div className="px-3 py-1.5 hover:bg-emerald-50 cursor-pointer text-sm">
                  🇪🇺 EUR (€)
                </div>

              </div>

            </div>


            <a
              href="#faq"
              className="hover:text-white transition-colors font-light"
            >
              Faq
            </a>


            <a
              href="#about"
              className="hover:text-white transition-colors font-light"
            >
              About Us
            </a>

          </div>

        </div>

      </div>


      {/* =================================================
          MAIN NAVIGATION
      ================================================= */}

      <div className="w-full px-6 py-4.5 relative">

        <div className="max-w-7xl mx-auto flex items-center justify-between">


          {/* LOGO */}

          <div className="flex items-center gap-8">

            <AureviaLogo />


            {/* DESKTOP NAVIGATION */}

            <nav className="hidden xl:flex items-center gap-1 text-sm font-medium">

              <div className="h-6 w-[1.5px] bg-[#4d6a55] mx-3" />


              {/* =================================================
                  ALL CATEGORIES
              ================================================= */}

              <div className="relative group">

                <button
                  type="button"
                  className="flex items-center gap-1 px-3 py-2 hover:text-amber-300 transition-colors rounded-md"
                >

                  <span>
                    All Categories
                  </span>

                  <ChevronDownIcon />

                </button>


                <div className="absolute top-full left-0 mt-1 w-52 bg-white text-gray-800 rounded-lg shadow-xl py-2 hidden group-hover:block border border-gray-100 z-50">


                  {/* MEN */}

                  <button
                    type="button"
                    onClick={() =>
                      handleCategoryNavigate(
                        "Men"
                      )
                    }
                    className="w-full text-left block px-4 py-2 hover:bg-emerald-50"
                  >
                    Men's Wear
                  </button>


                  {/* WOMEN */}

                  <button
                    type="button"
                    onClick={() =>
                      handleCategoryNavigate(
                        "Women"
                      )
                    }
                    className="w-full text-left block px-4 py-2 hover:bg-emerald-50"
                  >
                    Women's Collection
                  </button>


                  {/* KIDS */}

                  <button
                    type="button"
                    onClick={() =>
                      handleCategoryNavigate(
                        "Kids"
                      )
                    }
                    className="w-full text-left block px-4 py-2 hover:bg-emerald-50"
                  >
                    Kids clothing
                  </button>


                  {/* ACCESSORIES */}

                  <button
                    type="button"
                    onClick={() =>
                      handleCategoryNavigate(
                        "Accessories"
                      )
                    }
                    className="w-full text-left block px-4 py-2 hover:bg-emerald-50"
                  >
                    Fashion Accessories
                  </button>

                </div>

              </div>


              {/* =================================================
                  PRODUCTS
              ================================================= */}

              <div className="relative group">

                <button
                  type="button"
                  className="flex items-center gap-1 px-3 py-2 hover:text-amber-300 transition-colors rounded-md"
                >

                  <span>
                    Products
                  </span>

                  <ChevronDownIcon />

                </button>


                <div className="absolute top-full left-0 mt-1 w-48 bg-white text-gray-800 rounded-lg shadow-xl py-2 hidden group-hover:block border border-gray-100 z-50">

                  <Link
                    to="/profile/latest"
                    className="block px-4 py-2 hover:bg-emerald-50"
                  >
                    New Arrivals
                  </Link>

                  <Link
                    to="/profile/bestsellers"
                    className="block px-4 py-2 hover:bg-emerald-50"
                  >
                    Featured Items
                  </Link>

                  <Link
                    to="/profile/collection"
                    className="block px-4 py-2 hover:bg-emerald-50"
                  >
                    Shop Collection
                  </Link>

                </div>

              </div>


              {/* =================================================
                  PAGES
              ================================================= */}

              <div className="relative group">

                <button
                  type="button"
                  className="flex items-center gap-1 px-3 py-2 hover:text-amber-300 transition-colors rounded-md"
                >

                  <span>
                    Pages
                  </span>

                  <ChevronDownIcon />

                </button>


                <div className="absolute top-full left-0 mt-1 w-48 bg-white text-gray-800 rounded-lg shadow-xl py-2 hidden group-hover:block border border-gray-100 z-50">

                  <Link
                    to="/profile/collection"
                    className="block px-4 py-2 hover:bg-emerald-50"
                  >
                    Shop Collection
                  </Link>

                  <Link
                    to="/profile/about"
                    className="block px-4 py-2 hover:bg-emerald-50"
                  >
                    About Us
                  </Link>

                  <Link
                    to="/profile/product"
                    className="block px-4 py-2 hover:bg-emerald-50"
                  >
                    Track Order
                  </Link>

                  <Link
                    to="/profile/contact"
                    className="block px-4 py-2 hover:bg-emerald-50"
                  >
                    Contact Support
                  </Link>

                </div>

              </div>

            </nav>

          </div>


          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <div className="flex items-center gap-4 lg:gap-6">


            {/* =================================================
                SEARCH
            ================================================= */}

            <div className="hidden md:flex items-center">

              <div
                ref={searchRef}
                className="relative w-44 md:w-56 lg:w-72"
              >

                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => {

                    if (
                      searchQuery.trim()
                    ) {
                      setShowSearchResults(
                        true
                      );
                    }

                  }}
                  onKeyDown={
                    handleSearchKeyDown
                  }
                  placeholder="Search products..."
                  className="w-full h-10 rounded-full bg-white text-gray-800 pl-5 pr-11 text-sm border border-transparent shadow-md focus:outline-none focus:ring-2 focus:ring-[#d4845a]"
                />


                <button
                  type="button"
                  onClick={
                    handleSearchNavigate
                  }
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-[#d4845a] hover:bg-amber-500 flex items-center justify-center"
                >

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    className="w-4 h-4 text-[#3d5a45]"
                  >

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 6 16.65a7.5 7.5 0 0 0 10.65 0Z"
                    />

                  </svg>

                </button>


                {/* SEARCH DROPDOWN */}

                {showSearchResults &&
                  searchQuery.trim() && (

                    <div className="absolute top-12 left-0 w-full bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[100]">

                      {searchResults.length > 0 ? (

                        <div className="py-2">

                          {searchResults.map(
                            (product) => {

                              const productId =
                                product._id ||
                                product.id;

                              return (

                                <Link
                                  key={productId}
                                  to={`/profile/collection?search=${encodeURIComponent(
                                    searchQuery.trim()
                                  )}`}
                                  onClick={
                                    handleSearchResultClick
                                  }
                                  className="flex items-center gap-3 px-3 py-3 hover:bg-[#fdf5ee]"
                                >

                                  <div className="w-12 h-14 flex-shrink-0 overflow-hidden bg-[#eee3d9]">

                                    <img
                                      src={
                                        product.image1
                                      }
                                      alt={
                                        product.name
                                      }
                                      className="w-full h-full object-cover"
                                    />

                                  </div>


                                  <div className="min-w-0 flex-1">

                                    <p className="text-sm font-medium text-[#2a2a2a] truncate">
                                      {
                                        product.name
                                      }
                                    </p>

                                    <p className="text-[10px] text-gray-500 mt-1">
                                      {
                                        product.category
                                      }

                                      {product.subcategory &&
                                        ` • ${product.subcategory}`}
                                    </p>

                                    <p className="text-xs text-[#d4845a] mt-1">
                                      ₹
                                      {
                                        product.price
                                      }
                                    </p>

                                  </div>

                                </Link>

                              );
                            }
                          )}

                        </div>

                      ) : (

                        <div className="px-4 py-6 text-center">

                          <p className="text-sm text-[#2a2a2a]">
                            No products found
                          </p>

                          <p className="text-[10px] text-gray-500 mt-1">
                            Try another product
                            name, category or
                            description.
                          </p>

                        </div>

                      )}

                    </div>

                  )}

              </div>

            </div>


            {/* =================================================
                USER
            ================================================= */}

            {user ? (

              <div className="flex items-center gap-3 bg-emerald-950/20 hover:bg-emerald-950/35 border border-[#4d6a55] rounded-full p-1 pr-4">

                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                  <UserIcon />
                </div>

                <div className="flex flex-col text-left">

                  <span className="text-[9px] text-emerald-200/80 uppercase font-bold tracking-wider leading-none mb-0.5">
                    Logged In
                  </span>

                  <span
                    className="text-xs font-semibold max-w-30 truncate text-white"
                    title={user.name}
                  >
                    {user.name || "User"}
                  </span>

                </div>

                <button
                  type="button"
                  onClick={handellogout}
                  className="ml-2 text-[10px] text-[#d4845a] underline"
                >
                  Logout
                </button>

              </div>

            ) : (

              <Link
                to="/login"
                className="flex items-center gap-2 bg-emerald-950/20 hover:bg-emerald-950/40 border border-[#4d6a55]/80 hover:border-amber-400/50 rounded-full px-3 py-1.5"
              >

                <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">

                  <div className="w-2 h-2 rounded-full bg-[#d4845a]" />

                </div>

                <span className="text-xs font-medium text-emerald-100">

                  Guest Visitor

                  <span className="text-[#d4845a] ml-1">
                    Login
                  </span>

                </span>

              </Link>

            )}


            {/* =================================================
                CART
            ================================================= */}

            <Link
              to="/profile/cart"
              className="relative flex items-center gap-2 hover:bg-white hover:text-[#3d5a45] transition-all border border-white/80 rounded-full px-4.5 py-2 text-sm font-medium shadow-sm"
            >

              <CartIcon />

              <span className="font-semibold">
                Cart
              </span>

              {cartCount > 0 && (

                <span className="absolute -top-2 -right-2 min-w-[21px] h-[21px] px-1 rounded-full bg-[#d4845a] text-white text-[11px] font-bold flex items-center justify-center border-2 border-[#3d5a45]">
                  {cartCount}
                </span>

              )}

            </Link>


            {/* =================================================
                MOBILE MENU BUTTON
            ================================================= */}

            <button
              onClick={() =>
                setMobileMenuOpen(
                  !mobileMenuOpen
                )
              }
              className="xl:hidden p-2 hover:bg-[#4d6a55] rounded-lg"
              aria-label="Toggle menu"
            >

              {mobileMenuOpen ? (
                <CloseIcon />
              ) : (
                <MenuIcon />
              )}

            </button>

          </div>

        </div>

      </div>


      {/* =================================================
          MOBILE MENU
      ================================================= */}

      {mobileMenuOpen && (

        <div className="xl:hidden border-t border-[#4d6a55] bg-[#344d3b] px-6 py-4">

          <nav className="flex flex-col gap-3 font-medium">


            {/* =================================================
                MOBILE CATEGORIES
            ================================================= */}

            <div className="border-b border-[#4d6a55]/40 pb-2">

              <button
                onClick={() =>
                  toggleDropdown(
                    "categories"
                  )
                }
                className="flex items-center justify-between w-full py-2"
              >

                <span>
                  All Categories
                </span>

                <ChevronDownIcon />

              </button>


              {activeDropdown ===
                "categories" && (

                <div className="pl-4 mt-1 flex flex-col gap-2 text-sm text-emerald-200">


                  {/* MEN */}

                  <button
                    type="button"
                    onClick={() =>
                      handleCategoryNavigate(
                        "Men"
                      )
                    }
                    className="text-left py-1 hover:text-white"
                  >
                    Men's Wear
                  </button>


                  {/* WOMEN */}

                  <button
                    type="button"
                    onClick={() =>
                      handleCategoryNavigate(
                        "Women"
                      )
                    }
                    className="text-left py-1 hover:text-white"
                  >
                    Women's Collection
                  </button>


                  {/* KIDS */}

                  <button
                    type="button"
                    onClick={() =>
                      handleCategoryNavigate(
                        "Kids"
                      )
                    }
                    className="text-left py-1 hover:text-white"
                  >
                    Kids clothing
                  </button>


                  {/* ACCESSORIES */}

                  <button
                    type="button"
                    onClick={() =>
                      handleCategoryNavigate(
                        "Accessories"
                      )
                    }
                    className="text-left py-1 hover:text-white"
                  >
                    Fashion Accessories
                  </button>

                </div>

              )}

            </div>


            {/* =================================================
                MOBILE PRODUCTS
            ================================================= */}

            <div className="border-b border-[#4d6a55]/40 pb-2">

              <button
                onClick={() =>
                  toggleDropdown(
                    "products"
                  )
                }
                className="flex items-center justify-between w-full py-2"
              >

                <span>
                  Products
                </span>

                <ChevronDownIcon />

              </button>


              {activeDropdown ===
                "products" && (

                <div className="pl-4 mt-1 flex flex-col gap-2 text-sm text-emerald-200">

                  <Link
                    to="/profile/latest"
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                  >
                    New Arrivals
                  </Link>

                  <Link
                    to="/profile/bestsellers"
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                  >
                    Featured Items
                  </Link>

                  <Link
                    to="/profile/collection"
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                  >
                    Shop Collection
                  </Link>

                </div>

              )}

            </div>


            {/* =================================================
                MOBILE PAGES
            ================================================= */}

            <div className="border-b border-[#4d6a55]/40 pb-2">

              <button
                onClick={() =>
                  toggleDropdown(
                    "pages"
                  )
                }
                className="flex items-center justify-between w-full py-2"
              >

                <span>
                  Pages
                </span>

                <ChevronDownIcon />

              </button>


              {activeDropdown ===
                "pages" && (

                <div className="pl-4 mt-1 flex flex-col gap-2 text-sm text-emerald-200">

                  <Link
                    to="/profile/collection"
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                  >
                    Shop Collection
                  </Link>

                  <Link
                    to="/profile/about"
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                  >
                    About Us
                  </Link>

                  <Link
                    to="/profile/product"
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                  >
                    Track Order
                  </Link>

                  <Link
                    to="/profile/contact"
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                  >
                    Contact Support
                  </Link>

                </div>

              )}

            </div>


            {/* =================================================
                MOBILE SEARCH
            ================================================= */}

            <div className="mt-2 pt-2">

              <div
                ref={searchRef}
                className="relative w-full"
              >

                <input
                  type="text"
                  value={searchQuery}
                  onChange={
                    handleSearchChange
                  }
                  onFocus={() => {

                    if (
                      searchQuery.trim()
                    ) {
                      setShowSearchResults(
                        true
                      );
                    }

                  }}
                  onKeyDown={
                    handleSearchKeyDown
                  }
                  placeholder="Search products..."
                  className="w-full h-10 rounded-full bg-white text-gray-800 pl-5 pr-11 text-sm"
                />


                <button
                  type="button"
                  onClick={
                    handleSearchNavigate
                  }
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-[#d4845a] flex items-center justify-center"
                >

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    className="w-4 h-4 text-[#3d5a45]"
                  >

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 6 16.65a7.5 7.5 0 0 0 10.65 0Z"
                    />

                  </svg>

                </button>


                {showSearchResults &&
                  searchQuery.trim() && (

                    <div className="absolute top-12 left-0 w-full bg-white rounded-xl shadow-2xl overflow-hidden z-[100]">

                      {searchResults.length > 0 ? (

                        <div className="py-2">

                          {searchResults.map(
                            (product) => {

                              const productId =
                                product._id ||
                                product.id;

                              return (

                                <Link
                                  key={productId}
                                  to={`/profile/collection?search=${encodeURIComponent(
                                    searchQuery.trim()
                                  )}`}
                                  onClick={
                                    handleSearchResultClick
                                  }
                                  className="flex items-center gap-3 px-3 py-3 hover:bg-[#fdf5ee]"
                                >

                                  <img
                                    src={
                                      product.image1
                                    }
                                    alt={
                                      product.name
                                    }
                                    className="w-12 h-14 object-cover"
                                  />


                                  <div className="min-w-0">

                                    <p className="text-sm text-[#2a2a2a] truncate">
                                      {
                                        product.name
                                      }
                                    </p>

                                    <p className="text-[10px] text-gray-500 mt-1">

                                      {
                                        product.category
                                      }

                                      {product.subcategory &&
                                        ` • ${product.subcategory}`}

                                    </p>

                                    <p className="text-xs text-[#d4845a] mt-1">

                                      ₹
                                      {
                                        product.price
                                      }

                                    </p>

                                  </div>

                                </Link>

                              );

                            }
                          )}

                        </div>

                      ) : (

                        <p className="text-sm text-gray-500 text-center py-5">
                          No products found
                        </p>

                      )}

                    </div>

                  )}

              </div>

            </div>


            {/* =================================================
                MOBILE CART
            ================================================= */}

            <Link
              to="/profile/cart"
              onClick={() =>
                setMobileMenuOpen(false)
              }
              className="flex items-center justify-between py-3 border-t border-[#4d6a55]/40 mt-2"
            >

              <div className="flex items-center gap-3">

                <CartIcon />

                <span>
                  My Cart
                </span>

              </div>


              {cartCount > 0 && (

                <span className="bg-[#d4845a] text-white rounded-full min-w-[24px] h-[24px] flex items-center justify-center text-xs font-bold">
                  {cartCount}
                </span>

              )}

            </Link>

          </nav>

        </div>

      )}

    </header>
  );
}


export default Navbar;
