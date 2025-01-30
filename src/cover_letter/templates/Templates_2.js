import React, { useEffect, useState, useRef } from "react";
import temp from "../../assets/images/temp.webp";
import $ from "jquery";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiArrowDownSLine } from "react-icons/ri";
import { BiCamera } from "react-icons/bi";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import swal from "sweetalert";
import {
  FaBriefcase,
  FaGraduationCap,
  FaPhone,
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaAward,
  FaHome,
} from "react-icons/fa";
import Cookies from "js-cookie";
import Draggable from "react-draggable";
import { BiPencil, BiSolidTrash, BiMove } from "react-icons/bi";
import { useAuth } from "../../services/Auth";
import Skeleton from "react-loading-skeleton";

const Header = (props) => {
  const { user } = useAuth();
  const handleDrag = (e, ui) => {
    // Handle drag events if needed
    console.log(ui);
  };

  const [cover_letter, setcover_letter] = useState([]);

  const [personal_info, setpersonal_info] = useState([]);
  const [countries, setcountries] = useState([]);
  const [province, setprovince] = useState([]);
  const [cities, setcities] = useState([]);

  const [summary, setsummary] = useState([]);
  const [technical_skills, settechnical_skills] = useState([]);
  const [soft_skills, setsoft_skills] = useState([]);
  const [experiences, set_experiences] = useState([]);
  const [education, set_education] = useState([]);
  const [certificate, set_certificate] = useState([]);
  const [awards, set_awards] = useState([]);

  const [languages, set_languages] = useState([]);
  const [custom_section, set_custom_section] = useState([]);
  const [digital_signature, set_digital_signature] = useState([]);

  const [show_states, set_show_states] = useState([]);
  const [show_cities, set_show_cities] = useState([]);
  const [bodyskills, set_bodyskills] = useState([]);

  const [check_loading, set_check_loading] = useState(0);
  const [check_loading2, set_check_loading2] = useState(0);

  var username = global.getCookie("user_name");
  const doc_uuid = global.getCookie("doc_uuid");
  const profile_id = Cookies.get("profile_id");
  const link = useParams().link;
  const share = new URLSearchParams(window.location.search).get("share");

  const [heading_font_style, set_heading_font_style] = useState(
    props.heading_font_style
  );
  const [paragraph_font_style, set_paragraph_font_style] = useState(
    props.paragraph_font_style
  );
  const [section_spacing, set_section_spacing] = useState(
    props.section_spacing
  );
  const [paragraph_spacing, set_paragraph_spacing] = useState(
    props.paragraph_spacing
  );
  const [heading_font_size, set_heading_font_size] = useState(
    props.heading_font_size
  );
  const [paragraph_font_size, set_paragraph_font_size] = useState(
    props.paragraph_font_size
  );
  const [top_bottom_margins, set_top_bottom_margins] = useState(
    props.top_bottom_margins
  );
  const [side_margins, set_side_margins] = useState(props.side_margins);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  var scale = "scale(100%)";
  var width = 100;

  if (props.is_print === 1) {
    scale = "scale(100%)";
    width = 100;
  } else {
    if (props.my_page === "steps" || props.my_page === "doc") {
      if (isMobile) {
        scale = "scale(50%)";
        width = 200;
      } else {
        scale = "scale(60%)";
        width = 165;
      }
    } else {
      if (isMobile) {
        scale = "scale(70%)";
        width = 142;
      } else {
        scale = "scale(80%)";
        width = 125;
      }
    }
  }

  var my_uuid;
  var my_profile_id;

  if (props.doc_cover_id) {
    my_uuid = props.uuid;
    my_profile_id = props.doc_cover_id;
  } else {
    my_uuid = global.getCookie("doc_uuid");
    my_profile_id = Cookies.get("profile_id");
  }
  const formattedDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-indexed
    const year = date.getFullYear();

    // Pad day and month with leading zero if necessary
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}-${formattedMonth}-${year}`;
  };

  const [pen_color_def, setpen_color_def] = useState(props.pen_color);

  useEffect(() => {
    const headers = {
      Authorization: "Bearer " + user?.token,
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .get(global.baseurl + "/cover-formating/" + my_profile_id, { headers })
      .then((data) => {
        if (data) {
          console.log(data.data.data);
          set_heading_font_style(
            props.heading_font_style
              ? props.heading_font_style
              : data.data.data.heading_font_style
          );
          set_paragraph_font_style(
            props.paragraph_font_style
              ? props.paragraph_font_style
              : data.data.data.paragraph_font_style
          );

          set_section_spacing(
            props.section_spacing
              ? props.section_spacing
              : data.data.data.section_spacing
          );
          set_paragraph_spacing(
            props.paragraph_spacing
              ? props.paragraph_spacing
              : data.data.data.paragraph_spacing
          );

          set_heading_font_size(
            props.heading_font_size
              ? props.heading_font_size
              : data.data.data.heading_fontsize
          );
          set_paragraph_font_size(
            props.paragraph_font_size
              ? props.paragraph_font_size
              : data.data.data.paragraph_fontsize
          );

          set_top_bottom_margins(
            props.top_bottom_margins
              ? props.top_bottom_margins
              : data.data.data.top_bottom_margins
          );
          set_side_margins(
            props.side_margins
              ? props.side_margins
              : data.data.data.side_margins
          );

          if (props.pen_color != "d") {
            setpen_color_def(
              props.pen_color ? props.pen_color : data.data.data.color
            );
          } else if (
            data.data.data.color === undefined ||
            data.data.data.color === null ||
            data.data.data.color === "d" ||
            props.pen_color === "d" ||
            props.pen_color === undefined
          ) {
            setpen_color_def("maroon");
          } else {
            setpen_color_def(
              props.pen_color ? props.pen_color : data.data.data.color
            );
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (share) {
      const headers = {
        Authorization: "Bearer " + user?.token,
        "Access-Control-Allow-Origin": "*",
      };
      axios
        .get(global.baseurl + "/show-cover-letter/" + link, { headers })
        .then((data) => {
          if (data) {
            console.log("ops");
            console.log(data);

            axios
              .get(
                global.baseurl +
                "/user_digital_signature?cover_letter_id=" +
                data.data.data.id +
                "",
                { headers }
              )
              .then((data) => {
                if (data) {
                  set_digital_signature(data.data.data[0]);
                }
              })
              .catch((err) => {
                console.log(err);
              });
            if (data.data.data.body_skills === null) {
              set_bodyskills("");
            } else {
              set_bodyskills(data.data.data.body_skills.split(","));
            }
            setTimeout(function () {
              setcover_letter(data.data.data);
            }, 1000);
            set_check_loading(1);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (
      pen_color_def === undefined ||
      pen_color_def === false ||
      pen_color_def === null ||
      pen_color_def === "d" ||
      props.pen_color === "d" ||
      props.pen_color === "" ||
      props.pen_color === null ||
      props.pen_color === undefined ||
      props.pen_color === false
    ) {
      setpen_color_def("maroon");
    } else {
      setpen_color_def(props.pen_color);
    }

    if (!share) {
      //const token=global.getCookie('token');

      const headers = {
        Authorization: "Bearer " + user?.token,
      };

      if (my_profile_id) {
        //GET PERSONAL INFORMATION
        axios
          .get(global.baseurl + "/cover_letters/" + my_profile_id, { headers })
          .then((data) => {
            if (data) {
              // axios.get(global.baseurl + "/states/show-states/"+data.data.data[0].country_id,{headers}).then((data) => {
              //   if(data){
              //       setprovince(data.data?.data);
              //   }

              //   }).catch((err) => {
              //     console.log(err);
              //   })
              // axios.get(global.baseurl + "/cities/show-cities/"+data.data.data[0].state_id,{headers}).then((data) => {
              //   if(data){
              //       setcities(data.data?.data);
              //   }

              //   }).catch(() => {

              //   })
              console.log(data.data.data);
              //DIGITAL SIGNATURE
              axios
                .get(
                  global.baseurl +
                  "/user_digital_signature?cover_letter_id=" +
                  data.data.data.id +
                  "",
                  { headers }
                )
                .then((data) => {
                  if (data) {
                    set_digital_signature(data.data.data[0]);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
              if (data.data.data.body_skills === null) {
                set_bodyskills("");
              } else {
                set_bodyskills(data.data.data.body_skills.split(","));
              }

              setTimeout(function () {
                setcover_letter(data.data.data);
              }, 1000);

              //console.log(data.data.data[0]);

              set_check_loading(1);
            }
          })
          .catch((err) => {
            console.log(err);
            set_check_loading(1);
          });
      } else {
        set_check_loading(1);
      }
    }
  }, []);

  return (
    <section
      id={"print-content-2_" + props.doc_cover_id}
      style={{
        transform: scale,
        width: width + "%",
        "transform-origin": "top left",
      }}
      className={
        "font_1 p-2 min-h-[800px] bg-white h-[100%] relative mine_adjust"
      }
    >
      {check_loading === 0 ? (
        <div className="mt-[10%]">
          <Skeleton className="flex w-full my-2" height={"50px"} />
          <Skeleton className="flex w-full my-2" height={"50px"} />
          <Skeleton className="flex w-full my-2" height={"50px"} />
          <Skeleton className="flex w-full my-2" height={"50px"} />
          <Skeleton className="flex w-full my-2" height={"50px"} />
        </div>
      ) : (
        <div
          className="container mx-auto "
          style={{
            paddingTop: top_bottom_margins + "px",
            paddingBottom: top_bottom_margins + "px",
            paddingLeft: side_margins + "px",
            paddingRight: side_margins + "px",
          }}
        >
          <div
            className=" text-white "
            style={{
              background:
                "linear-gradient(to right, " +
                pen_color_def +
                ", rgba(0,0,0,0.7))",
            }}
          >
            <div className="  mx-10 my-3">
              <h1
                className={
                  heading_font_style
                    ? heading_font_style + " text-right pt-[25px]"
                    : "font_1 font-bold text-right pt-[25px]"
                }
                style={{
                  fontSize: heading_font_size
                    ? heading_font_size + "px"
                    : "30" + "px",
                }}
              >
                {props.runtime_firstName
                  ? props.runtime_firstName
                  : cover_letter.first_name
                    ? cover_letter.first_name
                    : "First Name"}{" "}
                <span>
                  {props.runtime_lastName
                    ? props.runtime_lastName
                    : cover_letter.last_name
                      ? cover_letter.last_name
                      : "Last Name"}
                </span>
              </h1>
              <p
                className={
                  paragraph_font_style
                    ? paragraph_font_style + " mt-2 mb-4 text-right "
                    : " mt-2 font_2 mb-4 text-right "
                }
                style={{
                  marginTop: paragraph_spacing + "px",
                  fontSize: paragraph_font_size
                    ? paragraph_font_size + "px"
                    : "14" + "px",
                }}
              >
                {props.runtime_job_title
                  ? props.runtime_job_title
                  : cover_letter.job_title
                    ? cover_letter.job_title
                    : "Job Title"}
              </p>
              <hr className="border-2 border-white ml-4 flex-grow"></hr>
            </div>

            <section className="py-4 flex justify-evenly items-center">
              <p
                className={
                  paragraph_font_style ? paragraph_font_style : "font_1"
                }
                style={{
                  fontSize: paragraph_font_size
                    ? paragraph_font_size + "px"
                    : "14" + "px",
                }}
              >
                <b>
                  {props.runtime_emailAddress
                    ? props.runtime_emailAddress
                    : cover_letter.email_address
                      ? cover_letter.email_address
                      : "abc@example.com"}
                </b>
              </p>

              <p
                className={
                  paragraph_font_style ? paragraph_font_style : "font_1"
                }
                style={{
                  fontSize: paragraph_font_size
                    ? paragraph_font_size + "px"
                    : "14" + "px",
                }}
              >
                <b>
                  {props.runtime_phoneNumber
                    ? props.runtime_phoneNumber
                    : cover_letter.phone_number
                      ? cover_letter.phone_number
                      : ""}
                </b>
              </p>
            </section>
          </div>

          <section className="text-gray-800 text-justify my-10 px-2">
            <p
              className={paragraph_font_style ? paragraph_font_style : "font_3"}
              style={{
                marginTop: section_spacing + "px",
                fontSize: paragraph_font_size
                  ? paragraph_font_size + "px"
                  : "14" + "px",
              }}
            >
              {cover_letter.created_at
                ? "DATE: " + formattedDate(cover_letter.created_at)
                : "DATE: " + "11-Sep-2023"}
            </p>
            <br></br>
            <h2
              className={
                paragraph_font_style
                  ? paragraph_font_style + " font_1 mb-4"
                  : "font_1 font-bold mb-4"
              }
              style={{
                marginTop: section_spacing + "px",
                fontSize: paragraph_font_size
                  ? paragraph_font_size + "px"
                  : "14" + "px",
              }}
            >
              To Dear{" "}
              {props.runtime_employer_name
                ? props.runtime_employer_name
                : cover_letter.employeer_name
                  ? cover_letter.employeer_name
                  : "Company Name"}
            </h2>

            <p
              className={
                paragraph_font_style
                  ? paragraph_font_style + " mb-2"
                  : "font_3 mb-2"
              }
              style={{
                marginTop: section_spacing + "px",
                fontSize: paragraph_font_size
                  ? paragraph_font_size + "px"
                  : "14" + "px",
              }}
            >
              {props.runtime_opener_experience === 0 ||
                props.runtime_opener_experience === ""
                ? "Even though I am just starting, my passion and eagerness to learn make me a valuable addition. Ready to bring my fresh perspective and hunger for growth to your team."
                : props.runtime_opener_experience <= 1
                  ? "With " +
                  props.runtime_opener_experience +
                  " year of hands-on experience under my belt, I bring a proven record of accomplishment of success and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives."
                  : props.runtime_opener_experience > 10
                    ? "With " +
                    "10+" +
                    " years of hands-on experience under my belt, I bring a proven record of accomplishment of success and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives."
                    : props.runtime_opener_experience
                      ? "With " +
                      props.runtime_opener_experience +
                      " years of hands-on experience under my belt, I bring a proven record of accomplishment of success and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives."
                      : cover_letter.experience === 0 ||
                        cover_letter.experience === ""
                        ? "Even though I am just starting, my passion and eagerness to learn make me a valuable addition. Ready to bring my fresh perspective and hunger for growth to your team."
                        : cover_letter.experience <= 1
                          ? "With " +
                          cover_letter.experience +
                          " year of hands-on experience under my belt, I bring a proven record of accomplishment of success and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives."
                          : cover_letter.experience > 10
                            ? "With " +
                            "10+" +
                            " years of hands-on experience under my belt, I bring a proven record of accomplishment of success and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives."
                            : cover_letter.experience
                              ? "With " +
                              cover_letter.experience +
                              " years of hands-on experience under my belt, I bring a proven record of accomplishment of success and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives."
                              : ""}
            </p>

            <div className="mb-4">
              <p
                className={
                  paragraph_font_style
                    ? paragraph_font_style + " my-4"
                    : "font_3 my-4"
                }
                style={{
                  marginTop: paragraph_spacing + "px",
                  fontSize: paragraph_font_size
                    ? paragraph_font_size + "px"
                    : "14" + "px",
                }}
              >
                <p
                  dangerouslySetInnerHTML={{
                    __html: props.runtime_opener_descriptions
                      ? props.runtime_opener_descriptions
                      : cover_letter.opener_detail
                        ? cover_letter.opener_detail
                        : "",
                  }}
                ></p>
              </p>

              <p
                className={
                  paragraph_font_style
                    ? paragraph_font_style + " my-4"
                    : "font_3 my-4"
                }
                style={{
                  marginTop: paragraph_spacing + "px",
                  fontSize: paragraph_font_size
                    ? paragraph_font_size + "px"
                    : "14" + "px",
                }}
              >
                <p
                  dangerouslySetInnerHTML={{
                    __html: props.runtime_body_descriptions
                      ? props.runtime_body_descriptions
                      : cover_letter.body_detail
                        ? cover_letter.body_detail
                        : "",
                  }}
                ></p>
              </p>

              {bodyskills === "" ? (
                ""
              ) : (
                <div
                  className={
                    paragraph_font_style
                      ? paragraph_font_style + " my-4"
                      : "font_3 my-4"
                  }
                  style={{
                    marginTop: paragraph_spacing + "px",
                    fontSize: paragraph_font_size
                      ? paragraph_font_size + "px"
                      : "14" + "px",
                  }}
                >
                  <p
                    className={
                      paragraph_font_style ? paragraph_font_style : "font_3"
                    }
                    style={{
                      marginTop: paragraph_spacing + "px",
                      fontSize: paragraph_font_size
                        ? paragraph_font_size + "px"
                        : "14" + "px",
                    }}
                  >
                    <b>Here are my skills:</b>
                  </p>
                  {bodyskills.map((skill, index) => (
                    <span key={index}>
                      {index != 0 ? "," : ""} {skill}
                    </span>
                  ))}
                </div>
              )}

              {/* <p className={paragraph_font_style ? paragraph_font_style + ' my-4' : 'font_3 my-4'} style={{'marginTop': paragraph_spacing+'px','fontSize': paragraph_font_size ? paragraph_font_size+'px' : '14'+'px'}}>
        {props.runtime_closer_descriptions ? props.runtime_closer_descriptions : cover_letter.closer_detail ? cover_letter.closer_detail : ''}
      </p> */}
            </div>
            <br></br>
            <div
              className={paragraph_font_style ? paragraph_font_style : "font_3"}
              style={{
                marginTop: paragraph_spacing + "px",
                fontSize: paragraph_font_size
                  ? paragraph_font_size + "px"
                  : "14" + "px",
              }}
            >
              Your Sincerly,
            </div>
            <br></br>
            <div
              className={
                paragraph_font_style
                  ? paragraph_font_style + " font-bold"
                  : "font_3 font-bold"
              }
              style={{
                marginTop: paragraph_spacing + "px",
                fontSize: paragraph_font_size
                  ? paragraph_font_size + "px"
                  : "14" + "px",
              }}
            >
              {cover_letter.first_name ? cover_letter.first_name : "First Name"}{" "}
              {cover_letter.last_name ? cover_letter.last_name : "Last Name"}
            </div>
            <hr className="my-6" />

            {/* DIGITAL SIGNATURE */}
            {digital_signature && digital_signature != "" ? (
              <div
                className={
                  Number(props.formatting) === 1
                    ? "dd_btn4 hover:bg-emerald-100 cursor-pointer relative"
                    : ""
                }
              >
                <div className="hidden dd_menu4 absolute right-0 top-0">
                  <BiMove
                    size={30}
                    className="text-slate-900 hover:text-[#0072b1] p-1"
                  />
                  <a
                    href={
                      global.localPath +
                      "resume/digital-signature/" +
                      profile_id
                    }
                  >
                    <BiPencil
                      size={30}
                      className="text-slate-900 hover:text-[#0072b1] p-1"
                    />
                  </a>
                  <BiSolidTrash
                    size={30}
                    className="text-slate-900 hover:text-[#0072b1] p-1"
                  />
                </div>
                <div className="flex justify-start items-center flex-wrap py-4">
                  {Number(digital_signature.is_text) === 1 ? (
                    <div
                      className={
                        digital_signature.font +
                        " w-full " +
                        "w-full text-" +
                        digital_signature.alignment
                      }
                      style={{
                        color: digital_signature.color,
                        fontSize:
                          digital_signature.size === "sm"
                            ? "1.5em"
                            : digital_signature.size === "md"
                              ? "2em"
                              : digital_signature.size === "lg"
                                ? "2.5em"
                                : "",
                      }}
                    >
                      {digital_signature.text}
                    </div>
                  ) : (
                    <div
                      className="w-full flex"
                      style={{
                        justifyContent:
                          digital_signature.alignment === "left"
                            ? "left"
                            : digital_signature.alignment === "right"
                              ? "right"
                              : digital_signature.alignment === "center"
                                ? "center"
                                : "",
                      }}
                    >
                      <img
                        src={global.imageUrl + "/" + digital_signature.image}
                        width={100}
                        height={100}
                        className=""
                        style={{
                          marginTop: paragraph_spacing + "px",
                          width:
                            digital_signature.size === "sm"
                              ? "100px"
                              : digital_signature.size === "md"
                                ? "150px"
                                : digital_signature.size === "lg"
                                  ? "200px"
                                  : "",
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
          </section>
        </div>
      )}
    </section>
  );
};

export default Header;
