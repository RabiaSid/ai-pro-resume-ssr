import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  BiGlobe,
  BiSolidMap,
  BiSolidEnvelope,
  BiSolidPhone,
} from "react-icons/bi";
import { FaBriefcase, FaAward, FaTrophy } from "react-icons/fa";
import { HiMiniAcademicCap } from "react-icons/hi2";
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
    job_title,
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
    street_address,
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
      className={`chk_height min-h-[1308px] font_1 w-full bg-white  relative mine_adjust ${activeFont} ${activeFontSize} ${
        !isChecked ? activeTheme : ""
      }`}
    >
      <div
        className="main flex flex-wrap justify-start h-[100%]"
        id="data_contacts"
      >
        <div className="w-[65%] pt-[20px] flex flex-col min-h-[1308px]">
          <div className="py-1">
            {/* <img src={temp} width={140} height={140} className='rounded-full w-[140px] h-[140px] ' /> */}
            <h1
              className="text-[black] text-center py-1 w-full font-bold
             Arial data-font-name default-font-size-super-heading data-font-size-super-heading"
            >
              {first_name ? first_name : "Your Name"}{" "}
              {last_name ? last_name : ""}
            </h1>
            <p
              className="text-[#323433]  text-lg text-center 
            theme11_default_fg_2 theme_fg_2 data-font-name Arial data-font-size-main-heading default-font-size-main-heading"
            >
              {job_title ? job_title : ""}
            </p>
          </div>

          {/* summary */}
          {summary ? (
            <div
              className="mt-[20px] mx-4 resume-section-content"
              id="data_summary"
            >
              <div className="flex flex-wrap justify-start items-center">
                <div
                  className="Arial text-sm resume-section-content text-black whitespace-pre-line mt-4 text-justify w-full data-font-name data-font-size-desc-heading default-font-size-desc-heading"
                  dangerouslySetInnerHTML={{
                    __html: summary
                      ? summary
                      : "What's the one thing which makes you the best candidate for this job?",
                  }}
                />
                {/* <p className="Arial text-sm resume-section-content text-black whitespace-pre-line mt-2 text-justify w-full data-font-name data-font-size-desc-heading default-font-size-desc-heading">
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

          {/* experience */}
          {resume_sections?.show_experience === 1 && (
            <>
              <div className="pt-4 mx-4" id="data_experience">
                <table className="uppercase  text-lg font-bold  text-black  pl-2 w-full data-font-name py-0.5 Arial   data-font-size-main-heading default-font-size-main-heading">
                  <tr>
                    <td className="w-[40px]">
                      <div className="w-8 h-8 rounded-full flex justify-center items-center text_white bg-[#13355a] theme11_default_bg_1 theme_bg_1">
                        <FaBriefcase size={16} />
                      </div>
                    </td>
                    <td>Work Experience</td>
                  </tr>
                </table>

                {experiences?.length > 0 ? (
                  experiences?.map((exp, idx) => (
                    <section key={idx} className="mt-4 w-full">
                      <SectionExperience
                        countryId={country_id}
                        allCountries={allCountries}
                        colorPosition={"   theme11_default_fg_2   theme_fg_2  "}
                        colorDates={"   theme11_default_fg_2   theme_fg_2  "}
                        colorLocation={"text-black"}
                        variant={3}
                        data={exp}
                      />
                    </section>
                  ))
                ) : (
                  <section className="mt-4 w-full">
                    <SectionExperience
                      countryId={country_id}
                      allCountries={allCountries}
                      colorPosition={"   theme11_default_fg_2   theme_fg_2  "}
                      colorDates={"   theme11_default_fg_2   theme_fg_2  "}
                      colorLocation={"text-black"}
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
          <div className="pt-4 mx-4" id="data_educations">
            <table className="uppercase  text-lg font-bold  text-black  pl-2 w-full data-font-name py-0.5 Arial   data-font-size-main-heading default-font-size-main-heading">
              <tr>
                <td className="w-[40px]">
                  <div className="w-8 h-8 rounded-full flex justify-center items-center text_white bg-[#13355a] theme11_default_bg_1 theme_bg_1">
                    <HiMiniAcademicCap size={16} />
                  </div>
                </td>
                <td>Education</td>
              </tr>
            </table>

            {education?.length > 0 ? (
              education?.map((edu, idx) => (
                <section key={idx} className="mt-4 w-full">
                  <SectionEducation
                    countryId={country_id}
                    colorTitle={"   theme11_default_fg_2   theme_fg_2  "}
                    colorDates={"   theme11_default_fg_2   theme_fg_2  "}
                    colorLocation={"text-black"}
                    colorGradeType={"text-black"}
                    variant={3}
                    data={edu}
                  />
                </section>
              ))
            ) : (
              <section className="mt-4 w-full">
                <SectionEducation
                  countryId={country_id}
                  colorTitle={"   theme11_default_fg_2   theme_fg_2  "}
                  colorDates={"   theme11_default_fg_2   theme_fg_2  "}
                  colorLocation={"text-black"}
                  colorGradeType={"text-black"}
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
                <div className="pt-4 mx-4 text-[#333333]" id="data_awards">
                  <table className="uppercase  text-lg font-bold  text-black  pl-2 w-full data-font-name py-0.5 Arial   data-font-size-main-heading default-font-size-main-heading">
                    <tr>
                      <td className="w-[40px]">
                        <div className="w-8 h-8 rounded-full flex justify-center items-center text_white bg-[#13355a] theme11_default_bg_1 theme_bg_1">
                          <FaTrophy size={16} />
                        </div>
                      </td>
                      <td>Awards</td>
                    </tr>
                  </table>

                  {awards?.length > 0 ? (
                    awards?.map((award, idx) => (
                      <section key={idx} className="mt-4 w-full">
                        <SectionAwards
                          colorTitle={"   theme11_default_fg_2   theme_fg_2  "}
                          colorDates={"   theme11_default_fg_2   theme_fg_2  "}
                          colorLocation={"text-black"}
                          colorDesc={"text-black"}
                          variant={3}
                          data={award}
                        />
                      </section>
                    ))
                  ) : (
                    <section className="mt-4 w-full">
                      <SectionAwards
                        colorTitle={"   theme11_default_fg_2   theme_fg_2  "}
                        colorDates={"   theme11_default_fg_2   theme_fg_2  "}
                        colorLocation={"text-black"}
                        colorDesc={"text-black"}
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
                  className="pt-4 mx-4 text-[#333333]"
                  id="data_certifications"
                >
                  <table className="uppercase  text-lg font-bold  text-black  pl-2 w-full data-font-name py-0.5 Arial   data-font-size-main-heading default-font-size-main-heading">
                    <tr>
                      <td className="w-[40px]">
                        <div className="w-8 h-8 rounded-full flex justify-center items-center text_white bg-[#13355a] theme11_default_bg_1 theme_bg_1">
                          <FaAward size={16} />
                        </div>
                      </td>
                      <td>Certification</td>
                    </tr>
                  </table>

                  {certificates?.length > 0 ? (
                    certificates?.map((certificate, idx) => (
                      <section className="mt-4 w-full">
                        <SectionCertificates
                          colorTitle={"   theme11_default_fg_2   theme_fg_2  "}
                          colorDates={"   theme11_default_fg_2   theme_fg_2  "}
                          colorLocation={"text-black"}
                          colorDesc={"text-black"}
                          variant={3}
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

          {custom_sections?.length > 0 &&
            (custom_sections?.length > 0
              ? custom_sections
                  ?.filter((custom_section) => custom_section.is_show)
                  .map((custom_section, idx) => (
                    <div className="pt-4 mx-4 text-[#333333]" id="data_custom">
                      <table className="uppercase  text-lg font-bold  text-black  pl-2 w-full data-font-name py-0.5 Arial   data-font-size-main-heading default-font-size-main-heading">
                        <tr>
                          <td className="w-[40px]">
                            <div className="w-8 h-8 rounded-full flex justify-center items-center text_white bg-[#13355a] theme11_default_bg_1 theme_bg_1">
                              <FaAward size={16} />
                            </div>
                          </td>
                          <td>{custom_section.title}</td>
                        </tr>
                      </table>

                      <div className="py-2 flex flex-wrap justify-start items-center resume-section-content">
                        <p className="text-black data-font-name data-font-size-desc-heading default-font-size-desc-heading mt-2 w-full editor_txt">
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

          <div className="relative h-[60px] mt-auto mb-0">
            <Branding />
          </div>
        </div>

        <div className="chk_height w-[35%] min-h-[1308px] bg-[#DDE3E8]  flex-1">
          {/* personal_info */}
          <div className="mt-[50px] mb-[25px] mx-4 resume-section-content">
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
              colorIcon={"theme_fg_1 theme11_default_fg_1"}
              colorIconBG={"bg-white"} //for varient 2 apply background class
              variant={2}
            />
          </div>
          {/* end personal_info */}
          {/* custom section */}
          {/* <div className="pt-4 mx-4" id="data_custom_section">
            <div className="flex justify-start items-center w-full">
              <h1 className="text-lg font-bold Sarala text-[#13355a] data-headings-inner data-font-name data-font-size">
                Personal Abilities
              </h1>
            </div>
            <p className="Sarala mt-4 text-justify text-xs leading-6 w-full text-[#333333] data-headings-inner">
              <b>Leadership;</b> Possesses strong leadership skills able to
              inspire ard motivate team members towards common goals.
              <br />
              <br />
              <b>Creativity:</b> Brings a creative to problem solving often
              generating innovative solutions to complex challenges.
              <br />
              <br />
              <b>Resilience:</b> Exhibits resilience in the face of able to frem
              setbaks overcome with determination and perseverance.
            </p>
          </div> */}
          {/* end custom section */}
          {/* technical skills */}
          <section
            className="mt-6 mx-4 text-[#333333] "
            id="data_technical_skills"
          >
            <h2 className="uppercase w-full Arial text-black font-bold data-font-name data-font-size-main-heading default-font-size-main-heading mb-2 text-lg">
              Technical Skills
            </h2>
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
                      colorText={"text-black"}
                      colorTags={""}
                      variant={3}
                      data={skillsArray} // Pass skills as an array
                    />
                  );
                })
              ) : (
                <SectionSkills
                  colorText={"text-black"}
                  colorTags={""}
                  variant={3}
                  data={""} // Fallback as an empty array if no skills
                />
              )}
            </div>
          </section>
          {/* end technical skills */}
          {/* Soft skills */}
          {resume_sections?.show_soft_skills === 1 && (
            <section className=" mt-8 mx-4" id="data_soft_skills">
              <h2 className="uppercase w-full Arial text-black font-bold data-font-name data-font-size-main-heading default-font-size-main-heading mb-2 text-lg">
                Soft Skills
              </h2>
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
                        colorText={"text-black"}
                        colorTags={""}
                        variant={3}
                        data={skillsArray} // Pass skills as an array
                      />
                    );
                  })
                ) : (
                  <SectionSkills
                    colorText={"text-black"}
                    colorTags={""}
                    variant={3}
                    data={""} // Fallback as an empty array if no skills
                  />
                )}
              </div>
            </section>
          )}
          {/* references */}
          {resume_sections?.show_references === 1 && (
            <>
              {references?.length > 0 && (
                <section
                  className="inline-block mt-8 mx-4"
                  id="data_referencesdata_refeences"
                >
                  <h2 className="uppercase w-full Arial text-black font-bold data-font-name data-font-size-main-heading default-font-size-main-heading mb-2 text-lg">
                    References
                  </h2>

                  {references?.length > 0 ? (
                    references?.map((ref, idx) => (
                      <section key={idx} className="mt-4 w-full">
                        <SectionReferences
                          colorTitle={"text-black"}
                          colorDesignation={
                            "   theme11_default_fg_2   theme_fg_2  "
                          }
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
                        colorDesignation={
                          "   theme11_default_fg_2   theme_fg_2  "
                        }
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
          {/* languages */}
          {resume_sections?.show_languages === 1 && (
            <>
              {languages?.length > 0 && (
                <div
                  className="inline-block mt-8 mx-4 w-[80%] text-[#333333]"
                  id="data_languages"
                >
                  <h2 className="uppercase w-full Arial text-black font-bold data-font-name data-font-size-main-heading default-font-size-main-heading mb-2 text-lg">
                    Languages
                  </h2>

                  {languages?.length > 0 ? (
                    languages?.map((language, idx) => (
                      <SectionLanguages
                        key={idx}
                        colorTitle={"text-black"}
                        colorBackground={"bg-slate-400"}
                        colorForeground={"theme11_default_bg_2 theme_bg_2"}
                        variant={2}
                        data={language}
                      />
                    ))
                  ) : (
                    <SectionLanguages
                      colorTitle={""}
                      colorBackground={"bg-slate-400"}
                      colorForeground={"theme11_default_bg_2 theme_bg_2"}
                      variant={2}
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
      {/* exit main */}
    </section>
  );
};

export default Header;
