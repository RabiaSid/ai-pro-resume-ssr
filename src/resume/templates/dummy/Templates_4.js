import React from "react";

import placeholderImageUser from "../../../assets/images/reusme_placeholder_image.webp";
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
import { TiContacts } from "react-icons/ti";
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
  console.log(isChecked);
  return (
    <>
      <div
        id="my_template"
        className={`chk_height min-h-[1308px] font_1 w-full bg-white  relative mine_adjust ${activeFont} ${activeFontSize} ${!isChecked ? activeTheme : ""
          }`}
      >
        {/* <div className="main flex flex-wrap justify-start items-start h-[100%]"> */}

        <section className="flex  w-full flex-wrap">
          <div className="flex flex-col flex-1 w-[30%] theme12_default_bg_1 theme_bg_1 chk_height min-h-[1308px]">
            <div className="w-full mt-10">
              {profile_image instanceof File ? (
                <img
                  src={`${URL.createObjectURL(profile_image)}`}
                  width={200}
                  height={200}
                  className="rounded-full w-[65%] m-auto "
                  alt="profile"
                />
              ) : profile_image ? (
                <img
                  src={`${image_url + "/" + profile_image}`}
                  width={200}
                  height={200}
                  className="rounded-full w-[65%] m-auto"
                  alt="profile"
                />
              ) : (
                <img
                  src={`${placeholderImageUser}`}
                  id="unused_image"
                  width={200}
                  height={200}
                  className="rounded-full w-[65%] m-auto"
                  alt="profile"
                />
              )}
            </div>

            {/* personal_info */}
            <div className="mt-6 mx-4" id="data_contacts">
              <table className="w-full text_white font-semibold tracking-wide mb-4 border-b-2 border-slate-300   Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                <tr>
                  <td className="w-[50px] pb-2">
                    <div className="w-10 h-10 bg-white p-[7px] rounded-full">
                      <TiContacts
                        size={26}
                        className="theme12_default_fg_1 theme_fg_1"
                      />
                    </div>
                  </td>
                  <td>Contact Info</td>
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
                colorText={"text_white"}
                colorIcon={"text_white"}
                colorIconBG={"bg-white"} //for varient 2 apply background class
                variant={1}
              />
            </div>
            {/* end personal_info */}

            {/* technical skills */}

            <section className=" w-full mt-4 px-4" id="data_technical_skills">
              <table className="w-full text_white font-semibold tracking-wide mb-4 border-b-2 border-slate-300   Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                <tr>
                  <td className="w-[50px] pb-2">
                    <div className="w-10 h-10 bg-white p-[7px] rounded-full">
                      <BsFillPersonCheckFill
                        size={26}
                        className="theme12_default_fg_1 theme_fg_1"
                      />
                    </div>
                  </td>
                  <td>Technical Skills</td>
                </tr>
              </table>
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
            </section>

            {/* end technical skills */}

            {/* Soft skills */}
            {resume_sections?.show_soft_skills === 1 && (
              <section className=" w-full mt-4 px-4" id="data_soft_skills">
                <table className="w-full text_white font-semibold tracking-wide mb-4 border-b-2 border-slate-300   Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                  <tr>
                    <td className="w-[50px] pb-2">
                      <div className="w-10 h-10 bg-white p-[7px] rounded-full">
                        <BsFillPersonCheckFill
                          size={26}
                          className="theme12_default_fg_1 theme_fg_1"
                        />
                      </div>
                    </td>
                    <td>Soft Skills</td>
                  </tr>
                </table>
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
              </section>
            )}

            {/* end Soft skills */}
            {/* languages */}
            {resume_sections?.show_languages === 1 && (
              <>
                {languages?.length > 0 && (
                  <section className="mt-4 mx-4" id="data_languages">
                    <table className="w-full text_white font-semibold tracking-wide mb-4 border-b-2 border-slate-300   Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                      <tr>
                        <td className="w-[50px] pb-2">
                          <div className="w-10 h-10 bg-white p-[7px] rounded-full">
                            <IoLanguageSharp
                              size={26}
                              className="theme12_default_fg_1 theme_fg_1"
                            />
                          </div>
                        </td>
                        <td>Languages</td>
                      </tr>
                    </table>

                    {languages?.length > 0 ? (
                      languages?.map((language, idx) => (
                        <SectionLanguages
                          key={idx}
                          colorTitle={"text_white"}
                          colorBackground={"bg-slate-300"}
                          colorForeground={"theme12_default_bg_2 theme_bg_2"}
                          variant={2}
                          data={language}
                        />
                      ))
                    ) : (
                      <SectionLanguages
                        colorTitle={"text_white"}
                        colorBackground={"bg-slate-300"}
                        colorForeground={"theme12_default_bg_2 theme_bg_2"}
                        variant={2}
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
                    <section className="mt-4 mx-4">
                      <table className="w-full text_white font-semibold tracking-wide mb-4 border-b-2 border-slate-300   Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                        <tr>
                          <td className="w-[50px] pb-2">
                            <div className="w-10 h-10 bg-white p-[7px] rounded-full">
                              <CgLoadbarDoc
                                size={26}
                                className="theme12_default_fg_1 theme_fg_1"
                              />
                            </div>
                          </td>
                          <td>{custom_section.title}</td>
                        </tr>
                      </table>

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

          <section className="w-[70%] flex flex-col min-h-[1308px] ">
            <div className="">
              <header className="w-full my-6 pl-6" id="data_personal_info">
                <div className="w-full">
                  <h1 className="theme12_default_fg_2 theme_fg_2 Arial tracking-wider data-font-name default-font-size-super-heading data-font-size-super-heading">
                    <span className="font-bold">
                      {first_name ? first_name : "Your Name"}{" "}
                    </span>
                    <span className="font-bold">
                      {last_name ? last_name : ""}
                    </span>
                  </h1>
                  <p className="text_black data-font-name Arial data-font-size-main-heading default-font-size-heading ">
                    {job_title ? job_title : ""}
                  </p>
                </div>
              </header>

              {/* summary */}
              {summary ? (
                <section className="mx-6 mt-4" id="data_summary">
                  <table className="text_black border-b-2 border-[rgb(200,200,200)] w-full theme12_default_fg_1 theme_fg_1 font-semibold tracking-wide mb-2  Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                    <tr>
                      <td className="w-[50px] pb-2">
                        <div className="w-10 h-10 theme12_default_bg_1 theme_bg_1 mr-2 p-[8.5px] rounded-full">
                          <FaUserTie size={22} className="text_white" />
                        </div>
                      </td>
                      <td>Summary</td>
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
                </section>
              ) : (
                ""
              )}
              {/* end summary */}

              {/* experience */}
              {resume_sections?.show_experience === 1 && (
                <section className="mt-4 mx-6" id="data_experience">
                  <table className="text_black border-b-2 border-[rgb(200,200,200)] w-full theme12_default_fg_1 theme_fg_1 font-semibold tracking-wide mb-2  Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                    <tr>
                      <td className="w-[50px] pb-2">
                        <div className="w-10 h-10 theme12_default_bg_1 theme_bg_1 mr-2 p-[8.5px] rounded-full">
                          <IoMdBriefcase size={22} className="text_white" />
                        </div>
                      </td>
                      <td>Experience</td>
                    </tr>
                  </table>

                  {experiences?.length > 0 ? (
                    experiences?.map((exp, idx) => (
                      <section key={idx} className="mb-2 w-full">
                        <SectionExperience
                          countryId={country_id}
                          allCountries={allCountries}
                          colorPosition={"text_black"}
                          colorDates={
                            "theme12_default_fg_2 theme_fg_2 italic tracking-wide"
                          }
                          colorLocation={"text_black"}
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
                        colorPosition={"text_black"}
                        colorDates={
                          "theme12_default_fg_2 theme_fg_2 italic tracking-wide"
                        }
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
              <section className="mx-6 mt-2" id="data_educations">
                <table className="text_black border-b-2 border-[rgb(200,200,200)] w-full theme12_default_fg_1 theme_fg_1 font-semibold tracking-wide mb-2  Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                  <tr>
                    <td className="w-[50px] pb-2">
                      <div className="w-10 h-10 theme12_default_bg_1 theme_bg_1 mr-2 p-[8.5px] rounded-full">
                        <FaUserGraduate size={22} className="text_white" />
                      </div>
                    </td>
                    <td>Education</td>
                  </tr>
                </table>

                {education?.length > 0 ? (
                  education?.map((edu, idx) => (
                    <section key={idx} className="w-full">
                      <SectionEducation
                        countryId={country_id}
                        colorTitle={"text_black"}
                        colorDates={
                          "theme12_default_fg_2 theme_fg_2 italic tracking-wide"
                        }
                        colorLocation={"text_black"}
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
                      colorTitle={"text_black"}
                      colorDates={
                        "theme12_default_fg_2 theme_fg_2 italic tracking-wide"
                      }
                      colorLocation={"text_black"}
                      colorGradeType={"text_black"}
                      variant={3}
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
                      <table className="text_black border-b-2 border-[rgb(200,200,200)] w-full theme12_default_fg_1 theme_fg_1 font-semibold tracking-wide mb-2  Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                        <tr>
                          <td className="w-[50px] pb-2">
                            <div className="w-10 h-10 theme12_default_bg_1 theme_bg_1 mr-2 p-[8.5px] rounded-full">
                              <FaTrophy size={22} className="text_white" />
                            </div>
                          </td>
                          <td>Professional Milestones</td>
                        </tr>
                      </table>

                      {awards?.length > 0 ? (
                        awards?.map((award, idx) => (
                          <section key={idx} className="w-full">
                            <SectionAwards
                              colorTitle={"text_black"}
                              colorDates={
                                "theme12_default_fg_2 theme_fg_2 italic tracking-wide"
                              }
                              colorLocation={"text_black"}
                              colorDesc={"text_black"}
                              variant={3}
                              data={award}
                            />
                          </section>
                        ))
                      ) : (
                        <section className="w-full">
                          <SectionAwards
                            colorTitle={"text_black"}
                            colorDates={
                              "theme12_default_fg_2 theme_fg_2 italic tracking-wide"
                            }
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

              {/* end awards */}
              {/* certification */}
              {resume_sections?.show_certificates === 1 && (
                <>
                  {certificates?.length > 0 && (
                    <section className="mx-6 mt-4" id="data_certifications">
                      <table className="text_black border-b-2 border-[rgb(200,200,200)] w-full theme12_default_fg_1 theme_fg_1 font-semibold tracking-wide mb-2  Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                        <tr>
                          <td className="w-[50px] pb-2">
                            <div className="w-10 h-10 theme12_default_bg_1 theme_bg_1 mr-2 p-[8.5px] rounded-full">
                              <PiCertificateFill
                                size={22}
                                className="text_white"
                              />
                            </div>
                          </td>
                          <td>Certificates</td>
                        </tr>
                      </table>

                      {certificates?.length > 0 ? (
                        certificates?.map((certificate, idx) => (
                          <section className="w-full">
                            <SectionCertificates
                              colorTitle={"text_black"}
                              colorDates={
                                "theme12_default_fg_2 theme_fg_2 italic tracking-wide"
                              }
                              colorLocation={"text_black"}
                              colorDesc={"text_black"}
                              variant={3}
                              data={certificate}
                            />
                          </section>
                        ))
                      ) : (
                        <section className="w-full">
                          <SectionCertificates
                            colorTitle={"theme12_default_fg_2 theme_fg_2"}
                            colorDates={
                              "theme12_default_fg_2 theme_fg_2 italic tracking-wide"
                            }
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

              {/* references */}
              {resume_sections?.show_references === 1 && (
                <>
                  {references?.length > 0 && (
                    <section className="mt-4 mx-6" id="data_references">
                      <table className="text_black border-b-2 border-[rgb(200,200,200)] w-full theme12_default_fg_1 theme_fg_1 font-semibold tracking-wide mb-2  Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                        <tr>
                          <td className="w-[50px] pb-2">
                            <div className="w-10 h-10 theme12_default_bg_1 theme_bg_1 mr-2 p-[8.5px] rounded-full">
                              <VscReferences size={22} className="text_white" />
                            </div>
                          </td>
                          <td>References</td>
                        </tr>
                      </table>

                      {references?.length > 0 ? (
                        references?.map((ref, idx) => (
                          <section key={idx} className="w-full">
                            <SectionReferences
                              colorTitle={"theme12_default_fg_2 theme_fg_2"}
                              colorDesignation={
                                "theme12_default_fg_2 theme_fg_2"
                              }
                              colorLocation={"theme12_default_fg_1 theme_fg_1"}
                              colorContactInfo={"text_black"}
                              variant={1}
                              data={ref}
                            />
                          </section>
                        ))
                      ) : (
                        <section className="w-full">
                          <SectionReferences
                            colorTitle={"theme12_default_fg_2 theme_fg_2"}
                            colorDesignation={"theme12_default_fg_2 theme_fg_2"}
                            colorLocation={"theme12_default_fg_1 theme_fg_1"}
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
            <div className="relative h-[60px] mt-auto mb-0">
              <Branding left="auto" right={8} />
            </div>
          </section>
        </section>
        {/* exit main */}

      </div>
    </>
  );
};

export default Header;
