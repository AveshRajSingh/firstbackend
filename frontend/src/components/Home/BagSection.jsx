import React from "react";
import bagWithModel from "../../assets/images/bagWithModel.jpg";
import insanePrice from "../../assets/images/insanePrice.webp";
import nikeBag from "../../assets/images/nikeBag.png";

const BagSection = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-20 min-h-[130vh] p-4">
      <p className="text-6xl font-bold tracking-tight font-sans">
        Your search for bags ends here !
      </p>
      <div className="flex space-x-10 justify-evenly w-full">
        <div className="flex flex-col items-center justify-center space-y-10 max-h-[65vh] max-w-[20vw]  p-4 border-2 relative bg-blue-300 rounded-4xl">
          <img
            className="w-[30vw] h-[30vh] rounded-4xl"
            src={bagWithModel}
            alt=""
          />
          <h3 className="text-2xl font-bold">
            Shop from a wide range of products
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi veniam
            recusandae quidem. Reprehenderit eius magnam enim,
          </p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-10 max-h-[65vh] max-w-[20vw]  p-4 border-2 relative bg-blue-300 rounded-4xl">
          <img
            className="w-[30vw] h-[30vh] rounded-4xl"
            src={insanePrice}
            alt=""
          />
          <h3 className="text-2xl font-bold">Every Kind of bag is here</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi veniam
            recusandae quidem. Reprehenderit eius magnam enim,
          </p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-10 max-h-[65vh] max-w-[20vw]  p-4 border-2 relative bg-blue-300 rounded-4xl">
          <img className="w-[30vw] h-[30vh] rounded-4xl" src={nikeBag} alt="" />
          <h3 className="text-2xl font-bold">All branded bags were here</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi veniam
            recusandae quidem. Reprehenderit eius magnam enim,
          </p>
        </div>
      </div>
      <button className="px-6 py-4 w-55  bg-cyan-600 text-black  transition-all duration-400 animate-pulse  cursor-pointer rounded-3xl hover:bg-orange-800 ">
        Start Shopping
      </button>
    </div>
  );
};

export default BagSection;
