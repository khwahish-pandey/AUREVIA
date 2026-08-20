import React from 'react'
import { AdminNavbar } from './nav'
import { Routes, Route } from "react-router-dom";
import AddItem from './Page1'
import ProductList from './Page2'

import Orders from './AdminOrders'


function Home() {
  return (
    <div>
       <AdminNavbar />
     <Routes>
      <Route path="/orders" element={<Orders/>}/>
      <Route path="/page1" element={<AddItem />} />
       <Route path="/page2" element={<ProductList />} />
       
     </Routes>
     
    </div>
  )
}

export default Home