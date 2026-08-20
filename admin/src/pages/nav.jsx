import React, { useState, useContext } from "react";
import { AdminContext } from "../context/AdminContext.jsx";
import axios from "axios";
import { Link } from "react-router-dom";

// --- ADMIN INLINE SVG ICONS ---
const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);

const AdminShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-amber-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286z" />
  </svg>
);

const StorefrontIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4.5 h-4.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h2.25A2.25 2.25 0 0022 18.75V16.5M16.5 21V12a2.25 2.25 0 00-2.25-2.25H9.75A2.25 2.25 0 007.5 12v9m9 0H7.5m0 0H3.75A2.25 2.25 0 011.5 18.75V16.5M16.5 4.5h-9L4.5 9.75h15L16.5 4.5z" />
  </svg>
);

const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </svg>
);

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l3 3m0 0l-3 3m3-3H2.25" />
  </svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
);

// --- PREMIUM ADMIN LOGO COMPONENT ---
const AureviaAdminLogo = () => (
  <a href="/admin" className="flex items-center gap-3 group">
    <div className="relative w-10 h-10 flex items-center justify-center bg-emerald-950/20 rounded-xl p-1 border border-emerald-700/20 group-hover:border-amber-400/30 transition-all duration-300">
      <svg className="w-full h-full text-amber-400" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 80 L47 22 C48.5 18.5 51.5 18.5 53 22 L78 80" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 60 C38 82 62 82 85 60" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
        <path d="M74 48 L88 60 L72 72" fill="currentColor" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
    <div className="flex flex-col text-left">
      <span className="text-xl font-black tracking-tight text-white lowercase leading-none">
        aurevia<span className="text-amber-400 font-extrabold">.</span>
      </span>
      <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400/90 mt-0.5 leading-none">
        Control Panel
      </span>
    </div>
  </a>
);

export function AdminNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const { adminData, serverurl, setAdminData, fetchAdminData } = useContext(AdminContext) || {};

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleAdminLogout = async () => {
    const cleanServerUrl = serverurl || "http://localhost:8000";

    try {
      await axios.get(`${cleanServerUrl}/api/auth/logout`, {
        withCredentials: true,
      });

      if (setAdminData) setAdminData(null);
      if (fetchAdminData) await fetchAdminData();

      window.location.href = "/login";
    } catch (err) {
      console.error("Admin Logout Failed:", err);
    }
  };

  return (
    <header className="w-full bg-[#3d5a45] text-white font-sans border-b border-[#4d6a55] select-none shadow-md sticky top-0 z-50">
      {/* 1. TOP SYSTEM METRICS BAR */}
      <div className="w-full border-b border-[#4d6a55]/60 text-[13px] px-6 py-2.5 bg-[#3d5a45]">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-2 text-emerald-100/90">
          <div className="flex items-center gap-4 font-light text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>System Status: <strong className="text-white font-medium">Healthy</strong></span>
            </div>
            <div className="hidden sm:block opacity-40">|</div>
            <div className="hidden sm:block">Environment: <strong className="text-white font-medium">Production-Ready</strong></div>
          </div>

          <div className="flex items-center gap-5 text-xs">
            <a href="http://localhost:5175" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors py-0.5 font-medium text-emerald-100 bg-emerald-950/20 rounded-md px-2.5 border border-[#4d6a55]">
              <StorefrontIcon />
              <span>View Main Shop</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN ADMIN ACTION BAR */}
      <div className="w-full px-6 py-4.5 relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <AureviaAdminLogo />

            {/* Core Administrative Catalogs Dropdowns */}
            <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
              <div className="h-6 w-[1.5px] bg-[#4d6a55] mx-3"></div>

              {/* Management Dropdown 1 */}
              <div className="relative group">
                <button className="flex items-center gap-1 px-3 py-2 hover:text-amber-300 transition-colors rounded-md text-emerald-100">
                  <span>Store Management</span>
                  <ChevronDownIcon />
                </button>
                <div className="absolute top-full left-0 mt-1 w-52 bg-white text-gray-800 rounded-lg shadow-xl py-2 border border-gray-100 z-50 hidden group-hover:block">
                  <Link to="/page1" className="block px-4 py-2 hover:bg-emerald-50 transition-colors">
                    Add Items
                  </Link>
                  <Link to="/page2" className="block px-4 py-2 hover:bg-emerald-50 transition-colors">
                    List Items
                  </Link>
                  <Link to="/orders" className="block px-4 py-2 hover:bg-emerald-50 transition-colors">
                    View Orders
                  </Link>
                </div>
              </div>

              {/* Management Dropdown 2 */}
              <div className="relative group">
                <button className="flex items-center gap-1 px-3 py-2 hover:text-amber-300 transition-colors rounded-md text-emerald-100">
                  <span>Analytics & Data</span>
                  <ChevronDownIcon />
                </button>
                <div className="absolute top-full left-0 mt-1 w-48 bg-white text-gray-800 rounded-lg shadow-xl py-2 hidden group-hover:block border border-gray-100 z-50">
                  <a href="/page1" className="block px-4 py-2 hover:bg-emerald-50 transition-colors">Sales Overview</a>
                  <a href="/page2" className="block px-4 py-2 hover:bg-emerald-50 transition-colors">User Accounts</a>
                  <a href="/orders" className="block px-4 py-2 hover:bg-emerald-50 transition-colors">System Configuration</a>
                </div>
              </div>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* System Notifications Action Pill */}
            <button className="relative p-2 text-emerald-100 hover:text-white hover:bg-[#4d6a55] rounded-full transition-all border border-[#4d6a55] shadow-inner">
              <BellIcon />
              <span className="absolute top-1 right-1 w-2 h-2 bg-amber-400 rounded-full"></span>
            </button>

            {/* Dynamic Authenticated Admin Widget */}
            {adminData ? (
              <div className="flex items-center gap-3">
                {/* Admin Profile Info */}
                <div className="flex items-center gap-2.5 bg-emerald-950/30 border border-[#4d6a55] rounded-full py-1 px-3">
                  <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md">
                    <AdminShieldIcon />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] text-emerald-200/80 uppercase font-bold tracking-wider leading-none">
                      Logged In
                    </span>
                    <span className="text-xs font-semibold max-w-28 truncate text-white" title={adminData.name || adminData.email}>
                      {adminData.name || "Administrator"}
                    </span>
                  </div>
                </div>

                {/* Prominent Desktop Logout Button */}
                <button
                  type="button"
                  onClick={handleAdminLogout}
                  className="flex items-center gap-1.5 bg-[#d4845a]/20 hover:bg-[#d4845a] text-[#d4845a] hover:text-white border border-[#d4845a]/50 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 shadow-sm"
                >
                  <LogoutIcon />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              /* --- GUEST/RESTRICTED LOGIN LINK --- */
              <a
                href="/login"
                className="flex items-center gap-2 bg-emerald-950/20 hover:bg-emerald-950/40 border border-[#4d6a55]/80 hover:border-amber-400/50 rounded-full px-3 py-1.5 transition-all duration-200 group cursor-pointer"
              >
                <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center transition-colors group-hover:bg-amber-400/20">
                  <div className="w-2 h-2 rounded-full bg-[#d4845a] group-hover:bg-amber-400 transition-colors"></div>
                </div>
                <span className="text-xs font-medium text-emerald-100 group-hover:text-white transition-colors">
                  Restricted Mode <span className="text-[#d4845a] ml-1 group-hover:underline">Login</span>
                </span>
              </a>
            )}

            {/* Mobile Sidebar Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-[#4d6a55] rounded-lg transition-colors text-emerald-100"
              aria-label="Toggle structural layout menu"
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. MOBILE SYSTEM DRAWER ACCORDION */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#4d6a55] bg-[#344d3b] px-6 py-4 transition-all duration-300">
          <nav className="flex flex-col gap-3 font-medium">
            <div className="border-b border-[#4d6a55]/40 pb-2">
              <button onClick={() => toggleDropdown("store")} className="flex items-center justify-between w-full py-2 text-white hover:text-[#d4845a] transition-colors">
                <span>Store Management</span>
                <ChevronDownIcon />
              </button>
              {activeDropdown === "store" && (
                <div className="pl-4 mt-1 flex flex-col gap-2 text-sm text-emerald-200 border-l border-emerald-700/60 bg-[#2d4233]/40 rounded-r-md py-2">
                  <Link to="/page1" className="hover:text-white py-1 block">Add Items</Link>
                  <Link to="/page2" className="hover:text-white py-1 block">List Items</Link>
                  <Link to="/orders" className="hover:text-white py-1 block">View Orders</Link>
                </div>
              )}
            </div>

            <div className="border-b border-[#4d6a55]/40 pb-2">
              <button onClick={() => toggleDropdown("analytics")} className="flex items-center justify-between w-full py-2 text-white hover:text-[#d4845a] transition-colors">
                <span>Analytics & Data</span>
                <ChevronDownIcon />
              </button>
              {activeDropdown === "analytics" && (
                <div className="pl-4 mt-1 flex flex-col gap-2 text-sm text-emerald-200 border-l border-emerald-700/60 bg-[#2d4233]/40 rounded-r-md py-2">
                  <a href="/page1" className="hover:text-white py-1 block">Sales Overview</a>
                  <a href="/page2" className="hover:text-white py-1 block">User Accounts</a>
                  <a href="/orders" className="hover:text-white py-1 block">System Configuration</a>
                </div>
              )}
            </div>

            {/* Mobile Logout Option */}
            {adminData && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleAdminLogout}
                  className="w-full flex items-center justify-center gap-2 bg-[#d4845a] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-[#c37349] transition-colors"
                >
                  <LogoutIcon />
                  <span>Logout ({adminData.name || "Admin"})</span>
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}