import React, { useEffect, useRef, useState } from "react";
import { BiCheck, BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { ApiService } from "../../services/ApiService";
import AllborderInputGroup from "../../components/AllborderInputGroup";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Templates from "../Templates";
import axios from "axios";
import swal from "sweetalert";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useAuth } from "../../services/Auth";
import Loader from "../../Loader";

const Opener = () => {
  const { user } = useAuth();
  const [check_loader, set_check_loader] = useState(0);
  const navigate = useNavigate();
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

  //
  const formRef = useRef(null);
  const [cover_letter_data, set_cover_letter_data] = useState({
    experience: 0,
    new_descriptions: "",
  });
  const [screen, setScreen] = useState(1);
  const [objectives, setRecommends] = useState([]);
  const [fillErr, setFillErr] = useState(false);
  const [my_updating_data, set_my_updating_data] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const headers = {
      Authorization: "Bearer " + user?.token,
      "Content-type": "multipart/form-data",
    };

    if (screen === 1) {
      set_check_loader(1);
      if (page_uuid) {
        const article = {
          name: my_updating_data.first_name + my_updating_data.last_name,
          first_name: my_updating_data.first_name,
          last_name: my_updating_data.last_name,
          cover_template_id: my_updating_data.cover_template_id,
          // phone_number: data.phone_number,
          // email_address: data.email_address,
          // street_address: data.street_address,
          // country_id: data.country_id,
          // state_id: data.state_id,
          // city_id: data.city_id,
          // zip_code: data.zip_code,
          experience: cover_letter_data.experience,
          // job_title: '',
          // employeer_name: '',
          // body_skills: '',
          // opener_detail: '',
          // body_detail: '',
          // closer_detail: '',
          _method: "PUT",
        };

        axios
          .post(global.baseurl + "/cover_letters/" + page_uuid, article, {
            headers,
          })
          .then((data) => {
            if (data) {
              set_check_loader(0);
              setScreen(screen + 1);
            }
          })
          .catch((err) => {
            console.log(err);
            set_check_loader(0);
            swal("Error!", err.response.data.message, "error");
          });

        //navigate("/create-cover-letter/opener/" + page_uuid);
      }
    } else {
      var valid_desc = 0;

      if (
        cover_letter_data.new_descriptions === "<br>" ||
        cover_letter_data.new_descriptions === "" ||
        cover_letter_data.new_descriptions === undefined ||
        cover_letter_data.new_descriptions === null
      ) {
        $("#desc_valid").html("Description Field is Empty");
      } else if (cover_letter_data.new_descriptions.trim().length < 5) {
        $("#desc_valid").html("Please Add Description Minimum 5 characters");
      } else if (
        cover_letter_data.new_descriptions.trim().split(/\s+/).length > 250
      ) {
        $("#desc_valid").html("Please Add Description Maximum 250 Words");
      } else {
        $("#desc_valid").html("");
        valid_desc = 1;
      }
      if (valid_desc === 1) {
        set_check_loader(1);
        if (page_uuid) {
          const article = {
            name: my_updating_data.first_name + my_updating_data.last_name,
            first_name: my_updating_data.first_name,
            last_name: my_updating_data.last_name,
            cover_template_id: my_updating_data.cover_template_id,
            // phone_number: data.phone_number,
            // email_address: data.email_address,
            // street_address: data.street_address,
            // country_id: data.country_id,
            // state_id: data.state_id,
            // city_id: data.city_id,
            // zip_code: data.zip_code,
            //experience: cover_letter_data.new_descriptions,
            // job_title: '',
            // employeer_name: '',
            // body_skills: '',
            opener_detail: cover_letter_data.new_descriptions,
            // body_detail: '',
            // closer_detail: '',
            _method: "PUT",
          };

          axios
            .post(global.baseurl + "/cover_letters/" + page_uuid, article, {
              headers,
            })
            .then((data) => {
              if (data) {
                const state = {
                  cover_template_id: data.data.data.id,
                };
                set_check_loader(0);
                if (isExampleTrue === "true") {
                  navigate(
                    "/create-cover-letter/body/" +
                    page_uuid +
                    "?example=true&exampleid=" +
                    exampleid
                  );
                } else {
                  navigate("/create-cover-letter/body/" + page_uuid);
                }
              }
            })
            .catch((err) => {
              console.log(err);
              set_check_loader(0);
              swal("Error!", err.response.data.message, "error");
            });

          //navigate("/create-cover-letter/opener/" + page_uuid);
        }
      }
    }
  };

  const getObjective = (idx, name) => {
    console.log(cover_letter_data);
    if (cover_letter_data.new_descriptions?.includes(name)) {
      // If it exists, remove the name from the state
      set_cover_letter_data((prevDescriptions) => ({
        ...prevDescriptions,
        new_descriptions: prevDescriptions.new_descriptions
          .replace(name, "")
          .trim(),
      }));
      $("#obj_id_" + idx).css("background", "#fff");
      $("#obj_chk_1" + idx).show();
      $("#obj_chk_2" + idx).hide();
    } else {
      // If it doesn't exist, update the state with the new name
      set_cover_letter_data((prevDesc) => ({
        ...prevDesc,
        new_descriptions: prevDesc.new_descriptions + " " + name,
      }));
      $("#obj_id_" + idx).css("background", "rgb(220,220,220)");
      $("#obj_chk_1" + idx).hide();
      $("#obj_chk_2" + idx).show();
    }
  };

  useEffect(() => {
    if (isExampleTrue === "true") {
      const headers = {
        Authorization: "Bearer " + user?.token,
        "Content-type": "multipart/form-data",
      };
      //GET PERSONAL INFORMATION
      axios
        .get(global.baseurl + "/cover_example/" + exampleid, { headers })
        .then((data) => {
          if (data) {
            set_my_updating_data({
              phone_number: data.data.data.example.phone_number,
              email_address: data.data.data.example.email_address,
              street_address: data.data.data.example.street_address,
              country_id: data.data.data.example.country_id,
              city_id: data.data.data.example.city_id,
              state_id: data.data.data.example.state_id,
              zip_code: data.data.data.example.zip_code,
              //experience: data.data.data.example.experience,
              //opener_detail: data.data.data.example.opener_detail,
              body_skills: data.data.data.example.body_skills,
              employeer_name: data.data.data.example.employeer_name,
              job_title: data.data.data.example.job_title,
              body_detail: data.data.data.example.body_detail,
              cover_template_id: res_temp_id,
              closer_detail: "",
            });

            Cookies.set("sel_template", res_temp_id, { expires: 1 }); // Expires in 1 day

            // set_cover_letter_data((prev) => ({
            //   ...prev,
            //   new_descriptions: data.data.data.example.opener_detail,
            // }));

            axios
              .get(global.baseurl + "/cover_letters/" + page_uuid, { headers })
              .then((data2) => {
                if (data2) {
                  set_my_updating_data({
                    first_name: data2.data.data.first_name,
                    last_name: data2.data.data.last_name,
                    opener_detail: data2.data.data.opener_detail,
                    cover_template_id: data2.data.data.cover_template_id,
                    closer_detail: "",
                  });

                  Cookies.set(
                    "sel_template",
                    data2.data.data.cover_template_id,
                    {
                      expires: 1,
                    }
                  );

                  set_cover_letter_data((prev) => ({
                    ...prev,
                    experience:
                      data2.data.data.experience != 0
                        ? data2.data.data.experience
                        : data.data.data.example.experience,
                  }));

                  set_cover_letter_data((prev) => ({
                    ...prev,
                    new_descriptions:
                      data2.data.data.opener_detail != null
                        ? data2.data.data.opener_detail
                        : data.data.data.example.opener_detail,
                  }));
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (page_uuid && isExampleTrue === null && isTemplateTrue === null) {
      const headers = {
        Authorization: "Bearer " + user?.token,
        "Content-type": "multipart/form-data",
      };
      //GET PERSONAL INFORMATION
      axios
        .get(global.baseurl + "/cover_letters/" + page_uuid, { headers })
        .then((data) => {
          if (data) {
            set_my_updating_data({
              first_name: data.data.data.first_name,
              last_name: data.data.data.last_name,
              phone_number: data.data.data.phone_number,
              email_address: data.data.data.email_address,
              street_address: data.data.data.street_address,
              country_id: data.data.data.country_id,
              city_id: data.data.data.city_id,
              state_id: data.data.data.state_id,
              zip_code: data.data.data.zip_code,
              experience: data.data.data.experience,
              opener_detail: data.data.data.opener_detail,
              body_skills: data.data.data.body_skills,
              employeer_name: data.data.data.employeer_name,
              job_title: data.data.data.job_title,
              body_detail: data.data.data.body_detail,
              cover_template_id: data.data.data.cover_template_id,
              closer_detail: "",
            });

            Cookies.set("sel_template", data.data.data.cover_template_id, {
              expires: 1,
            });

            set_cover_letter_data((prev) => ({
              ...prev,
              experience: data.data.data.experience,
            }));
            set_cover_letter_data((prev) => ({
              ...prev,
              new_descriptions: data.data.data.opener_detail,
            }));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // if(isTemplateTrue === 'true'){

      //   Cookies.set('sel_template', page_uuid, { expires: 1 });

      // }

      set_my_updating_data({
        cover_template_id: res_temp_id,
      });
    }
  }, []);

  useEffect(() => {
    ApiService.getOpenerRecommends()
      .then((res) => {
        // console.log(res.data.data);
        setRecommends(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const my_handle = (name) => {
    set_cover_letter_data((prevDesc) => {
      return {
        ...prevDesc,
        new_descriptions: name,
      };
    });
  };

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

  const marks = [
    { value: 0, label: "0" },
    { value: 0.5, label: "'" },
    { value: 1, label: "1" },
    { value: 1.5, label: "'" },
    { value: 2, label: "2" },
    { value: 2.5, label: "'" },
    { value: 3, label: "3" },
    { value: 3.5, label: "'" },
    { value: 4, label: "4" },
    { value: 4.5, label: "'" },
    { value: 5, label: "5" },
    { value: 5.5, label: "'" },
    { value: 6, label: "6" },
    { value: 6.5, label: "'" },
    { value: 7, label: "7" },
    { value: 7.5, label: "'" },
    { value: 8, label: "8" },
    { value: 8.5, label: "'" },
    { value: 9, label: "9" },
    { value: 9.5, label: "'" },
    { value: 10, label: "10" },
    { value: 10.5, label: "10+" },
  ];

  function valuetext(value) {
    if (Number(value) === Number(10.5)) {
      return "10+";
    }
    return `${value}`;
  }

  const handleSetExprince = (exp) => {
    set_cover_letter_data((prev) => ({
      ...prev,
      experience: exp.target.value,
    }));
  };

  return (
    <div className="flex justify-center items-center pt-20 w-full ">
      {check_loader === 1 ? <Loader /> : ""}
      <div className="h-fit w-full px-4">
        {/* Text */}
        <div className="text-center flex flex-col gap-2">
          <h1 className="text-2xl font-bold">
            {screen === 1
              ? "HOW LONG HAVE YOU BEEN WORKING?"
              : "Elevate Your Cover Letter's Introduction for Lasting Impressions"}
          </h1>
          <span className="text-base">
            {screen === 1
              ? "Include Relevant Internships, Volunteer Work, And Unpaid Jobs, professional experience"
              : "Craft Your Opening or Find Professional Inspiration in Our Suggestions"}
          </span>
        </div>
        {/* form */}
        <div className="flex flex-wrap justify-between items-start">
          <div className="w-full xl:w-[60%] px-2">
            <div>
              <form onSubmit={handleSubmit}>
                {screen === 1 ? (
                  <div className="relative mb-12 mt-12 w-full mx-auto">
                    {/*  */}
                    <div className="bg-primary mb-10 text-white w-fit px-2 h-[40px] font-bold text-lg flex justify-center items-center rounded-lg ">
                      {cover_letter_data.experience === 10.5
                        ? "10+ Years"
                        : cover_letter_data.experience === 0
                          ? "Fresh"
                          : cover_letter_data.experience > 1
                            ? cover_letter_data.experience + " Years"
                            : cover_letter_data.experience + " Year"}
                    </div>
                    {/*  */}
                    <Box sx={{ width: "100%" }}>
                      <Slider
                        aria-label="Always visible"
                        defaultValue={0}
                        value={cover_letter_data.experience}
                        getAriaValueText={valuetext}
                        step={0.5}
                        min={0}
                        max={10.5}
                        marks={marks}
                        // valueLabelDisplay="on"
                        onChange={handleSetExprince}
                      />
                    </Box>
                    {/*  */}
                  </div>
                ) : (
                  <>
                    <div className="flex flex-wrap justify-between align-start w-full px-2 ">
                      <div className="w-full m-auto mb-10">
                        <div className="w-full">
                          <label
                            htmlFor="title"
                            className="text-md text-gray-500"
                          >
                            SEARCH
                          </label>
                          <input
                            type="text"
                            id="title"
                            className="border border-gray-300 text-gray-500 mt-2 rounded px-4 py-2 text-lg w-full"
                            onChange={(e) => {
                              setSearchTerm(e.target.value);
                            }}
                            placeholder="Search Here..."
                          />
                        </div>
                      </div>

                      <div className="w-full  flex flex-wrap justify-center items-center border-slate-300 border max-h-[350px] overflow-y-scroll">
                        {objectives
                          ?.filter((objective) =>
                            objective.body
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          )
                          .map((objectives, index_objectives) => (
                            <div
                              onClick={(e) =>
                                getObjective(index_objectives, objectives.body)
                              }
                              id={"obj_id_" + index_objectives}
                              key={index_objectives}
                              className="w-full hover:bg-slate-200 cursor-pointer flex justify-start items-center border-slate-300 border px-4 py-2"
                            >
                              <div>
                                <BiPlus
                                  id={"obj_chk_1" + index_objectives}
                                  className="bg-[#00caa5] text-white text-4xl"
                                />
                                <BiCheck
                                  id={"obj_chk_2" + index_objectives}
                                  style={{ display: "none" }}
                                  className="bg-[#00caa5] text-white text-4xl"
                                />
                              </div>
                              <div>
                                <p className="font_3 text-sm text-slate-500 p-4">
                                  {objectives.body}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                      <div className="w-full  mt-10">
                        <label
                          htmlFor="description"
                          className="text-md text-gray-500"
                        >
                          DESCRIPTION{" "}
                          <span className="text-rose-600 font-bold">*</span>
                        </label>
                        <SunEditor
                          id="description"
                          setContents={cover_letter_data.new_descriptions}
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
                    </div>
                  </>
                )}
                <button type="submit" ref={formRef} className="hidden"></button>
              </form>
              {fillErr && (
                <span className="text-red-500 text-sm">
                  Please fill the Recommend Detail
                </span>
              )}
            </div>
            <div className="flex justify-between items-center flex-wrap gap-4 my-10">
              <button
                className="bg-slate-200 w-full lg:w-auto text-[#0072b1] font_1 px-6 py-4 rounded-full shadow-xl text-xl hover:bg-[#0072b1] hover:text-white transition-all duration-500 text-center my-2"
                onClick={() => {
                  screen === 2
                    ? setScreen(1)
                    : isExampleTrue === "true"
                      ? navigate(
                        "/create-cover-letter/header/" +
                        page_uuid +
                        "?example=true"
                      )
                      : navigate("/create-cover-letter/header/" + page_uuid);
                }}
              >
                BACK
              </button>

              <button
                className="bg-[#00caa5] w-full lg:w-auto text-white font_1 px-6 py-4 rounded-full shadow-xl text-xl hover:bg-[#0072b1] transition-all duration-500 my-2"
                onClick={() => formRef.current.click()}
              >
                CONTINUE
              </button>

              <button
                className="bg-[#f3ef9d] w-full lg:w-auto text-[#0072b1] font_1 px-6 py-4 rounded-full shadow-xl text-xl hover:bg-[#00caa5] hover:text-white transition-all duration-500 text-center my-2"
                onClick={() => {
                  screen === 1
                    ? setScreen(2)
                    : isExampleTrue === "true"
                      ? navigate(
                        "/create-cover-letter/body/" +
                        page_uuid +
                        "?example=true&exampleid=" +
                        exampleid
                      )
                      : navigate("/create-cover-letter/body/" + page_uuid);
                }}
              >
                SKIP
              </button>
            </div>
          </div>
          {/* Live Preview */}
          <div className="w-full xl:w-[40%] px-6 my-10">
            <div className="w-full 2xl:w-[90%] h-[400px] overflow-hidden m-auto border border-slate-300 p-2">
              <Templates
                zoom={50}
                my_page={"steps"}
                temp_id={Number(res_temp_id)}
                doc_id={Number(res_profile_id)}
                uuid={Number(res_uuid)}
                dummy={0}
                runtime_opener_descriptions={cover_letter_data.new_descriptions}
                runtime_opener_experience={cover_letter_data.experience}
              />
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Opener;
