import React, { useEffect, useState, useRef, Suspense } from "react";
import Logo from "../assets/images/logo_resume.webp";
import { RxHamburgerMenu } from "react-icons/rx";
import $ from "jquery";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { IoIosArrowUp } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import Cookies from "js-cookie";
import jsPDF from "jspdf";
import { useNavigate, useLocation } from "react-router-dom";
import swal from "sweetalert";
import { useAuth } from "../services/Auth";
import ActiveTemplate from "./ActiveTemplate";
import premium from "../assets/images/premium.webp";
import {
  BiBookContent,
  BiFontFamily,
  BiLoaderAlt,
  BiUpload,
  BiX,
} from "react-icons/bi";
import { HiOutlineSwitchHorizontal, HiOutlineDuplicate } from "react-icons/hi";
import { LuPaintbrush, LuShare2 } from "react-icons/lu";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FiDownload } from "react-icons/fi";
import { TfiEmail } from "react-icons/tfi";
import { RxTrash } from "react-icons/rx";
import { domToPng } from "modern-screenshot";
import { IoIosArrowBack } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
// ~ new Imports
import { ApiService } from "../services/ApiService";
import Themes from "./themes/Themes";
import Fonts from "./themes/Fonts";
import { useForm, Controller } from "react-hook-form";
import { HiClipboardCheck } from "react-icons/hi";
import { useReactToPrint } from "react-to-print";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Slider,
  Autocomplete,
} from "@mui/material";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { LiaFileSignatureSolid, LiaTimesSolid } from "react-icons/lia";
import citiesJson from "../data/cities.json";
import StatesJson from "../data/states.json";
import ReactSignatureCanvas from "react-signature-canvas";
import SpinnerLoader from "../components/shared-components/spinnerloader/SpinnerLoader";
import { Tab } from "@headlessui/react";
import { FcSignature } from "react-icons/fc";
import SideNav from "../components/shared-components/SideNav";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import Capture1 from "../assets/images/cover_tour_steps/1.gif";
import Capture2 from "../assets/images/cover_tour_steps/Signature.gif";
import Capture3 from "../assets/images/cover_tour_steps/Template_Selection.gif";
import Capture4 from "../assets/images/cover_tour_steps/Formatting.gif";
import Capture5 from "../assets/images/cover_tour_steps/Theme_Selection.gif";
import Capture6 from "../assets/images/cover_tour_steps/download.gif";

import Template_16 from "../assets/images/cover_template_images/template_16.webp";
import Template_17 from "../assets/images/cover_template_images/template_17.webp";
import Template_18 from "../assets/images/cover_template_images/template_18.webp";
import Template_19 from "../assets/images/cover_template_images/template_19.webp";
import Template_20 from "../assets/images/cover_template_images/template_20.webp";
import Template_21 from "../assets/images/cover_template_images/template_21.webp";
import Template_22 from "../assets/images/cover_template_images/template_22.webp";
import Template_23 from "../assets/images/cover_template_images/template_23.webp";
import Template_24 from "../assets/images/cover_template_images/template_24.webp";
import Template_25 from "../assets/images/cover_template_images/template_25.webp";
import Template_26 from "../assets/images/cover_template_images/template_26.webp";
import Template_27 from "../assets/images/cover_template_images/template_27.webp";
import Template_28 from "../assets/images/cover_template_images/template_28.webp";
import Template_29 from "../assets/images/cover_template_images/template_29.webp";
import Template_30 from "../assets/images/cover_template_images/template_30.webp";
import { Helmet } from "react-helmet";

const Header = () => {
  const { user } = useAuth();
  const location = useLocation();
  const selectedTemplateId = location.state.selectedTemplateId;
  const editAbleCoverId = location.state.editAbleCoverId;
  // if it's Example trying
  const isExample = location.state.isExample;
  const exampleId = location.state.exampleId;
  const newTemplates = [
    { id: 16, name: "Template 16", image: Template_16 },
    { id: 17, name: "Template 17", image: Template_17 },
    { id: 18, name: "Template 18", image: Template_18 },
    { id: 19, name: "Template 19", image: Template_19 },
    { id: 20, name: "Template 20", image: Template_20 },
    { id: 21, name: "Template 21", image: Template_21 },
    { id: 22, name: "Template 22", image: Template_22 },
    { id: 23, name: "Template 23", image: Template_23 },
    { id: 24, name: "Template 24", image: Template_24 },
    { id: 25, name: "Template 25", image: Template_25 },
    { id: 26, name: "Template 26", image: Template_26 },
    { id: 27, name: "Template 27", image: Template_27 },
    { id: 28, name: "Template 28", image: Template_28 },
    { id: 29, name: "Template 29", image: Template_29 },
    { id: 30, name: "Template 30", image: Template_30 },
  ];
  const [file2, setFile2] = useState(null);
  const [file, setFile] = useState("");

  const [email_share, set_email_share] = useState("");

  const [checbox_share, set_checbox_share] = useState(false);
  const [check_download_tour, set_check_download_tour] = useState(false);

  const [my_coverletters, set_my_coverletters] = useState([]);

  const [my_resumes, set_my_resumes] = useState([]);
  const doc_uuid = global.getCookie("doc_uuid");
  const profile_id = Cookies.get("profile_id");

  const [selectedOption, setSelectedOption] = useState("pdf");
  const [copyText, setCopyText] = useState("");
  const handleCopyClick = () => {
    const textToCopy =
      global.localPath + "share/" + coverData.id + "?share=coverletter";
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopyText(textToCopy);

        swal({
          title: "Congratulations!",
          text: "Copied to clipboard",
          icon: "success",
        });
      })
      .catch((error) => {
        console.error("Failed to copy text:", error);
      });
  };

  const share_email = () => {
    if (email_share === "") {
      swal("Error!", "Email Address required", "error");
    } else if (
      email_share.indexOf("@") === -1 ||
      email_share.indexOf(".") === -1
    ) {
      swal("Error!", "Please Enter a Valid Email", "error");
    } else {
      $("#email_loader").css("display", "flex");
      $("#email_button").css("display", "none");
      const article = {
        link: global.localPath + "share/" + coverData.id + "?share=coverletter",
        email: email_share,
        type: "cover letter",
      };

      const headers = {
        Authorization: "Bearer " + user?.token,
        "Access-Control-Allow-Origin": "*",
      };
      axios
        .post(global.baseurl + "/share", article, { headers })
        .then((data) => {
          if (data) {
            set_email_share("");
            $("#email_loader").css("display", "none");
            $("#email_button").css("display", "flex");
            $("#email_modelbox").fadeOut(300);
            swal("Success!", "Email Sent Successfully", "success");
          }
        })
        .catch((err) => {
          $("#email_loader").css("display", "none");
          $("#email_button").css("display", "flex");
          $("#email_modelbox").fadeOut(300);
          swal("Error!", "Email Not Send Try Again", "error");
          console.log(err);
        });
    }
  };

  const download_email = () => {
    $("#email_modelbox").fadeIn(300);
    $("#share_doc_modelbox").fadeOut(300);
  };

  const download_email_close = () => {
    $("#download_email_modelbox").fadeOut(300);
  };

  const share_doc = async () => {
    $("#share_doc_modelbox").fadeIn(300);
    setFile(global.localPath + "share/" + coverData.id + "?share=coverletter");
    // console.log(
    //   global.localPath + "share/" + my_resumes.id + "?share=coverletter"
    // );
    //http://localhost:3000/demo/share/my_resumes.id?share=resume
    //console.log(file2);
  };

  const share_doc2_close = () => {
    $("#share_doc_modelbox_file").fadeOut(300);
  };

  const share_doc3 = async () => {
    //$('#share_doc_modelbox_file').fadeIn(300);
    // console.log(file2);
  };

  const share_doc2 = async () => {
    if (file2 === null || file2 === undefined || file2 === "") {
      swal("Error!", "Share File Not Attached", "error");
    } else {
      $("#share_doc_modelbox_file").fadeOut(300);
      $("#share_doc_modelbox_load").fadeIn(300);

      const token = global.getCookie("token");
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
            // console.log(data.data.path);
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

  const download_document = async (template_id) => {
    var temp_id = $("#temp_id").html();
    var doc_id = $("#doc_id").html();
    var name_txt = $("#name_txt").val();

    if (name_txt === "") {
      $("#name_txt").removeClass("border-slate-300");
      $("#name_txt").addClass("border-red-500");
    } else {
      const checkNumbers = /^[0-9]+(\s+[0-9]+)*$/.test(name_txt);
      var containsSpaces = name_txt.includes(" ");

      // If not valid, prevent form submission and show an error message
      if (containsSpaces || checkNumbers) {
        $("#name_txt").removeClass("border-slate-300");
        $("#name_txt").addClass("border-red-500");
      } else {
        $("#name_txt").removeClass("border-red-500");
        $("#name_txt").addClass("border-slate-300");

        if (selectedOption === "pdf") {
          document.getElementById(
            "print-content-" + template_id + "_" + doc_id
          ).style.width = "793px";
          document.getElementById(
            "print-content-" + template_id + "_" + doc_id
          ).style.minHeight = "1150px";
          const input = document.getElementById(
            "print-content-" + template_id + "_" + doc_id
          );

          const pdf = new jsPDF();

          // Set a threshold for the maximum height of content on a single page
          const maxPageHeight = 1150;

          const totalHeight = input.clientHeight;

          // Calculate the number of pages needed
          const totalPages = Math.ceil(totalHeight / maxPageHeight);

          // Loop through the pages and add content to each page
          for (let page = 0; page < totalPages; page++) {
            // Calculate the visible height for the current page
            const start = page * maxPageHeight;
            const end = start + maxPageHeight;
            const visibleHeight = Math.min(maxPageHeight, totalHeight - start);

            // Use html2canvas to convert the HTML element to an image for the current page
            await html2canvas(input, {
              useCORS: true,
              scale: 1,
              windowWidth: input.scrollWidth,
              windowHeight: visibleHeight,
              width: input.scrollWidth,
              height: visibleHeight,
              y: start,
            }).then((canvas) => {
              // Convert the canvas to an image
              const imgData = canvas.toDataURL("image/png");

              // Add a new page
              if (page > 0) {
                pdf.addPage();
              }

              // Add the image to the PDF without scaling
              pdf.addImage(imgData, "PNG", 0, 0);

              // You can add additional content to each page here if needed
              // For example:
              // pdf.text(20, 20, `Page ${page + 1} Content`);
            });
          }

          // Save the PDF
          pdf.save(`${name_txt}.pdf`);

          document.getElementById(
            "print-content-" + template_id + "_" + doc_id
          ).style.width = "100%";
          document.getElementById(
            "print-content-" + template_id + "_" + doc_id
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
            document.getElementById(
              "print-content-" + template_id + "_" + doc_id
            ).innerHTML +
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

  const email_document = async (template_id) => {
    var temp_id = $("#temp_id").html();
    var doc_id = $("#doc_id").html();
    var name_txt = $("#name_txt").val();
    var doc_name = $("#doc_name").html();
    document.getElementById("loader_get").style.display = "none";
    document.getElementById("loader").style.display = "flex";

    if (name_txt === "") {
      $("#name_txt").removeClass("border-slate-300");
      $("#name_txt").addClass("border-red-500");
    } else {
      const checkNumbers = /^[0-9]+(\s+[0-9]+)*$/.test(name_txt);
      var containsSpaces = name_txt.includes(" ");

      // If not valid, prevent form submission and show an error message
      if (containsSpaces || checkNumbers) {
        $("#name_txt").removeClass("border-slate-300");
        $("#name_txt").addClass("border-red-500");
      } else {
        $("#name_txt").removeClass("border-red-500");
        $("#name_txt").addClass("border-slate-300");

        if (doc_name === "Resume") {
          if (selectedOption === "pdf") {
            document.getElementById(
              "print-content-" + template_id + "_" + doc_id
            ).style.width = "793px";
            document.getElementById(
              "print-content-" + template_id + "_" + doc_id
            ).style.minHeight = "1150px";
            const input = document.getElementById(
              "print-content-" + template_id + "_" + doc_id
            );

            const pdf = new jsPDF();

            // Set a threshold for the maximum height of content on a single page
            const maxPageHeight = 1150;

            const totalHeight = input.clientHeight;

            // Calculate the number of pages needed
            const totalPages = Math.ceil(totalHeight / maxPageHeight);

            // Loop through the pages and add content to each page
            for (let page = 0; page < totalPages; page++) {
              // Calculate the visible height for the current page
              const start = page * maxPageHeight;
              const end = start + maxPageHeight;
              const visibleHeight = Math.min(
                maxPageHeight,
                totalHeight - start
              );

              // Use html2canvas to convert the HTML element to an image for the current page
              await html2canvas(input, {
                useCORS: true,
                scale: 1,
                windowWidth: input.scrollWidth,
                windowHeight: visibleHeight,
                width: input.scrollWidth,
                height: visibleHeight,
                y: start,
              }).then((canvas) => {
                // Convert the canvas to an image
                const imgData = canvas.toDataURL("image/png");

                // Add a new page
                if (page > 0) {
                  pdf.addPage();
                }

                // Add the image to the PDF without scaling
                pdf.addImage(imgData, "PNG", 0, 0);

                // Generate a Blob from the PDF data
                const blob = pdf.output("blob");
                const my_file = new File([blob], name_txt + ".pdf", {
                  type: "application/pdf",
                });
                const token = global.getCookie("token");
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
                    document.getElementById("loader_get").style.display =
                      "flex";
                    document.getElementById("loader").style.display = "none";
                  });

                // You can add additional content to each page here if needed
                // For example:
                // pdf.text(20, 20, `Page ${page + 1} Content`);
              });
            }

            document.getElementById(
              "print-content-" + template_id + "_" + doc_id
            ).style.width = "100%";
            document.getElementById(
              "print-content-" + template_id + "_" + doc_id
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
              document.getElementById(
                "print-content-" + template_id + "_" + doc_id
              ).innerHTML +
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

            const token = global.getCookie("token");
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
              "print-content-" + template_id + "_" + doc_id
            ).style.width = "793px";
            document.getElementById(
              "print-content-" + template_id + "_" + doc_id
            ).style.minHeight = "1150px";
            const input = document.getElementById(
              "print-content-" + template_id + "_" + doc_id
            );

            const pdf = new jsPDF();

            // Set a threshold for the maximum height of content on a single page
            const maxPageHeight = 1150;

            const totalHeight = input.clientHeight;

            // Calculate the number of pages needed
            const totalPages = Math.ceil(totalHeight / maxPageHeight);

            // Loop through the pages and add content to each page
            for (let page = 0; page < totalPages; page++) {
              // Calculate the visible height for the current page
              const start = page * maxPageHeight;
              const end = start + maxPageHeight;
              const visibleHeight = Math.min(
                maxPageHeight,
                totalHeight - start
              );

              // Use html2canvas to convert the HTML element to an image for the current page
              await html2canvas(input, {
                useCORS: true,
                scale: 1,
                windowWidth: input.scrollWidth,
                windowHeight: visibleHeight,
                width: input.scrollWidth,
                height: visibleHeight,
                y: start,
              }).then((canvas) => {
                // Convert the canvas to an image
                const imgData = canvas.toDataURL("image/png");

                // Add a new page
                if (page > 0) {
                  pdf.addPage();
                }

                // Add the image to the PDF without scaling
                pdf.addImage(imgData, "PNG", 0, 0);

                // Generate a Blob from the PDF data
                const blob = pdf.output("blob");
                const my_file = new File([blob], name_txt + ".pdf", {
                  type: "application/pdf",
                });

                const token = global.getCookie("token");
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
                    document.getElementById("loader_get").style.display =
                      "flex";
                    document.getElementById("loader").style.display = "none";
                  });

                // You can add additional content to each page here if needed
                // For example:
                // pdf.text(20, 20, `Page ${page + 1} Content`);
              });
            }

            document.getElementById(
              "print-content-" + template_id + "_" + doc_id
            ).style.width = "100%";
            document.getElementById(
              "print-content-" + template_id + "_" + doc_id
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
              document.getElementById(
                "print-content-" + template_id + "_" + doc_id
              ).innerHTML +
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

            const token = global.getCookie("token");
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
  const duplicate_delete_document = (e, temp_id, uuid, name, doc_name) => {
    if (e === "duplicate") {
      $("#temp_id").html(temp_id);
      $("#doc_id").html(uuid);
      $("#doc_name").html(name);
      $(".name_label").html(name);
      swal({
        title: "Duplicate File",
        text:
          "Are you sure you want to duplicate the " + coverData.name + " File?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          const token = global.getCookie("token");
          const headers = {
            Authorization: "Bearer " + user?.token,
            "Content-type": "multipart/form-data",
          };

          //COVER LETTER DUPLICATE
          axios
            .get(global.baseurl + "/duplicate-cover/" + coverData.id, {
              headers,
            })
            .then((data) => {
              if (data) {
                swal(
                  "Done! Your " +
                  coverData.name +
                  " File Successfully Duplicated!",
                  {
                    icon: "success",
                  }
                );
              }
            })
            .catch((err) => {
              console.log(err);
              swal("Error!", "Something Wrong", "error");
            });
        } else {
          swal("Your " + coverData.name + " File Not Duplicated!");
        }
      });
    } else if (e === "rename") {
      $("#temp_id").html(temp_id);
      $("#doc_id").html(uuid);
      $("#coverData.name").html(coverData.name);
      $(".name_label").html(name);

      swal("Please Enter a New File Name For " + coverData.name, {
        title: "Rename " + coverData.name,
        buttons: true,
        content: "input",
      }).then((value) => {
        if (value) {
          swal({
            title: "Rename " + coverData.name,
            text: "Are you sure to Rename " + coverData.name + " to " + value,
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete) {
              //const token=global.getCookie('token');
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
                  .post(
                    global.baseurl + "/rename_resume/" + coverData.id,
                    article,
                    {
                      headers,
                    }
                  )
                  .then((data) => {
                    if (data) {
                      swal(
                        "Done! Your " +
                        coverData.name +
                        " File Successfully Renamed!",
                        {
                          icon: "success",
                        }
                      );
                      reloadCoverData();
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
                  .post(
                    global.baseurl + "/rename_cover/" + coverData.id,
                    article,
                    {
                      headers,
                    }
                  )
                  .then((data) => {
                    if (data) {
                      swal(
                        "Done! Your " +
                        coverData.name +
                        " File Successfully Renamed!",
                        {
                          icon: "success",
                        }
                      );
                      reloadCoverData();
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                    swal("Error!", "Something Wrong", "error");
                  });
              }
            } else {
              swal("Your " + coverData.name + " File Not Renamed!");
            }
          });
        } else {
          swal("Your " + coverData.name + " File Not Renamed!");
        }
      });
    } else {
      // FOR DELETE
      $("#temp_id").html(temp_id);
      $("#doc_id").html(uuid);
      $("#coverData.name").html(coverData.name);
      $(".name_label").html(name);
      swal({
        title: "Delete File",
        text: "Are you sure you want to delete " + coverData.name + " file?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          const token = global.getCookie("token");
          const headers = {
            Authorization: "Bearer " + user?.token,
            "Content-type": "multipart/form-data",
          };

          //COVER LETTER DELETE
          axios
            .delete(global.baseurl + "/cover_letters/" + coverData.id, {
              headers,
            })
            .then((data) => {
              if (data) {
                swal("Done! Your File Successfully Deleted!", {
                  icon: "success",
                });
                setTimeout(() => {
                  window.location.href = global.localPath + "dashboard";
                }, 2000);
              }
            })
            .catch((err) => {
              console.log(err);
              swal("Error!", "Something Wrong", "error");
            });
        } else {
          swal("Your File Not Deleted!");
        }
      });
    }

    $("#more_options").val("");
  };

  const rename_document = (temp_id, uuid, name, doc_name) => {
    $("#temp_id").html(temp_id);
    $("#doc_id").html(uuid);
    $("#coverData.name").html(name);
    $(".name_label").html(name);

    swal("Please Enter a New File Name For " + coverData.name, {
      title: "Rename " + name,
      buttons: true,
      content: "input",
    }).then((value) => {
      if (value) {
        swal({
          title: "Rename " + name,
          text: "Are you sure to Rename " + coverData.name + " to " + value,
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            const token = global.getCookie("token");
            const headers = {
              Authorization: "Bearer " + user?.token,
              "Content-type": "multipart/form-data",
            };

            //COVER LETTER RENAME
            const article = {
              name: value,
            };
            axios
              .post(global.baseurl + "/rename_cover/" + uuid, article, {
                headers,
              })
              .then((data) => {
                if (data) {
                  swal(
                    "Done! Your " +
                    coverData.name +
                    " File Successfully Renamed!",
                    {
                      icon: "success",
                    }
                  );

                  axios
                    .get(global.baseurl + "/cover_letters/" + profile_id, {
                      headers,
                    })
                    .then((data) => {
                      if (data) {
                        set_my_resumes(data.data.data);
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
          } else {
            swal("Your " + coverData.name + " File Not Renamed!");
          }
        });
      } else {
        swal("Your " + coverData.name + " File Not Renamed!");
      }
    });
  };

  // ! newCode

  const {
    formState: { errors },
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
  } = useForm({
    defaultValues: {
      state: "",
      city: "",
      country_id: "",
    },
    mode: "onChange",
  });

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [jobPostions, setJobPositions] = useState([]);
  const [user3, setUser] = useState([]);
  const [openerSuggestion, setOpenerSuggestion] = useState([]);
  const [closerSuggestion, setCloserSuggestion] = useState([]);
  useEffect(() => {
    ApiService.getResumeExamplesSuggest(user?.token)
      .then((res) => {
        setCountries(res.data.data.countries);

        setJobPositions(res.data.data.job_positions);
      })
      .catch((err) => console.log(err));

    ApiService.getOpenerRecommends()
      .then((res) => {
        setOpenerSuggestion(res.data.data);
      })
      .catch((err) => console.log(err));

    ApiService.getCloserRecommends()
      .then((res) => {
        setCloserSuggestion(res.data.data);
      })
      .catch((err) => console.log(err));

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

  // set All Cities
  const cityNameValue = watch("city");
  useEffect(() => {
    if (cityNameValue) {
      handleInputChange(cityNameValue);
    }
  }, [cityNameValue]);
  const handleInputChange = (value) => {
    if (value.length >= 3) {
      // Create a set to store unique city names
      const uniqueCityNames = new Set();

      // Filter cities and remove duplicates
      const filteredOptions = citiesJson.filter((city) => {
        const cityName = city.name.toLowerCase();
        if (
          cityName.includes(value.toLowerCase()) &&
          !uniqueCityNames.has(cityName)
        ) {
          uniqueCityNames.add(cityName);
          return true;
        }
        return false;
      });

      setCities(filteredOptions);
    } else {
      setCities([]);
    }
  };

  // All States
  const stateNameValue = watch("state");
  useEffect(() => {
    if (stateNameValue) {
      handleInputState(stateNameValue);
    }
  }, [stateNameValue]);

  const handleInputState = (value) => {
    if (value.length >= 3) {
      // Create a set to store unique city names
      const uniqueStateName = new Set();

      // Filter cities and remove duplicates
      const filteredOptions = StatesJson.filter((state) => {
        const stateName = state.name.toLowerCase();
        if (
          stateName.includes(value.toLowerCase()) &&
          !uniqueStateName.has(stateName)
        ) {
          uniqueStateName.add(stateName);
          return true;
        }
        return false;
      });

      setAllStates(filteredOptions);
    } else {
      setAllStates([]);
    }
  };

  // +++activethings
  const [activeTemplate, setActiveTemplate] = useState(0);
  const [paidTemplate, setPaidTemplate] = useState(0);
  const [activeTheme, setActiveTheme] = useState("");
  const [activeFont, setActiveFont] = useState("");
  const [activeFontSize, setActiveFontSize] = useState("");
  // ! tool bar

  const [formOpen, setFormOpen] = useState(false);
  const [MobBtns, setMobBtns] = useState(false);
  const [activeToolBarTab, setActiveToolBarTab] = useState(0);
  const [toolbarResumeTabsOpen, setToolbarResumeTabsOpen] = useState(false);
  const toolbarResumeTabs = [
    { id: 1, name: "Cover Section", icon: <BiBookContent /> },
    { id: 2, name: "Signature", icon: <LiaFileSignatureSolid /> },
    { id: 3, name: "Switch To Template", icon: <HiOutlineSwitchHorizontal /> },
    { id: 4, name: "Font Style", icon: <BiFontFamily /> },
    { id: 5, name: "Theme", icon: <LuPaintbrush /> },
  ];
  useEffect(() => {
    const headers = {
      Authorization: "Bearer " + user?.token,
    };
    axios
      .get(global.baseurl + "/cover_letters", { headers })
      .then((data) => {
        if (data) {
          if (data.data.data.length <= 1) {
            setTimeout(() => {
              if (window.innerWidth >= 768) {
                const driverObj = driver({
                  showProgress: true,
                  steps: [
                    {
                      element: "#tab_0",
                      popover: {
                        title:
                          "<h3 style='font-size: 20px;'>Welcome to Cover Letter builder tool.<h3>",
                        description: `<div style='font-size: 18px;'>Enter all the necessary details that will appear on your cover letter. This step ensures your cover letter is complete with all the information employers need.</div>
                        <img src=${Capture1} alt="Page Header" style="width: 100%" />
                        `,
                      },
                    },
                    {
                      element: "#tab_2",
                      popover: {
                        title:
                          "<h3 style='font-size: 20px;'>Add Signature to your Cover Letter.<div>",
                        description: `<div style='font-size: 18px;'>Add a personal touch with your signature. You can draw it, type it, or upload a picture of your signature.</div>
                         <img src=${Capture2} alt="Page Header" style="width: 100%" />`,
                      },
                    },
                    {
                      element: "#tab_3",
                      popover: {
                        title:
                          "<h3 style='font-size: 20px;'>Template Switching.</div>",
                        description: `<div style='font-size: 18px;'>Try different cover letter templates to find the one you like best. Pick a design that makes your cover letter look great.<div>
                         <img src=${Capture3} alt="Page Header" style="width: 100%" />`,
                      },
                    },
                    {
                      element: "#tab_4",
                      popover: {
                        title: "<h3 style='font-size: 20px;'>Formatting</div>",
                        description: `<div style='font-size: 18px;'>Change the font size and style to make your cover letter look right. Choose options that are easy to read and look good.</div> 
                        <img src=${Capture4} alt="Page Header" style="width: 100%" />`,
                      },
                    },
                    {
                      element: "#tab_5",
                      popover: {
                        title:
                          "<h3 style='font-size: 20px;'>Theme Selection</div>",
                        description: `<div style='font-size: 18px;'>Choose a theme to give your cover letter a personal look. Pick colors and styles that match your personality and professional image.</div> 
                        <img src=${Capture5} alt="Page Header" style="width: 100%" />`,
                      },
                    },

                    {
                      element: "#downloadpdf",
                      popover: {
                        title:
                          "<h3 style='font-size: 20px;'>Download your cover letter</h3>",
                        description: `<div style='font-size: 18px;'>Save your cover letter as a PDF. Make sure any custom scale settings are set to default before saving. You can also print your cover letter directly by clicking the print option to get a hard copy.</div>
                         <img src=${Capture6} alt="Page Header" style="width: 100%" />`,
                      },
                    },
                  ],
                });
                driverObj.drive();
              }
            }, 1000); // 2000 ms = 2 seconds delay
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [coverTemplatesListing, setCoverTemplatesListing] = useState([]);

  useEffect(() => {
    ApiService.getCoverTemplatesListingUser(user?.token)
      .then((res) => {
        setCoverTemplatesListing(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const closeOpenForms = () => {
    setFormOpen(false);
    setActiveForm("");
  };

  const [activeForm, setActiveForm] = useState("");

  // New Code

  const [coverData, setCoverData] = useState({
    id: 0,
    user_id: 0,
    name: "",
    first_name: "",
    last_name: "",
    contact_person_name: "",
    contact_person_designation: "",
    contact_person_email: "",
    contact_person_phone: "",
    company_name: "",
    company_address: "",
    cover_template_id: "",
    phone_number: "",
    email_address: "",
    street_address: "",
    country_id: "",
    state: "",
    city: "",
    zip_code: "",
    experience: "",
    job_title: "",
    employeer_name: "",
    opener_detail: "",
    closer_detail: "",
    date: new Date(),
    country_name: "",
    show_personal_information: 0,
  });

  const reloadCoverData = () => {
    const freshCoverId = Cookies.get("freshCoverId");

    const newExampleCoverId = Cookies.get("newExampleCoverId");

    if (selectedTemplateId && freshCoverId === undefined) {
      function splitName(fullName) {
        const nameParts = fullName.trim().split(" ");

        let firstName = nameParts[0] || null;
        let lastName =
          nameParts.length > 1 ? nameParts.slice(1).join(" ") : null;

        return { firstName, lastName };
      }

      const fullName = user?.name;
      const { firstName, lastName } = splitName(fullName);

      const createCoverData = {
        first_name: firstName,
        last_name: lastName ? lastName : "",
        country_id: 0,
        email_address: user?.email,
        contact_person_email: "youremailexample@gmail.com",
        contact_person_designation: "",
        contact_person_name: "",
        contact_person_phone: "",
        company_address: "",
        phone_number: "",
        street_address: "",
        state: "",
        city: "",
        zip_code: "",
        experience: 0,
        job_title: "",
        employeer_name: "",
        opener_detail: "",
        closer_detail: "",
        show_personal_information: 1,
      };

      ApiService.coverLetterDataStore(
        user?.token,
        createCoverData,
        selectedTemplateId
      )
        .then((res) => {
          console.log(res.data.data);
          setActiveTemplate(selectedTemplateId);

          const {
            id,
            user_id,
            name,
            first_name,
            last_name,
            contact_person_name,
            contact_person_designation,
            contact_person_email,
            contact_person_phone,
            company_name,
            company_address,
            cover_template_id,
            phone_number,
            email_address,
            street_address,
            country_id,
            state,
            city,
            zip_code,
            experience,
            job_title,
            employeer_name,
            opener_detail,
            closer_detail,
            show_personal_information,
          } = res.data.data;
          setActiveTemplate(cover_template_id);
          Cookies.set("freshCoverId", id);

          setCoverData((prev) => ({
            ...prev,
            id,
            user_id,
            name,
            first_name,
            last_name,
            contact_person_name,
            contact_person_designation,
            contact_person_email,
            contact_person_phone,
            company_address,
            cover_template_id,
            phone_number,
            email_address,
            street_address,
            country_id,
            state,
            city,
            zip_code,
            experience,
            job_title,
            employeer_name,
            opener_detail,
            closer_detail,
            show_personal_information,
          }));

          setValue("update_id", id);
          setValue("first_name", first_name);
          setValue("last_name", last_name);
          setValue("contact_person_name", contact_person_name);
          setValue("contact_person_designation", contact_person_designation);
          setValue("contact_person_email", contact_person_email);
          setValue("contact_person_phone", contact_person_phone);
          setValue("company_address", company_address);
          setValue("phone_number", phone_number);
          setValue("email_address", email_address);
          setValue("street_address", street_address);
          setValue("country_id", country_id);
          setValue("state", state);
          setValue("city", city);
          setValue("zip_code", zip_code);
          setValue("experience", experience);
          setValue("job_title", job_title);
          setValue("employeer_name", employeer_name);
          setValue("opener_detail", opener_detail);
          setValue("closer_detail", closer_detail);
          setValue("show_personal_information", show_personal_information);
        })
        .catch((err) => console.log(err));
    } else {
      if (freshCoverId) {
        ApiService.showCoverLetterData(user?.token, freshCoverId)
          .then((res) => {
            const {
              id,
              user_id,
              name,
              first_name,
              last_name,
              contact_person_name,
              contact_person_designation,
              contact_person_email,
              contact_person_phone,
              company_name,
              company_address,
              cover_template_id,
              phone_number,
              email_address,
              street_address,
              country_id,
              state,
              city,
              zip_code,
              experience,
              job_title,
              employeer_name,
              opener_detail,
              closer_detail,
              show_personal_information,
            } = res.data.data;
            setActiveTemplate(cover_template_id);

            ApiService.getResumeExamplesSuggest(user?.token)
              .then((res) => console.log(res.data.data))
              .catch((err) => console.log(err));

            ApiService.getCoverLetterSignature(user?.token, id)
              .then((res) => {
                const data = res.data.data;
                console.log("signature", data);
                if (data) {
                  setHasOldSignature(data.id);
                  if (data.is_draw) {
                    setSignatureData({
                      type: "drew",
                      value: data.image_url + "/" + data.image,
                    });
                  } else if (data.is_upload) {
                    setSignatureData({
                      type: "upload",
                      value: data.image_url + "/" + data.image,
                    });
                  } else if (data.is_text) {
                    setSignatureData({
                      type: "type",
                      value: data.text,
                    });
                  }
                } else {
                  setHasOldSignature(0);
                  setSignatureData({
                    type: "",
                    value: "",
                  });
                }
              })
              .catch((err) => console.log(err));

            setCoverData((prev) => ({
              ...prev,
              id,
              user_id,
              name,
              first_name,
              last_name,
              contact_person_name,
              contact_person_designation,
              contact_person_email,
              contact_person_phone,
              company_address,
              cover_template_id,
              phone_number,
              email_address,
              street_address,
              country_id,
              state,
              city,
              zip_code,
              experience,
              job_title,
              employeer_name,
              opener_detail,
              closer_detail,
              show_personal_information,
            }));

            // set Values
            setValue("update_id", id);
            setValue("first_name", first_name);
            setValue("last_name", last_name);
            setValue("contact_person_name", contact_person_name);
            setValue("contact_person_designation", contact_person_designation);
            setValue("contact_person_email", contact_person_email);
            setValue("contact_person_phone", contact_person_phone);
            setValue("company_address", company_address);
            setValue("phone_number", phone_number);
            setValue("email_address", email_address);
            setValue("street_address", street_address);
            setValue("country_id", country_id);
            setValue("state", state);
            setValue("city", city);
            setValue("zip_code", zip_code);
            setValue("experience", experience);
            setValue("job_title", job_title);
            setValue("employeer_name", employeer_name);
            setValue("opener_detail", opener_detail);
            setValue("closer_detail", closer_detail);
            setValue("show_personal_information", show_personal_information);
          })
          .catch((err) => console.log(err));
      }
    }

    if (!selectedTemplateId) {
      if (editAbleCoverId || newExampleCoverId) {
        ApiService.showCoverLetterData(
          user?.token,
          editAbleCoverId ? editAbleCoverId : newExampleCoverId
        )
          .then((res) => {
            const {
              id,
              user_id,
              name,
              first_name,
              last_name,
              contact_person_name,
              contact_person_designation,
              contact_person_email,
              contact_person_phone,
              company_name,
              company_address,
              cover_template_id,
              phone_number,
              email_address,
              street_address,
              country_id,
              state,
              city,
              zip_code,
              experience,
              job_title,
              employeer_name,
              opener_detail,
              closer_detail,
              country,
              show_personal_information,
            } = res.data.data;
            setActiveTemplate(cover_template_id);
            console.log("user Signature is here");
            ApiService.getCoverLetterSignature(user?.token, id)
              .then((res) => {
                const data = res.data.data;
                console.log("signature", data);
                if (data) {
                  setHasOldSignature(data.id);
                  if (data.is_draw) {
                    setSignatureData({
                      type: "drew",
                      value: data.image_url + "/" + data.image,
                    });
                  } else if (data.is_upload) {
                    setSignatureData({
                      type: "upload",
                      value: data.image_url + "/" + data.image,
                    });
                  } else if (data.is_text) {
                    setSignatureData({
                      type: "type",
                      value: data.text,
                    });
                  }
                } else {
                  setHasOldSignature(0);
                  setSignatureData({
                    type: "",
                    value: "",
                  });
                }
              })
              .catch((err) => console.log(err));

            const formatting = res.data.data.formating;

            setActiveTheme(formatting.color);
            setActiveFont(formatting.heading_font_style);
            setActiveFontSize(formatting.heading_fontsize);

            setCoverData((prev) => ({
              ...prev,
              id,
              user_id,
              name,
              first_name,
              last_name,
              contact_person_name,
              contact_person_designation,
              contact_person_email,
              contact_person_phone,
              company_address,
              cover_template_id,
              phone_number,
              email_address,
              street_address,
              country_id,
              state,
              city,
              zip_code,
              experience,
              job_title,
              employeer_name,
              opener_detail,
              closer_detail,
              country_name: country.name,
              show_personal_information,
            }));
            // set Values
            setValue("update_id", id);
            setValue("first_name", first_name);
            setValue("last_name", last_name);
            setValue("contact_person_name", contact_person_name);
            setValue("contact_person_designation", contact_person_designation);
            setValue("contact_person_email", contact_person_email);
            setValue("contact_person_phone", contact_person_phone);
            setValue("company_address", company_address);
            setValue("phone_number", phone_number);
            setValue("email_address", email_address);
            setValue("street_address", street_address);
            setValue("country_id", country_id);
            setValue("state", state);
            setValue("city", city);
            setValue("zip_code", zip_code);
            setValue("experience", experience);
            setValue("job_title", job_title);
            setValue("employeer_name", employeer_name);
            setValue("opener_detail", opener_detail);
            setValue("closer_detail", closer_detail);
            setValue("show_personal_information", show_personal_information);
          })
          .catch((err) => console.log(err));
      }

      if (isExample && newExampleCoverId === undefined) {
        ApiService.showCoverExampleWithId(user?.token, exampleId)
          .then((res) => {
            // cover_example
            const {
              id,
              user_id,
              name,
              first_name,
              last_name,
              contact_person_name,
              contact_person_designation,
              contact_person_email,
              contact_person_phone,
              company_name,
              company_address,
              cover_template_id,
              phone_number,
              email_address,
              street_address,
              country,
              state,
              city,
              zip_code,
              experience,
              job_positions,
              employeer_name,
              opener_detail,
              closer_detail,
            } = res.data.data.cover_example;

            console.log(res.data.data.cover_example);

            const createCoverData = {
              first_name,
              last_name,
              country_id: country.id,
              email_address: email_address,
              contact_person_email: "exmaple@gmail.com",
              contact_person_designation: "",
              contact_person_name: "",
              contact_person_phone: "",
              company_address: "",
              phone_number: phone_number,
              street_address: street_address,

              zip_code: zip_code,
              experience: experience,
              job_title: job_positions[0].name,
              employeer_name: employeer_name,
              opener_detail: opener_detail,
              closer_detail: closer_detail,
              show_personal_information: 1,
            };

            // ApiService.coverLetterDataStore(
            //   user?.token,
            //   createCoverData,
            //   cover_template_id
            // )
            //   .then((res) => {
            //     console.log(res.data.data);
            //     Cookies.set("newExampleCoverId", res.data.data.id);
            //     setActiveTemplate(cover_template_id);
            //     setCoverData((prev) => ({ ...prev, id: res.data.data.id }));
            //   })
            //   .catch((err) => console.log(err));

            setCoverData((prev) => ({
              ...prev,

              user_id,
              name: first_name + " " + last_name ? last_name : "",
              first_name,
              last_name,
              contact_person_name,
              contact_person_designation,
              contact_person_email,
              contact_person_phone,
              company_address,
              cover_template_id,
              phone_number,
              email_address,
              street_address,
              country_id: country.id,

              zip_code,
              experience,
              job_title: job_positions[0].name,
              employeer_name,
              opener_detail,
              closer_detail,
              show_personal_information: 1,
            }));
            // set Values
            setValue("update_id", id);
            setValue("first_name", first_name);
            setValue("last_name", last_name);
            setValue("contact_person_name", contact_person_name);
            setValue("contact_person_designation", contact_person_designation);
            setValue("contact_person_email", contact_person_email);
            setValue("contact_person_phone", contact_person_phone);
            setValue("company_address", company_address);
            setValue("phone_number", phone_number);
            setValue("email_address", email_address);
            setValue("street_address", street_address);
            setValue("country_id", country.id);
            setValue("zip_code", zip_code);
            setValue("experience", experience);
            setValue("job_title", job_positions[0].name);
            setValue("employeer_name", employeer_name);
            setValue("opener_detail", opener_detail);
            setValue("closer_detail", closer_detail);
            setValue("show_personal_information", 1);
          })
          .catch((err) => console.log(err));
      }
    }
  };

  useEffect(() => {
    reloadCoverData();
  }, []);

  const [coverIsUpdating, setCoverIsUpdating] = useState(false);
  const [coverHasSaved, setCoverHasSaved] = useState(false);

  const coverSubmit = (data) => {
    setCoverIsUpdating(true);
    if (data.update_id) {
      // ApiService.coverLetterDataUpdate(
      //   user?.token,
      //   data,
      //   coverData.cover_template_id,
      //   data.update_id
      // )
      //   .then((res) => {
      //     captureAndUpload(data.update_id);
      //     setCoverHasSaved(true);
      //     setTimeout(() => {
      //       setCoverIsUpdating(false);
      //       setCoverHasSaved(false);
      //     }, 2000);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     setCoverIsUpdating(false);
      //   });
    }
  };

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

  const marksMobile = [
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
    { value: 11, label: "10+" },
  ];

  const changeFormatingCover = (
    activeTemplate,
    activeTheme,
    activeFont,
    activeFontSize
  ) => {
    const data = {
      template_id: activeTemplate,
      heading_fontsize: activeFontSize,
      color: activeTheme,
      heading_font_style: activeFont,
    };
    // ApiService.handleCoverFormating(user?.token, data, coverData.id)
    //   .then((res) => {
    //     captureAndUpload(coverData.id);
    //   })
    //   .catch((err) => console.log(err));
  };

  const customFunction = () => {
    if (paidTemplate === 1) {
      if (user3.max_cover_templates <= user3.current_cover_usage) {
        swal("Sorry!", "Please upgrade your plan", "error");
      } else {
        const headers = {
          Authorization: "Bearer " + user?.token,
        };
        axios
          .get(global.baseurl + "/increase-cover-usage/" + user?.id, {
            headers,
          })
          .then((data) => {
            if (data) {
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
            }
          })
          .catch((err) => {
            console.log(err);
          });
        downloadTHISPDF();
      }
    } else {
      downloadTHISPDF();
    }
  };

  const coverRef = useRef(null);

  const downloadPDF = async () => {
    if (window.innerWidth >= 768) {
      if (check_download_tour == false) {
        const driverObj2 = driver({
          showProgress: true,
          onDeselected: (element) => {
            // Check if the element being deselected is the "Done" button

            // This condition checks if the tour is ending
            customFunction();
          },
          steps: [
            {
              element: "#downloadpdf",
              popover: {
                title:
                  "<h3 style='font-size: 20px;'>Download your cover letter</h3>",
                description: `<div style='font-size: 18px;'>Save your cover letter as a PDF. Make sure any custom scale settings are set to default before saving. You can also print your cover letter directly by clicking the print option to get a hard copy.</div>
                 <img src=${Capture6} alt="Page Header" style="width: 100%" />`,
              },
            },
          ],
        });
        driverObj2.drive();
        set_check_download_tour(true);
      } else {
        if (paidTemplate === 1) {
          if (user3.max_cover_templates <= user3.current_cover_usage) {
            swal("Sorry!", "Please upgrade your plan", "error");
          } else {
            const headers = {
              Authorization: "Bearer " + user?.token,
            };
            axios
              .get(global.baseurl + "/increase-cover-usage/" + user?.id, {
                headers,
              })
              .then((data) => {
                if (data) {
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
                }
              })
              .catch((err) => {
                console.log(err);
              });
            downloadTHISPDF();
          }
        } else {
          downloadTHISPDF();
        }
      }
    } else {
      if (paidTemplate === 1) {
        if (user3.max_cover_templates <= user3.current_cover_usage) {
          swal("Sorry!", "Please upgrade your plan", "error");
        } else {
          const headers = {
            Authorization: "Bearer " + user?.token,
          };
          axios
            .get(global.baseurl + "/increase-cover-usage/" + user?.id, {
              headers,
            })
            .then((data) => {
              if (data) {
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
              }
            })
            .catch((err) => {
              console.log(err);
            });
          downloadTHISPDF();
        }
      } else {
        downloadTHISPDF();
      }
    }
  };

  const adjustHeight = () => {
    $("#unused_image").css("display", "none");
    $(".image__holder__resume.empty").css("display", "none");
    setTimeout(() => {
      let height = $(".chk_height").height();
      console.log(height);
      if (height >= 2616) {
        $(".chk_height").css("min-height", "3924px");
      } else if (height > 1308) {
        $(".chk_height").css("min-height", "2616px");
      }
    }, 1500);
  };

  const downloadTHISPDF = useReactToPrint({
    content: () => coverRef.current,
    documentTitle: "",
    onBeforeGetContent: () => {
      return new Promise((resolve) => {
        adjustHeight();
        setTimeout(resolve, 3000);
        setTimeout(() => {
          $(".chk_height").css("min-height", "1308px");
          $("#unused_image").css("display", "block");
          $(".image__holder__resume.empty").css("display", "block");
        }, 5000);
      });
    },
  });

  // const downloadTHISPDF = async () => {
  //   if (window.innerWidth <= 1145) {
  //     $("#coverPDF").css("transform", "scale(100%)");
  //     $("#coverPDF").css("width", "1000px");
  //   } else if (window.innerWidth <= 440) {
  //     $("#coverPDF").css("transform", "scale(100%)");
  //     $("#coverPDF").css("width", "1000px");
  //   }
  //   const targetElement = document.getElementById("coverPDF");

  //   if (targetElement) {
  //     try {
  //       // Use html-to-image's toPng to take a screenshot of the element
  //       const dataUrl = await domToPng(targetElement, {
  //         useCORS: true,
  //         imageTimeout: 15000,
  //         scale: 2,
  //       });

  //       // Define PDF page dimensions in pixels for 96 DPI
  //       const pdfPageWidth = 794; // A4 width in pixels at 96 DPI
  //       const pdfPageHeight = 1123; // A4 height in pixels at 96 DPI

  //       // Create a new jsPDF instance with custom dimensions
  //       const pdf = new jsPDF({
  //         orientation: "p",
  //         unit: "px",
  //         format: [pdfPageWidth, pdfPageHeight],
  //       });

  //       // Create a temporary image to get dimensions
  //       const img = new Image();
  //       img.src = dataUrl;
  //       img.onload = () => {
  //         const imgWidth = pdfPageWidth;
  //         const imgHeight = (img.height * pdfPageWidth) / img.width;
  //         let heightLeft = imgHeight;

  //         let position = 0;

  //         // Add the image to the PDF, splitting it across pages if necessary
  //         while (heightLeft > 0) {
  //           pdf.addImage(dataUrl, "PNG", 0, position, imgWidth, imgHeight);
  //           heightLeft -= pdfPageHeight;
  //           position -= pdfPageHeight;

  //           if (heightLeft > 0) {
  //             pdf.addPage();
  //           }
  //         }

  //         const first_name = watch("first_name");
  //         const last_name = watch("last_name");
  //         // Download the PDF
  //         pdf.save(`${first_name}_${last_name}.pdf`);
  //         if (window.innerWidth <= 1145) {
  //           $("#coverPDF").css("transform", "scale(40%)");
  //           $("#coverPDF").css("width", "calc(100%/0.4)");
  //         } else if (window.innerWidth <= 440) {
  //           $("#coverPDF").css("transform", "scale(60%)");
  //           $("#coverPDF").css("width", "calc(100%/0.6)");
  //         }
  //       };
  //     } catch (error) {
  //       console.error("Error generating PDF:", error);
  //     }
  //   } else {
  //     console.error('Element with ID "coverPDF" not found.');
  //   }
  // };

  const captureAndUpload = async (id) => {
    // if (window.innerWidth <= 1145) {
    //   $("#coverPDF").css("transform", "scale(100%)");
    //   $("#coverPDF").css("width", "1000px");
    //   $("#coverPDF").css("height", "auto");
    // } else if (window.innerWidth <= 440) {
    //   $("#coverPDF").css("transform", "scale(100%)");
    //   $("#coverPDF").css("width", "1000px");
    //   $("#coverPDF").css("height", "auto");
    // }
    if (!id) return;
    const targetElement = document.getElementById("coverPDF");
    console.log(targetElement);
    if (targetElement) {
      try {
        // Capture the screenshot

        const imgData = await domToPng(targetElement, {
          useCORS: true,
          imageTimeout: 15000,
          scale: 2,
        });

        // Convert the data URL to a Blob
        const response = await fetch(imgData);
        const blob = await response.blob();

        // Create a file from the Blob
        const file = new File([blob], "screenshot.png", { type: "image/png" });

        // Create form data
        ApiService.updateUserCoverLetterPreviewImage(user?.token, file, id)
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
        // if (window.innerWidth <= 1145) {
        //   $("#coverPDF").css("transform", "scale(40%)");
        //   $("#coverPDF").css("width", "calc(100%/0.4)");
        //   $("#coverPDF").css("height", "750px");
        // } else if (window.innerWidth <= 440) {
        //   $("#coverPDF").css("transform", "scale(60%)");
        //   $("#coverPDF").css("width", "calc(100%/0.6)");
        //   $("#coverPDF").css("height", "650px");
        // }
      } catch (error) {
        console.error("Error capturing and uploading screenshot:", error);
        // if (window.innerWidth <= 1145) {
        //   $("#coverPDF").css("transform", "scale(40%)");
        //   $("#coverPDF").css("width", "calc(100%/0.4)");
        //   $("#coverPDF").css("height", "750px");
        // } else if (window.innerWidth <= 440) {
        //   $("#coverPDF").css("transform", "scale(60%)");
        //   $("#coverPDF").css("width", "calc(100%/0.6)");
        //   $("#coverPDF").css("height", "650px");
        // }
      }
    }
  };

  useEffect(() => {
    if (activeTemplate > 0) {
      console.log("active template outer", activeTemplate);
      console.log("coverData outer", coverData);
      if (coverData.id) {
        console.log("active template inner", activeTemplate);
        console.log("coverData inner", coverData);
        captureAndUpload(coverData.id);
      }
    }
  }, [activeTemplate, coverData]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  // !Siraj
  // Signature
  const [hasOldSignature, setHasOldSignature] = useState(0);
  const signatureRef = useRef(null);
  const signatureRef2 = useRef(null);
  const [signatureData, setSignatureData] = useState({
    type: "",
    value: "",
  });
  // Upload Signature
  const [isUploadedSignature, setIsUploadedSignature] = useState("");

  const clearSignature = () => {
    if (hasOldSignature) {
      ApiService.deleteCoverSignature(user?.token, hasOldSignature)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    }

    if (signatureData.type === "drew") {
      signatureRef.current.clear();
      signatureRef2.current.clear();
    }
    setValue("upload", "");
    setValue("type", "");
    setIsUploadedSignature("");
    setSignatureData({ type: "", value: "" });
  };

  const dataURLtoBlob = (dataurl) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const [isSignatureIsSaving, setIsSignatureIsSaving] = useState(false);
  const [isSignatureHasSaved, setIsSignatureHasSaved] = useState(false);
  const [SignatureError, setSignatureError] = useState("");

  const handleSaveSignature = async () => {
    if (!signatureData.value) {
      setSignatureError("Please Select file or tye or Draw your Signature");
    } else {
      setSignatureError("");
      setIsSignatureIsSaving(true);
      let artical;
      if (signatureData.type === "drew") {
        const blob = dataURLtoBlob(signatureData.value);
        artical = {
          alignment: "",
          size: "",
          text: "",
          font: "",
          is_draw: 1,
          is_upload: 0,
          is_text: 0,
          image: blob,
          cover_id: coverData.id,
          hasOldSignature: hasOldSignature,
        };
      } else if (signatureData.type === "upload") {
        artical = {
          alignment: "",
          size: "",
          text: "",
          font: "",
          is_draw: 0,
          is_upload: 1,
          is_text: 0,
          image: signatureData.value,
          cover_id: coverData.id,
          hasOldSignature: hasOldSignature,
        };
      } else if (signatureData.type === "type") {
        artical = {
          alignment: "",
          size: "",
          text: signatureData.value,
          font: "",
          is_draw: 0,
          is_upload: 0,
          is_text: 1,
          image: "",
          cover_id: coverData.id,
          hasOldSignature: hasOldSignature,
        };
      }

      if (hasOldSignature) {
        ApiService.updateCoverLetterSignature(user?.token, artical)
          .then((res) => {
            console.log(res.data);
            setIsSignatureHasSaved(true);
            setTimeout(() => {
              setIsSignatureIsSaving(false);
              setIsSignatureHasSaved(false);
            }, 2000);
          })
          .catch((err) => {
            console.log(err);
            setIsSignatureHasSaved(true);
            setTimeout(() => {
              setIsSignatureIsSaving(false);
              setIsSignatureHasSaved(false);
            }, 2000);
          });
      } else {
        ApiService.storeCoverLetterSignature(user?.token, artical)
          .then((res) => {
            console.log(res.data);
            setIsSignatureHasSaved(true);
            setTimeout(() => {
              setIsSignatureIsSaving(false);
              setIsSignatureHasSaved(false);
            }, 2000);
          })
          .catch((err) => {
            console.log(err);

            setIsSignatureHasSaved(true);
            setTimeout(() => {
              setIsSignatureIsSaving(false);
              setIsSignatureHasSaved(false);
            }, 2000);
          });
      }
    }
  };

  const [sideNavOpen, setSideNavOpen] = useState(false);
  // Suggestion
  const [suggestionsOpen, setSuggestionOpen] = useState(false);
  const [suggestionFor, setSuggestionFor] = useState("");

  if (activeTemplate === 0) {
    return (
      <>
        <Suspense fallback={<SpinnerLoader />}>
          <SpinnerLoader />
        </Suspense>
      </>
    );
  }

  return (
    <section className="bg-[#1A2230] min-h-screen max-h-max" id="maindiv">
      <Helmet>
        <meta
          name="robots"
          content="nofollow, noindex, max-snippet:-1, max-video-preview:-1, max-image-preview:large"
        />
      </Helmet>
      <style>
        {`
          .whatsapp {
            display: none !important;
          }
            .custom_create_resume{
            display: none !important;
            }
              .chatBot {
            display: none !important;
          }
              .chatBotScreenHide {
            display: none !important;
          }
        `}
      </style>
      <SideNav close={(val) => setSideNavOpen(val)} isOpen={sideNavOpen} />
      {/* Header */}
      <div className="flex items-center justify-between px-6">
        <Link to={"/"} className="flex">
          <img
            src={Logo}
            alt="My Image"
            width={150}
            height={40}
            className="logo py-2"
          />
        </Link>
        <div>
          <RxHamburgerMenu
            className="text-white cursor-pointer"
            onClick={() => setSideNavOpen(true)}
            size={40}
          />
        </div>
      </div>
      <div id="main_contents" className="w-full mr-8">
        <section className="flex justify-center items-start  flex-wrap px-6 mt-10 py-10 w-full">
          {/* container */}
          <div className="w-full">
            {/* options */}
            <div
              className="text-white font-lexend mb-2 text-xl"
              onClick={(e) =>
                duplicate_delete_document(
                  "rename",
                  my_resumes.template_id,
                  my_resumes.uuid,
                  "Cover",
                  my_resumes.resume_name
                )
              }
            >
              {coverData.name}
            </div>
            {activeTemplate && (
              <div className={`h-full`}>
                <div
                  id="coverPDF"
                  className="relative origin-top-left scale-[40%] w-[calc(100%/0.4)] h-[650px] sm:scale-[60%] sm:w-[calc(100%/0.6)] sm:h-[750px)] lg:scale-100 lg:w-[1000px] lg:h-auto  shadow-lg"
                >
                  <div
                    className="absolute top-[2.5em] left-10 z-50 rotate-45 
                         text-[gray] text-[10em] opacity-0"
                    id="watermark"
                  >
                    AIPRORESUME
                  </div>
                  <div ref={coverRef}>
                    <ActiveTemplate
                      activeId={activeTemplate}
                      coverData={coverData}
                      //
                      activeTheme={activeTheme}
                      activeFont={activeFont}
                      activeFontSize={activeFontSize}
                      signature={signatureData}
                    />
                  </div>
                </div>
              </div>
            )}
            {/*  */}

            {/* Toolbar */}
            <div className="hidden lg:flex flex-wrap flex-row-reverse justify-end items-start rounded-md  h-fit fixed top-40 right-4">
              {activeToolBarTab != 0 ? (
                <div
                  onClick={() => {
                    setActiveToolBarTab(!activeToolBarTab);
                  }}
                  className={`absolute top-[-60px] bg-[#0F4D76] hover:bg-[#E66868] right-2 w-[50px] h-[50px] text-white rounded-full flex justify-center items-center cursor-pointer`}
                >
                  {toolbarResumeTabsOpen ? (
                    <RxCross1 size={25} />
                  ) : (
                    <RxCross1 size={25} />
                  )}
                </div>
              ) : (
                ""
              )}

              <div
                className="flex flex-row-reverse w-fit bg-secondary-blue py-6 px-2 ml-4 rounded-full"
                id="tab_0"
              >
                {/* Tabs */}
                <div className={"flex flex-col items-center gap-4"}>
                  {toolbarResumeTabs.map((tab) => (
                    <div
                      className={
                        "flex items-center text-white cursor-pointer py-3 px-3  group relative"
                      }
                      id={`tab_${tab.id}`}
                      onClick={() => {
                        setActiveToolBarTab(tab.id);
                      }}
                    >
                      <div className="absolute right-0 z-20 group-hover:flex hidden justify-start px-2 rounded-full bg-secondary-blue w-[200px] items-center h-full ">
                        <div className="text-2xl">{tab.icon}</div>
                        <div className={`text-md font-lexend font-medium pl-2`}>
                          {tab.name}
                        </div>
                      </div>
                      <div className="text-2xl">{tab.icon}</div>
                    </div>
                  ))}
                  <div className="w-full h-[1px] bg-white"></div>

                  <div
                    className={
                      "flex items-center text-white cursor-pointer py-3 px-3  group relative"
                    }
                    id="downloadpdf"
                    onClick={downloadPDF}
                  >
                    <div className="absolute right-0 z-20 group-hover:flex hidden justify-start px-2 rounded-full bg-secondary-blue w-[200px] items-center h-full ">
                      <div className="text-2xl">
                        <FiDownload />
                      </div>
                      <div className={`text-md font-lexend font-medium pl-2`}>
                        Download
                      </div>
                    </div>
                    <div className="text-2xl">
                      <FiDownload />
                    </div>
                  </div>

                  <div
                    className={
                      "flex items-center text-white cursor-pointer py-3 px-3  group relative"
                    }
                    onClick={() => {
                      share_doc();
                    }}
                  >
                    <div className="absolute right-0 z-20 group-hover:flex hidden justify-start px-2 rounded-full bg-secondary-blue w-[200px] items-center h-full ">
                      <div className="text-2xl">
                        <LuShare2 />
                      </div>
                      <div className={`text-md font-lexend font-medium pl-2`}>
                        Share
                      </div>
                    </div>
                    <div className="text-2xl">
                      <LuShare2 />
                    </div>
                  </div>

                  <div
                    className={
                      "flex items-center text-white cursor-pointer py-3 px-3  group relative"
                    }
                    onClick={() => {
                      download_email();
                    }}
                  >
                    <div className="absolute right-0 z-20 group-hover:flex hidden justify-start px-2 rounded-full bg-secondary-blue w-[200px] items-center h-full ">
                      <div className="text-2xl">
                        <TfiEmail />
                      </div>
                      <div className={`text-md font-lexend font-medium pl-2`}>
                        Email
                      </div>
                    </div>
                    <div className="text-2xl">
                      <TfiEmail />
                    </div>
                  </div>

                  <div className="w-full h-[1px] bg-white"></div>

                  <div
                    className={
                      "flex items-center text-white cursor-pointer py-3 px-3  group relative"
                    }
                    onClick={(e) =>
                      duplicate_delete_document(
                        "duplicate",
                        my_resumes.template_id,
                        my_resumes.uuid,
                        "Cover",
                        my_resumes.resume_name
                      )
                    }
                  >
                    <div className="absolute right-0 z-20 group-hover:flex hidden justify-start px-2 rounded-full bg-secondary-blue w-[200px] items-center h-full ">
                      <div className="text-2xl">
                        <HiOutlineDuplicate />
                      </div>
                      <div className={`text-md font-lexend font-medium pl-2`}>
                        Duplicate
                      </div>
                    </div>
                    <div className="text-2xl">
                      <HiOutlineDuplicate />
                    </div>
                  </div>
                  <div
                    className={
                      "flex items-center text-white cursor-pointer py-3 px-3  group relative"
                    }
                    onClick={(e) =>
                      duplicate_delete_document(
                        "delete",
                        "my_resumes.template_id",
                        "my_resumes.uuid",
                        "Cover",
                        "my_resumes.resume_name"
                      )
                    }
                  >
                    <div className="absolute right-0 z-20 group-hover:flex hidden justify-start px-2 rounded-full bg-secondary-blue w-[200px] items-center h-full ">
                      <div className="text-2xl">
                        <RxTrash />
                      </div>
                      <div className={`text-md font-lexend font-medium pl-2`}>
                        Delete
                      </div>
                    </div>
                    <div className="text-2xl">
                      <RxTrash />
                    </div>
                  </div>
                </div>
              </div>

              {/* Screens */}
              <div
                className={`relative ${activeToolBarTab > 0 ? "block" : "hidden"
                  } `}
              >
                {activeToolBarTab === 1 && (
                  <div className="fixed right-0 min-w-[250px] max-w-[700px] h-screen top-0 bottom-0 z-50 bg-white overflow-y-scroll overflow-x-hidden">
                    <div
                      className={`grid ${suggestionsOpen ? "transform translate-x-[-100%]" : ""
                        }  grid-cols-[100%,100%] transition-[0.9s]`}
                    >
                      {/* Form */}

                      <div className="w-[700px]">
                        <div className="flex items-center justify-center relative">
                          <span className="text-lg font-semibold text-center py-4">
                            Your Cover Letter
                          </span>
                          <div
                            onClick={() => setActiveToolBarTab(0)}
                            className="absolute flex justify-center items-center cursor-pointer top-0 right-0 w-[40px] h-[40px]"
                          >
                            <LiaTimesSolid size={20} />
                          </div>
                        </div>
                        <div>
                          <form
                            onSubmit={handleSubmit(coverSubmit)}
                            className="p-4 flex flex-col gap-2"
                          >
                            <div className="flex flex-col sm:flex-row justify-between gap-2">
                              <Controller
                                name="update_id"
                                control={control}
                                render={({ field }) => (
                                  <input type="hidden" {...field} />
                                )}
                              />
                              {/* First Name */}
                              <Controller
                                name="first_name"
                                control={control}
                                rules={{
                                  required: "first Name is required",
                                }}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    id="outlined-basic"
                                    label="First Name*"
                                    variant="outlined"
                                    onChange={(e) => {
                                      field.onChange(e);
                                      setCoverData((prevData) => ({
                                        ...prevData,
                                        first_name: e.target.value,
                                      }));
                                    }}
                                    className="w-full"
                                    error={!!errors.first_name}
                                    helperText={errors.first_name?.message}
                                  />
                                )}
                              />
                              {/* Last Name */}
                              <Controller
                                name="last_name"
                                control={control}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    id="outlined-basic"
                                    label="Last Name"
                                    variant="outlined"
                                    onChange={(e) => {
                                      field.onChange(e);
                                      setCoverData((prevData) => ({
                                        ...prevData,
                                        last_name: e.target.value,
                                      }));
                                    }}
                                    className="w-full"
                                    error={!!errors.last_name}
                                    helperText={errors.last_name?.message}
                                  />
                                )}
                              />
                            </div>
                            {/* Job Title */}

                            <Controller
                              name="job_title"
                              control={control}
                              defaultValue=""
                              rules={{
                                required: "Job Title is required",
                              }}
                              render={({ field }) => (
                                <Autocomplete
                                  {...field}
                                  freeSolo
                                  options={jobPostions
                                    ?.sort((a, b) =>
                                      a.name.localeCompare(b.name)
                                    )
                                    .map((option) => option.name)}
                                  onChange={(e, value) => {
                                    field.onChange(value);
                                    setCoverData((prevData) => ({
                                      ...prevData,
                                      job_title: value,
                                    }));
                                  }}
                                  onInputChange={(e, value) => {
                                    field.onChange(value);
                                    setCoverData((prevData) => ({
                                      ...prevData,
                                      job_title: value,
                                    }));
                                  }}
                                  value={field.value}
                                  sx={{ width: "100%" }}
                                  defaultValue={null}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      defaultValue={""}
                                      label="Position/Job Title*"
                                      error={!!errors.job_title}
                                      helperText={
                                        errors.job_title
                                          ? errors.job_title.message
                                          : null
                                      }
                                    />
                                  )}
                                />
                              )}
                            />

                            <div className="flex items-center gap-2">
                              {/* email_address */}
                              <Controller
                                name="email_address"
                                control={control}
                                rules={{
                                  required: "Email Address required",
                                  pattern: {
                                    value:
                                      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "invalid email address",
                                  },
                                }}
                                defaultValue=""
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    sx={{ width: "100%" }}
                                    id="outlined-basic"
                                    label="Email Address*"
                                    variant="outlined"
                                    onChange={(e) => {
                                      field.onChange(e);
                                      setCoverData((prevData) => ({
                                        ...prevData,
                                        email_address: e.target.value,
                                      }));
                                    }}
                                    error={!!errors.email_address}
                                    helperText={errors.email_address?.message}
                                  />
                                )}
                              />
                              {/* phone_number */}
                              <Controller
                                name="phone_number"
                                control={control}
                                render={({ field }) => (
                                  <PhoneInput
                                    {...field}
                                    placeholder="Phone Number"
                                    autoComplete="on"
                                    inputProps={{
                                      name: "phone_number",
                                    }}
                                    onChange={(e) => {
                                      field.onChange(e);
                                      setCoverData((prevData) => ({
                                        ...prevData,
                                        phone_number: e,
                                      }));
                                    }}
                                    className={` ${errors?.phone_number
                                      ? "border-red-500 border"
                                      : " border"
                                      }  w-full leading-3 py-[14px] rounded-md px-[14px]`}
                                  />
                                )}
                              />
                            </div>
                            <div className="flex flex-row items-center gap-2">
                              {/* country_id */}
                              <Box sx={{ width: "100%" }}>
                                <FormControl
                                  fullWidth
                                  error={!!errors.country_id}
                                >
                                  <InputLabel
                                    id="demo-simple-select-label"
                                  // shrink={!!watch("country_id")}
                                  >
                                    Country*
                                  </InputLabel>
                                  <Controller
                                    name="country_id"
                                    control={control}
                                    defaultValue={""}
                                    render={({ field }) => (
                                      <Select
                                        {...field}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Country"
                                        onChange={(e) => {
                                          field.onChange(e.target.value);
                                          setCoverData((prevData) => ({
                                            ...prevData,
                                            country_id: e.target.value,
                                          }));
                                        }}
                                      >
                                        <MenuItem value={""} disabled>
                                          Select Country
                                        </MenuItem>
                                        {countries
                                          ?.filter(
                                            (country) =>
                                              country.name !== "Empty"
                                          )
                                          .map((country, idx) => (
                                            <MenuItem
                                              key={idx}
                                              value={country.id}
                                            >
                                              {country.name}
                                            </MenuItem>
                                          ))}
                                      </Select>
                                    )}
                                  />
                                  {errors.country_id && (
                                    <p>{errors.country_id.message}</p>
                                  )}
                                </FormControl>
                              </Box>
                              {/* State */}
                              <Controller
                                name="state"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                  <Autocomplete
                                    {...field}
                                    freeSolo
                                    options={allStates.map(
                                      (option) => option.name
                                    )}
                                    onChange={(e, value) => {
                                      console.log(value);
                                      field.onChange(value);
                                      setValue("state", value);
                                      setCoverData((prev) => ({
                                        ...prev,
                                        state: value,
                                      }));
                                    }}
                                    onInputChange={(e, value) => {
                                      field.onChange(value);
                                      setValue("state", value);
                                      handleInputState(value);
                                      setCoverData((prev) => ({
                                        ...prev,
                                        state: value,
                                      }));
                                    }}
                                    value={field.value}
                                    sx={{ width: "100%" }}
                                    defaultValue={null}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        defaultValue={""}
                                        label="State"
                                        error={!!errors.state}
                                        helperText={
                                          errors.state
                                            ? errors.state.message
                                            : null
                                        }
                                      />
                                    )}
                                  />
                                )}
                              />

                              {/* City New */}
                              <Controller
                                name="city"
                                control={control}
                                defaultValue=""
                                render={({ field, fieldState }) => (
                                  <Autocomplete
                                    {...field}
                                    defaultValue={""}
                                    freeSolo
                                    options={cities.map(
                                      (option) => option.name
                                    )}
                                    onChange={(e, value) => {
                                      field.onChange(value);
                                      setValue("city", value);
                                      setCoverData((prev) => ({
                                        ...prev,
                                        city: value,
                                      }));
                                    }}
                                    onInputChange={(e, value) => {
                                      field.onChange(value);
                                      setValue("city", value);
                                      handleInputChange(value);
                                      setCoverData((prev) => ({
                                        ...prev,
                                        city: value,
                                      }));
                                    }}
                                    value={field.value}
                                    sx={{ width: "100%" }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="City"
                                        error={!!fieldState.error}
                                        helperText={
                                          fieldState.error
                                            ? fieldState.error.message
                                            : null
                                        }
                                      />
                                    )}
                                  />
                                )}
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              {/* Zip Code */}
                              <Controller
                                name="zip_code"
                                control={control}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    type="text"
                                    id="outlined-basic"
                                    label="Zip Code"
                                    variant="outlined"
                                    onChange={(e) => {
                                      field.onChange(e);
                                      setCoverData((prevData) => ({
                                        ...prevData,
                                        zip_code: e.target.value,
                                      }));
                                    }}
                                    className="w-full"
                                    error={!!errors.zip_code}
                                    helperText={errors.zip_code?.message}
                                  />
                                )}
                              />
                              {/* street_address */}
                              <Controller
                                name="street_address"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    sx={{ width: "100%" }}
                                    id="outlined-basic"
                                    label="Street Address"
                                    variant="outlined"
                                    onChange={(e) => {
                                      field.onChange(e);
                                      setCoverData((prevData) => ({
                                        ...prevData,
                                        street_address: e.target.value,
                                      }));
                                    }}
                                    className="w-full"
                                    error={!!errors.street_address}
                                    helperText={errors.street_address?.message}
                                  />
                                )}
                              />
                            </div>

                            {/* Experience */}
                            <div className="m-auto w-[95%]">
                              {/* Label for experience */}
                              <label
                                htmlFor="experience-slider"
                                className="block mb-1 text-base font-medium text-gray-700"
                              >
                                Your Experience{" "}
                                {`( ${watch("experience") > 10
                                  ? "10+ Years"
                                  : watch("experience") > 1
                                    ? `${watch("experience")} Years`
                                    : `${watch("experience")} Year`
                                  } )`}
                              </label>
                              {/* Experience Slider */}
                              <Box sx={{ width: "100%" }}>
                                <Controller
                                  name="experience"
                                  control={control}
                                  defaultValue={0}
                                  render={({ field }) => (
                                    <Slider
                                      {...field}
                                      aria-label="Experience"
                                      defaultValue={0}
                                      value={field.value}
                                      step={0.5}
                                      min={0}
                                      max={10.5}
                                      marks={marks}
                                      onChange={(_, value) => {
                                        field.onChange(value);
                                        setCoverData((prevData) => ({
                                          ...prevData,
                                          experience: value,
                                        }));
                                      }}
                                    />
                                  )}
                                />
                              </Box>
                            </div>

                            {/* ! ******** ! */}
                            <hr />
                            <div className="flex justify-between items-center">
                              <span>Contact Person Details</span>
                              <div className="flex items-center gap-2 cursor-pointer">
                                <Controller
                                  name="show_personal_information"
                                  control={control}
                                  render={({ field }) => (
                                    <>
                                      <input
                                        {...field}
                                        id="section"
                                        type="checkbox"
                                        onChange={(e) => {
                                          field.onChange(e);
                                          const value = e.target.checked;
                                          console.log(value);
                                          console.log(value ? 1 : 0);
                                          setCoverData((prev) => ({
                                            ...prev,
                                            show_personal_information: value
                                              ? 1
                                              : 0,
                                          }));
                                        }}
                                        checked={watch(
                                          "show_personal_information"
                                        )}
                                      />
                                      <label
                                        htmlFor="section"
                                        className="select-none"
                                      >
                                        Hide/Show Contact Person Details
                                      </label>
                                    </>
                                  )}
                                />
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {/* contact_person_name */}
                              <Controller
                                name="contact_person_name"
                                control={control}
                                // rules={{
                                //   required: "Contact Person Name is required",
                                // }}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    id="outlined-basic"
                                    label="Contact Person Name"
                                    variant="outlined"
                                    onChange={(e) => {
                                      field.onChange(e);
                                      setCoverData((prevData) => ({
                                        ...prevData,
                                        contact_person_name: e.target.value,
                                      }));
                                    }}
                                    className="w-full"
                                    error={!!errors.contact_person_name}
                                    helperText={
                                      errors.contact_person_name?.message
                                    }
                                  />
                                )}
                              />
                              {/* contact_person_designation */}
                              <Controller
                                name="contact_person_designation"
                                control={control}
                                // rules={{
                                //   required:
                                //     "Contact Person Designation is required",
                                // }}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    id="outlined-basic"
                                    label="Contact Person Designation"
                                    variant="outlined"
                                    onChange={(e) => {
                                      field.onChange(e);
                                      setCoverData((prevData) => ({
                                        ...prevData,
                                        contact_person_designation:
                                          e.target.value,
                                      }));
                                    }}
                                    className="w-full"
                                    error={!!errors.contact_person_designation}
                                    helperText={
                                      errors.contact_person_designation?.message
                                    }
                                  />
                                )}
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              {/* contact_person_email */}
                              <Controller
                                name="contact_person_email"
                                control={control}
                                rules={{
                                  // required: "Contact Person Email is required",
                                  pattern: {
                                    value:
                                      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "invalid Contact Person Email",
                                  },
                                }}
                                defaultValue=""
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    sx={{ width: "100%" }}
                                    id="outlined-basic"
                                    label="Contact Person Email"
                                    variant="outlined"
                                    onChange={(e) => {
                                      field.onChange(e);
                                      setCoverData((prevData) => ({
                                        ...prevData,
                                        contact_person_email: e.target.value,
                                      }));
                                    }}
                                    className="w-full"
                                    error={!!errors.contact_person_email}
                                    helperText={
                                      errors.contact_person_email?.message
                                    }
                                  />
                                )}
                              />
                              {/* contact_person_phone */}
                              <Controller
                                name="contact_person_phone"
                                control={control}
                                render={({ field }) => (
                                  <PhoneInput
                                    {...field}
                                    placeholder="Contact Person Phone"
                                    autoComplete="on"
                                    inputProps={{
                                      name: "contact_person_phone",
                                    }}
                                    onChange={(e) => {
                                      field.onChange(e);
                                      setCoverData((prevData) => ({
                                        ...prevData,
                                        contact_person_phone: e,
                                      }));
                                    }}
                                    className={` ${errors?.contact_person_phone
                                      ? "border-red-500 border"
                                      : " border"
                                      }  w-full leading-3 py-[13px] rounded-md px-[14px] `}
                                  />
                                )}
                              />
                            </div>

                            {/* employeer_name */}
                            <Controller
                              name="employeer_name"
                              control={control}
                              // rules={{
                              //   required: "Employeer Name is required",
                              // }}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  id="outlined-basic"
                                  label="Company Name"
                                  variant="outlined"
                                  onChange={(e) => {
                                    field.onChange(e);
                                    setCoverData((prevData) => ({
                                      ...prevData,
                                      employeer_name: e.target.value,
                                    }));
                                  }}
                                  className="w-full"
                                  error={!!errors.employeer_name}
                                  helperText={errors.employeer_name?.message}
                                />
                              )}
                            />
                            {/* company_address */}
                            <Controller
                              name="company_address"
                              control={control}
                              // rules={{
                              //   required: "Company Address is required",
                              // }}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  id="outlined-basic"
                                  label="Company Address"
                                  variant="outlined"
                                  onChange={(e) => {
                                    field.onChange(e);
                                    setCoverData((prevData) => ({
                                      ...prevData,
                                      company_address: e.target.value,
                                    }));
                                  }}
                                  className="w-full"
                                  error={!!errors.company_address}
                                  helperText={errors.company_address?.message}
                                />
                              )}
                            />

                            {/* ***** Next Section **** */}
                            <hr />
                            <span>Cover Content</span>
                            {/* Opener */}
                            <div className="relative">
                              <div
                                className="bg-white w-fit h-fit p-1 rounded-full cursor-pointer absolute bottom-2 right-4 z-10"
                                title="Need Suggestions?"
                                onClick={() => {
                                  setSuggestionOpen(true);
                                  setSuggestionFor("opener");
                                }}
                              >
                                <HiOutlineLightBulb
                                  size={30}
                                  className="text-[#0072B1]"
                                  title="Need Suggestions?"
                                />
                              </div>
                              <Controller
                                name="opener_detail"
                                control={control}
                                rules={{
                                  required: "Opener is required",
                                  maxLength: { value: 1000 },
                                }}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    id="filled-multiline-static"
                                    label={`Opener Content* (${watch("opener_detail")?.length ===
                                      undefined
                                      ? 0
                                      : watch("opener_detail")?.length
                                      }/1000)`}
                                    rows={4}
                                    multiline
                                    className="w-full"
                                    InputLabelProps={{
                                      shrink: Boolean(field.value),
                                    }}
                                    onChange={(e) => {
                                      const value = e.target.value;

                                      if (value.length <= 1000) {
                                        field.onChange(e);
                                        setCoverData((prevData) => ({
                                          ...prevData,
                                          opener_detail: e.target.value,
                                        }));
                                      }
                                    }}
                                    error={!!errors.opener_detail}
                                    helperText={errors.opener_detail?.message}
                                  />
                                )}
                              />
                            </div>

                            {/* closer_detail */}
                            <div className="relative">
                              <div
                                className="bg-white w-fit h-fit p-1 rounded-full cursor-pointer absolute bottom-2 right-4 z-10"
                                title="Need Suggestions?"
                                onClick={() => {
                                  setSuggestionOpen(true);
                                  setSuggestionFor("closer");
                                }}
                              >
                                <HiOutlineLightBulb
                                  size={30}
                                  className="text-[#0072B1]"
                                  title="Need Suggestions?"
                                />
                              </div>
                              <Controller
                                name="closer_detail"
                                control={control}
                                rules={{
                                  required: "Closer required",

                                  maxLength: {
                                    value: 1000,
                                    message: "Box only Content 5 charectors",
                                  },
                                }}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    id="filled-multiline-static"
                                    label={`Closer Content* (${watch("closer_detail")?.length ===
                                      undefined
                                      ? 0
                                      : watch("closer_detail")?.length
                                      }/1000)`}
                                    rows={4}
                                    multiline
                                    className="w-full"
                                    InputLabelProps={{
                                      shrink: Boolean(field.value),
                                    }}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      if (value.length <= 1000) {
                                        field.onChange(e);
                                        setCoverData((prevData) => ({
                                          ...prevData,
                                          closer_detail: e.target.value,
                                        }));
                                      }
                                    }}
                                    error={!!errors.closer_detail}
                                    helperText={errors.closer_detail?.message}
                                  />
                                )}
                              />
                            </div>
                            <div className="w-full">
                              {coverIsUpdating ? (
                                <button
                                  type="button"
                                  disabled
                                  className="bg-primary-green w-full py-2 rounded-md text-white font-semibold"
                                >
                                  {!coverHasSaved ? (
                                    <>
                                      <div className="flex justify-center items-center">
                                        <svg
                                          aria-hidden="true"
                                          className="w-6 h-6 text-gray-200 animate-spin  fill-primary-green"
                                          viewBox="0 0 100 101"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor"
                                          />
                                          <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill"
                                          />
                                        </svg>
                                        <span className="sr-only">
                                          Loading...
                                        </span>
                                      </div>
                                    </>
                                  ) : (
                                    "Saved"
                                  )}
                                </button>
                              ) : (
                                <button
                                  type="submit"
                                  className="bg-primary-blue w-full py-2 rounded-md text-white font-semibold"
                                >
                                  Save
                                </button>
                              )}
                            </div>
                          </form>
                        </div>
                      </div>
                      {/*  */}
                      <div className="relative bg-white">
                        {suggestionsOpen && (
                          <>
                            <div className="flex items-center justify-center relative">
                              <span className="text-lg font-semibold text-center">
                                Suggestions
                              </span>
                              <div
                                onClick={() => {
                                  setSuggestionOpen(false);
                                  setSuggestionFor("");
                                }}
                                className="absolute flex justify-center items-center cursor-pointer top-0 right-0 w-[40px] h-[40px]"
                              >
                                <LiaTimesSolid size={20} />
                              </div>
                            </div>
                            {/* newnew */}
                            {/* Opener */}
                            {suggestionFor === "opener" ? (
                              <ul className="flex flex-col gap-4 mt-8 px-4">
                                {openerSuggestion?.map((sug, idx) => (
                                  <li
                                    key={idx}
                                    className="border p-2 rounded-2 cursor-pointer"
                                    onClick={() => {
                                      const currentOpenerDetail =
                                        getValues("opener_detail"); // Get the current value
                                      const newOpenerDetail = `${currentOpenerDetail
                                        ? currentOpenerDetail
                                        : ""
                                        } ${sug.body}`.trim(); // Append the new value with a space
                                      setValue(
                                        "opener_detail",
                                        newOpenerDetail
                                      ); // Set the combined value
                                      setSuggestionOpen(false);
                                    }}
                                  >
                                    {sug.body}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              ""
                            )}
                            {/* Closer */}
                            {suggestionFor === "closer" ? (
                              <ul className="flex flex-col gap-4 mt-8 px-4">
                                {closerSuggestion?.map((sug, idx) => (
                                  <li
                                    key={idx}
                                    className="border p-2 rounded-2 cursor-pointer"
                                    onClick={() => {
                                      const currentOpenerDetail =
                                        getValues("closer_detail"); // Get the current value
                                      const newOpenerDetail = `${currentOpenerDetail
                                        ? currentOpenerDetail
                                        : ""
                                        } ${sug.body}`.trim(); // Append the new value with a space
                                      setValue(
                                        "closer_detail",
                                        newOpenerDetail
                                      ); // Set the combined value
                                      setSuggestionOpen(false);
                                    }}
                                  >
                                    {sug.body}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              ""
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                <div
                  className={`hidden lg:block p-2 2xl:right-0 absolute rounded-xl min-w-[200px] max-w-[600px] right-0 min-h-[300px] max-h-[700px] overflow-y-auto bg-[#fff] shadow-lg `}
                >
                  <div className={``}>
                    {/* !Siraj */}
                    {activeToolBarTab === 2 && (
                      <div className="w-[500px]">
                        <label className="text-black font-Lexend text-lg mb-2">
                          Signature
                        </label>
                        <Tab.Group
                          onChange={() => {
                            setIsUploadedSignature("");
                            setValue("upload", "");
                            setValue("type", "");
                          }}
                        >
                          <Tab.List className={"flex items-center"}>
                            <Tab
                              className={({ selected }) =>
                                classNames(
                                  "px-2 py-4 font-semibold w-full border-r text-white rounded-tl-md border-white outline-none ",
                                  selected
                                    ? "bg-primary-green "
                                    : "bg-primary-blue "
                                )
                              }
                            >
                              Draw
                            </Tab>

                            <Tab
                              className={({ selected }) =>
                                classNames(
                                  "px-2 py-4 font-semibold text-white w-full  border-r border-white outline-none",
                                  selected
                                    ? "bg-primary-green  "
                                    : "bg-primary-blue "
                                )
                              }
                            >
                              Upload
                            </Tab>
                            <Tab
                              className={({ selected }) =>
                                classNames(
                                  "px-2 py-4 font-semibold w-full text-white   rounded-tr-md outline-none",
                                  selected
                                    ? "bg-primary-green  "
                                    : "bg-primary-blue "
                                )
                              }
                            >
                              Type
                            </Tab>
                          </Tab.List>
                          <Tab.Panels>
                            <form onSubmit={handleSubmit(handleSaveSignature)}>
                              {/* Drew */}

                              <Tab.Panel>
                                <div className="border b-solid border-black">
                                  <Controller
                                    name="drew"
                                    control={control}
                                    render={({ field }) => (
                                      <ReactSignatureCanvas
                                        ref={signatureRef2}
                                        canvasProps={{
                                          className:
                                            "bg-white !w-full h-[200px]",
                                        }}
                                        onEnd={() => {
                                          const trimmedCanvas =
                                            signatureRef2.current.getTrimmedCanvas();
                                          const dataUrl =
                                            trimmedCanvas.toDataURL(
                                              "image/png"
                                            );
                                          setSignatureData({
                                            type: "drew",
                                            value: dataUrl,
                                          });
                                          field.onChange(dataUrl);
                                          setIsUploadedSignature("");
                                          setValue("upload", "");
                                          setValue("type", "");
                                        }}
                                      />
                                    )}
                                  />
                                </div>
                              </Tab.Panel>

                              {/* Uppload */}
                              <Tab.Panel>
                                <div className="border b-solid border-black">
                                  <Controller
                                    name="upload"
                                    control={control}
                                    render={({ field }) => (
                                      <>
                                        <input
                                          id="signatureUpload"
                                          type="file"
                                          className="hidden"
                                          onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                              field.onChange(file); // This updates the react-hook-form value
                                              setIsUploadedSignature(file); // This updates your local state
                                              setSignatureData({
                                                type: "upload",
                                                value: file,
                                              });
                                              setValue("type", "");
                                            }
                                          }}
                                        />
                                        <div
                                          className="h-[200px] w-full bg-white flex justify-center items-center flex-col gap-2 cursor-pointer"
                                          onClick={() =>
                                            document
                                              .getElementById("signatureUpload")
                                              .click()
                                          }
                                        >
                                          {isUploadedSignature ? (
                                            <img
                                              src={URL.createObjectURL(
                                                isUploadedSignature
                                              )}
                                              alt="upload"
                                              className="w-full h-full object-cover"
                                            />
                                          ) : (
                                            <>
                                              <FcSignature size={60} />
                                              <div className="flex items-center gap-2 font-semibold font-Lexend">
                                                Upload Your Signature
                                                <BiUpload size={23} />
                                              </div>
                                            </>
                                          )}
                                        </div>
                                      </>
                                    )}
                                  />
                                </div>
                              </Tab.Panel>

                              {/* Type */}
                              <Tab.Panel>
                                <div className="border b-solid border-black">
                                  <Controller
                                    name="type"
                                    control={control}
                                    render={({ field }) => (
                                      <TextField
                                        {...field}
                                        id="outlined-basic"
                                        // label="Type Your Signature"
                                        placeholder="Type Your Signature"
                                        variant="outlined"
                                        rows={7.2}
                                        multiline
                                        onChange={(e) => {
                                          field.onChange(e);
                                          setSignatureData({
                                            type: "type",
                                            value: e.target.value,
                                          });
                                          setIsUploadedSignature("");
                                          setValue("upload", "");
                                        }}
                                        inputProps={{
                                          style: {
                                            outline: "none",
                                            border: "none",
                                          },
                                        }}
                                        className="w-full bg-white text-[25px] outline-none"
                                        error={!!errors.type}
                                        helperText={errors.type?.message}
                                      />
                                    )}
                                  />
                                </div>
                              </Tab.Panel>
                              <button
                                type="submit"
                                id="submitSignature"
                                className="hidden"
                              />
                            </form>
                            {SignatureError && (
                              <span className="text-sm text-red-500">
                                {SignatureError}
                              </span>
                            )}
                            <div className="py-2 flex items-center gap-2">
                              {isSignatureIsSaving ? (
                                <button
                                  onClick={() =>
                                    document
                                      .getElementById("submitSignature")
                                      .click()
                                  }
                                  className="px-6 py-2 bg-primary-green rounded-md text-white"
                                >
                                  {!isSignatureHasSaved ? (
                                    <>
                                      <div className="flex justify-center items-center">
                                        <svg
                                          aria-hidden="true"
                                          className="w-6 h-6 text-gray-200 animate-spin  fill-primary-green"
                                          viewBox="0 0 100 101"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor"
                                          />
                                          <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill"
                                          />
                                        </svg>
                                        <span className="sr-only">
                                          Loading...
                                        </span>
                                      </div>
                                    </>
                                  ) : (
                                    "Saved"
                                  )}
                                </button>
                              ) : (
                                <button
                                  onClick={() =>
                                    document
                                      .getElementById("submitSignature")
                                      .click()
                                  }
                                  className="px-6 py-2 bg-primary-blue rounded-md text-white"
                                >
                                  Save
                                </button>
                              )}
                              <button
                                className="px-6 py-2 bg-red-400 text-white rounded-md"
                                onClick={clearSignature}
                              >
                                Clear
                              </button>
                            </div>
                          </Tab.Panels>
                        </Tab.Group>
                        {/* Signature */}
                      </div>
                    )}
                    {activeToolBarTab === 3 && (
                      <div className="w-[560px]">
                        {/* Templates */}
                        <div className="flex flex-row-reverse">
                          <div className="grid grid-cols-2 gap-4">
                            {/* {coverTemplatesListing?.map((template, idx) => (
                              <div
                                key={idx}
                                className="cursor-pointer hover:bg-[rgba(0,0,0,0.2)] relative"
                                onClick={() => {
                                  setActiveTemplate(template.id);
                                  setPaidTemplate(template.is_paid);
                                  setCoverData((prev) => ({
                                    ...prev,
                                    cover_template_id: template.id,
                                  }));
                                  changeFormatingCover(
                                    template.id,

                                    activeTheme,
                                    activeFont,
                                    activeFontSize
                                  );
                                }}
                              >
                                {template.is_paid === 1 && (
                                  <div
                                    className="flex bg-gradient-to-r from-[#01B2AC] to-[#0072B1] w-[150px] h-8 absolute left-[-35px] top-16 text-white -rotate-45 justify-center items-center z-50"
                                    style={{
                                      clipPath:
                                        "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
                                    }}
                                  >
                                    <img src={premium} alt="premium icon" />
                                    <span>Premium</span>
                                  </div>
                                )}
                                <h2 className="text-[#0f4d76] text-md font-Lexend py-2">
                                  {template.name}
                                </h2>
                                <img
                                  src={global.imageUrl + template.image}
                                  alt={template.name}
                                  className="rounded-lg"
                                  style={{
                                    boxShadow: "0px 0px 5px rgba(0,0,0,0.4)",
                                  }}
                                />
                              </div>
                            ))} */}
                            {newTemplates?.map((templatenew, idx) => (
                              <div
                                key={idx}
                                className="cursor-pointer hover:bg-[rgba(0,0,0,0.2)] relative"
                                onClick={() => {
                                  setActiveTemplate(templatenew.id);
                                  setPaidTemplate(0);
                                  setCoverData((prev) => ({
                                    ...prev,
                                    cover_template_id: templatenew.id,
                                  }));
                                  changeFormatingCover(
                                    templatenew.id,

                                    activeTheme,
                                    activeFont,
                                    activeFontSize
                                  );
                                }}
                              >
                                {0 === 1 && (
                                  <div
                                    className="flex bg-gradient-to-r from-[#01B2AC] to-[#0072B1] w-[150px] h-8 absolute left-[-35px] top-16 text-white -rotate-45 justify-center items-center z-50"
                                    style={{
                                      clipPath:
                                        "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
                                    }}
                                  >
                                    <img src={premium} alt="premium icon" />
                                    <span>Premium</span>
                                  </div>
                                )}
                                <h2 className="text-[#0f4d76] text-md font-Lexend py-2">
                                  {templatenew.name}
                                </h2>
                                <img
                                  src={templatenew.image}
                                  alt={templatenew.name}
                                  className="rounded-lg"
                                  style={{
                                    boxShadow: "0px 0px 5px rgba(0,0,0,0.4)",
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    {activeToolBarTab === 5 && (
                      <div className="w-[550px]">
                        {/* Themes */}
                        <Themes
                          activeTheme={(val) => {
                            setActiveTheme(val);
                            changeFormatingCover(
                              activeTemplate,
                              val,
                              activeFont,
                              activeFontSize
                            );
                          }}
                        />
                      </div>
                    )}
                    {activeToolBarTab === 4 && (
                      <div className="w-[350px]">
                        {/* Fonts */}
                        <Fonts
                          activeFont={(val) => {
                            setActiveFont(val);
                            changeFormatingCover(
                              activeTemplate,
                              activeTheme,
                              val,
                              activeFontSize
                            );
                          }}
                          setActiveFontSize={(val) => {
                            setActiveFontSize(val);
                            changeFormatingCover(
                              activeTemplate,
                              activeTheme,
                              activeFont,
                              val
                            );
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:hidden fixed bottom-0 w-full pb-2 px-2 z-20 bg-[#1a2230]">
            <div className="bg-[#01B2AC] w-full rounded-full flex justify-evenly py-6 relative top-[-10px]">
              {toolbarResumeTabs.map((tab) => (
                <div
                  className={"relative text-white"}
                  onClick={() => {
                    setActiveToolBarTab(tab.id);
                  }}
                >
                  <div className="text-2xl">{tab.icon}</div>
                </div>
              ))}
              <div
                className={" relative text-white"}
                onClick={() => {
                  setMobBtns(!MobBtns);
                }}
              >
                <div className="text-2xl">
                  <IoIosArrowUp />
                </div>
                {MobBtns ? (
                  <div className="absolute p-1 rounded-full bg-[#0072B1] bottom-[50px] right-[-15px]">
                    <div
                      className={
                        "flex items-center text-white cursor-pointer py-3 px-3  group relative"
                      }
                      onClick={downloadPDF}
                    >
                      <div className="absolute right-0 z-20 group-hover:flex hidden justify-start px-2 rounded-full bg-secondary-blue w-[200px] items-center h-full ">
                        <div className="text-2xl">
                          <FiDownload />
                        </div>
                        <div className={`text-md font-lexend font-medium pl-2`}>
                          Download
                        </div>
                      </div>
                      <div className="text-2xl">
                        <FiDownload />
                      </div>
                    </div>

                    <div
                      className={
                        "flex items-center text-white cursor-pointer py-3 px-3  group relative"
                      }
                      onClick={() => {
                        share_doc();
                      }}
                    >
                      <div className="absolute right-0 z-20 group-hover:flex hidden justify-start px-2 rounded-full bg-secondary-blue w-[200px] items-center h-full ">
                        <div className="text-2xl">
                          <LuShare2 />
                        </div>
                        <div className={`text-md font-lexend font-medium pl-2`}>
                          Share
                        </div>
                      </div>
                      <div className="text-2xl">
                        <LuShare2 />
                      </div>
                    </div>

                    <div
                      className={
                        "flex items-center text-white cursor-pointer py-3 px-3  group relative"
                      }
                      onClick={() => {
                        download_email();
                      }}
                    >
                      <div className="absolute right-0 z-20 group-hover:flex hidden justify-start px-2 rounded-full bg-secondary-blue w-[200px] items-center h-full ">
                        <div className="text-2xl">
                          <TfiEmail />
                        </div>
                        <div className={`text-md font-lexend font-medium pl-2`}>
                          Email
                        </div>
                      </div>
                      <div className="text-2xl">
                        <TfiEmail />
                      </div>
                    </div>

                    <div
                      className={
                        "flex items-center text-white cursor-pointer py-3 px-3  group relative"
                      }
                      onClick={(e) =>
                        duplicate_delete_document(
                          "duplicate",
                          my_resumes.template_id,
                          my_resumes.uuid,
                          "Cover",
                          "abc"
                        )
                      }
                    >
                      <div className="absolute right-0 z-20 group-hover:flex hidden justify-start px-2 rounded-full bg-secondary-blue w-[200px] items-center h-full ">
                        <div className="text-2xl">
                          <HiOutlineDuplicate />
                        </div>
                        <div className={`text-md font-lexend font-medium pl-2`}>
                          Duplicate
                        </div>
                      </div>
                      <div className="text-2xl">
                        <HiOutlineDuplicate />
                      </div>
                    </div>
                    <div
                      className={
                        "flex items-center text-white cursor-pointer py-3 px-3  group relative"
                      }
                      onClick={(e) =>
                        duplicate_delete_document(
                          "delete",
                          my_resumes.template_id,
                          my_resumes.uuid,
                          "Cover",
                          my_resumes.resume_name
                        )
                      }
                    >
                      <div className="absolute right-0 z-20 group-hover:flex hidden justify-start px-2 rounded-full bg-secondary-blue w-[200px] items-center h-full ">
                        <div className="text-2xl">
                          <RxTrash />
                        </div>
                        <div className={`text-md font-lexend font-medium pl-2`}>
                          Delete
                        </div>
                      </div>
                      <div className="text-2xl">
                        <RxTrash />
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          {/* Screens */}
          <div
            className={`relative ${activeToolBarTab > 0 ? "block" : "hidden"} `}
          >
            <div
              className={`lg:hidden p-2 2xl:right-0 fixed rounded-xl w-[90%] left-[5%] bottom-10 z-10 max-h-[600px] overflow-y-auto bg-[#fff] shadow-lg pb-20`}
            >
              {activeToolBarTab != 0 ? (
                <div
                  onClick={() => {
                    setActiveToolBarTab(!activeToolBarTab);
                  }}
                  className={`sticky top-[10px] left-[10px] bg-[#E66868] hover:bg-[#E66868] mb-4 w-[30px] h-[30px] text-[#fff] rounded-full flex justify-center items-center cursor-pointer z-30`}
                >
                  {suggestionsOpen ? "" : <RxCross1 size={20} />}
                </div>
              ) : (
                ""
              )}
              <div className={``}>
                {activeToolBarTab === 1 && (
                  <div
                    className={`grid ${suggestionsOpen ? "transform translate-x-[-100%]" : ""
                      }  grid-cols-[100%,100%] transition-[0.9s]`}
                  >
                    {/* newnewnew */}
                    <div className=" min-h-[600px] max-h-[600px] overflow-x-scroll scroll-bar-hide transition-all">
                      {formOpen && (
                        <div
                          className="border-2 text-white rounded-full w-[40px] h-[40px] cursor-pointer flex justify-center items-center"
                          onClick={() => closeOpenForms()}
                        >
                          <IoIosArrowBack size={20} />
                        </div>
                      )}

                      <div>
                        <form
                          onSubmit={handleSubmit(coverSubmit)}
                          className="px-1 flex flex-col gap-2"
                        >
                          <div className="flex flex-col sm:flex-row justify-between gap-2 pt-2">
                            <Controller
                              name="update_id"
                              control={control}
                              render={({ field }) => (
                                <input type="hidden" {...field} />
                              )}
                            />
                            {/* First Name */}
                            <Controller
                              name="first_name"
                              control={control}
                              rules={{
                                required: "first Name is required",
                              }}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  id="outlined-basic"
                                  label="First Name*"
                                  variant="outlined"
                                  onChange={(e) => {
                                    field.onChange(e);
                                    setCoverData((prevData) => ({
                                      ...prevData,
                                      first_name: e.target.value,
                                    }));
                                  }}
                                  className="w-full"
                                  error={!!errors.first_name}
                                  helperText={errors.first_name?.message}
                                />
                              )}
                            />
                            {/* Last Name */}
                            <Controller
                              name="last_name"
                              control={control}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  id="outlined-basic"
                                  label="Last Name"
                                  variant="outlined"
                                  onChange={(e) => {
                                    field.onChange(e);
                                    setCoverData((prevData) => ({
                                      ...prevData,
                                      last_name: e.target.value,
                                    }));
                                  }}
                                  className="w-full"
                                />
                              )}
                            />
                          </div>
                          {/* Job Title */}

                          <Controller
                            name="job_title"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: "Job Title is required",
                            }}
                            render={({ field }) => (
                              <Autocomplete
                                {...field}
                                freeSolo
                                options={jobPostions
                                  ?.sort((a, b) => a.name.localeCompare(b.name))
                                  .map((option) => option.name)}
                                onChange={(e, value) => {
                                  field.onChange(value);
                                  setCoverData((prevData) => ({
                                    ...prevData,
                                    job_title: value,
                                  }));
                                }}
                                onInputChange={(e, value) => {
                                  field.onChange(value);
                                  setCoverData((prevData) => ({
                                    ...prevData,
                                    job_title: value,
                                  }));
                                }}
                                value={field.value}
                                sx={{ width: "100%" }}
                                defaultValue={null}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    defaultValue={""}
                                    label="Position/Job Title*"
                                    error={!!errors.job_title}
                                    helperText={
                                      errors.job_title
                                        ? errors.job_title.message
                                        : null
                                    }
                                  />
                                )}
                              />
                            )}
                          />

                          <div className="flex flex-col items-center gap-2">
                            {/* email_address */}
                            <Controller
                              name="email_address"
                              control={control}
                              rules={{
                                required: "Email Address required",
                                pattern: {
                                  value:
                                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: "invalid email address",
                                },
                              }}
                              defaultValue=""
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  sx={{ width: "100%" }}
                                  id="outlined-basic"
                                  label="Email Address*"
                                  variant="outlined"
                                  onChange={(e) => {
                                    field.onChange(e);
                                    setCoverData((prevData) => ({
                                      ...prevData,
                                      email_address: e.target.value,
                                    }));
                                  }}
                                  error={!!errors.email_address}
                                  helperText={errors.email_address?.message}
                                />
                              )}
                            />
                            {/* phone_number */}
                            <Controller
                              name="phone_number"
                              control={control}
                              render={({ field }) => (
                                <PhoneInput
                                  {...field}
                                  placeholder="Phone Number"
                                  autoComplete="on"
                                  inputProps={{
                                    name: "phone_number",
                                  }}
                                  onChange={(e) => {
                                    field.onChange(e);
                                    setCoverData((prevData) => ({
                                      ...prevData,
                                      phone_number: e,
                                    }));
                                  }}
                                  className={` ${errors?.phone_number
                                    ? "border-red-500 border"
                                    : " border"
                                    }  w-full leading-3 py-[14px] rounded-md px-[14px]`}
                                />
                              )}
                            />
                          </div>
                          <div className="flex flex-col sm:flex-row items-center gap-2">
                            {/* country_id */}
                            <Box sx={{ width: "100%" }}>
                              <FormControl
                                fullWidth
                                error={!!errors.country_id}
                              >
                                <InputLabel
                                  id="demo-simple-select-label"
                                // shrink={!!watch("country_id")}
                                >
                                  Country*
                                </InputLabel>
                                <Controller
                                  name="country_id"
                                  control={control}
                                  defaultValue={""}
                                  render={({ field }) => (
                                    <Select
                                      {...field}
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      label="Country"
                                      onChange={(e) => {
                                        field.onChange(e.target.value);
                                        setCoverData((prevData) => ({
                                          ...prevData,
                                          country_id: e.target.value,
                                        }));
                                      }}
                                    >
                                      <MenuItem value={""} disabled>
                                        Select Country
                                      </MenuItem>
                                      {countries
                                        ?.filter(
                                          (country) => country.name !== "Empty"
                                        )
                                        .map((country, idx) => (
                                          <MenuItem
                                            key={idx}
                                            value={country.id}
                                          >
                                            {country.name}
                                          </MenuItem>
                                        ))}
                                    </Select>
                                  )}
                                />
                                {errors.country_id && (
                                  <p>{errors.country_id.message}</p>
                                )}
                              </FormControl>
                            </Box>
                            {/* State */}
                            <Controller
                              name="state"
                              control={control}
                              defaultValue=""
                              render={({ field }) => (
                                <Autocomplete
                                  {...field}
                                  freeSolo
                                  options={allStates.map(
                                    (option) => option.name
                                  )}
                                  onChange={(e, value) => {
                                    console.log(value);
                                    field.onChange(value);
                                    setValue("state", value);
                                    setCoverData((prev) => ({
                                      ...prev,
                                      state: value,
                                    }));
                                  }}
                                  onInputChange={(e, value) => {
                                    field.onChange(value);
                                    setValue("state", value);
                                    handleInputState(value);
                                    setCoverData((prev) => ({
                                      ...prev,
                                      state: value,
                                    }));
                                  }}
                                  value={field.value}
                                  sx={{ width: "100%" }}
                                  defaultValue={null}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      defaultValue={""}
                                      label="State"
                                      error={!!errors.state}
                                      helperText={
                                        errors.state
                                          ? errors.state.message
                                          : null
                                      }
                                    />
                                  )}
                                />
                              )}
                            />

                            {/* City New */}
                            <Controller
                              name="city"
                              control={control}
                              defaultValue=""
                              render={({ field, fieldState }) => (
                                <Autocomplete
                                  {...field}
                                  defaultValue={""}
                                  freeSolo
                                  options={cities.map((option) => option.name)}
                                  onChange={(e, value) => {
                                    field.onChange(value);
                                    setValue("city", value);
                                    setCoverData((prev) => ({
                                      ...prev,
                                      city: value,
                                    }));
                                  }}
                                  onInputChange={(e, value) => {
                                    field.onChange(value);
                                    setValue("city", value);
                                    handleInputChange(value);
                                    setCoverData((prev) => ({
                                      ...prev,
                                      city: value,
                                    }));
                                  }}
                                  value={field.value}
                                  sx={{ width: "100%" }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="City"
                                      error={!!fieldState.error}
                                      helperText={
                                        fieldState.error
                                          ? fieldState.error.message
                                          : null
                                      }
                                    />
                                  )}
                                />
                              )}
                            />
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            {/* Zip Code */}
                            <Controller
                              name="zip_code"
                              control={control}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  type="text"
                                  id="outlined-basic"
                                  label="Zip Code"
                                  variant="outlined"
                                  onChange={(e) => {
                                    field.onChange(e);
                                    setCoverData((prevData) => ({
                                      ...prevData,
                                      zip_code: e.target.value,
                                    }));
                                  }}
                                  className="w-full"
                                  error={!!errors.zip_code}
                                  helperText={errors.zip_code?.message}
                                />
                              )}
                            />
                            {/* street_address */}
                            <Controller
                              name="street_address"
                              control={control}
                              defaultValue=""
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  sx={{ width: "100%" }}
                                  id="outlined-basic"
                                  label="Street Address"
                                  variant="outlined"
                                  onChange={(e) => {
                                    field.onChange(e);
                                    setCoverData((prevData) => ({
                                      ...prevData,
                                      street_address: e.target.value,
                                    }));
                                  }}
                                  className="w-full"
                                  error={!!errors.street_address}
                                  helperText={errors.street_address?.message}
                                />
                              )}
                            />
                          </div>

                          {/* Experience */}
                          <div className="m-auto w-[95%]">
                            {/* Label for experience */}
                            <label
                              htmlFor="experience-slider"
                              className="block mb-1 text-base font-medium text-gray-700"
                            >
                              Your Experience{" "}
                              {`( ${watch("experience") > 10
                                ? "10+ Years"
                                : watch("experience") > 1
                                  ? `${watch("experience")} Years`
                                  : `${watch("experience")} Year`
                                } )`}
                            </label>
                            {/* Experience Slider */}
                            <Box sx={{ width: "100%" }}>
                              <Controller
                                name="experience"
                                control={control}
                                defaultValue={0}
                                render={({ field }) => (
                                  <Slider
                                    {...field}
                                    aria-label="Experience"
                                    defaultValue={0}
                                    value={field.value}
                                    step={0.5}
                                    min={0}
                                    max={11}
                                    marks={marksMobile}
                                    onChange={(_, value) => {
                                      field.onChange(value);
                                      setCoverData((prevData) => ({
                                        ...prevData,
                                        experience: value,
                                      }));
                                    }}
                                  />
                                )}
                              />
                            </Box>
                          </div>

                          {/* ! ******** ! */}
                          <hr />
                          <div className="flex justify-between items-center">
                            <span>Contact Person Details</span>
                            <div className="flex items-center gap-2 cursor-pointer">
                              <Controller
                                name="show_personal_information"
                                control={control}
                                render={({ field }) => (
                                  <>
                                    <input
                                      {...field}
                                      id="section"
                                      type="checkbox"
                                      onChange={(e) => {
                                        field.onChange(e);
                                        const value = e.target.checked;
                                        setCoverData((prev) => ({
                                          ...prev,
                                          show_personal_information: value
                                            ? 1
                                            : 0,
                                        }));
                                      }}
                                      checked={watch(
                                        "show_personal_information"
                                      )}
                                    />
                                    <label
                                      htmlFor="section"
                                      className="select-none"
                                    >
                                      Hide/Show Details
                                    </label>
                                  </>
                                )}
                              />
                            </div>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            {/* contact_person_name */}
                            <Controller
                              name="contact_person_name"
                              control={control}
                              // rules={{
                              //   required: "Contact Person Name is required",
                              // }}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  id="outlined-basic"
                                  label="Contact Person Name"
                                  variant="outlined"
                                  onChange={(e) => {
                                    field.onChange(e);
                                    setCoverData((prevData) => ({
                                      ...prevData,
                                      contact_person_name: e.target.value,
                                    }));
                                  }}
                                  className="w-full"
                                  error={!!errors.contact_person_name}
                                  helperText={
                                    errors.contact_person_name?.message
                                  }
                                />
                              )}
                            />
                            {/* contact_person_designation */}
                            <Controller
                              name="contact_person_designation"
                              control={control}
                              // rules={{
                              //   required:
                              //     "Contact Person Designation is required",
                              // }}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  id="outlined-basic"
                                  label="Contact Person Designation"
                                  variant="outlined"
                                  onChange={(e) => {
                                    field.onChange(e);
                                    setCoverData((prevData) => ({
                                      ...prevData,
                                      contact_person_designation:
                                        e.target.value,
                                    }));
                                  }}
                                  className="w-full"
                                  error={!!errors.contact_person_designation}
                                  helperText={
                                    errors.contact_person_designation?.message
                                  }
                                />
                              )}
                            />
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            {/* contact_person_email */}
                            <Controller
                              name="contact_person_email"
                              control={control}
                              rules={{
                                // required: "Contact Person Email is required",
                                pattern: {
                                  value:
                                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: "invalid Contact Person Email",
                                },
                              }}
                              defaultValue=""
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  sx={{ width: "100%" }}
                                  id="outlined-basic"
                                  label="Contact Person Email"
                                  variant="outlined"
                                  onChange={(e) => {
                                    field.onChange(e);
                                    setCoverData((prevData) => ({
                                      ...prevData,
                                      contact_person_email: e.target.value,
                                    }));
                                  }}
                                  className="w-full"
                                  error={!!errors.contact_person_email}
                                  helperText={
                                    errors.contact_person_email?.message
                                  }
                                />
                              )}
                            />
                            {/* contact_person_phone */}
                            <Controller
                              name="contact_person_phone"
                              control={control}
                              render={({ field }) => (
                                <PhoneInput
                                  {...field}
                                  placeholder="Contact Person Phone"
                                  autoComplete="on"
                                  inputProps={{
                                    name: "contact_person_phone",
                                  }}
                                  onChange={(e) => {
                                    field.onChange(e);
                                    setCoverData((prevData) => ({
                                      ...prevData,
                                      contact_person_phone: e,
                                    }));
                                  }}
                                  className={` ${errors?.contact_person_phone
                                    ? "border-red-500 border"
                                    : " border"
                                    }  w-full leading-3 py-[13px] rounded-md px-[14px] `}
                                />
                              )}
                            />
                          </div>

                          {/* employeer_name */}
                          <Controller
                            name="employeer_name"
                            control={control}
                            // rules={{
                            //   required: "Employeer Name is required",
                            // }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                id="outlined-basic"
                                label="Company Name"
                                variant="outlined"
                                onChange={(e) => {
                                  field.onChange(e);
                                  setCoverData((prevData) => ({
                                    ...prevData,
                                    employeer_name: e.target.value,
                                  }));
                                }}
                                className="w-full"
                                error={!!errors.employeer_name}
                                helperText={errors.employeer_name?.message}
                              />
                            )}
                          />
                          {/* company_address */}
                          <Controller
                            name="company_address"
                            control={control}
                            // rules={{
                            //   required: "Company Address is required",
                            // }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                id="outlined-basic"
                                label="Company Address"
                                variant="outlined"
                                onChange={(e) => {
                                  field.onChange(e);
                                  setCoverData((prevData) => ({
                                    ...prevData,
                                    company_address: e.target.value,
                                  }));
                                }}
                                className="w-full"
                                error={!!errors.company_address}
                                helperText={errors.company_address?.message}
                              />
                            )}
                          />

                          {/* ***** Next Section **** */}
                          {/* newnewnew2 */}
                          <hr />
                          <span>Cover Content</span>
                          {/* Opener */}
                          <div className="relative">
                            <div
                              className="bg-white w-fit h-fit p-1 rounded-full cursor-pointer absolute bottom-2 right-4 z-10"
                              title="Need Suggestions?"
                              onClick={() => {
                                setSuggestionOpen(true);
                                setSuggestionFor("opener");
                              }}
                            >
                              <HiOutlineLightBulb
                                size={30}
                                className="text-[#0072B1]"
                                title="Need Suggestions?"
                              />
                            </div>
                            <Controller
                              name="opener_detail"
                              control={control}
                              rules={{
                                required: "Opener is required",
                                maxLength: { value: 1000 },
                              }}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  id="filled-multiline-static"
                                  label={`Opener Content* (${watch("opener_detail")?.length === undefined
                                    ? 0
                                    : watch("opener_detail")?.length
                                    }/1000)`}
                                  rows={4}
                                  multiline
                                  className="w-full"
                                  InputLabelProps={{
                                    shrink: Boolean(field.value),
                                  }}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    if (value.length <= 1000) {
                                      field.onChange(e);
                                      setCoverData((prevData) => ({
                                        ...prevData,
                                        opener_detail: e.target.value,
                                      }));
                                    }
                                  }}
                                  error={!!errors.opener_detail}
                                  helperText={errors.opener_detail?.message}
                                />
                              )}
                            />
                          </div>

                          {/* closer_detail1 */}
                          <div className="relative">
                            <div
                              className="bg-white w-fit h-fit p-1 rounded-full cursor-pointer absolute bottom-2 right-4 z-10"
                              title="Need Suggestions?"
                              onClick={() => {
                                setSuggestionOpen(true);
                                setSuggestionFor("closer");
                              }}
                            >
                              <HiOutlineLightBulb
                                size={30}
                                className="text-[#0072B1]"
                                title="Need Suggestions?"
                              />
                            </div>

                            <Controller
                              name="closer_detail"
                              control={control}
                              rules={{
                                required: "Closer required",

                                maxLength: {
                                  value: 1000,
                                  message: "Box only Content 500 characters",
                                },
                              }}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  id="filled-multiline-static"
                                  label={`Closer Content* (${watch("closer_detail")?.length === undefined
                                    ? 0
                                    : watch("closer_detail")?.length
                                    }/1000)`}
                                  rows={4}
                                  multiline
                                  className="w-full"
                                  InputLabelProps={{
                                    shrink: Boolean(field.value),
                                  }}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    if (value.length <= 1000) {
                                      field.onChange(e);
                                      setCoverData((prevData) => ({
                                        ...prevData,
                                        closer_detail: e.target.value,
                                      }));
                                    }
                                  }}
                                  error={!!errors.closer_detail}
                                  helperText={errors.closer_detail?.message}
                                />
                              )}
                            />
                          </div>
                          <div className="w-full">
                            {coverIsUpdating ? (
                              <button
                                type="button"
                                disabled
                                className="bg-primary-green w-full py-2 rounded-md text-white font-semibold"
                              >
                                {!coverHasSaved ? (
                                  <>
                                    <div className="flex justify-center items-center">
                                      <svg
                                        aria-hidden="true"
                                        className="w-6 h-6 text-gray-200 animate-spin  fill-primary-green"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                          fill="currentColor"
                                        />
                                        <path
                                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                          fill="currentFill"
                                        />
                                      </svg>
                                      <span className="sr-only">
                                        Loading...
                                      </span>
                                    </div>
                                  </>
                                ) : (
                                  "Saved"
                                )}
                              </button>
                            ) : (
                              <button
                                type="submit"
                                className="bg-primary-blue w-full py-2 rounded-md text-white font-semibold"
                              >
                                Save
                              </button>
                            )}
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="relative bg-white">
                      {suggestionsOpen && (
                        <>
                          <div className="flex items-center justify-center relative">
                            <span className="text-lg font-semibold text-center">
                              Suggestions
                            </span>
                            <div
                              onClick={() => {
                                setSuggestionOpen(false);
                                setSuggestionFor("");
                              }}
                              className="absolute flex justify-center items-center cursor-pointer top-0 right-0 w-[40px] h-[40px]"
                            >
                              <LiaTimesSolid size={20} />
                            </div>
                          </div>
                          {/* newnew */}
                          {/* Opener */}
                          {suggestionFor === "opener" ? (
                            <ul className="flex flex-col gap-4 mt-8 px-4">
                              {openerSuggestion?.map((sug, idx) => (
                                <li
                                  key={idx}
                                  className="border p-2 rounded-2 cursor-pointer"
                                  onClick={() => {
                                    const currentOpenerDetail =
                                      getValues("opener_detail"); // Get the current value
                                    const newOpenerDetail =
                                      `${currentOpenerDetail} ${sug.body}`.trim(); // Append the new value with a space
                                    setValue("opener_detail", newOpenerDetail); // Set the combined value
                                    setSuggestionOpen(false);
                                  }}
                                >
                                  {sug.body}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            ""
                          )}
                          {/* Closer */}
                          {suggestionFor === "closer" ? (
                            <ul className="flex flex-col gap-4 mt-8 px-4">
                              {closerSuggestion?.map((sug, idx) => (
                                <li
                                  key={idx}
                                  className="border p-2 rounded-2 cursor-pointer"
                                  onClick={() => {
                                    const currentOpenerDetail =
                                      getValues("closer_detail"); // Get the current value
                                    const newOpenerDetail =
                                      `${currentOpenerDetail} ${sug.body}`.trim(); // Append the new value with a space
                                    setValue("closer_detail", newOpenerDetail); // Set the combined value
                                    setSuggestionOpen(false);
                                  }}
                                >
                                  {sug.body}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            ""
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}

                {activeToolBarTab === 2 && (
                  <div>
                    <label className="text-black font-Lexend text-lg mb-2">
                      Signature
                    </label>
                    <Tab.Group
                      onChange={() => {
                        setIsUploadedSignature("");
                        setValue("upload", "");
                        setValue("type", "");
                      }}
                    >
                      <Tab.List className={"flex items-center"}>
                        <Tab
                          className={({ selected }) =>
                            classNames(
                              "px-2 py-4 font-semibold w-full border-r text-white rounded-tl-md border-white outline-none ",
                              selected
                                ? "bg-primary-green "
                                : "bg-primary-blue "
                            )
                          }
                        >
                          Draw
                        </Tab>

                        <Tab
                          className={({ selected }) =>
                            classNames(
                              "px-2 py-4 font-semibold text-white w-full  border-r border-white outline-none",
                              selected
                                ? "bg-primary-green  "
                                : "bg-primary-blue "
                            )
                          }
                        >
                          Upload
                        </Tab>
                        <Tab
                          className={({ selected }) =>
                            classNames(
                              "px-2 py-4 font-semibold w-full text-white   rounded-tr-md outline-none",
                              selected
                                ? "bg-primary-green  "
                                : "bg-primary-blue "
                            )
                          }
                        >
                          Type
                        </Tab>
                      </Tab.List>
                      <Tab.Panels>
                        <form onSubmit={handleSubmit(handleSaveSignature)}>
                          {/* Drew */}
                          <Tab.Panel>
                            <div className="border b-solid border-black">
                              <Controller
                                name="drew"
                                control={control}
                                render={({ field }) => (
                                  <ReactSignatureCanvas
                                    ref={signatureRef}
                                    canvasProps={{
                                      className: "bg-white !w-full h-[200px]",
                                    }}
                                    onEnd={() => {
                                      const trimmedCanvas =
                                        signatureRef.current.getTrimmedCanvas();

                                      const dataUrl =
                                        trimmedCanvas.toDataURL("image/png");
                                      setSignatureData({
                                        type: "drew",
                                        value: dataUrl,
                                      });
                                      field.onChange(dataUrl);
                                      setIsUploadedSignature("");
                                      setValue("upload", "");
                                      setValue("type", "");
                                    }}
                                  />
                                )}
                              />
                            </div>
                          </Tab.Panel>
                          {/* Uppload */}
                          <Tab.Panel>
                            <div className="border b-solid border-black">
                              <Controller
                                name="upload"
                                control={control}
                                render={({ field }) => (
                                  <>
                                    <input
                                      id="signatureUpload"
                                      type="file"
                                      className="hidden"
                                      onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                          field.onChange(file); // This updates the react-hook-form value
                                          setIsUploadedSignature(file); // This updates your local state
                                          setSignatureData({
                                            type: "upload",
                                            value: file,
                                          });
                                          setValue("type", "");
                                        }
                                      }}
                                    />
                                    <div
                                      className="h-[200px] w-full bg-white flex justify-center items-center flex-col gap-2 cursor-pointer"
                                      onClick={() =>
                                        document
                                          .getElementById("signatureUpload")
                                          .click()
                                      }
                                    >
                                      {isUploadedSignature ? (
                                        <img
                                          src={URL.createObjectURL(
                                            isUploadedSignature
                                          )}
                                          alt="upload"
                                          className="w-full h-full object-cover"
                                        />
                                      ) : (
                                        <>
                                          <FcSignature size={60} />
                                          <div className="flex items-center gap-2 font-semibold font-Lexend">
                                            Upload Your Signature
                                            <BiUpload size={23} />
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  </>
                                )}
                              />
                            </div>
                          </Tab.Panel>

                          {/* Type */}
                          <Tab.Panel>
                            <div className="border b-solid border-black">
                              <Controller
                                name="type"
                                control={control}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    id="outlined-basic"
                                    // label="Type Your Signature"
                                    placeholder="Type Your Signature"
                                    variant="outlined"
                                    rows={7.2}
                                    multiline
                                    onChange={(e) => {
                                      field.onChange(e);
                                      setSignatureData({
                                        type: "type",
                                        value: e.target.value,
                                      });
                                      setIsUploadedSignature("");
                                      setValue("upload", "");
                                    }}
                                    inputProps={{
                                      style: {
                                        outline: "none",
                                        border: "none",
                                      },
                                    }}
                                    className="w-full bg-black text-[25px] outline-none"
                                    error={!!errors.type}
                                    helperText={errors.type?.message}
                                  />
                                )}
                              />
                            </div>
                          </Tab.Panel>
                          <button
                            type="submit"
                            id="submitSignature"
                            className="hidden"
                          />
                        </form>
                        {SignatureError && (
                          <span className="text-sm text-red-500">
                            {SignatureError}
                          </span>
                        )}
                        <div className="py-2 flex items-center gap-2">
                          {isSignatureIsSaving ? (
                            <button
                              onClick={() =>
                                document
                                  .getElementById("submitSignature")
                                  .click()
                              }
                              className="px-6 py-2 bg-primary-green rounded-md text-white"
                            >
                              {!isSignatureHasSaved ? (
                                <>
                                  <div className="flex justify-center items-center">
                                    <svg
                                      aria-hidden="true"
                                      className="w-6 h-6 text-gray-200 animate-spin  fill-primary-green"
                                      viewBox="0 0 100 101"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                      />
                                      <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"
                                      />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                  </div>
                                </>
                              ) : (
                                "Saved"
                              )}
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                document
                                  .getElementById("submitSignature")
                                  .click()
                              }
                              className="px-6 py-2 bg-primary-blue rounded-md text-white"
                            >
                              Save
                            </button>
                          )}
                          <button
                            className="px-6 py-2 bg-red-400 text-white rounded-md"
                            onClick={clearSignature}
                          >
                            Clear
                          </button>
                        </div>
                      </Tab.Panels>
                    </Tab.Group>
                    {/* Signature */}
                  </div>
                )}

                {activeToolBarTab === 3 && (
                  <div>
                    {/* Templates */}
                    <div className="flex flex-row-reverse">
                      <div className="grid grid-cols-2 gap-4 p-2">
                        {newTemplates?.map((templatenew, idx) => (
                          <div
                            key={idx}
                            className="cursor-pointer hover:bg-[rgba(0,0,0,0.2)] relative"
                            onClick={() => {
                              setActiveTemplate(templatenew.id);
                              setPaidTemplate(0);
                              setCoverData((prev) => ({
                                ...prev,
                                cover_template_id: templatenew.id,
                              }));
                              changeFormatingCover(
                                templatenew.id,

                                activeTheme,
                                activeFont,
                                activeFontSize
                              );
                            }}
                          >
                            {0 === 1 && (
                              <div
                                className="flex bg-gradient-to-r from-[#01B2AC] to-[#0072B1] w-[150px] h-8 absolute left-[-35px] top-16 text-white -rotate-45 justify-center items-center z-50"
                                style={{
                                  clipPath:
                                    "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
                                }}
                              >
                                <img src={premium} alt="premium icon" />
                                <span>Premium</span>
                              </div>
                            )}
                            <h2 className="text-[#0f4d76] text-md font-Lexend py-2">
                              {templatenew.name}
                            </h2>
                            <img
                              src={templatenew.image}
                              alt={templatenew.name}
                              className="rounded-lg"
                              style={{
                                boxShadow: "0px 0px 5px rgba(0,0,0,0.4)",
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {activeToolBarTab === 5 && (
                  <div>
                    {/* Themes */}
                    <Themes
                      activeTheme={(val) => {
                        setActiveTheme(val);
                        changeFormatingCover(
                          activeTemplate,
                          val,
                          activeFont,
                          activeFontSize
                        );
                      }}
                    />
                  </div>
                )}
                {activeToolBarTab === 4 && (
                  <div>
                    {/* Fonts */}
                    <Fonts
                      activeFont={(val) => {
                        setActiveFont(val);
                        changeFormatingCover(
                          activeTemplate,
                          activeTheme,
                          val,
                          activeFontSize
                        );
                      }}
                      setActiveFontSize={(val) => {
                        setActiveFontSize(val);
                        changeFormatingCover(
                          activeTemplate,
                          activeTheme,
                          activeFont,
                          val
                        );
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* for email share */}

      <div
        id="checkbox_model"
        className="fixed hidden bg-[rgba(10,10,10,0.7)] w-full h-full top-0 left-0 z-[1000]"
      >
        <div className="shadow-2xl relative bg-[rgba(255,255,255,1)] w-[95%] lg:w-[60%] xl:w-[30%] p-10 m-auto mt-[50%] lg:mt-[10%] border-[4px] border-[#0072b1] rounded-[30px]">
          <BiX
            onClick={() => $("#checkbox_model").fadeOut()}
            className="absolute right-10 hover:text-red-500 hover:rotate-90 transition-all duration-300 cursor-pointer"
            size={40}
          />
          <h1 className="font-lexend text-slate-900 text-xl w-full mt-2 font-bold">
            Setting
          </h1>
          <div className="mt-10 flex justify-start items-start text-md font-lexend">
            <input
              type="checkbox"
              className="p-4 text-sm mr-2 mt-[6px] border-2 border-solid border-[#0072b1] text-[#0072b1]"
              onChange={() => {
                set_checbox_share(!checbox_share);
              }}
            />
            Do you want to share your resume with companies for global job
            opportunities?
          </div>
        </div>
      </div>

      <div
        id="email_modelbox"
        className="fixed hidden bg-[rgba(10,10,10,0.7)] w-full h-full top-0 left-0 z-[1000]"
      >
        <div className="shadow-2xl relative bg-[rgba(255,255,255,1)] w-[95%] lg:w-[60%] xl:w-[30%] p-10 m-auto mt-[50%] lg:mt-[10%] border-[4px] border-[#0072b1] rounded-[30px]">
          <BiX
            onClick={() => $("#email_modelbox").fadeOut()}
            className="absolute right-10 hover:text-red-500 hover:rotate-90 transition-all duration-300 cursor-pointer"
            size={40}
          />
          <h1 className="font-lexend text-slate-900 text-xl w-full mt-2 font-bold">
            Share To Email
          </h1>
          <div className="mt-10 flex justify-center items-center">
            <input
              type="text"
              id="email_share"
              placeholder="Enter Your Email"
              value={email_share}
              className="py-2 px-4 text-sm lg:text-lg font-lexend font-semibold rounded-tl-full rounded-bl-full border-l-2 border-t-2 border-b-2 border-solid border-[#0072b1] text-[#0072b1]"
              onChange={(val) => {
                set_email_share(val.target.value);
              }}
            />
            <button
              id="email_button"
              onClick={share_email}
              className="flex justify-center items-center bg-[#0072b1] hover:bg-primary-green hover:border-primary-green font-semibold text-white rounded-tr-full rounded-br-full py-2 px-4 text-sm lg:text-lg font-lexend border-2 border-solid border-[#0072b1]"
            >
              SEND
            </button>
            <button
              id="email_loader"
              className="hidden justify-center items-center bg-[#0072b1] hover:bg-primary-green hover:border-primary-green font-semibold text-white rounded-tr-full rounded-br-full py-2 px-4 text-sm lg:text-lg font-lexend border-2 border-solid border-[#0072b1]"
            >
              <BiLoaderAlt
                size={20}
                className="mr-2 animate-spin m-auto w-full text-[#fff]"
              />
              SENDING
            </button>
          </div>
        </div>
      </div>
      {/* for social share */}
      <div
        id="share_doc_modelbox"
        className="hidden fixed bg-[rgba(10,10,10,0.7)] w-full h-full top-0 left-0 z-[1000]"
      >
        <div className="shadow-2xl relative bg-[rgba(255,255,255,1)] w-[80%] lg:w-[70%] xl:w-[40%] p-10 m-auto mt-[30%] lg:mt-[10%] border-[4px] border-[#0072b1] rounded-[30px]">
          <BiX
            onClick={() => share_doc_close()}
            className="absolute right-10 hover:text-red-500 hover:rotate-90 transition-all duration-300 cursor-pointer"
            size={40}
          />
          <h1 className="font-lexend text-slate-900 text-xl w-full mt-2 font-bold">
            Share Cover Letter
          </h1>

          <div className="flex flex-wrap justify-center items-start  mt-10 max-w-full">

            <div className="">
              <button className="hover:text-[#01B2AC]" onClick={handleCopyClick}>
                <HiClipboardCheck
                  className="mx-1"
                  size={window.innerWidth <= 440 ? 32 : 60}
                />
              </button>
            </div>

            <div className="">
              {/* Facebook Share Button */}
              <FacebookShareButton
                className="hover:text-[#01B2AC]"
                url={file}
                quote={"Check Link"}
              >
                <FacebookIcon
                  size={window.innerWidth <= 440 ? 32 : 60}
                  className="mx-1"
                />
              </FacebookShareButton>
            </div>

            {/* Whatsapp Share Button */}
            <div className="">
              <WhatsappShareButton
                className="hover:text-[#01B2AC]"
                url={file}
                title={"Check Link"}
              >
                <WhatsappIcon
                  size={window.innerWidth <= 440 ? 32 : 60}
                  className="mx-1"
                />
              </WhatsappShareButton>
            </div>

            {/* LinkedIn Share Button */}
            <div className="">
              <LinkedinShareButton
                className="hover:text-[#01B2AC]"
                url={file}
                title={"Check Link"}
              >
                <LinkedinIcon
                  size={window.innerWidth <= 440 ? 32 : 60}
                  className="mx-1"
                />
              </LinkedinShareButton>
            </div>

            <div className="">
              <button
                className="mr_heading btn_copy hover:text-[#01B2AC]"
                onClick={() => {
                  download_email();
                }}
              >
                <TfiEmail
                  className="mx-1"
                  size={window.innerWidth <= 440 ? 32 : 60}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
