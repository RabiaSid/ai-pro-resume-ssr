import axios from "axios";
import React, { useEffect, useState } from "react";
import placeholderImageUser from "../../../assets/images/reusme_placeholder_image.webp";
import Branding from "../../../components/Branding";

const Template_31 = ({
  resumeData,
  activeTheme,
  activeFont,
  activeFontSize,
}) => {
  const {
    first_name,
    last_name,
    image_url,
    profile_image,
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

  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    axios
      .get(global.baseurl + "/show-countries")
      .then((data) => {
        if (data) {
          setAllCountries(data.data?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div
      className={`p-2 bg-white rounded-lg relative ${activeFont + " " + activeFontSize + " " + activeTheme
        }`}
    >
      {/* Header */}
      <header className="text-center mb-6">
        <div>
          {profile_image instanceof File ? (
            <img
              src={`${URL.createObjectURL(profile_image)}`}
              width={140}
              height={140}
              className="rounded-full w-[140px] h-[140px] m-auto border-2 border-black"
              alt="profile"
            />
          ) : profile_image ? (
            <img
              src={`${image_url + "/" + profile_image}`}
              width={140}
              height={140}
              className="rounded-full w-[140px] h-[140px] m-auto border-2 border-black"
              alt="profile"
            />
          ) : (
            <img
              src={`${placeholderImageUser}`}
              id="unused_image"
              width={140}
              height={140}
              className="rounded-full w-[140px] h-[140px] m-auto border-2 border-black"
              alt="profile"
            />
          )}
        </div>
        <h1 className="text-4xl font-bold data-headings-main data-font-name">
          {first_name} {last_name}
        </h1>
        <p className="text-lg text-gray-700 data-font-name">{job_title}</p>
      </header>
      {/* Main */}
      <div className="flex gap-2">
        {/* section 1 */}
        <div className="flex-1">
          {/* Summary */}
          <section className="mb-6 data-font-name">
            <h2 className="text-2xl font-semibold mb-2 data-headings-main data-font-size">
              Summary
            </h2>
            <p className="text-gray-600 data-font-size">{summary}</p>
          </section>

          {/* Experience */}
          <section className="mb-6 data-font-name ">
            <h2 className="text-2xl font-semibold mb-2 data-headings-main data-font-size">
              Experience
            </h2>
            {experiences?.map((exp, idx) => (
              <div key={idx}>
                <div className="mb-4 ">
                  <h3 className="text-xl font-bold ">{exp.job_position}</h3>
                  <p className="text-gray-600 ">
                    <span className="font-semibold ">{exp.company_name}</span> -
                    {formattedDate(exp.start_date)} -{" "}
                    {exp.currently_working === 0
                      ? formattedDate(exp.end_date)
                      : "Present"}
                  </p>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: exp.job_description,
                    }}
                  />
                </div>
              </div>
            ))}
          </section>

          {/* Education */}
          <section className="data-font-name">
            <h2 className="text-2xl font-semibold mb-2 data-headings-main data-font-size">
              Education
            </h2>
            {education?.map((edu, idx) => (
              <div className="mb-4" key={idx}>
                <h3 className="text-xl font-bold">
                  {edu.degree ? edu.degree : ""}{" "}
                  {edu.field ? "in " + edu.field : ""}
                </h3>
                <p className="text-gray-600">
                  <span className="font-semibold">{edu.institution}</span> -
                  {formattedDate(edu.start_date)} -{" "}
                  {edu.currently_studying === 0
                    ? formattedDate(edu.end_date)
                    : "Present"}
                </p>
                <p className="text-gray-600">
                  {edu.grade_type
                    ? edu.grade_type +
                    " : " +
                    edu.grade +
                    (edu.grade_type === "percentage" ? "%" : "")
                    : ""}
                </p>
              </div>
            ))}
          </section>
          {/* Custom Section */}
          {custom_sections?.length > 0
            ? custom_sections
              ?.filter((custom_section) => custom_section.is_show)
              .map((custom_section, idx) => (
                <section key={idx} className="data-font-name">
                  <h2 className="text-2xl font-semibold mb-2 data-headings-main data-font-name data-font-size">
                    {custom_section.title}
                  </h2>

                  <div className="mb-4" key={idx}>
                    <p
                      className="text-gray-600 data-font-size"
                      dangerouslySetInnerHTML={{
                        __html: custom_section.detail,
                      }}
                    />
                  </div>
                </section>
              ))
            : ""}
          {/* certificates */}
          <section className="data-font-name">
            <h2 className="text-2xl font-semibold mb-2 data-headings-main data-font-size">
              Certificates
            </h2>
            {certificates?.map((cer, idx) => (
              <div className="mb-4" key={idx}>
                <h3 className="text-xl font-bold">
                  {cer.date && (
                    <div className="text-[#000] w-[50%] text-sm py-1">
                      {formattedDate(cer.date)}
                    </div>
                  )}
                </h3>
                <p className="text-gray-600">
                  <span className="font-semibold">{cer.title}</span> -
                  {cer.institute}
                </p>

                <p
                  className="text-gray-600"
                  dangerouslySetInnerHTML={{
                    __html: cer.description,
                  }}
                />
              </div>
            ))}
          </section>
        </div>
        {/* section 2 */}
        <div className="w-[300px] bg-green-300 p-2 data-shapes-inner">
          {/* Contact Information */}
          <section className="mb-6 data-headings-sixth data-font-name">
            <h2 className="text-2xl font-semibold mb-2 data-headings-sixth data-font-size">
              Contact Information
            </h2>
            <ul className="list-disc list-inside text-gray-600 data-headings-sixth">
              <li>
                <span className="font-semibold">Email:</span> {email_address}
              </li>
              <li>
                <span className="font-semibold">Phone:</span>{" "}
                {phone_number || contact_number ? (
                  <>
                    {phone_number ? phone_number : ""}
                    {phone_number && contact_number ? <br /> : ""}
                    {contact_number ? contact_number : ""}
                  </>
                ) : (
                  "Enter Your Phone Number"
                )}
              </li>
              <li>
                <span className="font-semibold">Website:</span> {website}
              </li>
            </ul>
          </section>
          {/* Tech Skills */}
          <section className="mb-6 data-font-name">
            <h2 className="text-2xl font-semibold mb-2 data-headings-sixth data-font-size">
              Tech Skills
            </h2>
            <ul className="list-disc list-inside text-gray-600 data-headings-sixth">
              {technical_skills?.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          </section>
          {/* Tech Skills */}
          <section className="mb-6 data-headings-sixth data-font-name">
            <h2 className="text-2xl font-semibold mb-2 data-font-size">
              Soft Skills
            </h2>
            <ul className="list-disc list-inside text-gray-600 data-headings-sixth">
              {soft_skills?.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          </section>
          {/* awards */}
          <section className="data-headings-sixth data-font-name">
            <h2 className="text-2xl font-semibold mb-2 data-font-size">
              Awards
            </h2>
            {awards?.map((award, idx) => (
              <div className="mb-4" key={idx}>
                <h3 className="text-xl font-bold">
                  {award.date && (
                    <div className="text-[#000] data-headings-sixth w-[50%] text-sm py-2">
                      {formattedDate(award.date)}
                    </div>
                  )}
                </h3>
                <p className="text-gray-600 data-headings-sixth">
                  <span className="font-semibold">{award.name}</span> -
                  {award.body}
                </p>

                <p
                  className="text-gray-600 data-headings-sixth"
                  dangerouslySetInnerHTML={{
                    __html: award.description,
                  }}
                />
              </div>
            ))}
          </section>
          {/* Languages */}
          <section className="mb-6 data-headings-sixth data-font-name">
            <h2 className="text-2xl font-semibold mb-2 data-font-size">
              Languages
            </h2>
            <ul className="list-disc list-inside text-gray-600 data-headings-sixth">
              {languages?.map((lang, idx) => (
                <li key={idx}>
                  {lang.name} {`( ${lang.level?.name} )`}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <Branding left={2} bottom={4} />
    </div>
  );
};

export default Template_31;
