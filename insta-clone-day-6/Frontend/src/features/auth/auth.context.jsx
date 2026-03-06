import { useState, createContext, useEffect } from "react";
import { login, register, getMe, updateUserInfo } from "./services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (email, username, password) => {
    setLoading(true);
    try {
      const response = await register(email, username, password);

      setUser(response.user);
    } catch (error) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (identifier, password) => {
    setLoading(true);
    try {
      const response = await login(identifier, password);

      setUser(response.user);
      return response;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (formData) => {
    setLoading(true);

    try {
      const response = await updateUserInfo(formData);

      setUser(response.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, handleLogin, handleRegister, handleUpdate }}
    >
      {children}
    </AuthContext.Provider>
  );
};
