import React from "react";

const FeaturesFlipCard = ({ icon, title, text }) => {
  return (
    <div className="flip-card h-64 bg-white w-full">
      <div className="flip-card-inner h-full">
        <div className="flip-card-front flex flex-col justify-center items-center p-4 h-full">
          <div className="flex flex-col justify-center items-center">
            <div className="h-16 flex justify-center items-center mb-4">
              <img
                src={icon}
                alt="Icon"
                width={60}
                height={63}
                className="block"
              />
            </div>
            <h1 className="text-[#0072b1] drop-shadow-lg font-lexend font-bold text-2xl text-center mt-4 h-20">
              {title}
            </h1>
          </div>
        </div>
        <div className="flip-card-back p-4 bg-primary flex justify-center items-center h-full">
          <p className="text-md font-lexend font-bold text-white text-center">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesFlipCard;
