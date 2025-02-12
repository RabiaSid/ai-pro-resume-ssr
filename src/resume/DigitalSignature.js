import React, { useEffect, useState, useRef } from "react";
import Footer from "./Footer";
import Progress from "./Progress";
import Templates from "./Templates";
import $ from "jquery";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiArrowDownSLine } from "react-icons/ri";
import {
  BiCamera,
  BiSolidChevronDown,
  BiImage,
  BiPen,
  BiSolidKeyboard,
  BiRevision,
  BiAlignLeft,
  BiAlignMiddle,
  BiAlignRight,
  BiFontSize,
} from "react-icons/bi";
import SignatureCanvas from "react-signature-canvas";
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
  const profile_id = Cookies.get("profile_id");
  const digital_signature = Cookies.get("digital_signature");
  const custom_section = Cookies.get("custom_section");
  const doc_uuid = Cookies.get("doc_uuid");

  const page_uuid = useParams().uuid;
  const res_uuid = Cookies.get("doc_uuid");
  const res_profile_id = Cookies.get("profile_id");
  const res_temp_id = Cookies.get("sel_template");

  const sigCanvas = useRef({});

  const [file, setFile] = useState(null);
  const checkbox = useRef();
  const [message, setMessage] = useState();
  const [personal_info, setpersonal_info] = useState({});
  const [pen_color, set_pen_color] = useState("black");
  const [align, set_align] = useState("left");
  const [size, set_size] = useState("sm");
  const [font, set_font] = useState("font_8");
  const [active_tabs, set_active_tabs] = useState(1);
  const [my_id, set_my_id] = useState(1);

  const clearSignature = () => {
    sigCanvas.current.clear();
  };

  const captureSignature = () => {
    const canvas = sigCanvas.current;
    const dataURL = canvas.toDataURL(); // Convert canvas content to data URL
    const signatureBlob = dataURLtoBlob(dataURL); // Convert data URL to Blob
    const signatureFile = new File([signatureBlob], "signature.png", {
      type: "image/png",
    });
    // Now you can do something with the signatureBlob
    console.log("Signature Blob:", signatureFile);
  };

  // Function to convert data URL to Blob
  const dataURLtoBlob = (dataURL) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
  };

  const handleButtonClick = (n) => {
    set_pen_color(n);
    $("#text").css("color", n);
    $(".sel_font").css("color", n);
  };

  const handleButtonClickalign = (n) => {
    set_align(n);
  };

  const handleButtonClicksize = (n) => {
    set_size(n);
  };

  const changeStyle = (n) => {
    $("#text").removeClass("font_8");
    $("#text").removeClass("font_9");
    $("#text").removeClass("font_10");
    $("#text").removeClass("font_11");
    $("#text").addClass("font_" + n);
    set_font("font_" + n);
  };

  const sel_box = (n) => {
    if (n === 1) {
      $(".sel_box").fadeIn();
    } else {
      $(".sel_box").fadeToggle();
    }
  };

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

  const tabs = (id) => {
    $(".content").hide();
    $("#content_" + id).show();
    $("#tab_" + id).addClass("bg-[#00caa5]");
    // $('.tab').addClass('border-slate-400');
    // $('.tab').addClass('bg-white');
    // $('.tab').addClass('text-slate-400');

    $("#tab_" + id).removeClass("border-slate-400");
    $("#tab_" + id).addClass("border-[#00caa5]");
    $("#tab_" + id).addClass("text-white");
    set_active_tabs(id);
    // set_pen_color('black');
    // $('#text').css('color','black');
    // $('.sel_font').css('color','black');
    // set_align('left');
    // set_size('sm');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    var image_valid = 0;
    var sig_valid = 0;
    var text_valid = 0;

    // const canvas = sigCanvas.current;
    // const dataURL = canvas.toDataURL();

    // console.log(dataURL);
    // if(dataURL){
    //   console.log(1);
    // }else{
    //   console.log(0);
    // }

    if (Number(active_tabs) === 1) {
      if (file === null) {
        $("#image_valid").html("Please Select Image");
      } else {
        $("#sig_valid").html("");
        $("#image_valid").html("");
        $("#text_valid").html("");
        text_valid = 1;
        sig_valid = 1;
        image_valid = 1;
      }
    } else if (Number(active_tabs) === 2) {
      if (sigCanvas.current === null) {
        $("#sig_valid").html("Please Draw Signature");
      } else {
        $("#sig_valid").html("");
        $("#image_valid").html("");
        $("#text_valid").html("");
        text_valid = 1;
        sig_valid = 1;
        image_valid = 1;
      }
    } else if (Number(active_tabs) === 3) {
      if (
        personal_info.text === null ||
        personal_info.text === "" ||
        personal_info.text === undefined
      ) {
        $("#text_valid").html("Text is empty");
      } else {
        $("#sig_valid").html("");
        $("#image_valid").html("");
        $("#text_valid").html("");
        text_valid = 1;
        sig_valid = 1;
        image_valid = 1;
      }
    }

    if (image_valid === 1 && sig_valid === 1 && text_valid === 1) {
      set_check_loader(1);
      const canvas = sigCanvas.current;
      const dataURL = canvas.toDataURL(); // Convert canvas content to data URL
      const signatureBlob = dataURLtoBlob(dataURL); // Convert data URL to Blob
      const signatureFile = new File([signatureBlob], "signature.png", {
        type: "image/png",
      });
      // Now you can do something with the signatureBlob
      console.log("Signature Blob:", signatureFile);

      if (active_tabs === "") {
        swal("Error!", "Active Tab Error", "error");
      } else {
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
          if (Number(active_tabs) === 1) {
            //image
            var article = {
              alignment: "left",
              size: "sm",
              color: "black",
              text: "",
              font: "",
              is_draw: 0,
              is_upload: 1,
              is_text: 0,
              image: file,
              _method: method,
            };
          } else if (Number(active_tabs) === 2) {
            //draw
            var article = {
              alignment: align,
              size: size,
              color: pen_color,
              text: "",
              font: "",
              is_draw: 1,
              is_upload: 0,
              is_text: 0,
              image: signatureFile,
              _method: method,
            };
          } else {
            //text
            var article = {
              alignment: align,
              size: size,
              color: pen_color,
              text: personal_info.text,
              font: font,
              is_draw: 0,
              is_upload: 0,
              is_text: 1,
              _method: method,
            };
          }

          await axios
            .post(
              global.baseurl + "/user_digital_signature/" + my_id,
              article,
              { headers }
            )
            .then((data) => {
              if (data) {
                set_check_loader(0);
                if (custom_section === 1) {
                  if (Number(doc_uuid) == "") {
                    window.location.href =
                      global.localPath + "resume/custom-section";
                  } else {
                    window.location.href =
                      global.localPath + "resume/formatting";
                  }
                } else {
                  window.location.href = global.localPath + "resume/formatting";
                }
              }
            })
            .catch(() => {
              if (Number(active_tabs) === 1) {
                //image
                console.log("image");
                var article = {
                  alignment: "left",
                  size: "sm",
                  color: "black",
                  text: "",
                  font: "",
                  is_draw: 0,
                  is_upload: 1,
                  is_text: 0,
                  profile_id: profile_id,
                  image: file,
                  _method: "POST",
                };
              } else if (Number(active_tabs) === 2) {
                //draw
                console.log("draw");
                var article = {
                  alignment: align,
                  size: size,
                  color: pen_color,
                  text: "",
                  font: "",
                  is_draw: 1,
                  is_upload: 0,
                  is_text: 0,
                  image: signatureFile,
                  profile_id: profile_id,
                  _method: "POST",
                };
              } else {
                //text
                console.log("text");
                var article = {
                  alignment: align,
                  size: size,
                  color: pen_color,
                  text: personal_info.text,
                  font: font,
                  is_draw: 0,
                  is_upload: 0,
                  is_text: 1,
                  profile_id: profile_id,
                  _method: "POST",
                };
              }
              axios
                .post(global.baseurl + "/user_digital_signature", article, {
                  headers,
                })
                .then((data) => {
                  if (data) {
                    set_check_loader(0);
                    window.location.href =
                      global.localPath + "resume/formatting";
                  }
                })
                .catch((err) => {
                  console.log(err);
                  set_check_loader(0);
                  swal("Error!", err.response.data.message, "error");
                });
            });
        } else {
          if (Number(active_tabs) === 1) {
            //image
            console.log("image");
            var article = {
              alignment: "left",
              size: "sm",
              color: "black",
              text: "",
              font: "",
              is_draw: 0,
              is_upload: 1,
              is_text: 0,
              profile_id: profile_id,
              image: file,
              _method: method,
            };
          } else if (Number(active_tabs) === 2) {
            //draw
            console.log("draw");
            var article = {
              alignment: align,
              size: size,
              color: pen_color,
              text: "",
              font: "",
              is_draw: 1,
              is_upload: 0,
              is_text: 0,
              image: signatureFile,
              profile_id: profile_id,
              _method: method,
            };
          } else {
            //text
            console.log("text");
            var article = {
              alignment: align,
              size: size,
              color: pen_color,
              text: personal_info.text,
              font: font,
              is_draw: 0,
              is_upload: 0,
              is_text: 1,
              profile_id: profile_id,
              _method: method,
            };
          }
          await axios
            .post(global.baseurl + "/user_digital_signature", article, {
              headers,
            })
            .then((data) => {
              if (data) {
                set_check_loader(0);
                window.location.href = global.localPath + "resume/formatting";
              }
            })
            .catch((err) => {
              console.log(err);
              set_check_loader(0);
              swal("Error!", err.response.data.message, "error");
            });
        }
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
        .get(
          global.baseurl + "/user_digital_signature?profile_id=" + page_uuid,
          { headers }
        )
        .then((data) => {
          if (data) {
            setpersonal_info(data.data.data[0]);
            if (
              data.data.data[0].color === "" ||
              data.data.data[0].color === null
            ) {
            } else {
              set_pen_color(data.data.data[0].color);
              $("#text").css("color", data.data.data[0].color);
            }
            if (
              data.data.data[0].font === "" ||
              data.data.data[0].font === null
            ) {
            } else {
              set_font(data.data.data.font);
              $("#text").removeClass("font_8");
              $("#text").removeClass("font_9");
              $("#text").removeClass("font_10");
              $("#text").removeClass("font_11");
              $("#text").addClass(data.data.data[0].font);
              $(".sel_font").css("color", data.data.data[0].color);
            }
            if (
              data.data.data[0].alignment === "" ||
              data.data.data[0].alignment === null
            ) {
            } else {
              set_align(data.data.data[0].alignment);
            }
            if (
              data.data.data[0].size === "" ||
              data.data.data[0].size === null
            ) {
            } else {
              set_size(data.data.data[0].size);
            }

            //setdef_id();
          }
        })
        .catch((err) => {
          console.log(err);
          window.location.href = global.localPath + "resume/digital-signature";
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
              DIGITAL SIGNATURE
            </h1>

            <div className="flex flex-wrap justify-between items-center align-center mt-20">
              <div className="w-full xl:w-full px-4 py-4 flex flex-wrap justify-start items-center">
                <div
                  onClick={(n) => {
                    tabs(1);
                  }}
                  id="tab_1"
                  className="tab font_4 w-full lg:w-auto my-2 cursor-pointer transition-all duration-300 text-white text-lg flex justify-center items-center bg-[#00caa5] hover:bg-[#0072b1] hover:text-white border-2 border-[#00caa5] hover:border-[#0072b1] px-4 py-1 rounded-md lg:mr-4"
                >
                  <BiImage className="mr-2" size={30} /> <span>IMAGE</span>
                </div>
                <div
                  onClick={(n) => {
                    tabs(2);
                  }}
                  id="tab_2"
                  className="tab font_4 w-full lg:w-auto my-2 cursor-pointer transition-all duration-300 text-slate-400 text-lg flex justify-center items-center hover:bg-[#0072b1] hover:text-white border-2 border-slate-400 hover:border-[#0072b1] px-4 py-1 rounded-md lg:mr-4"
                >
                  <BiPen className="mr-2" size={30} /> <span>DRAW</span>
                </div>
                <div
                  onClick={(n) => {
                    tabs(3);
                  }}
                  id="tab_3"
                  className="tab font_4 w-full lg:w-auto my-2 cursor-pointer transition-all duration-300 text-slate-400 text-lg flex justify-center items-center hover:bg-[#0072b1] hover:text-white border-2 border-slate-400 hover:border-[#0072b1] px-4 py-1 rounded-md"
                >
                  <BiSolidKeyboard className="mr-2" size={30} />{" "}
                  <span>TYPE</span>
                </div>
              </div>

              <div id="content_1" className="xl:w-full px-4 py-4 my-10 content">
                <div className="w-full lg:w-[50%] rounded-xl shadow-2xl px-4 py-4 flex justify-center flex-wrap items-center border-2 border-dashed border-slate-600">
                  <img
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : personal_info.image
                          ? global.imageUrl + personal_info.image
                          : prof_img_def
                    }
                    className="rounded-lg w-[200px] p-4"
                    width={200}
                    height={200}
                    alt="user_img"
                  />
                  <label htmlFor="fileInput" className="w-full py-4">
                    <span className="flex justify-center items-center text-slate-600">
                      <BiImage size={70} />{" "}
                      <span className="font_1 text-lg ml-4 text-slate-600">
                        Upload Image
                      </span>
                    </span>
                    <input
                      id="fileInput"
                      className="hidden"
                      type="file"
                      name="file"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </label>
                </div>
                <div
                  className="text-rose-600 text-sm font-semibold mt-4"
                  id="image_valid"
                ></div>
              </div>

              <div
                id="content_2"
                className="xl:w-full px-4 py-4 my-10 hidden content relative"
              >
                <div className="w-full border border-slate-500 lg:w-[50%]">
                  <SignatureCanvas
                    penColor={pen_color}
                    canvasProps={{ width: 500, height: 250, className: "" }}
                    ref={sigCanvas}
                  />
                  <button
                    onClick={clearSignature}
                    className="absolute top-6 left-6 text-[#0072b1]"
                  >
                    <BiRevision size={30} />
                  </button>
                  <button onClick={captureSignature}>Capture Signature</button>
                </div>
                <div className="w-full flex justify-between flex-wrap lg:w-[50%]">
                  <div className="flex justify-start flex-wrap w-full">
                    <div className="text-slate-600 py-4 w-full items-center">
                      Colors
                    </div>
                    <button
                      onClick={(n) => {
                        handleButtonClick("black");
                      }}
                      className="bg-[black] p-4 rounded-md mt-2 mr-2 shadow-md"
                    ></button>
                    <button
                      onClick={(n) => {
                        handleButtonClick("blue");
                      }}
                      className="bg-[blue] p-4 rounded-md mt-2 mr-2 shadow-md"
                    ></button>
                    <button
                      onClick={(n) => {
                        handleButtonClick("red");
                      }}
                      className="bg-[red] p-4 rounded-md mt-2 mr-2 shadow-md"
                    ></button>
                    <button
                      onClick={(n) => {
                        handleButtonClick("green");
                      }}
                      className="bg-[green] p-4 rounded-md mt-2 mr-2 shadow-md"
                    ></button>
                    <button
                      onClick={(n) => {
                        handleButtonClick("pink");
                      }}
                      className="bg-[pink] p-4 rounded-md mt-2 mr-2 shadow-md"
                    ></button>
                    <button
                      onClick={(n) => {
                        handleButtonClick("navy");
                      }}
                      className="bg-[navy] p-4 rounded-md mt-2 mr-2 shadow-md"
                    ></button>
                    <button
                      onClick={(n) => {
                        handleButtonClick("yellow");
                      }}
                      className="bg-[yellow] p-4 rounded-md mt-2 mr-2 shadow-md"
                    ></button>
                    <button
                      onClick={(n) => {
                        handleButtonClick("orange");
                      }}
                      className="bg-[orange] p-4 rounded-md mt-2 mr-2 shadow-md"
                    ></button>
                    <button
                      onClick={(n) => {
                        handleButtonClick("purple");
                      }}
                      className="bg-[purple] p-4 rounded-md mt-2 mr-2 shadow-md"
                    ></button>
                    <button
                      onClick={(n) => {
                        handleButtonClick("brown");
                      }}
                      className="bg-[brown] p-4 rounded-md mt-2 mr-2 shadow-md"
                    ></button>
                    <button
                      onClick={(n) => {
                        handleButtonClick("lightblue");
                      }}
                      className="bg-[lightblue] p-4 rounded-md mt-2 mr-2 shadow-md"
                    ></button>
                    <button
                      onClick={(n) => {
                        handleButtonClick("violet");
                      }}
                      className="bg-[violet] p-4 rounded-md mt-2 mr-2 shadow-md"
                    ></button>
                    <button
                      onClick={(n) => {
                        handleButtonClick("maroon");
                      }}
                      className="bg-[maroon] p-4 rounded-md mt-2 mr-2 shadow-md"
                    ></button>
                  </div>

                  <div className="flex justify-start items-center flex-wrap">
                    <div className="text-slate-600 py-4 items-center w-full">
                      Alignment
                    </div>
                    <BiAlignLeft
                      onClick={(n) => {
                        handleButtonClickalign("left");
                      }}
                      size={25}
                      className="mt-2 mr-2 cursor-pointer hover:text-[#00caa5]"
                    />
                    <BiAlignMiddle
                      onClick={(n) => {
                        handleButtonClickalign("center");
                      }}
                      size={25}
                      className="mt-2 mr-2 hover:text-[#00caa5]"
                    />
                    <BiAlignRight
                      onClick={(n) => {
                        handleButtonClickalign("right");
                      }}
                      size={25}
                      className="mt-2 mr-2 hover:text-[#00caa5]"
                    />
                  </div>

                  <div className="flex justify-start items-center flex-wrap">
                    <div className="text-slate-600 py-4 items-center w-full">
                      Size
                    </div>
                    <BiFontSize
                      onClick={(n) => {
                        handleButtonClicksize("sm");
                      }}
                      size={25}
                      className="mt-2 mr-2 hover:text-[#00caa5]"
                    />
                    <BiFontSize
                      onClick={(n) => {
                        handleButtonClicksize("md");
                      }}
                      size={30}
                      className="mt-2 mr-2 hover:text-[#00caa5]"
                    />
                    <BiFontSize
                      onClick={(n) => {
                        handleButtonClicksize("lg");
                      }}
                      size={35}
                      className="mt-2 mr-2 hover:text-[#00caa5]"
                    />
                  </div>
                </div>
              </div>

              <div
                id="content_3"
                className="xl:w-full px-4 py-4 my-10 hidden content"
              >
                <div className="pt-4 relative w-full lg:w-[50%] flex justify-start flex-wrap items-center">
                  <div className="font_3 text-md text-slate-600 mb-2">
                    Type Style
                  </div>
                  <input
                    type="text"
                    onChange={(n) => {
                      sel_box(1);
                      handleChange(n);
                    }}
                    id="text"
                    defaultValue={personal_info.text ? personal_info.text : ""}
                    className="p-2 w-full lg:w-[90%] font_8 rounded-md text-lg shadow-md border border-slate-500"
                  />
                  <BiSolidChevronDown
                    onClick={(n) => {
                      sel_box(2);
                    }}
                    className="relative hidden lg:block right-10 text-4xl p-2 "
                  />

                  <div
                    className="text-rose-600 text-sm font-semibold mt-4"
                    id="text_valid"
                  ></div>
                  <div className="sel_box hidden lg:w-[90%] absolute bg-white top-[90px] shadow-lg border border-slate-500 rounded-md px-4">
                    <div
                      onClick={(n) => {
                        changeStyle(8);
                      }}
                      className="font_8 text-lg sel_font py-1 cursor-pointer"
                    >
                      Font family 1
                    </div>
                    <div
                      onClick={(n) => {
                        changeStyle(9);
                      }}
                      className="font_9 text-lg sel_font py-1 cursor-pointer"
                    >
                      Font family 2
                    </div>
                    <div
                      onClick={(n) => {
                        changeStyle(10);
                      }}
                      className="font_10 text-lg sel_font py-1 cursor-pointer"
                    >
                      Font family 3
                    </div>
                    <div
                      onClick={(n) => {
                        changeStyle(11);
                      }}
                      className="font_11 text-lg sel_font py-1 cursor-pointer"
                    >
                      Font family 4
                    </div>
                  </div>
                </div>

                <div className="w-full flex justify-between flex-wrap lg:w-[50%]">
                  <div className="flex justify-start flex-wrap w-full">
                    <div className="text-slate-600 py-4 w-full items-center">
                      Colors
                    </div>
                    <button
                      onClick={(n) => {
                        handleButtonClick("black");
                      }}
                      className="bg-[black] p-4 rounded-md mt-2 mr-2 shadow-md"
                    ></button>
                    <button
                      onClick={(n) => {
                        handleButtonClick("blue");
                      }}
                      className="bg-[blue] p-4 rounded-md mt-2 mr-2 shadow-md"
                    ></button>
                    <button
                      onClick={(n) => {
                        handleButtonClick("red");
                      }}
                      className="bg-[red] p-4 rounded-md mt-2 mr-2 shadow-md"
                    ></button>
                    <button
                      onClick={(n) => {
                        handleButtonClick("green");
                      }}
                      className="bg-[green] p-4 rounded-md mt-2 mr-2 shadow-md"
                    ></button>
                    <button
                      onClick={(n) => {
                        handleButtonClick("pink");
                      }}
                      className="bg-[pink] p-4 rounded-md mt-2 mr-2 shadow-md"
                    ></button>
                    <button
                      onClick={(n) => {
                        handleButtonClick("navy");
                      }}
                      className="bg-[navy] p-4 rounded-md mt-2 mr-2 shadow-md"
                    ></button>
                    <button
                      onClick={(n) => {
                        handleButtonClick("yellow");
                      }}
                      className="bg-[yellow] p-4 rounded-md mt-2 mr-2 shadow-md"
                    ></button>
                    <button
                      onClick={(n) => {
                        handleButtonClick("orange");
                      }}
                      className="bg-[orange] p-4 rounded-md mt-2 mr-2 shadow-md"
                    ></button>
                    <button
                      onClick={(n) => {
                        handleButtonClick("purple");
                      }}
                      className="bg-[purple] p-4 rounded-md mt-2 mr-2 shadow-md"
                    ></button>
                    <button
                      onClick={(n) => {
                        handleButtonClick("brown");
                      }}
                      className="bg-[brown] p-4 rounded-md mt-2 mr-2 shadow-md"
                    ></button>
                    <button
                      onClick={(n) => {
                        handleButtonClick("lightblue");
                      }}
                      className="bg-[lightblue] p-4 rounded-md mt-2 mr-2 shadow-md"
                    ></button>
                    <button
                      onClick={(n) => {
                        handleButtonClick("violet");
                      }}
                      className="bg-[violet] p-4 rounded-md mt-2 mr-2 shadow-md"
                    ></button>
                    <button
                      onClick={(n) => {
                        handleButtonClick("maroon");
                      }}
                      className="bg-[maroon] p-4 rounded-md mt-2 mr-2 shadow-md"
                    ></button>
                  </div>

                  <div className="flex justify-start items-center flex-wrap">
                    <div className="text-slate-600 py-4 items-center w-full">
                      Alignment
                    </div>
                    <BiAlignLeft
                      onClick={(n) => {
                        handleButtonClickalign("left");
                      }}
                      size={25}
                      className="mt-2 mr-2 cursor-pointer hover:text-[#00caa5]"
                    />
                    <BiAlignMiddle
                      onClick={(n) => {
                        handleButtonClickalign("center");
                      }}
                      size={25}
                      className="mt-2 mr-2 hover:text-[#00caa5]"
                    />
                    <BiAlignRight
                      onClick={(n) => {
                        handleButtonClickalign("right");
                      }}
                      size={25}
                      className="mt-2 mr-2 hover:text-[#00caa5]"
                    />
                  </div>

                  <div className="flex justify-start items-center flex-wrap">
                    <div className="text-slate-600 py-4 items-center w-full">
                      Size
                    </div>
                    <BiFontSize
                      onClick={(n) => {
                        handleButtonClicksize("sm");
                      }}
                      size={25}
                      className="mt-2 mr-2 hover:text-[#00caa5]"
                    />
                    <BiFontSize
                      onClick={(n) => {
                        handleButtonClicksize("md");
                      }}
                      size={30}
                      className="mt-2 mr-2 hover:text-[#00caa5]"
                    />
                    <BiFontSize
                      onClick={(n) => {
                        handleButtonClicksize("lg");
                      }}
                      size={35}
                      className="mt-2 mr-2 hover:text-[#00caa5]"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full my-10 lg:my-20 flex flex-wrap justify-between items-center">
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
                      ? global.localPath + "resume/references"
                      : global.localPath + "resume/references-details"
                  }
                  className="bg-slate-200 w-full lg:w-auto text-[#0072b1] font_1 px-6 py-4 rounded-full shadow-xl text-xl hover:bg-[#0072b1] hover:text-white transition-all duration-500 text-center my-2"
                >
                  BACK
                </a>

                <a
                  href={global.localPath + "resume/formatting"}
                  className="bg-[#f3ef9d] w-full lg:w-auto text-[#0072b1] font_1 px-6 py-4 rounded-full shadow-xl text-xl hover:bg-[#00caa5] hover:text-white transition-all duration-500 text-center my-2"
                >
                  SKIP SECTION
                </a>
              </div>
            </div>
          </div>
          <div className="lg:w-[30%] my-10 lg:my-40">
            <div className="w-[90%] h-[400px] overflow-hidden m-auto border border-slate-300 p-2">
              <Templates
                my_page={"steps"}
                zoom={50}
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
