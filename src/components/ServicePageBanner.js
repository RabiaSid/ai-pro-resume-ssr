import React from "react";
import shadeImage01 from "../assets/images/pattrens/01.webp";
import shadeImage02 from "../assets/images/pattrens/02.webp";
import shadeImage03 from "../assets/images/pattrens/03.webp";
import services_banner_img from "../assets/images/services_banner_img.webp";

export default function ServicePageBanner({
  startText,
  startHeadingText,
  highLightedText,
  endText,
  description,
}) {
  return (
    <>
      <div className="relative flex justify-between bg-white bg-opacity-25 flex-col Lexend">
        {/* {/ Shape Pattrens top Banner /} */}
        <div className="absolute w-full flex justify-center items-center overflow-hidden">
          <img
            src={shadeImage01}
            alt="full shade image"
            className=" w-[250px] sm:w-[600px] overflow-hidden"
          />
          <img
            src={shadeImage03}
            alt="full shade image"
            className="hidden 2xl:block w-[300px] lg:w-[700px] absolute  z-[-10000] top-[-80px] lg:top-[-4px] right-0 lg:left-[400px] overflow-hidden"
          />
          <img
            src={shadeImage02}
            alt="full shade image"
            className="hidden 2xl:block w-[300px] lg:w-[600px] absolute z-[-10000] top-[-80px] lg:top-[-150px] right-0 lg:right-[-100px] overflow-hidden"
          />
        </div>
        {/* {/ Banner Section /} */}
        <section className="w-full py-6 md:py-10">
          <div>
            <div className="max-w-[1500px] sm:grid lg:grid-cols-2 gap-4 sm:py-4 m-auto sm:px-8 2xl:px-0 flex flex-col-reverse">
              {/* {/ Banner Text Section /} */}
              <div className="hidden sm:flex  flex-col justify-center font-Lexend  sm:py-10">
                <h3 className="hidden sm:block text-[#0072b1] font-bold text-xl font_1">
                  {startText}{" "}
                </h3>
                <br />
                <h1 className="hidden sm:block text-[#0072b1] font-Lexend font-bold text-lg lg:text-4xl sm:text-2xl sm:leading-[1.7] md:leading-[1.5] lg:leading-[1.5] 2xl:leading-[1.2] text-center lg:text-left ">
                  <span className="">
                    {startHeadingText}{" "}
                    <span className="text-[#00caa5]">{highLightedText}</span>
                  </span>{" "}
                  <br />
                  <span className="text-[#00caa5]">
                    <span className="text-[#0072b1]">{endText}</span>
                  </span>
                </h1>

                <p className="m-auto text-base text-justify sm:text-left sm:text-md mt-4 text-primary-black  font-Lexend font-normal leading-[1.5] ">
                  {description}
                </p>
              </div>
              {/* {/ Image Slider Section /} */}
              <div>
                <div className="sm:hidden ">
                  <h3 className="text-center text-[#0072b1] font-bold text-xl font_1 ">
                    {startText}{" "}
                  </h3>
                  <br />

                  <h1 className=" text-[#0072b1] font-Lexend font-bold text-xl sm:text-2xl sm:leading-[1.7] md:leading-[1.5] lg:leading-[1.5] 2xl:leading-[1.2] text-center lg:text-left ">
                    <span className="">
                      {startHeadingText}{" "}
                      <span className="text-[#00caa5]">{highLightedText}</span>
                    </span>{" "}
                    <br />
                    <span className="text-[#00caa5]">
                      <span className="text-[#0072b1]">{endText}</span>
                    </span>
                  </h1>
                </div>
                <div className="flex justify-center xl:justify-end relative  res_shade pt-10 sm:pt-0">
                  {/* <img
                    src={service_banner_icon}
                    alt="icon"
                    className="absolute top-[45px] left-[-6px] lg:left-[10px] xl:top-[70px] xl:left-[60px] 2xl:left-[190px]  md:top-[134px] md:left-[138px] zoom-in-out-box md:w-[550px] w-[300px]"
                  /> */}
                  <img
                    src={services_banner_img}
                    alt="services_img"
                    className="zoom-in-out-box2 md:w-[550px] w-[300px] animate-pulse"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
