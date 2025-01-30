import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import background_abouts_us from "../../assets/images/background_abouts_us.webp";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import swal from "sweetalert";

import { useAuth } from "../../services/Auth";

const TemplatesSlider = ({ open, onClose, templates, initialIndex }) => {
  const { user } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(initialIndex || 0);
  const navigate = useNavigate();
  const [user2, setUser] = useState([]);
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
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

  const handlePrev = () => {
    sliderRef.current.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };
  useEffect(() => {
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
  }, [user?.token]);
  const NavigateToSteps = (template_id, is_paid) => {
    Cookies.remove("newResumeId");
    Cookies.remove("resumeExampleId");
    Cookies.remove("freshCoverId");
    Cookies.remove("newExampleCoverId");
    if (user?.token) {
      if (Number(is_paid) === 1) {
        if (user2.max_res_templates <= user2.current_res_usage) {
          swal("Sorry!", "Please upgrade your plan", "error");
          navigate(`/packages`);
          return;
        } else {
          navigate(`/resume/formatting`, {
            state: { selectedTemplateId: template_id },
          });
        }
      } else {
        navigate(`/resume/formatting`, {
          state: { selectedTemplateId: template_id },
        });
      }
    } else {
      swal({
        buttons: true,
        icon: "warning",
        title: "Need to Login First",
      }).then((yes) => {
        if (yes) {
          navigate(`/login`);
        }
      });
    }
  };
  return (
    <div
      id="default-modal"
      className={`${open ? "flex" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center w-full md:inset-0 h-full bg-[#00000090]`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-[75%] lg:w-[40%] mt-40 mb-40">
        <div className="relative rounded-lg">
          <Slider {...settings} ref={sliderRef} initialSlide={initialIndex}>
            {templates.map((template, index) => (
              <div key={index} className="relative">
                <div className="flex items-center justify-evenly py-4">
                  <h2 className="text-white Montserrat w-[45%]">
                    {template.name}
                  </h2>
                  {template.is_paid === 1 ? (
                    <button
                      type="button"
                      className="text-white JosefinSans bg-[#00bfab] rounded-xl text-xs sm:text-sm px-4 py-2 hover:bg-[#0072b1] transition-colors duration-500"
                    //onClick={() => setModelbox(true)}
                    >
                      Pay This Template
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="text-white JosefinSans bg-[#00bfab] rounded-xl text-xs sm:text-sm px-4 py-2 hover:bg-[#0072b1] transition-colors duration-500"
                      onClick={() =>
                        NavigateToSteps(template.id, template.is_paid)
                      }
                    >
                      Use This Template
                    </button>
                  )}

                  <button
                    type="button"
                    className="rounded-lg text-sm w-12 sm:w-14 h-14 ms-auto inline-flex justify-center items-center"
                    onClick={onClose}
                  >
                    <IoCloseOutline
                      size={70}
                      className="text-white hover:text-red-600"
                    />
                  </button>
                </div>

                <div className="w-full flex justify-center">
                  <img
                    src={
                      global.imageUrl + template.image || background_abouts_us
                    }
                    alt="Template"
                    className="w-full rounded-xl"
                  />
                </div>
              </div>
            ))}
          </Slider>
          <div className="flex text-center justify-between items-center w-full absolute top-[40%]">
            <IoIosArrowDropleft
              onClick={handlePrev}
              className="text-white hover:text-[#01B2AC] relative left-[-50px]"
              size={40}
            />
            <IoIosArrowDropright
              onClick={handleNext}
              className="text-white hover:text-[#01B2AC] relative right-[-50px]"
              size={40}
            />
          </div>
          <div className="h-[200px]"></div>
        </div>
      </div>
    </div>
  );
};

export default TemplatesSlider;
