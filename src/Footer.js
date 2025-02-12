import React, { useEffect, useState } from "react";
// import payment_logos from "/images/pay_logos.webp";
import {
  BiLogoFacebook,
  BiLogoTwitter,
  BiLogoInstagram,
  BiLogoLinkedin,
  BiLogoPinterest,
} from "react-icons/bi";
import { Link } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import { ApiService } from "./services/ApiService";
import swal from "sweetalert";
import { useAuth } from "./services/Auth";
// import Logo from "/images/logo_resume_white.webp";
import { getCurrentYear } from "./utils/dateUtils";

const payment_logos = "/images/pay_logos.webp"
const Logo = "/images/logo_resume_white.webp";

function Footer() {
  const [show_pages, set_show_pages] = useState([]);
  const [our_settings_random_blogs, set_our_settings_random_blogs] = useState(
    []
  );
  const [our_settings, set_our_settings] = useState([]);
  const { user } = useAuth();
  const [userEmail, setUserEmail] = useState("");
  const [IsPending, setIsPending] = useState(false);
  const [UserSettings, setUserSettings] = useState();

  useEffect(() => {
    ApiService.getSettingForWebsite(user).then((response) => {
      setUserSettings(response.data.data.settings);
    });
  }, []);

  useEffect(() => {
    axios
      .get(global.baseurl + "/show-pages")
      .then((response) => {
        set_show_pages(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

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

  const handleChange = (e) => {
    setUserEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);

    ApiService.subscribeNewsLetter(userEmail)
      .then((res) => {
        swal({
          title: res.data.message,
          icon: "success",
        });
        setIsPending(false);
      })
      .catch((err) => {
        console.log(err);
        swal({
          title: err.response.data.message,
          icon: "warning",
          dangerMode: true,
        });
        setIsPending(false);
      });
  };

  return (
    <footer className="bg-[#0072b1] text-white z-50">
      <div className="p-6">
        <div className="grid md:grid-cols-[30%,70%] gap-6">
          <div className="flex flex-col items-start justify-between border-gray-400 border-r-[0px] lg:border-r-[2px] pr-0 lg:pr-5">
            <div>
              <Link
                to="/"
                className="flex flex-wrap justify-center xl:justify-start"
              >
                <img src={Logo} alt="My Image" width={200} className="logo" />
              </Link>
              <div className="mt-4">
                <p className="text-white text-sm md:text-lg font-Lexend">
                  {/* aiproresume@gmail.com */}
                  {UserSettings?.website_email}
                </p>
                <p className="text-white text-sm md:text-lg font-Lexend">
                  {/* 0333-1234567 */}
                  {UserSettings?.contact_number}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="w-full mt-5 md:mt-0 ">
              <div className="flex items-center bg-[#0072b1] border-2 border-white rounded-3xl text-white w-full max-w-full ">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  id="email_id"
                  onChange={handleChange}
                  className="flex-1 bg-transparent text-white outline-none text-xs lg:text-base px-1 xl:px-3 placeholder:text-white focus:text-white transition-all duration-300 ease-in"
                />
                <button
                  type="submit"
                  className={`bg-[#00caa5] opacity-100 text-white font-semibold min-w-[40px] text-[12px] lg:text-sm px-1 xl:px-5 py-2 rounded-r-3xl transition-all duration-300 ease-in hover:opacity-80 ${IsPending ? "cursor-not-allowed opacity-50" : ""
                    }`}
                  disabled={IsPending}
                >
                  {IsPending ? "Loading..." : "GET STARTED"}
                </button>
              </div>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 sm:gap-4">
            <div className="flex flex-col gap-2 sm:gap-6">
              <h1 className="font_1 w-full">QUICK LINKS</h1>

              <ul className="text-white flex flex-col gap-4">
                <li className="">
                  <Link
                    to={"/services"}
                    className="hover:text-[#00caa5] font-Lexend font-light text-base"
                  >
                    {" "}
                    Services
                  </Link>
                </li>
                <li className="">
                  <Link
                    to={"/packages"}
                    className="hover:text-[#00caa5] font-Lexend font-light text-base"
                  >
                    Pricing
                  </Link>
                </li>
                {user?.token ? (
                  <li className="">
                    {" "}
                    <Link
                      className="hover:text-[#00caa5] font-Lexend font-light text-base"
                      to={"/resume/formatting"}
                      state={{
                        isExample: false,
                        selectedTemplateId: 3,
                      }}
                    >
                      Create a Resume
                    </Link>
                  </li>
                ) : (
                  <li className="">
                    {" "}
                    <Link
                      to={"/login"}
                      className="hover:text-[#00caa5] font-Lexend font-light text-base"
                    >
                      Create a Resume
                    </Link>
                  </li>
                )}

                {user?.token ? (
                  <li className="">
                    <Link
                      className="hover:text-[#00caa5] font-Lexend font-light text-base"
                      to={"/create-cover-letter/formatting"}
                      state={{
                        selectedTemplateId: 1,
                        isExample: false,
                      }}
                    >
                      Create a Cover Letter
                    </Link>
                  </li>
                ) : (
                  <li className="">
                    <Link
                      to={"/login"}
                      className="hover:text-[#00caa5] font-Lexend font-light text-base"
                    >
                      Create a Cover letter
                    </Link>
                  </li>
                )}
                {user?.token ? (
                  <li className="">
                    {" "}
                    <Link
                      className="hover:text-[#00caa5] font-Lexend font-light text-base"
                      to={"/dashboard"}
                    >
                      Dashboard
                    </Link>
                  </li>
                ) : (
                  <li className="">
                    {" "}
                    <Link
                      to={"/login"}
                      className="hover:text-[#00caa5] font-Lexend font-light text-base"
                    >
                      Dashboard
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <div className="flex flex-col gap-2 sm:gap-6">
              <h1 className="font_1 w-full">RESOURCES</h1>
              <ul className="text-white flex flex-col gap-4">
                <li className="">
                  <Link
                    to={"/resume-templates"}
                    className="hover:text-[#00caa5] font-Lexend font-light text-base"
                  >
                    Resume Templates
                  </Link>
                </li>
                <li className="">
                  <Link
                    to={"/resume-examples"}
                    className="hover:text-[#00caa5] font-Lexend font-light text-base"
                  >
                    Resume Examples
                  </Link>
                </li>
                <li className="">
                  <Link
                    to={"/cover-letter-templates"}
                    className="hover:text-[#00caa5] font-Lexend font-light text-base"
                  >
                    Cover Letter Templates
                  </Link>
                </li>
                <li className="">
                  <Link
                    to={"/cover-letter-examples"}
                    className="hover:text-[#00caa5] font-Lexend font-light text-base"
                  >
                    Cover Letter Examples
                  </Link>
                </li>
                <li className="">
                  <Link
                    to={"/import-resume"}
                    className="hover:text-[#00caa5] font-Lexend font-light text-base"
                  >
                    Resume Parser
                  </Link>
                </li>
                {show_pages
                  .filter((show_pages) =>
                    show_pages.slug.includes("tips-and-tricks")
                  )
                  .map((show_pages, index_show_pages) => (
                    <li className="" key={index_show_pages}>
                      <Link
                        to={"/page/" + show_pages.slug}
                        className="hover:text-[#00caa5] font-Lexend font-light text-base"
                      >
                        {" "}
                        {show_pages.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="flex flex-col gap-2 sm:gap-6">
              <h1 className="font_1 w-full">LEARN</h1>
              <ul className="text-white flex flex-col gap-4">
                <li className="">
                  <Link
                    to={"/blog"}
                    className="hover:text-[#00caa5] font-Lexend font-light text-base"
                  >
                    {" "}
                    Career Blogs
                  </Link>
                </li>
                <li className="">
                  <Link
                    to={"/pages/resume-format"}
                    className="hover:text-[#00caa5] font-Lexend font-light text-base"
                  >
                    {" "}
                    Resume Format
                  </Link>
                </li>
                <li className="">
                  <Link
                    to={"/pages/cover-letter-format"}
                    className="hover:text-[#00caa5] font-Lexend font-light text-base"
                  >
                    {" "}
                    Cover Letter Format
                  </Link>
                </li>
                <li className="">
                  <Link
                    to={"/pages/how-to-write-a-resume-with-ai-pro-resume"}
                    className="hover:text-[#00caa5] font-Lexend font-light text-base"
                  >
                    {" "}
                    How to write Resume
                  </Link>
                </li>
                <li className="">
                  <Link
                    to={"/pages/how-to-write-a-cover-letter"}
                    className="hover:text-[#00caa5] font-Lexend font-light text-base"
                  >
                    {" "}
                    How to write Cover Letter
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-2 sm:gap-6">
              <h1 className="font_1 w-full">SUPPORT</h1>
              <ul className="text-white flex flex-col gap-4">
                {show_pages
                  .filter((show_pages) => show_pages.slug.includes("about-us"))
                  .map((show_pages, index_show_pages) => (
                    <li className="" key={index_show_pages}>
                      <Link
                        to={`/${show_pages.slug}`}
                        className="hover:text-[#00caa5] font-Lexend font-light text-base"
                      >
                        {" "}
                        {show_pages.title}
                      </Link>
                    </li>
                  ))}

                <li className="">
                  <Link
                    to={"/contact-us"}
                    className="hover:text-[#00caa5] font-Lexend font-light text-base"
                  >
                    {" "}
                    Contact Us
                  </Link>
                </li>
                <li className="">
                  <Link
                    to={"/careers"}
                    className="hover:text-[#00caa5] font-Lexend font-light text-base"
                  >
                    {" "}
                    Careers
                  </Link>
                </li>
                {/* <li className="">
                  <Link to={"/faq"} className="hover:text-[#00caa5] font-Lexend font-light text-base">
                    {" "}
                    FAQs
                  </Link>
                </li> */}

                {show_pages
                  .filter(
                    (show_pages) =>
                      show_pages.slug !== "tips-and-tricks" &&
                      show_pages.slug !== "about-us"
                  )
                  .map((show_pages, index_show_pages) => (
                    <li className="" key={index_show_pages}>
                      <Link
                        to={`/${show_pages.slug}`}
                        className="hover:text-[#00caa5] font-Lexend font-light text-base"
                      >
                        {" "}
                        {show_pages.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:hidden flex flex-wrap item-center gap-4 text-4xl lg:text-6xl lg:my-8 my-2 ">
          <a
            target="_blank"
            href={our_settings.facebook_account_link}
            className="hover:text-[#00caa5]"
          >
            <BiLogoFacebook className="rounded-full border-2 border-white p-2 mr-1 hover:border-[#00caa5]" />
          </a>

          <a
            target="_blank"
            href={our_settings.instagram_account_link}
            className="hover:text-[#00caa5]"
          >
            <BiLogoInstagram className="rounded-full border-2 border-white p-2 mr-1 hover:border-[#00caa5]" />
          </a>
          <a
            target="_blank"
            href={our_settings.linkedin_account_link}
            className="hover:text-[#00caa5]"
          >
            <BiLogoLinkedin className="rounded-full border-2 border-white p-2 mr-1 hover:border-[#00caa5]" />
          </a>
          <a
            target="_blank"
            href="https://www.pinterest.ca/aiproresume/"
            className="hover:text-[#00caa5]"
          >
            <BiLogoPinterest className="rounded-full border-2 border-white p-2 mr-1 hover:border-[#00caa5]" />
          </a>
        </div>
        <img
          src={payment_logos}
          alt="My Image"
          width={300}
          height={40}
          className="lg:hidden mt-5"
        />
        <hr className="lg:hidden mb-2 mt-4 border-t-5 border-white" />

        <div className="w-full flex items-center justify-between my-5">
          <div className="bg-gray-400 h-[2px] w-[35%] hidden lg:block"></div>
          <div className="hidden lg:flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-start gap-6 text-[40px] w-full ">
              <a
                target="_blank"
                href={our_settings.facebook_account_link}
                className="hover:text-[#00caa5] w-[40px] h-[40px] rounded-full border-white border-2 flex justify-center items-center p-[4px]"
              >
                <BiLogoFacebook className="hover:border-[#00caa5]" />
              </a>

              <a
                target="_blank"
                href={our_settings.instagram_account_link}
                className="hover:text-[#00caa5] w-[40px] h-[40px] rounded-full border-white border-2 flex justify-center items-center p-[4px]"
              >
                <BiLogoInstagram className="  hover:border-[#00caa5]" />
              </a>
              <a
                target="_blank"
                href={our_settings.linkedin_account_link}
                className="hover:text-[#00caa5] w-[40px] h-[40px] rounded-full border-white border-2 flex justify-center items-center p-[4px]"
              >
                <BiLogoLinkedin className="  hover:border-[#00caa5]" />
              </a>
              <a
                target="_blank"
                href="https://www.pinterest.ca/aiproresume/"
                className="hover:text-[#00caa5] w-[40px] h-[40px] rounded-full border-white border-2 flex justify-center items-center p-[4px]"
              >
                <BiLogoPinterest className="  hover:border-[#00caa5]" />
              </a>
            </div>
          </div>
          <div className="bg-gray-400 h-[2px] w-[35%] hidden lg:block"></div>
        </div>

        <div className="flex items-center justify-start gap-[150px] my-2">
          <a href="https://www.softtechcube.com/" alt="soft_tech_cube">
            <span className="text-center text-md xl:text-center">
              © {getCurrentYear()} {our_settings.footer_text}
            </span>
          </a>
          <img
            src={payment_logos}
            alt="My Image"
            width={300}
            height={40}
            className="hidden lg:block"
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
