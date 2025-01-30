import React, { useEffect, useRef, useState } from "react";
import { BiCheck, BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { ApiService } from "../../services/ApiService";
import AllborderInputGroup from "../../components/AllborderInputGroup";

import Cookies from "js-cookie";
import swal from "sweetalert";
import { useParams } from "react-router-dom";
import axios from "axios";
import Templates from "../Templates";
import { Autocomplete, Chip, Stack, TextField } from "@mui/material";
import { useAuth } from "../../services/Auth";
import Loader from "../../Loader";

const Opener = () => {
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
  const navigate = useNavigate();

  //
  const formRef = useRef(null);
  const [cover_letter_data, set_cover_letter_data] = useState({
    job_title: "",
    employeer_name: "",
    body_skills: [],
    body_description: "",
  });
  const [screen, setScreen] = useState(1);
  const [objectives, setRecommends] = useState([]);
  const [fillErr, setFillErr] = useState(false);
  const [skillsArray, setSkillsArray] = useState([]);
  const [my_updating_data, set_my_updating_data] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    //alert(cover_letter_data.body_skills);

    const headers = {
      Authorization: "Bearer " + user?.token,
      "Content-type": "multipart/form-data",
    };

    if (screen === 1) {
      var body_skills_valid = 0;

      if (
        String(cover_letter_data.body_skills) === "" ||
        String(cover_letter_data.body_skills) === undefined ||
        String(cover_letter_data.body_skills) === null
      ) {
        $("#body_skills_valid").html("Please Select Skills");
      } else {
        $("#body_skills_valid").html("");
        body_skills_valid = 1;
      }

      if (body_skills_valid === 1) {
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
            //experience: cover_letter_data.experience,
            // job_title: '',
            // employeer_name: '',
            body_skills: String(cover_letter_data.body_skills),
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
                const state = {
                  cover_template_id: data.data.data.id,
                };
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
      }
    } else if (screen === 2) {
      var job_title_valid = 0;
      var company_name_valid = 0;

      if (
        cover_letter_data.job_title === "" ||
        cover_letter_data.job_title === undefined ||
        cover_letter_data.job_title === null
      ) {
        $("#job_title_valid").html("Job Title Field is Empty");
      } else if (cover_letter_data.job_title.trim().length < 3) {
        $("#job_title_valid").html("Please Add Job Title Minimum 3 characters");
      } else {
        $("#job_title_valid").html("");
        job_title_valid = 1;
      }

      if (
        cover_letter_data.employeer_name === "" ||
        cover_letter_data.employeer_name === undefined ||
        cover_letter_data.employeer_name === null
      ) {
        $("#company_name_valid").html("Company Name Field is Empty");
      } else if (cover_letter_data.employeer_name.trim().length < 3) {
        $("#company_name_valid").html(
          "Please Add Company Name Minimum 3 characters"
        );
      } else {
        $("#company_name_valid").html("");
        company_name_valid = 1;
      }

      if (job_title_valid === 1 && company_name_valid === 1) {
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
            //experience: cover_letter_data.experience,
            job_title: cover_letter_data.job_title,
            employeer_name: cover_letter_data.employeer_name,
            // body_skills: String(cover_letter_data.body_skills),
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
      }
    } else {
      var valid_desc = 0;

      if (
        cover_letter_data.body_description === "<br>" ||
        cover_letter_data.body_description === "" ||
        cover_letter_data.body_description === undefined ||
        cover_letter_data.body_description === null
      ) {
        $("#desc_valid").html("Description Field is Empty");
      } else if (cover_letter_data.body_description.trim().length < 5) {
        $("#desc_valid").html("Please Add Description Minimum 5 characters");
      } else if (
        cover_letter_data.body_description.trim().split(/\s+/).length > 250
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
            // opener_detail: cover_letter_data.new_descriptions,
            body_detail: cover_letter_data.body_description,
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
                navigate("/create-cover-letter/closer/" + page_uuid);
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
              experience: data.data.data.example.experience,
              opener_detail: data.data.data.example.opener_detail,
              body_skills: data.data.data.example.body_skills,
              employeer_name: data.data.data.example.employeer_name,
              job_title: data.data.data.example.job_title,
              body_detail: data.data.data.example.body_detail,
              cover_template_id: res_temp_id,
              closer_detail: "",
            });

            Cookies.set("sel_template", res_temp_id, { expires: 1 }); // Expires in 1 day

            // var skillsString = data.data.data.example.body_skills;

            // const skillsArray = skillsString.split(",");

            // setSkillsArray(skillsArray);

            // set_cover_letter_data((prev) => ({
            //   ...prev,
            //   body_skills: [...skillsArray],
            // }));

            // set_cover_letter_data((prev) => ({
            //   ...prev,
            //   employeer_name: data.data.data.example.employeer_name,
            // }));

            // set_cover_letter_data((prev) => ({
            //   ...prev,
            //   job_title: data.data.data.example.job_title,
            // }));

            // set_cover_letter_data((prev) => ({
            //   ...prev,
            //   body_description: data.data.data.example.body_detail,
            // }));

            axios
              .get(global.baseurl + "/cover_letters/" + page_uuid, { headers })
              .then((data2) => {
                if (data2) {
                  set_my_updating_data({
                    first_name: data2.data.data.first_name,
                    last_name: data2.data.data.last_name,
                    body_skills:
                      data2.data.data.body_skills != null
                        ? data2.data.data.body_skills
                        : data.data.data.example.body_skills,
                    employeer_name:
                      data2.data.data.employeer_name != null
                        ? data2.data.data.employeer_name
                        : data.data.data.example.employeer_name,
                    job_title:
                      data2.data.data.job_title != null
                        ? data2.data.data.job_title
                        : data.data.data.example.job_title,
                    body_detail:
                      data2.data.data.body_detail != null
                        ? data2.data.data.body_detail
                        : data.data.data.example.body_detail,
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

                  var skillsString =
                    data2.data.data.body_skills != null
                      ? data2.data.data.body_skills
                      : data.data.data.example.body_skills;

                  const skillsArray = skillsString.split(",");

                  setSkillsArray(skillsArray);

                  set_cover_letter_data((prev) => ({
                    ...prev,
                    body_skills: [...skillsArray],
                  }));

                  set_cover_letter_data((prev) => ({
                    ...prev,
                    employeer_name:
                      data2.data.data.employeer_name != null
                        ? data2.data.data.employeer_name
                        : data.data.data.example.employeer_name,
                  }));

                  set_cover_letter_data((prev) => ({
                    ...prev,
                    job_title:
                      data2.data.data.job_title != null
                        ? data2.data.data.job_title
                        : data.data.data.example.job_title,
                  }));

                  set_cover_letter_data((prev) => ({
                    ...prev,
                    body_description:
                      data2.data.data.body_detail != null
                        ? data2.data.data.body_detail
                        : data.data.data.example.body_detail,
                  }));
                } else {
                }
              })
              .catch((err) => {
                console.log(err);
              });
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

            var skillsString = data.data.data.body_skills;

            const skillsArray = skillsString.split(",");

            setSkillsArray(skillsArray);

            set_cover_letter_data((prev) => ({
              ...prev,
              body_skills: [...skillsArray],
            }));

            set_cover_letter_data((prev) => ({
              ...prev,
              employeer_name: data.data.data.employeer_name,
            }));

            set_cover_letter_data((prev) => ({
              ...prev,
              job_title: data.data.data.job_title,
            }));

            set_cover_letter_data((prev) => ({
              ...prev,
              body_description: data.data.data.body_detail,
            }));
          } else {
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

  const getObjective = (idx, name) => {
    console.log(cover_letter_data);
    if (cover_letter_data.body_description?.includes(name)) {
      // If it exists, remove the name from the state
      set_cover_letter_data((prevDescriptions) => ({
        ...prevDescriptions,
        body_description: prevDescriptions.body_description
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
        body_description: prevDesc.body_description + " " + name,
      }));
      $("#obj_id_" + idx).css("background", "rgb(220,220,220)");
      $("#obj_chk_1" + idx).hide();
      $("#obj_chk_2" + idx).show();
    }
  };

  const my_handle = (name) => {
    set_cover_letter_data((prevDesc) => {
      return {
        ...prevDesc,
        body_description: name,
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

  const [programmingSkills, setProgrammingSkills] = useState([]);
  const [jobPositions, setJobPositions] = useState([]);

  useEffect(() => {
    ApiService.getOpenerRecommends()
      .then((res) => {
        // console.log(res.data.data);
        setRecommends(res.data.data);
      })
      .catch((err) => console.log(err));
    ApiService.getAllTechSkills(user?.token)
      .then((res) => {
        setProgrammingSkills(res.data.data);
      })
      .catch((err) => console.log(err));

    ApiService.getAllJobPositionsNames()
      .then((res) => setJobPositions(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSkillsChange = (event, data) => {
    set_cover_letter_data((prev) => ({
      ...prev,
      body_skills: [...data],
    }));

    setSkillsArray(data);
  };

  return (
    <div className="flex justify-center items-center pt-20 w-full">
      {check_loader === 1 ? <Loader /> : ""}
      <div className="h-fit w-full">
        {/* Text */}
        <div className="text-center flex flex-col gap-2 mb-10">
          <h1 className="text-2xl font-bold">
            {
              screen === 1
                ? "Highlight Your Proficiency: Showcase Your Skills with Impact"
                : screen === 2
                  ? "Professional Journey: Your Past Roles and Companies in Focus"
                  : "Final Flourish: Conclude with a Professional cover letter."
              // : "WHAT'S THE JOB TITLE YOU'RE APPLYING FOR?"
            }
          </h1>
          <span className="text-base">
            {
              screen === 1
                ? "Leverage our Expertise and Construct a Standout cover letter now."
                : screen === 2
                  ? "Illuminate Your Professional Path with Previous Job Titles and Company Names."
                  : "Wrap Up Your Story with a Compelling Closing Statement, Your Success, Your Way."
              // : (
              //   "You'll Want To Make It Clear To The Employer Which Job You Want."
              // )
            }
          </span>
        </div>
        {/* form */}
        <div className="flex flex-wrap justify-between items-start">
          <div className="w-full xl:w-[60%] px-2 lg:px-10">
            <div>
              <form onSubmit={handleSubmit}>
                {screen === 1 ? (
                  <>
                    <div className="w-full setMUI2">
                      <label
                        htmlFor="last_name"
                        className="text-md text-gray-500"
                      >
                        SELECT SKILLS{" "}
                        <span className="text-rose-600 font-bold">*</span>
                      </label>
                      <Stack
                        spacing={0}
                        sx={{ width: "100%", background: "white" }}
                      >
                        <Autocomplete
                          multiple
                          id="tags-filled"
                          options={programmingSkills
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((option) => option.name)}
                          defaultValue={""}
                          value={skillsArray}
                          onChange={handleSkillsChange}
                          freeSolo
                          renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip
                                variant="outlined"
                                label={option}
                                {...getTagProps({ index })}
                              />
                            ))
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="filled"
                              placeholder="Skill"
                              autoComplete="on"
                              sx={{ background: "white" }}
                              InputLabelProps={{ shrink: true }}
                            />
                          )}
                        />
                      </Stack>
                      <div
                        className="text-rose-600 text-sm font-semibold"
                        id="body_skills_valid"
                      ></div>
                      {/*  */}
                      {/*  */}
                    </div>
                  </>
                ) : screen === 2 ? (
                  <>
                    <div className="w-full">
                      {/*  */}
                      <div className="py-2 w-full flex flex-col gap-2 setMUI3">
                        <label
                          htmlFor="job_title"
                          className="text-md text-gray-500"
                        >
                          JOB TITLE{" "}
                          <span className="text-rose-600 font-bold">*</span>
                        </label>
                        <Autocomplete
                          freeSolo
                          id="job_title"
                          className="mt-2"
                          disableClearable
                          value={cover_letter_data.job_title}
                          options={jobPositions
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((job_position) => job_position.name)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label=""
                              autoComplete="on"
                              placeholder="React, Laravel, Flutter..."
                              sx={{
                                height: 10,
                              }}
                              //className='h-8 border border-gray-300 rounded px-4 w-full text-black'
                              InputProps={{
                                ...params.InputProps,
                                type: "search",
                              }}
                              onChange={(e) =>
                                set_cover_letter_data((prev) => ({
                                  ...prev,
                                  job_title: e.target.value,
                                }))
                              }
                              onBlur={(e) =>
                                set_cover_letter_data((prev) => ({
                                  ...prev,
                                  job_title: e.target.value,
                                }))
                              }
                            />
                          )}
                        />
                        <div
                          className="text-rose-600 text-sm font-semibold mt-2"
                          id="job_title_valid"
                        ></div>
                      </div>
                      {/*  */}
                      <div className="mt-6">
                        <label
                          htmlFor="job_title"
                          className="text-md text-gray-500"
                        >
                          COMPANY NAME{" "}
                          <span className="text-rose-600 font-bold">*</span>
                        </label>

                        <input
                          type="text"
                          id="id_no"
                          name="id_no"
                          autoComplete="on"
                          className="border border-gray-600 mt-1 rounded px-4 py-2 w-full text-black"
                          defaultValue={cover_letter_data.employeer_name}
                          // onChange={(e)=>{handlechange2(e)}}

                          placeholder="Google, Facebook, Apple..."
                          onChange={(e) =>
                            set_cover_letter_data((prev) => ({
                              ...prev,
                              employeer_name: e.target.value,
                            }))
                          }
                        />
                        <div
                          className="text-rose-600 text-sm font-semibold"
                          id="company_name_valid"
                        ></div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-wrap justify-between align-start gap-4">
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
                          setContents={cover_letter_data.body_description}
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
                  screen === 3
                    ? setScreen(2)
                    : screen === 2
                      ? setScreen(1)
                      : isExampleTrue === "true"
                        ? navigate(
                          "/create-cover-letter/opener/" +
                          page_uuid +
                          "?example=true"
                        )
                        : navigate("/create-cover-letter/opener/" + page_uuid);
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
                    : screen === 2
                      ? setScreen(3)
                      : navigate("/create-cover-letter/closer/" + page_uuid);
                }}
              >
                SKIP
              </button>
            </div>
          </div>
          {/* Live Preview */}
          <div className="w-full xl:w-[40%] px-6 py-10">
            <div className="w-full 2xl:w-[90%] h-[400px] overflow-hidden m-auto border border-slate-300 p-2">
              <Templates
                zoom={50}
                my_page={"steps"}
                temp_id={Number(res_temp_id)}
                doc_id={Number(res_profile_id)}
                uuid={Number(res_uuid)}
                dummy={0}
                runtime_job_title={cover_letter_data.job_title}
                runtime_employer_name={cover_letter_data.employeer_name}
                runtime_body_descriptions={cover_letter_data.body_description}
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
