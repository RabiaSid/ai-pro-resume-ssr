import React, { useEffect, useState } from "react";
import { BiSearch, BiRightArrowAlt, BiLeftArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { ApiService } from "../../services/ApiService";
import LoadingSpiner from "../../components/LoadingSpinner";
import { useAuth } from "../../services/Auth";
import TableListing from "../../components/TableListing";

const CareerListing = () => {
  const [jobs, setJobs] = useState([]);
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

  const loadPageData = () => {
    ApiService.getAllCareerJobs(user?.token)
      .then((response) => {
        setJobs(response.data.data);
        updatePagination(response.data.data);
      })
      .catch((err) => console.log(err));
  };
  const updatePagination = (careerData) => {
    const pages = [];
    const page_total = Math.ceil(careerData.length / 8);
    for (let i = 1; i <= page_total; i++) {
      pages.push(i);
    }
    set_pagee_total(pages);
  };

  useEffect(() => {
    loadPageData();
  }, []);

  useEffect(() => {
    const filteredJobs = jobs.filter((job) => {
      const searchTermLowerCase = searchTerm.toLowerCase();
      return job.name.toLowerCase().includes(searchTermLowerCase);
    });
    updatePagination(filteredJobs);
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
  const handleDeleteRole = (id) => {
    swal({
      title: "Delete",
      text: "Are you sure you want to delete the vacancy permanently?",
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        setIsLoading(true);
        ApiService.deleteCareerVacancy(user?.token, id)
          .then((res) => {
            setIsLoading(false);
            loadPageData();
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

  const filteredJobs = jobs.filter((job) => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    return job.name.toLowerCase().includes(searchTermLowerCase);
  });
  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Location", accessor: "location" },
    { header: "Status", accessor: "status" },
  ];

  return (
    <>
      {isLoading && <LoadingSpiner isLoading={isLoading} />}
      <section className="">
        <div id="main_contents" className="w-full">
          <div className="">
            <div className="flex justify-between items-center flex-wrap mt-[5%]">
              {/*  */}
              <div className="flex items-center justify-center bg-[#f4f2f3] rounded-full">
                <Link
                  to="create-job"
                  className={`font_1 bg-[#0072b1] text-white rounded-full px-6 py-3 text-lg ${userPermissions.includes("career-create")
                      ? "flex"
                      : "hidden"
                    }`}
                >
                  CREATE CAREER POST
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
                  ALL JOBs
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center flex-wrap mt-10">
              <div className="font_2 text-xl py-8 px-12 bg-[#0072b1] text-white rounded-t-lg w-full">
                {"Career Jobs"}
              </div>
              <div className="bg-[#f4f2f3] py-8 px-12 w-full">
                <TableListing
                  data={filteredJobs}
                  columns={columns}
                  searchTerm={searchTerm}
                  pageOffset={pagee_offset}
                  pageLimit={pagee_limit}
                  userPermissions={userPermissions}
                  module="jobs"
                  handleDeleteItem={handleDeleteRole}
                  handleEditItem={true}
                  handleShowItem={false}
                  editLink="show_job"
                  idKey="id"
                  editPermissionKey="career-edit"
                  stateKey="job_id"
                  startSerialNumber={1 + pagee_offset}
                />
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
                    className={`font_3 text-slate-400 hover:text-[#0072b1] mx-2 hover:scale-125 page ${cp === pageNumber ? "page_active" : ""
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

export default CareerListing;
