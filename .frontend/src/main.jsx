import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import { AuthProvider } from './context/AuthContext.jsx'
import UserContext from './context/UserContext.jsx'



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      {/* 2. Use AuthProvider to wrap the app */}
      <AuthProvider>
        <UserContext>
          <App />
        </UserContext>
      </AuthProvider>
    </React.StrictMode>
  </BrowserRouter>
)