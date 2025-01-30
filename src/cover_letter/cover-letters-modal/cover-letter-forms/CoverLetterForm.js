import { Autocomplete, createFilterOptions, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./form-style.css";
import { useEffect, useState } from "react";
import { ApiService } from "../../../services/ApiService";
import { useAuth } from "../../../services/Auth";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { AiOutlineInfoCircle } from 'react-icons/ai';

const CoverLetterForm = ({
  setActiveTemplate,
  jobPositionsList,
  setOpenCoverLetterModal,
  selectedTemplateId,
  coverLetterTries,
  userDet
}) => {
  const { user } = useAuth();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [jobPositions, setJobPositions] = useState('');
  const [userdata, setUserdata] = useState();
  const [isShowLoader, setIsShowLoader] = useState(false);
  const [checkPersonalDetail, setCheckPersonalDetail] = useState(false);
  const [jobDesc, setJobDesc] = useState('');
  const [descriptionGenerated, setDescriptionGenerated] = useState();
  const [userInitialData, setUserInitialData] = useState({
    name: '',
    first_name: '',
    last_name: '',
    cover_template_id: '',
    phone_number: '',
    email_address: '',
    street_address: '',
    country_id: '',
    body_skills: '',
    state: '',
    job_title: '',
    city: '',
    zip_code: '',
    experience: '',
    employeer_name: '',
    company_name: '',
    show_personal_information: 1,
    date: Date.now(),
  });

  const filterOptions = createFilterOptions({
    matchFrom: "start",
  });

  const onSubmit = (datas) => {
    setIsShowLoader(true);
    const generateDesc = {
      job_description: jobDesc,
      job_title: jobPositions,
      jsonData: checkPersonalDetail ? userdata : {}
    }
    ApiService.createCoverLetterAiByJobTitleAndDescription(generateDesc)
      .then((res) => {
        if (res.status === 200) {
          setDescriptionGenerated(true)
          setUserInitialData((pre) => ({
            ...pre,
            company_Address: datas?.company_Address,
            company_name: datas?.company_name,
            hirer_email: datas?.hirer_email,
            hirer_job_position: datas?.hirer_job_position,
            hirer_name: datas?.hirer_name,
            phone_number: datas?.phone_number,
            opener_detail: res?.data?.coverLetter,
            job_title: jobPositions,
            experience: userdata?.experience,
          }))
        }
        else {
          setDescriptionGenerated(false)
          toast.error("Something went wrong please try again.");
        }
      })
      .catch((err) => {
        setDescriptionGenerated(false);
        setIsShowLoader(false);
        console.log(err, "err in getting job description from Ai APi");
      });
  }

  useEffect(() => {
    descriptionGenerated && ApiService.storeCoverLetterRimsha(user?.token, userInitialData, selectedTemplateId)
      .then((res) => {
        if (res.status === 200) {
          setOpenCoverLetterModal(false);
          const { id, cover_template_id } = res?.data?.data;
          setActiveTemplate(cover_template_id);
          Cookies.set("freshCoverId", id);
          toast.success("Congratulations! your Cover Letter has been generated successfully!");
          setIsShowLoader(false);
          if (coverLetterTries > 0) {
            ApiService.updateCoverLetterTries(user?.token, 1, "ai_cover")
              .then((res) => {
                console.log(res, "tries updated");
                userDet();
              })
              .catch((err) => {
                console.log(err, "tries not updated");
              });
          }
        }
      })
      .catch((err) => {
        console.log(
          err,
          "Something went wrong in creating cover letter please try again."
        );
        toast.error(
          "Something went wrong in creating cover letter, Please try again.."
        );
        setIsShowLoader(false);
      });
  }, [descriptionGenerated])

  const handlePersonalDetail = (event) => {
    setCheckPersonalDetail(event.target.checked);
  };

  useEffect(() => {
    if (userdata) {
      setUserInitialData((prevData) => ({
        ...prevData,
        name: userdata?.name || '',
        first_name: userdata?.first_name || userdata?.name,
        last_name: userdata?.last_name || '',
        cover_template_id: selectedTemplateId || '',
        phone_number: userdata?.phone_number || '',
        email_address: userdata?.email || '',
        street_address: userdata?.address || '',
        country_id: userdata?.country_id || '',
        body_skills: userdata?.job_position || '',
        job_title: userdata?.job_title || '',
        state: userdata?.state || '',
        city: userdata?.city || '',
        zip_code: userdata?.zip_code || '',
        experience: userdata?.experience,
        employeer_name: userdata?.name || '',
        company_name: userdata?.company_name || '',
      }));
    }
  }, [userdata]);

  const userDett = () => {
    ApiService.getUserDetails(user?.token)
      .then((response) => {
        setUserdata(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    userDett();
  }, []);

  return (
    <div className="w-[100%] lg:px-5 px-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-2xl mx-3 inline-flex mt-2 items-center font-semibold text-white px-3 rounded-full bg-orange-500 hover:bg-orange-400 ">
          <AiOutlineInfoCircle className="text-xl me-2" />
          {coverLetterTries > 0 ? coverLetterTries : 0}{" "}
          <span className="text-base ml-2 font-medium">
            {coverLetterTries > 1
              ? "Tries"
              : "Try"}{" "}
            Left
          </span>
        </div>

        <div className="flex flex-row gap-4 justify-center text-center mx-3">
          <div className="flex flex-col w-full">
            <p className=" text-[#19B2A6] mt-5 mb-3 text-left font-Lexend font-bold text-lg">
              Your Details
            </p>
            <div className="grid grid-cols-1  gap-x-4 gap-y-4 sm:gap-y-6">
              <Controller
                name="job_position"
                control={control}
                rules={{
                  validate: (value) => {
                    if (!checkPersonalDetail) {
                      const jobDescription = watch("job_description");
                      return value?.length || jobDescription?.trim()
                        ? true
                        : "At least one of Job Position or Job Description is required.";
                    }
                    return true;
                  },
                }}
                render={({ field, fieldState }) => (
                  <Autocomplete
                    {...field}
                    options={jobPositionsList}
                    filterOptions={filterOptions}
                    freeSolo
                    filterSelectedOptions
                    onChange={(e, value) => {
                      setJobPositions(value || "");
                      field.onChange(value || "");
                    }}
                    value={field.value || ""}
                    sx={{ height: "80px" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Job Position"
                        placeholder="Search or type your Job Position"
                        error={!checkPersonalDetail && !!fieldState.error}
                        helperText={!checkPersonalDetail && fieldState.error?.message}
                      />
                    )}
                  />
                )}
              />
              <Controller
                name="job_description"
                control={control}
                rules={{
                  validate: {
                    required: (value) => {
                      if (!checkPersonalDetail) {
                        const jobPosition = watch("job_position");
                        return value?.trim() || jobPosition?.trim()
                          ? true
                          : "At least one of Job Position or Job Description is required.";
                      }
                      return true;
                    },
                    minLength: (value) => {
                      if (value?.trim()) {
                        return value.trim().length >= 10
                          ? true
                          : "The Description must be at least 10 characters.";
                      }
                      return true;
                    },
                    maxLength: (value) => {
                      if (value?.trim()) {
                        return value.trim().length <= 2000
                          ? true
                          : "The Description must be at most 2000 characters.";
                      }
                      return true;
                    },
                  },
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    id="filled-multiline-static"
                    rows={4}
                    placeholder="Description"
                    label="Previous Job Description"
                    className="w-full"
                    multiline
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      setJobDesc(e.target.value);
                    }}
                    error={!!fieldState.error}
                    helperText={
                      fieldState.error?.message || ""
                    }
                  />
                )}
              />

              <div className="text-left mb-3 flex items-center">
                <input
                  checked={checkPersonalDetail}
                  type="checkbox"
                  className="w-[17px] h-[17px] mt-[10px] mb-[8px] text-primary-green bg-gray-100 border-gray-300 rounded-md"
                  onChange={handlePersonalDetail}
                />
                <span className="ms-2 text-base underline text-blue-500  font-semibold capitalize">
                  Use Profile Details
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 justify-center text-center mx-3">
          <p className="text-[#19B2A6] mt-2 text-left font-Lexend  font-bold text-lg">
            Hiring Person Details
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 sm:gap-y-6">
            <Controller
              name="hirer_name"
              defaultValue=""
              control={control}
              rules={{
                required: "Hirer name is required",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  placeholder="Name"
                  label="Hiring Person’s Name*"
                  className="w-full rounded-xl"
                  error={!!errors.hirer_name}
                  helperText={errors.hirer_name?.message}
                />
              )}
            />

            <Controller
              name="hirer_email"
              defaultValue=""
              rules={{
                required: "Hirer email is required",
              }}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="email"
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  placeholder="Email"
                  label="Hiring Person’s Email*"
                  className="w-full"
                  error={!!errors.hirer_email}
                  helperText={errors.hirer_email?.message}
                />
              )}
            />

            <Controller
              name="hirer_job_position"
              control={control}
              rules={{
                required: "Hirer Job position is required",
              }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={jobPositionsList}
                  filterOptions={filterOptions}
                  freeSolo
                  filterSelectedOptions
                  onChange={(event, newValue) => {
                    field.onChange(newValue);
                  }}
                  value={field.value || []}
                  disablePortal
                  sx={{ height: "55px" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Hirer Job Position*"
                      placeholder="Search or type Hirer Job Position"
                      error={!!errors.hirer_job_position}
                      helperText={errors.hirer_job_position?.message}
                    />
                  )}
                />
              )}
            />
            <div className="mt-4 sm:mt-0">
              <Controller
                name="phone_number"
                control={control}
                rules={{
                  required: "Hirer Contact Number is required",
                  minLength: {
                    value: 8,
                    message: "Phone Number must be at least 8 digits",
                  },
                  maxLength: {
                    value: 18,
                    message: "Phone Number must be at most 18 digits",
                  },
                }}
                render={({ field }) => (
                  <div className="w-full text-start">
                    <PhoneInput
                      {...field}
                      placeholder="Hirer Contact Number*"
                      autoComplete="on"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      inputProps={{
                        name: "phone_number",
                      }}
                      className={`
                      ${errors?.phone_number
                          ? "border-red-500 border"
                          : " border-2"
                        }  w-full leading-3 py-[12px] rounded-md px-[14px]`}
                    />
                    {errors.phone_number && (
                      <span className="text-red-500 text-xs ps-4">
                        {errors.phone_number.message}
                      </span>
                    )}
                  </div>
                )}
              />
            </div>

          </div>
        </div>

        <div className="grid grid-cols-1 mt-5 gap-y-6  mx-3">
          <Controller
            name="company_name"
            defaultValue=""
            rules={{ required: "Company name is required!" }}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                }}
                placeholder="Company Name"
                label="Company Name*"
                className="w-full"
                error={!!errors.company_name}
                helperText={errors?.company_name?.message}
              />
            )}
          />
          <Controller
            name="company_Address"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                }}
                placeholder="Address"
                label="Company Address"
                className="w-full"
              />
            )}
          />
        </div>

        <button
          type="submit"
          className="bg-white border-primary-green
                      border hover:bg-primary-green hover:text-white
                    text-primary-green w-48 h-14 text-lg p-2 rounded-full mx-auto
                      font-semibold font-Lexend my-5  focus:bg-primary-green focus:text-white flex items-center justify-center "
        >
          {isShowLoader ? (
            <>
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-8 h-8 me-3 text-blue animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Generating...
            </>
          ) : (
            "Generate"
          )}
        </button>

      </form>
    </div>
  );
};

export default CoverLetterForm;