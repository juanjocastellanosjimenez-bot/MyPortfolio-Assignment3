import { createContext, useContext, useState } from "react";
import * as api from "./api.js";

// Global auth state: who is signed in and with which role. Saved in localStorage so a refresh keeps the session.
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user") || "null"));

  const signIn = async (credentials) => {
    const { token, user } = await api.signin(credentials);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    return user;
  };

  const signOut = async () => {
    try { await api.signout(); } catch { /* the token is cleared locally either way */ }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = { user, isAdmin: user?.role === "admin", signIn, signOut };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
