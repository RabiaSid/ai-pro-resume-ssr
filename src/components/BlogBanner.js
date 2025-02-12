import React from "react";

const shadeImage01 = "/images/pattrens/01.webp";
const shadeImage02 = "/images/pattrens/02.webp";
const shadeImage03 = "/images/pattrens/03.webp";
const Ai = "/images/Ai.webp";
const thumbsup = "/images/thumbsup.webp";
const blog_banner_image = "/images/blog_banner_image.webp";

export default function BlogBanner() {
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
            className="hidden 2xl:block w-[300px] lg:w-[500px] absolute  z-[-10000] top-[-80px] lg:top-[-90px] right-0 lg:left-[400px]"
          />
          <img
            src={shadeImage02}
            alt="full shade image"
            className="hidden 2xl:block w-[500px] lg:w-[600px] absolute z-[-10000] top-[-80px] lg:top-[-80px] right-0 lg:right-[-100px]"
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
                    Your Career Boost:{" "}
                    <span className="text-[#00caa5]">AI Magic</span>
                  </span>{" "}
                  <br />
                  <span className="text-[#0072b1]">
                    in Crafting Standout Resumes
                  </span>
                </h1>

                <p className="m-auto text-justify text-xs sm:text-left sm:text-lg mt-4 text-primary-black font-Lexend font-normal">
                  Thank you for visiting our blog! We provide top-notch career
                  advice. Our team of experts will guide you in creating a
                  resume that stands out and help you excel in job interviews.
                </p>
              </div>
              {/* {/ Image Slider Section /} */}
              <div className="flex justify-center xl:justify-center relative res_shade">
                <img
                  src={Ai}
                  alt="icon"
                  className="absolute top-[240px] left-[15px] xl:absolute xl:top-[215px] xl:left-[190px]  lg:left-[111px] md:top-[134px] md:left-[138px] zoom-in-out-box w-[30px] h-[30px] hidden xl:block"
                />
                <img
                  src={thumbsup}
                  alt="icon"
                  className="absolute top-[85px] left-[240px] xl:absolute xl:top-[92px] xl:left-[435px]  lg:left-[111px] md:top-[134px] md:left-[138px] zoom-in-out-box w-[40px] h-[40px] hidden xl:block"
                />

                <img
                  src={blog_banner_image}
                  alt="services_img"
                  className="zoom-in-out-box2 w-[250px]  sm:w-[350px] "
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
