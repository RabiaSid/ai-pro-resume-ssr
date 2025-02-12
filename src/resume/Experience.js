import React, { useEffect, useState, useRef } from "react";
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
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import swal from "sweetalert";
import { useAuth } from "../services/Auth";
import Loader from "../Loader";

const temp = "/images/temp.webp";
const prof_img_def = "/images/avatar.webp";
const Header = ({ isOpen }) => {
  const { user } = useAuth();
  const [check_loader, set_check_loader] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const today = new Date().toISOString().split("T")[0];

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

  const handleClick = () => {
    const isChecked = checkbox.current.checked;

    // Set the message based on the checkbox state
    setMessage(isChecked ? 1 : 0);

    if (isChecked) {
      // Dates are the same

      setpersonal_info({
        ...personal_info,
        ["end_date"]: "",
      });
      $("#end_date").val("");
    }
  };

  const handleChange = (event) => {
    // Update the state when the input value changes
    //setpersonal_info({ ...personal_info, first_name: event.target.value });
    const { id, value } = event.target;
    setpersonal_info({
      ...personal_info,
      [id]: value,
    });

    if (id === "end_date") {
      if (new Date(value).getTime() > todayDate.getTime()) {
        //swal("Error!", "End date should not be a future date", "error");
        $("#end_date").val("");
      }
      setMessage(0);
      $("#reg_terms").prop("checked", false);
    }

    if (id === "start_date") {
      if (new Date(value).getTime() > todayDate.getTime()) {
        //swal("Error!", "Start date should not be a future date", "error");
        $("#start_date").val("");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    var valid_desc = 0;
    var valid_job_position = 0;
    var valid_company_name = 0;

    var valid_1 = 0;

    const startDate = new Date(personal_info.start_date);
    const endDate = new Date(personal_info.end_date);

    if (
      personal_info.job_position === "" ||
      personal_info.job_position === undefined ||
      personal_info.job_position === null
    ) {
      $("#job_position_valid").html("Job Position is Empty");
    } else {
      $("#job_position_valid").html("");
      valid_job_position = 1;
    }
    if (
      personal_info.company_name === "" ||
      personal_info.company_name === undefined ||
      personal_info.company_name === null
    ) {
      $("#company_name_valid").html("Company Name is Empty");
    } else {
      $("#company_name_valid").html("");
      valid_company_name = 1;
    }

    if (startDate.getTime() === 0 && endDate.getTime() === 0) {
      $("#start_date_valid").html("");
      $("#end_date_valid").html("");
      valid_1 = 1;
    } else {
      if (startDate.getTime() === endDate.getTime()) {
        // Dates are the same
        $("#start_date_valid").html("Start Date and End Date are the same");
        $("#end_date_valid").html("Start Date and End Date are the same");
      } else if (message === 0 && startDate.getTime() > endDate.getTime()) {
        // Dates are the same
        $("#start_date_valid").html("Start date is greater than End date");
        $("#end_date_valid").html("");
      } else if (endDate.getTime() > 0 || message === 1) {
        if (startDate.getTime() === 0 || isNaN(parseInt(startDate.getTime()))) {
          $("#start_date_valid").html("Please Select Start Date");
          $("#end_date_valid").html("");
        } else {
          $("#start_date_valid").html("");
          $("#end_date_valid").html("");
          valid_1 = 1;
        }
      } else {
        $("#start_date_valid").html("");
        $("#end_date_valid").html("");
        valid_1 = 1;
      }
    }

    if (
      personal_info.job_description === "<br>" ||
      personal_info.job_description === "" ||
      personal_info.job_description === undefined ||
      personal_info.job_description === null
    ) {
      $("#desc_valid").html("Description Field is Empty");
    } else if (
      personal_info.job_description.trim().split(/\s+/).length >= 150
    ) {
      $("#desc_valid").html("Please Add Description Minimum 150 words");
    } else if (personal_info.job_description.trim().length < 10) {
      $("#desc_valid").html("Please Add Description Minimum 10 characters");
    } else {
      $("#desc_valid").html("");
      valid_desc = 1;
    }

    if (
      valid_job_position === 1 &&
      valid_company_name === 1 &&
      valid_desc === 1 &&
      valid_1 === 1
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
          job_position: personal_info.job_position,
          company_name: personal_info.company_name,
          country_id: personal_info.country_id,
          state_id: personal_info.state_id,
          city_id: personal_info.city_id,
          type: personal_info.type,
          start_date: personal_info.start_date,
          end_date: personal_info.end_date,
          company_description: "aba sa s asdcsadsdd",
          job_description: personal_info.job_description,
          currently_working: message,
          status: 1,
          _method: method,
        };
        await axios
          .post(global.baseurl + "/experiences/" + page_uuid, article, {
            headers,
          })
          .then((data) => {
            if (data) {
              set_check_loader(0);
              window.location.href =
                global.localPath + "resume/experience-details";
            }
          })
          .catch((err) => {
            console.log(err);
            set_check_loader(0);
            swal("Error!", err.response.data.message, "error");
          });
      } else {
        const article = {
          job_position: personal_info.job_position,
          company_name: personal_info.company_name,
          country_id: personal_info.country_id,
          state_id: personal_info.state_id,
          city_id: personal_info.city_id,
          type: personal_info.type,
          start_date: personal_info.start_date,
          end_date: personal_info.end_date,
          company_description: "abc adsasdasdasdasdasd",
          job_description: personal_info.job_description,
          currently_working: message,
          profile_id: profile_id,
          _method: method,
        };
        await axios
          .post(global.baseurl + "/experiences", article, { headers })
          .then((data) => {
            if (data) {
              Cookies.set("res_per_experience", 10, { expires: 1 }); // Expires in 1 day
              set_check_loader(0);
              if (isExampleTrue === "true") {
                window.location.href =
                  global.localPath +
                  "resume/experience-details/" +
                  page_uuid +
                  "?example=true";
              } else {
                window.location.href =
                  global.localPath + "resume/experience-details";
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
            axios
              .get(
                global.baseurl +
                "/states/show-states/" +
                data.data.data.example.experiences[0].country_id,
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
                data.data.data.example.experiences[0].state_id,
                { headers }
              )
              .then((data) => {
                if (data) {
                  setcities(data.data?.data);
                }
              })
              .catch(() => { });

            setTimeout(function () {
              setpersonal_info(data.data.data.example.experiences[0]);
            }, 1000);
            setMessage(data.data.data.example.experiences[0].currently_working);

            console.log(data.data.data.example.experiences[0]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (page_uuid && isExampleTrue === null) {
      //GET PERSONAL INFORMATION
      axios
        .get(global.baseurl + "/experiences/" + page_uuid, { headers })
        .then((data) => {
          if (data) {
            axios
              .get(
                global.baseurl +
                "/states/show-states/" +
                data.data.data.country_id,
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
                data.data.data.state_id,
                { headers }
              )
              .then((data) => {
                if (data) {
                  setcities(data.data?.data);
                }
              })
              .catch(() => { });

            setTimeout(function () {
              setpersonal_info(data.data.data);
            }, 1000);
            setpersonal_info({
              ...personal_info,
              ["start_date"]: data.data.data.start_date,
            });
            setMessage(data.data.data.currently_working);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
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

          <div className="w-full lg:w-[70%]">
            <h1 className="font_1 text-slate-900 text-3xl  text-center">
              Update Your Working Experience
            </h1>
            <p className="font_3 text-slate-500 text-xl mt-4 text-center">
              Make your work history Shine on your resume effortlessly.{" "}
            </p>

            <div className="flex flex-wrap justify-between align-center mt-20">
              <div className="w-full xl:w-[50%] px-4 py-4 setMUI">
                <label htmlFor="job_position" className="text-md text-gray-500">
                  JOB POSITION{" "}
                  <span className="text-rose-600 font-bold">*</span>
                </label>
                <Autocomplete
                  freeSolo
                  id="job_position"
                  className="mt-2"
                  disableClearable
                  value={
                    personal_info.job_position ? personal_info.job_position : ""
                  }
                  options={job_positions
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((job_position) => job_position.name)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=""
                      autoComplete="on"
                      placeholder="Project Manager"
                      //className='h-8 border border-gray-300 rounded px-4 w-full'
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
                  id="job_position_valid"
                ></div>
              </div>

              <div className="w-full xl:w-[50%] px-4 py-4">
                <label htmlFor="company_name" className="text-md text-gray-500">
                  COMPANY NAME{" "}
                  <span className="text-rose-600 font-bold">*</span>
                </label>
                <input
                  type="text"
                  id="company_name"
                  name="company_name"
                  autoComplete="on"
                  placeholder="Google, Facebook"
                  className="h-8 border border-gray-300 rounded px-4 w-full mt-2"
                  defaultValue={
                    personal_info.company_name ? personal_info.company_name : ""
                  }
                  onChange={handleChange}
                />
                <div
                  className="text-rose-600 text-sm font-semibold"
                  id="company_name_valid"
                ></div>
              </div>

              <div className="w-full xl:w-[50%] px-4 py-2">
                <label htmlFor="country_id" className="text-md text-gray-500">
                  COUNTRY
                </label>
                <select
                  className="h-8 border text-gray-500 border-gray-300 mt-2 rounded px-4 w-full"
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
              </div>

              <div className="w-full xl:w-[50%] px-4 py-2">
                <label htmlFor="state_id" className="text-md text-gray-500">
                  STATE
                </label>
                <select
                  className="h-8 border text-gray-500 border-gray-300 mt-2 rounded px-4 w-full"
                  id="state_id"
                  name="state_id"
                  autoComplete="on"
                  value={personal_info.state_id ? personal_info.state_id : ""}
                  onChange={(event) => {
                    handleChange(event); // Call handleChange function
                    set_city("0"); // Call set_country function with argument '0'
                  }}
                >
                  <option value="">Select State</option>
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
                  className="h-8 border text-gray-500 border-gray-300 mt-2 rounded px-4 w-full"
                  id="city_id"
                  name="city_id"
                  autoComplete="on"
                  value={personal_info.city_id ? personal_info.city_id : ""}
                  onChange={handleChange}
                >
                  <option value="">Select City</option>
                  {cities.map((city, index_city) => (
                    <option value={city?.id} key={index_city}>
                      {city?.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full xl:w-[50%] px-4 py-2">
                <label htmlFor="start_date" className="text-md text-gray-500">
                  EMPLOYMENT TYPE
                </label>
                <select
                  id="type"
                  className="h-8 mt-2 rounded px-4 w-full border border-gray-300 text-gray-500"
                  name="type"
                  autoComplete="on"
                  value={personal_info.type ? personal_info.type : ""}
                  onChange={handleChange}
                >
                  <option>Employment Type</option>
                  <option value="Onsite">Onsite</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div className="w-full xl:w-[50%] px-4 py-2">
                <label htmlFor="start_date" className="text-md text-gray-500">
                  START DATE
                </label>
                <input
                  type="date"
                  id="start_date"
                  name="start_date"
                  autoComplete="on"
                  className="h-8 border border-gray-300 text-gray-500 mt-2 rounded px-4 w-full"
                  defaultValue={
                    personal_info.start_date ? personal_info.start_date : ""
                  }
                  onChange={handleChange}
                  onBlur={handleChange}
                  max={today}
                />
                <div
                  className="text-rose-600 text-sm font-semibold"
                  id="start_date_valid"
                ></div>
              </div>
              <div className="w-full xl:w-[50%] px-4 py-2">
                <label htmlFor="end_date" className="text-md text-gray-500">
                  END DATE
                </label>
                <input
                  type="date"
                  id="end_date"
                  name="end_date"
                  autoComplete="on"
                  className="h-8 border border-gray-300 text-gray-500 mt-2 rounded px-4 w-full"
                  defaultValue={
                    personal_info.end_date ? personal_info.end_date : ""
                  }
                  onChange={handleChange}
                  onBlur={handleChange}
                  max={today}
                />
                <div
                  className="text-rose-600 text-sm font-semibold"
                  id="end_date_valid"
                ></div>
              </div>
              <div className="w-full xl:w-[50%] px-4 py-2 text-gray-500">
                <input
                  type="checkbox"
                  className="autofill:bg-yellow-200 mr-2"
                  defaultChecked={personal_info.currently_working}
                  defaultValue={personal_info.currently_working ? true : false}
                  id="reg_terms"
                  name="reg_terms"
                  onClick={handleClick}
                  ref={checkbox}
                />{" "}
                I am Currently Employed in this Company
              </div>

              <div className="w-full px-4 py-4 mt-4">
                <label htmlFor="end_date" className="text-md text-gray-500">
                  DESCRIPTION <span className="text-rose-600 font-bold">*</span>
                </label>
                <textarea
                  defaultValue={
                    personal_info.job_description
                      ? personal_info.job_description
                      : ""
                  }
                  className="h-[100px] border border-gray-300 text-gray-500 mt-2 rounded px-4 w-full"
                  id="job_description"
                  onChange={handleChange}
                  onBlur={handleChange}
                />
                <div
                  className="text-rose-600 text-sm font-semibold"
                  id="desc_valid"
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
                    isExampleTrue === "true"
                      ? global.localPath +
                      "resume/summary/" +
                      page_uuid +
                      "?example=true"
                      : Number(doc_uuid) === ""
                        ? global.localPath + "resume/summary"
                        : global.localPath + "resume/summary/" + profile_id
                  }
                  className="bg-slate-200 w-full lg:w-auto text-[#0072b1] font_1 px-6 py-4 rounded-full shadow-xl text-xl hover:bg-[#0072b1] hover:text-white transition-all duration-500 text-center my-2"
                >
                  BACK
                </a>
                <a
                  href={global.localPath + "resume/education-details"}
                  className="bg-[#f3ef9d] w-full lg:w-auto text-[#0072b1] font_1 px-6 py-4 rounded-full shadow-xl text-xl hover:bg-[#00caa5] hover:text-white transition-all duration-500 text-center my-2"
                >
                  SKIP SECTION
                </a>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[30%] my-10 lg:my-40">
            <div className="w-full lg:w-[90%] h-[400px] overflow-hidden m-auto border border-slate-300 p-2">
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
