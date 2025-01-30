import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import BasicDetailsSection from "./profile/BasicDetails";
import SummarySection from "./profile/Summary";
import TechnicalSkillsSection from "./profile/TechnicalSkills";
import SoftSkillsSection from "./profile/SoftSkills";
import ExperienceSection from "./profile/Experience";
import EducationSection from "./profile/Education";
import CertificationsSection from "./profile/Certifications";
import AwardsSection from "./profile/Awards";
import ReferencesSection from "./profile/References";
import LanguagesSection from "./profile/Languages";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useState } from "react";
import { ApiService } from "./services/ApiService";
import { HiClipboardCheck } from "react-icons/hi";
import SpinnerLoader from "./components/shared-components/spinnerloader/SpinnerLoader.js";

import axios from "axios";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import swal from "sweetalert";
import { useRef } from "react";
import { PiPencilBold } from "react-icons/pi";
import Skeleton from "react-loading-skeleton";
import { useAuth } from "./services/Auth";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { FiPhone } from "react-icons/fi";
import { RxCross1, RxCrossCircled } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { TbLoader3 } from "react-icons/tb";
import CropImageModal from "./components/CropImageModal";
import UserReferral from "./components/userReferral";

const Account = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [allCountries, setAllCountries] = useState([]);
  const [percentage, set_percentage] = useState(10);
  const [copyText, setCopyText] = useState("");
  const divRef = useRef(null);

  useEffect(() => {
    axios
      .get(global.baseurl + "/show-countries")
      .then((data) => {
        if (data) {
          setAllCountries(data.data?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const shareTitle = "Check out this link! ";
  const shareImageUrl = "https://aiproresume.com/favicon.png";

  const handleCopyClick = () => {
    const textToCopy = divRef.current.innerText;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopyText(textToCopy);

        swal({
          title: "Congratulations!",
          text: "Copied to clipboard",
          icon: "success",
        });
      })
      .catch((error) => {
        console.error("Failed to copy text:", error);
      });
  };
  // Refs
  const passwordNotMatchErr = useRef();
  const changePasswordSubmitButton = useRef();
  const changeEmailSubmitButton = useRef();
  // States
  const [isProvider, setIsProvider] = useState(null);
  const [userProfile, setUserProfile] = useState();
  const [userimageUpdated, setUserimageUpdated] = useState(false);
  const [updatedUserImage, setUpdatedUserImage] = useState();
  const [cropModalVisible, setCropModalVisible] = useState(false);
  const [imageToCrop, setImageToCrop] = useState(null);

  const [phoneNumber, setPhoneNumber] = useState();
  const [userDetails, setUserDetails] = useState();
  const [address, setAddress] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [success_pass, setSuccesPass] = useState();
  const [customerID, setCustomerID] = useState();
  // Password Change
  const [changePassword, setChangePasword] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  //
  const [updateProgress, setUpdateProgress] = useState(false);
  const [isUpdating, setIsUpdating] = useState(true);
  const [isAllowShare, setIsAllowShare] = useState(0);
  const [job_position, setjob_position] = useState();
  const [isSearch, setIsSearch] = useState(false);
  const [show_email, set_show_email] = useState(false);

  const [opt_val, setopt_val] = useState();
  //
  const [updateProgressPassword, setUpdateProgressPassword] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(true);

  const [updateProgressEmail, setUpdateProgressEmail] = useState(false);
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(true);

  const [summaryObjectives, setSummaryObjectives] = useState();

  //steps
  const [get_summary, set_summary] = useState("");
  const [get_tech_skills, set_tech_skills] = useState([]);
  const [get_soft_skills, set_soft_skills] = useState([]);
  const [get_experiences, set_experiences] = useState([]);
  const [get_education, set_education] = useState([]);
  const [get_certificates, set_certificates] = useState([]);
  const [get_languages, set_languages] = useState([]);
  const [get_references, set_references] = useState([]);
  const [download_loader, set_download_loader] = useState(false);

  const [get_awards, set_awards] = useState([]);

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleString("en-US", options);
  }

  const [firstInitil, setfirstInitil] = useState();
  const [UserPackageID, setUserPackageID] = useState();

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

  const getobjectives = (job_position) => {
    if (user?.token) {
      if (job_position) {
        ApiService.showSummariesSuggestionsWithJobPosioton(
          user?.token,
          job_position
        )
          .then((res) => {
            setSummaryObjectives(res.data.data.summary_suggestions);
          })
          .catch((err) => console.log(err));
      }
    }
  };

  // useEffect(() => {
  //   if (resumeData.job_title) {
  //     getobjectives(resumeData.job_title);
  //   }
  // }, [resumeData]);

  function reload() {
    const inputElement = document.querySelector(".PhoneInputInput");
    if (inputElement) {
      inputElement.style.background = "#f4f2f3";
      inputElement.style.color = "#777";
    }

    ApiService.getUserDetails(user?.token)
      .then((res) => {
        set_summary(res.data.summary);
        set_experiences(res.data.experiences);
        set_education(res.data.education);
        set_certificates(res.data.certificates);
        set_awards(res.data.awards);
        set_languages(res.data.user_languages);
        set_references(res.data.references);
        set_tech_skills(res.data.technical_skills);
        set_soft_skills(res.data.soft_skills);
        setUserPackageID(res.data);
        const nameParts = res.data.name.split(" ");
        const firstNameInitial = nameParts[0] ? nameParts[0][0] : "";
        setfirstInitil(firstNameInitial);
        setUserDetails(res.data);
        setName(res.data.name);
        setEmail(res.data.email);
        setCustomerID(res.data.uuid);
        setPhoneNumber(res.data.contact);
        setAddress(res.data.address);
        setSuccesPass(res.data.successPass);
        setUserProfile(res.data.image);
        setIsProvider(res.data.provider);
        setjob_position(res.data.job_position);
        setIsAllowShare(res.data.allow_shares);
        // setUpdatedUserImage()
        if (res.data.job_position) {
          getobjectives(res.data.job_position);
        }

        // if (res.data.package_id === 3) {
        //   document.getElementById("upgradeButton").style.display = "none";
        // }
        let per_job_position = 0;
        if (res.data.job_position) {
          per_job_position = 4;
        }
        let per_experience = 0;
        if (res.data.experience) {
          per_experience = 4;
        }
        let per_website = 0;
        if (res.data.website) {
          per_website = 2;
        }
        let per_technical_skills = 0;
        if (res.data.technical_skills) {
          per_technical_skills = 10;
        }
        let per_soft_skills = 0;
        if (res.data.soft_skills) {
          per_soft_skills = 10;
        }
        let per_experiences = 0;
        if (res.data.experiences.length) {
          per_experiences = 10;
        }
        let per_education = 0;
        if (res.data.education.length) {
          per_education = 10;
        }
        let per_awards = 0;
        if (res.data.awards.length) {
          per_awards = 10;
        }
        let per_certificates = 0;
        if (res.data.certificates.length) {
          per_certificates = 10;
        }

        let per_user_languages = 0;
        if (res.data.user_languages.length) {
          per_user_languages = 10;
        }

        let per_summary = 0;
        if (res.data.summary) {
          per_summary = 10;
        }

        let calculate_percentage =
          10 +
          per_job_position +
          per_experience +
          per_website +
          per_technical_skills +
          per_soft_skills +
          per_experiences +
          per_education +
          per_awards +
          per_certificates +
          per_user_languages +
          per_summary;

        set_percentage(calculate_percentage);
        console.log(res, "set_percentageset_percentage");
        ApiService.updatePercentage(user?.token, calculate_percentage)
          .then((res) => { })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    reload();
  }, []);

  const handleUpdatePassword = (e) => {
    e.preventDefault();

    if (Password !== confirmPassword) {
      passwordNotMatchErr.current.style.display = "block";
      return;
    } else {
      passwordNotMatchErr.current.style.display = "";
    }
    setUpdateProgressPassword(true);

    ApiService.updateUserPassword(
      user?.token,
      oldPassword,
      Password,
      confirmPassword
    )
      .then((res) => {
        setIsUpdatingPassword(true);
        setUpdateProgressPassword(false);
        swal({
          title: "Congratulations!",
          text: res.data.message,
          icon: "success",
        });
      })
      .catch((err) => {
        setIsUpdatingPassword(true);
        setUpdateProgressPassword(false);
        swal({
          title: "Oops!",
          text: err.response.data.message,
          icon: "error",
        });
      });
  };

  const handleAddPassword = (e) => {
    e.preventDefault();

    if (Password !== confirmPassword) {
      passwordNotMatchErr.current.style.display = "block";
      return;
    } else {
      passwordNotMatchErr.current.style.display = "";
    }
    setUpdateProgressPassword(true);

    ApiService.AddUserPassword(user?.token, Password, confirmPassword)
      .then((res) => {
        setIsUpdatingPassword(true);
        setUpdateProgressPassword(false);
        swal({
          title: "Congratulations!",
          text: res.data.message,
          icon: "success",
        });
      })
      .catch((err) => {
        setIsUpdatingPassword(true);
        setUpdateProgressPassword(false);
        swal({
          title: "Oops!",
          text: err.response.data.message,
          icon: "error",
        });
      });
  };

  const handleUserImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageToCrop(URL.createObjectURL(file)); // Show image in the crop modal
      setCropModalVisible(true);
    }
  };

  const handleCrop = (croppedImage) => {
    const dataform = {
      image: croppedImage ? croppedImage : null,
      allow_shares: null,
    };

    ApiService.updateProfilePicShare(user?.token, dataform)
      .then((res) => {
        reload();
        setUserProfile(URL.createObjectURL(croppedImage)); // Update UI with new image
        setUserimageUpdated(false);
        setCropModalVisible(false);
        // window.location.reload();
      })
      .catch((err) => {
        console.error(
          "Error updating image:",
          err.response?.data?.errors || err.message
        );
      });
  };

  const handleUserShareChange = (e) => {
    const dataform = {
      image: null,
      allow_shares: e,
    };
    ApiService.updateProfilePicShare(user?.token, dataform)
      .then((res) => { })
      .catch((err) => {
        console.log(err);
      });
  };

  const [UserSettings, setUserSettings] = useState();

  useEffect(() => {
    ApiService.getSettingForWebsite(user).then((response) => {
      setUserSettings(response.data.data.settings);
    });
  }, []);

  const [show_oldPassword, setShow_oldPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShow_oldPassword((prevShowPassword) => !prevShowPassword);
  };

  const [show_newPassword, setShow_newPassword] = useState(false);
  const handleTogglePasswordVisibility2 = () => {
    setShow_newPassword((prevShowPassword2) => !prevShowPassword2);
  };

  const [show_confirmPassword, setShow_confirmPassword] = useState(false);
  const handleTogglePasswordVisibility3 = () => {
    setShow_confirmPassword((prevShowPassword3) => !prevShowPassword3);
  };

  const [show_addPassword, setShow_addPassword] = useState(false);
  const handleTogglePasswordVisibility4 = () => {
    setShow_addPassword((prevShowPassword4) => !prevShowPassword4);
  };

  const [show_cPassword, setShow_cPassword] = useState(false);
  const handleTogglePasswordVisibility5 = () => {
    setShow_cPassword((prevShowPassword5) => !prevShowPassword5);
  };

  const show_email_modelbox = () => {
    swal("Please Enter a New Email Address", {
      title: "Change Your Email Address",
      buttons: true,
      content: "input",
    }).then((value) => {
      if (value) {
        swal({
          title: "Are You Sure",
          text: "To Change " + email + " to " + value,
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            const headers = {
              Authorization: "Bearer " + user?.token,
              "Content-type": "multipart/form-data",
            };

            const article = {
              email: value,
            };
            axios
              .post(global.baseurl + "/change-email/v1", article, {
                headers,
              })
              .then((data) => {
                if (data) {
                  set_show_email(true);
                  setEmail(value);
                  swal(
                    "Verification Code Send to Your " +
                    value +
                    " Email Address Please Verify!",
                    {
                      icon: "success",
                    }
                  );
                }
              })
              .catch((err) => {
                console.log(err);
                swal("Error!", err.response.data.message, "error");
              });
          } else {
            swal("Your " + email + " was not change!");
          }
        });
      } else {
        swal("Your " + email + " was not change!");
      }
    });
  };

  const handleUpdateEmail = (e) => {
    e.preventDefault();

    setUpdateProgressEmail(true);
    const headers = {
      Authorization: "Bearer " + user?.token,
      "Content-type": "multipart/form-data",
    };

    const article = {
      email: email,
      verify_code: opt_val,
    };
    axios
      .post(global.baseurl + "/change-email/v2", article, {
        headers,
      })
      .then((data) => {
        if (data) {
          swal("Email Changed Successfully", {
            icon: "success",
          });
          setUpdateProgressEmail(false);
        }
      })
      .catch((err) => {
        console.log(err);
        swal("Error!", err.response.data.message, "error");
        setUpdateProgressEmail(false);
      });
  };

  const downloadCV = () => {
    set_download_loader(true);
    const resume_data = {
      resume_name:
        userDetails.first_name == null
          ? userDetails.name
          : userDetails.first_name,
      first_name:
        userDetails.first_name == null
          ? userDetails.name
          : userDetails.first_name,
      last_name: userDetails.last_name ? userDetails.last_name : "",
      email_address: userDetails?.email,
      job_title: userDetails.job_position
        ? userDetails.job_position
        : "Your Job Title",
      phone_number: userDetails?.phone_number ? userDetails?.phone_number : "",
      contact_number: userDetails?.contact ? userDetails?.contact : "",
      template_id: 1,
      country_id: userDetails.country_id ? userDetails.country_id : 0,
      state: userDetails.state ? userDetails.state : "",
      city: userDetails.city ? userDetails.city : "",
      street_address: userDetails.address ? userDetails.address : "",
      postal_code: userDetails.postal_code ? userDetails.postal_code : "",
      gender: "male",
      website: userDetails.website ? userDetails.website : "",
    };
    //for resume header
    ApiService.resumeHeaderSubmit(user?.token, resume_data)
      .then((res) => {
        if (userDetails.image && userDetails.image != "") {
          ApiService.resumeUpdateProfileImage(
            user?.token,
            userDetails.image,
            res.data.data.id
          )
            .then((res) => {
              console.log("image_update" + res);
            })
            .catch((err) => {
              console.log(err);
            });
        }

        //for summary
        let summaryData = {
          summary: userDetails.summary.description
            ? userDetails?.summary?.description
            : "",

          profileId: res.data.data.id,
        };
        ApiService.resumeSummarySubmit(user?.token, summaryData)
          .then(() => { })
          .catch((err) => {
            console.log(err);
          });
        //experience
        userDetails.experiences.map((exp, id) => {
          let experienceData = {
            job_position: exp.job_position ? exp.job_position : "",
            company_name: exp.company_name ? exp.company_name : "",
            country_id: exp.country_id ? exp.country_id : "",
            city: exp.city ? exp.city : "",
            job_description: exp.job_description ? exp.job_description : "",
            currently_working: exp.currently_working,
            profile_id: res.data.data.id,
            start_date: exp.start_date,
            end_date: exp.end_date ? exp.end_date : "",
          };
          ApiService.resumeExperienceStore(
            user?.token,
            res.data.data.id,
            experienceData
          )
            .then(() => { })
            .catch((err) => {
              console.log(err);
            });
        });
        //education

        userDetails.education.map((edu, id) => {
          let educationData = {
            institution: edu.institution ? edu.institution : "",
            degree: edu.degree ? edu.degree : "",
            grade_type: edu.grade_type ? edu.grade_type : "",

            grade: edu.grade ? edu.grade : "",
            field: edu.field ? edu.field : "",
            currently_studying: edu.currently_studying,
            profile_id: res.data.data.id,
            start_date: edu.start_date,
            end_date: edu.end_date ? edu.end_date : "",
          };
          if (edu.grade_type === "grade") {
            educationData.grade = edu.grade || "";
          } else if (edu.grade_type === "cgpa") {
            educationData.cgpa = edu.grade || "";
          } else if (edu.grade_type === "percentage") {
            educationData.percentage = edu.grade || "";
          }
          ApiService.resumeEducationStore(
            user?.token,
            res.data.data.id,
            educationData
          )
            .then(() => { })
            .catch((err) => {
              console.log(err);
            });
        });
        //certificates
        if (userDetails.certificates.length) {
          userDetails.certificates.map((cert, id) => {
            let certificateData = {
              institute: cert.institute ? cert.institute : "",
              title: cert.title ? cert.title : "",
              description: cert.description ? cert.description : "",
              profile_id: res.data.data.id,
              date: cert.date,
            };
            ApiService.resumeCertificateStore(
              user?.token,
              res.data.data.id,
              certificateData
            )
              .then(() => { })
              .catch((err) => {
                console.log(err);
              });
          });
        }
        //awards
        if (userDetails.awards.length) {
          userDetails.awards.map((award, id) => {
            let awardData = {
              institute: award.body ? award.body : "",
              title: award.name ? award.name : "",
              description: award.description ? award.description : "",
              profile_id: res.data.data.id,
              date: award.date,
            };
            ApiService.resumeAwardstore(
              user?.token,
              res.data.data.id,
              awardData
            )
              .then(() => { })
              .catch((err) => {
                console.log(err);
              });
          });
        }
        //languages
        if (userDetails.user_languages.length) {
          userDetails.user_languages.map((lang, id) => {
            let langData = {
              language_id: lang.id,
              level_id: lang.level[0].pivot.level_id,
              profile_id: res.data.data.id,
            };
            ApiService.resumeLanguageStore(
              user?.token,
              res.data.data.id,
              langData
            )
              .then(() => { })
              .catch((err) => {
                console.log(err);
              });
          });
        }
        //references
        if (userDetails.references.length) {
          userDetails.references.map((ref, id) => {
            let refData = {
              company: ref.company,
              contact_no: ref.contact_no,
              designation: ref.designation,
              email: ref.email,
              name: ref.name,
              profile_id: res.data.data.id,
            };
            ApiService.resumeReferenceStore(
              user?.token,
              res.data.data.id,
              refData
            )
              .then((res) => { })
              .catch((err) => {
                console.log(err);
              });
          });
        }
        //technical skills
        if (userDetails.technical_skills != null) {
          let techskillsData = {
            section_name: userDetails.technical_skills.title,
          };
          ApiService.resumeTechnicalSkillsAdd(
            user?.token,

            techskillsData,
            res.data.data.id,
            userDetails.technical_skills.body
          )
            .then((res) => { })
            .catch((err) => {
              console.log(err);
            });
        }
        //soft skills
        if (userDetails.soft_skills != null) {
          let softskillsData = {
            section_name: userDetails.soft_skills.title,
          };
          ApiService.resumeSoftSkillsAdd(
            user?.token,

            softskillsData,
            res.data.data.id,
            userDetails.soft_skills.body
          )
            .then((res) => { })
            .catch((err) => {
              console.log(err);
            });
        }
        setTimeout(() => {
          Cookies.remove("newResumeId");
          Cookies.remove("resumeExampleId");
          Cookies.remove("freshCoverId");
          Cookies.remove("newExampleCoverId");
          localStorage.removeItem("createCoverLetterData");
          localStorage.removeItem("cover_template_id");
          Cookies.set("is_edit", 1, { expires: 1 }); // Expires in 1 day
          navigate("/resume/formatting", {
            state: { resumeId: res.data.data.id },
          });
        }, 7000);
      })
      .catch((err) => {
        console.log(err);
        set_download_loader(false);
      });
  };



  return (
    <div>
      {/* header */}
      <Header />
      {/* Main Page */}
      {download_loader ? (
        <div className="w-full h-full bg-[rgba(250,250,250,1)] fixed top-0 left-0 text-white z-50 flex flex-wrap justify-center items-center">
          <SpinnerLoader />
        </div>
      ) : (
        ""
      )}

      <div className="w-full py-[50px]">
        <div className="container m-auto px-5 sm:px-10 md:px-12 lg:px-8 xl:px-12 2xl:p-0 py-6 sm:py-20">
          {/* Card */}
          <div className=" w-full  rounded-sm lg:grid lg:grid-cols-[25%,48%,25%] xl:grid-cols-[20%,60%,20%] gap-4">
            <div className="mt-4 ">
              {/* image */}
              <div>
                {!userimageUpdated ? (
                  userProfile ? (
                    <div className="relative w-36 h-36 m-auto rounded-full">
                      <img
                        src={global.imageUrl + userProfile}
                        alt="Profile"
                        className="w-36 h-36 rounded-full m-auto"
                      />
                      <div
                        className="absolute bottom-0.5 right-1.5 cursor-pointer"
                        onClick={() =>
                          document.getElementById("user_profile_image").click()
                        }
                      >
                        <PiPencilBold className="bg-white rounded-full text-3xl p-1 hover:bg-primary-blue hover:text-white" />
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-36 h-36 m-auto rounded-full flex justify-center items-center bg-black text-white text-4xl font-extrabold">
                      U {/* Replace 'U' with user's initial */}
                      <div
                        className="absolute bottom-0.5 right-1.5 cursor-pointer"
                        onClick={() =>
                          document.getElementById("user_profile_image").click()
                        }
                      >
                        <PiPencilBold className="bg-white rounded-full text-3xl p-1 hover:bg-primary-blue hover:text-white" />
                      </div>
                    </div>
                  )
                ) : (
                  <div className="relative w-40 h-40 m-auto rounded-full">
                    <img
                      src={updatedUserImage}
                      alt="Profile"
                      className="w-40 h-40 rounded-full m-auto"
                    />
                    <div
                      className="absolute bottom-0.5 right-1.5 cursor-pointer"
                      onClick={() =>
                        document.getElementById("user_profile_image").click()
                      }
                    >
                      <PiPencilBold className="bg-white rounded-full text-3xl p-1 hover:bg-primary-blue hover:text-white" />
                    </div>
                  </div>
                )}

                <input
                  type="file"
                  onChange={handleUserImageChange}
                  className="hidden"
                  accept=".png,.jpg,.jpeg"
                  id="user_profile_image"
                />

                {cropModalVisible && (
                  <CropImageModal
                    image={imageToCrop}
                    onCrop={handleCrop}
                    onClose={() => setCropModalVisible(false)}
                  />
                )}
              </div>

              <h2 className="text-primary-blue text-2xl font-bold font-Lexend text-center mt-8">
                {userDetails ? (
                  userDetails?.name
                ) : (
                  <Skeleton width={"300px"} height={"20px"} />
                )}
              </h2>
              <p className="font-Lexend text-sm text-center text-[#A7A7A7]  ">
                Customer ID :{" "}
                <span>
                  {customerID ? (
                    <b className="text-primary">{customerID}</b>
                  ) : (
                    <Skeleton width={"150px"} height={"20px"} />
                  )}
                </span>
              </p>

              <p
                passwordNotMatchErr
                className="text-[#343434] text-lg font-Lexend font-bold text-center mt-4"
              >
                {userDetails ? (
                  userDetails?.job_position
                ) : (
                  <Skeleton width={"300px"} height={"20px"} />
                )}
              </p>

              <SummarySection
                data={get_summary}
                summaryObjectives={summaryObjectives}
                reload={reload}
              />

              <TechnicalSkillsSection data={get_tech_skills} reload={reload} />
              <SoftSkillsSection data={get_soft_skills} reload={reload} />

              <div className="mt-4 font-Lexend">
                <p className="text-[#A7A7A7]">Email:</p>
                <div className="flex justify-between items-center text-[#343434] text-sm">
                  {email}
                  <FaPencil
                    className="text-[#A7A7A7] hover:text-[#1877F2] cursor-pointer"
                    onClick={() => {
                      show_email_modelbox();
                    }}
                  />
                </div>
              </div>

              {show_email ? (
                <form
                  onSubmit={handleUpdateEmail}
                  action="#"
                  className="verification_box"
                >
                  <div className="text-primary font-Lexend text-md mt-4">
                    Enter OTP Code
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <input
                      type="number"
                      maxLength="1"
                      size="1"
                      min="0"
                      max="9"
                      onChange={(e) => {
                        setopt_val(e.target.value);
                        setIsUpdatingEmail(false);
                      }}
                      pattern="[0-9]{1}"
                      className="w-full px-2 py-2 font-Lexend border border-[#A7A7A7] rounded-full"
                    />
                  </div>
                  {/* <button
                      type="submit"
                      className="hidden"
                      ref={changeEmailSubmitButton}
                    /> */}
                  <button
                    type="submit"
                    className={
                      isUpdatingEmail
                        ? "bg-gray-500 text-white cursor-not-allowed mt-6 rounded-full px-4 py-2"
                        : "bg-[#1877F2] hover:bg-black text-white mt-6 rounded-full px-4 py-2"
                    }
                    ref={changeEmailSubmitButton}
                    disabled={isUpdatingEmail}
                  >
                    {updateProgressEmail ? "Verifying...." : "Verify Email"}
                  </button>
                </form>
              ) : (
                ""
              )}

              <div className="mt-4 font-Lexend">
                <p className="text-[#A7A7A7]">Password:</p>
                <div className="flex justify-between items-center text-[#343434] text-sm">
                  {success_pass === 1 ? "Reset Password" : "Add Password"}
                  {changePassword ? (
                    <RxCrossCircled
                      size={24}
                      className="text-[red] hover:text-[#1877F2] cursor-pointer"
                      onClick={() => setChangePasword(false)}
                    />
                  ) : (
                    <FaPencil
                      className="text-[#A7A7A7] hover:text-[#1877F2] cursor-pointer"
                      onClick={setChangePasword}
                    />
                  )}
                </div>
              </div>

              {changePassword ? (
                <>
                  {success_pass === 0 ? (
                    <form onSubmit={handleAddPassword} action="#">
                      <div className="flex flex-col">
                        <div className="mt-4 font-Lexend">
                          <p className="text-[#A7A7A7] mb-2">New Password</p>
                          <div className="flex justify-between items-center relative">
                            <input
                              type={show_addPassword ? "text" : "password"}
                              placeholder="New Password"
                              value={Password}
                              required
                              className="w-full px-2 py-2 font-Lexend border border-[#A7A7A7] rounded-full"
                              onChange={(e) => {
                                setIsUpdatingPassword(false);
                                setPassword(e.target.value);
                              }}
                            />
                            {show_oldPassword ? (
                              <FaRegEye
                                className="text-xl absolute right-3 text-[#A7A7A7] hover:text-[#1877F2] cursor-pointer"
                                onClick={handleTogglePasswordVisibility4}
                              />
                            ) : (
                              <FaRegEyeSlash
                                className="text-xl absolute right-3 text-[#A7A7A7] hover:text-[#1877F2] cursor-pointer"
                                onClick={handleTogglePasswordVisibility4}
                              />
                            )}
                          </div>
                        </div>

                        <div className="mt-4 font-Lexend">
                          <p className="text-[#A7A7A7] mb-2">
                            Confirm Password
                          </p>
                          <div className="flex justify-between items-center relative">
                            <input
                              type={show_cPassword ? "text" : "password"}
                              placeholder="Confirm Password"
                              value={confirmPassword}
                              required
                              className="w-full px-2 py-2 font-Lexend border border-[#A7A7A7] rounded-full"
                              onChange={(e) => {
                                setIsUpdatingPassword(false);
                                setconfirmPassword(e.target.value);
                              }}
                            />
                            {show_oldPassword ? (
                              <FaRegEye
                                className="text-xl absolute right-3 text-[#A7A7A7] hover:text-[#1877F2] cursor-pointer"
                                onClick={handleTogglePasswordVisibility5}
                              />
                            ) : (
                              <FaRegEyeSlash
                                className="text-xl absolute right-3 text-[#A7A7A7] hover:text-[#1877F2] cursor-pointer"
                                onClick={handleTogglePasswordVisibility5}
                              />
                            )}
                            <div
                              className="text-red-500 text-sm hidden"
                              ref={passwordNotMatchErr}
                            >
                              Password Not Match
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Hidden Button For Submit the Code */}
                      {/* <button
                          type="submit"
                          className="hidden"
                          ref={changePasswordSubmitButton}
                        /> */}
                      <button
                        type="submit"
                        className={
                          isUpdatingPassword
                            ? "bg-gray-500 text-white cursor-not-allowed mt-6 rounded-full px-4 py-2"
                            : "bg-[#1877F2] hover:bg-black text-white mt-6 rounded-full px-4 py-2"
                        }
                        ref={changePasswordSubmitButton}
                        disabled={isUpdatingPassword}
                      >
                        {updateProgressPassword
                          ? "Updating...."
                          : "Update Password"}
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleUpdatePassword} action="#">
                      <div className="flex flex-col">
                        {/* Old Password */}

                        <div className="mt-4 font-Lexend">
                          <p className="text-[#A7A7A7] mb-2">Old Password</p>
                          <div className="flex justify-between items-center relative">
                            <input
                              type={show_oldPassword ? "text" : "password"}
                              placeholder="Enter Old Password"
                              value={oldPassword}
                              required
                              className="w-full px-2 py-2 font-Lexend border border-[#A7A7A7] rounded-full"
                              onChange={(e) => {
                                setIsUpdatingPassword(false);
                                setOldPassword(e.target.value);
                              }}
                            />
                            {show_oldPassword ? (
                              <FaRegEye
                                className="text-xl absolute right-3 text-[#A7A7A7] hover:text-[#1877F2] cursor-pointer"
                                onClick={handleTogglePasswordVisibility}
                              />
                            ) : (
                              <FaRegEyeSlash
                                className="text-xl absolute right-3 text-[#A7A7A7] hover:text-[#1877F2] cursor-pointer"
                                onClick={handleTogglePasswordVisibility}
                              />
                            )}
                          </div>
                        </div>

                        <div className="mt-4 font-Lexend">
                          <p className="text-[#A7A7A7] mb-2">New Password</p>
                          <div className="flex justify-between items-center relative">
                            <input
                              type={show_newPassword ? "text" : "password"}
                              placeholder="New Password"
                              value={Password}
                              required
                              className="w-full px-2 py-2 font-Lexend border border-[#A7A7A7] rounded-full"
                              onChange={(e) => {
                                setIsUpdatingPassword(false);
                                setPassword(e.target.value);
                              }}
                            />
                            {show_newPassword ? (
                              <FaRegEye
                                className="text-xl absolute right-3 text-[#A7A7A7] hover:text-[#1877F2] cursor-pointer"
                                onClick={handleTogglePasswordVisibility2}
                              />
                            ) : (
                              <FaRegEyeSlash
                                className="text-xl absolute right-3 text-[#A7A7A7] hover:text-[#1877F2] cursor-pointer"
                                onClick={handleTogglePasswordVisibility2}
                              />
                            )}
                          </div>
                        </div>

                        <div className="mt-4 font-Lexend">
                          <p className="text-[#A7A7A7] mb-2">
                            Confirm Password
                          </p>
                          <div className="flex justify-between items-center relative">
                            <input
                              type={show_confirmPassword ? "text" : "password"}
                              placeholder="Confirm Password"
                              value={confirmPassword}
                              required
                              className="w-full px-2 py-2 font-Lexend border border-[#A7A7A7] rounded-full"
                              onChange={(e) => {
                                setIsUpdatingPassword(false);
                                setconfirmPassword(e.target.value);
                              }}
                            />
                            {show_confirmPassword ? (
                              <FaRegEye
                                className="text-xl absolute right-3 text-[#A7A7A7] hover:text-[#1877F2] cursor-pointer"
                                onClick={handleTogglePasswordVisibility3}
                              />
                            ) : (
                              <FaRegEyeSlash
                                className="text-xl absolute right-3 text-[#A7A7A7] hover:text-[#1877F2] cursor-pointer"
                                onClick={handleTogglePasswordVisibility3}
                              />
                            )}
                            <div
                              className="text-red-500 text-sm hidden"
                              ref={passwordNotMatchErr}
                            >
                              Password Not Match
                            </div>
                          </div>
                        </div>

                        {/* Confirm Password */}
                      </div>
                      {/* Hidden Button For Submit the Code */}
                      <button
                        type="submit"
                        className={
                          isUpdatingPassword
                            ? "bg-gray-500 text-white cursor-not-allowed mt-6 rounded-full px-4 py-2"
                            : "bg-[#1877F2] hover:bg-black text-white mt-6 rounded-full px-4 py-2"
                        }
                        ref={changePasswordSubmitButton}
                        disabled={isUpdatingPassword}
                      >
                        {updateProgressPassword
                          ? "Updating...."
                          : "Update Password"}
                      </button>
                    </form>
                  )}
                </>
              ) : (
                ""
              )}
            </div>
            {/* Card Center Side */}
            <div className="px-2 xl:px-16">
              <div className="details flex flex-col gap-4 sm:gap-4">
                <BasicDetailsSection
                  data={userDetails}
                  allCountries={allCountries}
                  reload={reload}
                />
                <ExperienceSection
                  data={get_experiences}
                  allCountries={allCountries}
                  reload={reload}
                />
                <EducationSection
                  data={get_education}
                  allCountries={allCountries}
                  reload={reload}
                />
                <CertificationsSection
                  data={get_certificates}
                  allCountries={allCountries}
                  reload={reload}
                />
                <AwardsSection
                  data={get_awards}
                  allCountries={allCountries}
                  reload={reload}
                />
                <LanguagesSection
                  data={get_languages}
                  allCountries={allCountries}
                  reload={reload}
                />
                <ReferencesSection
                  data={get_references}
                  allCountries={allCountries}
                  reload={reload}
                />
              </div>
            </div>
            {/* Card Right side */}
            <div className="mt-4 ">
              {userDetails ? (
                <>
                  <p className="font-Lexend text-4xl font-bold text-[#1877F2]">
                    {percentage}%
                  </p>
                  <p className="font-Lexend text-md  text-[#343434]  mt-4">
                    Complete Your Profile
                  </p>
                  <p className="w-full bg-[#DFE0E2] mt-2 rounded-full">
                    <p
                      style={{ width: percentage + "%" }}
                      className=" bg-[#1877F2] h-1 rounded-full"
                    ></p>
                  </p>

                  <p className="font-Lexend text-md text-center text-[#A7A7A7]  mt-10">
                    <div className="mb-2">Download Your Resume</div>

                    <button
                      onClick={downloadCV}
                      className="bg-[#1877F2] hover:bg-[#343434] font-Lexend text-sm text-center text-white rounded-full px-4 py-1"
                    >
                      Download CV
                    </button>
                  </p>

                  <p className="font-Lexend text-md text-center text-[#A7A7A7]  mt-10">
                    <div className="mb-2">Parse Your Resume</div>
                    <Link
                      to={"/import-resume"}
                      className="bg-[#1877F2] hover:bg-[#343434] font-Lexend text-sm text-center text-white rounded-full px-4 py-1"
                    >
                      Import CV
                    </Link>
                  </p>
                </>
              ) : (
                <Skeleton width={"300px"} height={"20px"} />
              )}

              <p className="font-Lexend text-md  text-[#A7A7A7]  mt-8">
                Referral Link
              </p>
              <p className="text-[#343434] text-sm font-Lexend  mt-2">
                <div>
                  <span className="text-muted flex flex-wrap justify-between items-center">
                    <div
                      className="color_4 mt_2 font-Lexend text-md  text-[#343434]"
                      ref={divRef}
                      style={{ overflowWrap: "anywhere" }}
                    >
                      {userDetails?.referral_link ? (
                        `https://aiproresume.com/register/${userDetails?.referral_link}`
                      ) : (
                        <Skeleton width={"300px"} height={"20px"} />
                      )}
                      <button
                        className="mr_heading btn_copy"
                        onClick={handleCopyClick}
                      >
                        <HiClipboardCheck className="shareiconmy" size={20} />
                      </button>
                    </div>
                    <div className="flex justify-center items-center w-full gap-4 mt-4">
                      {userDetails?.referral_link ? (
                        <>
                          <FacebookShareButton
                            url={
                              "https://aiproresume.com/register/" +
                              userDetails?.referral_link
                            }
                            quote={"Dummy text!"}
                            title={shareTitle}
                            hashtag="#AIProResume"
                            className="shareiconmy"
                          >
                            <FacebookIcon size={50} round />
                          </FacebookShareButton>
                          <WhatsappShareButton
                            url={
                              "https://aiproresume.com/register/" +
                              userDetails?.referral_link
                            }
                            title={shareTitle}
                            image={shareImageUrl}
                            quote={"Dummy text!"}
                            hashtag="#AIProResume"
                            className="shareiconmy"
                          >
                            <WhatsappIcon size={50} round />
                          </WhatsappShareButton>
                          <LinkedinShareButton
                            url={
                              "https://aiproresume.com/register/" +
                              userDetails?.referral_link
                            }
                            title={shareTitle}
                            quote={"Dummy text!"}
                            hashtag="#AIProResume"
                            className="shareiconmy"
                          >
                            <LinkedinIcon size={50} round />
                          </LinkedinShareButton>
                        </>
                      ) : (
                        <>
                          <Skeleton width={30} height={30} />{" "}
                          {/* Skeleton for Clipboard icon */}
                          <Skeleton circle width={32} height={32} />{" "}
                          {/* Skeleton for Facebook, WhatsApp, and LinkedIn icons */}
                          <Skeleton circle width={32} height={32} />
                          <Skeleton circle width={32} height={32} />
                        </>
                      )}
                    </div>
                  </span>
                </div>
              </p>

              <UserReferral />

              <div className="mt-10 flex flex-col gap-2">
                <div>
                  <h1 className="font-Lexend text-md  text-[#A7A7A7]">
                    Subscription
                  </h1>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="sm:grid sm:grid-cols-[30%,70%] items-center   w-full">
                    <div>
                      <h1 className="font-Lexend text-sm  text-[#343434]">
                        Package
                      </h1>
                    </div>
                    <div className="pl-4">
                      <span className="font-Lexend text-sm font-bold text-[#343434]">
                        {userDetails?.package.name || (
                          <Skeleton width={"150px"} height={"20px"} />
                        )}
                      </span>
                    </div>
                  </div>
                  {/* 2 */}
                  <div className="sm:grid sm:grid-cols-[30%,70%] items-center   w-full">
                    <div>
                      <h1 className="font-Lexend text-sm  text-[#343434]">
                        Registration
                      </h1>
                    </div>
                    <div className="pl-4">
                      <span className="font-Lexend text-sm font-bold  text-[#343434]">
                        {userDetails?.start_date
                          ? formatDate(userDetails?.start_date)
                          : formatDate(userDetails?.created_at) || (
                            <Skeleton width={"150px"} height={"20px"} />
                          )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-start items-start w-full mt-4">
                <input
                  type="checkbox"
                  checked={isAllowShare === 1}
                  className="text-sm mr-2 mt-[6px]  border-solid border-[#0072b1] text-[#0072b1]"
                  onChange={() => {
                    setIsAllowShare(isAllowShare === 0 ? 1 : 0);
                    setIsUpdating(false);
                    handleUserShareChange(isAllowShare === 0 ? 1 : 0);
                  }}
                />
                <p className="ml-1 font-Lexend text-sm text-[#343434]">
                  Do you want to share your resume with companies for global job
                  opportunities?
                </p>
              </div>
              <div className="mt-10">
                {/* Card Top */}
                <div className="pb-6">
                  {/* Info */}
                  <div className="flex flex-col gap-2">
                    <h1 className="font-Lexend text-md  text-[#A7A7A7]">
                      NEED HELP OR WANT TO CHANGE YOUR SUBSCRIPTION ?
                    </h1>
                    <span className="font-Lexend text-sm font-bold text-[#343434] flex items-center">
                      <FiPhone className="mr-4" />{" "}
                      {UserSettings?.contact_number}
                    </span>
                    <a
                      href={`mailto:${UserSettings?.website_email}`}
                      className="font-Lexend text-sm font-bold text-[#343434] hover:text-[#1877F2] flex items-center"
                    >
                      <HiOutlineMail className="mr-4" />{" "}
                      {UserSettings?.website_email}
                    </a>
                  </div>
                </div>
                {/* Card bottom */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* footer */}
      <Footer />


    </div>
  );
};

export default Account;
