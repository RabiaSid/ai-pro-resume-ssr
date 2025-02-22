import axios from "axios";
import { data } from "jquery";
import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import Branding from "../../../components/Branding";

const Header = ({
  coverData,
  activeTheme,
  activeFont,
  activeFontSize,
  signature,
}) => {
  const {
    city,
    closer_detail,
    contact_person_designation,
    contact_person_email,
    contact_person_name,
    contact_person_phone,
    country_id,
    email_address,
    employeer_name,
    first_name,
    job_title,
    last_name,
    opener_detail,
    phone_number,
    state,
    street_address,
    zip_code,
    company_name,
    date,
    company_address,
    experience,
    show_personal_information,
  } = coverData;
  console.log("coverData");
  console.log(coverData);

  const formattedDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-indexed
    const year = date.getFullYear();

    // Pad day and month with leading zero if necessary

    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDate = day < 10 ? `0${day}` : day;

    return `${formattedDate}-${formattedMonth}-${year}`;
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

  console.log(experience, "experienceexperienceexperienceexperience");

  return (
    <section
      id="my_template"
      className={`chk_height w-full bg-white min-h-[1308px] relative ${activeTheme} ${activeFont}  ${activeFontSize}`}
    >
      <div className="flex flex-wrap justify-start items-start w-full ">
        {/* header  */}
        <div
          className="flex justify-center items-start flex-wrap py-10 px-10 w-full"
          id="data_profile"
        >
          <h2
            style={{ textShadow: "0 0 1px #022A36" }}
            className="text-[#022A36] Montserrat uppercase font-bold text-xl w-full text-right heading data-font-name"
          >
            {first_name ? first_name : "Your Name"} {last_name ? last_name : ""}
          </h2>
          <p className="text-[#000] Montserrat tracking-wider capitalize text-sm w-full text-right sub_heading data-font-name">
            {job_title ? job_title : "Your Role/Job Postion"}
          </p>
        </div>

        <div
          className="flex justify-between gap-2 items-center flex-wrap py-2 px-10 w-full bg-[#54767C] data-shapes-main "
          id="data_contacts"
        >
          <p className="text-[#fff] flex-shrink-0 Montserrat text-sm flex items-center  justify-center gap-1 sub_heading data-font-name">
            <span className="w-[20px] flex justify-center items-center">
              <MdEmail />
            </span>
            <div className="flex-grow">
              {email_address ? email_address : <>Email</>}
            </div>
          </p>

          <p className="flex-shrink-0 text-[#fff] Montserrat  justify-center text-sm flex items-center gap-1 sub_heading data-font-name">
            <span className="w-[20px] flex justify-center items-center">
              {(street_address ||
                city ||
                state ||
                (country_id !== 0 &&
                  allCountries.find((con) => con.id === country_id)) ||
                zip_code) && <FaLocationDot />}
            </span>
            <div className="break-words flex-grow">
              <>
                {street_address ? `  ${street_address}` : ""}
                {city ? `  ${city},` : ""}
                {state ? `  ${state},` : ""}{" "}
                {country_id !== 0 &&
                  allCountries.find((con) => con.id === country_id)?.name &&
                  ` ${
                    allCountries.find((con) => con.id === country_id)?.name
                  }`}{" "}
                {zip_code ? `${zip_code}` : ""}
              </>
            </div>
          </p>

          <p className="text-[#fff] Montserrat text-sm flex  justify-center items-center gap-1 sub_heading data-font-name">
            <span className="w-[20px] flex justify-center items-center">
              <FaPhoneAlt />
            </span>
            <div>{phone_number ? phone_number : "Phone"}</div>
          </p>
        </div>
        {/* end header  */}

        {/* opener  */}
        <div
          className="flex justify-start items-start flex-wrap mt-10 px-16 w-full"
          id="data_opener"
        >
          <p className="text-[#323433] Montserrat text-base w-full data-font-name">
            {formattedDate(date)}
          </p>
          {show_personal_information ? (
            <>
              <p className="text-[#323433] Montserrat text-base w-full mt-8 data-font-name resume-section-content">
                <b>Dear</b>{" "}
                {contact_person_name ? contact_person_name : "John Doe"}
              </p>

              <p className="text-[rgb(50,52,51)] Montserrat text-base w-full data-font-name resume-section-content">
                {contact_person_designation
                  ? contact_person_designation
                  : "Contact Person Designation"}
              </p>

              <p className="text-[#323433] Montserrat text-base w-full data-font-name resume-section-content ">
                {company_name ? company_name : "Contact Person Company Name"}
              </p>

              <p className="text-[#323433] Montserrat text-base w-full data-font-name resume-section-content ">
                {contact_person_phone
                  ? contact_person_phone
                  : "Contact Person Phone"}
              </p>

              <p className="text-[#323433] Montserrat text-base w-full data-font-name resume-section-content">
                {contact_person_email
                  ? contact_person_email
                  : "Contect Person Email"}
              </p>

              <p className="text-[#323433] Montserrat text-base w-full data-font-name resume-section-content">
                {company_address ? company_address : "Company Address"}
              </p>
            </>
          ) : (
            <>
              <p className="text-[#323433] Montserrat text-base w-full mt-8 data-font-name resume-section-content">
                <b>Dear</b> HR Manager
              </p>
            </>
          )}
        </div>
        {/* end opener  */}

        {/* body  */}

        <div
          className="flex flex-col gap-4 mt-6 px-16 w-full text-[#323433] text-justify resume-section-content"
          id="data_body"
        >
          <p className="text-[#323433] resume-section-content Montserrat text-justify leading-7 text-base w-full mt-2 whitespace-pre-line data-font-name">
            {/* {experience === 0
              ? "Even though I am just starting, my passion and eagerness to learn make me a valuable addition. Ready to bring my fresh perspective and hunger for growth to your team."
              : experience <= 1
                ? "With " +
                experience +
                " year of hands-on experience under my belt, I bring a proven record of accomplishment of success and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives."

              : experience > 10
              ? "With " +
                "10+" +
                " years of hands-on experience under my belt, I bring a proven record of accomplishment of success and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives."
              : "With " +
                experience +
                " years of hands-on experience under my belt, I bring a proven record of accomplishment of success and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives."} */}
            {experience < 1
              ? "Even though I am just starting, my passion and eagerness to learn make me a valuable addition. Ready to bring my fresh perspective and hunger for growth to your team."
              : experience > 1 && experience <= 9
              ? `With ${experience} years of hands-on experience under my belt, I bring a proven record of accomplishment and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives.`
              : experience > 9
              ? "With 10+ years of hands-on experience under my belt, I bring a proven record of accomplishment and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives."
              : `With ${experience} year of hands-on experience under my belt, I bring a proven record of accomplishment and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives.`}
          </p>

          <p
            className="text-[#323433] resume-section-content Montserrat text-justify leading-7 text-base w-full mt-2 whitespace-pre-line data-font-name"
            dangerouslySetInnerHTML={{
              __html: opener_detail
                ? opener_detail
                : "This is your opportunity to introduce yourself to the organization! Share your passion for the position you are applying for to motivate the reader to interview you",
            }}
          />

          {/* <p className="text-[#323433] resume-section-content Montserrat text-justify leading-7 text-base w-full mt-2 whitespace-pre-line data-font-name">
            {closer_detail
              ? closer_detail
              : "Thank you for considering my application. I am excited about the possibility of contributing to [Company Name] and am eager to bring my [specific skills or experiences] to your team. I look forward to the opportunity to further discuss how my background, skills, and certifications will be beneficial to your organization. Please feel free to contact me at [your phone number] or via email at [your email address] to schedule an interview at your earliest convenience. Thank you for your time and consideration."}
          </p> */}
        </div>

        {/* end body  */}

        {/* digital signature  */}
        <div
          className="flex flex-col gap-2 py-10 px-16 w-full"
          id="data_closer"
        >
          <span className="text-[#323433] Montserrat text-justify leading-7 text-base w-full mt-4 whitespace-pre-line data-font-name">
            Sincerely.
          </span>
          {signature ? (
            <div className="w-[200px] h-[100px]">
              {signature.type === "drew" ? (
                <img
                  src={signature.value}
                  alt={"signature"}
                  className="w-full h-full object-fill"
                />
              ) : signature.type === "upload" ? (
                <>
                  {signature.value instanceof File ? (
                    <img
                      src={URL.createObjectURL(signature.value)}
                      alt={"signature"}
                      className="w-full h-full object-fill"
                    />
                  ) : (
                    <img
                      src={signature.value}
                      alt={"signature"}
                      className="w-full h-full object-fill"
                    />
                  )}
                </>
              ) : signature.type === "type" ? (
                <span
                  style={{ textShadow: "0 0 1px #022A36" }}
                  className="text-[#022A36] Montserrat uppercase font-bold text-lg w-full mt-6 data-font-name"
                >
                  {signature.value}
                </span>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </div>
        {/* end digital signature  */}
      </div>
      <Branding left={32} />
    </section>
  );
};

export default Header;
