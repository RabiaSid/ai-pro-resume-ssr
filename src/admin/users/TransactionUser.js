import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../../services/Auth";
import { ApiService } from "../../services/ApiService";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import { BiFile } from "react-icons/bi";

const TransactionUser = ({ transactionID }) => {
  const { user } = useAuth();
  const [servicesList, setServicesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState([]);
  const invoiceRepoRef = useRef();
  const [orders, set_orders] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [invoice, set_invoice] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  useEffect(() => {
    ApiService.UserTransactionAdmin(user?.token, transactionID)
      .then((response) => {
        set_orders(response.data.data);
        console.log("aaaa", response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [user, transactionID]);

  const handlePrint = useReactToPrint({
    content: () => invoiceRepoRef.current,
  });

  const genReport = (id) => {
    setIsloading(true);
    ApiService.getUserTransitionInvoiceData(user?.token, id)
      .then((res) => {
        set_invoice(res.data.data);
        console.log("invoice data", res.data.data);
        setTimeout(() => {
          setIsloading(false);
          handlePrint();
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setIsloading(false);
      });
  };

  if (loading) return <div>Loading...</div>;
  // Total pages
  const totalPages = Math.ceil((orders?.length || 0) / itemsPerPage);

  // Paginate data
  const paginatedData =
    orders?.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ) || [];

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left border-b">Sn#</th>
                <th className="px-4 py-2 text-left border-b">Name</th>
                <th className="px-4 py-2 text-left border-b">Price</th>
                <th className="px-4 py-2 text-left border-b">
                  Package/Service
                </th>
                <th className="px-4 py-2 text-left border-b">
                  Transaction Date
                </th>
                <th className="px-4 py-2 text-left border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(paginatedData) && paginatedData.length > 0 ? (
                paginatedData.map((transition, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">
                      {(idx + 1).toString().padStart(2, "0")}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {transition.user.name}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {transition.currency + " " + transition.total_amount}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {transition.description.split(" ").slice(0, 6).join(" ")}
                      {transition.description.split(" ").length > 6
                        ? " ..."
                        : ""}
                    </td>
                    <td className="px-4 py-2 border-b">
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
                    <td className="px-4 py-2 border-b">
                      {transition.is_coins === 0 ? (
                        <button className="text-[#0072b1] hover:text-[#00caa5]">
                          <BiFile
                            className="m-auto text-[#01B2AC]"
                            size={25}
                            onClick={() => genReport(transition.id)}
                          />
                        </button>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No services found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {totalPages > 1 && paginatedData.length > 0 && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded-l-lg hover:bg-blue-700"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300"
                  } hover:bg-gray-400`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-700"
              >
                Next
              </button>
            </div>
          )}
        </div>
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
            {invoice?.order?.user?.address && (
              <p style={{ fontSize: "18px", marginTop: "5px" }}>
                Address: {invoice?.order?.user?.address}
              </p>
            )}
            <p style={{ fontSize: "18px", marginTop: "5px" }}>
              Email: {invoice?.order?.user?.email}
            </p>
            {invoice?.order?.user?.contact && (
              <p
                className="mb-2"
                style={{ fontSize: "18px", marginTop: "5px" }}
              >
                Contact: {invoice?.order?.user?.contact}
              </p>
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
              {invoice?.purchased_package && (
                <div className="grid grid-cols-[20%,40%,40%] leading-8  px-2 last:pb-6">
                  <div className="border-r-2 px-4 text-lg ">1</div>
                  <div className="border-r-2 px-4 text-lg ">
                    {invoice?.purchased_package?.package.name}
                  </div>
                  <div className="text-lg" style={{ textAlign: "right" }}>
                    {invoice?.order?.currency +
                      " " +
                      (invoice?.order?.user?.package_price
                        ? invoice?.order?.user?.package_price
                        : "0")}
                  </div>
                </div>
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
                    {invoice?.order?.currency + " " + service.service_price}
                  </div>
                </div>
              ))}
              <hr />
              <div className="leading-8 px-2 py-2 flex flex-col gap-2">
                <div className="flex justify-end items-center gap-4">
                  <h1 className="font-bold text-lg">Subtotal:</h1>
                  <span className="text-lg w-[120px] text-right">
                    {invoice?.order?.currency + " " + invoice?.order?.subtotal}
                  </span>
                </div>
                <div className="flex justify-end items-center gap-4">
                  <h1 className="font-bold text-lg">Order discount:</h1>
                  <span className="text-lg w-[120px] text-right">
                    {invoice?.order?.currency +
                      " " +
                      `(${invoice?.order?.discount_amount})`}
                  </span>
                </div>
                <div className="flex justify-end items-center gap-4">
                  <h1 className="font-bold text-lg">Tax (13%) :</h1>
                  <span className="text-lg w-[120px] text-right">
                    {invoice?.order?.currency} {invoice?.order?.tax_amount}
                  </span>
                </div>
                {invoice?.order?.used_coins !== 0 && (
                  <div className="flex justify-end items-center gap-4">
                    <h1 className="font-bold text-lg">Coins discount:</h1>
                    <span className="text-lg w-[120px] text-right">
                      {"USD " + `(${invoice?.order?.used_coins})`}
                    </span>
                  </div>
                )}
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
                  {invoice?.order?.currency +
                    " " +
                    invoice?.order?.total_amount}
                </span>
              </div>
            </div>
            <div className="p-2">
              <p className="font-bold text-lg" style={{ margin: "2px 0px" }}>
                BILL FROM:
              </p>
              <p style={{ fontSize: "16px", marginTop: "5px" }}>
                {invoice?.from_website}
              </p>
              <p style={{ fontSize: "16px", marginTop: "3px" }}>
                {invoice?.from_address}
              </p>
              <p style={{ fontSize: "16px", marginTop: "3px" }}>
                {invoice?.from_email}
              </p>
              <p style={{ fontSize: "16px", marginTop: "3px" }}>
                {invoice?.from_number}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionUser;
