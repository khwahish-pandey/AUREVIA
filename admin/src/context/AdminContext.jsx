import React, { createContext, useState, useEffect, useContext } from 'react';
// Import the raw context object, not the component provider wrapper!
import { AuthContext } from './AuthContext.jsx'; 

export const AdminContext = createContext();

function AdmincontextProvider({ children }) { // Updated parameter to lower-case 'children'
  const [adminData, setAdminData] = useState(null);
  
  // Correctly target and extract serverurl from AuthContext
  const { serverurl } = useContext(AuthContext) || {};  

  const fetchAdminData = async () => {
    if (!serverurl) return; // Prevent calling if context isn't fully ready yet
    try {
      const response = await fetch(`${serverurl}/api/user/adminprofile`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Securely send session tracking cookies
      });

      if (!response.ok) {
        throw new Error('Failed to fetch admin data');
      }

      const data = await response.json();
      setAdminData(data.admin);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [serverurl]); // Re-run if serverurl boots up dynamically

  const value = {
    adminData,
    fetchAdminData,
    setAdminData,
    serverurl
  };

  return (
    <AdminContext.Provider value={value}> {/* Passed the value state pipeline down */}
      {children}
    </AdminContext.Provider>
  );
}

export default AdmincontextProvider;