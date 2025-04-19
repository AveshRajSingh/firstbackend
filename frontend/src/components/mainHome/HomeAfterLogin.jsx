import React from "react";
import AllProduct from "./AllProducts/AllProduct.jsx";
import { ToastContainer } from "react-toastify";

const HomeAfterLogin = () => {
  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <AllProduct />
    </div>
  );
};

export default HomeAfterLogin;
