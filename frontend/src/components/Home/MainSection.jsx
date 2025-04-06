import React from "react";
import homePicture from "../../assets/images/homePicture.avif";
import { useNavigate } from "react-router-dom";

const MainSection = ({ registerInView }) => {
  const navigate = useNavigate();

  const handleStartNow = (e) => {
    e.preventDefault();
    navigate("/products");
  };
 
  return (
    <div
      style={{ backgroundImage: `url(${homePicture})` }}
      className="min-h-screen bg-cover  bg-no-repeat flex flex-col text-white relative"
    >
      <div className="flex justify-between items-center p-6 ">
        <p className="text-white text-lg font-bold">
          {" "}
          <span className="text-4xl transition-all duration-400 animate-pulse cursor-pointer text-green-400 hover:text-violet-400  ">
            Bag
          </span>
          <span className="text-3xl transition-all duration-400 animate-pulse text-red-400">
            Station
          </span>
        </p>
        <div className="space-x-4">
          <button
            onClick={(e) => navigate("/login")}
            className="px-4 py-2  bg-blue-600 text-black cursor-pointer rounded-lg hover:bg-blue-800 transition duration-300"
          >
            Login
          </button>
          <button
            onClick={(e) => registerInView(e)}
            className="px-4 py-2 bg-red-600 text-black cursor-pointer rounded-lg hover:bg-red-800 transition duration-300"
          >
            Register
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center space-y-10 min-h-[50vh] p-4">
        <p className="text-6xl font-bold tracking-tight font-sans">
          Start selling online
        </p>
        <p className="text-2xl ">
          Join over 700,000 stores worldwide. Start for free with no limited
          trial.
        </p>
        <div className="flex space-x-2">
          <input
            type="email"
            name="email"
            className="outline-none   px-5 py-3 text-black bg-white rounded-xl w-[30vw]"
            placeholder="Enter your email"
          />
          <button 
          onClick={(e) => handleStartNow(e)}
           className="px-4 py-2 bg-orange-700 text-black  transition-all duration-400 animate-pulse  cursor-pointer rounded-lg hover:bg-orange-800 ">
            Start Now{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
