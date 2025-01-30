import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import arrow_design_7 from "./assets/images/arrow_design_7.webp";
import CoverLetterImg from "./assets/images/cover_letter_1.webp";
import { BsFileEarmarkArrowUp } from "react-icons/bs";
import { useState } from "react";
import { useCart } from "./data/CartStore.js";
import { ApiService } from "./services/ApiService.jsx";
import { useLocation } from "react-router-dom";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./services/Auth.jsx";
import MainBanner from "./components/MainBanner.js";

const Cover_letter_upload = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { serviceId, cartId } = location.state;

  const { cart, uploadFile } = useCart();

  const serviceData = cart.services.find((item) => item.id === cartId);

  const [coverLetter, setCoverLetter] = useState("");
  const [uploadprogress, setUploadprogress] = useState(true);

  const uploadCoverLetter = (e) => {
    let file = e.target.files[0];
    setCoverLetter(file);
  };

  const handleUploadServiceFile = () => {
    setUploadprogress(true);

    ApiService.uploadServiceFile(user?.token, coverLetter)
      .then((res) => {
        setUploadprogress(false);

        uploadFile(
          serviceId,
          res.data.data.file_name,
          res.data.data.file_url,
          coverLetter.name
        );

        swal({
          title: "File Uploaded Successfully",
        })
          .then(() => navigate("/cart"))
          .catch(() => navigate("/cart"));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Header />
      {/* Banner */}

      <MainBanner
        descriptionText={""}
        startText={"Ai Pro Resume"}
        highlightText={"Your Cart"}
        endText={" Get a Service of your Choice"}
      />
      {/* End Banner */}
      <div className="w-full lg:w-[80%] m-auto">
        <div className="container m-auto py-6 sm:py-20 px-4 sm:px-0">
          {/* Content */}
          <div className="sm:w-[90%] border m-auto bg-primary-gray relative -top-32 rounded-lg px-4 pt-4 sm:px-14 sm:pt-8 pb-4 sm:pb-14 ">
            <div className="sm:w-[60%]">
              {/*  */}
              <div className="">
                <div className="pl-28">
                  <img
                    src={arrow_design_7}
                    className="w-32 animate-bounce relative top-8"
                  />
                </div>
                <div className="sm:flex items-center">
                  <img src={CoverLetterImg} className="w-44" />
                  <div className="text-primary font-bold text-3xl sm:text-4xl ml-4">
                    {serviceData.name}
                  </div>
                </div>
                <div className="mt-4 sm:w-[80%]">
                  <span
                    className="text-muted text-sm text-justify"
                    dangerouslySetInnerHTML={{
                      __html: serviceData.description,
                    }}
                  ></span>
                </div>
              </div>
              {/*  */}
              <div className="py-4 sm:py-8 flex flex-col gap-4 sm:gap-8">
                <div className="text-3xl tracking-tighter font-bold flex gap-4">
                  <span className="">
                    $
                    {serviceData.discounted_price &&
                      serviceData.discounted_price}
                  </span>
                  <span>
                    {serviceData.discounted_price ? (
                      <p className="line-through text-muted text-base">
                        ${serviceData.price}
                      </p>
                    ) : (
                      <p>${serviceData.price}</p>
                    )}
                  </span>
                </div>
                <label
                  htmlFor="upload__cover__letter"
                  className="cursor-pointer w-full border-2  border-dashed border-primary py-3 text-2xl font-bold text-primary flex gap-4 justify-center items-center"
                  onChange={uploadCoverLetter}
                >
                  <BsFileEarmarkArrowUp className="text-4xl" />
                  <h1>{coverLetter ? coverLetter.name : "UPLOAD YOUR FILE"}</h1>
                  <input
                    type="file"
                    id="upload__cover__letter"
                    className="hidden"
                    accept=".pdf,.docx,.jpeg,.jpg,.png"
                  />
                </label>
                <button
                  disabled={coverLetter ? false : uploadprogress ? true : false}
                  className={`${!coverLetter
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-primary hover:bg-[#0073b1cc]"
                    } sm:w-fit text-base font-bold text-white px-20 py-4 rounded-full `}
                  onClick={handleUploadServiceFile}
                >
                  {!uploadprogress ? (
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    "ADD TO CART"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cover_letter_upload;
