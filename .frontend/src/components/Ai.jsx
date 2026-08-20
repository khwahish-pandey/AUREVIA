import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  Mic,
  MicOff,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

const Ai = () => {
  const navigate = useNavigate();

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [message, setMessage] = useState(
    "Hi! I'm Aurevia AI ✨"
  );
  const [supported, setSupported] = useState(true);

  const recognitionRef = useRef(null);

  // =========================================================
  // SPEECH RECOGNITION SETUP
  // =========================================================

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSupported(false);

      setMessage(
        "Voice recognition is not supported in this browser."
      );

      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-IN";

    recognition.onstart = () => {
      setIsListening(true);
      setMessage("I'm listening... 🎧");
    };

    recognition.onresult = (event) => {
      const text =
        event.results[0][0].transcript;

      console.log("🎙️ USER SAID:", text);

      setTranscript(text);

      handleCommand(text);
    };

    recognition.onerror = (event) => {
      console.error(
        "Speech recognition error:",
        event.error
      );

      setIsListening(false);

      if (event.error === "not-allowed") {
        setMessage(
          "Please allow microphone access 🎙️"
        );
      } else if (event.error === "no-speech") {
        setMessage(
          "I didn't hear anything. Try again 💕"
        );
      } else {
        setMessage(
          "Oops! Something went wrong. Try again 💕"
        );
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      try {
        recognition.stop();
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  // =========================================================
  // START LISTENING
  // =========================================================

  const startListening = () => {
    if (!supported) {
      setMessage(
        "Voice recognition is not supported in this browser."
      );

      return;
    }

    try {
      setTranscript("");
      recognitionRef.current?.start();
    } catch (error) {
      console.log(
        "Speech recognition already running:",
        error
      );
    }
  };

  // =========================================================
  // STOP LISTENING
  // =========================================================

  const stopListening = () => {
    try {
      recognitionRef.current?.stop();
    } catch (error) {
      console.log(error);
    }

    setIsListening(false);
  };

  // =========================================================
  // VOICE COMMAND HANDLER
  // =========================================================

  const handleCommand = (command) => {
    const text = command
      .toLowerCase()
      .trim();

    setMessage(`I heard: "${command}"`);

    // =======================================================
    // HOME
    // =======================================================

    if (
      text.includes("home") ||
      text.includes("homepage") ||
      text.includes("main page") ||
      text.includes("go home")
    ) {
      setMessage("Taking you home 🏠");

      setTimeout(() => {
        navigate("/profile");
      }, 700);

      return;
    }

    // =======================================================
    // CART
    // =======================================================

    if (
      text.includes("cart") ||
      text.includes("bag") ||
      text.includes("shopping bag") ||
      text.includes("my bag")
    ) {
      setMessage("Opening your bag 🛍️");

      setTimeout(() => {
        navigate("/profile/cart");
      }, 700);

      return;
    }

    // =======================================================
    // ORDERS
    // =======================================================

    if (
      text.includes("orders") ||
      text.includes("my orders") ||
      text.includes("my order") ||
      text.includes("order history")
    ) {
      setMessage("Opening your orders 📦");

      setTimeout(() => {
        navigate("/profile/orders");
      }, 700);

      return;
    }

    // =======================================================
    // NEW ARRIVALS
    // =======================================================

    if (
      text.includes("new arrivals") ||
      text.includes("new collection") ||
      text.includes("latest collection") ||
      text.includes("latest products") ||
      text.includes("latest")
    ) {
      setMessage(
        "Let's see what's new ✨"
      );

      setTimeout(() => {
        navigate(
          "/profile/collection?sort=new"
        );
      }, 700);

      return;
    }

    // =======================================================
    // WOMEN
    // =======================================================

    if (
      text.includes("women") ||
      text.includes("woman") ||
      text.includes("female") ||
      text.includes("women's")
    ) {
      setMessage(
        "Showing you our women's collection 👗"
      );

      setTimeout(() => {
        navigate(
          "/profile/collection?category=Women"
        );
      }, 700);

      return;
    }

    // =======================================================
    // MEN
    // =======================================================

    if (
      text.includes("men") ||
      text.includes("man") ||
      text.includes("male") ||
      text.includes("men's")
    ) {
      setMessage(
        "Showing you our men's collection 👔"
      );

      setTimeout(() => {
        navigate(
          "/profile/collection?category=Men"
        );
      }, 700);

      return;
    }

    // =======================================================
    // COLLECTION
    // =======================================================

    if (
      text.includes("collection") ||
      text.includes("shop") ||
      text.includes("products") ||
      text.includes("shopping")
    ) {
      setMessage(
        "Opening the collection ✨"
      );

      setTimeout(() => {
        navigate("/profile/collection");
      }, 700);

      return;
    }

    // =======================================================
    // SEARCH
    // =======================================================

    if (
      text.includes("search") ||
      text.includes("find")
    ) {
      setMessage(
        "Let's find something beautiful 🔎"
      );

      setTimeout(() => {
        navigate("/profile/collection");
      }, 700);

      return;
    }

    // =======================================================
    // AI
    // =======================================================

    if (
      text.includes("ai") ||
      text.includes("assistant") ||
      text.includes("aurevia")
    ) {
      setMessage(
        "I'm already right here with you ✨"
      );

      return;
    }

    // =======================================================
    // UNKNOWN COMMAND
    // =======================================================

    setTimeout(() => {
      setMessage(
        "I'm still learning 💕 Try saying 'open my cart' or 'show women's collection'."
      );
    }, 700);
  };

  // =========================================================
  // QUICK COMMAND
  // =========================================================

  const quickCommand = (text) => {
    setTranscript(text);
    handleCommand(text);
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <div
      className="
        min-h-screen
        overflow-hidden
        bg-[#fdf9f4]
        px-5
        py-10
        text-[#28352d]
      "
    >

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div
        className="
          mx-auto
          flex
          max-w-4xl
          flex-col
          items-center
          text-center
        "
      >

        {/* ===================================================
            AUREVIA AI BRAND
        =================================================== */}

        <div
          className="
            mb-8
            flex
            items-center
            gap-2
          "
        >
          <div
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              bg-[#dceade]
              text-[#55735f]
            "
          >
            <Sparkles size={16} />
          </div>

          <span
            className="
              text-xs
              font-semibold
              tracking-[0.3em]
              text-[#55735f]
            "
          >
            AUREVIA AI
          </span>
        </div>

        {/* ===================================================
            AI ORB
        =================================================== */}

        <div
          className={`
            relative
            mb-8
            flex
            h-56
            w-56
            items-center
            justify-center
            transition-all
            duration-500

            ${
              isListening
                ? "scale-105"
                : ""
            }
          `}
        >

          {/* OUTER GLOW */}

          <div
            className={`
              absolute
              inset-5
              rounded-full
              bg-[#b9d5be]/30
              blur-2xl

              ${
                isListening
                  ? "animate-pulse"
                  : ""
              }
            `}
          />

          {/* ORBIT 1 */}

          <div
            className="
              absolute
              h-44
              w-60
              rounded-[50%]
              border
              border-[#78947e]/20
              rotate-[25deg]
            "
          />

          {/* ORBIT 2 */}

          <div
            className="
              absolute
              h-44
              w-60
              rounded-[50%]
              border
              border-[#78947e]/15
              -rotate-[35deg]
            "
          />

          {/* =================================================
              MAIN AI ORB
          ================================================= */}

          <div
            className={`
              relative
              flex
              h-36
              w-36
              items-center
              justify-center
              rounded-full

              bg-[radial-gradient(circle_at_35%_30%,#ffffff,#dcecdf_40%,#a9c9b2)]

              shadow-[0_20px_50px_rgba(70,104,79,0.25),inset_-10px_-10px_25px_rgba(66,100,76,0.15),inset_8px_8px_20px_rgba(255,255,255,0.9)]

              ${
                !isListening
                  ? "animate-bounce"
                  : ""
              }
            `}
          >

            {/* =================================================
                AI FACE
            ================================================= */}

            <div
              className="
                relative
                flex
                gap-7
              "
            >

              {/* LEFT EYE */}

              <span
                className="
                  h-4
                  w-2.5
                  rounded-full
                  bg-[#405c49]
                "
              />

              {/* RIGHT EYE */}

              <span
                className="
                  h-4
                  w-2.5
                  rounded-full
                  bg-[#405c49]
                "
              />

              {/* MOUTH */}

              <span
                className="
                  absolute
                  left-1/2
                  top-5
                  -translate-x-1/2
                  text-xl
                  text-[#405c49]
                "
              >
                ˘
              </span>

            </div>

            {/* TOP SPARKLE */}

            <Sparkles
              size={17}
              className="
                absolute
                right-5
                top-5
                text-white
              "
            />

            {/* BOTTOM SPARKLE */}

            <Sparkles
              size={14}
              className="
                absolute
                bottom-5
                left-5
                text-white
              "
            />

          </div>
        </div>

        {/* ===================================================
            TITLE
        =================================================== */}

        <h1
          className="
            max-w-3xl
            font-serif
            text-5xl
            font-normal
            leading-tight
            sm:text-6xl
          "
        >
          Your personal

          <span
            className="
              ml-2
              italic
              text-[#55735f]
            "
          >
            Aurevia AI
          </span>
        </h1>

        {/* ===================================================
            DESCRIPTION
        =================================================== */}

        <p
          className="
            mt-5
            max-w-xl
            text-sm
            leading-7
            text-[#778078]
            sm:text-base
          "
        >
          Tell me what you're looking for.
          I'll help you explore Aurevia
          using just your voice.
        </p>

        {/* ===================================================
            STATUS
        =================================================== */}

        <div
          className="
            mt-6
            mb-5
            flex
            items-center
            gap-2
            text-sm
            text-[#536158]
          "
        >

          <span
            className={`
              h-2
              w-2
              rounded-full

              ${
                isListening
                  ? "animate-pulse bg-[#55735f] shadow-[0_0_0_5px_rgba(85,115,95,0.12)]"
                  : "bg-[#aeb7b0]"
              }
            `}
          />

          <span>
            {message}
          </span>

        </div>

        {/* ===================================================
            TRANSCRIPT
        =================================================== */}

        {transcript && (
          <div
            className="
              mb-6
              w-full
              max-w-lg
              rounded-2xl
              border
              border-[#e5ebe6]
              bg-white
              px-6
              py-4
              shadow-[0_8px_30px_rgba(40,53,45,0.05)]
            "
          >

            <span
              className="
                block
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-[#9ba69e]
              "
            >
              You said
            </span>

            <p
              className="
                mt-1
                text-sm
                text-[#46534b]
              "
            >
              "{transcript}"
            </p>

          </div>
        )}

        {/* ===================================================
            MICROPHONE BUTTON
        =================================================== */}

        <button
          onClick={
            isListening
              ? stopListening
              : startListening
          }
          className={`
            mb-9
            flex
            items-center
            gap-3
            rounded-full
            px-7
            py-4
            text-sm
            text-white
            shadow-[0_10px_30px_rgba(63,96,75,0.22)]
            transition-all
            duration-300
            hover:-translate-y-1

            ${
              isListening
                ? "bg-[#263c2e] animate-pulse"
                : "bg-[#3f604b]"
            }
          `}
        >

          {isListening ? (
            <MicOff size={23} />
          ) : (
            <Mic size={23} />
          )}

          <span>
            {isListening
              ? "Stop listening"
              : "Tap to speak"}
          </span>

        </button>

        {/* ===================================================
            QUICK COMMAND TITLE
        =================================================== */}

        <p
          className="
            mb-3
            text-xs
            text-[#8a948d]
          "
        >
          Or try saying...
        </p>

        {/* ===================================================
            QUICK COMMANDS
        =================================================== */}

        <div
          className="
            flex
            max-w-2xl
            flex-wrap
            justify-center
            gap-2.5
          "
        >

          {/* WOMEN */}

          <button
            onClick={() =>
              quickCommand(
                "Show me women's collection"
              )
            }
            className="
              flex
              items-center
              gap-2
              rounded-full
              border
              border-[#e2e8e3]
              bg-white
              px-4
              py-2.5
              text-xs
              text-[#536158]
              transition
              hover:-translate-y-0.5
              hover:border-[#9eb3a3]
              hover:bg-[#f7faf7]
            "
          >
            <Heart size={15} />

            Women's collection
          </button>

          {/* MEN */}

          <button
            onClick={() =>
              quickCommand(
                "Show me men's collection"
              )
            }
            className="
              flex
              items-center
              gap-2
              rounded-full
              border
              border-[#e2e8e3]
              bg-white
              px-4
              py-2.5
              text-xs
              text-[#536158]
              transition
              hover:-translate-y-0.5
              hover:border-[#9eb3a3]
              hover:bg-[#f7faf7]
            "
          >
            <ShoppingBag size={15} />

            Men's collection
          </button>

          {/* CART */}

          <button
            onClick={() =>
              quickCommand(
                "Open my cart"
              )
            }
            className="
              flex
              items-center
              gap-2
              rounded-full
              border
              border-[#e2e8e3]
              bg-white
              px-4
              py-2.5
              text-xs
              text-[#536158]
              transition
              hover:-translate-y-0.5
              hover:border-[#9eb3a3]
              hover:bg-[#f7faf7]
            "
          >
            <ShoppingBag size={15} />

            My cart
          </button>

          {/* NEW ARRIVALS */}

          <button
            onClick={() =>
              quickCommand(
                "Show me new arrivals"
              )
            }
            className="
              flex
              items-center
              gap-2
              rounded-full
              border
              border-[#e2e8e3]
              bg-white
              px-4
              py-2.5
              text-xs
              text-[#536158]
              transition
              hover:-translate-y-0.5
              hover:border-[#9eb3a3]
              hover:bg-[#f7faf7]
            "
          >
            <Sparkles size={15} />

            New arrivals
          </button>

        </div>

        {/* ===================================================
            HINT
        =================================================== */}

        <div
          className="
            mt-9
            flex
            items-center
            gap-2
            text-[11px]
            text-[#a0a8a2]
          "
        >
          <Mic size={14} />

          <span>
            Try saying: "Show me women's collection"
          </span>
        </div>

      </div>
    </div>
  );
};

export default Ai;