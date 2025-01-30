import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt, FaEye, FaShareAlt } from "react-icons/fa";
import template1 from "../../assets/images/template1.webp"; // Default image
import search_symbol from "../../assets/images/search_symbol.webp";
import TemplatesSliderUser from "./TemplateSliderUser";
import swal from "sweetalert";
import axios from "axios";
import { TfiEmail } from "react-icons/tfi";
import { BiBookContent, BiFontFamily, BiLoaderAlt, BiX } from "react-icons/bi";
import $ from "jquery";
import { useAuth } from "../../services/Auth";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import { HiClipboardCheck } from "react-icons/hi";
import { LuPaintbrush, LuShare2 } from "react-icons/lu";
import { ApiService } from "../../services/ApiService";
import { Link } from "react-router-dom";
const UserResumeCover = ({ personalData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // States for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [doc_id, setDoc_id] = useState("");
  // State for the image preview
  useEffect(() => {
    setTimeout(() => {
      if (personalData && personalData.length > 0) {
        setPreviewImage(global.imageUrl + personalData[0].template?.image);
        setDoc_id(personalData[0].id);
      }
    }, 0);
  }, [personalData]);
  // Total pages
  const totalPages = Math.ceil((personalData?.length || 0) / itemsPerPage);

  // Paginate data
  const paginatedData =
    personalData?.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ) || [];

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Handle image preview change
  const handleImagePreview = (imgSrc) => {
    setPreviewImage(global.imageUrl + imgSrc);
  };
  const closeTemplatesModal = () => {
    setIsModalOpen(false);
  };
  const openTemplatesModal = () => {
    setIsModalOpen(true);
  };

  const handleDeleteResume = (id) => {
    swal({
      title: "Delete",
      text: "Are you sure you want to delete the user cover permanently?",
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        setIsLoading(true);
        ApiService.deleteUserResumeAdminSide(user?.token, id)
          .then((res) => {
            setIsLoading(false);
            getData();
            swal({
              title: "Successful",
              text: res.data.message,
              icon: "success",
            });
          })
          .catch((err) => {
            setIsLoading(false);
            console.log(err);
          });
      } else {
        //
      }
    });
  };
  const getData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    getData();
  }, []);
  const [email_share, set_email_share] = useState("");
  const [copyText, setCopyText] = useState("");
  const [file, setFile] = useState("");
  const [isAllowShare, setIsAllowShare] = useState(0);
  const [file2, setFile2] = useState(null);
  const handleCopyClick = () => {
    const textToCopy = global.localPath + "share/" + doc_id + "?share=resume";
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
  const share_doc = async () => {
    $("#share_doc_modelbox").fadeIn(300);
    setFile(global.localPath + "share/" + doc_id + "?share=resume");

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
        link: global.localPath + "share/" + doc_id + "?share=resume",
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

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1 overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left border-b">Sn#</th>
              <th className="px-4 py-2 text-left border-b">Name</th>
              <th className="px-4 py-2 text-left border-b">Job Title</th>
              <th className="px-4 py-2 text-left border-b">Created On</th>
              <th className="px-4 py-2 text-left border-b">Updated On</th>
              <th className="px-4 py-2 text-left border-b">Template Name</th>
              <th className="px-4 py-2 text-left border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(paginatedData) && paginatedData.length > 0 ? (
              paginatedData.map((resume, index) => (
                <tr key={resume.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{index + 1}</td>
                  <td className="px-4 py-2 border-b">{resume.resume_name}</td>
                  <td className="px-4 py-2 border-b">{resume.job_title}</td>
                  <td className="px-4 py-2 border-b">
                    {resume.template?.created_at
                      ? new Date(
                        resume.template.created_at
                      ).toLocaleDateString()
                      : "--"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {resume.template?.updated_at
                      ? new Date(
                        resume.template.updated_at
                      ).toLocaleDateString()
                      : "--"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {resume.template?.name || "N/A"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    <button className="text-black hover:text-blue-600 mr-2">
                      <Link
                        to={"/resume/formatting-admin"}
                        state={{
                          isExample: false,
                          resumeId: resume.id,
                        }}
                      >
                        <FaEdit />
                      </Link>
                    </button>
                    <button className="text-black hover:text-blue-600 mr-2">
                      <FaTrashAlt
                        onClick={() => handleDeleteResume(resume.uuid)}
                      />
                    </button>
                    <button
                      className="text-black hover:text-blue-600"
                      onClick={() => {
                        setPreviewImage(
                          global.imageUrl + resume.template?.image ||
                          global.imageUrl + resume.template?.image
                        );
                        setDoc_id(resume.id);
                      }}
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        {totalPages > 1 && personalData.length > 0 && (
          <div className="flex justify-center mt-4 overflow-x-auto">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-l-lg hover:bg-blue-700"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 ${currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
                  } hover:bg-gray-400`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-700"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <div className="flex-none w-full lg:w-1/4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-green-600">●</span>
            <span className="text-sm text-gray-700">Allowed to share</span>
          </div>
          <button className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full hover:bg-blue-700">
            <FaShareAlt
              className="text-white"
              onClick={() => {
                share_doc();
              }}
            />
          </button>
        </div>
        <div className="flex flex-col items-center p-4 border-l relative">
          <div
            className="bg-[#0072b1] w-6 h-6  right-8 top-8 rounded-full flex items-center justify-center absolute z-50"
            onClick={() => openTemplatesModal()}
          >
            <img src={search_symbol} />
          </div>
          <img
            src={previewImage} // Display the image based on state
            alt="Preview"
            className="w-full h-[50%] mb-4 rounded-lg"
          />
          {isModalOpen && (
            <TemplatesSliderUser
              open={isModalOpen}
              onClose={closeTemplatesModal}
              image1={previewImage}
              doc_id={doc_id}
              doc_name={"resume"}
            />
          )}
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
    </div>
  );
};

export default UserResumeCover;
