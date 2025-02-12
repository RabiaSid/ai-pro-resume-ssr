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
import { IoLanguageSharp } from "react-icons/io5";
import { CgLoadbarDoc } from "react-icons/cg";
import {
  FaGraduationCap,
  FaUsers,
  FaAward,
  FaTrophy,
  FaUserTie,
  FaBriefcase,
  FaGlobe,
} from "react-icons/fa6";
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
        className={`chk_height min-h-[1308px] font_1 w-full bg-white  relative mine_adjust ${activeFont} ${activeFontSize} ${!isChecked ? activeTheme : ""
          }`}
      >
        {/* <div className="main flex flex-wrap justify-start items-start h-[100%]"> */}

        <section className="flex  w-full h-auto ">
          <div className="flex flex-col flex-1 w-[67%] min-h-[1308px] ">
            <header className="w-full mt-2" id="data_personal_info">
              <div className="px-4 py-2 w-full">
                <h1 className="theme11_default_fg_1 tracking-widest theme_fg_1 Arial data-font-name default-font-size-super-heading data-font-size-super-heading">
                  {first_name ? first_name : "Your Name"}{" "}
                  <span className="font-bold">
                    {last_name ? last_name : ""}
                  </span>
                </h1>
                <p className="text_black data-font-name Arial data-font-size-sub-heading default-font-size-sub-heading ">
                  {job_title ? job_title : ""}
                </p>
              </div>
            </header>
            {/* personal_info */}
            <div className="mx-4 " id="data_contacts">
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
                colorIcon={"text_white"}
                colorIconBG={"theme11_default_bg_1 theme_bg_1"} //for varient 2 apply background class
                variant={2}
              />
            </div>
            {/* end personal_info */}

            {/* summary */}
            {summary ? (
              <section className="mx-4 mt-6" id="data_summary">
                <table className="w-full uppercase text_black  py-0.5 mb-2 font-bold tracking-wide  Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                  <tr>
                    <td className="w-[30px]">
                      <FaUserTie className="text_black" size={20} />
                    </td>
                    <td>Summary</td>
                  </tr>
                </table>
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
              </section>
            ) : (
              ""
            )}
            {/* end summary */}
            {/* experience */}
            {resume_sections?.show_experience === 1 && (
              <section className="mt-2 pt-4 mx-4  " id="data_experience">
                <table className="w-full uppercase text_black  py-0.5 mb-2 font-bold tracking-wide  Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                  <tr>
                    <td className="w-[30px]">
                      <FaBriefcase size={20} />
                    </td>
                    <td>Experience</td>
                  </tr>
                </table>
                {experiences?.length > 0 ? (
                  experiences?.map((exp, idx) => (
                    <section key={idx} className="mt-2 w-full">
                      <SectionExperience
                        countryId={country_id}
                        allCountries={allCountries}
                        colorPosition={"text_black"}
                        colorDates={"text_black"}
                        colorLocation={"theme11_default_fg_2 theme_fg_2"}
                        variant={1}
                        data={exp}
                      />
                    </section>
                  ))
                ) : (
                  <section className="mt-2 w-full">
                    <SectionExperience
                      countryId={country_id}
                      allCountries={allCountries}
                      colorPosition={"text_black"}
                      colorDates={"text_black"}
                      colorLocation={"theme11_default_fg_2 theme_fg_2"}
                      variant={1}
                      data={""}
                    />
                  </section>
                )}
              </section>
            )}

            {/* end experience */}
            {/* educattion */}
            <section className="mt-2 pt-4 mx-4  " id="data_educations">
              <table className="w-full uppercase text_black  py-0.5 mb-2 font-bold tracking-wide  Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                <tr>
                  <td className="w-[30px]">
                    <FaGraduationCap size={20} />
                  </td>
                  <td>Education</td>
                </tr>
              </table>

              {education?.length > 0 ? (
                education?.map((edu, idx) => (
                  <section key={idx} className="mt-2 w-full">
                    <SectionEducation
                      countryId={country_id}
                      colorTitle={"text_black"}
                      colorDates={"text_black"}
                      colorLocation={"theme11_default_fg_2 theme_fg_2"}
                      colorGradeType={"text_black"}
                      variant={1}
                      data={edu}
                    />
                  </section>
                ))
              ) : (
                <section className="mt-2 w-full">
                  <SectionEducation
                    countryId={country_id}
                    colorTitle={"text_black"}
                    colorDates={"text_black"}
                    colorLocation={"theme11_default_fg_2 theme_fg_2"}
                    colorGradeType={"text_black"}
                    variant={1}
                    data={""}
                  />
                </section>
              )}
            </section>
            {/* end educattion*/}

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
                        <h2 className=" w-full  border-b border-[rgb(190,190,190)] py-0.5 px-4  Arial theme_fg_2 data-font-name data-font-size-heading">
                          {custom_section.title}
                        </h2>
                        <p className="data-font-name data-font-size-desc-heading px-4 mt-6 w-full editor_txt">
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
                  <section className="mt-2 pt-4 mx-4  " id="data_references">
                    <table className="w-full uppercase text_black  py-0.5 mb-2 font-bold tracking-wide  Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                      <tr>
                        <td className="w-[30px]">
                          <FaUsers size={20} />
                        </td>
                        <td>References</td>
                      </tr>
                    </table>
                    {references?.length > 0 ? (
                      references?.map((ref, idx) => (
                        <section key={idx} className="mt-2 w-full">
                          <SectionReferences
                            colorTitle={"text_black"}
                            colorDesignation={"text_black"}
                            colorLocation={"theme11_default_fg_2 theme_fg_2"}
                            colorContactInfo={"text_black"}
                            variant={1}
                            data={ref}
                          />
                        </section>
                      ))
                    ) : (
                      <section className="mt-2 w-full">
                        <SectionReferences
                          colorTitle={"text_black"}
                          colorDesignation={"text_black"}
                          colorLocation={"theme11_default_fg_2 theme_fg_2"}
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
            <div className="relative h-[60px] mt-auto mb-0">
              <Branding left="12px" />
            </div>
          </div>

          <section className="chk_height min-h-[1308px] w-[33%]   h-auto">
            <div className=" mx-2  theme11_default_bg_1 theme_bg_1  h-full">
              <div className="flex justify-center">
                {profile_image instanceof File ? (
                  <img
                    src={`${URL.createObjectURL(profile_image)}`}
                    width={220}
                    height={220}
                    className="rounded-full w-[70%]  my-4"
                    alt="profile"
                  />
                ) : profile_image ? (
                  <img
                    src={`${image_url + "/" + profile_image}`}
                    width={220}
                    height={220}
                    className="rounded-full w-[70%]  my-4"
                    alt="profile"
                  />
                ) : (
                  <img
                    src={`${placeholderImageUser}`}
                    id="unused_image"
                    width={220}
                    height={220}
                    className="rounded-full w-[70%] my-4"
                    alt="profile"
                  />
                )}
              </div>

              {/* technical skills */}

              {/* awards */}
              {resume_sections?.show_awards === 1 && (
                <>
                  {awards?.length > 0 && (
                    <section className="mt-2 pt-4 mx-4  " id="data_awards">
                      <table className="w-full uppercase text_white  py-0.5 mb-2 font-bold tracking-wide  Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                        <tr>
                          <td className="w-[30px]">
                            <FaTrophy size={20} />
                          </td>
                          <td>Awards</td>
                        </tr>
                      </table>
                      {awards?.length > 0 ? (
                        awards?.map((award, idx) => (
                          <section key={idx} className="mt-2 w-full">
                            <SectionAwards
                              colorTitle={"text_white"}
                              colorDates={"text_white"}
                              colorLocation={"text_white"}
                              colorDesc={"text_white"}
                              variant={2}
                              data={award}
                            />
                          </section>
                        ))
                      ) : (
                        <section className="mt-2 w-full">
                          <SectionAwards
                            colorTitle={"text_white"}
                            colorDates={"text_white"}
                            colorLocation={"text_white"}
                            colorDesc={"text_white"}
                            variant={2}
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
                    <section
                      className="mt-2 pt-4 mx-4  "
                      id="data_certifications"
                    >
                      <table className="w-full uppercase text_white py-0.5 mb-2 font-bold tracking-wide  Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                        <tr>
                          <td className="w-[30px]">
                            <FaAward size={20} />
                          </td>
                          <td>Certificates</td>
                        </tr>
                      </table>
                      {certificates?.length > 0 ? (
                        certificates?.map((certificate, idx) => (
                          <section className="mt-2 w-full">
                            <SectionCertificates
                              colorTitle={"text_white"}
                              colorDates={"text_white"}
                              colorLocation={"text_white"}
                              colorDesc={"text_white"}
                              variant={2}
                              data={certificate}
                            />
                          </section>
                        ))
                      ) : (
                        <section className="mt-2 w-full">
                          <SectionCertificates
                            colorTitle={"text_white"}
                            colorDates={"text_white"}
                            colorLocation={"text_white"}
                            colorDesc={"text_white"}
                            variant={2}
                            data={""}
                          />
                        </section>
                      )}
                    </section>
                  )}
                </>
              )}

              <section
                className="w-full mt-2 pt-4 px-4 "
                id="data_technical_skills"
              >
                <table className="w-full uppercase text-[white]  py-0.5 mb-2 font-bold tracking-wide  Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                  <tr>
                    <td className="w-[30px]">
                      <FaGlobe size={20} className="text_white" />
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
                <section
                  className="w-full mt-2 pt-4 px-4 "
                  id="data_soft_skills"
                >
                  <table className="w-full uppercase text-[white] py-0.5 mb-2 font-bold tracking-wide  Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                    <tr>
                      <td className="w-[30px]">
                        <FaGlobe size={20} className="text_white" />
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
                    <section
                      className="w-full mt-2 pt-4 px-4 "
                      id="data_languages"
                    >
                      <table className="w-full uppercase text-[white]  py-0.5 mb-2 font-bold tracking-wide  Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                        <tr>
                          <td className="w-[30px]">
                            <IoLanguageSharp size={20} className="text_white" />
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
                            colorForeground={"theme11_default_bg_2 theme_bg_2"}
                            variant={1}
                            data={language}
                          />
                        ))
                      ) : (
                        <SectionLanguages
                          colorTitle={"text_white"}
                          colorBackground={"bg-slate-300"}
                          colorForeground={"theme11_default_bg_2 theme_bg_2"}
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
                      <section className="w-full mt-2 pt-4 px-4 ">
                        <table className="w-full uppercase text-[white]  py-0.5 mb-2 font-bold tracking-wide  Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                          <tr>
                            <td className="w-[30px]">
                              <CgLoadbarDoc
                                size={20}
                                className="text_white"
                              />
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
          </section>
        </section>
        {/* exit main */}
        {/* <Branding /> */}
      </div>
    </>
  );
};

export default Header;
