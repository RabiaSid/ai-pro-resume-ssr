import React, { useEffect, useRef, useState } from "react";
// Image
import { BiFile } from "react-icons/bi";
import { ApiService } from "./services/ApiService";
import { useReactToPrint } from "react-to-print";
import LoadingSpiner from "./components/LoadingSpinner";
import Skeleton from "react-loading-skeleton";
import { useAuth } from "./services/Auth";
import { IoIosArrowForward } from "react-icons/io";
import { IoChevronBackSharp } from "react-icons/io5";
import $ from "jquery";
import { LuDownload } from "react-icons/lu";
import { FaArrowDown } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa6";

const MyTransactionsRewamp = () => {
  const { user } = useAuth();

  const invoiceRepoRef = useRef();
  const [orders, set_orders] = useState([]);
  const [pagee_offset, set_pagee_offset] = useState(0);
  const [pagee_limit, set_pagee_limit] = useState(15);
  const [pagee_total, set_pagee_total] = useState([]);
  const [cp, set_cp] = useState(1);
  // Invoice Data
  const [invoice, set_invoice] = useState({});
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    var pages = [];
    var chk_page = 0;
    setskeleton(true);
    ApiService.getUserTransitionsData(user?.token)
      .then((response) => {
        console.log("response.data.data");
        console.log(response.data.data);
        set_orders(response.data.data);
        const page_total = response.data.data.length / 15;
        const page_without_float = parseInt(
          response.data.data.length / 15
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

        setskeleton(false);
      })
      .catch((err) => {
        console.log(err);
        setskeleton(false);
      });
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      page(1);
    }
  }, [orders]);

  const page = (p) => {
    set_cp(p);
    set_pagee_offset(p * 15 - 15);
    set_pagee_limit(p * 15);
    const elementsByClass = document.getElementsByClassName("page");
    for (var i = 0; i < elementsByClass.length; i++) {
      elementsByClass[i].classList.remove("page_active");
    }
    const element = document.getElementById("page" + p);
    if (element) {
      element.classList.add("page_active");
    }
  };

  const page_back = () => {
    const newPage = cp - 1;
    set_pagee_offset(newPage * 15 - 15);
    set_pagee_limit(newPage * 15);
    const elementsByClass = document.getElementsByClassName("page");
    for (var i = 0; i < elementsByClass.length; i++) {
      elementsByClass[i].classList.remove("page_active");
    }
    const element = document.getElementById("page" + newPage);
    if (element) {
      element.classList.add("page_active");
    }
    set_cp(newPage);
  };

  const page_next = () => {
    const newPage = cp + 1;
    set_pagee_offset(newPage * 15 - 15);
    set_pagee_limit(newPage * 15);
    const elementsByClass = document.getElementsByClassName("page");
    for (var i = 0; i < elementsByClass.length; i++) {
      elementsByClass[i].classList.remove("page_active");
    }
    const element = document.getElementById("page" + newPage);
    if (element) {
      element.classList.add("page_active");
    }
    set_cp(newPage);
  };

  const handlePrint = useReactToPrint({
    content: () => invoiceRepoRef.current,
  });

  const genReport = (id) => {
    setIsloading(true);
    ApiService.getUserTransitionInvoiceData(user?.token, id)
      .then((res) => {
        set_invoice(res.data.data);
        console.log(res.data.data);
        setTimeout(function () {
          setIsloading(false);
          handlePrint();
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  const [skeleton, setskeleton] = useState(true);
  const [visibleDetails, setVisibleDetails] = useState(null);

  const toggleDetails = (index) => {
    setVisibleDetails(visibleDetails === index ? null : index);
  };

  return (
    <div>
      {isLoading && <LoadingSpiner isLoading={isLoading} />}

      {/* End Banner */}
      <div className="container m-auto">
        {/* Content */}
        <div className="flex justify-between items-center flex-wrap">
          <div
            className=" text-xl py-8 px-3 lg:px-12 bg-transparent border font-Lexend border-white text-black font-bold rounded-t-3xl w-[100%] lg:w-[95%] m-auto background_shade"
            style={{ boxShadow: "0 0 10px #01B2AC40" }}
          >
            {"My Transactions"}
          </div>
          <div
            className="bg-transparent mb-5 border rounded-b-3xl overflow-hidden border-white py-8 px-2 lg:px-12 w-[100%] lg:w-[95%] m-auto  background_shade"
            style={{ boxShadow: "0 0 10px #01B2AC40" }}
          >
            {skeleton ? (
              <>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </>
            ) : orders.length > 0 ? (
              <div className="overflow-x-auto scroll-bar-hide">
                <table
                  className="table-auto w-[100%] text-center text-black text-md font-Lexend"
                  cellPadding={10}
                >
                  <thead className="text-primary-blue font-bold text-lg">
                    <tr>
                      <th width="140px" className="text-xs sm:text-xl">
                        SN
                      </th>
                      <th className="hidden lg:table-cell ">Name</th>
                      <th className="hidden lg:table-cell ">Price / Coins</th>
                      <th className="text-xs sm:text-xl">
                        Package / Service / Template
                      </th>
                      <th className="hidden lg:table-cell ">
                        Transaction Date
                      </th>
                      <th className="text-xs sm:text-xl">Invoice</th>
                    </tr>
                  </thead>
                  <tbody className="bg-transparent rounded-3xl">
                    {orders
                      .slice(pagee_offset, pagee_limit)
                      .map((transition, index_transition) => (
                        <React.Fragment key={index_transition}>
                          <tr
                            onClick={() => toggleDetails(index_transition)}
                            className="cursor-pointer"
                          >
                            <td>{(cp - 1) * 15 + index_transition + 1}</td>
                            <td className="hidden lg:table-cell">
                              {transition.user.name}
                            </td>
                            <td className="hidden lg:table-cell">
                              {transition.total_amount > 0
                                ? transition.currency +
                                  " " +
                                  transition.total_amount
                                : ""}
                              {transition.total_amount > 0 &&
                              transition.used_coins > 0
                                ? " - "
                                : ""}
                              {transition.used_coins > 0
                                ? "Coins " + transition.used_coins
                                : ""}
                            </td>
                            <td className="flex items-center justify-center gap-2 text-xs sm:text-sm">
                              {transition.description
                                .split(" ")
                                .slice(0, 6)
                                .join(" ")}
                              {transition.description.split(" ").length > 6
                                ? " ..."
                                : ""}
                              <div className="block lg:hidden">
                                {visibleDetails === index_transition ? (
                                  <FaArrowUp />
                                ) : (
                                  <FaArrowDown />
                                )}
                              </div>
                            </td>
                            <td className="hidden lg:table-cell">
                              {new Date(transition.created_at).toLocaleString(
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
                              {transition.is_coins === 0 ? (
                                <a
                                  href="#"
                                  className="text-[#222] hover:text-[#00caa5]"
                                >
                                  <BiFile
                                    className="m-auto text-[#01B2AC]"
                                    size={25}
                                    onClick={(e) => genReport(transition.id)}
                                  />
                                </a>
                              ) : (
                                "-"
                              )}
                            </td>
                          </tr>

                          {visibleDetails === index_transition && (
                            <tr
                              className={`lg:hidden ${
                                visibleDetails === true ? "h-auto" : "h-[0px]"
                              }`}
                            >
                              <td>
                                <div className="flex flex-col justify-center gap-3">
                                  <div>
                                    <span className="text-xs sm:text-sm text-gray-400">
                                      Price
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-xs sm:text-sm text-gray-400">
                                      Transaction Date
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td></td>
                              <td>
                                <div className="flex flex-col text-xs sm:text-sm justify-center gap-3">
                                  <div className="">
                                    {transition.currency +
                                      " " +
                                      transition.total_amount}
                                  </div>
                                  {new Date(
                                    transition.created_at
                                  ).toLocaleString(undefined, {
                                    year: "2-digit",
                                    month: "numeric",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                    second: "numeric",
                                  })}
                                </div>
                              </td>
                              <td></td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-[#959492] text-md">
                NO TRANSACTION HAS BEEN MADE
              </p>
            )}
          </div>

          {orders.length > 15 && (
            <div className="w-full flex justify-end items-center text-[#00caa5] text-2xl py-4 cursor-pointer">
              {cp > 1 && (
                <div className="border-2 rounded-full w-[40px]  flex items-center justify-center h-[40px]">
                  <IoChevronBackSharp
                    size={16}
                    className="custom-arrow prev-arrow"
                    onClick={() => page_back()}
                  />
                </div>
              )}
              {pagee_total.map((pagee_total, index_pagee_total) => (
                <div
                  className="text-slate-400 border-2 text-md font-Lexend rounded-full w-[40px] flex items-center justify-center h-[40px] mx-2 page"
                  id={"page" + pagee_total}
                  key={index_pagee_total}
                  onClick={() => page(pagee_total)}
                >
                  {pagee_total}
                </div>
              ))}
              {cp < pagee_total.length && (
                <div className="border-2 rounded-full w-[40px] flex items-center justify-center h-[40px] ml-2">
                  <IoIosArrowForward
                    size={16}
                    className="custom-arrow next-arrow"
                    onClick={() => page_next()}
                  />
                </div>
              )}
            </div>
          )}

          {/* Invoice */}

          <div className="hidden">
            <div
              className={`w-[95%] m-auto`}
              style={{ fontFamily: "Arial" }}
              id="report"
              ref={invoiceRepoRef}
            >
              <h1 style={{ fontSize: "34px", fontWeight: "500" }}>Receipt</h1>
              <p
                style={{
                  fontSize: "14px",
                  color: "rgb(150,150,150)",
                  marginTop: "10px",
                }}
              >
                INVOICE #: {invoice?.order?.invoice_number}
              </p>
              <table
                width="100%"
                cellPadding={0}
                cellSpacing={0}
                style={{ marginTop: "10px" }}
              >
                <thead>
                  <tr>
                    <td style={{ fontSize: "14px", marginTop: "10px" }}>
                      CUSTOMER #: {invoice?.order?.user?.uuid}
                    </td>
                    <td
                      align="right"
                      style={{ fontSize: "14px", marginTop: "5px" }}
                    >
                      DATE :{" "}
                      {new Date(invoice?.order?.updated_at).toLocaleString(
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
                  </tr>
                </thead>
              </table>
              <hr
                style={{
                  border: "1px solid rgb(200,200,200)",
                  marginTop: "10px",
                }}
              />

              <p className="font-bold text-lg" style={{ marginTop: "5px" }}>
                BILL TO:
              </p>
              <p style={{ fontSize: "18px", marginTop: "5px" }}>
                Name: {invoice?.order?.user?.name}
              </p>
              {invoice?.order?.user?.address ? (
                <p style={{ fontSize: "18px", marginTop: "5px" }}>
                  Address: {invoice?.order?.user?.address}
                </p>
              ) : (
                ""
              )}

              <p style={{ fontSize: "18px", marginTop: "5px" }}>
                Email: {invoice?.order?.user?.email}
              </p>

              {invoice?.order?.user?.contact ? (
                <p
                  className="mb-2"
                  style={{ fontSize: "18px", marginTop: "5px" }}
                >
                  Contact: {invoice?.order?.user?.contact}
                </p>
              ) : (
                ""
              )}

              <hr />
              <table
                width="100%"
                cellPadding={0}
                cellSpacing={0}
                style={{ marginTop: "10px" }}
              >
                <thead>
                  <tr>
                    <td colSpan="4" align="left">
                      PAYMENT:
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan="3"
                      align="left"
                      style={{ fontSize: "18px", fontWeight: "500" }}
                    >
                      Payment Type:
                    </td>
                    <td
                      align="right"
                      style={{
                        fontSize: "18px",
                        fontWeight: "300",
                        letterSpacing: "1.2px",
                      }}
                    >
                      {invoice?.order?.payment_type}
                    </td>
                  </tr>

                  <tr className="">
                    <td
                      colSpan="3"
                      align="left"
                      style={{ fontSize: "18px", fontWeight: "500" }}
                      className="pb-2"
                    >
                      <br />
                      Received Payment
                    </td>
                    <td
                      align="right"
                      style={{
                        fontSize: "18px",
                        fontWeight: "300",
                        letterSpacing: "1.2px",
                      }}
                    >
                      <br />
                      {invoice?.order?.currency +
                        " " +
                        invoice?.order?.total_amount}
                    </td>
                  </tr>
                </thead>
              </table>

              <div className="__table border-2 mt-4">
                {/* Headings */}
                <div className="grid grid-cols-[20%,40%,40%] leading-8 px-2">
                  <div className="border-r-2 font-bold px-4 text-lg h-[35px]">
                    SN#
                  </div>
                  <div className="border-r-2 font-bold px-4 text-lg h-[35px]">
                    {invoice?.order?.resume_template?.name
                      ? "Resume Template"
                      : invoice?.order?.cover_template?.name
                      ? "Cover Template"
                      : "Services/Package"}
                  </div>
                  <div
                    className="font-bold text-lg h-[35px]"
                    style={{ textAlign: "right" }}
                  >
                    Amount
                  </div>
                </div>
                {/* Data */}

                {/* Package */}
                {invoice?.purchased_package ? (
                  <div className="grid grid-cols-[20%,40%,40%] leading-8  px-2 last:pb-6">
                    <div className="border-r-2 px-4 text-lg ">1</div>
                    <div className="border-r-2 px-4 text-lg ">
                      {invoice?.purchased_package?.package.name}
                    </div>
                    <div className="text-lg" style={{ textAlign: "right" }}>
                      {" "}
                      {invoice?.order?.currency}{" "}
                      {invoice?.order?.user?.package_price
                        ? invoice?.order?.user?.package_price
                        : "0"}
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {invoice?.order?.resume_template?.name ? (
                  <div className="grid grid-cols-[20%,40%,40%] leading-8  px-2 last:pb-6">
                    <div className="border-r-2 px-4 text-lg ">1</div>
                    <div className="border-r-2 px-4 text-lg ">
                      {invoice?.order?.resume_template?.name}
                    </div>
                    <div className="text-lg" style={{ textAlign: "right" }}>
                      {" "}
                      {invoice?.order?.currency}{" "}
                      {invoice?.order?.resume_template?.price
                        ? invoice?.order?.resume_template?.price
                        : "0"}
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {invoice?.order?.cover_template?.name ? (
                  <div className="grid grid-cols-[20%,40%,40%] leading-8  px-2 last:pb-6">
                    <div className="border-r-2 px-4 text-lg ">1</div>
                    <div className="border-r-2 px-4 text-lg ">
                      {invoice?.order?.cover_template?.name}
                    </div>
                    <div className="text-lg" style={{ textAlign: "right" }}>
                      {" "}
                      {invoice?.order?.currency}{" "}
                      {invoice?.order?.cover_template?.price
                        ? invoice?.order?.cover_template?.price
                        : "0"}
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {invoice?.order_services?.map((service, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-[20%,40%,40%] leading-8  px-2 last:pb-6"
                  >
                    <div className="border-r-2 px-4 text-lg ">
                      {invoice?.purchased_package ? idx + 2 : idx + 1}
                    </div>
                    <div className="border-r-2 px-4 text-lg ">
                      {service.service_name}
                    </div>
                    <div className="text-lg" style={{ textAlign: "right" }}>
                      {" "}
                      {invoice?.order?.currency + " " + service.service_price}
                    </div>
                  </div>
                ))}
                <hr />
                <div className="leading-8 px-2 py-2 flex flex-col gap-2">
                  {/* Sub total */}
                  <div className="flex justify-end items-center gap-4">
                    <h1 className="font-bold text-lg">Subtotal:</h1>
                    <span className="text-lg w-[120px] text-right">
                      {invoice?.order?.currency +
                        " " +
                        invoice?.order?.subtotal}
                    </span>
                  </div>
                  {/* Order discount */}
                  <div className="flex justify-end items-center gap-4">
                    <h1 className="font-bold text-lg">Order discount:</h1>
                    <span className="text-lg w-[120px] text-right">
                      {invoice?.order?.currency +
                        " " +
                        `(${invoice?.order?.discount_amount})`}
                    </span>
                  </div>

                  {/* Tax */}
                  <div className="flex justify-end items-center gap-4">
                    <h1 className="font-bold text-lg">Tax (13%) :</h1>
                    <span className="text-lg w-[120px] text-right">
                      {invoice?.order?.currency} {invoice?.order?.tax_amount}
                    </span>
                  </div>

                  {invoice?.order?.used_coins !== 0 ? (
                    <div className="flex justify-end items-center gap-4">
                      <h1 className="font-bold text-lg">Coins discount:</h1>
                      <span className="text-lg w-[120px] text-right">
                        {"" + `(${invoice?.order?.used_coins})`}
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                  {/* coupun discount */}
                  {invoice?.order?.coupon_discount_percent && (
                    <div className="flex justify-end items-center gap-4">
                      <h1 className="font-bold text-lg">Coupun discount:</h1>
                      <span className="text-lg w-[120px] text-right">
                        {"%" + `( ${invoice?.order?.coupon_discount_percent} )`}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="border-r-2 border-b-2 border-l-2">
                <div className="flex justify-end items-center gap-4 px-2 py-2">
                  <h1 className="font-bold text-lg w-[120px]">
                    Total ({invoice?.order?.currency})
                  </h1>
                  <span className="text-lg text-right">
                    {" "}
                    {invoice?.order?.currency +
                      " " +
                      invoice?.order?.total_amount}
                  </span>
                </div>
              </div>
              {/* Bill from */}
              <div className="p-2">
                <p className="font-bold text-lg" style={{ margin: "2px 0px" }}>
                  BILL FROM:
                </p>
                <p
                  style={{
                    fontSize: "16px",

                    marginTop: "5px",
                  }}
                >
                  {invoice?.from_website}
                </p>
                <p
                  style={{
                    fontSize: "16px",

                    marginTop: "3px",
                  }}
                >
                  {invoice?.from_address}
                </p>
                <p
                  style={{
                    fontSize: "16px",

                    marginTop: "3px",
                  }}
                >
                  {invoice?.from_email}
                </p>
                <p
                  style={{
                    fontSize: "16px",

                    marginTop: "3px",
                  }}
                >
                  {invoice?.from_number}
                </p>
                {/* <p
                  style={{
                    fontSize: "16px",

                    marginTop: "3px",
                  }}
                >
                  GST: 785332008 RT0001
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTransactionsRewamp;
