import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { IoIosEye } from "react-icons/io";
import BannerComponent from "./components/BannerComponent";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import "react-awesome-slider/dist/styles.css";
import axios from "axios";
import Cookies from "js-cookie";
import swal from "sweetalert";
import LoadingSpiner from "./components/LoadingSpinner";
import { BiSearch } from "react-icons/bi";
import { useAuth } from "./services/Auth";
import TemplateSliderCover from "./components/shared-components/TemplateSliderCover";
// import search_symbol from "/images/search_symbol.webp";
// import premium from "/images/premium.webp";
import $ from "jquery";
import { ApiService } from "./services/ApiService";
import { useCart } from "./data/CartStore";
import { RxCross1 } from "react-icons/rx";
import { LuPackagePlus } from "react-icons/lu";
import { CgTemplate } from "react-icons/cg";
import { BsBoxSeamFill } from "react-icons/bs";
import { GoChecklist } from "react-icons/go";
import OurFaqs from "./components/faq";
// import brand from "/images/brand.webp";
import LazyLoadImageComp from "./components/lazyLoadImage/lazyLoadImage";

// import search_symbol from "/images/search_symbol.webp";
// import premium from "/images/premium.webp";
// import brand from "/images/brand.webp";

const search_symbol = "/images/search_symbol.webp";
const premium = "/images/premium.webp";
const brand = "/images/brand.webp";

function Pages() {
  const { user } = useAuth();
  const { addToCart, cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [top_categories, set_top_categories] = useState([]);
  const [templates, set_templates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [selectedCatName, setSelectedCatName] = useState("");
  const [user2, set_user] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);
  const [ads, setAds] = useState([]);
  const [modelbox, setModelbox] = useState(false);
  const [modelTemplateId, setModelTemplateId] = useState();
  const [modelTemplateName, setModelTemplateName] = useState();
  const [modelTemplateImage, setModelTemplateImage] = useState();
  const [modelTemplatePrice, setModelTemplatePrice] = useState();
  const [userPurchasedTemplates, setUserPurchasedTemplates] = useState([]);
  const [coverTemplatesListing, setCoverTemplatesListing] = useState([]);

  useEffect(() => {
    ApiService.getCoverTemplatesListingUser(user?.token)
      .then((res) => {
        setCoverTemplatesListing(res?.data?.data);
      })
      .catch((err) => { });
  }, []);

  // useEffect(() => {
  //   const purchasedTemplateIds = user2?.purchased_cover_templates?.map(
  //     (purchase) => purchase?.id
  //   );
  //   const ownTemplates = coverTemplatesListing?.filter((template) =>
  //     purchasedTemplateIds?.includes(template?.id)
  //   );
  //   setUserPurchasedTemplates(ownTemplates);
  // }, [coverTemplatesListing, user2]);

  useEffect(() => {
    ApiService.getAllAdsWeb(user?.token)
      .then((response) => {
        setAds(response.data.data.ads);
      })
      .catch((err) => { });
  }, []);

  const handleKeyUp = (event) => {
    // Update the state with the input value
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    axios
      .get(global.baseurl + "/show-cover-templates")
      .then((response) => {
        set_templates(response.data.data);
      })
      .catch((error) => { });

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
      .catch((err) => { });
  }, []);

  const NavigateToSteps = (template_id) => {
    Cookies.remove("newResumeId");
    Cookies.remove("resumeExampleId");
    Cookies.remove("freshCoverId");
    Cookies.remove("newExampleCoverId");
    navigate(`/create-cover-letter/formatting`, {
      state: { selectedTemplateId: template_id, isExample: false },
    });
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
  const openTemplatesModal = (initialIndex) => {
    setIsModalOpen(true);
    setInitialIndex(initialIndex);
  };
  const closeTemplatesModal = () => {
    setIsModalOpen(false);
  };

  const handleCheckout = () => {
    addToCart("template", {
      id: modelTemplateId,
      name: modelTemplateName,
      doc: "cover",
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
      {/* header */}
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
              e.stopPropagation(); // Prevents the click event from propagating to the parent
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
            <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-0 p-4 sm:px-4 sm:py-8 lg:px-5 lg:py-10">
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
      <section className="w-full bg-[white] ">
        <BannerComponent
          descriptionText={
            <>
              AI Pro Resume offers the best cover letter templates to assist you
              in getting your dream job. Try our sample cover letter templates
              to save time and effort. We have pre-written resumes and
              professional cover letter template examples that give your cover
              letter a polished and proficient look.
              <br />
              <br />
              Our AI-powered suggestions and customizable cover letter templates
              assist you in effortlessly displaying your skills and personality.
              Whether you are looking for a short cover letter template,
              academic cover letter template, or AI cover letter generator, your
              search ends at AI Pro Resume. Get the best cover letter templates
              and shine in the job market.
            </>
          }
          startText={"Mark your First "}
          highlightText={"Impression impactful with our unique "}
          endText={"Cover Letter templates."}
          clickHere={"Resume Templates"}
          link={"/resume-templates"}
        />

        <div className="bg-white border border-1 border-[#00caa5] w-[90%] sm:w-[70%]  lg:w-[665px] m-auto flex lg:justify-between items-center shadow-[0px_0px_30px_0px_rgba(0,0,0,0.2)] rounded-full   text-[#13b6b5] relative top-[40px] p-2">
          <BiSearch
            size={32}
            className="cursor-pointer hover:scale-125 duration-300 transition-all"
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
      <section className="w-full py-10 bg-[white]">
        <div className="flex justify-start items-start flex-wrap ">
          <div className="w-full">
            <div className="flex justify-evenly items-start px-0 lg:px-10 text-slate-600 cursor-pointer flex-wrap my-2">
              <div className="flex flex-col gap-2">
                <h1 className="font_1 text-4xl text-[#0072b1]">
                  {selectedCatName}
                </h1>

                <div
                  className={`${templates.length === 0
                    ? ""
                    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                    }`}
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
                        if (user2?.purchased_cover_templates?.length) {
                          user2?.purchased_cover_templates
                            ?.filter(
                              (temp) => temp.pivot.template_id == template.id
                            )
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
                                    className=" bg-gradient-to-r  from-[#01B2AC]/80 to-[#00caa5]/80 px-2 h-6  right-12 top-4 rounded-sm gap-2 flex items-center justify-center absolute z-50"
                                  // onClick={() => openTemplatesModal(index)}
                                  >
                                    <IoIosEye color="#fff" size={22} />
                                    <span className="text-sm text-white font-medium ">
                                      {uniqueRandomNumber}
                                    </span>
                                  </div>
                                  <div
                                    className="bg-[#0072b1] w-6 h-6  right-4 top-4 rounded-full flex items-center justify-center absolute z-50"
                                    onClick={() => openTemplatesModal(index)}
                                  >
                                    <img src={search_symbol} />
                                  </div>
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
                                  ) : template.is_paid === 1 ? (
                                    <div
                                      className="flex 
                                      bg-gradient-to-r from-[#01B2AC] to-[#0072B1] 
                                      w-[150px] h-8 absolute left-[-35px] top-6 text-white -rotate-45 justify-center items-center z-50"
                                      id={"premium_box_" + index}
                                      style={{
                                        clipPath:
                                          "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
                                      }}
                                    >
                                      <img src={premium} alt="premium icon" />
                                      <span>Premium</span>
                                    </div>
                                  ) : null}
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
                                      user2.max_cover_templates <=
                                      user2.current_cover_usage &&
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
                                    user2.max_cover_templates <=
                                    user2.current_cover_usage &&
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
                    <TemplateSliderCover
                      open={isModalOpen}
                      onClose={closeTemplatesModal}
                      templates={templates}
                      initialIndex={initialIndex}
                    />
                  )}
                </div>
                <div className="px-4 lg:px-10">
                  <h3 className="text-[#0072b1] font-Lexend font-bold text-2xl md:text-3xl px-0 mb-3">
                    Steps To Create a Cover Letter with Professional
                    <span className="text-[#00caa5] ml-4 text-2xl md:text-3xl">
                      Cover Letter Templates
                    </span>
                  </h3>
                  <p className="font-Lexend text-base mb-2">
                    Start creating your cover letter by logging into your AI Pro
                    Resume account. Once logged in, go to the Tools section in
                    the header. Click on Write a cover letter to begin. A new
                    page will open. On the left side, you will see a preview of
                    your cover letter; on the right, you will find the input
                    fields. Ai Pro Resume offers auto-generated cover letter
                    options to speed up your cover letter creation process. You
                    must provide your hiring manager details, company name, and
                    job position.
                  </p>
                  <h3 className="text-[#0072b1] font-Lexend font-bold text-xl md:text-2xl px-0 mb-3">
                    Resume-Based Cover Letter Creation
                  </h3>
                  <ul className="font-Lexend text-base">
                    <li className="mb-1 list-disc list-inside">
                      If you create your resume using AI Pro Resume, your cover
                      letter is just a click away.
                    </li>
                    <li className="mb-1 list-disc list-inside">
                      Select Write a Cover Letter, and we will generate a
                      polished cover letter using the details from your resume.
                      You must select the job title, add the job description,
                      and tick the check box beneath the job description
                      section.
                    </li>
                    <li className="mb-1 list-disc list-inside">
                      This option eliminates the need to add extra information,
                      saving you time while ensuring your cover letter
                      highlights your skills and accomplishments.{" "}
                    </li>
                    <li className="mb-1 list-disc list-inside">
                      Now add the hiring manager details and company name you
                      are applying to and click on generate.
                    </li>
                    <li className="mb-1 list-disc list-inside">
                      Within seconds, you will have your professionally
                      AI-generated cover letter.
                    </li>
                  </ul>
                  <h3 className="text-[#0072b1] font-Lexend font-bold text-xl md:text-2xl px-0 mb-3">
                    Add Your Signature
                  </h3>
                  <p className="font-Lexend text-base mb-2">
                    Go to the Signatures section. You will have three options to
                    create your signature:
                  </p>
                  <ul className="font-Lexend text-base">
                    <li className="mb-1 list-disc list-inside">
                      <strong>Draw:</strong> Use your mouse or touchscreen to
                      draw your signature.
                    </li>
                    <li className="mb-1 list-disc list-inside">
                      <strong>Upload:</strong> Upload an image of your
                      signature.
                    </li>
                    <li className="mb-1 list-disc list-inside">
                      <strong>Type:</strong> simply type your name.
                    </li>
                  </ul>
                  <p className="font-Lexend text-base mb-2">
                    After creating your signature, click Save to apply it to
                    your cover letter
                  </p>

                  <h3 className="text-[#0072b1] font-Lexend font-bold text-xl md:text-2xl px-0 mb-3">
                    Switch Templates
                  </h3>
                  <p className="font-Lexend text-base mb-2">
                    AI Pro Resume offers a variety of professional cover letter
                    templates from which to select. You can switch templates
                    anytime if you change your mind while making your cover
                    letter and want a different look. Just go to the Switch
                    Template section and choose your preferred design.
                  </p>

                  <h3 className="text-[#0072b1] font-Lexend font-bold text-xl md:text-2xl px-0 mb-3">
                    Customize Fonts and Theme
                  </h3>
                  <p className="font-Lexend text-base mb-2">
                    Further, personalize your cover letter by adjusting the
                    following:
                  </p>
                  <ul className="font-Lexend text-base">
                    <li className="mb-1 list-disc list-inside">
                      <strong>Font Style:</strong> Choose your preferred writing
                      style.
                    </li>
                    <li className="mb-1 list-disc list-inside">
                      <strong>Font Size:</strong> Adjust the size of the text
                      for readability.
                    </li>
                    <li className="mb-1 list-disc list-inside">
                      <strong>Themes:</strong> Select a theme and color scheme
                      that matches your professional brand.
                    </li>
                  </ul>

                  <h3 className="text-[#0072b1] font-Lexend font-bold text-xl md:text-2xl px-0 mb-3">
                    Download or Share Your Cover Letter
                  </h3>
                  <p className="font-Lexend text-base mb-2">
                    Once satisfied with your cover letter, click the Download
                    button to save it as a PDF.
                  </p>
                  <p className="font-Lexend text-base mb-2">
                    You can also directly share your cover letter through:
                  </p>
                  <ul className="font-Lexend text-base">
                    <li className="mb-1 list-disc list-inside">Email</li>
                    <li className="mb-1 list-disc list-inside">WhatsApp</li>
                    <li className="mb-1 list-disc list-inside">Facebook</li>
                    <li className="mb-1 list-disc list-inside">LinkedIn</li>
                  </ul>
                  <p className="font-Lexend text-base mb-2">
                    The duplicate option allows you to make additional cover
                    letter versions without overwriting the original.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <OurFaqs />
        {ads
          .filter((ad) => ad.slug === "cover-letter-templates-bottom")
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

      {/* footer */}
      <Footer />
    </div>
  );
}

export default Pages;
