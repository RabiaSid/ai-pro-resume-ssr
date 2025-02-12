import React, { useEffect, useState } from "react";
import axios from "axios";

const placeholderImageUser = "/images/reusme_placeholder_image.webp";
import SectionExperience from "./component_sections/Experience";
import SectionEducation from "./component_sections/Education";
import SectionAwards from "./component_sections/Awards";
import SectionCertificates from "./component_sections/Certificates";
import SectionReferences from "./component_sections/References";
import SectionLanguages from "./component_sections/Languages";
import SectionProfileInfo from "./component_sections/ProfileInfo";
import SectionSkills from "./component_sections/Skills";
import { IoMdGlobe } from "react-icons/io";
import {
  FaGraduationCap,
  FaUsers,
  FaAward,
  FaTrophy,
  FaUserTie,
  FaBriefcase,
  FaGlobe,
} from "react-icons/fa6";
import {
  BiGlobe,
  BiSolidMap,
  BiSolidEnvelope,
  BiSolidPhone,
  BiSolidUser,
} from "react-icons/bi";
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
    website,
    email_address,
    contact_number,
    city,
    state,
    country_id,
    street_address,
    job_title,
    postal_code,
    // summary
    summary,
    // experiences
    experiences,
    education,
    // technical Skiils
    technical_skills,
    technical_skills_feildName,
    // soft Skiils
    soft_skills,
    soft_skills_feildName,

    phone_number,
    //
    certificates,
    custom_sections,
    awards,
    languages,
    references,
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
      <div className="chk_height main flex min-h-[1308px]">
        <div className="flex w-full h-auto   ">
          <div style={{ flex: "4" }} className="h-auto bg-[rgb(238,238,242)] ">
            <div className="pt-[30px] h-full">
              <div
                className="flex flex-wrap justify-center items-center  py-2 w-full"
                id="data_personal_info"
              >
                <div className="text-center w-full">
                  <h1
                    style={{ textShadow: "0 0 1px #2e302e" }}
                    className="text-5xl Arial font-bold data-font-name default-font-size-super-heading data-font-size-super-heading"
                  >
                    {" "}
                    {first_name ? first_name : "Your Name"}{" "}
                    {last_name ? last_name : ""}
                  </h1>

                  <p className=" Arial mt-2 font-medium tracking-widest pb-2 data-font-size-main-heading default-font-size-heading">
                    {job_title ? job_title : ""}
                  </p>
                </div>
                {profile_image instanceof File ? (
                  <img
                    src={`${URL.createObjectURL(profile_image)}`}
                    width={220}
                    height={220}
                    className="rounded-full w-[60%]"
                    alt="profile"
                  />
                ) : profile_image ? (
                  <img
                    src={`${image_url + "/" + profile_image}`}
                    width={220}
                    height={220}
                    className="rounded-full w-[60%] border border-white shadow-md"
                    alt="profile"
                  />
                ) : (
                  <img
                    src={`${placeholderImageUser}`}
                    id="unused_image"
                    width={220}
                    height={220}
                    className="rounded-full w-[60%]"
                    alt="profile"
                  />
                )}
              </div>

              {/* personal_info */}
              <div className="mx-8 text-[#2e302e] mt-4 " id="data_contacts">
                <table className="w-full mb-2">
                  <tr>
                    <td className="w-[50px]">
                      <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full theme3_default_bg_1 theme_bg_1 text_white">
                        <BiSolidUser size={20} />
                      </div>
                    </td>
                    <td className="uppercase Arial font-bold data-font-name text_black data-font-size-main-heading default-font-size-main-heading">
                      Contact Me
                    </td>
                  </tr>
                </table>

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
                  colorText={"text_black"}
                  colorIcon={"text_black"}
                  colorIconBG={""} //for varient 2 apply background class
                  variant={1}
                />
              </div>

              {/* end personal_info */}
              {/* technical skills */}
              <div className="mt-4  mx-8  " id="data_technical_skills">
                <table className="w-full mb-2">
                  <tr>
                    <td className="w-[50px]">
                      <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full theme3_default_bg_1 theme_bg_1 text_white">
                        <FaGlobe size={20} />
                      </div>
                    </td>
                    <td className="uppercase Arial font-bold data-font-name text_black data-font-size-main-heading default-font-size-main-heading">
                      Technical Skills
                    </td>
                  </tr>
                </table>
                <div
                  className={`skill-tag text_black data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial`}
                >
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
                          colorText={"text_black"}
                          colorTags={"border-slate-400 border-b"}
                          variant={3}
                          data={skillsArray} // Pass skills as an array
                        />
                      );
                    })
                  ) : (
                    <SectionSkills
                      colorText={"text_black"}
                      colorTags={"border-slate-400 border-b"}
                      variant={3}
                      data={""} // Fallback as an empty array if no skills
                    />
                  )}
                </div>
              </div>
              {/* end technical skills */}
              {/* Soft skills */}
              {resume_sections?.show_soft_skills === 1 && (
                <div className="mt-4  mx-8 " id="data_soft_skills">
                  <table className="w-full mb-2">
                    <tr>
                      <td className="w-[50px]">
                        <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full theme3_default_bg_1 theme_bg_1 text_white">
                          <FaGlobe size={20} />
                        </div>
                      </td>
                      <td className="uppercase Arial font-bold data-font-name text_black data-font-size-main-heading default-font-size-main-heading">
                        Soft Skills
                      </td>
                    </tr>
                  </table>
                  <div
                    className={`skill-tag text_black data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial`}
                  >
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
                            colorText={"text_black"}
                            colorTags={"border-slate-400 border-b"}
                            variant={3}
                            data={skillsArray} // Pass skills as an array
                          />
                        );
                      })
                    ) : (
                      <SectionSkills
                        colorText={"text_black"}
                        colorTags={"border-slate-400 border-b"}
                        variant={3}
                        data={""} // Fallback as an empty array if no skills
                      />
                    )}
                  </div>
                </div>
              )}
              {/* end Soft skills */}
              {/* end certification */}
              {/* languages */}
              {resume_sections?.show_languages === 1 && (
                <>
                  {languages?.length > 0 && (
                    <div className="mt-4  mx-8 " id="data_languages">
                      <table className="w-full mb-2">
                        <tr>
                          <td className="w-[50px]">
                            <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full theme3_default_bg_1 theme_bg_1 text_white">
                              <IoMdGlobe size={20} />
                            </div>
                          </td>
                          <td className="uppercase Arial font-bold data-font-name text_black data-font-size-main-heading default-font-size-main-heading">
                            Languages
                          </td>
                        </tr>
                      </table>

                      <div className="flex flex-wrap justify-start items-center">
                        {languages?.length > 0 ? (
                          languages?.map((language, idx) => (
                            <SectionLanguages
                              key={idx}
                              colorTitle={"text_black"}
                              colorBackground={"bg-slate-300 "}
                              colorForeground={"theme3_default_bg_2 theme_bg_2"}
                              variant={3}
                              data={language}
                            />
                          ))
                        ) : (
                          <SectionLanguages
                            colorTitle={"text_black"}
                            colorBackground={"bg-slate-300 "}
                            colorForeground={"theme2_default_bg_2 theme_bg_2"}
                            variant={3}
                            data={""}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* end languages */}
              {custom_sections?.length > 0 &&
                (custom_sections?.length > 0
                  ? custom_sections
                    ?.filter((custom_section) => custom_section.is_show)
                    .map((custom_section, idx) => (
                      <div
                        key={idx}
                        className="mt-4 resume-section-content  mx-8 "
                        id="data_certifications"
                      >
                        <table className="w-full mb-2">
                          <tr>
                            <td className="w-[50px]">
                              <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full theme3_default_bg_1 theme_bg_1 text_white">
                                <FaAward size={20} />
                              </div>
                            </td>
                            <td className="uppercase Arial font-bold data-font-name text_black data-font-size-main-heading default-font-size-main-heading">
                              {custom_section.title}
                            </td>
                          </tr>
                        </table>

                        <div className="py-2 flex flex-wrap justify-start items-center resume-section-content">
                          <p className="text_black data-font-name data-font-size-desc-heading default-font-size-desc-heading mt-2 w-full editor_txt">
                            <p
                              dangerouslySetInnerHTML={{
                                __html: custom_section.detail,
                              }}
                            />
                          </p>
                        </div>
                      </div>
                    ))
                  : "")}

              {/* references */}
              {resume_sections?.show_references === 1 && (
                <>
                  {references?.length > 0 && (
                    <div className="mt-4  mx-8 " id="data_references">
                      <table className="w-full mb-2">
                        <tr>
                          <td className="w-[50px]">
                            <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full theme3_default_bg_1 theme_bg_1 text_white">
                              <FaUsers size={20} />
                            </div>
                          </td>
                          <td className="uppercase Arial font-bold data-font-name text_black data-font-size-main-heading default-font-size-main-heading">
                            References
                          </td>
                        </tr>
                      </table>

                      {references?.length > 0 ? (
                        references?.map((ref, idx) => (
                          <section key={idx} className="w-full">
                            <SectionReferences
                              colorTitle={"text_black"}
                              colorDesignation={"text_black"}
                              colorLocation={"text_black"}
                              colorContactInfo={"text_black"}
                              variant={1}
                              data={ref}
                            />
                          </section>
                        ))
                      ) : (
                        <section className="w-full">
                          <SectionReferences
                            colorTitle={"text_black"}
                            colorDesignation={"text_black"}
                            colorLocation={"text_black"}
                            colorContactInfo={"text_black"}
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
            </div>
          </div>

          <div
            style={{ flex: "6" }}
            className=" pt-[30px] flex flex-col min-h-[1308px]"
          >
            {/* summary */}
            {summary && (
              <div
                className="mx-8  flex flex-col items-start"
                id="data_summary"
              >
                <table className="w-full mb-2">
                  <tr>
                    <td className="w-[50px]">
                      <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full theme3_default_bg_1 theme_bg_1 text_white">
                        <FaUserTie size={20} />
                      </div>
                    </td>
                    <td className="uppercase Arial font-bold data-font-name text_black data-font-size-main-heading default-font-size-main-heading">
                      About Me
                    </td>
                  </tr>
                </table>
                <div
                  className="Arial whitespace-pre-line text-sm text-justify  leading-[1.3] data-font-name data-font-size-desc-heading default-font-size-desc-heading"
                  dangerouslySetInnerHTML={{
                    __html: summary
                      ? summary
                      : "What's the one thing which makes you the best candidate for this job?",
                  }}
                />
                {/* <p className="Arial whitespace-pre-line text-sm text-justify  leading-[1.3] data-font-name data-font-size-desc-heading default-font-size-desc-heading">
                  {summary ||
                    "What's the one thing which makes you the best candidate for this job?"}
                </p> */}
              </div>
            )}

            {/* end summary */}
            {/* experience */}
            {resume_sections?.show_experience === 1 && (
              <>
                <div className="mt-4  mx-8 " id="data_experience">
                  <table className="w-full mb-2">
                    <tr>
                      <td className="w-[50px]">
                        <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full theme3_default_bg_1 theme_bg_1 text_white">
                          <FaBriefcase size={20} />
                        </div>
                      </td>
                      <td className="uppercase Arial font-bold data-font-name text_black data-font-size-main-heading default-font-size-main-heading">
                        Experience
                      </td>
                    </tr>
                  </table>

                  {experiences?.length > 0 ? (
                    experiences?.map((exp, idx) => (
                      <section key={idx} className="mb-2 w-full">
                        <SectionExperience
                          countryId={country_id}
                          allCountries={allCountries}
                          colorPosition={"theme3_default_fg_2 theme_fg_2"}
                          colorDates={" tracking-wide"}
                          colorLocation={""}
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
                        colorPosition={"theme3_default_fg_2 theme_fg_2"}
                        colorDates={"text-[#777] italic tracking-wide"}
                        colorLocation={"theme3_default_fg_1 theme_fg_1"}
                        variant={1}
                        data={""}
                      />
                    </section>
                  )}
                </div>
              </>
            )}

            {/* end experience */}

            {/* educattion */}
            <div className="mt-4 mx-8 " id="data_educations">
              <table className="w-full mb-2">
                <tr>
                  <td className="w-[50px]">
                    <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full theme3_default_bg_1 theme_bg_1 text_white">
                      <FaGraduationCap size={20} />
                    </div>
                  </td>
                  <td className="uppercase Arial font-bold data-font-name text_black data-font-size-main-heading default-font-size-main-heading">
                    Education
                  </td>
                </tr>
              </table>

              {education?.length > 0 ? (
                education?.map((edu, idx) => (
                  <section key={idx} className="w-full">
                    <SectionEducation
                      countryId={country_id}
                      colorTitle={"theme3_default_fg_2 theme_fg_2"}
                      colorDates={" tracking-wide"}
                      colorLocation={"theme3_default_fg_1 theme_fg_1"}
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
                    colorTitle={"theme3_default_fg_2 theme_fg_2"}
                    colorDates={"tracking-wide"}
                    colorLocation={"theme3_default_fg_1 theme_fg_1"}
                    colorGradeType={"text_black"}
                    variant={1}
                    data={""}
                  />
                </section>
              )}
            </div>
            {/* end educattion*/}
            {/* awards */}
            {resume_sections?.show_awards === 1 && (
              <>
                {awards?.length > 0 && (
                  <div className="mt-4  mx-8" id="data_awards">
                    <table className="w-full mb-2">
                      <tr>
                        <td className="w-[50px]">
                          <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full theme3_default_bg_1 theme_bg_1 text_white">
                            <FaTrophy size={20} />
                          </div>
                        </td>
                        <td className="uppercase Arial font-bold data-font-name text_black data-font-size-main-heading default-font-size-main-heading">
                          Honors & Awards
                        </td>
                      </tr>
                    </table>

                    {awards?.length > 0 ? (
                      awards?.map((award, idx) => (
                        <section key={idx} className="w-full">
                          <SectionAwards
                            colorTitle={"theme3_default_fg_2 theme_fg_2"}
                            colorDates={" tracking-wide"}
                            colorLocation={""}
                            colorDesc={"text_black"}
                            variant={1}
                            data={award}
                          />
                        </section>
                      ))
                    ) : (
                      <section className="w-full">
                        <SectionAwards
                          colorTitle={"theme3_default_fg_2 theme_fg_2"}
                          colorDates={"tracking-wide"}
                          colorLocation={""}
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
                  <div className="mt-4  mx-8 " id="data_certifications">
                    <table className="w-full mb-2">
                      <tr>
                        <td className="w-[50px]">
                          <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full theme3_default_bg_1 theme_bg_1 text_white">
                            <FaAward size={20} />
                          </div>
                        </td>
                        <td className="uppercase Arial font-bold data-font-name text_black data-font-size-main-heading default-font-size-main-heading">
                          Certification
                        </td>
                      </tr>
                    </table>

                    {certificates?.length > 0 ? (
                      certificates?.map((certificate, idx) => (
                        <section className="w-full">
                          <SectionCertificates
                            colorTitle={"theme3_default_fg_2 theme_fg_2"}
                            colorDates={"text_black tracking-wide"}
                            colorLocation={"text_black"}
                            colorDesc={"text_black"}
                            variant={1}
                            data={certificate}
                          />
                        </section>
                      ))
                    ) : (
                      <section className="w-full">
                        <SectionCertificates
                          colorTitle={"theme3_default_fg_2 theme_fg_2"}
                          colorDates={"text_black tracking-wide"}
                          colorLocation={"text_black"}
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

            {/* custom section */}
            {/* <div
              className="mt-8 pt-8 mx-8 border-t-2 border-[#2e302e]"
              id="data_custom_section"
            >
              <div className="flex items-center justify-start">
                <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#2e302e] text_white data-shapes-main data-headings">
                  <FaFlag size={20} />
                </div>
                <h2
                  style={{ textShadow: "0 0 1px #2e302e" }}
                  className="uppercase text-[#2e302e] ml-2 text-xl font-bold Arial data-headings-main data-font-name data-font-size"
                >
                  Hobbies
                </h2>
              </div>
              <p className="Arial mt-4 text-sm w-full text-slate-600">
                READING BOOKS <br /> TRAVELING <br /> PLAYING CHESS
              </p>
            </div> */}
            {/* end custom section */}
            <div className="relative h-[60px] mt-auto mb-0">
              <Branding left="auto" right={8} />
            </div>
          </div>
        </div>
      </div>
      {/* exit main */}
    </section>
  );
};

export default Header;
