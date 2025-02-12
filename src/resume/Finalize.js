import React, { useEffect, useState, useRef } from "react";
import Footer from "./Footer";
import Progress from "./Progress";

import Templates from "./Templates";
import $ from "jquery";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiArrowDownSLine } from "react-icons/ri";
import { BiCamera } from "react-icons/bi";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import swal from "sweetalert";

const temp = "/images/temp.webp";
const prof_img_def = "/images/avatar.webp";

const Header = ({ isOpen }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const profile_id = Cookies.get("profile_id");

  const page_uuid = useParams().uuid;
  const res_uuid = Cookies.get("doc_uuid");
  const res_profile_id = Cookies.get("profile_id");
  const res_temp_id = Cookies.get("sel_template");

  const [file, setFile] = useState(null);
  const checkbox = useRef();
  const checkbox2 = useRef();
  const checkbox3 = useRef();
  const [custom_section, set_custom_section] = useState(0);
  const [languages, set_languages] = useState(0);
  const [digital_signature, set_digital_signature] = useState(0);
  const [personal_info, setpersonal_info] = useState({});
  const [def_id, setdef_id] = useState();

  const handleClick = () => {
    const isChecked = checkbox.current.checked;

    // Set the message based on the checkbox state
    set_languages(isChecked ? 1 : 0);
  };
  const handleClick2 = () => {
    const isChecked = checkbox2.current.checked;

    // Set the message based on the checkbox state
    set_digital_signature(isChecked ? 1 : 0);
  };
  const handleClick3 = () => {
    const isChecked = checkbox3.current.checked;

    // Set the message based on the checkbox state
    set_custom_section(isChecked ? 1 : 0);
  };

  // const handleChange = (event) => {
  //   // Update the state when the input value changes
  //   //setpersonal_info({ ...personal_info, first_name: event.target.value });
  //   const { id, value } = event.target;
  //   set_custom_section({
  //     [id]: value
  //   });

  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    Cookies.set("languages", languages, { expires: 1 }); // Expires in 1 day
    Cookies.set("digital_signature", digital_signature, { expires: 1 }); // Expires in 1 day
    Cookies.set("custom_section", custom_section, { expires: 1 }); // Expires in 1 day

    if (Number(languages) === 1) {
      window.location.href = global.localPath + "resume/languages-details";
    } else if (Number(languages) === 0 && Number(digital_signature) === 1) {
      window.location.href = global.localPath + "resume/digital-signature";
    } else if (
      Number(languages) === 0 &&
      Number(digital_signature) === 0 &&
      Number(custom_section) === 1
    ) {
      window.location.href = global.localPath + "resume/custom-section";
    } else {
      window.location.href = global.localPath + "resume/formatting";
    }
  };

  useEffect(() => {
    const token = global.getCookie("token");

    const headers = {
      Authorization: "Bearer " + token,
    };
    if (page_uuid) {
      //GET PERSONAL INFORMATION
      axios
        .get(global.baseurl + "/awards/" + page_uuid + "/edit", { headers })
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
    <section className="">
      <div id="main_contents" className="lg:w-[85%] lg:ml-[15%]">
        <div className="flex flex-wrap justify-center align-top min-h-[1000px] px-2 lg:px-6">
          <div className="w-full">
            <Progress />
          </div>

          <div className="w-full lg:w-[70%] mt-20">
            <h1 className="font_1 text-slate-900 text-3xl text-center">
              FINALIZE
            </h1>
            <p className="font_3 text-slate-500 text-xl mt-4 text-center">
              Need to add any more sections?
            </p>

            <div className="flex flex-wrap justify-between align-center mt-20">
              <div className="w-full xl:w-[50%] px-4 lg:py-4 text-gray-500 mt-2">
                <div className="xl:w-full px-4 py-2 text-gray-500 flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-6 w-6 mr-2"
                    id="languages"
                    onClick={handleClick}
                    ref={checkbox}
                  />
                  <label for="languages" className="ml-2 text-gray-700">
                    Languages
                  </label>
                </div>
                <div className="w-full xl:w-full px-4 py-4 text-gray-500 flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-6 w-6 mr-2"
                    id="digital_signature"
                    onClick={handleClick2}
                    ref={checkbox2}
                  />
                  <label for="digital_signature" className="ml-2 text-gray-700">
                    Digital Signature
                  </label>
                </div>
              </div>

              <div className="w-full xl:w-[50%] px-4 lg:py-2">
                <div className="xl:w-full px-4 py-2 lg:py-4 text-gray-500 flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-6 w-6 mr-2"
                    id="custom_section"
                    onClick={handleClick3}
                    ref={checkbox3}
                  />
                  <label for="custom_section" className="ml-2 text-gray-700">
                    Custom Section
                  </label>
                </div>
              </div>

              <div className="w-full my-4 px-4">
                {/* <Link href="/resume/header/preview">
                        <button className="border border-gray-500 py-2 px-4 rounded sm:text-base text-sm">
                          BACK
                        </button>
                      </Link> */}
                <button
                  className="bg-[#00caa5] w-full lg:w-auto text-white font-bold py-2 px-4 rounded text-lg hover:bg-[#0072b1] transition-all duration-500"
                  onClick={handleSubmit}
                >
                  CONTINUE
                </button>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[30%] my-10 lg:my-40">
            <div className="w-full lg:w-[70%] h-[300px] overflow-hidden m-auto border border-slate-300 p-2">
              <Templates
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
