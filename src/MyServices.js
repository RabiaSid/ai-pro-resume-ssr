import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { AiOutlineCheck } from "react-icons/ai";
import { HiDownload } from "react-icons/hi";
// Image
import { Link } from "react-router-dom";
import { ApiService } from "./services/ApiService";
import { GiClockwiseRotation } from "react-icons/gi";
import { useAuth } from "./services/Auth";

const MyServices = () => {
  const { user } = useAuth();

  const formatDate = (dateString) => {
    // Create a Date object from the input string
    const date = new Date(dateString);

    // Options for formatting the date
    const options = { year: "numeric", month: "long", day: "numeric" };

    // Use toLocaleDateString to format the date
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
  };

  const RenderStatusButton = (id, status, deliveryData) => {
    if (status === 1) {
      return (
        <div className="flex items-center gap-4 w-[270px] ">
          <div className="flex items-center border border-[#15c4a4] py-2 w-32 justify-center bg-[#15c4a4] text-xs sm:text-sm text-white font-bold gap-1 rounded-md">
            DELIVERED <AiOutlineCheck />{" "}
          </div>
          <button
            className="flex gap-1 items-center text-sm sm:text-base font-bold"
            onClick={() => handleDownloadFile(id)}
          >
            Download <HiDownload className="text-primary" />
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-4 w-[270px]">
          <div className="flex items-center border border-black py-2 w-32 justify-center bg-transparent text-xs sm:text-sm text-black font-bold gap-1 rounded-md">
            INPROGRESS{" "}
            <GiClockwiseRotation className="text-primary animate-spin text-sm" />{" "}
          </div>
          <div className="flex flex-col leading-3">
            <span className="font-semibold text-sm">Expected Delivery</span>
            <span className="text-muted text-sm">
              {formatDate(deliveryData)}
            </span>
          </div>
        </div>
      );
    }
  };

  const [myServicesList, setMyServicesList] = useState([]);
  const [unusedResumeTemplates, setUnusedResumeTemplates] = useState([]);
  const [unusedCoverTemplates, setUnusedCoverTemplates] = useState([]);
  const [subscription, setSubscription] = useState();

  useEffect(() => {
    ApiService.getMyAllServices(user?.token)
      .then((res) => {
        setMyServicesList(res.data.data.user_services);
        setUnusedResumeTemplates(res.data.data.unused_paid_resume_templates);
        setUnusedCoverTemplates(res.data.data.unused_paid_cover_templates);
        setSubscription(res.data.data.subscription);
      })
      .catch((err) => console.log(err));
  }, []);

  // Usage
  const handleDownloadFile = (id) => {
    ApiService.downloadMyServiceFile(user?.token, id)
      .then((res) => {
        const data = res.data.data;
        // Create a blob URL for the file
        fetch(data.file_url + "/" + data.delivered_file)
          .then((response) => response.blob())
          .then((blob) => {
            // Create a download link
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.setAttribute("download", data.delivered_file);
            document.body.appendChild(link);
            link.click();
            // Clean up
            document.body.removeChild(link);
          })
          .catch((error) => console.error("Error downloading file:", error));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Header />

      {/* End Banner */}
      <div className="w-full lg:w-[80%] m-auto pt-[0px]">
        <div className="container m-auto py-6 sm:py-20 px-4 sm:px-0">
          {/* Content */}
          <div className="bg-primary-gray">
            <div className="grid lg:grid-cols-[60%,40%] p-4">
              {/* Left Section */}
              <div className="lg:border-r-2 h-auto p-6 flex flex-col gap-8">
                {/* Progress Section */}
                <div className="flex flex-col gap-4">
                  {/* Heading */}
                  <div>
                    <h1 className="text-lg font-bold">MY SERVICES</h1>
                  </div>
                  {/* List Of Orders */}
                  <div className="flex flex-col gap-8">
                    {myServicesList?.map((service, idx) => {
                      return (
                        <div key={idx}>
                          <div className="flex flex-col sm:flex-row gap-3 items-center">
                            <div className="flex gap-3 items-center flex-1 w-full">
                              <span className="text-muted text-sm w-[15px]">
                                {(idx + 1).toString().padStart(2, "0")}
                              </span>
                              <h1 className="text-primary font-bold text-sm sm:text-lg flex-1">
                                {service.name}
                              </h1>
                              <span className="text-xs font-bold sm:hidden block ">
                                $ {service.service_price}
                              </span>
                            </div>
                            {/* Status */}
                            <div className="">
                              {RenderStatusButton(
                                service.id,
                                service.expected_delivery,
                                service.expected_date
                              )}
                            </div>
                          </div>
                          {/* Price */}
                          <div className="hidden sm:block">
                            <span className="text-base font-bold ">
                              $ {service.service_price}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <hr />
                {/* Resume Templates  */}
                <div className="flex flex-col gap-4">
                  {/* Heading */}
                  <div>
                    <h1 className="text-xl font-bold sm:font-normal sm:text-lg text-primary">
                      My Resume Template
                    </h1>
                  </div>
                  {/*  */}
                  <div className="grid sm:grid-cols-3 xl:grid-cols-4 gap-8">
                    {/* 1 */}
                    {unusedResumeTemplates?.map((resume, idx) => (
                      <div key={idx} className="relative group h-[250px]">
                        <img
                          src={global.imageUrl + resume.image}
                          className=" w-full h-full"
                          alt="tmp"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end">
                          <div className="bg-[#15c4a4] text-sm font-semibold rounded-lg flex justify-center items-center">
                            <Link
                              to={"#"}
                              className="py-2 sm:py-1.5 w-full rounded-lg text-white text-center"
                            >
                              USE THIS TEMPLATE {resume.id}
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <hr />
                {/* My Cover Letters Template  */}
                <div className="flex flex-col gap-4">
                  {/* Heading */}
                  <div>
                    <h1 className="text-xl font-bold sm:font-normal sm:text-lg text-primary">
                      My Cover Letters Template
                    </h1>
                  </div>
                  {/*  */}
                  <div className="grid sm:grid-cols-3 xl:grid-cols-4 gap-8">
                    {unusedCoverTemplates?.map((cover, idx) => (
                      <div key={idx} className="relative group sm:h-[250px]">
                        <img
                          src={global.imageUrl + cover.image}
                          className=" w-full h-full"
                          alt="tmp"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end">
                          <div className="bg-[#15c4a4] text-sm font-semibold rounded-lg flex justify-center items-center">
                            <Link
                              to={"#"}
                              className="py-2 sm:py-1.5 w-full rounded-lg text-white text-center"
                            >
                              USE THIS TEMPLATE
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Right Section */}
              <div className="p-6">
                <div className="sm:w-[60%]">
                  <div>
                    <h1 className="text-lg font-bold">SUBSCRIPTION</h1>
                  </div>
                  {/* Plan Section */}
                  <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-2 gap-4">
                      <span className="font-bold text-sm">plan</span>
                      <span className="font-bold text-sm">
                        {subscription?.package.name}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <span className="font-bold text-sm">
                        Registration Date
                      </span>
                      <span className="text-sm text-muted">
                        {formatDate(subscription?.start_date)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <span className="font-bold text-sm">Expiry Date</span>
                      <span className="text-sm text-muted">
                        {formatDate(subscription?.end_date)}
                      </span>
                    </div>
                  </div>
                  {/* Change Paymanet MMethod Button */}
                  <div className="py-4 flex flex-col gap-4">
                    <Link to={"#"} className="text-base text-primary">
                      Change Payment Method
                    </Link>
                    <div>
                      <Link
                        className="bg-primary-green text-white w-full py-2 text-lg font-bold rounded-lg text-center"
                        type="button"
                        to={"/packages"}
                      >
                        UPGRADE TO PREMIUM
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyServices;
