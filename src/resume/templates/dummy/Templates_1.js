import axios from "axios";
import React, { useEffect, useState } from "react";

import placeholderImageUser from "../../../assets/images/reusme_placeholder_image.webp";
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
  allCountries,
  activeFontSize,
  isChecked, // Default to false if undefined,
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
    street_address,
    city,
    postal_code,
    state,
    country_id,
    job_title,
    grade,
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
    <>
      <div
        id="my_template"
        className={`chk_height min-h-[1308px] font_1 w-full bg-white  relative mine_adjust ${activeFont} ${activeFontSize} ${!isChecked ? activeTheme : ""
          }`}
      >
        {/* <div className="main flex flex-wrap justify-start items-start h-[100%]"> */}

        <section className="flex  w-full min-h-[1308px]">
          <div className="flex flex-col flex-1 w-[67%] min-h-[1308px]">
            <header className="w-full my-2" id="data_personal_info">
              <div className="px-6 py-4 w-full">
                <h1 className="text-[#333] font-bold Arial data-font-name default-font-size-super-heading data-font-size-super-heading">
                  {first_name ? first_name : "Your Name"}{" "}
                  {last_name ? last_name : ""}
                </h1>
                <p className="theme1_default_fg_2 theme_fg_2 data-font-name Arial data-font-size-main-heading default-font-size-main-heading ">
                  {job_title ? job_title : ""}
                </p>
              </div>
            </header>
            {/* summary */}
            {summary ? (
              <section className="mx-6" id="data_summary">
                <h2 className="py-0.5 w-full  border-b border-[rgb(190,190,190)]  theme1_default_fg_2  Arial theme_fg_2 data-font-name data-font-size-heading default-font-size-heading">
                  Summary
                </h2>
                <div
                  className="Arial text-sm resume-section-content text-black whitespace-pre-line mt-4 text-justify w-full data-font-name data-font-size-desc-heading default-font-size-desc-heading"
                  dangerouslySetInnerHTML={{
                    __html: summary
                      ? summary
                      : "What's the one thing which makes you the best candidate for this job?",
                  }}
                />
                {/* <p className="Arial text-sm resume-section-content text-black whitespace-pre-line mt-4 text-justify w-full data-font-name data-font-size-desc-heading default-font-size-desc-heading">
                  {summary
                    ? summary
                    : "What's the one thing which makes you the best candidate for this job?"}
                </p> */}
              </section>
            ) : (
              ""
            )}
            {/* end summary */}
            {/* experience */}
            {resume_sections?.show_experience === 1 && (
              <section className="mt-4 mx-6" id="data_experience">
                <h2 className="py-0.5 w-full theme1_default_fg_2 border-b border-[rgb(190,190,190)]   Arial theme_fg_2 data-font-name data-font-size-heading default-font-size-heading">
                  Experience
                </h2>
                {experiences?.length > 0 ? (
                  experiences?.map((exp, idx) => (
                    <section key={idx} className="mt-4 w-full">
                      <SectionExperience
                        countryId={country_id}
                        allCountries={allCountries}
                        colorPosition={"text-black"}
                        colorDates={"text-black"}
                        colorLocation={"text-black"}
                        variant={1}
                        data={exp}
                      />
                    </section>
                  ))
                ) : (
                  <section className="mt-4 w-full">
                    <SectionExperience
                      countryId={country_id}
                      allCountries={allCountries}
                      colorPosition={"text-black"}
                      colorDates={"text-black"}
                      colorLocation={"text-black"}
                      variant={1}
                      data={""}
                    />
                  </section>
                )}
              </section>
            )}

            {/* end experience */}
            {/* educattion */}
            <section className="mx-6 mt-4" id="data_educations">
              <h2 className="py-0.5 w-full theme1_default_fg_2 border-b border-[rgb(190,190,190)]    Arial theme_fg_2 data-font-name data-font-size-heading default-font-size-heading">
                Education
              </h2>

              {education?.length > 0 ? (
                education?.map((edu, idx) => (
                  <section key={idx} className="mt-4 w-full">
                    <SectionEducation
                      countryId={country_id}
                      colorTitle={"text-black"}
                      colorDates={"text-black"}
                      colorLocation={"text-black"}
                      colorGradeType={"text-black"}
                      variant={1}
                      data={edu}
                    />
                  </section>
                ))
              ) : (
                <section className="mt-4 w-full">
                  <SectionEducation
                    countryId={country_id}
                    colorTitle={"text-black"}
                    colorDates={"text-black"}
                    colorLocation={"text-black"}
                    colorGradeType={"text-black"}
                    variant={1}
                    data={""}
                  />
                </section>
              )}
            </section>
            {/* end educattion*/}
            {/* awards */}
            {resume_sections?.show_awards === 1 && (
              <>
                {awards?.length > 0 && (
                  <section className="mt-4 mx-6" id="data_awards">
                    <h2 className="py-0.5 w-full theme1_default_fg_2 border-b border-[rgb(190,190,190)]    Arial theme_fg_2 data-font-name data-font-size-heading default-font-size-heading">
                      Key Achievements & Awards
                    </h2>
                    {awards?.length > 0 ? (
                      awards?.map((award, idx) => (
                        <section key={idx} className="mt-4 w-full">
                          <SectionAwards
                            colorTitle={"text-black"}
                            colorDates={"text-black"}
                            colorLocation={"text-black"}
                            colorDesc={"text-black"}
                            variant={1}
                            data={award}
                          />
                        </section>
                      ))
                    ) : (
                      <section className="mt-4 w-full">
                        <SectionAwards
                          colorTitle={"text-black"}
                          colorDates={"text-black"}
                          colorLocation={"text-black"}
                          colorDesc={"text-black"}
                          variant={1}
                          data={""}
                        />
                      </section>
                    )}
                  </section>
                )}
              </>
            )}

            {/* end awards */}
            {/* certification */}
            {resume_sections?.show_certificates === 1 && (
              <>
                {certificates?.length > 0 && (
                  <section className="mx-6 mt-4" id="data_certifications">
                    <h2 className="py-0.5 w-full theme1_default_fg_2 border-b border-[rgb(190,190,190)]    Arial theme_fg_2 data-font-name data-font-size-heading default-font-size-heading">
                      Certificates
                    </h2>
                    {certificates?.length > 0 ? (
                      certificates?.map((certificate, idx) => (
                        <section className="mt-4 w-full">
                          <SectionCertificates
                            colorTitle={"text-black"}
                            colorDates={"text-black"}
                            colorLocation={"text-black"}
                            colorDesc={"text-black"}
                            variant={1}
                            data={certificate}
                          />
                        </section>
                      ))
                    ) : (
                      <section className="mt-4 w-full">
                        <SectionCertificates
                          colorTitle={"text-black"}
                          colorDates={"text-black"}
                          colorLocation={"text-black"}
                          colorDesc={"text-black"}
                          variant={1}
                          data={""}
                        />
                      </section>
                    )}
                  </section>
                )}
              </>
            )}

            {/* {custom_sections?.length > 0 &&
              (custom_sections?.length > 0
                ? custom_sections
                    ?.filter((custom_section) => custom_section.is_show)
                    .map((custom_section, idx) => (
                      <section
                        key={idx}
                        className="resume-section-content mb-10"
                        id="data_custom"
                      >
                        <h2 className=" w-full  border-b border-[rgb(190,190,190)] py-0.5 px-6  Arial theme_fg_2 data-font-name data-font-size-heading">
                          {custom_section.title}
                        </h2>
                        <p className="data-font-name data-font-size-desc-heading px-6 mt-6 w-full editor_txt">
                          <p
                            dangerouslySetInnerHTML={{
                              __html: custom_section.detail,
                            }}
                          />
                        </p>
                      </section>
                    ))
                : "")} */}

            {/* references */}
            {resume_sections?.show_references === 1 && (
              <>
                {references?.length > 0 && (
                  <section className="mt-4 mx-6" id="data_references">
                    <h2 className="py-0.5 w-full theme1_default_fg_2 border-b border-[rgb(190,190,190)]    Arial theme_fg_2 data-font-name data-font-size-heading default-font-size-heading">
                      References
                    </h2>
                    {references?.length > 0 ? (
                      references?.map((ref, idx) => (
                        <section key={idx} className="mt-4 w-full">
                          <SectionReferences
                            colorTitle={"text-black"}
                            colorDesignation={"text-black"}
                            colorLocation={"text-black"}
                            colorContactInfo={"text-black"}
                            variant={1}
                            data={ref}
                          />
                        </section>
                      ))
                    ) : (
                      <section className="mt-4 w-full">
                        <SectionReferences
                          colorTitle={"text-black"}
                          colorDesignation={"text-black"}
                          colorLocation={"text-black"}
                          colorContactInfo={"text-black"}
                          variant={1}
                          data={""}
                        />
                      </section>
                    )}
                  </section>
                )}
              </>
            )}

            {/* end references */}
            <div className="relative h-[60px] mt-auto mb-0">
              <Branding left="18px" />
            </div>
          </div>

          <section className="theme1_default_bg_1 theme_bg_1 chk_height min-h-[1308px] w-[33%] ">
            <div className="mt-4">
              <div className="flex justify-center">
                {profile_image instanceof File ? (
                  <img
                    src={`${URL.createObjectURL(profile_image)}`}
                    width={230}
                    height={230}
                    className="rounded-full w-[50%]  my-4"
                    alt="profile"
                  />
                ) : profile_image ? (
                  <img
                    src={`${image_url + "/" + profile_image}`}
                    width={150}
                    height={150}
                    className="rounded-full w-[50%]  my-4"
                    alt="profile"
                  />
                ) : (
                  <img
                    src={`${placeholderImageUser}`}
                    id="unused_image"
                    width={150}
                    height={150}
                    className="rounded-full w-[50%] my-4"
                    alt="profile"
                  />
                )}
              </div>

              {/* personal_info */}
              <div className="mx-6 mt-2" id="data_contacts">
                <h2 className="py-0.5 w-full Arial text_white border-b border-white data-font-name data-font-size-heading default-font-size-heading mb-2">
                  Contact Me
                </h2>

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
                  colorIconBG={"bg-slate-200"} //for varient 2 apply background class
                  variant={1}
                />
              </div>
              {/* end personal_info */}

              {/* technical skills */}

              <section className="w-full mt-6 px-6" id="data_technical_skills">
                <h2 className="py-0.5 w-full Arial text_white border-b border-white data-font-name data-font-size-heading default-font-size-heading mb-2">
                  Technical Skills
                </h2>
                <div
                  className={`skill-tag text_white data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial`}
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
                          colorTags={"border-white"}
                          variant={3}
                          data={skillsArray} // Pass skills as an array
                        />
                      );
                    })
                  ) : (
                    <SectionSkills
                      colorText={"text_white"}
                      colorTags={"border-white"}
                      variant={3}
                      data={""} // Fallback as an empty array if no skills
                    />
                  )}
                </div>
              </section>

              {/* end technical skills */}

              {/* Soft skills */}
              {resume_sections?.show_soft_skills === 1 && (
                <section className="w-full mt-6 px-6" id="data_soft_skills">
                  <h2 className="py-0.5 w-full Arial text_white border-b border-white data-font-name data-font-size-heading default-font-size-heading mb-2">
                    Soft Skills
                  </h2>
                  <div
                    className={`skill-tag text_white data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial`}
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
                            colorTags={"border-white"}
                            variant={3}
                            data={skillsArray} // Pass skills as an array
                          />
                        );
                      })
                    ) : (
                      <SectionSkills
                        colorText={"text_white"}
                        colorTags={"border-white"}
                        variant={3}
                        data={""} // Fallback as an empty array if no skills
                      />
                    )}
                  </div>
                </section>
              )}

              {/* end Soft skills */}

              {/* languages */}
              {resume_sections?.show_languages === 1 && (
                <>
                  {languages?.length > 0 && (
                    <section className="mt-6 mx-6" id="data_languages">
                      <h2 className="py-0.5 w-full Arial text_white border-b border-white  data-font-name data-font-size-heading default-font-size-heading mb-2">
                        Languages
                      </h2>

                      {languages?.length > 0 ? (
                        languages?.map((language, idx) => (
                          <SectionLanguages
                            key={idx}
                            colorTitle={"text_white"}
                            colorBackground={"bg-slate-300"}
                            colorForeground={"theme1_default_bg_2 theme_bg_2"}
                            variant={1}
                            data={language}
                          />
                        ))
                      ) : (
                        <SectionLanguages
                          colorTitle={"text_white"}
                          colorBackground={"bg-slate-300"}
                          colorForeground={"theme1_default_bg_2 theme_bg_2"}
                          variant={1}
                          data={""}
                        />
                      )}
                    </section>
                  )}
                </>
              )}

              {/* end languages */}

              {custom_sections?.length > 0 &&
                (custom_sections?.length > 0
                  ? custom_sections
                    ?.filter((custom_section) => custom_section.is_show)
                    .map((custom_section, idx) => (
                      <section className="mt-6 mx-6">
                        <h2 className="py-0.5 w-full Arial text_white border-b border-white data-font-name data-font-size-heading default-font-size-heading mb-2">
                          {custom_section.title}
                        </h2>

                        <p className="text_white data-font-name data-font-size-desc-heading default-font-size-desc-heading mt-2 w-full editor_txt">
                          <p
                            dangerouslySetInnerHTML={{
                              __html: custom_section.detail,
                            }}
                          />
                        </p>
                      </section>
                    ))
                  : "")}
            </div>
          </section>
        </section>

        {/* exit main */}
      </div>
    </>
  );
};

export default Header;
