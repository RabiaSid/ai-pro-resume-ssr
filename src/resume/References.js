import React, { useEffect, useState, useRef } from "react";
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
import { BiCamera } from "react-icons/bi";
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const profile_id = Cookies.get("profile_id");
  const doc_uuid = Cookies.get("doc_uuid");

  const page_uuid = useParams().uuid;
  const isExampleTrue = new URLSearchParams(window.location.search).get(
    "example"
  );

  const res_uuid = Cookies.get("doc_uuid");
  const res_profile_id = Cookies.get("profile_id");
  const res_temp_id = Cookies.get("sel_template");

  const [file, setFile] = useState(null);
  const checkbox = useRef();
  const [message, setMessage] = useState();
  const [personal_info, setpersonal_info] = useState({});
  const [countries, setcountries] = useState([0]);
  const [province, setprovince] = useState([0]);
  const [cities, setcities] = useState([0]);
  const [job_positions, setjob_positions] = useState([]);

  const todayDate = new Date();

  const handlePhoneNumberChange = (value) => {
    //setPhoneNumber(value);
    setpersonal_info({
      ...personal_info,
      ["contact_no"]: value,
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
    var name_valid = 0;
    var designation_valid = 0;
    var email_valid = 0;
    var contact_valid = 0;
    if (
      personal_info.name === "" ||
      personal_info.name === undefined ||
      personal_info.name === null
    ) {
      $("#name_valid").html("Name Field is Empty");
    } else {
      $("#name_valid").html("");
      name_valid = 1;
    }

    if (
      personal_info.contact_no === "" ||
      personal_info.contact_no === undefined ||
      personal_info.contact_no === null
    ) {
      $("#contact_no_valid").html("");
      personal_info.contact_no = "";
      contact_valid = 1;
    } else if (
      personal_info.contact_no.length < 10 ||
      personal_info.contact_no.length > 20
    ) {
      $("#contact_no_valid").html("Please Enter a Valid Contact No");
    } else {
      $("#contact_no_valid").html("");
      contact_valid = 1;
    }

    if (
      (personal_info.email === "" ||
        personal_info.email === undefined ||
        personal_info.email === null) &&
      (personal_info.contact_no === "" ||
        personal_info.contact_no === undefined ||
        personal_info.contact_no === null)
    ) {
      $("#email_valid").html("Please Enter Email or Contact No");
      $("#contact_no_valid").html("Please Enter Email or Contact No");
    } else {
      $("#email_valid").html("");
      $("#contact_no_valid").html("");
      email_valid = 1;
    }

    if (
      personal_info.designation === "" ||
      personal_info.designation === undefined ||
      personal_info.designation === null
    ) {
      $("#designation_valid").html("Designation Field is Empty");
    } else {
      $("#designation_valid").html("");
      designation_valid = 1;
    }

    if (
      name_valid === 1 &&
      designation_valid === 1 &&
      email_valid === 1 &&
      contact_valid === 1
    ) {
      set_check_loader(1);
      if (page_uuid && isExampleTrue === null) {
        var method = "PUT";
      } else {
        var method = "POST";
      }

      //const token=global.getCookie('token');

      const headers = {
        Authorization: "Bearer " + user?.token,
        "Content-type": "multipart/form-data",
      };
      if (page_uuid && isExampleTrue === null) {
        const article = {
          name: personal_info.name,
          email: personal_info.email,
          contact_no: personal_info.contact_no,
          company: personal_info.company,
          designation: personal_info.designation,
          status: 1,
          _method: method,
        };
        await axios
          .post(global.baseurl + "/update_reference/" + page_uuid, article, {
            headers,
          })
          .then((data) => {
            if (data) {
              set_check_loader(0);
              window.location.href =
                global.localPath + "resume/references-details/" + profile_id;
            }
          })
          .catch((err) => {
            console.log(err);
            set_check_loader(0);
            swal("Error!", err.response.data.message, "error");
          });
      } else {
        const article = {
          name: personal_info.name,
          email: personal_info.email,
          contact_no: personal_info.contact_no,
          company: personal_info.company,
          designation: personal_info.designation,
          profile_id: profile_id,
          _method: method,
        };
        await axios
          .post(global.baseurl + "/add_reference", article, { headers })
          .then((data) => {
            if (data) {
              Cookies.set("res_per_reference", 10, { expires: 1 }); // Expires in 1 day
              set_check_loader(0);
              if (isExampleTrue === "true") {
                window.location.href =
                  global.localPath +
                  "resume/references-details/" +
                  page_uuid +
                  "?example=true";
              } else {
                window.location.href =
                  global.localPath + "resume/references-details";
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
    //const token=global.getCookie('token');

    const headers = {
      Authorization: "Bearer " + user?.token,
    };
    if (isExampleTrue === "true") {
      //GET PERSONAL INFORMATION
      axios
        .get(global.baseurl + "/resume_example/" + page_uuid, { headers })
        .then((data) => {
          if (data) {
            setTimeout(function () {
              setpersonal_info(data.data.data.example.experiences[0]);
            }, 1000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (page_uuid && isExampleTrue === null) {
      //GET PERSONAL INFORMATION
      axios
        .get(global.baseurl + "/show_reference/" + page_uuid, { headers })
        .then((data) => {
          if (data) {
            console.log(data);

            setTimeout(function () {
              setpersonal_info(data.data.data);
            }, 1000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
    }

    // const article = {  };

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
          setTimeout(function () {
            set_city(0);
          }, 300);
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
        <div className="flex flex-wrap justify-center align-top min-h-[1000px] px-2 lg:px-6">
          <div className="w-full">
            <Progress />
          </div>

          <div className="w-full lg:w-[70%] mt-20">
            <h1 className="font_1 text-slate-900 text-3xl  text-center">
              ADD YOUR REFERENCES
            </h1>
            <p className="font_3 text-slate-500 text-xl mt-4 text-center">
              Includes Your Full Name And At Least One Way For Employers To
              Reach You.
            </p>

            <div className="flex flex-wrap justify-between align-center mt-20">
              <div className="w-full xl:w-[50%] px-4 py-4">
                <label htmlFor="company_name" className="text-md text-gray-500">
                  NAME <span className="text-rose-600 font-bold">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="on"
                  placeholder="John Doe Smith"
                  className="h-8 border border-gray-300 rounded px-4 w-full mt-2"
                  defaultValue={personal_info.name ? personal_info.name : ""}
                  onChange={handleChange}
                />
                <div
                  className="text-rose-600 text-sm font-semibold"
                  id="name_valid"
                ></div>
              </div>

              <div className="w-full xl:w-[50%] px-4 py-4">
                <label htmlFor="company_name" className="text-md text-gray-500">
                  EMAIL <span className="text-rose-600 font-bold">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="on"
                  placeholder="jd.smith@example.com"
                  className="h-8 border border-gray-300 rounded px-4 w-full mt-2"
                  defaultValue={personal_info.email ? personal_info.email : ""}
                  onChange={handleChange}
                  onBlur={handleChange}
                />
                <div
                  className="text-rose-600 text-sm font-semibold"
                  id="email_valid"
                ></div>
              </div>

              <div className="w-full xl:w-[50%] px-4 py-4">
                <label htmlFor="company_name" className="text-md text-gray-500">
                  CONTACT NO <span className="text-rose-600 font-bold">*</span>
                </label>
                <PhoneInput
                  onChange={handlePhoneNumberChange}
                  id="contact_no"
                  name="contact_no"
                  autoComplete="on"
                  placeholder="+92 57 ********"
                  maxLength={20}
                  value={
                    personal_info.contact_no ? personal_info.contact_no : ""
                  }
                  className="h-8 border border-gray-300 mt-2 rounded px-4 w-full text-black"
                />
                <div
                  className="text-rose-600 text-sm font-semibold"
                  id="contact_no_valid"
                ></div>

                {/* <input
                      type="number"
                      id="contact_no"
                      placeholder='123465789'
                      className="h-8 border border-gray-300 rounded px-4 w-full mt-2"
                      defaultValue={personal_info.contact_no ? personal_info.contact_no : ''}
                      onChange={handleChange}
                    /> */}
              </div>
              <div className="w-full xl:w-[50%] px-4 py-4">
                <label htmlFor="company_name" className="text-md text-gray-500">
                  COMPANY
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  autoComplete="on"
                  placeholder="Google, Facebook"
                  className="h-8 border border-gray-300 rounded px-4 w-full mt-2"
                  defaultValue={
                    personal_info.company ? personal_info.company : ""
                  }
                  onChange={handleChange}
                />
              </div>

              <div className="w-full xl:w-[50%] px-4 py-4 setMUI">
                <label htmlFor="designation" className="text-md text-gray-500">
                  DESIGNATION <span className="text-rose-600 font-bold">*</span>
                </label>
                <Autocomplete
                  freeSolo
                  id="designation"
                  className="mt-2"
                  disableClearable
                  value={
                    personal_info.designation ? personal_info.designation : ""
                  }
                  options={job_positions.map(
                    (job_position) => job_position.name
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=""
                      autoComplete="on"
                      placeholder="Project Manager, Digital Marketer, Data Entry"
                      className="h-8 border border-gray-300 rounded px-4 w-full"
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
                  className="text-rose-600 text-sm font-semibold"
                  id="designation_valid"
                ></div>
              </div>

              <div className="w-full flex justify-between items-center flex-wrap px-4">
                {/* <Link href="/resume/header/preview">
                        <button className="border border-gray-500 py-2 px-4 rounded sm:text-base text-sm">
                          BACK
                        </button>
                      </Link> */}
                <button
                  className="bg-[#00caa5] w-full lg:w-auto text-white font_1 px-6 py-4 rounded-full shadow-xl text-xl hover:bg-[#0072b1] transition-all duration-500 my-2"
                  onClick={handleSubmit}
                >
                  CONTINUE
                </button>
                <a
                  href={
                    Number(doc_uuid) == ""
                      ? global.localPath + "resume/custom-section"
                      : global.localPath + "resume/custom-section-details/"
                  }
                  className="bg-slate-200 w-full lg:w-auto text-[#0072b1] font_1 px-6 py-4 rounded-full shadow-xl text-xl hover:bg-[#0072b1] hover:text-white transition-all duration-500 text-center my-2"
                >
                  BACK
                </a>
                <a
                  href={
                    Number(doc_uuid) == ""
                      ? global.localPath + "resume/digital-signature"
                      : global.localPath +
                      "resume/digital-signature/" +
                      profile_id
                  }
                  className="bg-[#f3ef9d] w-full lg:w-auto text-[#0072b1] font_1 px-6 py-4 rounded-full shadow-xl text-xl hover:bg-[#00caa5] hover:text-white transition-all duration-500 text-center my-2"
                >
                  SKIP SECTION
                </a>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[30%] my-10 lg:my-40">
            <div className="w-full lg:w-[70%] h-[300px] overflow-hidden m-auto border border-slate-300 p-2">
              <Templates
                my_page={"steps"}
                zoom={isMobile ? 28 : 40}
                temp_id={isNaN(Number(res_temp_id)) ? 1 : Number(res_temp_id)}
                doc_id={Number(res_profile_id)}
                uuid={Number(res_uuid)}
                dummy={0}
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
