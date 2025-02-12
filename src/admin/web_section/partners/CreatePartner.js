import React, { useRef, useState } from "react";
import { ApiService } from "../../../services/ApiService";
import AllborderInputGroup from "../../../components/AllborderInputGroup";
import swal from "sweetalert";
import LoadingSpiner from "../../../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { PiPencilBold } from "react-icons/pi";
import { useAuth } from "../../../services/Auth";

const PlaceholderImage = "/images/placeholder.webp";
const CreatePage = () => {
  const { user } = useAuth();
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const [sliderimageUpdated, setSliderimageUpdated] = useState(false);
  const [uploadedPartnerImage, setUploadedPartnerImage] = useState();

  //   Value States
  const [partnerName, setPartnerName] = useState("");

  const [isLoading, setIsloading] = useState(false);

  const handleCreateImage = (e) => {
    e.preventDefault();

    setIsloading(true);
    const data = {
      name: partnerName,
      image: uploadedPartnerImage,
    };
    ApiService.createPartner(user?.token, data)
      .then((res) => {
        setIsloading(false);
        console.log(res);
        swal({
          title: res.data.message,
          icon: "success",
        })
          .then(() => navigate(-1))
          .catch(() => navigate(-1));
      })
      .catch((err) => {
        setIsloading(false);
        setErrors(Object.values(err.response.data.errors));
      });
  };

  const handleAuthorImageChange = (e) => {
    const file = e.target.files[0];
    setUploadedPartnerImage(file);
    setSliderimageUpdated(true);
  };

  return (
    <>
      {isLoading && <LoadingSpiner isLoading={isLoading} />}
      <div className="p-2">
        <form action="#" onSubmit={handleCreateImage}>
          <div className="border h-full p-4">
            {/* Slider Inputs */}
            <div className="py-4">
              <h1 className="text-2xl font-bold">Create Partner</h1>
              {/* Slider Name */}
              <div>
                <AllborderInputGroup
                  htmlFor={"partnerName"}
                  isRequired={true}
                  label={"Partner Name"}
                  onchange={(val) => setPartnerName(val)}
                  value={partnerName}
                  placeholder={"Enter Slider Name"}
                />
              </div>
              {/* Slider Image */}
              <div className="py-2 w-full flex flex-col gap-2">
                <label className="border-[#9b9b9b] text-xs sm:text-base">
                  Partner Logo
                </label>
                <div className="relative w-[400px] rounded-full">
                  <img
                    src={
                      sliderimageUpdated
                        ? URL.createObjectURL(uploadedPartnerImage)
                        : PlaceholderImage
                    }
                    alt="Service__img"
                    className="w-full "
                  />
                  <input
                    type="file"
                    onChange={handleAuthorImageChange}
                    className="hidden"
                    accept=".png"
                    id="addauthorImage"
                  />
                  <div
                    className="absolute bottom-1 right-1 cursor-pointer"
                    onClick={() =>
                      document.getElementById("addauthorImage").click()
                    }
                  >
                    <PiPencilBold className="bg-white border-2 rounded-full text-4xl p-1" />
                  </div>
                </div>
              </div>
            </div>

            <ul className="list-disc ml-2 py-2">
              {errors?.map((err) => (
                <li className="text-red-500 text-sm">{err}</li>
              ))}
            </ul>

            <hr />
            {/* Upload */}
            <div className="py-6">
              <button
                type="submit"
                className="bg-primary text-lg text-white font-bold rounded-md px-4 py-2"
              >
                Upload Partner
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreatePage;
