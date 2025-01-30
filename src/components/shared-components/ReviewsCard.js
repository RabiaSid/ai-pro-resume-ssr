import { Avatar } from "@mui/material";
import React from "react";
import { IoIosStarOutline } from "react-icons/io";
import { MdOutlineStar } from "react-icons/md";
const ReviewsCard = ({ userName, postedData, review, stars }) => {
  const maxStars = 5;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  return (
    <div className="w-full bg-white flex flex-col justify-between gap-4 h-[250px] sm:h-[200px] rounded-md shadow-[0px_0px_20px_rgba(220,220,230,1)] p-4 ">
      {/* Section 1 */}
      <div className="flex justify-between items-center">
        <div className="flex text-sm">
          {[...Array(maxStars)].map((_, idx) => {
            return (
              <div key={idx}>
                {idx < stars ? (
                  <MdOutlineStar
                    key={idx}
                    size={20}
                    className={"text-[#f99e00]"}
                  />
                ) : (
                  <IoIosStarOutline
                    size={20}
                    key={idx}
                    className=" text-[#f99e00]"
                  />
                )}
              </div>
            );
          })}
        </div>
        <div>
          <span className="text-sm text-slate-700 font-semibold">
            {formatDate(postedData)}
          </span>
        </div>
      </div>

      {/* User Section */}
      <div className="font-Lexend flex items-center gap-2">
        <div>
          <span className="font-semibold text-sm drop-shadow-lg">
            {userName}
          </span>
        </div>
      </div>
      {/* section 2 */}
      <div className="flex-1">
        <p className="text-sm  text-slate-700">
          {typeof review === "string" && review.length > 299
            ? review.substring(0, 300) + "..."
            : review}
        </p>
      </div>
    </div>
  );
};

export default ReviewsCard;
