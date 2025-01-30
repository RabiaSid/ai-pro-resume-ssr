import React, { useEffect, useState } from "react";
import { BiSearch, BiRightArrowAlt, BiLeftArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { ApiService } from "../../services/ApiService";
import { FaEye } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { useAuth } from "../../services/Auth";
import Skeleton from "react-loading-skeleton";

const UserServiceListing = () => {
  const [userServices, setUserServices] = useState([]);
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

  const loadData = () => {
    ApiService.getAllUserServices(user?.token)
      .then((response) => {
        console.log(response.data.data.user_services);
        setUserServices(response.data.data.user_services);
        updatePagination(response.data.data.user_services);
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
    loadData();
  }, []);

  useEffect(() => {
    const filteredUsersServices = userServices.filter((user) => {
      const searchTermLowerCase = searchTerm.toLowerCase();
      return (
        user.user_name.toLowerCase().includes(searchTermLowerCase) ||
        user.service_name.toLowerCase().includes(searchTermLowerCase)
      );
    });
    updatePagination(filteredUsersServices);
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

  const filteredUsersServices = userServices.filter((user) => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    return (
      user.user_name.toLowerCase().includes(searchTermLowerCase) ||
      user.service_name.toLowerCase().includes(searchTermLowerCase)
    );
  });

  return (
    <>
      <section className="">
        <div id="main_contents" className="w-full">
          <div className="">
            <div className="flex justify-between items-center flex-wrap mt-[5%]">
              <div className="flex items-center justify-center bg-[#f4f2f3] rounded-full">
                <div className="flex items-center justify-center text-[#959492] font_1 text-md h-14 px-4">
                  <input
                    type="text"
                    id="search"
                    onKeyUp={(e) => handleKeyUp(e)}
                    className="bg-[#f4f2f3] outline-none border-r-2 border-[#e1dfe0]"
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
                  All User Services
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start flex-wrap mt-10 w-[250%] lg:w-full">
              <div className="font_2 text-xl py-8 px-12 bg-[#0072b1] text-white rounded-t-lg w-full">
                {"User Services"}
              </div>
              <div className="bg-[#f4f2f3] py-8 px-4 w-full">
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
                        <th>User Name</th>
                        <th>Service Name</th>
                        <th>Delivery</th>
                        <th>Price</th>
                        <th>Expected Date</th>
                        <th>Revision Status</th>
                        <th>Applied Revisions</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white rounded-xl">
                      {filteredUsersServices

                        .slice(pagee_offset, pagee_limit)
                        .map((userServices, index_userServices) => (
                          <tr key={index_userServices}>
                            <td className="w-[10%]">
                              {(cp - 1) * 8 + index_userServices + 1}
                            </td>
                            <td>{userServices.user_name}</td>
                            <td>{userServices.service_name}</td>
                            <td>{userServices.delievered}</td>
                            <td>{userServices.price}</td>
                            <td>{userServices.expected_date}</td>
                            <td>
                              {userServices.is_revision === 0 ? "No" : "Yes"}
                            </td>
                            <td>
                              {userServices?.revisions.length === 1
                                ? "1 / 2"
                                : userServices?.revisions.length === 2
                                  ? "2 / 2"
                                  : `${userServices?.revisions.length} / 2`}
                            </td>

                            <td>
                              <div className="w-full flex justify-center items-center gap-4">
                                <Link
                                  to="show-user-services"
                                  state={{ userServices_id: userServices.id }}
                                  title="Show"
                                >
                                  <FaEye className="text-primary text-2xl" />
                                </Link>

                                <Link
                                  to="update-user-services"
                                  title="Edit"
                                  state={{ userServices_id: userServices.id }}
                                  className={`${userPermissions.includes(
                                    "user-service-edit"
                                  )
                                    ? "flex"
                                    : "hidden"
                                    }`}
                                >
                                  <MdOutlineModeEdit className="text-primary text-2xl" />
                                </Link>
                                {/*  */}
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}
              </div>

              <div className="w-full flex justify-center items-center text-[#0072b1] text-2xl py-4 cursor-pointer ">
                {cp > 1 && (
                  <BiLeftArrowAlt
                    size={26}
                    className="custom-arrow prev-arrow hover:scale-125"
                    onClick={() => page_back()}
                  />
                )}

                {/* Pagination Logic */}
                {pagee_total.length > 5 ? (
                  <>
                    {/* Show the first page */}
                    {cp > 3 && (
                      <>
                        <div
                          className={`font_3 text-slate-400 hover:text-[#0072b1] mx-2 hover:scale-125 page ${cp === 1 ? "page_active" : ""
                            }`}
                          id="page1"
                          onClick={() => page(1)}
                        >
                          1
                        </div>
                        {cp > 4 && <span className="mx-2">...</span>}
                      </>
                    )}

                    {/* Show the middle pages */}
                    {pagee_total
                      .filter(
                        (pageNumber) =>
                          pageNumber >= cp - 2 && pageNumber <= cp + 2 // Show 2 pages before and after the current page
                      )
                      .map((pageNumber, index) => (
                        <div
                          key={index}
                          className={`font_3 text-slate-400 hover:text-[#0072b1] mx-2 hover:scale-125 page ${cp === pageNumber ? "page_active" : ""
                            }`}
                          id={"page" + pageNumber}
                          onClick={() => page(pageNumber)}
                        >
                          {pageNumber}
                        </div>
                      ))}

                    {/* Show the last page */}
                    {cp < pagee_total.length - 2 && (
                      <>
                        {cp < pagee_total.length - 3 && (
                          <span className="mx-2">...</span>
                        )}
                        <div
                          className={`font_3 text-slate-400 hover:text-[#0072b1] mx-2 hover:scale-125 page ${cp === pagee_total.length ? "page_active" : ""
                            }`}
                          id={"page" + pagee_total.length}
                          onClick={() => page(pagee_total.length)}
                        >
                          {pagee_total.length}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  /* If total pages are <= 5, show all */
                  pagee_total.map((pageNumber, index) => (
                    <div
                      key={index}
                      className={`font_3 text-slate-400 hover:text-[#0072b1] mx-2 hover:scale-125 page ${cp === pageNumber ? "page_active" : ""
                        }`}
                      id={"page" + pageNumber}
                      onClick={() => page(pageNumber)}
                    >
                      {pageNumber}
                    </div>
                  ))
                )}

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

export default UserServiceListing;
