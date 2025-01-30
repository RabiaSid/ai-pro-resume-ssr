import React, { useEffect, useState, useRef, Suspense } from "react";
import Logo from "../assets/images/logo_resume.webp";
import { RxHamburgerMenu } from "react-icons/rx";
import $ from "jquery";
import axios from "axios";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";
import Cookies from "js-cookie";
import jsPDF from "jspdf";
import swal from "sweetalert";
import { useAuth } from "../services/Auth";
import ActiveTemplate from "../resume/ActiveTemplate";
import { ApiService } from "../services/ApiService";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import premium from "../assets/images/premium.webp";
import { BiBookContent, BiFontFamily, BiLoaderAlt, BiX } from "react-icons/bi";
import {
  HiOutlineSwitchHorizontal,
  HiOutlineDuplicate,
  HiOutlineCog,
} from "react-icons/hi";
import { LuPaintbrush, LuShare2 } from "react-icons/lu";
import { FiDownload } from "react-icons/fi";
import { TfiEmail } from "react-icons/tfi";
import { RxTrash } from "react-icons/rx";
import { IoIosArrowUp } from "react-icons/io";
import { domToPng, domToJpeg } from "modern-screenshot";
import { IoIosArrowBack } from "react-icons/io";
import { SummaryForm } from "./resumeSectionForm/SummaryForm";
import ExperienceForm from "./resumeSectionForm/ExperienceForm";
import { HeaderForm } from "./resumeSectionForm/HeaderForm";
import EducationForm from "./resumeSectionForm/EducationForm";
import TechnicalSkillsForm from "./resumeSectionForm/TechnicalSkillsForm";
import Themes from "../resume/themes/Themes";
import Fonts from "../resume/themes/Fonts";
import SoftSkillsform from "./resumeSectionForm/SoftSkillsForm";
import CertificatesForm from "./resumeSectionForm/CertificatesForm";
import CustomSectionForm from "./resumeSectionForm/CustomSectionForm";
import HonorsAndAwardsForm from "./resumeSectionForm/HonorsAndAwardsForm";
import LanguageForm from "./resumeSectionForm/LanguageForm";
import RefrancesForm from "./resumeSectionForm/RefrancesForm";
import { RxCross1 } from "react-icons/rx";
import { HiClipboardCheck } from "react-icons/hi";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
//
//
//
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
//
//
//
import SpinnerLoader from "../components/shared-components/spinnerloader/SpinnerLoader";
import SideNav from "../components/shared-components/SideNav";
import { useReactToPrint } from "react-to-print";
// Tour Steps
import Step1 from "../assets/images/resume_tour_steps/step1.gif";
import Step2 from "../assets/images/resume_tour_steps/step2.gif";
import Step3 from "../assets/images/resume_tour_steps/step3.gif";
import Step4 from "../assets/images/resume_tour_steps/step4.gif";
import Step5 from "../assets/images/resume_tour_steps/step5.gif";

const Header = () => {
  const resumePDF = useRef(null);
  const location = useLocation();

  const isExample = location.state.isExample;
  const exampleId = location.state.exampleId;
  const resumeSelectedTemplateId = location.state.selectedTemplateId;
  const resumeEditableId = location.state.resumeId;
  const user_id = location.state.user_id;

  const url = new URLSearchParams(location.search);

  const isPsrserUse = url.get("parser");

  const { user } = useAuth();

  const [file2, setFile2] = useState(null);

  const [my_coverletters, set_my_coverletters] = useState([]);
  const [tempId, setTempId] = useState(1);
  const [docId, setDocId] = useState(1);

  const [file, setFile] = useState("");

  const [my_resumes, set_my_resumes] = useState([]);
  const [my_resumes_temp, set_my_resumes_temp] = useState([]);
  const [user2, set_user] = useState([]);
  const [paid, set_paid] = useState(0);
  const [sel_temp, set_temp] = useState(1);
  const [pen_color, set_pen_color] = useState("d");
  const doc_uuid = global.getCookie("doc_uuid");
  const [email_share, set_email_share] = useState("");

  const [checbox_share, set_checbox_share] = useState(false);

  const profile_id = Cookies.get("profile_id");
  const res_temp_id = Cookies.get("sel_template");
  var username = global.getCookie("user_name");

  const [format_temp, set_format_temp] = useState(res_temp_id);

  const [selectedOption, setSelectedOption] = useState("pdf");
  const [copyText, setCopyText] = useState("");
  const handleCopyClick = () => {
    const textToCopy =
      global.localPath + "share/" + resumeData.resumeId + "?share=resume";
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

  // if user resumes are 0
  useEffect(() => {
    setTimeout(() => {
      const headers = {
        Authorization: "Bearer " + user?.token,
      };
      axios
        .get(global.baseurl + "/personal_information", { headers })
        .then((data) => {
          if (data) {
            console.log(
              "user resumes data",
              data.data.data[0]?.personal_information
            );
            if (window.innerWidth >= 768) {
              if (data.data.data[0]?.personal_information.length === 1) {
                startTour();
              }
            }
          }
        });
    }, 3000);
  }, []);

  const startTour = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: ".toolbardiv",
          popover: {
            title: "Welcome To Resume Builder Tool",
            description: `This toolbar helps you navigate through resume creation. <img src="${Step1}" alt="step1" />`,
            side: "bottom",
            align: "start",
            html: `<img src="${Step1}" alt="step1" />`,
          },
        },
        {
          element: ".toolbardiv2",
          popover: {
            title: "Template Switching",
            description: `Easily switch between different resume templates to find the one that best suits your style and needs <img src="${Step2}" alt="step2" />`,
            side: "bottom",
            align: "start",
            html: `<img src="${Step2}" alt="step2" />`,
          },
        },
        {
          element: ".toolbardiv3",
          popover: {
            title: "Formatting",
            description: `Customize the appearance of your resume by adjusting the font size and selecting from a variety of font families.  <img src="${Step3}" alt="step3" />`,
            side: "bottom",
            align: "start",
            html: `<img src="${Step3}" alt="step3" />`,
          },
        },
        {
          element: ".toolbardiv4",
          popover: {
            title: "Theme Selection",
            description: `Personalize your resume by choosing a theme. You can select colors and styles that reflect your professional image.
 <img src="${Step4}" alt="step4" />`,
            side: "bottom",
            align: "start",
            html: `<img src="${Step4}" alt="step4" />`,
          },
        },
        {
          element: "#toolbardiv5",
          popover: {
            title: "Download your resume ",
            description: `Finalize your resume by downloading it as a PDF. Ensure the scale is set to default before saving to preserve the layout and format. You can also print your resume directly by clicking the print option to get a hard copy.
 <img src="${Step5}" alt="step5" />`,
            side: "bottom",
            align: "start",
            html: `<img src="${Step5}" alt="step5" />`,
          },
        },
      ],
    });

    driverObj.drive();
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
        link:
          global.localPath + "share/" + resumeData.resumeId + "?share=resume",
        email: email_share,
        type: "resume",
      };

      const headers = {
        Authorization: "Bearer " + user?.token,
        "Access-Control-Allow-Origin": "*",
      };
      axios
        .post(global.baseurl + "/share", article, { headers })
        .then((data) => {
          if (data) {
            $("#email_loader").css("display", "none");
            $("#email_button").css("display", "flex");
            $("#email_modelbox").fadeOut(300);
            swal("Success!", "Email Sent Successfully", "success");
            set_email_share("");
          }
        })
        .catch((err) => {
          $("#email_loader").css("display", "none");
          $("#email_button").css("display", "flex");
          $("#email_modelbox").fadeOut(300);
          swal("Error!", "Email Not Send Try Again", "error");
          set_email_share("");
          console.log(err);
        });
    }
  };

  const download_email = () => {
    $("#email_modelbox").fadeIn(300);
    $("#share_doc_modelbox").fadeOut(300);
    // if (isAllowShare === 0) {
    //   swal("Error!", "Share your resume not avaliable at this time", "error");
    // } else {

    // }
    // console.log(global.localPath + "share/" + my_resumes.id + "?share=resume");
    //http://localhost:3000/demo/share/my_resumes.id?share=resume
  };

  const download_email_close = () => {
    $("#email_modelbox_load").fadeOut(300);
  };

  const share_doc = async () => {
    if (isAllowShare === 0) {
      swal("Error!", "Share your resume not avaliable at this time", "error");
    } else {
      $("#share_doc_modelbox").fadeIn(300);
      setFile(
        global.localPath + "share/" + resumeData.resumeId + "?share=resume"
      );
    }

    // console.log(global.localPath + "share/" + my_resumes.id + "?share=resume");
    //http://localhost:3000/demo/share/my_resumes.id?share=resume
    //console.log(file2);
  };

  const share_doc2 = async () => {
    if (file2 === null || file2 === undefined || file2 === "") {
      swal("Error!", "Share File Not Attached", "error");
    } else {
      $("#share_doc_modelbox_file").fadeOut(300);
      $("#share_doc_modelbox_load").fadeIn(300);

      //const token=global.getCookie('token');
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
          // Add default margin styles to text elements in the input
          const textElements = input.querySelectorAll(
            "h1, h2, h3, h4, h5, h6, p"
          );
          textElements.forEach((element) => {
            element.style.marginTop = "0px"; // Adjust the margin as needed
          });
          const pdf = new jsPDF();
          //pdf.text('Your Heading', 50, 50);

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

            //const proxyUrl = 'http://localhost:3000/proxy?url=' + encodeURIComponent('https://resume.cognitiveitsolutions.ca/public/images/1783172688048072dp.jpeg');
            const proxyUrl = "http://localhost:3000/proxy?url="; // Update with the URL of your proxy server

            // Use html2canvas to convert the HTML element to an image for the current page
            await html2canvas(input, {
              //"Access-Control-Allow-Origin": "*",
              useCORS: true,
              proxy: proxyUrl,
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

                // Adjust the y-coordinate to introduce a margin on top
                const marginOnTop = 0; // You can adjust this value as needed
                pdf.addImage(imgData, "PNG", 0, marginOnTop);
              } else {
                // Add the image to the first page without any margin
                pdf.addImage(imgData, "PNG", 0, 0);
              }

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
            pdf.text("Your Heading", 20, 20);

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
                  const marginOnTop = 0; // You can adjust this value as needed
                  pdf.addImage(imgData, "PNG", 0, marginOnTop);
                } else {
                  // Add the image to the first page without any margin
                  pdf.addImage(imgData, "PNG", 0, 0);
                }
                // Generate a Blob from the PDF data
                const blob = pdf.output("blob");
                const my_file = new File([blob], name_txt + ".pdf", {
                  type: "application/pdf",
                });
                //const token=global.getCookie('token');
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

            //const token=global.getCookie('token');
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
            pdf.text("Your Heading", 20, 20);

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
                  const marginOnTop = 0; // You can adjust this value as needed
                  pdf.addImage(imgData, "PNG", 0, marginOnTop);
                } else {
                  // Add the image to the first page without any margin
                  pdf.addImage(imgData, "PNG", 0, 0);
                }
                // Generate a Blob from the PDF data
                const blob = pdf.output("blob");
                const my_file = new File([blob], name_txt + ".pdf", {
                  type: "application/pdf",
                });

                //const token=global.getCookie('token');
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

            //const token=global.getCookie('token');
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
          "Are you sure you want to duplicate the " +
          resumeData.resume_name +
          " File?",
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
            axios
              .get(global.baseurl + "/duplicate-resume/" + resumeData.uuid, {
                headers,
              })
              .then((data) => {
                if (data) {
                  swal(
                    "Done! Your " +
                    resumeData.resume_name +
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
            //COVER LETTER DUPLICATE
            axios
              .get(global.baseurl + "/duplicate-cover/" + uuid, { headers })
              .then((data) => {
                if (data) {
                  swal(
                    "Done! Your " + doc_name + " File Successfully Duplicated!",
                    {
                      icon: "success",
                    }
                  );
                  axios
                    .get(global.baseurl + "/personal_information/" + doc_uuid, {
                      headers,
                    })
                    .then((data) => {
                      if (data) {
                        set_my_resumes(data.data.data[0]);
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
    } else if (e === "rename") {
      $("#temp_id").html(temp_id);
      $("#doc_id").html(uuid);
      $("#doc_name").html(name);
      $(".name_label").html(name);

      swal("Please Enter a New File Name For " + resumeData.resume_name, {
        title: "Rename " + resumeData.resume_name,
        buttons: true,
        content: "input",
      }).then((value) => {
        if (value) {
          swal({
            title: "Rename " + resumeData.resume_name,
            text:
              "Are you sure to Rename " +
              resumeData.resume_name +
              " to " +
              value,
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

              //RESUME RENAME
              const article = {
                resume_name: value,
              };
              axios
                .post(
                  global.baseurl + "/rename_resume/" + resumeData.resumeId,
                  article,
                  {
                    headers,
                  }
                )
                .then((data) => {
                  if (data) {
                    swal(
                      "Done! Your " +
                      resumeData.resume_name +
                      " File Successfully Renamed!",
                      {
                        icon: "success",
                      }
                    );
                    reloadTemplateData();
                  }
                })
                .catch((err) => {
                  console.log(err);
                  swal("Error!", "Something Wrong", "error");
                });
            } else {
              swal("Your " + resumeData.resume_name + " File Not Renamed!");
            }
          });
        } else {
          swal("Your " + resumeData.resume_name + " File Not Renamed!");
        }
      });
    } else {
      // FOR DELETE

      $("#temp_id").html(temp_id);
      $("#doc_id").html(uuid);
      $("#doc_name").html(name);
      $(".name_label").html(name);
      swal({
        title: "Delete File",
        text:
          "Are you sure you want to delete " +
          resumeData.resume_name +
          " file?",
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
            //RESUME DELETE
            axios
              .delete(
                global.baseurl + "/personal_information/" + resumeData.uuid,
                {
                  headers,
                }
              )
              .then((data) => {
                if (data) {
                  swal(
                    "Done! Your " +
                    resumeData.resume_name +
                    " File Successfully Deleted!",
                    {
                      icon: "success",
                    }
                  );
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
            //COVER LETTER DELETE
            axios
              .delete(global.baseurl + "/cover_letters/" + uuid, { headers })
              .then((data) => {
                if (data) {
                  swal("Done! Your File Successfully Deleted!", {
                    icon: "success",
                  });
                  window.location.href = global.localPath + "dashboard";
                }
              })
              .catch((err) => {
                console.log(err);
                swal("Error!", "Something Wrong", "error");
              });
          }
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
                .post(global.baseurl + "/rename_resume/" + uuid, article, {
                  headers,
                })
                .then((data) => {
                  if (data) {
                    swal(
                      "Done! Your " + doc_name + " File Successfully Renamed!",
                      {
                        icon: "success",
                      }
                    );
                    reloadTemplateData();
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
                  if (data) {
                    swal(
                      "Done! Your " + doc_name + " File Successfully Deleted!",
                      {
                        icon: "success",
                      }
                    );
                    axios
                      .get(global.baseurl + "/personal_information", {
                        headers,
                      })
                      .then((data) => {
                        if (data) {
                          set_my_resumes(
                            data.data.data[0].personal_information
                          );
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
            swal("Your " + doc_name + " File Not Renamed!");
          }
        });
      } else {
        swal("Your " + doc_name + " File Not Renamed!");
      }
    });
  };

  // new code

  //! dropdown values apis call
  //! job positions dropdown values
  const [job_positions, setjob_positions] = useState([]);
  const [countries, setCountries] = useState();
  // summary
  const [summaryObjectives, setSummaryObjectives] = useState();
  const [summaryObjectives2, setSummaryObjectives2] = useState();
  const [summaryId, setSummaryId] = useState();
  // Experince Form
  const [userExperiencesList, setUserExperiencesList] = useState([]);
  // degrees
  const [degrees, setDegrees] = useState();
  const [userEducationsList, setUserEducationList] = useState([]);
  // technical skills
  const [technicalSkillsOptions, setTechnicalSkillsOptions] = useState();
  // soft Skills
  const [softSkillsOptions, setSoftSkillsOptions] = useState();
  // certificates
  const [userCertificatesList, setUserCertificatesList] = useState([]);
  // custom section
  const [customSectionList, setCustomSectionList] = useState([]);
  //  Honor and Awards
  const [userHonorAndAwardList, setUserHonorAndAwardList] = useState([]);
  // languages
  const [languagesList, setLanguagesList] = useState([]);
  // levels
  const [levelsList, setLevels] = useState([]);

  const getobjectives = () => {
    ApiService.getResumeObjectives(user?.token)
      .then((res) => {
        console.log(res);
        setSummaryObjectives(res.data.data.objectives);
        setSummaryObjectives2(res.data.data.top_ten_objectives);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    closeOpenForms();
    getobjectives();
    // get objectives dropdown values

    // get job postions dropdown values
    ApiService.getAllJobPositionsNames()
      .then((res) => {
        setjob_positions(res.data.data);
      })
      .catch((err) => console.log(err));
    // get Countries
    ApiService.showCountries()
      .then((res) => setCountries(res.data.data))
      .catch((err) => console.log(err));
    // get degrees
    ApiService.getDegreeValues(user?.token)
      .then((res) => setDegrees(res.data.data))
      .catch((err) => console.log(err));
    // get Technical Skills
    ApiService.showResumeTechnicalSkills(user?.token)
      .then((res) => setTechnicalSkillsOptions(res.data.data))
      .catch((err) => console.log(err));
    // get Technical Skills
    ApiService.showResumeSoftSkills(user?.token)
      .then((res) => setSoftSkillsOptions(res.data.data))
      .catch((err) => console.log(err));
    // show Languages
    ApiService.showLanguages(user?.token)
      .then((res) => setLanguagesList(res.data.data))
      .catch((err) => console.log(err));
    // show Languages
    ApiService.showLavels(user?.token)
      .then((res) => setLevels(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  // ! theme and template
  const [resumeTemplatesListing, setResumeTemplatesListing] = useState("");
  const [isAllowShare, setIsAllowShare] = useState(0);
  const [user3, setUser] = useState([]);

  useEffect(() => {
    ApiService.showResumeTemplatesListing(user?.token)
      .then((res) => {
        setResumeTemplatesListing(res.data.data);
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
          setIsAllowShare(data.data.allow_shares);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateShare = (n) => {
    const data = {
      name: user3.name,
      contact: user3.contact,
      image: null,
      address: user3.address ? user3.address : "",
      email: user3.email,
      job_position: user3.job_position ? user3.job_position : "",
      allow_shares: n,
    };

    ApiService.updateUserDetails(user?.token, data)
      .then((res) => {
        swal({
          title: "Congratulations!",
          text: res.data.message,
          icon: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        swal({
          title: "Oops!",
          text: err.response.data.message,
          icon: "error",
        });
      });
  };

  const [activeTemplate, setActiveTemplate] = useState(0);
  const [paidTemplate, setPaidTemplate] = useState(0);

  const [activeTheme, setActiveTheme] = useState("");
  const [activeFont, setActiveFont] = useState("");
  const [activeFontSize, setActiveFontSize] = useState("");
  // resume Data
  const [resumeData, setResumeData] = useState({
    uuid: 0,
    resumeId: 0,
    // header
    resume_name: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    phone_number: "",
    contact_number: "",
    email_address: "",
    linkedin: "",
    website: "",
    street_address: "",
    postal_code: "",
    date_of_birth: "",
    gender: "",
    maritial_status: "",
    nationality: "",
    id_no: "",
    job_title: "",
    country_id: "",
    state: "",
    city: "",
    profile_image: "",
    // summary
    summary: "",
    // experience
    job_position: "",
    company_name: "",
    type: "",
    start_date: "",
    end_date: "",
    currently_working: "",
    company_description: "",
    job_description: "",
    country_id: "",
    state_id: "",
    city_id: "",
    // technical Skills Array
    technicalSkillsId: 0,
    technical_skills: [],
    technical_skills_feildName: "",
    // soft Skills
    softSkillsId: 0,
    soft_skills: [],
    soft_skills_feildName: "",
    custom_sections: "",
    experiences: "",
    certificates: [],
    awards: [],
    languages: [],
    references: [],
    education: [],
    resume_sections: {
      show_awards: 0,
      show_certificates: 0,
      show_experience: 0,
      show_languages: 0,
      show_references: 0,
      show_soft_skills: 0,
    },
  });

  useEffect(() => {
    const newResumeId = Cookies.get("newResumeId");
    if (!newResumeId) {
      if (resumeSelectedTemplateId) {
        ApiService.getUserById(user?.token, user_id)
          .then((res) => {
            let {
              id,
              name,
              address,
              email,
              job_position,
              contact,
              country_id,
              image,
            } = res.data.data.user;

            // new resume
            function splitName(fullName) {
              const nameParts = fullName.trim().split(" ");

              let firstName = nameParts[0] || null;
              let lastName =
                nameParts.length > 1 ? nameParts.slice(1).join(" ") : " ";

              return { firstName, lastName };
            }

            const fullName = name;
            const { firstName, lastName } = splitName(fullName);

            const data = {
              user_id: id,
              resume_name: name ? name : "untitled",
              first_name: firstName,
              last_name: lastName ? lastName : "",
              email_address: email ? email : "",
              job_title: job_position ? job_position : "Job Title",
              phone_number: contact ? contact : "",
              contact_number: "",
              template_id: resumeSelectedTemplateId,
              country_id: country_id ? country_id : 0,
              state: "",
              city: "",
              street_address: address ? address : "",
              postal_code: "",
              gender: "male",
              website: "https://example.website.com",
            };
            ApiService.userResumeHeaderSubmit(user?.token, data)
              .then((res) => {
                Cookies.set("newResumeId", res.data.data.id);

                const resume_sections = {
                  show_awards: 1,
                  show_certificates: 1,
                  show_experience: 1,
                  show_languages: 1,
                  show_references: 1,
                  show_soft_skills: 1,
                  profile_id: res.data.data.id,
                };

                ApiService.showProfileSectionUpload(
                  user?.token,
                  resume_sections
                )
                  .then((res) => {
                    reloadTemplateData();
                  })
                  .catch((err) => console.log(err));
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      } else {
        reloadTemplateData();
      }
    } else {
      reloadTemplateData();
    }
  }, []);
  const [first_time, setfirst_time] = useState(false);
  const resumeExampleId = Cookies.get("resumeExampleId");
  const reloadTemplateData = () => {
    if (!isExample) {
      const newResumeId = Cookies.get("newResumeId");
      ApiService.showProfileResumeData(
        user?.token,
        newResumeId ? newResumeId : resumeEditableId
      )
        .then((res) => {
          const {
            id,
            image_url,
            profile_image,
            resume_name,
            first_name,
            last_name,
            middle_name,
            email_address,
            contact_number,
            gender,
            date_of_birth,
            maritial_status,
            country_id,
            nationality,
            street_address,
            uuid,
            linkedin,
            website,
            postal_code,
            phone_number,
            id_no,
            job_title,
            template_id,
            state,
            city,

            //
            experiences,
            certificates,
            custom_sections,
            awards,
            languages,
            references,
            education,
            resume_sections,
          } = res.data.data;

          console.log(res.data.data);

          // Formating
          setActiveTemplate(template_id);
          setPaidTemplate(res.data.data.template.is_paid);
          setActiveFont(res.data.data.formating.heading_font_style);
          setActiveTheme(res.data.data.formating.color);
          setActiveFontSize(res.data.data.formating.heading_fontsize);

          const summary = res.data.data?.summary?.description;
          setSummaryId(res.data.data?.summary?.id);
          // Experince
          setUserExperiencesList(res.data.data.experiences);
          setUserEducationList(res.data.data.education);

          // Technical Skills
          const TechSkillData = res.data.data?.technical_skills;
          const TechnicalSkillsArrayData = TechSkillData?.body
            .split(",,")
            .map((skill) => skill.trim());
          // Technical Skills
          const SoftSkillData = res.data.data?.soft_skills;
          const SoftSkillsArrayData = SoftSkillData?.body
            .split(",,")
            .map((skill) => skill.trim());
          // Certificates
          setUserCertificatesList(res.data.data.certificates);
          setCustomSectionList(res.data.data.custom_sections);
          // awards
          setUserHonorAndAwardList(res.data.data.awards);

          setResumeData({
            uuid: uuid,
            resumeId: id,
            image_url: image_url,
            profile_image: profile_image,
            first_name: first_name,
            resume_name: resume_name,
            last_name: last_name,
            middle_name: middle_name,
            email_address: email_address,
            contact_number: contact_number,
            gender: gender,
            date_of_birth: date_of_birth,
            maritial_status: maritial_status,
            country_id: country_id,
            city: city,
            state: state,
            nationality: nationality,
            street_address: street_address,
            linkedin: linkedin,
            website: website,
            postal_code: postal_code,
            phone_number: phone_number,
            id_no: id_no,
            job_title: job_title,
            // summary
            summary: summary,
            experiences: experiences,
            // Technical Skills
            technical_skills: TechnicalSkillsArrayData,
            technical_skills_feildName: TechSkillData?.title,
            technicalSkillsId: TechSkillData?.id,
            // soft Skills
            soft_skills: SoftSkillsArrayData,
            soft_skills_feildName: SoftSkillData?.title,
            softSkillsId: SoftSkillData?.id,
            // certificates
            certificates: certificates,
            custom_sections: custom_sections,
            awards: awards,
            languages: languages,
            education: education,
            references,
            resume_sections,
          });
        })
        .catch((err) => console.log(err));
    } else if (resumeExampleId) {
      ApiService.showProfileResumeData(user?.token, resumeExampleId)
        .then((res) => {
          const {
            id,
            image_url,
            resume_name,
            profile_image,
            first_name,
            last_name,
            middle_name,
            email_address,
            contact_number,
            gender,
            date_of_birth,
            maritial_status,
            country_id,
            city,
            state,
            nationality,
            street_address,
            uuid,
            linkedin,
            website,
            postal_code,
            phone_number,
            id_no,
            job_title,
            template_id,

            //
            experiences,
            certificates,
            custom_sections,
            awards,
            languages,
            references,
            education,
            resume_sections,
          } = res.data.data;

          console.log("resumedata", res.data.data);

          // Formating
          setActiveTemplate(template_id);
          setActiveFont(res.data.data.formating.heading_font_style);
          setActiveTheme(res.data.data.formating.color);
          setActiveFontSize(
            res.data.data.formating.heading_fontsize
              ? res.data.data.formating.heading_fontsize
              : ""
          );

          const summary = res.data.data?.summary?.description;
          setSummaryId(res.data.data?.summary?.id);
          // Experince
          setUserExperiencesList(res.data.data.experiences);
          setUserEducationList(res.data.data.education);
          // Technical Skills
          const TechSkillData = res.data.data?.technical_skills;
          const TechnicalSkillsArrayData = TechSkillData?.body
            .split(",,")
            .map((skill) => skill.trim());
          // Technical Skills
          const SoftSkillData = res.data.data?.soft_skills;
          const SoftSkillsArrayData = SoftSkillData?.body
            .split(",,")
            .map((skill) => skill.trim());
          // Certificates
          setUserCertificatesList(res.data.data.certificates);
          setCustomSectionList(res.data.data.custom_sections);
          // awards
          setUserHonorAndAwardList(res.data.data.awards);

          setResumeData({
            uuid: uuid,
            resumeId: id,
            resume_name: resume_name,
            image_url: image_url,
            profile_image: profile_image,
            first_name: first_name,
            last_name: last_name,
            middle_name: middle_name,
            email_address: email_address,
            contact_number: contact_number,
            gender: gender,
            date_of_birth: date_of_birth,
            maritial_status: maritial_status,
            country_id: country_id,
            city: city,
            state: state,
            nationality: nationality,
            street_address: street_address,
            linkedin: linkedin,
            website: website,
            postal_code: postal_code,
            phone_number: phone_number,
            id_no: id_no,
            job_title: job_title,
            // summary
            summary: summary,
            experiences: experiences,
            // Technical Skills
            technical_skills: TechnicalSkillsArrayData,
            technical_skills_feildName: TechSkillData?.title,
            technicalSkillsId: TechSkillData?.id,
            // soft Skills
            soft_skills: SoftSkillsArrayData,
            soft_skills_feildName: SoftSkillData?.title,
            softSkillsId: SoftSkillData?.id,
            // certificates
            certificates: certificates,
            custom_sections: custom_sections,
            awards: awards,
            languages: languages,
            education: education,
            references,
            resume_sections,
          });
        })
        .catch((err) => console.log(err));
    }
    if (first_time) {
      document.getElementById("scroll_top").scrollTop = 0;
    } else {
      setTimeout(() => {
        setfirst_time(true);
      }, 8000);
    }
  };

  useEffect(() => {
    if (isExample && resumeExampleId === undefined) {
      ApiService.showResumeExampleWithId(user?.token, exampleId)
        .then((res) => {
          const {
            id,
            resume_name,
            profile_image,
            first_name,
            last_name,
            middle_name,
            email_address,
            contact_number,
            gender,
            date_of_birth,
            maritial_status,
            country_id,
            city,
            state,
            nationality,
            street_address,
            uuid,
            linkedin,
            website,
            postal_code,
            phone_number,
            id_no,
            job_title,
            template_id,

            //
            experiences,
            certificates,
            languages,
            references,
            educations,
            //
            summaries,
          } = res.data.data.resume_example;
          console.log("example", res.data.data.resume_example);

          const example = res.data.data;

          const headerData = {
            resume_name: first_name + " " + last_name ? last_name : "",
            first_name: first_name,
            last_name: last_name,
            email_address: email_address,
            job_title: job_title,
            phone_number: phone_number,
            contact_number: "",
            template_id: template_id,
            country_id: country_id,
            state: state,
            city: city,
            street_address: street_address,
            postal_code: postal_code,
            gender: gender,
            website: "https://aiproresumeexample.com",
          };

          ApiService.resumeHeaderSubmit(user?.token, headerData)
            .then((res) => {
              const resumeId = res.data.data.id;
              const resumeuuid = res.data.data.uuid;
              Cookies.set("resumeExampleId", resumeId);

              setResumeData((prev) => ({
                ...prev,
                uuid: resumeuuid,
                resumeId: resumeId,
              }));

              const resume_sections = {
                show_awards: 1,
                show_certificates: 1,
                show_experience: 1,
                show_languages: 1,
                show_references: 1,
                show_soft_skills: 1,
                profile_id: resumeId,
              };

              ApiService.showProfileSectionUpload(user?.token, resume_sections)
                .then((res) => { })
                .catch((err) => console.log(err));

              // Educations Submit
              educations?.map((edu) => {
                const eduDataSubmit = {
                  institution: edu.institution,
                  degree: edu.degree,
                  grade_type: edu.grade_type,
                  grade: edu.grade,
                  cgpa: edu.grade,
                  percentage: edu.grade,
                  field: edu.field,
                  start_date: edu.start_date,
                  end_date: edu.end_date,
                  currently_studying: edu.currently_studying,
                };

                ApiService.resumeEducationStore(
                  user?.token,
                  resumeId,
                  eduDataSubmit
                )
                  .then((res) => console.log("edu added", res.data))
                  .catch((err) => console.log(err));
              });

              // exp submit
              experiences?.map((exp) => {
                const experienceData = {
                  job_position: exp.job_position,
                  company_name: exp.company_name,
                  country_id: exp.country_id,
                  state: exp.state,
                  city: exp.city,
                  type: exp.type,
                  start_date: exp.start_date,
                  end_date: exp.end_date,
                  currently_working: exp.currently_working,
                  job_description: exp.job_description,
                };
                ApiService.resumeExperienceStore(
                  user?.token,
                  resumeId,
                  experienceData
                )
                  .then((res) => { })
                  .catch((err) => console.log(err));
              });

              // summary Submit
              const summaryData = {
                summary: summaries[0]?.description,
                profileId: resumeId,
              };
              ApiService.resumeSummarySubmit(user?.token, summaryData)
                .then((res) => { })
                .catch((err) => console.log(err));

              // Certificate submit
              certificates?.map((cert, idx) => {
                const certificatesData = {
                  title: cert.title,
                  date: cert.date,
                  institute: cert.institute,
                  description: cert.description,
                };

                ApiService.resumeCertificateStore(
                  user?.token,
                  resumeId,
                  certificatesData
                )
                  .then((res) => { })
                  .catch((err) => console.log(err));
              });
              // Add Technical Skills
              const TechSkillData = example.resume_example?.tech_skills;
              if (TechSkillData) {
                const technicalSkillsSubmit = {
                  section_name: "technical Skills",
                  skills: TechSkillData.map((skill) => skill.name),
                };

                ApiService.resumeTechnicalSkillsAdd(
                  user?.token,
                  technicalSkillsSubmit,
                  resumeId
                )
                  .then((res) => { })
                  .catch((err) => console.log(err));
              }
              // Add soft Skills
              const SoftSkillData = example.resume_example?.soft_skills;
              if (SoftSkillData) {
                const softSkillsSubmit = {
                  section_name: "soft Skills",
                  skills: SoftSkillData.map((skill) => skill.name),
                };
                ApiService.resumeSoftSkillsAdd(
                  user?.token,
                  softSkillsSubmit,
                  resumeId
                )
                  .then((res) => { })
                  .catch((err) => console.log(err));
              }
            })
            .catch((err) => console.log(err));

          // Formating
          setActiveTemplate(template_id);

          const summary = example.resume_example?.summaries[0]?.description;
          setSummaryId(example.resume_example?.summaries[0]?.id);
          // Experince
          setUserExperiencesList(example.resume_example?.experiences);
          setUserEducationList(example.resume_example?.educations);
          // Technical Skills
          const TechSkillData = example.resume_example?.tech_skills;
          let TechnicalSkillsArrayData = [];
          if (TechSkillData) {
            TechnicalSkillsArrayData = TechSkillData.map((skill) => skill.name);
          }

          // soft Skills
          const SoftSkillData = example.resume_example?.soft_skills;

          let SoftSkillsArrayData = [];
          if (SoftSkillData) {
            SoftSkillsArrayData = SoftSkillData.map((skill) => skill.name);
          }
          // Certificates
          setUserCertificatesList(example.resume_example.certificates);

          setResumeData((prev) => ({
            ...prev,
            image_url: res.data.data.image_url,
            resume_name: first_name + "" + last_name,
            profile_image: profile_image,
            first_name: first_name,
            last_name: last_name,
            middle_name: middle_name,
            email_address: email_address,
            contact_number: "",
            gender: gender,
            date_of_birth: date_of_birth,
            maritial_status: maritial_status,
            country_id: country_id,
            city: city,
            state: state,
            nationality: nationality,
            street_address: street_address,
            linkedin: linkedin,
            website: website,
            postal_code: postal_code,
            phone_number: phone_number,
            id_no: id_no,
            job_title: job_title,
            // summary
            summary: summary,
            experiences: experiences,
            // Technical Skills
            technical_skills: TechnicalSkillsArrayData,
            technical_skills_feildName: TechSkillData?.title,
            technicalSkillsId: TechSkillData?.id,
            // soft Skills
            soft_skills: SoftSkillsArrayData,
            soft_skills_feildName: SoftSkillData?.title,
            softSkillsId: SoftSkillData?.id,
            // certificates
            certificates: certificates,
            languages: languages,
            education: educations,
            references,
            resume_sections: {
              show_awards: 1,
              show_certificates: 1,
              show_experience: 1,
              show_languages: 1,
              show_references: 1,
              show_soft_skills: 1,
            },
          }));
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const changeFormatingResume = (
    useTemplate,
    useFontStyle,
    useTheme,
    useFontSize
  ) => {
    const data = {
      template_id: useTemplate,
      heading_fontsize: useFontSize,
      color: useTheme,
      heading_font_style: useFontStyle,
    };
    ApiService.handleResumeFormating(user?.token, data, resumeData.resumeId)
      .then((res) => { })
      .catch((err) => console.log(err));
  };

  const {
    formState: { errors },
    watch,
  } = useForm({ mode: "onChange" });

  // is form Has Error
  const [formHasError, setFormHasError] = useState(false);
  const watchForm = watch();
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setFormHasError(true);
      console.log(errors);
    } else {
      setFormHasError(false);
    }
  }, [errors, watchForm]);

  // other states
  const [isSaving, setIsSeving] = useState(false);
  const [check_download_tour, set_check_download_tour] = useState(false);

  // ! tool bar
  const [formOpen, setFormOpen] = useState(false);
  const [MobBtns, setMobBtns] = useState(false);
  const [activeToolBarTab, setActiveToolBarTab] = useState(0);
  const [toolbarResumeTabsOpen, setToolbarResumeTabsOpen] = useState(false);
  const toolbarResumeTabs = [
    { id: 1, name: "Resume Section", icon: <BiBookContent /> },
    { id: 2, name: "Switch To Template", icon: <HiOutlineSwitchHorizontal /> },
    { id: 4, name: "Font Style", icon: <BiFontFamily /> },
    { id: 3, name: "Theme", icon: <LuPaintbrush /> },
  ];

  const sections = [
    "header_resume",
    "summary_resume",
    "experience_resume",
    "educations_resume",
    "technicalSkills_resume",
    "softSkills_resume",
    "certificates_resume",
    "custom_section_resume",
    "honorsandawards_resume",
    "languages_resume",
    "refrances_resume",
  ];
  const resumeSection = [
    {
      id: "header_resume",
      icon: `<svg width="1em" height="1em" viewBox="0 0 21 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 2.25H16.5C17.0967 2.25 17.669 2.48705 18.091 2.90901C18.5129 3.33097 18.75 3.90326 18.75 4.5V5.25H2.25V4.5C2.25 3.90326 2.48705 3.33097 2.90901 2.90901C3.33097 2.48705 3.90326 2.25 4.5 2.25ZM2.25 7.5V13.5C2.25 14.0967 2.48705 14.669 2.90901 15.091C3.33097 15.5129 3.90326 15.75 4.5 15.75H16.5C17.0967 15.75 17.669 15.5129 18.091 15.091C18.5129 14.669 18.75 14.0967 18.75 13.5V7.5H2.25ZM0 4.5C0 3.30653 0.474106 2.16193 1.31802 1.31802C2.16193 0.474106 3.30653 0 4.5 0H16.5C17.6935 0 18.8381 0.474106 19.682 1.31802C20.5259 2.16193 21 3.30653 21 4.5V13.5C21 14.6935 20.5259 15.8381 19.682 16.682C18.8381 17.5259 17.6935 18 16.5 18H4.5C3.30653 18 2.16193 17.5259 1.31802 16.682C0.474106 15.8381 0 14.6935 0 13.5V4.5Z" fill="black"/>
      </svg>
      `,
      name: "Header",
    },
    {
      id: "summary_resume",
      icon: `<svg
      viewBox="0 0 900 1000"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M340 612v68l-200-80v-68l200 80m0-208v68l-200-80v-68l200 80M878 58c14.667 8 22 22 22 42v640c0 22.667-10.667 38-32 46L470 946c-5.333 1.333-8.667 2-10 2-1.333 0-3 .333-5 1s-3.667 1-5 1c-1.333 0-3-.333-5-1s-3.667-1-5-1l-10-2L32 786c-21.333-8-32-23.333-32-46V100c0-20 7.333-34 22-42 14.667-10.667 30-12.667 46-6l382 154L832 52c16-6.667 31.333-4.667 46 6M400 846V286L80 158v560l320 128m420-128V158L500 286v560l320-128m-60-186v68l-200 80v-68l200-80m0-208v68l-200 80v-68l200-80" />
    </svg>`,
      name: "Summary",
    },
    {
      id: "experience_resume",
      icon: `<svg
      viewBox="0 0 880 1000"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M440 60l120 336h320L618 592l94 348-272-208-272 208 94-348L0 396h320L440 60" />
    </svg>
      `,
      name: "Experience",
    },
    {
      id: "educations_resume",
      icon: `<svg
      viewBox="0 0 1000 1000"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M166 612l334 168 276-136c-2.667 14.667-5.333 30.333-8 47s-4.667 28.333-6 35c-1.333 6.667-5 14.333-11 23s-14 16.333-24 23c-10 6.667-25 14-45 22-26.667 12-53.333 25.667-80 41-26.667 15.333-47.667 26.667-63 34-15.333 7.333-28.333 11-39 11-10.667 0-24-4.333-40-13s-37.333-21-64-37-53.333-29.333-80-40c-48-21.333-82.333-44.333-103-69s-36.333-61-47-109m810-246c16 9.333 24 20.333 24 33 0 12.667-8 23.667-24 33l-78 44-308-102c-14.667-24-44.667-36-90-36-26.667 0-49 5.333-67 16s-27 24-27 40 9 29.333 27 40c18 10.667 40.333 16 67 16 17.333 0 29.333-1.333 36-4l292 68-268 152c-40 21.333-80 21.333-120 0L24 432c-16-9.333-24-20.333-24-33 0-12.667 8-23.667 24-33l416-234c40-21.333 80-21.333 120 0l416 234M848 808c12-77.333 16.333-138 13-182-3.333-44-9.667-74-19-90l-14-22 70-38c4 5.333 8 14.667 12 28s9.667 47 17 101 5 119.667-7 197c-2.667 17.333-10 27.333-22 30-12 2.667-23.667 1-35-5-11.333-6-16.333-12.333-15-19" />
    </svg>
      `,
      name: "Educations",
    },
    {
      id: "technicalSkills_resume",
      icon: `<svg
      viewBox="0 0 1000 1000"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M950 460c13.333 0 25 4 35 12s15 17.333 15 28c0 26.667-16.667 40-50 40h-48c-33.333 0-50-13.333-50-40 0-10.667 5-20 15-28s21.667-12 35-12h48M500 226c76 0 141 26.667 195 80s81 118 81 194c0 77.333-27 142.667-81 196s-119 80-195 80-140.667-26.667-194-80-80-118.667-80-196c0-76 26.667-140.667 80-194s118-80 194-80m0 474c54.667 0 101.667-19.333 141-58s59-86 59-142c0-54.667-19.667-101.667-59-141s-86.333-59-141-59-101.667 19.667-141 59-59 86.333-59 141c0 56 19.667 103.333 59 142s86.333 58 141 58M150 500c0 26.667-16.667 40-50 40H50c-33.333 0-50-13.333-50-40 0-10.667 5-20 15-28s21.667-12 35-12h50c13.333 0 25 4 35 12s15 17.333 15 28m350-350c-10.667 0-20-5-28-15s-12-21.667-12-35V50c0-13.333 4-25 12-35s17.333-15 28-15c10.667 0 20 5 28 15s12 21.667 12 35v50c0 13.333-4 25-12 35s-17.333 15-28 15m0 700c10.667 0 20 5 28 15s12 21.667 12 35v50c0 13.333-4 25-12 35s-17.333 15-28 15c-10.667 0-20-5-28-15s-12-21.667-12-35v-50c0-13.333 4-25 12-35s17.333-15 28-15m368-660l-34 34c-22.667 22.667-44 25.333-64 8-18.667-18.667-16-40 8-64 2.667-4 14-16 34-36 24-22.667 45.333-24.667 64-6s16 40-8 64M168 778c9.333-10.667 20.333-16.667 33-18 12.667-1.333 22.333 2 29 10 8 8 11.333 18.333 10 31-1.333 12.667-6.667 23.667-16 33l-36 36c-9.333 9.333-20.333 14.667-33 16-12.667 1.333-22.333-2-29-10-20-18.667-18-40 6-64 4-2.667 16-14 36-34m20-646l36 36c24 24 26 45.333 6 64-6.667 6.667-16.333 9.333-29 8-12.667-1.333-23.667-6.667-33-16-20-20-32-31.333-36-34-9.333-9.333-14.667-20.333-16-33-1.333-12.667 2-23 10-31 6.667-8 16.333-11.333 29-10 12.667 1.333 23.667 6.667 33 16m590 702c-24-24-26.667-45.333-8-64s40-16 64 8l34 34c24 24 26.667 45.333 8 64s-40 16.667-64-6c-20-20-31.333-32-34-36" />
    </svg>
      `,
      name: "Technical Skills",
    },
    {
      id: "softSkills_resume",
      icon: `<svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 14.2422H9V11.9922H0V14.2422ZM0 10.491H18V8.24102H0V10.491ZM0 6.74336H18V4.49336H0V6.74336ZM0 0.742188V2.99219H18V0.742188H0Z" fill="black"/>
      </svg>
      `,
      name: "Soft Skills",
    },
    {
      id: "certificates_resume",
      icon: `<svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M18 15 A3 3 0 0 1 15 18 A3 3 0 0 1 12 15 A3 3 0 0 1 18 15 z" />
      <path d="M13 17.5V22l2-1.5 2 1.5v-4.5" />
      <path d="M10 19H5a2 2 0 01-2-2V7c0-1.1.9-2 2-2h14a2 2 0 012 2v10a2 2 0 01-1 1.73M6 9h12M6 12h3M6 15h2" />
    </svg>
      `,
      name: "Certificates",
    },

    {
      id: "honorsandawards_resume",
      icon: `<svg
      fill="currentColor"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M9.669.864L8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193l.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702 1.509.229z" />
      <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z" />
    </svg>
      `,
      name: "Honors And Awards",
    },
    {
      id: "languages_resume",
      icon: `<svg
      viewBox="0 0 1000.857 1000"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M988 544c20 54.667 16.667 113.333-10 176s-71.333 116-134 160c-6.667 0-10.667-.667-12-2-1.333-1.333-6.667-7.667-16-19s-14.667-17.667-16-19c-1.333-4-.667-7.333 2-10 57.333-40 96.333-90.667 117-152s17-110.667-11-148c-10.667 25.333-23.667 50.667-39 76-15.333 25.333-35 52-59 80s-52.667 49.667-86 65c-33.333 15.333-68.667 20.333-106 15-34.667-4-62.667-17.667-84-41s-32-54.333-32-93c0-56 20-105.333 60-148 33.333-33.333 71.333-55.333 114-66l-2-100c-93.333 16-142 24-146 24-4 1.333-7.333 0-10-4 0-1.333-1.667-11-5-29s-5-28.333-5-31c-1.333-1.333-1-2.667 1-4 2-1.333 4.333-2 7-2l156-28c0-73.333-.667-111.333-2-114 0-5.333 2.667-8 8-8 30.667 0 48-.667 52-2 6.667 0 10 2.667 10 8v104c105.333-14.667 160-22 164-22 5.333-2.667 8.667-.667 10 6 0 1.333 1.333 9 4 23s4 22.333 4 25c2.667 6.667 1.333 10.667-4 12l-176 30v102h12c57.333 0 106.667 12 148 36s70 57.333 86 100M618 704c18.667 4 39.333 2 62-6l-4-214c-22.667 8-42.667 21.333-60 40-29.333 29.333-44 65.333-44 108 0 44 15.333 68 46 72m122-28c18.667-16 38-38.667 58-68s35-55.667 45-79 12.333-37 7-41c-24-12-56-18-96-18-1.333 0-3.333.333-6 1s-4.667 1-6 1l-2 204M292 294c6.667 18.667 24.333 73.667 53 165s56.333 178.333 83 261 40 124.667 40 126c0 2.667-1.333 4-4 4h-86c-4 0-6-1.333-6-4l-50-166H146c-32 109.333-48.667 164.667-50 166 0 2.667-2 4-6 4H4c-2.667 0-4-1.333-4-4 6.667-12 65.333-196 176-552 1.333-5.333 4.667-8 10-8h96c6.667 0 10 2.667 10 8M162 610h144l-72-264-72 264" />
    </svg>
      `,
      name: "Languages",
    },
    {
      id: "refrances_resume",
      icon: `<svg
      viewBox="0 0 16 16"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M16 1.25v4.146a.25.25 0 01-.427.177L14.03 4.03l-3.75 3.75a.75.75 0 11-1.06-1.06l3.75-3.75-1.543-1.543A.25.25 0 0111.604 1h4.146a.25.25 0 01.25.25zM2.75 3.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.75.75 0 01.53-.22h4.5a.25.25 0 00.25-.25v-2.5a.75.75 0 111.5 0v2.5A1.75 1.75 0 0113.25 13H9.06l-2.573 2.573A1.457 1.457 0 014 14.543V13H2.75A1.75 1.75 0 011 11.25v-7.5C1 2.784 1.784 2 2.75 2h5.5a.75.75 0 010 1.5h-5.5z"
      />
    </svg>
      `,
      name: "References",
    },
    {
      id: "custom_section_resume",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" fill="currentColor" width="1em" height="1em" viewBox="0 0 50 50"> <path d="M 36.875 -0.03125 C 32.851563 0.0820313 27.898438 0.722656 25.09375 3.53125 L 24.40625 4.1875 C 19.851563 8.773438 19.886719 15.988281 24.46875 20.59375 L 29.46875 25.59375 C 31.691406 27.824219 34.609375 29.0625 37.6875 29.0625 C 40.730469 29.0625 43.617188 27.824219 45.8125 25.625 L 46.46875 24.96875 C 49.957031 21.484375 49.988281 14.289063 50 11.21875 C 50.003906 10.679688 49.882813 10.257813 49.59375 9.96875 C 49.359375 9.734375 49.023438 9.625 48.6875 9.625 C 48.152344 9.625 47.738281 9.9375 47.53125 10.125 L 41.03125 16.65625 C 40.894531 16.679688 40.578125 16.71875 39.96875 16.71875 C 37.78125 16.71875 34.726563 16.292969 33.96875 15.96875 C 33.464844 14.867188 33.074219 10.042969 33.40625 9.03125 C 34.421875 8.015625 39.960938 2.445313 40 2.40625 C 40.175781 2.207031 40.75 1.515625 40.40625 0.75 C 40.273438 0.457031 39.914063 -0.0273438 38.96875 -0.03125 L 38.53125 -0.03125 C 38.003906 -0.03125 37.449219 -0.046875 36.875 -0.03125 Z M 21.375 19.9375 L 2.3125 37.28125 C 0.292969 39.304688 -1.496094 43.9375 2.3125 47.75 C 4.066406 49.503906 5.902344 49.96875 7.375 49.96875 C 7.753906 49.96875 8.085938 49.925781 8.40625 49.875 C 10.3125 49.589844 11.902344 48.601563 12.78125 47.71875 L 30.09375 28.65625 L 28.5 27.4375 L 22.59375 21.53125 Z"></path> </svg>
      `,
      name: "Custom Section",
    },
  ];

  const closeOpenForms = () => {
    if (window.innerWidth >= 768) {
      setFormOpen(false);
      setActiveForm("");
      setActiveToolBarTab(1);
    }
  };
  const closeOpenForms2 = () => {
    setFormOpen(false);
    setActiveForm("");
    setActiveToolBarTab(1);
  };

  const [activeForm, setActiveForm] = useState("");

  const handleOpenForm = (formId) => {
    sections.map((section) => {
      if (formId === section) {
        setFormOpen(true);
        setActiveForm(section);
      }
    });
  };

  const resumeRef = useRef(null);

  // const downloadTHISPDF = async () => {
  //   if (window.innerWidth <= 1145) {
  //     $("#resumePDF").css("transform", "scale(100%)");
  //     $("#resumePDF").css("width", "1000px");
  //   } else if (window.innerWidth <= 440) {
  //     $("#resumePDF").css("transform", "scale(100%)");
  //     $("#resumePDF").css("width", "1000px");
  //   }

  //   const targetElement = resumeRef.current;

  //   if (targetElement) {
  //     try {
  //       // Use domToPng to take a screenshot of the element
  //       const dataUrl = await domToJpeg(targetElement, {
  //         useCORS: true,
  //         imageTimeout: 15000,
  //         scale: 2,
  //       });

  //       // Create a new jsPDF instance
  //       const pdf = new jsPDF("p", "mm", "a4");

  //       // Define PDF page dimensions
  //       const pdfPageWidth = 210; // A4 width in points
  //       const pdfPageHeight = 297; // A4 height in points

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
  //           const nextpage = pdf.addImage(
  //             dataUrl,
  //             "JPEG",
  //             0,
  //             position,
  //             imgWidth,
  //             imgHeight
  //           );
  //           heightLeft -= pdfPageHeight;
  //           position -= pdfPageHeight;

  //           if (heightLeft > 0) {
  //             pdf.addPage();
  //           }
  //         }

  //         // Download the PDF
  //         pdf.save(`${resumeData.resume_name}.pdf`);
  //         if (window.innerWidth <= 1145) {
  //           $("#resumePDF").css("transform", "scale(40%)");
  //           $("#resumePDF").css("width", "calc(100%/0.4)");
  //         } else if (window.innerWidth <= 440) {
  //           $("#resumePDF").css("transform", "scale(60%)");
  //           $("#resumePDF").css("width", "calc(100%/0.6)");
  //         }
  //       };
  //     } catch (error) {
  //       console.error("Error generating PDF:", error);
  //     }
  //   } else {
  //     console.error('Element with ID "resumePDF" not found.');
  //   }
  // };

  const customFunction = () => {
    if (paidTemplate === 1) {
      if (user3.max_res_templates <= user3.current_res_usage) {
        swal("Sorry!", "Please upgrade your plan", "error");
      } else {
        const headers = {
          Authorization: "Bearer " + user?.token,
        };
        axios
          .get(global.baseurl + "/increase-resume-usage/" + user?.id, {
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
    content: () => resumeRef.current,
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
              element: "#toolbardiv5",
              popover: {
                title: "Download your resume ",
                description: `Finalize your resume by downloading it as a PDF. Ensure the scale is set to default before saving to preserve the layout and format. You can also print your resume directly by clicking the print option to get a hard copy.
   <img src="${Step5}" alt="step5" />`,
                side: "bottom",
                align: "start",
                html: `<img src="${Step5}" alt="step5" />`,
              },
            },
          ],
        });

        driverObj2.drive();
        set_check_download_tour(true);
      } else {
        if (paidTemplate === 1) {
          if (user3.max_res_templates <= user3.current_res_usage) {
            swal("Sorry!", "Please upgrade your plan", "error");
          } else {
            const headers = {
              Authorization: "Bearer " + user?.token,
            };
            axios
              .get(global.baseurl + "/increase-resume-usage/" + user?.id, {
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
      if (check_download_tour == false) {
        const driverObj3 = driver({
          showProgress: true,
          onDeselected: (element) => {
            // Check if the element being deselected is the "Done" button

            // This condition checks if the tour is ending
            customFunction();
          },
          steps: [
            {
              element: "#toolbardiv6",
              popover: {
                title: "Download your resume ",
                description: `When you are about to download your resume, go to the top bar where it shows Paper Size as Letter by default, and change it to ISO A4 for better results.`,
                side: "bottom",
                align: "start",
                html: `<img src="${Step5}" alt="step5" />`,
              },
            },
          ],
        });

        driverObj3.drive();
        set_check_download_tour(true);
      } else {
        if (paidTemplate === 1) {
          if (user3.max_res_templates <= user3.current_res_usage) {
            swal("Sorry!", "Please upgrade your plan", "error");
          } else {
            const headers = {
              Authorization: "Bearer " + user?.token,
            };
            axios
              .get(global.baseurl + "/increase-resume-usage/" + user?.id, {
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
    }
  };

  const captureAndUpload = async (resumeId) => {
    const targetElement = document.getElementById("resumePDF");
    console.log(targetElement);
    var chk = 0;
    if (targetElement) {
      try {
        // if (window.innerWidth <= 768) {
        //   chk = 1;
        //   $("#resumeViwer").css("display", "none");
        //   $("#resumeViwer").css("transform", "scale(100%)");
        //   $("#resumeViwer").css("width", "1100px");
        // } else if (window.innerWidth <= 480) {
        //   chk = 1;
        //   $("#resumeViwer").css("display", "none");
        //   $("#resumeViwer").css("transform", "scale(100%)");
        //   $("#resumeViwer").css("width", "1100px");
        // }
        // Capture the screenshot

        const imgData = await domToPng(targetElement, {
          useCORS: true,
          imageTimeout: 15000,
          scale: 1,
        });

        // Convert the data URL to a Blob
        const response = await fetch(imgData);
        const blob = await response.blob();

        // Create a file from the Blob
        const file = new File([blob], "screenshot.png", { type: "image/png" });

        // Create form data
        ApiService.updateUserResumePreviewImage(user?.token, file, resumeId)
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
        // console.log("saddsdasd");
        // if (chk === 1) {
        //   if (window.innerWidth <= 768) {
        //     $("#resumeViwer").css("display", "block");
        //     $("#resumeViwer").css("transform", "scale(30%)");
        //     $("#resumeViwer").css("width", "calc(100%/0.3)");
        //   } else if (window.innerWidth <= 480) {
        //     $("#resumeViwer").css("display", "block");
        //     $("#resumeViwer").css("transform", "scale(30%)");
        //     $("#resumeViwer").css("width", "calc(100%/0.3)");
        //   }
        //   chk = 0;
        // }
      } catch (error) {
        console.error("Error capturing and uploading screenshot:", error);
      }
    }
  };

  const [sideNav, showSideNav] = useState(false);

  // !Siraj
  const handleResumeSectionsSubmit = (
    show_awards,
    show_certificates,
    show_experience,
    show_languages,
    show_references,
    show_soft_skills
  ) => {
    const resume_sections = {
      show_awards,
      show_certificates,
      show_experience,
      show_languages,
      show_references,
      show_soft_skills,
      profile_id: resumeData.resumeId,
    };
    console.log(resume_sections);

    ApiService.showProfileSectionUpload(user?.token, resume_sections)
      .then((res) => {
        reloadTemplateData();
        console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (activeTemplate > 0) {
      if (resumeData.resumeId) {
        captureAndUpload(resumeData.resumeId);
      }
    }
  }, [activeTemplate, resumeData]);

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
    <section className="bg-[#1A2230] h-full" id="maindiv">
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
      <SideNav isOpen={sideNav} close={(val) => showSideNav(val)} />
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
            onClick={() => showSideNav(true)}
            size={40}
          />
        </div>
      </div>
      <div id="main_contents" className="">
        <section className="flex justify-center items-start  flex-wrap px-6 mt-10 py-10 w-full">
          {/* container */}
          <div className="w-full">
            {/* options */}

            <div className="w-full flex flex-wrap justify-between lg:gap-4 relative">
              {/* resume show */}
              <div
                className={`flex-1 flex relative w-full ${activeToolBarTab > 0 ? "justify-start" : "justify-center"
                  } `}
              >
                <div className={`w-full relative `}>
                  <h1
                    onClick={(e) =>
                      rename_document(
                        activeTemplate,
                        resumeData.uuid,
                        "Resume",
                        resumeData.resume_name
                      )
                    }
                    className="text-white font-Lexend font-semibold text-xl absolute top-[-40px]"
                  >
                    {resumeData.resume_name}
                  </h1>
                  {/* {isSaving ? (
                    <div className="flex items-center text-white font-Lexend absolute font-semibold text-xl top-[-40px] right-[0px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 200 200"
                        width={"20px"}
                        height={"20px"}
                      >
                        <circle
                          transform="rotate(0)"
                          transform-origin="center"
                          fill="none"
                          stroke="white"
                          strokeWidth={15}
                          strokeLinecap="round"
                          strokeDasharray="230 1000"
                          strokeDashoffset={0}
                          cx={100}
                          cy={100}
                          r={70}
                        >
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from={0}
                            to={360}
                            dur={0.9}
                            repeatCount="indefinite"
                          />
                        </circle>
                      </svg>
                      <span className="font-Lexend">Saving</span>
                    </div>
                  ) : (
                    ""
                  )} */}

                  {activeTemplate === 0 ? (
                    <>
                      <h3>Looding...</h3>
                    </>
                  ) : (
                    <div id="resumeViwer">
                      <div className="w-full relative" id="resumePDF">
                        <div
                          className="hidden absolute top-[2.5em] left-20 z-50 rotate-45 
                         text-[gray] text-[10em] opacity-0"
                          id="watermark"
                        >
                          AIPRORESUME
                        </div>
                        <div ref={resumeRef}>
                          <ActiveTemplate
                            activeId={activeTemplate}
                            resumeData={resumeData}
                            activeTheme={activeTheme}
                            activeFont={activeFont}
                            activeFontSize={activeFontSize}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Toolbar */}
              <div className="hidden lg:flex flex-wrap flex-row-reverse justify-end items-start rounded-md sticky top-[80px] h-fit">
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

                <div className="hidden lg:flex flex-row-reverse w-fit bg-secondary-blue py-6 px-2 ml-4 rounded-full">
                  {/* Tabs */}
                  <div className={"flex flex-col items-center gap-4"}>
                    {toolbarResumeTabs.map((tab) => (
                      <div
                        className={
                          tab.name === "Resume Section"
                            ? "toolbardiv flex items-center text-white cursor-pointer py-3 px-3  group relative"
                            : tab.name === "Switch To Template"
                              ? "toolbardiv2 flex items-center text-white cursor-pointer py-3 px-3  group relative"
                              : tab.name === "Font Style"
                                ? "toolbardiv3 flex items-center text-white cursor-pointer py-3 px-3  group relative"
                                : tab.name === "Theme"
                                  ? "toolbardiv4 flex items-center text-white cursor-pointer py-3 px-3  group relative"
                                  : "flex items-center text-white cursor-pointer py-3 px-3  group relative "
                        }
                        id={
                          tab.name === "Resume Section"
                            ? "resumesectionDiv"
                            : ""
                        }
                        onClick={() => {
                          setActiveToolBarTab(tab.id);
                        }}
                      >
                        <div className="absolute right-0 z-20 group-hover:flex hidden justify-start px-2 rounded-full bg-secondary-blue w-[200px] items-center h-full ">
                          <div className="text-2xl">{tab.icon}</div>
                          <div
                            className={`text-md font-lexend font-medium pl-2`}
                          >
                            {tab.name}
                          </div>
                        </div>
                        <div className="text-2xl">{tab.icon}</div>
                      </div>
                    ))}
                    <div className="w-full h-[1px] bg-white"></div>

                    <div
                      className={
                        "flex items-center text-white cursor-pointer py-3 px-3  group relative toolbardiv5"
                      }
                      id="toolbardiv5"
                      onClick={downloadPDF}
                    >
                      <div className="absolute right-0 z-20 group-hover:flex hidden justify-start px-2 rounded-full bg-secondary-blue w-[200px] items-center h-full ">
                        <div className="text-2xl ">
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
                        setActiveToolBarTab(0);
                      }}
                    >
                      <div
                        onClick={() => {
                          share_doc();
                        }}
                        className="absolute right-0 z-20 group-hover:flex hidden justify-start px-2 rounded-full bg-secondary-blue w-[200px] items-center h-full "
                      >
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
                        setActiveToolBarTab(0);
                      }}
                    >
                      <div
                        onClick={() => {
                          download_email();
                        }}
                        className="absolute right-0 z-20 group-hover:flex hidden justify-start px-2 rounded-full bg-secondary-blue w-[200px] items-center h-full "
                      >
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
                          activeTemplate,
                          resumeData.uuid,
                          "Resume",
                          resumeData.resume_name
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
                          activeTemplate,
                          resumeData.uuid,
                          "Resume",
                          resumeData.resume_name
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
                    <div
                      className={
                        "flex items-center text-white cursor-pointer py-3 px-3  group relative"
                      }
                      onClick={(e) => $("#checkbox_model").fadeIn()}
                    >
                      <div className="absolute right-0 z-20 group-hover:flex hidden justify-start px-2 rounded-full bg-secondary-blue w-[200px] items-center h-full ">
                        <div className="text-2xl">
                          <HiOutlineCog />
                        </div>
                        <div className={`text-md font-lexend font-medium pl-2`}>
                          Setting
                        </div>
                      </div>
                      <div className="text-2xl">
                        <HiOutlineCog />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Screens */}
                <div
                  className={`relative ${activeToolBarTab > 0 ? "block" : "hidden"
                    } `}
                >
                  <div
                    style={{
                      border: "10px solid white",
                      boxSizing: "border-box",
                    }}
                    className={`hidden lg:block  2xl:right-0 absolute rounded-xl min-w-[250px] max-w-[600px] right-0 min-h-[200px] max-h-[700px] overflow-y-auto bg-white shadow-lg `}
                  >
                    <div className={``}>
                      {activeToolBarTab === 1 && (
                        <div>
                          <div className="" id="formsSection">
                            {formOpen && (
                              <div
                                className="sticky top-[10px] left-[10px] bg-[#0072b1] hover:bg-[#E66868] mb-4 w-[30px] h-[30px] text-[#fff] rounded-full flex justify-center items-center cursor-pointer z-30"
                                onClick={() => closeOpenForms()}
                              >
                                <IoIosArrowBack size={20} />
                              </div>
                            )}
                            <div
                              className={`${formOpen ? "hidden" : "block"} `}
                            >
                              {resumeSection.map((section) => (
                                <div
                                  key={section.id}
                                  className="resume-section  flex items-center p-2  cursor-pointer hover:text-[#01B2AC]"
                                  onClick={() => handleOpenForm(section.id)}
                                >
                                  <div
                                    className="icon"
                                    dangerouslySetInnerHTML={{
                                      __html: section.icon,
                                    }}
                                  ></div>
                                  <span className="name ml-2 text-lg font-Lexend ">
                                    {section.name}
                                  </span>
                                </div>
                              ))}
                            </div>
                            <div
                              className={`${formOpen ? "w-[570px]" : "w-auto"
                                } setMUI font-Lexend `}
                            >
                              {/* Header */}
                              {activeForm === "header_resume" && (
                                <HeaderForm
                                  isSeving={(val) => setIsSeving(val)}
                                  formHasError={formHasError}
                                  TemplateId={activeTemplate}
                                  resumeData={resumeData}
                                  countries={countries}
                                  ResumeProfileImage={resumeData?.profile_image}
                                  storePreviewImage={() =>
                                    captureAndUpload(resumeData.resumeId)
                                  }
                                  jobPositionsListData={job_positions}
                                  reloadTheData={() => {
                                    reloadTemplateData();
                                    getobjectives();
                                  }}
                                  closeOpenForms={() => {
                                    closeOpenForms();
                                  }}
                                  // setters
                                  setFirstName={(val) => {
                                    setResumeData((prev) => ({
                                      ...prev,
                                      first_name: val,
                                    }));
                                  }}
                                  setLastName={(val) =>
                                    setResumeData((prev) => ({
                                      ...prev,
                                      last_name: val,
                                    }))
                                  }
                                  setEmailAddress={(val) =>
                                    setResumeData((prev) => ({
                                      ...prev,
                                      email_address: val,
                                    }))
                                  }
                                  setJobTitle={(val) =>
                                    setResumeData((prev) => ({
                                      ...prev,
                                      job_title: val,
                                    }))
                                  }
                                  setPhoneNumber={(val) =>
                                    setResumeData((prev) => ({
                                      ...prev,
                                      phone_number: val,
                                    }))
                                  }
                                  setContactNumber={(val) =>
                                    setResumeData((prev) => ({
                                      ...prev,
                                      contact_number: val,
                                    }))
                                  }
                                  setStreetAddress={(val) =>
                                    setResumeData((prev) => ({
                                      ...prev,
                                      street_address: val,
                                    }))
                                  }
                                  setPostalCode={(val) =>
                                    setResumeData((prev) => ({
                                      ...prev,
                                      postal_code: val,
                                    }))
                                  }
                                  setGender={(val) =>
                                    setResumeData((prev) => ({
                                      ...prev,
                                      gender: val,
                                    }))
                                  }
                                  setWebsite={(val) =>
                                    setResumeData((prev) => ({
                                      ...prev,
                                      website: val,
                                    }))
                                  }
                                  // Profile Image
                                  changeProfileImage={(val) =>
                                    setResumeData((prev) => ({
                                      ...prev,
                                      profile_image: val,
                                    }))
                                  }
                                  // set State Name
                                  setStateName={(val) => {
                                    setResumeData((prev) => ({
                                      ...prev,
                                      state: val,
                                    }));
                                  }}
                                  // set city Name
                                  setCityName={(val) => {
                                    setResumeData((prev) => ({
                                      ...prev,
                                      city: val,
                                    }));
                                  }}
                                  setCountryName={(val) => {
                                    setResumeData((prev) => ({
                                      ...prev,
                                      country_id: val,
                                    }));
                                  }}
                                />
                              )}
                              {/* SummaryForm */}
                              {activeForm === "summary_resume" && (
                                <SummaryForm
                                  setSummary={(val) =>
                                    setResumeData((prev) => ({
                                      ...prev,
                                      summary: val,
                                    }))
                                  }
                                  summaryObjectives={summaryObjectives}
                                  summaryObjectives2={summaryObjectives2}
                                  resumeSummary={resumeData?.summary}
                                  closeOpenForms={() => {
                                    closeOpenForms();
                                  }}
                                  summaryId={summaryId}
                                  profileId={resumeData.resumeId}
                                  itSaving={(value) => setIsSeving(value)}
                                  storePreviewImage={() =>
                                    captureAndUpload(resumeData.resumeId)
                                  }
                                />
                              )}
                              {/* Experience */}
                              {activeForm === "experience_resume" && (
                                <ExperienceForm
                                  jobPositionsListData={job_positions}
                                  countries={countries}
                                  userExperiencesList={userExperiencesList}
                                  resumeId={resumeData.resumeId}
                                  reloadTheData={() => {
                                    reloadTemplateData();
                                    captureAndUpload(resumeData.resumeId);
                                  }}
                                  isSeving={(val) => setIsSeving(val)}
                                  resume_sections={resumeData?.resume_sections}
                                  updateResumeSection={(val) => {
                                    handleResumeSectionsSubmit(
                                      resumeData.resume_sections.show_awards,
                                      resumeData.resume_sections
                                        .show_certificates,
                                      val,
                                      resumeData.resume_sections.show_languages,
                                      resumeData.resume_sections
                                        .show_references,
                                      resumeData.resume_sections
                                        .show_soft_skills
                                    );
                                  }}
                                />
                              )}
                              {/* Education */}
                              {activeForm === "educations_resume" && (
                                <EducationForm
                                  userEducationsList={userEducationsList}
                                  resumeId={resumeData.resumeId}
                                  degreesList={degrees}
                                  reloadTheData={() => {
                                    reloadTemplateData();
                                    captureAndUpload(resumeData.resumeId);
                                  }}
                                  isSeving={(val) => setIsSeving(val)}
                                />
                              )}
                              {/* technical Skills */}
                              {activeForm === "technicalSkills_resume" && (
                                <TechnicalSkillsForm
                                  currentSkills={resumeData?.technical_skills}
                                  currentFildName={
                                    resumeData.technical_skills_feildName
                                  }
                                  currentSkillId={resumeData.technicalSkillsId}
                                  skillsOptions={technicalSkillsOptions}
                                  storePreviewImage={() =>
                                    captureAndUpload(resumeData.resumeId)
                                  }
                                  isSaving={(val) => setIsSeving(val)}
                                  updateSkills={(array) =>
                                    setResumeData((prev) => ({
                                      ...prev,
                                      technical_skills: array,
                                    }))
                                  }
                                  updateFeildName={(val) =>
                                    setResumeData((prev) => ({
                                      ...prev,
                                      technical_skills_feildName: val,
                                    }))
                                  }
                                  closeOpenForms={() => {
                                    closeOpenForms();
                                  }}
                                  profileId={resumeData?.resumeId}
                                />
                              )}
                              {/* soft Skills */}
                              {activeForm === "softSkills_resume" && (
                                <SoftSkillsform
                                  currentSkills={resumeData?.soft_skills}
                                  currentFildName={
                                    resumeData.soft_skills_feildName
                                  }
                                  currentSkillId={resumeData.softSkillsId}
                                  skillsOptions={softSkillsOptions}
                                  isSaving={(val) => setIsSeving(val)}
                                  storePreviewImage={() =>
                                    captureAndUpload(resumeData.resumeId)
                                  }
                                  resume_sections={resumeData?.resume_sections}
                                  updateResumeSection={(val) => {
                                    handleResumeSectionsSubmit(
                                      resumeData.resume_sections.show_awards,
                                      resumeData.resume_sections
                                        .show_certificates,
                                      resumeData.resume_sections
                                        .show_experience,
                                      resumeData.resume_sections.show_languages,
                                      resumeData.resume_sections
                                        .show_references,
                                      val
                                    );
                                  }}
                                  updateSkills={(array) =>
                                    setResumeData((prev) => ({
                                      ...prev,
                                      soft_skills: array,
                                    }))
                                  }
                                  updateFeildName={(val) =>
                                    setResumeData((prev) => ({
                                      ...prev,
                                      soft_skills_feildName: val,
                                    }))
                                  }
                                  closeOpenForms={() => {
                                    closeOpenForms();
                                  }}
                                  prifileId={resumeData?.resumeId}
                                />
                              )}
                              {/* Certificates  */}
                              {activeForm === "certificates_resume" && (
                                <CertificatesForm
                                  userCertificatesList={userCertificatesList}
                                  resumeId={resumeData.resumeId}
                                  reloadTheData={() => {
                                    reloadTemplateData();
                                    captureAndUpload(resumeData.resumeId);
                                  }}
                                  isSeving={(val) => setIsSeving(val)}
                                  resume_sections={resumeData?.resume_sections}
                                  updateResumeSection={(val) => {
                                    handleResumeSectionsSubmit(
                                      resumeData.resume_sections.show_awards,
                                      val,
                                      resumeData.resume_sections
                                        .show_experience,
                                      resumeData.resume_sections.show_languages,
                                      resumeData.resume_sections
                                        .show_references,
                                      resumeData.resume_sections
                                        .show_soft_skills
                                    );
                                  }}
                                />
                              )}
                              {/* Custom Section  */}
                              {activeForm === "custom_section_resume" && (
                                <CustomSectionForm
                                  customSectionList={customSectionList}
                                  resumeId={resumeData.resumeId}
                                  reloadTheData={() => {
                                    reloadTemplateData();
                                    captureAndUpload(resumeData.resumeId);
                                  }}
                                  isSeving={(val) => setIsSeving(val)}
                                  resume_sections={resumeData?.resume_sections}
                                  updateResumeSection={(val) => {
                                    handleResumeSectionsSubmit(
                                      resumeData.resume_sections.show_awards,
                                      val,
                                      resumeData.resume_sections
                                        .show_experience,
                                      resumeData.resume_sections.show_languages,
                                      resumeData.resume_sections
                                        .show_references,
                                      resumeData.resume_sections
                                        .show_soft_skills
                                    );
                                  }}
                                />
                              )}
                              {/* honorsandawards_resume */}
                              {activeForm === "honorsandawards_resume" && (
                                <HonorsAndAwardsForm
                                  userHonorAndAwardList={userHonorAndAwardList}
                                  resumeId={resumeData.resumeId}
                                  reloadTheData={() => {
                                    reloadTemplateData();
                                    captureAndUpload(resumeData.resumeId);
                                  }}
                                  isSeving={(val) => setIsSeving(val)}
                                  resume_sections={resumeData?.resume_sections}
                                  updateResumeSection={(val) => {
                                    handleResumeSectionsSubmit(
                                      val,
                                      resumeData.resume_sections
                                        .show_certificates,
                                      resumeData.resume_sections
                                        .show_experience,
                                      resumeData.resume_sections.show_languages,
                                      resumeData.resume_sections
                                        .show_references,
                                      resumeData.resume_sections
                                        .show_soft_skills
                                    );
                                  }}
                                />
                              )}
                              {/* languages_resume */}
                              {activeForm === "languages_resume" && (
                                <LanguageForm
                                  userLanguagesList={resumeData.languages}
                                  languagesList={languagesList}
                                  levelsList={levelsList}
                                  resumeId={resumeData.resumeId}
                                  reloadTheData={() => {
                                    reloadTemplateData();
                                    captureAndUpload(resumeData.resumeId);
                                  }}
                                  isSeving={(val) => setIsSeving(val)}
                                  resume_sections={resumeData?.resume_sections}
                                  updateResumeSection={(val) => {
                                    handleResumeSectionsSubmit(
                                      resumeData.resume_sections.show_awards,
                                      resumeData.resume_sections
                                        .show_certificates,
                                      resumeData.resume_sections
                                        .show_experience,
                                      val,
                                      resumeData.resume_sections
                                        .show_references,
                                      resumeData.resume_sections
                                        .show_soft_skills
                                    );
                                  }}
                                />
                              )}
                              {/* refrances */}
                              {activeForm === "refrances_resume" && (
                                <RefrancesForm
                                  jobsList={job_positions}
                                  userRefrancesList={resumeData.references}
                                  isSeving={(val) => setIsSeving(val)}
                                  reloadTheData={() => {
                                    reloadTemplateData();
                                    captureAndUpload(resumeData.resumeId);
                                  }}
                                  resumeId={resumeData.resumeId}
                                  resume_sections={resumeData?.resume_sections}
                                  updateResumeSection={(val) => {
                                    handleResumeSectionsSubmit(
                                      resumeData.resume_sections.show_awards,
                                      resumeData.resume_sections
                                        .show_certificates,
                                      resumeData.resume_sections
                                        .show_experience,
                                      resumeData.resume_sections.show_languages,
                                      val,
                                      resumeData.resume_sections
                                        .show_soft_skills
                                    );
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      {activeToolBarTab === 2 && (
                        <div className="w-[570px]">
                          {/* Templates */}
                          <div className="flex flex-row-reverse">
                            <div className="grid grid-cols-2 gap-4 p-2">
                              {resumeTemplatesListing?.map((template, idx) => (
                                <div
                                  key={idx}
                                  className="cursor-pointer hover:bg-[rgba(0,0,0,0.2)] relative"
                                  onClick={() => {
                                    setActiveTemplate(template.id);
                                    setPaidTemplate(template.is_paid);
                                    changeFormatingResume(
                                      template.id,
                                      activeFont,
                                      activeTheme,
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
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      {activeToolBarTab === 3 && (
                        <div className="w-[550px]">
                          {/* Themes */}
                          <Themes
                            activeTheme={(val) => {
                              setActiveTheme(val);
                              changeFormatingResume(
                                activeTemplate,
                                activeFont,
                                val,
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
                              changeFormatingResume(
                                activeTemplate,
                                val,
                                activeTheme,
                                activeFontSize
                              );
                            }}
                            activeFontSize={(val) => {
                              setActiveFontSize(val);

                              changeFormatingResume(
                                activeTemplate,
                                activeFont,
                                activeTheme,
                                val
                              );
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* end screen */}
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
                      id="toolbardiv6"
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
                      onClick={(e) => $("#checkbox_model").fadeIn()}
                    >
                      <div className="absolute right-0 z-20 group-hover:flex hidden justify-start px-2 rounded-full bg-secondary-blue w-[200px] items-center h-full ">
                        <div className="text-2xl">
                          <HiOutlineCog />
                        </div>
                        <div className={`text-md font-lexend font-medium pl-2`}>
                          Setting
                        </div>
                      </div>
                      <div className="text-2xl">
                        <HiOutlineCog />
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
                          activeTemplate,
                          resumeData.uuid,
                          "Resume",
                          resumeData.resume_name
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
                          activeTemplate,
                          resumeData?.uuid,
                          "Resume",
                          resumeData.resume_name
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
              id="scroll_top"
              className={`lg:hidden p-2 2xl:right-0 fixed rounded-xl w-[90%] left-[5%] bottom-10 z-10 max-h-[600px] overflow-y-auto bg-[#fff] shadow-lg pb-10 scroll_top`}
            >
              {activeToolBarTab != 0 ? (
                <div
                  onClick={() => {
                    setActiveToolBarTab(!activeToolBarTab);
                  }}
                  className={`sticky top-[10px] left-[10px] bg-[#E66868] hover:bg-[#E66868] mb-4 w-[30px] h-[30px] text-[#fff] rounded-full flex justify-center items-center cursor-pointer z-30`}
                >
                  {toolbarResumeTabsOpen ? (
                    <RxCross1 size={20} />
                  ) : (
                    <RxCross1 size={20} />
                  )}
                </div>
              ) : (
                ""
              )}
              {formOpen && (
                <div
                  className="sticky top-[10px] left-[10px] bg-[#0072b1] hover:bg-[#E66868] mb-4 w-[30px] h-[30px] text-[#fff] rounded-full flex justify-center items-center cursor-pointer z-30"
                  onClick={() => closeOpenForms2()}
                >
                  <IoIosArrowBack size={20} />
                </div>
              )}

              <div className={``}>
                {activeToolBarTab === 1 && (
                  <div className="pb-10">
                    <div className="min-h-[600px] relative max-h-[600px] overflow-x-scroll scroll-bar-hide transition-all w-full">
                      <div className={`${formOpen ? "hidden" : "block"}`}>
                        {resumeSection.map((section) => (
                          <div
                            key={section.id}
                            className="resume-section  flex items-center p-2  cursor-pointer hover:text-[#01B2AC]"
                            onClick={() => handleOpenForm(section.id)}
                          >
                            <div
                              className="icon"
                              dangerouslySetInnerHTML={{
                                __html: section.icon,
                              }}
                            ></div>
                            <span className="name ml-2 text-lg font-Lexend ">
                              {section.name}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="setMUI font-Lexend">
                        {/* Header */}
                        {/* Header */}
                        {activeForm === "header_resume" && (
                          <HeaderForm
                            isSeving={(val) => setIsSeving(val)}
                            formHasError={formHasError}
                            TemplateId={activeTemplate}
                            resumeData={resumeData}
                            countries={countries}
                            ResumeProfileImage={resumeData?.profile_image}
                            storePreviewImage={() =>
                              captureAndUpload(resumeData.resumeId)
                            }
                            jobPositionsListData={job_positions}
                            reloadTheData={() => {
                              reloadTemplateData();
                              getobjectives();
                            }}
                            closeOpenForms={() => {
                              closeOpenForms();
                            }}
                            // setters
                            setFirstName={(val) => {
                              setResumeData((prev) => ({
                                ...prev,
                                first_name: val,
                              }));
                            }}
                            setLastName={(val) =>
                              setResumeData((prev) => ({
                                ...prev,
                                last_name: val,
                              }))
                            }
                            setEmailAddress={(val) =>
                              setResumeData((prev) => ({
                                ...prev,
                                email_address: val,
                              }))
                            }
                            setJobTitle={(val) =>
                              setResumeData((prev) => ({
                                ...prev,
                                job_title: val,
                              }))
                            }
                            setPhoneNumber={(val) =>
                              setResumeData((prev) => ({
                                ...prev,
                                phone_number: val,
                              }))
                            }
                            setContactNumber={(val) =>
                              setResumeData((prev) => ({
                                ...prev,
                                contact_number: val,
                              }))
                            }
                            setStreetAddress={(val) =>
                              setResumeData((prev) => ({
                                ...prev,
                                street_address: val,
                              }))
                            }
                            setPostalCode={(val) =>
                              setResumeData((prev) => ({
                                ...prev,
                                postal_code: val,
                              }))
                            }
                            setGender={(val) =>
                              setResumeData((prev) => ({
                                ...prev,
                                gender: val,
                              }))
                            }
                            setWebsite={(val) =>
                              setResumeData((prev) => ({
                                ...prev,
                                website: val,
                              }))
                            }
                            // Profile Image
                            changeProfileImage={(val) =>
                              setResumeData((prev) => ({
                                ...prev,
                                profile_image: val,
                              }))
                            }
                            // set State Name
                            setStateName={(val) => {
                              setResumeData((prev) => ({
                                ...prev,
                                state: val,
                              }));
                            }}
                            // set city Name
                            setCityName={(val) => {
                              setResumeData((prev) => ({
                                ...prev,
                                city: val,
                              }));
                            }}
                            setCountryName={(val) => {
                              setResumeData((prev) => ({
                                ...prev,
                                country_id: val,
                              }));
                            }}
                          />
                        )}
                        {/* SummaryForm */}
                        {activeForm === "summary_resume" && (
                          <SummaryForm
                            setSummary={(val) =>
                              setResumeData((prev) => ({
                                ...prev,
                                summary: val,
                              }))
                            }
                            summaryObjectives={summaryObjectives}
                            summaryObjectives2={summaryObjectives2}
                            resumeSummary={resumeData?.summary}
                            summaryId={summaryId}
                            profileId={resumeData.resumeId}
                            closeOpenForms={() => {
                              closeOpenForms();
                            }}
                            itSaving={(value) => setIsSeving(value)}
                            storePreviewImage={() =>
                              captureAndUpload(resumeData.resumeId)
                            }
                          />
                        )}
                        {/* Experience */}
                        {activeForm === "experience_resume" && (
                          <ExperienceForm
                            jobPositionsListData={job_positions}
                            countries={countries}
                            userExperiencesList={userExperiencesList}
                            resumeId={resumeData.resumeId}
                            reloadTheData={() => {
                              reloadTemplateData();
                              captureAndUpload(resumeData.resumeId);
                            }}
                            isSeving={(val) => setIsSeving(val)}
                            resume_sections={resumeData?.resume_sections}
                            updateResumeSection={(val) =>
                              handleResumeSectionsSubmit(
                                resumeData.resume_sections.show_awards,
                                resumeData.resume_sections.show_certificates,
                                val,
                                resumeData.resume_sections.show_languages,
                                resumeData.resume_sections.show_references,
                                resumeData.resume_sections.show_soft_skills
                              )
                            }
                          />
                        )}
                        {/* Education */}
                        {activeForm === "educations_resume" && (
                          <EducationForm
                            userEducationsList={userEducationsList}
                            resumeId={resumeData.resumeId}
                            degreesList={degrees}
                            reloadTheData={() => {
                              reloadTemplateData();
                              captureAndUpload(resumeData.resumeId);
                            }}
                            isSeving={(val) => setIsSeving(val)}
                          />
                        )}
                        {/* technical Skills */}
                        {activeForm === "technicalSkills_resume" && (
                          <TechnicalSkillsForm
                            currentSkills={resumeData?.technical_skills}
                            currentFildName={
                              resumeData.technical_skills_feildName
                            }
                            currentSkillId={resumeData.technicalSkillsId}
                            skillsOptions={technicalSkillsOptions}
                            storePreviewImage={() =>
                              captureAndUpload(resumeData.resumeId)
                            }
                            isSaving={(val) => setIsSeving(val)}
                            updateSkills={(array) =>
                              setResumeData((prev) => ({
                                ...prev,
                                technical_skills: array,
                              }))
                            }
                            closeOpenForms={() => {
                              closeOpenForms();
                            }}
                            updateFeildName={(val) =>
                              setResumeData((prev) => ({
                                ...prev,
                                technical_skills_feildName: val,
                              }))
                            }
                            profileId={resumeData?.resumeId}
                          />
                        )}
                        {/* soft Skills */}
                        {activeForm === "softSkills_resume" && (
                          <SoftSkillsform
                            currentSkills={resumeData?.soft_skills}
                            currentFildName={resumeData.soft_skills_feildName}
                            currentSkillId={resumeData.softSkillsId}
                            skillsOptions={softSkillsOptions}
                            isSaving={(val) => setIsSeving(val)}
                            storePreviewImage={() =>
                              captureAndUpload(resumeData.resumeId)
                            }
                            resume_sections={resumeData?.resume_sections}
                            updateResumeSection={(val) => {
                              handleResumeSectionsSubmit(
                                resumeData.resume_sections.show_awards,
                                resumeData.resume_sections.show_certificates,
                                resumeData.resume_sections.show_experience,
                                resumeData.resume_sections.show_languages,
                                resumeData.resume_sections.show_references,
                                val
                              );
                            }}
                            updateSkills={(array) =>
                              setResumeData((prev) => ({
                                ...prev,
                                soft_skills: array,
                              }))
                            }
                            closeOpenForms={() => {
                              closeOpenForms();
                            }}
                            updateFeildName={(val) =>
                              setResumeData((prev) => ({
                                ...prev,
                                soft_skills_feildName: val,
                              }))
                            }
                            prifileId={resumeData?.resumeId}
                          />
                        )}
                        {/* Certificates  */}
                        {activeForm === "certificates_resume" && (
                          <CertificatesForm
                            userCertificatesList={userCertificatesList}
                            resumeId={resumeData.resumeId}
                            reloadTheData={() => {
                              reloadTemplateData();
                              captureAndUpload(resumeData.resumeId);
                            }}
                            isSeving={(val) => setIsSeving(val)}
                            resume_sections={resumeData?.resume_sections}
                            updateResumeSection={(val) => {
                              handleResumeSectionsSubmit(
                                resumeData.resume_sections.show_awards,
                                val,
                                resumeData.resume_sections.show_experience,
                                resumeData.resume_sections.show_languages,
                                resumeData.resume_sections.show_references,
                                resumeData.resume_sections.show_soft_skills
                              );
                            }}
                          />
                        )}
                        {/* Custom Section  */}
                        {activeForm === "custom_section_resume" && (
                          <CustomSectionForm
                            customSectionList={customSectionList}
                            resumeId={resumeData.resumeId}
                            reloadTheData={() => {
                              reloadTemplateData();
                              captureAndUpload(resumeData.resumeId);
                            }}
                            isSeving={(val) => setIsSeving(val)}
                            resume_sections={resumeData?.resume_sections}
                            updateResumeSection={(val) => {
                              handleResumeSectionsSubmit(
                                resumeData.resume_sections.show_awards,
                                val,
                                resumeData.resume_sections.show_experience,
                                resumeData.resume_sections.show_languages,
                                resumeData.resume_sections.show_references,
                                resumeData.resume_sections.show_soft_skills
                              );
                            }}
                          />
                        )}
                        {/* honorsandawards_resume */}
                        {activeForm === "honorsandawards_resume" && (
                          <HonorsAndAwardsForm
                            userHonorAndAwardList={userHonorAndAwardList}
                            resumeId={resumeData.resumeId}
                            reloadTheData={() => {
                              reloadTemplateData();
                              captureAndUpload(resumeData.resumeId);
                            }}
                            isSeving={(val) => setIsSeving(val)}
                            resume_sections={resumeData?.resume_sections}
                            updateResumeSection={(val) => {
                              handleResumeSectionsSubmit(
                                val,
                                resumeData.resume_sections.show_certificates,
                                resumeData.resume_sections.show_experience,
                                resumeData.resume_sections.show_languages,
                                resumeData.resume_sections.show_references,
                                resumeData.resume_sections.show_soft_skills
                              );
                            }}
                          />
                        )}
                        {/* languages_resume */}
                        {activeForm === "languages_resume" && (
                          <LanguageForm
                            userLanguagesList={resumeData.languages}
                            languagesList={languagesList}
                            levelsList={levelsList}
                            resumeId={resumeData.resumeId}
                            reloadTheData={() => {
                              reloadTemplateData();
                              captureAndUpload(resumeData.resumeId);
                            }}
                            isSeving={(val) => setIsSeving(val)}
                            resume_sections={resumeData?.resume_sections}
                            updateResumeSection={(val) => {
                              handleResumeSectionsSubmit(
                                resumeData.resume_sections.show_awards,
                                resumeData.resume_sections.show_certificates,
                                resumeData.resume_sections.show_experience,
                                val,
                                resumeData.resume_sections.show_references,
                                resumeData.resume_sections.show_soft_skills
                              );
                            }}
                          />
                        )}
                        {/* refrances */}
                        {activeForm === "refrances_resume" && (
                          <RefrancesForm
                            jobsList={job_positions}
                            userRefrancesList={resumeData.references}
                            isSeving={(val) => setIsSeving(val)}
                            reloadTheData={() => {
                              reloadTemplateData();
                              captureAndUpload(resumeData.resumeId);
                            }}
                            resumeId={resumeData.resumeId}
                            resume_sections={resumeData?.resume_sections}
                            updateResumeSection={(val) => {
                              handleResumeSectionsSubmit(
                                resumeData.resume_sections.show_awards,
                                resumeData.resume_sections.show_certificates,
                                resumeData.resume_sections.show_experience,
                                resumeData.resume_sections.show_languages,
                                val,
                                resumeData.resume_sections.show_soft_skills
                              );
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {activeToolBarTab === 2 && (
                  <div className="pb-10">
                    {/* Templates */}
                    <div className="flex flex-row-reverse">
                      <div className="grid sm:grid-cols-2 gap-4 p-2">
                        {resumeTemplatesListing?.map((template, idx) => (
                          <div
                            key={idx}
                            className="cursor-pointer hover:bg-[rgba(0,0,0,0.2)] relative"
                            onClick={() => {
                              setActiveTemplate(template.id);
                              setPaidTemplate(template.is_paid);
                              changeFormatingResume(
                                template.id,
                                activeFont,
                                activeTheme,
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
                            <h2 className="text-[#0f4d76] text-sm sm:text-md font-Lexend py-2">
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
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {activeToolBarTab === 3 && (
                  <div className="pb-10">
                    {/* Themes */}
                    <Themes
                      activeTheme={(val) => {
                        setActiveTheme(val);
                        changeFormatingResume(
                          activeTemplate,
                          activeFont,
                          val,
                          activeFontSize
                        );
                      }}
                    />
                  </div>
                )}
                {activeToolBarTab === 4 && (
                  <div className="pb-10">
                    {/* Fonts */}
                    <Fonts
                      activeFont={(val) => {
                        setActiveFont(val);
                        changeFormatingResume(
                          activeTemplate,
                          val,
                          activeTheme,
                          activeFontSize
                        );
                      }}
                      activeFontSize={(val) => {
                        setActiveFontSize(val);

                        changeFormatingResume(
                          activeTemplate,
                          activeFont,
                          activeTheme,
                          val
                        );
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* end screen */}
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
              checked={isAllowShare === 1}
              className="p-4 text-sm mr-2 mt-[6px] border-2 border-solid border-[#0072b1] text-[#0072b1]"
              onChange={() => {
                setIsAllowShare(isAllowShare === 0 ? 1 : 0);
                updateShare(isAllowShare === 0 ? 1 : 0);
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
            Share Resume
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
