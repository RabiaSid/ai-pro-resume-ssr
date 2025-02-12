import React, { useEffect, useState, useRef } from "react";
import $ from "jquery";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpiner from "../components/LoadingSpinner";
import { useLocation } from "react-router-dom";
import { SlTrash } from "react-icons/sl";
import Skeleton from "react-loading-skeleton";

import {
  BiDuplicate,
  BiEditAlt,
} from "react-icons/bi";
import html2canvas from "html2canvas";
import Cookies from "js-cookie";
import jsPDF from "jspdf";
import { useAuth } from "../services/Auth";


import swal from "sweetalert";
import { Tab } from "@headlessui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

const plus_icon = "/images/plus_icon.webp";
const new_cover_icon = "/images/new_cover_icon.webp";
const new_resume_icon = "/images/new_resume_icon.webp";
const view_all = "/images/view_all icon.webp";
// Resume Templates IMages
const template_1 = "/images/resume_template_images/template_1.webp";
const template_2 = "/images/resume_template_images/template_2.webp";
const template_3 = "/images/resume_template_images/template_3.webp";
const template_4 = "/images/resume_template_images/template_4.webp";
const template_5 = "/images/resume_template_images/template_5.webp";
const template_6 = "/images/resume_template_images/template_6.webp";
const template_7 = "/images/resume_template_images/template_7.webp";
const template_8 = "/images/resume_template_images/template_8.webp";
const template_9 = "/images/resume_template_images/template_9.webp";
const template_10 = "/images/resume_template_images/template_10.webp";
const template_11 = "/images/resume_template_images/template_11.webp";
const template_12 = "/images/resume_template_images/template_12.webp";
const template_13 = "/images/resume_template_images/template_13.webp";
const template_14 = "/images/resume_template_images/template_14.webp";
const template_15 = "/images/resume_template_images/template_15.webp";
const template_16 = "/images/resume_template_images/Template_16.webp";
const template_17 = "/images/resume_template_images/Template_17.webp";
const template_18 = "/images/resume_template_images/Template_18.webp";
const template_19 = "/images/resume_template_images/Template_19.webp";
const template_20 = "/images/resume_template_images/Template_20.webp";
const template_21 = "/images/resume_template_images/Template_21.webp";
const template_22 = "/images/resume_template_images/Template_22.webp";
const template_23 = "/images/resume_template_images/Template_23.webp";
const template_24 = "/images/resume_template_images/Template_24.webp";
const template_25 = "/images/resume_template_images/Template_25.webp";
const template_26 = "/images/resume_template_images/Template_26.webp";
const template_27 = "/images/resume_template_images/Template_27.webp";
const template_28 = "/images/resume_template_images/Template_28.webp";
const template_29 = "/images/resume_template_images/Template_29.webp";
const template_30 = "/images/resume_template_images/Template_30.webp";

// Cover Letter Templates IMages
const template1 = "/images/cover_template_images/template_1.webp";
const template2 = "/images/cover_template_images/template_2.webp";
const template3 = "/images/cover_template_images/template_3.webp";
const template4 = "/images/cover_template_images/template_4.webp";
const template5 = "/images/cover_template_images/template_5.webp";
const template6 = "/images/cover_template_images/template_6.webp";
const template7 = "/images/cover_template_images/template_7.webp";
const template8 = "/images/cover_template_images/template_8.webp";
const template9 = "/images/cover_template_images/template_9.webp";
const template10 = "/images/cover_template_images/template_10.webp";
const template11 = "/images/cover_template_images/template_11.webp";
const template12 = "/images/cover_template_images/template_12.webp";
const template13 = "/images/cover_template_images/template_13.webp";
const template14 = "/images/cover_template_images/template_14.webp";
const template15 = "/images/cover_template_images/template_15.webp";

const template16 = "/images/cover_template_images/template_16.webp";
const template17 = "/images/cover_template_images/template_17.webp";
const template18 = "/images/cover_template_images/template_18.webp";
const template19 = "/images/cover_template_images/template_19.webp";
const template20 = "/images/cover_template_images/template_20.webp";
const template21 = "/images/cover_template_images/template_21.webp";
const template22 = "/images/cover_template_images/template_22.webp";
const template23 = "/images/cover_template_images/template_23.webp";
const template24 = "/images/cover_template_images/template_24.webp";
const template25 = "/images/cover_template_images/template_25.webp";
const template26 = "/images/cover_template_images/template_26.webp";
const template27 = "/images/cover_template_images/template_27.webp";
const template28 = "/images/cover_template_images/template_28.webp";
const template29 = "/images/cover_template_images/template_29.webp";
const template30 = "/images/cover_template_images/template_30.webp";

const Header = () => {
  const Resume_images = [
    template_1,
    template_2,
    template_3,
    template_4,
    template_5,
    template_6,
    template_7,
    template_8,
    template_9,
    template_10,
    template_11,
    template_12,
    template_13,
    template_14,
    template_15,
    template_16,
    template_17,
    template_18,
    template_19,
    template_20,
    template_21,
    template_22,
    template_23,
    template_24,
    template_25,
    template_26,
    template_27,
    template_28,
    template_29,
    template_30,
  ];

  const cover_images = [
    template1,
    template2,
    template3,
    template4,
    template5,
    template6,
    template7,
    template8,
    template9,
    template10,
    template11,
    template12,
    template13,
    template14,
    template15,
    template16,
    template17,
    template18,
    template19,
    template20,
    template21,
    template22,
    template23,
    template24,
    template25,
    template26,
    template27,
    template28,
    template29,
    template30,
  ];

  const { user } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const tab = searchParams.get("tab");

    if (tab) {
      if (tab === "myresumes") {
        setSelectedIndex(1);
      } else if (tab === "mycoverletter") {
        setSelectedIndex(2);
      }
    }
  }, [location]);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  var [cover_total, set_cover_total] = useState(3);
  var [resume_total, set_resume_total] = useState(3);
  const [file2, setFile2] = useState(null);

  const [convertedText, setConvertedText] = useState("");

  const [tempId, setTempId] = useState(1);
  const [docId, setDocId] = useState(1);

  const [resume_loading, set_resume_loading] = useState(0);
  const [cover_loading, set_cover_loading] = useState(0);

  const [file, setFile] = useState("https://www.google.com/");

  const [my_resumes, set_my_resumes] = useState([]);
  const [my_coverletters, set_my_coverletters] = useState([]);

  var username = global.getCookie("user_name");

  const [selectedOption, setSelectedOption] = useState("pdf");

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const formattedDate = (inputDate) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const date = new Date(inputDate);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const monthName = months[monthIndex];

    // Pad day with leading zero if necessary
    const formattedDay = day < 10 ? `0${day}` : day;

    return `${formattedDay} - ${monthName}`;
  };

  const load_more = (n) => {
    if (n === 1) {
      $("#resume_total_load").hide();
      $("#resume_total_loading").show();

      $("#resume_total_load").show();
      $("#resume_total_loading").hide();
      set_resume_total((prevCount) => prevCount + 3);
    }
    if (n === 2) {
      $("#cover_total_load").hide();
      $("#cover_total_loading").show();

      $("#cover_total_load").show();
      $("#cover_total_loading").hide();
      set_cover_total((prevCount) => prevCount + 3);
    }
  };

  useEffect(() => {
    const headers = {
      Authorization: "Bearer " + user?.token,
    };

    // const article = {  };
    axios
      .get(global.baseurl + "/personal_information", { headers })
      .then((data) => {
        if (data) {
          set_my_resumes(data.data.data[0].personal_information);
          console.log(data.data.data);
          set_resume_loading(1);
        }
      })
      .catch((err) => {
        set_resume_loading(1);

        console.log(err);
      });

    axios
      .get(global.baseurl + "/cover_letters", { headers })
      .then((data) => {
        if (data) {
          set_my_coverletters(data.data.data);
          console.log("hamza", data.data.data);
          set_cover_loading(1);
        }
      })
      .catch((err) => {
        set_cover_loading(1);
        console.log(err);
      });
  }, []);

  const edit_now = (profile_id, id, name) => {
    Cookies.remove("newResumeId");
    Cookies.remove("resumeExampleId");
    Cookies.remove("freshCoverId");
    Cookies.remove("newExampleCoverId");
    localStorage.removeItem("createCoverLetterData");
    localStorage.removeItem("cover_template_id");
    Cookies.set("is_edit", 1, { expires: 1 }); // Expires in 1 day
    if (name === "Resume") {
      navigate("/resume/formatting", { state: { resumeId: profile_id } });
    } else {
      navigate("/create-cover-letter/formatting", {
        state: { editAbleCoverId: profile_id },
      });
    }
  };

  const doc_new = (name) => {
    if (name === "Resume") {
      navigate("/resume/formatting", {
        state: { isExample: false, selectedTemplateId: 3 },
      });
    } else {
      navigate("/create-cover-letter/formatting", {
        state: { isExample: false, selectedTemplateId: 1 },
      });
    }
  };

  const download_email = (id, name) => {
    $(".name_label2").val(name);
    $(".name_label").val(name);
    if (name === "Resume") {
      $("#email_modelbox_load").fadeIn(300);
      const article = {
        link: global.localPath + "share/" + id + "?share=resume",
        //link: 'https://www.google.com/'
      };

      const headers = {
        Authorization: "Bearer " + user?.token,
        "Access-Control-Allow-Origin": "*",
      };
      axios
        .post(global.baseurl + "/send_attached_resume", article, { headers })
        .then((data) => {
          if (data) {
            $("#email_modelbox_load").fadeOut(300);
            swal("Success!", "Email Send Successfully", "success");
          }
        })
        .catch((err) => {
          $("#email_modelbox_load").fadeOut(300);
          swal("Error!", "Email Not Send Try Again", "error");
          console.log(err);
        });
    } else {
      $("#email_modelbox_load").fadeIn(300);
      const article = {
        link: global.localPath + "share/" + id + "?share=coverletter",
        //link: 'https://www.google.com/'
      };

      const headers = {
        Authorization: "Bearer " + user?.token,
        "Access-Control-Allow-Origin": "*",
      };
      axios
        .post(global.baseurl + "/send_attached_cover", article, { headers })
        .then((data) => {
          if (data) {
            $("#email_modelbox_load").fadeOut(300);
            swal("Success!", "Email Send Successfully", "success");
          }
        })
        .catch((err) => {
          $("#email_modelbox_load").fadeOut(300);
          swal("Error!", "Email Not Send Try Again", "error");
          console.log(err);
        });
    }
  };

  const download_email_close = () => {
    $("#download_email_modelbox").fadeOut(300);
  };

  const print_doc = (temp_id, id, name) => {
    $("#print_doc_modelbox").fadeIn(300);
    $("#temp_id").html(temp_id);
    $("#doc_id").html(id);
    $("#doc_name").html(name);
    $(".name_label").html(name);
    setTempId(temp_id);
    setDocId(id);
  };

  const print_doc_close = () => {
    $("#print_doc_modelbox").fadeOut(300);
  };

  const share_doc = async (id, name) => {
    $(".name_label2").val(name);
    $(".name_label").val(name);
    if (name === "Resume") {
      $("#share_doc_modelbox").fadeIn(300);
      setFile(global.localPath + "share/" + id + "?share=resume");
      console.log(global.localPath + "share/" + id + "?share=resume");
    } else {
      $("#share_doc_modelbox").fadeIn(300);
      setFile(global.localPath + "share/" + id + "?share=coverletter");
      console.log(global.localPath + "share/" + id + "?share=coverletter");
    }
  };

  const share_doc2_close = () => {
    $("#share_doc_modelbox_file").fadeOut(300);
  };

  const share_doc3 = async () => {
    //$('#share_doc_modelbox_file').fadeIn(300);
    console.log(file2);
  };

  const share_doc2 = async () => {
    if (file2 === null || file2 === undefined || file2 === "") {
      swal("Error!", "Share File Not Attached", "error");
    } else {
      $("#share_doc_modelbox_file").fadeOut(300);
      $("#share_doc_modelbox_load").fadeIn(300);

      const headers = {
        Authorization: "Bearer " + user?.token,
        "Content-type": "multipart/form-data",
      };
      const article = {
        file: file2,
      };
      axios
        .post(global.baseurl + "/upload-file", article, { headers })
        .then((data) => {
          if (data) {
            console.log(data.data.path);
            $("#share_doc_modelbox_load").fadeOut(300);
            $("#share_doc_modelbox").fadeIn(300);
            setFile(data.data.path);
          }
        })
        .catch((err) => {
          console.log(err);
          $("#share_doc_modelbox_load").fadeOut(300);
          swal("Error!", "Something Wrong With File Sharing", "error");
        });
    }
  };

  const share_doc_close = () => {
    $("#share_doc_modelbox").fadeOut(300);
  };

  const print_document = () => {
    var temp_id = $("#temp_id").html();
    var doc_id = $("#doc_id").html();
    var name_txt = $("#name_txt").val();

    //var originalBody = document.getElementById('maindiv2').innerHTML;
    var content = document.getElementById(
      "print-content-" + temp_id + "_" + doc_id
    );

    var newWin = window.open("");
    newWin.document.write(content.outerHTML);
    newWin.print();
    newWin.close();
  };

  const check_input = () => {
    var name_txt = $("#name_txt").val();
    if (name_txt === "") {
      $("#name_txt").addClass("border-red-500");
    } else {
      const checkNumbers = /^[0-9]+(\s+[0-9]+)*$/.test(name_txt);
      var containsSpaces = name_txt.includes(" ");

      // If not valid, prevent form submission and show an error message
      if (containsSpaces || checkNumbers) {
        $("#name_txt").addClass("border-red-500");
      } else {
        $("#name_txt").removeClass("border-red-500");
        $("#name_txt").addClass("border-slate-300");
      }
    }
  };

  const download_document = async () => {
    var temp_id = $("#temp_id").html();
    var doc_id = $("#doc_id").html();
    var name_txt = $("#name_txt").val();

    if (name_txt === "") {
      $("#name_txt").addClass("border-red-500");
    } else {
      const checkNumbers = /^[0-9]+(\s+[0-9]+)*$/.test(name_txt);
      var containsSpaces = name_txt.includes(" ");

      // If not valid, prevent form submission and show an error message
      if (containsSpaces || checkNumbers) {
        $("#name_txt").addClass("border-red-500");
      } else {
        $("#name_txt").removeClass("border-red-500");
        $("#name_txt").addClass("border-slate-300");

        if (selectedOption === "pdf") {
          document.getElementById(
            "print-content-" + temp_id + "_" + doc_id
          ).style.width = "793px";
          document.getElementById(
            "print-content-" + temp_id + "_" + doc_id
          ).style.minHeight = "1150px";
          const input = document.getElementById(
            "print-content-" + temp_id + "_" + doc_id
          );

          html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            pdf.addImage(imgData, "PNG", 0, 0);
            pdf.save(name_txt + ".pdf");
          });

          document.getElementById(
            "print-content-" + temp_id + "_" + doc_id
          ).style.width = "100%";
          document.getElementById(
            "print-content-" + temp_id + "_" + doc_id
          ).style.minHeight = "800px";
        } else {
          var header =
            "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
            "xmlns:w='urn:schemas-microsoft-com:office:word' " +
            "xmlns='http://www.w3.org/TR/REC-html40'>" +
            "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title><style>p.MsoHeader, li.MsoHeader, div.MsoHeader {margin:0in; margin-bottom:-50pt;}</style></head><body>";
          var footer = "</body></html>";
          var sourceHTML =
            header +
            document.getElementById("print-content-" + temp_id + "_" + doc_id)
              .innerHTML +
            footer;

          var source =
            "data:application/vnd.ms-word;charset=utf-8," +
            encodeURIComponent(sourceHTML);
          var fileDownload = document.createElement("a");
          document.body.appendChild(fileDownload);
          fileDownload.href = source;
          fileDownload.download = name_txt + ".doc";
          fileDownload.click();
          document.body.removeChild(fileDownload);
        }
      }
    }
  };

  const email_document = async () => {
    var temp_id = $("#temp_id").html();
    var doc_id = $("#doc_id").html();
    var name_txt = $("#name_txt").val();
    var doc_name = $("#doc_name").html();
    document.getElementById("loader_get").style.display = "none";
    document.getElementById("loader").style.display = "flex";

    if (name_txt === "") {
      $("#name_txt").addClass("border-red-500");
    } else {
      const checkNumbers = /^[0-9]+(\s+[0-9]+)*$/.test(name_txt);
      var containsSpaces = name_txt.includes(" ");

      // If not valid, prevent form submission and show an error message
      if (containsSpaces || checkNumbers) {
        $("#name_txt").addClass("border-red-500");
      } else {
        $("#name_txt").removeClass("border-red-500");
        $("#name_txt").addClass("border-slate-300");

        if (doc_name === "Resume") {
          if (selectedOption === "pdf") {
            document.getElementById(
              "print-content-" + temp_id + "_" + doc_id
            ).style.width = "793px";
            document.getElementById(
              "print-content-" + temp_id + "_" + doc_id
            ).style.minHeight = "1150px";
            const input = document.getElementById(
              "print-content-" + temp_id + "_" + doc_id
            );

            await html2canvas(input).then((canvas) => {
              const imgData = canvas.toDataURL("image/png");
              const pdf = new jsPDF();
              pdf.addImage(imgData, "PNG", 0, 0);

              // Generate a Blob from the PDF data
              const blob = pdf.output("blob");
              const my_file = new File([blob], name_txt + ".pdf", {
                type: "application/pdf",
              });

              const headers = {
                Authorization: "Bearer " + user?.token,
                "Content-type": "multipart/form-data",
              };
              const article = {
                resume: my_file,
              };
              axios
                .post(global.baseurl + "/send_attached_resume", article, {
                  headers,
                })
                .then((data) => {
                  if (data) {
                    swal("Done! Your File Successfully Send!", {
                      icon: "success",
                    });
                    document.getElementById("loader_get").style.display =
                      "flex";
                    document.getElementById("loader").style.display = "none";
                  }
                })
                .catch((err) => {
                  console.log(err);
                  swal("Error!", "Something Wrong", "error");
                  document.getElementById("loader_get").style.display = "flex";
                  document.getElementById("loader").style.display = "none";
                });
            });

            document.getElementById(
              "print-content-" + temp_id + "_" + doc_id
            ).style.width = "100%";
            document.getElementById(
              "print-content-" + temp_id + "_" + doc_id
            ).style.minHeight = "800px";
          } else {
            var header =
              "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
              "xmlns:w='urn:schemas-microsoft-com:office:word' " +
              "xmlns='http://www.w3.org/TR/REC-html40'>" +
              "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title><style>body { margin: 0;padding: 0; }</style></head><body>";
            var footer = "</body></html>";
            var sourceHTML =
              header +
              document.getElementById("print-content-" + temp_id + "_" + doc_id)
                .innerHTML +
              footer;

            var source =
              "data:application/vnd.ms-word;charset=utf-8," +
              encodeURIComponent(sourceHTML);
            var fileDownload = document.createElement("a");
            document.body.appendChild(fileDownload);
            fileDownload.href = source;
            // fileDownload.download = name_txt+'.doc';
            // fileDownload.click();
            // document.body.removeChild(fileDownload);
            var blob = new Blob(["\ufeff", sourceHTML], {
              type: "application/vnd.ms-word;charset=utf-8",
            });
            const my_file = new File([blob], name_txt + ".doc", {
              type: "application/vnd.ms-word",
            });

            const headers = {
              Authorization: "Bearer " + user?.token,
              "Content-type": "multipart/form-data",
            };
            const article = {
              resume: my_file,
            };
            axios
              .post(global.baseurl + "/send_attached_resume", article, {
                headers,
              })
              .then((data) => {
                if (data) {
                  swal("Done! Your File Successfully Send!", {
                    icon: "success",
                  });
                  document.getElementById("loader_get").style.display = "flex";
                  document.getElementById("loader").style.display = "none";
                }
              })
              .catch((err) => {
                console.log(err);
                swal("Error!", "Something Wrong", "error");
                document.getElementById("loader_get").style.display = "flex";
                document.getElementById("loader").style.display = "none";
              });
          }
        } else {
          if (selectedOption === "pdf") {
            document.getElementById(
              "print-content-" + temp_id + "_" + doc_id
            ).style.width = "793px";
            document.getElementById(
              "print-content-" + temp_id + "_" + doc_id
            ).style.minHeight = "1150px";
            const input = document.getElementById(
              "print-content-" + temp_id + "_" + doc_id
            );

            await html2canvas(input).then((canvas) => {
              const imgData = canvas.toDataURL("image/png");
              const pdf = new jsPDF();
              pdf.addImage(imgData, "PNG", 0, 0);

              // Generate a Blob from the PDF data
              const blob = pdf.output("blob");
              const my_file = new File([blob], name_txt + ".pdf", {
                type: "application/pdf",
              });

              const headers = {
                Authorization: "Bearer " + user?.token,
                "Content-type": "multipart/form-data",
              };
              const article = {
                cover_letter: my_file,
              };
              axios
                .post(global.baseurl + "/send_attached_cover", article, {
                  headers,
                })
                .then((data) => {
                  if (data) {
                    swal("Done! Your File Successfully Send!", {
                      icon: "success",
                    });
                    document.getElementById("loader_get").style.display =
                      "flex";
                    document.getElementById("loader").style.display = "none";
                  }
                })
                .catch((err) => {
                  console.log(err);
                  swal("Error!", "Something Wrong", "error");
                  document.getElementById("loader_get").style.display = "flex";
                  document.getElementById("loader").style.display = "none";
                });
            });

            document.getElementById(
              "print-content-" + temp_id + "_" + doc_id
            ).style.width = "100%";
            document.getElementById(
              "print-content-" + temp_id + "_" + doc_id
            ).style.minHeight = "800px";
          } else {
            var header =
              "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
              "xmlns:w='urn:schemas-microsoft-com:office:word' " +
              "xmlns='http://www.w3.org/TR/REC-html40'>" +
              "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title><style>body { margin: 0;padding: 0; }</style></head><body>";
            var footer = "</body></html>";
            var sourceHTML =
              header +
              document.getElementById("print-content-" + temp_id + "_" + doc_id)
                .innerHTML +
              footer;

            var source =
              "data:application/vnd.ms-word;charset=utf-8," +
              encodeURIComponent(sourceHTML);
            var fileDownload = document.createElement("a");
            document.body.appendChild(fileDownload);
            fileDownload.href = source;
            // fileDownload.download = name_txt+'.doc';
            // fileDownload.click();
            // document.body.removeChild(fileDownload);
            var blob = new Blob(["\ufeff", sourceHTML], {
              type: "application/vnd.ms-word;charset=utf-8",
            });
            const my_file = new File([blob], name_txt + ".doc", {
              type: "application/vnd.ms-word",
            });

            const headers = {
              Authorization: "Bearer " + user?.token,
              "Content-type": "multipart/form-data",
            };
            const article = {
              cover_letter: my_file,
            };
            axios
              .post(global.baseurl + "/send_attached_cover", article, {
                headers,
              })
              .then((data) => {
                if (data) {
                  swal("Done! Your File Successfully Send!", {
                    icon: "success",
                  });
                  document.getElementById("loader_get").style.display = "flex";
                  document.getElementById("loader").style.display = "none";
                }
              })
              .catch((err) => {
                console.log(err);
                swal("Error!", "Something Wrong", "error");
                document.getElementById("loader_get").style.display = "flex";
                document.getElementById("loader").style.display = "none";
              });
          }
        } //END Resume Condition
      }
    }
  };
  const [user3, setUser] = useState([]);
  useEffect(() => {
    const headers = {
      Authorization: "Bearer " + user?.token,
    };

    axios
      .get(global.baseurl + "/user_details", { headers })
      .then((data) => {
        if (data) {
          setUser(data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const duplicate_document = (temp_id, uuid, name, doc_name) => {
    $("#temp_id").html(temp_id);
    $("#doc_id").html(uuid);
    $("#doc_name").html(name);
    $(".name_label").html(name);
    if (user3.package_id === 1) {
      swal("Inorder to use duplicate feature, please upgrade your plan.", {
        icon: "error",
      });
    } else {
      swal({
        title: "Duplicate File",
        text: "Are you sure you want to duplicate the " + doc_name + " File?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          const headers = {
            Authorization: "Bearer " + user?.token,
            "Content-type": "multipart/form-data",
          };

          if (name === "Resume") {
            axios
              .get(global.baseurl + "/duplicate-resume/" + uuid, { headers })
              .then((data) => {
                if (data) {
                  swal(
                    "Done! Your " + doc_name + " file has been successfully Duplicated!",
                    {
                      icon: "success",
                    }
                  );

                  axios
                    .get(global.baseurl + "/personal_information", { headers })
                    .then((data) => {
                      if (data) {
                        set_my_resumes(data.data.data[0].personal_information);
                        console.log(data.data.data[0].personal_information);
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });

                  axios
                    .get(global.baseurl + "/cover_letters", { headers })
                    .then((data) => {
                      if (data) {
                        set_my_coverletters(data.data.data);
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
          } else {
            //COVER LETTER DUPLICATE
            axios
              .get(global.baseurl + "/duplicate-cover/" + uuid, { headers })
              .then((data) => {
                if (data) {
                  swal(
                    "Done! Your " + doc_name + " file has been successfully Duplicated!",
                    {
                      icon: "success",
                    }
                  );
                  axios
                    .get(global.baseurl + "/personal_information", { headers })
                    .then((data) => {
                      if (data) {
                        set_my_resumes(data.data.data[0].personal_information);
                        console.log(data.data.data[0].personal_information);
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });

                  axios
                    .get(global.baseurl + "/cover_letters", { headers })
                    .then((data) => {
                      if (data) {
                        set_my_coverletters(data.data.data);
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
        } else {
          swal("Your " + doc_name + " File Not Duplicated!");

        }
      });
    }
  };

  const delete_document = (temp_id, uuid, name, doc_name) => {
    $("#temp_id").html(temp_id);
    $("#doc_id").html(uuid);
    $("#doc_name").html(name).css("color", "#0072b1");

    $(".name_label").html(name);

    // Wrap doc_name with a span to set the color

    swal({
      title: "Delete File",
      text: "Are you sure you want to delete " + doc_name + " file?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const headers = {
          Authorization: "Bearer " + user?.token,
          "Content-type": "multipart/form-data",
        };

        if (name === "Resume") {
          //RESUME DELETE
          axios
            .delete(global.baseurl + "/personal_information/" + uuid, {
              headers,
            })
            .then((data) => {
              if (data) {
                swal("Done! Your file deleted successfully.", {
                  icon: "success",
                });
                axios
                  .get(global.baseurl + "/personal_information", { headers })
                  .then((data) => {
                    if (data) {
                      set_my_resumes(data.data.data[0].personal_information);
                      console.log(data.data.data[0].personal_information);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });

                axios
                  .get(global.baseurl + "/cover_letters", { headers })
                  .then((data) => {
                    if (data) {
                      set_my_coverletters(data.data.data);
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
        } else {
          //COVER LETTER DELETE
          axios
            .delete(global.baseurl + "/cover_letters/" + uuid, { headers })
            .then((data) => {
              if (data) {
                swal("Done! Your file deleted successfully.", {
                  icon: "success",
                });
                axios
                  .get(global.baseurl + "/personal_information", { headers })
                  .then((data) => {
                    if (data) {
                      set_my_resumes(data.data.data[0].personal_information);
                      console.log(data.data.data[0].personal_information);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });

                axios
                  .get(global.baseurl + "/cover_letters", { headers })
                  .then((data) => {
                    if (data) {
                      set_my_coverletters(data.data.data);
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
      } else {
        swal("Unfortunately, Your " + doc_name + " file was not deleted.");
      }
    });
  };

  const rename_document = (temp_id, uuid, name, doc_name) => {
    $("#temp_id").html(temp_id);
    $("#doc_id").html(uuid);
    $("#doc_name").html(name);
    $(".name_label").html(name);

    swal("Please Enter a New File Name For " + doc_name, {
      title: "Rename " + name,
      buttons: true,
      content: "input",
    }).then((value) => {
      if (value) {
        swal({
          title: "Rename " + name,
          text: "Are you sure to Rename " + doc_name + " to " + value,
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            const headers = {
              Authorization: "Bearer " + user?.token,
              "Content-type": "multipart/form-data",
            };

            if (name === "Resume") {
              //RESUME RENAME
              const article = {
                resume_name: value,
              };
              axios
                .post(global.baseurl + "/rename_resume/" + uuid, article, {
                  headers,
                })
                .then((data) => {
                  if (data) {
                    swal("Done! Your resume has been renamed successfully.", {
                      icon: "success",
                    });

                    // axios
                    //   .get(global.baseurl + "/personal_information", {
                    //     headers,
                    //   })
                    //   .then((data) => {
                    //     if (data) {
                    //       set_my_resumes(
                    //         data.data.data[0].personal_information
                    //       );
                    //       console.log(data.data.data[0].personal_information);
                    //     }
                    //   })
                    //   .catch((err) => {
                    //     console.log(err);
                    //   });
                    axios
                      .get(global.baseurl + "/personal_information", {
                        headers,
                      })
                      .then((data) => {
                        if (data) {
                          set_my_resumes(
                            data.data.data[0].personal_information
                          );
                          console.log(data.data.data[0].personal_information);
                        }
                      })
                      .catch((err) => {
                        console.log(err);
                      });

                    axios
                      .get(global.baseurl + "/cover_letters", { headers })
                      .then((data) => {
                        if (data) {
                          set_my_coverletters(data.data.data);
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
            } else {
              //COVER LETTER RENAME
              const article = {
                name: value,
              };
              axios
                .post(global.baseurl + "/rename_cover/" + uuid, article, {
                  headers,
                })
                .then((data) => {
                  // Update the state to reflect the new name
                  set_my_coverletters((prevCoverLetters) =>
                    prevCoverLetters.map((cover) =>
                      cover.id === uuid
                        ? { ...cover, name: value } // Update the name of the renamed document
                        : cover
                    )
                  );
                  if (data) {
                    swal("Done! Cover letter renamed successfully.", {
                      icon: "success",
                    });
                    axios
                      .get(global.baseurl + "/personal_information", {
                        headers,
                      })
                      .then((data) => {
                        if (data) {
                          set_my_resumes(
                            data.data.data[0].personal_information
                          );
                          console.log(data.data.data[0].personal_information);
                        }
                      })
                      .catch((err) => {
                        console.log(err);
                      });

                    axios
                      .get(global.baseurl + "/cover_letters", { headers })
                      .then((data) => {
                        if (data) {
                          // set_my_coverletters(data.data.data);
                          console.log(data.data.data);
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
          } else {
            swal("Your " + doc_name + " File Not Renamed!");
          }
        });
      } else {
        swal("Your " + doc_name + " File Not Renamed!");
      }
    });
  };

  const componentRefs = useRef([]);
  const componentRefss = useRef([]);
  const PrintableComponent = React.memo(
    React.forwardRef((props, ref) => {
      // Accessing props
      const { chk, template_id, id, uuid, dummy } = props;

      return (
        <div ref={ref}>
          {/* Assuming isMobile is accessible */}
          {chk === 1 ? (
            // <Templates
            //   is_print={1}
            //   zoom={isMobile ? 30 : 50}
            //   my_page={"doc"}
            //   temp_id={template_id}
            //   doc_id={id}
            //   uuid={uuid}
            //   dummy={dummy}
            //   formatting={1}
            // />
            <></>
          ) : (
            // <TemplatesCover
            //   is_print={1}
            //   zoom={isMobile ? 30 : 60}
            //   my_page={"doc"}
            //   temp_id={template_id}
            //   doc_id={id}
            //   uuid={uuid}
            //   dummy={dummy}
            //   formatting={1}
            // />
            <></>
          )}
        </div>
      );
    })
  );
  const [isLoading, setIsloading] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const sliderRef = React.useRef(null);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false, // Hide navigation arrows
    autoplay: false, // Enable auto sliding
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handlePrev = () => {
    sliderRef.current.slickPrev(); // Go to previous slide
  };

  const handleNext = () => {
    sliderRef.current.slickNext(); // Go to next slide
  };

  const sliderRef1 = React.useRef(null);
  const settings1 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false, // Hide navigation arrows
    autoplay: false, // Enable auto sliding
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handlePrev1 = () => {
    sliderRef.current.slickPrev(); // Go to previous slide
  };

  const handleNext1 = () => {
    sliderRef1.current.slickNext(); // Go to next slide
  };

  const [dummyState, setDummyState] = useState([]);
  const [dummyStateCover, setDummyStateCover] = useState([]);

  useEffect(() => {
    if (my_resumes.length >= 3) {
      const firstThreeResumes = my_resumes.slice(0, 3);
      setDummyState(firstThreeResumes);
    }
  }, [my_resumes]);

  useEffect(() => {
    if (my_coverletters.length >= 3) {
      const firstThreeCovers = my_coverletters.slice(0, 3);
      setDummyStateCover(firstThreeCovers);
    }
  }, [my_coverletters]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [ResumesToShow, setResumesToShow] = useState(12);
  const handleResumesToShow = () => {
    setResumesToShow(ResumesToShow + 12);
  };

  const [CoverToShow, setCoverToShow] = useState(12);
  const handleCoverToShow = () => {
    setCoverToShow(CoverToShow + 12);
  };

  return (
    <section className="" id="maindiv">
      <div>
        {isLoading && <LoadingSpiner isLoading={isLoading} />}

        {/* End Banner */}

        <div className="w-full flex flex-col items-center justify-center px-2 mt-[10px] sm:px-0">
          <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            <div className="text-xl border-2 py-2 lg:py-4  xl:px-12 bg-transparent text-black font-bold rounded-3xl w-[95%] m-auto shadow-blur">
              <div className="sm:flex block p-3">
                <Tab.List className="flex flex-1 gap-3 md:gap-10 justify-evenly sm:justify-start text-sm sm:text-base md:text-xl">
                  <Tab
                    id="all_documents"
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? "text-[#01B2AC] border-b-2 border-[#01B2AC] focus-visible:outline-none"
                          : "text-[#737373] border-b-2 border-transparent focus-visible:outline-none"
                      )
                    }
                  >
                    All Documents ({my_resumes.length + my_coverletters.length})
                  </Tab>
                  <Tab
                    id="all_resume"
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? "text-[#01B2AC] border-b-2 border-[#01B2AC] focus-visible:outline-none"
                          : "text-[#737373] border-b-2 border-transparent focus-visible:outline-none"
                      )
                    }
                  >
                    My Resume ({my_resumes.length})
                  </Tab>
                  <Tab
                    id="all_cover"
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? "text-[#01B2AC] border-b-2 border-[#01B2AC] focus-visible:outline-none"
                          : "text-[#737373] border-b-2 border-transparent focus-visible:outline-none"
                      )
                    }
                  >
                    My Cover Letter ({my_coverletters.length})
                  </Tab>
                </Tab.List>
                <div className="relative flex w-full pt-3 justify-center items-center sm:pt-0 sm:justify-start sm:w-[140px]">
                  <div className="bg-[#00caa5] rounded-md">
                    <button
                      type="button"
                      className="rounded-md inline-flex justify-center items-center w-full bg-[#00caa5] shadow-sm px-4 py-2 text-sm font-medium text-white focus:outline-none"
                      onClick={() => setIsOpen1(!isOpen1)}
                    >
                      <img
                        src={plus_icon}
                        alt="icon"
                        className="h-5 w-5 mr-2"
                      />
                      Create New
                    </button>
                  </div>

                  {isOpen1 && (
                    <div className="absolute top-[50px] w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                      <div className="py-1">
                        <div
                          onClick={() => doc_new("Resume")}
                          className="flex px-4 py-2 text-sm text-[#848484] hover:bg-[#0072b1] hover:text-white cursor-pointer"
                        >
                          <img
                            src={new_resume_icon}
                            alt="icon"
                            className="h-5 w-5 mr-2"
                          />
                          New Resume
                        </div>
                        <div
                          onClick={() => doc_new("Cover Letter")}
                          className="flex px-4 py-2 text-sm text-[#848484] hover:bg-[#0072b1] hover:text-white cursor-pointer"
                        >
                          <img
                            src={new_cover_icon}
                            alt="icon"
                            className="h-5 w-5 mr-2"
                          />
                          New Cover Letter
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Tab.Panels className="mt-[50px] w-[95%]">
              {/* for both */}
              <Tab.Panel>
                <div className="hidden lg:block">
                  <div className="flex justify-center items-center">
                    <div className="flex-1 mb-4">
                      <span className="font-bold font-montserrat text-[#0072b1] text-xl md:text-[25px] mb-6 lg:px-5 py-5">
                        My Resume ({my_resumes.length})
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-end items-start flex-wrap mb-6  lg:mb-0 w-full">
                    <div className="w-full flex justify-start items-center flex-wrap mb-10">
                      {
                        <>
                          <div className="w-full flex items-start flex-wrap mb-6 lg:mb-0  bg-transparent border-2 rounded-3xl overflow-hidden py-8 px-8 m-auto shadow-blur">
                            {resume_loading === 0 ? (
                              <>
                                <div className="flex justify-evenly  items-center flex-wrap m-4 ">
                                  <div className="w-full text-center flex justify-center items-center ">
                                    <div className="dd_btn3 relative rounded-[25px]  my-4 h-[400px] w-[400px] overflow-hidden mx-3">
                                      <Skeleton className="h-[100%] " />
                                    </div>
                                    <div className=" dd_btn3 relative rounded-[25px]  w-[400px] my-4 h-[400px] overflow-hidden mx-3 ">
                                      <Skeleton className="h-[100%]" />
                                    </div>
                                    <div className="lg:block hidden dd_btn3 relative rounded-[25px]  w-[400px] my-4 h-[400px] overflow-hidden mx-3 ">
                                      <Skeleton className="h-[100%]" />
                                    </div>
                                    <div className="xl:block hidden dd_btn3 relative rounded-[25px] my-4 w-[400px] h-[400px] overflow-hidden mx-3 ">
                                      <Skeleton className="h-[100%]" />
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                {my_resumes.length === 0 ? (
                                  <div className="w-full text-center font_1 text-2xl my-20">
                                    RESUME NOT FOUND
                                  </div>
                                ) : (
                                  <div className="w-full text-center flex justify-start items-center flex-wrap">
                                    {my_resumes.length > 0 ? (
                                      my_resumes
                                        .slice(0, ResumesToShow)
                                        .map((my_resumes, index_my_resumes) => (
                                          <div className="w-full lg:w-[32%] xl:w-[24%]">
                                            <div
                                              key={index_my_resumes}
                                              className="flex justify-between  items-center flex-wrap m-4 2xl:mx-[4%]"
                                            >
                                              <div className="flex items-center justify-center w-full  gap-10">
                                                <div
                                                  className="Montserrat font-semibold text-[#0072b1] break-all text-sm rounded-md truncate max-w-[150px]"
                                                  onClick={(e) =>
                                                    rename_document(
                                                      my_resumes.template_id,
                                                      my_resumes.uuid,
                                                      "Resume",
                                                      my_resumes.resume_name
                                                    )
                                                  }
                                                >
                                                  {my_resumes.resume_name}
                                                </div>
                                                <div className="text-black Montserrat tracking-widest text-sm">
                                                  <span className="uppercase">
                                                    {formattedDate(
                                                      my_resumes.updated_at
                                                    )}
                                                  </span>
                                                </div>
                                              </div>
                                              <div className=" dd_btn3 relative rounded-[25px] w-full my-4 h-[370px] sm:h-[450px] overflow-hidden shadow-inner-custom">
                                                <img
                                                  src={`${Resume_images[
                                                    my_resumes.template_id - 1
                                                  ]
                                                    }`}
                                                />
                                                <div className="">
                                                  <div
                                                    style={{
                                                      display: "none",
                                                    }}
                                                  >
                                                    <PrintableComponent
                                                      chk={1}
                                                      template_id={
                                                        my_resumes.template_id
                                                      }
                                                      doc_id={my_resumes.id}
                                                      uuid={my_resumes.uuid}
                                                      dummy={0}
                                                      ref={(ref) =>
                                                      (componentRefs.current[
                                                        index_my_resumes
                                                      ] = ref)
                                                      }
                                                      {...my_resumes}
                                                    />
                                                  </div>
                                                </div>
                                                <div className="hidden dd_menu3 bg-[rgba(0,0,0,0.3)] absolute left-0 top-0 w-full h-full justify-evenly items-end p-2 ">
                                                  <div
                                                    onClick={(e) =>
                                                      edit_now(
                                                        my_resumes.id,
                                                        my_resumes.uuid,
                                                        "Resume"
                                                      )
                                                    }
                                                    className="absolute box shadow-lg rounded-full py-2 cursor-pointer Montserrat text-sm bg-[#01B2AC] hover:bg-[#0072b1] text-white w-[35%] lg:w-[25%] flex justify-center items-center flex-wrap"
                                                  >
                                                    <div className="flex justify-center items-center bg-[#fff] rounded-full mr-2 w-[30px] h-[30px]">
                                                      <BiEditAlt
                                                        className="text-[#01B2AC]"
                                                        size={20}
                                                      />
                                                    </div>
                                                    Edit
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="flex items-center justify-center gap-16 w-full ">
                                                <div
                                                  className="cursor-pointer Montserrat py-2 flex justify-start font-semibold items-center text-black hover:text-black text-sm"
                                                  onClick={(e) =>
                                                    duplicate_document(
                                                      my_resumes.template_id,
                                                      my_resumes.uuid,
                                                      "Resume",
                                                      my_resumes.resume_name
                                                    )
                                                  }
                                                >
                                                  <BiDuplicate
                                                    className="mr-2"
                                                    size={18}
                                                  />{" "}
                                                  Duplicate
                                                </div>
                                                <div
                                                  className="cursor-pointer Montserrat py-2 flex justify-start font-semibold items-center text-black hover:text-black text-sm"
                                                  onClick={(e) =>
                                                    delete_document(
                                                      my_resumes.template_id,
                                                      my_resumes.uuid,
                                                      "Resume",
                                                      my_resumes.resume_name
                                                    )
                                                  }
                                                >
                                                  <SlTrash
                                                    className="mr-2"
                                                    size={18}
                                                  />{" "}
                                                  Delete
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        ))
                                    ) : (
                                      <h1 className="text-slate-700 font_3 text-2xl text-center"></h1>
                                    )}
                                    {ResumesToShow < my_resumes.length && (
                                      <div className="w-full flex items-center justify-center mt-[40px]">
                                        <button
                                          onClick={handleResumesToShow}
                                          className="text-white rounded-2xl font-semibold px-4 py-2 bg-[#0072B1] text-md hover:text-white hover:bg-[#01B2AC]"
                                        >
                                          Load More
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                          <div className="w-full flex justify-center items-center">
                            <div className="flex-1 mb-4 mt-8">
                              <span className="font-bold font-montserrat text-[#0072b1] text-xl md:text-[25px] mb-6  lg:py-5 pl-[20px]  lg:px-5 ">
                                Cover Letter ({my_coverletters.length})
                              </span>
                            </div>
                            {/* <div className="inline-flex text-left lg:pr-[80px]">
                              <img
                                src={left_icon}
                                alt="left icon"
                                className="w-[40px] h-[40px] flex items-center justify-center ml-2"
                                onClick={handlePrev1}
                              />

                              <img
                                src={right_icon}
                                alt="right icon"
                                className="w-[40px] h-[40px] flex items-center justify-center ml-2"
                                onClick={handleNext1}
                              />
                            </div> */}
                          </div>

                          <div className="w-full flex items-start flex-wrap mb-6 lg:mb-0  bg-transparent border-2 rounded-3xl overflow-hidden py-8 px-8 m-auto shadow-blur">
                            {resume_loading === 0 ? (
                              <>
                                <div className="flex justify-evenly  items-center flex-wrap m-4 ">
                                  <div className="w-full text-center flex justify-center items-center ">
                                    <div className="dd_btn3 relative rounded-[25px]  my-4 h-[400px] w-[400px] overflow-hidden mx-3">
                                      <Skeleton className="h-[100%] " />
                                    </div>
                                    <div className=" dd_btn3 relative rounded-[25px]  w-[400px] my-4 h-[400px] overflow-hidden mx-3 ">
                                      <Skeleton className="h-[100%]" />
                                    </div>
                                    <div className="lg:block hidden dd_btn3 relative rounded-[25px]  w-[400px] my-4 h-[400px] overflow-hidden mx-3 ">
                                      <Skeleton className="h-[100%]" />
                                    </div>
                                    <div className="xl:block hidden dd_btn3 relative rounded-[25px] my-4 w-[400px] h-[400px] overflow-hidden mx-3 ">
                                      <Skeleton className="h-[100%]" />
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                {my_coverletters.length === 0 ? (
                                  cover_loading === 1 ? (
                                    <div className="w-full text-center font_1 text-2xl my-20">
                                      COVER LETTER NOT FOUND
                                    </div>
                                  ) : (
                                    ""
                                  )
                                ) : (
                                  <div className="w-full text-center flex justify-start items-center flex-wrap">
                                    {my_coverletters.length > 0 ? (
                                      my_coverletters
                                        .slice(0, CoverToShow)
                                        .map(
                                          (
                                            my_coverletters,
                                            index_my_coverletters
                                          ) => (
                                            <div className="w-full lg:w-[32%] xl:w-[24%]">
                                              <div
                                                key={index_my_coverletters}
                                                className="flex justify-between items-center flex-wrap m-4 2xl:mx-[4%]"
                                              >
                                                <div className="flex items-center justify-center gap-10 w-full">
                                                  <div
                                                    className="Montserrat font-semibold text-[#0072b1] break-all text-sm rounded-md truncate max-w-[150px]"
                                                    onClick={(e) =>
                                                      rename_document(
                                                        my_coverletters.cover_template_id,
                                                        my_coverletters.id,
                                                        "Cover Letter",
                                                        my_coverletters.name
                                                      )
                                                    }
                                                  >
                                                    {my_coverletters.name}
                                                  </div>
                                                  <div className="text-black Montserrat tracking-widest text-sm">
                                                    <span className="uppercase">
                                                      {formattedDate(
                                                        my_coverletters.updated_at
                                                      )}
                                                    </span>
                                                  </div>
                                                </div>

                                                <div className="dd_btn3 relative rounded-[25px] w-full my-4 h-[370px] sm:h-[450px] overflow-hidden shadow-inner-custom">
                                                  {/* <TemplatesCover zoom={60} temp_id={my_coverletters.cover_template_id} doc_id={my_coverletters.id} uuid={my_coverletters.cover_id} dummy={0}/> */}
                                                  <img
                                                    src={
                                                      cover_images[
                                                      my_coverletters.cover_template_id -
                                                      1
                                                      ]
                                                    }
                                                  />
                                                  <div
                                                    className=""
                                                    style={
                                                      isMobile
                                                        ? {
                                                          transform:
                                                            "scale(50%)",
                                                          width: "200%",
                                                          transformOrigin:
                                                            "top left",
                                                        }
                                                        : {
                                                          transform:
                                                            "scale(60%)",
                                                          width: "165%",
                                                          transformOrigin:
                                                            "top left",
                                                        }
                                                    }
                                                  >
                                                    <div
                                                      style={{
                                                        display: "none",
                                                      }}
                                                    >
                                                      <PrintableComponent
                                                        chk={2}
                                                        template_id={
                                                          my_coverletters.cover_template_id
                                                        }
                                                        doc_id={
                                                          my_coverletters.id
                                                        }
                                                        uuid={
                                                          my_coverletters.cover_id
                                                        }
                                                        dummy={0}
                                                        ref={(ref) =>
                                                        (componentRefss.current[
                                                          index_my_coverletters
                                                        ] = ref)
                                                        }
                                                        {...my_coverletters}
                                                      />
                                                    </div>
                                                  </div>
                                                  <div className="hidden dd_menu3 bg-[rgba(0,0,0,0.3)] absolute left-0 top-0 w-full h-full justify-evenly items-end p-2 ">
                                                    <div
                                                      onClick={(e) =>
                                                        edit_now(
                                                          my_coverletters.id,
                                                          0,
                                                          "cover"
                                                        )
                                                      }
                                                      className="absolute box shadow-lg rounded-full py-2 cursor-pointer Montserrat text-sm bg-[#01B2AC] hover:bg-[#0072b1] text-white w-[35%] lg:w-[25%] flex justify-center items-center flex-wrap"
                                                    >
                                                      <div className="flex justify-center items-center bg-[#fff] rounded-full mr-2 w-[30px] h-[30px]">
                                                        <BiEditAlt
                                                          className="text-[#01B2AC]"
                                                          size={20}
                                                        />
                                                      </div>
                                                      Edit
                                                    </div>
                                                  </div>
                                                </div>

                                                <div className="flex items-center justify-center gap-16 w-full">
                                                  <div
                                                    className="cursor-pointer Montserrat py-2 flex justify-start font-semibold items-center text-black hover:text-black text-sm"
                                                    onClick={(e) =>
                                                      duplicate_document(
                                                        my_coverletters.cover_template_id,
                                                        my_coverletters.id,
                                                        "Cover Letter",
                                                        my_coverletters.name
                                                      )
                                                    }
                                                  >
                                                    <BiDuplicate
                                                      className="mr-2"
                                                      size={18}
                                                    />{" "}
                                                    Duplicate
                                                  </div>
                                                  <div
                                                    className="cursor-pointer Montserrat py-2 flex justify-start font-semibold items-center text-black hover:text-black text-sm"
                                                    onClick={(e) =>
                                                      delete_document(
                                                        my_coverletters.cover_template_id,
                                                        my_coverletters.id,
                                                        "Cover Letter",
                                                        my_coverletters.name
                                                      )
                                                    }
                                                  >
                                                    <SlTrash
                                                      className="mr-2"
                                                      size={18}
                                                    />{" "}
                                                    Delete
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          )
                                        )
                                    ) : (
                                      <h1 className="text-slate-700 font_3 text-2xl text-center"></h1>
                                    )}
                                    {CoverToShow < my_coverletters.length && (
                                      <div className="w-full flex items-center justify-center pb-4 mt-[40px]">
                                        <button
                                          onClick={handleCoverToShow}
                                          className="text-white rounded-2xl font-semibold px-4 py-2 bg-[#0072B1] text-md hover:text-white hover:bg-[#01B2AC]"
                                        >
                                          Load More
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </>
                      }
                    </div>
                  </div>
                </div>

                <div className="block lg:hidden">
                  {/* mobile resume */}
                  <div className="flex justify-end items-start flex-wrap mb-6  lg:mb-0 w-full">
                    <div className="w-full flex justify-start items-center flex-wrap mb-10">
                      {
                        <>
                          <div className="w-full flex items-start flex-wrap mb-6 lg:mb-0  bg-transparent border-2 rounded-3xl overflow-hidden py-8 lg:px-12 m-auto shadow-blur background_shade">
                            <h4 className="font-bold font-montserrat text-[#0072b1] text-xl md:text-[32px]  lg:px-5 lg:py-5 pl-[20px]">
                              Resume ({my_resumes.length})
                            </h4>
                            {resume_loading === 0 ? (
                              <>
                                <div className="flex justify-evenly  items-center flex-wrap m-4 ">
                                  <div className="w-full text-center flex justify-center items-center ">
                                    <div className="dd_btn3 relative rounded-[25px]  my-4 h-[400px] w-[400px] overflow-hidden mx-3">
                                      <Skeleton className="h-[100%] " />
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              dummyState.map((my_resumes, index_my_resumes) => (
                                <div className="w-full text-center flex justify-center items-center">
                                  <div
                                    key={index_my_resumes}
                                    className="flex justify-between items-center flex-wrap m-4 2xl:mx-[4%]"
                                  >
                                    <div className="w-full flex items-center justify-center gap-10">
                                      <div
                                        className="Montserrat font-semibold text-[#0072b1] text-sm rounded-md truncate max-w-[150px]"
                                        onClick={(e) =>
                                          rename_document(
                                            my_resumes.template_id,
                                            my_resumes.uuid,
                                            "Resume",
                                            my_resumes.resume_name
                                          )
                                        }
                                      >
                                        {my_resumes.resume_name}
                                      </div>
                                      <div className="text-black Montserrat tracking-widest text-sm">
                                        <span className="uppercase">
                                          {formattedDate(my_resumes.updated_at)}
                                        </span>
                                      </div>
                                    </div>
                                    <div className=" dd_btn3 relative rounded-[25px] w-full my-4 overflow-hidden">
                                      {/* <Templates zoom={60} temp_id={my_resumes.template_id} doc_id={my_resumes.id} uuid={my_resumes.uuid} dummy={0}/> */}
                                      <img
                                        src={
                                          Resume_images[
                                          my_resumes.template_id - 1
                                          ]
                                        }
                                      />
                                      <div
                                        className=""
                                        style={
                                          isMobile
                                            ? {
                                              transform: "scale(35%)",
                                              width: "285%",
                                              transformOrigin: "top left",
                                            }
                                            : {
                                              transform: "scale(40%)",
                                              width: "250%",
                                              transformOrigin: "top left",
                                            }
                                        }
                                      >
                                        <div style={{ display: "none" }}>
                                          <PrintableComponent
                                            chk={1}
                                            template_id={my_resumes.template_id}
                                            doc_id={my_resumes.id}
                                            uuid={my_resumes.uuid}
                                            dummy={0}
                                            ref={(ref) =>
                                            (componentRefs.current[
                                              index_my_resumes
                                            ] = ref)
                                            }
                                            {...my_resumes}
                                          />
                                        </div>
                                      </div>
                                      <div className="hidden dd_menu3 bg-[rgba(0,0,0,0.3)] absolute left-0 top-0 w-full h-full justify-evenly items-end p-2 ">
                                        <div
                                          onClick={(e) =>
                                            edit_now(
                                              my_resumes.id,
                                              my_resumes.uuid,
                                              "Resume"
                                            )
                                          }
                                          className="absolute box shadow-lg rounded-full py-2 cursor-pointer Montserrat text-sm bg-[#01B2AC] hover:bg-[#0072b1] text-white w-[35%] lg:w-[25%] flex justify-center items-center flex-wrap"
                                        >
                                          <div className="flex justify-center items-center bg-[#fff] rounded-full mr-2 w-[30px] h-[30px]">
                                            <BiEditAlt
                                              className="text-[#01B2AC]"
                                              size={20}
                                            />
                                          </div>
                                          Edit
                                        </div>
                                      </div>
                                    </div>
                                    <div className="w-full flex items-center justify-center gap-16">
                                      <div
                                        className="cursor-pointer Montserrat py-2 flex justify-start font-semibold items-center text-black hover:text-black text-sm"
                                        onClick={(e) =>
                                          duplicate_document(
                                            my_resumes.template_id,
                                            my_resumes.uuid,
                                            "Resume",
                                            my_resumes.resume_name
                                          )
                                        }
                                      >
                                        <BiDuplicate
                                          className="mr-2"
                                          size={18}
                                        />{" "}
                                        Duplicate
                                      </div>
                                      <div
                                        className="cursor-pointer Montserrat py-2 flex justify-start font-semibold items-center text-black hover:text-black text-sm"
                                        onClick={(e) =>
                                          delete_document(
                                            my_resumes.template_id,
                                            my_resumes.uuid,
                                            "Resume",
                                            my_resumes.resume_name
                                          )
                                        }
                                      >
                                        <SlTrash className="mr-2" size={18} />{" "}
                                        Delete
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))
                            )}
                            {my_resumes.length > 0 ? (
                              <div
                                className="w-full flex justify-center  items-center p-4"
                                onClick={() => setSelectedIndex(1)}
                              >
                                <p className="text-center text-[#989898]">
                                  View All
                                </p>
                                <img src={view_all} alt="View All Icon" />
                              </div>
                            ) : (
                              <div className="w-full text-center font_1 text-2xl my-20">
                                RESUME NOT FOUND
                              </div>
                            )}
                          </div>
                          <div className="w-full flex items-start flex-wrap mb-6 lg:mb-0  bg-transparent border-2 rounded-3xl overflow-hidden py-8 lg:px-12 m-auto shadow-blur background_shade">
                            <span className="font-bold font-montserrat text-[#0072b1] text-xl md:text-[25px] mb-6 lg:px-5 lg:py-5 pl-[20px]">
                              Cover Letter ({my_coverletters.length})
                            </span>
                            {cover_loading === 0 ? (
                              <>
                                <div className="flex justify-evenly  items-center flex-wrap m-4 ">
                                  <div className="w-full text-center flex justify-center items-center ">
                                    <div className="dd_btn3 relative rounded-[25px]  my-4 h-[400px] w-[400px] overflow-hidden mx-3">
                                      <Skeleton className="h-[100%] " />
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              dummyStateCover.map(
                                (my_coverletters, index_my_coverletters) => (
                                  <div className="w-full text-center flex justify-center items-center rounded-md">
                                    <div
                                      key={index_my_coverletters}
                                      className="flex justify-between items-center flex-wrap m-4 2xl:mx-[4%]"
                                    >
                                      <div className="w-full flex items-center justify-center gap-10">
                                        <div
                                          className="Montserrat font-semibold text-[#0072b1] text-sm rounded-md truncate max-w-[150px]"
                                          onClick={(e) =>
                                            rename_document(
                                              my_coverletters.cover_template_id,
                                              my_coverletters.id,
                                              "Cover Letter",
                                              my_coverletters.name
                                            )
                                          }
                                        >
                                          {my_coverletters.name}
                                        </div>
                                        <div className="text-black Montserrat tracking-widest text-sm">
                                          <span className="uppercase">
                                            {formattedDate(
                                              my_coverletters.updated_at
                                            )}
                                          </span>
                                        </div>
                                      </div>

                                      <div className="dd_btn3 relative rounded-[25px] w-full my-4 overflow-hidden shadow-inner-custom">
                                        {/* <TemplatesCover zoom={60} temp_id={my_coverletters.cover_template_id} doc_id={my_coverletters.id} uuid={my_coverletters.cover_id} dummy={0}/> */}
                                        <img
                                          src={
                                            cover_images[
                                            my_coverletters.cover_template_id -
                                            1
                                            ]
                                          }
                                        />
                                        <div
                                          className=""
                                          style={
                                            isMobile
                                              ? {
                                                transform: "scale(50%)",
                                                width: "200%",
                                                transformOrigin: "top left",
                                              }
                                              : {
                                                transform: "scale(60%)",
                                                width: "165%",
                                                transformOrigin: "top left",
                                              }
                                          }
                                        >
                                          <div style={{ display: "none" }}>
                                            <PrintableComponent
                                              chk={2}
                                              template_id={
                                                my_coverletters.cover_template_id
                                              }
                                              doc_id={my_coverletters.id}
                                              uuid={my_coverletters.cover_id}
                                              dummy={0}
                                              ref={(ref) =>
                                              (componentRefss.current[
                                                index_my_coverletters
                                              ] = ref)
                                              }
                                              {...my_coverletters}
                                            />
                                          </div>
                                          {/* <TemplatesCover
                                          is_print={1}
                                          zoom={isMobile ? 30 : 50}
                                          my_page={"doc"}
                                          temp_id={
                                            my_coverletters.cover_template_id
                                          }
                                          doc_id={my_coverletters.id}
                                          uuid={my_coverletters.cover_id}
                                          dummy={0}
                                          formatting={1}
                                        /> */}
                                        </div>
                                        <div className="hidden dd_menu3 bg-[rgba(0,0,0,0.3)] absolute left-0 top-0 w-full h-full justify-evenly items-end p-2 ">
                                          <div
                                            onClick={(e) =>
                                              edit_now(
                                                my_coverletters.id,
                                                0,
                                                "cover"
                                              )
                                            }
                                            className="absolute box shadow-lg rounded-full py-2 cursor-pointer Montserrat text-sm bg-[#01B2AC] hover:bg-[#0072b1] text-white w-[35%] lg:w-[25%] flex justify-center items-center flex-wrap"
                                          >
                                            <div className="flex justify-center items-center bg-[#fff] rounded-full mr-2 w-[30px] h-[30px]">
                                              <BiEditAlt
                                                className="text-[#01B2AC]"
                                                size={20}
                                              />
                                            </div>
                                            Edit
                                          </div>
                                        </div>
                                      </div>
                                      <div className="w-full flex items-center justify-center gap-16">
                                        <div
                                          className="cursor-pointer Montserrat py-2 flex justify-start font-semibold items-center text-black hover:text-black text-sm"
                                          onClick={(e) =>
                                            duplicate_document(
                                              my_coverletters.cover_template_id,
                                              my_coverletters.id,
                                              "Cover Letter",
                                              my_coverletters.name
                                            )
                                          }
                                        >
                                          <BiDuplicate
                                            className="mr-2"
                                            size={18}
                                          />{" "}
                                          Duplicate
                                        </div>
                                        <div
                                          className="cursor-pointer Montserrat py-2 flex justify-start font-semibold items-center text-black hover:text-black text-sm"
                                          onClick={(e) =>
                                            delete_document(
                                              my_coverletters.cover_template_id,
                                              my_coverletters.id,
                                              "Cover Letter",
                                              my_coverletters.name
                                            )
                                          }
                                        >
                                          <SlTrash className="mr-2" size={18} />{" "}
                                          Delete
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )
                              )
                            )}
                            {my_coverletters.length > 0 ? (
                              <div
                                className="w-full flex justify-center items-center p-4"
                                onClick={() => setSelectedIndex(2)}
                              >
                                <p className="text-center text-[#989898]">
                                  View All
                                </p>
                                <img src={view_all} alt="View All Icon" />
                              </div>
                            ) : (
                              <div className="w-full text-center font_1 text-2xl my-20">
                                RESUME NOT FOUND
                              </div>
                            )}
                          </div>
                        </>
                      }
                    </div>
                  </div>
                </div>
              </Tab.Panel>

              {/* for resume */}
              <Tab.Panel>
                <div className="flex-1 mb-4">
                  <span className="font-bold font-montserrat text-[#0072b1] text-xl md:text-[25px] mb-6 lg:px-5 py-5">
                    My Resume ({my_resumes.length})
                  </span>
                </div>
                <div className="flex justify-end items-start flex-wrap mb-6   bg-transparent border-2 rounded-3xl overflow-hidden py-8 lg:px-12 m-auto shadow-blur">
                  <div className="w-full flex justify-start items-center flex-wrap mb-10">
                    {
                      <>
                        {resume_loading === 0 ? (
                          <>
                            <div className="flex justify-evenly items-center flex-wrap m-4 ">
                              <div className="w-full text-center flex justify-center items-center ">
                                <div className="dd_btn3 relative rounded-[25px]  my-4 h-[400px] w-[400px] overflow-hidden mx-3">
                                  <Skeleton className="h-[100%] " />
                                </div>
                                <div className=" dd_btn3 relative rounded-[25px]  w-[400px] my-4 h-[400px] overflow-hidden mx-3 ">
                                  <Skeleton className="h-[100%]" />
                                </div>
                                <div className="lg:block hidden dd_btn3 relative rounded-[25px]  w-[400px] my-4 h-[400px] overflow-hidden mx-3 ">
                                  <Skeleton className="h-[100%]" />
                                </div>
                                <div className="xl:block hidden dd_btn3 relative rounded-[25px] my-4 w-[400px] h-[400px] overflow-hidden mx-3 ">
                                  <Skeleton className="h-[100%]" />
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex justify-center flex-wrap items-center w-full ">
                              {my_resumes.length === 0 ? (
                                resume_loading === 1 ? (
                                  <div className="w-full text-center font_1 text-2xl my-20">
                                    RESUME NOT FOUND
                                  </div>
                                ) : (
                                  ""
                                )
                              ) : (
                                my_resumes
                                  .slice(0, ResumesToShow)
                                  .map((my_resumes, index_my_resumes) => (
                                    <div
                                      key={index_my_resumes}
                                      className="w-full md:w-[45%] lg:w-[40%] xl:w-[30%] 2xl:w-[22%] flex justify-between items-center flex-wrap m-4 md:m-[22px] "
                                    >
                                      <div className="flex items-center justify-center gap-10 w-full">
                                        <div
                                          className="Montserrat font-semibold text-[#0072b1] break-all text-sm rounded-md truncate max-w-[150px]"
                                          onClick={(e) =>
                                            rename_document(
                                              my_resumes.template_id,
                                              my_resumes.uuid,
                                              "Resume",
                                              my_resumes.resume_name
                                            )
                                          }
                                        >
                                          {my_resumes.resume_name}
                                        </div>
                                        <div className="text-black Montserrat tracking-widest text-sm">
                                          {/* workingEra */}
                                          <span className="uppercase">
                                            {formattedDate(
                                              my_resumes.updated_at
                                            )}
                                          </span>
                                        </div>
                                      </div>
                                      <div className=" dd_btn3 relative rounded-[25px] w-full my-4 h-[370px] sm:h-[450px] overflow-hidden shadow-inner-custom">
                                        <img
                                          src={
                                            Resume_images[
                                            my_resumes.template_id - 1
                                            ]
                                          }
                                        />
                                        <div className="shadow-inner-custom">
                                          <div style={{ display: "none" }}>
                                            <PrintableComponent
                                              chk={1}
                                              template_id={
                                                my_resumes.template_id
                                              }
                                              doc_id={my_resumes.id}
                                              uuid={my_resumes.uuid}
                                              dummy={0}
                                              ref={(ref) =>
                                              (componentRefs.current[
                                                index_my_resumes
                                              ] = ref)
                                              }
                                              {...my_resumes}
                                            />
                                          </div>
                                        </div>
                                        <div className="hidden dd_menu3 bg-[rgba(0,0,0,0.3)] absolute left-0 top-0 w-full h-full justify-evenly items-end p-2 ">
                                          <div
                                            onClick={(e) =>
                                              edit_now(
                                                my_resumes.id,
                                                my_resumes.uuid,
                                                "Resume"
                                              )
                                            }
                                            className="absolute box shadow-lg rounded-full py-2 cursor-pointer Montserrat text-sm bg-[#01B2AC] hover:bg-[#0072b1] text-white w-[35%] lg:w-[25%] flex justify-center items-center flex-wrap"
                                          >
                                            <div className="flex justify-center items-center bg-[#fff] rounded-full mr-2 w-[30px] h-[30px]">
                                              <BiEditAlt
                                                className="text-[#01B2AC]"
                                                size={20}
                                              />
                                            </div>
                                            Edit
                                          </div>
                                        </div>
                                      </div>

                                      <div className="flex items-center justify-center gap-16 w-full">
                                        <div
                                          className="cursor-pointer Montserrat py-2 flex justify-start font-semibold items-center text-black hover:text-black text-sm"
                                          onClick={(e) =>
                                            duplicate_document(
                                              my_resumes.template_id,
                                              my_resumes.uuid,
                                              "Resume",
                                              my_resumes.resume_name
                                            )
                                          }
                                        >
                                          <BiDuplicate
                                            className="mr-2"
                                            size={18}
                                          />{" "}
                                          Duplicate
                                        </div>
                                        <div
                                          className="cursor-pointer Montserrat py-2 flex justify-start font-semibold items-center text-black hover:text-black text-sm"
                                          onClick={(e) =>
                                            delete_document(
                                              my_resumes.template_id,
                                              my_resumes.uuid,
                                              "Resume",
                                              my_resumes.resume_name
                                            )
                                          }
                                        >
                                          <SlTrash className="mr-2" size={18} />{" "}
                                          Delete
                                        </div>
                                      </div>
                                    </div>
                                  ))
                              )}
                            </div>
                            {ResumesToShow < my_resumes.length && (
                              <div className="w-full flex items-center justify-center mt-[40px]">
                                <button
                                  onClick={handleResumesToShow}
                                  className="text-white rounded-2xl font-semibold px-4 py-2 bg-[#0072B1] text-md hover:text-white hover:bg-[#01B2AC]"
                                >
                                  Load More
                                </button>
                              </div>
                            )}
                          </>
                        )}
                      </>
                    }
                  </div>
                </div>
              </Tab.Panel>

              {/* for coverletter */}
              <Tab.Panel>
                <div className="flex-1 mb-4 ">
                  <span className="font-bold font-montserrat text-[#0072b1] text-xl md:text-[25px] mb-6 lg:px-5 py-5">
                    My Cover Letter ({my_coverletters.length})
                  </span>
                </div>
                <div className="flex justify-end items-start flex-wrap mb-6   bg-transparent border-2 rounded-3xl overflow-hidden py-8 lg:px-12 m-auto shadow-blur">
                  <div className="w-full flex justify-center items-center flex-wrap mb-10">
                    {
                      <>
                        {cover_loading === 0 ? (
                          <>
                            <div className="flex justify-evenly  items-center flex-wrap m-4 ">
                              <div className="w-full text-center flex justify-center items-center ">
                                <div className="dd_btn3 relative rounded-[25px]  my-4 h-[400px] w-[400px] overflow-hidden mx-3">
                                  <Skeleton className="h-[100%] " />
                                </div>
                                <div className=" dd_btn3 relative rounded-[25px]  w-[400px] my-4 h-[400px] overflow-hidden mx-3 ">
                                  <Skeleton className="h-[100%]" />
                                </div>
                                <div className="lg:block hidden dd_btn3 relative rounded-[25px]  w-[400px] my-4 h-[400px] overflow-hidden mx-3 ">
                                  <Skeleton className="h-[100%]" />
                                </div>
                                <div className="xl:block hidden dd_btn3 relative rounded-[25px] my-4 w-[400px] h-[400px] overflow-hidden mx-3 ">
                                  <Skeleton className="h-[100%]" />
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex justify-center flex-wrap items-center w-full">
                              {my_coverletters.length === 0 ? (
                                cover_loading === 1 ? (
                                  <div className="w-full text-center font_1 text-2xl my-20">
                                    COVER LETTER NOT FOUND
                                  </div>
                                ) : (
                                  ""
                                )
                              ) : (
                                my_coverletters
                                  .slice(0, CoverToShow)
                                  .map(
                                    (
                                      my_coverletters,
                                      index_my_coverletters
                                    ) => (
                                      <div
                                        key={index_my_coverletters}
                                        className="w-full md:w-[45%] lg:w-[40%] xl:[30%] 2xl:w-[22%] flex justify-between items-center flex-wrap m-8 md:m-[22px]"
                                      >
                                        <div className="w-full flex items-center justify-center gap-10">
                                          <div
                                            className="Montserrat font-semibold text-[#0072b1] break-all text-sm rounded-md "
                                            onClick={(e) =>
                                              rename_document(
                                                my_coverletters.cover_template_id,
                                                my_coverletters.id,
                                                "Cover Letter",
                                                my_coverletters.name
                                              )
                                            }
                                          >
                                            {my_coverletters.name}
                                          </div>
                                          <div className="text-black Montserrat tracking-widest text-sm">
                                            <span className="uppercase">
                                              {formattedDate(
                                                my_coverletters.updated_at
                                              )}
                                            </span>
                                          </div>
                                        </div>

                                        <div className="dd_btn3 relative rounded-[25px] w-full my-4  h-[370px] sm:h-[450px] overflow-hidden shadow-inner-custom">
                                          <img
                                            src={
                                              cover_images[
                                              my_coverletters.cover_template_id -
                                              1
                                              ]
                                            }
                                          />
                                          <div
                                            className=""
                                            style={
                                              isMobile
                                                ? {
                                                  transform: "scale(50%)",
                                                  width: "200%",
                                                  transformOrigin: "top left",
                                                }
                                                : {
                                                  transform: "scale(60%)",
                                                  width: "165%",
                                                  transformOrigin: "top left",
                                                }
                                            }
                                          >
                                            <div style={{ display: "none" }}>
                                              <PrintableComponent
                                                chk={2}
                                                template_id={
                                                  my_coverletters.cover_template_id
                                                }
                                                doc_id={my_coverletters.id}
                                                uuid={my_coverletters.cover_id}
                                                dummy={0}
                                                ref={(ref) =>
                                                (componentRefss.current[
                                                  index_my_coverletters
                                                ] = ref)
                                                }
                                                {...my_coverletters}
                                              />
                                            </div>
                                          </div>
                                          <div className="hidden dd_menu3 bg-[rgba(0,0,0,0.3)] absolute left-0 top-0 w-full h-full justify-evenly items-end p-2 ">
                                            <div
                                              onClick={(e) =>
                                                edit_now(
                                                  my_coverletters.id,
                                                  0,
                                                  "cover"
                                                )
                                              }
                                              className="absolute box shadow-lg rounded-full py-2 cursor-pointer Montserrat text-sm bg-[#01B2AC] hover:bg-[#0072b1] text-white w-[35%] lg:w-[25%] flex justify-center items-center flex-wrap"
                                            >
                                              <div className="flex justify-center items-center bg-[#fff] rounded-full mr-2 w-[30px] h-[30px] ">
                                                <BiEditAlt
                                                  className="text-[#01B2AC]"
                                                  size={20}
                                                />
                                              </div>
                                              Edit
                                            </div>
                                          </div>
                                        </div>

                                        <div className="w-full flex items-center justify-center gap-16">
                                          <div
                                            className="cursor-pointer Montserrat py-2 flex justify-start font-semibold items-center text-black hover:text-black text-sm"
                                            onClick={(e) =>
                                              duplicate_document(
                                                my_coverletters.cover_template_id,
                                                my_coverletters.id,
                                                "Cover Letter",
                                                my_coverletters.name
                                              )
                                            }
                                          >
                                            <BiDuplicate
                                              className="mr-2"
                                              size={18}
                                            />{" "}
                                            Duplicate
                                          </div>
                                          <div
                                            className="cursor-pointer Montserrat py-2 flex justify-start font-semibold items-center text-black hover:text-black text-sm"
                                            onClick={(e) =>
                                              delete_document(
                                                my_coverletters.cover_template_id,
                                                my_coverletters.id,
                                                "Cover Letter",
                                                my_coverletters.name
                                              )
                                            }
                                          >
                                            <SlTrash
                                              className="mr-2"
                                              size={18}
                                            />{" "}
                                            Delete
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  )
                              )}
                            </div>
                            {CoverToShow < my_coverletters.length && (
                              <div className="w-full flex items-center justify-center pb-4 mt-[40px]">
                                <button
                                  onClick={handleCoverToShow}
                                  className="text-white rounded-2xl font-semibold px-4 py-2 bg-[#0072B1] text-md hover:text-white hover:bg-[#01B2AC]"
                                >
                                  Load More
                                </button>
                              </div>
                            )}
                          </>
                        )}
                      </>
                    }
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </section>
  );
};

export default Header;
