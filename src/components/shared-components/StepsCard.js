import React from "react";

const StepsCard = ({ icon, text, description, step, className }) => {
  return (
    <div className="border h-[300px] lg:w-[240px] md:h-[300px] lg:h-[330px] xl:w-[250px] xl:h-[330px] flex-col flex justify-center items-center sm:justify-normal sm:items-start rounded-md p-4 relative">
      <div className="w-full relative flex justify-center">
        <img
          src={icon}
          alt={icon}
          className={`${className} m-auto w-[120px] sm:w-[100px] md:w-[130px]`}
        />
        <span className="absolute top-0 right-0 text-lg text-[#00caa5] font-bold">
          #{step}
        </span>
      </div>

      <div className="w-full">
        <h3 className="text-[#0072b1] font_4 text-lg sm:text-2xl text-center mt-4 font-Lexend">
          {text}
        </h3>
        <p className="mt-4 text-[#777]  m-auto text-center text-sm sm:text-md font-Lexend">
          {description}
        </p>
      </div>
    </div>
  );
};

export default StepsCard;
