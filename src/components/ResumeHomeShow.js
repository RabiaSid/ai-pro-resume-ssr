import React, { useState, useEffect } from "react";
import { useAuth } from "../services/Auth";
import axios from "axios";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ApiService } from "../services/ApiService";

const premium = "/images/premium.webp";
const brand = "/images/brand.webp";

const ResumeHomeShow = () => {
  const { user } = useAuth();
  const [templates, setTemplates] = useState([]);
  const [randomTemplates, setRandomTemplates] = useState([]);
  const [user2, setUser] = useState([]);
  const [userPurchasedTemplates, setUserPurchasedTemplates] = useState([]);
  const [resumeTemplatesListing, setresumeTemplatesListing] = useState([]);

  useEffect(() => {
    // Fetch templates
    axios
      .get(global.baseurl + "/show-resume-templates")
      .then((response) => {
        setTemplates(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    if (user) {
      const headers = {
        Authorization: "Bearer " + user?.token,
      };

      axios
        .get(global.baseurl + "/user_details", { headers })
        .then((data) => {
          if (data) {
            setUser(data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user?.token]);

  useEffect(() => {
    ApiService.showResumeTemplatesListing(user?.token)
      .then((res) => {
        setresumeTemplatesListing(res?.data?.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const purchasedTemplateIds = user2?.purchase_templates?.map(
      (purchase) => purchase?.id
    );
    const ownTemplates = resumeTemplatesListing?.filter((template) =>
      purchasedTemplateIds?.includes(template?.id)
    );
    setUserPurchasedTemplates(ownTemplates);
  }, [resumeTemplatesListing, user2]);

  const sliderRef = React.useRef(null);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="flex w-full sm:justify-center sm:items-center sm:text-center">
      <div className="block">
        <div className="w-full">
          <p className=" m-auto  sm:text-left sm:text-md   text-slate-800  text-justify font-Lexend font-normal leading-[1.5]">
            Our best AI resume builder allows you to <b>create resumes</b> in
            minutes. Our <b>professional resume templates</b> are based on what
            employers look for in a candidate. We also offer{" "}
            <b>professional cover letter templates</b> that allow you to write
            amazing pitches to get your dream job. <b>Generate resume</b>{" "}
            summaries and incredible cover letters with our AI-based suggestions
            to avoid errors and boring text. You can use our pre-written{" "}
            <b>professional resume</b> and <b>cover letter examples</b> to
            kick-start your career. Let's get started!
          </p>
        </div>
        <div
          className={`${templates.length === 0 ? "" : "grid grid-cols-1 gap-4"
            }`}
        >
          <Slider {...settings} ref={sliderRef}>
            {templates.map((template, index) => {
              const isPurchased = userPurchasedTemplates.some(
                (purchasedTemplate) => purchasedTemplate.id === template.id
              );
              return (
                <div key={index}>
                  <div className="w-full relative mt-4 flex justify-center items-center">
                    <div className="cl_hover2 w-max lg:m-4">
                      <div className="relative">
                        {isPurchased ? (
                          <div
                            className="flex  bg-gradient-to-r  from-[#00caa5] to-[#01B2AC] w-[150px] h-8 absolute left-[-35px] top-6 text-white -rotate-45 justify-center items-center z-50"
                            style={{
                              clipPath:
                                "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
                            }}
                          >
                            <img src={brand} alt="purchased icon" />
                            <span>Own</span>
                          </div>
                        ) : (
                          template.is_paid === 1 && (
                            <div
                              className="flex bg-gradient-to-r from-[#01B2AC] to-[#0072B1] w-[150px] h-8 absolute left-[-35px] top-6 text-white -rotate-45 justify-center items-center z-50"
                              style={{
                                clipPath:
                                  "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
                              }}
                            >
                              <img src={premium} alt="premium icon" />
                              <span>Premium</span>
                            </div>
                          )
                        )}

                        <img
                          src={global.imageUrl + template.image}
                          alt="My Image"
                          className="shadow-[0px_0px_3px_rgba(0,0,0,1)] rounded-xl w-[100%] sm:w-[90%] p-2 lg:p-0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ResumeHomeShow;
