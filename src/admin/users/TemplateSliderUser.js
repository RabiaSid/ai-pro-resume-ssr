import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoCloseOutline } from "react-icons/io5";
import axios from "axios";
import { useAuth } from "../../services/Auth";
// resume active template
import ActiveTemplate from "../../resume/ActiveTemplate";
import ActiveTemplateCover from "../../cover_letter/ActiveTemplate";
import { ApiService } from "../../services/ApiService";
import { Link } from "react-router-dom";
const TemplatesSliderUser = ({ open, onClose, doc_id, doc_name }) => {
  const { user } = useAuth();
  const [share_data, set_share_data] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  // Cover Letter
  const [activeTemplateCover, setActiveTemplateCover] = useState(0);
  const [activeThemeCover, setActiveThemeCover] = useState("");
  const [activeFontCover, setActiveFontCover] = useState("");
  const [activeFontSizeCover, setActiveFontSizeCover] = useState("");
  const [signatureData, setSignatureData] = useState({
    type: "",
    value: "",
  });

  const [coverData, setCoverData] = useState({
    id: 0,
    user_id: 0,
    name: "",
    first_name: "",
    last_name: "",
    contact_person_name: "",
    contact_person_designation: "",
    contact_person_email: "",
    contact_person_phone: "",
    company_name: "",
    company_address: "",
    cover_template_id: "",
    phone_number: "",
    email_address: "",
    street_address: "",
    country_id: "",
    state: "",
    city: "",
    zip_code: "",
    experience: "",
    job_title: "",
    employeer_name: "",
    opener_detail: "",
    closer_detail: "",
    date: new Date(),
    country_name: "",
    show_personal_information: 0,
  });

  // Resume
  const [activeTemplate, setActiveTemplate] = useState(0);
  const [activeTheme, setActiveTheme] = useState("");
  const [activeFont, setActiveFont] = useState("");
  const [activeFontSize, setActiveFontSize] = useState("");
  //
  const [hasOldSignature, setHasOldSignature] = useState(0);
  const [resumeData, setResumeData] = useState({
    uuid: 0,
    resumeId: 0,
    // header
    resume_name: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    phone_number: "",
    contact_number: "",
    email_address: "",
    linkedin: "",
    website: "",
    street_address: "",
    postal_code: "",
    date_of_birth: "",
    gender: "",
    maritial_status: "",
    nationality: "",
    id_no: "",
    job_title: "",
    country_id: "",
    state: "",
    city: "",
    profile_image: "",
    // summary
    summary: "",
    // experience
    job_position: "",
    company_name: "",
    type: "",
    start_date: "",
    end_date: "",
    currently_working: "",
    company_description: "",
    job_description: "",
    country_id: "",
    state_id: "",
    city_id: "",
    // technical Skills Array
    technicalSkillsId: 0,
    technical_skills: [],
    technical_skills_feildName: "",
    // soft Skills
    softSkillsId: 0,
    soft_skills: [],
    soft_skills_feildName: "",
    //
    experiences: "",
    certificates: [],
    awards: [],
    languages: [],
    references: [],
    education: [],
    resume_sections: {
      show_awards: 0,
      show_certificates: 0,
      show_experience: 0,
      show_languages: 0,
      show_references: 0,
      show_soft_skills: 0,
    },
  });

  useEffect(() => {
    const headers = {
      Authorization: "Bearer " + user?.token,
      "Access-Control-Allow-Origin": "*",
    };
    if (doc_name === "resume") {
      axios
        .get(global.baseurl + "/show-profile/" + doc_id, { headers })
        .then((res) => {
          if (res) {
            // set_share_data(data?.data.data);
            const {
              id,
              image_url,
              profile_image,
              resume_name,
              first_name,
              last_name,
              middle_name,
              email_address,
              contact_number,
              gender,
              date_of_birth,
              maritial_status,
              country_id,
              nationality,
              street_address,
              uuid,
              linkedin,
              website,
              postal_code,
              phone_number,
              id_no,
              job_title,
              template_id,
              state,
              city,

              //
              experiences,
              certificates,
              awards,
              languages,
              references,
              education,
              resume_sections,
            } = res.data.data;

            setActiveTemplate(template_id);
            setActiveFont(res.data.data.formating.heading_font_style);
            setActiveTheme(res.data.data.formating.color);
            setActiveFontSize(res.data.data.formating.heading_fontsize);

            const summary = res.data.data?.summary?.description;

            // Technical Skills
            const TechSkillData = res.data.data?.technical_skills;
            const TechnicalSkillsArrayData = TechSkillData?.body
              .split(",,")
              .map((skill) => skill.trim());
            // Technical Skills
            const SoftSkillData = res.data.data?.soft_skills;
            const SoftSkillsArrayData = SoftSkillData?.body
              .split(",,")
              .map((skill) => skill.trim());
            // Certificates

            setResumeData({
              uuid: uuid,
              resumeId: id,
              image_url: image_url,
              profile_image: profile_image,
              first_name: first_name,
              resume_name: resume_name,
              last_name: last_name,
              middle_name: middle_name,
              email_address: email_address,
              contact_number: contact_number,
              gender: gender,
              date_of_birth: date_of_birth,
              maritial_status: maritial_status,
              country_id: country_id,
              city: city,
              state: state,
              nationality: nationality,
              street_address: street_address,
              linkedin: linkedin,
              website: website,
              postal_code: postal_code,
              phone_number: phone_number,
              id_no: id_no,
              job_title: job_title,
              // summary
              summary: summary,
              experiences: experiences,
              // Technical Skills
              technical_skills: TechnicalSkillsArrayData,
              technical_skills_feildName: TechSkillData?.title,
              technicalSkillsId: TechSkillData?.id,
              // soft Skills
              soft_skills: SoftSkillsArrayData,
              soft_skills_feildName: SoftSkillData?.title,
              softSkillsId: SoftSkillData?.id,
              // certificates
              certificates: certificates,
              awards: awards,
              languages: languages,
              education: education,
              references,
              resume_sections,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get(global.baseurl + "/show-cover-letter/" + doc_id, { headers })
        .then((res) => {
          if (res) {
            const {
              id,
              user_id,
              name,
              first_name,
              last_name,
              contact_person_name,
              contact_person_designation,
              contact_person_email,
              contact_person_phone,
              company_name,
              company_address,
              cover_template_id,
              phone_number,
              email_address,
              street_address,
              country_id,
              state,
              city,
              zip_code,
              experience,
              job_title,
              employeer_name,
              opener_detail,
              closer_detail,
              show_personal_information,
            } = res.data.data;

            console.log(res?.data.data);

            ApiService.getCoverLetterSignature(user?.token, id)
              .then((res) => {
                const data = res.data.data;
                console.log("signature", data);
                if (data) {
                  if (data.is_draw) {
                    setSignatureData({
                      type: "drew",
                      value: data.image_url + "/" + data.image,
                    });
                  } else if (data.is_upload) {
                    setSignatureData({
                      type: "upload",
                      value: data.image_url + "/" + data.image,
                    });
                  } else if (data.is_text) {
                    setSignatureData({
                      type: "type",
                      value: data.text,
                    });
                  }
                } else {
                  setSignatureData({
                    type: "",
                    value: "",
                  });
                }
              })
              .catch((err) => console.log(err));

            setActiveTemplateCover(cover_template_id);
            ApiService.getCoverLetterSignature(user?.token, id)
              .then((res) => {
                const data = res.data.data;
                console.log("signature", data);
                if (data) {
                  setHasOldSignature(data.id);
                  if (data.is_draw) {
                    setSignatureData({
                      type: "drew",
                      value: data.image_url + "/" + data.image,
                    });
                  } else if (data.is_upload) {
                    setSignatureData({
                      type: "upload",
                      value: data.image_url + "/" + data.image,
                    });
                  } else if (data.is_text) {
                    setSignatureData({
                      type: "type",
                      value: data.text,
                    });
                  }
                } else {
                  setHasOldSignature(0);
                  setSignatureData({
                    type: "",
                    value: "",
                  });
                }
              })
              .catch((err) => console.log(err));

            const formatting = res.data.data.formating;

            setActiveTheme(formatting.color);
            setActiveFont(formatting.heading_font_style);
            setActiveFontSize(formatting.heading_fontsize);
            setCoverData((prev) => ({
              ...prev,
              id,
              user_id,
              name,
              first_name,
              last_name,
              contact_person_name,
              contact_person_designation,
              contact_person_email,
              contact_person_phone,
              company_address,
              cover_template_id,
              phone_number,
              email_address,
              street_address,
              country_id,
              state,
              city,
              zip_code,
              experience,
              job_title,
              employeer_name,
              opener_detail,
              closer_detail,
              show_personal_information,
            }));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div
      id="default-modal"
      className={`${open ? "flex" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center w-full md:inset-0 h-full bg-[#00000090]`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-[75%] lg:w-[40%] mt-40 mb-40">
        <div className="relative rounded-lg">
          <div className="relative">
            <div className="w-full flex justify-center">
              {doc_name === "resume" ? (
                <div className="w-[1200px] flex-shrink-0">
                  <div className="flex items-center justify-evenly py-4">
                    <h2 className="text-white Montserrat w-[45%]">
                      {resumeData?.resume_name}
                    </h2>
                    <button
                      type="button"
                      className="text-white JosefinSans bg-[#00bfab] rounded-xl text-xs sm:text-sm px-4 py-2 hover:bg-[#0072b1] transition-colors duration-500"
                    >
                      <Link
                        to={"/resume/formatting-admin"}
                        state={{
                          isExample: false,
                          resumeId: doc_id,
                        }}
                      >
                        Use This Template
                      </Link>
                    </button>
                    <button
                      type="button"
                      className="rounded-lg text-sm w-12 sm:w-14 h-14 ms-auto inline-flex justify-center items-center"
                      onClick={onClose}
                    >
                      <IoCloseOutline
                        size={70}
                        className="text-white hover:text-red-600"
                      />
                    </button>
                  </div>
                  <ActiveTemplate
                    activeId={activeTemplate}
                    resumeData={resumeData}
                    activeTheme={activeTheme}
                    activeFont={activeFont}
                    activeFontSize={activeFontSize}
                  />
                </div>
              ) : (
                <div className="w-[1200px] flex-shrink-0">
                  <div className="flex items-center justify-evenly py-4">
                    <h2 className="text-white Montserrat w-[45%]">
                      {coverData?.name}
                    </h2>
                    <button
                      type="button"
                      className="text-white JosefinSans bg-[#00bfab] rounded-xl text-xs sm:text-sm px-4 py-2 hover:bg-[#0072b1] transition-colors duration-500"
                    >
                      Use This Template
                    </button>
                    <button
                      type="button"
                      className="rounded-lg text-sm w-12 sm:w-14 h-14 ms-auto inline-flex justify-center items-center"
                      onClick={onClose}
                    >
                      <IoCloseOutline
                        size={70}
                        className="text-white hover:text-red-600"
                      />
                    </button>
                  </div>
                  <ActiveTemplateCover
                    activeId={activeTemplateCover}
                    coverData={coverData}
                    activeTheme={activeThemeCover}
                    activeFont={activeFontCover}
                    activeFontSize={activeFontSizeCover}
                    signature={signatureData}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="h-[200px]"></div>
        </div>
      </div>
    </div>
  );
};

export default TemplatesSliderUser;
