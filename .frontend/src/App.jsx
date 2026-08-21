import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import AureviaSignup from "./pages/AureviaSignup.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/home.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";
import Ai from "./components/Ai.jsx";


function App() {
  return (
    <Routes>

      {/* Authentication */}

      <Route
        path="/login"
        element={<Login />}
      />
       <Route
        path="/"
        element={<Home />}
      />
   

      <Route
        path="/signup"
        element={<AureviaSignup />}
      />

      {/* AI */}

      <Route
        path="/profile/ai"
        element={<Ai />}
      />

      {/* Place Order */}

      <Route
        path="/profile/place-order"
        element={<PlaceOrder />}
      />

      {/* Main Profile */}

      <Route
        path="/profile/*"
        element={<Home />}
      />

    </Routes>
  );
}

export default App;
