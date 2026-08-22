import React, { createContext } from "react";

// Create Auth Context
export const AuthContext = createContext({
  value: {
    serverurl: "",
  },
});

// Auth Provider
export function AuthProvider({ children }) {
  // =========================================================
  // BACKEND URL
  // =========================================================

  // Production:
  // Frontend and backend are served from the same Render service.
  //
  // Local development:
  // Frontend runs on localhost:5173/5174
  // Backend runs on localhost:8000

  const serverurl =
    import.meta.env.VITE_SERVER_URL ||
    (window.location.hostname === "localhost"
      ? "http://localhost:8000"
      : "https://aurevia-2.onrender.com");

  // =========================================================
  // CONTEXT VALUE
  // =========================================================

  const value = {
    serverurl,
  };

  return (
    <AuthContext.Provider value={{ value }}>
      {children}
    </AuthContext.Provider>
  );
}

// Default export
export default AuthContext;
