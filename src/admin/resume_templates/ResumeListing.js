import React, { useEffect, useState } from "react";
import { BiSearch, BiRightArrowAlt, BiLeftArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { ApiService } from "../../services/ApiService";
import { MdOutlineModeEdit, MdDelete } from "react-icons/md";
import { useAuth } from "../../services/Auth";
import Skeleton from "react-loading-skeleton";

const ResumeListing = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [resumeTemplates, setResumeTemplates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagee_offset, set_pagee_offset] = useState(0);
  const [pagee_limit, set_pagee_limit] = useState(8);
  const [pagee_total, set_pagee_total] = useState([]);
  const [cp, set_cp] = useState(1);

  const { userPermissions, user } = useAuth();

  const handleKeyUp = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    LoadPageData();
  }, []);
  const LoadPageData = () => {
    var pages = [];
    var chk_page = 0;

    ApiService.getAllResumeTemplates(user?.token)
      .then((response) => {
        console.log(response.data.data.templates);

        let templates = [];

        response.data.data.templates.map((temp, idx) => {
          if (temp.is_example === 0) {
            templates.push(temp);
          }
        });
        setResumeTemplates(templates);
        updatePagination(templates);
        const page_total = templates.length / 8;
        const page_without_float = parseInt(templates.length / 8).toFixed(0);
        if (Number(page_total) === Number(page_without_float)) {
          chk_page = 0;
        } else {
          chk_page = 1;
        }
        for (let i = 1; i <= page_total + chk_page; i++) {
          pages.push(i);
        }
        set_pagee_total(pages);
      })
      .catch((err) => console.log(err));
  };
  const updatePagination = (userData) => {
    const pages = [];
    const page_total = Math.ceil(userData.length / 8);
    for (let i = 1; i <= page_total; i++) {
      pages.push(i);
    }
    set_pagee_total(pages);
  };
  useEffect(() => {
    const filteredTemplates = resumeTemplates.filter((name) => {
      const searchTermLowerCase = searchTerm.toLowerCase();
      return name.name.toLowerCase().includes(searchTermLowerCase);
    });
    updatePagination(filteredTemplates);
    set_cp(1);
    set_pagee_offset(0);
    set_pagee_limit(8);
  }, [searchTerm]);

  const page = (p) => {
    set_cp(p);
    set_pagee_offset(p * 8 - 8);
    set_pagee_limit(p * 8);
  };

  const page_back = () => {
    const new_cp = cp - 1;
    set_cp(new_cp);
    set_pagee_offset(new_cp * 8 - 8);
    set_pagee_limit(new_cp * 8);
  };

  const page_next = () => {
    const new_cp = cp + 1;
    set_cp(new_cp);
    set_pagee_offset(new_cp * 8 - 8);
    set_pagee_limit(new_cp * 8);
  };

  const handleDeleteResume = (id) => {
    swal({
      title: "Delete",
      text: "Are you sure you want to delete the Resume Template permanently?",
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        setIsLoading(true);
        ApiService.deleteResume(user?.token, id)
          .then((res) => {
            setIsLoading(false);
            swal({
              title: "Congratulation",
              text: res.data.message,
              icon: "success",
            });
            LoadPageData();
          })
          .then((err) => {
            setIsLoading(false);
            console.log(err);
          });
      } else {
      }
    });
  };
  const getData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  // Call getData when the component mounts
  useEffect(() => {
    getData();
  }, []);

  const filteredTemplates = resumeTemplates.filter((data) => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    return data.name.toLowerCase().includes(searchTermLowerCase);
  });

  return (
    <>
      <section className="">
        <div id="main_contents" className="w-full">
          <div className="">
            <div className="flex justify-between items-center flex-wrap mt-[5%]">
              <div className="flex items-center justify-center bg-[#f4f2f3] rounded-full">
                <Link
                  to="create-template"
                  className={`font_1 bg-[#0072b1] text-white rounded-full px-6 py-3 text-lg ${userPermissions.includes("resume-template-create")
                    ? "flex"
                    : "hidden"
                    }`}
                >
                  CREATE TEMPLATE
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
              <div className="flex items-center justify-center bg-[#f4f2f3] rounded-full px-6 py-3">
                <div className="text-[#959492] font_3 text-md px-4 border-r-2 border-[#e1dfe0]">
                  Home
                </div>
                <div className="flex items-center justify-center text-[#959492] font_3 text-md px-4">
                  All Resumne Templates
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center flex-wrap mt-10">
              <div className="font_2 text-xl py-8 px-12 bg-[#0072b1] text-white rounded-t-lg w-full">
                {"Resume Templates Listing"}
              </div>
              <div className="bg-[#f4f2f3] py-8 px-12 w-full">
                {isLoading ? (
                  // Render skeletons for entire row if loading

                  <div>
                    <Skeleton className="w-full p-4 mb-2" />
                    <Skeleton className="w-full p-2 mb-2" />
                    <Skeleton className="w-full p-2 mb-2" />
                    <Skeleton className="w-full p-2 mb-2" />
                    <Skeleton className="w-full p-2 mb-2" />
                  </div>
                ) : (
                  <table
                    className="table-auto w-full text-center text-[#959492] text-md"
                    cellPadding={15}
                  >
                    <thead>
                      <tr>
                        <th>SN</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Free/Paid</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white rounded-xl">
                      {filteredTemplates
                        .slice(pagee_offset, pagee_limit)
                        .map((resume, index_user) => {
                          return (
                            <tr key={index_user}>
                              <td className="w-[10%]">
                                {(cp - 1) * 8 + index_user + 1}
                              </td>
                              <td>
                                <img
                                  className="w-[60px] m-auto"
                                  src={global.imageUrl + resume.image}
                                  alt=""
                                />
                              </td>
                              <td>
                                <div className="truncate w-[250px] m-auto">
                                  {resume.name}
                                </div>
                              </td>
                              <td>
                                <div className="truncate w-[250px] m-auto">
                                  {resume.is_paid ? "Paid" : "Free"}
                                </div>
                              </td>
                              <td>
                                <div className="truncate w-[250px] m-auto">
                                  {resume.price}
                                </div>
                              </td>
                              <td>{resume.status}</td>

                              <td>
                                <div className="w-full flex justify-center items-center gap-4">
                                  {/*  */}
                                  <Link
                                    to="show-template"
                                    title="Edit"
                                    state={{ resume_id: resume.id }}
                                    className={`${userPermissions.includes(
                                      "resume-template-edit"
                                    )
                                      ? "flex"
                                      : "hidden"
                                      }`}
                                  >
                                    <MdOutlineModeEdit className="text-primary text-2xl" />
                                  </Link>
                                  {/*  */}
                                  <Link
                                    to="#"
                                    title="Delete"
                                    className={`${userPermissions.includes(
                                      "resume-template-edit"
                                    )
                                      ? "flex"
                                      : "hidden"
                                      }`}
                                  >
                                    <MdDelete
                                      className="text-primary text-2xl"
                                      onClick={() =>
                                        handleDeleteResume(resume.id)
                                      }
                                    />
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                )}
              </div>

              <div className="w-full flex justify-end items-center text-[#0072b1] text-2xl py-4 cursor-pointer ">
                {cp > 1 ? (
                  <BiLeftArrowAlt
                    size={26}
                    className="custom-arrow prev-arrow hover:scale-125"
                    onClick={() => page_back()}
                  />
                ) : (
                  ""
                )}

                {pagee_total.map((pagee_total, index_pagee_total) => (
                  <div
                    className="font_3 text-slate-400 hover:text-[#0072b1] mx-2 hover:scale-125 page"
                    id={"page" + pagee_total}
                    key={index_pagee_total}
                    onClick={(p) => page(pagee_total)}
                  >
                    {pagee_total}
                  </div>
                ))}
                {cp < pagee_total.length ? (
                  <BiRightArrowAlt
                    size={26}
                    className="custom-arrow next-arrow hover:scale-125"
                    onClick={() => page_next()}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResumeListing;
