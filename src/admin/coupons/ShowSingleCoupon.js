import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ApiService } from "../../services/ApiService";
import { useAuth } from "../../services/Auth";
import Skeleton from "react-loading-skeleton";
import axios from "axios";

const ShowSingleCoupon = () => {
  const { user } = useAuth();
  const location = useLocation();
  const coupon_id = location.state?.coupon_id;
  const [couponsDetails, setCouponsDetails] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [pageOffset, setPageOffset] = useState(0);
  const [pageLimit, setPageLimit] = useState(8);
  const [pageTotal, setPageTotal] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCouponDetails = async () => {
      try {
        const response = await ApiService.getSingleCouponsDetails(
          user?.token,
          coupon_id
        );
        const usersData = response.data.data.users;

        const usersWithCountry = await Promise.all(
          usersData.map(async (user) => {
            if (user.pivot.ip_address) {
              try {
                const res = await axios.get(
                  `https://ipinfo.io/${user.ip_address}/json`
                );
                user.country = res.data.country;
                console.log("res");
                console.log(res);
              } catch (error) {
                user.country = "Not found";
              }
            } else {
              user.country = "Not found";
            }
            return user;
          })
        );

        setCouponsDetails({ ...response.data.data, users: usersWithCountry });
        updatePagination(usersWithCountry);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCouponDetails();
  }, [coupon_id, user?.token]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const updatePagination = (userData) => {
    const pages = [];
    const totalPages = Math.ceil(userData.length / pageLimit);
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    setPageTotal(pages);
  };

  useEffect(() => {
    if (couponsDetails?.users) {
      const filteredUsers = couponsDetails.users.filter((user) => {
        const searchTermLowerCase = searchTerm.toLowerCase();
        return (
          user.name.toLowerCase().includes(searchTermLowerCase) ||
          user.country.toLowerCase().includes(searchTermLowerCase)
        );
      });
      updatePagination(filteredUsers);
      setCurrentPage(1);
      setPageOffset(0);
    }
  }, [searchTerm, couponsDetails]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setPageOffset((page - 1) * pageLimit);
  };

  const handleNextPage = () => {
    if (currentPage < pageTotal.length) {
      handlePageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const filteredUsers =
    couponsDetails?.users?.filter((user) => {
      const searchTermLowerCase = searchTerm.toLowerCase();
      return (
        user.name.toLowerCase().includes(searchTermLowerCase) ||
        user.country.toLowerCase().includes(searchTermLowerCase)
      );
    }) || [];

  return (
    <div className="p-2">
      <div className="border h-full p-4">
        <div className="py-4">
          <h1 className="text-2xl font-bold mb-2">Coupon Details</h1>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex flex-col gap-2 font-Lexend">
            {/* Coupon Details */}
            {isLoading ? (
              <>
                <Skeleton width={200} />
                <Skeleton width={200} />
                <Skeleton width={200} />
                <Skeleton width={200} />
                <Skeleton width={200} />
              </>
            ) : (
              <>
                <div className="text-xl flex gap-2 items-center">
                  Coupon Name:{" "}
                  <span className="text-primary">{couponsDetails?.name}</span>
                </div>
                <div className="text-xl flex gap-2 items-center">
                  Coupon Code:{" "}
                  <span className="text-primary">{couponsDetails?.code}</span>
                </div>
                <div className="text-xl flex gap-2 items-center">
                  Discount Rate:{" "}
                  <span className="text-primary">
                    {couponsDetails?.discount_rate}
                  </span>
                </div>
                <div className="text-xl flex gap-2 items-center">
                  Max Usages:{" "}
                  <span className="text-primary">
                    {couponsDetails?.maximum_uses}
                  </span>
                </div>
                <div className="text-xl flex gap-2 items-center">
                  Current Usages:{" "}
                  <span className="text-primary">
                    {couponsDetails?.current_uses}
                  </span>
                </div>
                <div className="text-xl flex gap-2 items-center">
                  Expiry Date:{" "}
                  <span className="text-primary">
                    {formatDate(couponsDetails?.expiry_date)}
                  </span>
                </div>
              </>
            )}
          </div>
          <hr />
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start flex-wrap mt-10 w-full">
            <div className="py-8 px-12 bg-[#0072b1] rounded-t-lg w-full flex items-center justify-between">
              <p className="font_2 text-xl text-white">Usage Users</p>
              <div className="relative max-w-md mx-auto">
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border rounded-lg"
                    placeholder="Search Users by Name or Country..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="bg-[#f4f2f3] py-8 px-4 w-full">
              <table
                className="table-auto w-full text-center text-[#959492] text-md"
                cellPadding={15}
              >
                <thead>
                  <tr>
                    <th>SN</th>
                    <th>Name</th>
                    <th>Country</th>
                    <th>Email</th>
                    <th>Usage Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white rounded-xl">
                  {filteredUsers
                    ?.slice(pageOffset, pageOffset + pageLimit)
                    .map((user, index_user) => (
                      <tr key={user.email}>
                        <td className="w-[10%]">
                          {(currentPage - 1) * pageLimit + index_user + 1}
                        </td>
                        <td>{user.name}</td>
                        <td>{user.country}</td>
                        <td>{user.email}</td>
                        <td>{formatDate(user.pivot.created_at)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="flex justify-between mt-4">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === pageTotal.length}
                  className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowSingleCoupon;
