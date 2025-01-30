import React, { useState, useEffect, useCallback } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import FormData from "form-data";
import import_file from "./assets/images/import_file.webp";
import pdficon from "./assets/images/pdf import icon.webp";
import closeicon from "./assets/images/close import.webp";
import shadeImage01 from "./assets/images/pattrens/01.webp";
import shadeImage02 from "./assets/images/pattrens/02.webp";
import shadeImage03 from "./assets/images/pattrens/03.webp";
import JSZip from "jszip";
import { useAuth } from "./services/Auth";
import { BiLoaderAlt } from "react-icons/bi";
import swal from "sweetalert";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import CountriesJson from "./data/countries.json";
import { Link } from "react-router-dom";
import { ApiService } from "./services/ApiService";
import { useDropzone } from "react-dropzone";
import LazyLoadImageComp from "./components/lazyLoadImage/lazyLoadImage";

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

function ImportResume() {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [parser_loader, setparser_loader] = useState(0);
  const [get_resume_id, setget_resume_id] = useState(false);
  const [parser_tries, setParser_tries] = useState();

  const navigate = useNavigate();

  const [userCoins, setUserCoins] = useState(0);
  const driverObj = driver();

  useEffect(() => {
    ApiService.getCoins(user.token)
      .then((res) => {
        if (res.data.id) {
          const UserCoins = {
            coin_end_date: res.data.coin_end_date,
            coin_start_date: res.data.coin_start_date,
            coins: res.data.coins,
            id: res.data.id,
          };
          setUserCoins(UserCoins);

          // Highlight the element if userCoins are less than or equal to 0
          if (UserCoins.coins <= 0) {
            driverObj.highlight({
              element: "#coinIcon", // Replace with your actual ID for the coin icon
              popover: {
                title: "No Coins Left",
                description:
                  'Your coins have run out. To keep using all the great features of AI Pro Resume, <a href="/packages"><span style="background-color: yellow;">upgrade your plan</span></a>, refer a friend to earn more coins or purchase coins.',
                position: "bottom",
              },
              style: {
                height: "50px", // Example height
                width: "100px", // Example width
              },
            });
          }
        } else {
          const UserCoins = {
            coin_end_date: null,
            coin_start_date: null,
            coins: 0,
            id: 0,
          };
          setUserCoins(UserCoins);

          // Highlight the element if userCoins are less than or equal to 0
          if (UserCoins.coins <= 0) {
            driverObj.highlight({
              element: "#coinIcon", // Replace with your actual ID for the coin icon
              popover: {
                title: "No Coins Left",
                description:
                  'Your coins have run out. To keep using all the great features of AI Pro Resume, you can either <a href="/packages"><span style="background-color: yellow;">upgrade your plan</span></a> , refer a friend to earn more coins or purchase coins.',
                position: "bottom",
              },
              style: {
                height: "50px", // Example height
                width: "100px", // Example width
              },
            });
          }
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        console.error("File size exceeds 5 MB limit");
        swal("Error!", "File size exceeds 5 MB limit", "error");
      } else {
        if (file.type === "application/pdf") {
          const reader = new FileReader();

          reader.onload = (event) => {
            const arrayBuffer = event.target.result;
            const data = new Uint8Array(arrayBuffer);
            const text = new TextDecoder("utf-8").decode(data);

            const match = text.match(/\/Count\s+(\d+)/);
            const numPages = match ? parseInt(match[1], 10) : 0;
            const resumeParseTries = parser_tries;

            if (numPages > 3) {
              swal("Error!", "The PDF has more than 3 Pages", "error");
            } else {
              if (resumeParseTries !== 0) {
                ApiService.updateParserTries(user?.token, 1, "resume")
                  .then((res) => {
                    handleFileChange2(file);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
                // Deduct 2 coins for valid PDFs regardless of page count
                if (userCoins.coins >= 2) {
                  const current_coins = parseInt(userCoins.coins - 2);
                  ApiService.updateUserCoins(user.token, current_coins)
                    .then((res) => {
                      handleFileChange2(file);
                    })
                    .catch((err) => console.log(err));
                } else {
                  swal(
                    "Error!",
                    "You have less coins to parse the resume. Please upgrade your plan, connect referrals to win more coins or purchase coins.",
                    "error"
                  );
                }
              }
            }
          };

          reader.readAsArrayBuffer(file);
        } else {
          // Non-PDF files also cost exactly 2 coins
          if (userCoins.coins >= 2) {
            const current_coins = parseInt(userCoins.coins - 2);
            ApiService.updateUserCoins(user.token, current_coins)
              .then((res) => {
                handleFileChange2(file);
              })
              .catch((err) => console.log(err));
          } else {
            swal(
              "Error!",
              "You have less coins to parse the resume. Please upgrade your plan, connect referrals to win more coins or purchase coins.",
              "error"
            );
          }
        }
      }
    }
  };

  const startText = "Import Resume Now";

  const startHeadingText = "Say Hello to Quick and ";
  const highLightedText = "Easy Resume Upload ";
  const description =
    "Creating a resume from scratch took a lot of time and resources. You have to be smart and use advanced tools to shine upfront. AI Pro Resume offers an incredible feature for those who want to stay ahead in the job market. The features make your resume-building process smooth and hassle-free. Our resume parser pulls out all the key details from your current resume and places them in the right section. Say goodbye to manual data entry and hello to efficient experience. ";

  const handleFileChange2 = (file) => {
    // return;
    setSelectedFile(file);
    const form = new FormData();
    form.append("providers", "extracta");
    form.append("file", file);
    form.append("fallback_providers", "extracta");
    setparser_loader(10);

    axios
      .post("https://api.edenai.run/v2/ocr/resume_parser", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMzE5NzIwZWQtNTk0NS00ZDgzLWE3MzMtZjg2OTliNmJlZGY2IiwidHlwZSI6ImFwaV90b2tlbiJ9.aL3u0D2BpbRp71ERu3OVjIWwlAgfEuPqgeUEakBqxbQ", // Add your authorization token here
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      })
      .then((response) => {
        setparser_loader(30);
        const parser_data = response.data.extracta.extracted_data;

        const article = {
          resume_name: parser_data.personal_infos?.name.raw_name,
          first_name: parser_data.personal_infos?.name.first_name,
          last_name: parser_data.personal_infos?.name.last_name,
          phone_number: parser_data.personal_infos?.phones[0]
            ? parser_data.personal_infos?.phones[0]
            : "",
          contact_number: parser_data.personal_infos?.phones[1]
            ? parser_data.personal_infos?.phones[1]
            : "",
          email_address: parser_data.personal_infos?.mails[0],
          website: parser_data.personal_infos?.urls[0]
            ? parser_data.personal_infos?.urls[0]
            : "https://www.portfolio.me",
          street_address:
            parser_data.personal_infos?.address.formatted_location,
          postal_code: parser_data.personal_infos?.address.postal_code,
          job_title: "",
          country_id: 0,
          state: "",
          city: "",
          template_id: 3,
          status: 1,
        };
        ApiService.resumeHeaderSubmit(user?.token, article)
          .then((res) => {
            setparser_loader(40);
            setget_resume_id(res.data.data.id);

            const formatDate = (dateInString) => {
              let day = "";
              let month = "";
              let year = "";

              const monthNames = {
                Jan: "01",
                Feb: "02",
                Mar: "03",
                Apr: "04",
                May: "05",
                Jun: "06",
                Jul: "07",
                Aug: "08",
                Sep: "09",
                Oct: "10",
                Nov: "11",
                Dec: "12",
              };

              if (/^\d{2}-\d{4}$/.test(dateInString)) {
                [month, year] = dateInString.split("-");
                day = "01";
              } else if (/^\d{4}$/.test(dateInString)) {
                year = dateInString;
                month = "01";
                day = "01";
              } else if (/^\d{2}-\d{2}-\d{4}$/.test(dateInString)) {
                [day, month, year] = dateInString.split("-");
              } else if (/^\d{4}-\d{2}-\d{2}$/.test(dateInString)) {
                [year, month, day] = dateInString.split("-");
              } else if (/^\d{4}-\d{4}$/.test(dateInString)) {
                const [startYear] = dateInString.split("-");
                year = startYear;
                month = "01";
                day = "01";
              } else if (/^[A-Za-z]{3}, \d{4}$/.test(dateInString)) {
                const [monthName, yearString] = dateInString.split(", ");
                month = monthNames[monthName];
                year = yearString;
                day = "01";
              } else {
                return "";
              }

              if (!year || !month || !day) {
                return "";
              }

              if (day.length === 1) day = `0${day}`;
              if (month.length === 1) month = `0${month}`;

              return `${year}-${month}-${day}`;
            };

            const isValidValue = (value) => {
              if (value == null) {
                return false;
              }
              const lowerValue = value.toString().toLowerCase().trim();
              const isValid =
                lowerValue !== "unknown" &&
                lowerValue !== "null" &&
                lowerValue !== "";

              return isValid;
            };

            async function loadOthers() {
              // Summary
              try {
                if (
                  parser_data.personal_infos?.self_summary !== null ||
                  parser_data.personal_infos?.self_summary !== ""
                ) {
                  const summary_data = {
                    summary: parser_data.personal_infos?.self_summary,
                    profileId: res.data.data.id,
                  };
                  const summaryResponse = await ApiService.resumeSummarySubmit(
                    user?.token,
                    summary_data
                  );
                }
              } catch (err) {
                console.log("No Summary");
              }
              setparser_loader(60);
              // Tech skills
              try {
                // technical skills
                if (parser_data.personal_infos?.self_summary !== null) {
                  const skills_data = {
                    title: "Technical skills",
                    body: parser_data.skills
                      .map((option) => option.name)
                      .join(",,"),
                    profileId: res.data.data.id,
                  };
                  const techSkillsresponse =
                    await ApiService.resumeTechnicalSkillsSubmit(
                      user?.token,
                      skills_data
                    );
                }
              } catch (err) {
                console.log("No Tech skills");
              }
              setparser_loader(70);
              // experience
              try {
                if (parser_data.work_experience?.entries.length >= 1) {
                  // Iterate over each entry in the work experience
                  for (const option of parser_data.work_experience.entries) {
                    let experience_data = {
                      job_position: isValidValue(option.title)
                        ? option.title
                        : "",
                      company_name: isValidValue(option.company)
                        ? option.company
                        : "",
                      country_id: 0,
                      state: "", // Assuming state_id is fixed
                      city: isValidValue(option.location.formatted_location)
                        ? option.location.formatted_location
                        : "", // Assuming city_id is fixed
                      type: option.type === null ? "" : option.type, // Default to "Onsite" if type is null
                      start_date: isValidValue(option.start_date)
                        ? formatDate(option.start_date)
                        : "", // Placeholder, replace with actual date if available
                      end_date: isValidValue(option.end_date)
                        ? formatDate(option.end_date)
                        : "", // Placeholder, replace with actual date if available
                      currently_working: isValidValue(option.end_date)
                        ? formatDate(option.end_date)
                          ? 0
                          : 1
                        : 1,
                      job_description: isValidValue(option.description)
                        ? option.description
                        : "",
                    };

                    const responseExp = await ApiService.resumeExperienceStore(
                      user?.token,
                      res.data.data.id,
                      experience_data
                    );
                  }
                }
              } catch (err) {
                console.log("Error in exp", err);
              }
              setparser_loader(80);
              // educations
              try {
                if (parser_data.education?.entries.length >= 1) {
                  for (const option of parser_data.education.entries) {
                    console.log(option);
                    let education_data = {
                      institution: isValidValue(option.title)
                        ? option.title
                        : "",
                      // institution: isValidValue(option.establishment)
                      //   ? option.establishment
                      //   : isValidValue(option.location.formatted_location)
                      //   ? option.location.formatted_location
                      //   : "",
                      degree: isValidValue(option.accreditation)
                        ? option.accreditation
                        : "",
                      field: isValidValue(option.establishment)
                        ? option.establishment
                        : "",
                      grade_type: "none",
                      grade: isValidValue(option.gpa) ? option.gpa : "",
                      start_date: isValidValue(option.start_date)
                        ? formatDate(option.start_date)
                        : "",
                      end_date: isValidValue(option.end_date)
                        ? formatDate(option.end_date)
                        : "",
                      currently_studying: isValidValue(option.end_date)
                        ? option.end_date
                          ? 0
                          : 1
                        : 1,
                    };

                    // Call the API with the generated experience_data for each entry
                    const eduResponse = await ApiService.resumeEducationStore(
                      user?.token,
                      res.data.data.id,
                      education_data
                    );
                  }
                }
              } catch (err) {
                console.log("edu error", err);
              }
              setparser_loader(90);
              try {
                const resume_sections = {
                  show_awards: 1,
                  show_certificates: 1,
                  show_experience: 1,
                  show_languages: 1,
                  show_references: 1,
                  show_soft_skills: 0,
                  profile_id: res.data.data.id,
                };

                const sectionsIndexResponse =
                  await ApiService.showProfileSectionUpload(
                    user?.token,
                    resume_sections
                  );
              } catch (error) {
                console.log("sections index error", error);
              }
              setparser_loader(95);
              // certificaties
              try {
                if (parser_data.certifications.length >= 1) {
                  for (const option of parser_data.certifications) {
                    let certifications_data = {
                      title: option.name,
                      date: "",
                      institute: option.type,
                      description: "",
                    };

                    const certiResponse =
                      await ApiService.resumeCertificateStore(
                        user?.token,
                        res.data.data.id,
                        certifications_data
                      );
                  }
                }
              } catch (error) {
                console.log("certi Error", error);
              }
              setparser_loader(100);
              navigate("/resume/formatting?parser=true", {
                state: { resumeId: res.data.data.id },
              });
            }

            loadOthers();
          })
          .catch((err) => {
            setparser_loader(0);
            console.log(err);
            swal("Error!", "Parser Resume Error", "error");
          });
      })
      .catch((error) => {
        console.error(error);
        setparser_loader(0);
        swal("Error!", "Parser Resume Error", "error");
      });
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

  const [ads, setAds] = useState([]);

  useEffect(() => {
    ApiService.getAllAdsWeb(user?.token)
      .then((response) => {
        setAds(response.data.data.ads);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    ApiService.getUserDetails(user?.token)
      .then((res) => {
        console.log(res.data);
        setParser_tries(res.data.resume_parser_tries);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <style>{styles}</style>
      <Header />
      <div className="container m-auto">
        <div className="grid mb-14 grid-cols-12 relative bg-white bg-opacity-25 flex-col Lexend sm:py-4 lg:py-10 m-auto px-4 sm:px-8 gap-8 lg:gap-14 ">
          <div className="absolute w-full flex justify-center items-center overflow-hidden">
            <img
              src={shadeImage01}
              alt="full shade image"
              className=" w-[250px] sm:w-[600px] overflow-hidden"
            />
            <img
              src={shadeImage03}
              alt="full shade image"
              className="hidden 2xl:block w-[300px] lg:w-[700px] absolute  z-[-10000] top-[-80px] lg:top-[-4px] right-0 lg:left-[400px] overflow-hidden"
            />
            <img
              src={shadeImage02}
              alt="full shade image"
              className="hidden 2xl:block w-[300px] lg:w-[600px] absolute z-[-10000] top-[-80px] lg:top-[-150px] right-0 lg:right-[-100px] overflow-hidden"
            />
          </div>
          <div className="hidden py-12 sm:flex flex-col justify-center font-Lexend  sm:py-10 col-span-12 lg:col-span-6 xl:col-span-7">
            <h3 className="hidden sm:block text-[#0072b1] font-bold text-xl font_1">
              {startText}{" "}
            </h3>
            <br />
            <h1 className="hidden sm:block text-[#0072b1] font-Lexend font-bold text-lg lg:text-4xl sm:text-2xl sm:leading-[1.7] md:leading-[1.5] lg:leading-[1.5] 2xl:leading-[1.2] text-center lg:text-left ">
              <span className="">
                {startHeadingText}{" "}
                <span className="text-[#00caa5]">{highLightedText}</span>
              </span>{" "}
            </h1>

            <p className="m-auto text-base text-justify sm:text-left sm:text-md mt-4 text-primary-black  font-Lexend font-normal leading-[1.5] ">
              {description}
            </p>
          </div>
          <div className="bg-white col-span-12  lg:col-span-6 xl:col-span-5">
            <div className="flex z-30 justify-center flex-wrap items-center py-10 px-8 w-full m-auto bg-[rgba(250,250,250,0.2)] shadow-[0_35px_60px_15px_rgba(0,0,0,0.1)] ">
              <div
                {...getRootProps()}
                className="col_full  bg_color_10 min-w-full py-28 mb-8  rounded-lg border-dashed border-2 border-[#b8b8b8] flex justify-center items-center relative pb-4 px-2"
              >
                {parser_loader === 0 ? (
                  <div className="col_5 bg_color_10 ">
                    <div className="flex justify-center items-center">
                      <img
                        src={import_file}
                        alt="import_file_icon"
                        className="max-w-full max-h-[80px]"
                      />
                    </div>
                    <br />
                    <div className="text-center">
                      <div className="cursor-pointer">
                        <p className="font-bold text-[16px]">
                          Drag and Drop Files here or{" "}
                          <span className="text-[#0072B1]" id="choose">
                            Choose File
                          </span>
                        </p>
                        <p className="text-[#8D8D8D] text-[11px] md:text-[14px]">
                          PDF, Image (maximum 5 MB)
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
              </div>
              <p className=" w-full text-center text-[12px] font-bold">
                Don't have a resume
              </p>
              <p className="z-50  w-full text-center  text-[#0072B1] text-[16px] font-bold">
                {" "}
                <Link to="/resume-templates">Create new Resume</Link>
              </p>
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
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {ads
          .filter((ad) => ad.slug === "page-header-top")
          .map((ad) => (
            <div key={ad.id} className="flex justify-center my-4">
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
        <div className="px-4 mt-6">
          <h3 className="text-[#0072b1] font-Lexend font-bold text-2xl md:text-3xl px-0 mb-3">
            What is a
            <span className="text-[#00caa5] ml-4 text-2xl md:text-3xl">
              Resume Parser?
            </span>
          </h3>
          <p className="font-Lexend text-base mb-2">
            It is a smart feature that scans your uploaded resume and extracts
            important information such as your summary, skills, language,
            experience, personal information, and qualifications. It then
            automatically settles these details into the corresponding sections
            of your new resume format. This means you can focus on personalizing
            your resume while the parser handles the rest.
          </p>
          <p className="font-Lexend text-base mb-2">
            To use the Resume Parser, follow the steps below:
          </p>
          <h3 className="text-[#0072b1] font-Lexend font-medium text-xl md:text-2xl px-0 mb-3">
            <span className="font-bold">Step 01:</span> Sign Up & Login
          </h3>
          <p className="font-Lexend text-base mb-2">
            You must log in to your AI pro resume account to use this unique
            feature. After signing in and logging into your account, head to the
            homepage.
          </p>
          <h3 className="text-[#0072b1] font-Lexend font-medium text-xl md:text-2xl px-0 mb-3">
            <span className="font-bold">Step 02:</span> Import Resume
          </h3>
          <ul className="font-Lexend text-base">
            <li className="mb-1 list-disc list-inside">
              On the homepage, you will find an option called Import Resume.
              Click on it to get started.
            </li>
            <li className="mb-1 list-disc list-inside">
              A new page will appear with a prompt saying Drag or Drop File or
              Choose a File.
            </li>
            <li className="mb-1 list-disc list-inside">
              Beneath that, you will also see an option to manually create a
              resume if you do not have one to upload.
            </li>
            <li className="mb-1 list-disc list-inside">
              Simply click on the manual option if needed.
            </li>
            <li className="mb-1 list-disc list-inside">
              Once you choose and upload your file, the Resume Parser fetches
              all the relevant data and displays it on a resume editor within
              seconds.
            </li>
            <li className="mb-1 list-disc list-inside">
              You can easily personalize the details from here and add or remove
              information.
            </li>
          </ul>
          <h3 className="text-[#0072b1] font-Lexend font-medium text-xl md:text-2xl px-0 mb-3">
            <span className="font-bold">Step 03:</span> Customization
          </h3>
          <ul className="font-Lexend text-base">
            <li className="mb-1 list-disc list-inside">
              Personalize your resume by changing the fonts and colors to match
              your style or profession.
            </li>
            <li className="mb-1 list-disc list-inside">
              Choose from a variety of options to make your resume stand out.
            </li>
            <li className="mb-1 list-disc list-inside">
              Browse through different templates to find the one that best suits
              your industry.
            </li>
            <li className="mb-1 list-disc list-inside">
              Make your resume visually appealing by adjusting the layout,
              spacing, and formatting to ensure it reflects your professional
              image.
            </li>
            <li className="mb-1 list-disc list-inside">
              Once you choose and upload your file, the Resume Parser fetches
              all the relevant data and displays it on a resume editor within
              seconds.
            </li>
            <li className="mb-1 list-disc list-inside">
              You can easily personalize the details from here and add or remove
              information.
            </li>
          </ul>

          <h3 className="text-[#0072b1] font-Lexend font-medium text-xl md:text-2xl px-0 mb-3">
            <span className="font-bold">Step 04:</span> Download Your Resume
          </h3>
          <ul className="font-Lexend text-base">
            <li className="mb-1 list-disc list-inside">
              Once everything looks good, your professional resume is ready for
              download.
            </li>
            <li className="mb-1 list-disc list-inside">
              Simply click the download button, and your resume will be saved in
              PDF format.
            </li>
            <li className="mb-1 list-disc list-inside">
              Browse through different templates to find the one that best suits
              your industry.
            </li>
            <li className="mb-1 list-disc list-inside">
              Download your resume and boost your chances of landing your
              preferred job.
            </li>
          </ul>
          <h4 className="text-[#0072b1] font-Lexend font-bold text-lg md:text-xl px-0 mt-1 mb-2">
            Coins
          </h4>
          <p className="font-Lexend text-base mb-2">
            To access the powerful Resume Parser feature on AI Pro Resume, you
            will need coins. Just two coins to parse a resume of up to three
            pages. If you want to use this feature for free, Don’t worry, we
            have got a simple technique for that too. Just follow the steps
            below:
          </p>
          <h4 className="text-[#0072b1] font-Lexend font-bold text-lg md:text-xl px-0 mt-1 mb-2">
            Referrals:
          </h4>
          <p className="font-Lexend text-base mb-2">
            Invite your friends to join AI Pro Resume. When they sign up using
            your referral link, you will earn coins. With these coins, you can
            unlock resume parser tokens. You will receive 3 coins for 10
            referrals, 4 coins for 20 referrals, and 6 coins for 30 referrals.
          </p>
          <h4 className="text-[#0072b1] font-Lexend font-bold text-lg md:text-xl px-0 mt-1 mb-2">
            Purchase Coins
          </h4>
          <p className="font-Lexend text-base mb-2">
            AI Pro Resume allows you to buy coins if you want to use premium
            services and parser features. Select from the six available coin
            bundles based on your needs. You can find them on the pricing page
            below the packages.
          </p>
          <ul className="font-Lexend text-base">
            <li className="mb-1 list-disc list-inside">5 coins for $10.00.</li>
            <li className="mb-1 list-disc list-inside">10 coins for $20.00.</li>
            <li className="mb-1 list-disc list-inside">25 coins for $50.00.</li>
            <li className="mb-1 list-disc list-inside">50 coins for $95.00.</li>
            <li className="mb-1 list-disc list-inside">
              75 coins for $135.00.
            </li>
            <li className="mb-1 list-disc list-inside">
              100 coins for $180.00.
            </li>
          </ul>
          <h4 className="text-[#0072b1] font-Lexend font-bold text-lg md:text-xl px-0 mt-1 mb-2">
            Our Packages
          </h4>
          <p className="font-Lexend text-base mb-2">
            AI Pro Resume also offers three packages to suit your needs: one is
            free, and two are paid. These packages provide access to the Resume
            Parser feature and unlock several other premium services.
          </p>
          <h4 className="text-[#0072b1] font-Lexend font-bold text-lg md:text-xl px-0 mt-1 mb-2">
            Free Package:
          </h4>
          <p className="font-Lexend text-base mb-2">
            Our free package Includes 5 tries of Resume Parser. It is perfect
            for trying out the basic features. you will also get 2 coins as a
            signup bonus that you can use to parse a resume.
          </p>
          <h4 className="text-[#0072b1] font-Lexend font-bold text-lg md:text-xl px-0 mt-1 mb-2">
            Most Popular Package:
          </h4>
          <p className="font-Lexend text-base mb-2">
            It includes 10 tries of Resume Parser. This package is Ideal for
            users who want advanced features and premium fonts and themes.
          </p>
          <h4 className="text-[#0072b1] font-Lexend font-bold text-lg md:text-xl px-0 mt-1 mb-2">
            Premium Package:
          </h4>
          <p className="font-Lexend text-base mb-2">
            Our premium package Includes 20 tries for the Resume Parser. It is
            designed for those who want the best features and premium services.
          </p>
          <h4 className="text-[#0072b1] font-Lexend font-bold text-lg md:text-xl px-0 mt-1 mb-2">
            Make the Payment:
          </h4>
          <ul className="font-Lexend text-base">
            <li className="mb-1 list-disc list-inside">
              Click on your preferred package and press the ‘proceed to
              checkout’ button.
            </li>
            <li className="mb-1 list-disc list-inside">
              You will head to the checkout page, choose your payment method
              (PayPal or card), and complete the payment.
            </li>
            <li className="mb-1 list-disc list-inside">
              Once the payment is done, you can access all the services and
              features included in the package.
            </li>
            <li className="mb-1 list-disc list-inside">
              You can use premium services and the parser feature if you
              purchase only the coins.
            </li>
            <li className="mb-1 list-disc list-inside">
              You can parse resumes up to 3 pages long with your tokens.
            </li>
          </ul>
          <h3 className="text-[#0072b1] font-Lexend font-bold text-xl md:text-2xl px-0 mb-3">
            ATS-Friendly Resumes
          </h3>
          <p className="font-Lexend text-base mb-2">
            Our resume parser reduces your effort, helps you create a visually
            appealing resume, and ensures it passes through ATS (Applicant
            Tracking System) scanners. This means your resume is formatted and
            optimized to meet the requirements of modern hiring systems, which
            increases your chances of being noticed by recruiters. AI Pro Resume
            helps you focus on displaying your skills while we handle the
            technical side to get you through the first stage of the hiring
            process.
          </p>
          <h4 className="text-[#0072b1] font-Lexend font-bold text-lg md:text-xl px-0 mt-1 mb-2">
            Tips to Make the Most of the Resume Parser
          </h4>
          <p className="font-Lexend text-base mb-2">
            Follow these simple tips to save time and create a resume that is
            noticed by recruiters and hiring managers:
          </p>
          <h4 className="text-[#0072b1] font-Lexend font-bold text-lg md:text-xl px-0 mt-1 mb-2">
            Upload a Clean Resume
          </h4>
          <p className="font-Lexend text-base mb-2">
            Your resume should be clear, well-organized, and updated. This will
            help the parser interpret your details accurately.
          </p>
          <h4 className="text-[#0072b1] font-Lexend font-bold text-lg md:text-xl px-0 mt-1 mb-2">
            Use Job Keywords
          </h4>
          <p className="font-Lexend text-base mb-2">
            Add keywords from the job description that match what recruiters are
            looking for. This will help you pass ATS scanners.
          </p>
          <h4 className="text-[#0072b1] font-Lexend font-bold text-lg md:text-xl px-0 mt-1 mb-2">
            Highlight Important Information
          </h4>
          <p className="font-Lexend text-base mb-2">
            Put your key skills and achievements where they stand out. This
            helps make a stronger impression.
          </p>
          <h4 className="text-[#0072b1] font-Lexend font-bold text-lg md:text-xl px-0 mt-1 mb-2">
            Check and Edit the Parsed Data
          </h4>
          <p className="font-Lexend text-base mb-2">
            After the parser fetches your details, review and make small
            changes. Add missing points or remove anything unnecessary.
          </p>
          <h4 className="text-[#0072b1] font-Lexend font-bold text-lg md:text-xl px-0 mt-1 mb-2">
            Choose a Template That Fits
          </h4>
          <p className="font-Lexend text-base mb-2">
            Pick a template that matches your job or industry. The right design
            matters, whether professional, creative, or modern.
          </p>
          <h4 className="text-[#0072b1] font-Lexend font-bold text-lg md:text-xl px-0 mt-1 mb-2">
            Keep it Simple
          </h4>
          <p className="font-Lexend text-base mb-2">
            Avoid using fancy graphics or too many design elements. A clean and
            simple resume works best for ATS systems.
          </p>
          <h4 className="text-[#0072b1] font-Lexend font-bold text-lg md:text-xl px-0 mt-1 mb-2">
            Proofread Everything
          </h4>
          <p className="font-Lexend text-base mb-2">
            Check for spelling, grammar, and formatting mistakes to make sure
            your resume looks perfect and professional.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ImportResume;
