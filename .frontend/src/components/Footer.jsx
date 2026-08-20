import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#3d5a45] text-white">

      {/* =====================================================
          POLICY PROMISES
          CREAM / BEIGE SECTION
      ===================================================== */}

      <section className="border-b border-[#e4d7cc] bg-[#fdf5ee] text-[#2a2a2a]">

        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <div className="py-10 md:py-12">

            {/* HEADING */}

            <div className="text-center mb-9">

              <span className="text-[9px] uppercase tracking-[0.35em] text-[#d4845a]">
                The Aurevia Promise
              </span>

              <h2
                className="mt-2 text-2xl md:text-3xl text-[#2a2a2a]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                }}
              >
                Customer-friendly policies
              </h2>

              <p className="mt-2 text-[11px] text-[#6b665f]">
                Committed to your satisfaction and peace of mind.
              </p>

            </div>


            {/* =================================================
                POLICY CARDS
            ================================================= */}

            <div className="grid md:grid-cols-3 gap-4">


              {/* =================================================
                  EASY EXCHANGE
              ================================================= */}

              <Link
                to="/exchange-policy"
                className="group border border-[#ded2c7] bg-[#ebe2d8] px-6 py-7 text-center hover:bg-white hover:border-[#d4845a]/40 transition-all duration-300"
              >

                {/* ICON */}

                <div className="mx-auto w-11 h-11 rounded-full border border-[#d4845a]/40 flex items-center justify-center text-[#d4845a] group-hover:bg-[#d4845a] group-hover:text-white transition-all">

                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 1l4 4-4 4" />
                    <path d="M3 11V9a4 4 0 014-4h14" />
                    <path d="M7 23l-4-4 4-4" />
                    <path d="M21 13v2a4 4 0 01-4 4H3" />
                  </svg>

                </div>


                <h3
                  className="mt-5 text-xl text-[#2a2a2a]"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                  }}
                >
                  Easy Exchange Policy
                </h3>


                <p className="mt-2 text-[11px] leading-5 text-[#5f5a55] max-w-xs mx-auto">
                  Exchange made easy — quick, simple, and
                  customer-friendly.
                </p>


                <span className="inline-block mt-4 text-[8px] uppercase tracking-[0.2em] text-[#d4845a] opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More →
                </span>

              </Link>



              {/* =================================================
                  7 DAYS RETURN
              ================================================= */}

              <Link
                to="/return-policy"
                className="group border border-[#ded2c7] bg-[#ebe2d8] px-6 py-7 text-center hover:bg-white hover:border-[#d4845a]/40 transition-all duration-300"
              >

                {/* ICON */}

                <div className="mx-auto w-11 h-11 rounded-full border border-[#d4845a]/40 flex items-center justify-center text-[#d4845a] group-hover:bg-[#d4845a] group-hover:text-white transition-all">

                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 12a9 9 0 109-9c-2.3 0-4.4.9-6 2.4L3 8" />
                    <path d="M3 3v5h5" />
                    <path d="M12 7v5l3 2" />
                  </svg>

                </div>


                <h3
                  className="mt-5 text-xl text-[#2a2a2a]"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                  }}
                >
                  7 Days Return Policy
                </h3>


                <p className="mt-2 text-[11px] leading-5 text-[#5f5a55] max-w-xs mx-auto">
                  Shop with confidence with our 7-day easy
                  return guarantee.
                </p>


                <span className="inline-block mt-4 text-[8px] uppercase tracking-[0.2em] text-[#d4845a] opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More →
                </span>

              </Link>



              {/* =================================================
                  CUSTOMER SUPPORT
              ================================================= */}

              <Link
                to="/contact"
                className="group border border-[#ded2c7] bg-[#ebe2d8] px-6 py-7 text-center hover:bg-white hover:border-[#d4845a]/40 transition-all duration-300"
              >

                {/* ICON */}

                <div className="mx-auto w-11 h-11 rounded-full border border-[#d4845a]/40 flex items-center justify-center text-[#d4845a] group-hover:bg-[#d4845a] group-hover:text-white transition-all">

                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 14v-2a8 8 0 0116 0v2" />
                    <path d="M18 19h1a2 2 0 002-2v-3h-3v5z" />
                    <path d="M6 19H5a2 2 0 01-2-2v-3h3v5z" />
                    <path d="M18 19c0 1.1-.9 2-2 2h-3" />
                  </svg>

                </div>


                <h3
                  className="mt-5 text-xl text-[#2a2a2a]"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                  }}
                >
                  Best Customer Support
                </h3>


                <p className="mt-2 text-[11px] leading-5 text-[#5f5a55] max-w-xs mx-auto">
                  Trusted customer support — your satisfaction
                  is our priority.
                </p>


                <span className="inline-block mt-4 text-[8px] uppercase tracking-[0.2em] text-[#d4845a] opacity-0 group-hover:opacity-100 transition-opacity">
                  Contact Us →
                </span>

              </Link>

            </div>

          </div>

        </div>

      </section>



      {/* =====================================================
          MAIN FOOTER
          GREEN
      ===================================================== */}

      <section className="bg-[#3d5a45]">

        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <div className="py-12 md:py-14 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">


            {/* =================================================
                BRAND
            ================================================= */}

            <div className="col-span-2 md:col-span-1">

              <Link to="/" className="inline-block">

                <h2
                  className="text-4xl text-white"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                  }}
                >
                  Aurevia
                </h2>

              </Link>


              <p className="mt-4 max-w-xs text-xs leading-6 text-emerald-50/50">
                Timeless elegance, thoughtfully reimagined.
                Fashion designed to feel uniquely yours.
              </p>


              {/* SOCIAL */}

              <div className="mt-5">

                <span className="text-[8px] uppercase tracking-[0.25em] text-[#d4845a]">
                  Follow Aurevia
                </span>

                <div className="flex gap-4 mt-3">

                  <a
                    href="#"
                    className="text-[9px] text-emerald-50/50 hover:text-white transition"
                  >
                    Instagram
                  </a>

                  <a
                    href="#"
                    className="text-[9px] text-emerald-50/50 hover:text-white transition"
                  >
                    Facebook
                  </a>

                </div>

              </div>

            </div>



            {/* =================================================
                SHOP
            ================================================= */}

            <div>

              <h3 className="text-[9px] uppercase tracking-[0.3em] text-[#d4845a]">
                Shop
              </h3>

              <ul className="mt-5 space-y-3">

                <li>
                  <Link
                    to="/profile/collection"
                    className="text-xs text-emerald-50/55 hover:text-white transition"
                  >
                    New Arrivals
                  </Link>
                </li>

                <li>
                  <Link
                    to="/profile/collection"
                    className="text-xs text-emerald-50/55 hover:text-white transition"
                  >
                    Men
                  </Link>
                </li>

                <li>
                  <Link
                    to="/profile/collection"
                    className="text-xs text-emerald-50/55 hover:text-white transition"
                  >
                    Women
                  </Link>
                </li>

                <li>
                  <Link
                    to="/profile/collection"
                    className="text-xs text-emerald-50/55 hover:text-white transition"
                  >
                    Collections
                  </Link>
                </li>

              </ul>

            </div>



            {/* =================================================
                CUSTOMER CARE
            ================================================= */}

            <div>

              <h3 className="text-[9px] uppercase tracking-[0.3em] text-[#d4845a]">
                Customer Care
              </h3>

              <ul className="mt-5 space-y-3">

                <li>
                  <Link
                    to="/contact"
                    className="text-xs text-emerald-50/55 hover:text-white transition"
                  >
                    Contact Us
                  </Link>
                </li>

                <li>
                  <Link
                    to="/profile/orders"
                    className="text-xs text-emerald-50/55 hover:text-white transition"
                  >
                    Track Order
                  </Link>
                </li>

                <li>
                  <Link
                    to="/contact"
                    className="text-xs text-emerald-50/55 hover:text-white transition"
                  >
                    FAQs
                  </Link>
                </li>

              </ul>

            </div>



            {/* =================================================
                POLICIES
            ================================================= */}

            <div>

              <h3 className="text-[9px] uppercase tracking-[0.3em] text-[#d4845a]">
                Policies
              </h3>

              <ul className="mt-5 space-y-3">

                <li>
                  <Link
                    to="/privacy-policy"
                    className="text-xs text-emerald-50/55 hover:text-white transition"
                  >
                    Privacy Policy
                  </Link>
                </li>

                <li>
                  <Link
                    to="/terms-and-conditions"
                    className="text-xs text-emerald-50/55 hover:text-white transition"
                  >
                    Terms & Conditions
                  </Link>
                </li>

                <li>
                  <Link
                    to="/shipping-and-refund-policy"
                    className="text-xs text-emerald-50/55 hover:text-white transition"
                  >
                    Shipping & Refund
                  </Link>
                </li>

              </ul>

            </div>

          </div>

        </div>

      </section>



      {/* =====================================================
          CONTACT / COPYRIGHT
      ===================================================== */}

      <section className="bg-[#3d5a45] border-t border-white/10">

        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <div className="py-5 flex flex-col md:flex-row justify-between items-center gap-3">

            <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">

              <a
                href="mailto:hello@aurevia.com"
                className="text-[9px] text-emerald-50/45 hover:text-white transition"
              >
                hello@aurevia.com
              </a>

              <a
                href="tel:+919876543210"
                className="text-[9px] text-emerald-50/45 hover:text-white transition"
              >
                +91 98765 43210
              </a>

            </div>


            <p className="text-[9px] text-emerald-50/30">
              © {new Date().getFullYear()} Aurevia. All rights reserved.
            </p>

          </div>

        </div>

      </section>

    </footer>
  );
}

export default Footer;