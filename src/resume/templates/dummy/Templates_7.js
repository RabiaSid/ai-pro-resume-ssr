import React, { useEffect, useState } from "react";
import axios from "axios";
import placeholderImageUser from "../../../assets/images/reusme_placeholder_image.webp";

import { LuLanguages } from "react-icons/lu";
import { PiPencilLineLight } from "react-icons/pi";
import {
  BiSolidUserDetail,
  BiGlobe,
  BiSolidMap,
  BiSolidEnvelope,
  BiSolidPhone,
} from "react-icons/bi";
import { FaBriefcase, FaAward, FaTrophy } from "react-icons/fa";
import { HiMiniAcademicCap } from "react-icons/hi2";
import { lang } from "moment/moment";

import SectionExperience from "./component_sections/Experience";
import SectionEducation from "./component_sections/Education";
import SectionAwards from "./component_sections/Awards";
import SectionCertificates from "./component_sections/Certificates";
import SectionReferences from "./component_sections/References";
import SectionLanguages from "./component_sections/Languages";
import SectionProfileInfo from "./component_sections/ProfileInfo";
import SectionSkills from "./component_sections/Skills";
import Branding from "../../../components/Branding";
const Header = ({
  resumeData,
  activeTheme,
  activeFont,
  activeFontSize,
  allCountries,
  isChecked,
}) => {
  const {
    image_url,
    profile_image,
    first_name,
    last_name,
    phone_number,
    website,
    email_address,
    contact_number,
    country_id,
    city,
    state,
    postal_code,
    street_address,
    job_title,
    // suucammary
    summary,
    // experiences
    experiences,
    education,
    awards,
    certificates,
    custom_sections,
    languages,
    references,
    // technical Skiils
    technical_skills,
    technical_skills_feildName,
    // soft Skiils
    soft_skills,
    soft_skills_feildName,
    resume_sections,
  } = resumeData;

  const formattedDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-indexed
    const year = date.getFullYear();

    // Pad day and month with leading zero if necessary

    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    return `${formattedDay}-${formattedMonth}-${year}`;
  };

  const formattedDate2 = (inputDate) => {
    // Split the inputDate (assuming it's in YYYY-MM-DD format)
    const [year, month] = inputDate.split("-");

    // Create a new Date object with the provided year and month (no timezone issues)
    const date = new Date(year, month - 1); // Subtract 1 from month since Date object uses 0-based months

    // Get the month as a string (short version, like "Dec")
    const monthName = date.toLocaleString("default", { month: "short" });

    // Return the formatted date as "Dec, 2024"
    return `${monthName}, ${year}`;
  };

  return (
    <section
      id="my_template"
      className={`chk_height min-h-[1308px] font_1 w-full bg-white  relative mine_adjust ${activeFont} ${activeFontSize} ${!isChecked ? activeTheme : ""
        }`}
    >
      <div
        className="chk_height main flex h-[100%] min-h-[1308px]"
        id="data_contacts"
      >
        <div className="w-[65%] pt-[20px] flex flex-col min-h-[1308px]">
          <div className="w-full flex justify-between  px-6">
            <header
              className="  flex items-center w-full"
              id="data_personal_info"
            >
              <div className=" pr-2  w-[20%]">
                {profile_image instanceof File ? (
                  <img
                    src={`${URL.createObjectURL(profile_image)}`}
                    width={150}
                    className="rounded-lg w-[300px]  border-2 border-black "
                    alt="profile"
                  />
                ) : profile_image ? (
                  <img
                    src={`${image_url + "/" + profile_image}`}
                    width={150}
                    className="rounded-lg w-[300px]  border-2 border-black "
                    alt="profile"
                  />
                ) : (
                  <img
                    src={`${placeholderImageUser}`}
                    id="unused_image"
                    width={150}
                    className="rounded-lg w-[300px] border-2 border-black"
                    alt="profile"
                  />
                )}
              </div>
              <div className="w-[80%] text-center">
                <h1 className="theme10_default_fg_1 theme_fg_1 font-bold tracking-wider Arial data-font-name default-font-size-heading data-font-size-heading">
                  <span className="break-all">
                    {first_name ? first_name : "Your Name"}{" "}
                  </span>
                  {last_name ? last_name : ""}
                </h1>
                <p className="theme10_default_fg_2 theme_fg_2 data-font-name Arial data-font-size-sub-heading default-font-size-sub-heading ">
                  {job_title ? job_title : ""}
                </p>
              </div>
            </header>
          </div>
          {summary ? (
            <div className="pt-5 mx-8" id="data_summary">
              <div className="resume-section-content">
                <div
                  className="Arial text-sm resume-section-content text-black whitespace-pre-line mt-4 text-justify w-full data-font-name data-font-size-desc-heading default-font-size-desc-heading"
                  dangerouslySetInnerHTML={{
                    __html: summary
                      ? summary
                      : "What's the one thing which makes you the best candidate for this job?",
                  }}
                />
                {/* <p className="Arial whitespace-pre-line text-sm text-justify text-[#000000] leading-[1.3] data-font-name data-font-size-desc-heading default-font-size-desc-heading">
                  {summary
                    ? summary
                    : "What's the one thing which makes you the best candidate for this job?"}
                </p> */}
              </div>
            </div>
          ) : (
            ""
          )}
          {/* experience */}
          {resume_sections?.show_experience === 1 && (
            <>
              <div className="pt-5 mx-8" id="data_experience">
                <table className="mytable ">
                  <tr>
                    <td className="relative">
                      <div className="absolute left-[-5px] top-[5px] w-[5px] h-6 theme10_default_bg_1 theme_bg_1 rounded-tl-md rounded-bl-md"></div>
                      <div className="absolute left-[-9px] top-[8px] w-[3px] h-4 theme10_default_bg_1 theme_bg_1  rounded-tl-md rounded-bl-md"></div>
                      <div className="w-8 h-8 rounded-md flex justify-center items-center theme10_default_bg_2 theme_bg_2">
                        <FaBriefcase size={16} className="text_white" />
                      </div>
                    </td>
                    <td className="uppercase Arial pl-2 data-font-name font-semibold data-font-size-main-heading default-font-size-main-heading">
                      Work Experience
                    </td>
                  </tr>
                </table>

                {experiences?.length > 0 ? (
                  experiences?.map((exp, idx) => (
                    <section key={idx} className="mb-2 w-full">
                      <SectionExperience
                        countryId={country_id}
                        allCountries={allCountries}
                        colorPosition={"theme10_default_fg_2 theme_fg_2"}
                        colorDates={"text-[#777] italic tracking-wide"}
                        colorLocation={"theme10_default_fg_1 theme_fg_1"}
                        variant={1}
                        data={exp}
                      />
                    </section>
                  ))
                ) : (
                  <section className="mb-2 w-full">
                    <SectionExperience
                      countryId={country_id}
                      allCountries={allCountries}
                      colorPosition={"theme10_default_fg_2 theme_fg_2"}
                      colorDates={"text-[#777] italic tracking-wide"}
                      colorLocation={"theme10_default_fg_1 theme_fg_1"}
                      variant={1}
                      data={""}
                    />
                  </section>
                )}
              </div>
            </>
          )}

          {/* end experience */}

          {/* education */}
          <div className="pt-5 mx-8" id="data_educations">
            <table className="mytable ">
              <tr>
                <td className="relative">
                  <div className="absolute left-[-5px] top-[5px] w-[5px] h-6 theme10_default_bg_1 theme_bg_1 rounded-tl-md rounded-bl-md"></div>
                  <div className="absolute left-[-9px] top-[8px] w-[3px] h-4 theme10_default_bg_1 theme_bg_1  rounded-tl-md rounded-bl-md"></div>
                  <div className="w-8 h-8 rounded-md flex justify-center items-center theme10_default_bg_2 theme_bg_2">
                    <HiMiniAcademicCap size={16} className="text_white" />
                  </div>
                </td>
                <td className="uppercase Arial pl-2 data-font-name font-semibold data-font-size-main-heading default-font-size-main-heading">
                  Education
                </td>
              </tr>
            </table>

            {education?.length > 0 ? (
              education?.map((edu, idx) => (
                <section key={idx} className="w-full">
                  <SectionEducation
                    countryId={country_id}
                    colorTitle={"theme10_default_fg_2 theme_fg_2"}
                    colorDates={"text-[#777] italic tracking-wide"}
                    colorLocation={"theme10_default_fg_1 theme_fg_1"}
                    colorGradeType={"text_black"}
                    variant={1}
                    data={edu}
                  />
                </section>
              ))
            ) : (
              <section className="w-full">
                <SectionEducation
                  countryId={country_id}
                  colorTitle={"theme10_default_fg_2 theme_fg_2"}
                  colorDates={"text-[#777] italic tracking-wide"}
                  colorLocation={"theme10_default_fg_1 theme_fg_1"}
                  colorGradeType={"text_black"}
                  variant={1}
                  data={""}
                />
              </section>
            )}
          </div>
          {/* end education */}

          {/* awards */}
          {resume_sections?.show_awards === 1 && (
            <>
              {awards?.length > 0 && (
                <div className="pt-5 mx-8 text-[#000000]" id="data_awards">
                  <table className="mytable ">
                    <tr>
                      <td className="relative">
                        <div className="absolute left-[-5px] top-[5px] w-[5px] h-6 theme10_default_bg_1 theme_bg_1 rounded-tl-md rounded-bl-md"></div>
                        <div className="absolute left-[-9px] top-[8px] w-[3px] h-4 theme10_default_bg_1 theme_bg_1  rounded-tl-md rounded-bl-md"></div>
                        <div className="w-8 h-8 rounded-md flex justify-center items-center theme10_default_bg_2 theme_bg_2">
                          <FaTrophy size={16} className="text_white" />
                        </div>
                      </td>
                      <td className="uppercase Arial pl-2 data-font-name font-semibold data-font-size-main-heading default-font-size-main-heading">
                        Awards
                      </td>
                    </tr>
                  </table>

                  {awards?.length > 0 ? (
                    awards?.map((award, idx) => (
                      <section key={idx} className="w-full">
                        <SectionAwards
                          colorTitle={"theme10_default_fg_2 theme_fg_2"}
                          colorDates={"text-[#777] italic tracking-wide"}
                          colorLocation={"theme10_default_fg_1 theme_fg_1"}
                          colorDesc={"text_black"}
                          variant={1}
                          data={award}
                        />
                      </section>
                    ))
                  ) : (
                    <section className="w-full">
                      <SectionAwards
                        colorTitle={"theme10_default_fg_2 theme_fg_2"}
                        colorDates={"text-[#777] italic tracking-wide"}
                        colorLocation={"theme10_default_fg_1 theme_fg_1"}
                        colorDesc={"text_black"}
                        variant={1}
                        data={""}
                      />
                    </section>
                  )}
                </div>
              )}
            </>
          )}

          {/* end awards */}

          {/* certification */}
          {resume_sections?.show_certificates === 1 && (
            <>
              {certificates?.length > 0 && (
                <div
                  className="pt-5 mx-8 text-[#000000]"
                  id="data_certifications"
                >
                  <table className="mytable ">
                    <tr>
                      <td className="relative">
                        <div className="absolute left-[-5px] top-[5px] w-[5px] h-6 theme10_default_bg_1 theme_bg_1 rounded-tl-md rounded-bl-md"></div>
                        <div className="absolute left-[-9px] top-[8px] w-[3px] h-4 theme10_default_bg_1 theme_bg_1  rounded-tl-md rounded-bl-md"></div>
                        <div className="w-8 h-8 rounded-md flex justify-center items-center theme10_default_bg_2 theme_bg_2">
                          <FaAward size={16} className="text_white" />
                        </div>
                      </td>
                      <td className="uppercase Arial pl-2 data-font-name font-semibold data-font-size-main-heading default-font-size-main-heading">
                        Certificates
                      </td>
                    </tr>
                  </table>

                  {certificates?.length > 0 ? (
                    certificates?.map((certificate, idx) => (
                      <section className="w-full">
                        <SectionCertificates
                          colorTitle={"theme10_default_fg_2 theme_fg_2"}
                          colorDates={"text-[#777] italic tracking-wide"}
                          colorLocation={"theme10_default_fg_1 theme_fg_1"}
                          colorDesc={"text_black"}
                          variant={1}
                          data={certificate}
                        />
                      </section>
                    ))
                  ) : (
                    <section className="w-full">
                      <SectionCertificates
                        colorTitle={"theme10_default_fg_2 theme_fg_2"}
                        colorDates={"text-[#777] italic tracking-wide"}
                        colorLocation={"theme10_default_fg_1 theme_fg_1"}
                        colorDesc={"text_black"}
                        variant={1}
                        data={""}
                      />
                    </section>
                  )}
                </div>
              )}
            </>
          )}

          {/* end certification */}

          {custom_sections?.length > 0 &&
            (custom_sections?.length > 0
              ? custom_sections
                ?.filter((custom_section) => custom_section.is_show)
                .map((custom_section, idx) => (
                  <div
                    key={idx}
                    className="pt-5 mx-8 text-[#000000]"
                    id="data_custom"
                  >
                    <table className="mytable ">
                      <tr>
                        <td className="relative">
                          <div className="absolute left-[-5px] top-[5px] w-[5px] h-6 theme10_default_bg_1 theme_bg_1 rounded-tl-md rounded-bl-md"></div>
                          <div className="absolute left-[-9px] top-[8px] w-[3px] h-4 theme10_default_bg_1 theme_bg_1  rounded-tl-md rounded-bl-md"></div>
                          <div className="w-8 h-8 rounded-md flex justify-center items-center theme10_default_bg_2 theme_bg_2">
                            <FaAward size={16} className="text_white" />
                          </div>
                        </td>
                        <td className="uppercase Arial pl-2 data-font-name font-semibold data-font-size-main-heading default-font-size-main-heading">
                          {custom_section.title}
                        </td>
                      </tr>
                    </table>
                    <p className="text_black data-font-name data-font-size-desc-heading default-font-size-desc-heading mt-2 w-full editor_txt">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: custom_section.detail,
                        }}
                      />
                    </p>
                  </div>
                ))
              : "")}
          <div className="relative h-[60px] mt-auto mb-0">
            <Branding left="12px" />
          </div>
        </div>

        <div className="w-[35%]  flex flex-col gap-4 px-2 py-4 h-auto">
          {/* personal_info */}
          <div className="p-4 bg-[#024C43] rounded-xl theme10_default_bg_1 theme_bg_1 resume-section-content">
            <div className="py-2 flex justify-start items-center">
              <SectionProfileInfo
                phone_number={phone_number}
                contact_number={contact_number}
                email_address={email_address}
                website={website}
                countryId={country_id}
                allCountries={allCountries}
                street_address={street_address}
                postal_code={postal_code}
                city={city}
                state={state}
                colorText={"text_white"}
                colorIcon={"text_white"}
                colorIconBG={""} //for varient 2 apply background class
                variant={2}
              />
            </div>
          </div>
          {/* end personal_info */}

          <div className="p-4 bg-[#024C43] rounded-xl theme10_default_bg_1 theme_bg_1 flex-1">
            {/* technical skills */}

            <div className="pt-5 text-[#fff] " id="data_technical_skills">
              <table className="mytable mb-2">
                <tr>
                  <td className="relative">
                    <div className="w-8 h-8 rounded-md flex justify-center items-center text_black bg-[#fff]">
                      <PiPencilLineLight size={16} className="text_black" />
                    </div>
                  </td>
                  <td className="uppercase  Arial  pl-2 font-semibold data-font-name data-font-size-main-heading default-font-size-main-heading">
                    Technical Skills
                  </td>
                </tr>
              </table>

              <div className="  text-[#fff] ">
                {technical_skills?.length > 0 ? (
                  technical_skills?.map((t_skills, idx) => {
                    if (t_skills?.match(/([^\(]+)\(([^)]+)\)/)) {
                      var skillsArray = t_skills?.split("()"); // Split skills into an array
                    } else {
                      var skillsArray = t_skills?.split(","); // Split skills into an array
                    }

                    return (
                      <SectionSkills
                        key={idx}
                        ids={idx}
                        length={technical_skills?.length}
                        colorText={"text_white"}
                        colorTags={" border-b border-white "}
                        variant={1}
                        data={skillsArray} // Pass skills as an array
                      />
                    );
                  })
                ) : (
                  <SectionSkills
                    colorText={"text_white"}
                    colorTags={" border-b border-white "}
                    variant={1}
                    data={""} // Fallback as an empty array if no skills
                  />
                )}
              </div>
            </div>

            {/* end technical skills */}

            {/* soft skills */}
            {resume_sections?.show_soft_skills === 1 && (
              <div className="pt-8 text-[#fff]" id="data_soft_skills">
                <table className="mytable mb-2">
                  <tr>
                    <td className="relative">
                      <div className="w-8 h-8 rounded-md flex justify-center items-center text_black bg-[#fff]">
                        <PiPencilLineLight size={16} className="text_black" />
                      </div>
                    </td>
                    <td className="uppercase  Arial  pl-2 font-semibold data-font-name data-font-size-main-heading default-font-size-main-heading">
                      Soft Skills
                    </td>
                  </tr>
                </table>

                <div className="  text-[#fff] ">
                  {soft_skills?.length > 0 ? (
                    soft_skills?.map((s_skills, idx) => {
                      if (skillsArray?.match(/([^\(]+)\(([^)]+)\)/)) {
                        var skillsArray = s_skills?.split("()"); // Split skills into an array
                      } else {
                        var skillsArray = s_skills?.split(","); // Split skills into an array
                      }

                      return (
                        <SectionSkills
                          key={idx}
                          ids={idx}
                          length={soft_skills?.length}
                          colorText={"text_white"}
                          colorTags={" border-b border-white "}
                          variant={1}
                          data={skillsArray} // Pass skills as an array
                        />
                      );
                    })
                  ) : (
                    <SectionSkills
                      colorText={"text_white"}
                      colorTags={" border-b border-white "}
                      variant={1}
                      data={""} // Fallback as an empty array if no skills
                    />
                  )}
                </div>
              </div>
            )}
            {/* end soft skills */}

            {/* custom section */}
            {/* <div
              className="pt-8  bg-[#024C43] rounded-xl data-shapes-main"
              id="data_custom_section"
            >
              <div className="flex justify-start items-center w-full  relative">
                <div className="w-8 h-8 rounded-md flex justify-center items-center text-[#024C43] data-headings-primary bg-[#fff]">
                  <BiDetail size={16} />
                </div>
                <h1
                  className="uppercase text-lg font-bold Arial text-[#B89764] data-headings-secondary pl-2 tracking-wider"
                  style={{ textShadow: "0 0 1px #024C43" }}
                >
                  Abilities
                </h1>
              </div>
              <p className="Arial mt-4 text-justify text-xs leading-5 w-full text-[#fff]">
                Possesses strong leadership skills able to inspire ard motivate
                team members towards common goals.
              </p>
            </div> */}
            {/* end custom section */}

            {/* references */}
            {resume_sections?.show_references === 1 && (
              <>
                {references?.length > 0 && (
                  <div className="pt-10" id="data_references">
                    <table className="mytable mb-2">
                      <tr>
                        <td className="relative">
                          <div className="w-8 h-8 rounded-md flex justify-center items-center text_black bg-[#fff]">
                            <BiSolidUserDetail
                              size={16}
                              className="text_black"
                            />
                          </div>
                        </td>
                        <td className="uppercase text_white Arial  pl-2 font-semibold data-font-name data-font-size-main-heading default-font-size-main-heading">
                          References
                        </td>
                      </tr>
                    </table>

                    {references?.length > 0 ? (
                      references?.map((ref, idx) => (
                        <section key={idx} className="w-full">
                          <SectionReferences
                            colorTitle={"text_white"}
                            colorDesignation={"text_white"}
                            colorLocation={"text_white"}
                            colorContactInfo={"text_white"}
                            variant={1}
                            data={ref}
                          />
                        </section>
                      ))
                    ) : (
                      <section className="w-full">
                        <SectionReferences
                          colorTitle={"text_white"}
                          colorDesignation={"text_white"}
                          colorLocation={"text_white"}
                          colorContactInfo={"text_white"}
                          variant={1}
                          data={""}
                        />
                      </section>
                    )}
                  </div>
                )}
              </>
            )}

            {/* end references */}

            {/* languages */}
            {resume_sections?.show_languages === 1 && (
              <>
                {languages?.length > 0 && (
                  <div className="pt-8  mb-4 text-[#fff]" id="data_languages">
                    <table className="mytable mb-2">
                      <tr>
                        <td className="relative">
                          <div className="w-8 h-8 rounded-md flex justify-center items-center text_black bg-[#fff]">
                            <LuLanguages size={16} className="text_black" />
                          </div>
                        </td>
                        <td className="uppercase text_white Arial  pl-2 font-semibold data-font-name data-font-size-main-heading default-font-size-main-heading">
                          languages
                        </td>
                      </tr>
                    </table>

                    {languages?.length > 0 ? (
                      languages?.map((language, idx) => (
                        <SectionLanguages
                          key={idx}
                          colorTitle={"text_white"}
                          colorBackground={"bg-slate-300 "}
                          colorForeground={"theme10_default_bg_2 theme_bg_2"}
                          variant={4}
                          data={language}
                        />
                      ))
                    ) : (
                      <SectionLanguages
                        colorTitle={"text_white"}
                        colorBackground={"bg-slate-300 "}
                        colorForeground={"theme10_default_bg_2 theme_bg_2"}
                        variant={4}
                        data={""}
                      />
                    )}
                  </div>
                )}
              </>
            )}

            {/* end languages */}
          </div>
        </div>
      </div>
      {/* <Branding /> */}
      {/* exit main */}
    </section>
  );
};

export default Header;
