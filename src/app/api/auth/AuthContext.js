"use client";

import { createContext, useContext, useEffect, useState } from "react";

// 1. Create context
const AuthContext = createContext();

// 2. Create provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on first render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Function to log in a user and store info
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // ✅ Updated logout function
  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" }); // Clears cookie on backend
    } catch (error) {
      console.error("Error logging out:", error);
    }
    localStorage.removeItem("user"); // Clear from storage
    setUser(null); // Clear from context
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom hook to use auth
export const useAuth = () => useContext(AuthContext);
