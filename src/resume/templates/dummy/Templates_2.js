import React, { useEffect, useState } from "react";
import placeholderImageUser from "../../../assets/images/reusme_placeholder_image.webp";
import axios from "axios";
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
    job_title,
    city,
    state,
    country_id,

    postal_code,
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
      className={`chk_height flex flex-col min-h-[1308px] font_1 w-full bg-white  relative mine_adjust ${activeFont} ${activeFontSize} ${!isChecked ? activeTheme : ""
        }`}
    >
      <div className="chk_height main flex flex-col h-[100%] min-h-[1308px]">
        <div className="w-full flex justify-between items-center px-6 theme_bg_1 theme10_default_bg_1">
          <header className="w-[80%] my-10" id="data_personal_info">
            <div className="w-full">
              <h1 className="text_white Arial data-font-name default-font-size-super-heading data-font-size-super-heading">
                {first_name ? first_name : "Your Name"}{" "}
                {last_name ? last_name : ""}
              </h1>
              <p className="text_white data-font-name Arial data-font-size-main-heading default-font-size-heading ">
                {job_title ? job_title : ""}
              </p>
            </div>
          </header>

          <div className="flex justify-center ">
            {profile_image instanceof File ? (
              <img
                src={`${URL.createObjectURL(profile_image)}`}
                width={100}
                height={100}
                className="rounded-full w-[100px] h-[100px]  "
                alt="profile"
              />
            ) : profile_image ? (
              <img
                src={`${image_url + "/" + profile_image}`}
                width={100}
                height={100}
                className="rounded-full w-[100px] h-[100px]  "
                alt="profile"
              />
            ) : (
              <img
                src={`${placeholderImageUser}`}
                id="unused_image"
                width={100}
                height={100}
                className="rounded-full w-[100px] h-[100px]"
                alt="profile"
              />
            )}
          </div>
        </div>
        <div className="flex w-full mt-8 px-6">
          <div className="w-[30%]">
            {/* personal_info */}
            <div className="text-[#2C2C31] mb-4" id="data_contacts">
              <h2 className=" w-full  border-b border-[rgb(190,190,190)] py-0.5 theme10_default_fg_2  Arial theme_fg_2 data-font-name data-font-size-heading default-font-size-heading">
                Contacts
              </h2>
              <div className="mt-4">
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
                  colorText={"text-black"}
                  colorIcon={"theme_fg_1 theme10_default_fg_1"}
                  colorIconBG={"bg-slate-200"} //for varient 2 apply background class
                  variant={1}
                />
              </div>
            </div>

            {/* end personal_info */}

            {/* technical skills */}

            <div className="mb-4  " id="data_technical_skills">
              <h2 className=" w-full  border-b border-[rgb(190,190,190)] py-0.5 theme10_default_fg_2  Arial theme_fg_2 data-font-name data-font-size-heading default-font-size-heading">
                Technical Skills
              </h2>
              <div
                className={`skill-tag text_black mt-4 data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial`}
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
                        colorText={"text-black"}
                        colorTags={"border-black"}
                        variant={3}
                        data={skillsArray} // Pass skills as an array
                      />
                    );
                  })
                ) : (
                  <SectionSkills
                    colorText={"text-black"}
                    colorTags={"border-black"}
                    variant={3}
                    data={""} // Fallback as an empty array if no skills
                  />
                )}
              </div>
            </div>

            {/* end technical skills */}

            {/* Soft skills */}
            {resume_sections?.show_soft_skills === 1 && (
              <div
                className="mb-4 flex justify-start items-center flex-wrap w-full"
                id="data_soft_skills"
              >
                <h2 className=" w-full  border-b border-[rgb(190,190,190)] py-0.5 theme10_default_fg_2  Arial theme_fg_2 data-font-name data-font-size-heading default-font-size-heading">
                  Soft Skills
                </h2>
                <div
                  className={`skill-tag text_black mt-4 data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial`}
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
                          colorText={"text-black"}
                          colorTags={"border-black"}
                          variant={3}
                          data={skillsArray} // Pass skills as an array
                        />
                      );
                    })
                  ) : (
                    <SectionSkills
                      colorText={"text-black"}
                      colorTags={"border-black"}
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
                  <div className="mb-4 text-[#2C2C31]" id="data_languages">
                    <h2 className=" w-full  border-b border-[rgb(190,190,190)] py-0.5 theme10_default_fg_2  Arial theme_fg_2 data-font-name data-font-size-heading default-font-size-heading">
                      Languages
                    </h2>
                    <section className="mt-4">
                      {languages?.length > 0 ? (
                        languages?.map((language, idx) => (
                          <SectionLanguages
                            key={idx}
                            colorTitle={"text-vlack"}
                            colorBackground={"bg-slate-300"}
                            colorForeground={"theme10_default_bg_2 theme_bg_2"}
                            variant={3}
                            data={language}
                          />
                        ))
                      ) : (
                        <SectionLanguages
                          colorTitle={"text-slate-200"}
                          colorBackground={"bg-slate-300"}
                          colorForeground={"theme10_default_bg_2 theme_bg_2"}
                          variant={1}
                          data={""}
                        />
                      )}
                    </section>
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
                    <div className="mb-4 " id="data_custom" key={idx}>
                      <h2 className=" w-full theme10_default_fg_2 border-b border-[rgb(190,190,190)] py-0.5   Arial theme_fg_2 data-font-name data-font-size-heading default-font-size-heading">
                        {custom_section.title}
                      </h2>

                      <p className="text-justify mt-4 flex flex-wrap data-font-size-desc-heading data-font-name justify-start items-center Arial text-sm capitalize w-full editor_txt resume-section-content">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: custom_section.detail,
                          }}
                        />
                      </p>
                    </div>
                  ))
                : "")}
            {/* references */}

            {/* end references */}
          </div>

          <div className="pl-6 w-[70%] ">
            <div className="">
              {/* summary */}
              {summary ? (
                <div className="mb-4 " id="data_summary">
                  <h2 className=" w-full  border-b border-[rgb(190,190,190)] py-0.5 theme10_default_fg_2  Arial theme_fg_2 data-font-name data-font-size-heading default-font-size-heading">
                    Profile
                  </h2>

                  {/* <p className="Arial text-sm resume-section-content text-black whitespace-pre-line mt-4 text-justify w-full data-font-name data-font-size-desc-heading default-font-size-desc-heading">
                    {summary
                      ? summary
                      : "What's the one thing which makes you the best candidate for this job?"}
                  </p> */}
                  <div
                    className="Arial text-sm resume-section-content text-black whitespace-pre-line mt-4 text-justify w-full data-font-name data-font-size-desc-heading default-font-size-desc-heading"
                    dangerouslySetInnerHTML={{
                      __html: summary
                        ? summary
                        : "What's the one thing which makes you the best candidate for this job?",
                    }}
                  />
                </div>
              ) : (
                ""
              )}
              {/* end summary */}

              {/* experience */}
              {resume_sections?.show_experience === 1 && (
                <>
                  <div
                    className="mb-4 resume-section-card"
                    id="data_experience"
                  >
                    <h2 className=" w-full theme10_default_fg_2 border-b border-[rgb(190,190,190)] py-0.5  Arial theme_fg_2 data-font-name data-font-size-heading default-font-size-heading">
                      Work Experience
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
                  </div>
                </>
              )}

              {/* end experience */}
              {/* educattion */}
              <div className="mb-4" id="data_educations">
                <h2 className=" w-full theme10_default_fg_2 border-b border-[rgb(190,190,190)] py-0.5   Arial theme_fg_2 data-font-name data-font-size-heading default-font-size-heading">
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
              </div>
              {/* end educattion*/}
              {/* awards */}
              {resume_sections?.show_awards === 1 && (
                <>
                  {awards?.length > 0 && (
                    <div className="mb-4 " id="data_awards">
                      <h2 className=" w-full theme10_default_fg_2 border-b border-[rgb(190,190,190)] py-0.5   Arial theme_fg_2 data-font-name data-font-size-heading default-font-size-heading">
                        Awards
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
                    </div>
                  )}
                </>
              )}

              {/* end awards */}

              {/* certification */}
              {resume_sections?.show_certificates === 1 && (
                <>
                  {certificates?.length > 0 && (
                    <div className="mb-4" id="data_certifications">
                      <h2 className=" w-full theme10_default_fg_2 border-b border-[rgb(190,190,190)] py-0.5   Arial theme_fg_2 data-font-name data-font-size-heading default-font-size-heading">
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
                    </div>
                  )}
                </>
              )}

              {/* end certification */}

              {resume_sections?.show_references === 1 && (
                <>
                  {references?.length > 0 && (
                    <div className="mb-4" id="data_references">
                      <h2 className=" w-full theme10_default_fg_2 border-b border-[rgb(190,190,190)] py-0.5   Arial theme_fg_2 data-font-name data-font-size-heading default-font-size-heading">
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
                    </div>
                  )}
                </>
              )}

              {/* custom section */}
              {/* <div className="mb-4" id="data_custom_section">
                <div className="flex items-center justify-start w-full mb-4 py-1 border-t border-b border-solid border-[#2C2C31] data-headings">
                  <h2 className="uppercase text-[#2C2C31] text-2xl Arial data-font-name data-font-size">
                    Hobbies
                  </h2>
                </div>
                <div className="flex flex-wrap justify-start items-center w-full">
                  <p className="Arial text-sm py-2 w-full capitalize text-[#747477]">
                    <span className="text-[#747477]">&#9679;</span> &nbsp;&nbsp;
                    Reading Books
                  </p>
                  <p className="Arial text-sm py-2 w-full capitalize text-[#747477]">
                    <span className="text-[#747477]">&#9679;</span> &nbsp;&nbsp;
                    Watching Movies
                  </p>
                  <p className="Arial text-sm py-2 w-full capitalize text-[#747477]">
                    <span className="text-[#747477]">&#9679;</span> &nbsp;&nbsp;
                    Playing Football
                  </p>
                </div>
              </div> */}
              {/* end custom section */}
            </div>
          </div>
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
