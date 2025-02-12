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
      className={`chk_height  min-h-[1308px] font_1 w-full bg-white  relative mine_adjust ${activeFont} ${activeFontSize} ${!isChecked ? activeTheme : ""
        }`}
    >
      <div className="chk_height main flex min-h-[1308px]  h-auto">
        <div className="w-[70%] flex flex-col min-h-[1308px] ">
          <div className="px-4 mt-6">
            <h1 className="theme_fg_2 theme13_default_fg_2 tracking-wider font-bold Arial data-font-name default-font-size-super-heading data-font-size-super-heading">
              {first_name ? first_name : "Your Name"}{" "}
              {last_name ? last_name : ""}
            </h1>
            <p className="text-[#111] data-font-name Arial data-font-size-main-heading default-font-size-heading ">
              {job_title ? job_title : ""}
            </p>
            {/* personal_info */}
            <div className="mt-1" id="data_contacts">
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
                colorText={"text-[#111]"}
                colorIcon={"text-[#111]"}
                colorIconBG={"bg-slate-100"} //for varient 2 apply background class
                variant={3}
              />
            </div>
            {/* end personal_info */}
          </div>

          {/* experience */}
          {resume_sections?.show_experience === 1 && (
            <>
              <div className="mt-6 mx-4" id="data_experience">
                <h2 className="theme13_default_fg_2 theme_fg_2 w-full font-semibold uppercase tracking-wider Arial data-font-name data-font-size-main-heading default-font-size-main-heading ">
                  Experience
                </h2>

                {experiences?.length > 0 ? (
                  experiences?.map((exp, idx) => (
                    <section key={idx} className="mb-2  w-full">
                      <SectionExperience
                        countryId={country_id}
                        allCountries={allCountries}
                        colorPosition={"text-[#111]"}
                        colorDates={""}
                        colorLocation={"text-[#111]"}
                        variant={3}
                        data={exp}
                      />
                    </section>
                  ))
                ) : (
                  <section className="mb-2  w-full">
                    <SectionExperience
                      countryId={country_id}
                      allCountries={allCountries}
                      colorPosition={"text-[#111]"}
                      colorDates={" "}
                      colorLocation={"text-[#111]"}
                      variant={3}
                      data={""}
                    />
                  </section>
                )}
              </div>
            </>
          )}

          {/* end experience */}

          {/* educattion */}
          <div className="mt-6 mx-4" id="data_educations">
            <h2 className="theme13_default_fg_2 theme_fg_2 w-full font-semibold uppercase tracking-wider Arial data-font-name data-font-size-main-heading default-font-size-main-heading ">
              Education
            </h2>

            {education?.length > 0 ? (
              education?.map((edu, idx) => (
                <section key={idx} className="w-full">
                  <SectionEducation
                    countryId={country_id}
                    colorTitle={"text-[#111]"}
                    colorDates={""}
                    colorLocation={"text-[#111]"}
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
                  colorTitle={"text-[#111]"}
                  colorDates={" "}
                  colorLocation={"text-[#111]"}
                  colorGradeType={"text_black"}
                  variant={3}
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
                <div className="mt-6 mx-4" id="data_awards">
                  <h2 className="theme13_default_fg_2 theme_fg_2 w-full font-semibold uppercase tracking-wider Arial data-font-name data-font-size-main-heading default-font-size-main-heading ">
                    Honors & Awards
                  </h2>

                  {awards?.length > 0 ? (
                    awards?.map((award, idx) => (
                      <section key={idx} className="w-full">
                        <SectionAwards
                          colorTitle={"text-[#111]"}
                          colorDates={" "}
                          colorLocation={"text-[#111]"}
                          colorDesc={"text_black"}
                          variant={3}
                          data={award}
                        />
                      </section>
                    ))
                  ) : (
                    <section className="w-full">
                      <SectionAwards
                        colorTitle={"text-[#111]"}
                        colorDates={" "}
                        colorLocation={"text-[#111]"}
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
                <div className="mt-6 mx-4" id="data_certifications">
                  <h2 className="theme13_default_fg_2 theme_fg_2 w-full font-semibold uppercase tracking-wider Arial data-font-name data-font-size-main-heading default-font-size-main-heading ">
                    Certifications
                  </h2>

                  {certificates?.length > 0 ? (
                    certificates?.map((certificate, idx) => (
                      <section className="w-full">
                        <SectionCertificates
                          colorTitle={"text-[#111]"}
                          colorDates={" "}
                          colorLocation={"text-[#111]"}
                          colorDesc={"text_black"}
                          variant={3}
                          data={certificate}
                        />
                      </section>
                    ))
                  ) : (
                    <section className="w-full">
                      <SectionCertificates
                        colorTitle={"text-[#111]"}
                        colorDates={""}
                        colorLocation={"text-[#111]"}
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

          {/* references */}
          {resume_sections?.show_references === 1 && (
            <>
              {references?.length > 0 && (
                <div className="mt-6 mx-4" id="data_references">
                  <h2 className="theme13_default_fg_2 theme_fg_2 w-full font-semibold uppercase tracking-wider Arial data-font-name data-font-size-main-heading default-font-size-main-heading ">
                    References
                  </h2>

                  {references?.length > 0 ? (
                    references?.map((ref, idx) => (
                      <section key={idx} className="w-full">
                        <SectionReferences
                          colorTitle={"text-[#111]"}
                          colorDesignation={"text-[#111]"}
                          colorLocation={"text-[#111]"}
                          colorContactInfo={"text-[#111]"}
                          variant={1}
                          data={ref}
                        />
                      </section>
                    ))
                  ) : (
                    <section className="w-full">
                      <SectionReferences
                        colorTitle={"text-[#111]"}
                        colorDesignation={"text-[#111]"}
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
            <Branding />
          </div>
        </div>

        <div className="w-[30%] h-auto theme13_default_bg_1 theme_bg_1">
          <div className=" w-full" id="data_personal_info">
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

          {/* summary */}
          {summary ? (
            <div className="mx-4 mt-6 " id="data_summary">
              <div className="py-2 ">
                <h2 className=" w-full font-semibold tracking-wider uppercase pb-2 text_white Arial data-font-name data-font-size-main-heading default-font-size-main-heading ">
                  Profile
                </h2>

                {/* <p className="Arial text-sm resume-section-content text_white whitespace-pre-line text-justify w-full data-font-name data-font-size-desc-heading default-font-size-desc-heading">
                  {summary
                    ? summary
                    : "What's the one thing which makes you the best candidate for this job?"}
                </p> */}
                <div
                  className="Arial text-sm resume-section-content text_white whitespace-pre-line text-justify w-full data-font-name data-font-size-desc-heading default-font-size-desc-heading"
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

          {/* technical skills */}

          <div className="mt-6 mx-4" id="data_technical_skills">
            <h2 className=" w-full font-semibold tracking-wider uppercase pb-2 text_white Arial data-font-name data-font-size-main-heading default-font-size-main-heading ">
              Technical Skills
            </h2>
            <div
              className={`skill-tag text_white py-1 mr-1 mt-1 data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial`}
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
                      colorText={"text_white"}
                      colorTags={""}
                      variant={3}
                      data={skillsArray} // Pass skills as an array
                    />
                  );
                })
              ) : (
                <SectionSkills
                  colorText={"text_white"}
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
            <div className="mt-6 mx-4" id="data_soft_skills">
              <h2 className=" w-full font-semibold tracking-wider uppercase pb-2 text_white Arial data-font-name data-font-size-main-heading default-font-size-main-heading ">
                Soft Skills
              </h2>
              <div
                className={`skill-tag text_white py-1 mr-1 mt-1 data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial`}
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
                        colorText={"text_white"}
                        colorTags={""}
                        variant={3}
                        data={skillsArray} // Pass skills as an array
                      />
                    );
                  })
                ) : (
                  <SectionSkills
                    colorText={"text_white"}
                    colorTags={""}
                    variant={3}
                    data={""} // Fallback as an empty array if no skills
                  />
                )}
              </div>
            </div>
          )}
          {/* end Soft skills */}

          {/* languages */}
          {resume_sections?.show_languages === 1 && (
            <>
              {languages?.length > 0 && (
                <div className="mt-6 mx-4 text-[#fff] " id="data_languages">
                  <h2 className=" w-full font-semibold tracking-wider uppercase pb-2 text_white Arial data-font-name data-font-size-main-heading default-font-size-main-heading ">
                    Languages
                  </h2>
                  {languages?.length > 0 ? (
                    languages?.map((language, idx) => (
                      <SectionLanguages
                        key={idx}
                        colorTitle={"text_white"}
                        colorBackground={"bg-slate-300"}
                        colorForeground={"theme13_default_bg_2 theme_bg_2"}
                        variant={1}
                        data={language}
                      />
                    ))
                  ) : (
                    <SectionLanguages
                      colorTitle={"text_white"}
                      colorBackground={"bg-slate-300"}
                      colorForeground={"theme13_default_bg_2 theme_bg_2"}
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
                    className="mt-6 mx-4 resume-section-content"
                    id="data_custom"
                  >
                    <h2 className=" w-full font-semibold tracking-wider uppercase pb-2 text_white Arial data-font-name data-font-size-main-heading default-font-size-main-heading ">
                      {custom_section.title}
                    </h2>

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
      </div>
      {/* exit main */}
      {/* <Branding /> */}
    </section>
  );
};

export default Header;
