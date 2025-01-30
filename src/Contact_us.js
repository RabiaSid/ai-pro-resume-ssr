import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-awesome-slider/dist/styles.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import axios from "axios";
import {
  BiLoaderAlt,
  BiSolidPhone,
  BiMailSend,
  BiSolidMap,
  BiLogoFacebook,
  BiLogoTwitter,
  BiLogoInstagram,
  BiLogoLinkedin,
  BiLogoPinterest,
} from "react-icons/bi";
import Swal from "sweetalert";
import ServicePageBanner from "./components/ServicePageBanner";
import ReCAPTCHA from "react-google-recaptcha";
import { ApiService } from "./services/ApiService";
import { useAuth } from "./services/Auth";

function Pages() {
  const [our_settings, set_our_settings] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
  };

  useEffect(() => {
    axios
      .get(global.baseurl + "/our-settings")
      .then((response) => {
        set_our_settings(response.data.data.settings);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const contact_submit = () => {
    if (!verified) {
      setCaptchaError("Please verify that you are a human!");
      return;
    }
    var name = document.getElementById("name").value;
    var phone = phoneNumber;
    var email = document.getElementById("email").value;
    var how = document.getElementById("how").value;
    document.getElementById("contact_button").style.display = "none";
    document.getElementById("processing_loader").style.display = "flex";

    const article = {
      name: name,
      email: email,
      contact_no: phone,
      message: how,
    };
    axios
      .post(global.baseurl + "/contact-us", article)
      .then((responsee) => {
        console.log(responsee);
        Swal({
          title: "Congratulations!",
          text: responsee.data.message,
          icon: "success",
        });
        document.getElementById("contact_button").style.display = "block";
        document.getElementById("processing_loader").style.display = "none";

        document.getElementById("name").value = "";
        setPhoneNumber("");
        document.getElementById("email").value = "";
        document.getElementById("how").value = "";
      })
      .catch((error) => {
        console.log(error);
        Swal({
          title: "Failed!",
          text: error.response.data.message,
          icon: "error",
        });
        document.getElementById("contact_button").style.display = "block";
        document.getElementById("processing_loader").style.display = "none";
      });
  };

  const [captchaError, setCaptchaError] = useState("");
  const [verified, setVerified] = useState(false);

  const handleCheckCaptcha = () => {
    setVerified(true);
    setCaptchaError("");
  };

  // Reset the reCAPTCHA value after a certain time
  const resetRecaptchaValue = () => {
    setVerified(null);
  };

  // Set a timeout to reset the reCAPTCHA value after 5 minutes (adjust as needed)
  const TIMEOUT_DURATION = 1 * 60 * 1000; // 5 minutes in milliseconds
  let timeoutId;

  const handleRecaptchaTimeout = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(resetRecaptchaValue, TIMEOUT_DURATION);
  };

  const [ads, setAds] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    ApiService.getAllAdsWeb(user?.token)
      .then((response) => {
        setAds(response.data.data.ads);
        console.log(response.data.data.ads);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {/* header */}
      <Header />

      <div className="w-full h-[20%]">
        <ServicePageBanner
          startText={""}
          startHeadingText={"Contact Us-Connect with a"}
          highLightedText={"AI Resume Builder"}
          endText={"for Personalized Career Help"}
          description={""}
        />
      </div>

      {ads
        .filter((ad) => ad.slug === "page-header-top")
        .map((ad) => (
          <div key={ad.id} className="flex justify-center my-4">
            {ad.is_script === 0 ? (
              <a href={`${ad.ad_url}`} target="blank">
                <img
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

      <section className="w-full px-2 md:px-4 lg:px-20 2xl:px-40 pb-20 lg:pb-10">
        <div className="w-full  xl:h-[900px] relative bottom-0 rounded-2xl md:mt-[-50px] lg:mt-0 sm:px-4 lg:px-10 flex flex-wrap justify-between items-center align-middle ">
          <div className="w-full xl:w-[60%]">
            <div className="md:bg-gradient-to-t from-[#0072b1] to-[#00caa5] rounded-t-2xl rounded-b-2xl lg:rounded-2xl sm:px-4 h-[600px] relative bottom-[-20px] xl:bottom-0">
              <div className="bg-white shadow-2xl md:shadow-xl rounded-2xl md:px-4 lg:px-16 py-10 lg:py-20 relative lg:bottom-[100px] border">
                <h1 className="text-gray-700 font-bold font-Lexend text-xl md:text-2xl lg:text-3xl mb-6 lg:mb-10 px-2 md:px-0">
                  Send us a message
                </h1>
                <div className="py-4 font-Lexend px-2 md:px-0">
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 border-b-2 border-gray-300 focus:outline-none focus:border-teal-500 transition duration-300 ease-in-out rounded-md"
                    placeholder="Full Name"
                  />
                </div>
                <div className="py-4 font-Lexend px-2 md:px-0">
                  <PhoneInput
                    onChange={handlePhoneNumberChange}
                    value={phoneNumber}
                    className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 border-b-2 border-gray-300 focus:outline-none focus:border-teal-500 transition duration-300 ease-in-out rounded-md"
                  />
                </div>
                <div className="py-4 font-Lexend px-2 md:px-0">
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 border-b-2 border-gray-300 focus:outline-none focus:border-teal-500 transition duration-300 ease-in-out rounded-md"
                    placeholder="Email"
                  />
                </div>
                <div className="py-4 font-Lexend px-2 md:px-0">
                  <textarea
                    id="how"
                    rows={4}
                    className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 border-b-2 border-gray-300 focus:outline-none focus:border-teal-500 transition duration-300 ease-in-out rounded-md"
                    placeholder="How can we help you?"
                  />
                </div>
                <div className="py-8 flex flex-row-reverse">
                  <div className="w-full flex flex-col sm:flex sm:flex-row items-center justify-center gap-10">
                    {/* Captcha */}
                    <div className="flex flex-col items-start mt-4">
                      <span className="text-red-500 text-sm font-Lexend">
                        {captchaError}
                      </span>
                      <ReCAPTCHA
                        sitekey={global.captcha_sitekey}
                        onChange={(val) => {
                          handleCheckCaptcha(val);
                          handleRecaptchaTimeout();
                        }}
                      />
                    </div>
                    <button
                      id="contact_button"
                      onClick={() => contact_submit()}
                      className="bg-[#0072b1] text-white hover:bg-[#00caa5] transition-all duration-150 ease-in font-Lexend text-lg px-8 py-2 rounded-full mt-5"
                      type="button"
                    >
                      SUBMIT
                    </button>
                    <button
                      id="processing_loader"
                      style={{ display: "none" }}
                      className=" bg-[#0072b1] text-white hover:bg-[#00caa5] transition-all duration-150 ease-in font-Lexend text-lg px-8 py-2 rounded-full flex font-Lexend"
                      type="button"
                    >
                      <BiLoaderAlt size={28} className="mr-2 animate-spin" />{" "}
                      Processing...
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full xl:w-[40%] lg:w-[50%] pt-20  py-2">
            <div className="flex justify-center items-center flex-wrap">
              <div className="px-2 sm:px-10 md:pt-30 pt-32 sm:pt-16 lg:py-10">
                <h1 className="text-teal-500 font-bold text-xl ml-0 lg:text-3xl mb-5 lg:mb-10 font-Lexend p-2">
                  Contact Information
                </h1>
                <div className="py-2 px-2 flex items-center font-Lexend flex-wrap">
                  <BiSolidPhone className="text-teal-500 text-3xl mr-2 lg:text-4xl" />
                  <a
                    href={`tel:${our_settings.contact_number}`}
                    className="text-gray-900 font-medium ml-3 lg:ml-2 text-md lg:text-xl flex items-center"
                  >
                    {our_settings.contact_number}
                  </a>
                  {/* <div className="w-full ml-[38px] lg:ml-[45px]">
                    <a
                      href={`tel:+1 (437) 755 -1410`}
                      className="text-gray-900 font-medium ml-3 lg:ml-2 text-lg lg:text-xl flex items-center"
                    >
                      +1 (437) 755 -1410
                    </a>
                  </div> */}
                </div>
                <div className="py-2 px-2 flex items-center font-Lexend">
                  <BiMailSend className="text-teal-500 text-3xl mr-2 lg:text-4xl" />
                  <a
                    href={`mailto:${our_settings.website_email}`}
                    className="text-gray-900 font-medium ml-3 lg:ml-2 text-md lg:text-xl flex items-center"
                  >
                    {our_settings.website_email}
                  </a>
                </div>
                <div className="py-2 px-2 flex items-center font-Lexend">
                  <BiSolidMap className="text-teal-500 text-4xl mr-2 lg:text-5xl" />
                  <span className="text-gray-900 font-medium ml-3 lg:ml-2 text-md lg:text-xl flex items-center">
                    {our_settings.location_address}
                  </span>
                </div>
                <h1 className="text-gray-700 font-medium font-Lexend ml-0 lg:ml-0 text-xl my-10">
                  Follow Us
                </h1>
                <div className="flex item-center justify-start text-5xl lg:text-6xl my-8">
                  <a
                    target="_blank"
                    href={our_settings.facebook_account_link}
                    className="text-[#0072b1] hover:text-[#00caa5]"
                  >
                    <BiLogoFacebook className="rounded-full border-2 p-2 mr-4 hover:bg-[#0072b1] border-[#0072b1]" />
                  </a>
                  {/* <a
                    target="_blank"
                    href={our_settings.twitter_account_link}
                    className="text-[#0072b1] hover:text-[#00caa5]"
                  >
                    <BiLogoTwitter className="rounded-full border-2 p-2 mr-4 hover:bg-[#0072b1] border-[#0072b1]" />
                  </a> */}
                  <a
                    target="_blank"
                    href={our_settings.instagram_account_link}
                    className="text-[#0072b1] hover:text-[#00caa5]"
                  >
                    <BiLogoInstagram className="rounded-full border-2 p-2 mr-4 hover:bg-[#0072b1] border-[#0072b1]" />
                  </a>
                  <a
                    target="_blank"
                    href={our_settings.linkedin_account_link}
                    className="text-[#0072b1] hover:text-[#00caa5]"
                  >
                    <BiLogoLinkedin className="rounded-full border-2 p-2 mr-4 hover:bg-[#0072b1] border-[#0072b1]" />
                  </a>
                  <a
                    target="_blank"
                    href="https://www.pinterest.ca/aiproresume/"
                    className="text-[#0072b1] hover:text-[#00caa5]"
                  >
                    <BiLogoPinterest className="rounded-full border-2 p-2 mr-4 hover:bg-[#0072b1] border-[#0072b1]" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* footer */}
      <Footer />
    </div>
  );
}

export default Pages;
