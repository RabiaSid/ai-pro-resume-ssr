import React, { useState, useEffect, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
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
import { Helmet } from "react-helmet";
function ImportResume() {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [parser_loader, setparser_loader] = useState(0);
  const [get_resume_id, setget_resume_id] = useState(false);

  const navigate = useNavigate();

  const [userCoins, setUserCoins] = useState(0);
  const driverObj = driver();

  useEffect(() => {
    console.log(document.getElementById("coinIcon"));
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

  const testlink = () => {
    console.log(userCoins.coins);
  };

  // Main function to handle file changes
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // Check if file size is greater than 5 MB
        console.error("File size exceeds 5 MB limit");
        swal("Error!", "File size exceeds 5 MB limit", "error");
      } else {
        // Check file type and process accordingly
        if (file.type === "application/pdf") {
          const reader = new FileReader();

          reader.onload = (event) => {
            const arrayBuffer = event.target.result;
            const data = new Uint8Array(arrayBuffer);
            const text = new TextDecoder("utf-8").decode(data);

            // Regular expression to find the page count in the PDF
            const match = text.match(/\/Count\s+(\d+)/);
            const numPages = match ? parseInt(match[1], 10) : 0;

            // Log the number of pages (or perform other actions)
            console.log(`Number of pages: ${numPages}`);

            // Here you can set the state with the number of pages
            // For example:
            // setPageCount(numPages);

            // Or perform further actions based on numPages
            if (numPages > 2) {
              swal("Error!", "The PDF has more than 2 Pages", "error");
            } else {
              //console.log(`The PDF has ${numPages} pages.`);

              // Proceed with file upload or further processing
              // uploadFile(file);

              if (userCoins.coins >= numPages) {
                const current_coins = parseInt(userCoins.coins - numPages);
                ApiService.updateUserCoins(user.token, current_coins)
                  .then((res) => {
                    handleFileChange2(file);
                  })
                  .catch((err) => console.log(err));
                //handleFileChange2(file);
              } else {
                swal(
                  "Error!",
                  "You have less coins to parse the resume. Please upgrade your plan, connect referrals to win more coins or purchase coins.",
                  "error"
                );
              }
            }
          };

          reader.readAsArrayBuffer(file);
        } else {
          if (userCoins.coins >= 1) {
            const current_coins = parseInt(userCoins.coins - 1);
            ApiService.updateUserCoins(user.token, current_coins)
              .then((res) => {
                handleFileChange2(file);
              })
              .catch((err) => console.log(err));
            //handleFileChange2(file);
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

  const handleFileChange2 = (file) => {
    setSelectedFile(file);
    const form = new FormData();
    form.append("providers", "extracta");
    form.append("file", file);
    form.append("fallback_providers", "extracta");
    setparser_loader(1);

    const options = {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percentCompleted);
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

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
        setparser_loader(2);
        const parser_data = response.data.extracta.extracted_data;
        console.log(response.data.extracta.extracted_data);

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
            setparser_loader(3);
            setget_resume_id(res.data.data.id);
            console.log(res.data);
            console.log(parser_data.personal_infos?.self_summary);

            const formatDate = (dateInString) => {
              let day = "";
              let month = "";
              let year = "";

              if (/^\d{2}-\d{4}$/.test(dateInString)) {
                // Format: MM-YYYY
                [month, year] = dateInString.split("-");
                day = "01"; // Default day
              } else if (/^\d{4}$/.test(dateInString)) {
                // Format: YYYY
                year = dateInString;
                month = "01"; // Default month
                day = "01"; // Default day
              } else if (/^\d{2}-\d{2}-\d{4}$/.test(dateInString)) {
                // Format: DD-MM-YYYY
                [day, month, year] = dateInString.split("-");
              } else if (/^\d{4}-\d{2}-\d{2}$/.test(dateInString)) {
                // Format: YYYY-MM-DD
                [year, month, day] = dateInString.split("-");
              } else if (/^\d{4}-\d{4}$/.test(dateInString)) {
                // Format: YYYY-YYYY (Year range)
                const [startYear] = dateInString.split("-");
                year = startYear;
                month = "01"; // Default month
                day = "01"; // Default day
              } else {
                // Return empty string if the date format does not match any known pattern
                return "";
              }

              // Ensure all parts are present; if not, return empty string
              if (!year || !month || !day) {
                return "";
              }

              // Pad day and month with leading zeros if necessary
              if (day.length === 1) day = `0${day}`;
              if (month.length === 1) month = `0${month}`;

              return `${year}-${month}-${day}`;
            };

            const isValidValue = (value) => {
              if (value == null) {
                console.log("Invalid value (null or undefined):", value);
                return false; // Check for null or undefined
              }
              const lowerValue = value.toString().toLowerCase().trim();
              const isValid =
                lowerValue !== "unknown" &&
                lowerValue !== "null" &&
                lowerValue !== "";

              return isValid;
            };

            // SUmmary
            if (
              parser_data.personal_infos?.self_summary === null ||
              parser_data.personal_infos?.self_summary === ""
            ) {
              if (parser_loader != 8) {
                setparser_loader(4);
              }
              console.log("summary not loaded");
            } else {
              const summary_data = {
                summary: parser_data.personal_infos?.self_summary,
                profileId: res.data.data.id,
              };
              ApiService.resumeSummarySubmit(user?.token, summary_data)
                .then((res_summary) => {
                  if (parser_loader != 8) {
                    setparser_loader(4);
                  }
                  console.log(res_summary);
                  console.log("summary success");
                })
                .catch((err) => {
                  if (parser_loader != 8) {
                    setparser_loader(4);
                  }
                  console.log(err);
                  console.log("summary error");
                });
            }
            // technical skills
            if (parser_data.personal_infos?.self_summary === null) {
              setparser_loader(5);
            } else {
              const skills_data = {
                title: "Tech Skills",
                body: parser_data.skills
                  .map((option) => option.name)
                  .join(",,"),
                profileId: res.data.data.id,
              };
              ApiService.resumeTechnicalSkillsSubmit(user?.token, skills_data)
                .then((res_skills) => {
                  if (parser_loader != 8) {
                    setparser_loader(5);
                  }
                  console.log("res_skills");
                  console.log(res_skills);
                })
                .catch((err) => {
                  if (parser_loader != 8) {
                    setparser_loader(5);
                  }
                  console.log(err);
                });
            }
            // experience
            if (parser_data.work_experience?.entries.length >= 1) {
              // Iterate over each entry in the work experience
              parser_data.work_experience.entries.forEach((option) => {
                let experience_data = {
                  job_position: isValidValue(option.title) ? option.title : "",
                  company_name: isValidValue(option.company)
                    ? option.company
                    : "",
                  country_id: 0,
                  state: "", // Assuming state_id is fixed
                  city: isValidValue(option.location.formatted_location)
                    ? option.location.formatted_location
                    : "", // Assuming city_id is fixed
                  type: option.type === null ? "Onsite" : option.type, // Default to "Onsite" if type is null
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

                // Call the API with the generated experience_data for each entry
                ApiService.resumeExperienceStore(
                  user?.token,
                  res.data.data.id,
                  experience_data
                )
                  .then((res_experience) => {
                    if (parser_loader != 8) {
                      setparser_loader(6);
                    }
                    console.log("Experience data stored successfully");
                    console.log(res_experience);
                  })
                  .catch((err) => {
                    if (parser_loader != 8) {
                      setparser_loader(6);
                    }
                    console.log("Error storing experience data");
                    console.log(err);
                  });
              });
            } else {
              if (parser_loader != 8) {
                setparser_loader(6);
              }
            }

            // education
            if (parser_data.education?.entries.length >= 1) {
              // Iterate over each entry in the work experience
              parser_data.education.entries.forEach((option) => {
                // Create an experience_data object for each entry

                let education_data = {
                  institution: isValidValue(option.establishment)
                    ? option.establishment
                    : isValidValue(option.location.formatted_location)
                      ? option.location.formatted_location
                      : "",
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
                ApiService.resumeEducationStore(
                  user?.token,
                  res.data.data.id,
                  education_data
                )
                  .then((res_experience) => {
                    if (parser_loader != 8) {
                      setparser_loader(7);
                    }
                    console.log("Education data stored successfully");
                    console.log(res_experience);
                  })
                  .catch((err) => {
                    if (parser_loader != 8) {
                      setparser_loader(7);
                    }
                    console.log("Error storing education data");
                    console.log(err);
                  });
              });
            } else {
              if (parser_loader != 8) {
                setparser_loader(7);
              }
            }

            const resume_sections = {
              show_awards: 1,
              show_certificates: 1,
              show_experience: 1,
              show_languages: 1,
              show_references: 1,
              show_soft_skills: 0,
              profile_id: res.data.data.id,
            };

            ApiService.showProfileSectionUpload(user?.token, resume_sections)
              .then(() => { })
              .catch((err) => console.log(err));

            // certificates
            if (parser_data.certifications.length >= 1) {
              // Iterate over each entry in the work experience
              parser_data.certifications.forEach((option) => {
                // Create an experience_data object for each entry
                let certifications_data = {
                  title: option.name, // Use the title of the current entry
                  date: "", // Use the company of the current entry
                  institute: option.type,
                  description: "", // Assuming state_id is fixed
                };

                // Call the API with the generated experience_data for each entry
                ApiService.resumeCertificateStore(
                  user?.token,
                  res.data.data.id,
                  certifications_data
                )
                  .then((certifications_data) => {
                    setparser_loader(8);
                    console.log("Certificates data stored successfully");
                    parsing_link(res.data.data.id);
                    console.log(certifications_data);
                    // navigate("/resume/formatting", {
                    //   state: { resumeId: res.data.data.id },
                    // });
                  })
                  .catch((err) => {
                    setparser_loader(8);
                    parsing_link(res.data.data.id);
                    console.log("Error Certificates experience data");
                    console.log(err);
                  });
              });
            } else {
              setparser_loader(8);
              parsing_link(res.data.data.id);
            }
          })
          .catch((err) => {
            setparser_loader(0);
            console.log(err);
            swal("Error!", "Parser Resume Error", "error");
          });

        // Handle response data as needed
      })
      .catch((error) => {
        console.error(error);
        setparser_loader(0);
        swal("Error!", "Parser Resume Error", "error");
        // Handle error
      });
  };

  const parsing_link = (get_link) => {
    console.log(get_link);
    setTimeout(() => {
      navigate("/resume/formatting-dev-testing?parser=true", {
        state: { resumeId: get_link },
      });
    }, 5000);
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

  return (
    <>
      <Helmet>
        <meta
          name="robots"
          content="nofollow, noindex, max-snippet:-1, max-video-preview:-1, max-image-preview:large"
        />
      </Helmet>
      <Header />
      <div className="container-float">
        <div className="relative flex flex-wrap justify-between w-[90%] m-auto mt-8 mb-20 md:min-h-[650px] font-montserrat">
          <img
            src={shadeImage01}
            className="hidden 2xl:block w-[300px] lg:w-[500px] absolute z-[-10000] top-[-80px] lg:top-[-150px] right-0 lg:right-[-65px]"
          />
          <img
            src={shadeImage02}
            className="hidden 2xl:block w-[300px] lg:w-[500px] absolute z-[-10000] top-[-80px] lg:top-[0px] right-0 lg:left-[250px]"
          />
          <img
            src={shadeImage03}
            className="hidden 2xl:block w-[300px] lg:w-[700px] absolute opacity-[0.3] z-[-10000] top-[-80px] lg:top-[-4px] right-0 lg:left-[312px]"
          />
          <div className="animate__animated animate__zoomInUp  flex justify-center flex-wrap items-center py-4 w-full md:w-[1200px] m-auto md:min-h-[600px] bg-[rgba(250,250,250,0.2)] shadow-[0_35px_60px_15px_rgba(0,0,0,0.1)] md:rounded-[50px] rounded-[25px]">
            <p className="w-full text-center  text-[#0072B1] text-[24px] font-bold">
              Import Resume
            </p>
            <p className="w-full text-center text-[#848484] ">
              to attach your details
            </p>
            <div
              {...getRootProps()}
              className="col_full bg_color_10 min-w-[90%] py-12 lg:min-w-[598px] lg:min-h-[377px] rounded-lg border-dashed border-2 border-[#8D8D8D] flex justify-center items-center relative pb-4 px-2"
            >
              {parser_loader === 0 ? (
                <div className="col_5 bg_color_10">
                  <div className="flex justify-center items-center">
                    <img
                      src={import_file}
                      alt="import_file_icon"
                      className="max-w-full max-h-full"
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

                  <div className="w-full bg-gray-200 rounded-full dark:bg-gray-800">
                    <div
                      className="bg-[#01B2AC] text-lg Roboto font-semibold text-gray-800 text-center p-1 leading-none rounded-full"
                      style={{
                        width:
                          parser_loader === 0
                            ? "0%"
                            : parser_loader === 1
                              ? "10%"
                              : parser_loader === 2
                                ? "30%"
                                : parser_loader === 3
                                  ? "50%"
                                  : parser_loader === 4
                                    ? "60%"
                                    : parser_loader === 5
                                      ? "70%"
                                      : parser_loader === 6
                                        ? "80%"
                                        : parser_loader === 7
                                          ? "90%"
                                          : parser_loader === 8
                                            ? "100%"
                                            : "0%",
                      }}
                    >
                      {" "}
                      {parser_loader === 0
                        ? "0%"
                        : parser_loader === 1
                          ? "10%"
                          : parser_loader === 2
                            ? "30%"
                            : parser_loader === 3
                              ? "50%"
                              : parser_loader === 4
                                ? "60%"
                                : parser_loader === 5
                                  ? "70%"
                                  : parser_loader === 6
                                    ? "80%"
                                    : parser_loader === 7
                                      ? "90%"
                                      : parser_loader === 8
                                        ? "100%"
                                        : "0%"}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <p className=" w-full text-center   text-[12px] font-bold">
              Don't have a resume
            </p>
            <p className="  w-full text-center  text-[#0072B1] text-[16px] font-bold">
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

                {/* Progress Bar */}
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
      <Footer />
    </>
  );
}

export default ImportResume;
