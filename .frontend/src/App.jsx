import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import AureviaSignup from './pages/AureviaSignup.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/home.jsx'


function App() {
  return (
   
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<AureviaSignup />} />
        <Route path="/" element={<Home />} />

      </Routes>
   
  )
}

export default App