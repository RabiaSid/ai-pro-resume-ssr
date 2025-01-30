import React, { useEffect, useState } from "react";
import { ApiService } from "../../services/ApiService";
import AllborderInputGroup from "../../components/AllborderInputGroup";
import swal from "sweetalert";
import LoadingSpinner from "../../components/LoadingSpinner"; // Fixed import typo
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../services/Auth";

const UpdateUserService = () => {
  const { user } = useAuth();
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { userServices_id } = location.state;
  const [sliderimageUpdated, setSliderimageUpdated] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [delivery, setDelivery] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [revision, setrevision] = useState([]);
  const [revisionStatus, setrevisionStatus] = useState("");
  const [revUserComments, setrevUserComments] = useState("");
  const [revisionFile, setrevisionFile] = useState();
  const [newrevfile, setnewrevfile] = useState();
  const [err, seterr] = useState();
  const [UserFileName, setUserFileName] = useState("");

  useEffect(() => {
    ApiService.showUserServicesDetails(user?.token, userServices_id)
      .then((res) => {
        console.log(res.data.data);
        setrevision(res.data.data.revisions);
        setrevisionStatus(
          res.data.data.revisions[res.data.data?.revisions?.length - 1]?.status
        );
        setrevUserComments(
          res.data.data.revisions[res.data.data?.revisions?.length - 1]
            ?.user_comments
        );
        setrevisionFile(
          res.data.data.revisions[res.data.data?.revisions?.length - 1]?.file
        );
        const { delievered, modified_file, file_url } = res.data.data;
        setDelivery(delievered);
        setUserFileName(modified_file);
        setUploadedFile(`${file_url}/${modified_file}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Update User Services
  const handleUpdateServices = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      modified_file: uploadedFile,
      delievered: delivery,
    };

    ApiService.updateUserServices(user?.token, userServices_id, data)
      .then((res) => {
        setIsLoading(false);
        swal({
          title: res.data.message,
          icon: "success",
        }).then(() => navigate(-1));
      })
      .catch((err) => {
        setIsLoading(false);
        setErrors(Object.values(err.response.data.errors));
      });
  };

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadedFile(file);
    setSliderimageUpdated(true);
    // console.log(uploadedFile);
  };

  const handleRevisionUpdate = (rev_id) => {
    setIsLoading(true);

    const revisionData = {
      status: revisionStatus,
      file: newrevfile,
      user_comments: revUserComments,
    };

    ApiService.updateUserServicesRevision(
      user?.token,
      rev_id,
      revisionData,
      userServices_id
    )
      .then((res) => {
        setIsLoading(false);
        swal({
          title: res.data.message,
          icon: "success",
        }).then(() => window.location.reload());
      })
      .catch((err) => {
        setIsLoading(false);
        setErrors(Object.values(err.response.data.errors));
      });
  };

  // Handle file download
  const handleFileDownload = async () => {
    try {
      const response = await fetch(uploadedFile, {
        method: "GET",
        headers: {
          "Content-Type": "application/octet-stream",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", UserFileName || "file"); // Use the original file name or fallback to "file"
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the file", error);
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner isLoading={isLoading} />}
      <div className="p-2">
        {/* Service Update Form */}
        <div className="border h-full p-4">
          <h1 className="text-2xl font-bold">Update User Services</h1>
          <AllborderInputGroup
            htmlFor={"delivery"}
            isRequired={true}
            label={"Delivered"}
            onchange={(val) => setDelivery(val)}
            value={delivery}
            type="select"
            options={[
              { label: "No", value: 0 },
              { label: "Yes", value: 1 },
            ]}
            disabled={revision.length > 0} // Read-only if revisions exist
          />
          <div className="py-2 flex flex-col gap-2">
            <label>Upload File</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="border border-gray-300 p-2"
              accept=".pdf,.doc,.docx,.png,.jpg"
              disabled={revision.length > 0} // Read-only if revisions exist
            />
            {/* Download File */}
            {UserFileName && (
              <div className="py-2 w-full flex flex-col gap-2">
                <label className="text-muted">
                  User Submitted File Download:{" "}
                </label>
                {uploadedFile &&
                !sliderimageUpdated &&
                UserFileName != "undefined" ? (
                  <div className="flex items-center gap-2">
                    <h1 className="text-lg text-primary font-bold">
                      {UserFileName}
                    </h1>

                    <button
                      type="button"
                      className="btn btn-primary font-bold bg-[#0072b1] px-3 py-1 rounded-lg text-white"
                      onClick={handleFileDownload}
                    >
                      Download
                    </button>
                  </div>
                ) : (
                  <h1 className="text-lg text-primary font-bold">
                    File Not Attached
                  </h1>
                )}
              </div>
            )}
          </div>
          <ul>
            {errors?.map((err) => (
              <li key={err} className="text-red-500">
                {err}
              </li>
            ))}
          </ul>
          <button
            type="submit"
            className={`bg-primary text-white font-bold px-4 py-2 mt-3 ${
              revision.length > 0 ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={handleUpdateServices}
            disabled={revision.length > 0} // Disable button if revisions exist
          >
            Update
          </button>
        </div>

        {/* Revision Forms */}
        {revision.length > 0 &&
          revision.map((rev, index) => (
            <form
              key={rev.id}
              onSubmit={(e) => {
                e.preventDefault();
                // Validation: If status is 'delivered', file must be uploaded
                if (revisionStatus === "delivered" && !newrevfile) {
                  seterr(["File is required when the status is delivered"]);
                  return;
                }
                // Clear errors and proceed with submission
                seterr([]);
                handleRevisionUpdate(rev.id);
              }}
              className="border h-full p-4 my-4"
            >
              <h2 className="text-xl font-bold">Revision {index + 1}</h2>
              <p className="text-gray-600 text-sm font-semibold mt-4">
                User Comments: {rev.user_comments}
              </p>
              <div className="py-2 flex flex-col gap-2">
                <label>Status</label>
                <select
                  defaultValue={rev.status}
                  disabled={rev.status === "delivered"}
                  onChange={(e) => setrevisionStatus(e.target.value)}
                  className="border border-gray-300 p-2"
                >
                  <option value="pending">Pending</option>
                  <option value="in_process">In Process</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
              <div className="py-2 flex flex-col gap-2">
                <label>Upload File</label>
                <input
                  type="file"
                  disabled={rev.status === "delivered"}
                  onChange={(e) => setnewrevfile(e.target.files[0])}
                  className="border border-gray-300 p-2"
                  accept=".pdf,.doc,.docx,.png,.jpg"
                />
              </div>
              <div className="flex items-center gap-2">
                <span>{rev.file}</span>
                <a
                  href={`https://backend.aiproresume.com/public/images/${rev.file}`}
                  download
                  className="btn btn-primary font-bold bg-[#0072b1] px-3 py-1 rounded-lg text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download
                </a>
              </div>
              {err?.length > 0 && (
                <ul>
                  {err.map((er, idx) => (
                    <li key={idx} className="text-red-500">
                      {er}
                    </li>
                  ))}
                </ul>
              )}
              <button
                type="submit"
                disabled={rev.status === "delivered"}
                className={`px-4 py-2 font-bold mt-3 ${
                  rev.status === "delivered"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary text-white"
                }`}
              >
                {rev.status === "delivered"
                  ? "Revision Delivered"
                  : "Update Revision"}
              </button>
            </form>
          ))}
      </div>
    </>
  );
};

export default UpdateUserService;
