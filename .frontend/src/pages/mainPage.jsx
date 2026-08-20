import React, { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { Navbar } from "../components/Navbar";
import Hero from "../components/Hero.jsx";
import BohemianSection from "../components/Slider1.jsx";
import FashionCarousel from "../components/card.jsx";
import HomeProductShowcase from "../components/Slider2.jsx";
import FashionEditorialSection from "../components/FashionEditorialSection.jsx";

function MainPage() {
  
     return (
      <>
    
          <Hero />
          <BohemianSection />
          <FashionCarousel/>
          <HomeProductShowcase/>
          <FashionEditorialSection/>
          <main className="flex-grow flex flex-col items-center justify-center p-6 text-center"></main>
        </>
      );
    }
    
   
  


export default MainPage