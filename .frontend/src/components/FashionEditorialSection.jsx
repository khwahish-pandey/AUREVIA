import React from "react";
import { Link } from "react-router-dom";

// =========================================================
// CENTER IMAGE
// =========================================================

import centerImage from "../assets/center-fashion.png";


// =========================================================
// BAG ICON
// =========================================================

const BagIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="16"
    viewBox="0 0 14 16"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.1258 5.12596H2.87416C2.04526 5.12596 1.38823 5.82533 1.43994 6.65262L1.79919 12.4007C1.84653 13.1581 2.47458 13.7481 3.23342 13.7481H10.7666C11.5254 13.7481 12.1535 13.1581 12.2008 12.4007L12.5601 6.65262C12.6118 5.82533 11.9547 5.12596 11.1258 5.12596ZM2.87416 3.68893C1.21635 3.68893 -0.0977 5.08768 0.00571 6.74226L0.364968 12.4904C0.459638 14.0051 1.71574 15.1851 3.23342 15.1851H10.7666C12.2843 15.1851 13.5404 14.0051 13.635 12.4904L13.9943 6.74226C14.0977 5.08768 12.7837 3.68893 11.1258 3.68893H2.87416Z"
      fill="currentColor"
    />

    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.40723 4.40744C3.40723 2.42332 5.01567 0.81488 6.99979 0.81488C8.9839 0.81488 10.5923 2.42332 10.5923 4.40744V5.84447C10.5923 6.24129 10.2707 6.56298 9.87384 6.56298C9.47701 6.56298 9.15532 6.24129 9.15532 5.84447V4.40744C9.15532 3.21697 8.19026 2.2519 6.99979 2.2519C5.80932 2.2519 4.84425 3.21697 4.84425 4.40744V5.84447C4.84425 6.24129 4.52256 6.56298 4.12574 6.56298C3.72892 6.56298 3.40723 5.84447 3.40723 4.40744Z"
      fill="currentColor"
    />
  </svg>
);


// =========================================================
// FASHION EDITORIAL SECTION
// =========================================================

export default function FashionEditorialSection() {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        py-16
        md:py-20
        lg:py-24
      "
      style={{
        backgroundColor: "#fdf5ee",
      }}
    >

      {/* =====================================================
          SOFT BACKGROUND GLOW
          No left/right background images
      ====================================================== */}

      <div className="absolute inset-0 pointer-events-none">

        <div
          className="
            absolute
            left-[-10%]
            bottom-[-30%]
            w-[40%]
            h-[65%]
            rounded-full
            bg-[#f6c7a5]
            opacity-20
            blur-[90px]
          "
        />

        <div
          className="
            absolute
            right-[-10%]
            top-[-20%]
            w-[40%]
            h-[65%]
            rounded-full
            bg-[#f7d0b3]
            opacity-20
            blur-[90px]
          "
        />

      </div>


      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div
        className="
          relative
          z-10
          max-w-[1500px]
          mx-auto
          px-6
          md:px-10
          lg:px-16
        "
      >

        <div
          className="
            relative
            w-full
            min-h-[500px]
            lg:min-h-[560px]
            grid
            grid-cols-1
            lg:grid-cols-[1fr_0.85fr_1fr]
            items-center
            gap-10
            lg:gap-4
          "
        >


          {/* =================================================
              LEFT COLUMN
          ================================================== */}

          <div
            className="
              relative
              z-40
              text-center
              lg:text-right
              lg:pr-8
            "
          >

            {/* Heading */}

            <h2
              className="
                text-[#111111]
                font-bold
                text-3xl
                md:text-4xl
                lg:text-[30px]
                leading-tight
              "
            >
              I Love Freedom
            </h2>


            {/* Orange heading */}

            <h3
              className="
                mt-1
                text-[#ee965d]
                text-2xl
                md:text-3xl
                lg:text-[28px]
                leading-tight
              "
              style={{
                fontFamily:
                  "'Cormorant Garamond', serif",
                fontWeight: 500,
              }}
            >
              That's why i Fashion
            </h3>


            {/* Description */}

            <p
              className="
                mt-7
                max-w-[500px]
                ml-auto
                text-[#222222]
                text-sm
                md:text-[15px]
                leading-7
              "
            >
              This theme draws inspiration from
              the enchanting world of flowers,
              embodying their elegance, diversity,
              and timeless allure within the realm
              of clothing design.
            </p>


            {/* Button */}

            <div
              className="
                mt-8
                flex
                justify-center
                lg:justify-end
              "
            >

              <Link
                to="/profile/collection"
                className="
                  inline-flex
                  items-center
                  gap-3
                  px-6
                  py-3.5
                  rounded-full
                  bg-[#3d5a45]
                  hover:bg-[#304936]
                  text-white
                  text-sm
                  font-semibold
                  transition-all
                  duration-300
                  shadow-sm
                  hover:shadow-lg
                "
              >

                Check More Products

                <BagIcon />

              </Link>

            </div>

          </div>


          {/* =================================================
              CENTER IMAGE AREA
          ================================================== */}

          <div
            className="
              relative
              z-20
              flex
              items-center
              justify-center
              min-h-[350px]
              md:min-h-[400px]
              lg:min-h-[520px]
            "
          >

            {/* ===============================================
                ORANGE CIRCLE
            ================================================ */}

            <div
              className="
                absolute
                w-[155px]
                h-[155px]
                md:w-[185px]
                md:h-[185px]
                lg:w-[220px]
                lg:h-[220px]
                rounded-full
                bg-[#ff9655]
                top-[17%]
                left-1/2
                -translate-x-1/2
              "
            />


            {/* ===============================================
                GREEN CIRCLE OUTLINE
            ================================================ */}

            <div
              className="
                absolute
                w-[180px]
                h-[180px]
                md:w-[215px]
                md:h-[215px]
                lg:w-[255px]
                lg:h-[255px]
                rounded-full
                border-2
                border-[#3d5a45]
                top-[14%]
                left-1/2
                -translate-x-[43%]
              "
            />


            {/* ===============================================
                CENTER IMAGE
                SLIGHTLY SMALLER
            ================================================ */}

            <img
              src={centerImage}
              alt="Fashion model"
              className="
                relative
                z-20
                w-[220px]
                md:w-[265px]
                lg:w-[340px]
                max-h-[440px]
                object-contain
                drop-shadow-[0_20px_20px_rgba(0,0,0,0.12)]
              "
            />


            {/* ===============================================
                ORANGE DOT
            ================================================ */}

            <div
              className="
                absolute
                z-30
                top-[8%]
                right-[20%]
                w-8
                h-8
                rounded-full
                bg-[#ff9655]
              "
            />


            {/* ===============================================
                GREEN DOT
            ================================================ */}

            <div
              className="
                absolute
                z-30
                bottom-[23%]
                left-[12%]
                w-6
                h-6
                rounded-full
                bg-[#3d5a45]
              "
            />


            {/* ===============================================
                BLACK DOT
            ================================================ */}

            <div
              className="
                absolute
                z-30
                top-[29%]
                right-[16%]
                w-4
                h-4
                rounded-full
                bg-[#111111]
              "
            />

          </div>


          {/* =================================================
              RIGHT COLUMN
          ================================================== */}

          <div
            className="
              relative
              z-40
              text-center
              lg:text-left
              lg:pl-8
            "
          >

            {/* Heading */}

            <h2
              className="
                text-[#111111]
                font-bold
                text-3xl
                md:text-4xl
                lg:text-[30px]
                leading-tight
              "
            >
              Immerse yourself
            </h2>


            {/* Orange heading */}

            <h3
              className="
                mt-1
                text-[#ee965d]
                text-2xl
                md:text-3xl
                lg:text-[28px]
                leading-tight
              "
              style={{
                fontFamily:
                  "'Cormorant Garamond', serif",
                fontWeight: 500,
              }}
            >
              in the Fashion dress
            </h3>


            {/* Description */}

            <p
              className="
                mt-7
                max-w-[500px]
                text-[#222222]
                text-sm
                md:text-[15px]
                leading-7
              "
            >
              These colors are intricately woven
              into fabrics, capturing the essence
              of petals, leaves, and stems through
              exquisite prints, embroideries.
            </p>


            {/* Button */}

            <div
              className="
                mt-8
                flex
                justify-center
                lg:justify-start
              "
            >

              <Link
                to="/profile/collection"
                className="
                  inline-flex
                  items-center
                  gap-3
                  px-6
                  py-3.5
                  rounded-full
                  bg-[#3d5a45]
                  hover:bg-[#304936]
                  text-white
                  text-sm
                  font-semibold
                  transition-all
                  duration-300
                  shadow-sm
                  hover:shadow-lg
                "
              >

                Check More Products

                <BagIcon />

              </Link>

            </div>

          </div>

        </div>


        {/* =====================================================
            DECORATIVE DOTTED CURVES
        ====================================================== */}

        <svg
          className="
            absolute
            inset-0
            w-full
            h-full
            z-30
            pointer-events-none
            hidden
            lg:block
          "
          viewBox="0 0 1500 560"
          preserveAspectRatio="none"
        >

          {/* ===============================================
              UPPER LEFT CURVE
          ================================================ */}

          <path
            d="
              M 520 170
              C 585 120,
                660 120,
                725 170
            "
            fill="none"
            stroke="#222222"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            opacity="0.65"
          />


          {/* ===============================================
              UPPER RIGHT CURVE
          ================================================ */}

          <path
            d="
              M 820 170
              C 895 120,
                970 135,
                1045 185
            "
            fill="none"
            stroke="#222222"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            opacity="0.65"
          />


          {/* ===============================================
              LOWER LEFT CURVE
          ================================================ */}

          <path
            d="
              M 535 390
              C 590 440,
                640 455,
                690 415
            "
            fill="none"
            stroke="#222222"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            opacity="0.65"
          />

        </svg>


        {/* =====================================================
            SMALL DECORATIVE SQUARE
        ====================================================== */}

        <div
          className="
            absolute
            z-30
            left-1/2
            bottom-[10%]
            -translate-x-1/2
            w-10
            h-10
            border
            border-[#b58c68]
            opacity-60
            pointer-events-none
          "
        />

      </div>

    </section>
  );
}