import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context.jsx";

export const useAuth = () => {
  const {user, loading, handleLogin, handleRegister, handleUpdate, handleGetMe} = useContext(AuthContext);

  return {user, loading, handleLogin, handleRegister, handleUpdate, handleGetMe};
};
