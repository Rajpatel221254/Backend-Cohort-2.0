import React from "react";
import "./index.scss";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import { ToastContainer } from "react-toastify";
import { PostContextProvider } from "./features/post/post.context.jsx";
import { ImageKitProvider  } from '@imagekit/react'

const App = () => {
  return (
    <AuthProvider>
      <PostContextProvider>
        <ImageKitProvider  urlEndpoint="https://ik.imagekit.io/mbrc221254">
        <ToastContainer />
      <AppRoutes />
        </ImageKitProvider>
      </PostContextProvider>
    </AuthProvider>
  );
};

export default App;
