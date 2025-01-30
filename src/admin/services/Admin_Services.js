import React, { useEffect, useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { BiSearch, BiRightArrowAlt, BiLeftArrowAlt } from "react-icons/bi";
import swal from "sweetalert";
import { ApiService } from "../../services/ApiService";
// Icons
import { MdOutlineModeEdit, MdDelete } from "react-icons/md";
import { useAuth } from "../../services/Auth";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const Admin_Services = ({ }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  // Refs

  // States
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagee_offset, set_pagee_offset] = useState(0);
  const [pagee_limit, set_pagee_limit] = useState(8);
  const [pagee_total, set_pagee_total] = useState([]);
  const [cp, set_cp] = useState(1);

  const RegetDataOfPage = () => {
    var pages = [];
    var chk_page = 0;
    setIsLoading(true);

    ApiService.getAllAdminServies(user?.token)
      .then((res) => {
        setServices(res.data.data.services);
        setIsLoading(false);
        const page_total = res.data.data.length / 8;
        const page_without_float = parseInt(res.data.data.length / 8).toFixed(
          0
        );
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
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const handleKeyUp = (event) => {
    // Update the state with the input valuea
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    var pages = [];
    var chk_page = 0;

    ApiService.getAllAdminServies(user?.token)
      .then((res) => {
        setServices(res.data.data.services);

        const page_total = res.data.data.length / 8;
        const page_without_float = parseInt(res.data.data.length / 8).toFixed(
          0
        );
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
  }, []);

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

  const page_back = (p) => {
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

  const page_next = (p) => {
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

  // Delete Service
  const handleDeleteService = (id) => {
    swal({
      title: "Delete!",
      text: "Are You Sure Want to Delete",
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        ApiService.deleteService(user?.token, id)
          .then((res) => {
            swal("Deleted!", res.data.message, "success")
              .then(() => RegetDataOfPage())
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      } else {
        // Handle the case where the user canceled the delete operation
        console.log("Delete operation canceled");
      }
    });
  };

  return (
    <>
      <section className="">
        <div id="main_contents" className="w-full">
          <div className="">
            {/* Top Section */}
            <div className="flex justify-between items-center flex-wrap mt-[5%]">
              <div className="flex items-center justify-center bg-[#f4f2f3] rounded-full">
                <Link
                  to={"service-add"}
                  className="font_1 bg-[#0072b1] text-white rounded-full px-6 py-3 text-lg"
                // onClick={() => setAddServiceModal(true)}
                >
                  ADD SERVICES
                </Link>
                <div className="flex items-center justify-center text-[#959492] font_1 text-md px-4">
                  <input
                    type="text"
                    id="search"
                    onKeyUp={handleKeyUp}
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
                  All Services
                </div>
              </div>
            </div>
            {/*    */}
            <div className="flex justify-between items-center flex-wrap mt-10">
              <div className="font_2 text-lg py-4 px-6 bg-[#0072b1] text-white rounded-t-lg w-full">
                {"DISPLAYING 15 OF 24 SERVICE(S)."}
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
                        <th>Title</th>
                        <th>Price</th>
                        <th>Discounted Price</th>
                        <th>Updated</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white rounded-xl">
                      {services
                        .filter((services) =>
                          services.name.includes(searchTerm)
                        )
                        .slice(pagee_offset, pagee_limit)
                        .map((services, index_services) => (
                          <tr key={index_services}>
                            <td>{(cp - 1) * 8 + index_services + 1}</td>
                            <td>{services.name}</td>
                            <td>{services.slug}</td>
                            <td>${services.price}</td>
                            <td>${services.discounted_price}</td>

                            <td>
                              {new Date(services.updated_at).toLocaleString(
                                undefined,
                                {
                                  year: "2-digit",
                                  month: "numeric",
                                  day: "numeric",
                                  hour: "numeric",
                                  minute: "numeric",
                                  second: "numeric",
                                }
                              )}
                            </td>
                            <td>
                              <div className="flex gap-1 items-center text-primary">
                                <Link
                                  to={"service-update"}
                                  state={{ service_id: services.id }}
                                >
                                  <MdOutlineModeEdit
                                    title="Edit"
                                    className="text-xl cursor-pointer"
                                  />
                                </Link>
                                <MdDelete
                                  title="Delete"
                                  className="text-2xl cursor-pointer"
                                  onClick={() =>
                                    handleDeleteService(services.id)
                                  }
                                />
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

export default Admin_Services;
