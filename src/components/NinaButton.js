import React from "react";
import { Link } from "react-router-dom";

const NinaButton = ({
  className,
  childClassName,
  title,
  link,
  mainColor,
  sliderColor,
  mainTextColor,
  hoverTextColor,
}) => {
  return (
    <Link to={link} className={`${className} group z-10`}>
      <div
        className={` ${childClassName} border-2 border-transparent group-hover:border-[#0072b1] button inline-flex w-fit py-2 px-6 xl:py-3 xl:px-12 rounded-full justify-center items-center font-semibold sm:text-xl tracking-normal uppercase bg-[${mainColor}]`}
        id="button-3"
      >
        <div id="circle" className={`group-hover:bg-white`} />
        <div
          className={`text-[#FFFFFF] drop-shadow-lg animate-pulse font-Lexend group-hover:text-[#0072b1] text-xs md:text-sm xl:text-base font-semibold sm:tracking-widest relative title__ninaButton `}
        >
          {title}
        </div>
      </div>
    </Link>
  );
};

export default NinaButton;
