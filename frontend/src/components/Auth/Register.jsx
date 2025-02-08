
import React, { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked", e);
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            contact,
            username,
          }),
        }
      );

      const data = await response.json();
      console.log(data);
      if(data.statusCode === 200){
        alert("User created successfully")
        setName("");
        setEmail("");
        setPassword("");
        setContact("");
        setUsername("");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const handleLoginClick = async (e) => {
    
  }
  return (
    <div className="min-h-screen  bg-gray-800  text-white">
      <div className=" flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
        <p className="text-xl font-bold text-indigo-600  mb-6 border-b-2 border-blue-500">
          <span className="text-red-600 text-3xl">Create</span> your Account
        </p>
        <div className="flex w-[80vw] gap-5  flex-col ">
          <input
            className="border-b-2 border-blue-500 w-full h-10 px-3 py-1 outline-none rounded-lg "
            type="text"
            placeholder=" Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border-b-2 border-blue-500 w-full h-10 px-3 py-1 outline-none rounded-lg "
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="border-b-2 border-blue-500 w-full h-10 px-3 py-1 outline-none rounded-lg "
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border-b-2 border-blue-500 w-full h-10 px-3 py-1 outline-none rounded-lg "
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="border-b-2 border-blue-500 w-full h-10 px-3 py-1 outline-none rounded-lg "
            type="number"
            name="contact"
            placeholder="Contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <div className="flex gap-3 justify-between">
            <button
              className="bg-blue-600 w-xl h-10 px-3 py-1 outline-none rounded-lg  hover:bg-blue-800  transition duration-300 "
              onClick={(e) => handleSubmit(e)}
            >
              Register
            </button>
            <button
              className="bg-red-600 w-xl h-10 px-3 py-1 outline-none rounded-lg  hover:bg-red-800  transition duration-300 "
              onClick={(e) => handleLoginClick(e)}
            >
              login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
