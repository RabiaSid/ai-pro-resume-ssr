import React, { useEffect, useRef, useState } from "react";
import temp from "../assets/images/temp.webp";
import prof_img_def from "../assets/images/avatar.webp";
import Footer from "./Footer";
import Templates from "./Templates";
import Progress from "./Progress";
import $ from "jquery";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiArrowDownSLine } from "react-icons/ri";
import { BiCamera, BiPencil } from "react-icons/bi";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import swal from "sweetalert";
import { useAuth } from "../services/Auth";
import Loader from "../Loader";

const Header = ({ isOpen }) => {
  const { user } = useAuth();
  const [check_loader, set_check_loader] = useState(0);
  const nameParts = user?.name.split(" ");
  const firstNameInitial = nameParts[0] ? nameParts[0] : "";
  const SecondInitial = nameParts[1] ? nameParts[1] : "";
  const inputRef = useRef(null);
  const today = new Date().toISOString().split("T")[0];

  const handleClick = () => {
    // Programmatically focus on the input element
    inputRef.current.click();
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const page_uuid = useParams().uuid;
  const isExampleTrue = new URLSearchParams(window.location.search).get(
    "example"
  );
  const isTemplateTrue = new URLSearchParams(window.location.search).get(
    "template"
  );
  const templateid = new URLSearchParams(window.location.search).get(
    "templateid"
  );

  const res_uuid = Cookies.get("doc_uuid");
  const res_profile_id = Cookies.get("profile_id");
  const res_temp_id = Cookies.get("sel_template");
  const is_edit = Cookies.get("is_edit");

  const [file, setFile] = useState(null);

  // 'first_name':firstNameInitial,
  // 'last_name':SecondInitial,
  // 'contact_number':user?.contact,
  // 'email_address':user?.email,
  // 'country_id':user?.country_id
  const [personal_info, setpersonal_info] = useState({});
  const [countries, setcountries] = useState([]);
  const [province, setprovince] = useState([]);
  const [cities, setcities] = useState([]);
  const [seleted_template, set_seleted_template] = useState([]);
  const [job_positions, setjob_positions] = useState([]);

  const handlePhoneNumberChange = (value) => {
    //setPhoneNumber(value);
    setpersonal_info({
      ...personal_info,
      ["phone_number"]: value,
    });
  };

  const handlePhoneNumberChange2 = (value) => {
    //setPhoneNumber2(value);
    setpersonal_info({
      ...personal_info,
      ["contact_number"]: value,
    });
  };

  const handleChange = (event) => {
    // Update the state when the input value changes
    //setpersonal_info({ ...personal_info, first_name: event.target.value });
    const { id, value } = event.target;
    setpersonal_info({
      ...personal_info,
      [id]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    var valid_firstname = 0;
    var valid_lastname = 0;
    var valid_job_title = 0;
    var valid_email_address = 0;
    var valid_country_id = 0;
    var valid_contact_number = 0;
    var valid_linkedin = 0;
    var valid_website = 0;
    var valid_phone_number = 0;

    if (
      personal_info.resume_name === "" ||
      personal_info.resume_name === undefined ||
      personal_info.resume_name === null
    ) {
      personal_info.resume_name =
        personal_info.first_name + personal_info.last_name;
    }
    if (
      personal_info.template_id === "" ||
      personal_info.template_id === undefined
    ) {
      personal_info.template_id = 1;
    }

    if (
      personal_info.first_name === "" ||
      personal_info.first_name === undefined
    ) {
      $("#first_name_valid").html("First Name is Empty");
    } else {
      $("#first_name_valid").html("");
      valid_firstname = 1;
    }

    if (
      personal_info.last_name === "" ||
      personal_info.last_name === undefined
    ) {
      $("#last_name_valid").html("Last Name is Empty");
    } else {
      $("#last_name_valid").html("");
      valid_lastname = 1;
    }

    if (
      personal_info.job_title === "" ||
      personal_info.job_title === undefined
    ) {
      $("#job_title_valid").html("Job Title is Empty");
    } else {
      $("#job_title_valid").html("");
      valid_job_title = 1;
    }

    if (
      personal_info.email_address === "" ||
      personal_info.email_address === undefined
    ) {
      $("#email_address_valid").html("Email Address is Empty");
    } else if (
      personal_info.email_address.indexOf("@") === -1 ||
      personal_info.email_address.indexOf(".") === -1
    ) {
      $("#email_address_valid").html("Please Enter a Valid Email Address");
    } else {
      $("#email_address_valid").html("");
      valid_email_address = 1;
    }

    if (
      personal_info.country_id === "" ||
      personal_info.country_id === undefined ||
      personal_info.country_id === null
    ) {
      $("#country_id_valid").html("Please Select Country");
    } else {
      $("#country_id_valid").html("");
      valid_country_id = 1;
    }

    if (
      personal_info.contact_number === "" ||
      personal_info.contact_number === undefined
    ) {
      $("#contact_number_valid").html("Mobile Number is Empty");
    } else if (
      personal_info.contact_number.length < 10 ||
      personal_info.contact_number.length > 20
    ) {
      $("#contact_number_valid").html("Please Enter a Valid Mobile Number");
    } else {
      $("#contact_number_valid").html("");
      valid_contact_number = 1;
    }

    var urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

    if (
      personal_info.linkedin === null ||
      personal_info.linkedin === "" ||
      personal_info.linkedin === undefined
    ) {
      $("#linkedin_valid").html("");
      valid_linkedin = 1;
    } else {
      if (!urlPattern.test(personal_info.linkedin)) {
        $("#linkedin_valid").html("Please Enter a Valid URL");
        alert(personal_info.linkedin);
      } else {
        $("#linkedin_valid").html("");
        valid_linkedin = 1;
      }
    }

    if (
      personal_info.website === null ||
      personal_info.website === "" ||
      personal_info.website === undefined
    ) {
      $("#website_valid").html("");
      valid_website = 1;
    } else {
      if (!urlPattern.test(personal_info.website)) {
        $("#website_valid").html("Please Enter a Valid URL");
      } else {
        $("#website_valid").html("");
        valid_website = 1;
      }
    }

    if (
      personal_info.phone_number === null ||
      personal_info.phone_number === undefined ||
      personal_info.phone_number === ""
    ) {
      $("#phone_number_valid").html("");
      valid_phone_number = 1;
    } else {
      if (
        personal_info.phone_number.length < 10 ||
        personal_info.phone_number.length > 20
      ) {
        $("#phone_number_valid").html("Please Enter a Valid Phone Number");
      } else {
        $("#phone_number_valid").html("");
        valid_phone_number = 1;
      }
    }

    if (
      valid_firstname === 1 &&
      valid_lastname === 1 &&
      valid_job_title === 1 &&
      valid_email_address === 1 &&
      valid_country_id === 1 &&
      valid_contact_number === 1 &&
      valid_linkedin === 1 &&
      valid_website === 1 &&
      valid_phone_number === 1
    ) {
      set_check_loader(1);

      if (page_uuid && isExampleTrue === null) {
        var method = "PUT";
      } else {
        var method = "POST";
      }

      const article = {
        resume_name: personal_info.resume_name,
        first_name: personal_info.first_name,
        middle_name: personal_info.middle_name,
        last_name: personal_info.last_name,
        phone_number: personal_info.phone_number,
        contact_number: personal_info.contact_number,
        email_address: personal_info.email_address,
        linkedin: personal_info.linkedin,
        website: personal_info.website,
        street_address: personal_info.street_address,
        postal_code: personal_info.postal_code,
        date_of_birth: personal_info.date_of_birth,
        gender: personal_info.gender,
        maritial_status: personal_info.maritial_status,
        nationality: personal_info.nationality,
        id_no: personal_info.id_no,
        job_title: personal_info.job_title,
        country_id: personal_info.country_id,
        state_id: personal_info.state_id,
        city_id: personal_info.city_id,
        template_id: seleted_template,
        status: 1,
        profile_image: file,
        _method: method,
      };
      //const token=global.getCookie('token');

      const headers = {
        Authorization: "Bearer " + user?.token,
        "Content-type": "multipart/form-data",
      };
      if (page_uuid && isExampleTrue === null) {
        await axios
          .post(
            global.baseurl + "/personal_information/" + page_uuid,
            article,
            { headers }
          )
          .then((data) => {
            if (data) {
              Cookies.set("profile_id", data.data.data.id, { expires: 1 }); // Expires in 1 day
              set_check_loader(0);
              window.location.href =
                global.localPath + "resume/summary/" + data.data.data.id;
            }
          })
          .catch((err) => {
            //console.log(err.response.data.message);
            set_check_loader(0);
            swal("Error!", err.response.data.message, "error");
          });
      } else {
        await axios
          .post(global.baseurl + "/personal_information", article, { headers })
          .then((data) => {
            if (data) {
              Cookies.set("res_per_header", 30, { expires: 1 }); // Expires in 1 day
              Cookies.set("profile_id", data.data.data.id, { expires: 1 }); // Expires in 1 day
              Cookies.set("doc_uuid", data.data.data.uuid, { expires: 1 }); // Expires in 1 day
              set_check_loader(0);
              if (isExampleTrue === "true") {
                window.location.href =
                  global.localPath +
                  "resume/summary/" +
                  page_uuid +
                  "?example=true";
              } else {
                window.location.href = global.localPath + "resume/summary";
              }
            }
          })
          .catch((err) => {
            console.log(err);
            set_check_loader(0);
            swal("Error!", err.response.data.message, "error");
          });
      }
    }
  };

  useEffect(() => {
    console.log("asdasdasdasd");
    console.log(isTemplateTrue);

    set_seleted_template(res_temp_id);
    //const token=global.getCookie('token');

    const headers = {
      Authorization: "Bearer " + user?.token,
    };
    if (isExampleTrue === "true") {
      Cookies.set("sel_template", templateid, { expires: 1 });
      Cookies.set("doc_uuid", "", { expires: 1 }); // Expires in 1 day
      axios
        .get(global.baseurl + "/resume_example/" + page_uuid, { headers })
        .then((data) => {
          if (data) {
            console.log(data);
            axios
              .get(
                global.baseurl +
                "/states/show-states/" +
                data.data.data.example.country_id,
                { headers }
              )
              .then((data) => {
                if (data) {
                  setprovince(data.data?.data);
                }
              })
              .catch((err) => {
                console.log(err);
              });
            axios
              .get(
                global.baseurl +
                "/cities/show-cities/" +
                data.data.data.example.state_id,
                { headers }
              )
              .then((data) => {
                if (data) {
                  setcities(data.data?.data);
                }
              })
              .catch(() => { });

            setTimeout(function () {
              setpersonal_info(data.data.data.example);
            }, 1000);
            set_seleted_template(templateid);
            console.log(data.data.data.example);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (page_uuid && isExampleTrue === null) {
      //GET PERSONAL INFORMATION
      axios
        .get(global.baseurl + "/personal_information/" + page_uuid, { headers })
        .then((data) => {
          if (data) {
            axios
              .get(
                global.baseurl +
                "/states/show-states/" +
                data.data.data[0].country_id,
                { headers }
              )
              .then((data) => {
                if (data) {
                  setprovince(data.data?.data);
                }
              })
              .catch((err) => {
                console.log(err);
              });
            axios
              .get(
                global.baseurl +
                "/cities/show-cities/" +
                data.data.data[0].state_id,
                { headers }
              )
              .then((data) => {
                if (data) {
                  setcities(data.data?.data);
                }
              })
              .catch(() => { });

            setTimeout(function () {
              setpersonal_info(data.data.data[0]);
            }, 1000);
            console.log("abcd");
            console.log(data.data.data[0]);
            set_seleted_template(data.data.data[0].template_id);
            Cookies.set("sel_template", data.data.data[0].template_id, {
              expires: 1,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setpersonal_info({
        ...personal_info,
        ["first_name"]: firstNameInitial,
        ["last_name"]: SecondInitial,
        ["contact_number"]: user?.contact,
        ["email_address"]: user?.email,
        ["country_id"]: user?.country_id,
      });

      axios
        .get(global.baseurl + "/states/show-states/1")
        .then((data) => {
          if (data) {
            setprovince(data.data?.data);
          }
        })
        .catch(() => { });
      axios
        .get(global.baseurl + "/cities/show-cities/1", { headers })
        .then((data) => {
          if (data) {
            setcities(data.data?.data);
          }
        })
        .catch(() => { });
    }

    // const article = {  };
    axios
      .get(global.baseurl + "/show-countries", { headers })
      .then((data) => {
        if (data) {
          setcountries(data.data?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    if (isTemplateTrue === "true") {
      Cookies.set("sel_template", page_uuid, { expires: 1 });
    }

    axios
      .get(global.baseurl + "/show-job-positions", { headers })
      .then((data) => {
        if (data) {
          setjob_positions(data.data?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const set_country = (n) => {
    var country = $("#country_id").val();
    //const token=global.getCookie('token');
    const headers = {
      Authorization: "Bearer " + user?.token,
    };
    // const article = {  };

    axios
      .get(global.baseurl + "/states/show-states/" + country, { headers })
      .then((data) => {
        if (data) {
          setprovince(data.data?.data);
        }
      })
      .catch(() => { });
  };

  const set_city = (n) => {
    var province = $("#state_id").val();
    //const token=global.getCookie('token');
    const headers = {
      Authorization: "Bearer " + user?.token,
    };
    // const article = {  };

    axios
      .get(global.baseurl + "/cities/show-cities/" + province, { headers })
      .then((data) => {
        if (data) {
          setcities(data.data?.data);
        }
      })
      .catch(() => { });
  };

  return (
    <section
      id="main_contents_wrap"
      className="w-full  lg:w-[75%] xl:w-[80%] 2xl:w-[85%]"
    >
      {check_loader === 1 ? <Loader /> : ""}
      <div id="main_contents" className="">
        <div className="flex flex-wrap justify-center align-top min-h-[1000px] px-6">
          <div className="w-full">
            <Progress />
          </div>

          <div className="w-full lg:w-[70%]">
            <h1 className="font_1 text-slate-900 text-3xl  text-center">
              Begin Your Resume Journey here!
            </h1>
            <p className="font_3 text-slate-500 text-xl mt-4 text-center">
              Create impactful resumes that display your strengths.
            </p>

            <div className="flex flex-wrap justify-between align-start mt-20">
              <div className="w-full px-4 py-4 flex justify-start items-start">
                <img
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : personal_info.profile_image
                        ? global.imageUrl + personal_info.profile_image
                        : prof_img_def
                  }
                  className="rounded-full w-[130px] h-[130px] shadow-sm"
                  width={130}
                  height={130}
                  alt="user_img"
                />
                <label htmlFor="fileInput">
                  <span className="relative">
                    <BiPencil
                      size={30}
                      className="bg-black hover:bg-[#0072b1] cursor-pointer text-white p-1 rounded-full shadow-lg relative right-[20px]"
                    />
                  </span>
                  <input
                    id="fileInput"
                    className="hidden"
                    type="file"
                    name="file"
                    accept=".png,.jpg,.jpeg"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </label>
              </div>

              <input
                type="hidden"
                id="template_id"
                defaultValue={
                  personal_info.template_id ? personal_info.template_id : 1
                }
                onChange={handleChange}
              />

              <input
                type="hidden"
                id="resume_name"
                name="resume_name"
                autoComplete="on"
                defaultValue={
                  personal_info.resume_name ? personal_info.resume_name : ""
                }
                onChange={handleChange}
              />

              <div className="w-full xl:w-[33.3%] px-4 py-4">
                <label htmlFor="firstName" className="text-md text-gray-500">
                  FIRST NAME <span className="text-rose-600 font-bold">*</span>
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  autoComplete="on"
                  placeholder="John"
                  className="h-8 border border-gray-300 mt-1 rounded px-4 w-full text-black"
                  defaultValue={
                    personal_info.first_name ? personal_info.first_name : ""
                  }
                  onChange={handleChange}
                />
                <div
                  className="text-rose-600 text-sm font-semibold"
                  id="first_name_valid"
                ></div>
              </div>
              <div className="w-full xl:w-[33.3%] px-4 py-4">
                <label htmlFor="middleName" className="text-md text-gray-500">
                  MIDDLE NAME
                </label>
                <input
                  type="text"
                  id="middle_name"
                  name="middle_name"
                  autoComplete="on"
                  placeholder="Doe"
                  className="h-8 border border-gray-300 mt-1 rounded px-4 w-full text-black"
                  defaultValue={
                    personal_info.middle_name ? personal_info.middle_name : ""
                  }
                  onChange={handleChange}
                />
              </div>
              <div className="w-full xl:w-[33.3%] px-4 py-4">
                <label htmlFor="lastName" className="text-md text-gray-500">
                  LAST NAME <span className="text-rose-600 font-bold">*</span>
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  autoComplete="on"
                  placeholder="Smith"
                  className="h-8 border border-gray-300 mt-1 rounded px-4 w-full text-black"
                  defaultValue={
                    personal_info.last_name ? personal_info.last_name : ""
                  }
                  onChange={handleChange}
                />
                <div
                  className="text-rose-600 text-sm font-semibold"
                  id="last_name_valid"
                ></div>
              </div>
              <div className="w-full xl:w-[33.3%] px-4 py-4">
                <label htmlFor="phone" className="text-md text-gray-500">
                  PHONE NUMBER
                </label>
                <PhoneInput
                  onChange={handlePhoneNumberChange}
                  id="phone_number"
                  name="phone_number"
                  autoComplete="on"
                  maxLength={20}
                  placeholder="+92 57 ********"
                  value={
                    personal_info.phone_number ? personal_info.phone_number : ""
                  }
                  className="h-8 border border-gray-300 mt-1 rounded px-4 w-full text-black"
                />
                <div
                  className="text-rose-600 text-sm font-semibold"
                  id="phone_number_valid"
                ></div>
                {/* <input
                        type="number"
                        id="phone_number"
                        placeholder='031-xxxxxxx'
                        className="h-8 border border-gray-300 mt-1 rounded px-4 w-full"
                        defaultValue={personal_info.phone_number ? personal_info.phone_number : ''}
                        onChange={handleChange}
                      /> */}
              </div>

              <div className="w-full xl:w-[33.3%] px-4 py-4">
                <label htmlFor="mobile" className="text-md text-gray-500">
                  MOBILE NUMBER{" "}
                  <span className="text-rose-600 font-bold">*</span>
                </label>
                <PhoneInput
                  onChange={handlePhoneNumberChange2}
                  id="contact_number"
                  name="contact_number"
                  autoComplete="on"
                  placeholder="+92 57 ********"
                  maxLength={20}
                  value={
                    personal_info.contact_number
                      ? personal_info.contact_number
                      : ""
                  }
                  className="h-8 border border-gray-300 mt-1 rounded px-4 w-full text-black"
                />
                <div
                  className="text-rose-600 text-sm font-semibold"
                  id="contact_number_valid"
                ></div>
                {/* <input
                        type="number"
                        id="contact_number"
                        placeholder='032222215151'
                        className="h-8 border border-gray-300 mt-1 rounded px-4 w-full"
                        defaultValue={personal_info.contact_number ? personal_info.contact_number : ''}
                        onChange={handleChange}
                      /> */}
              </div>

              <div className="w-full xl:w-[33.3%] px-4 py-4">
                <label htmlFor="email" className="text-md text-gray-500">
                  EMAIL ADDRESS{" "}
                  <span className="text-rose-600 font-bold">*</span>
                </label>
                <input
                  type="email"
                  id="email_address"
                  name="email_address"
                  autoComplete="on"
                  placeholder="jd.smith@example.com"
                  className="h-8 border border-gray-300 mt-1 rounded px-4 w-full text-black"
                  defaultValue={
                    personal_info.email_address
                      ? personal_info.email_address
                      : ""
                  }
                  onChange={handleChange}
                />
                <div
                  className="text-rose-600 text-sm font-semibold"
                  id="email_address_valid"
                ></div>
              </div>

              <div className="w-full xl:w-[50%] px-4 py-4">
                <label htmlFor="linkedin" className="text-md text-gray-500">
                  LINKEDIN URL
                </label>
                <input
                  type="text"
                  id="linkedin"
                  name="linkedin"
                  autoComplete="on"
                  className="h-8 mt-1 rounded px-4 w-full border border-gray-300 text-black"
                  defaultValue={
                    personal_info.linkedin ? personal_info.linkedin : ""
                  }
                  onChange={handleChange}
                  onBlur={handleChange}
                  placeholder="https://www.linkedin.com/"
                />
                <div
                  className="text-rose-600 text-sm font-semibold"
                  id="linkedin_valid"
                ></div>
              </div>

              <div className="w-full xl:w-[50%] px-4 py-4">
                <label htmlFor="website" className="text-md text-gray-500">
                  WEBSITE URL
                </label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  autoComplete="on"
                  className="h-8 mt-1 rounded px-4 w-full border border-gray-300 text-black"
                  defaultValue={
                    personal_info.website ? personal_info.website : ""
                  }
                  onChange={handleChange}
                  onBlur={handleChange}
                  placeholder="https://www.google.com/"
                />
                <div
                  className="text-rose-600 text-sm font-semibold"
                  id="website_valid"
                ></div>
              </div>

              <div className="w-full xl:w-[100%] px-4 py-2">
                <label htmlFor="mail" className="text-xs text-[#0072b1]">
                  MAILING ADDRESS
                </label>
              </div>
              <div className="xl:w-[100%] px-4 py-2">
                <label
                  htmlFor="street_address"
                  className="text-md text-gray-500"
                >
                  STREET ADDRESS
                </label>
                <input
                  type="text"
                  id="street_address"
                  name="street_address"
                  autoComplete="on"
                  className="h-8 border border-gray-300 text-black mt-1 rounded px-4 w-full"
                  defaultValue={
                    personal_info.street_address
                      ? personal_info.street_address
                      : ""
                  }
                  onChange={handleChange}
                  placeholder="Queen Street East, Brampton, Canada"
                />
              </div>
              <div className="w-full xl:w-[50%] px-4 py-2">
                <label htmlFor="postal_code" className="text-md text-gray-500">
                  POSTAL CODE
                </label>
                <input
                  type="text"
                  maxLength={8}
                  id="postal_code"
                  name="postal_code"
                  autoComplete="on"
                  className="h-8 border text-black border-gray-300 mt-2 rounded px-4 w-full"
                  defaultValue={
                    personal_info.postal_code ? personal_info.postal_code : ""
                  }
                  onChange={handleChange}
                  placeholder="A5466"
                />
              </div>

              <div className="w-full xl:w-[50%] px-4 py-2">
                <label htmlFor="country_id" className="text-md text-gray-500">
                  COUNTRY <span className="text-rose-600 font-bold">*</span>
                </label>
                <select
                  className="h-8 border text-black border-gray-300 mt-2 rounded px-4 w-full"
                  id="country_id"
                  name="country_id"
                  autoComplete="on"
                  //onChange={(n) => set_country('0')}
                  value={
                    personal_info.country_id ? personal_info.country_id : ""
                  }
                  onChange={(event) => {
                    handleChange(event); // Call handleChange function
                    set_country("0"); // Call set_country function with argument '0'
                  }}
                >
                  <option value="">Select Country</option>
                  {countries.map((country, index_country) => (
                    <option value={country?.id} key={index_country}>
                      {country?.name}
                    </option>
                  ))}
                </select>
                <div
                  className="text-rose-600 text-sm font-semibold"
                  id="country_id_valid"
                ></div>
              </div>

              <div className="w-full xl:w-[50%] px-4 py-2">
                <label htmlFor="state_id" className="text-md text-gray-500">
                  STATE
                </label>
                <select
                  className="h-8 border text-black border-gray-300 mt-2 rounded px-4 w-full"
                  id="state_id"
                  name="state_id"
                  autoComplete="on"
                  value={personal_info.state_id ? personal_info.state_id : ""}
                  onChange={(event) => {
                    handleChange(event); // Call handleChange function
                    set_city("0"); // Call set_country function with argument '0'
                  }}
                >
                  <option>Select State</option>
                  {province.map((pro, index_pro) => (
                    <option value={pro?.id} key={index_pro}>
                      {pro?.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full xl:w-[50%] px-4 py-2">
                <label htmlFor="city_id" className="text-md text-gray-500">
                  CITY
                </label>
                <select
                  className="h-8 border text-black border-gray-300 mt-2 rounded px-4 w-full"
                  id="city_id"
                  name="city_id"
                  autoComplete="on"
                  value={personal_info.city_id ? personal_info.city_id : ""}
                  onChange={handleChange}
                >
                  <option>Select City</option>
                  {cities.map((city, index_city) => (
                    <option value={city?.id} key={index_city}>
                      {city?.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full xl:w-[100%] px-4 py-2 mt-4">
                <label htmlFor="info" className="text-xs text-[#0072b1]">
                  ADDITIONAL INFORMATION
                </label>
              </div>
              <div className="w-full xl:w-[50%] px-4 py-2">
                <label
                  htmlFor="date_of_birth"
                  className="text-md text-gray-500"
                >
                  DATE OF BIRTH
                </label>
                <input
                  type="date"
                  id="date_of_birth"
                  name="date_of_birth"
                  autoComplete="on"
                  className="h-8 border border-gray-300 text-black mt-2 rounded px-4 w-full"
                  defaultValue={
                    personal_info.date_of_birth
                      ? personal_info.date_of_birth
                      : ""
                  }
                  pattern="\d{4}-\d{2}-\d{2}"
                  onChange={handleChange}
                  onClick={handleClick}
                  max={today} // Assign the ref to the input element
                />
              </div>
              <div className="w-full xl:w-[50%] px-4 py-2">
                <label htmlFor="gender" className="text-md text-black">
                  GENDER
                </label>
                <select
                  id="gender"
                  className="h-8 mt-1 rounded px-4 w-full border border-gray-300 text-black"
                  name="gender"
                  autoComplete="on"
                  value={personal_info.gender ? personal_info.gender : ""}
                  onChange={handleChange}
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="prefer not to say">Prefer not to say</option>
                </select>
              </div>
              <div className="w-full xl:w-[50%] px-4 py-2">
                <label
                  htmlFor="maritial_status"
                  className="text-md text-gray-500"
                >
                  MARTIAL STATUS
                </label>
                <select
                  id="maritial_status"
                  autoComplete="on"
                  className="h-8 mt-2 rounded px-4 w-full border border-gray-300 text-black"
                  name="maritial_status"
                  value={
                    personal_info.maritial_status
                      ? personal_info.maritial_status
                      : ""
                  }
                  onChange={handleChange}
                >
                  <option>Martial Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>
              <div className="w-full xl:w-[50%] px-4 py-2">
                <label htmlFor="nationality" className="text-md text-gray-500">
                  NATIONALITY
                </label>
                <input
                  type="text"
                  id="nationality"
                  name="nationality"
                  autoComplete="on"
                  className="h-8 border border-gray-300 text-black mt-2 rounded px-4 w-full"
                  defaultValue={
                    personal_info.nationality ? personal_info.nationality : ""
                  }
                  onChange={handleChange}
                  placeholder="Canadian"
                />
              </div>
              <div className="w-full xl:w-[50%] px-4 py-2">
                <label htmlFor="id_no" className="text-md text-gray-500">
                  NATIONAL ID
                </label>
                <input
                  type="number"
                  id="id_no"
                  name="id_no"
                  autoComplete="on"
                  className="h-8 border border-gray-300 text-black mt-2 rounded px-4 w-full"
                  defaultValue={personal_info.id_no ? personal_info.id_no : ""}
                  onChange={handleChange}
                  placeholder="454********"
                />
              </div>
              <div className="w-full xl:w-[50%] px-4 py-2 setMUI">
                <label htmlFor="job_title" className="text-md text-gray-500">
                  JOB TITLE <span className="text-rose-600 font-bold">*</span>
                </label>
                {/* <input
                        type="text"
                        id="job_title"
                        className="h-8 border border-gray-300 text-gray-500 mt-2 rounded px-4 w-full"
                        defaultValue={personal_info.job_title ? personal_info.job_title : ''}
                        onChange={handleChange}
                        placeholder="React, Laravel, Flutter..."
                      /> */}

                <Autocomplete
                  freeSolo
                  id="job_title"
                  className="mt-2"
                  disableClearable
                  value={personal_info.job_title ? personal_info.job_title : ""}
                  options={job_positions
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((job_position) => job_position.name)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=""
                      autoComplete="on"
                      placeholder="React, Laravel, Flutter..."
                      sx={{
                        height: 10,
                      }}
                      //className='h-8 border border-gray-300 rounded px-4 w-full text-black'
                      InputProps={{
                        ...params.InputProps,
                        type: "search",
                      }}
                      onChange={handleChange}
                      onBlur={handleChange}
                    />
                  )}
                />
                <div
                  className="text-rose-600 text-sm font-semibold mt-2"
                  id="job_title_valid"
                ></div>
              </div>
              <div className="w-full flex justify-between items-center flex-wrap px-4 py-4">
                {/* <Link href="/resume/header/preview">
                        <button className="border border-gray-500 py-2 px-4 rounded sm:text-base text-sm">
                          BACK
                        </button>
                      </Link> */}
                <button
                  className="bg-[#00caa5] w-full lg:w-auto text-white font_1 px-6 py-4 rounded-full shadow-xl text-xl hover:bg-[#0072b1] transition-all duration-500 my-2"
                  onClick={handleSubmit}
                >
                  SAVE & CONTINUE
                </button>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[30%] my-10 lg:my-40">
            <div className="w-full lg:w-[90%] h-[400px] overflow-hidden m-auto border border-slate-300 p-2">
              <Templates
                zoom={isMobile ? 28 : 40}
                temp_id={
                  Number(is_edit) === 1 && isExampleTrue === null
                    ? Number(personal_info.template_id)
                    : isNaN(Number(res_temp_id))
                      ? 1
                      : Number(res_temp_id)
                }
                doc_id={Number(res_profile_id)}
                uuid={Number(res_uuid)}
                dummy={0}
                runtime_first_name={personal_info.first_name}
                runtime_middle_name={personal_info.middle_name}
                runtime_last_name={personal_info.last_name}
                runtime_email_address={personal_info.email_address}
                runtime_phone_number={personal_info.phone_number}
                runtime_contact_number={personal_info.contact_number}
                runtime_street_address={personal_info.street_address}
                runtime_postal_code={personal_info.postal_code}
                runtime_linkedin={personal_info.linkedin}
                runtime_website={personal_info.website}
                runtime_city_id={personal_info.city_id}
                runtime_state_id={personal_info.state_id}
                runtime_country_id={personal_info.country_id}
                my_page={"steps"}
              />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </section>
  );
};

export default Header;
