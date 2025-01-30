import React, { useEffect, useState } from "react";
import { BiSearch, BiRightArrowAlt, BiLeftArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { ApiService } from "../../services/ApiService";
import { FaEye } from "react-icons/fa";
import swal from "sweetalert";
import { useAuth } from "../../services/Auth";
import { MdDelete, MdOutlineModeEdit } from "react-icons/md";
import { FcCancel, FcCheckmark } from "react-icons/fc";
import { FaTimes } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";

import { HiClipboardCheck } from "react-icons/hi";
import { TfiEmail } from "react-icons/tfi";
import { BiBookContent, BiFontFamily, BiLoaderAlt, BiX } from "react-icons/bi";
import $ from "jquery";
const Admins = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageOffset, setPageOffset] = useState(0);
  const [pageLimit, setPageLimit] = useState(30);
  const [pageTotal, setPageTotal] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]); // New state for selected users
  const { userPermissions, user } = useAuth();

  const handleKeyUp = (event) => {
    setSearchTerm(event.target.value);
  };

  const loadData = () => {
    setIsLoading(true);
    ApiService.getAllUsers(user?.token)
      .then(async (response) => {
        const usersData = response.data.data;
        const usersWithCountry = await Promise.all(
          usersData.map(async (user) => {
            if (user.ip_address) {
              try {
                const res = await axios.get(
                  `https://ipinfo.io/${user.ip_address}/json`
                );
                user.country = res.data.country;
                console.log("res");
                console.log(res);
              } catch (error) {
                user.country = "Not found";
              }
            } else {
              user.country = "Not found";
            }
            return user;
          })
        );
        setUsers(usersWithCountry);
        updatePagination(usersWithCountry);
        console.log(usersWithCountry);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const updatePagination = (userData) => {
    const pages = [];
    const totalPageCount = Math.ceil(userData.length / 30);
    for (let i = 1; i <= totalPageCount; i++) {
      pages.push(i);
    }
    setPageTotal(pages);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const filteredUsers = users.filter((user) => {
      const searchTermLowerCase = searchTerm.toLowerCase();
      return (
        user.name.toLowerCase().includes(searchTermLowerCase) ||
        user.email.toLowerCase().includes(searchTermLowerCase) ||
        (user.job_position &&
          user.job_position.toLowerCase().includes(searchTermLowerCase)) ||
        (user.country &&
          user.country.toLowerCase().includes(searchTermLowerCase))
      );
    });
    updatePagination(filteredUsers);
    setCurrentPage(1);
    setPageOffset(0);
    setPageLimit(30);
  }, [searchTerm]);

  const page = (p) => {
    setCurrentPage(p);
    setPageOffset(p * 30 - 30);
    setPageLimit(p * 30);
  };

  const pageBack = () => {
    const newCurrentPage = currentPage - 1;
    setCurrentPage(newCurrentPage);
    setPageOffset(newCurrentPage * 30 - 30);
    setPageLimit(newCurrentPage * 30);
  };

  const pageNext = () => {
    const newCurrentPage = currentPage + 1;
    setCurrentPage(newCurrentPage);
    setPageOffset(newCurrentPage * 30 - 30);
    setPageLimit(newCurrentPage * 30);
  };

  const formattedDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    return `${formattedDay}-${formattedMonth}-${year}`;
  };

  const handleDeleteUser = (id) => {
    swal({
      title: "Delete",
      text: "Are you sure you want to delete the User permanently?",
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        setIsLoading(true);
        ApiService.deleteUser(user?.token, id)
          .then((res) => {
            setIsLoading(false);
            swal({
              title: "Successful",
              text: res.data.message,
              icon: "success",
            }).then(() => {
              loadData();
            });
          })
          .catch((err) => {
            setIsLoading(false);
            console.log(err);
          });
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

  const handleCheckboxChange = (id) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(id)
        ? prevSelectedUsers.filter((userId) => userId !== id)
        : [...prevSelectedUsers, id]
    );
  };
  const [docIds, setDocIds] = useState([]);
  const [copyText1, setCopyText1] = useState("");
  const handleShare = () => {
    if (selectedUsers.length > 0) {
      ApiService.shareUsersIds(user?.token, selectedUsers)
        .then((response) => {
          const data = response.data.data; // Extract doc_id(s) from response
          setDocIds(data); // Save doc_id(s) to state
          const concatenatedLinks = data
            .map((docId) => `${global.localPath}share/${docId}?share=resume`)
            .join("\n");
          // console.log("concatenatedLinks");
          // console.log(concatenatedLinks);
          setCopyText1(concatenatedLinks);
          share_doc();
          if (concatenatedLinks == "") {
            swal("Error!", "There is no CV on selected users", "error");
            $("#email_modelbox").fadeOut(300);
            $("#share_doc_modelbox").fadeOut(300);
          } else {
            $("#share_doc_modelbox").fadeIn(300);
          }
        })
        .catch((error) => {
          swal({
            title: "Share Failed",
            text: "An error occurred while sharing users.",
            icon: "error",
          });
        });
      console.log(docIds);
    } else {
      swal({
        title: "No Users Selected",
        text: "Please select at least one user to share.",
        icon: "warning",
      });
    }
  };
  const [email_share, set_email_share] = useState("");
  const [copyText, setCopyText] = useState("");
  const [file, setFile] = useState("");
  const [isAllowShare, setIsAllowShare] = useState(0);
  const [file2, setFile2] = useState(null);
  const handleCopyClick = () => {
    const textToCopy =
      global.localPath + "share/" + docIds[0] + "?share=resume";
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
      const links = docIds.map(
        (docId) => global.localPath + "share/" + docId + "?share=resume"
      );
      if (links.length > 0) {
        const article = {
          links: links,
          email: email_share,
          type: "resume",
        };
        console.log("article", article);
        const headers = {
          Authorization: "Bearer " + user?.token,
          "Access-Control-Allow-Origin": "*",
        };
        axios
          .post(global.baseurl + "/admin/share-cvs", article, { headers })
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
      } else {
        $("#email_loader").css("display", "none");
        $("#email_button").css("display", "flex");
        $("#email_modelbox").fadeOut(300);
        swal("Error!", "There is no CV on selected users", "error");
      }
    }
  };
  const download_email = () => {
    $("#email_modelbox").fadeIn(300);
    $("#share_doc_modelbox").fadeOut(300);
  };

  const download_email_close = () => {
    $("#download_email_modelbox").fadeOut(300);
  };

  const share_doc = async () => { };
  // const share_doc = async () => {
  //   $("#share_doc_modelbox").fadeIn(300);
  //   const links = docIds.map(
  //     (docId) => global.localPath + "share/" + docId + "?share=resume"
  //   );
  //   setFile(links);
  //   console.log("all links", links);
  //   // console.log(
  //   //   global.localPath + "share/" + my_resumes.id + "?share=coverletter"
  //   // );
  //   //http://localhost:3000/demo/share/my_resumes.id?share=resume
  //   //console.log(file2);
  // };
  const share_doc_close = () => {
    $("#share_doc_modelbox").fadeOut(300);
  };
  const filteredUsers = users.filter((user) => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchTermLowerCase) ||
      user.email.toLowerCase().includes(searchTermLowerCase) ||
      (user.job_position &&
        user.job_position.toLowerCase().includes(searchTermLowerCase)) ||
      (user.country && user.country.toLowerCase().includes(searchTermLowerCase))
    );
  });

  return (
    <>
      <section className="">
        <div id="main_contents" className="w-full">
          <div className="">
            <div className="flex justify-between items-center flex-wrap mt-[5%]">
              <div className="flex items-center justify-center bg-[#f4f2f3] rounded-full">
                <div className="flex items-center justify-center bg-[#f4f2f3] rounded-full">
                  <Link
                    to="create"
                    className={`font_1 bg-[#0072b1] text-white rounded-full px-6 py-3 text-lg ${userPermissions.includes("user-create")
                      ? "flex"
                      : "hidden"
                      }`}
                  >
                    CREATE USER
                  </Link>
                  <div className="flex items-center justify-center text-[#959492] font_1 text-md px-4">
                    <input
                      type="text"
                      id="search"
                      onKeyUp={(e) => handleKeyUp(e)}
                      className="bg-[#f4f2f3] outline-none border-r-2 border-[#e1dfe0] py-4"
                      placeholder="Search"
                    />
                    <BiSearch className="mx-4" size={24} />
                  </div>
                </div>
              </div>
              {selectedUsers.length > 0 && (
                <div className="flex justify-center">
                  <button
                    className="font_1 bg-[#0072b1] hover:bg-black text-white rounded-full px-6 py-3 text-lg"
                    onClick={handleShare}
                  >
                    Share
                  </button>
                </div>
              )}
              <div className="flex items-center justify-center bg-[#f4f2f3] rounded-full px-6 py-3">
                <div className="text-[#959492] font_3 text-md px-4 border-r-2 border-[#e1dfe0]">
                  Home
                </div>
                <div className="flex items-center justify-center text-[#959492] font_3 text-md px-4">
                  All Users
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start flex-wrap mt-10 w-[150%] lg:w-full">
              <div className="font_2 text-xl py-8 px-12 bg-[#0072b1] text-white rounded-t-lg w-full">
                {"Users"}
              </div>
              <div className="bg-[#f4f2f3] py-8 px-4 w-full">
                {isLoading ? (
                  <div>
                    <Skeleton className="w-full p-4 mb-2" />
                    <Skeleton className="w-full p-2 mb-2" />
                    <Skeleton className="w-full p-2 mb-2" />
                    <Skeleton className="w-full p-2 mb-2" />
                    <Skeleton className="w-full p-2 mb-2" />
                  </div>
                ) : (
                  <table className="table-auto w-full text-center text-[#959492] text-md">
                    <thead>
                      <tr>
                        <th></th>
                        <th>SN</th>
                        <th>Name</th>
                        <th>Country</th>
                        <th>Job Position</th>
                        <th>Email</th>
                        <th>Verified</th>
                        <th>Childs</th>
                        <th>Status</th>
                        <th>Verify</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white rounded-xl">
                      {filteredUsers
                        .slice(pageOffset, pageLimit)
                        .map((user, indexUser) => (
                          <tr key={indexUser} className="h-[50px]">
                            <td>
                              <input
                                type="checkbox"
                                checked={selectedUsers.includes(user.id)}
                                onChange={() => handleCheckboxChange(user.id)}
                              />
                            </td>
                            <td className="w-[10%]">
                              {(currentPage - 1) * 30 + indexUser + 1}
                            </td>
                            <td>{user.name}</td>
                            <td>{user.country}</td>
                            <td>{user.job_position}</td>
                            <td>{user.email}</td>
                            <td>{formattedDate(user.email_verified_at)}</td>
                            <td>{user.childs_count}</td>
                            <td>
                              <div className="text-2xl flex justify-center items-center h-full">
                                {user.status ? <FcCheckmark /> : <FcCancel />}
                              </div>
                            </td>
                            <td>
                              <div className="text-2xl flex justify-center items-center h-full">
                                {user.email_verified_at ? (
                                  <FcCheckmark />
                                ) : (
                                  <FaTimes className="text-red-500" />
                                )}
                              </div>
                            </td>
                            <td>
                              <div className="w-full flex justify-center items-center gap-4">
                                {/* Edit */}
                                <Link
                                  to="eidt"
                                  title="Edit"
                                  state={{ user_id: user.id }}
                                  className={`${userPermissions.includes("user-edit")
                                    ? "flex"
                                    : "hidden"
                                    }`}
                                >
                                  <MdOutlineModeEdit className="text-primary text-2xl" />
                                </Link>
                                {/* Show */}
                                <Link
                                  to="show-user"
                                  state={{ user_id: user.id }}
                                  title="Show"
                                >
                                  <FaEye className="text-primary text-2xl" />
                                </Link>
                                {/* Delete */}
                                <Link
                                  to="#"
                                  title="Delete"
                                  className={`${userPermissions.includes("user-delete")
                                    ? "flex"
                                    : "hidden"
                                    }`}
                                >
                                  <MdDelete
                                    className="text-primary text-2xl"
                                    onClick={() => handleDeleteUser(user.id)}
                                  />
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}
              </div>

              <div className="w-full flex justify-end items-center text-[#0072b1] text-2xl py-4 cursor-pointer ">
                {currentPage > 1 && (
                  <BiLeftArrowAlt
                    size={26}
                    className="custom-arrow prev-arrow hover:scale-125"
                    onClick={() => pageBack()}
                  />
                )}

                {pageTotal.map((pageNumber, index) => (
                  <div
                    className={`font_3 text-slate-400 hover:text-[#0072b1] mx-2 hover:scale-125 page ${currentPage === pageNumber ? "page_active" : ""
                      }`}
                    id={"page" + pageNumber}
                    key={index}
                    onClick={() => page(pageNumber)}
                  >
                    {pageNumber}
                  </div>
                ))}
                {currentPage < pageTotal.length && (
                  <BiRightArrowAlt
                    size={26}
                    className="custom-arrow next-arrow hover:scale-125"
                    onClick={() => pageNext()}
                  />
                )}
              </div>

              {/* Conditional rendering for Share button */}
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
          <div className="shadow-2xl relative bg-[rgba(255,255,255,1)] w-[95%] lg:w-[70%] xl:w-[40%] p-10 m-auto mt-[30%] lg:mt-[10%] border-[4px] border-[#0072b1] rounded-[30px]">
            <BiX
              onClick={() => share_doc_close()}
              className="absolute right-10 hover:text-red-500 hover:rotate-90 transition-all duration-300 cursor-pointer"
              size={40}
            />
            <h1 className="font-lexend text-slate-900 text-xl w-full mt-2 font-bold">
              Share Resume
            </h1>

            <div className="flex flex-wrap justify-center items-start mt-10">
              {/* <button
                className="hover:text-[#01B2AC]"
                onClick={handleCopyClick}
              >
                <HiClipboardCheck
                  className="mx-1"
                  size={window.innerWidth <= 440 ? 32 : 60}
                />
              </button> */}
              {/* Facebook Share Button */}
              {/* <FacebookShareButton
                className="hover:text-[#01B2AC]"
                url={file}
                quote={"Check Link"}
              >
                <FacebookIcon
                  size={window.innerWidth <= 440 ? 32 : 60}
                  className="mx-1"
                />
              </FacebookShareButton> */}

              {/* Whatsapp Share Button */}
              {/* <WhatsappShareButton
                className="hover:text-[#01B2AC]"
                url={copyText1}
                title={copyText1}
              >
                <WhatsappIcon
                  size={window.innerWidth <= 440 ? 32 : 60}
                  className="mx-1"
                />
              </WhatsappShareButton> */}
              <div>
                {/* {/ Whatsapp Share Button /} */}
                <WhatsappShareButton
                  className="hover:text-[#01B2AC]"
                  url="check this now" // Placeholder URL
                  title={copyText1}
                >
                  <WhatsappIcon
                    size={window.innerWidth <= 440 ? 32 : 60}
                    className="mx-1"
                  />
                </WhatsappShareButton>

                <button onClick={share_doc}></button>
              </div>

              {/* LinkedIn Share Button */}
              {/* <LinkedinShareButton
                className="hover:text-[#01B2AC]"
                url={file}
                title={"Check Link"}
              >
                <LinkedinIcon
                  size={window.innerWidth <= 440 ? 32 : 60}
                  className="mx-1"
                />
              </LinkedinShareButton> */}

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
      </section>
    </>
  );
};

export default Admins;
