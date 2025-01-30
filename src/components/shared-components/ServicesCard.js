import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

const ServicesCard = ({ img, alt, title, points }) => {
  const [isGroupHover, setIsGroupHover] = useState(false);

  if (typeof points !== "string" || !points.trim()) {
    // Handle the case where points is not a string or is empty
    return null; // or return a default value, error message, etc.
  }
  const pointsArray = points
    .replace(/<\/?ul>/g, "") // Remove <ul> tags
    .split("</li>") // Split by </li> tag
    .filter((item) => item.trim()) // Remove empty items
    .map((item) => item.replace(/<li>/, "").trim());

  return (
    <div
      className="sm:h-[550px] border-2 border-white relative shadow-[0_0_20px_0px_rgba(0,0,0,0.1)] rounded-xl py-4 px-6 group flex flex-col gap-4 "
      onMouseEnter={() => setIsGroupHover(true)}
      onMouseLeave={() => setIsGroupHover(false)}
    >
      {/* Image */}
      <div className="px-6 w-full flex justify-center items-center">
        <div className="animate-pulse  w-[150px] h-[180px]  flex justify-center items-center ">
          <img src={img} alt={alt} className="w-full" />
        </div>
      </div>
      {/* Title */}
      <div className="w-full text-center">
        <span className="drop-shadow-lg text-lg font-bold text-center font-Lexend">
          {title}
        </span>
      </div>

      {/* points */}
      <div className="flex flex-col gap-4">
        {pointsArray?.map((item, idx) => (
          <div key={idx} className="flex  gap-2">
            <div className="w-[18px]">
              <FaCheckCircle className="text-lg text-primary mt-1" />
            </div>
            <span
              className="flex-1 text-sm font-Lexend"
              dangerouslySetInnerHTML={{ __html: item }}
            ></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesCard;
