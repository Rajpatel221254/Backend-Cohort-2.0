import React from "react";
import "./index.scss";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <AuthProvider>
      <ToastContainer />
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
