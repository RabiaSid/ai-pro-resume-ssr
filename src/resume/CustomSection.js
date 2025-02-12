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
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
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

  const profile_id = Cookies.get("profile_id");
  const custom_section = Cookies.get("custom_section");
  const res_uuid = Cookies.get("doc_uuid");
  const doc_uuid = Cookies.get("doc_uuid");
  const res_profile_id = Cookies.get("profile_id");
  const res_temp_id = Cookies.get("sel_template");

  const sortedFontOptions = [
    "Arial",
    "Comic Sans MS",
    "Courier New",
    "Impact",
    "Georgia",
    "Tahoma",
    "Trebuchet MS",
    "Verdana",
    "Logical",
    "Salesforce Sans",
    "Garamond",
    "Sans-Serif",
    "Serif",
    "Times New Roman",
    "Helvetica",
  ].sort();

  const page_uuid = useParams().uuid;

  const [file, setFile] = useState(null);
  const checkbox = useRef();
  const [get_id, set_get_id] = useState();
  const [personal_info, setpersonal_info] = useState({});
  const [new_descriptions, setnewDescriptions] = useState({
    name: "", // Initial value for the 'name' property
    // other properties...
  });
  const [def_id, setdef_id] = useState();

  const handleChange = (event) => {
    // Update the state when the input value changes
    //setpersonal_info({ ...personal_info, first_name: event.target.value });
    const { id, value } = event.target;
    setpersonal_info({
      ...personal_info,
      [id]: value,
    });
  };

  const my_handle = (name) => {
    setnewDescriptions((prevDesc) => {
      return {
        ...prevDesc,
        name: name,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    var valid_desc = 0;
    var valid_title = 0;

    if (
      personal_info.title === "" ||
      personal_info.title === undefined ||
      personal_info.title === null
    ) {
      $("#title_valid").html("Title is Empty");
    } else {
      $("#title_valid").html("");
      valid_title = 1;
    }

    if (
      new_descriptions.name === "<br>" ||
      new_descriptions.name === "" ||
      new_descriptions.name === undefined ||
      new_descriptions.name === null
    ) {
      $("#desc_valid").html("Description Field is Empty");
    } else {
      if (new_descriptions.name.trim().split(/\s+/).length >= 150) {
        $("#desc_valid").html("Please Add Description Minimum 150 words");
      } else if (new_descriptions.name.trim().length < 10) {
        $("#desc_valid").html("Please Add Description Minimum 10 characters");
      } else {
        $("#desc_valid").html("");
        valid_desc = 1;
      }
    }

    if (valid_desc === 1 && valid_title === 1) {
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
          title: personal_info.title,
          detail: new_descriptions.name,
          status: 1,
          _method: method,
        };
        await axios
          .post(global.baseurl + "/custom_details/" + page_uuid, article, {
            headers,
          })
          .then((data) => {
            if (data) {
              set_check_loader(0);
              window.location.href =
                global.localPath + "resume/custom-section-details";
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
          detail: new_descriptions.name,
          personal_profile_id: profile_id,
          _method: method,
        };
        await axios
          .post(global.baseurl + "/custom_details", article, { headers })
          .then((data) => {
            if (data) {
              set_check_loader(0);
              window.location.href =
                global.localPath + "resume/custom-section-details";
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
        .get(global.baseurl + "/custom_details/" + page_uuid, { headers })
        .then((data) => {
          if (data) {
            console.log(data.data.data);
            set_get_id(data.data.data.id);
            setpersonal_info(data.data.data);
            setnewDescriptions((prevDesc) => {
              return {
                ...prevDesc,
                name: data.data.data.detail,
              };
            });
            //setdef_id();
          }
        })
        .catch((err) => {
          console.log(err);
          //window.location.href = global.localPath + "resume/custom-section";
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

          <div className="w-full lg:w-[70%] ">
            <h1 className="font_1 text-slate-900 text-3xl  text-center">
              CUSTOM SECTIONS
            </h1>
            <p className="font_3 text-slate-500 text-xl mt-4 text-center">
              Add Your Custom Sections
            </p>

            <div className="flex flex-wrap justify-between align-center mt-20">
              <div className="w-full xl:w-[50%] px-4 py-4">
                <label htmlFor="company_name" className="text-md text-gray-500">
                  TITLE <span className="text-rose-600 font-bold">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Hobbies"
                  className="h-8 border border-gray-300 rounded px-4 w-full mt-2"
                  defaultValue={personal_info.title ? personal_info.title : ""}
                  onChange={handleChange}
                />
                <div
                  className="text-rose-600 text-sm font-semibold"
                  id="title_valid"
                ></div>
              </div>

              <div className="w-full px-4 py-2">
                <label htmlFor="company_name" className="text-md text-gray-500">
                  DESCRIPTION <span className="text-rose-600 font-bold">*</span>
                </label>
                <SunEditor
                  id="description"
                  setContents={new_descriptions.name}
                  onChange={(content) =>
                    my_handle(content.replace(/<\/?p[^>]*>/g, ""))
                  }
                  setOptions={{
                    buttonList: [
                      ["undo", "redo"],
                      ["font", "fontSize"],
                      [
                        "bold",
                        "underline",
                        "italic",
                        "strike",
                        "subscript",
                        "superscript",
                      ],
                      ["fontColor", "hiliteColor"],
                      ["align", "list", "lineHeight"],
                      ["outdent", "indent"],

                      ["preview"],
                      ["removeFormat"],
                    ],
                    defaultTag: "",
                    minHeight: "300px",
                    showPathLabel: false,
                    font: sortedFontOptions,
                  }}
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
                    Number(doc_uuid) == ""
                      ? global.localPath + "resume/languages"
                      : global.localPath + "resume/languages-details"
                  }
                  className="bg-slate-200 w-full lg:w-auto text-[#0072b1] font_1 px-6 py-4 rounded-full shadow-xl text-xl hover:bg-[#0072b1] hover:text-white transition-all duration-500 text-center my-2"
                >
                  BACK
                </a>
                <a
                  href={
                    Number(doc_uuid) == ""
                      ? global.localPath + "resume/references"
                      : global.localPath + "resume/references-details"
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
