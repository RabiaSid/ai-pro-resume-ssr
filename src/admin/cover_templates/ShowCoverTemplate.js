import React, { useEffect, useState } from "react";
import { ApiService } from "../../services/ApiService";
import AllborderInputGroup from "../../components/AllborderInputGroup";
import swal from "sweetalert";
import LoadingSpiner from "../../components/LoadingSpinner";
import { useNavigate, useLocation } from "react-router-dom";
import { PiPencilBold } from "react-icons/pi";
import ToggleSwitch from "../../components/ToggleSwitch";
import Select from "react-select";
import DropdownWithIdValue from "../../components/DropdownWithIdValue";
import { useAuth } from "../../services/Auth";

const ShowUpdateCoverTemplate = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { cover_id } = location.state;

  const [tempimageUpdated, setTempimageUpdated] = useState(false);
  const [uploadedTempImage, setUploadedTempImage] = useState();
  //   Value States

  const [coverTempName, setCoverTempName] = useState("");
  const [coverTempCatId, setCoverTempCatId] = useState();
  const [coverTempImage, setCoverTempImage] = useState();
  const [coverTempIsPaid, setCoverTempIsPaid] = useState();
  const [coverTempSort, setCoverTempSort] = useState();
  const [coverTempStatus, setCoverTempStatus] = useState();
  const [is_example, setIs_example] = useState(false);
  const [coverPrice, setCoverPrice] = useState(0);

  const [isLoading, setIsloading] = useState(false);

  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [jobPositions, setJobPositions] = useState([]);

  //
  const [jonOptions, setJobOptions] = useState({});
  const [selectedOptions, setselectedOptions] = useState([]);

  const [templateId, setTemplateId] = useState(0);

  const [errors, setErrors] = useState(null);

  const handleSelectedPosiotion = (selectedOptions) => {
    setselectedOptions(selectedOptions);
  };

  useEffect(() => {
    const newJobOptions = [];
    jobPositions.forEach((item) => {
      newJobOptions.push({ value: item.id, label: item.name });
    });
    setJobOptions(newJobOptions);
  }, [jobPositions]);

  useEffect(() => {
    ApiService.showAllCategoriesAndPositions(user?.token)
      .then((res) => {
        setDropdownOptions(res.data.data.categories);
        setJobPositions(res.data.data.job_positions);
      })
      .catch((err) => console.log(err));

    ApiService.showCoverTemplates(user?.token, cover_id)
      .then((res) => {
        console.log(res.data.data.cover_template);
        const {
          name,
          image,
          category_id,
          is_paid,
          sort,
          status,
          is_example,
          job_positions,
          template_id,
          price,
        } = res.data.data.cover_template;
        setCoverTempName(name);
        setCoverTempImage(image);
        setCoverTempCatId(category_id);
        setCoverTempIsPaid(is_paid);
        setCoverTempSort(sort);
        setCoverTempStatus(status);
        setIs_example(is_example ? true : false);
        setTemplateId(template_id);
        setCoverPrice(price);
        // set the cat name
        const newJobOptions = [];
        job_positions.forEach((item) => {
          newJobOptions.push({ value: item.id, label: item.name });
        });
        setselectedOptions(newJobOptions);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpdateCoverTemplateDetails = (e) => {
    e.preventDefault();

    const data = {
      id: cover_id,
      name: coverTempName,
      image: tempimageUpdated ? uploadedTempImage : null,
      category_id: coverTempCatId,
      sort: coverTempSort,
      status: coverTempStatus,
      is_paid: coverTempIsPaid,
      is_example: is_example ? 1 : 0,
      jobPositions: selectedOptions,
      template_id: templateId,
      price: coverPrice,
    };
    setIsloading(true);
    ApiService.updateCoverTemplate(user?.token, data)
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
        <form action="#" onSubmit={handleUpdateCoverTemplateDetails}>
          <div className="border h-full p-4">
            {/* Slider Inputs */}
            <div className="py-4">
              <h1 className="text-2xl font-bold">
                Update Cover ({coverTempName})
              </h1>
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
              {/* Sort */}
              <div>
                <AllborderInputGroup
                  htmlFor={"temp_sort"}
                  isRequired={true}
                  label={"Template Sort"}
                  onchange={(val) => setCoverTempSort(val)}
                  value={coverTempSort}
                  placeholder={"Enter Template Number"}
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
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      setCoverTempCatId(selectedId);
                    }}
                    value={coverTempCatId}
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
              {/*  */}
              <div>
                <div className="py-2 w-full flex flex-col gap-2">
                  <label
                    for={"cat_id"}
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
                  status={coverTempIsPaid}
                  ChangeStatus={(status) => setCoverTempIsPaid(status ? 1 : 0)}
                />
              </div>
              {/* Template Status */}
              <div className="py-2 w-full flex flex-col gap-2">
                <label className="border-[#9b9b9b] text-xs sm:text-base">
                  Template Status
                </label>
                <ToggleSwitch
                  status={coverTempStatus}
                  ChangeStatus={(status) => setCoverTempStatus(status ? 1 : 0)}
                />
              </div>
              {/* Template Status */}
              <div className="py-2 w-full flex flex-col gap-2">
                <label className="border-[#9b9b9b] text-xs sm:text-base">
                  Example Cover Letter
                </label>
                <ToggleSwitch
                  status={is_example}
                  ChangeStatus={(status) => {
                    setIs_example(status);
                    status === false && setTemplateId(0);
                  }}
                />
              </div>
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
                        : global.imageUrl + coverTempImage
                    }
                    alt="Temp__img"
                    className="w-full"
                  />
                  <input
                    type="file"
                    onChange={handleTempImageChange}
                    className="hidden"
                    accept=".jpg,.png,.jpeg"
                    id="coverTempImage"
                    name="tempimage"
                  />
                  <div
                    className="absolute bottom-1 right-1 cursor-pointer"
                    onClick={() =>
                      document.getElementById("coverTempImage").click()
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
                Update Cover
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ShowUpdateCoverTemplate;
