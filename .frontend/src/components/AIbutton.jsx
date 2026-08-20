import React from "react";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AIButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/ai")}
      aria-label="Open Aurevia AI"
      className="
        group

        fixed
        bottom-7
        right-7

        z-[999]

        flex
        items-center
        gap-2.5

        rounded-full

        border
        border-[#e3e9e4]

        bg-white

        p-1.5
        pr-4

        shadow-[0_10px_35px_rgba(45,65,52,0.18)]

        transition-all
        duration-300

        hover:-translate-y-1

        hover:shadow-[0_15px_40px_rgba(45,65,52,0.24)]

        max-sm:p-1.5
      "
    >

      {/* AI ICON */}

      <span
        className="
          relative

          flex
          h-11
          w-11

          items-center
          justify-center

          rounded-full

          bg-[radial-gradient(circle_at_35%_30%,#ffffff,#d7e9da,#a8c6ae)]

          text-[#3f604b]

          shadow-inner

          transition-transform
          duration-300

          group-hover:scale-105

          max-sm:h-12
          max-sm:w-12
        "
      >

        <Sparkles size={20} />

        {/* GLOW */}

        <span
          className="
            absolute
            -inset-1

            rounded-full

            border
            border-[#65876c]/20

            animate-ping

            pointer-events-none
          "
        />

      </span>

      {/* TEXT */}

      <span
        className="
          flex
          flex-col
          items-start

          leading-none

          max-sm:hidden
        "
      >

        <small
          className="
            mb-1

            text-[9px]

            uppercase

            tracking-[0.15em]

            text-[#9aa49c]
          "
        >
          Meet
        </small>

        <strong
          className="
            font-serif

            text-[15px]

            font-normal

            text-[#3e5044]
          "
        >
          Aurevia AI
        </strong>

      </span>

    </button>
  );
};

export default AIButton;