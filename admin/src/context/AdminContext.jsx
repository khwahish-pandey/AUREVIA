
console.log("🔥 ADMIN CONTEXT FILE LOADED");
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";

import { AuthContext } from "./AuthContext.jsx";

export const AdminContext = createContext();

function AdmincontextProvider({ children }) {
  const [adminData, setAdminData] = useState(null);
  const [adminLoading, setAdminLoading] = useState(true);

  const { serverurl } = useContext(AuthContext) || {};
  console.log("ADMIN CONTEXT LOADED");
console.log("SERVER URL:", serverurl);


  const fetchAdminData = async () => {
    if (!serverurl) {
      console.log("NO SERVER URL - RETURNING");
    }

    try {
      setAdminLoading(true);

      const response = await fetch(
        `${serverurl}/api/user/adminprofile`,
        {
          method: "GET",
          credentials: "include",
        }
      );

       console.log("ADMIN PROFILE STATUS:", response.status);


      if (!response.ok) {
        setAdminData(null);
        return;
      }

      const data = await response.json();

      console.log("ADMIN PROFILE RESPONSE:", data);

      // If backend returns { admin: {...} }
      setAdminData(data.admin);

    } catch (error) {
      console.error("Admin profile error:", error);
        setAdminData(null);
    } finally {
      setAdminLoading(false);
    }
  };

  useEffect(() => {
     console.log("ADMIN CONTEXT useEffect RUNNING");
    console.log("serverurl in useEffect:", serverurl);

    if (serverurl) {
      fetchAdminData();
    }
  }, [serverurl]);

  return (
    <AdminContext.Provider
      value={{
        adminData,
        setAdminData,
        fetchAdminData,
        adminLoading,
        serverurl,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export default AdmincontextProvider;