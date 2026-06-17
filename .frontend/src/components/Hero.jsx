import { useState } from "react";
// Import your background image like this:
// import heroBg from "../assets/home-bg.png";
// import heroImage from "../assets/hero-model.jpg";
import React from 'react'



// Icons as inline SVGs
const BagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M11.1258 5.12596H2.87416C2.04526 5.12596 1.38823 5.82533 1.43994 6.65262L1.79919 12.4007C1.84653 13.1581 2.47458 13.7481 3.23342 13.7481H10.7666C11.5254 13.7481 12.1535 13.1581 12.2008 12.4007L12.5601 6.65262C12.6118 5.82533 11.9547 5.12596 11.1258 5.12596ZM2.87416 3.68893C1.21635 3.68893 -0.0977 5.08768 0.00571155 6.74226L0.364968 12.4904C0.459638 14.0051 1.71574 15.1851 3.23342 15.1851H10.7666C12.2843 15.1851 13.5404 14.0051 13.635 12.4904L13.9943 6.74226C14.0977 5.08768 12.7837 3.68893 11.1258 3.68893H2.87416Z" fill="white"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M3.40723 4.40744C3.40723 2.42332 5.01567 0.81488 6.99979 0.81488C8.9839 0.81488 10.5923 2.42332 10.5923 4.40744V5.84447C10.5923 6.24129 10.2707 6.56298 9.87384 6.56298C9.47701 6.56298 9.15532 6.24129 9.15532 5.84447V4.40744C9.15532 3.21697 8.19026 2.2519 6.99979 2.2519C5.80932 2.2519 4.84425 3.21697 4.84425 4.40744V5.84447C4.84425 6.24129 4.52256 6.56298 4.12574 6.56298C3.72892 6.56298 3.40723 6.24129 3.40723 5.84447V4.40744Z" fill="white"/>
  </svg>
);

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 44" width="45" height="44">
    <path
      fillRule="evenodd"
      d="m26.9 19.9c1.5 1 1.5 3.2 0 4.2l-6.1 4.1c-1.6 1.1-3.9-0.1-3.9-2.1v-8.2c0-2 2.3-3.2 3.9-2.1zm-0.7 1.1l-6.1-4.1c-0.8-0.6-1.9 0-1.9 1v8.2c0 1 1.1 1.6 1.9 1l6.1-4c0.8-0.5 0.8-1.6 0-2.1z"
      fill="#d4845a"
    />
    <rect x="0.5" y="0.5" width="44" height="43" rx="21.5" fill="none" stroke="#d4845a" strokeWidth="1" />
  </svg>
);

const GiftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d4845a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 12 20 22 4 22 4 12"/>
    <rect x="2" y="7" width="20" height="5"/>
    <line x1="12" y1="22" x2="12" y2="7"/>
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
  </svg>
);

const DiscountIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d4845a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);

const ShippingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d4845a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="1" cy="21" r="1"/><circle cx="15" cy="21" r="1"/>
    <path d="M23 21V7l-3-4H9v18"/>
    <path d="M1 21L1 14l5-9 9 0"/>
    <line x1="9" y1="3" x2="9" y2="14"/>
    <line x1="1" y1="14" x2="9" y2="14"/>
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="35" height="34" viewBox="0 0 35 34" fill="none">
    <line x1="2.29695" y1="1.29289" x2="34.1168" y2="33.1127" stroke="white" strokeWidth="2"/>
    <line x1="0.882737" y1="33.1122" x2="32.7025" y2="1.29242" stroke="white" strokeWidth="2"/>
  </svg>
);

// Decorative leaf SVG overlay
const LeafDecor = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    {[0, 40, 80, 120, 160].map((rot, i) => (
      <g key={i} transform={`rotate(${rot}, 150, 150)`}>
        <path
          d="M150 60 C120 90, 90 130, 110 170 C130 210, 170 210, 190 170 C210 130, 180 90, 150 60Z"
          stroke="#c47a45"
          strokeWidth="1.2"
          opacity="0.55"
        />
        <line x1="150" y1="60" x2="150" y2="175" stroke="#c47a45" strokeWidth="0.8" opacity="0.4" />
        {[1,2,3,4].map(j => (
          <line
            key={j}
            x1={150 - j * 10}
            y1={60 + j * 28}
            x2={150 + j * 10}
            y2={60 + j * 28}
            stroke="#c47a45"
            strokeWidth="0.6"
            opacity="0.35"
          />
        ))}
      </g>
    ))}
  </svg>
);

const services = [
  {
    icon: <GiftIcon />,
    title: "Finished products",
    subtitle: "products and gift wrapping",
  },
  {
    icon: <DiscountIcon />,
    title: "Large and frequent",
    subtitle: "promotions with numerous discounts",
  },
  {
    icon: <ShippingIcon />,
    title: "Free shipping",
    subtitle: "on any order from $150",
  },
];

export default function HeroSection() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
      {/* ── Google Fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');

        .hero-section {
          font-family: 'DM Sans', sans-serif;
        }
        .hero-section h2 {
          font-family: 'Cormorant Garamond', serif;
        }
        .btn-primary {
          background-color: #d4845a;
          transition: background-color 0.25s, transform 0.2s;
        }
        .btn-primary:hover {
          background-color: #bf6e45;
          transform: translateY(-1px);
        }
        .play-btn-wrap {
          transition: transform 0.2s;
        }
        .play-btn-wrap:hover {
          transform: scale(1.08);
        }
        .service-box {
          transition: transform 0.2s;
        }
        .service-box:hover {
          transform: translateY(-3px);
        }
        /* video overlay */
        .video-overlay {
          backdrop-filter: blur(6px);
        }
      `}</style>

      <section
        className="hero-section relative w-full overflow-hidden"
        style={{
          // Replace the url() value below with your imported image:
          // backgroundImage: `url(${heroBg})`,
          backgroundImage: "url('https://shopping-workdo.myshopify.com/cdn/shop/files/home-bg.png?v=1702015288')",
          backgroundSize: "cover",
          // FIXED: Changed background position to 'top center' so the image's top edge is never cut off
          backgroundPosition: "top center",
          backgroundColor: "#2d4a35", // fallback dark green
          minHeight: "520px",
        }}
      >
        {/* Leaf decor — top-left */}
        <div className="absolute top-0 left-16 w-72 h-72 pointer-events-none opacity-70 hidden md:block">
          <LeafDecor />
        </div>

        {/* Leaf decor — bottom-right (mirrored) */}
        <div className="absolute bottom-0 right-8 w-56 h-56 pointer-events-none opacity-50 hidden lg:block rotate-180">
          <LeafDecor />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-24 flex flex-col lg:flex-row items-center gap-10">

          {/* ── LEFT CONTENT ── */}
          <div className="flex-1 text-white">
            {/* Sub label */}
            <span className="text-sm tracking-widest uppercase text-[#d4845a] font-medium mb-3 block">
              Fashion
            </span>

            {/* Headline */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-5">
              We Live Fashion<br />Amazing Design
            </h2>

            {/* Body */}
            <p className="text-white/75 text-sm md:text-base max-w-md mb-8 leading-relaxed">
              The world of fashion is a vibrant tapestry woven with threads of
              creativity, innovation, and self-expression.
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap items-center gap-5 mb-14">
              {/* Primary button */}
              <a
                href="/collections/all"
                className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-medium"
              >
                Check More Products <BagIcon />
              </a>

              {/* Play video */}
              <button
                onClick={() => setVideoOpen(true)}
                className="play-btn-wrap flex items-center gap-3 text-white/80 hover:text-white text-sm"
              >
                <PlayIcon />
                play video
              </button>
            </div>

            {/* Service badges */}
            <div className="flex flex-wrap gap-6">
              {services.map((s, i) => (
                <div key={i} className="service-box flex items-center gap-3">
                  <div className="flex-shrink-0">{s.icon}</div>
                  <div>
                    <p className="text-white text-sm font-semibold leading-snug">{s.title}</p>
                    <p className="text-white/60 text-xs leading-snug">{s.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT IMAGE ── */}
          <div className="flex-shrink-0 w-full lg:w-[420px] xl:w-[480px] relative">
            {/* Orange rectangle frame */}
            <div className="absolute -inset-2 bg-[#c47a45]/20 rounded-2xl" />

            

            {/* Leaf decor over image corner */}
            <div className="absolute bottom-4 right-4 w-32 h-32 pointer-events-none opacity-40 z-20">
              <LeafDecor />
            </div>
          </div>
        </div>

        {/* ── VIDEO POPUP ── */}
        {videoOpen && (
          <div
            className="video-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            onClick={() => setVideoOpen(false)}
          >
            <div
              className="relative w-full max-w-3xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setVideoOpen(false)}
                className="absolute -top-10 right-0 text-white opacity-80 hover:opacity-100 transition-opacity"
              >
                <CloseIcon />
              </button>
              <div className="aspect-video">
                <iframe
                  className="w-full h-full rounded-xl"
                  src="https://www.youtube.com/embed/7Twgvw5NnvU?autoplay=1&controls=0&rel=0&modestbranding=1"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}