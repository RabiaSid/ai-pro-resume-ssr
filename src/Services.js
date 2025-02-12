import React, { useState, useEffect } from "react";

import Header from "./Header";
import Footer from "./Footer";
import "react-awesome-slider/dist/styles.css";
import axios from "axios";
// Add to cart
import { useCart } from "./data/CartStore";
import { ApiService } from "./services/ApiService";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./services/Auth";
import ServicePageBanner from "./components/ServicePageBanner";

import OurFaqs from "./components/faq";
import LazyLoadImageComp from "./components/lazyLoadImage/lazyLoadImage";

const arrow_design_7 = "/images/arrow_design_7.webp";
const btn_arrow = "/images/btn_arrow.webp";
const pckg_img_bg = "/images/pckg_img_bg.webp";
const Services = () => {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const { addToCart, cart, removeFromCart } = useCart();
  const [packages, setPackages] = useState();
  const [userData, setUserData] = useState();
  const [ads, setAds] = useState([]);

  useEffect(() => {
    ApiService.getAllAdsWeb(user?.token)
      .then((response) => {
        setAds(response.data.data.ads);
        // console.log(response.data.data.ads);
      })
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    ApiService.showAllPackages(user?.token)
      .then((res) => {
        setPackages(res.data.data);
      })
      .catch((err) => console.log(err));

    // User Data
    ApiService.getUserDetails(user?.token)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${global.baseurl}/web-services`)
      .then((res) => {
        console.log(res.data.data.services);
        setServices(res.data.data.services);
      })
      .catch((err) => console.log(err));
  }, []);

  const userIntrestedInService = () => {
    ApiService.intrested_user(user?.token)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const PosterBanner = ({
    id,
    posterImage,
    cardHeading,
    cardDescription,
    otherDescription,
    price,
    discounted_price,
    dir,
  }) => {
    const [show_details, setshow_details] = useState(false);

    const ToggleServiceDetails = () => {
      setshow_details(!show_details);
    };

    return (
      <div className={`w-full lg:flex `}>
        <div className="lg:w-full">
          <div
            className={`sm:py-2 w-[100%] lg:w-[100%] lg:flex items-center justify-center relative px-4 lg:px-0 rounded-3xl lg:rounded-l-3xl ${dir === "rtl" ? "flex-row-reverse" : ""
              }`}
          >
            <div className={`z-10 flex flex-col h-auto sm:h-[400px] relative`}>
              <img
                src={pckg_img_bg}
                className="w-[full] sm:w-[550px] relative"
              />
              <div className="z-50 m-auto lg:m-0 w-[280px] sm:w-[350px] absolute animate-pulse left-[15%]">
                <LazyLoadImageComp
                  src={`${global.imageUrl + posterImage}`}
                  alt="My Image"
                  className=""
                />
              </div>
            </div>
            <div
              className={`h-auto sm:h-[400px] px-[10px] sm:py-3  lg:w-[650px] xl:w-[750px] rounded-lg font-Lexend  sm:mt-0`}
            >
              <div>
                <h1 className="text-[#0072B1] font_1 text-lg sm:text-2xl">
                  {cardHeading}
                </h1>
              </div>
              {/*  */}
              <div className="sm:mt-0 mt-6">
                <div
                  className="__services__feature m-1 text-justify"
                  dir="ltr"
                  dangerouslySetInnerHTML={{ __html: cardDescription }}
                ></div>
              </div>
              {/* Buttons */}
              <div className="flex flex-col gap-2 py-4 sm:py-2 relative top-1">
                <div className="flex items-center justify-start gap-2">
                  <div className="flex flex-col sm:flex sm:flex-row gap-2 sm:gap-4">
                    {cart.services.length > 0 &&
                      cart.services.find((item) => item.id === id) ? (
                      <div className={`flex items-center`}>
                        <button
                          className="bg-gray-300 text-gray-500 p-2 w-[200px] text-center rounded-3xl font_3 text-xs md:text-base ease-in duration-300 flex justify-center items-center mt-3"
                          onClick={() => removeFromCart("service", id)}
                        >
                          Remove From Cart
                          <RiDeleteBinLine className="text-lg" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div
                          className="btn-div bg-[#0072b1] text-[#fff] flex justify-center items-center p-2 w-[140px] sm:w-[150px] text-center rounded-3xl font_3 text-xs md:text-sm ease-in duration-300 gap-4 cursor-pointer"
                          onClick={() => {
                            if (user?.token) {
                              if (cart.services.length < 1) {
                                userIntrestedInService();
                              }
                              addToCart("service", {
                                id: id,
                                name: cardHeading,
                                image: posterImage,
                                price: price,
                                discounted_price: discounted_price,
                                description: otherDescription,
                                file: {},
                              });
                            } else {
                              navigate("/login");
                            }
                          }}
                        >
                          <span>Add to Cart</span>
                          <div>
                            <img src={btn_arrow} />
                          </div>
                        </div>
                      </>
                    )}
                    {cart.services.find((item) => item.id === id) && (
                      <Link
                        to={"/cart"}
                        className="bg-primary-green text-[#fff] flex justify-center items-center p-2 w-[150px] text-center rounded-3xl font_3 text-xs md:text-sm ease-in duration-300 gap-4 mt-3 cursor-pointer"
                      >
                        Checkout
                      </Link>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex sm:flex-row items-center justify-start gap-1 sm:gap-3">
                    <span
                      className={`${discounted_price > 0 ? "line-through" : ""
                        } text-black font-semibold text-xs sm:text-lg`}
                    >
                      USD {price}
                    </span>

                    <span className="text-[#01B2AC] font-bold text-xs sm:text-lg">
                      USD {discounted_price > 0 ? discounted_price : ""}
                    </span>
                  </div>
                </div>

                {show_details && (
                  <div
                    dangerouslySetInnerHTML={{ __html: otherDescription }}
                  ></div>
                )}
                <button
                  onClick={ToggleServiceDetails}
                  className="text-[#0072b1] flex items-start justify-start"
                >
                  {show_details ? "Hide Detail" : "View Detail"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* header */}
      <Header />

      <div className="container m-auto">
        <div className="w-full border h-[20%]">
          <ServicePageBanner
            startText={"Craft Your Success Story:"}
            startHeadingText={"Let’s Perfect  "}
            highLightedText={"Your Resume "}
            endText={"& Cover Letter Together"}
            description={
              "Writing a professional cover letter and resume can be a hectic task, and it will not guarantee you will pass the ATS checkers.  AI Pro Resume is here to cater to all your needs by offering top-notch professional cover letter writing service and resume writing services. We also provide cover letter review and professional resume review services to assist you in creating out-class resumes and cover letters. Our experts analyze your documents and provide suggestions based on your job positions and career."
            }
          />
        </div>

        {ads
          .filter((ad) => ad.slug === "service-main-page-top")
          .map((ad) => (
            <div key={ad.id} className="">
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

        <section className="w-full py-5 px-0 sm:px-10 2xl:px-10 flex flex-wrap flex-col justify-between align-middle">
          {/* Image Row 1 */}
          {services.map((service, idx) => {
            if (!service.status) return;
            return (
              <PosterBanner
                id={service.id}
                arrowImage={arrow_design_7}
                posterImage={service.image}
                cardHeading={service.name}
                cardDescription={service.description}
                otherHeading={service.other_heading}
                otherDescription={service.other_description}
                discount={service.discount}
                buttonText={"CONTACT A RESUME WRITING"}
                buttonLink={"#"}
                price={service.price}
                discounted_price={service.discounted_price}
                dir={idx % 2 === 0 ? "ltr" : "rtl"}
              />
            );
          })}
        </section>
        <div className="px-4 lg:px-10">
          <h3 className="text-[#0072b1] font-Lexend font-bold text-xl md:text-2xl px-0 mb-3">
            Steps To Get Our Professional Resume and Cover Letter Writing
            Service
          </h3>
          <p className="font-Lexend text-base mb-2">
            If you want to use our professional resume writing services and
            professional cover letter writing services, then follow the steps
            below:
          </p>
          <ul className="font-Lexend text-base">
            <li className="mb-1 list-disc list-inside">
              Go to the home page of AI Pro Resume and log in to your account.
            </li>
            <li className="mb-1 list-disc list-inside">
              Now, head to the service page present in the header of the
              website.
            </li>
            <li className="mb-1 list-disc list-inside">
              You will notice the Resume and Cover Letter Writing Service on
              that page.
            </li>
            <li className="mb-1 list-disc list-inside">
              Choose the service you want and click on add to cart.
            </li>
            <li className="mb-1 list-disc list-inside">
              The checkout button appears next to it. Click on it.
            </li>
            <li className="mb-1 list-disc list-inside">
              On the checkout page, you must upload your resume or cover letter.
            </li>
            <li className="mb-1 list-disc list-inside">
              You will find the upload option beside the delete option.
            </li>
            <li className="mb-1 list-disc list-inside">
              Once you are done with the file upload.
            </li>
            <li className="mb-1 list-disc list-inside">
              Mark the checkbox and proceed to checkout.
            </li>
            <li className="mb-1 list-disc list-inside">
              Once your resume or cover letter is ready, you will receive it via
              email within 2 days.
            </li>
            <li className="mb-1 list-disc list-inside">
              You can also download your completed resume or cover letter
              directly from the dashboard.
            </li>
            <li className="mb-1 list-disc list-inside">
              Go to the dashboard and click on My Services to access your file.
            </li>
          </ul>
          <h3 className="text-[#0072b1] font-Lexend font-bold text-xl md:text-2xl px-0 mb-3">
            Revision Process:
          </h3>
          <p className="font-Lexend text-base mb-2">
            We offer two free revisions for each premium service. If you need
            updates to your document after delivery, follow these steps:
          </p>
          <ul className="font-Lexend text-base">
            <li className="mb-1 list-disc list-inside">
              Log in to your account and navigate to the dashboard.
            </li>
            <li className="mb-1 list-disc list-inside">
              You will see four headings: All Services, In Progress, Delivered,
              and Revisions.
            </li>
            <li className="mb-1 list-disc list-inside">
              Click on Delivered and locate the Revision icon (a round arrow)
              next to your completed document.
            </li>
            <li className="mb-1 list-disc list-inside">
              Click the icon to open a small text box.
            </li>
            <li className="mb-1 list-disc list-inside">
              Enter the changes or updates you want to make and click Okay.
            </li>
            <li className="mb-1 list-disc list-inside">
              Once the revised document is ready, it will appear under the
              Revisions section. You can download it directly from there.
            </li>
          </ul>
          <p className="font-Lexend text-base mb-2">
            <strong>Tip: </strong> Each service includes two revision tokens.
            Once you have used both, you must repurchase the service or package
            for additional changes.
          </p>
          <h3 className="text-[#0072b1] font-Lexend font-bold text-xl md:text-2xl px-0 mb-3">
            Steps to Get a Professional Resume or Cover Letter Review Services
          </h3>
          <ul className="font-Lexend text-base">
            <li className="mb-1 list-disc list-inside">
              Log in to your account and navigate to My Services from the
              header.
            </li>
            <li className="mb-1 list-disc list-inside">
              Select the professional resume review or cover letter review
              service you want.
            </li>
            <li className="mb-1 list-disc list-inside">
              Click on add to cart, and the checkout option will appear.
            </li>
            <li className="mb-1 list-disc list-inside">
              Select the checkout button, and you will head to the checkout
              page.
            </li>
            <li className="mb-1 list-disc list-inside">
              Upload the resume or cover letter you want our experts to review.
            </li>
            <li className="mb-1 list-disc list-inside">
              Complete the payment process to confirm your order. You can
              purchase through coins and by buying the most popular or premium
              package.
            </li>
            <li className="mb-1 list-disc list-inside">
              Within 2 days, you will receive an email with detailed suggestions
              and improvements for your resume or cover letter.
            </li>
            <li className="mb-1 list-disc list-inside">
              You can also access the reviewed document from the dashboard under
              my services, where you will find a download option.
            </li>
          </ul>
        </div>
      </div>

      <OurFaqs />

      <Footer />
    </div>
  );
};

export default Services;
