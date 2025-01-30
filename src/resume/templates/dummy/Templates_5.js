import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { PiPencilLineLight } from "react-icons/pi";
import { GoBriefcase } from "react-icons/go";
import { HiBars2, HiOutlineAcademicCap } from "react-icons/hi2";
import { LuLanguages } from "react-icons/lu";
import {
  BiSolidUserDetail,
  BiGlobe,
  BiSolidMap,
  BiSolidEnvelope,
  BiSolidPhone,
} from "react-icons/bi";
import SectionExperience from "./component_sections/Experience";
import SectionEducation from "./component_sections/Education";
import SectionAwards from "./component_sections/Awards";
import SectionCertificates from "./component_sections/Certificates";
import SectionReferences from "./component_sections/References";
import SectionLanguages from "./component_sections/Languages";
import SectionProfileInfo from "./component_sections/ProfileInfo";
import SectionSkills from "./component_sections/Skills";
import { FaRegUser, FaAward, FaTrophy } from "react-icons/fa";
import Branding from "../../../components/Branding";

const Header = ({
  resumeData,
  activeTheme,
  activeFont,
  allCountries,
  activeFontSize,
  isChecked,
}) => {
  const {
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

  return (
    <section
      id="my_template"
      className={`chk_height flex flex-col min-h-[1308px] font_1 w-full bg-white  relative mine_adjust ${activeFont} ${activeFontSize} ${
        !isChecked ? activeTheme : ""
      }`}
    >
      <div
        className="chk_height main flex flex-col h-[100%] min-h-[1308px]"
        id="data_contacts"
      >
        <div className="flex justify-between items-center w-full">
          <div className="w-full px-6 py-4">
            <div className="py-1  flex flex-wrap justify-start items-start">
              {/* <img src={temp} width={140} height={140} className='rounded-full w-[140px] h-[140px] ' /> */}
              <h1 className="text-[#111] tracking-wide py-1 w-full font-semibold data-font-name Arial default-font-size-super-heading data-font-size-super-heading">
                {first_name ? first_name : "Your Name"}{" "}
                {last_name ? last_name : ""}
              </h1>
              <p
                className="text-[#344EAC]  text-lg 
              theme5_default_fg_1 theme_fg_1 data-font-name Arial data-font-size-main-heading default-font-size-main-heading "
              >
                {job_title ? job_title : ""}
              </p>
            </div>
            {/* personal_info */}
            <div className="my-2">
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
                colorIcon={"theme_fg_1 theme5_default_fg_1"}
                colorIconBG={"bg-slate-200"} //for varient 2 apply background class
                variant={1}
              />
            </div>
            {/* end personal_info */}
          </div>
        </div>

        <div className="w-full">
          {/* summary */}
          {summary ? (
            <div className="mx-6" id="data_summary">
              <div className="flex flex-wrap justify-start items-center">
                <table className="w-full border-y border-y-solid border-y-[#878585]">
                  <tr>
                    <td className="w-[50px] py-2">
                      <FaRegUser
                        size={24}
                        className="theme_fg_1 theme5_default_fg_1"
                      />
                    </td>
                    <td
                      className="uppercase text-sm  text-[#323433]  pl-2 
                 w-full  font-semibold tracking-wider Arial data-font-name data-font-size-main-heading default-font-size-heading"
                    >
                      About Me
                    </td>
                  </tr>
                </table>

                {/* <p className="Arial pt-4 whitespace-pre-line pb-4 text_black text-justify data-font-name data-font-size-main-desc-heading default-font-size-desc-heading">
                  {summary
                    ? summary
                    : "What's the one thing which makes you the best candidate for this job?"}
                </p> */}
                <div
                  className="Arial pt-4 whitespace-pre-line pb-4 text_black text-justify data-font-name data-font-size-main-desc-heading default-font-size-desc-heading"
                  dangerouslySetInnerHTML={{
                    __html: summary
                      ? summary
                      : "What's the one thing which makes you the best candidate for this job?",
                  }}
                />
              </div>
            </div>
          ) : (
            ""
          )}
          {/* end summary */}
        </div>

        <div className="flex flex-1">
          <div className="w-[50%]  h-[100%]">
            {/* experience */}
            {resume_sections?.show_experience === 1 && (
              <>
                <div className="mx-6" id="data_experience">
                  <table className="w-full border-y border-y-solid border-y-[#878585]">
                    <tr>
                      <td className="w-[50px] py-2">
                        <GoBriefcase
                          size={24}
                          className="theme_fg_1 theme5_default_fg_1"
                        />
                      </td>
                      <td
                        className="uppercase text-sm  text-[#323433]  pl-2 
                 w-full  font-semibold tracking-wider Arial data-font-name data-font-size-main-heading default-font-size-heading"
                      >
                        Work Experience
                      </td>
                    </tr>
                  </table>

                  {experiences?.length > 0 ? (
                    experiences?.map((exp, idx) => (
                      <section key={idx} className="mt-2 mb-2 w-full">
                        <SectionExperience
                          countryId={country_id}
                          allCountries={allCountries}
                          colorPosition={"text_black"}
                          colorDates={"text_black"}
                          colorLocation={"text_black"}
                          variant={4}
                          data={exp}
                        />
                      </section>
                    ))
                  ) : (
                    <section className="mt-2 mb-2 w-full">
                      <SectionExperience
                        countryId={country_id}
                        allCountries={allCountries}
                        colorPosition={"text_black"}
                        colorDates={"text_black"}
                        colorLocation={"text_black"}
                        variant={4}
                        data={""}
                      />
                    </section>
                  )}
                </div>
              </>
            )}

            {/* end experience */}

            {/* education */}
            <div className=" mx-6" id="data_educations">
              <table className="w-full border-y border-y-solid border-y-[#878585]">
                <tr>
                  <td className="w-[50px] py-2">
                    <HiOutlineAcademicCap
                      size={24}
                      className="theme_fg_1 theme5_default_fg_1"
                    />
                  </td>
                  <td
                    className="uppercase text-sm  text-[#323433]  pl-2 
                 w-full  font-semibold tracking-wider Arial data-font-name data-font-size-main-heading default-font-size-heading"
                  >
                    Education
                  </td>
                </tr>
              </table>

              {education?.length > 0 ? (
                education?.map((edu, idx) => (
                  <section key={idx} className="mt-2 mb-2 w-full">
                    <SectionEducation
                      countryId={country_id}
                      colorTitle={"text_black"}
                      colorDates={"text_black"}
                      colorLocation={"text_black"}
                      colorGradeType={"text_black"}
                      variant={4}
                      data={edu}
                    />
                  </section>
                ))
              ) : (
                <section className="mt-2 mb-2 w-full">
                  <SectionEducation
                    countryId={country_id}
                    colorTitle={"text_black"}
                    colorDates={"text_black"}
                    colorLocation={"text_black"}
                    colorGradeType={"text_black"}
                    variant={4}
                    data={""}
                  />
                </section>
              )}
            </div>
            {/* end education */}

            {custom_sections?.length > 0 &&
              (custom_sections?.length > 0
                ? custom_sections
                    ?.filter((custom_section) => custom_section.is_show)
                    .map((custom_section, idx) => (
                      <div className=" mx-6 text-[#878585]" id="data_custom">
                        <table className="w-full border-y border-y-solid border-y-[#878585]">
                          <tr>
                            <td className="w-[50px] py-2">
                              <FaAward
                                size={24}
                                className="theme_fg_1 theme5_default_fg_1"
                              />
                            </td>
                            <td
                              className="uppercase text-sm  text-[#323433]  pl-2 
                 w-full  font-semibold tracking-wider Arial data-font-name data-font-size-main-heading default-font-size-heading"
                            >
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
          </div>

          <div className="w-[50%]">
            {/* awards */}
            {resume_sections?.show_awards === 1 && (
              <>
                {awards?.length > 0 && (
                  <div className=" mx-6 text-[#878585]" id="data_awards">
                    <table className="w-full border-y border-y-solid border-y-[#878585]">
                      <tr>
                        <td className="w-[50px] py-2">
                          <FaTrophy
                            size={24}
                            className="theme_fg_1 theme5_default_fg_1"
                          />
                        </td>
                        <td
                          className="uppercase text-sm  text-[#323433]  pl-2 
                 w-full  font-semibold tracking-wider Arial data-font-name data-font-size-main-heading default-font-size-heading"
                        >
                          Awards
                        </td>
                      </tr>
                    </table>

                    {awards?.length > 0 ? (
                      awards?.map((award, idx) => (
                        <section key={idx} className="mt-2 mb-2 w-full">
                          <SectionAwards
                            colorTitle={"text_black"}
                            colorDates={"text_black"}
                            colorLocation={"text_black"}
                            colorDesc={"text_black"}
                            variant={4}
                            data={award}
                          />
                        </section>
                      ))
                    ) : (
                      <section className="mt-2 mb-2 w-full">
                        <SectionAwards
                          colorTitle={"text_black"}
                          colorDates={"text_black"}
                          colorLocation={"text_black"}
                          colorDesc={"text_black"}
                          variant={4}
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
                    className=" mx-6 text-[#878585]"
                    id="data_certifications"
                  >
                    <table className="w-full border-y border-y-solid border-y-[#878585]">
                      <tr>
                        <td className="w-[50px] py-2">
                          <FaAward
                            size={24}
                            className="theme_fg_1 theme5_default_fg_1"
                          />
                        </td>
                        <td
                          className="uppercase text-sm  text-[#323433]  pl-2 
                 w-full  font-semibold tracking-wider Arial data-font-name data-font-size-main-heading default-font-size-heading"
                        >
                          Certification
                        </td>
                      </tr>
                    </table>

                    {certificates?.length > 0 ? (
                      certificates?.map((certificate, idx) => (
                        <section className="mt-2 mb-2 w-full">
                          <SectionCertificates
                            colorTitle={"text_black"}
                            colorDates={"text_black"}
                            colorLocation={"text_black"}
                            colorDesc={"text_black"}
                            variant={4}
                            data={certificate}
                          />
                        </section>
                      ))
                    ) : (
                      <section className="mt-2 mb-2  w-full">
                        <SectionCertificates
                          colorTitle={"text_black"}
                          colorDates={"text_black"}
                          colorLocation={"text_black"}
                          colorDesc={"text_black"}
                          variant={4}
                          data={""}
                        />
                      </section>
                    )}
                  </div>
                )}
              </>
            )}

            {/* end certification */}
            {/* technical skills */}

            <div className="mx-6 text-[#878585]" id="data_technical_skills">
              <table className="w-full border-y border-y-solid border-y-[#878585]">
                <tr>
                  <td className="w-[50px] py-2">
                    <PiPencilLineLight
                      size={24}
                      className="theme_fg_1 theme5_default_fg_1"
                    />
                  </td>
                  <td
                    className="uppercase text-sm  text-[#323433]  pl-2 
                 w-full  font-semibold tracking-wider Arial data-font-name data-font-size-main-heading default-font-size-heading"
                  >
                    Technical Skills
                  </td>
                </tr>
              </table>

              <div
                className={`skill-tag text-[#323433] mt-2 data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial`}
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
                        colorText={"text-[#323433]"}
                        colorTags={""}
                        variant={3}
                        data={skillsArray} // Pass skills as an array
                      />
                    );
                  })
                ) : (
                  <SectionSkills
                    colorText={"text-[#323433]"}
                    colorTags={""}
                    variant={3}
                    data={""} // Fallback as an empty array if no skills
                  />
                )}
              </div>
            </div>

            {/* end technical skills */}

            {/* soft skills */}
            {resume_sections?.show_soft_skills === 1 && (
              <div className="pt-4 mx-6 text-[#878585]" id="data_soft_skills">
                <table className="w-full border-y border-y-solid border-y-[#878585]">
                  <tr>
                    <td className="w-[50px] py-2">
                      <PiPencilLineLight
                        size={24}
                        className="theme_fg_1 theme5_default_fg_1"
                      />
                    </td>
                    <td
                      className="uppercase text-sm  text-[#323433]  pl-2 
                 w-full  font-semibold tracking-wider Arial data-font-name data-font-size-main-heading default-font-size-heading"
                    >
                      Soft Skills
                    </td>
                  </tr>
                </table>
                <div
                  className={`skill-tag text-[#323433] mt-2 data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial`}
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
                          colorText={"text-[#323433]"}
                          colorTags={""}
                          variant={3}
                          data={skillsArray} // Pass skills as an array
                        />
                      );
                    })
                  ) : (
                    <SectionSkills
                      colorText={"text-[#323433]"}
                      colorTags={""}
                      variant={3}
                      data={""} // Fallback as an empty array if no skills
                    />
                  )}
                </div>
              </div>
            )}
            {/* end soft skills */}

            {/* custom section */}
            {/* <div className=" mx-6 pt-8" id="data_custom_section">
            <div className="flex justify-start items-center w-full py-1 border-y border-y-solid border-y-[#878585]">
              <BiDetail
                size={14}
                className="text-[#344EAC] data-headings-main"
              />

              <h1 className="uppercase text-md font-bold Poppins text-[#323433] data-headings-shape pl-2 tracking-wider data-font-name data-font-size">
                Hobbies And Activities
              </h1>
            </div>
            <div className="flex justify-start items-start flex-wrap mt-2">
              <p className="Poppins mt-4 text-justify text-sm leading-6 w-[50%] text-[#878585]">
                - Bicyle Riding
              </p>
              <p className="Poppins mt-4 text-justify text-sm leading-6 w-[50%] text-[#878585]">
                - Football
              </p>
              <p className="Poppins mt-4 text-justify text-sm leading-6 w-[50%] text-[#878585]">
                - Photography
              </p>
              <p className="Poppins mt-4 text-justify text-sm leading-6 w-[50%] text-[#878585]">
                - Traveling
              </p>
              <p className="Poppins mt-4 text-justify text-sm leading-6 w-[50%] text-[#878585]">
                - Signing
              </p>
              <p className="Poppins mt-4 text-justify text-sm leading-6 w-[50%] text-[#878585]">
                - Coding
              </p>
            </div>
          </div> */}
            {/* end custom section */}

            {/* references */}
            {resume_sections?.show_references === 1 && (
              <>
                {references?.length > 0 && (
                  <div className="pt-4 mx-6" id="data_references">
                    <table className="w-full border-y border-y-solid border-y-[#878585]">
                      <tr>
                        <td className="w-[50px] py-2">
                          <BiSolidUserDetail
                            size={24}
                            className="theme_fg_1 theme5_default_fg_1"
                          />
                        </td>
                        <td
                          className="uppercase text-sm  text-[#323433]  pl-2 
                 w-full  font-semibold tracking-wider Arial data-font-name data-font-size-main-heading default-font-size-heading"
                        >
                          References
                        </td>
                      </tr>
                    </table>

                    {references?.length > 0 ? (
                      references?.map((ref, idx) => (
                        <section key={idx} className="mt-4 w-full">
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
                      <section className="mt-4 w-full">
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

            {/* languages */}
            {resume_sections?.show_languages === 1 && (
              <>
                {languages?.length > 0 && (
                  <div
                    className="pt-4 mx-6  text-[#878585]"
                    id="data_languages"
                  >
                    <table className="w-full border-y border-y-solid border-y-[#878585]">
                      <tr>
                        <td className="w-[50px] py-2">
                          <LuLanguages
                            size={24}
                            className="theme_fg_1 theme5_default_fg_1"
                          />
                        </td>
                        <td
                          className="uppercase text-sm  text-[#323433]  pl-2 
                 w-full  font-semibold tracking-wider Arial data-font-name data-font-size-main-heading default-font-size-heading"
                        >
                          Languages
                        </td>
                      </tr>
                    </table>

                    <div className=" flex flex-wrap justify-start items-center text-[#fff] ">
                      {languages?.length > 0 ? (
                        languages?.map((language, idx) => (
                          <SectionLanguages
                            key={idx}
                            colorTitle={"text_black"}
                            colorBackground={"bg-slate-300"}
                            colorForeground={"theme5_default_bg_1 theme_bg_1"}
                            variant={3}
                            data={language}
                          />
                        ))
                      ) : (
                        <SectionLanguages
                          colorTitle={"text_black"}
                          colorBackground={"bg-slate-300"}
                          colorForeground={"theme5_default_bg_1 theme_bg_1"}
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
          </div>
        </div>
      </div>
      {/* exit main */}

      <div className="relative h-[60px] mt-auto mb-0">
        <Branding left="auto" right={8} />
      </div>
    </section>
  );
};

export default Header;
