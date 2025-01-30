import React, { useEffect, useState, useRef, Suspense } from "react";
import Logo from "../assets/images/logo_resume.webp";
import { RxHamburgerMenu } from "react-icons/rx";
import $ from "jquery";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import swal from "sweetalert";
import { useAuth } from "../services/Auth";
import ActiveTemplate from "./ActiveTemplate";
import premium from "../assets/images/premium.webp";
import { FaLock } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
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
  Modal,
  createFilterOptions,
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
import GenerateCoverLetter from "./cover-letters-modal/GenerateCoverLetter";
import { IoSparklesSharp } from "react-icons/io5";
import brand from "../assets/images/brand.webp";
import SunEditor from "suneditor-react";
import AiModal from "../components/shared-components/ai_modal/AiModal";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import loader from '../assets/images/triangleLoaderNoBg.gif'


const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedTemplateId = location.state.selectedTemplateId;
  const editAbleCoverId = location.state.editAbleCoverId;
  const showCoverLetterModals = location.state.showCoverLetterModal;

  const [refreshCoverLetterPage, setRefreshCoverLetterPage] = useState(null);
  const [jobPositionsList, setJobPositionsList] = useState([]);
  const [openCoverLetterModal, setOpenCoverLetterModal] = useState(false);

  const [coverLetterTries, setCoverLetterTries] = useState();
  const [loadingDoc, setLoadingDoc] = useState(false);

  // if it's Example trying
  const isExample = location.state.isExample;
  const exampleId = location.state.exampleId;

  const [file2, setFile2] = useState(null);
  const [file, setFile] = useState("");

  const [email_share, set_email_share] = useState("");

  const [checbox_share, set_checbox_share] = useState(false);
  const [check_download_tour, set_check_download_tour] = useState(false);

  const [my_resumes, set_my_resumes] = useState([]);
  const doc_uuid = global.getCookie("doc_uuid");
  const profile_id = Cookies.get("profile_id");

  const [copyText, setCopyText] = useState("");
  const [isPrinting, setIsPrinting] = useState(false);

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
  const filterOptions = createFilterOptions({
    matchFrom: "start",
  });

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

  const duplicate_delete_document = (e, temp_id, uuid, name, doc_name) => {
    if (e === "duplicate") {
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
          text:
            "Are you sure you want to duplicate the " +
            coverData.name +
            " File?",
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
                    " file has been successfully Duplicated!",
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
      }
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
          swal(
            "Unfortunately, Your " + coverData.name + " file was not deleted."
          );
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
      })
      .catch((err) => console.log(err));

    ApiService.getAllJobPositions(user?.token)
      .then((res) => {
        setJobPositions(res?.data?.data);
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
    if (coverTemplatesListing.length > 0) {
      const selectedTem = coverTemplatesListing?.find(
        (temp) => temp.id === selectedTemplateId
      );
      if (selectedTem) {
        setPaidTemplate(selectedTem.is_paid);
      }
    }
  }, [coverTemplatesListing]);

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
          console.log("sdfsdfres.data.dataasdas");
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
            setPaidTemplate(res.data.data.template.is_paid);
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
            }));

            // set Values
            setValue("update_id", id);
            setValue("first_name", first_name);
            setValue("last_name", last_name);
            setValue("contact_person_name", contact_person_name);
            setValue("contact_person_designation", contact_person_designation);
            setValue("contact_person_email", contact_person_email);
            setValue("contact_person_phone", contact_person_phone);
            setValue("company_name", company_name);
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
            setPaidTemplate(res.data.data.template.is_paid);
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
              company_name,
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
              country_name: country?.name,
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
            setValue("company_name", company_name);
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
              contact_person_email: contact_person_email,
              contact_person_designation: contact_person_designation,
              contact_person_name: "",
              contact_person_phone: "",
              company_address: "",
              phone_number: phone_number,
              street_address: street_address,
              company_name: "",
              zip_code: zip_code,
              experience: experience,
              job_title: job_positions[0].name,
              employeer_name: employeer_name,
              opener_detail: opener_detail,
              closer_detail: closer_detail,
              show_personal_information: 1,
            };

            ApiService.coverLetterDataStore(
              user?.token,
              createCoverData,
              cover_template_id
            )
              .then((res) => {
                console.log("res.data.dataaaaaaaa");
                console.log(res.data.data);
                Cookies.set("newExampleCoverId", res.data.data.id);
                setActiveTemplate(cover_template_id);
                setPaidTemplate(res.data.data.template.is_paid);
                setCoverData((prev) => ({ ...prev, id: res.data.data.id }));
              })
              .catch((err) => {
                console.log(err);
              });

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
              company_name,
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
            setValue("company_name", company_name);
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
  }, [openCoverLetterModal]);

  const [coverIsUpdating, setCoverIsUpdating] = useState(false);
  const [coverHasSaved, setCoverHasSaved] = useState(false);

  const coverSubmit = (data) => {
    setCoverIsUpdating(true);
    if (data.update_id) {
      ApiService.coverLetterDataUpdate(
        user?.token,
        data,
        coverData.cover_template_id,
        data.update_id
      )
        .then((res) => {
          captureAndUpload(data.update_id);
          setCoverHasSaved(true);
          toast.success(
            "Congratulations! your Cover Letter has been generated successfully!"
          );
          setActiveToolBarTab(0);
          setTimeout(() => {
            setCoverIsUpdating(false);
            setCoverHasSaved(false);
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          toast.error(
            "Something went wrong in creating cover letter, Please try again."
          );
          setCoverIsUpdating(false);
        });
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
    ApiService.handleCoverFormating(user?.token, data, coverData.id)
      .then((res) => {
        captureAndUpload(coverData.id);
      })
      .catch((err) => console.log(err));
  };

  const coverRef = useRef(null);

  const downloadPDF = async () => {
    let ownedTemp = 0;
    setLoadingDoc(true);

    if (user3?.purchased_cover_templates?.length) {
      user3?.purchased_cover_templates
        ?.filter((temp) => temp.pivot.template_id == activeTemplate)
        .map((temp, id) => (ownedTemp = 1));
    }
    console.log("ownedTemp: ", ownedTemp);
    console.log("activetemplate " + activeTemplate);
    console.log("paidTemplate: ", paidTemplate);
    if (ownedTemp == 1) {
      downloadTHISPDF();
    } else {
      console.log("paidTemplate: ", paidTemplate);
      if (paidTemplate) {
        if (user3.max_cover_templates <= user3.current_cover_usage) {

          swal({
            title: "Sorry!",
            text: "Please upgrade your plan",
            icon: "error",
            buttons: {
              cancel: "Cancel",
              confirm: {
                text: "OK",
                value: "ok",
              },
            },
          }).then((value) => {
            if (value === "ok") {
              navigate("/packages");
            }
          });
        }
        else {
          const headers = {
            Authorization: "Bearer " + user?.token,
          };
          axios
            .get(
              global.baseurl +
              "/increase-cover-usage/" +
              user?.id +
              `/${activeTemplate}`,
              {
                headers,
              }
            )
            .then((data) => {
              if (data) {
                downloadTHISPDF();
                axios
                  .get(global.baseurl + "/user_details", { headers })
                  .then((data) => {
                    if (data) {
                      setUser(data.data);
                      console.log("datauser ajj");
                      console.log(data);
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
        }
      } else if (paidTemplate === 0) {
        downloadTHISPDF();
      }
    }
  };

  // const downloadPDF = async () => {
  //   const isTemplatePurchased = userPurchasedTemplates.some(
  //     (purchasedTemplate) => purchasedTemplate.id === activeTemplate
  //   );

  //   console.log(paidTemplate);
  //   if (window.innerWidth >= 768) {
  //     if (!check_download_tour) {
  //       // Start the download tour only once
  //       const driverObj2 = driver({
  //         showProgress: true,
  //         onDeselected: customFunction,
  //         steps: [
  //           {
  //             element: "#downloadpdf",
  //             popover: {
  //               title:
  //                 "<h3 style='font-size: 20px;'>Download your cover letter</h3>",
  //               description: `<div style='font-size: 18px;'>Save your cover letter as a PDF. Make sure any custom scale settings are set to default before saving. You can also print your cover letter directly by clicking the print option to get a hard copy.</div>
  //                 <img src=${Capture6} alt="Page Header" style="width: 100%" />`,
  //             },
  //           },
  //         ],
  //       });
  //       driverObj2.drive();
  //       set_check_download_tour(true);
  //     } else if (
  //       paidTemplate === 1 &&
  //       !isTemplatePurchased &&
  //       user3.max_cover_templates <= user3.current_cover_usage
  //     ) {
  //       // Show upgrade message and redirect to packages on OK click
  //       swal({
  //         title: "Sorry!",
  //         text: "Please upgrade your plan",
  //         icon: "error",
  //         buttons: {
  //           cancel: "Cancel",
  //           confirm: {
  //             text: "OK",
  //             value: "ok",
  //           },
  //         },
  //       }).then((value) => {
  //         if (value === "ok") {
  //           navigate("/packages");
  //         }
  //       });
  //     } else {
  //       // Proceed to increase usage and download if limits allow
  //       const headers = { Authorization: "Bearer " + user?.token };
  //       try {
  //         await axios.get(
  //           `${global.baseurl}/increase-cover-usage/${user?.id}/${selectedTemplateId}`,
  //           { headers }
  //         );
  //         const { data } = await axios.get(`${global.baseurl}/user_details`, {
  //           headers,
  //         });
  //         setUser(data);
  //         console.log("user data");
  //         console.log(data);
  //         downloadTHISPDF();
  //       } catch (err) {
  //         console.error(err);
  //       }
  //     }
  //   } else if (
  //     paidTemplate === 1 &&
  //     !isTemplatePurchased &&
  //     user3.max_cover_templates <= user3.current_cover_usage
  //   ) {
  //     swal({
  //       title: "Sorry!",
  //       text: "Please upgrade your plan",
  //       icon: "error",
  //       buttons: {
  //         cancel: "Cancel",
  //         confirm: {
  //           text: "OK",
  //           value: "ok",
  //         },
  //       },
  //     }).then((value) => {
  //       if (value === "ok") {
  //         navigate("/packages");
  //       }
  //     });
  //   } else {
  //     try {
  //       const headers = { Authorization: "Bearer " + user?.token };
  //       await axios.get(
  //         `${global.baseurl}/increase-cover-usage/${user?.id}/${selectedTemplateId}`,
  //         {
  //           headers,
  //         }
  //       );
  //       const { data } = await axios.get(`${global.baseurl}/user_details`, {
  //         headers,
  //       });
  //       setUser(data);
  //       downloadTHISPDF();
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  // };

  const [mobDownBtns, setMobDownBtns] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setMobDownBtns(true);
      } else {
        setMobDownBtns(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        setIsPrinting(true);
        adjustHeight();
        setTimeout(resolve, 3000);
        setTimeout(() => {
          $(".chk_height").css("min-height", "1308px");
          $("#unused_image").css("display", "block");
          $(".image__holder__resume.empty").css("display", "block");
        }, 5000);
      });
    },
    onAfterPrint: () => {
      setIsPrinting(false);
      setLoadingDoc(false);
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
    if (!isPrinting) {
      const isUserCloseAiCvr = Cookies.get("gen_cvr_ai");

      setCoverLetterTries(user3?.ai_based_cover_letter_tries);
      if (
        user3?.package_id > 1 &&
        isExample === false &&
        coverLetterTries > 0 &&
        isUserCloseAiCvr !== "false"
      ) {
        setOpenCoverLetterModal(true);
      } else {
        setOpenCoverLetterModal(false);
      }
    }
  }, [isExample, coverLetterTries]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const [userPurchasedTemplates, setUserPurchasedTemplates] = useState([]);

  const userDet = () => {
    ApiService.getUserDetails(user?.token)
      .then((response) => {
        setUser(response.data);
        setCoverLetterTries(response?.data?.ai_based_cover_letter_tries);
        setActiveToolBarTab(0);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    userDet();
  }, []);

  useEffect(() => {
    const purchasedTemplateIds = user3?.purchased_cover_templates?.map(
      (purchase) => purchase?.id
    );
    const ownTemplates = coverTemplatesListing?.filter((template) =>
      purchasedTemplateIds?.includes(template?.id)
    );
    setUserPurchasedTemplates(ownTemplates);
  }, [coverTemplatesListing, user3]);

  // !Siraj
  // Signature
  const [hasOldSignature, setHasOldSignature] = useState(0);
  const signatureRef = useRef(null);
  const signatureRef2 = useRef(null);
  const [signatureData, setSignatureData] = useState({
    type: "",
    value: "",
  });

  useEffect(() => {
    ApiService.getAllJobPositions(user?.token)
      .then((res) => {
        const jobs = res.data.data?.map((item) => ({
          value: item.id.toString(),
          label: item.name,
        }));
        setJobPositionsList(jobs);
      })
      .catch((err) => console.log(err));
  }, []);
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

  const [aiModal, setAiModal] = useState(false);
  const expEditorRef = useRef();

  const [resumeIsUpdating, setResumeIsUpdating] = useState(false);
  const [resumeHasSaved, setResumeHasSaved] = useState(false);

  const [openerSuggestion2, setOpenerSuggestion2] = useState([]);
  const [suggestionForAi, setSuggestionForAi] = useState([]);

  const getSuggestions = (val) => {
    const headers = {
      Authorization: "Bearer " + user?.token,
    };

    const formData = new FormData();
    formData.append("job_position", val);

    axios
      .post(global.baseurl + "/job-position/experience-suggestions", formData, {
        headers,
      })
      .then((data) => {
        if (data) {
          console.log(data.data.data.experience_suggestions);
          setOpenerSuggestion(data.data.data.experience_suggestions);
          setSuggestionForAi([]);
          data.data.data.experience_suggestions?.forEach((sug) => {
            setSuggestionForAi((prev) => {
              const alreadyExists = prev.some((item) => item.id === sug.id);
              if (!alreadyExists) {
                return [...prev, { id: sug.id, suggestion: sug.detail }];
              }
              return prev;
            });
          });

          setOpenerSuggestion2(data.data.data.top_ten_experiences);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSunEditorInstance = (sunEditor) => {
    expEditorRef.current = sunEditor;
    sunEditor.core.context.element.wysiwyg.setAttribute("spellcheck", "false");
  };

  useEffect(() => {
    getSuggestions();
  }, []);

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
  const handleClose = () => {
    Cookies.set("gen_cvr_ai", false);
    setOpenCoverLetterModal(false);
  };

  return (
    <>
      {loadingDoc ? (
        <div className="flex bg-white items-center border rounded-sm shadow-2xl fixed bottom-2 right-5 h-[55px] min-w-[200px] z-[99999]">
          <div onClick={() => setLoadingDoc(!loadingDoc)} className="absolute bg-primary-blue p-1 text-white -right-3 -top-3 shadow-md rounded-full cursor-pointer">
            <RxCross1 size={20} />
          </div>
          <img src={loader} className="h-full w-full object-contain" />
          <span className="text-lg font-semibold text-primary-blue pe-4">Processing...</span>
        </div>
      ) : null}

      {aiModal ? (
        <AiModal
          open={aiModal}
          handleClose={() => setAiModal(false)}
          suggestionsList={
            openerSuggestion?.map((sug) => ({
              id: sug.id,
              suggestion: sug.body,
            })) ?? []
          }
          handleSave={(data) => setValue("opener_detail", data)}
          modalType={["Spell", "Suggestions"]}
          initialContent={getValues("opener_detail") || ""}
          maxLength={2000}
        />
      ) : (
        <></>
      )}
      <section className="bg-[#1A2230] min-h-screen max-h-max" id="maindiv">
        {/* <button
          onClick={handleOpen}
          className="text-white border p-2 m-2 mx-auto rounded-sm"
        >
          Open
        </button> */}
        <div>
          {openCoverLetterModal && (
            <GenerateCoverLetter
              openModal={openCoverLetterModal}
              setOpenCoverLetterModal={setOpenCoverLetterModal}
              selectedTemplateId={selectedTemplateId}
              setRefreshCoverLetterPage={setRefreshCoverLetterPage}
              setActiveTemplate={setActiveTemplate}
              onClose={handleClose}
              coverLetterTries={coverLetterTries}
              userDet={userDet}
            />
          )}
        </div>

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

          <div className="flex text-center justify-center  gap-5">
            <div className="text-white cursor-pointer">

              <Tooltip title="Download Cover Letter">
                <div
                  className={
                    "flex items-center text-white cursor-pointer py-3 px-3  group relative toolbardiv5"
                  }
                  id="toolbardiv5"
                  onClick={downloadPDF}
                >
                  <div className="text-2xl bg-primary-blue w-[40px] h-[40px] rounded-full flex justify-center items-center">
                    <FiDownload size={30} />
                  </div>
                </div>
              </Tooltip>
            </div>
            <RxHamburgerMenu
              className="text-white cursor-pointer"
              onClick={() => setSideNavOpen(true)}
              size={40}
            />
          </div>
        </div>

        <div id="main_contents" className="w-full  mr-8">
          <section className="flex justify-center items-start  flex-wrap px-6 mt-10 py-10 w-full">
            {/* container */}
            <div className="w-full">
              {/* options */}
              <div className="w-full flex flex-wrap justify-between lg:gap-4 relative">
                <div className="relative  w-full xl:w-auto">
                  <h1
                    onClick={(e) =>
                      duplicate_delete_document(
                        "rename",
                        my_resumes.template_id,
                        my_resumes.uuid,
                        "Cover",
                        my_resumes.resume_name
                      )
                    }
                    className="w-[95%] truncate text-white font-Lexend font-semibold text-xl absolute top-[-40px]"
                  >
                    {coverData.name}
                  </h1>
                  {activeTemplate && (
                    <div className={`h-full`}>
                      <div
                        id="coverPDF"
                        className="relative origin-top-left scale-[40%] w-[calc(100%/0.4)] h-[650px] sm:scale-[60%] sm:w-[calc(100%/0.6)] sm:h-[750px)] lg:scale-100 lg:w-[1000px] lg:h-auto  shadow-lg"
                      >
                        {/* <div
                      className="absolute top-[2.5em] left-10 z-50 rotate-45 
                         text-[gray] text-[10em] "
                      id="watermark"
                    >
                      AIPRORESUME
                    </div> */}
                        <div ref={coverRef}>
                          <ActiveTemplate
                            activeId={activeTemplate}
                            coverData={coverData}
                            activeTheme={activeTheme}
                            activeFont={activeFont}
                            activeFontSize={activeFontSize}
                            signature={signatureData}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/*  */}

                {/* Toolbar */}
                <div className="hidden lg:flex flex-wrap flex-row-reverse justify-end items-start rounded-md  sticky top-[80px] h-fit">
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
                    className="flex flex-row-reverse w-fit bg-primary-blue py-6 px-2 ml-4 rounded-full"
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
                          <div
                            className={`text-md font-lexend font-medium pl-2`}
                          >
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
                          <div
                            className={`text-md font-lexend font-medium pl-2`}
                          >
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
                          <div
                            className={`text-md font-lexend font-medium pl-2`}
                          >
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
                          <div
                            className={`text-md font-lexend font-medium pl-2`}
                          >
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
                          className={`grid ${suggestionsOpen
                            ? "transform translate-x-[-100%]"
                            : ""
                            }  grid-cols-[100%,100%] transition-[0.9s]`}
                        >
                          {/* Form */}

                          <div className="w-[700px]">
                            <div className="flex items-center justify-center relative">
                              {!isExample && (
                                <div className="relative group">
                                  <button
                                    className={`text-lg absolute left-[-258px] top-[-20px] font-bold
                                     text-white py-2 px-4 rounded-md 
                                     hover:bg-blue-900 transition duration-300 flex justify-center items-center
                                     ${coverLetterTries <= 0
                                        ? "opacity-50 bg-blue-500/90 cursor-not-allowed"
                                        : "cursor-pointer bg-blue-700/90"
                                      }`}
                                    onClick={() =>
                                      setOpenCoverLetterModal(true)
                                    }
                                    disabled={coverLetterTries <= 0}
                                  >
                                    <IoSparklesSharp className="me-1" />
                                    <span>Generate with AI</span>
                                  </button>

                                  {coverLetterTries <= 0 ? (
                                    <div className="text-center absolute left-[-135px] top-[-28px] shadow-md  w-[255px] group-hover:opacity-100 opacity-0 transition-opacity duration-300 bg-gray-700 text-white text-sm p-1 rounded">
                                      No tries left! Please upgrade to most
                                      Popular or Premium to use AI Tool.
                                    </div>
                                  ) : (
                                    <div className="text-center absolute left-[-85px] top-[-28px] shadow-md  w-[125px] group-hover:opacity-100 opacity-0 transition-opacity duration-300 bg-gray-700 text-white text-sm p-1 rounded">
                                      {coverLetterTries} tries left
                                    </div>
                                  )}
                                </div>
                              )}
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
                                      filterOptions={filterOptions}
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
                                        helperText={
                                          errors.email_address?.message
                                        }
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
                                        shrink={!!watch("country_id")}
                                      >
                                        Country
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
                                        filterOptions={filterOptions}
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
                                        filterOptions={filterOptions}
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
                                        helperText={
                                          errors.street_address?.message
                                        }
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
                                            Show Contact Person Details
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
                                    render={({ field }) => (
                                      <Autocomplete
                                        {...field}
                                        freeSolo
                                        options={jobPostions
                                          ?.sort((a, b) =>
                                            a.name.localeCompare(b.name)
                                          )
                                          .map((option) => option.name)}
                                        filterOptions={filterOptions}
                                        onChange={(e, value) => {
                                          field.onChange(value);
                                          setCoverData((prevData) => ({
                                            ...prevData,
                                            contact_person_designation: value,
                                          }));
                                        }}
                                        onInputChange={(e, value) => {
                                          field.onChange(value);
                                          setCoverData((prevData) => ({
                                            ...prevData,
                                            contact_person_designation: value,
                                          }));
                                        }}
                                        value={field.value}
                                        sx={{ width: "100%" }}
                                        defaultValue={null}
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            defaultValue={""}
                                            label="Contact Person Designation"
                                            error={
                                              !!errors.contact_person_designation
                                            }
                                            helperText={
                                              errors.contact_person_designation
                                                ? errors
                                                  .contact_person_designation
                                                  .message
                                                : null
                                            }
                                          />
                                        )}
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
                                            contact_person_email:
                                              e.target.value,
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
                                  name="company_name"
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
                                          company_name: e.target.value,
                                        }));
                                      }}
                                      className="w-full"
                                      error={!!errors.company_name}
                                      helperText={errors.company_name?.message}
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
                                      helperText={
                                        errors.company_address?.message
                                      }
                                    />
                                  )}
                                />

                                {/* ***** Next Section **** */}
                                {/* siri */}
                                <hr />
                                {/* <span>Body Content</span> */}
                                {/* Opener Detail Old code */}
                                {/* <div className="relative">
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
                                    required: "Body Content is required",
                                    maxLength: {
                                      value: 1000,
                                      message: "Body Content must not exceed 1000 characters",
                                    }
                                  }}
                                  render={({ field }) => (
                                    <TextField
                                      {...field}
                                      id="filled-multiline-static"
                                      label={`Body Content* (${watch("opener_detail")?.length ===
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
                                        // if (value.length <= 1000) {
                                        field.onChange(value);
                                        setCoverData((prevData) => ({
                                          ...prevData,
                                          opener_detail: value,
                                        }));
                                        // }
                                      }}
                                      error={!!errors.opener_detail}
                                      helperText={errors.opener_detail?.message}
                                    />
                                  )}
                                />
                              </div> */}

                                {/* New sugesstion editor desktop screen code start */}
                                <div className="relative">
                                  {/* <div
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
                                </div> */}

                                  <Controller
                                    name="opener_detail"
                                    control={control}
                                    // rules={{
                                    //   validate: (content) => {
                                    //     const wordCount = content.trim().split(/\s+/).length; // Count words
                                    //     if (wordCount < 10) return "Content must be at least 10 characters.";
                                    //     if (wordCount > 2000) return "Content cannot exceed 2000 characters.";
                                    //     return true;
                                    //   },
                                    // }}

                                    rules={{
                                      validate: (content) => {
                                        const plainText = content
                                          .replace(/<\/?[^>]+(>|$)/g, "")
                                          .replace(/\n/g, "")
                                          .replace(/\s+/g, " ");

                                        if (!plainText)
                                          return "Description is required.";

                                        if (plainText.length < 10)
                                          return "Content must be at least 10 characters.";
                                        if (plainText.length > 1999)
                                          return "Content must less than 2000 characters.";
                                        return true;
                                      },
                                    }}
                                    render={({ field }) => (
                                      <div className="w-full">
                                        <label
                                          htmlFor="opener_detail"
                                          className="block mb-2 text-sm font-medium text-gray-700"
                                        >
                                          Body Content*
                                        </label>
                                        <div className="relative">
                                          <SunEditor
                                            {...field}
                                            getSunEditorInstance={
                                              getSunEditorInstance
                                            }
                                            setContents={field.value}
                                            onChange={(content) => {
                                              field.onChange(content);
                                              setCoverData((prevData) => ({
                                                ...prevData,
                                                opener_detail: content,
                                              }));
                                            }}
                                            onBlur={() => {
                                              field.onBlur();
                                            }}
                                            setOptions={{
                                              height: 300,
                                              placeholder:
                                                "Cover Letter Body Content here...",
                                              buttonList: [
                                                [
                                                  "bold",
                                                  "underline",
                                                  "italic",
                                                  "strike",
                                                ],
                                                ["list"],
                                              ],
                                              maxCharCount: 2000,
                                              resizeEnable: false,
                                            }}
                                          />
                                          {errors.opener_detail && (
                                            <p className="mt-2 text-sm text-red-600">
                                              {errors.opener_detail.message}
                                            </p>
                                          )}
                                          <div
                                            className="absolute top-2 right-2 z-20 flex items-center gap-2 bg-primary-green px-2 py-1.5 rounded-md !m-0 cursor-pointer"
                                            onClick={() => setAiModal(true)}
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width={20}
                                              height={20}
                                              viewBox="0 0 30 30"
                                              fill="none"
                                            >
                                              <path
                                                d="M27.95 5.9C27.6715 5.9 27.4044 5.78938 27.2075 5.59246C27.0106 5.39555 26.9 5.12848 26.9 4.85C26.9 4.57152 27.0106 4.30445 27.2075 4.10754C27.4044 3.91062 27.6715 3.8 27.95 3.8C28.2285 3.8 28.4955 3.91062 28.6925 4.10754C28.8894 4.30445 29 4.57152 29 4.85C29 5.12848 28.8894 5.39555 28.6925 5.59246C28.4955 5.78938 28.2285 5.9 27.95 5.9ZM27.95 5.9V11.15C27.95 12.1272 27.95 12.6158 27.8296 13.012C27.6961 13.4528 27.456 13.8538 27.1304 14.1796C26.8049 14.5053 26.4041 14.7458 25.9634 14.8796C25.5658 15 25.0772 15 24.1 15M2.05 24.1C2.32848 24.1 2.59555 24.2106 2.79246 24.4075C2.98938 24.6044 3.1 24.8715 3.1 25.15C3.1 25.4285 2.98938 25.6955 2.79246 25.8925C2.59555 26.0894 2.32848 26.2 2.05 26.2C1.77152 26.2 1.50445 26.0894 1.30754 25.8925C1.11062 25.6955 1 25.4285 1 25.15C1 24.8715 1.11062 24.6044 1.30754 24.4075C1.50445 24.2106 1.77152 24.1 2.05 24.1ZM2.05 24.1V18.85C2.05 17.8728 2.05 17.3842 2.1704 16.988C2.30389 16.5472 2.54403 16.1462 2.86956 15.8204C3.19508 15.4947 3.59594 15.2542 4.0366 15.1204C4.4342 15 4.9228 15 5.9 15M5.9 2.05C5.9 2.32848 5.78938 2.59555 5.59246 2.79246C5.39555 2.98938 5.12848 3.1 4.85 3.1C4.57152 3.1 4.30445 2.98938 4.10754 2.79246C3.91062 2.59555 3.8 2.32848 3.8 2.05C3.8 1.77152 3.91062 1.50445 4.10754 1.30754C4.30445 1.11062 4.57152 1 4.85 1C5.12848 1 5.39555 1.11062 5.59246 1.30754C5.78938 1.50445 5.9 1.77152 5.9 2.05ZM5.9 2.05H11.15C12.1272 2.05 12.6158 2.05 13.012 2.1704C13.4528 2.30389 13.8538 2.54403 14.1796 2.86956C14.5053 3.19508 14.7458 3.59594 14.8796 4.0366C15 4.4342 15 4.9228 15 5.9M24.1 27.95C24.1 27.6715 24.2106 27.4044 24.4075 27.2075C24.6044 27.0106 24.8715 26.9 25.15 26.9C25.4285 26.9 25.6955 27.0106 25.8925 27.2075C26.0894 27.4044 26.2 27.6715 26.2 27.95C26.2 28.2285 26.0894 28.4955 25.8925 28.6925C25.6955 28.8894 25.4285 29 25.15 29C24.8715 29 24.6044 28.8894 24.4075 28.6925C24.2106 28.4955 24.1 28.2285 24.1 27.95ZM24.1 27.95H18.85C17.8728 27.95 17.3842 27.95 16.988 27.8296C16.5472 27.6961 16.1462 27.456 15.8204 27.1304C15.4947 26.8049 15.2542 26.4041 15.1204 25.9634C15 25.5658 15 25.0772 15 24.1"
                                                stroke="white"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              />
                                              <path
                                                d="M5.96777 14.9316C5.96777 10.642 5.96777 8.4972 7.30057 7.1644C8.63337 5.8316 10.7782 5.8316 15.0678 5.8316C19.3574 5.8316 21.5022 5.8316 22.835 7.1644C24.1678 8.4972 24.1678 10.642 24.1678 14.9316C24.1678 19.2212 24.1678 21.366 22.835 22.6988C21.5022 24.0316 19.3574 24.0316 15.0678 24.0316C10.7782 24.0316 8.63337 24.0316 7.30057 22.6988C5.96777 21.366 5.96777 19.2212 5.96777 14.9316Z"
                                                stroke="white"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              />
                                              <path
                                                d="M15.6978 18.5002L13.6538 12.1708C13.5829 11.9711 13.4508 11.7988 13.2764 11.6784C13.102 11.558 12.8941 11.4957 12.6822 11.5002C12.4705 11.496 12.2629 11.5585 12.0888 11.6788C11.9146 11.7992 11.7828 11.9713 11.712 12.1708L9.66797 18.5002M19.1978 11.5002V18.5002M10.4198 16.4002H14.9446"
                                                stroke="white"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              />
                                            </svg>
                                            <span className="text-white hidden lg:block">
                                              Suggestions
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  />
                                </div>
                                {/* New sugesstion editor desktop screen code end*/}

                                {/* closer_detail */}
                                {/* <div className="relative">
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
                                        // if (value.length <= 1000) {
                                        field.onChange(value);
                                        setCoverData((prevData) => ({
                                          ...prevData,
                                          closer_detail: value,
                                        }));
                                        // }
                                      }}
                                      error={!!errors.closer_detail}
                                      helperText={errors.closer_detail?.message}
                                    />
                                  )}
                                />
                              </div> */}

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
                          {/* siri */}
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

                                          setCoverData((prevData) => ({
                                            ...prevData,
                                            opener_detail: newOpenerDetail,
                                          }));
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

                                          setCoverData((prevData) => ({
                                            ...prevData,
                                            closer_detail: newOpenerDetail,
                                          }));
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
                                <form
                                  onSubmit={handleSubmit(handleSaveSignature)}
                                >
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
                                                  .getElementById(
                                                    "signatureUpload"
                                                  )
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
                                {coverTemplatesListing?.map((template, idx) => {
                                  const isPurchased =
                                    userPurchasedTemplates.some(
                                      (purchasedTemplate) =>
                                        purchasedTemplate.id === template.id
                                    );
                                  return (
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
                                      {isPurchased ? (
                                        <div
                                          className="flex
                                          bg-gradient-to-r  from-[#00caa5] to-[#01B2AC]
                                      w-[150px] h-8 absolute left-[-35px] top-16 text-white -rotate-45 justify-center items-center z-50"
                                          style={{
                                            clipPath:
                                              "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
                                          }}
                                        >
                                          <img
                                            className="h-5"
                                            src={brand}
                                            alt="purchased icon"
                                          />
                                          <span>Own</span>
                                        </div>
                                      ) : template.is_paid === 1 ? (
                                        <div
                                          className="flex
                                       bg-gradient-to-r from-[#01B2AC] to-[#0072B1]
                                        w-[150px] h-8 absolute left-[-35px] top-16
                                         text-white -rotate-45 justify-center items-center z-40"
                                          style={{
                                            clipPath:
                                              "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
                                          }}
                                        >
                                          <img
                                            src={premium}
                                            alt="premium icon"
                                          />
                                          <span>Premium</span>
                                        </div>
                                      ) : null}

                                      <h2 className="text-[#0f4d76] text-md font-Lexend py-2">
                                        <strong> {idx + 1}) </strong>
                                        {template.name}
                                      </h2>
                                      <img
                                        src={global.imageUrl + template.image}
                                        alt={template.name}
                                        className={
                                          activeTemplate === template.id
                                            ? " border-2 border-primary-green rounded-lg"
                                            : "rounded-lg"
                                        }
                                        style={{
                                          boxShadow:
                                            "0px 0px 5px rgba(0,0,0,0.4)",
                                        }}
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        )}
                        {activeToolBarTab === 5 && (
                          <div className="w-[550px]">
                            {/* Themes */}
                            <Themes
                              userDetails={user3}
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
                              userDetails={user3}
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
                        onClick={() => {
                          share_doc();
                        }}
                      >
                        <div className="absolute right-0 z-20 group-hover:flex hidden justify-start px-2 rounded-full bg-secondary-blue w-[200px] items-center h-full ">
                          <div className="text-2xl">
                            <LuShare2 />
                          </div>
                          <div
                            className={`text-md font-lexend font-medium pl-2`}
                          >
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
                          <div
                            className={`text-md font-lexend font-medium pl-2`}
                          >
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
                          <div
                            className={`text-md font-lexend font-medium pl-2`}
                          >
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
                          <div
                            className={`text-md font-lexend font-medium pl-2`}
                          >
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
              className={`relative ${activeToolBarTab > 0 ? "block" : "hidden"
                } `}
            >
              <div
                className={`lg:hidden p-2 2xl:right-0 fixed rounded-xl w-[90%] left-[5%] bottom-10 z-10 max-h-[600px] overflow-y-auto bg-[#fff] shadow-lg pb-20`}
              >
                {activeToolBarTab != 0 ? (
                  <>
                    <div
                      onClick={() => {
                        setActiveToolBarTab(!activeToolBarTab);
                      }}
                      className={`sticky top-[10px] left-[10px] bg-[#E66868] hover:bg-[#E66868] mb-4 w-[30px] h-[30px] text-[#fff] rounded-full flex justify-center items-center cursor-pointer z-50 cover_from_cross`}
                    >
                      {suggestionsOpen ? "" : <RxCross1 size={20} />}
                    </div>
                  </>
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
                            className="border-2  text-white rounded-full w-[40px] h-[40px] cursor-pointer flex justify-center items-center"
                            onClick={() => closeOpenForms()}
                          >
                            <IoIosArrowBack size={20} />
                          </div>
                        )}

                        {!isExample && (
                          <div className="relative flex items-center  group py-6 w-full bg-white">
                            <button
                              className={`text-sm absolute font-bold text-blue-100 
                                py-2 px-2 top-0 right-0  rounded-md 
                                flex  justify-center items-center ${coverLetterTries <= 0
                                  ? "opacity-50 bg-blue-500/90 cursor-not-allowed"
                                  : "cursor-pointer bg-blue-700/90"
                                }`}
                              onClick={() => setOpenCoverLetterModal(true)}
                              disabled={coverLetterTries <= 0}
                            >
                              <IoSparklesSharp className="me-1 text-sm" />
                              <span>Generates with AI</span>
                            </button>
                            {coverLetterTries > 0 ? (
                              <div
                                className="absolute  inline-flex mt-[-9px]
                                 items-center text-white mx-2 p-1
                                 rounded-full bg-orange-500"
                              >
                                <AiOutlineInfoCircle className="text-xl me-1" />
                                {coverLetterTries}{" "}
                                <span className="text-l ml-1">
                                  {coverLetterTries > 1 ? "Tries" : "Try"} Left
                                </span>
                              </div>
                            ) : (
                              <div
                                className=" mt-5 px-1 py-[2px]
                                items-center text-white mx-2
                                rounded-lg bg-red-500 flex"
                              >
                                <AiOutlineInfoCircle className="text-xl me-1" />
                                <span className="text-sm">
                                  No try left! Please upgrade to Most Popular or
                                  Premium.
                                </span>
                              </div>
                            )}
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
                                    ?.sort((a, b) =>
                                      a.name.localeCompare(b.name)
                                    )
                                    .map((option) => option.name)}
                                  filterOptions={filterOptions}
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
                                    shrink={!!watch("country_id")}
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
                                    filterOptions={filterOptions}
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
                                    filterOptions={filterOptions}
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
                                        Show Details
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
                                render={({ field }) => (
                                  <Autocomplete
                                    {...field}
                                    freeSolo
                                    options={jobPostions
                                      ?.sort((a, b) =>
                                        a.name.localeCompare(b.name)
                                      )
                                      .map((option) => option.name)}
                                    filterOptions={filterOptions}
                                    onChange={(e, value) => {
                                      field.onChange(value);
                                      setCoverData((prevData) => ({
                                        ...prevData,
                                        contact_person_designation: value,
                                      }));
                                    }}
                                    onInputChange={(e, value) => {
                                      field.onChange(value);
                                      setCoverData((prevData) => ({
                                        ...prevData,
                                        contact_person_designation: value,
                                      }));
                                    }}
                                    value={field.value}
                                    sx={{ width: "100%" }}
                                    defaultValue={null}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        defaultValue={""}
                                        label="Contact Person Designation"
                                        error={
                                          !!errors.contact_person_designation
                                        }
                                        helperText={
                                          errors.contact_person_designation
                                            ? errors.contact_person_designation
                                              .message
                                            : null
                                        }
                                      />
                                    )}
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
                              name="company_name"
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
                                      company_name: e.target.value,
                                    }));
                                  }}
                                  className="w-full"
                                  error={!!errors.company_name}
                                  helperText={errors.company_name?.message}
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
                            {/* <span>Body Content</span> */}
                            {/* Opener */}
                            {/* <div className="relative">
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
                                  required: "Body Content is required",
                                  maxLength: { value: 1000 },
                                }}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    id="filled-multiline-static"
                                    label={`Body Content* (${watch("opener_detail")?.length ===
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
                                      // if (value.length <= 1000) {
                                      field.onChange(value);
                                      setCoverData((prevData) => ({
                                        ...prevData,
                                        opener_detail: value,
                                      }));
                                      // }
                                    }}
                                    error={!!errors.opener_detail}
                                    helperText={errors.opener_detail?.message}
                                  />
                                )}
                              />
                            </div> */}

                            {/* New sugesstion editor mob screen code start */}
                            <div className="relative">
                              <Controller
                                name="opener_detail"
                                control={control}
                                // rules={{
                                //   validate: (content) => {
                                //     const wordCount = content.trim().split(/\s+/).length; // Count words
                                //     if (wordCount < 10) return "Content must be at least 10 characters.";
                                //     if (wordCount > 2000) return "Content cannot exceed 2000 characters.";
                                //     return true;
                                //   },
                                // }}

                                rules={{
                                  validate: (content) => {
                                    const plainText = content
                                      .replace(/<\/?[^>]+(>|$)/g, "")
                                      .replace(/\n/g, "")
                                      .replace(/\s+/g, " ");

                                    if (!plainText)
                                      return "Description is required.";

                                    if (plainText.length < 10)
                                      return "Content must be at least 10 characters.";
                                    if (plainText.length > 1999)
                                      return "Content must less than 2000 characters.";
                                    return true;
                                  },
                                }}
                                render={({ field }) => (
                                  <div className="w-full">
                                    <label
                                      htmlFor="opener_detail"
                                      className="block mb-2 text-sm font-medium text-gray-700"
                                    >
                                      Body Content*
                                    </label>
                                    <div className="relative">
                                      <SunEditor
                                        {...field}
                                        getSunEditorInstance={
                                          getSunEditorInstance
                                        }
                                        setContents={field.value}
                                        onChange={(content) => {
                                          field.onChange(content);
                                          setCoverData((prevData) => ({
                                            ...prevData,
                                            opener_detail: content,
                                          }));
                                        }}
                                        onBlur={() => {
                                          field.onBlur();
                                        }}
                                        setOptions={{
                                          height: 300,
                                          placeholder:
                                            "Cover Letter Body Content here...",
                                          buttonList: [
                                            [
                                              "bold",
                                              "underline",
                                              "italic",
                                              "strike",
                                            ],
                                            ["list"],
                                          ],
                                          maxCharCount: 2000,
                                          resizeEnable: false,
                                        }}
                                      />
                                      {errors.opener_detail && (
                                        <p className="mt-2 text-sm text-red-600">
                                          {errors.opener_detail.message}
                                        </p>
                                      )}
                                      <div
                                        className="absolute top-2 right-2 z-20 flex items-center gap-2 bg-primary-green px-2 py-1.5 rounded-md !m-0 cursor-pointer"
                                        onClick={() => setAiModal(true)}
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width={20}
                                          height={20}
                                          viewBox="0 0 30 30"
                                          fill="none"
                                        >
                                          <path
                                            d="M27.95 5.9C27.6715 5.9 27.4044 5.78938 27.2075 5.59246C27.0106 5.39555 26.9 5.12848 26.9 4.85C26.9 4.57152 27.0106 4.30445 27.2075 4.10754C27.4044 3.91062 27.6715 3.8 27.95 3.8C28.2285 3.8 28.4955 3.91062 28.6925 4.10754C28.8894 4.30445 29 4.57152 29 4.85C29 5.12848 28.8894 5.39555 28.6925 5.59246C28.4955 5.78938 28.2285 5.9 27.95 5.9ZM27.95 5.9V11.15C27.95 12.1272 27.95 12.6158 27.8296 13.012C27.6961 13.4528 27.456 13.8538 27.1304 14.1796C26.8049 14.5053 26.4041 14.7458 25.9634 14.8796C25.5658 15 25.0772 15 24.1 15M2.05 24.1C2.32848 24.1 2.59555 24.2106 2.79246 24.4075C2.98938 24.6044 3.1 24.8715 3.1 25.15C3.1 25.4285 2.98938 25.6955 2.79246 25.8925C2.59555 26.0894 2.32848 26.2 2.05 26.2C1.77152 26.2 1.50445 26.0894 1.30754 25.8925C1.11062 25.6955 1 25.4285 1 25.15C1 24.8715 1.11062 24.6044 1.30754 24.4075C1.50445 24.2106 1.77152 24.1 2.05 24.1ZM2.05 24.1V18.85C2.05 17.8728 2.05 17.3842 2.1704 16.988C2.30389 16.5472 2.54403 16.1462 2.86956 15.8204C3.19508 15.4947 3.59594 15.2542 4.0366 15.1204C4.4342 15 4.9228 15 5.9 15M5.9 2.05C5.9 2.32848 5.78938 2.59555 5.59246 2.79246C5.39555 2.98938 5.12848 3.1 4.85 3.1C4.57152 3.1 4.30445 2.98938 4.10754 2.79246C3.91062 2.59555 3.8 2.32848 3.8 2.05C3.8 1.77152 3.91062 1.50445 4.10754 1.30754C4.30445 1.11062 4.57152 1 4.85 1C5.12848 1 5.39555 1.11062 5.59246 1.30754C5.78938 1.50445 5.9 1.77152 5.9 2.05ZM5.9 2.05H11.15C12.1272 2.05 12.6158 2.05 13.012 2.1704C13.4528 2.30389 13.8538 2.54403 14.1796 2.86956C14.5053 3.19508 14.7458 3.59594 14.8796 4.0366C15 4.4342 15 4.9228 15 5.9M24.1 27.95C24.1 27.6715 24.2106 27.4044 24.4075 27.2075C24.6044 27.0106 24.8715 26.9 25.15 26.9C25.4285 26.9 25.6955 27.0106 25.8925 27.2075C26.0894 27.4044 26.2 27.6715 26.2 27.95C26.2 28.2285 26.0894 28.4955 25.8925 28.6925C25.6955 28.8894 25.4285 29 25.15 29C24.8715 29 24.6044 28.8894 24.4075 28.6925C24.2106 28.4955 24.1 28.2285 24.1 27.95ZM24.1 27.95H18.85C17.8728 27.95 17.3842 27.95 16.988 27.8296C16.5472 27.6961 16.1462 27.456 15.8204 27.1304C15.4947 26.8049 15.2542 26.4041 15.1204 25.9634C15 25.5658 15 25.0772 15 24.1"
                                            stroke="white"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                          <path
                                            d="M5.96777 14.9316C5.96777 10.642 5.96777 8.4972 7.30057 7.1644C8.63337 5.8316 10.7782 5.8316 15.0678 5.8316C19.3574 5.8316 21.5022 5.8316 22.835 7.1644C24.1678 8.4972 24.1678 10.642 24.1678 14.9316C24.1678 19.2212 24.1678 21.366 22.835 22.6988C21.5022 24.0316 19.3574 24.0316 15.0678 24.0316C10.7782 24.0316 8.63337 24.0316 7.30057 22.6988C5.96777 21.366 5.96777 19.2212 5.96777 14.9316Z"
                                            stroke="white"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                          <path
                                            d="M15.6978 18.5002L13.6538 12.1708C13.5829 11.9711 13.4508 11.7988 13.2764 11.6784C13.102 11.558 12.8941 11.4957 12.6822 11.5002C12.4705 11.496 12.2629 11.5585 12.0888 11.6788C11.9146 11.7992 11.7828 11.9713 11.712 12.1708L9.66797 18.5002M19.1978 11.5002V18.5002M10.4198 16.4002H14.9446"
                                            stroke="white"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                        <span className="text-white hidden lg:block">
                                          Suggestions
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              />
                            </div>
                            {/* New sugesstion editor mob screen code end*/}

                            {/* closer_detail1 */}
                            <div className="relative">
                              {/* <div
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
                              </div> */}

                              {/* <Controller
                                name="closer_detail"
                                control={control}
                                rules={{
                                  required: "Closer required",

                                  maxLength: {
                                    value: 1000,
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
                                      // if (value.length <= 1000) {
                                      field.onChange(value);
                                      setCoverData((prevData) => ({
                                        ...prevData,
                                        closer_detail: value,
                                      }));
                                      // }
                                    }}
                                    error={!!errors.closer_detail}
                                    helperText={errors.closer_detail?.message}
                                  />
                                )}
                              /> */}
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
                                      const newOpenerDetail = `${currentOpenerDetail
                                        ? currentOpenerDetail
                                        : ""
                                        } ${sug.body}`.trim(); // Append the new value with a space
                                      setValue(
                                        "opener_detail",
                                        newOpenerDetail
                                      ); // Set the combined value
                                      setCoverData((prevData) => ({
                                        ...prevData,
                                        opener_detail: newOpenerDetail,
                                      }));
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
                                      setCoverData((prevData) => ({
                                        ...prevData,
                                        closer_detail: newOpenerDetail,
                                      }));
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
                                          color: "white",
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
                    <div>
                      {/* Templates */}
                      <div className="flex flex-row-reverse">
                        <div className="grid sm:grid-cols-2 gap-4 p-2">
                          {coverTemplatesListing?.map((template, idx) => {
                            const isPurchased = userPurchasedTemplates.some(
                              (purchasedTemplate) =>
                                purchasedTemplate.id === template.id
                            );
                            return (
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
                                {isPurchased ? (
                                  <div
                                    className="flex
                                          bg-gradient-to-r  from-[#00caa5] to-[#01B2AC]
                                      w-[150px] h-8 absolute left-[-35px] top-16 text-white -rotate-45 justify-center items-center z-50"
                                    style={{
                                      clipPath:
                                        "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
                                    }}
                                  >
                                    <img
                                      className="h-5"
                                      src={brand}
                                      alt="purchased icon"
                                    />
                                    <span>Own</span>
                                  </div>
                                ) : template.is_paid === 1 ? (
                                  <div
                                    className="flex
                                       bg-gradient-to-r from-[#01B2AC] to-[#0072B1]
                                        w-[150px] h-8 absolute left-[-35px] top-16
                                         text-white -rotate-45 justify-center items-center z-40"
                                    style={{
                                      clipPath:
                                        "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
                                    }}
                                  >
                                    <img src={premium} alt="premium icon" />
                                    <span>Premium</span>
                                  </div>
                                ) : null}

                                <h2 className="text-[#0f4d76] text-md font-Lexend py-2">
                                  <strong> {idx + 1}) </strong>
                                  {template.name}
                                </h2>
                                <img
                                  src={global.imageUrl + template.image}
                                  alt={template.name}
                                  className={
                                    activeTemplate === template.id
                                      ? " border-2 border-primary-green rounded-lg"
                                      : "rounded-lg"
                                  }
                                  style={{
                                    boxShadow: "0px 0px 5px rgba(0,0,0,0.4)",
                                  }}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                  {activeToolBarTab === 5 && (
                    <div>
                      {/* Themes */}
                      <Themes
                        userDetails={user3}
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
                        userDetails={user3}
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
          <div
            className="shadow-2xl relative bg-[rgba(255,255,255,1)] 
          w-[80%] lg:w-[70%] xl:w-[40%] p-10 m-auto mt-[30%] lg:mt-[10%] border-[4px] border-[#0072b1] rounded-[30px]"
          >
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
                <button
                  className="hover:text-[#01B2AC]"
                  onClick={handleCopyClick}
                >
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
    </>
  );
};

export default Header;
