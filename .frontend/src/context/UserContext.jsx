import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";
import { AuthContext } from "./AuthContext.jsx";

export const UserContext = createContext();

function UserContextProvider({ children }) {
  const { value } = useContext(AuthContext);

  const serverUrl = value.serverurl;

  const [user, setUser] = useState(null);

  const getUserProfile = async () => {
    try {
      const res = await axios.get(
        serverUrl + "/api/user/userprofile",
        {
          withCredentials: true,
        }
      );

      setUser(res.data.user);

      console.log(
        "User profile fetched successfully:",
        res.data.user
      );
    } catch (error) {
      console.error(
        "Error fetching user profile:",
        error
      );
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const valueData = {
    user,
    setUser,
    getUserProfile,
  };

  return (
    <UserContext.Provider value={valueData}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;