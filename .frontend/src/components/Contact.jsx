import React, { useState } from "react";

import { Link } from "react-router-dom";

function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Contact form submitted:", formData);

    setSubmitted(true);

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <main className="min-h-screen bg-[#fdf5ee] text-[#292929]">

      {/* =====================================================
          TOP CONTACT SECTION
      ===================================================== */}

      <section className="relative bg-[#3d5a45]">

        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <div className="grid lg:grid-cols-2 gap-12 min-h-[560px] items-center">

            {/* =================================================
                LEFT — CONTACT INTRO
            ================================================= */}

            <div className="py-20 lg:py-28 lg:pr-16">

              {/* SMALL LABEL */}

              <div className="flex items-center gap-4 mb-7">

                <span className="w-10 h-px bg-[#d4845a]" />

                <span className="text-[9px] uppercase tracking-[0.35em] text-[#d4845a]">
                  Get In Touch
                </span>

              </div>


              {/* HEADING */}

              <h1
                className="text-6xl md:text-7xl lg:text-8xl leading-[0.82] text-white"
                style={{
                  fontFamily:
                    "'Cormorant Garamond', serif",
                }}
              >
                Let's start a
                <br />
                <span className="italic text-[#e0a987]">
                  conversation.
                </span>
              </h1>


              {/* DESCRIPTION */}

              <p className="mt-8 max-w-xl text-sm md:text-[15px] leading-7 text-emerald-50/70">

                Whether you have a question about an order,
                need help finding the perfect piece, or simply
                want to tell us what you think, we'd love to
                hear from you.

              </p>


              {/* SMALL DETAIL */}

              <div className="mt-10 flex items-center gap-5">

                <span
                  className="text-4xl text-white/30"
                  style={{
                    fontFamily:
                      "'Cormorant Garamond', serif",
                  }}
                >
                  01
                </span>

                <div className="w-14 h-px bg-white/20" />

                <span className="text-[8px] uppercase tracking-[0.3em] text-emerald-100/50">
                  Aurevia Concierge
                </span>

              </div>

            </div>


            {/* =================================================
                RIGHT — FORM
            ================================================= */}

            <div className="relative z-20 lg:translate-y-24 pb-16 lg:pb-0">

              <div className="bg-white border border-[#d9d9d9] p-6 md:p-8 lg:p-10 shadow-xl">

                {/* FORM HEADING */}

                <div className="mb-8">

                  <span className="text-[9px] uppercase tracking-[0.3em] text-[#d4845a]">
                    Send us a message
                  </span>

                  <h2
                    className="mt-3 text-4xl md:text-5xl leading-none"
                    style={{
                      fontFamily:
                        "'Cormorant Garamond', serif",
                    }}
                  >
                    Contact us
                  </h2>

                  <p className="mt-3 text-xs leading-6 text-gray-500">
                    Fill in the details below and our team will
                    get back to you as soon as possible.
                  </p>

                </div>


                {/* SUCCESS MESSAGE */}

                {submitted && (
                  <div className="mb-6 border border-[#c9d8ca] bg-[#f3f8f3] px-4 py-3 text-sm text-[#3d5a45]">
                    Thank you! Your message has been received.
                  </div>
                )}


                {/* FORM */}

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >

                  {/* FIRST + LAST NAME */}

                  <div className="grid sm:grid-cols-2 gap-5">

                    <div>

                      <label
                        htmlFor="firstName"
                        className="block mb-2 text-[10px] uppercase tracking-[0.15em] font-medium"
                      >
                        First name
                      </label>

                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First name"
                        className="w-full h-12 px-4 border border-gray-300 bg-white text-sm outline-none transition-all focus:border-[#3d5a45] focus:ring-1 focus:ring-[#3d5a45]/20 placeholder:text-gray-400"
                      />

                    </div>


                    <div>

                      <label
                        htmlFor="lastName"
                        className="block mb-2 text-[10px] uppercase tracking-[0.15em] font-medium"
                      >
                        Last name
                      </label>

                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last name"
                        className="w-full h-12 px-4 border border-gray-300 bg-white text-sm outline-none transition-all focus:border-[#3d5a45] focus:ring-1 focus:ring-[#3d5a45]/20 placeholder:text-gray-400"
                      />

                    </div>

                  </div>


                  {/* EMAIL + PHONE */}

                  <div className="grid sm:grid-cols-2 gap-5">

                    <div>

                      <label
                        htmlFor="email"
                        className="block mb-2 text-[10px] uppercase tracking-[0.15em] font-medium"
                      >
                        Email
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full h-12 px-4 border border-gray-300 bg-white text-sm outline-none transition-all focus:border-[#3d5a45] focus:ring-1 focus:ring-[#3d5a45]/20 placeholder:text-gray-400"
                      />

                    </div>


                    <div>

                      <label
                        htmlFor="phone"
                        className="block mb-2 text-[10px] uppercase tracking-[0.15em] font-medium"
                      >
                        Phone number
                      </label>

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone number"
                        className="w-full h-12 px-4 border border-gray-300 bg-white text-sm outline-none transition-all focus:border-[#3d5a45] focus:ring-1 focus:ring-[#3d5a45]/20 placeholder:text-gray-400"
                      />

                    </div>

                  </div>


                  {/* MESSAGE */}

                  <div>

                    <label
                      htmlFor="message"
                      className="block mb-2 text-[10px] uppercase tracking-[0.15em] font-medium"
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows="6"
                      placeholder="How can we help?"
                      className="w-full px-4 py-4 border border-gray-300 bg-white text-sm outline-none resize-none transition-all focus:border-[#3d5a45] focus:ring-1 focus:ring-[#3d5a45]/20 placeholder:text-gray-400"
                    />

                  </div>


                  {/* SUBMIT */}

                  <button
                    type="submit"
                    className="group inline-flex items-center justify-center gap-4 bg-[#3d5a45] text-white px-8 py-3.5 text-[9px] uppercase tracking-[0.25em] hover:bg-[#304936] transition-all"
                  >
                    Send Message

                    <span className="text-sm transition-transform group-hover:translate-x-1">
                      →
                    </span>

                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CONTACT INFORMATION
      ===================================================== */}

      <section className="bg-[#fdf5ee] pt-24 md:pt-40 pb-24">

        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <div className="grid md:grid-cols-3 gap-12 md:gap-8">

            {/* =================================================
                CALL US
            ================================================= */}

            <div>

              <span className="text-[9px] uppercase tracking-[0.3em] text-[#d4845a]">
                Call Us
              </span>

              <h3
                className="mt-4 text-3xl"
                style={{
                  fontFamily:
                    "'Cormorant Garamond', serif",
                }}
              >
                +91 98765 43210
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Monday – Friday
                <br />
                8:00 AM – 9:00 PM
              </p>

            </div>


            {/* =================================================
                EMAIL
            ================================================= */}

            <div>

              <span className="text-[9px] uppercase tracking-[0.3em] text-[#d4845a]">
                Email
              </span>

              <h3
                className="mt-4 text-3xl"
                style={{
                  fontFamily:
                    "'Cormorant Garamond', serif",
                }}
              >
                hello@aurevia.com
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                For general enquiries, orders
                <br />
                and customer support.
              </p>

            </div>


            {/* =================================================
                ADDRESS
            ================================================= */}

            <div>

              <span className="text-[9px] uppercase tracking-[0.3em] text-[#d4845a]">
                Visit Us
              </span>

              <h3
                className="mt-4 text-3xl"
                style={{
                  fontFamily:
                    "'Cormorant Garamond', serif",
                }}
              >
                Aurevia Studio
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                1093 Marigold Lane,
                <br />
                Bengaluru, Karnataka,
                <br />
                India
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          DIVIDER
      ===================================================== */}

      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="h-px bg-[#dfd3c8]" />

      </div>


      {/* =====================================================
          BOTTOM MESSAGE
      ===================================================== */}

      <section className="bg-[#fdf5ee] py-24 md:py-32">

        <div className="max-w-3xl mx-auto px-6 text-center">

          <span className="text-[9px] uppercase tracking-[0.4em] text-[#d4845a]">
            We are here for you
          </span>

          <h2
            className="mt-5 text-5xl md:text-6xl lg:text-7xl leading-[0.9]"
            style={{
              fontFamily:
                "'Cormorant Garamond', serif",
            }}
          >
            Every question
            <br />
            deserves an <i>answer.</i>
          </h2>

          <p className="mt-7 max-w-xl mx-auto text-sm leading-7 text-gray-500">
            From choosing the right size to tracking an order,
            our team is here to make your Aurevia experience
            simple, personal and effortless.
          </p>

          <div className="mt-8 flex justify-center">

            <Link
              to="/profile/collection"
              className="inline-flex items-center gap-3 border border-[#d4845a] text-[#d4845a] px-8 py-3.5 text-[9px] uppercase tracking-[0.25em] hover:bg-[#d4845a] hover:text-white transition-all"
            >
              Continue Shopping

              <span>
                →
              </span>

            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Contact;