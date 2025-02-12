import React from "react";

const placeholderImageUser = "/images/reusme_placeholder_image.webp";
import SectionExperience from "./component_sections/Experience";
import SectionEducation from "./component_sections/Education";
import SectionAwards from "./component_sections/Awards";
import SectionCertificates from "./component_sections/Certificates";
import SectionReferences from "./component_sections/References";
import SectionLanguages from "./component_sections/Languages";
import SectionProfileInfo from "./component_sections/ProfileInfo";
import SectionSkills from "./component_sections/Skills";
import { FaUserTie } from "react-icons/fa";
import { IoMdBriefcase } from "react-icons/io";
import { FaUserGraduate } from "react-icons/fa6";
import { FaTrophy } from "react-icons/fa6";
import { PiCertificateFill } from "react-icons/pi";
import { VscReferences } from "react-icons/vsc";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { IoLanguageSharp } from "react-icons/io5";
import { CgLoadbarDoc } from "react-icons/cg";
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
  console.log(isChecked);
  return (
    <>
      <div
        id="my_template"
        className={`chk_height flex flex-col min-h-[1308px] font_1 w-full bg-white  relative mine_adjust ${activeFont} ${activeFontSize} ${!isChecked ? activeTheme : ""
          }`}
      >
        {/* <div className="main flex flex-wrap justify-start items-start h-[100%]"> */}

        <section className="flex  w-full flex-wrap">
          <div className="w-full flex flex-wrap justify-between items-start ">
            <header className="w-full mt-10" id="data_personal_info">
              <div className="w-full text-center pb-2">
                <table className="w-full">
                  <tr>
                    <td className="theme2_default_bg_1 theme_bg_1 opacity-30 rounded-md"></td>
                    <td className="theme2_default_fg_1 theme_fg_1 uppercase font-semibold w-[80%] Arial tracking-wider data-font-name default-font-size-super-heading data-font-size-super-heading">
                      {first_name ? first_name : "Your Name"}{" "}
                      {last_name ? last_name : ""}
                    </td>
                    <td className="theme2_default_bg_1 theme_bg_1 opacity-30 rounded-md"></td>
                  </tr>
                </table>

                <p className="px-10 py-4 text-[#111]  data-font-name Arial data-font-size-main-heading default-font-size-main-heading ">
                  {job_title ? job_title : ""}
                </p>
              </div>
              {/* personal_info */}
              <div className="mb-2 mx-10" id="data_contacts">
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
                  colorIconBG={"bg-slate-200"} //for varient 2 apply background class
                  variant={4}
                />
              </div>
              {/* end personal_info */}
            </header>

            {/* summary */}
            {summary ? (
              <section className="mt-4 " id="data_summary">
                <table className="w-full mb-2">
                  <tr>
                    <td>
                      <div className="h-[2px] bg-[#111]"></div>
                    </td>
                    <td className="theme2_default_fg_2 theme_fg_2 font-semibold w-[180px] text-center py-[2px] uppercase tracking-[4px] Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                      Summary
                    </td>
                    <td>
                      <div className="h-[2px] bg-[#111]"></div>
                    </td>
                  </tr>
                </table>
                <div
                  className="Arial px-10 text-sm resume-section-content text_black whitespace-pre-line text-justify w-full data-font-name data-font-size-desc-heading default-font-size-desc-heading"
                  dangerouslySetInnerHTML={{
                    __html: summary
                      ? summary
                      : "What's the one thing which makes you the best candidate for this job?",
                  }}
                />
                {/* <p className="Arial px-10 text-sm resume-section-content text_black whitespace-pre-line text-justify w-full data-font-name data-font-size-desc-heading default-font-size-desc-heading">
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
              <section className="mt-4 w-full" id="data_experience">
                <table className="w-full mb-2">
                  <tr>
                    <td>
                      <div className="h-[2px] bg-[#111]"></div>
                    </td>
                    <td className="theme2_default_fg_2 theme_fg_2 font-semibold w-[320px] text-center py-[2px] uppercase tracking-[4px] Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                      Work Experience
                    </td>
                    <td>
                      <div className="h-[2px] bg-[#111]"></div>
                    </td>
                  </tr>
                </table>
                {experiences?.length > 0 ? (
                  experiences?.map((exp, idx) => (
                    <section key={idx} className="mb-2 w-full px-10">
                      <SectionExperience
                        countryId={country_id}
                        allCountries={allCountries}
                        colorPosition={"text_black"}
                        colorDates={"text_black italic tracking-wide"}
                        colorLocation={"text_black"}
                        variant={3}
                        data={exp}
                      />
                    </section>
                  ))
                ) : (
                  <section className="mb-2 w-full px-10">
                    <SectionExperience
                      countryId={country_id}
                      allCountries={allCountries}
                      colorPosition={"text_black"}
                      colorDates={"text_black italic tracking-wide"}
                      colorLocation={"text_black"}
                      variant={3}
                      data={""}
                    />
                  </section>
                )}
              </section>
            )}

            {/* end experience */}

            {/* educattion */}
            <section className="mt-2 w-full" id="data_educations">
              <table className="w-full mb-2">
                <tr>
                  <td>
                    <div className="h-[2px] bg-[#111]"></div>
                  </td>
                  <td className="theme2_default_fg_2 theme_fg_2 font-semibold w-[200px] text-center py-[2px] uppercase tracking-[4px] Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                    Education
                  </td>
                  <td>
                    <div className="h-[2px] bg-[#111]"></div>
                  </td>
                </tr>
              </table>

              {education?.length > 0 ? (
                education?.map((edu, idx) => (
                  <section key={idx} className="w-full px-10">
                    <SectionEducation
                      countryId={country_id}
                      colorTitle={"text_black"}
                      colorDates={"text_black italic tracking-wide"}
                      colorLocation={"text_black"}
                      colorGradeType={"text_black"}
                      variant={3}
                      data={edu}
                    />
                  </section>
                ))
              ) : (
                <section className="w-full px-10">
                  <SectionEducation
                    countryId={country_id}
                    colorTitle={"text_black"}
                    colorDates={"text_black italic tracking-wide"}
                    colorLocation={"text_black"}
                    colorGradeType={"text_black"}
                    variant={3}
                    data={""}
                  />
                </section>
              )}
            </section>
            {/* end educattion*/}

            {/* technical skills */}
            <section className=" w-full mt-4" id="data_technical_skills">
              <table className="w-full mb-2">
                <tr>
                  <td>
                    <div className="h-[2px] bg-[#111]"></div>
                  </td>
                  <td className="theme2_default_fg_2  theme_fg_2 font-semibold w-[300px] text-center py-[2px] uppercase tracking-[4px] Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                    Technical Skills
                  </td>
                  <td>
                    <div className="h-[2px] bg-[#111]"></div>
                  </td>
                </tr>
              </table>
              <div
                className={`skill-tag text_black data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial`}
              >
                <div className="px-10">
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
            </section>

            {/* end technical skills */}

            {/* Soft skills */}
            {resume_sections?.show_soft_skills === 1 && (
              <section className=" w-full mt-4" id="data_soft_skills">
                <table className="w-full mb-2">
                  <tr>
                    <td>
                      <div className="h-[2px] bg-[#111]"></div>
                    </td>
                    <td className="theme2_default_fg_2 theme_fg_2 font-semibold w-[220px] text-center py-[2px] uppercase tracking-[4px] Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                      Soft Skills
                    </td>
                    <td>
                      <div className="h-[2px] bg-[#111]"></div>
                    </td>
                  </tr>
                </table>
                <div
                  className={`skill-tag text_black data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial`}
                >
                  <div className="px-10">
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
              </section>
            )}

            {/* end Soft skills */}

            {/* awards */}
            <div className="w-full">
              {resume_sections?.show_awards === 1 && (
                <>
                  {awards?.length > 0 && (
                    <section className="mt-4" id="data_awards">
                      <table className="w-full mb-2">
                        <tr>
                          <td>
                            <div className="h-[2px] bg-[#111]"></div>
                          </td>
                          <td className="theme2_default_fg_2 theme_fg_2 font-semibold w-[330px] text-center py-[2px] uppercase tracking-[4px] Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                            Key Achievements
                          </td>
                          <td>
                            <div className="h-[2px] bg-[#111]"></div>
                          </td>
                        </tr>
                      </table>
                      {awards?.length > 0 ? (
                        awards?.map((award, idx) => (
                          <section key={idx} className="w-full px-10">
                            <SectionAwards
                              colorTitle={"text_black"}
                              colorDates={"text_black italic tracking-wide"}
                              colorLocation={"text_black"}
                              colorDesc={"text_black"}
                              variant={3}
                              data={award}
                            />
                          </section>
                        ))
                      ) : (
                        <section className="w-full px-10">
                          <SectionAwards
                            colorTitle={"text_black"}
                            colorDates={"text_black"}
                            colorLocation={"text_black"}
                            colorDesc={"text_black"}
                            variant={3}
                            data={""}
                          />
                        </section>
                      )}
                    </section>
                  )}
                </>
              )}
            </div>

            {/* end awards */}
            {/* certification */}
            <div className="w-full">
              {resume_sections?.show_certificates === 1 && (
                <>
                  {certificates?.length > 0 && (
                    <section className="mt-4" id="data_certifications">
                      <table className="w-full pb-2">
                        <tr>
                          <td>
                            <div className="h-[2px] bg-[#111]"></div>
                          </td>
                          <td className="theme2_default_fg_2 theme_fg_2 font-semibold w-[250px] text-center py-[2px] uppercase tracking-[4px] Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                            Certificates
                          </td>
                          <td>
                            <div className="h-[2px] bg-[#111]"></div>
                          </td>
                        </tr>
                      </table>
                      {certificates?.length > 0 ? (
                        certificates?.map((certificate, idx) => (
                          <section className="w-full px-10">
                            <SectionCertificates
                              colorTitle={"text_black"}
                              colorDates={"text_black italic tracking-wide"}
                              colorLocation={"text_black"}
                              colorDesc={"text_black"}
                              variant={3}
                              data={certificate}
                            />
                          </section>
                        ))
                      ) : (
                        <section className="w-full px-10">
                          <SectionCertificates
                            colorTitle={"text_black"}
                            colorDates={"text_black italic tracking-wide"}
                            colorLocation={"text_black"}
                            colorDesc={"text_black"}
                            variant={3}
                            data={""}
                          />
                        </section>
                      )}
                    </section>
                  )}
                </>
              )}
            </div>

            {/* languages */}
            {resume_sections?.show_languages === 1 && (
              <>
                {languages?.length > 0 && (
                  <section className="mt-4 w-full" id="data_languages">
                    <table className="w-full mb-2">
                      <tr>
                        <td>
                          <div className="h-[2px] bg-[#111]"></div>
                        </td>
                        <td className="theme2_default_fg_2 theme_fg_2 font-semibold w-[200px] text-center py-[2px] uppercase tracking-[4px] Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                          Languages
                        </td>
                        <td>
                          <div className="h-[2px] bg-[#111]"></div>
                        </td>
                      </tr>
                    </table>
                    <div className="w-[40%] px-10">
                      {languages?.length > 0 ? (
                        languages?.map((language, idx) => (
                          <SectionLanguages
                            key={idx}
                            colorTitle={"text_black"}
                            colorBackground={"bg-slate-200"}
                            colorForeground={"theme2_default_bg_2 theme_bg_2"}
                            variant={1}
                            data={language}
                          />
                        ))
                      ) : (
                        <SectionLanguages
                          colorTitle={"text_black"}
                          colorBackground={"bg-slate-200"}
                          colorForeground={"theme2_default_bg_2 theme_bg_2"}
                          variant={5}
                          data={""}
                        />
                      )}
                    </div>
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
                    <section className="mt-4 w-full">
                      <table className="w-full mb-2">
                        <tr>
                          <td>
                            <div className="h-[2px] bg-[#111]"></div>
                          </td>
                          <td className="theme2_default_fg_2 theme_fg_2 font-semibold whitespace-nowrap w-[100px] px-2 text-center py-[2px] uppercase tracking-[4px] Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                            {custom_section.title}
                          </td>
                          <td>
                            <div className="h-[2px] bg-[#111]"></div>
                          </td>
                        </tr>
                      </table>

                      <p className="text_black px-10 data-font-name data-font-size-desc-heading default-font-size-desc-heading mt-2 w-full editor_txt">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: custom_section.detail,
                          }}
                        />
                      </p>
                    </section>
                  ))
                : "")}

            {/* references */}
            {resume_sections?.show_references === 1 && (
              <>
                {references?.length > 0 && (
                  <section className="mt-4 mb-4 w-full" id="data_references">
                    <table className="w-full mb-2">
                      <tr>
                        <td>
                          <div className="h-[2px] bg-[#111]"></div>
                        </td>
                        <td className="theme2_default_fg_2 theme_fg_2 font-semibold w-[200px] text-center py-[2px] uppercase tracking-[4px] Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                          References
                        </td>
                        <td>
                          <div className="h-[2px] bg-[#111]"></div>
                        </td>
                      </tr>
                    </table>
                    {references?.length > 0 ? (
                      references?.map((ref, idx) => (
                        <section key={idx} className="w-full px-10">
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
                  </section>
                )}
              </>
            )}

            {/* end references */}
          </div>
        </section>
        {/* exit main */}
        <div className="relative h-[60px] mt-auto mb-0">
          <Branding left="auto" right={8} />
        </div>
      </div>
    </>
  );
};

export default Header;
