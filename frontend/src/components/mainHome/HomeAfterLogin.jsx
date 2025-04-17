import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar.jsx";
import AllProduct from "./AllProducts/AllProduct.jsx";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const HomeAfterLogin = () => {
  const [userData, setUserData] = useState(null);
  const hasFetchedUser = useRef(false);

  // Fetch user data on mount

  useEffect(() => {
    if (hasFetchedUser.current &&userData) {
        hasFetchedUser.current = true;
    axios
      .get("http://localhost:3000/api/v1/user/currentUser", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("User data fetched successfully");
          setUserData(response.data); // async update
        } else {
          toast.error("Failed to fetch user data");
        }
      })
      .catch((error) => {
        console.error(
          error.response?.data?.message ||
            error.message ||
            "Failed to fetch user data. Please try again later."
        );
      })
      .finally(() => {
        console.log("Fetch user data completed");
      });
    }
  }, [userData]);

  

  return (
    <div>
      <div className="sticky top-0 z-10">
        <Navbar userData={userData} />
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
