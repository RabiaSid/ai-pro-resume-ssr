import React, { useEffect, useState } from "react";
import axios from "axios";

import placeholderImageUser from "../../../assets/images/reusme_placeholder_image.webp";

import {
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
      className={`chk_height flex flex-col min-h-[1308px] font_1 w-full bg-white  relative mine_adjust ${activeFont} ${activeFontSize} ${!isChecked ? activeTheme : ""
        }`}
    >
      <div
        className="main flex flex-wrap justify-start items-start h-[100%]"
        id="data_contacts"
      >
        <div className="w-full h-[100%]">
          <div className="w-full flex justify-between items-start px-6">
            <header className="w-[80%] my-4" id="data_personal_info">
              <div className="w-full">
                <h1 className="theme4_default_fg_1 theme_fg_1 Arial data-font-name default-font-size-super-heading data-font-size-super-heading">
                  {first_name ? first_name : "Your Name"}{" "}
                  {last_name ? last_name : ""}
                </h1>
                <p className="theme4_default_fg_2 theme_fg_2 data-font-name Arial data-font-size-main-heading default-font-size-heading ">
                  {job_title ? job_title : ""}
                </p>
              </div>
              <div
                className="Arial text-sm resume-section-content text_black whitespace-pre-line mt-2 text-justify w-full data-font-name data-font-size-desc-heading default-font-size-desc-heading"
                dangerouslySetInnerHTML={{
                  __html: summary
                    ? summary
                    : "What's the one thing which makes you the best candidate for this job?",
                }}
              />
              {/* <p className="Arial text-sm resume-section-content text_black whitespace-pre-line mt-2 text-justify w-full data-font-name data-font-size-desc-heading default-font-size-desc-heading">
                {summary
                  ? summary
                  : "What's the one thing which makes you the best candidate for this job?"}
              </p> */}
            </header>

            <div className="flex justify-center mt-8">
              {profile_image instanceof File ? (
                <img
                  src={`${URL.createObjectURL(profile_image)}`}
                  width={120}
                  height={120}
                  className="rounded-md w-[120px] h-[120px]  "
                  alt="profile"
                />
              ) : profile_image ? (
                <img
                  src={`${image_url + "/" + profile_image}`}
                  width={120}
                  height={120}
                  className="rounded-md w-[120px] h-[120px]  "
                  alt="profile"
                />
              ) : (
                <img
                  src={`${placeholderImageUser}`}
                  id="unused_image"
                  width={120}
                  height={120}
                  className="rounded-md w-[120px] h-[120px]"
                  alt="profile"
                />
              )}
            </div>
          </div>

          {/* personal_info */}
          <div className="flex justify-between flex-wrap items-center py-2 px-8 resume-section-content theme_bg_1 theme4_default_bg_1 opacity-90">
            <div className="py-1 flex justify-start items-center  w-full">
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
                variant={3}
              />
            </div>
          </div>
          {/* end personal_info */}

          {/* experience */}
          {resume_sections?.show_experience === 1 && (
            <>
              <div className="pt-5 mx-8" id="data_experience">
                <h2 className=" w-full uppercase text-[#444] tracking-wide border-b  border-b-[rgb(233,230,230)] Arial data-font-name data-font-size-heading default-font-size-heading">
                  Work Experience
                </h2>
                {experiences?.length > 0 ? (
                  experiences?.map((exp, idx) => (
                    <section key={idx} className="mb-2 w-full">
                      <SectionExperience
                        countryId={country_id}
                        allCountries={allCountries}
                        colorPosition={"theme4_default_fg_2 theme_fg_2"}
                        colorDates={"text-[#777] italic tracking-wide"}
                        colorLocation={"theme4_default_fg_1 theme_fg_1"}
                        variant={3}
                        data={exp}
                      />
                    </section>
                  ))
                ) : (
                  <section className="mb-2 w-full">
                    <SectionExperience
                      countryId={country_id}
                      allCountries={allCountries}
                      colorPosition={"theme4_default_fg_2 theme_fg_2"}
                      colorDates={"text-[#777] italic tracking-wide"}
                      colorLocation={"theme4_default_fg_1 theme_fg_1"}
                      variant={3}
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
            <h2 className=" w-full uppercase text-[#444] tracking-wide border-b  border-b-[rgb(233,230,230)]   Arial data-font-name data-font-size-heading default-font-size-heading">
              Education
            </h2>

            {education?.length > 0 ? (
              education?.map((edu, idx) => (
                <section key={idx} className="w-full">
                  <SectionEducation
                    countryId={country_id}
                    colorTitle={"theme4_default_fg_2 theme_fg_2"}
                    colorDates={"text-[#777] italic tracking-wide"}
                    colorLocation={"theme4_default_fg_1 theme_fg_1"}
                    colorGradeType={"text_black"}
                    variant={3}
                    data={edu}
                  />
                </section>
              ))
            ) : (
              <section className="w-full">
                <SectionEducation
                  countryId={country_id}
                  colorTitle={"theme4_default_fg_2 theme_fg_2"}
                  colorDates={"text-[#777] italic tracking-wide"}
                  colorLocation={"theme4_default_fg_1 theme_fg_1"}
                  colorGradeType={"text_black"}
                  variant={3}
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
                  <h2 className=" w-full uppercase text-[#444] tracking-wide border-b  border-b-[rgb(233,230,230)]   Arial data-font-name data-font-size-heading default-font-size-heading">
                    Awards
                  </h2>
                  {awards?.length > 0 ? (
                    awards?.map((award, idx) => (
                      <section key={idx} className="w-full">
                        <SectionAwards
                          colorTitle={"theme4_default_fg_2 theme_fg_2"}
                          colorDates={"text-[#777] italic tracking-wide"}
                          colorLocation={"theme4_default_fg_1 theme_fg_1"}
                          colorDesc={"text_black"}
                          variant={3}
                          data={award}
                        />
                      </section>
                    ))
                  ) : (
                    <section className="w-full">
                      <SectionAwards
                        colorTitle={"theme4_default_fg_2 theme_fg_2"}
                        colorDates={"text-[#777] italic tracking-wide"}
                        colorLocation={"theme4_default_fg_1 theme_fg_1"}
                        colorDesc={"text_black"}
                        variant={3}
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
                  <h2 className=" w-full uppercase text-[#444] tracking-wide border-b  border-b-[rgb(233,230,230)]   Arial data-font-name data-font-size-heading default-font-size-heading">
                    Certificates
                  </h2>
                  {certificates?.length > 0 ? (
                    certificates?.map((certificate, idx) => (
                      <section className="w-full">
                        <SectionCertificates
                          colorTitle={"theme4_default_fg_2 theme_fg_2"}
                          colorDates={"text-[#777] italic tracking-wide"}
                          colorLocation={"theme4_default_fg_1 theme_fg_1"}
                          colorDesc={"text_black"}
                          variant={3}
                          data={certificate}
                        />
                      </section>
                    ))
                  ) : (
                    <section className="w-full">
                      <SectionCertificates
                        colorTitle={"theme4_default_fg_2 theme_fg_2"}
                        colorDates={"text-[#777] italic tracking-wide"}
                        colorLocation={"theme4_default_fg_1 theme_fg_1"}
                        colorDesc={"text_black"}
                        variant={3}
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

          <div className="pt-5 px-8 flex flex-wrap" id="data_skills">
            {/* Technical Skills */}
            <div className="w-full" id="data_technical_skills">
              <div className="flex justify-start items-center w-full relative">
                <h2 className="w-full uppercase text-[#444] tracking-wide border-b border-b-[rgb(233,230,230)]  Arial data-font-name data-font-size-heading default-font-size-heading">
                  Technical Skills
                </h2>
              </div>

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
                      variant={2}
                      data={skillsArray} // Pass skills as an array
                    />
                  );
                })
              ) : (
                <SectionSkills
                  colorText={"text_black"}
                  colorTags={"border-slate-400 border-b"}
                  variant={2}
                  data={""} // Fallback as an empty array if no skills
                />
              )}
            </div>

            {/* Soft Skills */}
            {resume_sections?.show_soft_skills === 1 && (
              <div className="w-full pt-5" id="data_soft_skills">
                <div className="flex justify-start items-center w-full relative">
                  <h2 className="w-full uppercase text-[#444] tracking-wide border-b border-b-[rgb(233,230,230)]  Arial data-font-name data-font-size-heading default-font-size-heading">
                    Soft Skills
                  </h2>
                </div>

                <div className="flex justify-start items-center flex-wrap">
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
                          variant={2}
                          data={skillsArray} // Pass skills as an array
                        />
                      );
                    })
                  ) : (
                    <SectionSkills
                      colorText={"text_black"}
                      colorTags={"border-slate-400 border-b"}
                      variant={2}
                      data={""} // Fallback as an empty array if no skills
                    />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* end soft skills */}

          {custom_sections?.length > 0 &&
            (custom_sections?.length > 0
              ? custom_sections
                ?.filter((custom_section) => custom_section.is_show)
                .map((custom_section, idx) => (
                  <div
                    key={idx}
                    className="pt-5 mx-8 text-[#000000] resume-section-content"
                    id="data_custom"
                  >
                    <h2 className=" w-full uppercase text-[#444] tracking-wide border-b  border-b-[rgb(233,230,230)]   Arial data-font-name data-font-size-heading default-font-size-heading">
                      {custom_section.title}
                    </h2>

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

          {/* custom section */}
          {/* <div className="px-8 rounded-xl" id="data_custom_section">
            <div className="flex justify-start items-center w-full relative">
              <h1 className="uppercase text-xl font-bold Lato text-[#291337] underline tracking-wider data-headings-primary data-font-name data-font-size">
                Abilities
              </h1>
            </div>
            <p className="Lato mt-4 text-justify text-xs leading-5 w-full text-[#515151]">
              Possesses strong leadership skills able to inspire ard motivate
              team members towards common goals.
            </p>
          </div> */}
          {/* end custom section */}

          {/* references */}
          {resume_sections?.show_references === 1 && (
            <>
              {references?.length > 0 && (
                <div className="pt-5 px-8" id="data_references">
                  <h2 className=" w-full uppercase text-[#444] tracking-wide border-b  border-b-[rgb(233,230,230)]   Arial data-font-name data-font-size-heading default-font-size-heading">
                    References
                  </h2>

                  {references?.length > 0 ? (
                    references?.map((ref, idx) => (
                      <section key={idx} className="w-full">
                        <SectionReferences
                          colorTitle={"theme4_default_fg_2 theme_fg_2"}
                          colorDesignation={"theme4_default_fg_2 theme_fg_2"}
                          colorLocation={"theme4_default_fg_1 theme_fg_1"}
                          colorContactInfo={"text_black"}
                          variant={1}
                          data={ref}
                        />
                      </section>
                    ))
                  ) : (
                    <section className="w-full">
                      <SectionReferences
                        colorTitle={"theme4_default_fg_2 theme_fg_2"}
                        colorDesignation={"theme4_default_fg_2 theme_fg_2"}
                        colorLocation={"theme4_default_fg_1 theme_fg_1"}
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
                <div className="pt-5 px-8 mb-4" id="data_languages">
                  <h2 className=" w-full uppercase text-[#444] tracking-wide border-b  border-b-[rgb(233,230,230)]   Arial data-font-name data-font-size-heading default-font-size-heading">
                    Languages
                  </h2>
                  <div className="w-[50%]">
                    {languages?.length > 0 ? (
                      languages?.map((language, idx) => (
                        <SectionLanguages
                          key={idx}
                          colorTitle={"text_black"}
                          colorBackground={"bg-slate-300"}
                          colorForeground={"theme4_default_bg_1 theme_bg_1"}
                          variant={5}
                          data={language}
                        />
                      ))
                    ) : (
                      <SectionLanguages
                        colorTitle={"text_black"}
                        colorBackground={"bg-slate-300"}
                        colorForeground={"theme4_default_bg_1 theme_bg_1"}
                        variant={5}
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
      <div className="relative h-[60px] mt-auto mb-0">
        <Branding left="auto" right={8} />
      </div>
      {/* exit main */}
    </section>
  );
};

export default Header;
