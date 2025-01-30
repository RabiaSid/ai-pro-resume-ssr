import React, { useEffect, useState, useRef } from "react";
import Footer from "./Footer";
import Templates from "./Templates";
import TemplatesCover from "../cover_letter/Templates";
import Progress from "./Progress";
import $ from "jquery";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainBanner from "../components/MainBanner";
import { RiArrowDownSLine } from "react-icons/ri";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import {
  BiEditAlt,
  BiLoaderAlt,
  BiArrowToBottom,
  BiEnvelope,
  BiDotsHorizontalRounded,
  BiX,
  BiSolidMessageRoundedError,
  BiSolidShareAlt,
  BiSolidFilePdf,
} from "react-icons/bi";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import Cookies from "js-cookie";
import jsPDF from "jspdf";
import ReactToPrint from "react-to-print";
import { useAuth } from "../services/Auth";

import swal from "sweetalert";

const Header = ({ isOpen }) => {
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  var [cover_total, set_cover_total] = useState(3);
  var [resume_total, set_resume_total] = useState(3);
  const [file2, setFile2] = useState(null);

  const [convertedText, setConvertedText] = useState("");

  const [tempId, setTempId] = useState(1);
  const [docId, setDocId] = useState(1);

  const [resume_loading, set_resume_loading] = useState(0);
  const [cover_loading, set_cover_loading] = useState(0);

  const slug = useParams().slug;

  const [file, setFile] = useState("https://www.google.com/");

  const [my_resumes, set_my_resumes] = useState([]);
  const [my_coverletters, set_my_coverletters] = useState([]);

  var username = global.getCookie("user_name");

  const [selectedOption, setSelectedOption] = useState("pdf");

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
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
          set_cover_loading(1);
        }
      })
      .catch((err) => {
        set_cover_loading(1);
        console.log(err);
      });
  }, []);

  const edit_now = (profile_id, id, name) => {
    localStorage.removeItem("createCoverLetterData");
    localStorage.removeItem("cover_template_id");
    Cookies.set("is_edit", 1, { expires: 1 }); // Expires in 1 day
    if (name === "Resume") {
      Cookies.set("doc_uuid", id, { expires: 1 }); // Expires in 1 day
      Cookies.set("profile_id", profile_id, { expires: 1 }); // Expires in 1 day
      window.location.href = global.localPath + "resume/header/" + id;
    } else {
      Cookies.set("doc_uuid", id, { expires: 1 }); // Expires in 1 day
      Cookies.set("profile_id", profile_id, { expires: 1 }); // Expires in 1 day
      window.location.href =
        global.localPath + "create-cover-letter/header/" + id;
    }
  };

  const doc_new = (name) => {
    if (name === "Resume") {
      Cookies.set("doc_uuid", "", { expires: 1 }); // Expires in 1 day
      window.location.href = global.localPath + "resume_loading";
    } else {
      Cookies.set("doc_uuid", "", { expires: 1 }); // Expires in 1 day
      //window.location.href = global.localPath + "create-cover-letter/header";
      window.location.href = global.localPath + "cover-letter-loading";
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
          // if (window.mammoth) {
          //   // Use mammoth here
          //   // For example:
          //   window.mammoth.extractRawText({ /* your options */ })
          //     .then((result) => {
          //       setConvertedText(result.value);
          //     })
          //     .catch((error) => {
          //       console.error('Error converting to Word:', error);
          //     });
          // } else {
          //   console.error('Mammoth library not loaded.');
          // }

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

  const duplicate_document = (temp_id, uuid, name, doc_name) => {
    $("#temp_id").html(temp_id);
    $("#doc_id").html(uuid);
    $("#doc_name").html(name);
    $(".name_label").html(name);
    swal({
      title: "Are you sure?",
      text: doc_name + " Duplicate this File!",
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
                  "Done! Your " + doc_name + " File Successfully Duplicated!",
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
                  "Done! Your " + doc_name + " File Successfully Duplicated!",
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
  };

  const delete_document = (temp_id, uuid, name, doc_name) => {
    $("#temp_id").html(temp_id);
    $("#doc_id").html(uuid);
    $("#doc_name").html(name);
    $(".name_label").html(name);
    swal({
      title: "Are you sure?",
      text: doc_name + " Once Delete this File You are not able to recover!",
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
                swal("Done! Your " + doc_name + " File Successfully Deleted!", {
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
                swal("Done! Your " + doc_name + " File Successfully Deleted!", {
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
        swal("Your " + doc_name + " File Not Deleted!");
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
            <Templates
              is_print={1}
              zoom={isMobile ? 30 : 50}
              my_page={"doc"}
              temp_id={template_id}
              doc_id={id}
              uuid={uuid}
              dummy={dummy}
              formatting={1}
            />
          ) : (
            <TemplatesCover
              is_print={1}
              zoom={isMobile ? 30 : 60}
              my_page={"doc"}
              temp_id={template_id}
              doc_id={id}
              uuid={uuid}
              dummy={dummy}
              formatting={1}
            />
          )}
        </div>
      );
    })
  );

  return (
    <section className="" id="maindiv">
      <MainBanner
        startText={"Organize your documents effortlessly on"}
        highlightText={"AI PRO RESUME'S"}
        endText={" document section "}
        descriptionText={``}
      />

      <div id="main_contents" className="lg:w-[100%] lg:ml-[0%]">
        <section className="flex justify-center lg:justify-between items-start lg:w-[93%] m-auto flex-wrap min-h-[700px] pt-10">
          <h1 className="font_1 text-slate-900 text-4xl mb-6">
            Your Documents
          </h1>

          <div className="flex">
            {slug === "resume" ? (
              <div
                onClick={(e) => doc_new("Resume")}
                className="bg-[#0072b1] cursor-pointer text-white hover:bg-[#00caa5] transition-all duration-150 ease-in font_1 text-lg px-8 py-2 rounded-full mx-2 mb-8"
              >
                + NEW RESUMES
              </div>
            ) : slug === "cover_letter" ? (
              <div
                onClick={(e) => doc_new("Cover Letter")}
                className="bg-[#0072b1] cursor-pointer text-white hover:bg-[#00caa5] transition-all duration-150 ease-in font_1 text-lg px-8 py-2 rounded-full mx-2 mb-8"
              >
                + NEW COVER LETTER
              </div>
            ) : (
              <>
                <div
                  onClick={(e) => doc_new("Resume")}
                  className="bg-[#0072b1] cursor-pointer text-white hover:bg-[#00caa5] transition-all duration-150 ease-in font_1 text-lg px-8 py-2 rounded-full mx-2 mb-8 "
                >
                  + NEW RESUMES
                </div>
                <div
                  onClick={(e) => doc_new("Cover Letter")}
                  className="bg-[#0072b1] cursor-pointer text-white hover:bg-[#00caa5] transition-all duration-150 ease-in font_1 text-lg px-8 py-2 rounded-full mx-2 mb-8 "
                >
                  + NEW COVER LETTER
                </div>
              </>
            )}
          </div>

          <div className="flex justify-end items-start flex-wrap mb-6 lg:mb-0 w-full">
            <div className="w-full flex justify-start items-center flex-wrap mb-10">
              {slug === "resume" ? (
                <div className="flex justify-start flex-wrap items-center w-full">
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
                      .slice(0, resume_total)
                      .map((my_resumes, index_my_resumes) => (
                        <div
                          key={index_my_resumes}
                          className="w-full md:w-[45%] lg:w-[30%] 2xl:w-[25%] flex justify-start items-center flex-wrap m-4 2xl:mx-[4%]"
                        >
                          <div className="font_3 text-white bg-[#00caa5] text-lg px-2 rounded-md">
                            Resume
                          </div>

                          <div className="dd_btn3 relative rounded-md shadow-[0px_0px_10px_0px_rgba(0,0,0,0.3)] p-2 py-2 w-full my-4  h-[500px] overflow-hidden">
                            {/* <Templates zoom={60} temp_id={my_resumes.template_id} doc_id={my_resumes.id} uuid={my_resumes.uuid} dummy={0}/> */}
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
                                  (componentRefs.current[index_my_resumes] =
                                    ref)
                                  }
                                  {...my_resumes}
                                />
                              </div>

                              <Templates
                                is_print={1}
                                zoom={isMobile ? 30 : 50}
                                my_page={"doc"}
                                temp_id={my_resumes.template_id}
                                doc_id={my_resumes.id}
                                uuid={my_resumes.uuid}
                                dummy={0}
                                formatting={1}
                              />
                            </div>
                            <div className="hidden dd_menu3 bg-[rgba(0,0,0,0.5)] absolute left-0 top-0 w-full h-full justify-evenly items-end p-2 ">
                              <div
                                onClick={(e) =>
                                  edit_now(
                                    my_resumes.id,
                                    my_resumes.uuid,
                                    "Resume"
                                  )
                                }
                                className="absolute top-[40%] shadow-lg rounded-lg py-2 cursor-pointer font_1 text-lg bg-[#0072b1] hover:bg-[#00caa5] text-white w-[25%] flex justify-center flex-wrap"
                              >
                                <BiEditAlt className="w-full p-2" size={50} />
                                Edit
                              </div>
                              {/* <div onClick={(e) => download_email(my_resumes.template_id,my_resumes.id,'Resume')} className='rounded-sm py-2 cursor-pointer font_2 text-sm bg-[#0072b1] hover:bg-[#00caa5] text-white w-[25%] flex justify-center flex-wrap'>
                          <BiArrowToBottom className='w-full' size={20}/>
                          Download
                        </div> */}
                              <ReactToPrint
                                trigger={() => (
                                  <div className="rounded-sm py-2 cursor-pointer font_2 text-sm bg-[#0072b1] hover:bg-[#00caa5] text-white w-[25%] flex justify-center flex-wrap">
                                    <BiArrowToBottom
                                      className="w-full"
                                      size={20}
                                    />
                                    Download
                                  </div>
                                )}
                                content={() =>
                                  componentRefs.current[index_my_resumes]
                                }
                              />
                              <div
                                onClick={(e) =>
                                  share_doc(my_resumes.id, "Resume")
                                }
                                className="rounded-sm py-2 cursor-pointer font_2 text-sm bg-[#0072b1] hover:bg-[#00caa5] text-white w-[25%] flex justify-center flex-wrap"
                              >
                                <BiSolidShareAlt className="w-full" size={20} />
                                Share
                              </div>
                              <div className="dd_btn2 relative rounded-sm py-2 cursor-pointer font_2 text-sm bg-[#0072b1] hover:bg-[#00caa5] text-white w-[25%] flex justify-center flex-wrap">
                                <BiDotsHorizontalRounded
                                  className="w-full"
                                  size={20}
                                />
                                More
                                <div className="hidden dd_menu2 peer-checked/draft:block absolute bg-[#0072b1] left-0 bottom-14 w-[120px] py-2 z-[8888]">
                                  {/* <div onClick={(e) => share_doc(my_resumes.template_id,my_resumes.id,'Resume')} className='py-2 px-4 text-left hover:bg-[#00caa5]'>Share</div> */}
                                  {/* <div onClick={(e) => print_doc(my_resumes.template_id,my_resumes.id,'Resume')} className='py-2 px-4 text-left hover:bg-[#00caa5]'>Print</div> */}
                                  <div
                                    onClick={(e) =>
                                      download_email(my_resumes.id, "Resume")
                                    }
                                    className="py-2 px-4 text-left hover:bg-[#00caa5]"
                                  >
                                    Email
                                  </div>
                                  <div
                                    onClick={(e) =>
                                      duplicate_document(
                                        my_resumes.template_id,
                                        my_resumes.uuid,
                                        "Resume",
                                        my_resumes.resume_name
                                      )
                                    }
                                    className="py-2 px-4 text-left hover:bg-[#00caa5]"
                                  >
                                    Duplicate
                                  </div>
                                  <div
                                    onClick={(e) =>
                                      rename_document(
                                        my_resumes.template_id,
                                        my_resumes.uuid,
                                        "Resume",
                                        my_resumes.resume_name
                                      )
                                    }
                                    className="py-2 px-4 text-left hover:bg-[#00caa5]"
                                  >
                                    Rename
                                  </div>
                                  <div
                                    onClick={(e) =>
                                      delete_document(
                                        my_resumes.template_id,
                                        my_resumes.uuid,
                                        "Resume",
                                        my_resumes.resume_name
                                      )
                                    }
                                    className="py-2 px-4 text-left hover:bg-[#00caa5]"
                                  >
                                    Delete
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="font_3 text-slate-900 text-lg w-full">
                            {my_resumes.resume_name}
                          </div>
                          <div className="font_3 text-slate-400 text-md w-full">
                            Last Updated{" "}
                            {new Date(my_resumes.updated_at).toLocaleString()}
                          </div>
                        </div>
                      ))
                  )}

                  <div className="w-full text-center py-10">
                    {my_resumes.length >= resume_total ? (
                      <>
                        <button
                          id="resume_total_load"
                          onClick={(e) => load_more(1)}
                          className="bg-[#0072b1] hover:bg-[#00caa5] text-white font_1 text-xl px-4 py-2 rounded-full"
                        >
                          Load More
                        </button>
                        <button
                          id="resume_total_loading"
                          className="bg-[#111] text-white font_1 hidden text-xl px-4 py-2 rounded-full"
                        >
                          Loading...
                        </button>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ) : slug === "cover_letter" ? (
                <div className="flex justify-start flex-wrap items-center w-full">
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
                      .slice(0, cover_total)
                      .map((my_coverletters, index_my_coverletters) => (
                        <div
                          key={index_my_coverletters}
                          className="w-full md:w-[45%] lg:w-[30%] 2xl:w-[25%] flex justify-start items-center flex-wrap m-4 2xl:mx-[4%]"
                        >
                          <div className="font_3 text-white bg-[#00caa5] text-lg px-2 rounded-md">
                            Cover Letter
                          </div>

                          <div className="dd_btn3 relative rounded-md shadow-[0px_0px_10px_0px_rgba(0,0,0,0.3)] p-2 py-2 w-full my-4 h-[500px] overflow-hidden">
                            {/* <TemplatesCover zoom={60} temp_id={my_coverletters.cover_template_id} doc_id={my_coverletters.id} uuid={my_coverletters.cover_id} dummy={0}/> */}
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
                                  (componentRefs.current[
                                    index_my_coverletters
                                  ] = ref)
                                  }
                                  {...my_coverletters}
                                />
                              </div>
                              <TemplatesCover
                                is_print={1}
                                zoom={isMobile ? 30 : 50}
                                my_page={"doc"}
                                temp_id={my_coverletters.cover_template_id}
                                doc_id={my_coverletters.id}
                                uuid={my_coverletters.cover_id}
                                dummy={0}
                                formatting={1}
                              />
                            </div>
                            <div className="hidden dd_menu3 bg-[rgba(0,0,0,0.5)] absolute left-0 top-0 w-full h-full justify-evenly items-end p-2">
                              <div
                                onClick={(e) =>
                                  edit_now(
                                    my_coverletters.id,
                                    my_coverletters.id,
                                    "Cover Letter"
                                  )
                                }
                                className="absolute top-[40%] shadow-lg rounded-lg py-2 cursor-pointer font_1 text-lg bg-[#0072b1] hover:bg-[#00caa5] text-white w-[25%] flex justify-center flex-wrap"
                              >
                                <BiEditAlt className="w-full p-2" size={50} />
                                Edit
                              </div>

                              {/* <div onClick={(e) => download_email(my_coverletters.cover_template_id,my_coverletters.id,'Cover Letter')} className='rounded-sm py-2 cursor-pointer font_2 text-sm bg-[#0072b1] hover:bg-[#00caa5] text-white w-[25%] flex justify-center flex-wrap'>
                          <BiArrowToBottom className='w-full' size={20}/>
                          Download
                        </div> */}
                              <ReactToPrint
                                trigger={() => (
                                  <div className="rounded-sm py-2 cursor-pointer font_2 text-sm bg-[#0072b1] hover:bg-[#00caa5] text-white w-[25%] flex justify-center flex-wrap">
                                    <BiArrowToBottom
                                      className="w-full"
                                      size={20}
                                    />
                                    Download
                                  </div>
                                )}
                                content={() =>
                                  componentRefs.current[index_my_coverletters]
                                }
                              />

                              <div
                                onClick={(e) =>
                                  share_doc(my_coverletters.id, "Cover Letter")
                                }
                                className="rounded-sm py-2 cursor-pointer font_2 text-sm bg-[#0072b1] hover:bg-[#00caa5] text-white w-[25%] flex justify-center flex-wrap"
                              >
                                <BiSolidShareAlt className="w-full" size={20} />
                                Share
                              </div>
                              <div className="dd_btn2 relative rounded-sm py-2 cursor-pointer font_2 text-sm bg-[#0072b1] hover:bg-[#00caa5] text-white w-[25%] flex justify-center flex-wrap">
                                <BiDotsHorizontalRounded
                                  className="w-full"
                                  size={20}
                                />
                                More
                                <div className="hidden dd_menu2 peer-checked/draft:block absolute bg-[#0072b1] left-0 bottom-14 w-[120px] py-2 z-[8888]">
                                  {/* <div onClick={(e) => share_doc(my_coverletters.cover_template_id,my_coverletters.id,'Cover Letter')} className='py-2 px-4 text-left hover:bg-[#00caa5]'>Share</div> */}
                                  {/* <div onClick={(e) => print_doc(my_coverletters.cover_template_id,my_coverletters.id,'Cover Letter')} className='py-2 px-4 text-left hover:bg-[#00caa5]'>Print</div> */}
                                  <div
                                    onClick={(e) =>
                                      download_email(
                                        my_coverletters.id,
                                        "Cover Letter"
                                      )
                                    }
                                    className="py-2 px-4 text-left hover:bg-[#00caa5]"
                                  >
                                    Email
                                  </div>
                                  <div
                                    onClick={(e) =>
                                      duplicate_document(
                                        my_coverletters.cover_template_id,
                                        my_coverletters.id,
                                        "Cover Letter",
                                        my_coverletters.name
                                      )
                                    }
                                    className="py-2 px-4 text-left hover:bg-[#00caa5]"
                                  >
                                    Duplicate
                                  </div>
                                  <div
                                    onClick={(e) =>
                                      rename_document(
                                        my_coverletters.cover_template_id,
                                        my_coverletters.id,
                                        "Cover Letter",
                                        my_coverletters.name
                                      )
                                    }
                                    className="py-2 px-4 text-left hover:bg-[#00caa5]"
                                  >
                                    Rename
                                  </div>
                                  <div
                                    onClick={(e) =>
                                      delete_document(
                                        my_coverletters.cover_template_id,
                                        my_coverletters.id,
                                        "Cover Letter",
                                        my_coverletters.name
                                      )
                                    }
                                    className="py-2 px-4 text-left hover:bg-[#00caa5]"
                                  >
                                    Delete
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="font_3 text-slate-900 text-lg w-full">
                            {my_coverletters.name}
                          </div>
                          <div className="font_3 text-slate-400 text-md w-full">
                            Last Updated{" "}
                            {new Date(
                              my_coverletters.updated_at
                            ).toLocaleString()}
                          </div>
                        </div>
                      ))
                  )}
                  <div className="w-full text-center py-10">
                    {my_coverletters.length >= cover_total ? (
                      <>
                        <button
                          id="cover_total_load"
                          onClick={(e) => load_more(2)}
                          className="bg-[#0072b1] hover:bg-[#00caa5] text-white font_1 text-xl px-4 py-2 rounded-full"
                        >
                          Load More
                        </button>
                        <button
                          id="cover_total_loading"
                          className="bg-[#111] text-white font_1 hidden text-xl px-4 py-2 rounded-full"
                        >
                          Loading...
                        </button>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-start flex-wrap items-center w-full">
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
                        .slice(0, resume_total)
                        .map((my_resumes, index_my_resumes) => (
                          <div
                            key={index_my_resumes}
                            className="w-full md:w-[45%] lg:w-[30%] 2xl:w-[25%] flex justify-start items-center flex-wrap m-4 2xl:mx-[4%]"
                          >
                            <div className="font_3 text-white bg-[#00caa5] text-lg px-2 rounded-md">
                              Resume
                            </div>

                            <div className="dd_btn3 relative rounded-md shadow-[0px_0px_10px_0px_rgba(0,0,0,0.3)] p-2 py-2 w-full my-4 h-[500px] overflow-hidden">
                              {/* <Templates zoom={60} temp_id={my_resumes.template_id} doc_id={my_resumes.id} uuid={my_resumes.uuid} dummy={0}/> */}
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
                                    (componentRefs.current[index_my_resumes] =
                                      ref)
                                    }
                                    {...my_resumes}
                                  />
                                </div>

                                <Templates
                                  is_print={1}
                                  zoom={isMobile ? 30 : 50}
                                  my_page={"doc"}
                                  temp_id={my_resumes.template_id}
                                  doc_id={my_resumes.id}
                                  uuid={my_resumes.uuid}
                                  dummy={0}
                                  formatting={1}
                                />
                              </div>
                              <div className="hidden dd_menu3 bg-[rgba(0,0,0,0.5)] absolute left-0 top-0 w-full h-full justify-evenly items-end p-2 ">
                                <div
                                  onClick={(e) =>
                                    edit_now(
                                      my_resumes.id,
                                      my_resumes.uuid,
                                      "Resume"
                                    )
                                  }
                                  className="absolute top-[40%] shadow-lg rounded-lg py-2 cursor-pointer font_1 text-lg bg-[#0072b1] hover:bg-[#00caa5] text-white w-[25%] flex justify-center flex-wrap"
                                >
                                  <BiEditAlt className="w-full p-2" size={50} />
                                  Edit
                                </div>
                                {/* <div onClick={(e) => download_email(my_resumes.template_id,my_resumes.id,'Resume')} className='rounded-sm py-2 cursor-pointer font_2 text-sm bg-[#0072b1] hover:bg-[#00caa5] text-white w-[25%] flex justify-center flex-wrap'>
                          <BiArrowToBottom className='w-full' size={20}/>
                          Download
                        </div> */}
                                <ReactToPrint
                                  trigger={() => (
                                    <div className="rounded-sm py-2 cursor-pointer font_2 text-sm bg-[#0072b1] hover:bg-[#00caa5] text-white w-[25%] flex justify-center flex-wrap">
                                      <BiArrowToBottom
                                        className="w-full"
                                        size={20}
                                      />
                                      Download
                                    </div>
                                  )}
                                  content={() =>
                                    componentRefs.current[index_my_resumes]
                                  }
                                />
                                <div
                                  onClick={(e) =>
                                    share_doc(my_resumes.id, "Resume")
                                  }
                                  className="rounded-sm py-2 cursor-pointer font_2 text-sm bg-[#0072b1] hover:bg-[#00caa5] text-white w-[25%] flex justify-center flex-wrap"
                                >
                                  <BiSolidShareAlt
                                    className="w-full"
                                    size={20}
                                  />
                                  Share
                                </div>
                                <div className="dd_btn2 relative rounded-sm py-2 cursor-pointer font_2 text-sm bg-[#0072b1] hover:bg-[#00caa5] text-white w-[25%] flex justify-center flex-wrap">
                                  <BiDotsHorizontalRounded
                                    className="w-full"
                                    size={20}
                                  />
                                  More
                                  <div className="hidden dd_menu2 peer-checked/draft:block absolute bg-[#0072b1] left-0 bottom-14 w-[120px] py-2 z-[8888]">
                                    {/* <div onClick={(e) => share_doc(my_resumes.template_id,my_resumes.id,'Resume')} className='py-2 px-4 text-left hover:bg-[#00caa5]'>Share</div> */}
                                    {/* <div onClick={(e) => print_doc(my_resumes.template_id,my_resumes.id,'Resume')} className='py-2 px-4 text-left hover:bg-[#00caa5]'>Print</div> */}
                                    <div
                                      onClick={(e) =>
                                        download_email(my_resumes.id, "Resume")
                                      }
                                      className="py-2 px-4 text-left hover:bg-[#00caa5]"
                                    >
                                      Email
                                    </div>
                                    <div
                                      onClick={(e) =>
                                        duplicate_document(
                                          my_resumes.template_id,
                                          my_resumes.uuid,
                                          "Resume",
                                          my_resumes.resume_name
                                        )
                                      }
                                      className="py-2 px-4 text-left hover:bg-[#00caa5]"
                                    >
                                      Duplicate
                                    </div>
                                    <div
                                      onClick={(e) =>
                                        rename_document(
                                          my_resumes.template_id,
                                          my_resumes.uuid,
                                          "Resume",
                                          my_resumes.resume_name
                                        )
                                      }
                                      className="py-2 px-4 text-left hover:bg-[#00caa5]"
                                    >
                                      Rename
                                    </div>
                                    <div
                                      onClick={(e) =>
                                        delete_document(
                                          my_resumes.template_id,
                                          my_resumes.uuid,
                                          "Resume",
                                          my_resumes.resume_name
                                        )
                                      }
                                      className="py-2 px-4 text-left hover:bg-[#00caa5]"
                                    >
                                      Delete
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="font_3 text-slate-900 text-lg w-full">
                              {my_resumes.resume_name}
                            </div>
                            <div className="font_3 text-slate-400 text-md w-full">
                              Last Updated{" "}
                              {new Date(my_resumes.updated_at).toLocaleString()}
                            </div>
                          </div>
                        ))
                    )}
                    <div className="w-full text-center py-10">
                      {my_resumes.length >= resume_total ? (
                        <>
                          <button
                            id="resume_total_load"
                            onClick={(e) => load_more(1)}
                            className="bg-[#0072b1] hover:bg-[#00caa5] text-white font_1 text-xl px-4 py-2 rounded-full"
                          >
                            Load More
                          </button>
                          <button
                            id="resume_total_loading"
                            className="bg-[#111] text-white font_1 hidden text-xl px-4 py-2 rounded-full"
                          >
                            Loading...
                          </button>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="flex justify-start flex-wrap items-center w-full">
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
                        .slice(0, cover_total)
                        .map((my_coverletters, index_my_coverletters) => (
                          <div
                            key={index_my_coverletters}
                            className="w-full md:w-[45%] lg:w-[30%] 2xl:w-[25%] flex justify-start items-center flex-wrap m-4 2xl:mx-[4%]"
                          >
                            <div className="font_3 text-white bg-[#00caa5] text-lg px-2 rounded-md">
                              Cover Letter
                            </div>

                            <div className="dd_btn3 relative rounded-md shadow-[0px_0px_10px_0px_rgba(0,0,0,0.3)] p-2 py-2 w-full my-4 h-[500px] overflow-hidden">
                              {/* <TemplatesCover zoom={60} temp_id={my_coverletters.cover_template_id} doc_id={my_coverletters.id} uuid={my_coverletters.cover_id} dummy={0}/> */}
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
                                <TemplatesCover
                                  is_print={1}
                                  zoom={isMobile ? 30 : 50}
                                  my_page={"doc"}
                                  temp_id={my_coverletters.cover_template_id}
                                  doc_id={my_coverletters.id}
                                  uuid={my_coverletters.cover_id}
                                  dummy={0}
                                  formatting={1}
                                />
                              </div>
                              <div className="hidden dd_menu3 bg-[rgba(0,0,0,0.5)] absolute left-0 top-0 w-full h-full justify-evenly items-end p-2">
                                <div
                                  onClick={(e) =>
                                    edit_now(
                                      my_coverletters.id,
                                      my_coverletters.id,
                                      "Cover Letter"
                                    )
                                  }
                                  className="absolute top-[40%] shadow-lg rounded-lg py-2 cursor-pointer font_1 text-lg bg-[#0072b1] hover:bg-[#00caa5] text-white w-[25%] flex justify-center flex-wrap"
                                >
                                  <BiEditAlt className="w-full p-2" size={50} />
                                  Edit
                                </div>

                                {/* <div onClick={(e) => download_email(my_coverletters.cover_template_id,my_coverletters.id,'Cover Letter')} className='rounded-sm py-2 cursor-pointer font_2 text-sm bg-[#0072b1] hover:bg-[#00caa5] text-white w-[25%] flex justify-center flex-wrap'>
                          <BiArrowToBottom className='w-full' size={20}/>
                          Download
                        </div> */}
                                <ReactToPrint
                                  trigger={() => (
                                    <div className="rounded-sm py-2 cursor-pointer font_2 text-sm bg-[#0072b1] hover:bg-[#00caa5] text-white w-[25%] flex justify-center flex-wrap">
                                      <BiArrowToBottom
                                        className="w-full"
                                        size={20}
                                      />
                                      Download
                                    </div>
                                  )}
                                  content={() =>
                                    componentRefss.current[
                                    index_my_coverletters
                                    ]
                                  }
                                />

                                <div
                                  onClick={(e) =>
                                    share_doc(
                                      my_coverletters.id,
                                      "Cover Letter"
                                    )
                                  }
                                  className="rounded-sm py-2 cursor-pointer font_2 text-sm bg-[#0072b1] hover:bg-[#00caa5] text-white w-[25%] flex justify-center flex-wrap"
                                >
                                  <BiSolidShareAlt
                                    className="w-full"
                                    size={20}
                                  />
                                  Share
                                </div>
                                <div className="dd_btn2 relative rounded-sm py-2 cursor-pointer font_2 text-sm bg-[#0072b1] hover:bg-[#00caa5] text-white w-[25%] flex justify-center flex-wrap">
                                  <BiDotsHorizontalRounded
                                    className="w-full"
                                    size={20}
                                  />
                                  More
                                  <div className="hidden dd_menu2 peer-checked/draft:block absolute bg-[#0072b1] left-0 bottom-14 w-[120px] py-2 z-[8888]">
                                    {/* <div onClick={(e) => share_doc(my_coverletters.cover_template_id,my_coverletters.id,'Cover Letter')} className='py-2 px-4 text-left hover:bg-[#00caa5]'>Share</div> */}
                                    {/* <div onClick={(e) => print_doc(my_coverletters.cover_template_id,my_coverletters.id,'Cover Letter')} className='py-2 px-4 text-left hover:bg-[#00caa5]'>Print</div> */}
                                    <div
                                      onClick={(e) =>
                                        download_email(
                                          my_coverletters.id,
                                          "Cover Letter"
                                        )
                                      }
                                      className="py-2 px-4 text-left hover:bg-[#00caa5]"
                                    >
                                      Email
                                    </div>
                                    <div
                                      onClick={(e) =>
                                        duplicate_document(
                                          my_coverletters.cover_template_id,
                                          my_coverletters.id,
                                          "Cover Letter",
                                          my_coverletters.name
                                        )
                                      }
                                      className="py-2 px-4 text-left hover:bg-[#00caa5]"
                                    >
                                      Duplicate
                                    </div>
                                    <div
                                      onClick={(e) =>
                                        rename_document(
                                          my_coverletters.cover_template_id,
                                          my_coverletters.id,
                                          "Cover Letter",
                                          my_coverletters.name
                                        )
                                      }
                                      className="py-2 px-4 text-left hover:bg-[#00caa5]"
                                    >
                                      Rename
                                    </div>
                                    <div
                                      onClick={(e) =>
                                        delete_document(
                                          my_coverletters.cover_template_id,
                                          my_coverletters.id,
                                          "Cover Letter",
                                          my_coverletters.name
                                        )
                                      }
                                      className="py-2 px-4 text-left hover:bg-[#00caa5]"
                                    >
                                      Delete
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="font_3 text-slate-900 text-lg w-full">
                              {my_coverletters.name}
                            </div>
                            <div className="font_3 text-slate-400 text-md w-full">
                              Last Updated{" "}
                              {new Date(
                                my_coverletters.updated_at
                              ).toLocaleString()}
                            </div>
                          </div>
                        ))
                    )}
                    <div className="w-full text-center py-10">
                      {my_coverletters.length >= cover_total ? (
                        <>
                          <button
                            id="cover_total_load"
                            onClick={(e) => load_more(2)}
                            className="bg-[#0072b1] hover:bg-[#00caa5] text-white font_1 text-xl px-4 py-2 rounded-full"
                          >
                            Load More
                          </button>
                          <button
                            id="cover_total_loading"
                            className="bg-[#111] text-white font_1 hidden text-xl px-4 py-2 rounded-full"
                          >
                            Loading...
                          </button>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </>
              )}

              <div className="hidden" id="temp_id">
                000
              </div>
              <div className="hidden" id="doc_id">
                000
              </div>
              <div className="hidden" id="doc_name">
                000
              </div>

              {/* DOWNLOAD AND EMAIL MODEL BOX */}
              <div
                id="download_email_modelbox"
                className="hidden fixed bg-[rgba(10,10,10,0.7)] w-full h-full top-0 left-0 z-[1000]"
              >
                <div className="shadow-2xl relative bg-[rgba(255,255,255,0.9)] w-[95%] lg:w-[70%] xl:w-[50%] p-10 m-auto mt-[10%] border-x-8 border-[#00caa5] rounded-[30px]">
                  <BiX
                    onClick={() => download_email_close()}
                    className="absolute right-10 hover:text-red-500 hover:rotate-90 transition-all duration-300 cursor-pointer"
                    size={40}
                  />
                  <h1 className="font_1 text-slate-900 text-3xl w-full mt-10 lg:mt-2">
                    Download/Email <span className="name_label">Resume</span>
                  </h1>

                  <h2 className="font_3 text-slate-900 text-xl mt-8">
                    <span className="name_label"></span> Name
                  </h2>
                  <input
                    type="text"
                    className="shadow-sm font_2 text-slate-900 mt-2 text-xl border-2 border-slate-300 rounded-md focus:border-[#00caa5] focus-visible:border-[#00caa5] p-2"
                    onKeyDown={check_input}
                    id="name_txt"
                  />
                  <div className="font_3 text-slate-900 text-sm flex justify-start items-center mt-2">
                    <BiSolidMessageRoundedError
                      className="text-[#0072b1] mr-1"
                      size={25}
                    />{" "}
                    DON'T USE ONLY NUMBERS AND SPACING WHEN NAMING YOUR FILE
                  </div>

                  <h2 className="font_3 text-slate-900 text-xl mt-10">
                    Choose Your Document Format
                  </h2>

                  <div className="flex flex-wrap justify-start items-center mt-4">
                    <label className="inline-flex items-center font_2 text-slate-900 text-sm mr-6 mt-2">
                      <input
                        type="radio"
                        className="form-radio text-[#00caa5] h-4 w-4"
                        value="pdf"
                        checked={selectedOption === "pdf"}
                        onChange={handleRadioChange}
                      />
                      <span className="ml-2">Adobe PDF (.pdf)</span>
                    </label>

                    {/* <label className="inline-flex items-center font_2 text-slate-900 text-sm mr-6 mt-2">
                        <input
                          type="radio"
                          className="form-radio text-[#00caa5] h-4 w-4"
                          value="doc"
                          checked={selectedOption === 'doc'}
                          onChange={handleRadioChange}
                        />
                        <span className="ml-2">Microsoft Word (.docx)</span>
                      </label> */}
                  </div>

                  <div className="mt-10 flex justify-between items-center flex-wrap">
                    <button
                      onClick={() => download_email_close()}
                      className="mb-4 shadow-lg font_3 text-md px-4 py-2 w-full lg:w-[150px] text-center bg-slate-200 text-slate-900 border border-slate-900 hover:bg-slate-900 hover:text-white rounded-md"
                    >
                      CANCEL
                    </button>
                    <button
                      onClick={() => download_document()}
                      className="mb-4 shadow-lg font_3 text-md px-4 py-2 w-full lg:w-[150px] text-center bg-[#0072b1] text-white rounded-md hover:bg-[#00caa5] hover:text-white"
                    >
                      DOWNLOAD
                    </button>

                    <button
                      onClick={() => email_document()}
                      id="loader_get"
                      className="mb-4 shadow-lg font_3 text-md px-4 py-2 w-full lg:w-[150px] text-center bg-[#0072b1] text-white rounded-md hover:bg-[#00caa5] hover:text-white"
                    >
                      EMAIL
                    </button>
                    <button
                      id="loader"
                      style={{ display: "none" }}
                      className="mb-4 shadow-lg font_3 text-md px-4 py-2 w-full lg:w-[150px] text-center bg-[#0072b1] text-white rounded-md hover:bg-[#00caa5] hover:text-white flex items-center"
                      type="button"
                    >
                      <BiLoaderAlt className="mr-2 animate-spin " />{" "}
                      Processing...
                    </button>
                  </div>
                </div>
              </div>

              {/* PRINT DOCUMENT MODEL BOX */}

              <div
                id="print_doc_modelbox"
                className="hidden fixed bg-[rgba(10,10,10,0.7)] w-full h-full top-0 left-0 z-[1000]"
              >
                <div className="shadow-2xl relative bg-[rgba(255,255,255,0.9)] w-[95%] lg:w-[70%] xl:w-[60%] p-10 m-auto mt-[5%] border-x-8 border-[#00caa5] rounded-[30px]">
                  <BiX
                    onClick={() => print_doc_close()}
                    className="absolute right-10 hover:text-red-500 hover:rotate-90 transition-all duration-300 cursor-pointer"
                    size={40}
                  />
                  <h1 className="font_1 text-slate-900 text-3xl w-full mt-10 lg:mt-2">
                    Print Preview <span className="name_label">Resume</span>
                  </h1>

                  <div className="flex flex-wrap justify-start items-start mt-4">
                    <div className="w-[65%] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.3)] p-2">
                      <Templates
                        zoom={60}
                        my_page={"doc"}
                        temp_id={tempId}
                        doc_id={docId}
                        dummy={0}
                      />
                    </div>

                    <div className="w-[35%] px-4">
                      <h1 className="font_1 text-slate-900 text-2xl w-full">
                        Tips
                      </h1>
                      <ul className="font_2 text-slate-900 text-md mt-2 pl-6">
                        <li className="w-full mt-4 list-disc">
                          Keep your resume to 1-2 pages, if possible.
                        </li>
                        <li className="w-full mt-4 list-disc">
                          To adjust spacing, fonts and margins use the
                          formatting tools on the Edit page.
                        </li>
                      </ul>
                      <div className="mt-60 flex justify-evenly items-end">
                        <button
                          onClick={() => print_doc_close()}
                          className="mb-4 shadow-lg font_3 text-md px-4 py-2 w-full lg:w-[150px] text-center bg-slate-200 text-slate-900 border border-slate-900 hover:bg-slate-900 hover:text-white rounded-md"
                        >
                          CANCEL
                        </button>

                        <button
                          onClick={() => print_document()}
                          id="loader_get"
                          className="mb-4 shadow-lg font_3 text-md px-4 py-2 w-full lg:w-[150px] text-center border border-slate-900 bg-[#0072b1] text-white rounded-md hover:bg-[#00caa5] hover:text-white"
                        >
                          PRINT
                        </button>
                        <button
                          id="loader"
                          style={{ display: "none" }}
                          className="mb-4 shadow-lg font_3 text-md px-4 py-2 w-full lg:w-[150px] text-center bg-[#0072b1] border border-slate-900 text-white rounded-md hover:bg-[#00caa5] hover:text-white flex items-center"
                          type="button"
                        >
                          <BiLoaderAlt className="mr-2 animate-spin " />{" "}
                          Processing...
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SHARE DOCUMENT MODEL BOX */}

              <div
                id="share_doc_modelbox"
                className="hidden fixed bg-[rgba(10,10,10,0.7)] w-full h-full top-0 left-0 z-[1000]"
              >
                <div className="shadow-2xl relative bg-[rgba(255,255,255,0.9)] w-[95%] lg:w-[70%] xl:w-[40%] p-10 m-auto mt-[50%] lg:mt-[10%] border-x-8 border-[#00caa5] rounded-[30px]">
                  <BiX
                    onClick={() => share_doc_close()}
                    className="absolute right-10 hover:text-red-500 hover:rotate-90 transition-all duration-300 cursor-pointer"
                    size={40}
                  />
                  <h1 className="font_1 text-slate-900 text-3xl w-full mt-10 lg:mt-2">
                    Share <span className="name_label">Resume</span>
                  </h1>

                  <div className="flex flex-wrap justify-center items-start mt-10">
                    {/* Facebook Share Button */}
                    <FacebookShareButton url={file} quote={"Check Link"}>
                      <FacebookIcon size={60} className="mx-2" />
                    </FacebookShareButton>

                    {/* Whatsapp Share Button */}
                    <WhatsappShareButton url={file} title={"Check Link"}>
                      <WhatsappIcon size={60} className="mx-2" />
                    </WhatsappShareButton>

                    {/* LinkedIn Share Button */}
                    <LinkedinShareButton url={file} title={"Check Link"}>
                      <LinkedinIcon size={60} className="mx-2" />
                    </LinkedinShareButton>
                  </div>
                </div>
              </div>

              <div
                id="share_doc_modelbox_file"
                className="fixed hidden bg-[rgba(10,10,10,0.7)] w-full h-full top-0 left-0 z-[1000]"
              >
                <div className="shadow-2xl relative bg-[rgba(255,255,255,0.9)] w-[95%] lg:w-[60%] xl:w-[30%] p-10 m-auto mt-[30%] lg:mt-[10%] border-x-8 border-[#00caa5] rounded-[30px]">
                  <BiX
                    onClick={() => share_doc2_close()}
                    className="absolute right-10 hover:text-red-500 hover:rotate-90 transition-all duration-300 cursor-pointer"
                    size={40}
                  />
                  <h1 className="font_1 text-slate-900 text-3xl w-full mt-10 lg:mt-2">
                    Share <span className="name_label">Resume</span>
                  </h1>
                  <label
                    htmlFor="fileInput"
                    className="flex flex-wrap items-start justify-start my-12 "
                  >
                    <span className="flex justify-center items-center">
                      <BiSolidFilePdf size={50} />{" "}
                      <span className="font_1 text-md lg:text-xl ml-4">
                        Upload Your Resume (.PDF)
                      </span>
                    </span>
                    <input
                      id="fileInput"
                      className="hidden"
                      type="file"
                      name="file"
                      onChange={(e) => setFile2(e.target.files[0])}
                    />
                  </label>

                  <button
                    onClick={() => share_doc2()}
                    className="mb-4 shadow-lg font_3 text-md px-4 py-2 w-full lg:w-[150px] m-auto text-center border border-slate-900 bg-[#0072b1] text-white rounded-md hover:bg-[#00caa5] hover:text-white"
                  >
                    SUBMIT
                  </button>
                </div>
              </div>

              <div
                id="email_modelbox_load"
                className="fixed hidden bg-[rgba(10,10,10,0.7)] w-full h-full top-0 left-0 z-[1000]"
              >
                <div className="shadow-2xl relative bg-[rgba(255,255,255,0.9)] w-[95%] lg:w-[60%] xl:w-[30%] p-10 m-auto mt-[50%] lg:mt-[10%] border-x-8 border-[#00caa5] rounded-[30px]">
                  <h1 className="font_1 text-slate-900 text-3xl w-full mt-10 lg:mt-2 text-center">
                    Email Sending <span className="name_label2"></span>
                  </h1>
                  <div className="w-full text-center mt-10">
                    <BiLoaderAlt
                      size={100}
                      className="mr-2 animate-spin m-auto w-full text-[#0072b1]"
                    />
                  </div>
                  <div className="font_1 text-[#0072b1] text-2xl w-full mt-10 lg:mt-2 text-center">
                    Please Wait...
                  </div>
                </div>
              </div>

              <div
                id="share_doc_modelbox_load"
                className="fixed hidden bg-[rgba(10,10,10,0.7)] w-full h-full top-0 left-0 z-[1000]"
              >
                <div className="shadow-2xl relative bg-[rgba(255,255,255,0.9)] w-[95%] lg:w-[60%] xl:w-[30%] p-10 m-auto mt-[30%] lg:mt-[10%] border-x-8 border-[#00caa5] rounded-[30px]">
                  <h1 className="font_1 text-slate-900 text-3xl w-full mt-10 lg:mt-2">
                    Share <span className="name_label"></span>
                  </h1>
                  <div className="w-full text-center mt-10">
                    <BiLoaderAlt
                      size={100}
                      className="mr-2 animate-spin m-auto w-full text-[#0072b1]"
                    />
                  </div>
                  <div className="font_1 text-[#0072b1] text-2xl w-full mt-10 lg:mt-2 text-center">
                    Loading Please Wait...
                  </div>
                </div>
              </div>

              <div
                id="share_doc_modelbox"
                className="hidden fixed bg-[rgba(10,10,10,0.7)] w-full h-full top-0 left-0 z-[1000]"
              >
                <div className="shadow-2xl relative bg-[rgba(255,255,255,0.9)] w-[95%] lg:w-[70%] xl:w-[40%] p-10 m-auto mt-[30%] lg:mt-[10%] border-x-8 border-[#00caa5] rounded-[30px]">
                  <BiX
                    onClick={() => share_doc_close()}
                    className="absolute right-10 hover:text-red-500 hover:rotate-90 transition-all duration-300 cursor-pointer"
                    size={40}
                  />
                  <h1 className="font_1 text-slate-900 text-3xl w-full mt-10 lg:mt-2">
                    Share <span className="name_label"></span>
                  </h1>

                  <div className="flex flex-wrap justify-center items-start mt-10">
                    {/* Facebook Share Button */}
                    <FacebookShareButton url={file} quote={"Check Link"}>
                      <FacebookIcon size={60} className="mx-2" />
                    </FacebookShareButton>

                    {/* Whatsapp Share Button */}
                    <WhatsappShareButton url={file} title={"Check Link"}>
                      <WhatsappIcon size={60} className="mx-2" />
                    </WhatsappShareButton>

                    {/* LinkedIn Share Button */}
                    <LinkedinShareButton url={file} title={"Check Link"}>
                      <LinkedinIcon size={60} className="mx-2" />
                    </LinkedinShareButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </section>
  );
};

export default Header;
