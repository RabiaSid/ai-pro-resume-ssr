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
import premium from "./assets/images/premium.webp";
import OurFaqs from "./components/faq";
import LazyLoadImageComp from "./components/lazyLoadImage/lazyLoadImage";

function Pages() {
  const { user } = useAuth();

  const navigate = useNavigate();
  const dataScreenRef = useRef(null);
  const [categories, set_categories] = useState([]);
  const [top_categories, set_top_categories] = useState([]);
  const [templates, set_templates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [user2, set_user] = useState([]);
  const [selectedCatName, setSelectedCatName] = useState("");
  const [selectedCatDesc, setSelectedCatDesc] = useState("");

  const [isLoading, setIsloading] = useState(false);
  const [isfilter, setIsfilter] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  //
  const [listOfJobPositions, setListOfJobPositions] = useState([]);

  const [jobPositionDetails, setJobPositionDetails] = useState();

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
    ApiService.getExampleCoverLetterCategories()
      .then((res) => {
        set_categories(res.data.data.categories);

        set_top_categories(res.data.data.top_categories);
      })
      .catch((err) => console.log(err));

    ApiService.getAllJobPositionsNamesExamples("cover_example")
      .then((res) => {
        setListOfJobPositions(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (user) {
      const headers = {
        Authorization: "Bearer " + user?.token,
      };

      axios
        .get(global.baseurl + "/user_details", { headers })
        .then((data) => {
          if (data) {
            set_user(data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  const chk_temp = (cat_id, cat_name, cat_desc) => {
    setIsloading(true);
    setIsfilter(true);

    axios
      .get(global.baseurl + "/front-cover-templates?category_id=" + cat_id)
      .then((response) => {
        set_templates(response.data.data.cover_examples);

        setSelectedCatName(cat_name);
        setSelectedCatDesc(cat_desc);
        setJobPositionDetails();
        setIsloading(false);
      })
      .catch((error) => {
        console.log(error);
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
  const sliderRefs = useRef([]);

  const searchByJob = (param) => {
    setIsfilter(true);

    setIsloading(true);
    ApiService.coverLetterSearchByJob(param)
      .then((response) => {
        set_templates(response.data.data.job_position.cover_examples);
        if (response.data.data.job_position) {
          setJobPositionDetails(response.data.data.job_position);
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

  const NavigateToSteps = (id, themeId, is_paid) => {
    Cookies.remove("newResumeId");
    Cookies.remove("resumeExampleId");
    Cookies.remove("freshCoverId");
    Cookies.remove("newExampleCoverId");
    Cookies.remove("profile_id");
    navigate(`/create-cover-letter/formatting`, {
      state: { isExample: true, exampleId: id },
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
  {
    /* Kashish Code Start */
  }
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
  {
    /* Kashish Code ends */
  }
  return (
    <div>
      {/* header */}
      <Header />
      {isLoading && <LoadingSpiner isLoading={isLoading} />}
      <section className="w-full bg-[white]">
        <BannerComponent
          descriptionText={""}
          startText={"Your Perfect"}
          highlightText={"Cover Letter"}
          endText={"An Easy-to-Follow Example with AI Touch"}
          clickHere={"Resume Example"}
          link={"/resume-examples"}
        />
        {ads
          .filter((ad) => ad.slug === "cover-letter-examples-top")
          .map((ad) => (
            <div
              key={ad.id}
              className="flex justify-center items-start flex-wrap  mt-4"
            >
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
        <div className="bg-white border border-1 border-[#00caa5] w-[90%] sm:w-[70%]  lg:w-[665px] m-auto mb-3 flex lg:justify-between items-center shadow-[0px_0px_30px_0px_rgba(0,0,0,0.2)] rounded-full    text-[#13b6b5] relative top-[40px] p-2">
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
                      className="hover:bg-[#00caa5] hover:text-white hover:font-bold py-2 px-2 cursor-pointer select-none"
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
          <div className="w-[100%] lg:w-[25%] 2xl:w-[30%]">
            <div className="border border-[#00caa5] rounded-lg shadow-[0px_0px_20px_0px_rgba(0,0,0,0.2)]">
              <h1 className="font-Lexend text-2xl py-4 px-4 text-[#0072b1]">
                Categories
              </h1>
              <hr className="border-t border-[#00caa5]" />
              {categories
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((category, index) => (
                  <div
                    key={index}
                    id={category.id}
                    onClick={(e) =>
                      chk_temp(
                        category.id,
                        category.name,
                        category.cover_letter_description
                      )
                    }
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
                    className="flex justify-start items-center p-2 text-slate-900 cursor-pointer  hover:text-[#0072b1] hover:bg-white rounded-2xl hover:shadow-[0px_10px_20px_0px_rgba(0,0,0,0.3)] my-2"
                  >
                    <p className="font_1 text-lg pl-2 text-[#0072b1]">
                      {showAllCategories ? "Show Less" : "Show More"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="w-[100%] lg:w-[75%] 2xl:w-[70%]" ref={dataScreenRef}>
            {!isfilter ? (
              top_categories
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((top_categories, index) => {
                  if (top_categories.cover_examples.length === 0) return;

                  const settings = {
                    dots: false,
                    infinite: true,
                    speed: 500,
                    slidesToShow:
                      top_categories.cover_examples.length < 4
                        ? top_categories.cover_examples.length
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
                            top_categories.cover_examples.length < 4
                              ? top_categories.cover_examples.length
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
                        }
                      }
                    ],
                  };

                  return (
                    <div key={index}>
                      <div className="flex justify-between items-center flex-wrap">
                        <div className="px-2 lg:px-8 w-full">
                          <div className="flex justify-between items-center">
                            <h1 className="font-Lexend text-md lg:text-2xl text-[#0072b1]">
                              {top_categories.name}
                            </h1>

                            <div className="flex justify-end items-center py-4">
                              <div className="border-2 border-[#0072b1] hover:border-[#00caa5] text-[#0072b1] hover:text-[#00caa5] rounded-full p-1 transition-all duration-200 cursor-pointer">
                                <BiLeftArrowAlt
                                  size={25}
                                  className="custom-arrow prev-arrow"
                                  onClick={() =>
                                    sliderRefs.current[index].slickPrev()
                                  }
                                />
                              </div>

                              <div className="ml-2 border-2 border-[#0072b1] hover:border-[#00caa5] text-[#0072b1] hover:text-[#00caa5] rounded-full p-1 transition-all duration-200 cursor-pointer">
                                <BiRightArrowAlt
                                  size={25}
                                  className="custom-arrow prev-arrow"
                                  onClick={() =>
                                    sliderRefs.current[index].slickNext()
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          <hr />
                          <div className="py-2">
                            <p
                              className="font-Lexend text-lg pl-2"
                              dangerouslySetInnerHTML={{
                                __html: top_categories.cover_letter_description,
                              }}
                            ></p>
                            {/* <p className="font-Lexend text-lg pl-2">
                              {top_categories.cover_letter_description}
                            </p> */}
                          </div>
                        </div>
                      </div>
                      {top_categories.cover_examples.length < 4 ? (
                        <div className="flex justify-start items-start flex-wrap">
                          {top_categories?.cover_examples?.map(
                            (template, idx) => {
                              return (
                                <div
                                  key={idx}
                                  className="w-full sm:w-[50%] md:w-[33%] "
                                >
                                  <div
                                    className="dd_btn4 flex justify-normal items-start px-6 py-8 lg:p-2 text-slate-600 cursor-pointer flex-wrap mt-2 "
                                    id={"border_box3_" + template.id + idx}
                                  >
                                    <div className="cl_hover2 w-max lg:m-4">
                                      <div className="relative">
                                        <div
                                          className=" w-6 h-6  right-4 top-4 rounded-full flex items-center justify-center absolute z-50"
                                          onClick={() =>
                                            openTemplatesModal(idx)
                                          }
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
                                          id={"border_box_" + template.id + idx}
                                        >
                                          <div
                                            className="absolute border border-solid border-[#01B2AC] rounded-xl w-full h-full z-10"
                                            id={
                                              "border_box2_" + template.id + idx
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
                                              "#border_box_" + template.id + idx
                                            ).css("top", "-10px"),
                                            $(
                                              "#border_box_" + template.id + idx
                                            ).css("left", "-10px"),
                                            $(
                                              "#border_box2_" +
                                              template.id +
                                              idx
                                            ).css("top", "8px"),
                                            $(
                                              "#border_box2_" +
                                              template.id +
                                              idx
                                            ).css("left", "8px"),
                                            $(
                                              "#border_box_" + template.id + idx
                                            ).css("transition", "0.7s"),
                                            $(
                                              "#border_box2_" +
                                              template.id +
                                              idx
                                            ).css("transition", "0.7s"),
                                            $(
                                              "#border_box3_" +
                                              template.id +
                                              idx
                                            ).css("transition", "0.7s"),
                                            $(
                                              "#border_box3_" +
                                              template.id +
                                              idx
                                            ).css("transform", "scale(1.05)")
                                          )}
                                          onMouseLeave={() => (
                                            $(
                                              "#border_box_" + template.id + idx
                                            ).css("top", "0px"),
                                            $(
                                              "#border_box_" + template.id + idx
                                            ).css("left", "0px"),
                                            $(
                                              "#border_box2_" +
                                              template.id +
                                              idx
                                            ).css("top", "0px"),
                                            $(
                                              "#border_box2_" +
                                              template.id +
                                              idx
                                            ).css("left", "0px"),
                                            $(
                                              "#border_box_" + template.id + idx
                                            ).css("transition", "0.7s"),
                                            $(
                                              "#border_box2_" +
                                              template.id +
                                              idx
                                            ).css("transition", "0.7s"),
                                            $(
                                              "#border_box3_" +
                                              template.id +
                                              idx
                                            ).css("transition", "0.7s"),
                                            $(
                                              "#border_box3_" +
                                              template.id +
                                              idx
                                            ).css("transform", "scale(1)")
                                          )}
                                        >
                                          <div className="absolute box2 shadow-lg rounded-lg py-2 cursor-pointer JosefinSans text-sm bg-[#01B2AC] hover:bg-[#0072b1] text-white w-[60%] flex justify-center items-center flex-wrap">
                                            Use This Example
                                          </div>
                                        </div>
                                        <p className="cl_inner2 duration-300 transition-all Montserrat text-md text-black text-center mt-4 max-w-[160px] truncate mx-auto ">
                                          {template.job_positions &&
                                            template.job_positions.length > 0 ? (
                                            <>
                                              {template.job_positions[0].name}
                                              <span className="mt-2">
                                                {template?.job_positions.map(
                                                  (position, posIdx) => (
                                                    <div
                                                      key={posIdx}
                                                      className="bg-[#0072b1] text-white flex items-center justify-center text-xs font-semibold  px-4 py-1 rounded mt-2"
                                                    >
                                                      <span className="max-w-[160px] truncate mx-auto">{position.name}</span>
                                                    </div>
                                                  )
                                                )}
                                              </span>
                                            </>
                                          ) : (
                                            ""
                                          )}
                                        </p>
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
                          {top_categories?.cover_examples?.map(
                            (template, idx) => {
                              return (
                                <div key={idx}>
                                  <div
                                    className="dd_btn4 flex justify-normal items-start px-6 py-8 lg:p-2 text-slate-600 cursor-pointer flex-wrap mt-2 "
                                    id={"border_box3_" + idx}
                                  >
                                    <div className="cl_hover2 w-max lg:m-4">
                                      <div className="relative">
                                        <div
                                          className=" w-6 h-6  right-4 top-4 rounded-full flex items-center justify-center absolute z-50"
                                          onClick={() =>
                                            openTemplatesModal(idx)
                                          }
                                        ></div>
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
                                              template.is_paid
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
                                        <p className="cl_inner2 duration-300 transition-all Montserrat text-md text-black text-center mt-4 max-w-[160px] truncate mx-auto ">
                                          {template.job_positions &&
                                            template.job_positions.length > 0 ? (
                                            <>
                                              {template.job_positions[0].name}

                                              <div className="mt-2">
                                                {template?.job_positions.map(
                                                  (position, posIdx) => (
                                                    <div
                                                      key={posIdx}
                                                      className="bg-[#0072b1] text-white text-xs font-semibold flex items-center justify-center px-4 py-1 rounded mt-2"
                                                    >
                                                      <span className="max-w-[160px] truncate mx-auto">{position.name}</span>
                                                    </div>
                                                  )
                                                )}
                                              </div>
                                            </>
                                          ) : (
                                            ""
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </Slider>
                      )
                      }

                      <hr className="border-[1px] border-[#d6d6d4] my-10" />
                      {isModalOpen && (
                        <TemplatesSlider
                          open={isModalOpen}
                          onClose={closeTemplatesModal}
                          templates={top_categories.cover_examples}
                          initialIndex={initialIndex}
                        />
                      )}
                    </div>
                  );
                })
            ) : (
              <div className="flex flex-col gap-4 mt-4">
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
                  className={`${templates.length === 0 ? "" : "grid sm:grid-cols-3 gap-4 px-4"
                    } `}
                >
                  {templates.length !== 0 ? (
                    templates?.map((template, idx) => {
                      return (
                        <div key={idx} className="w-full">
                          <div
                            className="dd_btn4 flex justify-normal items-start  text-slate-600 cursor-pointer flex-wrap mt-10"
                            id={"border_box3_" + idx}
                          >
                            <div className="lg:m-4">
                              <div className="relative">
                                <div
                                  className=" w-6 h-6  right-4 top-4 rounded-full flex items-center justify-center absolute z-50"
                                  onClick={() => openTemplatesModal(idx)}
                                ></div>
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
                                  {/* <img
                                    src={
                                      global.imageUrl + template.preview_image
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
                                <p className="cl_inner2 duration-300 transition-all Montserrat text-md text-black text-center mt-4 max-w-[160px] truncate mx-auto ">
                                  {template?.template.name}
                                </p>
                                <div className="mt-2">
                                  {template?.job_positions?.map(
                                    (position, posIdx) => (
                                      <div
                                        key={posIdx}
                                        className="bg-[#0072b1] text-white text-xs font-semibold flex items-center justify-center px-4 py-1 rounded mt-2"
                                      >
                                        {position?.name}
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <h1 className="my-2 text-xl font-bold px-6">
                      {" "}
                      No Results Available
                    </h1>
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
      </section >
      <OurFaqs />
      {
        ads
          .filter((ad) => ad.slug === "cover-letter-examples-bottom")
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
          ))
      }
      {/* Kashish Code ends */}
      {/* footer */}
      <Footer />
    </div >
  );
}

export default Pages;
