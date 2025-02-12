import React, { useEffect, useState } from "react";
import $ from "jquery";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiArrowDownSLine } from "react-icons/ri";
import {
  BiPencil,
  BiSolidTrash,
  BiMove,
  BiLogoLinkedin,
  BiGlobe,
  BiSolidMap,
  BiSolidBriefcaseAlt2,
  BiSolidCreditCardFront,
  BiSolidFlag,
  BiSolidBookHeart,
  BiSolidEnvelope,
  BiSolidPhone,
  BiSolidUser,
  BiSolidCalendarAlt,
} from "react-icons/bi";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import swal from "sweetalert";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Skeleton from "react-loading-skeleton";
import { useAuth } from "../../services/Auth";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);

  const [removed] = result.splice(startIndex, 1);

  result.splice(endIndex, 0, removed);

  return result;
};

const temp = "/images/temp.webp";
const Header = (props) => {
  const { user } = useAuth();
  const handleDrag = (e, ui) => {
    // Handle drag events if needed
    console.log(ui);
  };
  const link = useParams().link;
  const share = new URLSearchParams(window.location.search).get("share");

  const [personal_info, setpersonal_info] = useState([]);
  const [countries, setcountries] = useState([]);
  const [province, setprovince] = useState([]);
  const [cities, setcities] = useState([]);

  const [summary, setsummary] = useState([]);
  const [technical_skills, settechnical_skills] = useState([]);
  const [soft_skills, setsoft_skills] = useState([]);
  const [experiences, set_experiences] = useState([]);
  const [education, set_education] = useState([]);
  const [references, set_references] = useState([]);
  const [certificate, set_certificate] = useState([]);
  const [awards, set_awards] = useState([]);

  const [languages, set_languages] = useState([]);
  const [custom_section, set_custom_section] = useState([]);
  const [digital_signature, set_digital_signature] = useState([]);
  const [check_loading, set_check_loading] = useState(0);
  const [check_loading2, set_check_loading2] = useState(0);
  const [check_loading3, set_check_loading3] = useState(0);
  const [check_loading4, set_check_loading4] = useState(0);
  const [check_loading5, set_check_loading5] = useState(0);
  const [check_loading6, set_check_loading6] = useState(0);
  const [check_loading7, set_check_loading7] = useState(0);
  const [check_loading8, set_check_loading8] = useState(0);
  const [check_loading9, set_check_loading9] = useState(0);
  const [check_loading10, set_check_loading10] = useState(0);
  const [check_loading11, set_check_loading11] = useState(0);
  const [check_loading12, set_check_loading12] = useState(0);

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
    if (
      props.my_page === "steps" ||
      props.my_page === "doc" ||
      props.my_page === "temp"
    ) {
      if (isMobile) {
        scale = "scale(35%)";
        width = 285;
      } else {
        scale = "scale(40%)";
        width = 250;
      }
    } else {
      if (isMobile) {
        scale = "scale(45%)";
        width = 225;
      } else {
        scale = "scale(80%)";
        width = 125;
      }
    }
  }

  const [show_states, set_show_states] = useState([]);
  const [show_cities, set_show_cities] = useState([]);

  var username = global.getCookie("user_name");
  const doc_uuid = global.getCookie("doc_uuid");
  const profile_id = Cookies.get("profile_id");

  var my_uuid;
  var my_profile_id;

  if (props.uuid) {
    my_uuid = props.uuid;
    my_profile_id = props.doc_id;
  } else {
    my_uuid = global.getCookie("doc_uuid");
    my_profile_id = Cookies.get("profile_id");
  }

  const [pen_color_def, setpen_color_def] = useState(props.pen_color);

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

  useEffect(() => {
    const headers = {
      Authorization: "Bearer " + user?.token,
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .get(global.baseurl + "/resume-formating/" + my_profile_id, { headers })
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
            setpen_color_def("purple");
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
        .get(global.baseurl + "/show-profile/" + link, { headers })
        .then((data) => {
          if (data) {
            console.log(data);
            axios
              .get(
                global.baseurl +
                "/states/show-states/" +
                data.data.data.country_id,
                { headers }
              )
              .then((data) => {
                if (data) {
                  setprovince(data.data?.data);
                }
              })
              .catch((err) => {
                console.log(err);
              });
            axios
              .get(
                global.baseurl +
                "/cities/show-cities/" +
                data.data.data.state_id,
                { headers }
              )
              .then((data) => {
                if (data) {
                  setcities(data.data?.data);
                }
              })
              .catch(() => { });
            console.log(data);
            setTimeout(function () {
              setpersonal_info(data.data.data);
              setsummary(data.data.data.summary);
              settechnical_skills(data.data.data.technical_skills);
              setsoft_skills(data.data.data.soft_skills);
              set_education(data.data.data.education); //degree title
              set_references(data.data.data.references);
              set_certificate(data.data.data.certificates);
              set_awards(data.data.data.awards);
              set_languages(data.data.data.languages);
              set_custom_section(data.data.data.custom_sections);
              set_experiences(data.data.data.experiences);
              set_digital_signature(data.data.data.digital_signature);
              set_check_loading(1);
              set_check_loading2(1);
              set_check_loading3(1);
              set_check_loading4(1);
              set_check_loading5(1);
              set_check_loading6(1);
              set_check_loading7(1);
              set_check_loading8(1);
              set_check_loading9(1);
              set_check_loading10(1);
              set_check_loading11(1);
              set_check_loading12(1);
            }, 1000);
          }
        })
        .catch((err) => {
          set_check_loading(1);
          set_check_loading2(1);
          set_check_loading3(1);
          set_check_loading4(1);
          set_check_loading5(1);
          set_check_loading6(1);
          set_check_loading7(1);
          set_check_loading8(1);
          set_check_loading9(1);
          set_check_loading10(1);
          set_check_loading11(1);
          set_check_loading12(1);
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (!share) {
      const headers = {
        Authorization: "Bearer " + user?.token,
        "Access-Control-Allow-Origin": "*",
      };
      axios
        .get(global.baseurl + "/show-profile/" + my_profile_id, { headers })
        .then((data) => {
          if (data) {
            console.log(data);
            axios
              .get(
                global.baseurl +
                "/states/show-states/" +
                data.data.data.country_id,
                { headers }
              )
              .then((data) => {
                if (data) {
                  setprovince(data.data?.data);
                }
              })
              .catch((err) => {
                console.log(err);
              });
            axios
              .get(
                global.baseurl +
                "/cities/show-cities/" +
                data.data.data.state_id,
                { headers }
              )
              .then((data) => {
                if (data) {
                  setcities(data.data?.data);
                }
              })
              .catch(() => { });
            console.log(data);
            setTimeout(function () {
              setpersonal_info(data.data.data);
              setsummary(data.data.data.summary);
              settechnical_skills(data.data.data.technical_skills);
              setsoft_skills(data.data.data.soft_skills);
              set_education(data.data.data.education); //degree title
              set_references(data.data.data.references);
              set_certificate(data.data.data.certificates);
              set_awards(data.data.data.awards);
              set_languages(data.data.data.languages);
              set_custom_section(data.data.data.custom_sections);
              set_experiences(data.data.data.experiences);
              set_digital_signature(data.data.data.digital_signature);
              console.log(data.data.data);
              set_check_loading(1);
              set_check_loading2(1);
              set_check_loading3(1);
              set_check_loading4(1);
              set_check_loading5(1);
              set_check_loading6(1);
              set_check_loading7(1);
              set_check_loading8(1);
              set_check_loading9(1);
              set_check_loading10(1);
              set_check_loading11(1);
              set_check_loading12(1);
            }, 1000);
          }
        })
        .catch((err) => {
          set_check_loading(1);
          set_check_loading2(1);
          set_check_loading3(1);
          set_check_loading4(1);
          set_check_loading5(1);
          set_check_loading6(1);
          set_check_loading7(1);
          set_check_loading8(1);
          set_check_loading9(1);
          set_check_loading10(1);
          set_check_loading11(1);
          set_check_loading12(1);
          console.log(err);
        });

      axios
        .get(global.baseurl + "/show-countries", { headers })
        .then((data) => {
          if (data) {
            setcountries(data.data?.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (
      props.pen_color === "d" ||
      props.pen_color === "" ||
      props.pen_color === null ||
      props.pen_color === undefined ||
      props.pen_color === false
    ) {
      setpen_color_def("purple");
    } else {
      setpen_color_def(props.pen_color);
    }

    //const token=global.getCookie('token');
    //   if(!share){
    //   const headers = {
    //     'Authorization': 'Bearer ' + user?.token,
    //     'Access-Control-Allow-Origin': '*'
    //   };
    //   if(my_uuid){
    //     //GET PERSONAL INFORMATION
    //   axios.get(global.baseurl + "/personal_information/"+my_uuid,{headers}).then((data) => {
    //     if(data){
    //       axios.get(global.baseurl + "/states/show-states/"+data.data.data[0].country_id,{headers}).then((data) => {
    //         if(data){
    //             setprovince(data.data?.data);
    //         }

    //         }).catch((err) => {
    //           console.log(err);
    //         })
    //       axios.get(global.baseurl + "/cities/show-cities/"+data.data.data[0].state_id,{headers}).then((data) => {
    //         if(data){
    //             setcities(data.data?.data);
    //         }

    //         }).catch(() => {

    //         })
    //         console.log('abc');
    //         console.log(data.data.data[0].image_directory);
    //         setTimeout(function(){setpersonal_info(data.data.data[0]);
    //           set_check_loading(1);
    //         }, 1000);

    //         //console.log(data.data.data[0]);

    //     }

    //     }).catch((err) => {
    //       console.log(err);
    //       set_check_loading(1);
    //     })

    //     axios.get(global.baseurl + "/show-countries",{headers}).then((data) => {
    //       if(data){
    //           setcountries(data.data?.data);

    //       }

    //       }).catch((err) => {
    //         console.log(err);
    //       })

    //     // SUMMARIES
    //     axios.get(global.baseurl + "/show_summaries/"+my_profile_id,{headers}).then((data) => {
    //       if(data){

    //           //console.log(data.data.data);
    //           setsummary(data.data.data);
    //           set_check_loading2(1);

    //       }

    //       }).catch((err) => {
    //         console.log(err);
    //         set_check_loading2(1);
    //       })

    //     // TECHNICAL SKILLS
    //       axios.get(global.baseurl + "/technical_skills/"+my_profile_id,{headers}).then((data) => {
    //         if(data){

    //             //console.log(data.data.data[0]);
    //             settechnical_skills(data.data.data[0]);
    //             set_check_loading3(1);
    //         }

    //         }).catch((err) => {
    //           console.log(err);
    //           set_check_loading3(1);

    //         })

    //       // SOFT SKILLS
    //         axios.get(global.baseurl + "/soft_skills/"+my_profile_id,{headers}).then((data) => {
    //           if(data){

    //               //console.log(data.data.data[0]);
    //               setsoft_skills(data.data.data[0]);
    //               set_check_loading4(1);
    //           }

    //           }).catch((err) => {
    //             console.log(err);
    //             set_check_loading4(1);

    //           })
    //       //EDUCATION
    //       axios.get(global.baseurl + "/education?profile_id="+my_profile_id,{headers}).then((data) => {
    //         if(data){
    //           set_education(data.data.data);
    //           set_check_loading5(1);
    //         }

    //         }).catch((err) => {
    //           console.log(err);
    //           set_check_loading5(1);
    //         })

    //         axios.get(global.baseurl + "/user_references/"+my_profile_id,{headers}).then((data) => {
    //           if(data){
    //             console.log(data);
    //             set_references(data.data.data);
    //             set_check_loading6(1);
    //           }

    //           }).catch((err) => {
    //             console.log(err);
    //             set_check_loading6(1);
    //           })

    //       //CERTIFICATES
    //       axios.get(global.baseurl + "/certificate/"+my_profile_id,{headers}).then((data) => {
    //       if(data){
    //         //console.log(data.data.data);
    //         set_certificate(data.data.data);
    //         set_check_loading7(1);
    //         //setdef_id();
    //         }

    //         }).catch((err) => {
    //           console.log(err);
    //           set_check_loading7(1);
    //         })

    //       //AWARDS
    //       axios.get(global.baseurl + "/award/"+my_profile_id,{headers}).then((data) => {
    //         if(data){
    //           set_awards(data.data.data);
    //           set_check_loading8(1);
    //           //setdef_id();
    //           }

    //           }).catch((err) => {
    //             console.log(err);
    //             set_check_loading8(1);
    //           })
    //       //LANGUAGES
    //       axios.get(global.baseurl + "/user_languages/"+my_profile_id,{headers}).then((data) => {
    //         if(data){
    //           console.log(data.data.data);
    //           set_languages(data.data.data);
    //           set_check_loading9(1);
    //           //setdef_id();
    //           }

    //           }).catch((err) => {
    //             console.log(err);
    //             set_check_loading9(1);
    //           })
    //       //CUSTOM SECTION
    //       axios.get(global.baseurl + "/custom_details?profile_id="+my_profile_id,{headers}).then((data) => {
    //         if(data){
    //           set_custom_section(data.data.data);
    //           set_check_loading10(1);
    //           //setdef_id();
    //           }

    //           }).catch((err) => {
    //             console.log(err);
    //             set_check_loading10(1);
    //           })
    //       //DIGITAL SIGNATURE
    //       axios.get(global.baseurl + "/signatures/"+my_profile_id+"",{headers}).then((data) => {
    //         if(data){

    //           set_digital_signature(data.data.data[0]);
    //           set_check_loading11(1);
    //         }

    //         }).catch((err) => {
    //           console.log(err);
    //           set_check_loading11(1);
    //         })
    //       // EXPERIENCES
    //       var chk = 0;
    //       axios.get(global.baseurl + "/experiences?profile_id="+my_profile_id,{headers}).then((data) => {
    //         if(data){

    //           // data.data.data?.map((exp) =>{
    //           //   //console.log(exp.id);
    //           //   axios.get(global.baseurl + "/cities/"+exp.state_id,{headers}).then((data) => {
    //           //     if(data){
    //           //       console.log(data.data?.data);
    //           //       set_show_cities((prevCities) => [...prevCities, data.data?.data.name]);
    //           //       set_show_states((prevStates) => [...prevStates, data.data?.data.state_name]);

    //           //     }

    //           //     }).catch(() => {

    //           //     })
    //           // })

    //             set_experiences(data.data.data);
    //             set_check_loading12(1);
    //           }

    //           }).catch((err) => {
    //             console.log(err);
    //             set_check_loading12(1);
    //           })
    //   }else{
    //     set_check_loading(1);
    //     set_check_loading2(1);
    //     set_check_loading3(1);
    //     set_check_loading4(1);
    //     set_check_loading5(1);
    //     set_check_loading6(1);
    //     set_check_loading7(1);
    //     set_check_loading8(1);
    //     set_check_loading9(1);
    //     set_check_loading10(1);
    //     set_check_loading11(1);
    //     set_check_loading12(1);
    //   }

    // }

    // //  // const article = {  };
    // //   axios.get(global.baseurl + "/show-countries",{headers}).then((data) => {
    // //     if(data){
    // //         setcountries(data.data?.data);

    // //     }

    // //     }).catch((err) => {
    // //       console.log(err);
    // //     })

    //          console.log(Number(languages.length));
  }, []);
  // const token=global.getCookie('token');

  // const headers = {
  //   'Authorization': 'Bearer ' + token
  // };
  // const requestQueue = [];
  // let isProcessingQueue = false;

  // const processRequestQueue = async () => {
  //   if (requestQueue.length === 0 || isProcessingQueue) {
  //     return;
  //   }

  //   isProcessingQueue = true;

  //   const { country_id } = requestQueue.shift();

  //   try {
  //     const response = await axios.get(global.baseurl + "/states/" + country_id, { headers });
  //     console.log(response.data?.data.name);
  //     set_show_states(response.data?.data.name);

  //   } catch (error) {
  //     console.error("Error fetching states:", error);
  //   }

  //   isProcessingQueue = false;
  //   setTimeout(processRequestQueue, 1000); // Adjust the delay as needed

  // };

  // const getStates = (country_id) => {
  //   requestQueue.push({ country_id });

  //   // Start processing the queue if not already started
  //   processRequestQueue();
  // };

  const delete_references = (id) => {
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
          .delete(global.baseurl + "/delete_reference/" + id, { headers })
          .then((data) => {
            if (data) {
              //GET PERSONAL INFORMATION
              axios
                .get(global.baseurl + "/user_references/" + my_profile_id, {
                  headers,
                })
                .then((data) => {
                  if (data) {
                    //console.log(data.data.data);
                    set_references(data.data.data);
                  }
                })
                .catch((err) => {
                  console.log(err);
                  set_references([]);
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
  const delete_summary = (id) => {
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
          .delete(global.baseurl + "/user_summary/" + id, { headers })
          .then((data) => {
            if (data) {
              //GET PERSONAL INFORMATION
              axios
                .get(global.baseurl + "/show_summaries/" + my_profile_id, {
                  headers,
                })
                .then((data) => {
                  if (data) {
                    //console.log(data.data.data);
                    setsummary(data.data.data);
                  }
                })
                .catch((err) => {
                  console.log(err);
                  setsummary([]);
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

  const delete_experience = (id) => {
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
        };
        axios
          .delete(global.baseurl + "/experiences/" + id, { headers })
          .then((data) => {
            if (data) {
              axios
                .get(
                  global.baseurl + "/experiences?profile_id=" + my_profile_id,
                  { headers }
                )
                .then((data) => {
                  if (data) {
                    // data.data.data?.map((exp) =>{
                    //   //console.log(exp.id);
                    //   axios.get(global.baseurl + "/cities/"+exp.state_id,{headers}).then((data) => {
                    //     if(data){
                    //       console.log(data.data?.data);
                    //       set_show_cities((prevCities) => [...prevCities, data.data?.data.name]);
                    //       set_show_states((prevStates) => [...prevStates, data.data?.data.state_name]);

                    //     }

                    //     }).catch(() => {

                    //     })
                    // })

                    set_experiences(data.data.data);
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

  const delete_education = (id) => {
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
          .delete(global.baseurl + "/education/" + my_uuid, { headers })
          .then((data) => {
            if (data) {
              //GET PERSONAL INFORMATION
              axios
                .get(global.baseurl + "/education/" + my_uuid, { headers })
                .then((data) => {
                  if (data) {
                    set_education(data.data.data);
                  }
                })
                .catch((err) => {
                  set_education([]);
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

  const delete_technical_skills = (id) => {
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
          .delete(global.baseurl + "/technical_skills/" + id, { headers })
          .then((data) => {
            if (data) {
              //GET PERSONAL INFORMATION
              axios
                .get(global.baseurl + "/technical_skills/" + my_profile_id, {
                  headers,
                })
                .then((data) => {
                  if (data) {
                    settechnical_skills(data.data.data);
                  }
                })
                .catch((err) => {
                  settechnical_skills([]);
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

  const delete_soft_skills = (id) => {
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
          .delete(global.baseurl + "/soft_skills/" + id, { headers })
          .then((data) => {
            if (data) {
              //GET PERSONAL INFORMATION
              axios
                .get(global.baseurl + "/soft_skills/" + my_profile_id, {
                  headers,
                })
                .then((data) => {
                  if (data) {
                    //console.log(data.data.data[0]);
                    setsoft_skills(data.data.data[0]);
                  }
                })
                .catch((err) => {
                  console.log(err);
                  setsoft_skills([]);
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

  const delete_certificate = (id) => {
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
          .delete(global.baseurl + "/certificates/" + id, { headers })
          .then((data) => {
            if (data) {
              //GET PERSONAL INFORMATION
              axios
                .get(global.baseurl + "/certificate/" + my_profile_id, {
                  headers,
                })
                .then((data) => {
                  if (data) {
                    //console.log(data.data.data);
                    set_certificate(data.data.data);
                    //setdef_id();
                  }
                })
                .catch((err) => {
                  console.log(err);
                  set_certificate([]);
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

  const delete_awards = (id) => {
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
                .get(global.baseurl + "/award/" + my_profile_id, { headers })
                .then((data) => {
                  if (data) {
                    set_awards(data.data.data);
                    //setdef_id();
                  }
                })
                .catch((err) => {
                  console.log(err);
                  set_awards([]);
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

  const delete_languages = (id) => {
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
          .delete(global.baseurl + "/delete_user_language/" + id, { headers })
          .then((data) => {
            if (data) {
              ///LANGUAGES
              axios
                .get(global.baseurl + "/user_languages/" + my_profile_id, {
                  headers,
                })
                .then((data) => {
                  if (data) {
                    console.log(data.data.data);
                    set_languages(data.data.data);
                    //setdef_id();
                  }
                })
                .catch((err) => {
                  console.log(err);
                  set_languages([]);
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

  const delete_digital_signature = (id) => {
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
          .delete(global.baseurl + "/user_digital_signature/" + id, { headers })
          .then((data) => {
            if (data) {
              //DIGITAL SIGNATURE
              axios
                .get(global.baseurl + "/signatures/" + my_profile_id + "", {
                  headers,
                })
                .then((data) => {
                  if (data) {
                    set_digital_signature(data.data.data[0]);
                  }
                })
                .catch((err) => {
                  console.log(err);
                  set_digital_signature([]);
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

  const delete_custom_section = (id) => {
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
          .delete(global.baseurl + "/custom_details/" + id, { headers })
          .then((data) => {
            if (data) {
              //CUSTOM SECTION
              axios
                .get(
                  global.baseurl +
                  "/custom_details?profile_id=" +
                  my_profile_id,
                  { headers }
                )
                .then((data) => {
                  if (data) {
                    set_custom_section(data.data.data);
                    //setdef_id();
                  }
                })
                .catch((err) => {
                  set_custom_section([]);
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

  const [items, setItems] = useState([
    "Summary",
    "Education",
    "Experience",

    "Technical Skills",
    "Soft Skills",
    "Honors & Awards",
    "Certificates",

    "Custom Section",
    "References",
    "Languages",
  ]);

  const onDragEnd = (result) => {
    console.log(result);

    if (!result.destination) {
      return;
    }

    const updatedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(updatedItems);
  };

  return (
    <section
      id={"print-content-1_" + props.doc_id}
      style={{
        transform: scale,
        width: width + "%",
        "transform-origin": "top left",
      }}
      className={
        "font_1 p-2 min-h-[800px] bg-white h-[100%] relative mine_adjust"
      }
    >
      {check_loading === 0 ||
        check_loading2 === 0 ||
        check_loading3 === 0 ||
        check_loading4 === 0 ||
        check_loading5 === 0 ||
        check_loading6 === 0 ||
        check_loading7 === 0 ||
        check_loading8 === 0 ||
        check_loading9 === 0 ||
        check_loading10 === 0 ||
        check_loading11 === 0 ||
        check_loading12 === 0 ? (
        <div className="mt-[10%]">
          <Skeleton className="flex w-full my-2" height={"50px"} />
          <Skeleton className="flex w-full my-2" height={"50px"} />
          <Skeleton className="flex w-full my-2" height={"50px"} />
          <Skeleton className="flex w-full my-2" height={"50px"} />
          <Skeleton className="flex w-full my-2" height={"50px"} />
        </div>
      ) : (
        <>
          <div
            className={
              Number(props.formatting) === 1
                ? "dd_btn4 hover:bg-emerald-100 cursor-pointer absolute top-[50px] w-full"
                : " dd_btn4 hover:bg-emerald-100 cursor-pointer absolute top-[50px] w-full"
            }
          >
            <div className="hidden dd_menu4 absolute right-0">
              <a href={global.localPath + "resume/header/" + doc_uuid}>
                <BiPencil
                  size={30}
                  className="text-slate-100 hover:text-slate-300 p-1"
                />
              </a>
              {/* <BiSolidTrash size={30} className='text-slate-900 hover:text-[#0072b1] p-1'/> */}
            </div>
            <div className="flex flex-wrap justify-between items-center bg-[#548ca8] px-4 py-2 ">
              <div className="py-2">
                <div className="flex justify-center items-center text-slate-200 text-5xl uppercase py-2">
                  <h1
                    className={
                      heading_font_style
                        ? heading_font_style + " m-1"
                        : " ubuntu m-1"
                    }
                  >
                    {" "}
                    {props.runtime_first_name
                      ? props.runtime_first_name
                      : personal_info.first_name
                        ? personal_info.first_name
                        : "First Name"}
                  </h1>
                  <h1
                    className={
                      heading_font_style
                        ? heading_font_style + " m-1"
                        : " ubuntu m-1"
                    }
                  >
                    {" "}
                    {props.runtime_middle_name
                      ? props.runtime_middle_name
                      : personal_info.middle_name
                        ? personal_info.middle_name
                        : ""}
                  </h1>
                  <h1
                    className={
                      heading_font_style
                        ? heading_font_style + " m-1"
                        : " ubuntu m-1"
                    }
                  >
                    {" "}
                    {props.runtime_last_name
                      ? props.runtime_last_name
                      : personal_info.last_name
                        ? personal_info.last_name
                        : "Last Name"}
                  </h1>
                </div>
                {personal_info.job_title ? (
                  <p
                    className={
                      paragraph_font_style
                        ? paragraph_font_style +
                        " text-slate-200 uppercase text-3xl font-light tracking-widest py-2"
                        : " text-slate-200 uppercase ubuntu text-3xl font-light tracking-widest py-2"
                    }
                  >
                    {personal_info.job_title ? personal_info.job_title : ""}
                  </p>
                ) : (
                  ""
                )}
              </div>

              {personal_info.profile_image ? (
                // <div id='yourElementId' className='rounded-full m-auto w-[100px] h-[100px] shadow-lg border-2 border-[#111] bg-[url]'></div>
                <img
                  src={global.imageUrl + "/" + personal_info.profile_image}
                  width={160}
                  height={160}
                  className="rounded-full w-[160px] h-[160px] border-[8px] border-solid border-slate-200 bg-white"
                />
              ) : (
                <div
                  className={
                    heading_font_style
                      ? heading_font_style +
                      " rounded-full w-[160px] h-[160px] m-auto flex justify-center items-center border-[8px] border-solid border-slate-200"
                      : "font_1" +
                      " rounded-full w-[160px] h-[160px] m-auto flex justify-center items-center border-[8px] border-solid border-slate-200"
                  }
                  style={{
                    border: "2px solid #111",
                    color: pen_color_def,
                    fontSize: heading_font_size
                      ? heading_font_size + "px"
                      : "30" + "px",
                  }}
                >
                  {props.runtime_first_name
                    ? props.runtime_first_name.charAt(0)
                    : personal_info.first_name
                      ? personal_info.first_name.charAt(0)
                      : "F"}
                  {props.runtime_last_name
                    ? props.runtime_last_name.charAt(0)
                    : personal_info.last_name
                      ? personal_info.last_name.charAt(0)
                      : "L"}
                </div>
              )}
            </div>
          </div>

          <div className="main flex flex-wrap justify-start items-start h-[100%]">
            <div className="w-[30%] py-[100px] h-[100%] bg-[#2b3743]">
              {/* personal_info */}
              <div className="mt-[200px] mx-4 text-slate-200">
                {personal_info.gender ? (
                  <div className="py-2 flex justify-start items-center">
                    <BiSolidUser size={20} />
                    <p
                      className={
                        paragraph_font_style
                          ? paragraph_font_style + " pl-4 "
                          : " ubuntu pl-4 text-lg"
                      }
                      style={{
                        fontSize: paragraph_font_size
                          ? paragraph_font_size + "px"
                          : "14" + "px",
                        marginTop: paragraph_spacing + "px",
                      }}
                    >
                      {personal_info.gender ? personal_info.gender : ""}
                    </p>
                  </div>
                ) : (
                  ""
                )}

                {personal_info.date_of_birth ? (
                  <div className="py-2 flex justify-start items-center">
                    <BiSolidCalendarAlt size={20} />
                    <p
                      className={
                        paragraph_font_style
                          ? paragraph_font_style + " pl-4 "
                          : " ubuntu pl-4 text-lg"
                      }
                      style={{
                        fontSize: paragraph_font_size
                          ? paragraph_font_size + "px"
                          : "14" + "px",
                        marginTop: paragraph_spacing + "px",
                      }}
                    >
                      {personal_info.date_of_birth
                        ? formattedDate(personal_info.date_of_birth)
                        : ""}
                    </p>
                  </div>
                ) : (
                  ""
                )}

                {personal_info.contact_number ? (
                  <div className="py-2 flex justify-start items-center">
                    <BiSolidPhone size={20} />
                    <p
                      className={
                        paragraph_font_style
                          ? paragraph_font_style + " pl-4 "
                          : " ubuntu pl-4 text-lg"
                      }
                      style={{
                        fontSize: paragraph_font_size
                          ? paragraph_font_size + "px"
                          : "14" + "px",
                        marginTop: paragraph_spacing + "px",
                      }}
                    >
                      {props.runtime_phone_number
                        ? props.runtime_phone_number
                        : personal_info.phone_number
                          ? personal_info.phone_number
                          : ""}{" "}
                      {(props.runtime_phone_number ||
                        personal_info.phone_number) &&
                        (props.runtime_contact_number ||
                          personal_info.contact_number)
                        ? "-"
                        : ""}{" "}
                      {props.runtime_contact_number
                        ? props.runtime_contact_number
                        : personal_info.contact_number
                          ? personal_info.contact_number
                          : ""}
                    </p>
                  </div>
                ) : (
                  ""
                )}

                {props.runtime_email_address || personal_info.email_address ? (
                  <div className="py-2 flex justify-start items-center">
                    <BiSolidEnvelope size={20} />
                    <p
                      className={
                        paragraph_font_style
                          ? paragraph_font_style + " pl-4 "
                          : " ubuntu pl-4 text-lg"
                      }
                      style={{
                        fontSize: paragraph_font_size
                          ? paragraph_font_size + "px"
                          : "14" + "px",
                        marginTop: paragraph_spacing + "px",
                      }}
                    >
                      {props.runtime_email_address
                        ? props.runtime_email_address
                        : personal_info.email_address
                          ? personal_info.email_address
                          : "abc@example.com"}
                    </p>
                  </div>
                ) : (
                  ""
                )}

                {personal_info.maritial_status ? (
                  <div className="py-2 flex justify-start items-center">
                    <BiSolidBookHeart size={20} />
                    <p
                      className={
                        paragraph_font_style
                          ? paragraph_font_style + " pl-4 "
                          : " ubuntu pl-4 text-lg"
                      }
                      style={{
                        fontSize: paragraph_font_size
                          ? paragraph_font_size + "px"
                          : "14" + "px",
                        marginTop: paragraph_spacing + "px",
                      }}
                    >
                      {personal_info.maritial_status
                        ? personal_info.maritial_status
                        : ""}
                    </p>
                  </div>
                ) : (
                  ""
                )}

                {personal_info.nationality ? (
                  <div className="py-2 flex justify-start items-center">
                    <BiSolidFlag size={20} />
                    <p
                      className={
                        paragraph_font_style
                          ? paragraph_font_style + " pl-4 "
                          : " ubuntu pl-4 text-lg"
                      }
                      style={{
                        fontSize: paragraph_font_size
                          ? paragraph_font_size + "px"
                          : "14" + "px",
                        marginTop: paragraph_spacing + "px",
                      }}
                    >
                      {personal_info.nationality
                        ? personal_info.nationality
                        : ""}
                    </p>
                  </div>
                ) : (
                  ""
                )}

                {personal_info.id_no ? (
                  <div className="py-2 flex justify-start items-center">
                    <BiSolidCreditCardFront size={20} />
                    <p
                      className={
                        paragraph_font_style
                          ? paragraph_font_style + " pl-4 "
                          : " ubuntu pl-4 text-lg"
                      }
                      style={{
                        fontSize: paragraph_font_size
                          ? paragraph_font_size + "px"
                          : "14" + "px",
                        marginTop: paragraph_spacing + "px",
                      }}
                    >
                      {personal_info.id_no ? personal_info.id_no : ""}
                    </p>
                  </div>
                ) : (
                  ""
                )}

                {props.runtime_linkedin || personal_info.linkedin ? (
                  <div className="py-2 flex justify-start items-center">
                    <BiLogoLinkedin size={20} />
                    <p
                      className={
                        paragraph_font_style
                          ? paragraph_font_style + " pl-4 "
                          : " ubuntu pl-4 text-lg"
                      }
                      style={{
                        fontSize: paragraph_font_size
                          ? paragraph_font_size + "px"
                          : "14" + "px",
                        marginTop: paragraph_spacing + "px",
                      }}
                    >
                      {props.runtime_linkedin
                        ? props.runtime_linkedin
                        : personal_info.linkedin
                          ? personal_info.linkedin
                          : ""}
                    </p>
                  </div>
                ) : (
                  ""
                )}

                {props.runtime_website || personal_info.website ? (
                  <div className="py-2 flex justify-start items-center">
                    <BiGlobe size={20} />
                    <p
                      className={
                        paragraph_font_style
                          ? paragraph_font_style + " pl-4 "
                          : " ubuntu pl-4 text-lg"
                      }
                      style={{
                        fontSize: paragraph_font_size
                          ? paragraph_font_size + "px"
                          : "14" + "px",
                        marginTop: paragraph_spacing + "px",
                      }}
                    >
                      {props.runtime_website
                        ? props.runtime_website
                        : personal_info.website
                          ? personal_info.website
                          : ""}
                    </p>
                  </div>
                ) : (
                  ""
                )}

                {props.runtime_street_address ||
                  personal_info.street_address ? (
                  <div className="py-2 flex justify-start items-center">
                    <BiSolidMap size={20} />
                    <p
                      className={
                        paragraph_font_style
                          ? paragraph_font_style + " pl-4 "
                          : " ubuntu pl-4 text-lg"
                      }
                      style={{
                        fontSize: paragraph_font_size
                          ? paragraph_font_size + "px"
                          : "14" + "px",
                        marginTop: paragraph_spacing + "px",
                      }}
                    >
                      {props.runtime_street_address
                        ? props.runtime_street_address
                        : personal_info.street_address
                          ? personal_info.street_address + ","
                          : ""}{" "}
                      {props.runtime_postal_code
                        ? props.runtime_postal_code
                        : personal_info.postal_code
                          ? personal_info.postal_code + ","
                          : ""}
                      {cities
                        .filter((cities) => cities.id === personal_info.city_id)
                        .map((city) => (
                          <>{city?.name}, </>
                        ))}
                      {province
                        .filter(
                          (province) => province.id === personal_info.state_id
                        )
                        .map((province) => (
                          <>{province?.name}, </>
                        ))}
                      {countries
                        .filter(
                          (countries) =>
                            countries.id === personal_info.country_id
                        )
                        .map((country) => (
                          <>{country?.name}</>
                        ))}
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </div>
              {/* end personal_info */}

              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable
                  droppableId="resume"
                  direction="vertical"
                  type="section"
                >
                  {(provided) => (
                    <ul
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: 0,
                      }}
                    >
                      {items.map((item, idx) => {
                        if (item === "Technical Skills") {
                          return (
                            <Draggable
                              key={item}
                              draggableId={item}
                              index={idx}
                            >
                              {(provided) => (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="hover:cursor-grab"
                                >
                                  {technical_skills &&
                                    technical_skills != "" ? (
                                    <>
                                      <div
                                        className={
                                          Number(props.formatting) === 1
                                            ? "dd_btn4 relative"
                                            : ""
                                        }
                                      >
                                        <div className="hidden dd_menu4 absolute right-0 top-0">
                                          <BiMove
                                            size={30}
                                            className="text-slate-200 hover:text-[#0072b1] p-1 cursor-pointer "
                                          />
                                          <a
                                            href={
                                              global.localPath +
                                              "resume/technical-skills/" +
                                              profile_id
                                            }
                                          >
                                            <BiPencil
                                              size={30}
                                              className="text-slate-200 hover:text-[#0072b1] p-1"
                                            />
                                          </a>
                                          <BiSolidTrash
                                            onClick={(e) =>
                                              delete_technical_skills(
                                                technical_skills.id
                                              )
                                            }
                                            size={30}
                                            className="text-slate-200 hover:text-[#0072b1] p-1 cursor-pointer"
                                          />
                                        </div>

                                        {/* technical skills */}
                                        <div className="mt-8 pt-8 mx-4 text-slate-200 border-t-2 border-slate-200">
                                          <h1
                                            className={
                                              heading_font_style
                                                ? heading_font_style +
                                                " font-semibold tracking-widest"
                                                : "text-xl ubuntu font-semibold tracking-widest"
                                            }
                                            style={{
                                              fontSize: heading_font_size
                                                ? heading_font_size + "px"
                                                : "30" + "px",
                                              marginTop: section_spacing + "px",
                                            }}
                                          >
                                            TECH SKILLS
                                          </h1>
                                          <p
                                            className={
                                              paragraph_font_style
                                                ? paragraph_font_style +
                                                " px-1 py-2 w-full"
                                                : "ubuntu" + " px-1 py-2 w-full"
                                            }
                                            style={{
                                              fontSize: paragraph_font_size
                                                ? paragraph_font_size + "px"
                                                : "14" + "px",
                                              marginTop:
                                                paragraph_spacing + "px",
                                            }}
                                          >
                                            <p
                                              dangerouslySetInnerHTML={{
                                                __html: technical_skills.body
                                                  ? technical_skills.body
                                                  : "",
                                              }}
                                            ></p>
                                          </p>
                                        </div>
                                        {/* end technical skills */}
                                      </div>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </li>
                              )}
                            </Draggable>
                          );
                        } else if (item === "Soft Skills") {
                          return (
                            <Draggable
                              key={item}
                              draggableId={item}
                              index={idx}
                            >
                              {(provided) => (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="hover:cursor-grab"
                                >
                                  {soft_skills && soft_skills != "" ? (
                                    <>
                                      <div
                                        className={
                                          Number(props.formatting) === 1
                                            ? "dd_btn4 relative"
                                            : ""
                                        }
                                      >
                                        <div className="hidden dd_menu4 absolute right-0 top-0">
                                          <BiMove
                                            size={30}
                                            className="text-slate-200 hover:text-[#0072b1] p-1 cursor-pointer"
                                          />
                                          <a
                                            href={
                                              global.localPath +
                                              "resume/soft-skills/" +
                                              profile_id
                                            }
                                          >
                                            <BiPencil
                                              size={30}
                                              className="text-slate-200 hover:text-[#0072b1] p-1"
                                            />
                                          </a>
                                          <BiSolidTrash
                                            onClick={(e) =>
                                              delete_soft_skills(soft_skills.id)
                                            }
                                            size={30}
                                            className="text-slate-200 hover:text-[#0072b1] p-1 cursor-pointer"
                                          />
                                        </div>
                                        {/* soft skills */}
                                        <div className="mt-8 pt-8 mx-4 text-slate-200 border-t-2 border-slate-200">
                                          <h1
                                            className={
                                              heading_font_style
                                                ? heading_font_style +
                                                " font-semibold tracking-widest"
                                                : "text-xl ubuntu font-semibold tracking-widest"
                                            }
                                            style={{
                                              fontSize: heading_font_size
                                                ? heading_font_size + "px"
                                                : "30" + "px",
                                              marginTop: section_spacing + "px",
                                            }}
                                          >
                                            SOFT SKILLS
                                          </h1>
                                          <p
                                            className={
                                              paragraph_font_style
                                                ? paragraph_font_style +
                                                " px-1 py-2 w-full"
                                                : "ubuntu" + " px-1 py-2 w-full"
                                            }
                                            style={{
                                              fontSize: paragraph_font_size
                                                ? paragraph_font_size + "px"
                                                : "14" + "px",
                                              marginTop:
                                                paragraph_spacing + "px",
                                            }}
                                          >
                                            <p
                                              dangerouslySetInnerHTML={{
                                                __html: soft_skills.body
                                                  ? soft_skills.body
                                                  : "",
                                              }}
                                            ></p>
                                          </p>
                                        </div>
                                        {/* end soft skills */}
                                      </div>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </li>
                              )}
                            </Draggable>
                          );
                        } else if (item === "Honors & Awards") {
                          return (
                            <Draggable
                              key={item}
                              draggableId={item}
                              index={idx}
                            >
                              {(provided) => (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="mx-4 mt-4 text-slate-200 border-t-2 border-slate-200 hover:cursor-grab"
                                >
                                  {awards && Number(awards.length) > 0
                                    ? awards.map((awards, index_awards) => (
                                      <div
                                        key={index_awards}
                                        className="flex justify-start items-center flex-wrap py-4 "
                                      >
                                        {Number(index_awards) === 0 ? (
                                          <h1
                                            className={
                                              heading_font_style
                                                ? heading_font_style +
                                                " font-semibold tracking-widest uppercase"
                                                : "uppercase text-xl ubuntu font-semibold tracking-widest"
                                            }
                                            style={{
                                              fontSize: heading_font_size
                                                ? heading_font_size + "px"
                                                : "14" + "px",
                                              marginTop:
                                                paragraph_spacing + "px",
                                            }}
                                          >
                                            Honors and Awards
                                          </h1>
                                        ) : (
                                          ""
                                        )}
                                        <div
                                          className={
                                            Number(props.formatting) === 1
                                              ? "dd_btn4  relative w-full flex justify-start items-center flex-wrap"
                                              : ""
                                          }
                                        >
                                          <div className="hidden dd_menu4 absolute right-0 top-0">
                                            <BiMove
                                              size={30}
                                              className="text-slate-200 hover:text-[#0072b1] p-1 cursor-pointer"
                                            />
                                            <a
                                              href={
                                                global.localPath +
                                                "resume/honors_and_awards/" +
                                                awards.id
                                              }
                                            >
                                              <BiPencil
                                                size={30}
                                                className="text-slate-200 hover:text-[#0072b1] p-1"
                                              />
                                            </a>
                                            <BiSolidTrash
                                              onClick={(e) =>
                                                delete_awards(awards.id)
                                              }
                                              size={30}
                                              className="text-slate-200 hover:text-[#0072b1] p-1 cursor-pointer"
                                            />
                                          </div>

                                          <div className="flex flex-wrap justify-start items-center">
                                            <p className="ubuntu mb-4 text-lg">
                                              <span className="font-bold tracking-wider">
                                                {awards.date
                                                  ? formattedDate(
                                                    awards.date
                                                  ) + ": "
                                                  : ""}{" "}
                                              </span>
                                              {awards.name ? awards.name : ""}
                                            </p>
                                            <p
                                              className={
                                                paragraph_font_style
                                                  ? paragraph_font_style +
                                                  " mt-2 w-full italic"
                                                  : "ubuntu mt-2 text-lg w-full italic"
                                              }
                                              style={{
                                                fontSize: paragraph_font_size
                                                  ? paragraph_font_size + "px"
                                                  : "14" + "px",
                                                marginTop:
                                                  paragraph_spacing + "px",
                                              }}
                                            >
                                              {awards.body ? awards.body : ""}
                                            </p>
                                            <p
                                              className="mt-2 w-full"
                                              style={{
                                                fontSize: paragraph_font_size
                                                  ? paragraph_font_size + "px"
                                                  : "14" + "px",
                                              }}
                                            >
                                              {awards.description
                                                ? awards.description
                                                : ""}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    ))
                                    : ""}
                                </li>
                              )}
                            </Draggable>
                          );
                        } else if (item === "Certificates") {
                          return (
                            <Draggable
                              key={item}
                              draggableId={item}
                              index={idx}
                            >
                              {(provided) => (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="mt-10 pt-10 mx-4 text-slate-200 border-t-2 border-slate-200 hover:cursor-grab"
                                >
                                  {certificate && Number(certificate.length) > 0
                                    ? certificate.map(
                                      (certificate, index_certificate) => (
                                        <div
                                          key={index_certificate}
                                          className="flex justify-start items-center flex-wrap "
                                        >
                                          {Number(index_certificate) === 0 ? (
                                            <h1
                                              className={
                                                heading_font_style
                                                  ? heading_font_style +
                                                  " font-semibold tracking-widest"
                                                  : "text-xl ubuntu font-semibold tracking-widest"
                                              }
                                              style={{
                                                fontSize: heading_font_size
                                                  ? heading_font_size + "px"
                                                  : "30" + "px",
                                                marginTop:
                                                  section_spacing + "px",
                                              }}
                                            >
                                              CERTIFICATES
                                            </h1>
                                          ) : (
                                            ""
                                          )}
                                          <div
                                            className={
                                              Number(props.formatting) === 1
                                                ? "dd_btn4  relative w-full flex justify-start items-center flex-wrap"
                                                : ""
                                            }
                                          >
                                            <div className="hidden dd_menu4 absolute right-0 top-0">
                                              <BiMove
                                                size={30}
                                                className="text-slate-200 hover:text-[#0072b1] p-1 cursor-pointer"
                                              />
                                              <a
                                                href={
                                                  global.localPath +
                                                  "resume/certificates/" +
                                                  certificate.id
                                                }
                                              >
                                                <BiPencil
                                                  size={30}
                                                  className="text-slate-200 hover:text-[#0072b1] p-1"
                                                />
                                              </a>
                                              <BiSolidTrash
                                                onClick={(e) =>
                                                  delete_certificate(
                                                    certificate.id
                                                  )
                                                }
                                                size={30}
                                                className="text-slate-200 hover:text-[#0072b1] p-1 cursor-pointer"
                                              />
                                            </div>

                                            <div className="py-4 flex flex-wrap justify-start items-center">
                                              <p
                                                className={
                                                  paragraph_font_style
                                                    ? paragraph_font_style +
                                                    " mb-4 "
                                                    : "ubuntu mb-4 text-lg"
                                                }
                                                style={{
                                                  fontSize:
                                                    paragraph_font_size
                                                      ? paragraph_font_size +
                                                      "px"
                                                      : "14" + "px",
                                                  marginTop:
                                                    paragraph_spacing + "px",
                                                }}
                                              >
                                                <span className="font-bold tracking-wider">
                                                  {certificate.date
                                                    ? formattedDate(
                                                      certificate.date
                                                    ) + ": "
                                                    : ""}{" "}
                                                </span>
                                                {certificate.title
                                                  ? certificate.title
                                                  : ""}
                                              </p>
                                              <p
                                                className={
                                                  paragraph_font_style
                                                    ? paragraph_font_style +
                                                    " mt-2 w-full italic"
                                                    : "ubuntu mt-2 text-lg w-full italic"
                                                }
                                                style={{
                                                  fontSize:
                                                    paragraph_font_size
                                                      ? paragraph_font_size +
                                                      "px"
                                                      : "14" + "px",
                                                  marginTop:
                                                    paragraph_spacing + "px",
                                                }}
                                              >
                                                {certificate.institute
                                                  ? certificate.institute
                                                  : ""}
                                              </p>
                                              <p
                                                className={
                                                  paragraph_font_style
                                                    ? paragraph_font_style +
                                                    " mt-2 w-full"
                                                    : "ubuntu mt-2 text-lg w-full"
                                                }
                                                style={{
                                                  fontSize:
                                                    paragraph_font_size
                                                      ? paragraph_font_size +
                                                      "px"
                                                      : "14" + "px",
                                                  marginTop:
                                                    paragraph_spacing + "px",
                                                }}
                                              >
                                                {certificate.description
                                                  ? certificate.description
                                                  : ""}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      )
                                    )
                                    : ""}
                                </li>
                              )}
                            </Draggable>
                          );
                        } else if (item === "Languages") {
                          return (
                            <Draggable
                              key={item}
                              draggableId={item}
                              index={idx}
                            >
                              {(provided) => (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="mt-10 pt-10 mx-4 text-slate-200 border-t-2 border-slate-200 hover:cursor-grab"
                                >
                                  {/* LANGUAGES */}
                                  {languages && Number(languages.length) > 0
                                    ? languages.map(
                                      (languages, index_languages) => (
                                        <div
                                          key={index_languages}
                                          className=""
                                        >
                                          {Number(index_languages) === 0 ? (
                                            <h1
                                              className={
                                                heading_font_style
                                                  ? heading_font_style +
                                                  " font-semibold tracking-widest"
                                                  : "text-xl ubuntu font-semibold tracking-widest"
                                              }
                                              style={{
                                                fontSize: heading_font_size
                                                  ? heading_font_size + "px"
                                                  : "30" + "px",
                                                marginTop:
                                                  section_spacing + "px",
                                              }}
                                            >
                                              LANGUAGES
                                            </h1>
                                          ) : (
                                            ""
                                          )}
                                          <div
                                            className={
                                              Number(props.formatting) === 1
                                                ? "dd_btn4 cursor-pointer relative w-full flex justify-start items-center flex-wrap"
                                                : ""
                                            }
                                          >
                                            <div className="hidden dd_menu4 absolute right-0 top-0">
                                              {/* <BiMove size={30} className='text-slate-900 hover:text-[#0072b1] p-1'/> */}
                                              <a
                                                href={
                                                  global.localPath +
                                                  "resume/languages/" +
                                                  languages.id
                                                }
                                              >
                                                <BiPencil
                                                  size={30}
                                                  className="text-slate-200 hover:text-[#0072b1] p-1"
                                                />
                                              </a>
                                              <BiSolidTrash
                                                onClick={(e) =>
                                                  delete_languages(
                                                    languages.id
                                                  )
                                                }
                                                size={30}
                                                className="text-slate-200 hover:text-[#0072b1] p-1 cursor-pointer"
                                              />
                                            </div>
                                            <p
                                              className={
                                                paragraph_font_style
                                                  ? paragraph_font_style +
                                                  " w-full pt-2"
                                                  : "ubuntu text-lg w-full pt-2"
                                              }
                                              style={{
                                                fontSize: paragraph_font_size
                                                  ? paragraph_font_size + "px"
                                                  : "14" + "px",
                                                marginTop:
                                                  paragraph_spacing + "px",
                                              }}
                                            >
                                              <b>
                                                {languages.name
                                                  ? languages.name
                                                  : ""}{" "}
                                                {languages.level
                                                  ? languages.level
                                                  : ""}
                                              </b>
                                            </p>
                                          </div>
                                        </div>
                                      )
                                    )
                                    : ""}
                                </li>
                              )}
                            </Draggable>
                          );
                        }
                      })}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
            </div>

            <div className="w-[70%] h-[100%] py-[100px]">
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable
                  droppableId="resume"
                  direction="vertical"
                  type="section"
                >
                  {(provided) => (
                    <ul
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: 0,
                      }}
                    >
                      {items.map((item, idx) => {
                        if (item === "Summary") {
                          return (
                            <Draggable
                              key={item}
                              draggableId={item}
                              index={idx}
                            >
                              {(provided) => (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="px-6 hover:cursor-grab w-full"
                                >
                                  {summary !== null ? (
                                    <>
                                      <div
                                        className={
                                          Number(props.formatting) === 1
                                            ? "dd_btn4 relative hover:bg-[rgba(0,0,0,0.1)]"
                                            : ""
                                        }
                                      >
                                        <div className="hidden dd_menu4 absolute right-0">
                                          <BiMove
                                            size={30}
                                            className="text-slate-900 hover:text-[#0072b1] p-1 cursor-pointer"
                                          />
                                          <a
                                            href={
                                              global.localPath +
                                              "resume/summary/" +
                                              profile_id
                                            }
                                          >
                                            <BiPencil
                                              size={30}
                                              className="text-slate-900 hover:text-[#0072b1] p-1"
                                            />
                                          </a>
                                          <BiSolidTrash
                                            onClick={(e) =>
                                              delete_summary(summary.id)
                                            }
                                            size={30}
                                            className="text-slate-900 hover:text-[#0072b1] p-1 cursor-pointer"
                                          />
                                        </div>

                                        {/* summary */}
                                        <div className="mt-[200px] ">
                                          <div className="py-2 flex flex-wrap justify-start items-center">
                                            <div className="flex justify-start items-center w-full">
                                              <h1
                                                className={
                                                  heading_font_style
                                                    ? heading_font_style +
                                                    " uppercase font-semibold tracking-widest "
                                                    : " uppercase text-xl ubuntu font-semibold tracking-widest text-[#2b3743]"
                                                }
                                                style={{
                                                  color: pen_color_def,
                                                  fontSize: heading_font_size
                                                    ? heading_font_size + "px"
                                                    : "30" + "px",
                                                  marginTop:
                                                    section_spacing + "px",
                                                }}
                                              >
                                                Objective
                                              </h1>
                                              <div className="bg-[#2b3743] w-full h-[2px] ml-4"></div>
                                            </div>

                                            <p
                                              className={
                                                paragraph_font_style
                                                  ? paragraph_font_style +
                                                  " text-slate-600 mt-4"
                                                  : "ubuntu text-lg text-slate-600 mt-4"
                                              }
                                              style={{
                                                fontSize: paragraph_font_size
                                                  ? paragraph_font_size + "px"
                                                  : "14" + "px",
                                                paddingTop:
                                                  paragraph_spacing + "px",
                                              }}
                                            >
                                              <p
                                                dangerouslySetInnerHTML={{
                                                  __html: summary.description,
                                                }}
                                              ></p>
                                            </p>
                                          </div>
                                        </div>
                                        {/* end summary */}
                                      </div>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </li>
                              )}
                            </Draggable>
                          );
                        } else if (item === "Education") {
                          return (
                            <Draggable
                              key={item}
                              draggableId={item}
                              index={idx}
                            >
                              {(provided) => (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="hover:cursor-grab"
                                >
                                  <div className="mt-10 mx-6">
                                    {education && Number(education.length) !== 0
                                      ? education?.map(
                                        (education, index_education) => (
                                          <div
                                            key={index_education}
                                            className="flex justify-start items-center flex-wrap"
                                          >
                                            {Number(index_education) === 0 ? (
                                              <div className="flex justify-start items-center w-full">
                                                <h1
                                                  className={
                                                    heading_font_style
                                                      ? heading_font_style +
                                                      " uppercase font-semibold tracking-widest"
                                                      : " uppercase text-xl ubuntu font-semibold tracking-widest"
                                                  }
                                                  style={{
                                                    color: pen_color_def,
                                                    fontSize:
                                                      heading_font_size
                                                        ? heading_font_size +
                                                        "px"
                                                        : "30" + "px",
                                                    marginTop:
                                                      section_spacing + "px",
                                                  }}
                                                >
                                                  EDUCATION
                                                </h1>
                                                <div className="bg-[#2b3743] w-full h-[2px] ml-4"></div>
                                              </div>
                                            ) : (
                                              ""
                                            )}

                                            <div
                                              className={
                                                Number(props.formatting) === 1
                                                  ? "dd_btn4 relative w-full hover:bg-[rgba(0,0,0,0.1)]"
                                                  : ""
                                              }
                                            >
                                              <div className="hidden dd_menu4 absolute right-0 ">
                                                <a
                                                  href={
                                                    global.localPath +
                                                    "resume/education/" +
                                                    education.id
                                                  }
                                                >
                                                  <BiPencil
                                                    size={30}
                                                    className="text-slate-900 hover:text-[#0072b1] p-1"
                                                  />
                                                </a>
                                                <BiSolidTrash
                                                  onClick={(e) =>
                                                    delete_education(
                                                      education.id
                                                    )
                                                  }
                                                  size={30}
                                                  className="text-slate-900 hover:text-[#0072b1] p-1 cursor-pointer"
                                                />
                                              </div>

                                              <div className="py-4 flex flex-wrap justify-start items-center w-full">
                                                <div className="w-2 h-2 bg-[#2b3743] rounded-full"></div>
                                                <p
                                                  className={
                                                    paragraph_font_style
                                                      ? paragraph_font_style +
                                                      " pl-4 font-bold text-[#2b3743]"
                                                      : "ubuntu pl-4 text-lg font-bold text-[#2b3743]"
                                                  }
                                                  style={{
                                                    fontSize:
                                                      paragraph_font_size
                                                        ? paragraph_font_size +
                                                        "px"
                                                        : "14" + "px",
                                                    marginTop:
                                                      paragraph_spacing +
                                                      "px",
                                                  }}
                                                >
                                                  {education.institution}
                                                </p>
                                                <div className="flex justify-between items-center mt-2 w-full">
                                                  <p
                                                    className={
                                                      paragraph_font_style
                                                        ? paragraph_font_style +
                                                        " text-slate-500 pl-6"
                                                        : "ubuntu text-lg text-slate-500 pl-6"
                                                    }
                                                    style={{
                                                      fontSize:
                                                        paragraph_font_size
                                                          ? paragraph_font_size +
                                                          "px"
                                                          : "14" + "px",
                                                      marginTop:
                                                        paragraph_spacing +
                                                        "px",
                                                    }}
                                                  >
                                                    {education.degree.title} :{" "}
                                                    {education.field}
                                                  </p>

                                                  {education.start_date &&
                                                    education.end_date ? (
                                                    <p
                                                      className={
                                                        paragraph_font_style
                                                          ? paragraph_font_style +
                                                          " font-semibold pl-6"
                                                          : "ubuntu text-lg text-slate-600 font-semibold pl-6"
                                                      }
                                                      style={{
                                                        fontSize:
                                                          paragraph_font_size
                                                            ? paragraph_font_size +
                                                            "px"
                                                            : "14" + "px",
                                                        marginTop:
                                                          paragraph_spacing +
                                                          "px",
                                                      }}
                                                    >
                                                      {education.start_date
                                                        ? formattedDate(
                                                          education.start_date
                                                        )
                                                        : ""}{" "}
                                                      {Number(
                                                        education.currently_studying
                                                      ) === 0
                                                        ? education.end_date
                                                          ? "- " +
                                                          formattedDate(
                                                            education.end_date
                                                          )
                                                          : ""
                                                        : "- Present"}
                                                    </p>
                                                  ) : (
                                                    ""
                                                  )}
                                                </div>
                                                {education.grade_type ? (
                                                  <p
                                                    className={
                                                      paragraph_font_style
                                                        ? paragraph_font_style +
                                                        "  mt-2 w-full font-semibold pl-6"
                                                        : " ubuntu mt-2 text-lg w-full text-slate-500 font-semibold pl-6"
                                                    }
                                                    style={{
                                                      fontSize:
                                                        paragraph_font_size
                                                          ? paragraph_font_size +
                                                          "px"
                                                          : "14" + "px",
                                                      marginTop:
                                                        paragraph_spacing +
                                                        "px",
                                                    }}
                                                  >
                                                    - {education.grade_type} :{" "}
                                                    {education.grade}{" "}
                                                    {education.grade_type ===
                                                      "percentage"
                                                      ? "%"
                                                      : ""}
                                                  </p>
                                                ) : (
                                                  ""
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      )
                                      : ""}
                                  </div>
                                </li>
                              )}
                            </Draggable>
                          );
                        } else if (item === "Experience") {
                          return (
                            <Draggable
                              key={item}
                              draggableId={item}
                              index={idx}
                            >
                              {(provided) => (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="mt-10 mx-6 hover:cursor-grab"
                                >
                                  {experiences &&
                                    Number(experiences.length) !== 0
                                    ? experiences?.map(
                                      (experiences, index_experiences) => (
                                        <div
                                          key={index_experiences}
                                          className="flex justify-start items-center flex-wrap"
                                        >
                                          {Number(index_experiences) === 0 ? (
                                            <div className="flex justify-start items-center w-full">
                                              <h1
                                                className={
                                                  heading_font_style
                                                    ? heading_font_style +
                                                    " uppercase font-semibold tracking-widest"
                                                    : "uppercase text-xl ubuntu font-semibold tracking-widest text-[#2b3743]"
                                                }
                                                style={{
                                                  color: pen_color_def,
                                                  fontSize: heading_font_size
                                                    ? heading_font_size + "px"
                                                    : "30" + "px",
                                                  marginTop:
                                                    section_spacing + "px",
                                                }}
                                              >
                                                EXPERIENCE
                                              </h1>
                                              <div className="bg-[#2b3743] w-full h-[2px] ml-4"></div>
                                            </div>
                                          ) : (
                                            ""
                                          )}

                                          <div
                                            className={
                                              Number(props.formatting) === 1
                                                ? "dd_btn4 hover:bg-[rgba(0,0,0,0.1)] relative w-full"
                                                : ""
                                            }
                                          >
                                            <div className="hidden dd_menu4 absolute right-0 ">
                                              <a
                                                href={
                                                  global.localPath +
                                                  "resume/experience/" +
                                                  experiences.id
                                                }
                                              >
                                                <BiPencil
                                                  size={30}
                                                  className="text-slate-900 hover:text-[#0072b1] p-1"
                                                />
                                              </a>
                                              <BiSolidTrash
                                                onClick={(e) =>
                                                  delete_experience(
                                                    experiences.id
                                                  )
                                                }
                                                size={30}
                                                className="text-slate-900 hover:text-[#0072b1] p-1 cursor-pointer"
                                              />
                                            </div>

                                            <div className="py-4 flex flex-wrap justify-start items-center w-full">
                                              <div className="w-2 h-2 bg-[#2b3743] rounded-full"></div>
                                              <p
                                                className={
                                                  paragraph_font_style
                                                    ? paragraph_font_style +
                                                    " pl-4 text-lg font-bold text-[#2b3743]"
                                                    : "ubuntu pl-4 text-lg font-bold text-[#2b3743]"
                                                }
                                                style={{
                                                  color: "black",
                                                  fontSize:
                                                    paragraph_font_size
                                                      ? paragraph_font_size +
                                                      "px"
                                                      : "14" + "px",
                                                  marginTop:
                                                    paragraph_spacing + "px",
                                                }}
                                              >
                                                {experiences.company_name}
                                              </p>
                                              <div className="flex justify-between items-center mt-2 w-full">
                                                <p
                                                  className={
                                                    paragraph_font_style
                                                      ? paragraph_font_style +
                                                      " text-slate-500 pl-6"
                                                      : "ubuntu text-lg text-slate-500 pl-6"
                                                  }
                                                  style={{
                                                    fontSize:
                                                      paragraph_font_size
                                                        ? paragraph_font_size +
                                                        "px"
                                                        : "14" + "px",
                                                    marginTop:
                                                      paragraph_spacing +
                                                      "px",
                                                  }}
                                                >
                                                  {experiences.job_position
                                                    ? experiences.job_position
                                                    : ""}{" "}
                                                  {experiences.type
                                                    ? "- " + experiences.type
                                                    : ""}
                                                </p>
                                                <p
                                                  className={
                                                    paragraph_font_style
                                                      ? paragraph_font_style +
                                                      " text-slate-500 pl-6 font-semibold"
                                                      : "ubuntu text-lg text-slate-600 pl-6 font-semibold"
                                                  }
                                                  style={{
                                                    fontSize:
                                                      paragraph_font_size
                                                        ? paragraph_font_size +
                                                        "px"
                                                        : "14" + "px",
                                                    marginTop:
                                                      paragraph_spacing +
                                                      "px",
                                                  }}
                                                >
                                                  {experiences.start_date
                                                    ? formattedDate(
                                                      experiences.start_date
                                                    )
                                                    : ""}{" "}
                                                  {Number(
                                                    experiences.currently_working
                                                  ) === 0
                                                    ? experiences.end_date
                                                      ? " - " +
                                                      formattedDate(
                                                        experiences.end_date
                                                      )
                                                      : ""
                                                    : "- Present"}
                                                </p>
                                              </div>

                                              <p
                                                className={
                                                  paragraph_font_style
                                                    ? paragraph_font_style +
                                                    " ubuntu mt-4 text-lg w-full text-slate-500 pl-6"
                                                    : "ubuntu mt-4 text-lg w-full text-slate-500 pl-6"
                                                }
                                                style={{
                                                  fontSize:
                                                    paragraph_font_size
                                                      ? paragraph_font_size +
                                                      "px"
                                                      : "14" + "px",
                                                  marginTop:
                                                    paragraph_spacing + "px",
                                                }}
                                              >
                                                {experiences.job_description
                                                  ? experiences.job_description
                                                  : ""}
                                              </p>
                                              {countries
                                                .filter(
                                                  (countries) =>
                                                    countries.id ===
                                                    experiences.country_id
                                                )
                                                .map((country) => (
                                                  <p className="ubuntu mt-2 text-lg w-full text-slate-500 italic tracking-wider pl-6">
                                                    - {country?.name}
                                                  </p>
                                                ))}
                                            </div>
                                          </div>
                                        </div>
                                      )
                                    )
                                    : ""}
                                </li>
                              )}
                            </Draggable>
                          );
                        } else if (item === "Custom Section") {
                          return (
                            <Draggable
                              key={item}
                              draggableId={item}
                              index={idx}
                            >
                              {(provided) => (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="mt-10 mx-6 hover:cursor-grab"
                                >
                                  {/* CUSTOM SECTIONS */}
                                  {custom_section &&
                                    Number(custom_section.length) !== 0
                                    ? custom_section?.map(
                                      (
                                        custom_section,
                                        index_custom_section
                                      ) => (
                                        <div
                                          key={index_custom_section}
                                          className="flex justify-start items-center flex-wrap py-4 "
                                        >
                                          <div
                                            className={
                                              Number(props.formatting) === 1
                                                ? "dd_btn4 hover:bg-[rgba(0,0,0,0.1)] relative w-full"
                                                : ""
                                            }
                                          >
                                            <div className="hidden dd_menu4 absolute right-0 ">
                                              <a
                                                href={
                                                  global.localPath +
                                                  "resume/custom_section/" +
                                                  custom_section.id
                                                }
                                              >
                                                <BiPencil
                                                  size={30}
                                                  className="text-slate-900 hover:text-[#0072b1] p-1"
                                                />
                                              </a>
                                              <BiSolidTrash
                                                onClick={(e) =>
                                                  delete_custom_section(
                                                    custom_section.id
                                                  )
                                                }
                                                size={30}
                                                className="text-slate-900 hover:text-[#0072b1] p-1 cursor-pointer"
                                              />
                                            </div>

                                            <div className="flex justify-start items-center w-full">
                                              <h1
                                                className={
                                                  heading_font_style
                                                    ? heading_font_style +
                                                    " uppercase font-semibold tracking-widest "
                                                    : "uppercase text-xl ubuntu font-semibold tracking-widest text-[#2b3743]"
                                                }
                                                style={{
                                                  color: pen_color_def,
                                                  fontSize: heading_font_size
                                                    ? heading_font_size + "px"
                                                    : "30" + "px",
                                                  marginTop:
                                                    section_spacing + "px",
                                                }}
                                              >
                                                {custom_section.title
                                                  ? custom_section.title
                                                  : ""}
                                              </h1>
                                              <div className="bg-[#2b3743] w-full h-[2px] ml-4"></div>
                                            </div>
                                            <p
                                              className={
                                                paragraph_font_style
                                                  ? paragraph_font_style +
                                                  " mt-4 w-full text-slate-600"
                                                  : "ubuntu mt-4 text-lg w-full text-slate-600"
                                              }
                                              style={{
                                                fontSize: paragraph_font_size
                                                  ? paragraph_font_size + "px"
                                                  : "14" + "px",
                                                marginTop:
                                                  paragraph_spacing + "px",
                                              }}
                                            >
                                              <p
                                                dangerouslySetInnerHTML={{
                                                  __html:
                                                    custom_section.detail
                                                      ? custom_section.detail
                                                      : "",
                                                }}
                                              ></p>
                                            </p>
                                          </div>
                                        </div>
                                      )
                                    )
                                    : ""}
                                </li>
                              )}
                            </Draggable>
                          );
                        } else if (item === "References") {
                          return (
                            <Draggable
                              key={item}
                              draggableId={item}
                              index={idx}
                            >
                              {(provided) => (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="mt-10 mx-6 hover:cursor-grab"
                                >
                                  {references && Number(references.length) !== 0
                                    ? references?.map(
                                      (references, index_references) => (
                                        <div
                                          key={index_references}
                                          className="flex justify-start items-center flex-wrap py-4"
                                        >
                                          {Number(index_references) === 0 ? (
                                            <div className="flex justify-start items-center w-full pb-4">
                                              <h1
                                                className={
                                                  heading_font_style
                                                    ? heading_font_style +
                                                    " uppercase font-semibold tracking-widest "
                                                    : "uppercase text-xl ubuntu font-semibold tracking-widest text-[#2b3743]"
                                                }
                                                style={{
                                                  color: pen_color_def,
                                                  fontSize: heading_font_size
                                                    ? heading_font_size + "px"
                                                    : "30" + "px",
                                                  marginTop:
                                                    section_spacing + "px",
                                                }}
                                              >
                                                REFERENCES
                                              </h1>
                                              <div className="bg-[#2b3743] w-full h-[2px] ml-4"></div>
                                            </div>
                                          ) : (
                                            ""
                                          )}

                                          <div
                                            className={
                                              Number(props.formatting) === 1
                                                ? "dd_btn4 hover:bg-[rgba(0,0,0,0.1)] relative w-full"
                                                : ""
                                            }
                                          >
                                            <div className="hidden dd_menu4 absolute right-0 ">
                                              <a
                                                href={
                                                  global.localPath +
                                                  "resume/references/" +
                                                  references.id
                                                }
                                              >
                                                <BiPencil
                                                  size={30}
                                                  className="text-slate-900 hover:text-[#0072b1] p-1"
                                                />
                                              </a>
                                              <BiSolidTrash
                                                onClick={(e) =>
                                                  delete_references(
                                                    references.id
                                                  )
                                                }
                                                size={30}
                                                className="text-slate-900 hover:text-[#0072b1] p-1 cursor-pointer"
                                              />
                                            </div>

                                            <p
                                              className={
                                                paragraph_font_style
                                                  ? paragraph_font_style +
                                                  " pt-2 w-full text-slate-600"
                                                  : "ubuntu pt-2 text-lg w-full text-slate-600"
                                              }
                                              style={{
                                                fontSize: paragraph_font_size
                                                  ? paragraph_font_size + "px"
                                                  : "14" + "px",
                                                marginTop: "0px",
                                              }}
                                            >
                                              <b>{references.name}</b>
                                            </p>
                                            <p
                                              className={
                                                paragraph_font_style
                                                  ? paragraph_font_style +
                                                  " pt-2 w-full text-slate-600"
                                                  : "ubuntu pt-2 text-lg w-full text-slate-600"
                                              }
                                              style={{
                                                fontSize: paragraph_font_size
                                                  ? paragraph_font_size + "px"
                                                  : "14" + "px",
                                                marginTop: "0px",
                                              }}
                                            >
                                              {references.designation}
                                            </p>
                                            <p
                                              className={
                                                paragraph_font_style
                                                  ? paragraph_font_style +
                                                  " pt-2 w-full text-slate-600"
                                                  : "ubuntu pt-2 text-lg w-full text-slate-600"
                                              }
                                              style={{
                                                fontSize: paragraph_font_size
                                                  ? paragraph_font_size + "px"
                                                  : "14" + "px",
                                                marginTop: "0px",
                                              }}
                                            >
                                              {references.company}
                                            </p>
                                            <p
                                              className={
                                                paragraph_font_style
                                                  ? paragraph_font_style +
                                                  " pt-2 w-full text-slate-600"
                                                  : "ubuntu pt-2 text-lg w-full text-slate-600"
                                              }
                                              style={{
                                                fontSize: paragraph_font_size
                                                  ? paragraph_font_size + "px"
                                                  : "14" + "px",
                                                marginTop: "0px",
                                              }}
                                            >
                                              {references.contact_no}
                                            </p>
                                            <p
                                              className={
                                                paragraph_font_style
                                                  ? paragraph_font_style +
                                                  " pt-2 w-full text-slate-600"
                                                  : "ubuntu pt-2 text-lg w-full text-slate-600"
                                              }
                                              style={{
                                                fontSize: paragraph_font_size
                                                  ? paragraph_font_size + "px"
                                                  : "14" + "px",
                                                marginTop: "0px",
                                              }}
                                            >
                                              {references.email}
                                            </p>
                                          </div>
                                        </div>
                                      )
                                    )
                                    : ""}
                                </li>
                              )}
                            </Draggable>
                          );
                        }
                      })}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>

              {/* DIGITAL SIGNATURE */}
              {digital_signature && digital_signature != "" ? (
                <div
                  className={
                    Number(props.formatting) === 1 ? "dd_btn4 mt-10" : ""
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
                      onClick={(e) =>
                        delete_digital_signature(digital_signature.id)
                      }
                      size={30}
                      className="text-slate-900 hover:text-[#0072b1] p-1"
                    />
                  </div>
                  <div className="flex justify-start items-center flex-wrap px-10 py-4">
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
                              ? "2em"
                              : digital_signature.size === "md"
                                ? "3em"
                                : digital_signature.size === "lg"
                                  ? "4em"
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
            </div>
          </div>
          {/* exit main */}
        </>
      )}
    </section>
  );
};

export default Header;
