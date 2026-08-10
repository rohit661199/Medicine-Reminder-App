import React, { createContext, useContext, useState } from "react";

// 1. Create context
const AuthContext = createContext();

// 2. Create provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // example state

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom hook for using context easily
export const useAuth = () => {
  return useContext(AuthContext);
};
