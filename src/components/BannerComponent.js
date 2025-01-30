import React, { useEffect, useRef, useState } from "react";
import shadeImage01 from "../assets/images/pattrens/01.webp";
import shadeImage02 from "../assets/images/pattrens/02.webp";
import shadeImage03 from "../assets/images/pattrens/03.webp";
import NinaButton from "./NinaButton";
import { useAuth } from "../services/Auth";
import saudi from "../assets/images/company/saudi.webp";
import aerotek from "../assets/images/company/aerotek.webp";
import geti from "../assets/images/company/geti.webp";
import ladders from "../assets/images/company/ladders.webp";
import snagajob from "../assets/images/company/snagajob.webp";
import alison from "../assets/images/company/alison.webp";
import bannerArrow from "../assets/images/Banner_arrow_icon.webp";
import template_design1 from "../assets/images/template_design_1.webp";
import template_design2 from "../assets/images/template_design_2.webp";
import template_design3 from "../assets/images/template_design_3.webp";
import template_design4 from "../assets/images/template_design_4.webp";
import bannerIcon from "../assets/images/banner-icons.webp";
import { Link } from "react-router-dom";
import LazyLoadImageComp from "./lazyLoadImage/lazyLoadImage";

const BannerComponent = ({
  highlightText,
  descriptionText,
  startText,
  endText,
  clickHere,
  link,
}) => {
  const { user } = useAuth();
  const images = [
    template_design1,
    template_design2,
    template_design3,
    template_design4,
  ];

  const ZoomCarousel = () => {
    const [cImage, setCurrentIndex] = useState(0);

    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000); // Change the interval time (in milliseconds) as needed

      return () => clearInterval(intervalId); // Cleanup function to clear the interval on component unmount
    }, []);

    return (
      <div className="w-full lg:w-[500px] h-[400px] lg:h-[600px]  relative top-[20px]  slick__banner__holder">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            className={`${idx === cImage ? "active" : "inActive"
              } skew-y-12 w-full h-[350px]`}
            alt={`image${idx + 1}`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="w-full h-auto overflow-hidden">
      <div className="relative flex justify-between bg-white flex-col">
        {/* Shape Patterns top Banner */}
        <div className="absolute w-full h-[800px] flex justify-center items-center overflow-hidden">
          <img
            src={shadeImage01}
            alt="full shade image"
            className="hidden 2xl:block w-[100px] shade_anim lg:w-[500px] absolute top-[-100px] lg:top-[0px] right-0 lg:left-[500px]"
          />
          <img
            src={shadeImage03}
            alt="full shade image"
            className="hidden 2xl:block w-[100px] shade_anim2 lg:w-[500px] absolute top-[-100px] lg:top-[20px] right-0 lg:left-[650px]"
          />
          <img
            src={shadeImage02}
            alt="full shade image"
            className="hidden 2xl:block w-[500px] shade_anim2 lg:w-[600px] absolute top-[-100px] lg:top-[-150px] right-0 lg:right-[-100px]"
          />
        </div>
        {/* Banner Section */}
        <section className="w-full">
          <div>
            <div className="max-w-[1500px] flex lg:grid lg:grid-cols-2 gap-4 sm:py-4 m-auto px-4 sm:px-8 2xl:px-0 flex-col-reverse lg:flex-row ">
              {/* Banner Text Section */}
              <div className="text-left ">
                <h1 className="hidden lg:block text-[#0072b1] font-Lexend font-bold text-lg lg:text-4xl sm:text-2xl sm:leading-[1.7] md:leading-[1.5] lg:leading-[1.5] 2xl:leading-[1.2] text-center lg:text-left pt-8">
                  {startText}{" "}
                  <span className="">
                    <span className="text-[#00caa5]">{highlightText}</span>
                  </span>{" "}
                  {endText}
                </h1>

                <p className="m-auto text-base  relative text-left sm:text-lg mt-20 sm:mt-8 lg:mt-4 text-primary-black font-Lexend font-normal leading-[1.5]">
                  {descriptionText}
                </p>
                <br />
                <div className="flex flex-wrap items-center justify-start ">
                  <h3 className="font-Lexend md:text-lg lg:text-lg text-sm sm:leading-[1.7] md:leading-[1.5] lg:leading-[1.5] 2xl:leading-[1.2] text-left flex items-center">
                    Click here to check our
                    <span className="text-[#00caa5] lg:px-2 px-1 z-10">
                      <Link to={link}>{clickHere}</Link>
                    </span>
                    <img src={bannerArrow} className="ml-1" alt="arrow" />
                  </h3>
                </div>

                <br />
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <NinaButton
                    className={"w-[80%] m-auto lg:m-0 sm:w-fit"}
                    childClassName={"w-full sm:w-fit"}
                    title={"IMPORT RESUME"}
                    mainColor={"#00caa5"}
                    sliderColor={"#fff59c"}
                    mainTextColor={"#FFFFFF"}
                    hoverTextColor={"#00caa5"}
                    link={user?.token ? "/import-resume" : "/login"}
                  />
                </div>
                <br />
                <p className="font-semibold">Our customer were hired by:</p>
                <div className="flex flex-wrap justify-start items-center pt-4 gap-8">
                  <img src={saudi} alt="google_logo" className="w-[150px]" />

                  <img src={aerotek} alt="amazon_logo" className="w-[100px]" />

                  <img src={geti} alt="microSoft_logo" className="w-[70px]" />

                  <img src={ladders} alt="Fed_ex_logo" className="w-[80px]" />

                  <img src={snagajob} alt="walmart_logo" className="w-[80px]" />

                  <img src={alison} alt="walmart_logo" className="w-[80px]" />
                </div>
              </div>
              {/* Image Slider Section */}
              <div className="text-left ">
                <h1 className="lg:hidden text-[#0072b1] py-8 font-Lexend font-bold text-lg lg:text-4xl sm:text-2xl sm:leading-[1.7] md:leading-[1.5] lg:leading-[1.5] 2xl:leading-[1.2] text-center lg:text-left ">
                  {startText}{" "}
                  <span className="">
                    <span className="text-[#00caa5]">{highlightText}</span>
                  </span>{" "}
                  {endText}
                </h1>

                <div className="flex justify-center xl:justify-end relative items-center top-[30px]">
                  <div className="bg-[#01B2AC33] backdrop-blur-xl relative rounded-2xl  h-[350px] sm:h-[410px] w-full lg:w-auto">
                    <ZoomCarousel />
                    <LazyLoadImageComp
                      src={bannerIcon}
                      alt="icon"
                      className="absolute md:left-[120px] lg:left-[20px] top-[45px] animated-image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default BannerComponent;
