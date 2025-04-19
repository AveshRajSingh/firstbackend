import React from "react";
import Navbar from "./Navbar.jsx";

import AllProduct from "./AllProducts/AllProduct.jsx";
import { ToastContainer, toast } from "react-toastify";

const HomeAfterLogin = () => {
  return (
    <div>
      <div className="sticky top-0 z-10">
        <Navbar />
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
      </div>
      <AllProduct />
    </div>
  );
};

export default HomeAfterLogin;
