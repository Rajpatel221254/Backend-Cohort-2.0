import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import ProfileSetup from "./features/auth/pages/ProfileSetup";
import Dashboard from "./features/post/pages/Dashboard";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profilesetup" element={<ProfileSetup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
