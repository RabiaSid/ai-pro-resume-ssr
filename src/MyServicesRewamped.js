import React, { useEffect, useState } from "react";
// Image
import { Link } from "react-router-dom";
import { ApiService } from "./services/ApiService";
import { useAuth } from "./services/Auth";
import { Tab } from "@headlessui/react";
import progress_loader from "./assets/images/progress_loader.webp";
import tick from "./assets/images/tick.webp";
import download_icon from "./assets/images/download_icon.webp";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import { BiRevision } from "react-icons/bi";
import { useForm, Controller } from "react-hook-form";
import { Tooltip } from "react-tooltip";

const MyServicesRewamped = () => {
  const { user } = useAuth();

  const [myServicesList, setMyServicesList] = useState([]);
  const [unusedResumeTemplates, setUnusedResumeTemplates] = useState([]);
  const [unusedCoverTemplates, setUnusedCoverTemplates] = useState([]);
  const [subscription, setSubscription] = useState();
  // Numbers
  const [d, set_d] = useState(0);
  const [inP, set_InP] = useState(0);
  const [all, set_All] = useState(0);
  const [revision, setrevision] = useState([]);
  const [resume, setResume] = useState(0);
  const [cover, setCover] = useState(0);
  const [user2, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [service_id, setservice_id] = useState();
  const [skeleton, setskeleton] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [AllServiceToShow, setAllServiceToShow] = useState(10);
  const [InProgressServiceToShow, setInProgressServiceToShow] = useState(10);

  const loadData = () => {
    setskeleton(true);
    setLoading(true);
    ApiService.getMyAllServices(user?.token)
      .then((res) => {
        console.log(res.data.data);
        setMyServicesList(res.data.data.user_services);

        const inProgess = [];
        const delivered = [];
        const revisionARR = [];

        set_All(res.data.data.user_services.length);

        res.data.data.user_services.map((service, idx) => {
          if (service.expected_delivery !== 0) {
            if (service.revisions.length > 0) {
              service?.revisions[service?.revisions.length - 1].status ===
                "pending" ||
                service?.revisions[service?.revisions.length - 1].status ===
                "in_process"
                ? revisionARR.push(service)
                : delivered.push(service);
            } else {
              delivered.push(service);
            }
          } else if (service.expected_delivery === 0) {
            inProgess.push(service);
          }
        });
        // console.log("revision array", revisionARR);
        // console.log("delivered array", delivered);
        set_InP(inProgess.length);
        set_d(delivered);
        setrevision(revisionARR);

        // console.log(res.data.data.unused_paid_resume_templates);

        setUnusedResumeTemplates(res.data.data.unused_paid_resume_templates);
        setUnusedCoverTemplates(res.data.data.unused_paid_cover_templates);
        setSubscription(res.data.data.subscription);
        setskeleton(false);
        setLoading(false);
        setResume(res.data.data.unused_paid_resume_templates.length);
        setCover(res.data.data.unused_paid_cover_templates.length);
      })
      .catch((err) => {
        console.log(err);
        setskeleton(false);
        setLoading(false);
      });

    const headers = {
      Authorization: "Bearer " + user?.token,
    };

    axios
      .get(global.baseurl + "/user_details", { headers })
      .then((data) => {
        if (data) {
          setUser(data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const formatDate = (dateString) => {
    // Create a Date object from the input string
    const date = new Date(dateString);

    // Options for formatting the date
    const options = { year: "numeric", month: "long", day: "numeric" };

    // Use toLocaleDateString to format the date
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
  };

  const handleModalClose = (e) => {
    if (e.target.id === "modal-overlay") {
      setIsModalOpen(false);
    }
  };

  const { handleSubmit, control, setValue } = useForm({ mode: "onChange" });

  const submitRevision = (data) => {
    console.log(data);
    ApiService.revisionforservice(user?.token, data, service_id)
      .then((res) => {
        console.log(res);
        setIsModalOpen(false);
        loadData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const RenderStatusButton = (service) => {
    const getRevisionMessage = () => {
      if (service?.revisions.length >= 2) {
        return "You have reached the maximum limit of 2 revisions.";
      } else if (service?.revisions.length === 1) {
        return "You have left with 1 revision.";
      } else {
        return "You have left with 2 revisions.";
      }
    };

    if (service.expected_delivery === 1) {
      return (
        <>
          {service?.revisions.length > 0 ? (
            service?.revisions[service?.revisions?.length - 1].status ===
              "pending" ||
              service?.revisions[service?.revisions?.length - 1].status ===
              "in_process" ? (
              <>
                <span className="bg-[#01B2AC] rounded-3xl px-4 py-2 text-white font-semibold">
                  {service?.revisions[service?.revisions?.length - 1].status}
                </span>
              </>
            ) : (
              <>
                <div className="flex items-center gap-[10px]">
                  <div className="flex items-center py-2 w-32 justify-center bg-[#01B2AC] text-xs sm:text-sm text-white font-bold gap-1 rounded-3xl">
                    Delivered{" "}
                    <img className="w-[20px] h-[20px]" src={tick} alt="tick" />
                  </div>
                  <button
                    className="flex items-center text-sm sm:text-base font-bold"
                    onClick={() => handleDownloadFile(service.id)}
                  >
                    <img src={download_icon} alt="download" />
                  </button>
                  <div
                    className={`relative ${service?.revisions.length >= 2
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                      }`}
                    data-tooltip-id="revision-tooltip"
                    data-tooltip-content={getRevisionMessage()}
                  >
                    <BiRevision
                      size={30}
                      className={`${service?.revisions.length >= 2 ? "text-gray-400" : ""
                        }`}
                      onClick={() => {
                        if (service?.revisions.length < 2) {
                          setIsModalOpen(true);
                          setservice_id(service.id);
                          setValue("user_comments", "");
                        }
                      }}
                    />
                  </div>
                  <Tooltip
                    id="revision-tooltip"
                    className="bg-black text-white p-2 rounded"
                  />

                  {/* Modal */}
                  {isModalOpen && (
                    <div
                      id="modal-overlay"
                      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                      onClick={handleModalClose}
                    >
                      <div className="bg-gray-100 rounded-lg p-6 w-11/12 sm:w-3/4 lg:w-1/3">
                        <h2 className="text-lg font-bold mb-4">Add Revision</h2>
                        <form onSubmit={handleSubmit(submitRevision)}>
                          <Controller
                            name="user_comments"
                            control={control}
                            rules={{
                              required: "This field is required.",
                              maxLength: {
                                value: 1000,
                                message:
                                  "You can enter up to 1000 characters only.",
                              },
                            }}
                            render={({ field, fieldState: { error } }) => (
                              <div>
                                <textarea
                                  {...field}
                                  className={`w-full p-3 border ${error ? "border-red-500" : "border-gray-300"
                                    } rounded-lg focus:outline-none focus:ring-2 ${error
                                      ? "focus:ring-red-500"
                                      : "focus:ring-[#01B2AC]"
                                    } resize-none`}
                                  rows="5"
                                  placeholder="Enter your revision notes here..."
                                ></textarea>
                                {error && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {error.message}
                                  </p>
                                )}
                              </div>
                            )}
                          />
                          <div className="flex justify-end mt-4">
                            <button className="bg-[#01B2AC] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#019f9a] transition-all">
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )
          ) : (
            <>
              <div className="flex items-center gap-[10px]">
                <div className="flex items-center py-2 w-32 justify-center bg-[#01B2AC] text-xs sm:text-sm text-white font-bold gap-1 rounded-3xl">
                  Delivered{" "}
                  <img className="w-[20px] h-[20px]" src={tick} alt="tick" />
                </div>
                <button
                  className="flex items-center text-sm sm:text-base font-bold"
                  onClick={() => handleDownloadFile(service.id)}
                >
                  <img src={download_icon} alt="download" />
                </button>
                <div
                  className={`relative ${service?.revisions.length >= 2
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                    }`}
                  data-tooltip-id="revision-tooltip"
                  data-tooltip-content={getRevisionMessage()}
                >
                  <BiRevision
                    size={30}
                    className={`${service?.revisions.length >= 2 ? "text-gray-400" : ""
                      }`}
                    onClick={() => {
                      if (service?.revisions.length < 2) {
                        setIsModalOpen(true);
                        setservice_id(service.id);
                        setValue("user_comments", "");
                      }
                    }}
                  />
                </div>
                <Tooltip
                  id="revision-tooltip"
                  className="bg-black text-white p-2 rounded"
                />

                {/* Modal */}
                {isModalOpen && (
                  <div
                    id="modal-overlay"
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    onClick={handleModalClose}
                  >
                    <div className="bg-gray-100 rounded-lg p-6 w-11/12 sm:w-3/4 lg:w-1/3">
                      <h2 className="text-lg font-bold mb-4">Add Revision</h2>
                      <form onSubmit={handleSubmit(submitRevision)}>
                        <Controller
                          name="user_comments"
                          control={control}
                          rules={{
                            required: "This field is required.",
                            maxLength: {
                              value: 1000,
                              message:
                                "You can enter up to 1000 characters only.",
                            },
                          }}
                          render={({ field, fieldState: { error } }) => (
                            <div>
                              <textarea
                                {...field}
                                className={`w-full p-3 border ${error ? "border-red-500" : "border-gray-300"
                                  } rounded-lg focus:outline-none focus:ring-2 ${error
                                    ? "focus:ring-red-500"
                                    : "focus:ring-[#01B2AC]"
                                  } resize-none`}
                                rows="5"
                                placeholder="Enter your revision notes here..."
                              ></textarea>
                              {error && (
                                <p className="text-red-500 text-sm mt-1">
                                  {error.message}
                                </p>
                              )}
                            </div>
                          )}
                        />
                        <div className="flex justify-end mt-4">
                          <button className="bg-[#01B2AC] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#019f9a] transition-all">
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </>
      );
    } else {
      return (
        <div className="flex items-center px-2 bg-[#01B2AC] rounded-3xl">
          <div className="flex items-center py-2 w-32 justify-center bg-transparent text-xs sm:text-sm text-white font-bold gap-1 rounded-md">
            In Progress <img src={progress_loader} className="animate-spin" />
          </div>
        </div>
      );
    }
  };

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

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleAllServiceToShow = () => {
    setAllServiceToShow(AllServiceToShow + 10);
  };

  const handleInProgressServiceToShow = () => {
    setInProgressServiceToShow(InProgressServiceToShow + 10);
  };

  const filteredServices = myServicesList.filter(
    (service) => service.expected_delivery === 0
  );

  return (
    <div>
      {/* End Banner */}
      <div className="w-full lg:w-[80%] m-auto pt-[0px]">
        {/* Content */}
        <div className="">
          <div className="flex flex-col-reverse xl:grid xl:grid-cols-[60%,37.5%] p-4 gap-7 background_shade1">
            {/* Left Section */}
            <div className="w-full lg:w-[100%]  rounded-3xl h-auto flex flex-col">
              {/* tab Section */}
              <div
                style={{ boxShadow: "0 0 10px #01B2AC40" }}
                className="w-full border-2 border-white rounded-3xl flex flex-col items-center justify-center overflow-hidden"
              >
                <Tab.Group>
                  <Tab.List className="flex items-center justify-center lg:justify-start text-xs lg:text-md gap-[20px] md:gap-[100px] lg:gap-[50px] font-bold w-full lg:w-[100%] p-2 lg:p-5 bg-[#ffffff90] border-b-2">
                    {/* all */}
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          selected
                            ? " text-[#01B2AC] flex gap-2 focus-visible:outline-none border-b-2 border-[#01B2AC]"
                            : "text-[#737373] flex gap-2 focus-visible:outline-none "
                        )
                      }
                    >
                      ALL SERVICES{" "}
                      <span className="hidden lg:block">({all ? all : 0})</span>
                    </Tab>

                    {/* in progress */}
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          selected
                            ? " text-[#01B2AC] flex gap-2 focus-visible:outline-none border-b-2 border-[#01B2AC]"
                            : "text-[#737373] flex gap-2 focus-visible:outline-none "
                        )
                      }
                    >
                      IN PROGRESS{" "}
                      <span className="hidden lg:block">({inP ? inP : 0})</span>
                    </Tab>

                    {/* delivered */}
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          selected
                            ? " text-[#01B2AC] flex gap-2 focus-visible:outline-none border-b-2 border-[#01B2AC]"
                            : "text-[#737373] flex gap-2 focus-visible:outline-none "
                        )
                      }
                    >
                      DELIVERED{" "}
                      <span className="hidden lg:block">
                        ({d ? d.length : 0})
                      </span>
                    </Tab>

                    {/* revisions */}
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          selected
                            ? " text-[#01B2AC] flex gap-2 focus-visible:outline-none border-b-2 border-[#01B2AC]"
                            : "text-[#737373] flex gap-2 focus-visible:outline-none "
                        )
                      }
                    >
                      REVISIONS
                      <span className="hidden lg:block">
                        ({revision ? revision.length : 0})
                      </span>
                    </Tab>
                  </Tab.List>

                  {skeleton ? (
                    <div className="w-full px-5 overflow-hidden">
                      <Skeleton className="w-[90%] my-3 h-[86px] skeleton" />
                      <Skeleton className="w-[90%] my-3 h-[86px] skeleton" />
                      <Skeleton className="w-[90%] my-3 h-[86px] skeleton" />
                      <Skeleton className="w-[90%] my-3 h-[86px] skeleton" />
                    </div>
                  ) : (
                    <Tab.Panels className="mt-[0px] w-[100%]">
                      {/* all services */}
                      <Tab.Panel>
                        {/* Progress Section */}
                        <div className="flex flex-col gap-4 bg-[#ffffff90]">
                          {/* List Of Orders */}
                          {myServicesList.length > 0 ? (
                            <div className="flex flex-col gap-8 p-5">
                              {myServicesList
                                ?.slice(0, AllServiceToShow)
                                .map((service, idx) => {
                                  return (
                                    <div
                                      key={idx}
                                      className="border p-2 lg:p-2 rounded-3xl border-[#01B2AC]"
                                    >
                                      <div className="main flex flex-col sm:flex sm:flex-row items-center justify-between px-1 sm:px-5 gap-2">
                                        <div className="flex items-center justify-center gap-5">
                                          <div className="index_no text-muted text-lg text-center flex justify-center items-center">
                                            {(idx + 1)
                                              .toString()
                                              .padStart(2, "0")}
                                          </div>

                                          <div className="service_content flex flex-col items-start justify-center w-full lg:w-[300px]">
                                            <div className="date flex items-center justify-center text-xs gap-[10px] sm:gap-[20px] text-[#01B2AC] font-semibold">
                                              <span className="text-black">
                                                Expected Delivery:
                                              </span>{" "}
                                              {formatDate(
                                                service.expected_date
                                              )}
                                            </div>
                                            <div className="name text-[#01B2AC] font-bold text-sm sm:text-lg">
                                              {" "}
                                              {service.name}
                                            </div>
                                            <div className="price text-md text-[#0072B1] font-bold">
                                              {" "}
                                              $ {service.service_price}
                                            </div>
                                          </div>
                                        </div>

                                        <div className="service_status rounded-3xl">
                                          {RenderStatusButton(service)}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          ) : (
                            <div className="m-2 text-center">
                              No Services To Show
                            </div>
                          )}
                        </div>

                        {AllServiceToShow < myServicesList.length && (
                          <div className="flex items-center justify-center pb-4 mt-[10px]">
                            <button
                              onClick={handleAllServiceToShow}
                              className="text-white rounded-2xl font-semibold px-4 py-2 bg-[#0072B1] text-md hover:text-white hover:bg-[#01B2AC]"
                            >
                              Load More
                            </button>
                          </div>
                        )}
                      </Tab.Panel>

                      {/* inprogress service */}
                      <Tab.Panel>
                        {/* Progress Section */}

                        <div className="flex flex-col gap-4 bg-[#ffffff90]">
                          {/* List Of Orders */}
                          {filteredServices.length > 0 ? (
                            <div className="flex flex-col gap-8 p-5">
                              {filteredServices
                                ?.slice(0, InProgressServiceToShow)
                                .map((service, idx) => {
                                  return (
                                    <div
                                      key={idx}
                                      className="border p-2 lg:p-2 rounded-3xl border-[#01B2AC]"
                                    >
                                      <div className="main flex flex-col sm:flex sm:flex-row items-center justify-between px-1 sm:px-5 gap-2">
                                        <div className="flex items-center justify-center gap-5">
                                          <div className="index_no text-muted text-lg text-center flex justify-center items-center">
                                            {(idx + 1)
                                              .toString()
                                              .padStart(2, "0")}
                                          </div>

                                          <div className="service_content flex flex-col items-start justify-center w-full lg:w-[300px]">
                                            <div className="date flex items-center justify-center text-xs gap-[10px] sm:gap-[20px] text-[#01B2AC] font-semibold">
                                              <span className="text-black">
                                                Expected Delivery:
                                              </span>{" "}
                                              {formatDate(
                                                service.expected_date
                                              )}
                                            </div>
                                            <div className="name text-[#01B2AC] font-bold text-sm sm:text-lg">
                                              {" "}
                                              {service.name}
                                            </div>
                                            <div className="price text-md text-[#0072B1] font-bold">
                                              {" "}
                                              $ {service.service_price}
                                            </div>
                                          </div>
                                        </div>

                                        <div className="service_status rounded-3xl">
                                          {RenderStatusButton(service)}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          ) : (
                            <div className="m-2 text-center">
                              No In Progress Services To Show
                            </div>
                          )}
                        </div>

                        {InProgressServiceToShow < myServicesList.length && (
                          <div className="flex items-center justify-center pb-4 mt-[10px]">
                            <button
                              onClick={handleInProgressServiceToShow}
                              className="text-white rounded-2xl font-semibold px-4 py-2 bg-[#0072B1] text-md hover:text-white hover:bg-[#01B2AC]"
                            >
                              Load More
                            </button>
                          </div>
                        )}
                      </Tab.Panel>

                      {/* delivered services */}
                      <Tab.Panel>
                        {/* Progress Section */}
                        <div className="flex flex-col gap-4 bg-[#ffffff90]">
                          {/* List Of Orders */}
                          {d.length > 0 ? (
                            <div className="flex flex-col gap-8 p-5">
                              {d?.map((service, idx) => {
                                return (
                                  <div
                                    key={idx}
                                    className="border p-2 lg:p-2 rounded-3xl border-[#01B2AC]"
                                  >
                                    <div className="main flex flex-col sm:flex sm:flex-row items-center justify-between px-1 sm:px-5 gap-2">
                                      <div className="flex items-center justify-center gap-5">
                                        <div className="index_no text-muted text-lg text-center flex justify-center items-center">
                                          {(idx + 1)
                                            .toString()
                                            .padStart(2, "0")}
                                        </div>

                                        <div className="service_content flex flex-col items-start justify-center w-full lg:w-[300px]">
                                          <div className="date flex items-center justify-center text-xs gap-[10px] sm:gap-[20px] text-[#01B2AC] font-semibold">
                                            <span className="text-black">
                                              Expected Delivery:
                                            </span>{" "}
                                            {formatDate(service.expected_date)}
                                          </div>
                                          <div className="name text-[#01B2AC] font-bold text-sm sm:text-lg">
                                            {" "}
                                            {service.name}
                                          </div>
                                          <div className="price text-md text-[#0072B1] font-bold">
                                            {" "}
                                            $ {service.service_price}
                                          </div>
                                        </div>
                                      </div>

                                      <div className="service_status rounded-3xl">
                                        {RenderStatusButton(service)}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="m-2 text-center">
                              No Delivered Services To Show
                            </div>
                          )}
                        </div>
                      </Tab.Panel>

                      {/* {revisons} */}
                      <Tab.Panel>
                        <div className="flex flex-col gap-4 bg-[#ffffff90]">
                          {revision.length > 0 ? (
                            <div className="flex flex-col gap-8 p-5">
                              {revision?.map((service, idx) => {
                                return (
                                  <div
                                    key={idx}
                                    className="border p-2 lg:p-2 rounded-3xl border-[#01B2AC]"
                                  >
                                    <div className="main flex flex-col sm:flex sm:flex-row items-center justify-between px-1 sm:px-5 gap-2">
                                      <div className="flex items-center justify-center gap-5">
                                        <div className="index_no text-muted text-lg text-center flex justify-center items-center">
                                          {(idx + 1)
                                            .toString()
                                            .padStart(2, "0")}
                                        </div>

                                        <div className="service_content flex flex-col items-start justify-center w-full lg:w-[300px]">
                                          <div className="date flex items-center justify-center text-xs gap-[10px] sm:gap-[20px] text-[#01B2AC] font-semibold">
                                            <span className="text-black">
                                              Expected Delivery:
                                            </span>{" "}
                                            {formatDate(service.expected_date)}
                                          </div>
                                          <div className="name text-[#01B2AC] font-bold text-sm sm:text-lg">
                                            {" "}
                                            {service.name}
                                          </div>
                                          <div className="price text-md text-[#0072B1] font-bold">
                                            {" "}
                                            $ {service.service_price}
                                          </div>
                                        </div>
                                      </div>

                                      <div className="rounded-3xl bg-[#01B2AC] text-white px-4 py-2 font-semibold">
                                        {RenderStatusButton(service)}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="m-2 text-center">
                              No Revison Services To Show
                            </div>
                          )}
                        </div>
                      </Tab.Panel>
                    </Tab.Panels>
                  )}
                </Tab.Group>
              </div>
            </div>
            {/* Right Section */}
            <div className="flex items-start justify-center w-full top-[50px] xl:sticky xl:top-5">
              <div className="flex flex-col items-center justify-center w-[320px] md:w-[650px] xl:w-[100%] p-6 border-2 border-dashed border-gray-500 rounded-3xl bg-[#ffffff40]">
                <div className="sm:w-[100%] flex flex-col justify-center">
                  <div className="pb-[30px]">
                    <h1 className="text-lg text-[#01B2AC] font-bold">
                      SUBSCRIPTION
                    </h1>
                  </div>
                  {/* Plan Section */}
                  <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-2  gap-[40px] lg:gap-10">
                      <span className="font-bold text-[#01B2AC] text-sm">
                        Plan
                      </span>
                      <span className="font-bold text-[#0072B1] text-sm lg:text-md">
                        {subscription?.package.name}
                      </span>
                    </div>
                    {subscription?.package.name != "Free" ? (
                      <>
                        {loading ? (
                          <div className="grid grid-cols-2 gap-[40px] lg:gap-10">
                            <span className="font-bold text-[#01B2AC] text-sm">
                              Registration Date
                            </span>
                            <Skeleton />
                            <span className="font-bold text-[#01B2AC] text-sm">
                              Expiry Date
                            </span>
                            <Skeleton />
                          </div>
                        ) : (
                          <>
                            <div className="grid grid-cols-2 gap-[40px] lg:gap-10">
                              <span className="font-bold text-[#01B2AC] text-sm">
                                Registration Date
                              </span>
                              <span className="text-sm lg:text-md text-black font-bold">
                                {formatDate(subscription?.start_date)}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-[40px] lg:gap-10">
                              <span className="font-bold text-[#01B2AC] text-sm">
                                Expiry Date
                              </span>
                              <span className="text-sm lg:text-md text-black font-bold">
                                {formatDate(subscription?.end_date)}
                              </span>
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col lg:flex lg:flex-row items-start justify-center gap-5 my-10">
            <div className="w-[90%]  lg:w-[48%]">
              {/* Heading */}
              <div className="flex items-center justify-start gap-2">
                <h1 className="text-xl font-bold sm:font-bold sm:text-xl text-[#01B2AC]">
                  Use Premium Resume Templates
                </h1>
                <span className="text-xl font-bold sm:font-bold sm:text-xl text-[#01B2AC] hidden lg:block">
                  (
                  {user2.max_res_templates <= user2.current_res_usage
                    ? 0
                    : resume
                      ? resume
                      : 0}
                  )
                </span>
              </div>
              {/* Resume Templates  */}
              {subscription?.package.name != "Free" ? (
                <div className="w-[100%] lg:w-[100%] flex flex-col items-center justify-center gap-4 p-4 mt-2 rounded-3xl resume">
                  {user2.max_res_templates <= user2.current_res_usage ? (
                    "You have utilized the current paid template. Please Upgrade Your Package"
                  ) : (
                    <div className="grid w-[100%]  xl:grid-cols-2 gap-8">
                      {unusedResumeTemplates?.map((resume, idx) => (
                        <div
                          key={idx}
                          className="bg-[#F4F4F4] p-3 font-bold sm:font-bold sm:text-xl text-[#01B2AC] rounded-3xl"
                        >
                          {resume.name}
                          <div className="relative group dd_btn4">
                            <img
                              src={global.imageUrl + resume.image}
                              alt="tmp"
                              className="rounded-xl"
                            />
                            <div className="dd_menu4 rounded-xl z-30 absolute bg-[rgba(0,0,0,0.2)] top-0 left-0 w-[100%] h-[100%] justify-evenly items-end p-2 ">
                              <Link
                                to={"/resume/formatting"}
                                state={{
                                  selectedTemplateId: resume.id,
                                  isExample: false,
                                }}
                                className="absolute box2 shadow-lg rounded-3xl py-2 cursor-pointer JosefinSans text-md bg-[#01B2AC] hover:bg-[#0072b1] text-white w-[60%] flex justify-center items-center flex-wrap"
                              >
                                Use
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-[100%] lg:w-[100%] flex flex-col items-center justify-center gap-4 p-4 mt-2 rounded-3xl resume">
                  In order to use premium templates, please upgrade your plan
                </div>
              )}
            </div>

            <div className="w-[90%]  lg:w-[48%]">
              {/* Heading */}
              <div className="flex items-center justify-start gap-2">
                <h1 className="text-xl font-bold sm:font-bold sm:text-xl text-[#01B2AC]">
                  Use Premium Cover Letter Templates
                </h1>
                <span className="text-xl font-bold sm:font-bold sm:text-xl text-[#01B2AC] hidden lg:block">
                  (
                  {user2.max_cover_templates <= user2.current_cover_usage
                    ? 0
                    : cover
                      ? cover
                      : 0}
                  )
                </span>
              </div>
              {/* My Cover Letters Template  */}
              {subscription?.package.name != "Free" ? (
                <div className="w-[100%] lg:w-[100%] flex flex-col items-center justify-center gap-4 p-4 mt-2 rounded-3xl resume">
                  {user2.max_cover_templates <= user2.current_cover_usage ? (
                    "You have utilized the current paid template. Please Update Your Package"
                  ) : (
                    <div className="grid w-[100%]  xl:grid-cols-2 gap-8">
                      {unusedCoverTemplates?.map((cover, idx) => (
                        <div
                          key={idx}
                          className="bg-[#F4F4F4] p-3 font-bold sm:font-bold sm:text-xl text-[#01B2AC] rounded-3xl"
                        >
                          {cover.name}
                          <div className="relative group dd_btn4">
                            <img
                              src={global.imageUrl + cover.image}
                              alt="tmp"
                              className="rounded-xl"
                            />
                            <div className="dd_menu4 rounded-xl z-30 absolute bg-[rgba(0,0,0,0.2)] top-0 left-0 w-[100%] h-[100%] justify-evenly items-end p-2 ">
                              <Link
                                to={"/create-cover-letter/formatting"}
                                state={{
                                  selectedTemplateId: cover.id,
                                  isExample: false,
                                }}
                                className="absolute box2 shadow-lg rounded-3xl py-2 cursor-pointer JosefinSans text-md bg-[#01B2AC] hover:bg-[#0072b1] text-white w-[60%] flex justify-center items-center flex-wrap"
                              >
                                Use
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-[100%] lg:w-[100%] flex flex-col items-center justify-center gap-4 p-4 mt-2 rounded-3xl resume">
                  In order to use premium templates, please upgrade your plan
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyServicesRewamped;
