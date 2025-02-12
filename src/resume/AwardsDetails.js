import React, { useEffect, useState, useRef } from "react";
import Footer from "./Footer";
import Progress from "./Progress";
import Templates from "./Templates";
import $ from "jquery";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiArrowDownSLine } from "react-icons/ri";
import { BiPencil, BiSolidTrash, BiGridVertical, BiMove } from "react-icons/bi";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import swal from "sweetalert";
import Skeleton from "react-loading-skeleton";
import { useAuth } from "../services/Auth";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const temp = "/images/temp.webp";
const prof_img_def = "/images/avatar.webp";
const Header = ({ isOpen }) => {
  const { user } = useAuth();
  const [personal_info, setpersonal_info] = useState([]);

  const headers = {
    Authorization: "Bearer " + user?.token,
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(personal_info);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    setpersonal_info(reorderedItems);
    console.log(reorderedItems);

    reorderedItems?.map((exp, index) => {
      //console.log(exp.id);

      const article = {
        sort: parseInt(index + 1),
        //_method: 'PUT'
      };
      axios
        .post(global.baseurl + "/award/update-sort/" + exp.id, article, {
          headers,
        })
        .then((data) => {
          if (data) {
          }
        })
        .catch((err) => {
          console.log(err);
        });
      //console.log(exp.id+' -- '+parseInt(index+1))
    });
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const profile_id = Cookies.get("profile_id");
  const doc_uuid = Cookies.get("doc_uuid");

  const page_uuid = useParams().uuid;
  const res_uuid = Cookies.get("doc_uuid");
  const res_profile_id = Cookies.get("profile_id");
  const res_temp_id = Cookies.get("sel_template");

  const [file, setFile] = useState(null);
  const checkbox = useRef();
  const [message, setMessage] = useState();

  const [def_id, setdef_id] = useState();
  const [check_loading, set_check_loading] = useState(0);

  const goto_add = (id) => {
    if (Number(id) === 0) {
      window.location.href = global.localPath + "resume/honors_and_awards";
    } else {
      window.location.href = global.localPath + "resume/languages";
    }
  };

  const edit = (id) => {
    window.location.href = global.localPath + "resume/honors_and_awards/" + id;
  };

  const delete_now = (id) => {
    swal({
      title: "Are You Sure?",
      text: "Once erased, information cannot be recovered",
      icon: "warning",
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        //const token=global.getCookie('token');

        const headers = {
          Authorization: "Bearer " + user?.token,
          "Content-type": "multipart/form-data",
        };
        axios
          .delete(global.baseurl + "/awards/" + id, { headers })
          .then((data) => {
            if (data) {
              //GET PERSONAL INFORMATION
              axios
                .get(global.baseurl + "/award/" + profile_id, { headers })
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
            }
          })
          .catch((err) => {
            console.log(err);
            swal("Error!", "Something Wrong", "error");
          });
      }
    });
  };

  useEffect(() => {
    //const token=global.getCookie('token');

    const headers = {
      Authorization: "Bearer " + user?.token,
    };

    //GET PERSONAL INFORMATION
    axios
      .get(global.baseurl + "/award/" + profile_id, { headers })
      .then((data) => {
        if (data) {
          console.log(data.data.data);
          if (Number(data.data.data.length) !== 0) {
            Cookies.set("res_per_awards", 10, { expires: 1 }); // Expires in 1 day
          }
          setpersonal_info(data.data.data);
          set_check_loading(1);
          //setdef_id();
        }
      })
      .catch((err) => {
        console.log(err);
        set_check_loading(1);
      });

    // const article = {  };
  }, []);

  return (
    <section
      id="main_contents_wrap"
      className="w-full  lg:w-[75%] xl:w-[80%] 2xl:w-[85%]"
    >
      <div id="main_contents" className="">
        <div className="flex flex-wrap justify-center items-start min-h-[1000px] px-2 lg:px-6">
          <div className="w-full">
            <Progress />
          </div>

          <div className="w-full lg:w-[70%] ">
            <h1 className="font_1 text-slate-900 text-3xl  text-center">
              Share Your Achievements to create an impact
            </h1>
            <p className="font_3 text-slate-500 text-xl mt-4 text-center">
              Tell us about any special awards or honors you have earned.{" "}
            </p>

            <div className="flex flex-wrap justify-between align-center mt-20">
              <div className="w-full shadow-lg px-4 py-4 border-2 border-slate-300 rounded-xl ">
                {Number(personal_info.length) !== 0 ? (
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="droppable">
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {/* Mapping through personal_info to render Draggable items */}
                          {personal_info.map(
                            (personal_info, index_personal_info) => (
                              <Draggable
                                key={personal_info.name}
                                draggableId={personal_info.name}
                                index={index_personal_info}
                              >
                                {(provided) => (
                                  <div
                                    key={index_personal_info}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      padding: "5px",
                                      borderRadius: "4px",
                                      ...provided.draggableProps.style,
                                    }}
                                    id={"bug" + index_personal_info}
                                    className="mymove hover:bg-[rgb(230,230,230)] hover:text-[#0072b1]"
                                    onMouseDown={() => {
                                      $("#bug" + index_personal_info).css(
                                        "background",
                                        "rgb(230,230,230)"
                                      );
                                      $("#bug" + index_personal_info).css(
                                        "color",
                                        "#0072b1"
                                      );
                                    }}
                                  >
                                    <div className="flex justify-between items-center ">
                                      <div className="lg:w-[80%] font_1 flex justify-start items-center">
                                        <BiGridVertical className="mr-2" />
                                        {personal_info.name
                                          ? personal_info.name
                                          : ""}
                                      </div>
                                      <div className="lg:w-[20%] flex justify-center items-center">
                                        {/* Edit and delete buttons */}
                                        <BiPencil
                                          onClick={(e) =>
                                            edit(personal_info.id)
                                          }
                                          size={60}
                                          className="cursor-pointer p-4 text-[#0072b1] hover:text-[#00caa5]"
                                        />
                                        <BiSolidTrash
                                          onClick={(e) =>
                                            delete_now(personal_info.id)
                                          }
                                          size={60}
                                          className="cursor-pointer p-4 text-rose-700 hover:text-[#00caa5]"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            )
                          )}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                ) : check_loading === 0 ? (
                  <Skeleton width={"300px"} height={"20px"} />
                ) : (
                  "Data Not Found"
                )}
              </div>

              <div className="w-full my-10 lg:my-20 flex flex-wrap justify-between items-center">
                {/* <Link href="/resume/header/preview">
                        <button className="border border-gray-500 py-2 px-4 rounded sm:text-base text-sm">
                          BACK
                        </button>
                      </Link> */}
                <button
                  className="bg-[#111] text-white hover:bg-[#0072b1]  w-full lg:w-auto  font_1 px-6 py-4 rounded-full shadow-xl text-xl transition-all duration-500 text-center my-2"
                  onClick={(e) => goto_add(0)}
                >
                  +ADD MORE HONORS AND AWARDS
                </button>
                <button
                  className="bg-[#00caa5] w-full lg:w-auto text-white font_1 px-6 py-4 rounded-full shadow-xl text-xl hover:bg-[#0072b1] transition-all duration-500 my-2"
                  onClick={(e) => goto_add(1)}
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
                      ? global.localPath + "resume/languages"
                      : global.localPath + "resume/languages-details"
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
