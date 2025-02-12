import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../services/Auth";
import { ApiService } from "../services/ApiService";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import StepsCard from "../components/shared-components/StepsCard";
import { FaArrowRightLong } from "react-icons/fa6";
import { Doughnut } from "react-chartjs-2";
import { Tab } from "@headlessui/react";
import MyTransactionsRewamp from "../MyTransactionsRewamp";
import MyServicesRewamped from "../MyServicesRewamped";
import DocumentsRewamped from "../resume/DocumentsRewamped";
import Footer from "../Footer";
import { FaRegFileLines } from "react-icons/fa6";
import { FaFileExport } from "react-icons/fa6";
import { BsSpellcheck } from "react-icons/bs";

const shadeImage01 = "/images/pattrens/01.webp";
const shadeImage02 = "/images/pattrens/02.webp";
const shadeImage03 = "/images/pattrens/03.webp";
const free_premium = "/images/free_premium.webp";
const ATS_freindly = "/images/ATS_freindly.webp";
const hidden_fee = "/images/hidden_fee.webp";
const professional_resume = "/images/professional_resume.webp";
const step_1 = "/images/step_1.webp";
const step_2 = "/images/step_2.webp";
const step_3 = "/images/step_3.webp";
const step_4 = "/images/step_4.webp";

ChartJS.register(ArcElement, Tooltip, Legend);

const Header = () => {
  const { user } = useAuth();

  const location = useLocation();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    ApiService.getAllAdsWeb(user?.token)
      .then((response) => {
        setAds(response.data.data.ads);
        console.log(response.data.data.ads);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const tab = searchParams.get("tab");

    if (tab) {
      if (tab === "myresumes" || tab === "mycoverletter") {
        setSelectedIndex(1);
      } else if (tab === "mytransactions") {
        setSelectedIndex(3);
      }
    }
  }, [location]);

  const [my_resumes, set_my_resumes] = useState({});
  const [my_coverletters, set_my_coverletters] = useState({});

  useEffect(() => {
    const headers = {
      Authorization: "Bearer " + user?.token,
    };

    // const article = {  };
    axios
      .get(global.baseurl + "/personal_information", { headers })
      .then((data) => {
        if (data) {
          console.log(data.data.data[0].personal_information);
          set_my_resumes(data.data.data[0].personal_information);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(global.baseurl + "/cover_letters", { headers })
      .then((data) => {
        if (data) {
          console.log(data.data.data);
          set_my_coverletters(data.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [userData, setUserdata] = useState([]);

  useEffect(() => {
    ApiService.getUserDetails(user?.token)
      .then((response) => {
        console.log(response.data);
        setUserdata(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const data = {
    labels: ["Max premium", "Premium used", "% of total usage "],
    datasets: [
      {
        label: "Resume Use",
        data: [
          Number(userData.max_res_templates),
          Number(userData.current_res_usage),
          Number(my_resumes.length),
        ],
        backgroundColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const data1 = {
    labels: ["Max premium", "Premium used", "% of total usage "],
    datasets: [
      {
        label: "Cover Use",
        data: [
          Number(userData.max_cover_templates),
          Number(userData.current_res_usage),
          Number(my_coverletters.length),
        ],
        backgroundColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: {
      legend: {
        display: true,
        position: "left",
      },
    },
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <section className="">
      <div className="relative flex justify-between  bg-white bg-opacity-25 flex-col">
        {/* Shape Pattrens top Banner */}
        <div className="absolute w-full h-[800px] flex md:justify-center md:items-center items-baseline -z-50 overflow-hidden">
          <img
            src={shadeImage01}
            alt="full shade image"
            className="md:w-[600px] relative -right-[600px] top-10 hidden sm:block"
          />
          <img
            src={shadeImage03}
            alt="full shade image"
            className="md:w-[600px] relative -right-[200px] hidden sm:block"
          />
          <img
            src={shadeImage02}
            alt="full shade image"
            className="md:w-[900px] relative bottom-0 hidden sm:block"
          />
        </div>
      </div>

      <div id="main_contents" className="lg:w-[100%] lg:ml-[0%]">
        <section className="flex justify-between items-start lg:w-full m-auto flex-wrap">
          <h1 className="font-Lexend text-xl sm:text-2xl md:text-5xl mt-10 w-full text-center text-[#0072B1]">
            WELCOME! {userData?.name}
          </h1>

          <div className="w-full flex flex-col items-center justify-center px-2 mt-[50px] sm:px-0">
            <Tab.Group
              selectedIndex={selectedIndex}
              onChange={setSelectedIndex}
            >
              <div className="w-full font-Lexend sm:w-[90%] md:w-[90%] lg:w-[80%] xl:w-[75%] overflow-x-scroll scroll-bar-hide">
                <Tab.List className=" px-6 flex items-center justify-between p-3 text-sm gap-4 sm:gap-[150px] md:gap-[150px] sm:flex flex-row sm:items-center sm:justify-evenly sm:text-md border-2 border-gray-400 rounded-3xl font-bold w-[150%] sm:w-[160%] md:w-[140%] lg:w-[105%] xl:w-[100%] sm:p-3">
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? " text-[#01B2AC] animate-pulse focus-visible:outline-none border-b-2 border-[#01B2AC]"
                          : "text-primary-black focus-visible:outline-none "
                      )
                    }
                  >
                    DASHBOARD
                  </Tab>

                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? " text-[#01B2AC] focus-visible:outline-none border-b-2 border-[#01B2AC]"
                          : "text-[#737373] focus-visible:outline-none "
                      )
                    }
                  >
                    MY DOCUMENTS
                  </Tab>

                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? " text-[#01B2AC] focus-visible:outline-none border-b-2 border-[#01B2AC]"
                          : "text-[#737373] focus-visible:outline-none "
                      )
                    }
                  >
                    MY SERVICES
                  </Tab>

                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? " text-[#01B2AC] focus-visible:outline-none border-b-2 border-[#01B2AC]"
                          : "text-[#737373] focus-visible:outline-none"
                      )
                    }
                  >
                    MY TRANSACTIONS
                  </Tab>
                </Tab.List>
              </div>

              <Tab.Panels className="mt-[50px] w-[100%]">
                <Tab.Panel>
                  <div className="flex flex-col sm:flex sm:flex-row sm:items-center sm:justify-center m-auto container gap-[20px] doughnut">
                    <div
                      className="w-[100%] sm:w-[60%] rounded-[40px] border-2 border-white"
                      style={{ boxShadow: "0 0 10px #01B2AC40" }}
                    >
                      <div className="flex items-start justify-evenly flex-wrap w-[90%] m-auto py-4 px-6">
                        <div className="w-full lg:w-[50%] my-6 card">
                          <div className="percent">
                            <Doughnut
                              data={data}
                              options={{ cutout: "70%" }}
                              className="w-[220px] h-[220px]"
                            />

                            <div className="number">
                              <h3 className="text-[#0072b1] font_1 text-4xl relative bottom-2">
                                {my_resumes.length}
                              </h3>
                            </div>
                          </div>
                          <p className="font_1 text-sm text-[#0072b1] mt-4">
                            <Link to={"/dashboard?tab=myresumes"}>
                              My Resumes
                            </Link>
                          </p>
                        </div>

                        <div className="w-full lg:w-[50%] my-6 card">
                          <div className="percent">
                            <Doughnut
                              data={data1}
                              options={{ cutout: "70%" }}
                              className="w-[220px] h-[220px]"
                            />

                            <div className="number">
                              <h3 className="text-[#0072b1] font_1 text-4xl relative bottom-2">
                                {my_coverletters.length}
                              </h3>
                            </div>
                          </div>
                          <p className="font_1 text-sm text-[#0072b1] mt-4">
                            <Link to={"/dashboard?tab=mycoverletter"}>
                              My Cover Letters
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center items-center w-[100%] sm:w-[40%] sm:p-[15px] gap-[15px] sm:gap-[15px] md:gap[15px]">
                      <Link to={"/resume-templates"}>
                        <div className="w-[100%] sm:w-[100%]  border-dashed border-2 border-gray-500 hover:border-white rounded-3xl p-[10px] sm:p-[10px] md:p-[20px] hover:bg-[#01B2AC70] group backdrop-blur-xl bg-white/30">
                          <div className="flex items-start gap-[20px]">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="90"
                              height="90"
                              viewBox="0 0 40 40"
                              fill="currentColor"
                              className="group-hover:text-white text-[#01B2AC]"
                            >
                              <path d="M20 40C16.3244 40 13.3333 37.0089 13.3333 33.3333L13.4511 26.5489L6.70667 26.6667C2.99111 26.6667 0 23.6756 0 20C0 16.3244 2.99111 13.3333 6.66667 13.3333L13.4511 13.2133L13.3333 6.70667C13.3333 2.99111 16.3244 0 20 0C23.6756 0 26.6667 2.99111 26.6667 6.66667L26.7889 13.2133L33.3733 13.3333C37.0089 13.3333 40 16.3244 40 20C40 23.6756 37.0089 26.6667 33.3333 26.6667L26.7889 26.5489L26.6667 33.3733C26.6667 37.0089 23.6756 40 20 40ZM17.7778 22.2222V33.3733C17.7778 34.5578 18.7756 35.5556 20 35.5556C21.2244 35.5556 22.2222 34.5578 22.2222 33.3333V22.2222H33.3733C34.5578 22.2222 35.5556 21.2244 35.5556 20C35.5556 18.7756 34.5578 17.7778 33.3333 17.7778H22.2222V6.66667C22.2222 5.40222 21.2244 4.44444 20 4.44444C18.7756 4.44444 17.7778 5.44222 17.7778 6.66667V17.7778H6.66667C5.40222 17.7778 4.44444 18.7756 4.44444 20C4.44444 21.2244 5.44222 22.2222 6.66667 22.2222H17.7778Z" />
                            </svg>
                            <div>
                              <h3 className="text-xl font-bold text-[#01B2AC] group-hover:text-white">
                                Create New Resume
                              </h3>
                              <p className="text-md w-[100%] sm:w-[100%] md:w-[90%] font-Lexend text-primary-black mt-2 group-hover:text-white">
                                TIP: Did you know that if you tailor your resume
                                to the job description, you double your chances
                                to get an interview?
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>

                      <Link to={"/cover-letter-templates"}>
                        <div className="w-[100%] sm:w-[100%]  border-dashed border-2 border-gray-500 hover:border-white rounded-3xl p-[10px] sm:p-[10px] md:p-[20px] hover:bg-[#01B2AC70] group backdrop-blur-xl bg-white/30">
                          <div className="flex items-start gap-[20px]">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="75"
                              height="70"
                              viewBox="0 0 40 40"
                              fill="currentColor"
                              className="group-hover:text-white text-[#01B2AC]"
                            >
                              <path d="M20 40C16.3244 40 13.3333 37.0089 13.3333 33.3333L13.4511 26.5489L6.70667 26.6667C2.99111 26.6667 0 23.6756 0 20C0 16.3244 2.99111 13.3333 6.66667 13.3333L13.4511 13.2133L13.3333 6.70667C13.3333 2.99111 16.3244 0 20 0C23.6756 0 26.6667 2.99111 26.6667 6.66667L26.7889 13.2133L33.3733 13.3333C37.0089 13.3333 40 16.3244 40 20C40 23.6756 37.0089 26.6667 33.3333 26.6667L26.7889 26.5489L26.6667 33.3733C26.6667 37.0089 23.6756 40 20 40ZM17.7778 22.2222V33.3733C17.7778 34.5578 18.7756 35.5556 20 35.5556C21.2244 35.5556 22.2222 34.5578 22.2222 33.3333V22.2222H33.3733C34.5578 22.2222 35.5556 21.2244 35.5556 20C35.5556 18.7756 34.5578 17.7778 33.3333 17.7778H22.2222V6.66667C22.2222 5.40222 21.2244 4.44444 20 4.44444C18.7756 4.44444 17.7778 5.44222 17.7778 6.66667V17.7778H6.66667C5.40222 17.7778 4.44444 18.7756 4.44444 20C4.44444 21.2244 5.44222 22.2222 6.66667 22.2222H17.7778Z" />
                            </svg>
                            <div>
                              <h3 className="text-xl font-bold text-[#01B2AC] group-hover:text-white">
                                Create New Cover Letter
                              </h3>
                              <p className="text-md w-[100%] sm:w-[100%] md:w-[90%] font-Lexend text-primary-black mt-2 group-hover:text-white">
                                TIP: 83% of hiring managers say cover letters
                                have played a role in their final
                                decision-making.
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div className=" container m-auto grid xl:grid-cols-3 font-Lexend text-center gap-8 text-primary-black text-xl font-bold my-10 ">
                    <div className="flex justify-center gap-2 p-8 flex-wrap border-2 shadow-[0px_0px_20px_rgb(210,210,220)] border-dashed border-gray-500 rounded-2xl">
                      <FaRegFileLines
                        className="text-primary-green animate-pulse"
                        size={100}
                      />
                      <div className="w-full">AI-Based Cover Letter Tries</div>
                      <div className="text-4xl text-primary-blue flex items-center">
                        {userData.ai_based_cover_letter_tries > 0
                          ? userData.ai_based_cover_letter_tries
                          : 0}{" "}
                        <span className="text-xl ml-2">
                          {userData.ai_based_cover_letter_tries > 1
                            ? "Tries"
                            : "Try"}{" "}
                          Left
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-center gap-2 p-8 flex-wrap border-2 shadow-[0px_0px_20px_rgb(210,210,220)] border-dashed border-gray-500 rounded-2xl">
                      <FaFileExport
                        className="text-primary-green animate-pulse"
                        size={100}
                      />
                      <div className="w-full">Resume Parser</div>
                      <div className="text-4xl text-primary-blue flex items-center">
                        {userData.resume_parser_tries > 0
                          ? userData.resume_parser_tries
                          : 0}{" "}
                        <span className="text-xl ml-2">
                          {userData.resume_parser_tries > 1 ? "Tries" : "Try"}{" "}
                          Left
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-center gap-2 p-8 flex-wrap border-2 shadow-[0px_0px_20px_rgb(210,210,220)] border-dashed border-gray-500 rounded-2xl">
                      <BsSpellcheck
                        className="text-primary-green animate-pulse"
                        size={100}
                      />
                      <div className="w-full">Spell and Grammar Tries</div>
                      <div className="text-4xl text-primary-blue flex items-center">
                        {userData.spell_and_grammer_tries > 0
                          ? userData.spell_and_grammer_tries
                          : 0}{" "}
                        <span className="text-xl ml-2">
                          {userData.spell_and_grammer_tries > 1
                            ? "Tries"
                            : "Try"}{" "}
                          Left
                        </span>
                      </div>
                    </div>
                  </div>

                  <h1 className="text-[#0072b1] font_1 text-lg sm:text-4xl w-full text-center mt-10">
                    Why Choose
                    <span className="text-[#00caa5] "> Us</span>
                  </h1>
                  <div className="container grid xl:grid-cols-2 m-auto mt-[30px] sm:mt-[50px] md:mt-[20px] gap-y-6 gap-x-4">
                    <div className="flex items-center justify-center gap-[20px] sm:gap-[25px] px-[15px]">
                      <div className="min-w-[80px]">
                        <img src={free_premium} className="w-full h-full" />
                      </div>
                      <div className="font-Lexend">
                        <h3 className="text-lg sm:text-xl font-bold font-Lexend">
                          Bring Your Creative Vision to Life, Anywhere
                        </h3>
                        <p className="text-sm w-[100%] sm:w-[95%] text-black font-Lexend">
                          With our easy-to-use design tools, you can create
                          stunning visuals whenever and wherever possible
                          seamlessly on any device.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-[20px] sm:gap-[25px] px-[15px]">
                      <div className="min-w-[80px]">
                        <img src={ATS_freindly} className="w-full h-full" />
                      </div>
                      <div className="font-Lexend">
                        <h3 className="text-lg sm:text-xl font-bold font-Lexend">
                          Add a Personal Touch to Your Job Search
                        </h3>
                        <p className="text-sm w-[100%] sm:w-[95%]">
                          Make your job applications stand out with our
                          customizable resume and cover letter templates. With
                          just a few clicks, you can infuse your personality
                          into professional documents, highlighting your unique
                          style.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-[20px] sm:gap-[25px] px-[15px]">
                      <div className="min-w-[80px]">
                        <img src={hidden_fee} className="w-full h-full" />
                      </div>
                      <div className="font-Lexend">
                        <h3 className="text-lg sm:text-xl font-bold font-Lexend">
                          Step by Step wizard-based tool
                        </h3>
                        <p className="text-sm w-[100%] sm:w-[85%]">
                          Simplify your job application process with our
                          step-by-step, wizard-based tool. Our platform provides
                          Drag and drop to arrange your sections, personalized
                          suggestions, pre-populated sections like technical
                          skills, education, and experience, and the flexibility
                          to add custom sections.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-[20px] sm:gap-[25px] px-[15px]">
                      <div className="min-w-[80px]">
                        <img
                          src={professional_resume}
                          className="w-full h-full"
                        />
                      </div>
                      <div className="font-Lexend">
                        <h3 className="text-lg sm:text-xl font-bold font-Lexend">
                          Your Data, Safely Secured
                        </h3>
                        <p className="text-sm w-[100%] sm:w-[85%]">
                          AI Pro Resume prioritizes your privacy and security.
                          Your information is never sold or misused, and you can
                          delete your documents whenever you want, giving you
                          peace of mind.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-[90%] flex items-center justify-center m-auto p-2 mt-5 sm:mt-5">
                    <Link
                      to={"/packages"}
                      className="text-center bg-[#01B2AC] rounded-full p-2 w-[170px] border border-white text-white font-semibold hover:bg-white hover:text-[#01B2AC] hover:border hover:border-[#01B2AC]"
                    >
                      See Our Plans
                    </Link>
                  </div>
                  <section className="w-[100%] py-6 sm:py-16 px-2 flex justify-center items-center flex-wrap relative mt-[20px] sm:mt-[20px] md:mt-[50px] ">
                    <div className="flex justify-between items-start lg:w-[90%] m-auto flex-wrap">
                      <h1 className="text-[#0072b1] font_1 text-lg sm:text-4xl w-[100%] text-center mb-6 font-Lexend">
                        4 simple{" "}
                        <span className="text-[#00caa5]">
                          steps to building
                        </span>{" "}
                        {"an excellent Resume"}
                      </h1>

                      <div className="w-full grid sm:grid-cols-2 lg:flex  justify-evenly items-center gap-4 xl:gap-0 ">
                        {/* 1 */}
                        <StepsCard
                          icon={step_1}
                          text="Pick a Template"
                          description={`Select a resume that suits your style and profession`}
                          step={1}
                          className={"!w-[90px] !sm:w-[100px] !md:w-[90px]"}
                          classCard={
                            "bg-[#ffffff95] h-[270px] flex flex-col justify-between"
                          }
                        />
                        <FaArrowRightLong className="text-[#00caa5] hidden xl:block" />

                        {/* 2 */}
                        <StepsCard
                          icon={step_2}
                          text="Fill in your Information"
                          description={`Compile your work history, education, skills, and achievements`}
                          step={2}
                          className={"w-[90px] sm:w-[100px] md:w-[90px]"}
                          classCard={
                            "bg-[#ffffff95] h-[270px] flex flex-col justify-between"
                          }
                        />
                        <FaArrowRightLong className="text-[#00caa5] hidden xl:block" />

                        {/* 3 */}
                        <StepsCard
                          icon={step_3}
                          text="Personalize the design"
                          description={`Add unique details to give your resume a touch of individuality`}
                          step={3}
                          className={"w-[90px] sm:w-[100px] md:w-[90px]"}
                          classCard={
                            "bg-[#ffffff95] h-[270px] flex flex-col justify-between"
                          }
                        />
                        <FaArrowRightLong className="text-[#00caa5] hidden xl:block" />

                        {/* 4 */}
                        <StepsCard
                          icon={step_4}
                          text="Click download"
                          description={`Take the final step as your creation takes shape. Your
            personalized masterpiece awaits!`}
                          step={4}
                          className={"w-[90px] sm:w-[100px] md:w-[90px]"}
                          classCard={"bg-[#ffffff95] h-[270px] justify-between"}
                        />
                      </div>
                    </div>
                  </section>
                </Tab.Panel>

                <Tab.Panel>
                  <DocumentsRewamped />
                </Tab.Panel>

                <Tab.Panel>
                  <MyServicesRewamped />
                </Tab.Panel>

                <Tab.Panel>
                  {" "}
                  <MyTransactionsRewamp />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </section>
        {/* {ads
          .filter((ad) => ad.slug === "dashboard-bottom")
          .map((ad) => (
            <div key={ad.id} className="flex justify-center my-4">
              {ad.is_script === 0 ? (
                <a
                  href={
                    ad.ad_url.startsWith("http")
                      ? ad.ad_url
                      : `https://${ad.ad_url}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
          ))} */}
      </div>
      <Footer />
    </section>
  );
};

export default Header;
