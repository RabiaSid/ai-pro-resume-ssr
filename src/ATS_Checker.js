import React, { useState, useEffect, useCallback } from "react";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import FormData from "form-data";
import pdficon from "./assets/images/pdf import icon.webp";
import closeicon from "./assets/images/close import.webp";
import shadeImage01 from "./assets/images/pattrens/01.webp";
import shadeImage02 from "./assets/images/pattrens/02.webp";
import shadeImage03 from "./assets/images/pattrens/03.webp";
import { useAuth } from "./services/Auth";
import swal from "sweetalert";
import "driver.js/dist/driver.css";
import { useDropzone } from "react-dropzone";
import Upload from "./assets/images/upload.webp";
import Points from "./assets/images/ats_checker_points.webp";
import PointArrow from "./assets/images/point_arrow.webp";
import Background from "./assets/images/pckg_cards.webp";
import OurFaqs from "./components/faq";

const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full bg-primary-blue rounded-lg h-6 overflow-hidden relative">
      <div
        className="h-full flex items-center justify-center transition-all duration-500 ease-out relative"
        style={{ width: `${progress}%` }}
      >
        {/* Animated striped gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-500 to-green-400 opacity-50 animate-stripes" />
        <span className="relative text-white font-semibold">{progress}%</span>
      </div>
    </div>
  );
};

// Custom striped animation
const styles = `
@keyframes stripes {
  0% { background-position: 0 0; }
  100% { background-position: 40px 0; }
}
.animate-stripes {
  background: linear-gradient(
    45deg,
    rgba(255, 255, 180, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
  background-size: 40px 40px;
  animation: stripes 1s linear infinite;
}
`;

function ATSChecker() {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [parser_loader, setparser_loader] = useState(0);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    console.log(file, "add FILE 1");

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        console.log(file, "add FILE 2");
        console.error("File size exceeds 5 MB limit");
        swal("Error!", "File size exceeds 5 MB limit", "error");
      } else {
        console.log(file, "add FILE 3");
        if (file.type === "application/pdf") {
          const reader = new FileReader();

          reader.onload = (event) => {
            const arrayBuffer = event.target.result;
            const data = new Uint8Array(arrayBuffer);
            const text = new TextDecoder("utf-8").decode(data);

            const match = text.match(/\/Count\s+(\d+)/);
            const numPages = match ? parseInt(match[1], 10) : 0;

            if (numPages > 2) {
              console.log(file, "add FILE 4");
              swal("Error!", "The PDF has more than 2 Pages", "error");
            } else {
              console.log(file, "add FILE 5");
              FileUploadChange(file);
            }
          };

          reader.readAsArrayBuffer(file);
        } else {
          console.log(file, "add FILE 8");
        }
      }
    }
  };

  const FileUploadChange = (file) => {
    setSelectedFile(file);
    const form = new FormData();
    form.append("providers", "extracta");
    form.append("file", file);
    form.append("fallback_providers", "extracta");

    // Initialize a timer to simulate progress
    const intervalId = setInterval(() => {
      setparser_loader((prev) => {
        if (prev >= 100) {
          clearInterval(intervalId);
          setparser_loader(10);
          swal("Success!", "Upload Successfully", "success");
          setparser_loader(0);
          setSelectedFile(null);
          return prev;
        }
        return prev + 10;
      });
    }, 1000);
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      const pdfFiles = acceptedFiles.filter(
        (file) => file.type === "application/pdf"
      );
      if (pdfFiles.length > 0) {
        const event = {
          target: {
            files: pdfFiles,
          },
        };
        handleFileChange(event);
      } else {
        swal("Error!", "Only PDF files are accepted", "error");
      }
    },
    [handleFileChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "application/pdf",
  });

  const cardsData = [
    {
      title: "Formatting",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto",
    },
    {
      title: "Clarity",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto",
    },
    {
      title: "Grammar & Spelling",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto",
    },
    {
      title: "Relevance of Content",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto",
    },
    {
      title: "Conciseness and Impact",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto",
    },
    {
      title: "Summary of Changes",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto",
    },
  ];
  return (
    <>
      {/* <style>{styles}</style> */}
      <Header />
      <div className="relative justify-between bg-white bg-opacity-25 flex-col hidden sm:flex">
        <img
          src={shadeImage01}
          alt="full shade image"
          className="w-[600px] absolute top-[30%] 2xl:right-[0%] "
        />
        <img
          src={shadeImage03}
          alt="full shade image"
          className="w-[800px] absolute top-[30%] right-[25%] "
        />
        <img
          src={shadeImage02}
          alt="full shade image"
          className="w-[600px] absolute top-[30%] right-[40%] "
        />
      </div>

      <div className="container m-auto ">
        <div className=" grid grid-cols-1 lg:grid-cols-2 flex-col Lexend py-4 md:py-10 lg:py-12 xl:py-16 m-auto px-4 sm:px-8 gap-8 lg:gap-14 md:mt-4 ">
          <div className=" pt-6 sm:flex flex-col justify-center font-Lexend">
            <h6 className="  text-[#000] font-medium text-[14px] leading-[24px] mb-2">
              <span className=" text-[#0072b1] px-1"> Home </span> &gt; Resume
              Score
            </h6>
            <h3 className="  text-[#0072b1] font-bold text-[16px] leading-[26px] sm:text-[18px] sm:leading-[28px] md:text-[20px] md:leading-[30px] font_1 mb-3">
              ATS Resume Checker:
            </h3>
            <h1 className=" text-[#00caa5] font-Lexend font-semibold text-[22px] leading-[32px] sm:text-[25px] sm:leading-[35px]  md:text-[35px] md:leading-[45px] xl:text-[40px] xl:leading-[50px] 2xl:text-[50px] 2xl:leading-[60px]  text-left ">
              <span className="">
                Get An
                <span className=" text-[#0072b1] px-2">Expert Review</span>
                On <br /> Your Resume,
                <span className=" text-[#0072b1] px-2">Instantly</span>
              </span>{" "}
            </h1>

            <p className="m-auto text-base text-justify sm:text-left sm:text-md mt-4 text-primary-black  font-Lexend font-normal leading-[1.5] ">
              Boost your chances of landing your dream job with our free
              AI-powered ATS resume checker. Perform major essential checks to
              ensure your resume is optimized for success and stands out to
              recruiters.
            </p>
          </div>
          <div
            {...getRootProps()}
            className="flex z-0 justify-center flex-wrap items-center 
          py-16 lg:py-20 px-8 w-full m-auto backdrop-blur-sm bg-white/30  border-dashed border-2 border-[#01B2AC] rounded-3xl"
          >
            {parser_loader === 0 ? (
              <div className="col_5 bg_color_10 ">
                <div className="flex justify-center items-center">
                  <img
                    src={Upload}
                    alt="import_file_icon"
                    className="max-w-full max-h-[40px] md:max-h-[60px]"
                  />
                </div>
                <div className="text-center">
                  <div className="cursor-pointer">
                    <p className="  w-full text-center  text-[#01B2AC] text-[22px] font-semibold py-4">
                      Upload Resume
                    </p>
                    <p className=" w-full text-center text-[16px] leading-[26px] text-[#727272] font-medium">
                      Drop PDF/Docx file to upload or Browse <br />
                      PDF & DOCX only. Max 2MB file size.
                    </p>
                  </div>
                  <input
                    {...getInputProps()}
                    type="file"
                    accept=".pdf"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            ) : (
              <div className="text-center w-full text-xl font-Lexend text-[#0072B1] font-bold flex flex-wrap justify-center items-center">
                <div className="mb-2">
                  Fetching your resume details please wait...
                </div>
                <ProgressBar progress={parser_loader} />
              </div>
            )}
            {selectedFile && (
              <div className="w-[300px] bottom-[40px] mt-4 mb-10 justify-between items-center rounded-md overflow-hidden">
                <div className="w-full flex items-center px-4 py-2 justify-between">
                  <img src={pdficon} alt="pdf icon" />
                  <div className="w-[180px] flex justify-start items-center flex-wrap ">
                    <p className="text-sm font-medium w-full text-ellipsis overflow-hidden ...">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-gray-500 w-full">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    className="p-2 hover:bg-gray-300 "
                    onClick={() => setSelectedFile(null)}
                  >
                    <img src={closeicon} alt="close file" />
                  </button>
                </div>

                <div className=" w-full h-2 bg-gray-300 rounded-r-md">
                  <div
                    className="h-full bg-teal-500"
                    style={{ width: `${parser_loader}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2  flex-col Lexend py-4 md:py-10 lg:py-12 xl:py-16 m-auto px-4 sm:px-8 gap-8 lg:gap-14 ">
          <div className="flex z-10 justify-center flex-wrap items-center  order-2 lg:order-1">
            <div>
              <img
                src={Points}
                alt="import_file_icon"
                className="w-[80%] xl:max-w-[90%] mx-auto"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center font-Lexend  order-1 lg:order-2">
            <h3 className="text-[#0072b1] font-bold text-[22px] leading-[32px]  md:text-[25px] md:leading-[35px] xl:text-[30px] xl:leading-[40px] mb-3 xl:mb-6">
              Why Use an ATS Resume Checker
            </h3>
            <ul>
              <li className="flex mb-4">
                {" "}
                <div className="w-[120px] xl:w-[90px] hidden sm:block">
                  <img src={PointArrow} className="h-[22px] mt-1" />
                </div>
                <p className="m-auto text-justify sm:text-left text-primary-black  font-Lexend font-light text-[14px] leading-[22px]  sm:text-[16px] sm:leading-[26px] xl:text-[18px] xl:leading-[28px] ">
                  In today’s digital hiring landscape, it’s essential for job
                  seekers to optimize their resumes for both human recruiters
                  and automated screening systems.
                </p>
              </li>
              <li className="flex mb-4">
                {" "}
                <div className="w-[120px] xl:w-[90px] hidden sm:block">
                  <img src={PointArrow} className="h-[22px] mt-1" />
                </div>
                <p className="m-auto text-justify sm:text-left text-primary-black  font-Lexend font-light text-[14px] leading-[22px]  sm:text-[16px] sm:leading-[26px] xl:text-[18px] xl:leading-[28px] ">
                  An ATS resume checker provides valuable insights to help you
                  create a resume that not only passes ATS filters but also
                  grabs the attention of hiring managers.
                </p>
              </li>
              <li className="flex mb-4">
                {" "}
                <div className="w-[120px] xl:w-[90px] hidden sm:block">
                  <img src={PointArrow} className="h-[22px] mt-1" />
                </div>
                <p className="m-auto text-justify sm:text-left text-primary-black  font-Lexend font-light text-[14px] leading-[22px]  sm:text-[16px] sm:leading-[26px] xl:text-[18px] xl:leading-[28px] ">
                  By leveraging this powerful tool, you’ll gain the feedback
                  needed to craft a top-performing, interview-worthy resume that
                  meets modern hiring standards.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        className="bg-cover bg-bottom bg-no-repeat"
        style={{
          backgroundImage: `url(${Background})`,
        }}
      >
        <div className="container m-auto py-6 md:py-10 lg:py-12 xl:py-16">
          <h3 className="text-[#0072b1] font-bold text-[22px] leading-[32px] sm:text-[25px] sm:leading-[35px] md:text-[30px] md:leading-[40px] text-center w-11/12 xl:w-9/12 2xl:w-6/12 mx-auto pb-2 md:pb-4">
            Our AI-driven resume checker does more than catch typos—it perfects
            your resume for success!
          </h3>

          <p className="m-auto text-base text-center sm:text-md text-primary-black  font-Lexend font-normal leading-[1.5]  w-11/12 xl:w-9/12 2xl:w-6/12 mx-auto py-4">
            AI PRO Resume Grader analyzes your resume, new or old, and delivers
            instant feedback to optimize it for ATS and human eyes!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 py-4 md:py-10 xl:py-16 px-4">
            {cardsData.map((card, index) => (
              <div
                key={index}
                className="flex z-10 justify-center flex-col items-center 
          py-8 px-6 w-full backdrop-blur-sm bg-white/50 shadow-md border rounded-3xl transition mb-2 scale-95 ease-in-out delay-15 hover:-translate-y-1 hover:scale-100"
              >
                <p className="w-full text-center text-[#01B2AC] text-[22px] font-semibold pb-4">
                  {card.title}
                </p>
                <p className="w-11/12 text-center text-[16px] leading-[26px] text-[#000] font-normal">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-6 md:mb-12 xl:mb-16">
        <OurFaqs />
      </div>

      <Footer />
    </>
  );
}

export default ATSChecker;
