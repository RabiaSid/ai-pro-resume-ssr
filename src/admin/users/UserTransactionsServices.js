import React, { useEffect, useState } from "react";
import { useAuth } from "../../services/Auth";
import { ApiService } from "../../services/ApiService";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";

const UserTransactionsServices = ({ serviceID }) => {
  const { user } = useAuth();
  const [servicesList, setServicesList] = useState([]);
  const [activeTab, setActiveTab] = useState("delivered");
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  useEffect(() => {
    setLoading(true);

    // Fetch user services and templates
    ApiService.UserServicesAdmin(user?.token, serviceID)
      .then((res) => {
        const { user_services } = res.data.data;
        setServicesList(user_services);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

    // Fetch user details
    const headers = {
      Authorization: `Bearer ${user?.token}`,
    };

    axios
      .get(global.baseurl + "/user_details", { headers })
      .then((response) => {
        setUserDetails(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user, serviceID]);

  if (loading) return <div>Loading...</div>;

  // Filter services based on the active tab
  const filteredServices = servicesList.filter((service) =>
    activeTab === "delivered"
      ? service.expected_delivery !== 0
      : service.expected_delivery === 0
  );

  // Count services for each tab
  const deliveredCount = servicesList.filter(
    (service) => service.expected_delivery !== 0
  ).length;
  const pendingCount = servicesList.filter(
    (service) => service.expected_delivery === 0
  ).length;
  // Total pages
  const totalPages = Math.ceil((filteredServices?.length || 0) / itemsPerPage);

  // Paginate data
  const paginatedData =
    filteredServices?.slice(
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
      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "delivered"
              ? "bg-blue-500 text-white"
              : "text-blue-500 border-2 border-blue-500"
          }`}
          onClick={() => setActiveTab("delivered")}
        >
          Delivered ({deliveredCount})
        </button>
        <button
          className={`px-4 py-2 rounded  ${
            activeTab === "pending"
              ? "bg-blue-500 text-white"
              : "text-blue-500 border-2 border-blue-500"
          }`}
          onClick={() => setActiveTab("pending")}
        >
          Pending Delivery ({pendingCount})
        </button>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left border-b">Sn#</th>
                <th className="px-4 py-2 text-left border-b">Name</th>

                <th className="px-4 py-2 text-left border-b">Price</th>

                <th className="px-4 py-2 text-left border-b">
                  Expected Delivery
                </th>
                <th className="px-4 py-2 text-left border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {" "}
              {Array.isArray(paginatedData) && paginatedData.length > 0 ? (
                paginatedData.map((service, idx) => (
                  <tr key={service.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">
                      {(idx + 1).toString().padStart(2, "0")}
                    </td>
                    <td className="px-4 py-2 border-b">{service.name}</td>

                    <td className="px-4 py-2 border-b">
                      ${service.service_price}
                    </td>

                    <td className="px-4 py-2 border-b">
                      {service?.expected_date
                        ? new Date(service.expected_date).toLocaleDateString()
                        : "--"}
                    </td>
                    <td className="px-4 py-2 border-b">
                      <button className="text-black hover:text-blue-600 mr-2">
                        <FaEdit />
                      </button>
                      <button className="text-black hover:text-blue-600 mr-2">
                        <FaTrashAlt />
                      </button>
                      <button className="text-black hover:text-blue-600">
                        <FaEye />
                      </button>
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
      </div>
    </div>
  );
};

export default UserTransactionsServices;
