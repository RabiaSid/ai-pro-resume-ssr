import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ApiService } from "../../services/ApiService";
import LabelText from "../../components/LabelText";
import { useAuth } from "../../services/Auth";

const Show_Job_Listing = () => {
  const { user } = useAuth();
  const location = useLocation();

  const { appliedJobs_id } = location.state;

  //   Value States
  const [applicantData, setApplicantData] = useState();
  const [resumeUrl, setResumeUrl] = useState("");
  useEffect(() => {
    ApiService.showAppliedJobDetails(user?.token, appliedJobs_id)
      .then((res) => {
        setApplicantData(res.data.data);
        setResumeUrl(res.data.data.resume);
        console.log(res.data.data.resume);
      })
      .catch((err) => console.log(err));
  }, []);

  // Usage
  const handleDownloadFile = (id) => {
    ApiService.downloadResumeAppliedFile(user?.token, id)
      .then((res) => {
        const data = res.data.data;
        // Create a blob URL for the file
        fetch(data.file_path + "/" + data.resume)
          .then((response) => response.blob())
          .then((blob) => {
            // Create a download link
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.setAttribute("download", data.resume);
            document.body.appendChild(link);
            link.click();
            // Clean up
            document.body.removeChild(link);
          })
          .catch((error) => console.error("Error downloading file:", error));
      })
      .catch((err) => console.log(err));
  };
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
                {/* user details */}
                <div className="flex flex-col gap-2 p-4">
                  <div>
                    <h1 className="text-primary font-bold text-2xl">
                      <span>
                        {applicantData?.first_name} {applicantData?.last_name}
                      </span>
                    </h1>
                  </div>
                  <div className="">
                    {/* Number */}
                    <div>
                      <div className="text-sm">
                        Contact Number:{" "}
                        <span className="text-primary">
                          {applicantData?.phone ? applicantData?.phone : "--"}
                        </span>
                      </div>
                    </div>
                    {/* Address */}

                    {/* Email */}
                    <div>
                      <div className="text-sm">
                        Email:{" "}
                        <span className="text-primary">
                          {applicantData?.email ? applicantData?.email : "--"}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm">
                        Deatils:{" "}
                        <span className="text-primary">
                          {applicantData?.details
                            ? applicantData?.details
                            : "--"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div>
              {/* User Selected Package */}

              <div className="p-4">
                <>
                  <h1 className="font-bold text-primary text-lg">
                    Major Details
                  </h1>
                  <div className=" flex flex-col gap-4">
                    <div className="grid sm:grid-cols-2">
                      <LabelText
                        label={"Major"}
                        text={
                          applicantData?.major ? applicantData?.major : "----"
                        }
                      />
                      <LabelText
                        label={"Degree"}
                        text={
                          applicantData?.degree?.title
                            ? applicantData?.degree?.title
                            : "----"
                        }
                      />
                    </div>

                    <div className="grid sm:grid-cols-2">
                      <LabelText
                        label={"Job title"}
                        text={
                          applicantData?.job?.title
                            ? applicantData?.job?.title
                            : "----"
                        }
                      />
                      <LabelText
                        label={"Experience"}
                        text={
                          applicantData?.experience?.body
                            ? applicantData?.experience?.body
                            : "----"
                        }
                      />
                    </div>
                  </div>
                </>
              </div>
              <div className="p-4">
                <h1 className="font-bold text-primary text-lg">Resume</h1>
                <div>
                  <LabelText
                    label={
                      applicantData?.resume ? applicantData?.resume : "----"
                    }
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                    onClick={() => handleDownloadFile(appliedJobs_id)}
                  >
                    Download Resume
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Show_Job_Listing;
