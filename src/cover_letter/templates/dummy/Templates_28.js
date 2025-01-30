import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
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
    company_name,
    show_personal_information,
  } = coverData;

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

  return (
    <section
      id="my_template"
      className={`chk_height w-full bg-white min-h-[1308px] relative ${activeTheme} ${activeFont} ${activeFontSize}`}
    >
      <div className="flex flex-row h-full min-h-[1308px] w-full chk_height">
        {/* Left Red Border */}
        <div className="bg-[#cacaca] w-[150px] h-[400px] absolute right-0 top-0 rounded-bl-3xl data-shapes-main"></div>

        {/* Content */}
        <div className="flex flex-col flex-1 text-left border-l-2 border-[#cacaca] ml-[7%] pl-5 pr-16 py-20 data-headings-border-2">
          {/* Header */}

          <div className="flex justify-between items-center">
            <div className="w-[80%]">
              <h2
                style={{ textShadow: "0 0 1px #022A36" }}
                className="text-[#4b4b4b] Roboto text-5xl heading data-font-name font-bold data-headings-primary"
              >
                {first_name ? first_name : "Your Name"}{" "}
                {last_name ? last_name : ""}
              </h2>
              <p className="text-[#4b4b4b] Roboto tracking-wider text-lg sub_heading font-bold">
                {job_title ? job_title : "Your Role/Job Position"}
              </p>
            </div>
          </div>
          <div className="flex justify-start items-center gap-2 mt-4">
            <div className="border-t-1 border-b-2 border-solid border-[#443B3B] data-headings-border-2 w-10"></div>
            <p className="text-[#4b4b4b] Roboto text-base data-font-name font-bold data-headings-primary">
              {formattedDate(date)}
            </p>
          </div>
          {/* End Header */}

          <div className="flex flex-col mt-10">
            <p className="text-[#4b4b4b] resume-section-content Roboto text-base data-font-name font-bold data-headings-primary">
              Dear {contact_person_name ? contact_person_name : "John Doe"}
            </p>
            <p className="text-[#4b4b4b] resume-section-content Roboto text-base mt-2 data-font-name">
              {contact_person_designation
                ? contact_person_designation
                : "Contact Person Designation"}
            </p>
            <p className="text-[#4b4b4b] resume-section-content Roboto text-base mt-2 data-font-name">
              {company_name ? company_name : "Contact Person Company Name"}
            </p>
            <p className="text-[#4b4b4b] Roboto resume-section-content text-base mt-2 data-font-name flex justify-start items-center">
              <span>
                {contact_person_phone
                  ? contact_person_phone
                  : "Contact Person Phone"}
              </span>
            </p>
            <p className="text-[#4b4b4b] Roboto resume-section-content text-base mt-2 data-font-name flex justify-start items-center">
              {contact_person_email
                ? contact_person_email
                : "Contact Person Email"}
            </p>
            <p className="text-[#4b4b4b] Roboto resume-section-content text-base mt-2 data-font-name flex justify-start items-center">
              {company_address ? company_address : "Company Address"}
            </p>
          </div>

          {/* Body */}
          <div
            className="flex resume-section-content flex-col gap-4 mt-6 w-full"
            id="data_body"
          >
            <p className="text-[#4b4b4b] resume-section-content Roboto text-justify leading-7 text-base w-full whitespace-pre-line data-font-name">
              {experience < 1
                ? "Even though I am just starting, my passion and eagerness to learn make me a valuable addition. Ready to bring my fresh perspective and hunger for growth to your team."
                : experience > 1 && experience <= 9
                  ? `With ${experience} years of hands-on experience under my belt, I bring a proven record of accomplishment and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives.`
                  : experience > 9
                    ? "With 10+ years of hands-on experience under my belt, I bring a proven record of accomplishment and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives."
                    : `With ${experience} year of hands-on experience under my belt, I bring a proven record of accomplishment and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives.`}          </p>

            <p
              className="text-[#4b4b4b] resume-section-content Roboto text-justify leading-7 text-base w-full whitespace-pre-line data-font-name"
              dangerouslySetInnerHTML={{
                __html: opener_detail
                  ? opener_detail
                  : "This is your opportunity to introduce yourself to the organization! Share your passion for the position you are applying for to motivate the reader to interview you",
              }}
            />

            {/* <p className="text-[#4b4b4b] resume-section-content Roboto text-justify leading-7 text-base w-full whitespace-pre-line data-font-name">
              {closer_detail
                ? closer_detail
                : `Thank you for considering my application. I am excited about the possibility of contributing to [Company Name] and am eager to bring my [specific skills or experiences] to your team. I look forward to the opportunity to further discuss how my background, skills, and certifications will be beneficial to your organization. Please feel free to contact me at [your phone number] or via email at [your email address] to schedule an interview at your earliest convenience. Thank you for your time and consideration.`}
            </p> */}
          </div>
          {/* End Body */}
          <br></br>
          {/* Signature */}
          <div className="flex  w-full data-font-name">
            <div className="flex flex-col gap-2 w-[50%]">
              <span className="text-base text-[#4b4b4b] font-bold">
                Sincerely
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
                      className="text-[#4b4b4b] Kanit text-2xl w-full data-font-name"
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
            <div className="w-[50%] flex flex-col text-start">
              <p className="text-[#4b4b4b] text-md flex items-center sub_heading mt-4">
                <FaPhoneAlt
                  size={14}
                  className="mr-2 text-[#4b4b4b] data-headings-primary flex-shrink-0"
                />
                <div>{phone_number ? phone_number : "Phone"}</div>
              </p>

              <p className="text-[#4b4b4b] text-md flex items-center sub_heading mt-4">
                <FaEnvelope
                  size={14}
                  className="mr-2 text-[#4b4b4b] data-headings-primary flex-shrink-0"
                />
                <div className="break-all">
                  {email_address ? email_address : "Email"}
                </div>
              </p>

              {street_address ||
                city ||
                state ||
                zip_code ||
                allCountries.find((con) => con.id === country_id)?.name
                ? allCountries.find((con) => con.id === country_id)?.name !==
                "Empty" && (
                  <p className="text-[#4b4b4b] text-md flex items-center sub_heading mt-4">
                    <FaMapMarkerAlt
                      size={14}
                      className="mr-2 text-[#4b4b4b] data-headings-primary flex-shrink-0"
                    />
                    <div className="">
                      {street_address}
                      {city && (street_address ? `, ${city} ` : city)}
                      {state &&
                        (street_address || city ? `, ${state} ` : state)}
                      {zip_code &&
                        (street_address || city || state
                          ? `, ${zip_code}`
                          : zip_code)}
                      {(street_address || city || state || zip_code) &&
                        allCountries.find((con) => con.id === country_id)
                          ?.name != "Empty"
                        ? `, ${allCountries.find((con) => con.id === country_id)
                          ?.name
                        }`
                        : allCountries.find((con) => con.id === country_id)
                          ?.name || ""}{" "}
                    </div>
                  </p>
                )
                : ""}
            </div>
          </div>
          {/* End Signature */}
          <Branding left="auto" right={24} />
        </div>
      </div>
    </section >
  );
};

export default Header;
