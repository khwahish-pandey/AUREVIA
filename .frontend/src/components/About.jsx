import React from "react";
import { Link } from "react-router-dom";

import leftBg from "../assets/left.png";
import rightBg from "../assets/right.png";

/* =========================================================
   CREAM SECTION WITH SMALL SIDE BACKGROUND IMAGES
========================================================= */

const CreamBackground = ({ children, className = "" }) => {
  return (
    <section
      className={`relative w-full overflow-hidden bg-[#fdf5ee] ${className}`}
    >

      {/* =====================================================
          SMALL LEFT BACKGROUND IMAGE
      ====================================================== */}

      <div
        className="
          absolute
          left-0
          top-0
          bottom-0
          hidden
          md:block
          w-[15%]
          max-w-[180px]
          z-10
          opacity-50
          pointer-events-none
        "
      >
        <img
          src={leftBg}
          alt=""
          className="w-full h-full object-cover"
          style={{
            filter: "blur(8px)",
          }}
        />
      </div>


      {/* =====================================================
          SMALL RIGHT BACKGROUND IMAGE
      ====================================================== */}

      <div
        className="
          absolute
          right-0
          top-0
          bottom-0
          hidden
          md:block
          w-[15%]
          max-w-[180px]
          z-10
          opacity-50
          pointer-events-none
        "
      >
        <img
          src={rightBg}
          alt=""
          className="w-full h-full object-cover"
          style={{
            filter: "blur(8px)",
          }}
        />
      </div>


      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="relative z-20">
        {children}
      </div>

    </section>
  );
};


/* =========================================================
   ABOUT PAGE
========================================================= */

function About() {
  return (
    <main className="min-h-screen bg-[#fdf5ee] text-[#2a2a2a]">

      {/* =====================================================
          FONTS
      ====================================================== */}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600&display=swap');

        .about-page {
          font-family: 'DM Sans', sans-serif;
        }

        .about-serif {
          font-family: 'Cormorant Garamond', serif;
        }
      `}</style>


      <div className="about-page">


        {/* ===================================================
            1. THE AUREVIA STORY
            CREAM + SMALL SIDE IMAGES
        ==================================================== */}

        <CreamBackground className="pt-20 md:pt-28 pb-20">

          <div className="max-w-6xl mx-auto px-6 lg:px-12">

            <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-10 items-center">


              {/* =================================================
                  LEFT
              ================================================== */}

              <div>

                <span className="text-[9px] uppercase tracking-[0.35em] text-[#d4845a]">
                  The Aurevia Story
                </span>

                <h1 className="about-serif mt-5 text-6xl md:text-7xl lg:text-8xl leading-[0.85]">

                  Dress

                  <br />

                  <span className="italic text-[#d4845a]">
                    beyond
                  </span>

                  <br />

                  the ordinary.

                </h1>

              </div>


              {/* =================================================
                  CENTER DECORATION
              ================================================== */}

              <div className="hidden lg:flex flex-col items-center gap-4">

                <div className="w-px h-20 bg-[#3d5a45]/30" />

                <span className="text-[8px] uppercase tracking-[0.3em] text-gray-400 [writing-mode:vertical-rl]">
                  Aurevia
                </span>

                <div className="w-px h-20 bg-[#3d5a45]/30" />

              </div>


              {/* =================================================
                  RIGHT
              ================================================== */}

              <div className="lg:pl-8">

                <p className="text-sm md:text-[15px] leading-7 text-gray-600">
                  Aurevia is a celebration of timeless elegance,
                  thoughtful craftsmanship and contemporary
                  individuality.
                </p>

                <p className="mt-5 text-sm md:text-[15px] leading-7 text-gray-600">
                  We create pieces designed to become part of
                  your story — combining distinctive silhouettes,
                  refined details and a modern interpretation of
                  classic fashion.
                </p>

                <Link
                  to="/profile/collection"
                  className="
                    inline-flex
                    items-center
                    gap-4
                    mt-8
                    border-b
                    border-[#d4845a]
                    pb-2
                    text-[9px]
                    uppercase
                    tracking-[0.25em]
                    text-[#d4845a]
                    hover:text-[#3d5a45]
                    hover:border-[#3d5a45]
                    transition-all
                  "
                >
                  Explore Collection
                  <span>→</span>
                </Link>

              </div>

            </div>

          </div>

        </CreamBackground>



        {/* ===================================================
            2. BRAND PHILOSOPHY
            BEIGE
        ==================================================== */}

        <section className="py-20 md:py-28 bg-[#ebe2d8]">

          <div className="max-w-7xl mx-auto px-6 lg:px-12">

            <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">


              {/* IMAGE */}

              <div className="relative">

                <div className="aspect-[0.9] overflow-hidden">

                  <img
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1100&q=85"
                    alt="Aurevia fashion"
                    className="w-full h-full object-cover"
                  />

                </div>


                {/* LABEL */}

                <div className="absolute bottom-6 left-6 bg-[#3d5a45] text-white px-6 py-5">

                  <p className="about-serif text-3xl">
                    01
                  </p>

                  <p className="mt-1 text-[8px] uppercase tracking-[0.25em] text-emerald-100/70">
                    Our philosophy
                  </p>

                </div>

              </div>


              {/* TEXT */}

              <div>

                <span className="text-[9px] uppercase tracking-[0.35em] text-[#d4845a]">
                  Our Philosophy
                </span>

                <h2 className="about-serif mt-5 text-5xl md:text-6xl leading-[0.9]">

                  Elegance should

                  <br />

                  never feel

                  <br />

                  <i>ordinary.</i>

                </h2>

                <div className="w-14 h-px bg-[#d4845a] my-8" />

                <p className="text-sm leading-7 text-gray-600">
                  At Aurevia, we believe fashion is more than
                  clothing. It is a language of identity,
                  confidence and expression.
                </p>

                <p className="mt-5 text-sm leading-7 text-gray-600">
                  Our collections bring together the richness
                  of timeless design with the freedom of
                  contemporary style. Every silhouette, texture
                  and detail is chosen to create something
                  distinctive yet effortlessly wearable.
                </p>

                <p className="mt-5 text-sm leading-7 text-gray-600">
                  From understated everyday pieces to statement
                  silhouettes, Aurevia exists for those who want
                  their wardrobe to feel personal, refined and
                  unmistakably their own.
                </p>

              </div>

            </div>

          </div>

        </section>



        {/* ===================================================
            3. NEO-VICTORIAN INSPIRATION
            CREAM + SMALL SIDE IMAGES
        ==================================================== */}

        <CreamBackground className="py-24 md:py-32">

          <div className="max-w-7xl mx-auto px-6 lg:px-12">

            {/* TITLE */}

            <div className="max-w-3xl">

              <span className="text-[9px] uppercase tracking-[0.35em] text-[#d4845a]">
                Our Inspiration
              </span>

              <h2 className="about-serif mt-5 text-5xl md:text-6xl lg:text-7xl leading-[0.9]">

                The Enigmatic Elegance

                <br />

                of Neo-Victorianism

              </h2>

              <p className="mt-7 max-w-2xl text-sm leading-7 text-gray-600">
                Our visual language draws inspiration from
                the intricate beauty of the Victorian era while
                embracing the confidence and freedom of modern
                fashion.
              </p>

            </div>


            {/* CARDS */}

            <div className="grid md:grid-cols-3 gap-6 mt-16">


              {/* CARD 1 */}

              <div className="bg-[#ebe2d8] p-8 md:p-10">

                <span className="text-[#d4845a] text-sm">
                  01
                </span>

                <h3 className="about-serif mt-7 text-3xl">
                  Rich textures
                </h3>

                <p className="mt-4 text-sm leading-7 text-gray-600">
                  Lace, flowing fabrics, structured forms and
                  expressive textures create depth and character
                  within every collection.
                </p>

              </div>


              {/* CARD 2 */}

              <div className="bg-[#3d5a45] text-white p-8 md:p-10">

                <span className="text-[#d4845a] text-sm">
                  02
                </span>

                <h3 className="about-serif mt-7 text-3xl">
                  Modern silhouettes
                </h3>

                <p className="mt-4 text-sm leading-7 text-emerald-50/70">
                  Historical references are transformed into
                  contemporary silhouettes designed for the
                  modern wardrobe.
                </p>

              </div>


              {/* CARD 3 */}

              <div className="bg-[#ebe2d8] p-8 md:p-10">

                <span className="text-[#d4845a] text-sm">
                  03
                </span>

                <h3 className="about-serif mt-7 text-3xl">
                  Quiet confidence
                </h3>

                <p className="mt-4 text-sm leading-7 text-gray-600">
                  We believe true luxury does not need to shout.
                  It exists in the details, the fit and the feeling
                  a piece creates.
                </p>

              </div>

            </div>

          </div>

        </CreamBackground>



        {/* ===================================================
            4. SARTORIAL SYMPHONY
            GREEN
        ==================================================== */}

        <section className="py-24 md:py-32 bg-[#3d5a45] text-white">

          <div className="max-w-7xl mx-auto px-6 lg:px-12">

            <div className="grid lg:grid-cols-2 gap-16 items-center">


              {/* TEXT */}

              <div className="lg:pr-12">

                <span className="text-[9px] uppercase tracking-[0.35em] text-[#d4845a]">
                  A Sartorial Symphony
                </span>

                <h2 className="about-serif mt-5 text-5xl md:text-6xl leading-[0.9]">

                  Fashion is a story

                  <br />

                  without <i>words.</i>

                </h2>

                <div className="w-14 h-px bg-[#d4845a] my-8" />

                <p className="text-sm leading-7 text-emerald-50/70">
                  Fashion themes are a vibrant tapestry of
                  history, culture and creativity. They allow
                  us to explore different identities and
                  reinterpret ideas from the past through a
                  contemporary lens.
                </p>

                <p className="mt-5 text-sm leading-7 text-emerald-50/70">
                  Aurevia embraces this freedom. From romantic
                  silhouettes and vintage-inspired details to
                  futuristic forms and urban influences, our
                  collections are designed to evolve with you.
                </p>


                {/* TAGS */}

                <div className="mt-8 flex flex-wrap gap-3">

                  {[
                    "Neo-Victorian",
                    "Modern Classic",
                    "Romantic",
                    "Contemporary",
                  ].map((item) => (

                    <span
                      key={item}
                      className="
                        border
                        border-white/20
                        px-4
                        py-2
                        text-[9px]
                        uppercase
                        tracking-[0.15em]
                        text-emerald-50/70
                      "
                    >
                      {item}
                    </span>

                  ))}

                </div>

              </div>


              {/* IMAGE */}

              <div className="relative">

                <div className="aspect-[0.85] overflow-hidden">

                  <img
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1100&q=85"
                    alt="Aurevia collection"
                    className="w-full h-full object-cover"
                  />

                </div>

                <div className="absolute -bottom-6 -left-6 bg-[#fdf5ee] text-[#2a2a2a] px-7 py-6 shadow-xl">

                  <p className="about-serif text-3xl">
                    Style
                  </p>

                  <p className="mt-1 text-[8px] uppercase tracking-[0.25em] text-gray-400">
                    Without boundaries
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>



        {/* ===================================================
            5. BEYOND TRENDS
            CREAM + SMALL SIDE IMAGES
        ==================================================== */}

        <CreamBackground className="py-24 md:py-32">

          <div className="max-w-7xl mx-auto px-6 lg:px-12">

            <div className="grid lg:grid-cols-2 gap-16 items-center">


              {/* IMAGE */}

              <div>

                <div className="aspect-[0.9] overflow-hidden">

                  <img
                    src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1100&q=85"
                    alt="Contemporary fashion"
                    className="w-full h-full object-cover"
                  />

                </div>

              </div>


              {/* TEXT */}

              <div className="lg:pl-10">

                <span className="text-[9px] uppercase tracking-[0.35em] text-[#d4845a]">
                  Beyond Trends
                </span>

                <h2 className="about-serif mt-5 text-5xl md:text-6xl leading-[0.9]">

                  Designed for

                  <br />

                  <i>your</i> era.

                </h2>

                <div className="w-14 h-px bg-[#d4845a] my-8" />

                <p className="text-sm leading-7 text-gray-600">
                  Trends come and go. Personal style stays.
                  Aurevia is built around pieces that can move
                  beyond a single season and become part of your
                  individual wardrobe.
                </p>

                <p className="mt-5 text-sm leading-7 text-gray-600">
                  We combine timeless references with modern
                  sensibilities so that every piece feels
                  relevant today while retaining the character
                  to remain meaningful tomorrow.
                </p>

                <Link
                  to="/profile/collection"
                  className="
                    inline-flex
                    items-center
                    gap-3
                    mt-9
                    border
                    border-[#d4845a]
                    text-[#d4845a]
                    px-7
                    py-3.5
                    text-[9px]
                    uppercase
                    tracking-[0.2em]
                    hover:bg-[#d4845a]
                    hover:text-white
                    transition-all
                  "
                >
                  Explore Collection
                  <span>→</span>
                </Link>

              </div>

            </div>

          </div>

        </CreamBackground>



        {/* ===================================================
            6. AUREVIA PROMISE
            BEIGE
        ==================================================== */}

        <section className="py-24 md:py-32 bg-[#ebe2d8]">

          <div className="max-w-7xl mx-auto px-6 lg:px-12">

            <div className="text-center max-w-2xl mx-auto">

              <span className="text-[9px] uppercase tracking-[0.35em] text-[#d4845a]">
                The Aurevia Promise
              </span>

              <h2 className="about-serif mt-5 text-5xl md:text-6xl">
                More than a wardrobe.
              </h2>

              <p className="mt-5 text-sm leading-7 text-gray-600">
                Every part of the Aurevia experience is designed
                around elegance, convenience and confidence.
              </p>

            </div>


            {/* SERVICE CARDS */}

            <div className="grid md:grid-cols-3 gap-6 mt-16">


              {/* CARD 1 */}

              <div className="bg-[#fdf5ee] p-8 md:p-10 border border-[#e4d7cc]">

                <div className="w-12 h-12 rounded-full bg-[#3d5a45] flex items-center justify-center text-[#d4845a] text-xl">
                  ✦
                </div>

                <h3 className="about-serif mt-7 text-3xl">
                  Thoughtful delivery
                </h3>

                <p className="mt-4 text-sm leading-7 text-gray-500">
                  We make every effort to ensure your order
                  reaches you smoothly and on time, wherever
                  your style takes you.
                </p>

              </div>


              {/* CARD 2 */}

              <div className="bg-[#fdf5ee] p-8 md:p-10 border border-[#e4d7cc]">

                <div className="w-12 h-12 rounded-full bg-[#3d5a45] flex items-center justify-center text-[#d4845a] text-xl">
                  ◇
                </div>

                <h3 className="about-serif mt-7 text-3xl">
                  Curated offers
                </h3>

                <p className="mt-4 text-sm leading-7 text-gray-500">
                  Discover thoughtfully selected collections and
                  offers created to make exceptional style feel
                  even more accessible.
                </p>

              </div>


              {/* CARD 3 */}

              <div className="bg-[#fdf5ee] p-8 md:p-10 border border-[#e4d7cc]">

                <div className="w-12 h-12 rounded-full bg-[#3d5a45] flex items-center justify-center text-[#d4845a] text-xl">
                  ♢
                </div>

                <h3 className="about-serif mt-7 text-3xl">
                  Always here
                </h3>

                <p className="mt-4 text-sm leading-7 text-gray-500">
                  Have a question? Our support experience is
                  built around making your journey with Aurevia
                  simple and reassuring.
                </p>

              </div>

            </div>

          </div>

        </section>



        {/* ===================================================
            7. STATS
            PLAIN CREAM — NO SIDE IMAGES
        ==================================================== */}

        <section className="border-y border-[#e4d7cc] bg-[#fdf5ee]">

          <div className="max-w-6xl mx-auto px-6 lg:px-12">

            <div className="grid grid-cols-2 md:grid-cols-4">


              {/* 100% */}

              <div className="py-12 md:py-16 text-center border-r border-[#e4d7cc]">

                <p className="about-serif text-4xl md:text-5xl text-[#3d5a45]">
                  100%
                </p>

                <p className="mt-2 text-[8px] uppercase tracking-[0.2em] text-gray-500">
                  Curated style
                </p>

              </div>


              {/* INFINITY */}

              <div className="py-12 md:py-16 text-center md:border-r border-[#e4d7cc]">

                <p className="about-serif text-4xl md:text-5xl text-[#3d5a45]">
                  ∞
                </p>

                <p className="mt-2 text-[8px] uppercase tracking-[0.2em] text-gray-500">
                  Possibilities
                </p>

              </div>


              {/* 24/7 */}

              <div className="py-12 md:py-16 text-center border-r border-[#e4d7cc]">

                <p className="about-serif text-4xl md:text-5xl text-[#3d5a45]">
                  24/7
                </p>

                <p className="mt-2 text-[8px] uppercase tracking-[0.2em] text-gray-500">
                  Support
                </p>

              </div>


              {/* YOURS */}

              <div className="py-12 md:py-16 text-center">

                <p className="about-serif text-4xl md:text-5xl text-[#3d5a45]">
                  Yours
                </p>

                <p className="mt-2 text-[8px] uppercase tracking-[0.2em] text-gray-500">
                  Your style
                </p>

              </div>

            </div>

          </div>

        </section>



        {/* ===================================================
            8. FINAL CTA
            PLAIN CREAM — NO SIDE IMAGES
        ==================================================== */}

        <section className="py-28 bg-[#fdf5ee]">

          <div className="max-w-4xl mx-auto px-6 text-center">

            <span className="text-[9px] uppercase tracking-[0.4em] text-[#d4845a]">
              Your story begins here
            </span>

            <h2 className="about-serif mt-5 text-6xl md:text-7xl leading-[0.88]">

              Find something

              <br />

              <i>uniquely yours.</i>

            </h2>

            <p className="mt-7 max-w-lg mx-auto text-sm leading-7 text-gray-500">
              Explore the Aurevia collection and discover
              pieces designed to accompany every version of you.
            </p>

            <Link
              to="/profile/collection"
              className="
                inline-flex
                mt-9
                border
                border-[#d4845a]
                text-[#d4845a]
                px-8
                py-3.5
                text-[9px]
                uppercase
                tracking-[0.2em]
                hover:bg-[#d4845a]
                hover:text-white
                transition-all
              "
            >
              Discover Aurevia
            </Link>

          </div>

        </section>

      </div>

    </main>
  );
}

export default About;