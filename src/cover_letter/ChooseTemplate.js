import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import Templates from "./Templates";
import $, { data } from "jquery";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiArrowDownSLine } from "react-icons/ri";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import {
  BiReceipt,
  BiLoaderAlt,
  BiArrowToBottom,
  BiEnvelope,
  BiDotsHorizontalRounded,
  BiX,
  BiSolidMessageRoundedError,
} from "react-icons/bi";
import { useParams, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

import swal from "sweetalert";
import { useAuth } from "../services/Auth";

const Header = ({ isOpen }) => {
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.includes("create-cover-letter")) {
      // Remove the cookie when the URL doesn't include 'create-cover-examples'
      localStorage.removeItem("createCoverLetterData");
    }
  }, [location.pathname]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [convertedText, setConvertedText] = useState("");

  const [tempId, setTempId] = useState(1);
  const [docId, setDocId] = useState(1);

  const slug = useParams().slug;

  const [file, setFile] = useState("");

  const [my_resumes, set_my_resumes] = useState([]);
  const [user2, set_user] = useState([]);
  const [paid, set_paid] = useState(0);
  const [sel_temp, set_temp] = useState(1);
  const [pen_color, set_pen_color] = useState("black");

  var username = global.getCookie("user_name");

  const [selectedOption, setSelectedOption] = useState("pdf");

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    const headers = {
      Authorization: "Bearer " + user?.token,
    };

    axios
      .get(global.baseurl + "/show-cover-templates", { headers })
      .then((data) => {
        if (data) {
          set_my_resumes(data.data.data);
          console.log(data.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios.get(global.baseurl + "/user_details", { headers })
      .then((data) => {
        if (data) {
          set_user(data.data)
          console.log(data.data)
        }
      })
      .catch((err) => {
        console.log(err);
      })



  }, []);

  const sel_template = (id, is_paid) => {
    set_temp(id);
    set_paid(is_paid);
    $(".get_temp").removeClass("border-[#00caa5]");
    $("#get_temp_" + id).addClass("border-[#00caa5]");
    $(".dd_menu4").hide();
    $("#get_temp_" + id + " .dd_menu4").css("display", "flex");

    Cookies.remove("profile_id");
  };
  const skip_use_template = (id) => {
    localStorage.removeItem("cover_template_id");
    if (Number(paid) === 1) {
      if (user2.max_cover_templates === user2.current_cover_usage) {

        swal("Sorry!", "Your Paid Template Limit Exceeded", "error");
      } else {
        Cookies.remove("profile_id");
        if (Number(id) === 1) {
          Cookies.set("sel_template", sel_temp, { expires: 1 });
          window.location.href =
            global.localPath + "create-cover-letter/header";
        } else {
          Cookies.remove("profile_id");
          Cookies.set("sel_template", 1, { expires: 1 });
          window.location.href =
            global.localPath + "create-cover-letter/header";
        }
      }
    } else {
      if (Number(id) === 1) {
        Cookies.remove("profile_id");
        Cookies.set("sel_template", sel_temp, { expires: 1 });
        window.location.href = global.localPath + "create-cover-letter/header";
      } else {
        Cookies.remove("profile_id");
        Cookies.set("sel_template", 1, { expires: 1 });
        window.location.href = global.localPath + "create-cover-letter/header";
      }
    }
    Cookies.remove("profile_id");
  };

  const handleButtonClick = (n) => {
    set_pen_color(n);
  };

  return (
    <section className="" id="maindiv">
      <div id="main_contents" className="lg:w-[100%] lg:ml-[0%]">
        <section className="flex justify-center lg:justify-between items-start lg:w-[93%] m-auto flex-wrap min-h-[820px] pt-40">
          <h1 className="font_1 text-slate-900 text-4xl mb-6">
            Choose Template
          </h1>

          <div className="w-full flex justify-start items-center flex-wrap mb-20">
            {my_resumes.map((my_resumes, index_my_resumes) => (
              <div
                key={index_my_resumes}
                className="w-full md:w-[45%] lg:w-[46%] xl:w-[30%] 2xl:w-[22%] flex justify-start items-center flex-wrap m-4"
              >
                <div className="font_3 text-white bg-[#00caa5] rounded-lg text-lg px-2">
                  {Number(my_resumes.is_paid) === 1 ? "Paid" : "Free"}
                </div>

                <div
                  onClick={(e) =>
                    sel_template(my_resumes.id, my_resumes.is_paid)
                  }
                  id={"get_temp_" + my_resumes.id}
                  className="get_temp border-4 cursor-pointer relative shadow-[0px_0px_10px_0px_rgba(0,0,0,0.3)] hover:scale-[105%] w-full my-6 h-[300px] lg:h-[450px] overflow-hidden"
                >
                  <Templates
                    zoom={isMobile ? 30 : 50}
                    my_page={'temp'}
                    temp_id={my_resumes.id}
                    doc_id={my_resumes.id}
                    dummy={1}
                  />
                  <div className="hidden dd_menu4 bg-[rgba(0,0,0,0.5)] border-2 border-b-4 hover:border-[#0072b1] absolute left-0 top-0 w-full h-full justify-evenly items-end p-2">
                    <div
                      onClick={(e) => skip_use_template(1)}
                      className="absolute top-[40%] shadow-lg rounded-lg py-2 cursor-pointer font_1 text-md bg-[#0072b1] hover:bg-[#00caa5] text-white w-[50%] flex justify-center flex-wrap"
                    >
                      <BiReceipt className="w-full p-2" size={60} />
                      Select Template
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </section>
  );
};

export default Header;
