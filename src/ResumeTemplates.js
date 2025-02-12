import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import "react-awesome-slider/dist/styles.css";
import axios from "axios";
import TemplatesSlider from "./components/shared-components/TemplatesSlider";
import { BiSearch } from "react-icons/bi";
import { IoIosEye } from "react-icons/io";
import Cookies from "js-cookie";
import swal from "sweetalert";
import LoadingSpiner from "./components/LoadingSpinner";
import { useAuth } from "./services/Auth";
import BannerComponent from "./components/BannerComponent";
import $ from "jquery";
import { RxCross1 } from "react-icons/rx";
import { LuPackagePlus } from "react-icons/lu";
import { CgTemplate } from "react-icons/cg";
import { useCart } from "./data/CartStore";
import { BsBoxSeamFill } from "react-icons/bs";
import { GoChecklist } from "react-icons/go";
import { ApiService } from "./services/ApiService";
import { set } from "date-fns";
import OurFaqs from "./components/faq";
import LazyLoadImageComp from "./components/lazyLoadImage/lazyLoadImage";

const premium = "/images/premium.webp";
const brand = "/images/brand.webp";
function Pages() {
  const { user } = useAuth();
  const { addToCart, cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [topCategories, setTopCategories] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCatName, setSelectedCatName] = useState("");
  const [user2, setUser] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ads, setAds] = useState([]);
  const [modelbox, setModelbox] = useState(false);
  const [modelTemplateId, setModelTemplateId] = useState();
  const [modelTemplateName, setModelTemplateName] = useState();
  const [modelTemplateImage, setModelTemplateImage] = useState();
  const [modelTemplatePrice, setModelTemplatePrice] = useState();
  const [userPurchasedTemplates, setUserPurchasedTemplates] = useState([]);
  const [resumeTemplatesListing, setresumeTemplatesListing] = useState([]);

  useEffect(() => {
    ApiService.showResumeTemplatesListing(user?.token)
      .then((res) => {
        setresumeTemplatesListing(res?.data?.data);
      })
      .catch((err) => { });
  }, []);

  // useEffect(() => {
  //   const purchasedTemplateIds = user2?.purchase_templates?.map(
  //     (purchase) => purchase?.id
  //   );
  //   const ownTemplates = resumeTemplatesListing?.filter((template) =>
  //     purchasedTemplateIds?.includes(template?.id)
  //   );
  //   setUserPurchasedTemplates(ownTemplates);
  // }, [resumeTemplatesListing, user2]);

  useEffect(() => {
    ApiService.getAllAdsWeb(user?.token)
      .then((response) => {
        setAds(response.data.data.ads);
      })
      .catch((err) => { });
  }, []);

  const [initialIndex, setInitialIndex] = useState(0);

  const handleKeyUp = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    // Fetch templates
    axios
      .get(global.baseurl + "/show-resume-templates")
      .then((response) => {
        setTemplates(response.data.data);
      })
      .catch((error) => { });

    const headers = {
      Authorization: "Bearer " + user?.token,
    };

    axios
      .get(global.baseurl + "/user_details", { headers })
      .then((data) => {
        if (data) {
          console.log("user_details" + data);
          setUser(data.data);
        }
      })
      .catch((err) => { });
  }, [user?.token]);

  const NavigateToSteps = (template_id) => {
    Cookies.remove("newResumeId");
    Cookies.remove("resumeExampleId");
    Cookies.remove("freshCoverId");
    Cookies.remove("newExampleCoverId");
    navigate(`/resume/formatting`, {
      state: { selectedTemplateId: template_id },
    });
  };

  const sliderRefs = useRef([]);

  const initSliderRefs = (arrayLength) => {
    sliderRefs.current = Array(arrayLength)
      .fill()
      .map((_, i) => sliderRefs.current[i] || React.createRef());
  };

  useEffect(() => {
    initSliderRefs(topCategories.length);
  }, [topCategories]);

  const closeTemplatesModal = () => {
    setIsModalOpen(false);
  };

  const openTemplatesModal = (initialIndex) => {
    setIsModalOpen(true);
    setInitialIndex(initialIndex);
  };

  const handleCheckout = () => {
    addToCart("template", {
      id: modelTemplateId,
      name: modelTemplateName,
      doc: "resume",
      image: modelTemplateImage,
      price: modelTemplatePrice,
      discounted_price: 0,
      description: modelTemplateName + " Purchase",
      file: {},
    });

    const state = {
      totalAmount: modelTemplatePrice,
      subtotal: modelTemplatePrice,
      remainingAmount: 0,
      noteValue: "",
      selectedFree: 0,
    };

    navigate("/checkout", { state });
  };

  return (
    <div>
      <Header />
      {isLoading && <LoadingSpiner isLoading={isLoading} />}
      {modelbox ? (
        <div
          onClick={() => {
            setModelbox(false);
          }}
          className="bg-[rgba(0,0,0,0.6)] backdrop-blur-sm flex justify-center items-center fixed top-0 left-0 w-full h-full z-[9999]"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="bg-white w-[95%] lg:w-[70%] xl:w-[50%] font-Lexend flex flex-wrap justify-between  rounded-2xl"
          >
            <div className="flex w-full border-b px-8 py-5 justify-between">
              <div className="text-xl text-primary-blue font-bold ">
                Package Update / Purchase Template
              </div>

              <RxCross1
                className="text-red-500 hover:text-primary-blue cursor-pointer"
                size={30}
                onClick={() => {
                  setModelbox(false);
                }}
              />
            </div>
            <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-0 p-4 lg:px-4 sm:py-8 lg:py-10">
              <div className="flex justify-start lg:justify-center lg:flex-wrap gap-2 mb-4 lg:mb-0">
                <CgTemplate className="text-primary-green text-[75px] xl:text-[100px] 2xl:text-[120px]" />
                <div className="text-start lg:text-center">
                  <h2 className="w-full text-center mt-2 font-bold">
                    Do you want to Purchase Template?
                  </h2>
                  <button
                    onClick={() => {
                      handleCheckout();
                    }}
                    className="mt-1 md:mt-2 lg:mt-4 text-white bg-primary-blue hover:bg-primary-black px-4 py-1 rounded-full"
                  >
                    Pay Now
                  </button>
                </div>
              </div>

              <div className="flex justify-start lg:justify-center lg:flex-wrap gap-2 mb-4 lg:mb-0 ">
                <GoChecklist className="text-primary-green  text-[70px] xl:text-[100px] 2xl:text-[120px]" />
                <div className="w-full text-start lg:text-center">
                  <button
                    onClick={() => NavigateToSteps(modelTemplateId)}
                    className="animatedIcon animate-pulse mt-1 md:mt-2 lg:mt-4 text-white bg-primary-blue hover:bg-primary-black px-4 py-1 rounded-full"
                  >
                    Try Now
                  </button>
                </div>
              </div>
              <div className="flex justify-start lg:justify-center lg:flex-wrap gap-2 mb-4 lg:mb-0">
                <LuPackagePlus className="text-primary-green text-[75px] xl:text-[100px] 2xl:text-[120px]" />
                <div className="text-start lg:text-center">
                  <h2 className="w-full text-center mt-2 font-bold">
                    Do you want to Update Package?
                  </h2>
                  <button
                    onClick={() => navigate(`/packages`)}
                    className="mt-1 md:mt-2 lg:mt-4 text-white bg-primary-blue hover:bg-primary-black px-4 py-1 rounded-full"
                  >
                    Update Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <section className="w-full bg-[white]">
        <BannerComponent
          descriptionText={
            <>
              Curriculum templates are the key that makes your resume stand out.
              AI Pro Resumes offers the best professional resume templates that
              are ATS-friendly and customizable. To create a professional
              resume, select from your preferred best resume templates, insert
              all the details, and download in PDF format.
              <br />
              <br />
              We have templates for all. Whether you are looking for a basic
              resume template, a simple modern resume template, a resume
              portfolio template, or an outdoor professional guiding resume
              template, we have got you covered. Let’s now catch the recruiter's
              attention with a clean simple resume template!
            </>
          }
          startText={"Ready to Stand Out?"}
          highlightText={"Pick the Perfect"}
          endText={"Resume Template "}
          clickHere={"Cover letter Templates"}
          link={"/cover-letter-templates"}
        />

        <div className="flex justify-evenly items-start lg:px-10 text-slate-600 cursor-pointer flex-wrap mb-2 mt-4">
          <div className="px-4 lg:px-10"></div>
        </div>

        <div className="bg-white border border-1 border-[#00caa5] w-[90%] sm:w-[70%]  lg:w-[665px] m-auto flex lg:justify-between items-center shadow-[0px_0px_30px_0px_rgba(0,0,0,0.2)] rounded-full    text-[#13b6b5] relative top-[40px] p-2">
          <BiSearch
            size={32}
            className="cursor-pointer hover:scale-125 duration-300 transition-all mr-2"
          />
          <input
            type="text"
            id="search"
            onKeyUp={handleKeyUp}
            className="border-slate-200 font-montserrat w-[90%] outline-none lg:font-[20px] font-[12px] text-sm lg:text-lg text-[rgba(184, 184, 184, 1)]"
            placeholder="Search with Creative, Modern, Professional etc"
          />
        </div>
      </section>
      <section className="w-full py-5 sm:py-10 bg-[white]">
        <div className="flex justify-start items-start flex-wrap ">
          <div className="w-full">
            <div className="flex justify-evenly items-start mt-10 px-0 lg:px-10 text-slate-600 cursor-pointer flex-wrap my-2">
              <div className="flex flex-col gap-2">
                <h1 className="font_1 text-4xl text-[#0072b1]">
                  {selectedCatName}
                </h1>

                <div
                  className={`${templates.length === 0
                    ? ""
                    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                    } `}
                >
                  {templates?.length > 0 ? (
                    templates
                      ?.filter((template) =>
                        template.name
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      )
                      .map((template, index) => {
                        let ownedTemp = 0;
                        if (user2?.purchase_templates?.length) {
                          user2?.purchase_templates
                            ?.filter((temp) => temp.template_id == template.id)
                            .map((temp, id) => (ownedTemp = 1));
                        }
                        const uniqueRandomNumber =
                          Math.floor(Math.random() * 200) + 100; // Generate unique number
                        return (
                          <div key={index}>
                            <div
                              className="dd_btn4 flex justify-normal items-start px-4 text-slate-600 cursor-pointer flex-wrap mt-10"
                              id={"border_box3_" + index}
                            >
                              <div className="cl_hover2 w-max lg:m-4">
                                <div className="relative">
                                  <div
                                    className=" bg-gradient-to-r  from-[#01B2AC]/80 to-[#00caa5]/80 px-2 h-6  right-4 top-4 rounded-sm gap-2 flex items-center justify-center absolute z-50"
                                  // onClick={() => openTemplatesModal(index)}
                                  >
                                    <IoIosEye color="#fff" size={22} />
                                    <span className="text-sm text-white font-medium ">
                                      {uniqueRandomNumber}
                                    </span>
                                  </div>
                                  {/* <div
                                    className="bg-[#0072b1] w-6 h-6  right-4 top-4 rounded-full flex items-center justify-center absolute z-50"
                                    onClick={() => openTemplatesModal(index)}
                                  >
                                     <img src={search_symbol} /> 
                                  </div> */}
                                  {ownedTemp == 1 ? (
                                    <div
                                      className="flex 
                                      bg-gradient-to-r  from-[#00caa5] to-[#01B2AC]
                                      w-[150px] h-8 absolute left-[-35px] top-6 text-white -rotate-45 justify-center items-center z-50"
                                      id={"own_box_" + index}
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
                                        className="flex bg-gradient-to-r from-[#01B2AC] to-[#0072B1] w-[150px] h-8 absolute left-[-35px] top-[24px] text-white -rotate-45 justify-center items-center z-50"
                                        id={"premium_box_" + index}
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
                                  <div
                                    className="relative border_box"
                                    id={"border_box_" + index}
                                  >
                                    <div
                                      className="absolute border border-solid border-[#01B2AC] rounded-xl w-full h-full z-10"
                                      id={"border_box2_" + index}
                                    ></div>
                                    <LazyLoadImageComp
                                      src={global.imageUrl + template.image}
                                      alt="My Image"
                                      className="shadow-[0px_0px_3px_3px_rgba(0,0,0,0.3)] rounded-xl w-full z-20 relative"

                                    />
                                    {/* <img
                                      src={global.imageUrl + template.image}
                                      alt="My Image"
                                      className="shadow-[0px_0px_3px_3px_rgba(0,0,0,0.3)] rounded-xl w-full z-20 relative"
                                    /> */}
                                  </div>
                                  <div
                                    className="dd_menu4 rounded-xl z-30 absolute top-0 left-0 w-full h-[94%] justify-evenly items-end p-2 "
                                    onMouseMove={(e) => (
                                      $("#border_box_" + index).css(
                                        "top",
                                        "-10px"
                                      ),
                                      $("#border_box_" + index).css(
                                        "left",
                                        "-10px"
                                      ),
                                      $("#border_box2_" + index).css(
                                        "top",
                                        "8px"
                                      ),
                                      $("#border_box2_" + index).css(
                                        "left",
                                        "8px"
                                      ),
                                      $("#border_box_" + index).css(
                                        "transition",
                                        "0.7s"
                                      ),
                                      $("#border_box2_" + index).css(
                                        "transition",
                                        "0.7s"
                                      ),
                                      $("#border_box3_" + index).css(
                                        "transition",
                                        "0.7s"
                                      ),
                                      $("#border_box3_" + index).css(
                                        "transform",
                                        "scale(1.05)"
                                      ),
                                      $("#premium_box_" + index).css(
                                        "top",
                                        "15px"
                                      ),
                                      $("#premium_box_" + index).css(
                                        "left",
                                        "-45px"
                                      ),
                                      $("#premium_box_" + index).css(
                                        "transition",
                                        "0.7s"
                                      ),
                                      $("#own_box_" + index).css("top", "15px"),
                                      $("#own_box_" + index).css(
                                        "left",
                                        "-45px"
                                      ),
                                      $("#own_box_" + index).css(
                                        "transition",
                                        "0.7s"
                                      )
                                    )}
                                    onMouseLeave={() => (
                                      $("#border_box_" + index).css(
                                        "top",
                                        "0px"
                                      ),
                                      $("#border_box_" + index).css(
                                        "left",
                                        "0px"
                                      ),
                                      $("#border_box2_" + index).css(
                                        "top",
                                        "0px"
                                      ),
                                      $("#border_box2_" + index).css(
                                        "left",
                                        "0px"
                                      ),
                                      $("#border_box_" + index).css(
                                        "transition",
                                        "0.7s"
                                      ),
                                      $("#border_box2_" + index).css(
                                        "transition",
                                        "0.7s"
                                      ),
                                      $("#border_box3_" + index).css(
                                        "transition",
                                        "0.7s"
                                      ),
                                      $("#border_box3_" + index).css(
                                        "transform",
                                        "scale(1)"
                                      ),
                                      $("#premium_box_" + index).css(
                                        "top",
                                        "24px"
                                      ),
                                      $("#premium_box_" + index).css(
                                        "left",
                                        "-35px"
                                      ),
                                      $("#premium_box_" + index).css(
                                        "transition",
                                        "0.7s"
                                      ),
                                      $("#own_box_" + index).css("top", "24px"),
                                      $("#own_box_" + index).css(
                                        "left",
                                        "-35px"
                                      ),
                                      $("#own_box_" + index).css(
                                        "transition",
                                        "0.7s"
                                      )
                                    )}
                                  >
                                    {ownedTemp == 1 ? (
                                      <div
                                        onClick={() =>
                                          NavigateToSteps(template.id)
                                        }
                                        className="absolute box2 shadow-lg rounded-lg py-2 cursor-pointer JosefinSans text-md bg-[#01B2AC] hover:bg-[#0072b1] text-white w-[60%] flex justify-center items-center flex-wrap"
                                      >
                                        Use This Template
                                      </div>
                                    ) : user2.package_id === 1 &&
                                      template.is_paid === 1 ? (
                                      <div
                                        onClick={() => {
                                          setModelbox(true);
                                          setModelTemplateId(template.id);
                                          setModelTemplateName(template.name);
                                          setModelTemplateImage(template.image);
                                          setModelTemplatePrice(template.price);
                                        }}
                                        className="absolute box2 shadow-lg rounded-lg py-2 cursor-pointer JosefinSans text-md bg-[#01B2AC] hover:bg-[#0072b1] text-white w-[60%] flex justify-center items-center flex-wrap"
                                      >
                                        Pay This Template
                                      </div>
                                    ) : user2.package_id >= 2 &&
                                      user2.max_res_templates <=
                                      user2.current_res_usage &&
                                      template.is_paid === 1 ? (
                                      <div
                                        onClick={() => {
                                          setModelbox(true);
                                          setModelTemplateId(template.id);
                                          setModelTemplateName(template.name);
                                          setModelTemplateImage(template.image);
                                          setModelTemplatePrice(template.price);
                                        }}
                                        className="absolute box2 shadow-lg rounded-lg py-2 cursor-pointer JosefinSans text-md bg-[#01B2AC] hover:bg-[#0072b1] text-white w-[60%] flex justify-center items-center flex-wrap"
                                      >
                                        Pay This Template
                                      </div>
                                    ) : (
                                      <div
                                        onClick={() =>
                                          NavigateToSteps(template.id)
                                        }
                                        className="absolute box2 shadow-lg rounded-lg py-2 cursor-pointer JosefinSans text-md bg-[#01B2AC] hover:bg-[#0072b1] text-white w-[60%] flex justify-center items-center flex-wrap"
                                      >
                                        Use This Template
                                      </div>
                                    )}
                                  </div>
                                  <p className="cl_inner2 duration-300 transition-all Montserrat text-md text-black text-center mt-4 ">
                                    {template.name}
                                  </p>
                                  {user2.package_id === 1 &&
                                    template.is_paid === 1 ? (
                                    <p className="cl_inner2 duration-300 transition-all Montserrat text-md text-primary-blue font-bold text-center mt-2 ">
                                      $ {template.price}
                                    </p>
                                  ) : user2.package_id >= 2 &&
                                    user2.max_res_templates <=
                                    user2.current_res_usage &&
                                    template.is_paid === 1 ? (
                                    <p className="cl_inner2 duration-300 transition-all Montserrat text-md text-primary-blue font-bold text-center mt-2 ">
                                      $ {template.price}
                                    </p>
                                  ) : (
                                    <p className="cl_inner2 duration-300 transition-all Montserrat text-md text-primary-blue font-bold text-center mt-2 ">
                                      FREE
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                  ) : (
                    <h1 className="my-2 text-xl font-bold px-6">Loading....</h1>
                  )}
                  {isModalOpen && (
                    <TemplatesSlider
                      open={isModalOpen}
                      onClose={closeTemplatesModal}
                      templates={templates}
                      initialIndex={initialIndex}
                      document={"resume"}
                    />
                  )}
                </div>
                <div className="px-4 lg:px-10">
                  <h3 className="text-[#0072b1] font-Lexend font-bold text-2xl md:text-3xl px-0 mb-3">
                    Build Your Perfect Resume with
                    <span className="text-[#00caa5] ml-4 text-2xl md:text-3xl">
                      Professional Resume Template
                    </span>
                  </h3>
                  <p className="font-Lexend text-base mb-2">
                    AI Pro Resume offers several professional and free resume
                    templates. Whether you are a student, fresher, or
                    experienced professional, we have the best professional
                    resume templates for you. All our templates are
                    customizable; you can modify font, color, and layouts
                    according to your needs.
                  </p>
                  <p className="font-Lexend text-base mb-2">
                    All our templates are ATS-friendly. They can pass applicant
                    tracking systems. You are in the right place if you do not
                    know how to choose the perfect template from the two-column
                    resume template.{" "}
                  </p>
                  <h3 className="text-[#0072b1] font-Lexend font-bold text-xl md:text-2xl px-0 mb-3">
                    Steps to Create A Resume With Best Professional Resume
                    Template
                  </h3>
                  <p className="font-Lexend text-base mb-2">
                    Creating a professional resume takes a lot of time and
                    effort. However, with AI Pro Resume, you can easily create a
                    professional resume and cover letter. We have everything
                    from two-column resume templates​ to clean, simple resume
                    templates, resume portfolio templates, curriculum
                    templates​, basic resume templates, and simple modern resume
                    templates to meet your needs.{" "}
                  </p>
                  <p className="font-Lexend text-base mb-2">
                    Follow the steps below to design a resume that help you in
                    getting your dream job.{" "}
                  </p>
                  <ul className="font-Lexend text-base">
                    <li className="mb-1 list-disc list-inside">
                      Go to the AI pro resume home page.
                    </li>
                    <li className="mb-1 list-disc list-inside">
                      Click the login button and sign up for your account.
                    </li>
                    <li className="mb-1 list-disc list-inside">
                      Now go to resume options in the header of the website.
                    </li>
                    <li className="mb-1 list-disc list-inside">
                      Click and press to resume template and explore the
                      templates.
                    </li>
                    <li className="mb-1 list-disc list-inside">
                      Select any template you like.
                    </li>
                    <li className="mb-1 list-disc list-inside">
                      You will head to the next page with the template
                      customization options.
                    </li>
                    <li className="mb-1 list-disc list-inside">
                      On the right side of the screen, you will find the option
                      to edit your resume.
                    </li>
                    <li className="mb-1 list-disc list-inside">
                      On the left hand, you will get a preview of your resume.
                    </li>
                  </ul>
                  <h4 className="text-[#0072b1] font-Lexend font-bold text-lg md:text-xl px-0 mt-1 mb-2">
                    Fill all the details in the following sections:
                  </h4>
                  <ul className="font-Lexend text-base">
                    <li className="mb-1 list-disc list-inside">
                      <strong>Header: </strong> Add your name, email, contact
                      information, job position, LinkedIn URL, postal address,
                      country, state, and city name.
                    </li>
                    <li className="mb-1 list-disc list-inside">
                      <strong>Summary:</strong> Click on the summary sections
                      and write a small professional summary. When you start
                      writing your summary, AI-based suggestions will
                      automatically appear. If you want to use these
                      suggestions, simply click on them to add them to your
                      summary.
                    </li>
                    <li className="mb-1 list-disc list-inside">
                      <strong>Experience: </strong> At the experience sections,
                      click in to add a new section. List your previous job
                      experiences with dates, job titles, and responsibilities.
                      You can use AI-based suggestion features to create
                      incredible job responsibilities. It will appear in the
                      bulb icon on the right corner of the job responses
                      sections. <br />
                      Just click the icon and select your preferred job
                      responsibilities. Once you get it, click on that, and it
                      will appear in the job responsibility section. Make
                      changes to the responsibilities if you want to make it
                      more personalized.
                    </li>
                    <li className="mb-1 list-disc list-inside">
                      <strong>Education:</strong> Enter your educational
                      background, including degrees, institutions, grades, and
                      dates.
                    </li>
                    <li className="mb-1 list-disc list-inside">
                      <strong>Technical Skills: </strong>
                      Add relevant technical skills; if you want to add a custom
                      skill, type and press enter.
                    </li>
                    <li className="mb-1 list-disc list-inside">
                      <strong>Soft Skills:</strong>
                      List interpersonal skills, such as communication,
                      teamwork, or problem-solving.
                    </li>
                    <li className="mb-1 list-disc list-inside">
                      <strong>Certificates:</strong> Press add new and include
                      any certifications or professional development courses you
                      have completed.
                    </li>
                    <li className="mb-1 list-disc list-inside">
                      <strong>Honors and Awards:</strong> Select Add New and
                      highlight any awards or recognition you have received.
                    </li>
                    <li className="mb-1 list-disc list-inside">
                      <strong>Languages: </strong> Mention any languages you
                      speak or write fluently.
                    </li>
                    <li className="mb-1 list-disc list-inside">
                      <strong>References: </strong> Add references or indicate
                      availability upon request.
                    </li>
                    <li className="mb-1 list-disc list-inside">
                      <strong>Custom Section:</strong> If necessary, include any
                      additional information relevant to your career.
                    </li>
                  </ul>
                  <h3 className="text-[#0072b1] font-Lexend font-bold text-xl md:text-2xl px-0 mb-3">
                    Switch Templates
                  </h3>
                  <p className="font-Lexend text-base mb-2">
                    Now, after filling in all the details, if you think it's not
                    the right template and want to change it, no worries; you
                    can do it with just a single click. Click switch template,
                    and choose the one that suits your details best. That’s it.
                    Your complete data will be migrated to the new template. You
                    can also change color, font, and layout according to your
                    needs. You can even add pictures to your resume, as some of
                    our templates have pictures. Now, you have a professionally
                    crafted resume with a perfect resume template in no time.
                  </p>
                  <h3 className="text-[#0072b1] font-Lexend font-bold text-xl md:text-2xl px-0 mb-3">
                    Our Unique Features That Fit Your Needs
                  </h3>
                  <ol className="font-Lexend text-base">
                    <li className="mb-1 list-decimal list-inside">
                      Download your resume in PDF format.
                    </li>
                    <li className="mb-1 list-decimal list-inside">
                      Find matching cover letter templates to pair perfectly
                      with your resume. You will find that in our professional
                      cover letter template sections.
                    </li>
                    <li className="mb-1 list-decimal list-inside">
                      Work on the go with our mobile-friendly tools.
                    </li>
                    <li className="mb-1 list-decimal list-inside">
                      Save time with pre-made templates for fields like
                    </li>
                    <li className="mb-1 list-decimal list-inside">
                      Creative & Cultural Fields
                    </li>
                    <li className="mb-1 list-decimal list-inside">
                      Education & Learning
                    </li>
                    <li className="mb-1 list-decimal list-inside">
                      Engineering & Scientific
                    </li>
                    <li className="mb-1 list-decimal list-inside">
                      Food Service
                    </li>
                    <li className="mb-1 list-decimal list-inside">
                      Information Technology (IT)
                    </li>
                    <li className="mb-1 list-decimal list-inside">
                      Maintenance & Repair
                    </li>
                    <li className="mb-1 list-decimal list-inside">
                      Medicine Healthcare & Wellbeing
                    </li>
                    <li className="mb-1 list-decimal list-inside">
                      Office & Administrative
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
        <OurFaqs />
        {ads
          .filter((ad) => ad.slug === "resume-templates-bottom")
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

      <Footer />
    </div>
  );
}

export default Pages;
