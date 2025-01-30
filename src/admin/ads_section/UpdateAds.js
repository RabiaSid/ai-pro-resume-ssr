import React, { useEffect, useState } from "react";
import { ApiService } from "../../services/ApiService";
import AllborderInputGroup from "../../components/AllborderInputGroup";
import swal from "sweetalert";
import LoadingSpiner from "../../components/LoadingSpinner";
import { useNavigate, useLocation } from "react-router-dom";
import { PiPencilBold } from "react-icons/pi";
import { useAuth } from "../../services/Auth";
import DropdownWithIdValue from "../../components/DropdownWithIdValue";
import ToggleSwitch from "../../components/ToggleSwitch";

const UpdateAds = () => {
  const { user } = useAuth();
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { ads_id } = location.state;

  const [sliderimageUpdated, setSliderimageUpdated] = useState(false);
  const [uploadedAdsImage, setUploadedAdsImage] = useState();
  const [AdsApiImage, setAdsApiImage] = useState();

  // Value States
  const [adsName, setAdsName] = useState("");
  const [ad_script, setAd_Script] = useState("");
  const [is_script, setIsScript] = useState("");

  const [status, setStatus] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [parentId, setParentId] = useState();
  const [templateOptions, setTemplateOptions] = useState();
  const [ad_url, setAd_URL] = useState("");
  useEffect(() => {
    ApiService.getAdsById(user?.token, ads_id)
      .then((res) => {
        console.log(res.data.data.ads);
        const options = res.data.data.parents;
        let { name, ad_script, parent_id, is_script, status, image, ad_url } =
          res.data.data.ads;

        setAdsName(name);

        setAd_Script(ad_script);
        setIsScript(is_script);
        setStatus(status);
        setAdsApiImage(image);
        setParentId(parent_id);
        setTemplateOptions(options);
        setAd_URL(ad_url);
        console.log("dddd", options);
      })
      .catch((err) => console.log(err));
  }, [user?.token, ads_id]);

  // Create Ads
  const handleCreateAds = (e) => {
    e.preventDefault();

    setIsloading(true);
    const data = {
      id: ads_id,

      ad_script: ad_script,
      is_script: is_script,
      image: uploadedAdsImage ? uploadedAdsImage : null,
      ad_url: ad_url,
    };
    ApiService.getandupdateAds(user?.token, data)
      .then((res) => {
        setIsloading(false);
        console.log("abcde", data);
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
    setUploadedAdsImage(file);
    setSliderimageUpdated(true);
  };

  return (
    <>
      {isLoading && <LoadingSpiner isLoading={isLoading} />}
      <div className="p-2">
        <form action="#" onSubmit={handleCreateAds}>
          <div className="border h-full p-4">
            {/* Slider Inputs */}
            <div className="py-4">
              <h1 className="text-2xl font-bold">Update Ads</h1>
              {/* Slider Name */}
              <div>
                <AllborderInputGroup
                  htmlFor={"AdsName"}
                  isRequired={false}
                  label={"Ads Name"}
                  onchange={(val) => setAdsName(val)}
                  value={adsName}
                  placeholder={"Enter Slider Name"}
                />
              </div>
              <div>
                <DropdownWithIdValue
                  handleOnChange={(id) => setParentId(id)}
                  htmlFor={"parent Id"}
                  isRequired={true}
                  label={"Select Page Name"}
                  options={templateOptions}
                  value={parentId}
                />
              </div>
              <div className="flex flex-col gap-2">
                <span>Is_Script</span>
                <ToggleSwitch
                  ChangeStatus={(status) =>
                    status ? setIsScript(1) : setIsScript(0)
                  }
                  status={is_script}
                />
              </div>
              {is_script ? (
                <div>
                  <AllborderInputGroup
                    htmlFor={"ad_Script"}
                    isRequired={false}
                    label={"ADS SCRIPT"}
                    onchange={(val) => setAd_Script(val)}
                    value={ad_script}
                    placeholder={"Enter ADS_SCRIPT"}
                  />
                </div>
              ) : (
                ""
              )}
              {/* Slider Image */}
              <div className="py-2 w-full flex flex-col gap-2">
                <label className="border-[#9b9b9b] text-xs sm:text-base">
                  Ads Image
                </label>
                <div className="relative w-[400px] rounded-full">
                  <img
                    src={
                      sliderimageUpdated
                        ? URL.createObjectURL(uploadedAdsImage)
                        : global.imageUrl + AdsApiImage
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
              <div>
                <AllborderInputGroup
                  htmlFor={"ad_url"}
                  isRequired={true}
                  label={"AD URL"}
                  onchange={(val) => setAd_URL(val)}
                  value={ad_url}
                  placeholder={"Enter ADS_URL"}
                />
              </div>
              {/* <div className="flex flex-col gap-2">
                <span>Status</span>
                <ToggleSwitch
                  ChangeStatus={(status) =>
                    status ? setStatus(1) : setStatus(0)
                  }
                  status={status}
                />
              </div> */}
            </div>

            <ul className="list-disc ml-2 py-2">
              {errors?.map((err, index) => (
                <li key={index} className="text-red-500 text-sm">
                  {err}
                </li>
              ))}
            </ul>

            <hr />
            {/* Upload */}
            <div className="py-6">
              <button
                type="submit"
                className="bg-primary text-lg text-white font-bold rounded-md px-4 py-2"
              >
                Update Ads
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateAds;
