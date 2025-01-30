import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import "react-phone-number-input/style.css";
import Header from "./Header";
import PhoneInput from "react-phone-number-input";
import { BiLoaderAlt } from "react-icons/bi";
import { MdOutlineSimCardDownload } from "react-icons/md";
import AllborderInputGroup from "./components/AllborderInputGroup";
import LoadingSpiner from "./components/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import ServicePageBanner from "./components/ServicePageBanner";
import { useAuth } from "./services/Auth";
import ReCAPTCHA from "react-google-recaptcha";
const Page = ({}) => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const [jobId] = useState(id);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  // States
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [resume, setResume] = useState();
  const [experience, setExperience] = useState("");
  const [degree, setDegree] = useState("");
  const [message, setMessage] = useState("");
  const [anyLink, setAnyLink] = useState("");
  const [major, setMajor] = useState("");

  // Set Datas
  const [experienceData, setexperienceData] = useState([]);
  const [degreeData, setdegreeData] = useState([]);
  const { user } = useAuth();
  const [showAlert, setShowAlert] = useState(false);
  const [showErrorMessage, setshowErrorMessage] = useState([]);

  useEffect(() => {
    const headers = {
      Authorization: "Bearer " + user?.token,
    };
    axios
      .get(`${global.baseurl}/show-experiences`, { headers })
      .then((res) => {
        setexperienceData(res.data.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${global.baseurl}/show-degrees`, { headers })
      .then((res) => {
        setdegreeData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
  };

  const handleApplyFormSubmit = async (e) => {
    e.preventDefault();
    if (!verified) {
      setCaptchaError("Please verify that you are a human!");
      return;
    }
    // Set loading state
    setIsButtonDisabled(true);
    setIsProcessing(true);

    const headers = {
      Authorization: "Bearer " + user?.token,
      "Content-type": "multipart/form-data",
    };

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("phone", phoneNumber);
    formData.append("resume", resume);
    formData.append("job_id", jobId);
    formData.append("experience_id", experience);
    formData.append("degree_id", degree);
    formData.append("details", message);
    formData.append("portfolio_link", anyLink);
    formData.append("major", major);

    axios
      .post(`${global.baseurl}/apply-job`, formData, {
        headers,
      })
      .then((res) => {
        setShowAlert(false);
        swal({
          title: "Congratulations!",
          text: res.data.message,
          icon: "success",
        }).then(() => navigate("/careers"));
      })
      .catch((err) => {
        setShowAlert(true);
        setshowErrorMessage([]);
        Object.values(err.response.data.errors).forEach((key) => {
          setshowErrorMessage((prev) => [...prev, key]);
        });
      })
      .finally(() => {
        // Reset loading states
        setIsButtonDisabled(false);
        setIsProcessing(false);
      });
  };

  const RenderDropdown = ({
    label,
    htmlFor,
    placeholder,
    options,
    change,
    value,
  }) => {
    return (
      <div className="py-4 w-full">
        {isLoading && <LoadingSpiner isLoading={isLoading} />}
        <label htmlFor={htmlFor} className="border-[#9b9b9b]">
          {label}
        </label>
        <select
          id={htmlFor}
          placeholder={placeholder}
          onChange={change}
          value={value}
          className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg p-2 border border-[#9b9b9b] focus:border-[#00caa5] outline-none"
        >
          <option value={""} disabled className="text-gray-600">
            Select
          </option>
          {options.map((opt, idx) => {
            return (
              <option key={idx} value={opt.id}>
                {opt.body ? opt.body : opt.title}
              </option>
            );
          })}
        </select>
      </div>
    );
  };

  const [captchaError, setCaptchaError] = useState("");
  const [verified, setVerified] = useState(false);

  const handleCheckCaptcha = () => {
    setVerified(true);
    setCaptchaError("");
  };

  // Reset the reCAPTCHA value after a certain time
  const resetRecaptchaValue = () => {
    setVerified(false);
  };

  // Set a timeout to reset the reCAPTCHA value after 5 minutes (adjust as needed)
  const TIMEOUT_DURATION = 1 * 60 * 1000; // 5 minutes in milliseconds
  let timeoutId;

  const handleRecaptchaTimeout = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(resetRecaptchaValue, TIMEOUT_DURATION);
  };

  const [fileErrorMessage, setFileErrorMessage] = useState("");

  return (
    <div>
      {/* header */}
      <Header />

      {/* <MainBanner
        descriptionText={
          "Embark on a transformative career journey with our AI Pro Resume team. Your next career move starts here, apply now and elevate your expertise in the world of AI-driven resumes!"
        }
        startText={"Walk towards Your Future with"}
        highlightText={"AI Professional Resume"}
        endText={"Career Opportunities"}
      /> */}

      <div className="w-full h-[20%]">
        <ServicePageBanner
          startText={""}
          startHeadingText={"Walk towards Your Future with"}
          highLightedText={"AI Professional Resume"}
          endText={"Career Opportunities"}
          description={
            "Embark on a transformative career journey with our AI Pro Resume team. Your next career move starts here, apply now and elevate your expertise in the world of AI-driven resumes!"
          }
        />
      </div>

      <section className="w-full bg-[#fff] py-20 px-4 2xl:px-40 flex flex-wrap flex-col justify-between gap-16 align-middle">
        {/* Main Text Section */}
        {/* <div className="text-center  w-full">
          <h1 className="text-[#0072b1] font_1 text-base sm:text-4xl leading-[1.2]">
            Walk towards Your Future with{" "}
            <span className="text-[#00caa5]">AI Professional Resume</span>{" "}
            <br /> Career Opportunities
          </h1>
        </div> */}
        {/* Apply From */}
        <form onSubmit={handleApplyFormSubmit} action="">
          <div className="bg-[#fff] shadow-[0_0_20px_0px_rgba(0,0,0,0.3)] rounded-lg px-4 py-10 h-auto relative sm:w-full lg:w-[70%] m-auto">
            <h1 className="text-[#00caa5] font_1 text-xl sm:text-3xl mb-10">
              Tell us about yourself.
            </h1>
            {/* Row 1 */}
            <div className="flex sm:gap-4 flex-col sm:flex-row items-center w-full">
              {/* First Name */}
              <AllborderInputGroup
                label={"FIRST NAME *"}
                isRequired={true}
                htmlFor={"first_name"}
                value={firstName}
                onchange={(val) => setFirstName(val)}
              />
              {/* last Name */}
              <AllborderInputGroup
                label={"LAST NAME *"}
                isRequired={true}
                htmlFor={"last_name"}
                value={lastName}
                onchange={(val) => setLastName(val)}
              />
            </div>
            {/* Row 2 */}
            <div className="flex sm:gap-4 flex-col sm:flex-row items-center w-full">
              {/* First Name */}
              <AllborderInputGroup
                label={"E-MAIL *"}
                isRequired={true}
                htmlFor={"email"}
                onchange={(val) => setEmail(val)}
                value={email}
                type={"email"}
              />
              {/* last Name */}
              <div className="py-4 w-full">
                <label htmlFor={"phone_number"} className="border-[#9b9b9b]">
                  PHONE
                </label>
                <PhoneInput
                  type={"tel"}
                  id="phone_number"
                  onChange={handlePhoneNumberChange}
                  value={phoneNumber}
                  className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg p-2 border border-[#9b9b9b]  focus:border-[#00caa5] outline-none"
                />
              </div>
            </div>
            {/* Upload Resume Text */}
            <h1 className="text-[#0072b1] font_1 text-base sm:text-2xl sm:mb-10">
              Upload Resume
            </h1>
            {/* Row 2 */}
            <div className="flex sm:gap-4 flex-col sm:flex-row items-center w-full">
              {/* Resume */}
              <div className="py-4 w-full flex flex-col">
                <label htmlFor={"resume"} className="border-[#9b9b9b]">
                  FILE CHOSEN
                </label>
                <label
                  htmlFor={"resume"}
                  className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg p-2 border border-[#9b9b9b]  focus:border-[#00caa5] outline-none flex items-center"
                >
                  <MdOutlineSimCardDownload className="font_3 text-3xl" />
                  <div className="flex-1 flex justify-center items-center">
                    {resume ? resume.name : "doc,  docx,  pdf"}
                  </div>
                </label>
                <input
                  type="file"
                  id="resume"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file && file.size <= 5 * 1024 * 1024) {
                      setFileErrorMessage("");
                      setResume(file);
                    } else {
                      setFileErrorMessage(
                        "The file you selected exceeds the 5 MB size limit. Please choose a smaller file."
                      );
                    }
                  }}
                  accept=".doc,.docx,.pdf"
                />
                <div>
                  <span className="text-sm text-red-500">
                    {fileErrorMessage}
                  </span>
                </div>
              </div>
            </div>
            {/* Row 4 */}
            <div className="flex sm:gap-4 flex-col sm:flex-row items-center w-full">
              {/* EXPERIENCE */}
              <RenderDropdown
                options={experienceData}
                change={(e) => setExperience(e.target.value)}
                htmlFor={"experience"}
                label={"EXPERIENCE"}
                placeholder={"1-5 years"}
                value={experience}
              />
              {/* last Name */}
              <RenderDropdown
                options={degreeData}
                change={(e) => setDegree(e.target.value)}
                htmlFor={"degree"}
                label={"DEGREE"}
                placeholder={"Bs"}
                value={degree}
              />
            </div>

            <div className="flex sm:gap-4 flex-col sm:flex-row items-center w-full">
              <AllborderInputGroup
                label={"MAJOR"}
                isRequired={true}
                htmlFor={"major"}
                onchange={(val) => setMajor(val)}
                value={major}
              />
            </div>

            {/* Row 5 */}
            <div className="flex sm:gap-4 flex-col sm:flex-row items-center w-full">
              {/* EXPERIENCE */}
              <div className="py-4 w-full">
                <label htmlFor={"message"} className="border-[#9b9b9b]">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  rows={3}
                  className="w-full resize-none font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg p-2 border border-[#9b9b9b] focus:border-[#00caa5] outline-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>
            {/* Row 6 */}
            <div className="py-4">
              <input
                type="text"
                className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-base border-b-[1px] border-[#9b9b9b] focus:border-[#00caa5] outline-none placeholder:text-[#0072b1]"
                placeholder="Websites / Portfolio / LinkedIn"
                value={anyLink}
                onChange={(link) => setAnyLink(link.target.value)}
              />
            </div>
            {showAlert && (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-yellow-700 p-4 rounded relative"
                role="alert"
              >
                <ul className="list-disc ml-4">
                  {showErrorMessage.map((msg, idx) => (
                    <li>
                      <strong key={idx} className="block font-bold sm:inline">
                        {msg}
                      </strong>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="absolute top-0 right-0 mt-4 mr-4"
                  onClick={() => setShowAlert(false)}
                >
                  <span className="text-yellow-700">&times;</span>
                </button>
              </div>
            )}
            {/* Buttons */}
            <div className="py-8 flex flex-row-reverse">
              <div className="w-full flex flex-col sm:flex sm:flex-row items-center justify-center gap-10">
                <div className="flex flex-col items-start mt-4">
                  <span className="text-red-500 text-sm">{captchaError}</span>
                  <ReCAPTCHA
                    sitekey={global.captcha_sitekey}
                    onChange={(val) => {
                      handleCheckCaptcha(val);
                      handleRecaptchaTimeout();
                    }}
                  />
                </div>
                <button
                  style={{ display: isProcessing ? "none" : "flex" }}
                  id="contact_button"
                  type="submit"
                  className="text-white bg-[#0072b1] hover:bg-[#00caa5] transition-all duration-150 ease-in font_1 text-lg px-8 py-2 rounded-full"
                  disabled={isButtonDisabled}
                >
                  SUBMIT
                </button>
                <button
                  // id="loader"
                  style={{ display: isProcessing ? "flex" : "none" }}
                  className="bg-[#0072b1] text-white hover:bg-[#00caa5] transition-all duration-150 ease-in font_1 text-lg px-8 py-2 rounded-full flex"
                  type="button"
                  disabled
                >
                  <BiLoaderAlt size={28} className="mr-2 animate-spin" />{" "}
                  Processing...
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>

      {/* footer */}
      <Footer />
    </div>
  );
};

export default Page;
