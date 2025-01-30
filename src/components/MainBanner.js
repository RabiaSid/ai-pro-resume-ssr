import React from "react";
import banner_bg from "../assets/images/banner_bg.webp";

const MainBanner = ({ highlightText, descriptionText, startText, endText }) => {
  return (
    <section className="w-full">
      <div
        style={{ backgroundImage: "url('" + banner_bg + "')" }}
        className="w-full pt-28 pb-40 bg-no-repeat bg-cover bg-center text-center"
      >
        <div className="w-[90%] md:w-[80%] xl:w-[78%] 3xl:w-[75%] m-auto">
          <h1 className="text-white font_1 text-4xl  2xl:text-6xl leading-[1.5] lg:leading-[1.5] 2xl:leading-[1.5] inline-block ">
            {startText} <br className="flex xl:hidden" /> <span className="text-[#0072b1]">{highlightText}</span>
            <br />
            {endText}
          </h1>
          <div className="text-white m-auto w-full xl:w-[60%] textt-lg font-semibold">
            {descriptionText ? descriptionText : ""}
          </div>
          {/* <div className="m-auto w-[250px] mb-4 relative left-[0px] -bottom-18 md:left-[0px] md:-bottom-10  xl:bottom-32 xl:left-[540px]">
            <img
              src={arrow_design_4}
              alt="My Image"
              width={200}
              height={150}
              className="animate-bounce"
            />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default MainBanner;
