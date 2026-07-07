import React, { createContext } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const serverurl = "http://localhost:8000";

  // Add the missing function that your login page is expecting!
  const getUserProfile = async () => {
    try {
      console.log("Fetching user profile...");
      // Your profile fetching logic will go here later
    } catch (error) {
      console.error("Failed to fetch user profile", error);
    }
  };

  // Include both serverurl AND getUserProfile in the context value
  const value = {
    serverurl,
    getUserProfile, 
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;