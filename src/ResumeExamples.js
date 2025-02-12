import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import "react-awesome-slider/dist/styles.css";
import axios from "axios";
import { BiSearch, BiRightArrowAlt, BiLeftArrowAlt } from "react-icons/bi";
import { ApiService } from "./services/ApiService";
import LoadingSpiner from "./components/LoadingSpinner";
import Cookies from "js-cookie";
import swal from "sweetalert";
import { useAuth } from "./services/Auth";
import BannerComponent from "./components/BannerComponent";
import $ from "jquery";
import TemplatesSlider from "./components/shared-components/TemplatesSlider";
import OurFaqs from "./components/faq";
import LazyLoadImageComp from "./components/lazyLoadImage/lazyLoadImage";

const premium = "/images/premium.webp";

function Pages() {
  const { user } = useAuth();

  const Navigate = useNavigate();
  const dataScreenRef = useRef(null);
  const [categories, set_categories] = useState([]);
  const [top_categories, set_top_categories] = useState([]);
  const [templates, set_templates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const [selectedCatName, setSelectedCatName] = useState("");
  const [selectedCatDesc, setSelectedCatDesc] = useState("");

  const [isLoading, setIsloading] = useState(false);
  const [isfilter, setIsfilter] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listOfJobPositions, setListOfJobPositions] = useState([]);

  const [jobPositionDetails, setJobPositionDetails] = useState();
  const [user2, setUser] = useState([]);
  const [initialIndex, setInitialIndex] = useState(0);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    ApiService.getAllAdsWeb(user?.token)
      .then((response) => {
        setAds(response.data.data.ads);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    ApiService.getExampleResumeCategories()
      .then((res) => {
        set_categories(res.data.data.categories);
        set_top_categories(res.data.data.top_categories);
      })
      .catch((err) => console.log(err));

    ApiService.getAllJobPositionsNamesExamples("resume_example")
      .then((res) => {
        setListOfJobPositions(res.data.data);
      })
      .catch((err) => console.log(err));

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
  }, []);

  const chk_temp = (cat_id, cat_name, cat_des) => {
    setIsloading(true);
    setIsfilter(true);

    axios
      .get(global.baseurl + "/front-resume-templates?category_id=" + cat_id)
      .then((response) => {
        set_templates(response.data.data.resume_examples);

        setSelectedCatName(cat_name);
        setSelectedCatDesc(cat_des);
        setJobPositionDetails();
        setIsloading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsloading(false);
      })

    if (dataScreenRef.current) {
      const scrollPosition =
        dataScreenRef.current.getBoundingClientRect().top - 20;

      window.scrollBy({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  const sliderRefs = useRef([]);

  // Function to initialize the slider refs
  const initSliderRefs = (arrayLength) => {
    sliderRefs.current = Array(arrayLength)
      .fill()
      .map((_, i) => sliderRefs.current[i] || React.createRef());
  };

  useEffect(() => {
    initSliderRefs(top_categories.length);
  }, [top_categories]);

  const searchByJob = (param) => {
    setIsfilter(true);

    setIsloading(true);
    ApiService.resumeSearchByJob(param)
      .then((response) => {
        set_templates(response.data.data.job_position.resume_examples);

        if (response.data.job_position) {
          setJobPositionDetails(response.data.job_position);
        }
        setSelectedCatName(param);
        setIsloading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsloading(false);
      });

    if (dataScreenRef.current) {
      const scrollPosition =
        dataScreenRef.current.getBoundingClientRect().top - 20;

      window.scrollBy({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  const NavigateToSteps = (themeId, template_id, is_paid) => {
    Cookies.remove("newResumeId");
    Cookies.remove("resumeExampleId");
    Cookies.remove("freshCoverId");
    Cookies.remove("newExampleCoverId");
    Cookies.remove("profile_id");
    Navigate(`/resume/formatting`, {
      state: {
        isExample: true,
        exampleId: themeId,
        resumeSelectedTemplateId: template_id,
      },
    });
  };

  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [showAllCategories, setShowAllCategories] = useState(false);

  const toggleCategories = () => {
    setShowAllCategories(!showAllCategories);
  };

  const openTemplatesModal = (initialIndex) => {
    setIsModalOpen(true);
    setInitialIndex(initialIndex);
  };

  const closeTemplatesModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* header */}
      <Header />
      {isLoading && <LoadingSpiner isLoading={isLoading} />}
      <section className="w-full bg-[white] pt-10">
        <BannerComponent
          descriptionText={<>
            AI Pro Resume is your ultimate destination for creating professional resumes and cover letters. To save you time and effort, we have introduced creative resume examples. These great resume examples are pre-written. You just have to click on them and add minor details to make your resume more personalized. We offer professional resume templates that assist you in landing the interview. Whether you are starting your career or a seasoned professional, AI Pro Resume ensures your resume shines in the crowd.</>}
          startText={" Find the Perfect "}
          highlightText={"Resume Example"}
          endText={"for Your Field"}
          clickHere={"Cover letter Example"}
          link={"/cover-letter-examples"}
        />
        {ads
          .filter((ad) => ad.slug === "resume-examples-top")
          .map((ad) => (
            <div key={ad.id} className="flex justify-center mt-5">
              {ad.is_script === 0 ? (
                <a href={`${ad.ad_url}`} target="blank">
                  <LazyLoadImageComp
                    className="w-full"
                    src={`${global.imageUrl + ad.image}`}
                    alt={`Ad ${ad.id}`}
                  />
                </a>
              ) : (
                <div className="p-4">
                  <p className="text-xl font-semibold mb-2">{ad.ad_script}</p>
                </div>
              )}
            </div>
          ))}
        <div className="bg-white border border-1 border-[#00caa5] w-[90%] sm:w-[70%]  lg:w-[665px] m-auto mb-3 flex lg:justify-between items-center shadow-[0px_0px_30px_0px_rgba(0,0,0,0.2)] rounded-full text-[#13b6b5] relative top-[40px] p-2">
          <BiSearch
            size={32}
            className="cursor-pointer hover:scale-125 duration-300 transition-all mr-2"
          />
          <div className="flex-1 relative w-full">
            <input
              type="text"
              id="search"
              autoComplete="off"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              className="border-slate-200 relative z-[9999] font-montserrat w-[90%] outline-none lg:font-[20px] font-[12px] text-sm lg:text-lg text-[rgba(184, 184, 184, 1)]"
              placeholder="Search By Job Title"
              value={searchTerm}
              onFocus={() => setIsSearch(true)}
            />
            <div
              ref={dropdownRef}
              className={`absolute top-full left-0 right-0 bottom-0 bg-white shadow-md  h-[300px] 
              flex-col overflow-y-scroll  p-4 rounded-b-lg z-[9999] ${isSearch ? "flex" : "hidden"
                }
                `}
            >
              {listOfJobPositions
                .filter((item) => {
                  return item.name
                    .toLowerCase()
                    .trim()
                    .includes(searchTerm.toLowerCase().trim());
                })
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((cat, idx) => {
                  return (
                    <span
                      key={idx}
                      className="hover:bg-[#00caa5] hover:text-white hover:font-bold py-2 px-2 cursor-pointer select-none "
                      onClick={() => {
                        setSearchTerm(cat.name);
                        searchByJob(cat.name);
                        setIsSearch(false);
                      }}
                    >
                      {cat.name}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
      {/* Abid Code Start */}
      <section className="w-full py-10 bg-[white] mt-12">
        <div className="flex justify-start items-start flex-wrap px-4 lg:px-16 xl:px-20 2xl:px-40">
          <div className="w-[100%] lg:w-[25%] 2xl:w-[30%] mb-10">
            <div className="border border-[#00caa5] rounded-lg shadow-[0px_0px_20px_0px_rgba(0,0,0,0.2)]">
              <h1 className="font-Lexend text-2xl py-4 px-4 text-[#0072b1]">
                Categories
              </h1>
              <hr className="border-t border-[#00caa5]" />
              {categories
                ?.sort((a, b) => a.name.localeCompare(b.name))
                .map((category, index) => (
                  <div
                    key={index}
                    id={category.id}
                    onClick={() => {
                      chk_temp(
                        category.id,
                        category.name,
                        category.short_description
                      );
                      // searchByJob(category.name);
                      setIsSearch(false);
                    }}
                    className={`flex gap-2 font-Lexend justify-start items-center p-2 text-slate-900 cursor-pointer  hover:text-[#0072b1] my-2 ${!showAllCategories && index >= 3 ? "hidden md:flex" : ""
                      }`}
                  >
                    {/* <img
                    src={global.imageUrl + category.icon}
                    className="w-4"
                    alt={category.icon}
                  /> */}
                    <p className="font-Lexend text-lg pl-2">{category.name}</p>
                  </div>
                ))}
              {categories.length > 3 && (
                <div className="md:hidden">
                  <div
                    onClick={toggleCategories}
                    className="flex justify-start items-center p-2 text-slate-900 cursor-pointer hover:text-[#0072b1] hover:bg-white rounded-2xl hover:shadow-[0px_10px_20px_0px_rgba(0,0,0,0.3)] my-2"
                  >
                    <p className="font_1 text-lg pl-2 text-[#0072b1]">
                      {showAllCategories ? "Show Less" : "Show More"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="w-[100%] lg:w-[75%] 2xl:w-[70%] " ref={dataScreenRef}>
            {!isfilter ? (
              top_categories?.map((top_categories, index) => {
                if (top_categories.resume_examples.length === 0) return;
                const settings = {
                  dots: false,
                  infinite: true,
                  speed: 500,
                  slidesToShow:
                    top_categories.resume_examples.length < 4
                      ? top_categories.resume_examples.length
                      : 3,
                  slidesToScroll: 1,
                  arrows: false, // Hide navigation arrows
                  autoplay: true, // Enable auto sliding
                  autoplaySpeed: 2000,
                  responsive: [
                    {
                      breakpoint: 1300,
                      settings: {
                        slidesToShow:
                          top_categories.resume_examples.length < 4
                            ? top_categories.resume_examples.length
                            : 3,
                      },
                    },
                    {
                      breakpoint: 1280, // Approximate for large screens
                      settings: {
                        slidesToShow: 3, // Matches `md:w-[33%]`
                      },
                    },
                    {
                      breakpoint: 768, // Matches the `md` breakpoint in Tailwind
                      settings: {
                        slidesToShow: 2, // Matches `sm:w-[50%]`
                      },
                    },
                    {
                      breakpoint: 640, // Matches the `sm` breakpoint in Tailwind
                      settings: {
                        slidesToShow: 1, // Matches `w-full`
                      },
                    },
                  ],
                };

                return (
                  <div key={index}>
                    <div className="flex justify-between items-center flex-wrap ">
                      <div className="px-2 lg:px-8">
                        <h1 className="font-Lexend text-md lg:text-2xl text-[#0072b1]">
                          {top_categories.name}
                        </h1>
                      </div>

                      <div className="flex justify-end items-center">
                        <div className="border-2 border-[#0072b1] hover:border-[#00caa5] text-[#0072b1] hover:text-[#00caa5] rounded-full p-1 transition-all duration-200 cursor-pointer">
                          <BiLeftArrowAlt
                            size={25}
                            className="custom-arrow prev-arrow"
                            onClick={() =>
                              sliderRefs.current[index].slickPrev()
                            }
                          />
                        </div>

                        <div className="ml-4 border-2 border-[#0072b1] hover:border-[#00caa5] text-[#0072b1] hover:text-[#00caa5] rounded-full p-1 transition-all duration-200 cursor-pointer">
                          <BiRightArrowAlt
                            size={25}
                            className="custom-arrow prev-arrow"
                            onClick={() =>
                              sliderRefs.current[index].slickNext()
                            }
                          />
                        </div>
                      </div>

                      {/* <p className="font-Lexend text-lg ml-2 lg:ml-8 w-full py-2 mt-4 mb-2 border-t border-slate-300">
                      {top_categories.short_description}
                      </p> */}
                    </div>
                    {top_categories.resume_examples.length < 4 ? (
                      <div className="flex justify-start items-start flex-wrap ">
                        {top_categories.resume_examples?.map(
                          (template, idx) => {
                            return (
                              <div
                                key={idx}
                                className="w-full sm:w-[50%] md:w-[33%]"
                              >
                                <div
                                  className="dd_btn4 flex justify-normal items-start px-6 py-8 lg:p-2 text-slate-600 cursor-pointer flex-wrap mt-2 "
                                  id={"bborder_box3_" + template.id + idx}
                                >
                                  <div className="cl_hover2 lg:m-4  ">
                                    <div className="relative">
                                      <div
                                        className=" w-6 h-6  right-4 top-4 rounded-full flex items-center justify-center absolute z-50"
                                        onClick={() => openTemplatesModal(idx)}
                                      >
                                        {/* <img src={search_symbol} /> */}
                                      </div>
                                      {template.template.is_paid === 1 && (
                                        <div
                                          className="flex bg-gradient-to-r from-[#01B2AC] to-[#0072B1] w-[150px] h-8 absolute left-[-35px] top-6 text-white -rotate-45 justify-center items-center z-50"
                                          style={{
                                            clipPath:
                                              "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
                                          }}
                                        >
                                          <img
                                            src={premium}
                                            alt="premium icon"
                                          />
                                          <span>Premium</span>
                                        </div>
                                      )}
                                      <div
                                        className="relative bborder_box"
                                        id={"bborder_box_" + template.id + idx}
                                      >
                                        <div
                                          className="absolute border border-solid border-[#01B2AC] rounded-xl w-full h-full z-10"
                                          id={
                                            "bborder_box2_" + template.id + idx
                                          }
                                        ></div>
                                        <LazyLoadImageComp
                                          src={
                                            global.imageUrl +
                                            template.preview_image
                                          }
                                          alt="My Image"
                                          className="shadow-[0px_0px_3px_3px_rgba(0,0,0,0.3)] rounded-xl w-full z-20 relative min-h-[300px]"

                                        />
                                        {/* <img
                                          src={
                                            global.imageUrl +
                                            template.preview_image
                                          }
                                          alt="My Image"
                                          className="shadow-[0px_0px_3px_3px_rgba(0,0,0,0.3)] rounded-xl w-full z-20 relative min-h-[300px]"
                                        /> */}
                                      </div>
                                      <div
                                        className="dd_menu4 rounded-xl z-30 absolute top-0 left-0 w-full h-[94%] justify-evenly items-end p-2 "
                                        onClick={() =>
                                          NavigateToSteps(
                                            template.id,
                                            template.template_id,
                                            template.template.is_paid
                                          )
                                        }
                                        onMouseMove={(e) => (
                                          $(
                                            "#bborder_box_" + template.id + idx
                                          ).css("top", "-10px"),
                                          $(
                                            "#bborder_box_" + template.id + idx
                                          ).css("left", "-10px"),
                                          $(
                                            "#bborder_box2_" + template.id + idx
                                          ).css("top", "8px"),
                                          $(
                                            "#bborder_box2_" + template.id + idx
                                          ).css("left", "8px"),
                                          $(
                                            "#bborder_box_" + template.id + idx
                                          ).css("transition", "0.7s"),
                                          $(
                                            "#bborder_box2_" + template.id + idx
                                          ).css("transition", "0.7s"),
                                          $(
                                            "#bborder_box3_" + template.id + idx
                                          ).css("transition", "0.7s"),
                                          $(
                                            "#bborder_box3_" + template.id + idx
                                          ).css("transform", "scale(1.05)")
                                        )}
                                        onMouseLeave={() => (
                                          $(
                                            "#bborder_box_" + template.id + idx
                                          ).css("top", "0px"),
                                          $(
                                            "#bborder_box_" + template.id + idx
                                          ).css("left", "0px"),
                                          $(
                                            "#bborder_box2_" + template.id + idx
                                          ).css("top", "0px"),
                                          $(
                                            "#bborder_box2_" + template.id + idx
                                          ).css("left", "0px"),
                                          $(
                                            "#bborder_box_" + template.id + idx
                                          ).css("transition", "0.7s"),
                                          $(
                                            "#bborder_box2_" + template.id + idx
                                          ).css("transition", "0.7s"),
                                          $(
                                            "#bborder_box3_" + template.id + idx
                                          ).css("transition", "0.7s"),
                                          $(
                                            "#bborder_box3_" + template.id + idx
                                          ).css("transform", "scale(1)")
                                        )}
                                      >
                                        <div className="absolute box2 shadow-lg rounded-lg py-2 cursor-pointer JosefinSans text-sm bg-[#01B2AC] hover:bg-[#0072b1] text-white w-[60%] flex justify-center items-center flex-wrap">
                                          Use This Example
                                        </div>
                                      </div>
                                      <p className="cl_inner2 duration-300 transition-all Montserrat text-md text-black text-center mt-4 max-w-[160px] truncate mx-auto">
                                        {template.resume_name}
                                      </p>
                                      <span className="mt-2">
                                        {template?.job_positions.map(
                                          (position, posIdx) => (
                                            <div
                                              key={posIdx}
                                              className="bg-[#0072b1] flex items-center justify-center text-white text-xs font-semibold px-4 py-1 rounded mt-2"
                                            >
                                              <span className="max-w-[160px] truncate mx-auto">{position.name}</span>
                                            </div>
                                          )
                                        )}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    ) : (
                      <Slider
                        {...settings}
                        ref={(el) => (sliderRefs.current[index] = el)}

                      >
                        {top_categories.resume_examples?.map(
                          (template, idx) => {
                            return (
                              <div key={idx} >
                                <div
                                  className="dd_btn4 flex justify-normal items-start px-6 py-8 lg:p-2 text-slate-600 cursor-pointer flex-wrap mt-2  "
                                  id={"border_box3_" + idx}
                                >
                                  <div className="cl_hover2 w-max lg:m-4">
                                    <div className="relative">
                                      <div
                                        className=" w-6 h-6  right-4 top-4 rounded-full flex items-center justify-center absolute z-50"
                                        onClick={() => openTemplatesModal(idx)}
                                      >
                                        {/* <img src={search_symbol} /> */}
                                      </div>
                                      {template.template.is_paid === 1 && (
                                        <div
                                          className="flex bg-gradient-to-r from-[#01B2AC] to-[#0072B1] w-[150px] h-8 absolute left-[-35px] top-6 text-white -rotate-45 justify-center items-center z-50"
                                          style={{
                                            clipPath:
                                              "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
                                          }}
                                        >
                                          <img
                                            src={premium}
                                            alt="premium icon"
                                          />
                                          <span>Premium</span>
                                        </div>
                                      )}
                                      <div
                                        className="relative border_box"
                                        id={"border_box_" + idx}
                                      >
                                        <div
                                          className="absolute border border-solid border-[#01B2AC] rounded-xl w-full h-full z-10"
                                          id={"border_box2_" + idx}
                                        ></div>
                                        {/* <LazyLoadImageComp
                                          src={
                                            global.imageUrl +
                                            template.preview_image
                                          }
                                          alt="My Image"
                                          className="shadow-[0px_0px_3px_3px_rgba(0,0,0,0.3)] rounded-xl w-full z-20 relative min-h-[300px]"

                                        /> */}
                                        <img
                                          src={
                                            global.imageUrl +
                                            template.preview_image
                                          }
                                          alt="My Image"
                                          className="shadow-[0px_0px_3px_3px_rgba(0,0,0,0.3)] rounded-xl w-full z-20 relative min-h-[300px]"
                                        />
                                      </div>
                                      <div
                                        className="dd_menu4 rounded-xl z-30 absolute top-0 left-0 w-full h-[94%] justify-evenly items-end p-2 "
                                        onClick={() =>
                                          NavigateToSteps(
                                            template.id,
                                            template.template_id,
                                            template.template.is_paid
                                          )
                                        }
                                        onMouseMove={(e) => (
                                          $("#border_box_" + idx).css(
                                            "top",
                                            "-10px"
                                          ),
                                          $("#border_box_" + idx).css(
                                            "left",
                                            "-10px"
                                          ),
                                          $("#border_box2_" + idx).css(
                                            "top",
                                            "8px"
                                          ),
                                          $("#border_box2_" + idx).css(
                                            "left",
                                            "8px"
                                          ),
                                          $("#border_box_" + idx).css(
                                            "transition",
                                            "0.7s"
                                          ),
                                          $("#border_box2_" + idx).css(
                                            "transition",
                                            "0.7s"
                                          ),
                                          $("#border_box3_" + idx).css(
                                            "transition",
                                            "0.7s"
                                          ),
                                          $("#border_box3_" + idx).css(
                                            "transform",
                                            "scale(1.05)"
                                          )
                                        )}
                                        onMouseLeave={() => (
                                          $("#border_box_" + idx).css(
                                            "top",
                                            "0px"
                                          ),
                                          $("#border_box_" + idx).css(
                                            "left",
                                            "0px"
                                          ),
                                          $("#border_box2_" + idx).css(
                                            "top",
                                            "0px"
                                          ),
                                          $("#border_box2_" + idx).css(
                                            "left",
                                            "0px"
                                          ),
                                          $("#border_box_" + idx).css(
                                            "transition",
                                            "0.7s"
                                          ),
                                          $("#border_box2_" + idx).css(
                                            "transition",
                                            "0.7s"
                                          ),
                                          $("#border_box3_" + idx).css(
                                            "transition",
                                            "0.7s"
                                          ),
                                          $("#border_box3_" + idx).css(
                                            "transform",
                                            "scale(1)"
                                          )
                                        )}
                                      >
                                        <div className="absolute box2 shadow-lg rounded-lg py-2 cursor-pointer JosefinSans text-sm bg-[#01B2AC] hover:bg-[#0072b1] text-white w-[60%] flex justify-center items-center flex-wrap">
                                          Use This Example
                                        </div>
                                      </div>
                                      <p className="cl_inner2 duration-300 transition-all Montserrat text-md text-black text-center mt-4 max-w-[160px] truncate mx-auto">
                                        {template.resume_name}
                                      </p>
                                      {template?.job_positions.map(
                                        (position, posIdx) => (
                                          <div
                                            key={posIdx}
                                            className="bg-[#0072b1] text-white flex items-center justify-center text-xs font-semibold px-4 py-1 rounded mt-2"
                                          >
                                            <span className="max-w-[160px] truncate mx-auto">{position.name}</span>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        )}
                      </Slider>
                    )}

                    <br />
                    <br />
                    {isModalOpen && (
                      <TemplatesSlider
                        open={isModalOpen}
                        onClose={closeTemplatesModal}
                        templates={top_categories.resume_examples}
                        initialIndex={initialIndex}
                      />
                    )}
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col gap-4 mt-4 ">
                <div className="px-10">
                  <h1 className="font-Lexend text-2xl text-[#0072b1]">
                    {selectedCatName}
                  </h1>
                </div>
                <hr />
                <div className="px-10">
                  <p className="font-Lexend text-lg pl-2"
                    dangerouslySetInnerHTML={{
                      __html: selectedCatDesc,
                    }}
                  />
                </div>
                <div
                  className={`${templates?.length === 0 ? "" : "grid sm:grid-cols-3 gap-4 px-4 "
                    } `}
                >
                  {templates?.length !== 0 ? (
                    templates?.map((template, idx) => {
                      return (
                        <div key={idx} className="w-full ">
                          <div
                            className="dd_btn4 flex justify-normal items-start text-slate-600 cursor-pointer flex-wrap mt-10"
                            id={"border_box3_" + idx}
                          >
                            <div className="lg:m-4">
                              <div className="relative">
                                <div
                                  className=" w-6 h-6  right-4 top-4 rounded-full flex items-center justify-center absolute z-50"
                                  onClick={() => openTemplatesModal(idx)}
                                >
                                  {/* <img src={search_symbol} /> */}
                                </div>
                                {template?.template.is_paid === 1 && (
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
                                )}
                                <div
                                  className="relative border_box"
                                  id={"border_box_" + idx}
                                >
                                  <div
                                    className="absolute border border-solid border-[#01B2AC] rounded-xl w-full h-full z-10"
                                    id={"border_box2_" + idx}
                                  ></div>
                                  <LazyLoadImageComp
                                    src={
                                      global.imageUrl + template.preview_image
                                    }
                                    alt="My Image"
                                    className="shadow-[0px_0px_3px_3px_rgba(0,0,0,0.3)] rounded-xl w-full z-20 relative min-h-[300px]"

                                  />
                                </div>
                                <div
                                  className="dd_menu4 rounded-xl z-30 absolute top-0 left-0 w-full h-[94%] justify-evenly items-end p-2 "
                                  onClick={() =>
                                    NavigateToSteps(
                                      template.id,
                                      template.template_id
                                    )
                                  }
                                  onMouseMove={(e) => (
                                    $("#border_box_" + idx).css("top", "-10px"),
                                    $("#border_box_" + idx).css(
                                      "left",
                                      "-10px"
                                    ),
                                    $("#border_box2_" + idx).css("top", "8px"),
                                    $("#border_box2_" + idx).css("left", "8px"),
                                    $("#border_box_" + idx).css(
                                      "transition",
                                      "0.7s"
                                    ),
                                    $("#border_box2_" + idx).css(
                                      "transition",
                                      "0.7s"
                                    ),
                                    $("#border_box3_" + idx).css(
                                      "transition",
                                      "0.7s"
                                    ),
                                    $("#border_box3_" + idx).css(
                                      "transform",
                                      "scale(1.05)"
                                    )
                                  )}
                                  onMouseLeave={() => (
                                    $("#border_box_" + idx).css("top", "0px"),
                                    $("#border_box_" + idx).css("left", "0px"),
                                    $("#border_box2_" + idx).css("top", "0px"),
                                    $("#border_box2_" + idx).css("left", "0px"),
                                    $("#border_box_" + idx).css(
                                      "transition",
                                      "0.7s"
                                    ),
                                    $("#border_box2_" + idx).css(
                                      "transition",
                                      "0.7s"
                                    ),
                                    $("#border_box3_" + idx).css(
                                      "transition",
                                      "0.7s"
                                    ),
                                    $("#border_box3_" + idx).css(
                                      "transform",
                                      "scale(1)"
                                    )
                                  )}
                                >
                                  <div className="absolute box2 shadow-lg rounded-lg py-2 cursor-pointer JosefinSans text-sm bg-[#01B2AC] hover:bg-[#0072b1] text-white w-[60%] flex justify-center items-center flex-wrap">
                                    Use This Example
                                  </div>
                                </div>
                                <p className="cl_inner2 duration-300 transition-all Montserrat text-md text-black text-center mt-4 max-w-[160px] truncate mx-auto">
                                  {template?.resume_name}
                                </p>
                                {template?.job_positions.map(
                                  (position, posIdx) => (
                                    <div
                                      key={posIdx}
                                      className="bg-[#0072b1] text-white flex items-center justify-center text-xs font-semibold px-4 py-1 rounded mt-2"
                                    >
                                      <span className="max-w-[160px] truncate mx-auto">{position.name}</span>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <h1 className="my-2 text-xl font-bold px-6">No results</h1>
                  )}
                  {isModalOpen && (
                    <TemplatesSlider
                      open={isModalOpen}
                      onClose={closeTemplatesModal}
                      templates={templates}
                      initialIndex={initialIndex}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        {ads
          .filter((ad) => ad.slug === "resume-examples-bottom")
          .map((ad) => (
            <div key={ad.id} className="flex justify-center mb-5">
              {ad.is_script === 0 ? (
                <a href={`${ad.ad_url}`} target="blank">
                  <LazyLoadImageComp
                    className="w-full"
                    src={`${global.imageUrl + ad.image}`}
                    alt={`Ad ${ad.id}`}
                  />
                </a>
              ) : (
                <div className="p-4">
                  <p className="text-xl font-semibold mb-2">{ad.ad_script}</p>
                </div>
              )}
            </div>
          ))}
      </section>
      <OurFaqs />

      {/* Kashish Code ends */}
      {/* footer */}
      <Footer />
    </div>
  );
}

export default Pages;
