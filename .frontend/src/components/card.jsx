import React, { useState, useEffect, useRef } from "react";

const BagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M11.1258 5.12596H2.87416C2.04526 5.12596 1.38823 5.82533 1.43994 6.65262L1.79919 12.4007C1.84653 13.1581 2.47458 13.7481 3.23342 13.7481H10.7666C11.5254 13.7481 12.1535 13.1581 12.2008 12.4007L12.5601 6.65262C12.6118 5.82533 11.9547 5.12596 11.1258 5.12596ZM2.87416 3.68893C1.21635 3.68893 -0.0977 5.08768 0.00571 6.74226L0.364968 12.4904C0.459638 14.0051 1.71574 15.1851 3.23342 15.1851H10.7666C12.2843 15.1851 13.5404 14.0051 13.635 12.4904L13.9943 6.74226C14.0977 5.08768 12.7837 3.68893 11.1258 3.68893H2.87416Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M3.40723 4.40744C3.40723 2.42332 5.01567 0.81488 6.99979 0.81488C8.9839 0.81488 10.5923 2.42332 10.5923 4.40744V5.84447C10.5923 6.24129 10.2707 6.56298 9.87384 6.56298C9.47701 6.56298 9.15532 6.24129 9.15532 5.84447V4.40744C9.15532 3.21697 8.19026 2.2519 6.99979 2.2519C5.80932 2.2519 4.84425 3.21697 4.84425 4.40744V5.84447C4.84425 6.24129 4.52256 6.56298 4.12574 6.56298C3.72892 6.56298 3.40723 6.24129 3.40723 5.84447V4.40744Z" fill="currentColor"/>
  </svg>
);

const CAROUSEL_DATA = [
  {
    id: 1,
    subTitle: "Fashion",
    accentTitle: "A Technological Voyage",
    normalTitle: "Sartorial Innovation",
    description: '"A Technological Voyage into Sartorial Innovation" is a fashion theme that envisions a dynamic intersection between cutting-edge technology and the realm of clothing design.',
    image: "https://shopping-workdo.myshopify.com/cdn/shop/files/video-banner.png?v=1702021133",
    link: "/collections/tech-innovation"
  },
  {
    id: 2,
    subTitle: "Summer Edit",
    accentTitle: "Earthy Textures",
    normalTitle: "Sienna & Sand",
    description: "Embrace the warmth of the season with relaxed, lightweight silhouettes crafted from rich, raw linens and terracotta tones.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80",
    link: "/collections/summer-edit"
  },
  {
    id: 3,
    subTitle: "Sustainability",
    accentTitle: "Eco-Tech Fabrics",
    normalTitle: "Living Garments",
    description: "Where biology meets tailoring: jackets crafted from lab-grown mycelium and textiles designed to capture carbon emissions.",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1600&q=80",
    link: "/collections/eco-fabrics"
  },
  {
    id: 4,
    subTitle: "Artisanal",
    accentTitle: "Handwoven Threads",
    normalTitle: "The Nomad Collection",
    description: "A deep dive into cultural heritage preservation featuring intricately detailed macramé overlays and raw geometric fringes.",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=80",
    link: "/collections/nomad"
  },
  {
    id: 5,
    subTitle: "Couture",
    accentTitle: "The Digital Loom",
    normalTitle: "Weaving Future Threads",
    description: "Exploring algorithmic knitting and generative patterns that adapt in real-time to environmental stimuli and human emotion.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=80",
    link: "/collections/future-threads"
  }
];

export default function BohoStyleCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === CAROUSEL_DATA.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => resetTimeout();
  }, [activeIndex]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        
        .boho-carousel {
          font-family: 'DM Sans', sans-serif;
        }
        .boho-font-serif-italic {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 400;
        }
        .boho-font-serif-normal {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400;
        }
      `}</style>

      <div className="boho-carousel relative w-full h-[550px] md:h-[650px] overflow-hidden bg-black group">
        
        {/* Slider Train */}
        <div 
          className="flex w-full h-full transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {CAROUSEL_DATA.map((card) => (
            <div
              key={card.id}
              className="w-full h-full flex-shrink-0 bg-cover bg-top bg-no-repeat relative flex items-center justify-start px-8 sm:px-16 md:px-24"
              style={{ backgroundImage: `url('${card.image}')` }}
            >
              {/* Clean black left-to-right fade setup */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent z-0" />
              
              {/* Left Content Window */}
              <div className="relative z-10 max-w-xl w-full text-left space-y-4 md:space-y-6 select-none">
                
                {/* Category tag */}
                <span className="text-xs md:text-sm tracking-widest text-white/60 uppercase block font-medium">
                  {card.subTitle}
                </span>
                
                {/* Heading Block */}
                <h2 className="leading-tight text-white" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
                  <span className="boho-font-serif-italic text-[#d4845a] block mb-1">
                    {card.accentTitle}
                  </span>
                  <span className="boho-font-serif-normal text-white block tracking-wide">
                    {card.normalTitle}
                  </span>
                </h2>

                {/* Sub-description paragraph copy */}
                <p className="text-white/80 text-xs sm:text-sm md:text-base leading-relaxed max-w-md font-light">
                  {card.description}
                </p>

                {/* Action Row */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <a 
                    href={card.link} 
                    className="inline-flex items-center gap-2.5 px-6 py-2.5 border-[1.5px] border-white text-white rounded-full text-xs md:text-sm font-medium bg-transparent transition-all duration-300 hover:bg-[#d4845a] hover:text-white hover:border-[#d4845a]"
                  >
                    Shop Collection <BagIcon />
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Custom Chevron Navigation Arrows */}
        <button 
          onClick={() => setActiveIndex((prev) => (prev === 0 ? CAROUSEL_DATA.length - 1 : prev - 1))}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center border border-white/20 text-white bg-black/40 hover:bg-[#d4845a] hover:border-[#d4845a] rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
          aria-label="Previous Slide"
        >
          <svg className="w-4 h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <button 
          onClick={() => setActiveIndex((prev) => (prev === CAROUSEL_DATA.length - 1 ? 0 : prev + 1))}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center border border-white/20 text-white bg-black/40 hover:bg-[#d4845a] hover:border-[#d4845a] rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
          aria-label="Next Slide"
        >
          <svg className="w-4 h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        {/* Minimalist Bottom Dots Indicator Track */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2.5 z-20">
          {CAROUSEL_DATA.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === index 
                  ? "w-6 bg-[#d4845a]" 
                  : "w-1.5 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}