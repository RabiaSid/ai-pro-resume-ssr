import React, { useEffect, useRef, useState } from "react";
import { ApiService } from "../../services/ApiService";
import AllborderInputGroup from "../../components/AllborderInputGroup";
import swal from "sweetalert";
import LoadingSpiner from "../../components/LoadingSpinner";
import TextAreaGroup from "../../components/TextAreaGroup";
import { PiPencilBold } from "react-icons/pi";
import ToggleSwitch from "../../components/ToggleSwitch";
import { useAuth } from "../../services/Auth";
// import "react-phone-number-input/style.css";
// import PhoneInput from "react-phone-number-input";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Settings = () => {
  const { user } = useAuth();
  const [errors, setErrors] = useState(null);

  //Header Logo
  const [headerImageUpdated, setHeaderImageUpdated] = useState(false);
  const [uploadedHeaderImage, setUploadedHeaderImage] = useState();
  //footer Logo
  const [footerImageUpdated, setFooterImageUpdated] = useState(false);
  const [uploadedFooterImage, setUploadedFooterImage] = useState();
  //footer Logo
  const [fivIconImageUpdated, setFivIconImageUpdated] = useState(false);
  const [uploadedFivIconImage, setUploadedFivIconImage] = useState();
  //Share Image
  const [ShareImageUpdated, setShareImageUpdated] = useState(false);
  const [uploadedShareImage, setUploadedShareImage] = useState();

  //Form States
  const [settingsData, setSettingsData] = useState({
    id: null,
    header_logo: "",
    footer_logo: "",
    contact_email: "",
    favicon: "",
    website_email: "",
    location_address: "",
    contact_number: "",
    facebook_account_link: "",
    instagram_account_link: "",
    linkedin_account_link: "",
    twitter_account_link: "",
    footer_content: "",
    footer_text: "",
    title: "",
    tax_type: "",
    tax: "",
    fees: "",
    currency: "",
    keywords: "",
    description: "",
    website_status: "",
    share_image: "",
  });

  //   Value States
  const [isLoading, setIsloading] = useState(false);
  const { userPermissions } = useAuth();

  useEffect(() => {
    ApiService.getAllSettingsAdmin(user?.token)
      .then((res) => {
        const {
          id,
          header_logo,
          footer_logo,
          contact_email,
          favicon,
          website_email,
          location_address,
          contact_number,
          facebook_account_link,
          instagram_account_link,
          linkedin_account_link,
          twitter_account_link,
          footer_content,
          footer_text,
          title,
          tax_type,
          tax,
          fees,
          currency,
          keywords,
          description,
          website_status,
          share_image,
        } = res.data.data.settings;

        console.log(res.data.data.settings);

        setSettingsData({
          id,
          header_logo,
          footer_logo,
          contact_email,
          favicon,
          website_email,
          location_address,
          contact_number,
          facebook_account_link,
          instagram_account_link,
          linkedin_account_link,
          twitter_account_link,
          footer_content,
          footer_text,
          title,
          tax_type,
          tax,
          fees,
          currency,
          keywords,
          description,
          website_status,
          share_image,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpdateSettings = (e) => {
    e.preventDefault();

    setIsloading(true);

    const data = {
      id: settingsData.id,
      header_logo: headerImageUpdated ? uploadedHeaderImage : null,
      footer_logo: footerImageUpdated ? uploadedFooterImage : null,
      contact_email: settingsData.contact_email,
      favicon: fivIconImageUpdated ? uploadedFivIconImage : null,
      website_email: settingsData.website_email,
      location_address: settingsData.location_address,
      contact_number: settingsData.contact_number,
      facebook_account_link: settingsData.facebook_account_link,
      instagram_account_link: settingsData.instagram_account_link,
      linkedin_account_link: settingsData.linkedin_account_link,
      twitter_account_link: settingsData.twitter_account_link,
      footer_content: settingsData.footer_content,
      footer_text: settingsData.footer_text,
      title: settingsData.title,
      tax_type: settingsData.tax_type,
      tax: settingsData.tax,
      fees: settingsData.fees,
      currency: settingsData.currency,
      keywords: settingsData.keywords,
      description: settingsData.description,
      website_status: settingsData.website_status,
      share_image: ShareImageUpdated ? uploadedShareImage : null,
    };

    ApiService.updateSettingsAdmin(user?.token, data)
      .then((res) => {
        setIsloading(false);
        swal({
          title: res.data.message,
          icon: "success",
        });
      })
      .catch((err) => {
        setIsloading(false);
        setErrors(Object.values(err.response.data.errors));
      });
  };

  const handleInputChange = (fieldName, value) => {
    setSettingsData((prevSettingsData) => ({
      ...prevSettingsData,
      [fieldName]: value,
    }));
  };

  //Header logo Update
  const handleHeaderLogoUpdate = (e) => {
    const file = e.target.files[0];
    setUploadedHeaderImage(file);
    setHeaderImageUpdated(true);
  };
  //Footer logo Update
  const handleFooterLogoUpdate = (e) => {
    const file = e.target.files[0];
    setUploadedFooterImage(file);
    setFooterImageUpdated(true);
  };
  //Fiv ICon logo Update
  const handleFivIconUpdate = (e) => {
    const file = e.target.files[0];
    setUploadedFivIconImage(file);
    setFivIconImageUpdated(true);
  };

  //Fiv ICon logo Update
  const handleShareImageUpdate = (e) => {
    const file = e.target.files[0];
    setUploadedShareImage(file);
    setShareImageUpdated(true);
  };

  return (
    <>
      {isLoading && <LoadingSpiner isLoading={isLoading} />}
      <div className="p-2">
        <form action="#" onSubmit={handleUpdateSettings}>
          <div className="border h-full p-4">
            {/* Slider Inputs */}
            <div className="py-4">
              <h1 className="text-2xl font-bold">Settings</h1>
              {/*  */}
              <div className="grid sm:grid-cols-2 gap-8">
                {/* 1 */}
                <div>
                  <AllborderInputGroup
                    htmlFor={"contact_Email"}
                    isRequired={true}
                    label={"Contact Email"}
                    onchange={(val) => handleInputChange("contact_email", val)}
                    value={settingsData.contact_email}
                    placeholder={"Contact Email"}
                    type={"email"}
                  />
                </div>
                {/* 2 */}
                <div className=" w-full flex flex-col gap-2">
                  {/* <label className="border-[#9b9b9b] text-xs sm:text-base">
                    Contact Number
                  </label> */}
                  <AllborderInputGroup
                    htmlFor={"contact_Email"}
                    isRequired={true}
                    label={"Contact Number"}
                    onchange={(val) => handleInputChange("contact_number", val)}
                    value={settingsData.contact_number}
                    placeholder={"Contact No"}
                    type={"text"}
                  />
                  {/* <PhoneInput
                    country={"us"} // Default country code (can change based on preference)
                    value={settingsData.contact_number}
                    onChange={(e) => handleInputChange("contact_number", e)}
                    inputProps={{
                      className:
                        "w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg p-2 pl-12 border border-[#9b9b9b] focus:border-[#00caa5] outline-none rounded-md",
                    }}
                    containerClass="w-full" // Ensures the full width is used
                    format="+1 (###) ###-####" // Optional: You can specify formatting here
                  /> */}
                </div>
                {/* 3 */}
                <div>
                  <AllborderInputGroup
                    htmlFor={"Instagram_URL"}
                    isRequired={true}
                    label={"Instagram URL"}
                    onchange={(val) =>
                      handleInputChange("instagram_account_link", val)
                    }
                    value={settingsData.instagram_account_link}
                    placeholder={"Instagram URL"}
                    type={"url"}
                  />
                </div>
                {/* 4 */}
                <div>
                  <AllborderInputGroup
                    htmlFor={"Facebook_URL"}
                    isRequired={true}
                    label={"Facebook URL"}
                    onchange={(val) =>
                      handleInputChange("facebook_account_link", val)
                    }
                    value={settingsData.facebook_account_link}
                    placeholder={"Facebook URL"}
                    type={"url"}
                  />
                </div>
                {/* 5 */}
                <div>
                  <AllborderInputGroup
                    htmlFor={"LinkedIn_URL"}
                    isRequired={true}
                    label={"LinkedIn URL"}
                    onchange={(val) =>
                      handleInputChange("linkedin_account_link", val)
                    }
                    value={settingsData.linkedin_account_link}
                    placeholder={"LinkedIn URL"}
                    type={"url"}
                  />
                </div>
                {/* 6 */}
                <div>
                  <AllborderInputGroup
                    htmlFor={"Twitter_URL"}
                    isRequired={true}
                    label={"Twitter URL"}
                    onchange={(val) =>
                      handleInputChange("twitter_account_link", val)
                    }
                    value={settingsData.twitter_account_link}
                    placeholder={"Twitter URL"}
                    type={"url"}
                  />
                </div>
              </div>
              {/*  */}
              <div>
                {/* 1 */}
                <div>
                  <AllborderInputGroup
                    htmlFor={"website_email"}
                    isRequired={true}
                    label={"Website Email"}
                    onchange={(val) => handleInputChange("website_email", val)}
                    value={settingsData.website_email}
                    placeholder={"Website Email"}
                    type={"email"}
                  />
                </div>
                {/* 2 */}
                <div>
                  <AllborderInputGroup
                    htmlFor={"location_address"}
                    isRequired={true}
                    label={"Location Address"}
                    onchange={(val) =>
                      handleInputChange("location_address", val)
                    }
                    value={settingsData.location_address}
                    placeholder={"Location Address"}
                  />
                </div>
                {/* 3 */}
                <div>
                  <TextAreaGroup
                    cols={6}
                    rows={6}
                    htmlFor={"description"}
                    isRequired={true}
                    label={"Description"}
                    onchange={(val) => handleInputChange("description", val)}
                    value={settingsData.description}
                    placeholder={"Description"}
                    resize={false}
                  />
                </div>
                {/* 4 */}
                <div>
                  <AllborderInputGroup
                    htmlFor={"footer_text"}
                    isRequired={true}
                    label={"Footer Text"}
                    onchange={(val) => handleInputChange("footer_text", val)}
                    value={settingsData.footer_text}
                    placeholder={"Footer Text"}
                  />
                </div>
                {/* 5 */}
                <div>
                  <TextAreaGroup
                    cols={6}
                    rows={6}
                    htmlFor={"footer_content"}
                    isRequired={true}
                    label={"Footer Content"}
                    onchange={(val) => handleInputChange("footer_content", val)}
                    value={settingsData.footer_content}
                    placeholder={"Footer Content"}
                    resize={false}
                  />
                </div>
              </div>
              {/*  */}
              <div>
                {/* 1 */}
                <div>
                  <AllborderInputGroup
                    htmlFor={"Title"}
                    isRequired={true}
                    label={"Website Title"}
                    onchange={(val) => handleInputChange("title", val)}
                    value={settingsData.title}
                    placeholder={"Website Title"}
                  />
                </div>
                {/* 2 */}
                <div>
                  <AllborderInputGroup
                    htmlFor={"tax_type"}
                    isRequired={true}
                    label={"Tax Type"}
                    onchange={(val) => handleInputChange("tax_type", val)}
                    value={settingsData.tax_type}
                    placeholder={"Tax Type"}
                    type={"text"}
                  />
                </div>
                <div>
                  <AllborderInputGroup
                    htmlFor={"tax"}
                    isRequired={true}
                    label={"Tax"}
                    onchange={(val) => handleInputChange("tax", val)}
                    value={settingsData.tax}
                    placeholder={"Tax"}
                    type={"number"}
                  />
                </div>
                {/* 3 */}
                <div>
                  <AllborderInputGroup
                    htmlFor={"fees"}
                    isRequired={true}
                    label={"Fees"}
                    onchange={(val) => handleInputChange("fees", val)}
                    value={settingsData.fees}
                    placeholder={"Fees"}
                    type={"number"}
                  />
                </div>
                {/* 4 */}
                <div>
                  <AllborderInputGroup
                    htmlFor={"keyword"}
                    isRequired={true}
                    label={"Keyword"}
                    onchange={(val) => handleInputChange("keywords", val)}
                    value={settingsData.keywords}
                    placeholder={"Keyword"}
                  />
                </div>
                {/* 4 */}
                <div className="flex flex-col gap-2">
                  <label>Website Status</label>
                  <ToggleSwitch
                    ChangeStatus={(status) =>
                      setSettingsData((prev) => ({
                        ...prev,
                        website_status: status ? 1 : 0,
                      }))
                    }
                    status={settingsData.website_status}
                  />
                </div>
              </div>
              {/*  */}
              <div className="flex justify-between gap-8">
                {/* Header Logo */}
                <div className="py-2 w-full flex flex-col gap-2">
                  <label className="border-[#9b9b9b] text-xs sm:text-base">
                    Header Logo
                  </label>
                  <div className="relative h-[200px] w-[200px] flex justify-center items-center border">
                    <img
                      src={
                        headerImageUpdated
                          ? URL.createObjectURL(uploadedHeaderImage)
                          : `${global.imageUrl + settingsData.header_logo}`
                      }
                      alt="header__logo"
                      className="w-full "
                    />
                    <input
                      type="file"
                      onChange={handleHeaderLogoUpdate}
                      className="hidden"
                      accept=".png"
                      id="header__logo"
                    />
                    <div
                      className="absolute bottom-1 right-1 cursor-pointer"
                      onClick={() =>
                        document.getElementById("header__logo").click()
                      }
                    >
                      <PiPencilBold className="bg-white border-2 rounded-full text-4xl p-1 shadow-lg" />
                    </div>
                  </div>
                </div>
                {/* Footer Logo */}
                <div className="py-2 w-full flex flex-col gap-2 ">
                  <label className="border-[#9b9b9b] text-xs sm:text-base">
                    Footer Logo
                  </label>
                  <div className="relative h-[200px] w-[200px] flex justify-center items-center border">
                    <img
                      src={
                        footerImageUpdated
                          ? URL.createObjectURL(uploadedFooterImage)
                          : `${global.imageUrl + settingsData.footer_logo}`
                      }
                      alt="footer__logo"
                      className="w-full "
                    />
                    <input
                      type="file"
                      onChange={handleFooterLogoUpdate}
                      className="hidden"
                      accept=".png"
                      id="footer__logo"
                    />
                    <div
                      className="absolute bottom-1 right-1 cursor-pointer"
                      onClick={() =>
                        document.getElementById("footer__logo").click()
                      }
                    >
                      <PiPencilBold className="bg-white border-2 rounded-full text-4xl p-1 shadow-lg" />
                    </div>
                  </div>
                </div>
                {/* Fiv Icon Logo */}
                <div className="py-2 w-full flex flex-col gap-2 ">
                  <label className="border-[#9b9b9b] text-xs sm:text-base">
                    Fiv Icon
                  </label>
                  <div className="relative h-[200px] w-[200px] flex justify-center items-center border">
                    <img
                      src={
                        fivIconImageUpdated
                          ? URL.createObjectURL(uploadedFivIconImage)
                          : `${global.imageUrl + settingsData.favicon}`
                      }
                      alt="fiv__icon"
                      className="w-full "
                    />
                    <input
                      type="file"
                      onChange={handleFivIconUpdate}
                      className="hidden"
                      accept=".png"
                      id="fiv__icon"
                    />
                    <div
                      className="absolute bottom-1 right-1 cursor-pointer"
                      onClick={() =>
                        document.getElementById("fiv__icon").click()
                      }
                    >
                      <PiPencilBold className="bg-white border-2 rounded-full text-4xl p-1 shadow-lg" />
                    </div>
                  </div>
                </div>
                {/* Share Image */}
                <div className="py-2 w-full flex flex-col gap-2 ">
                  <label className="border-[#9b9b9b] text-xs sm:text-base">
                    Share Image
                  </label>
                  <div className="relative h-[200px] w-[200px] flex justify-center items-center border">
                    <img
                      src={
                        ShareImageUpdated
                          ? URL.createObjectURL(uploadedShareImage)
                          : `${global.imageUrl + settingsData.share_image}`
                      }
                      alt="fiv__icon"
                      className="w-full "
                    />
                    <input
                      type="file"
                      onChange={handleShareImageUpdate}
                      className="hidden"
                      accept=".png"
                      id="share_image"
                    />
                    <div
                      className="absolute bottom-1 right-1 cursor-pointer"
                      onClick={() =>
                        document.getElementById("share_image").click()
                      }
                    >
                      <PiPencilBold className="bg-white border-2 rounded-full text-4xl p-1 shadow-lg" />
                    </div>
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
            <div
              className={`py-6 ${
                userPermissions.includes("setting-edit") ? "flex" : "hidden"
              }`}
            >
              <button
                type="submit"
                className="bg-primary text-lg text-white font-bold rounded-md px-4 py-2"
              >
                Update Settings
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Settings;
