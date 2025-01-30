import React from "react";
import { Link } from "react-router-dom";

export default function SingleBlogComponentcopy({ blog }) {
  const { short_description, name, image, author_name, created_at, slug } =
    blog;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(date);
  };

  return (
    <>
      <Link to={`/blog/${slug}`}>
        <div className="border-2 border-transparent rounded-lg font-Lexend">
          <div className="w-full overflow-hidden flex justify-center items-center rounded-t-md h-[150px] sm:h-[200px] lg:h-[150px] xl:h-[200px] 2xl:h-[300px]">
            <img
              src={global.imageUrl + image}
              className="w-full rounded-t-md object-center border border-gray-100 shadow-sm"
            />
          </div>

          <div className="py-3 ">
            <div className="text-[#0072B1] text-sm font-normal pt-2">
              {author_name} &#9679; {formatDate(created_at)}
            </div>
            <h2 className="text-[#01B2AC] text-lg font-bold line-clamp-2 pt-2.5 h-[66px]">
              {name}
            </h2>
            <p className="text-slate-700/90 font-normal line-clamp-2 leading-6 pt-1 h-[52px]">
              {short_description}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}
