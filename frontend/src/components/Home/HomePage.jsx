import React, { useRef } from "react";
import MainSection from "./MainSection";
import BagSection from "./BagSection";
import Register from "../Auth/Register.jsx"

const HomePage = () => {
   const registerRef = useRef(null);
  const registerInView = (e) => {
    e.preventDefault();
    registerRef.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div>
      <MainSection  registerInView={registerInView} />
      <BagSection />
      <Register registerRef={registerRef}/>
    </div>
  );
};
export default HomePage;
