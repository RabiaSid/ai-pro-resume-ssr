import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-awesome-slider/dist/styles.css";
import axios from "axios";
import man_space from "./assets/images/page_not_found/man_space.gif";
import star from "./assets/images/page_not_found/star.webp";
import rocket from "./assets/images/page_not_found/rocket.webp";
import venus from "./assets/images/page_not_found/venus.gif";
import Footer from "./Footer";
import Header from "./Header";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
function PageNotFound() {
  const [our_settings_random_blogs, set_our_settings_random_blogs] = useState(
    []
  );
  const [our_settings, set_our_settings] = useState([]);
  useEffect(() => {
    axios
      .get(global.baseurl + "/our-settings")
      .then((response) => {
        set_our_settings_random_blogs(response.data.data.randomBlogs);
        set_our_settings(response.data.data.settings);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className="w-full relative py-20 overflow-hidden  bg-gradient-to-t from-primary-blue to-primary-green">
        <div className="container relative mx-auto">
          {/* All main */}
          <div className="w-[80%] mx-auto flex justify-center items-center flex-col gap-4">
            {/* Main of spcae and 404 */}
            <div className="relative flex items-center justify-center w-full">
              {/* space man image */}
              <div className="absolute z-[2]  mx-auto">
                <img src={man_space} alt="man in space" width={300} />
              </div>
              {/* 404 text */}
              <div className="flex items-center justify-around z-[1] w-full">
                <h3 className="text-[200px] relative top-[100px] w-fit bg-gradient-to-t -rotate-[22deg] from-primary-green/50 to-white font-bold bg-clip-text text-transparent">
                  4
                </h3>
                <h3 className="text-[180px] w-fit bg-gradient-to-t relative right-[5rem] top-3 -rotate-[20deg] from-primary-green/50 to-white font-bold bg-clip-text text-transparent">
                  0
                </h3>
                <h3 className="text-[200px] w-fit bg-gradient-to-t  rotate-[20deg] from-primary-green/50 to-white font-bold bg-clip-text text-transparent">
                  4
                </h3>
              </div>
            </div>
            {/* Content */}
            <div className="flex items-center flex-col font-Lexend text-base text-white">
              <div>{"Looks like you are floating in space OR!"}</div>
              <div>{"This page Doesn’t exist"}</div>
            </div>
            {/* Button */}
            <div>
              <Link
                to={"/"}
                className="uppercase bg-white text-primary-blue px-4 py-2 font-Lexend flex gap-2 font-semibold items-center rounded-lg"
              >
                <IoIosArrowRoundBack size={30} />
                back to home page
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute -left-[5.5rem] top-0">
          <img src={venus} alt="venus" width={230} />
        </div>
        <div className="absolute -right-[6rem] bottom-0 scale-x-[-1]">
          <img src={venus} alt="venus" width={260} />
        </div>

        <img
          className="absolute top-5 left-60"
          src={star}
          alt="star"
          width={30}
        />

        <img
          className="absolute top-[10.7rem] left-[21.2rem]"
          src={star}
          alt="star"
          width={30}
        />

        <img
          className="absolute top-60 left-32"
          src={star}
          alt="star"
          width={20}
        />

        <img
          className="absolute top-60 right-[25rem]"
          src={star}
          alt="star"
          width={30}
        />

        <img
          className="absolute top-12 right-[19rem]"
          src={star}
          alt="star"
          width={10}
        />

        <img
          className="absolute top-44 right-[15rem]"
          src={star}
          alt="star"
          width={20}
        />

        <img
          className="absolute top-20 right-[28rem]"
          src={rocket}
          alt="rocket"
          width={50}
        />
      </div>

      <Footer />
    </div>
  );
}

export default PageNotFound;
