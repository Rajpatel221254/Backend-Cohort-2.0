import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import ProfileSetup from "./features/auth/pages/ProfileSetup";
import Dashboard from "./features/post/pages/Dashboard";
import DashboardLayout from "./features/post/pages/DashboardLayout";
import Posts from "./features/post/pages/Posts";
import Requests from "./features/post/pages/Requests";
import Profile from "./features/post/pages/Profile";
import Settings from "./features/post/pages/Settings";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="posts" element={<Posts />} />
          <Route path="requests" element={<Requests />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profilesetup" element={<ProfileSetup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
