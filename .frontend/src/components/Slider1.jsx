import React from 'react';

const BagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M11.1258 5.12596H2.87416C2.04526 5.12596 1.38823 5.82533 1.43994 6.65262L1.79919 12.4007C1.84653 13.1581 2.47458 13.7481 3.23342 13.7481H10.7666C11.5254 13.7481 12.1535 13.1581 12.2008 12.4007L12.5601 6.65262C12.6118 5.82533 11.9547 5.12596 11.1258 5.12596ZM2.87416 3.68893C1.21635 3.68893 -0.0977 5.08768 0.00571 6.74226L0.364968 12.4904C0.459638 14.0051 1.71574 15.1851 3.23342 15.1851H10.7666C12.2843 15.1851 13.5404 14.0051 13.635 12.4904L13.9943 6.74226C14.0977 5.08768 12.7837 3.68893 11.1258 3.68893H2.87416Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M3.40723 4.40744C3.40723 2.42332 5.01567 0.81488 6.99979 0.81488C8.9839 0.81488 10.5923 2.42332 10.5923 4.40744V5.84447C10.5923 6.24129 10.2707 6.56298 9.87384 6.56298C9.47701 6.56298 9.15532 6.24129 9.15532 5.84447V4.40744C9.15532 3.21697 8.19026 2.2519 6.99979 2.2519C5.80932 2.2519 4.84425 3.21697 4.84425 4.40744V5.84447C4.84425 6.24129 4.52256 6.56298 4.12574 6.56298C3.72892 6.56298 3.40723 6.24129 3.40723 5.84447V4.40744Z" fill="currentColor"/>
  </svg>
);

// IMPORT YOUR IMAGES
import mainBanner from "../assets/custom-banner.png";
import leftBg from "../assets/left.png";
import rightBg from "../assets/right.png";

export default function BohemianSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .boho-section {
          font-family: 'DM Sans', sans-serif;
        }

        .boho-title-accent {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 700;
          color: #d4845a;
          font-style: italic;
        }

        .boho-title-normal {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400;
          color: #2a2a2a;
        }

        .outline-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 24px;
          border: 1.5px solid #2a2a2a;
          border-radius: 9999px;
          font-size: 0.9rem;
          font-weight: 500;
          color: #2a2a2a;
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .outline-btn:hover {
          background: #d4845a;
          color: white;
          border-color: #d4845a;
        }

        .show-more-link {
          font-weight: 700;
          color: #2a2a2a;
          font-size: 0.95rem;
          text-decoration: none;
          border-bottom: 2px solid #2a2a2a;
          padding-bottom: 1px;
          transition: all 0.2s ease;
          display: inline-block;
        }

        .show-more-link:hover {
          color: #d4845a;
          border-color: #d4845a;
        }
      `}</style>

      <section
        className="boho-section relative w-full overflow-hidden py-16 lg:py-24"
        style={{ backgroundColor: "#fdf5ee" }}
      >

        {/* LEFT BACKGROUND IMAGE */}
        <div className="absolute left-0 top-0 bottom-0 w-[30%] max-w-[420px] z-10 opacity-70 pointer-events-none">
          <img
            src={leftBg}
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: "blur(8px)" }}
          />
        </div>

        {/* RIGHT BACKGROUND IMAGE */}
        <div className="absolute right-0 top-0 bottom-0 w-[30%] max-w-[420px] z-10 opacity-70 pointer-events-none">
          <img
            src={rightBg}
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: "blur(8px)" }}
          />
        </div>

        {/* MAIN CONTENT */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-between">

            {/* LEFT COLUMN */}
            <div className="flex-1 max-w-xl">
              <span className="text-sm tracking-widest text-[#2a2a2a]/60 mb-3 block">
                Fashion
              </span>

              <h2
                className="leading-tight mb-6"
                style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)" }}
              >
                <span className="boho-title-accent block">
                  Bohemian Rhapsody Redux
                </span>

                <span className="boho-title-normal block">
                  Artisanal Nomad
                </span>
              </h2>

              <p className="text-[#4a4a4a] text-sm leading-relaxed mb-8 max-w-md">
                This theme explores innovative fabrics, futuristic designs,
                and sleek silhouettes inspired by the digital age.
                Garments incorporate wearable tech elements, luminous accents,
                and modern aesthetics.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="/" className="outline-btn">
                  Men <BagIcon />
                </a>

                <a href="/" className="outline-btn">
                  Women <BagIcon />
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex-1 max-w-lg w-full">

              {/* IMAGE BOX */}
              <div
                className="relative mb-6 w-full flex justify-center items-center"
                style={{ height: "420px" }}
              >
                <div className="relative w-[92%] h-[95%] rounded-2xl overflow-hidden ">
                  <img
                    src={mainBanner}
                    alt="Bohemian Fashion Collection"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <p className="text-[#4a4a4a] text-sm leading-relaxed mb-4">
                This theme showcases rich textures, lavish embellishments,
                and a color palette inspired by royal jewels.
              </p>

              <a href="/" className="show-more-link">
                Show More
              </a>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}