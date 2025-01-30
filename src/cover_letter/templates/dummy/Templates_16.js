import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { LuMail } from "react-icons/lu";
import { RiHome2Line } from "react-icons/ri";
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
    company_address,
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
    date,
    experience,
    show_personal_information,
    company_name
  } = coverData;

  const formattedDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-indexed
    const year = date.getFullYear();

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
    <section
      id="my_template"
      className={`chk_height w-full bg-white min-h-[1308px] relative ${activeTheme} ${activeFont} ${activeFontSize}`}
    >
      <div className="flex flex-col h-full min-h-[1308px] w-full chk_height">
        {/* Content */}
        <div className="flex flex-col flex-1">
          {/* header */}
          <div className="bg-[#0e2a49] data-shapes-main">
            <div
              className="flex justify-center items-start flex-wrap pt-10 px-10 w-full "
              id="data_profile"
            >
              <h2
                style={{ textShadow: "0 0 1px #022A36" }}
                className="text-[#ff4500] Raleway uppercase text-5xl w-full text-center heading data-font-name font-bold data-headings-fourth"
              >
                {first_name ? first_name : "Your Name"}{" "}
                {last_name ? last_name : ""}
              </h2>
              <p className="text-[white] Raleway tracking-wider capitalize text-lg w-full text-center font-bold sub_heading">
                {job_title ? job_title : "Your Role/Job Position"}
              </p>
            </div>

            <div
              className="flex justify-center items-center py-4 px-16 gap-8 w-full"
              id="data_contacts"
            >
              <div className="flex items-center  w-[33%]">
                <FiPhone size={16} className="text-[white]  mx-4" />
                <p className="text-[white] Raleway text-sm sub_heading ">
                  {phone_number ? phone_number : "Phone"}
                </p>
              </div>
              <div className="flex  items-center  w-[33%]">
                <LuMail
                  size={16}
                  className="text-[white]  mx-4 flex-shrink-0"
                />
                <p className="text-[white] Raleway text-sm sub_heading  break-all">
                  {email_address ? email_address : "Email"}
                </p>
              </div>
              {street_address ||
                city ||
                state ||
                zip_code ||
                allCountries.find((con) => con.id === country_id)?.name ? (
                allCountries.find((con) => con.id === country_id)?.name !==
                  "Empty" ? (
                  <div className="flex w-[33%] items-center ">
                    <RiHome2Line
                      size={16}
                      className="text-[white]  mx-4 flex-shrink-0"
                    />
                    <p className="text-[white] Raleway text-sm sub_heading  ">
                      {street_address}
                      {city && (street_address ? `, ${city} ` : city)}
                      {state &&
                        (street_address || city ? `, ${state} ` : state)}
                      {zip_code &&
                        (street_address || city || state
                          ? `, ${zip_code}`
                          : zip_code)}
                      {(street_address || city || state || zip_code) &&
                        allCountries.find((con) => con.id === country_id)?.name !=
                        "Empty"
                        ? `, ${allCountries.find((con) => con.id === country_id)
                          ?.name
                        }`
                        : allCountries.find((con) => con.id === country_id)
                          ?.name || ""}{" "}
                    </p>
                  </div>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
          </div>
          {/* end header */}

          {/* Opener */}
          {show_personal_information && (
            <div
              className="flex justify-between items-start flex-wrap mt-16 px-16 w-full"
              id="data_opener"
            >
              <div className="w-[70%] resume-section-content">
                <p className="text-[black] Raleway  text-base data-font-name font-bold">
                  Dear, <br />
                  {contact_person_name ? contact_person_name : "John Doe"}
                </p>
                <p className="text-[black] Raleway text-base mt-2 data-font-name">
                  {contact_person_designation
                    ? contact_person_designation
                    : "Contact Person Designation"}
                </p>
                <p className="text-[black] Raleway text-base mt-2 data-font-name">
                  {company_name
                    ? company_name
                    : "Contact Person Company Name"}
                </p>
              </div>
              <div className="w-[30%] text-left resume-section-content">
                <p className="text-[black] Raleway text-base data-font-name font-bold">
                  {formattedDate(date)}
                </p>
                <p className="text-[black] Raleway text-base mt-2 data-font-name flex justify-start items-center">
                  <FaPhoneAlt size={16} className="text-[black] mr-3 " />
                  <span>
                    {contact_person_phone
                      ? contact_person_phone
                      : "Contact Person Phone"}
                  </span>
                </p>
                <p className="text-[black] Raleway text-base mt-2 data-font-name flex justify-start items-center">
                  <FaEnvelope
                    size={16}
                    className="text-[black] mr-3 flex-shrink-0"
                  />
                  <span className="flex-grow break-all">
                    {contact_person_email
                      ? contact_person_email
                      : "Contact Person Email"}
                  </span>
                </p>
                <p className="text-[black] Raleway text-base mt-2 data-font-name flex justify-start items-center">
                  <FaMapMarkerAlt
                    size={16}
                    className="text-[black] mr-3 flex-shrink-0"
                  />
                  <span className="flex-grow break-all">
                    {company_address ? company_address : "Company Address"}
                  </span>
                </p>
              </div>
            </div>
          )}

          {/* Body */}
          <div
            className="flex resume-section-content flex-col gap-4 pt-10 px-16 w-full"
            id="data_body"
          >
            <p className="text-[black] resume-section-content Raleway text-justify leading-7 text-base w-full whitespace-pre-line data-font-name">
              {experience < 1
                ? "Even though I am just starting, my passion and eagerness to learn make me a valuable addition. Ready to bring my fresh perspective and hunger for growth to your team."
                : experience > 1 && experience <= 9
                  ? `With ${experience} years of hands-on experience under my belt, I bring a proven record of accomplishment and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives.`
                  : experience > 9
                    ? "With 10+ years of hands-on experience under my belt, I bring a proven record of accomplishment and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives."
                    : `With ${experience} year of hands-on experience under my belt, I bring a proven record of accomplishment and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives.`}            </p>

            <p
              className="text-[black] resume-section-content Raleway text-justify leading-7 text-base w-full whitespace-pre-line data-font-name"
              dangerouslySetInnerHTML={{
                __html: opener_detail
                  ? opener_detail
                  : "This is your opportunity to introduce yourself to the organization! Share your passion for the position you are applying for to motivate the reader to interview you",
              }}
            />
            {/* <p className="text-[black] resume-section-content Raleway text-justify leading-7 text-base w-full whitespace-pre-line data-font-name">
              {closer_detail
                ? closer_detail
                : `Thank you for considering my application. I am excited about the possibility of contributing to [Company Name] and am eager to bring my [specific skills or experiences] to your team. I look forward to the opportunity to further discuss how my background, skills, and certifications will be beneficial to your organization. Please feel free to contact me at [your phone number] or via email at [your email address] to schedule an interview at your earliest convenience. Thank you for your time and consideration.`}
            </p> */}
          </div>

          {/* Signature */}
          <div className="flex gap-2 Raleway flex-col py-8 px-16 w-full data-font-name">
            <span> Sincerely.</span>
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
                    className="text-[black] Kanit text-2xl w-full data-font-name"
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
        </div>
      </div>
      <Branding left={32} />
    </section>
  );
};

export default Header;
