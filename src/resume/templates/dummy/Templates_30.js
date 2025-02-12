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
          <div className="w-full flex flex-wrap justify-between items-start">
            <header className="w-full my-6" id="data_personal_info">
              <div className="w-full">
                <h1 className="px-8 tracking-widest theme1_default_fg_1 theme_fg_1 Arial data-font-name default-font-size-super-heading data-font-size-super-heading">
                  {first_name ? first_name : "Your Name"}
                  <br />
                  <div className="font-bold">{last_name ? last_name : ""}</div>
                </h1>
                <p className="theme_bg_2 theme1_default_bg_2 tracking-widest text_white px-8 py-2 mt-2  data-font-name font-bold Arial data-font-size-desc-heading default-font-size-desc-heading ">
                  {job_title ? job_title : ""}
                </p>
              </div>
              {/* personal_info */}
              <div className="mt-4 px-8" id="data_contacts">
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
                  variant={3}
                />
              </div>
              {/* end personal_info */}
            </header>

            {/* <div className="flex justify-center mt-8">
              {profile_image instanceof File ? (
                <img
                  src={`${URL.createObjectURL(profile_image)}`}
                  width={120}
                  height={120}
                  className="rounded-full w-[120px] h-[120px]  "
                  alt="profile"
                />
              ) : profile_image ? (
                <img
                  src={`${image_url + "/" + profile_image}`}
                  width={120}
                  height={120}
                  className="rounded-full w-[120px] h-[120px]  "
                  alt="profile"
                />
              ) : (
                <img
                  src={`${placeholderImageUser}`}
                  id="unused_image"
                  width={120}
                  height={120}
                  className="rounded-full w-[120px] h-[120px]"
                  alt="profile"
                />
              )}
            </div> */}
            {/* summary */}
            {summary ? (
              <section className="w-full px-8" id="data_summary">
                <h2 className=" w-full text_black uppercase font-bold tracking-widest mb-2 border-[rgb(190,190,190)]  Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                  Objective
                </h2>

                {/* <p className="Arial text-sm resume-section-content text_black whitespace-pre-line text-justify w-full data-font-name data-font-size-desc-heading default-font-size-desc-heading">
                  {summary
                    ? summary
                    : "What's the one thing which makes you the best candidate for this job?"}
                </p> */}
                <div
                  className="Arial text-sm resume-section-content text_black whitespace-pre-line text-justify w-full data-font-name data-font-size-desc-heading default-font-size-desc-heading"
                  dangerouslySetInnerHTML={{
                    __html: summary
                      ? summary
                      : "What's the one thing which makes you the best candidate for this job?",
                  }}
                />
              </section>
            ) : (
              ""
            )}
            {/* end summary */}
          </div>
          <div className="flex flex-col flex-1 w-[50%]">
            {/* experience */}
            {resume_sections?.show_experience === 1 && (
              <section className="mt-4 mx-8" id="data_experience">
                <h2 className=" w-full text_black uppercase font-bold tracking-widest  border-[rgb(190,190,190)]  Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                  Experience
                </h2>
                {experiences?.length > 0 ? (
                  experiences?.map((exp, idx) => (
                    <section key={idx} className="mb-2 w-full">
                      <SectionExperience
                        countryId={country_id}
                        allCountries={allCountries}
                        colorPosition={"theme1_default_fg_2 theme_fg_2"}
                        colorDates={"text_black font-bold tracking-wide"}
                        colorLocation={"text_black italic"}
                        variant={2}
                        data={exp}
                      />
                    </section>
                  ))
                ) : (
                  <section className="mb-2 w-full">
                    <SectionExperience
                      countryId={country_id}
                      allCountries={allCountries}
                      colorPosition={"theme1_default_fg_2 theme_fg_2"}
                      colorDates={"text_black font-bold tracking-wide"}
                      colorLocation={"text_black italic"}
                      variant={2}
                      data={""}
                    />
                  </section>
                )}
              </section>
            )}

            {/* end experience */}
            {/* educattion */}
            <section className="mx-8 mt-2" id="data_educations">
              <h2 className=" w-full text_black uppercase font-bold tracking-widest  border-[rgb(190,190,190)]  Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                Education
              </h2>

              {education?.length > 0 ? (
                education?.map((edu, idx) => (
                  <section key={idx} className="w-full">
                    <SectionEducation
                      countryId={country_id}
                      colorTitle={"theme1_default_fg_2 theme_fg_2"}
                      colorDates={"text_black italic tracking-wide"}
                      colorLocation={"text_black font-bold"}
                      colorGradeType={"text_black"}
                      variant={2}
                      data={edu}
                    />
                  </section>
                ))
              ) : (
                <section className="w-full">
                  <SectionEducation
                    countryId={country_id}
                    colorTitle={"theme1_default_fg_2 theme_fg_2"}
                    colorDates={"text_black italic tracking-wide"}
                    colorLocation={"text_black font-bold"}
                    colorGradeType={"text_black"}
                    variant={2}
                    data={""}
                  />
                </section>
              )}
            </section>
            {/* end educattion*/}
          </div>

          <section className="w-[50%] ">
            <div className="">
              {/* awards */}
              {resume_sections?.show_awards === 1 && (
                <>
                  {awards?.length > 0 && (
                    <section className="mt-4 mx-8" id="data_awards">
                      <h2 className=" w-full text_black uppercase font-bold tracking-widest  border-[rgb(190,190,190)]  Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                        Key Achievements
                      </h2>
                      {awards?.length > 0 ? (
                        awards?.map((award, idx) => (
                          <section key={idx} className="w-full">
                            <SectionAwards
                              colorTitle={"theme1_default_fg_2 theme_fg_2"}
                              colorDates={"text_black font-bold tracking-wide"}
                              colorLocation={"text_black italic"}
                              colorDesc={"text_black"}
                              variant={2}
                              data={award}
                            />
                          </section>
                        ))
                      ) : (
                        <section className="w-full">
                          <SectionAwards
                            colorTitle={"theme1_default_fg_2 theme_fg_2"}
                            colorDates={"text_black font-bold tracking-wide"}
                            colorLocation={"text_black italic"}
                            colorDesc={"text_black"}
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
                    <section className="mx-8 mt-4" id="data_certifications">
                      <h2 className=" w-full text_black uppercase font-bold tracking-widest  border-[rgb(190,190,190)]  Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                        Certificates
                      </h2>
                      {certificates?.length > 0 ? (
                        certificates?.map((certificate, idx) => (
                          <section className="w-full">
                            <SectionCertificates
                              colorTitle={"theme1_default_fg_2 theme_fg_2"}
                              colorDates={"text_black font-bold tracking-wide"}
                              colorLocation={"text_black italic"}
                              colorDesc={"text_black"}
                              variant={2}
                              data={certificate}
                            />
                          </section>
                        ))
                      ) : (
                        <section className="w-full">
                          <SectionCertificates
                            colorTitle={"theme1_default_fg_2 theme_fg_2"}
                            colorDates={"text_black font-bold tracking-wide"}
                            colorLocation={"text_black italic"}
                            colorDesc={"text_black"}
                            variant={2}
                            data={""}
                          />
                        </section>
                      )}
                    </section>
                  )}
                </>
              )}

              {/* technical skills */}

              <section className="w-full mt-4 px-8" id="data_technical_skills">
                <h2 className=" w-full text_black uppercase font-bold tracking-widest  border-[rgb(190,190,190)]  Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                  Technical Skills
                </h2>
                <div
                  className={`skill-tag text_black mt-2 data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial`}
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
                          colorTags={"border-slate-400 border-b"}
                          variant={3}
                          data={skillsArray} // Pass skills as an array
                        />
                      );
                    })
                  ) : (
                    <SectionSkills
                      colorText={"text_black"}
                      colorTags={"border-slate-400 border-b"}
                      variant={3}
                      data={""} // Fallback as an empty array if no skills
                    />
                  )}
                </div>
              </section>

              {/* end technical skills */}

              {/* Soft skills */}
              {resume_sections?.show_soft_skills === 1 && (
                <section className=" w-full mt-4 px-8" id="data_soft_skills">
                  <h2 className=" w-full text_black uppercase font-bold tracking-widest  border-[rgb(190,190,190)]  Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                    Soft Skills
                  </h2>
                  <div
                    className={`skill-tag text_black mt-2 data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial`}
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
                            colorTags={"border-slate-400 border-b"}
                            variant={3}
                            data={skillsArray} // Pass skills as an array
                          />
                        );
                      })
                    ) : (
                      <SectionSkills
                        colorText={"text_black"}
                        colorTags={"border-slate-400 border-b"}
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
                    <section className="mt-4 mx-8" id="data_languages">
                      <h2 className=" w-full text_black uppercase font-bold tracking-widest mb-2 border-[rgb(190,190,190)]  Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                        Languages
                      </h2>
                      <div className="w-[80%]">
                        {languages?.length > 0 ? (
                          languages?.map((language, idx) => (
                            <SectionLanguages
                              key={idx}
                              colorTitle={"text_black"}
                              colorBackground={"bg-slate-300"}
                              colorForeground={"theme1_default_bg_1 theme_bg_1"}
                              variant={6}
                              data={language}
                            />
                          ))
                        ) : (
                          <SectionLanguages
                            colorTitle={"text_black"}
                            colorBackground={"bg-slate-300"}
                            colorForeground={"theme1_default_bg_1 theme_bg_1"}
                            variant={6}
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
                      <section className="mt-4 mx-8">
                        <h2 className=" w-full text_black uppercase font-bold tracking-widest mb-2 border-[rgb(190,190,190)]  Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                          {custom_section.title}
                        </h2>

                        <p className="text_black data-font-name data-font-size-desc-heading default-font-size-desc-heading mt-2 w-full editor_txt">
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
                    <section className="mt-4 mx-8" id="data_references">
                      <h2 className=" w-full text_black uppercase font-bold tracking-widest  border-[rgb(190,190,190)]  Arial data-font-name data-font-size-main-heading default-font-size-main-heading">
                        References
                      </h2>
                      {references?.length > 0 ? (
                        references?.map((ref, idx) => (
                          <section key={idx} className="w-full">
                            <SectionReferences
                              colorTitle={"theme1_default_fg_2 theme_fg_2"}
                              colorDesignation={
                                "theme1_default_fg_2 theme_fg_2"
                              }
                              colorLocation={"theme1_default_fg_1 theme_fg_1"}
                              colorContactInfo={"text_black"}
                              variant={1}
                              data={ref}
                            />
                          </section>
                        ))
                      ) : (
                        <section className="w-full">
                          <SectionReferences
                            colorTitle={"theme1_default_fg_2 theme_fg_2"}
                            colorDesignation={"theme1_default_fg_2 theme_fg_2"}
                            colorLocation={"theme1_default_fg_1 theme_fg_1"}
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
