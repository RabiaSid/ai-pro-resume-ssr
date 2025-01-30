import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

const ServicesCardAbout = ({ img, alt, title, desc }) => {
  const [isGroupHover, setIsGroupHover] = useState(false);

  //   if (typeof points !== "string" || !points.trim()) {
  //     // Handle the case where points is not a string or is empty
  //     return null; // or return a default value, error message, etc.
  //   }
  //   const pointsArray = points
  //     .replace(/<\/?ul>/g, "") // Remove <ul> tags
  //     .split("</li>") // Split by </li> tag
  //     .filter((item) => item.trim()) // Remove empty items
  //     .map((item) => item.replace(/<li>/, "").trim());

  return (
    <div
      className="w-full sm:h-[500px] relative  border rounded-xl py-4 px-6 group flex flex-col gap-4 "
      onMouseEnter={() => setIsGroupHover(true)}
      onMouseLeave={() => setIsGroupHover(false)}
    >
      {/* Image */}
      <div className="px-6 w-full flex justify-center items-center">
        <div className=" rounded-full w-[160px] h-[160px] p-4 flex justify-center items-center ">
          <img src={img} alt={alt} className="w-full" />
        </div>
      </div>
      {/* Title */}
      <div className="w-full text-center">
        <span className="text-lg font-bold text-center font-Lexend">
          {title}
        </span>
      </div>

      {/* points */}
      <div className="flex flex-col gap-4">
        <div className="flex  gap-2">
          <span className="flex-1 text-sm font-Lexend">{desc}</span>
        </div>
      </div>
    </div>
  );
};

export default ServicesCardAbout;
