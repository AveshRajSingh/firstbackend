import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(null)
  const handleLoginClick = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill all the fields");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        mode: "cors",
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.statusCode === 200) {
        alert("Login successful");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  return (
    <div className="min-h-screen bg-zinc-800 text-white flex justify-center items-center">
      <div className="flex flex-col items-center gap-5 w-[50vw]  py-12 px-4 sm:px-6 lg:px-8">
        <p className="text-xl font-bold text-indigo-600 mb-6 border-b-2 border-blue-500 ">
          <span className="text-red-600 text-3xl">Login</span> to your Account
        </p>
        <div className="flex w-full  gap-5 flex-col ">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-b-2 border-blue-500 w-full h-10 px-3 py-1 outline-none rounded-lg"
            type="text"
            placeholder="Email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-b-2 border-blue-500 w-full h-10 px-3 py-1 outline-none rounded-lg"
            type="password"
            placeholder="Password"
          />
          <div className="flex gap-3 justify-between">
            <button
              className="bg-blue-600 w-xl h-10 px-3 py-1 outline-none rounded-lg hover:bg-blue-800 transition duration-300"
              onClick={(e) => handleLoginClick(e)}
            >
              Login
            </button>
            <button
            onClick={(e) => navigate("/register")}
             className="bg-red-600 w-xl h-10 px-3 py-1 outline-none rounded-lg hover:bg-red-800 transition duration-300">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
