import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ApiService } from "../../services/ApiService";
import LabelText from "../../components/LabelText";
import { BiRightArrowAlt, BiLeftArrowAlt } from "react-icons/bi";
import { useAuth } from "../../services/Auth";
import UserResumeCover from "./UserResumeCover.js";
import UserTransactionServices from "./UserTransactionsServices";
import CoverLetterShow from "./CoverLetterShow";
import TransactionUser from "./TransactionUser";

const placeholderImage = "/images/placeholder.webp";
const ShowUser = () => {

  const { user } = useAuth();
  const location = useLocation();

  const { user_id } = location.state;

  //   Value States
  const [userData, setUserData] = useState({});

  useEffect(() => {
    ApiService.getUserById(user?.token, user_id)
      .then((res) => {
        let {
          id,
          name,
          address,
          email,
          job_position,
          contact,
          country_id,
          created_at,
          current_cover_usage,
          current_res_usage,
          deleted_at,
          email_verified_at,
          end_date,
          image,
          last_login_at,
          last_login_ip,
          max_cover_templates,
          max_res_templates,
          package_id,
          package_price,
          payment_method,
          start_date,
          status,
          verify_code,
          personal_information,
          cover_letters,
          referral_link,
        } = res.data.data.user;

        const updatedUserData = {
          id,
          name,
          address,
          email,
          job_position,
          contact,
          country_id,
          created_at,
          current_cover_usage,
          current_res_usage,
          deleted_at,
          email_verified_at,
          end_date,
          image,
          last_login_at,
          last_login_ip,
          max_cover_templates,
          max_res_templates,
          package_id,
          package_price,
          payment_method,
          start_date,
          status,
          verify_code,
          personal_information,
          cover_letters,
          referral_link,
        };

        // Update the state with the new userData object
        setUserData(updatedUserData);
      })
      .catch((err) => console.log(err));
  }, []);

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

  const PackageNameFilter = (id) => {
    if (!id) {
      return "No Package";
    }
    switch (id) {
      case 1:
        return "Free";
      case 2:
        return "Most Popular";
      case 3:
        return "Premium";
      default:
        break;
    }
  };

  const [childs, setChilds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagee_offset, set_pagee_offset] = useState(0);
  const [pagee_limit, set_pagee_limit] = useState(8);
  const [pagee_total, set_pagee_total] = useState([]);
  const [cp, set_cp] = useState(1);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    var pages = [];
    var chk_page = 0;

    ApiService.getUserRefferalById(user?.token, user_id)
      .then((response) => {
        setChilds(response.data?.data[0]?.childs);
        const page_total = response.data.data[0]?.childs?.length / 8;
        const page_without_float = parseInt(
          response.data.data[0]?.childs?.length / 8
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


  console.log(childs, "childschildschilds")
  console.log(user, "useruseruser")
  console.log(childs?.referral_link, "userData?.referral_linkuserData?.referral_link")
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["All Resumes", "All Cover Letters", "Services", "Transactions"];

  return (
    <>
      <div className="p-2">
        <div className="border h-full p-4">
          {/*  */}
          <div className="py-4">
            <h1 className="text-2xl font-bold mb-2">User Details</h1>
            {/* Details */}
            <div>
              <div className="flex items-start">
                <div className="relative w-[150px] h-[150px] rounded-full border-2 mt-2">
                  <img
                    src={`${userData.image
                      ? global.imageUrl + userData.image
                      : placeholderImage
                      }`}
                    alt="user avtar"
                    className="w-full h-full rounded-full m-auto"
                  />
                </div>
                {/* user details */}
                <div className="flex flex-col gap-2 p-4 flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div>
                        <h1 className="text-primary font-bold text-2xl">
                          {userData.name}
                        </h1>
                      </div>
                      <div className="">
                        {/* Number */}
                        <div>
                          <div className="text-sm">
                            Mobile Number:{" "}
                            <span className="text-primary">
                              {userData.contact ? userData.contact : "--"}
                            </span>
                          </div>
                        </div>
                        {/* Address */}
                        <div>
                          <div className="text-sm">
                            Address:{" "}
                            <span className="text-primary">
                              {userData.address ? userData.address : "--"}
                            </span>
                          </div>
                        </div>
                        {/* Email */}
                        <div>
                          <div className="text-sm">
                            Email:{" "}
                            <span className="text-primary">
                              {userData.email ? userData.email : "--"}
                            </span>
                          </div>
                        </div>
                        {/*job-position */}
                        <div>
                          <div className="text-sm">
                            Job Positions:{" "}
                            <span className="text-primary">
                              {userData.job_position
                                ? userData.job_position
                                : "--"}
                            </span>
                          </div>
                        </div>
                        {/*referral-link */}
                        <div>
                          <div className="text-sm">
                            Referral Link:{" "}
                            <span className="text-primary">
                              {userData?.referral_link ?
                                `https://aiproresume.com/register/${userData?.referral_link}`
                                : "--"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className=" flex flex-col items-end gap-2">
                        <Link
                          to={"/resume/formatting-admin"}
                          state={{
                            isExample: false,
                            selectedTemplateId: 3,
                            user_id: user_id,
                          }}
                          className="bg-primary-blue  text-white rounded-lg p-2 font-Lexend"
                        >
                          Create a Resume
                        </Link>
                        <Link className="bg-primary-blue  text-white rounded-lg p-2 font-Lexend">
                          Create a Cover Letter
                        </Link>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="grid grid-cols-4">
                    {/* 1 */}
                    <div className="border-r px-2">
                      <h1 className="font-bold text-xl">
                        {userData.current_cover_usage}
                      </h1>
                      <span className="text-sm text-muted">
                        Paid Cover Usage
                      </span>
                    </div>
                    {/* 2 */}
                    <div className="border-r px-2">
                      <h1 className="font-bold text-xl">
                        {userData.current_res_usage}
                      </h1>
                      <span className="text-sm text-muted">
                        Paid Resume Usage
                      </span>
                    </div>
                    {/* 3 */}
                    <div className="border-r px-2">
                      <h1 className="font-bold text-xl">
                        {userData.package_id == 3
                          ? "Unlimited"
                          : userData.max_cover_templates}
                      </h1>
                      <span className="text-sm text-muted">
                        Max Paid Cover Templates
                      </span>
                    </div>
                    {/* 3 */}
                    <div className="px-2">
                      <h1 className="font-bold text-xl">
                        {userData.package_id == 3
                          ? "Unlimited"
                          : userData.max_res_templates}
                      </h1>
                      <span className="text-sm text-muted">
                        Max Paid Resume Templates
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div>
              {/* User Selected Package */}

              <div className="p-4">
                {userData.package_id ? (
                  <>
                    <h1 className="font-bold text-primary text-lg">
                      Purchased Package
                    </h1>
                    <div className=" flex flex-col gap-4">
                      <div className="grid sm:grid-cols-2">
                        <LabelText
                          label={"Package"}
                          text={PackageNameFilter(userData.package_id)}
                        />
                        <LabelText
                          label={"Price"}
                          text={`$${userData.package_price
                            ? userData.package_price
                            : "0"
                            }`}
                        />
                      </div>
                      <div className="grid sm:grid-cols-2">
                        <LabelText
                          label={"Start On"}
                          text={
                            userData.start_date
                              ? formattedDate(userData.start_date)
                              : "--"
                          }
                        />
                        <LabelText
                          label={"End On"}
                          text={
                            userData.end_date
                              ? formattedDate(userData.end_date)
                              : "--"
                          }
                        />
                      </div>
                      <div className="grid sm:grid-cols-2">
                        <LabelText
                          label={"Payment Method"}
                          text={
                            userData.payment_method || "No Payment Method Found"
                          }
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <span>No Package Purchased</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="border h-full p-4 w-full">
          <div className="flex border-b  border-blue-500 gap-5">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={`px-4 py-2 focus:outline-none border-blue-500 border-2 rounded border-b-0 ${activeTab === index
                  ? "border-2 rounded border-blue-500 text-white bg-blue-500 border-b-0"
                  : "text-gray-600"
                  }`}
                onClick={() => setActiveTab(index)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="p-4">
            {activeTab === 0 && (
              <UserResumeCover personalData={userData.personal_information} />
            )}
            {activeTab === 1 && (
              <div>
                <CoverLetterShow personalData={userData.cover_letters} />
              </div>
            )}
            {activeTab === 2 && (
              <div>
                <UserTransactionServices serviceID={user_id} />
              </div>
            )}
            {activeTab === 3 && (
              <div>
                <TransactionUser transactionID={user_id} />
              </div>
            )}
          </div>{" "}
        </div>
        <div className="border h-full p-4">
          <div className="font_2 text-xl py-8 px-12 bg-[#0072b1] text-white rounded-t-lg w-full">
            {"User Referrals"}
          </div>
          <div className="bg-[#f4f2f3] py-8 px-4 w-full">
            <table
              className="table-auto w-full text-center text-[#959492] text-md"
              cellPadding={15}
            >
              <thead>
                <tr>
                  <th>SN</th>
                  <th>Referral Name</th>
                  <th>Email</th>
                  <th>Referral Link</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="bg-white rounded-xl">
                {childs
                  .filter((childs) =>
                    childs.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .slice(pagee_offset, pagee_limit)
                  .map((childs, index_childs) => (
                    <tr key={index_childs}>
                      <td className="w-[10%]">{index_childs + 1}</td>
                      <td>{childs.name}</td>
                      <td>{childs.email}</td>

                      <td>{childs.referral_link}</td>
                      <td>{childs.status == 1 ? "active" : "in active"}</td>
                    </tr>
                  ))}
                {childs.filter((childs) =>
                  childs.name.toLowerCase().includes(searchTerm.toLowerCase())
                ).length === 0 && (
                    <tr>
                      <td colSpan="5 font-1">No data found to show</td>
                    </tr>
                  )}
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
    </>
  );
};

export default ShowUser;
