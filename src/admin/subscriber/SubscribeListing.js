import React, { useEffect, useState } from "react";
import { BiSearch, BiRightArrowAlt, BiLeftArrowAlt } from "react-icons/bi";
import swal from "sweetalert";
import { ApiService } from "../../services/ApiService";
import { useAuth } from "../../services/Auth";
import Skeleton from "react-loading-skeleton";

const SubscribeListing = () => {
  const { user } = useAuth();
  const [subscriber, setSubscriber] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagee_offset, set_pagee_offset] = useState(0);
  const [pagee_limit, set_pagee_limit] = useState(8);
  const [pagee_total, set_pagee_total] = useState([]);
  const [cp, set_cp] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleKeyUp = (event) => {
    // Update the state with the input valuea
    setSearchTerm(event.target.value);
  };

  const loadData = () => {
    ApiService.getAllSubscriber(user?.token)
      .then((response) => {
        setSubscriber(response.data.data);
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
    const filteredUsers = subscriber.filter((subscriber) => {
      const searchTermLowerCase = searchTerm.toLowerCase();
      return subscriber.email.toLowerCase().includes(searchTermLowerCase);
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

  const filteredUsers = subscriber.filter((user) => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    return user.email.toLowerCase().includes(searchTermLowerCase);
  });

  return (
    <>
      <section className="">
        <div id="main_contents" className="w-full">
          <div className="">
            <div className="flex justify-between items-center flex-wrap mt-[5%]">
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
              <div className="flex items-center justify-center bg-[#f4f2f3] rounded-full px-6 py-3">
                <div className="text-[#959492] font_3 text-md px-4 border-r-2 border-[#e1dfe0]">
                  Home
                </div>
                <div className="flex items-center justify-center text-[#959492] font_3 text-md px-4">
                  All Subscriber
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start flex-wrap mt-10 w-[150%] lg:w-full">
              <div className="font_2 text-xl py-8 px-12 bg-[#0072b1] text-white rounded-t-lg w-full">
                {"Subscriber details"}
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
                  <table className="table-auto w-full text-center text-[#959492] text-md">
                    <thead>
                      <tr>
                        <th>SN</th>
                        <th>Id</th>
                        <th>Email</th>
                        <th>Updated At</th>
                        {/* <th>Actions</th> */}
                      </tr>
                    </thead>
                    <tbody className="bg-white rounded-xl">
                      {filteredUsers
                        .slice(pagee_offset, pagee_limit)
                        .map((subscriber, index_subscriber) => (
                          <tr key={index_subscriber} className="h-[50px]">
                            <td className="w-[10%]">
                              {(cp - 1) * 8 + index_subscriber + 1}
                            </td>
                            <td>{subscriber.id}</td>
                            <td>{subscriber.email}</td>

                            <td>{formattedDate(subscriber.updated_at)}</td>
                            {/* <td> */}
                            {/* <div className="w-full flex justify-center items-center gap-4"> */}
                            {/*  */}
                            {/* <Link
                                to="update-subscriber"
                                title="Edit"
                                state={{ subscriber_id: subscriber.id }}
                              >
                                <MdOutlineModeEdit className="text-primary text-2xl" />
                              </Link> */}
                            {/*  */}
                            {/* <Link to="#" title="Edit">
                                <MdDelete
                                  className="text-primary text-2xl"
                                  onClick={() =>
                                    handleDeleteSubscriber(subscriber.id)
                                  }
                                />
                              </Link>
                            </div>
                          </td> */}
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

export default SubscribeListing;
