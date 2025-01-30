import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ApiService } from "../../services/ApiService";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useAuth } from "../../services/Auth";

const ShowUserService = () => {
  const { user } = useAuth();
  const location = useLocation();
  const { userServices_id } = location.state;

  // Value States
  const [userName, setUserName] = useState("");
  const [price, setPrice] = useState("");
  const [expectedDate, setExpectedDate] = useState("");
  const [status, setStatus] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [sliderImageUpdated, setSliderImageUpdated] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [UserFileName, setUserFileName] = useState("");

  useEffect(() => {
    setIsLoading(true);
    ApiService.showUserServicesDetails(user?.token, userServices_id)
      .then((res) => {
        console.log(res.data.data);
        let { delievered, service_price, expected_date, file, user_file_url } =
          res.data.data;

        setStatus(delievered === 0 ? "pending" : "delivered");
        setPrice(service_price);
        setExpectedDate(expected_date);
        setUserFileName(file);
        setUploadedFile(`${user_file_url}/${file}`);

        setIsLoading(false);
        console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [user?.token, userServices_id]);

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadedFile(file);
    setSliderImageUpdated(true);
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
        <form action="#">
          <div className="border h-full p-4">
            {/* Blog Inputs */}
            <div className="py-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">User Services Details</h1>
              </div>
              <hr className="my-4" />
              <div className="flex flex-col gap-4">
                {/* Status */}
                <div>
                  <label className="text-muted">Status:</label>
                  <h1 className="text-lg text-primary font-bold">{status}</h1>
                </div>
                {/* Price */}
                <div>
                  <label className="text-muted">Price:</label>
                  <h1 className="text-lg text-primary font-bold">{price}</h1>
                </div>
                {/* Expected Date */}
                <div>
                  <label className="text-muted">Expected Date:</label>
                  <h1 className="text-lg text-primary font-bold">
                    {expectedDate}
                  </h1>
                </div>
                {/* Download File */}
                {UserFileName && (
                  <div className="py-2 w-full flex flex-col gap-2">
                    <label className="text-muted">
                      User Submitted File Download:{" "}
                    </label>
                    {uploadedFile &&
                    !sliderImageUpdated &&
                    UserFileName != "undefined" ? (
                      <div className="flex items-center gap-2">
                        <h1 className="text-lg text-primary font-bold">
                          {UserFileName}
                        </h1>

                        <button
                          type="button"
                          className="btn btn-primary font-bold bg-[#0072b1] p-3 rounded-lg text-white"
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
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ShowUserService;
