import React, { useEffect, useState } from "react";
import { BiSearch, BiRightArrowAlt, BiLeftArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { ApiService } from "../../services/ApiService";
import LoadingSpiner from "../../components/LoadingSpinner";
import { useAuth } from "../../services/Auth";
import TableListing from "../../components/TableListing";
import { MdDelete, MdOutlineModeEdit } from "react-icons/md";
const BlogsListing = () => {
  const [suggestions, setSuggestions] = useState([]);
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
    ApiService.getAllCoverLetterBodySuddestions(user?.token)
      .then((response) => {
        setSuggestions(response.data.data);
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
    loadData();
  }, []);

  useEffect(() => {
    const filteredUsers = suggestions.filter((suggestions) => {
      const searchTermLowerCase = searchTerm.toLowerCase();
      return suggestions.body
        .toLowerCase()
        .includes(searchTermLowerCase);
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

  const handleDeleteSuggestion = (id) => {
    swal({
      title: "Delete",
      text: "Are you sure you want to delete the Blog permanently?",
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        setIsLoading(true);
        ApiService.DeleteCoverLetterBodySuddestions(user?.token, id)
          .then((res) => {
            setIsLoading(false);

            swal({
              title: "Successful",
              text: res.data.message,
              icon: "success",
            })
              .then(() => {
                // Reload the page after the user acknowledges the success
                loadData();
              })
              .catch(() => {
                // Reload the page after the user acknowledges the success
                loadData();
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

  const columns = [
    { header: "Author Name", accessor: "author_name" },
    { header: "Name", accessor: "name" },
    { header: "Status", accessor: "status" },
  ];

  const filteredUsers = suggestions.filter((user) => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    return user.body.toLowerCase().includes(searchTermLowerCase);
  });

  return (
    <>
      {isLoading && <LoadingSpiner isLoading={isLoading} />}
      <section className="">
        <div id="main_contents" className="w-full">
          <div className="">
            <div className="flex justify-between items-center flex-wrap mt-[5%]">
              <div className="flex items-center justify-center bg-[#f4f2f3] rounded-full">
                <Link
                  to="create"
                  className={`font_1 bg-[#0072b1] text-white rounded-full px-6 py-3 text-lg ${
                    userPermissions.includes("blog-create") ? "flex" : "hidden"
                  }`}
                >
                  CREATE BODY
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
                  All Suggestions
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start flex-wrap mt-10 w-[150%] lg:w-full">
              <div className="font_2 text-xl py-8 px-12 bg-[#0072b1] text-white rounded-t-lg w-full">
                {"Suggestions"}
              </div>
              <div className="bg-[#f4f2f3] py-8 px-12 w-full">
                <table
                  className="table-auto w-full text-center text-[#959492] text-md"
                  cellPadding={15}
                >
                  <thead>
                    <tr>
                      <th>SN</th>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white rounded-xl">
                    {filteredUsers
                      .slice(pagee_offset, pagee_limit)
                      .map((sugg, index_Packages) => (
                        <tr key={index_Packages}>
                          <td className="w-[10%]">
                            {(cp - 1) * 8 + index_Packages + 1}
                          </td>
                          <td>{sugg.body}</td>

                          <td>{sugg.status ? "ON" : "OFF"}</td>
                          <td>
                            <div className="w-full flex justify-center items-center gap-4">
                              {/*  */}
                              <Link
                                to={`update`}
                                title="Edit"
                                className={`${
                                  userPermissions.includes("package-edit")
                                    ? "flex"
                                    : "hidden"
                                }`}
                                state={{ suggestion_id: sugg.id }}
                              >
                                <MdOutlineModeEdit className="text-primary text-2xl" />
                              </Link>
                              <Link
                                to="#"
                                title="Delete"
                                className={`${
                                  userPermissions.includes(
                                    "cover-example-delete"
                                  )
                                    ? "flex"
                                    : "hidden"
                                }`}
                              >
                                <MdDelete
                                  className="text-primary text-2xl"
                                  onClick={() =>
                                    handleDeleteSuggestion(sugg.id)
                                  }
                                />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
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

export default BlogsListing;
