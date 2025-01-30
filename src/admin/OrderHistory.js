import React, { useEffect, useState, useRef } from "react";

import $ from "jquery";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiArrowDownSLine } from "react-icons/ri";
import {
  BiSearch,
  BiFile,
  BiRightArrowAlt,
  BiLeftArrowAlt,
} from "react-icons/bi";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import swal from "sweetalert";
import Header from "./partails/Header";
import { useReactToPrint } from "react-to-print";
import { ApiService } from "../services/ApiService";
import LoadingSpiner from "../components/LoadingSpinner";
import { useAuth } from "../services/Auth";
import Skeleton from "react-loading-skeleton";
import { FaCircleCheck } from "react-icons/fa6";
import { FaTimesCircle } from "react-icons/fa";
const OrderHistory = ({ isOpen }) => {
  const { user } = useAuth();
  const invoiceRepoRef = useRef();
  const [orders, set_orders] = useState([]);
  const [invoice, set_invoice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [pagee_offset, set_pagee_offset] = useState(0);
  const [pagee_limit, set_pagee_limit] = useState(15);
  const [pagee_total, set_pagee_total] = useState([]);
  const [cp, set_cp] = useState(1);
  const [isLoading, setIsloading] = useState(false);
  const [isLoading1, setISloading1] = useState(false);
  const handleKeyUp = (event) => {
    // Update the state with the input valuea
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const headers = {
      Authorization: "Bearer " + user?.token,
    };
    axios
      .get(global.baseurl + "/orders", { headers })
      .then((response) => {
        console.log(response.data.data);
        set_orders(response.data.data);
        updatePagination(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const updatePagination = (userData) => {
    const pages = [];
    const page_total = Math.ceil(userData.length / 15);
    for (let i = 1; i <= page_total; i++) {
      pages.push(i);
    }
    set_pagee_total(pages);
  };

  useEffect(() => {
    const filteredUsers = orders.filter((orders) => {
      const searchTermLowerCase = searchTerm.toLowerCase();
      return orders.user_name.toLowerCase().includes(searchTermLowerCase);
    });
    updatePagination(filteredUsers);
    set_cp(1);
    set_pagee_offset(0);
    set_pagee_limit(15);
  }, [searchTerm]);

  const page = (p) => {
    set_cp(p);
    set_pagee_offset(p * 15 - 15);
    set_pagee_limit(p * 15);
  };

  const page_back = () => {
    const new_cp = cp - 1;
    set_cp(new_cp);
    set_pagee_offset(new_cp * 15 - 15);
    set_pagee_limit(new_cp * 15);
  };

  const page_next = () => {
    const new_cp = cp + 1;
    set_cp(new_cp);
    set_pagee_offset(new_cp * 15 - 15);
    set_pagee_limit(new_cp * 15);
  };

  const handlePrint = useReactToPrint({
    content: () => invoiceRepoRef.current,
  });

  const genReport = (id) => {
    setIsloading(true);
    ApiService.getUserTransitionInvoiceData(user?.token, id)
      .then((res) => {
        console.log(res.data.data);
        set_invoice(res.data.data);

        setTimeout(function () {
          setIsloading(false);
          handlePrint();
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  const getData = () => {
    setISloading1(true);
    setTimeout(() => {
      setISloading1(false);
    }, 2000);
  };

  // Call getData when the component mounts
  useEffect(() => {
    getData();
  }, []);

  const filteredUsers = orders.filter((user) => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    return user.user_name.toLowerCase().includes(searchTermLowerCase);
  });

  const totalPages = pagee_total.length;
  const pageRange = 2; // Number of pages to show on each side of the current page

  const getVisiblePages = () => {
    if (totalPages <= 5) return pagee_total; // Show all pages if few

    const visiblePages = new Set(); // Use Set to prevent duplicates

    visiblePages.add(1); // Always include the first page

    // Add ellipsis before the current page range
    if (cp > pageRange + 2) visiblePages.add("...");

    // Add pages near the current page
    for (
      let i = Math.max(2, cp - pageRange);
      i <= Math.min(cp + pageRange, totalPages - 1);
      i++
    ) {
      visiblePages.add(i);
    }

    // Add ellipsis after the current page range
    if (cp < totalPages - pageRange - 1) visiblePages.add("...");

    visiblePages.add(totalPages); // Always include the last page

    return Array.from(visiblePages); // Convert Set to Array for rendering
  };

  const visiblePages = getVisiblePages();

  return (
    <>
      {isLoading && <LoadingSpiner isLoading={isLoading} />}

      <section className="">
        <div id="main_contents" className="w-full">
          <div className="">
            <div className="flex justify-between items-center flex-wrap mt-[5%]">
              <div className="flex items-center justify-center bg-[#f4f2f3] rounded-full">
                <div className="font_1 bg-[#0072b1] text-white rounded-full px-6 py-3 text-lg">
                  ORDER HISTORY
                </div>
                <div className="flex items-center justify-center text-[#959492] font_1 text-md px-4">
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
                  All Order History
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start flex-wrap mt-10 w-[200%] lg:w-full">
              <div className="font_2 text-xl py-8 px-12 bg-[#0072b1] text-white rounded-t-lg w-full">
                {"ORDER HISTORY"}
              </div>
              <div className="bg-[#f4f2f3] py-8 px-12 w-full">
                {isLoading1 ? (
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
                        <th width="200">Price / Coins</th>
                        <th>Short Description</th>
                        <th>Payment Status</th>
                        <th>Payment Type</th>
                        <th>Payment Error</th>
                        <th>Transaction Date</th>
                        <th>Invoice</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white rounded-xl">
                      {filteredUsers
                        .slice(pagee_offset, pagee_limit)
                        .map((orders, index_orders) => (
                          <tr key={index_orders}>
                            <td>{(cp - 1) * 15 + index_orders + 1}</td>
                            <td>{orders.user_name}</td>
                            <td>
                              {orders.total_amount > 0
                                ? orders.currency + " " + orders.total_amount
                                : ""}
                              {orders.total_amount > 0 && orders.used_coins > 0
                                ? " - "
                                : ""}
                              {orders.used_coins > 0
                                ? "Coins " + orders.used_coins
                                : ""}
                            </td>
                            <td>
                              {orders.description
                                .split(" ")
                                .slice(0, 6)
                                .join(" ")}
                              ...
                            </td>
                            <td className="text-center">
                              {orders.status ? (
                                <FaCircleCheck
                                  size={25}
                                  className="text-green-500 m-auto"
                                />
                              ) : (
                                <FaTimesCircle
                                  size={25}
                                  className="text-red-500 m-auto"
                                />
                              )}
                            </td>
                            <td>{orders.payment_type}</td>
                            <td>
                              {orders.decline_issue ? orders.decline_issue : ""}
                            </td>
                            <td>
                              {new Date(orders.updated_at).toLocaleString(
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
                              <a
                                href="#"
                                className="text-[#0072b1] hover:text-[#00caa5]"
                              >
                                <BiFile
                                  className="m-auto"
                                  size={25}
                                  onClick={(e) => genReport(orders.id)}
                                />
                              </a>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}
              </div>

              <div className="w-full flex justify-center items-center text-[#0072b1] text-2xl py-4 cursor-pointer">
                {cp > 1 && (
                  <BiLeftArrowAlt
                    size={26}
                    className="custom-arrow prev-arrow hover:scale-125"
                    onClick={page_back}
                  />
                )}

                {visiblePages.map((pageNumber, index) =>
                  pageNumber === "..." ? (
                    <div
                      key={index}
                      className="font_3 text-slate-400 mx-2 select-none"
                    >
                      ...
                    </div>
                  ) : (
                    <div
                      key={index}
                      className={`font_3 mx-2 ${
                        pageNumber === cp
                          ? "text-[#0072b1]"
                          : "text-slate-400 hover:text-[#0072b1]"
                      } hover:scale-125 page cursor-pointer`}
                      onClick={() => page(pageNumber)}
                    >
                      {pageNumber}
                    </div>
                  )
                )}

                {cp < totalPages && (
                  <BiRightArrowAlt
                    size={26}
                    className="custom-arrow next-arrow hover:scale-125"
                    onClick={page_next}
                  />
                )}
              </div>

              <div className="hidden">
                <div
                  className={`w-[95%] m-auto`}
                  style={{ fontFamily: "Arial" }}
                  id="report"
                  ref={invoiceRepoRef}
                >
                  <h1 style={{ fontSize: "34px", fontWeight: "500" }}>
                    Receipt
                  </h1>
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
                    Name:{" "}
                    {invoice?.order?.user?.name
                      ? invoice?.order?.user?.name
                      : "=="}
                  </p>
                  {invoice?.order?.user?.address ? (
                    <p style={{ fontSize: "18px", marginTop: "5px" }}>
                      Address: {invoice?.order?.user?.address}
                    </p>
                  ) : (
                    ""
                  )}

                  <p style={{ fontSize: "18px", marginTop: "5px" }}>
                    Email:{" "}
                    {invoice?.order?.user?.email
                      ? invoice?.order?.user?.email
                      : "--"}
                  </p>
                  <p
                    className="mb-2"
                    style={{ fontSize: "18px", marginTop: "5px" }}
                  >
                    Contact:{" "}
                    {invoice?.order?.user?.contact
                      ? invoice?.order?.user?.contact
                      : "--"}
                  </p>

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
                      <div className="grid grid-cols-[20%,40%,40%] leading-8 px-2 last:pb-6">
                        <div className="border-r-2 px-4 text-lg ">1</div>
                        <div className="border-r-2 px-4 text-lg ">
                          {invoice?.purchased_package?.package?.name}
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
                      <div className="grid grid-cols-[20%,40%,40%] leading-8 px-2 last:pb-6">
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
                      <div className="grid grid-cols-[20%,40%,40%] leading-8 px-2 last:pb-6">
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
                          {invoice?.order?.currency +
                            " " +
                            service.service_price}
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

                      {invoice?.order?.used_coins !== 0 ? (
                        <div className="flex justify-end items-center gap-4">
                          <h1 className="font-bold text-lg">Coins discount:</h1>
                          <span className="text-lg w-[120px] text-right">
                            {`(${invoice?.order?.used_coins})`}
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                      {/* coupun discount */}
                      {invoice?.order?.coupon_discount_percent && (
                        <div className="flex justify-end items-center gap-4">
                          <h1 className="font-bold text-lg">
                            Coupun discount:
                          </h1>
                          <span className="text-lg w-[120px] text-right">
                            {"%" +
                              `( ${invoice?.order?.coupon_discount_percent} )`}
                          </span>
                        </div>
                      )}

                      {/* Tax */}
                      <div className="flex justify-end items-center gap-4">
                        <h1 className="font-bold text-lg">Tax :</h1>
                        <span className="text-lg w-[120px] text-right">
                          {invoice?.order?.currency} (
                          {invoice?.order?.tax_amount})
                        </span>
                      </div>
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
                    <p
                      className="font-bold text-lg"
                      style={{ margin: "2px 0px" }}
                    >
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
                    <p
                      style={{
                        fontSize: "16px",

                        marginTop: "3px",
                      }}
                    ></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderHistory;
