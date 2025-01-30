import React, { useState, useEffect } from "react";
import banner_bg from "./assets/images/banner_bg.webp";
import arrow_design_9 from "./assets/images/arrow_design_9.webp";
import blue_text_bg_3 from "./assets/images/blue_text_bg_3.webp";
import {
  BiLogoFacebook,
  BiLogoTwitter,
  BiLogoInstagram,
  BiLogoLinkedin,
  BiLogoPinterest,
} from "react-icons/bi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-awesome-slider/dist/styles.css";
import axios from "axios";

import under_construction from "./assets/images/under_construction.webp";
function UnderConstruction() {
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

  const eventDatePrint = "2024-12-31T23:59:59";
  const [timer, setTimer] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(eventDatePrint).getTime();

    const countdownInterval = setInterval(() => {
      const currentDate = new Date().getTime();
      const timeDifference = targetDate - currentDate;

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      setTimer({ days, hours, minutes, seconds });

      if (timeDifference <= 0) {
        clearInterval(countdownInterval);
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [eventDatePrint]);

  return (
    <div>
      <div className="w-[100%] flex flex-wrap justify-center">
        <img
          src={global.imageUrl + our_settings.header_logo}
          alt="My Image"
          width={150}
          height={40}
          className="py-2"
        />
      </div>

      <section className="w-full">
        <div
          style={{ backgroundImage: "url('" + banner_bg + "')" }}
          className="w-full  pt-20 pb-20 bg-no-repeat bg-cover bg-center text-center"
        >
          <div className="w-[90%] md:w-[80%] xl:w-[78%] 3xl:w-[75%] m-auto justify-center">
            <div className="m-auto w-[160px]">
              <img
                src={arrow_design_9}
                alt="My Image"
                width={160}
                height={119}
                className="anim_right_left"
              />
            </div>
            <h1 className="text-white font_1 text-4xl md:text-6xl lg:text-6xl xl:text-6xl 2xl:text-6xl sm:leading-[1.7] md:leading-[1.5] lg:leading-[1.5] 2xl:leading-[1.3]">
              Transformatin in Progress{" "}
              <span
                style={{ backgroundImage: "url('" + blue_text_bg_3 + "')" }}
                className="bg-no-repeat bg-cover px-6 py-2"
              >
                Stay Tune
              </span>
            </h1>
            <section id="flex flex-col items-center justify-center text-center h-9vh mt-18 ">
              <div className="flex flex-wrap mt-20 text-white text-3xl justify-center items-center ">
                {[1, 2, 3, 4].map((index) => (
                  <div
                    key={`div${index}`}
                    className="font_1 py-[10px] px-[10px] bg-[#0072b1] ml-[5px] rounded-[10px]"
                  >
                    <div
                      id={
                        index === 1
                          ? "days"
                          : index === 2
                            ? "hours"
                            : index === 3
                              ? "minutes"
                              : "seconds"
                      }
                      className="font_size_5"
                    >
                      {
                        timer[
                        index === 1
                          ? "days"
                          : index === 2
                            ? "hours"
                            : index === 3
                              ? "minutes"
                              : "seconds"
                        ]
                      }
                    </div>
                    <div className="timer-label text-xs mt-5">
                      {index === 1
                        ? "Days"
                        : index === 2
                          ? "Hours"
                          : index === 3
                            ? "Minutes"
                            : "Seconds"}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#fff] py-10 px-10 lg:px-40 flex flex-wrap justify-between items-center align-middle">
        <div className="w-[100%] flex flex-wrap items-center justify-center">
          <img
            src={under_construction}
            alt="under_construction"
            width="50%"
            height="70%"

          />
        </div>
      </section>
      <footer className="bg-[#0072b1] text-white z-50">
        <div className="flex flex-wrap justify-center px-2 py-4">
          <div className="w-[100%] flex flex-wrap justify-center">
            <img
              src={global.imageUrl + our_settings.footer_logo}
              alt="My Image"
              width={250}
              height={40}
              className=""
            />
          </div>
          <div className="lg:flex flex-wrap items-center justify-start text-5xl lg:text-6xl lg:my-8 my-2">
            <a
              href={our_settings.facebook_account_link}
              className="hover:text-[#00caa5]"
            >
              <BiLogoFacebook className="rounded-full border-2 border-white p-2 mr-4 hover:border-[#00caa5] hover:animate-spin" />
            </a>
            <a
              href={our_settings.twitter_account_link}
              className="hover:text-[#00caa5]"
            >
              <BiLogoTwitter className="rounded-full border-2 border-white p-2 mr-4 hover:border-[#00caa5] hover:animate-spin" />
            </a>
            <a
              href={our_settings.instagram_account_link}
              className="hover:text-[#00caa5]"
            >
              <BiLogoInstagram className="rounded-full border-2 border-white p-2 mr-4 hover:border-[#00caa5] hover:animate-spin" />
            </a>
            <a
              href={our_settings.linkedin_account_link}
              className="hover:text-[#00caa5]"
            >
              <BiLogoLinkedin className="rounded-full border-2 border-white p-2 mr-4 hover:border-[#00caa5] hover:animate-spin" />
            </a>
            <a
              href="https://www.pinterest.ca/aiproresume/"
              className="hover:text-[#00caa5]"
            >
              <BiLogoPinterest className="rounded-full border-2 border-white p-2 mr-4 hover:border-[#00caa5] hover:animate-spin" />
            </a>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center px-10 lg:px-40 py-10">
          <a href="https://www.softtechcube.com/" alt="soft_tech_cube">
            <span className="text-center text-md xl:text-center">
              {our_settings.footer_text}
            </span>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default UnderConstruction;
