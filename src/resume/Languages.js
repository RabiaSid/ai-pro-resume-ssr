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
  const profile_id = Cookies.get("profile_id");
  const doc_uuid = Cookies.get("doc_uuid");
  const digital_signature = Cookies.get("digital_signature");
  const custom_section = Cookies.get("custom_section");

  const page_uuid = useParams().uuid;
  const res_uuid = Cookies.get("doc_uuid");
  const res_profile_id = Cookies.get("profile_id");
  const res_temp_id = Cookies.get("sel_template");

  const [file, setFile] = useState(null);
  const checkbox = useRef();
  const [message, setMessage] = useState();
  const [personal_info, setpersonal_info] = useState({});
  const [def_id, setdef_id] = useState();
  const [languages, setlanguages] = useState([]);
  const [levels, setlevels] = useState([]);

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
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    var language_valid = 0;
    var level_valid = 0;

    if (
      personal_info.language_id === "" ||
      personal_info.language_id === undefined ||
      personal_info.language_id === null
    ) {
      $("#language_valid").html("Please Select a Language");
    } else {
      $("#language_valid").html("");
      language_valid = 1;
    }

    if (
      personal_info.level_id === "" ||
      personal_info.level_id === undefined ||
      personal_info.level_id === null
    ) {
      $("#level_valid").html("Please Select a Level");
    } else {
      $("#level_valid").html("");
      level_valid = 1;
    }

    if (language_valid === 1 && level_valid === 1) {
      set_check_loader(1);
      if (page_uuid) {
        var method = "PUT";
      } else {
        var method = "POST";
      }
      //const token=global.getCookie('token');
      const headers = {
        Authorization: "Bearer " + user?.token,
        "Content-type": "multipart/form-data",
      };
      if (page_uuid) {
        const article = {
          language_id: personal_info.language_id,
          level_id: personal_info.level_id,
          _method: method,
        };
        await axios
          .post(
            global.baseurl + "/update_user_language_level/" + page_uuid,
            article,
            { headers }
          )
          .then((data) => {
            if (data) {
              set_check_loader(0);
              window.location.href =
                global.localPath + "resume/languages-details/" + profile_id;
            }
          })
          .catch((err) => {
            console.log(err);
            set_check_loader(0);
            swal("Error!", "Something Wrong", "error");
          });
      } else {
        const article = {
          language_id: personal_info.language_id,
          level_id: personal_info.level_id,
          profile_id: profile_id,
          _method: method,
        };
        await axios
          .post(global.baseurl + "/store_user_language", article, { headers })
          .then((data) => {
            if (data) {
              set_check_loader(0);
              window.location.href =
                global.localPath + "resume/languages-details";
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
    if (page_uuid) {
      //GET PERSONAL INFORMATION
      axios
        .get(global.baseurl + "/show_user_language/" + page_uuid + "", {
          headers,
        })
        .then((data) => {
          if (data) {
            console.log(data.data.data);
            setpersonal_info(data.data.data[0]);
            //setdef_id();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
    }

    // const article = {  };
    axios
      .get(global.baseurl + "/languages", { headers })
      .then((data) => {
        if (data) {
          setlanguages(data.data?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(global.baseurl + "/show_levels", { headers })
      .then((data) => {
        if (data) {
          setlevels(data.data?.data);
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
        <div className="flex flex-wrap justify-center align-top min-h-[1000px] px-6">
          <div className="w-full">
            <Progress />
          </div>

          <div className="w-full lg:w-[70%]">
            <h1 className="font_1 text-slate-900 text-3xl  text-center">
              LANGUAGES
            </h1>
            <p className="font_3 text-slate-500 text-xl mt-4 text-center">
              Showcase Your Languages To You Know About That
            </p>

            <div className="flex flex-wrap justify-between align-center mt-20">
              <div className="w-full xl:w-[50%] px-4 py-4">
                <label htmlFor="language_id" className="text-md text-gray-500">
                  LANGUAGE <span className="text-rose-600 font-bold">*</span>
                </label>
                <select
                  className="h-8 border text-gray-500 border-gray-200 mt-2 rounded px-4 w-full"
                  id="language_id"
                  //onChange={(n) => set_country('0')}
                  value={
                    personal_info.language_id ? personal_info.language_id : ""
                  }
                  onChange={(event) => {
                    handleChange(event); // Call handleChange function
                  }}
                >
                  <option value="">Select Language</option>
                  {languages.map((languages, index_languages) => (
                    <option value={languages?.id} key={index_languages}>
                      {languages?.name}
                    </option>
                  ))}
                </select>
                <div
                  className="text-rose-600 text-sm font-semibold"
                  id="language_valid"
                ></div>
              </div>

              <div className="w-full xl:w-[50%] px-4 py-4">
                <label htmlFor="level_id" className="text-md text-gray-500">
                  LEVELS <span className="text-rose-600 font-bold">*</span>
                </label>
                <select
                  className="h-8 border text-gray-500 border-gray-200 mt-2 rounded px-4 w-full"
                  id="level_id"
                  //onChange={(n) => set_country('0')}
                  value={personal_info.level_id ? personal_info.level_id : ""}
                  onChange={(event) => {
                    handleChange(event); // Call handleChange function
                  }}
                >
                  <option value="">Select Level</option>
                  {levels.map((levels, index_levels) => (
                    <option value={levels?.id} key={index_levels}>
                      {levels?.name}
                    </option>
                  ))}
                </select>
                <div
                  className="text-rose-600 text-sm font-semibold"
                  id="level_valid"
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
                      ? global.localPath + "resume/honors_and_awards"
                      : global.localPath + "resume/honors-and-awards-details"
                  }
                  className="bg-slate-200 w-full lg:w-auto text-[#0072b1] font_1 px-6 py-4 rounded-full shadow-xl text-xl hover:bg-[#0072b1] hover:text-white transition-all duration-500 text-center my-2"
                >
                  BACK
                </a>
                <a
                  href={
                    Number(doc_uuid) == ""
                      ? global.localPath + "resume/custom-section"
                      : global.localPath + "resume/custom-section/" + profile_id
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
                temp_id={Number(res_temp_id)}
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
