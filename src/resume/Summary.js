import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Progress from "./Progress";
import $ from "jquery";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiArrowDownSLine } from "react-icons/ri";
import { BiPlus, BiCheck } from "react-icons/bi";
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
  const page_uuid = useParams().uuid;
  const isExampleTrue = new URLSearchParams(window.location.search).get(
    "example"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [is_data, set_is_data] = useState(1);

  const profile_id = Cookies.get("profile_id");
  const doc_uuid = Cookies.get("doc_uuid");

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

  const [file, setFile] = useState(null);

  const [summary, setsummary] = useState({});
  const [countries, setcountries] = useState([]);
  const [objectives, setobjectives] = useState([]);
  const [descriptions, setDescriptions] = useState([]);

  const [new_descriptions, setnewDescriptions] = useState({
    name: "", // Initial value for the 'name' property
    // other properties...
  });

  const handleChange = (event) => {
    // Update the state when the input value changes
    //setsummary({ ...summary, first_name: event.target.value });
    const { id, value } = event.target;
    setsummary({
      ...summary,
      [id]: value,
    });

    console.log(summary.first_name);
  };

  const my_handle = (name) => {
    setnewDescriptions((prevDesc) => {
      return {
        ...prevDesc,
        name: name,
      };
    });
  };

  const getObjective = (idx, name) => {
    if (new_descriptions.name.includes(name)) {
      // If it exists, remove the name from the state
      setnewDescriptions((prevDescriptions) => ({
        ...prevDescriptions,
        name: prevDescriptions.name.replace(name, "").trim(),
      }));
      // setnewDescriptions(prevDesc => {
      //   return {
      //     ...prevDesc,
      //     name: new_descriptions.name+' '+name
      //   }
      // });
      $("#obj_id_" + idx).css("background", "#fff");
      $("#obj_chk_1" + idx).show();
      $("#obj_chk_2" + idx).hide();
    } else {
      // If it doesn't exist, update the state with the new name
      setnewDescriptions((prevDesc) => ({
        ...prevDesc,
        name: prevDesc.name + " " + name,
      }));
      $("#obj_id_" + idx).css("background", "rgb(220,220,220)");
      $("#obj_chk_1" + idx).hide();
      $("#obj_chk_2" + idx).show();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    var valid_desc = 0;

    if (
      new_descriptions.name === "<br>" ||
      new_descriptions.name === "" ||
      new_descriptions.name === undefined ||
      new_descriptions.name === null
    ) {
      $("#desc_valid").html("Description Field is Empty");
    } else if (new_descriptions.name.trim().split(/\s+/).length >= 150) {
      $("#desc_valid").html("Please Add Description Minimum 150 words");
    } else if (new_descriptions.name.trim().length < 5) {
      $("#desc_valid").html("Please Add Description Minimum 5 characters");
    } else {
      $("#desc_valid").html("");
      valid_desc = 1;
    }

    if (valid_desc === 1) {
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
        if (is_data === 1) {
          const article = {
            // title: summary.title,
            description: new_descriptions.name,
            _method: method,
          };
          await axios
            .post(global.baseurl + "/user_summary/" + summary.id, article, {
              headers,
            })
            .then((data) => {
              if (data) {
                set_check_loader(0);
                window.location.href =
                  global.localPath + "resume/experience-details/";
              }
            })
            .catch((err) => {
              console.log(err);
              set_check_loader(0);
              swal("Error!", err.response.data, "error");
            });
        } else {
          const article = {
            // title: summary.title,
            description: new_descriptions.name,
            profile_id: profile_id,
            _method: "POST",
          };
          await axios
            .post(global.baseurl + "/add_summary", article, { headers })
            .then((data) => {
              if (data) {
                Cookies.set("res_per_summary", 10, { expires: 1 }); // Expires in 1 day
                set_check_loader(0);
                window.location.href =
                  global.localPath + "resume/experience-details/";
              }
            })
            .catch((err) => {
              console.log(err);
              set_check_loader(0);
              swal("Error!", err.response.data.message, "error");
            });
        }
      } else {
        const article = {
          // title: summary.title,
          description: new_descriptions.name,
          profile_id: profile_id,
          _method: method,
        };
        await axios
          .post(global.baseurl + "/add_summary", article, { headers })
          .then((data) => {
            if (data) {
              Cookies.set("res_per_summary", 10, { expires: 1 }); // Expires in 1 day
              set_check_loader(0);
              if (isExampleTrue === "true") {
                window.location.href =
                  global.localPath +
                  "resume/experience/" +
                  page_uuid +
                  "?example=true";
              } else {
                window.location.href = global.localPath + "resume/experience";
              }
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
        .get(global.baseurl + "/objectives", { headers })
        .then((data) => {
          if (data) {
            setobjectives(data.data?.data);
            console.log(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get(global.baseurl + "/resume_example/" + page_uuid, { headers })
        .then((data) => {
          if (data) {
            console.log(data.data.data.example);
            setsummary(data.data.data.example.summaries[0]);

            setnewDescriptions((prevDesc) => ({
              ...prevDesc,
              name: data.data.data.example.summaries[0].description,
            }));
          }
        })
        .catch((err) => {
          console.log(err);
          //window.location.href = global.localPath + "resume/summary";
        });
    } else if (page_uuid && isExampleTrue === null) {
      //GET PERSONAL INFORMATION
      axios
        .get(global.baseurl + "/objectives", { headers })
        .then((data) => {
          if (data) {
            setobjectives(data.data?.data);
            console.log(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get(global.baseurl + "/show_summaries/" + page_uuid, { headers })
        .then((data) => {
          if (data) {
            console.log(data.data.data);
            setsummary(data.data.data);

            setnewDescriptions((prevDesc) => ({
              ...prevDesc,
              name: data.data.data.description,
            }));
          }
        })
        .catch((err) => {
          set_is_data(0);
          console.log(err);
          //window.location.href = global.localPath + "resume/summary";
        });
    } else {
      axios
        .get(global.baseurl + "/objectives", { headers })
        .then((data) => {
          if (data) {
            setobjectives(data.data?.data);
            console.log(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
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

          <div className="lg:w-full mt-20">
            <h1 className="font_1 text-slate-900 text-3xl  text-center">
              Polish Your Profile with our Standout Professional Summary
              suggestions
            </h1>

            <div className="border-t-[#0072b1] border-t-4 w-[90%] m-auto my-10 rounded-md py-4 px-6 shadow-[0px_5px_10px_0px_rgba(0,0,0,0.2)]">
              <p className="font_3 text-slate-600 text-xl text-center">
                Get our Easy-to-Use Suggestions to Boost Your Resume and Catch
                the Eye of Employers.{" "}
              </p>
            </div>

            <div className="flex flex-wrap justify-between align-start mt-20">
              <div className="w-[90%] m-auto mb-10">
                <div className="lg:w-[50%]">
                  <label htmlFor="title" className="text-md text-gray-500">
                    SEARCH
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="h-8 border border-gray-300 text-gray-500 mt-2 rounded px-4 w-full"
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                    }}
                    placeholder="Search Here..."
                  />
                </div>
              </div>

              <div className="w-[90%] m-auto flex flex-wrap justify-center items-center border-slate-300 border max-h-[350px] overflow-y-scroll">
                {objectives
                  .filter((objective) =>
                    objective.objective
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((objectives, index_objectives) => (
                    <div
                      onClick={(e) =>
                        getObjective(index_objectives, objectives.objective)
                      }
                      id={"obj_id_" + index_objectives}
                      key={index_objectives}
                      className="w-full hover:bg-slate-200 cursor-pointer grid grid-cols-[10%,90%] md:grid-cols-[8%,92%] lg:grid-cols-[5%,95%] justify-start items-center border-slate-300 border px-2 lg:px-4 py-2"
                    >
                      <BiPlus
                        id={"obj_chk_1" + index_objectives}
                        className="bg-[#00caa5] text-white text-4xl p-1  md:w-[40px] md:h-[40px]"
                      />
                      <BiCheck
                        id={"obj_chk_2" + index_objectives}
                        style={{ display: "none" }}
                        className="bg-[#00caa5] text-white text-4xl p-1  md:w-[40px] md:h-[40px]"
                      />
                      <p className="font_3 text-sm text-slate-500 p-4 ">
                        {objectives.objective}
                      </p>
                    </div>
                  ))}
              </div>
              <input
                type="hidden"
                id="id"
                className="h-8 border border-gray-300 text-gray-500 mt-2 rounded px-4 w-full"
                defaultValue={summary.id ? summary.id : ""}
                onChange={handleChange}
                placeholder="Title"
              />
              {/* <div className="w-[90%] m-auto mt-10">
                    <div className='lg:w-[50%]'>
                        <label htmlFor="title" className="text-md text-gray-500">
                          TITLE
                        </label>
                        <input
                          type="text"
                          id="title"
                          className="h-8 border border-gray-300 text-gray-500 mt-2 rounded px-4 w-full"
                          defaultValue={summary.title ? summary.title : ''}
                          onChange={handleChange}
                          placeholder="Title"
                        />
                      </div>
                  </div> */}

              <div className="w-[90%] m-auto mt-10">
                <label htmlFor="description" className="text-md text-gray-500">
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

              <div className="w-[90%] m-auto my-10">
                <div className="w-full flex justify-between items-center flex-wrap">
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
                        "resume/header/" +
                        page_uuid +
                        "?example=true"
                        : Number(doc_uuid) === ""
                          ? global.localPath + "resume/header"
                          : global.localPath + "resume/header/" + doc_uuid
                    }
                    className="bg-slate-200 w-full lg:w-auto text-[#0072b1] font_1 px-6 py-4 rounded-full shadow-xl text-xl hover:bg-[#0072b1] hover:text-white transition-all duration-500 text-center my-2"
                  >
                    BACK
                  </a>
                  <a
                    href={
                      isExampleTrue === "true"
                        ? global.localPath +
                        "resume/experience/" +
                        page_uuid +
                        "?example=true"
                        : Number(doc_uuid) === ""
                          ? global.localPath + "resume/experience"
                          : global.localPath + "resume/experience-details"
                    }
                    className="bg-[#f3ef9d] w-full lg:w-auto text-[#0072b1] font_1 px-6 py-4 rounded-full shadow-xl text-xl hover:bg-[#00caa5] hover:text-white transition-all duration-500 text-center my-2"
                  >
                    SKIP SECTION
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* <div className='lg:w-[30%] my-10 lg:my-40'>
                <img src={temp} width={200} height={200} className='w-[70%] m-auto mt-40'/>
              </div> */}
        </div>

        <Footer />
      </div>
    </section>
  );
};

export default Header;
