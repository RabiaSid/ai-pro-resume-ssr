import React from "react";
import shadeImage01 from "../assets/images/pattrens/01.webp";
import shadeImage02 from "../assets/images/pattrens/02.webp";
import shadeImage03 from "../assets/images/pattrens/03.webp";
import Ai from "../assets/images/Ai.webp";
import thumbsup from "../assets/images/thumbsup.webp";
import blog_banner_image from "../assets/images/blog_banner_image.webp";


export default function OtherBanner({ startText, highlightText, endText, desc }) {
  return (
    <>
      <div className="relative flex justify-between  bg-white bg-opacity-25 flex-col">
        {/* {/ Shape Pattrens top Banner /} */}
        <div className="absolute w-full flex justify-center items-center  overflow-hidden">
          <img
            src={shadeImage01}
            alt="full shade image"
            className="w-[600px]"
          />
          <img
            src={shadeImage03}
            alt="full shade image"
            className="hidden 2xl:block w-[300px] lg:w-[700px] absolute  z-[-10000] top-[-80px] lg:top-[-4px] right-0 lg:left-[400px]"
          />
          <img
            src={shadeImage02}
            alt="full shade image"
            className="hidden 2xl:block w-[500px] lg:w-[600px] absolute z-[-10000] top-[-80px] lg:top-[-150px] right-0 lg:right-[-100px]"
          />
        </div>
        {/* {/ Banner Section /} */}
        <section className="w-full">
          <div>
            <div className="max-w-[1500px] grid lg:grid-cols-2 py-4 m-auto px-4 sm:px-8 2xl:px-0 ">
              {/* {/ Banner Text Section /} */}
              <div className="text-left py-8">
                <h1 className="text-[#0072b1] font-Lexend font-bold text-lg lg:text-4xl sm:text-5xl sm:leading-[1.7] md:leading-[1.5] lg:leading-[1.5] 2xl:leading-[1.2] text-center sm:text-left  ">
                  <span className="">
                    {startText}
                    <span className="text-[#00caa5]">{highlightText}</span>
                  </span>{" "}
                  <br />
                  <span className="text-[#0072b1]">
                    {endText}
                  </span>
                </h1>

                <p className="m-auto text-justify text-xs sm:text-left sm:text-lg mt-4 text-primary-black font-Lexend font-normal">
                  {desc}
                </p>
              </div>
              {/* {/ Image Slider Section /} */}
              <div className="flex justify-center xl:justify-center relative res_shade">
                <img
                  src={Ai}
                  alt="icon"
                  className="absolute top-[240px] left-[15px] xl:absolute xl:top-[215px] xl:left-[190px] z-10 lg:left-[111px] md:top-[134px] md:left-[138px] zoom-in-out-box w-[30px] h-[30px] hidden xl:block"
                />
                <img
                  src={thumbsup}
                  alt="icon"
                  className="absolute top-[85px] left-[240px] xl:absolute xl:top-[92px] xl:left-[435px] z-10 lg:left-[111px] md:top-[134px] md:left-[138px] zoom-in-out-box w-[40px] h-[40px] hidden xl:block"
                />

                <img
                  src={blog_banner_image}
                  alt="services_img"
                  className="zoom-in-out-box2 w-[350px] h-[350px]"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
