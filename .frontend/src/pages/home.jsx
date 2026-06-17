import React, { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { Navbar } from "../components/Navbar";
import Hero from "../components/Hero.jsx";
import BohemianSection from "../components/Slider1.jsx";

export default function Home() {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-white text-slate-100 flex flex-col font-sans">
      <Navbar
        loggedInUser={user?.name}
        onLogout={() => {
          console.log("logout");
        }}
      />

      <Hero />
      <BohemianSection />

      <main className="flex-grow flex flex-col items-center justify-center p-6 text-center"></main>
    </div>
  );
}