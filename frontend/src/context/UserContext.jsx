import { createContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/v1/user/currentUser", {
        withCredentials: true,
      });

      if(response.status !== 200) {
        throw new Error("Failed to fetch user data");
      }


      const fetchedUser = response.data.data;
      console.log("Fetched user:", fetchedUser); // Log the fetched user data

      setUser(fetchedUser);
      setError(null); // Clear any previous errors
      setLoading(false); // Set loading to false after fetching user data
      

      
    } catch (error) {
      if(error.response && error.response.status === 401) {
        // Server responded with a status other than 200 range
        console.error("Error response:", error.response.data);
      }
      setError(error);
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);  

    }

  }
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, loading, setLoading, error, setError }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
