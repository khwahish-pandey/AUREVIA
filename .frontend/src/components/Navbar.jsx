import React, {  useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import AuthContext from "../context/AuthContext";
import axios from "axios";


// --- INLINE SVG ICONS FOR ZERO DEPENDENCY FRICTION ---
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
      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
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

// --- PREMIUM AUREVIA BRAND LOGO COMPONENT ---
const AureviaLogo = () => (
  <a href="/" className="flex items-center gap-3 group">
    {/* Dynamic Amazon/Flipkart inspired A+Arrow vector */}
    <div className="relative w-10 h-10 flex items-center justify-center bg-emerald-950/20 rounded-xl p-1 border border-emerald-700/20 group-hover:border-amber-400/30 transition-all duration-300">
      <svg
        className="w-full h-full text-amber-400"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Modern clean "A" frame */}
        <path
          d="M22 80 L47 22 C48.5 18.5 51.5 18.5 53 22 L78 80"
          stroke="white"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Amazon-style dynamic curved smile arrow passing through */}
        <path
          d="M12 60 C38 82 62 82 85 60"
          stroke="currentColor"
          strokeWidth="9"
          strokeLinecap="round"
        />
        {/* Precise Arrowhead */}
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
    {/* Typographic brand text matching "aurevia" */}
    <span className="text-2xl font-black tracking-tight text-white lowercase font-sans">
      aurevia<span className="text-amber-400 font-extrabold">.</span>
    </span>
  </a>
);

// --- INDEPENDENT, REUSABLE NAVBAR COMPONENT ---
export function Navbar({ loggedInUser, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  let {user, getUserProfile, setUser}=useContext(UserContext);
  let {serverurl}=useContext(AuthContext);

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handellogout = async () => {
  console.log("Logout clicked");

  // Safe fallback check: If serverurl is undefined due to context nesting, use port 8000
  const cleanServerUrl = serverurl || "http://localhost:8000";
  console.log("Targeting Backend URL:", `${cleanServerUrl}/api/auth/logout`);

  try {
    const result = await axios.get(`${cleanServerUrl}/api/auth/logout`, {
      withCredentials: true,
    });
    
    console.log("Backend Response:", result.data);
    
    // Clear local state manually so UI updates instantly
    setUser(null);
    
    // Refresh context data
    await getUserProfile();
  } catch (err) {
    console.error("Logout Network Error:", err);
  }
};




  return (
    <header className="w-full bg-[#3d5a45] text-white font-sans border-b border-[#4d6a55] select-none shadow-md">
      {/* 1. TOP ANNOUNCEMENT / INFO BAR */}
      <div className="w-full border-b border-[#4d6a55]/60 text-[13px] px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-2 text-emerald-100/90">
          {/* Working hours */}
          <div className="flex items-center gap-1.5 font-light">
            <span className="opacity-80">Monday - Friday</span>
            <span className="font-semibold text-white">8:00 AM - 9:00 PM</span>
          </div>

          {/* Quick links & Selectors */}
          <div className="flex items-center gap-6 text-xs md:text-[13px]">
            {/* Language Picker */}
            <div className="relative group cursor-pointer flex items-center gap-1 hover:text-white transition-colors py-1">
              <span>English</span>
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

            {/* Currency Picker */}
            <div className="relative group cursor-pointer flex items-center gap-1.5 hover:text-white transition-colors py-1">
              <span className="text-base leading-none">🇮🇳</span>
              <span>INR</span>
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

      {/* 2. MAIN LOGO & NAVIGATION BAR */}
      <div className="w-full px-6 py-4.5 relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Brand Side (Uses brand new AureviaLogo Component) */}
          <div className="flex items-center gap-8">
            <AureviaLogo />

            {/* Desktop Navigation Link Directory */}
            <nav className="hidden xl:flex items-center gap-1 text-sm font-medium">
              {/* Vertical Divider exactly like the screenshot */}
              <div className="h-6 w-[1.5px] bg-[#4d6a55] mx-3"></div>

              {/* All Categories Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-1 px-3 py-2 hover:text-amber-300 transition-colors rounded-md group">
                  <span>All Categories</span>
                  <ChevronDownIcon />
                </button>
                <div className="absolute top-full left-0 mt-1 w-52 bg-white text-gray-800 rounded-lg shadow-xl py-2 hidden group-hover:block border border-gray-100 z-50">
                  <a
                    href="#men"
                    className="block px-4 py-2 hover:bg-emerald-50 transition-colors"
                  >
                    Men's Wear
                  </a>
                  <a
                    href="#women"
                    className="block px-4 py-2 hover:bg-emerald-50 transition-colors"
                  >
                    Women's Collection
                  </a>
                  <a
                    href="#kids"
                    className="block px-4 py-2 hover:bg-emerald-50 transition-colors"
                  >
                    Kids clothing
                  </a>
                  <a
                    href="#accessories"
                    className="block px-4 py-2 hover:bg-emerald-50 transition-colors"
                  >
                    Fashion Accessories
                  </a>
                </div>
              </div>

              {/* Products Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-1 px-3 py-2 hover:text-amber-300 transition-colors rounded-md group">
                  <span>Products</span>
                  <ChevronDownIcon />
                </button>
                <div className="absolute top-full left-0 mt-1 w-48 bg-white text-gray-800 rounded-lg shadow-xl py-2 hidden group-hover:block border border-gray-100 z-50">
                  <a
                    href="#new"
                    className="block px-4 py-2 hover:bg-emerald-50 transition-colors"
                  >
                    New Arrivals
                  </a>
                  <a
                    href="#featured"
                    className="block px-4 py-2 hover:bg-emerald-50 transition-colors"
                  >
                    Featured items
                  </a>
                  <a
                    href="#discounts"
                    className="block px-4 py-2 hover:bg-emerald-50 transition-colors"
                  >
                    Hot Deals %
                  </a>
                </div>
              </div>

              {/* Pages Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-1 px-3 py-2 hover:text-amber-300 transition-colors rounded-md group">
                  <span>Pages</span>
                  <ChevronDownIcon />
                </button>
                <div className="absolute top-full left-0 mt-1 w-48 bg-white text-gray-800 rounded-lg shadow-xl py-2 hidden group-hover:block border border-gray-100 z-50">
                  <a
                    href="#shop"
                    className="block px-4 py-2 hover:bg-emerald-50 transition-colors"
                  >
                    Shop Catalog
                  </a>
                  <a
                    href="#order"
                    className="block px-4 py-2 hover:bg-emerald-50 transition-colors"
                  >
                    Track Order
                  </a>
                  <a
                    href="#contact"
                    className="block px-4 py-2 hover:bg-emerald-50 transition-colors"
                  >
                    Contact Support
                  </a>
                </div>
              </div>

              {/* Static Link */}
              
              {/* Blogs Dropdown */}
             
            </nav>
          </div>

          {/* Right Action panel */}
          <div className="flex items-center gap-4 lg:gap-6">
            {/* Phone & Appointment info (visible on Desktop) */}
            {/* Search Bar */}
           {/* Premium Search Bar */}
<div className="hidden md:flex items-center">
  <div className="relative w-44 md:w-56 lg:w-72">
    <input
      type="text"
      placeholder="Search products..."
      className="w-full h-10 rounded-full bg-white text-gray-800 pl-5 pr-11 text-sm border border-transparent shadow-md focus:outline-none focus:ring-2 focus:ring-[#d4845a]"
    />

    <button
      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-[#d4845a] hover:bg-amber-500 flex items-center justify-center transition-all"
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
  </div>
</div>

            {/* Dynamic Authenticated User Container */}
{/* Dynamic Authenticated User Container */}
{user ? (
  <div className="flex items-center gap-3 bg-emerald-950/20 hover:bg-emerald-950/35 border border-[#4d6a55] rounded-full p-1 pr-4 transition-all duration-300">
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
      className="ml-2 text-[10px] text-[#d4845a] underline font-light transition-all hover:text-amber-400"
    >
      Logout
    </button>
  </div>
) : (
  /* --- GUEST LOG IN LINK CONTROLLER --- */
  <a 
    href="/login" 
    className="flex items-center gap-2 bg-emerald-950/20 hover:bg-emerald-950/40 border border-[#4d6a55]/80 hover:border-amber-400/50 rounded-full px-3 py-1.5 transition-all duration-200 group cursor-pointer"
  >
    <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center transition-colors group-hover:bg-amber-400/20">
      <div className="w-2 h-2 rounded-full bg-[#d4845a] group-hover:bg-amber-400 transition-colors"></div>
    </div>
    <span className="text-xs font-medium text-emerald-100 group-hover:text-white transition-colors">
      Guest Visitor <span className="text-[#d4845a] ml-1  group-hover:underline">Login </span>
    </span>
  </a>
)}
            {/* Interactive Cart Button Pills */}
            <button className="flex items-center gap-2 hover:bg-white hover:text-[#3d5a45] transition-all border border-white/80 rounded-full px-4.5 py-2 text-sm font-medium shadow-sm">
              <CartIcon />
              <span className="font-semibold">Rs. 0.00</span>
            </button>

            {/* Hamburger for Tablet & Mobile Layouts */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 hover:bg-[#4d6a55] rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. MOBILE RESPONSIVE NAV DRAWER */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-[#4d6a55] bg-[#344d3b] px-6 py-4 animate-fadeIn transition-all duration-300">
          <nav className="flex flex-col gap-3 font-medium">
            {/* All Categories Accordion */}
            <div className="border-b border-[#4d6a55]/40 pb-2">
              <button
                onClick={() => toggleDropdown("categories")}
                className="flex items-center justify-between w-full py-2 text-white hover:text-[#d4845a] transition-colors"
              >
                <span>All Categories</span>
                <ChevronDownIcon />
              </button>
              {activeDropdown === "categories" && (
                <div className="pl-4 mt-1 flex flex-col gap-2 text-sm text-emerald-200 border-l border-emerald-700/60 bg-[#2d4233]/40 rounded-r-md py-2">
                  <a href="#men" className="hover:text-white py-1 block">
                    Men's Wear
                  </a>
                  <a href="#women" className="hover:text-white py-1 block">
                    Women's Collection
                  </a>
                  <a href="#kids" className="hover:text-white py-1 block">
                    Kids clothing
                  </a>
                  <a href="#accessories" className="hover:text-white py-1 block">
                    Fashion Accessories
                  </a>
                </div>
              )}
            </div>

            {/* Products Accordion */}
            <div className="border-b border-[#4d6a55]/40 pb-2">
              <button
                onClick={() => toggleDropdown("products")}
                className="flex items-center justify-between w-full py-2 text-white hover:text-[#d4845a] transition-colors"
              >
                <span>Products</span>
                <ChevronDownIcon />
              </button>
              {activeDropdown === "products" && (
                <div className="pl-4 mt-1 flex flex-col gap-2 text-sm text-emerald-200 border-l border-emerald-700/60 bg-[#2d4233]/40 rounded-r-md py-2">
                  <a href="#new" className="hover:text-white py-1 block">
                    New Arrivals
                  </a>
                  <a href="#featured" className="hover:text-white py-1 block">
                    Featured Items
                  </a>
                  <a href="#discounts" className="hover:text-white py-1 block">
                    Hot Deals %
                  </a>
                </div>
              )}
            </div>

            {/* Pages Accordion */}
            <div className="border-b border-[#4d6a55]/40 pb-2">
              <button
                onClick={() => toggleDropdown("pages")}
                className="flex items-center justify-between w-full py-2 text-white hover:text-[#d4845a] transition-colors"
              >
                <span>Pages</span>
                <ChevronDownIcon />
              </button>
              {activeDropdown === "pages" && (
                <div className="pl-4 mt-1 flex flex-col gap-2 text-sm text-emerald-200 border-l border-emerald-700/60 bg-[#2d4233]/40 rounded-r-md py-2">
                  <a href="#shop" className="hover:text-white py-1 block">
                    Shop Catalog
                  </a>
                  <a href="#order" className="hover:text-white py-1 block">
                    Track Order
                  </a>
                  <a href="#contact" className="hover:text-white py-1 block">
                    Contact Support
                  </a>
                </div>
              )}
            </div>

            {/* Mobile Search */}
            <div className="mt-2 pt-2">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full h-10 rounded-full bg-white text-gray-800 pl-5 pr-11 text-sm border border-transparent shadow-md focus:outline-none"
                />
                <button className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-[#d4845a] flex items-center justify-center">
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
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}