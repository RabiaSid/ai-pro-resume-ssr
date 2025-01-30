import React, { useEffect, useState } from "react";
import { BiSearch, BiRightArrowAlt, BiLeftArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { ApiService } from "../../../services/ApiService";
import { MdOutlineModeEdit, MdDelete } from "react-icons/md";
import ToggleSwitch from "../../../components/ToggleSwitch";
import { useAuth } from "../../../services/Auth";
import Skeleton from "react-loading-skeleton";
import { IoMdEye } from "react-icons/io";

const FaqsListing = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [partners, setPartners] = useState([]);
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

    ApiService.getAllFaqs(user?.token)
      .then((response) => {
        console.log(response.data.data);
        setPartners(response.data.data);
        const page_total = response.data.data.length / 8;
        const page_without_float = parseInt(
          response.data.data.length / 8
        ).toFixed(0);
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

  const page = (p) => {
    set_cp(p);
    set_pagee_offset(p * 8 - 8);
    set_pagee_limit(p * 8);
    const elementsByClass = document.getElementsByClassName("page");
    for (var i = 0; i < elementsByClass.length; i++) {
      elementsByClass[i].classList.remove("page_active");
    }
    const element = document.getElementById("page" + p);
    element.classList.add("page_active");
  };

  const page_back = () => {
    set_pagee_offset(parseInt(cp - 1) * 8 - 8);
    set_pagee_limit(parseInt(cp - 1) * 8);
    const elementsByClass = document.getElementsByClassName("page");
    for (var i = 0; i < elementsByClass.length; i++) {
      elementsByClass[i].classList.remove("page_active");
    }
    const element = document.getElementById("page" + parseInt(cp - 1));
    element.classList.add("page_active");
    set_cp(cp - 1);
  };

  const page_next = () => {
    set_pagee_offset(parseInt(cp + 1) * 8 - 8);
    set_pagee_limit(parseInt(cp + 1) * 8);
    const elementsByClass = document.getElementsByClassName("page");
    for (var i = 0; i < elementsByClass.length; i++) {
      elementsByClass[i].classList.remove("page_active");
    }
    const element = document.getElementById("page" + parseInt(cp + 1));
    element.classList.add("page_active");
    set_cp(cp + 1);
  };

  const handleDeleteFaq = (id) => {
    swal({
      title: "Delete",
      text: "Are you sure you want to delete the FAQ permanently?",
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        setIsLoading(true);
        ApiService.deleteFaq(user?.token, id)
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
      }
    });
  };

  const handleChangeStatusOnApi = (status, id, question, answer, sort) => {
    setIsLoading(true);
    let data = {
      id: id,
      question: question,
      answer: answer,
      sort: sort,
      status: status ? 1 : 0,
    };

    ApiService.updateFaq(user?.token, data)
      .then((res) => {
        setIsLoading(false);
        swal({
          title: "Congratulation",
          text: "Status has been changed",
          icon: "success",
        });
        LoadPageData();
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
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
  return (
    <>
      <section className="w-full px-4">
        <div id="main_contents" className="w-full">
          <div className="">
            <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start flex-wrap mt-5">
              {/*  */}
              <div className="flex items-center justify-center bg-[#f4f2f3] rounded-full">
                <Link
                  to="create-faq"
                  className={`font_1 bg-[#0072b1] text-white rounded-full px-6 py-3 text-lg ${userPermissions.includes("faq-create") ? "flex" : "hidden"
                    }`}
                >
                  CREATE FAQ
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
              {/*  */}
              <div className="flex items-center justify-center bg-[#f4f2f3] rounded-full px-6 py-3">
                <div className="text-[#959492] font_3 text-md px-4 border-r-2 border-[#e1dfe0]">
                  Home
                </div>
                <div className="flex items-center justify-center text-[#959492] font_3 text-md px-4">
                  All FAQS
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start flex-wrap mt-10">
              <div className="font_2 text-xl py-8 px-12 bg-[#0072b1] text-white rounded-t-lg w-full">
                {"FAQS Listing"}
              </div>
              <div className="bg-[#f4f2f3] py-8 px-12 w-full overflow-x-auto">
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
                  <table className="table-auto w-full text-center text-[#959492] text-md">
                    <thead>
                      <tr>
                        <th>SN</th>
                        <th>Page</th>
                        <th>Question</th>
                        {/* <th>Answer</th> */}
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white rounded-xl">
                      {partners
                        .filter((faq) =>
                          faq.question
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        )
                        .slice(pagee_offset, pagee_limit)
                        .map((faq, index_user) => (
                          <tr key={index_user} className="h-[100px]">
                            <td className="w-[10%]">{index_user + 1}</td>
                            <td className="w-[15%]">{faq.page}</td>
                            <td className="m-auto">
                              <div className="m-auto ">{faq.question}</div>
                            </td>
                            {/* <td>
                              <div
                                className="truncate w-[250px] m-auto"
                                dangerouslySetInnerHTML={{ __html: faq.answer }}
                              ></div>
                            </td> */}
                            <td>
                              <ToggleSwitch
                                status={faq.status}
                                ChangeStatus={(val) =>
                                  handleChangeStatusOnApi(
                                    val,
                                    faq.id,
                                    faq.question,
                                    faq.answer,
                                    faq.sort
                                  )
                                }
                              />
                            </td>

                            <td>
                              <div className="w-full flex justify-center items-center gap-4">
                                <Link
                                  to="show-faq"
                                  title="Edit"
                                  state={{ faq_id: faq.id }}
                                  className={`text-primary text-2xl cursor-pointer ${userPermissions.includes("faq-edit")
                                    ? "flex"
                                    : "hidden"
                                    }`}
                                >
                                  <MdOutlineModeEdit />
                                </Link>

                                <Link
                                  to="view-faq"
                                  title="View"
                                  state={{ faq_id: faq.id }}
                                  className={`text-primary text-2xl cursor-pointer`}
                                >
                                  <IoMdEye />
                                </Link>

                                <MdDelete
                                  className={`text-primary text-2xl cursor-pointer ${userPermissions.includes("faq-delete")
                                    ? "flex"
                                    : "hidden"
                                    }`}
                                  onClick={() => handleDeleteFaq(faq.id)}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}
              </div>

              <div className="w-full flex justify-end items-center text-[#0072b1] text-2xl py-4 cursor-pointer">
                {cp > 1 && (
                  <BiLeftArrowAlt
                    size={26}
                    className="custom-arrow prev-arrow hover:scale-125"
                    onClick={() => page_back()}
                  />
                )}

                {pagee_total.map((pagee_total, index_pagee_total) => (
                  <div
                    className="font_3 text-slate-400 hover:text-[#0072b1] mx-2 hover:scale-125 page cursor-pointer"
                    id={"page" + pagee_total}
                    key={index_pagee_total}
                    onClick={() => page(pagee_total)}
                  >
                    {pagee_total}
                  </div>
                ))}

                {cp < pagee_total.length && (
                  <BiRightArrowAlt
                    size={26}
                    className="custom-arrow next-arrow hover:scale-125"
                    onClick={() => page_next()}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FaqsListing;
