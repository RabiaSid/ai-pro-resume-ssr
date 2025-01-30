import React, { useEffect, useState } from "react";
import { ApiService } from "../../services/ApiService";
import AllborderInputGroup from "../../components/AllborderInputGroup";
import swal from "sweetalert";
import LoadingSpiner from "../../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import PlaceholderImage from "../../assets/images/placeholder.webp";
import { PiPencilBold } from "react-icons/pi";
import ToggleSwitch from "../../components/ToggleSwitch";
import Select from "react-select";
import DropdownWithIdValue from "../../components/DropdownWithIdValue";
import { useAuth } from "../../services/Auth";

const CreateResumeTemplate = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [tempimageUpdated, setTempimageUpdated] = useState(false);
  const [uploadedTempImage, setUploadedTempImage] = useState();
  //   Value States

  const [coverTempName, setCoverTempName] = useState("");
  const [coverTempCatId, setCoverTempCatId] = useState();

  const [is_paid, setIs_paid] = useState(false);
  const [is_example, setIs_example] = useState(false);

  const [errors, setErrors] = useState(null);

  const [isLoading, setIsloading] = useState(false);

  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [jobPositions, setJobPositions] = useState([]);

  const [jonOptions, setJobOptions] = useState({});
  const [selectedOptions, setselectedOptions] = useState([]);

  const [templateId, setTemplateId] = useState(0);
  const [coverPrice, setCoverPrice] = useState(0);

  const handleSelectedPosiotion = (selectedOptions) => {
    setselectedOptions(selectedOptions);
  };

  useEffect(() => {
    ApiService.showAllCategoriesAndPositions(user?.token)
      .then((res) => {
        setDropdownOptions(res.data.data.categories);
        setJobPositions(res.data.data.job_positions);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const newJobOptions = [];
    jobPositions.forEach((item) => {
      newJobOptions.push({ value: item.id, label: item.name });
    });
    setJobOptions(newJobOptions);
  }, [jobPositions]);

  const handleCreateResumeTemplate = (e) => {
    e.preventDefault();

    const data = {
      name: coverTempName,
      image: uploadedTempImage,
      category_id: coverTempCatId,
      is_example: is_example ? 1 : 0,
      is_paid: is_paid ? 1 : 0,
      jobPositions: selectedOptions,
      template_id: templateId,
      price: coverPrice,
    };
    setIsloading(true);
    ApiService.createCoverTemplate(user?.token, data)
      .then((res) => {
        setIsloading(false);
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

  const handleTempImageChange = (e) => {
    const file = e.target.files[0];
    setUploadedTempImage(file);
    setTempimageUpdated(true);
  };

  const [template_Array] = useState([
    { id: 1, name: "Template 1" },
    { id: 2, name: "Template 2" },
    { id: 3, name: "Template 3" },
    { id: 4, name: "Template 4" },
    { id: 5, name: "Template 5" },
    { id: 6, name: "Template 6" },
    { id: 7, name: "Template 7" },
    { id: 8, name: "Template 8" },
    { id: 9, name: "Template 9" },
    { id: 10, name: "Template 10" },
  ]);

  return (
    <>
      {isLoading && <LoadingSpiner isLoading={isLoading} />}
      <div className="p-2">
        <form action="#" onSubmit={handleCreateResumeTemplate}>
          <div className="border h-full p-4">
            {/* Slider Inputs */}
            <div className="py-4">
              <h1 className="text-2xl font-bold">Create Cover Template</h1>
              {/* name */}
              <div>
                <AllborderInputGroup
                  htmlFor={"temp_name"}
                  isRequired={true}
                  label={"Template Name"}
                  onchange={(val) => setCoverTempName(val)}
                  value={coverTempName}
                  placeholder={"Enter Template Name"}
                />
              </div>
              {/* drodown */}
              <div>
                <div className="py-2 w-full flex flex-col gap-2">
                  <label
                    for={"cat_id"}
                    className="border-[#9b9b9b] text-xs sm:text-base"
                  >
                    Category
                  </label>
                  <select
                    id={"cat_id"}
                    className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg p-2 border border-[#9b9b9b] focus:border-[#00caa5] outline-none"
                    required
                    onChange={(e) => setCoverTempCatId(e.target.value)}
                  >
                    <option selected disabled value={""}>
                      Select Category
                    </option>
                    {dropdownOptions.map((opt, idx) => {
                      return (
                        <option key={idx} value={opt.id}>
                          {opt.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              {/* drodown job Positions */}
              <div>
                <div className="py-2 w-full flex flex-col gap-2">
                  <label
                    for={"pos_id"}
                    className="border-[#9b9b9b] text-xs sm:text-base"
                  >
                    Positions{" "}
                  </label>
                  <Select
                    isMulti
                    options={jonOptions}
                    value={selectedOptions}
                    onChange={handleSelectedPosiotion}
                    placeholder="Select options..."
                  />
                </div>
              </div>
              <div>
                <AllborderInputGroup
                  htmlFor={"price"}
                  type="number"
                  isRequired={true}
                  label={"Price"}
                  onchange={(val) => setCoverPrice(val)}
                  value={coverPrice}
                  placeholder={"Enter Price"}
                />
              </div>
              {/* Template is Paid/Free */}
              <div className="py-2 w-full flex flex-col gap-2">
                <label className="border-[#9b9b9b] text-xs sm:text-base">
                  Template Is Paid
                </label>
                <ToggleSwitch
                  status={is_paid}
                  ChangeStatus={(status) => setIs_paid(status)}
                />
              </div>
              {/* Template is Paid/Free */}
              <div className="py-2 w-full flex flex-col gap-2">
                <label className="border-[#9b9b9b] text-xs sm:text-base">
                  Example Cover
                </label>
                <ToggleSwitch
                  status={is_example}
                  ChangeStatus={(status) => {
                    setIs_example(status);
                    status === false && setTemplateId(0);
                  }}
                />
              </div>
              {/* Select Template Id */}
              {is_example && (
                <DropdownWithIdValue
                  handleOnChange={(id) => setTemplateId(id)}
                  htmlFor={"templateId"}
                  isRequired={is_example}
                  label={"Select Template"}
                  options={template_Array}
                  value={templateId}
                />
              )}
              {/* temp image */}
              <div className="py-2 w-full flex flex-col gap-2">
                <label className="border-[#9b9b9b] text-xs sm:text-base">
                  Template Image
                </label>
                <div className="relative w-[400px] rounded-full">
                  <img
                    src={
                      tempimageUpdated
                        ? URL.createObjectURL(uploadedTempImage)
                        : PlaceholderImage
                    }
                    alt="Service__img"
                    className="w-full "
                  />
                  <input
                    type="file"
                    onChange={handleTempImageChange}
                    className="hidden"
                    accept=".jpg,.png,.jpeg"
                    id="resumeTempImage"
                    name="tempimage"
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
              {/* \ */}
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
                Create Template
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateResumeTemplate;
