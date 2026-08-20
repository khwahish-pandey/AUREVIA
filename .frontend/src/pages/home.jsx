import React, { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import ProductDetail from "../components/Productdetails.jsx";

import { Navbar } from "../components/Navbar";
import MainPage from "./mainPage.jsx";
import Contact from "../components/Contact.jsx";
import Product from "../components/Product.jsx";
import Collection from "../components/Collection.jsx";
import About from "../components/About.jsx";
import LatestCollection from "../components/LatestCollection.jsx";
import BestSellers from "../components/BestSeller.jsx";
import Footer from "../components/Footer.jsx";
import Cart from "../components/Cart.jsx";
import PlaceOrder from "./PlaceOrder.jsx";
import Order from "../components/OrderPage.jsx";
import AIButton from "../components/Ai.jsx";
import Ai from "../components/Ai.jsx";


import { Routes, Route } from "react-router-dom";
console.log("🔥🔥🔥 HOME FILE LOADED 🔥🔥🔥");

export default function Home() {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-white text-slate-100 flex flex-col font-sans">
      
      <Navbar loggedInUser={user?.name} />

      <Routes>
        <Route path="main" element={<MainPage />} />
        <Route path="contact" element={<Contact />} />
        <Route path="latest" element={<LatestCollection />} />
  <Route path="bestsellers" element={<BestSellers />} />
        <Route path="product" element={<Product />} />
       <Route path="collection" element={<Collection />} />
        <Route path="about" element={<About />} />
         <Route
    path="product/:productId"
    element={<ProductDetail />}
  />
   <Route
    path="/cart"
    element={<Cart />}
  />
  <Route
  path="/checkout"
  element={<PlaceOrder />}
/>


  <Route
  path="/orders"
  element={<Order />}
/>
<Route
  path="/ai"
  element={<Ai />}
/>
       
      </Routes>
      <AIButton />
      <Footer />

    </div>
  );
}