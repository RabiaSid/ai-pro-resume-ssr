import React, { useEffect, useState } from "react";
import { BiSearch, BiRightArrowAlt, BiLeftArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { ApiService } from "../../services/ApiService";
import { MdOutlineModeEdit, MdDelete } from "react-icons/md";
import { useAuth } from "../../services/Auth";
import Skeleton from "react-loading-skeleton";

const InterstedUserListing = () => {
  const [interstedUser, setinterstedUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagee_offset, set_pagee_offset] = useState(0);
  const [pagee_limit, set_pagee_limit] = useState(8);
  const [pagee_total, set_pagee_total] = useState([]);
  const [cp, set_cp] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const { userPermissions, user } = useAuth();

  const handleKeyUp = (event) => {
    // Update the state with the input valuea
    setSearchTerm(event.target.value);
  };

  const RegetDataOfPage = () => {
    ApiService.getAllInterstedUsers(user?.token)
      .then((response) => {
        setinterstedUser(response.data.data);
        console.log(response.data.data);
        updatePagination(response.data.data);
      })
      .catch((err) => console.log(err));
  };
  const updatePagination = (packageData) => {
    const pages = [];
    const page_total = Math.ceil(packageData.length / 8);
    for (let i = 1; i <= page_total; i++) {
      pages.push(i);
    }
    set_pagee_total(pages);
  };
  useEffect(() => {
    RegetDataOfPage();
  }, []);
  useEffect(() => {
    const filteredPack = interstedUser.filter((pack) => {
      const searchTermLowerCase = searchTerm.toLowerCase();
      return pack?.user?.name.toLowerCase().includes(searchTermLowerCase);
    });
    updatePagination(filteredPack);
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

  const filteredPack = interstedUser.filter((pack) => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    return pack?.user?.name.toLowerCase().includes(searchTermLowerCase);
  });
  return (
    <>
      <section className="">
        <div id="main_contents" className="w-full">
          <div className="">
            <div className="flex justify-between items-center flex-wrap mt-[5%]">
              {/*  */}
              <div className="flex items-center justify-center bg-[#f4f2f3] rounded-full">
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
                  All interstedUser
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center flex-wrap mt-10">
              <div className="font_2 text-xl py-8 px-12 bg-[#0072b1] text-white rounded-t-lg w-full">
                {"interstedUser"}
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
                        <th>Name</th>
                        <th>Email</th>
                        <th>Email Sent</th>
                        <th>Created At</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white rounded-xl">
                      {filteredPack
                        .slice(pagee_offset, pagee_limit)
                        .map((interstedUser, index_interstedUser) => (
                          <tr key={index_interstedUser}>
                            <td className="w-[10%]">
                              {(cp - 1) * 8 + index_interstedUser + 1}
                            </td>
                            <td>{interstedUser.user.name}</td>
                            <td>{interstedUser.user.email}</td>
                            <td>{interstedUser.email_sent ? "yes" : "no"}</td>
                            <td>
                              {new Date(
                                interstedUser.created_at
                              ).toLocaleString(undefined, {
                                year: "2-digit",
                                month: "numeric",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                second: "numeric",
                              })}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}
              </div>

              <div className="w-full flex justify-end items-center text-[#0072b1] text-2xl py-4 cursor-pointer ">
                {cp > 1 && (
                  <BiLeftArrowAlt
                    size={26}
                    className="custom-arrow prev-arrow hover:scale-125"
                    onClick={() => page_back()}
                  />
                )}

                {pagee_total.map((pageNumber, index) => (
                  <div
                    className={`font_3 text-slate-400 hover:text-[#0072b1] mx-2 hover:scale-125 page ${
                      cp === pageNumber ? "page_active" : ""
                    }`}
                    id={"page" + pageNumber}
                    key={index}
                    onClick={() => page(pageNumber)}
                  >
                    {pageNumber}
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

export default InterstedUserListing;
