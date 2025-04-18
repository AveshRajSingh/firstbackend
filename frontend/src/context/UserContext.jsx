import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <UserContext.Provider
      value={{ user, setUser, loading, setLoading, error, setError }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
