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
import swal from "sweetalert";
import { useAuth } from "../services/Auth";
import Loader from "../Loader";

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
  const [def_id, setdef_id] = useState();
  const todayDate = new Date();

  const handleClick = () => {
    const isChecked = checkbox.current.checked;

    // Set the message based on the checkbox state
    setMessage(isChecked ? 1 : 0);
  };

  const handleChange = (event) => {
    // Update the state when the input value changes
    //setpersonal_info({ ...personal_info, first_name: event.target.value });
    const { id, value } = event.target;
    setpersonal_info({
      ...personal_info,
      [id]: value,
    });

    if (id === "date") {
      if (new Date(value).getTime() > todayDate.getTime()) {
        swal("Error!", "Issue date should not be a future date", "error");
        $("#date").val("");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    var valid_desc = 0;
    var valid_title = 0;
    var valid_body = 0;

    console.log(profile_id);

    if (
      personal_info.title === "" ||
      personal_info.title === undefined ||
      personal_info.title === null
    ) {
      $("#certificate_title_valid").html("Certificate Title is Empty");
    } else {
      $("#certificate_title_valid").html("");
      valid_title = 1;
    }

    if (
      personal_info.institute === "" ||
      personal_info.institute === undefined ||
      personal_info.institute === null
    ) {
      $("#authorization_body_valid").html("Authorization Body is Empty");
    } else {
      $("#authorization_body_valid").html("");
      valid_body = 1;
    }

    if (
      personal_info.description === "<br>" ||
      personal_info.description === "" ||
      personal_info.description === undefined ||
      personal_info.description === null
    ) {
      $("#desc_valid").html("");
      valid_desc = 1;
    } else {
      if (personal_info.description.trim().split(/\s+/).length >= 150) {
        $("#desc_valid").html("Please Add Description Minimum 150 words");
      } else if (personal_info.description.trim().length < 10) {
        $("#desc_valid").html("Please Add Description Minimum 10 characters");
      } else {
        $("#desc_valid").html("");
        valid_desc = 1;
      }
    }

    if (valid_desc === 1 && valid_title === 1 && valid_body === 1) {
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
          title: personal_info.title,
          date: personal_info.date,
          institute: personal_info.institute,
          description: personal_info.description,
          _method: method,
        };
        await axios
          .post(global.baseurl + "/certificates/" + page_uuid, article, {
            headers,
          })
          .then((data) => {
            if (data) {
              set_check_loader(0);
              window.location.href =
                global.localPath + "resume/certificates-details/" + profile_id;
            }
          })
          .catch((err) => {
            console.log(err);
            set_check_loader(0);
            swal("Error!", "Something Wrong", "error");
          });
      } else {
        const article = {
          title: personal_info.title,
          date: personal_info.date,
          institute: personal_info.institute,
          description: personal_info.description,
          profile_id: profile_id,
          _method: method,
        };
        await axios
          .post(global.baseurl + "/certificates", article, { headers })
          .then((data) => {
            if (data) {
              Cookies.set("res_per_certificate", 10, { expires: 1 }); // Expires in 1 day
              set_check_loader(0);
              window.location.href =
                global.localPath + "resume/certificates-details";
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
            console.log(data.data.data);
            setpersonal_info(data.data.data.example.certificates[0]);
            //setdef_id();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (page_uuid && isExampleTrue === null) {
      //GET PERSONAL INFORMATION
      axios
        .get(global.baseurl + "/certificates/" + page_uuid + "/edit", {
          headers,
        })
        .then((data) => {
          if (data) {
            console.log(data.data.data);
            setpersonal_info(data.data.data);
            //setdef_id();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
    }

    // const article = {  };
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
              CERTIFICATIONS
            </h1>
            <p className="font_3 text-slate-500 text-xl mt-4 text-center">
              Showcase Your Certifications To An Employer
            </p>

            <div className="flex flex-wrap justify-between align-center mt-20">
              <div className="w-full xl:w-full px-4 py-4">
                <label htmlFor="title" className="text-md text-gray-500">
                  CERTIFICATE TITLE{" "}
                  <span className="text-rose-600 font-bold">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  autoComplete="on"
                  placeholder="Website Development"
                  className="h-8 border border-gray-300 rounded px-4 w-full mt-2"
                  defaultValue={personal_info.title ? personal_info.title : ""}
                  onChange={handleChange}
                />
                <div
                  className="text-rose-600 text-sm font-semibold"
                  id="certificate_title_valid"
                ></div>
              </div>

              <div className="w-full xl:w-[50%] px-4 py-2">
                <label htmlFor="date" className="text-md text-gray-500">
                  ISSUE DATE
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  autoComplete="on"
                  placeholder="Issue Date"
                  className="h-8 border border-gray-300 text-gray-500 mt-2 rounded px-4 w-full"
                  defaultValue={personal_info.date ? personal_info.date : ""}
                  onChange={handleChange}
                  max={today}
                />
              </div>

              <div className="w-full xl:w-[50%] px-4 py-2">
                <label htmlFor="institute" className="text-md text-gray-500">
                  AUTHORIZATION BODY{" "}
                  <span className="text-rose-600 font-bold">*</span>
                </label>
                <input
                  type="text"
                  id="institute"
                  name="institute"
                  autoComplete="on"
                  placeholder="Microsoft"
                  className="h-8 border border-gray-300 rounded px-4 w-full mt-2"
                  defaultValue={
                    personal_info.institute ? personal_info.institute : ""
                  }
                  onChange={handleChange}
                />
                <div
                  className="text-rose-600 text-sm font-semibold"
                  id="authorization_body_valid"
                ></div>
              </div>

              <div className="w-full xl:w-full px-4 py-2">
                <label htmlFor="description" className="text-md text-gray-500">
                  DESCRIPTION
                </label>
                <textarea
                  id="description"
                  name="description"
                  autoComplete="on"
                  placeholder="Description about your course"
                  className="h-40 border border-gray-300 rounded px-4 w-full mt-2"
                  defaultValue={
                    personal_info.description ? personal_info.description : ""
                  }
                  onChange={handleChange}
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
                      "resume/soft-skills/" +
                      page_uuid +
                      "?example=true"
                      : Number(doc_uuid) == ""
                        ? global.localPath + "resume/soft-skills"
                        : global.localPath + "resume/soft-skills/" + profile_id
                  }
                  className="bg-slate-200 w-full lg:w-auto text-[#0072b1] font_1 px-6 py-4 rounded-full shadow-xl text-xl hover:bg-[#0072b1] hover:text-white transition-all duration-500 text-center my-2"
                >
                  BACK
                </a>

                <a
                  href={
                    Number(doc_uuid) == ""
                      ? global.localPath + "resume/honors_and_awards"
                      : global.localPath + "resume/honors-and-awards-details"
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
