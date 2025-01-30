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
      <div className="chk_height flex flex-col h-full min-h-[1308px] w-full border-l-[24px] border-[#aa7a5b] data-headings-border">
        {/* Content */}

        <div className="flex flex-col flex-1 text-left">
          {/* header  */}
          <div className="bg-[white]  px-10 py-10">
            <div className="flex justify-between items-center">
              <div className="">
                <h2
                  style={{ textShadow: "0 0 1px #022A36" }}
                  className="text-[black] Lato text-5xl heading data-font-name font-bold pr-4"
                >
                  {first_name ? first_name : "Your Name"}{" "}
                  {last_name ? last_name : ""}
                </h2>

                <p className="text-[black] Lato tracking-wider data-font-name text-lg  sub_heading font-bold">
                  {job_title ? job_title : "Your Role/Job Position"}
                </p>
              </div>
              <div className="w-[30%] ">
                <p className="text-[black] text-center data-font-name Lato text-md flex sub_heading items-center mb-4">
                  <FiPhone
                    size={16}
                    className="mr-2 text-[black]  min-w-[16px] flex-shrink-0"
                  />
                  <div className="">
                    {phone_number ? phone_number : "Phone"}
                  </div>
                </p>
                <p className="text-[black] Lato text-md flex data-font-name items-center sub_heading mb-4">
                  <LuMail
                    size={16}
                    className="mr-2 text-[black] min-w-[16px] flex-shrink-0"
                  />
                  <div className="flex-grow break-all">
                    {email_address ? email_address : "Email"}
                  </div>
                </p>
                {street_address ||
                  city ||
                  state ||
                  zip_code ||
                  allCountries.find((con) => con.id === country_id)?.name ? (
                  allCountries.find((con) => con.id === country_id)?.name !==
                    "Empty" ? (
                    <p className="text-[black] Lato text-md flex items-center sub_heading data-font-name mb-4">
                      <RiHome2Line
                        size={16}
                        className="mr-2 text-[black] min-w-[16px] flex-shrink-0"
                      />
                      <div className=" flex-grow">
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
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          {/* end header */}

          {/* opener */}
          <div className="flex justify-between items-start flex-wrap mt-10 px-16 w-full">
            <div className="w-[70%] resume-section-content">
              <p className="text-[black] Lato text-base data-font-name font-bold">
                Dear,<br></br>{" "}
                {contact_person_name ? contact_person_name : "John Doe"}
              </p>
              <p className="text-[black] Lato text-base mt-2 data-font-name">
                {contact_person_designation
                  ? contact_person_designation
                  : "Contact Person Designation"}
              </p>
              <p className="text-[black] Lato text-base mt-2 data-font-name">
                {company_name
                  ? company_name
                  : "Contact Person Company Name"}
              </p>
            </div>

            <div className="w-[30%] resume-section-content">
              <p className="text-[black] Lato text-base data-font-name font-bold ">
                {formattedDate(date)}
              </p>
              <p className="text-[black] Lato text-base data-font-name flex justify-start items-center mt-2">
                <FaPhoneAlt
                  size={16}
                  className="text-[black] mr-2 min-w-[12px]"
                />
                <span className="break-all">
                  {contact_person_phone
                    ? contact_person_phone
                    : "Contact Person Phone"}
                </span>
              </p>
              <p className="text-[black] Lato text-base data-font-name flex justify-start items-center mt-2">
                <FaEnvelope
                  size={16}
                  className="text-[black] mr-2 min-w-[12px] flex-shrink-0"
                />
                <span className="break-all flex-grow">
                  {contact_person_email
                    ? contact_person_email
                    : "Contact Person Email"}
                </span>
              </p>
              <p className="text-[black] Lato text-base data-font-name flex justify-start items-center mt-2">
                <FaMapMarkerAlt
                  size={16}
                  className="text-[black] mr-2 min-w-[12px] flex-shrink-0"
                />
                <span className="break-all flex-grow ">
                  {company_address ? company_address : "Company Address"}
                </span>
              </p>
            </div>
          </div>
          {/* end opener */}

          {/* body */}
          <div
            className="flex resume-section-content flex-col gap-4 mt-6 px-16 w-full"
            id="data_body"
          >
            <p className="text-[black] resume-section-content Lato text-justify leading-7 text-base w-full whitespace-pre-line data-font-name">
              {experience < 1
                ? "Even though I am just starting, my passion and eagerness to learn make me a valuable addition. Ready to bring my fresh perspective and hunger for growth to your team."
                : experience > 1 && experience <= 9
                  ? `With ${experience} years of hands-on experience under my belt, I bring a proven record of accomplishment and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives.`
                  : experience > 9
                    ? "With 10+ years of hands-on experience under my belt, I bring a proven record of accomplishment and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives."
                    : `With ${experience} year of hands-on experience under my belt, I bring a proven record of accomplishment and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives.`}            </p>

            <p
              className="text-[black] resume-section-content Lato text-justify leading-7 text-base w-full whitespace-pre-line data-font-name"
              dangerouslySetInnerHTML={{
                __html: opener_detail
                  ? opener_detail
                  : "This is your opportunity to introduce yourself to the organization! Share your passion for the position you are applying for to motivate the reader to interview you",
              }}
            />

            {/* <p className="text-[black] resume-section-content Lato text-justify leading-7 text-base w-full whitespace-pre-line data-font-name">
              {closer_detail
                ? closer_detail
                : `Thank you for considering my application. I am excited about the possibility of contributing to [Company Name] and am eager to bring my [specific skills or experiences] to your team. I look forward to the opportunity to further discuss how my background, skills, and certifications will be beneficial to your organization. Please feel free to contact me at [your phone number] or via email at [your email address] to schedule an interview at your earliest convenience. Thank you for your time and consideration.`}
            </p> */}
          </div>
          {/* end body */}

          {/* Signature */}
          <div className="flex Lato gap-2 flex-col py-8 px-16 w-full data-font-name">
            <span> Sincerely,</span>
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
          {/* end body  */}
          <Branding left={48} />
        </div>
      </div>
    </section>
  );
};

export default Header;
