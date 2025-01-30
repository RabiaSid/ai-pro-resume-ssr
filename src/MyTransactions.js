import React, { useEffect, useRef, useState, } from "react";
import Header from "./Header";
import Footer from "./Footer";
// Image
import { BiFile, BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { ApiService } from "./services/ApiService";
import { useReactToPrint } from "react-to-print";
import LoadingSpiner from "./components/LoadingSpinner";
import MainBanner from "./components/MainBanner";
import Skeleton from "react-loading-skeleton";
import { useAuth } from "./services/Auth";
import TemplatesDum from "./resume/templates/dummy/Templates_17";

const MyTransactyions = () => {
  const { user } = useAuth();

  const invoiceRepoRef = useRef();
  const [orders, set_orders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagee_offset, set_pagee_offset] = useState(0);
  const [pagee_limit, set_pagee_limit] = useState(8);
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
        console.log(response.data.data);
        set_orders(response.data.data);
        const page_total = response.data.data.length / 8;
        const page_without_float = parseInt(
          response.data.data.length / 8
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
        //$('.page:nth-of-type(1)').addClass('page_active');
        document.getElementsByClassName("page")[0].classList.add("page_active");
        setskeleton(false);
      })
      .catch((err) => {
        console.log(err);
        setskeleton(false);
      });
  }, []);

  const page = (p) => {
    console.log(p);
    set_cp(p);
    set_pagee_offset(p * 8 - 8);
    set_pagee_limit(p * 8);
    const elementsByClass = document.getElementsByClassName("page");
    for (var i = 0; i < elementsByClass.length; i++) {
      elementsByClass[i].classList.remove("page_active");
    }
    const element = document.getElementById("page" + p);
    element.classList.add("page_active");
    // $('.page').removeClass('page_active');
    // $('#page'+p).addClass('page_active');
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

  const [skeleton, setskeleton] = useState(true);

  return (
    <div className="bg-[gray]">
      {isLoading && <LoadingSpiner isLoading={isLoading} />}
      <Header />

      <MainBanner
        startText={"Track your transactions smoothly with"}
        highlightText={"AI PRO RESUME'S"}
        endText={" efficient operations"}
        descriptionText={``}
      />

      {/* End Banner */}
      <div className="w-full lg:w-[80%]  m-auto">
        <div className="container m-auto py-6 sm:py-20 px-4 sm:px-0">
          {/* Content */}
          <div className="flex justify-between items-center flex-wrap ">
            <div className="font_2 text-xl py-8 px-12 bg-[#0072b1] text-white rounded-t-lg w-full">
              {"MY TRANSACTION"}
            </div>
            <div
              className="bg-[#f4f2f3] overflow-scroll py-8 px-12 w-full"
              style={{}}
            >
              {skeleton ? (
                <>
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </>
              ) : orders.length > 0 ? (
                <table
                  className="table-auto w-full text-center text-[#959492] text-md"
                  cellPadding={15}
                >
                  <thead>
                    <tr>
                      <th cla>SN</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th> Packages / Services</th>
                      <th>Transaction Date</th>
                      <th>Invoice</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white rounded-xl">
                    {orders
                      .slice(pagee_offset, pagee_limit)
                      .map((transition, index_transition) => (
                        <tr key={index_transition}>
                          <td>{(cp - 1) * 8 + index_transition + 1}</td>
                          <td>{transition.user.name}</td>
                          <td>
                            {transition.currency +
                              " " +
                              transition.total_amount}
                          </td>
                          <td>
                            {transition.description
                              .split(" ")
                              .slice(0, 6)
                              .join(" ")}
                            ...
                          </td>
                          <td>
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
                            <a
                              href="#"
                              className="text-[#0072b1] hover:text-[#00caa5]"
                            >
                              <BiFile
                                className="m-auto"
                                size={25}
                                onClick={(e) => genReport(transition.id)}
                              />
                            </a>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center text-[#959492] text-md">
                  NO TRANSACTION HAS BEEN MADE
                </p>
              )}
            </div>

            {orders.length > 0 && (
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
                <p style={{ fontSize: "18px", marginTop: "5px" }}>
                  Address: {invoice?.order?.user?.address}
                </p>
                <p style={{ fontSize: "18px", marginTop: "5px" }}>
                  Email: {invoice?.order?.user?.email}
                </p>
                <p
                  className="mb-2"
                  style={{ fontSize: "18px", marginTop: "5px" }}
                >
                  Contact: {invoice?.order?.user?.contact}
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
                        <br />(
                        {invoice?.order?.currency +
                          "" +
                          invoice?.order?.total_amount}
                        )
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
                      Services/Package
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
                        {invoice?.purchased_package?.name}
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

                    {invoice?.order?.used_coins !== 0 ? (
                      <div className="flex justify-end items-center gap-4">
                        <h1 className="font-bold text-lg">Coins discount:</h1>
                        <span className="text-lg w-[120px] text-right">
                          {"USD " + `(${invoice?.order?.used_coins})`}
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
                          {"%" +
                            `( ${invoice?.order?.coupon_discount_percent} )`}
                        </span>
                      </div>
                    )}

                    {/* Tax */}
                    <div className="flex justify-end items-center gap-4">
                      <h1 className="font-bold text-lg">
                        Tax {`(${"GST"})`} :
                      </h1>
                      <span className="text-lg w-[120px] text-right">
                        {invoice?.order?.currency} ({invoice?.order?.tax_amount}
                        )
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
                  >
                    GST: 785332008 RT0001
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <TemplatesDum dummy={0} />
      </div>

      <Footer />
    </div>
  );
};

export default MyTransactyions;
