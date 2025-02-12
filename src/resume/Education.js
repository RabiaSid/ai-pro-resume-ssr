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
  const [degrees, setdegrees] = useState([]);
  const [province, setprovince] = useState([]);
  const [cities, setcities] = useState([]);
  const [my_grade_type, set_my_grade_type] = useState(0);
  const [my_percentage, set_my_percentage] = useState();
  const [my_cgpa, set_my_cgpa] = useState();
  const [my_grade, set_my_grade] = useState();

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

  const handleCgpa = (e) => {
    const roundedValue = parseFloat(e).toFixed(2);
    $("#cgpa").val(roundedValue);
    set_my_cgpa(roundedValue);
  };

  const handleGrade = (e) => {
    set_my_grade(e);
  };

  const handlePercentage = (e) => {
    set_my_percentage(e);
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
        swal("Error!", "End date should not be a future date", "error");
        $("#end_date").val("");
      }
      setMessage(0);
      $("#reg_terms").prop("checked", false);
    }

    if (id === "start_date") {
      if (new Date(value).getTime() > todayDate.getTime()) {
        swal("Error!", "Start date should not be a future date", "error");
        $("#start_date").val("");
      }
    }

    if (id === "grade_type") {
      if (value === "grade") {
        $("#cgpa").hide();
        $("#percentage").hide();
        $("#grade").show();
        set_my_grade_type(1);
      } else if (value === "cgpa") {
        $("#cgpa").show();
        $("#percentage").hide();
        $("#grade").hide();
        set_my_grade_type(2);
      } else if (value === "percentage") {
        $("#cgpa").hide();
        $("#percentage").show();
        $("#grade").hide();
        set_my_grade_type(3);
      } else {
        $("#cgpa").hide();
        $("#percentage").hide();
        $("#grade").hide();
        set_my_grade_type(0);
      }
    }

    if (id === "cgpa") {
      if (value === -0) {
        $("#cgpa").val(0);
      }
      if (value < 0) {
        $("#cgpa").val(0);
      }
      if (value > 5) {
        $("#cgpa").val(5);
      }
    }
    if (id === "percentage") {
      if (value === -0) {
        $("#percentage").val(0);
      }
      if (value < 0) {
        $("#percentage").val(0);
      }
      if (value > 100) {
        $("#percentage").val(100);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    var institute_valid = 0;
    var degree_title_valid = 0;
    var field_of_study_valid = 0;
    var grade_type_valid = 0;
    var valid_1 = 0;

    const startDate = new Date(personal_info.start_date);
    const endDate = new Date(personal_info.end_date);

    if (
      personal_info.institution === "" ||
      personal_info.institution === undefined ||
      personal_info.institution === null
    ) {
      $("#institute_valid").html("Institution is Empty");
    } else {
      $("#institute_valid").html("");
      institute_valid = 1;
    }

    if (
      personal_info.degree_id === "" ||
      personal_info.degree_id === undefined ||
      personal_info.degree_id === null
    ) {
      $("#degree_title_valid").html("Please Select Degree Title");
    } else {
      $("#degree_title_valid").html("");
      degree_title_valid = 1;
    }

    if (
      personal_info.field === "" ||
      personal_info.field === undefined ||
      personal_info.field === null
    ) {
      $("#field_of_study_valid").html("Field of Study is Empty");
    } else {
      $("#field_of_study_valid").html("");
      field_of_study_valid = 1;
    }

    if (personal_info.grade_type === "grade") {
      if (
        personal_info.grade === "" ||
        personal_info.grade === null ||
        personal_info.grade === undefined
      ) {
        $("#grade_type_valid").html("Please Select Your Grade");
      } else {
        $("#grade_type_valid").html("");
        grade_type_valid = 1;
      }
    } else if (personal_info.grade_type === "cgpa") {
      if (my_cgpa === "" || my_cgpa === null || my_cgpa === undefined) {
        $("#grade_type_valid").html("Please Enter Your CGPA");
      } else {
        $("#grade_type_valid").html("");
        grade_type_valid = 1;
      }
    } else if (personal_info.grade_type === "percentage") {
      if (
        my_percentage === "" ||
        my_percentage === null ||
        my_percentage === undefined
      ) {
        $("#grade_type_valid").html("Please Enter Your Percentage");
      } else {
        $("#grade_type_valid").html("");
        grade_type_valid = 1;
      }
    } else {
      $("#grade_type_valid").html("");
      grade_type_valid = 1;
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
      institute_valid === 1 &&
      degree_title_valid === 1 &&
      field_of_study_valid === 1 &&
      grade_type_valid === 1 &&
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
          institution: personal_info.institution,
          degree_id: personal_info.degree_id,
          grade_type: personal_info.grade_type,
          grade:
            my_grade_type === 1
              ? my_grade
              : my_grade_type === 2
                ? my_cgpa
                : my_percentage,
          field: personal_info.field,
          start_date: personal_info.start_date,
          end_date: personal_info.end_date,
          currently_studying: message,
          _method: method,
        };
        await axios
          .post(global.baseurl + "/education/" + page_uuid, article, {
            headers,
          })
          .then((data) => {
            if (data) {
              set_check_loader(0);
              window.location.href =
                global.localPath + "resume/education-details/" + profile_id;
            }
          })
          .catch((err) => {
            console.log(err);
            set_check_loader(0);
            swal("Error!", "Something Wrong", "error");
          });
      } else {
        const article = {
          institution: personal_info.institution,
          degree_id: personal_info.degree_id,
          grade_type: personal_info.grade_type,
          grade:
            my_grade_type === 1
              ? my_grade
              : my_grade_type === 2
                ? my_cgpa
                : my_percentage,
          field: personal_info.field,
          start_date: personal_info.start_date,
          end_date: personal_info.end_date,
          currently_studying: message,
          profile_id: profile_id,
          _method: method,
        };
        await axios
          .post(global.baseurl + "/education", article, { headers })
          .then((data) => {
            if (data) {
              Cookies.set("res_per_education", 10, { expires: 1 }); // Expires in 1 day
              set_check_loader(0);
              if (isExampleTrue === "true") {
                window.location.href =
                  global.localPath +
                  "resume/education-details/" +
                  page_uuid +
                  "?example=true";
              } else {
                window.location.href =
                  global.localPath + "resume/education-details";
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
            console.log(data);
            // axios.get(global.baseurl + "/states/show-states/"+data.data.data[0].country_id,{headers}).then((data) => {
            //   if(data){
            //     console.log(data);
            //     setprovince(data.data?.data);
            //   }

            //   }).catch((err) => {
            //     console.log(err);
            //   })

            //setTimeout(function(){setpersonal_info(data.data.data[0]);}, 1000);
            setMessage(data.data.data.example.educations[0].currently_studying);
            setpersonal_info(data.data.data.example.educations[0]);
            set_my_grade_type(
              data.data.data.example.educations[0].grade_type === "grade"
                ? 1
                : data.data.data.example.educations[0].grade_type === "cgpa"
                  ? 2
                  : data.data.data.example.educations[0].grade_type ===
                    "percentage"
                    ? 3
                    : 0
            );
          }
        })
        .catch((err) => {
          console.log(err);
          //window.location.href = global.localPath + "resume/education";
        });
    } else if (page_uuid && isExampleTrue === null) {
      //GET PERSONAL INFORMATION
      axios
        .get(global.baseurl + "/education/" + page_uuid, { headers })
        .then((data) => {
          if (data) {
            console.log(data);
            setMessage(data.data.data.currently_studying);
            setpersonal_info(data.data.data);

            set_my_grade_type(
              data.data.data.grade_type === "grade"
                ? 1
                : data.data.data.grade_type === "cgpa"
                  ? 2
                  : data.data.data.grade_type === "percentage"
                    ? 3
                    : 0
            );
            set_my_percentage(
              data.data.data.grade_type === "percentage"
                ? data.data.data.grade
                : ""
            );
            set_my_cgpa(
              data.data.data.grade_type === "cgpa" ? data.data.data.grade : ""
            );
            set_my_grade(
              data.data.data.grade_type === "grade" ? data.data.data.grade : ""
            );
            console.log(data.data.data.grade);

            // setpersonal_info({
            //   ...personal_info,
            //   ['start_date']: data.data.data.start_date
            // });
          }
        })
        .catch((err) => {
          console.log(err);
          //window.location.href = global.localPath + "resume/education";
        });
    } else {
    }

    // const article = {  };
    axios
      .get(global.baseurl + "/show-degrees", { headers })
      .then((data) => {
        if (data) {
          console.log(data.data?.data);
          setdegrees(data.data?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
              Highlight your Educational Background
            </h1>
            <p className="font_3 text-slate-500 text-xl mt-4 text-center">
              Let us know about your educational experiences to create an
              impressive resume.
            </p>

            <div className="flex flex-wrap justify-between align-center mt-20">
              <div className="w-full xl:w-[50%] px-4 py-4">
                <label htmlFor="firstName" className="text-md text-gray-500">
                  INSTITUTE <span className="text-rose-600 font-bold">*</span>
                </label>
                <input
                  type="text"
                  id="institution"
                  name="institution"
                  autoComplete="on"
                  placeholder="Oxford University"
                  className="h-8 border border-gray-300 rounded px-4 w-full mt-2"
                  defaultValue={
                    personal_info.institution ? personal_info.institution : ""
                  }
                  onChange={handleChange}
                />
                <div
                  className="text-rose-600 text-sm font-semibold"
                  id="institute_valid"
                ></div>
              </div>

              <div className="w-full xl:w-[50%] px-4 py-4">
                <label htmlFor="firstName" className="text-md text-gray-500">
                  DEGREE TITLE{" "}
                  <span className="text-rose-600 font-bold">*</span>
                </label>
                <select
                  className="h-8 border text-gray-500 border-gray-300 mt-2 rounded px-4 w-full"
                  id="degree_id"
                  name="degree_id"
                  autoComplete="on"
                  //onChange={(n) => set_country('0')}
                  value={personal_info.degree_id ? personal_info.degree_id : ""}
                  onChange={(event) => {
                    handleChange(event); // Call handleChange function
                  }}
                >
                  <option value="">Select Degree</option>
                  {degrees.map((degrees, index_degrees) => (
                    <option value={degrees?.id} key={index_degrees}>
                      {degrees?.title}
                    </option>
                  ))}
                </select>
                <div
                  className="text-rose-600 text-sm font-semibold"
                  id="degree_title_valid"
                ></div>
              </div>

              <div className="w-full xl:w-[50%] px-4 py-4 flex justify-between items-center flex-wrap">
                <label
                  htmlFor="firstName"
                  className="w-full text-md text-gray-500"
                >
                  GRADE, CGPA OR PERCENTAGE (%)
                </label>
                <select
                  className="w-full lg:w-[48%] h-8 border text-gray-500 border-gray-300 mt-2 rounded px-4"
                  id="grade_type"
                  name="grade_type"
                  autoComplete="on"
                  //onChange={(n) => set_country('0')}
                  value={
                    personal_info.grade_type ? personal_info.grade_type : ""
                  }
                  onChange={(event) => {
                    handleChange(event); // Call handleChange function
                  }}
                >
                  <option>Grade Type</option>
                  <option value="grade">Grade</option>
                  <option value="cgpa">Cgpa</option>
                  <option value="percentage">Percentage</option>
                </select>

                {/* <input
                        type="text"
                        id="grade"
                        className="h-8 border border-gray-300 rounded px-4 mt-2 w-full lg:w-[48%]"
                        defaultValue={personal_info.grade ? personal_info.grade : ''}
                        onChange={handleChange}
                      /> */}

                <input
                  type="number"
                  style={{
                    display:
                      personal_info.grade_type === "percentage"
                        ? "block"
                        : "none",
                  }}
                  placeholder="Enter PERCENT (0-100)%"
                  step="1"
                  min="0"
                  max="100"
                  id="percentage"
                  name="percentage"
                  autoComplete="on"
                  className="h-8 border border-gray-300 rounded px-4 mt-2 w-full lg:w-[48%]"
                  defaultValue={my_percentage}
                  onChange={(e) => {
                    handleChange(e);
                    handlePercentage(e.target.value);
                  }}
                  onBlur={(e) => {
                    handleChange(e);
                    handlePercentage(e.target.value);
                  }}
                />
                <span
                  id="per_icon"
                  style={{
                    display:
                      personal_info.grade_type === "percentage"
                        ? "block"
                        : "none",
                  }}
                  className="relative right-0 mt-2"
                >
                  %
                </span>

                <input
                  type="number"
                  style={{
                    display:
                      personal_info.grade_type === "cgpa" ? "block" : "none",
                  }}
                  placeholder="Enter CGPA (0.01-5.00)"
                  step="0.01"
                  min="0.01"
                  max="5.00"
                  id="cgpa"
                  name="cgpa"
                  autoComplete="on"
                  className="h-8 border border-gray-300 rounded px-4 mt-2 w-full lg:w-[48%]"
                  defaultValue={my_cgpa}
                  onChange={(e) => {
                    handleChange(e);
                    handleCgpa(e.target.value);
                  }}
                  onBlur={(e) => {
                    handleChange(e);
                    handleCgpa(e.target.value);
                  }}
                />

                <select
                  style={{
                    display:
                      personal_info.grade_type === "grade" ? "block" : "none",
                  }}
                  value={
                    personal_info.grade_type === "grade"
                      ? personal_info.grade
                      : ""
                  }
                  onChange={(e) => {
                    handleChange(e);
                    handleGrade(e.target.value);
                  }}
                  onBlur={(e) => {
                    handleChange(e);
                    handleGrade(e.target.value);
                  }}
                  id="grade"
                  name="grade"
                  autoComplete="on"
                  className="h-8 border border-gray-300 rounded px-4 mt-2 w-full lg:w-[48%]"
                >
                  <option value="">Select Grade</option>
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="A-">A-</option>

                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="B-">B-</option>

                  <option value="C+">C+</option>
                  <option value="C">C</option>
                  <option value="C-">C-</option>

                  <option value="D+">D+</option>
                  <option value="D">D</option>
                  <option value="D-">D-</option>

                  <option value="F">F</option>
                </select>
                <div
                  className="text-rose-600 text-sm font-semibold"
                  id="grade_type_valid"
                ></div>
              </div>

              <div className="w-full xl:w-[50%] px-4 py-4">
                <label htmlFor="field" className="text-md text-gray-500">
                  FIELD OF STUDY{" "}
                  <span className="text-rose-600 font-bold">*</span>
                </label>
                <input
                  type="text"
                  id="field"
                  name="field"
                  autoComplete="on"
                  placeholder={"Bachelor's of Computer Science"}
                  className="h-8 border border-gray-300 rounded px-4 mt-2 w-full"
                  defaultValue={personal_info.field ? personal_info.field : ""}
                  onChange={handleChange}
                />
                <div
                  className="text-rose-600 text-sm font-semibold"
                  id="field_of_study_valid"
                ></div>
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
                  defaultChecked={personal_info.currently_studying}
                  defaultValue={personal_info.currently_studying ? true : false}
                  id="reg_terms"
                  name="reg_terms"
                  onClick={handleClick}
                  ref={checkbox}
                />{" "}
                I am Currently Enrolled in this Program
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
                  CONTINUE
                </button>

                <a
                  href={
                    isExampleTrue === "true"
                      ? global.localPath +
                      "resume/experience/" +
                      page_uuid +
                      "?example=true"
                      : Number(doc_uuid) === ""
                        ? global.localPath + "resume/experience"
                        : global.localPath + "resume/experience-details"
                  }
                  className="bg-slate-200 w-full lg:w-auto text-[#0072b1] font_1 px-6 py-4 rounded-full shadow-xl text-xl hover:bg-[#0072b1] hover:text-white transition-all duration-500 text-center my-2"
                >
                  BACK
                </a>

                <a
                  href={
                    isExampleTrue === "true"
                      ? global.localPath +
                      "resume/technical-skills/" +
                      page_uuid +
                      "?example=true"
                      : Number(doc_uuid) === ""
                        ? global.localPath + "resume/technical-skills"
                        : global.localPath +
                        "resume/technical-skills/" +
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
