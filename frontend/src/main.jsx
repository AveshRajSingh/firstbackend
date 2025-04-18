import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Login from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register.jsx";
import AdminPanel from "./components/Admin/AdminPanel.jsx";
import HomeAfterLogin from "./components/mainHome/HomeAfterLogin.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <UserProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element = {<Register />} />
        <Route path="/products" element={<HomeAfterLogin />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />

    </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
