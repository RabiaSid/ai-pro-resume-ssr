import React, { useEffect, useState } from "react";
import { BiSearch, BiRightArrowAlt, BiLeftArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { ApiService } from "../../services/ApiService";
import { FaEye } from "react-icons/fa";
import { useAuth } from "../../services/Auth";
import Skeleton from "react-loading-skeleton";
const Job_Listing = () => {
  const { user } = useAuth();
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagee_offset, set_pagee_offset] = useState(0);
  const [pagee_limit, set_pagee_limit] = useState(8);
  const [pagee_total, set_pagee_total] = useState([]);
  const [cp, set_cp] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleKeyUp = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    ApiService.getAllAppliedJobs(user?.token)
      .then((response) => {
        setAppliedJobs(response.data.data);
        updatePagination(response.data.data);
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
    const filteredUsers = appliedJobs.filter((appliedJobs) => {
      const searchTermLowerCase = searchTerm.toLowerCase();
      return appliedJobs.first_name.toLowerCase().includes(searchTermLowerCase);
    });
    updatePagination(filteredUsers);
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

  //   const handleDelete = (id) => {
  //     swal({
  //       title: "Delete",
  //       text: "Are you sure you want to delete the Admin permanently?",
  //       icon: "warning",
  //       dangerMode: true,
  //       buttons: true,
  //     }).then((willDelete) => {
  //       if (willDelete) {
  //         ApiService.deleteAdmin(token, id)
  //           .then((res) => {
  //             swal({
  //               title: "Congratulations",
  //               text: res.data.message,
  //               icon: "success",
  //             });
  //             loadData();
  //           })
  //           .then((err) => console.log(err));
  //       }
  //     });
  //   };

  const formattedDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-indexed
    const year = date.getFullYear();

    // Pad day and month with leading zero if necessary
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}-${formattedMonth}-${year}`;
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

  const filteredUsers = appliedJobs.filter((user) => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    return user.first_name.toLowerCase().includes(searchTermLowerCase);
  });

  return (
    <>
      <section className="">
        <div id="main_contents" className="w-full">
          <div className="">
            <div className="flex justify-between items-center flex-wrap mt-[5%]">
              {/* Role Updated */}
              <div className="flex items-center justify-center bg-[#f4f2f3] rounded-full">
                {/* <Link
                  to="create-admin"
                  className={`font_1 bg-[#0072b1] text-white rounded-full px-6 py-3 text-lg ${
                    userPermissions.includes("admin-create") ? "flex" : "hidden"
                  }`}
                >
                  CREATE ADMIN
                </Link> */}
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
                  All Applied Users
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start flex-wrap mt-10 w-[250%] lg:w-full">
              <div className="font_2 text-xl py-8 px-12 bg-[#0072b1] text-white rounded-t-lg w-full">
                {"Applied Jobs"}
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
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Job Title</th>
                        <th>Email</th>

                        <th>Phone</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white rounded-xl">
                      {filteredUsers
                        .slice(pagee_offset, pagee_limit)
                        .map((appliedJobs, index_user) => (
                          <tr key={index_user}>
                            <td className="w-[10%]">
                              {(cp - 1) * 8 + index_user + 1}
                            </td>
                            <td>{appliedJobs.first_name}</td>
                            <td>{appliedJobs.last_name}</td>
                            <td>{appliedJobs?.job?.title}</td>
                            <td>{appliedJobs.email}</td>
                            <td>{appliedJobs.phone}</td>

                            <td>
                              <div className="w-full flex justify-center items-center gap-4">
                                <Link
                                  to="show-job-listing"
                                  state={{ appliedJobs_id: appliedJobs.id }}
                                  title="Show"
                                >
                                  <FaEye className="text-primary text-2xl" />
                                </Link>
                                {/*  */}
                                {/* <Link
                                to="update-admin"
                                title="Edit"
                                state={{ user_id: user.id }}
                                className={`${
                                  userPermissions.includes("admin-edit")
                                    ? "flex"
                                    : "hidden"
                                }`}
                              >
                                <MdOutlineModeEdit className="text-primary text-2xl" />
                              </Link>
                              {/*  */}
                                {/* <Link
                                to="#"
                                title="Delete"
                                className={`${
                                  userPermissions.includes("admin-delete")
                                    ? "flex"
                                    : "hidden"
                                }`}
                              >
                                <MdDelete
                                  className="text-primary text-2xl"
                                  onClick={() => handleDeleteAdmin(user.id)}
                                />
                              </Link> */}
                              </div>
                            </td>
                          </tr>
                        ))}
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

export default Job_Listing;
