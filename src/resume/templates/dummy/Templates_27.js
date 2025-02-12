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
import {
  BiLogoLinkedin,
  BiSolidMap,
  BiSolidEnvelope,
  BiSolidPhone,
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

  console.log(education);

  return (
    <section
      id="my_template"
      className={`chk_height min-h-[1308px] font_1 w-full bg-white  relative mine_adjust ${activeFont} ${activeFontSize} ${!isChecked ? activeTheme : ""
        }`}
    >
      <div className="chk_height main flex min-h-[1308px]  h-auto">
        <div className="w-[30%] h-auto theme6_default_bg_1 theme_bg_1">
          <div className="  w-full" id="data_personal_info">
            {profile_image instanceof File ? (
              <img
                src={`${URL.createObjectURL(profile_image)}`}
                width={250}
                className="w-full "
                alt="profile"
              />
            ) : profile_image ? (
              <img
                src={`${image_url + "/" + profile_image}`}
                width={250}
                className=" w-full"
                alt="profile"
              />
            ) : (
              <img
                src={`${placeholderImageUser}`}
                id="unused_image"
                width={250}
                className=" w-full"
                alt="profile"
              />
            )}
          </div>

          {/* personal_info */}
          <div className="mt-6 mx-6" id="data_contacts">
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
              colorIconBG={"theme_bg_2 theme6_default_bg_2 "} //for varient 2 apply background class
              variant={2}
            />
          </div>
          {/* end personal_info */}

          {/* awards */}
          {resume_sections?.show_awards === 1 && (
            <>
              {awards?.length > 0 && (
                <div className="mt-6 mx-6" id="data_awards">
                  <div className="border-b-[1px] w-full border-white">
                    <h2 className=" w-full font-semibold uppercase tracking-wider  text_white Arial data-font-name data-font-size-main-heading default-font-size-main-heading ">
                      Honors & Awards
                    </h2>
                  </div>
                  {awards?.length > 0 ? (
                    awards?.map((award, idx) => (
                      <section key={idx} className="w-full mb-2">
                        <SectionAwards
                          colorTitle={"text_white"}
                          colorDates={" text_white tracking-wide italic"}
                          colorLocation={"text_white"}
                          colorDesc={"text_white"}
                          variant={2}
                          data={award}
                        />
                      </section>
                    ))
                  ) : (
                    <section className="w-full mb-2">
                      <SectionAwards
                        colorTitle={"text_white"}
                        colorDates={"text_white tracking-wide italic"}
                        colorLocation={"text_white"}
                        colorDesc={"text_white"}
                        variant={2}
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
                <div className="mt-6 mx-6" id="data_certifications">
                  <div className="border-b-[1px] w-full border-white">
                    <h2 className=" w-full font-semibold uppercase tracking-wider text_white Arial data-font-name data-font-size-main-heading default-font-size-main-heading ">
                      Certifications
                    </h2>
                  </div>
                  {certificates?.length > 0 ? (
                    certificates?.map((certificate, idx) => (
                      <section className="w-full mb-2">
                        <SectionCertificates
                          colorTitle={"text_white"}
                          colorDates={"text_white tracking-wide italic"}
                          colorLocation={"text_white"}
                          colorDesc={"text_white"}
                          variant={2}
                          data={certificate}
                        />
                      </section>
                    ))
                  ) : (
                    <section className="w-full mb-2">
                      <SectionCertificates
                        colorTitle={"text_white"}
                        colorDates={"text_white tracking-wide italic"}
                        colorLocation={"text_white"}
                        colorDesc={"text_white"}
                        variant={2}
                        data={""}
                      />
                    </section>
                  )}
                </div>
              )}
            </>
          )}

          {/* end certification */}

          {/* languages */}
          {resume_sections?.show_languages === 1 && (
            <>
              {languages?.length > 0 && (
                <div className="mt-6 mx-6 text-[#fff] " id="data_languages">
                  <div className="border-b-[1px] w-full border-white">
                    <h2 className=" w-full font-semibold tracking-wider uppercase pb-2 text_white Arial data-font-name data-font-size-main-heading default-font-size-main-heading ">
                      Languages
                    </h2>
                  </div>
                  {languages?.length > 0 ? (
                    languages?.map((language, idx) => (
                      <SectionLanguages
                        key={idx}
                        colorTitle={"text_white"}
                        colorBackground={"bg-slate-300"}
                        colorForeground={"theme6_default_bg_2 theme_bg_2"}
                        variant={1}
                        data={language}
                      />
                    ))
                  ) : (
                    <SectionLanguages
                      colorTitle={"text_white"}
                      colorBackground={"bg-slate-300"}
                      colorForeground={"theme6_default_bg_2 theme_bg_2"}
                      variant={1}
                      data={""}
                    />
                  )}
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
                    className="mt-6 mx-6 resume-section-content"
                    id="data_custom"
                  >
                    <div className="border-b-[1px] w-full border-white">
                      <h2 className=" w-full font-semibold tracking-wider uppercase pb-2 text_white Arial data-font-name data-font-size-main-heading default-font-size-main-heading ">
                        {custom_section.title}
                      </h2>
                    </div>
                    <p className="text_white data-font-name data-font-size-desc-heading default-font-size-desc-heading mt-2 w-full editor_txt">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: custom_section.detail,
                        }}
                      />
                    </p>
                  </div>
                ))
              : "")}
        </div>

        <div className="w-[70%] flex flex-col min-h-[1308px]">
          <div className="px-6 mt-6">
            <h1 className="text-[#111] tracking-wider font-bold Arial data-font-name default-font-size-super-heading data-font-size-super-heading">
              {first_name ? first_name : "Your Name"}{" "}
              {last_name ? last_name : ""}
            </h1>
            <p className="theme_fg_2 theme6_default_fg_2 data-font-name Arial data-font-size-main-heading default-font-size-heading ">
              {job_title ? job_title : ""}
            </p>
            {/* summary */}
            {summary ? (
              <div className="mt-6" id="data_summary">
                <div className="py-2 flex flex-wrap justify-start items-center">
                  <table className="w-full mb-2">
                    <tr>
                      <td className="whitespace-nowrap theme2_default_fg_2 theme_fg_2 font-semibold w-[100px]  py-[2px] uppercase tracking-[3px] Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                        Summary
                      </td>
                      <td>
                        <div className="h-[1px] bg-[#111]"></div>
                      </td>
                    </tr>
                  </table>
                  <div
                    className="Arial text-sm resume-section-content text_black whitespace-pre-line text-justify w-full data-font-name data-font-size-desc-heading default-font-size-desc-heading"
                    dangerouslySetInnerHTML={{
                      __html: summary
                        ? summary
                        : "What's the one thing which makes you the best candidate for this job?",
                    }}
                  />
                  {/* <p className="Arial text-sm resume-section-content text_black whitespace-pre-line text-justify w-full data-font-name data-font-size-desc-heading default-font-size-desc-heading">
                    {summary
                      ? summary
                      : "What's the one thing which makes you the best candidate for this job?"}
                  </p> */}
                </div>
              </div>
            ) : (
              ""
            )}
            {/* end summary */}
          </div>

          {/* experience */}
          {resume_sections?.show_experience === 1 && (
            <>
              <div className="mt-6 mx-6" id="data_experience">
                <table className="w-full mb-2">
                  <tr>
                    <td className="whitespace-nowrap theme2_default_fg_2 theme_fg_2 font-semibold w-[100px]  py-[2px] uppercase tracking-[3px] Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                      Experience
                    </td>
                    <td>
                      <div className="h-[1px] bg-[#111]"></div>
                    </td>
                  </tr>
                </table>

                {experiences?.length > 0 ? (
                  experiences?.map((exp, idx) => (
                    <section key={idx} className="mb-2  w-full">
                      <SectionExperience
                        countryId={country_id}
                        allCountries={allCountries}
                        colorPosition={"text-black"}
                        colorDates={"text-[gray] tracking-wide italic"}
                        colorLocation={"text-black"}
                        variant={1}
                        data={exp}
                      />
                    </section>
                  ))
                ) : (
                  <section className="mb-2  w-full">
                    <SectionExperience
                      countryId={country_id}
                      allCountries={allCountries}
                      colorPosition={"text-black"}
                      colorDates={"text-[gray] tracking-wide italic"}
                      colorLocation={"text-black"}
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
          <div className="mt-6 mx-6" id="data_educations">
            <table className="w-full mb-2">
              <tr>
                <td className="whitespace-nowrap theme2_default_fg_2 theme_fg_2 font-semibold w-[100px]  py-[2px] uppercase tracking-[3px] Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                  Education
                </td>
                <td>
                  <div className="h-[1px] bg-[#111]"></div>
                </td>
              </tr>
            </table>

            {education?.length > 0 ? (
              education?.map((edu, idx) => (
                <section key={idx} className="mb-2 w-full">
                  <SectionEducation
                    countryId={country_id}
                    colorTitle={"text-black"}
                    colorDates={"text-[gray] tracking-wide italic"}
                    colorLocation={"text-black"}
                    colorGradeType={"text_black"}
                    variant={1}
                    data={edu}
                  />
                </section>
              ))
            ) : (
              <section className="mb-2 w-full">
                <SectionEducation
                  countryId={country_id}
                  colorTitle={"text-black"}
                  colorDates={"text-[gray] tracking-wide italic"}
                  colorLocation={"text-black"}
                  colorGradeType={"text_black"}
                  variant={1}
                  data={""}
                />
              </section>
            )}
          </div>
          {/* end educattion*/}
          {/* technical skills */}

          <div className="mt-6 mx-6" id="data_technical_skills">
            <table className="w-full mb-2">
              <tr>
                <td className="whitespace-nowrap theme2_default_fg_2 theme_fg_2 font-semibold w-[100px]  py-[2px] uppercase tracking-[3px] Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                  Technical skills
                </td>
                <td>
                  <div className="h-[1px] bg-[#111]"></div>
                </td>
              </tr>
            </table>
            <div
              className={`skill-tag text_black py-1 mr-1 mt-1 data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial`}
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
                      colorTags={""}
                      variant={3}
                      data={skillsArray} // Pass skills as an array
                    />
                  );
                })
              ) : (
                <SectionSkills
                  colorText={"text_black"}
                  colorTags={""}
                  variant={3}
                  data={""} // Fallback as an empty array if no skills
                />
              )}
            </div>
          </div>

          {/* end technical skills */}

          {/* Soft skills */}
          {resume_sections?.show_soft_skills === 1 && (
            <div className="mt-6 mx-6" id="data_soft_skills">
              <table className="w-full mb-2">
                <tr>
                  <td className="whitespace-nowrap theme2_default_fg_2 theme_fg_2 font-semibold w-[100px]  py-[2px] uppercase tracking-[3px] Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                    Soft skills
                  </td>
                  <td>
                    <div className="h-[1px] bg-[#111]"></div>
                  </td>
                </tr>
              </table>
              <div
                className={`skill-tag text_black py-1 mr-1 mt-1 data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial`}
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
                        colorTags={""}
                        variant={3}
                        data={skillsArray} // Pass skills as an array
                      />
                    );
                  })
                ) : (
                  <SectionSkills
                    colorText={"text_black"}
                    colorTags={""}
                    variant={3}
                    data={""} // Fallback as an empty array if no skills
                  />
                )}
              </div>
            </div>
          )}
          {/* end Soft skills */}
          {/* references */}
          {resume_sections?.show_references === 1 && (
            <>
              {references?.length > 0 && (
                <div className="mt-6 mx-6" id="data_references">
                  <table className="w-full mb-2">
                    <tr>
                      <td className="whitespace-nowrap theme2_default_fg_2 theme_fg_2 font-semibold w-[100px]  py-[2px] uppercase tracking-[3px] Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                        References
                      </td>
                      <td>
                        <div className="h-[1px] bg-[#111]"></div>
                      </td>
                    </tr>
                  </table>

                  {references?.length > 0 ? (
                    references?.map((ref, idx) => (
                      <section key={idx} className="w-full mb-2">
                        <SectionReferences
                          colorTitle={"text-[#111]"}
                          colorDesignation={"[#111]"}
                          colorLocation={"text-[#111]"}
                          colorContactInfo={"text-[#111]"}
                          variant={1}
                          data={ref}
                        />
                      </section>
                    ))
                  ) : (
                    <section className="w-full mb-2">
                      <SectionReferences
                        colorTitle={"text-[#111]"}
                        colorDesignation={"[#111]"}
                        colorLocation={"text-[#111]"}
                        colorContactInfo={"text-[#111]"}
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
          <div className="relative h-[60px] mt-auto mb-0">
            <Branding left="auto" right={8} />
          </div>
        </div>
      </div>
      {/* exit main */}
      {/* <Branding left="auto" right={8} /> */}
    </section>
  );
};

export default Header;
