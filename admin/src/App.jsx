import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './pages/home.jsx'
import Add from './pages/add.jsx'
import List from './pages/list.jsx'
import Login from './pages/login.jsx'


function App() {
  return (
    <>
    
    <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<Add />} />
      <Route path="/list" element={<List />} />
      <Route path="/login" element={<Login />} />
    </Routes> 
    </>
  )
}

export default App