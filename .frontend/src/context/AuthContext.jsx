import React, { createContext } from 'react'

// 1. Create the Context object
export const AuthContext = createContext();

// 2. Create the Provider component (Naming it AuthProvider avoids conflicts)
export function AuthProvider({ children }) {
    const serverurl = "http://localhost:8000";
    
    // This is the object your Signup page is looking for
    const value = {
        serverurl
    };

    return (
        // The prop MUST be named "value"
        <AuthContext.Provider value={{ value }}>
            {children}
        </AuthContext.Provider> 
    );
}

// 3. Export the Context object as default so Signup.jsx can use it in useContext()
export default AuthContext;