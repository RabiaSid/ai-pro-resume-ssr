import React, { useEffect, useState } from "react";
import TextAreaGroup from "../../../../components/TextAreaGroup";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { ApiService } from "../../../../services/ApiService";
import LoadingSpiner from "../../../../components/LoadingSpinner";
import swal from "sweetalert";
import { useAuth } from "../../../../services/Auth";
import { PiPencilBold } from "react-icons/pi";

const PlaceholderImage = "/images/placeholder.webp";
const Closer = ({
  // Header Data
  name,
  first_name,
  last_name,
  phone_number,
  email_address,
  street_address,
  country_id,
  state,
  city,
  zip_code,
  cover_template_id,
  category_id,
  employeer_name,
  body_skills,
  job_positions,
  body_detail,
  experience,
  opener_detail,
  closer_detail,
  preview_image,
}) => {
  const navigate = useNavigate();
  const coverID = useParams().id;
  const { user } = useAuth();
  const [preview_image_error, set_preview_image_error] = useState(false);
  const [previewImageUpdate, setPreviewImageUpdate] = useState(false);

  const handleTempImageChange = (e) => {
    const file = e.target.files[0];

    setCoverLetterData((prev) => ({ ...prev, preview_image: file }));
    setPreviewImageUpdate(true);
  };
  const [errors, setErrors] = useState(null);
  const [coverLetterData, setCoverLetterData] = useState({
    name: name ? name : "",
    first_name: "",
    last_name: "",
    cover_template_id: 0,
    category_id: 0,
    phone_number: 0,
    email_address: "",
    street_address: "",
    country_id: 0,
    state: "",
    city: "",
    zip_code: 0,
    experience: "",
    opener_detail: "",
    job_positions: [],
    employeer_name: "",
    body_skills: [],
    body_detail: "",
    closer_detail: closer_detail ? closer_detail : "",
    preview_image: preview_image ? preview_image : "",
  });

  useEffect(() => {
    // const job_positions = job_positions.map((item2) => item2.value);
    // console.log("job_positions");
    // console.log(job_positions);

    setCoverLetterData({
      name,
      first_name,
      last_name,
      cover_template_id,
      category_id,
      phone_number,
      email_address,
      street_address,
      country_id,
      state,
      city,
      zip_code,
      experience,
      opener_detail,
      employeer_name,
      body_skills: Array.isArray(body_skills)
        ? body_skills?.join(",")
        : typeof body_skills === "string"
          ? body_skills
          : "",
      job_positions: job_positions.map((item) =>
        item.value !== undefined ? item.value : item.id
      ),
      body_detail,
      closer_detail,
      preview_image: preview_image,
    });
  }, [
    name,
    first_name,
    last_name,
    phone_number,
    email_address,
    street_address,
    country_id,
    state,
    city,
    zip_code,
    cover_template_id,
    category_id,
    employeer_name,
    body_skills,
    job_positions,
    body_detail,
    experience,
    opener_detail,
    closer_detail,
    preview_image,
  ]);

  const [isLoading, setIsloading] = useState(false);

  const handleStepData = (e) => {
    e.preventDefault();

    if (!coverLetterData.preview_image) {
      set_preview_image_error(true);
      return;
    }
    set_preview_image_error(false);

    console.log(coverLetterData);

    const data = coverLetterData;
    setIsloading(true);
    ApiService.updateCoverExamplesTemplateById(
      user?.token,
      coverLetterData,
      coverID,
      previewImageUpdate
    )
      .then((res) => {
        console.log(coverLetterData);
        setIsloading(false);
        Cookies.remove("coverLetterExampleUpdateStep1");
        Cookies.remove("coverLetterExampleUpdateStep2");
        Cookies.remove("coverLetterExampleUpdateStep3");
        swal({
          title: res.data.message,
          icon: "success",
        })
          .then(() => navigate("/admin/cover-examples"))
          .catch(() => navigate("/admin/cover-examples"));
      })
      .catch((err) => {
        setIsloading(false);
        setErrors(Object.values(err.response.data.errors));
      });
  };
  return (
    <div>
      {isLoading && <LoadingSpiner isLoading={isLoading} />}
      <form action="#" onSubmit={handleStepData}>
        {/* Closer Details */}
        <div>
          <TextAreaGroup
            cols={4}
            htmlFor={"closer_details"}
            isRequired={false}
            label={"Closer Details"}
            onchange={(val) =>
              setCoverLetterData((prev) => ({
                ...prev,
                closer_detail: val,
              }))
            }
            value={coverLetterData.closer_detail}
            resize={false}
            rows={4}
          />
        </div>
        {/* image Preview */}
        <div className=" ">
          <div className="py-2 w-full flex flex-col gap-2">
            <label className="border-[#9b9b9b] text-xs sm:text-base">
              Template Image
            </label>
            <div className="relative w-[400px] rounded-full">
              {previewImageUpdate && (
                <img
                  src={URL.createObjectURL(coverLetterData.preview_image)}
                  alt="img"
                  className={`w-full border  ${preview_image_error
                    ? "border-red-500"
                    : "border-transparent"
                    }`}
                />
              )}

              {!previewImageUpdate && (
                <img
                  src={global.imageUrl + coverLetterData.preview_image}
                  alt="img"
                  className={`w-full border  ${preview_image_error
                    ? "border-red-500"
                    : "border-transparent"
                    }`}
                />
              )}

              <input
                type="file"
                onChange={handleTempImageChange}
                className="w-0 h-0 hidden"
                accept=".jpg,.png,.jpeg"
                id="resumeTempImage"
              />
              <div
                className="absolute bottom-1 right-1 cursor-pointer"
                onClick={() =>
                  document.getElementById("resumeTempImage").click()
                }
              >
                <PiPencilBold className="bg-white border-2 rounded-full text-4xl p-1" />
              </div>
            </div>
          </div>
          {preview_image_error && (
            <span className="text-red-500 text-sm">Image is Required*</span>
          )}
        </div>
        <div>
          <ul className="list-disc ml-2 py-2">
            {errors?.map((err) => (
              <li className="text-red-500 text-sm">{err}</li>
            ))}
          </ul>
        </div>
        <div className="h-24 justify-end">
          <hr />
          {/* Create */}
          <div className="py-6 px-6 gap-4 flex justify-end">
            <button
              type="submit"
              className="bg-white border-primary border-2 text-lg text-primary font-bold rounded-md px-8 py-2"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-primary text-lg text-white font-bold rounded-md px-8 py-2"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Closer;
