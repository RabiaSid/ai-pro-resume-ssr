import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tab } from "@headlessui/react";
import $ from "jquery";
import SignatureCanvas from "react-signature-canvas";
import {
  BiAlignLeft,
  BiAlignMiddle,
  BiAlignRight,
  BiFontSize,
  BiImage,
  BiPen,
  BiRevision,
  BiSolidChevronDown,
  BiSolidKeyboard,
} from "react-icons/bi";
import { ApiService } from "../../services/ApiService";
import Cookies from "js-cookie";
import swal from "sweetalert";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../services/Auth";
import Templates from "../Templates";
import Loader from "../../Loader";
import e from "cors";

const prof_img_def = "/images/avatar.webp";
const Closer = () => {
  const { user } = useAuth();
  const [check_loader, set_check_loader] = useState(0);

  const page_uuid = useParams().id;
  const isExampleTrue = new URLSearchParams(window.location.search).get(
    "example"
  );
  const isTemplateTrue = new URLSearchParams(window.location.search).get(
    "template"
  );
  const templateid = new URLSearchParams(window.location.search).get(
    "templateid"
  );
  const exampleid = new URLSearchParams(window.location.search).get(
    "exampleid"
  );
  const res_uuid = Cookies.get("doc_uuid");
  const res_profile_id = Cookies.get("profile_id");
  const res_temp_id = Cookies.get("sel_template");
  const is_edit = Cookies.get("is_edit");
  const [activeTab, setActiveTab] = useState(1);
  const navigate = useNavigate();
  const [personal_info, setpersonal_info] = useState({});
  //
  const [file, setFile] = useState(null);
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
  //
  const [pen_color, set_pen_color] = useState("black");
  const [align, set_align] = useState("left");
  const [size, set_size] = useState("sm");
  const [font, set_font] = useState("font_8");
  const [text, setText] = useState("");

  const sigCanvas = useRef({});

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

  //   Text Signature
  const sel_box = (n) => {
    if (n === 1) {
      $(".sel_box").fadeIn();
    } else {
      $(".sel_box").fadeToggle();
    }
  };

  const handleChange = (event) => {
    // Update the state when the input value changes
    //setpersonal_info({ ...personal_info, first_name: event.target.value });
    const { id, value } = event.target;
    setText(value);
    // setpersonal_info({
    //   [id]: value,
    // });
  };

  const changeStyle = (n) => {
    $("#text").removeClass("font_8");
    $("#text").removeClass("font_9");
    $("#text").removeClass("font_10");
    $("#text").removeClass("font_11");
    $("#text").addClass("font_" + n);
    set_font("font_" + n);
  };

  //   submit Section
  const handleSubmit = () => {
    let data;
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

    if (activeTab === 1) {
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
    } else if (activeTab === 2) {
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
    } else if (activeTab === 3) {
      if (text === null || text === "" || text === undefined) {
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
      if (page_uuid) {
        if (activeTab === 1) {
          data = {
            alignment: align,
            size: size,
            text: "",
            font: font,
            is_draw: 0,
            is_upload: 1,
            is_text: 0,
            _method: "PUT",
            image: file,
          };
        } else if (activeTab === 2) {
          const canvas = sigCanvas.current;
          const dataURL = canvas.toDataURL();
          const signatureBlob = dataURLtoBlob(dataURL);
          const signatureFile = new File([signatureBlob], "signature.png", {
            type: "image/png",
          });

          data = {
            alignment: align,
            size: size,
            text: "",
            font: font,
            is_draw: 1,
            is_upload: 0,
            is_text: 0,
            _method: "PUT",
            image: signatureFile,
          };
        } else if (activeTab === 3) {
          data = {
            alignment: align,
            size: size,
            text: text,
            font: font,
            is_draw: 0,
            is_upload: 0,
            is_text: 1,
            _method: "PUT",
            image: null,
          };
        }

        console.log(data);

        const headers = {
          Authorization: "Bearer " + user?.token,
          "Content-type": "multipart/form-data",
        };
        axios
          .post(
            global.baseurl + "/user_digital_signature/" + personal_info.id,
            data,
            { headers }
          )
          .then((data) => {
            if (data) {
              set_check_loader(0);
              navigate("/create-cover-letter/formatting");
            }
          })
          .catch((err) => {
            if (activeTab === 1) {
              data = {
                alignment: align,
                size: size,
                text: "",
                font: font,
                is_draw: 0,
                is_upload: 1,
                is_text: 0,
                //profile_id: user_id,
                cover_letter_id: res_profile_id,
                image: file,
              };
            } else if (activeTab === 2) {
              const canvas = sigCanvas.current;
              const dataURL = canvas.toDataURL();
              const signatureBlob = dataURLtoBlob(dataURL);
              const signatureFile = new File([signatureBlob], "signature.png", {
                type: "image/png",
              });

              data = {
                alignment: align,
                size: size,
                text: "",
                font: font,
                is_draw: 1,
                is_upload: 0,
                is_text: 0,
                //profile_id: user_id,
                cover_letter_id: res_profile_id,
                image: signatureFile,
              };
            } else if (activeTab === 3) {
              data = {
                alignment: align,
                size: size,
                text: text,
                font: font,
                is_draw: 0,
                is_upload: 0,
                is_text: 1,
                //profile_id: user_id,
                cover_letter_id: res_profile_id,
                image: null,
              };
            }

            console.log(data);

            ApiService.createUserDigitalSignature(user?.token, data)
              .then((res) => {
                console.log(res);
                set_check_loader(0);
                navigate("/create-cover-letter/formatting");
              })
              .catch((err) => {
                set_check_loader(0);
                console.log(err);
                swal({
                  title: "Sorry",
                  dangerMode: true,
                  text: err.response.data.message,
                });
              });
          });
      } else {
        if (activeTab === 1) {
          data = {
            alignment: align,
            size: size,
            text: "",
            font: font,
            is_draw: 0,
            is_upload: 1,
            is_text: 0,
            //profile_id: user_id,
            cover_letter_id: res_profile_id,
            image: file,
          };
        } else if (activeTab === 2) {
          const canvas = sigCanvas.current;
          const dataURL = canvas.toDataURL();
          const signatureBlob = dataURLtoBlob(dataURL);
          const signatureFile = new File([signatureBlob], "signature.png", {
            type: "image/png",
          });

          data = {
            alignment: align,
            size: size,
            text: "",
            font: font,
            is_draw: 1,
            is_upload: 0,
            is_text: 0,
            //profile_id: user_id,
            cover_letter_id: res_profile_id,
            image: signatureFile,
          };
        } else if (activeTab === 3) {
          data = {
            alignment: align,
            size: size,
            text: text,
            font: font,
            is_draw: 0,
            is_upload: 0,
            is_text: 1,
            //profile_id: user_id,
            cover_letter_id: res_profile_id,
            image: null,
          };
        }

        console.log(data);

        ApiService.createUserDigitalSignature(user?.token, data)
          .then((res) => {
            set_check_loader(0);
            navigate("/create-cover-letter/formatting");
          })
          .catch((err) => {
            set_check_loader(0);
            console.log(err);
            swal({
              title: "Sorry",
              dangerMode: true,
              text: err.response.data.message,
            });
          });
      }
    }
  };

  useEffect(() => {
    const headers = {
      Authorization: "Bearer " + user?.token,
    };
    if (page_uuid) {
      //GET PERSONAL INFORMATION
      axios
        .get(
          global.baseurl +
          "/user_digital_signature?cover_letter_id=" +
          page_uuid +
          "",
          { headers }
        )
        .then((data) => {
          if (data) {
            if (data.data.data[0] === undefined) {
              //navigate("/create-cover-letter/closer");
              //window.location.href = global.localPath + "/create-cover-letter/closer";
            } else {
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
            }

            //setdef_id();
          }
        })
        .catch((err) => {
          console.log(err);
          //window.location.href = global.localPath + "resume/digital-signature";
        });
    } else {
    }

    // const article = {  };
  }, []);

  return (
    <>
      {check_loader === 1 ? <Loader /> : ""}
      <div className="flex justify-center items-center pt-20 w-full">
        <div className="h-fit w-full ">
          {/* Text */}
          <div className="text-center flex flex-col gap-2">
            <h1 className="text-2xl font-bold">DIGITAL SIGNATURE</h1>
          </div>
          {/* form */}
          <div className="flex justify-between items-center flex-wrap p-4">
            <div className="w-full lg:w-[60%]">
              <Tab.Group>
                <Tab.List>
                  <div className="flex flex-wrap gap-4 px-4">
                    <Tab
                      className={`border font-bold focus-visible:outline-none focus:outline-none select-none flex gap-2 px-2 py-2 rounded-md items-center justify-center w-full lg:w-[120px] hover:border-[#00caa5] ${activeTab === 1 ? "bg-[#00caa5] text-white" : ""
                        }`}
                      onClick={() => setActiveTab(1)}
                    >
                      <BiImage size={30} /> <span>IMAGE</span>
                    </Tab>
                    <Tab
                      className={`border font-bold focus-visible:outline-none focus:outline-none select-none flex gap-2 px-2 py-2 rounded-md items-center justify-center w-full lg:w-[120px] hover:border-[#00caa5] ${activeTab === 2 ? "bg-[#00caa5] text-white" : ""
                        }`}
                      onClick={() => setActiveTab(2)}
                    >
                      <BiPen size={30} /> <span>DRAW</span>
                    </Tab>
                    <Tab
                      className={`border font-bold focus-visible:outline-none focus:outline-none select-none flex gap-2 px-2 py-2 rounded-md items-center justify-center w-full lg:w-[120px] hover:border-[#00caa5] ${activeTab === 3 ? "bg-[#00caa5] text-white" : ""
                        }`}
                      onClick={() => setActiveTab(3)}
                    >
                      <BiSolidKeyboard size={30} /> <span>TYPE</span>
                    </Tab>
                  </div>
                </Tab.List>
                <Tab.Panels>
                  {/* Screen 1 */}
                  <Tab.Panel>
                    <div
                      id="content_1"
                      className="xl:w-full px-4 py-4 my-10 content"
                    >
                      <div className="w-full lg:w-[70%] rounded-xl shadow-2xl px-4 py-4 flex justify-center flex-wrap items-center border-2 border-dashed border-slate-600">
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
                            accept=".png,.jpg,.jpeg"
                            onChange={(e) => setFile(e.target.files[0])}
                          />
                        </label>
                      </div>
                      <div
                        className="text-rose-600 text-sm font-semibold mt-4"
                        id="image_valid"
                      ></div>
                    </div>
                  </Tab.Panel>
                  {/* Screen 2 */}
                  <Tab.Panel>
                    <div
                      id=""
                      className="xl:w-full px-4 py-4 my-10 content relative"
                    >
                      <div className="border border-slate-500 lg:w-[70%]">
                        <SignatureCanvas
                          penColor={pen_color}
                          canvasProps={{
                            width: 500,
                            height: 250,
                            className: "",
                          }}
                          ref={sigCanvas}
                        />
                        <button
                          onClick={clearSignature}
                          className="absolute top-6 left-6 text-[#0072b1]"
                        >
                          <BiRevision size={30} />
                        </button>
                        <button onClick={captureSignature}>
                          Capture Signature
                        </button>
                      </div>
                      <div
                        className="text-rose-600 text-sm font-semibold mt-4"
                        id="sig_valid"
                      ></div>
                      <div className="flex justify-between flex-wrap lg:w-[70%]">
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
                  </Tab.Panel>
                  {/* Screen 3 */}
                  <Tab.Panel>
                    <div id="" className="xl:w-full px-4 py-4 my-10 content">
                      <div className="pt-4 relative lg:w-[70%] flex justify-start flex-wrap items-center">
                        <div className="font_3 text-md text-slate-600 mb-2">
                          Type Style
                        </div>
                        <input
                          defaultValue={
                            personal_info.text ? personal_info.text : ""
                          }
                          type="text"
                          onChange={(n) => {
                            sel_box(1);
                            handleChange(n);
                          }}
                          id="text"
                          //   defaultValue={
                          //     personal_info.text ? personal_info.text : ""
                          //   }
                          className="p-2 w-[90%] font_8 rounded-md text-lg shadow-md border border-slate-500"
                        />
                        <BiSolidChevronDown
                          onClick={(n) => {
                            sel_box(2);
                          }}
                          className="relative right-10 text-4xl p-2 "
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

                      <div className="flex justify-between flex-wrap lg:w-[70%]">
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
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
              <div className="flex justify-between items-center px-4">
                <button
                  className="bg-slate-200 w-full lg:w-auto text-[#0072b1] font_1 px-6 py-4 rounded-full shadow-xl text-xl hover:bg-[#0072b1] hover:text-white transition-all duration-500 text-center my-2"
                  onClick={() => {
                    isExampleTrue === "true"
                      ? navigate(
                        "/create-cover-letter/body/" +
                        page_uuid +
                        "?example=true&exampleid=" +
                        exampleid
                      )
                      : navigate("/create-cover-letter/body/" + page_uuid);
                  }}
                >
                  BACK
                </button>

                <button
                  className="bg-[#00caa5] w-full lg:w-auto text-white font_1 px-6 py-4 rounded-full shadow-xl text-xl hover:bg-[#0072b1] transition-all duration-500 my-2"
                  onClick={handleSubmit}
                >
                  CONTINUE
                </button>

                <button
                  className="bg-[#f3ef9d] w-full lg:w-auto text-[#0072b1] font_1 px-6 py-4 rounded-full shadow-xl text-xl hover:bg-[#00caa5] hover:text-white transition-all duration-500 text-center my-2"
                  onClick={() => {
                    navigate("/create-cover-letter/formatting/");
                  }}
                >
                  SKIP
                </button>
              </div>
            </div>

            {/* Live Preview */}
            <div></div>
            <div className="w-full xl:w-[40%] px-6 my-10">
              <div className="w-full 2xl:w-[90%] h-[400px] overflow-hidden m-auto border border-slate-300 p-2">
                <Templates
                  zoom={50}
                  my_page={"steps"}
                  temp_id={Number(res_temp_id)}
                  doc_id={Number(res_profile_id)}
                  uuid={Number(res_uuid)}
                  dummy={0}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Closer;
