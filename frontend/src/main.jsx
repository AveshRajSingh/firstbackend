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
import AllProducts from "./components/mainHome/AllProducts/AllProduct.jsx";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/user/Profile.jsx";
import AllAdminProduct from "./components/Admin/AllAdminProduct.jsx";
import CreateNewProducts from "./components/Admin/CreateNewProducts.jsx";
import CreateAdmin from "./components/Admin/CreateAdmin.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <UserProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<HomeAfterLogin />} />
        <Route path="/admin" element={<AdminPanel />}>
          <Route index element={<AllAdminProduct />} />
          <Route path="products" element={<AllAdminProduct />} />
          <Route path="create" element={<CreateNewProducts />} />
          <Route path="admin" element={<CreateAdmin />} />
        </Route>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
