import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
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
    const month = date.getMonth() + 1;
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
      <div className="relative w-full h-[100px] flex">
        <div
          style={{
            clipPath: "polygon(0% 0%, 100% 0%, 0 100%)", // Triangle from bottom-left to top-right
          }}
          className="bg-[#122a5e] w-[50%] h-[160px] absolute data-shapes-main"
        ></div>

        <div
          style={{
            clipPath: "polygon(100% 0, 0 0, 100% 100%)", // Triangle from top-right to bottom-left
          }}
          className="bg-[#bbd8f3] w-[50%] h-[160px] absolute right-0 data-shapes-inner"
        ></div>
      </div>

      <div className="flex flex-col h-full  w-full">
        {/* Content */}
        <div className="flex flex-col flex-1 text-justify">
          {/* header  */}

          <div className="bg-[white]">
            <div
              className="flex justify-center items-start flex-wrap pt-10 pb-4 px-16 w-full "
              id="data_profile"
            >
              <h2
                style={{ textShadow: "0 0 1px #022A36" }}
                className="text-[black] Kanit uppercase text-6xl w-full text-center font-bold heading data-font-name data-headings-primary"
              >
                {first_name ? first_name : "Your Name"}{" "}
                {last_name ? last_name : ""}
              </h2>
              <p className="text-[black] Kanit tracking-wider capitalize text-lg w-full text-center font-bold sub_heading">
                {job_title ? job_title : "Your Role/Job Position"}
              </p>
            </div>

            <div
              className="flex justify-center flex-wrap gap-10 px-16 "
              id="data_contacts"
            >
              <p className="text-[black] justify-center Kanit text-sm flex items-center sub_heading">
                <FiPhone
                  size={18}
                  className="mr-4 text-[black] flex-shrink-0"
                />
                <div>{phone_number ? phone_number : "Phone"}</div>
              </p>
              <p className="text-[black] justify-center Kanit text-sm flex items-center sub_heading">
                <LuMail size={18} className="mr-4 text-[black] flex-shrink-0" />
                <div className="flex-grow break-all">
                  {email_address ? email_address : "Email"}
                </div>
              </p>
            </div>

            {street_address ||
              city ||
              state ||
              zip_code ||
              allCountries.find((con) => con.id === country_id)?.name ? (
              allCountries.find((con) => con.id === country_id)?.name !==
                "Empty" ? (
                <p className="text-[black] Kanit justify-center text-sm flex items-center sub_heading w-[50%] m-auto border-[black] border-b-2 mt-4">
                  <RiHome2Line
                    size={18}
                    className="mr-4 text-[black] flex-shrink-0"
                  />
                  <div className="">
                    {street_address}
                    {city && (street_address ? `, ${city} ` : city)}
                    {state && (street_address || city ? `, ${state} ` : state)}
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
                  </div>
                </p>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
          {/* end header  */}
          {show_personal_information ? (
            <>
              {/* opener  */}
              <div
                className="flex justify-between items-start flex-wrap mt-4 px-16 w-full"
                id="data_opener"
              >
                {/* Left section: Name, Designation, Company Name */}
                <div className="w-[70%] resume-section-content">
                  <p className="text-[black] Kanit text-base data-font-name">
                    {formattedDate(date)}
                  </p>

                  <p className="text-[black] Kanit text-xl data-font-name font-bold">
                    Dear{" "}
                    {contact_person_name ? contact_person_name : "John Doe"}
                  </p>
                  <p className="text-[black] Kanit text-base mt-2 data-font-name">
                    {contact_person_designation
                      ? contact_person_designation
                      : "Contact Person Designation"}
                  </p>
                  <p className="text-[black] Kanit text-base mt-2 data-font-name">
                    {company_name
                      ? company_name
                      : "Contact Person Company Name"}
                  </p>
                </div>

                {/* Right section: Date, Company Address, Email, Phone */}
                <div className="w-[30%] resume-section-content text-left mt-[15px]">
                  <p className="text-[black]  Kanit text-base mt-2 data-font-name flex justify-start items-center ">
                    <FiPhone
                      size={16}
                      className="text-[black]  mr-2 min-w-[16px]"
                    />
                    <span className="break-all">
                      {contact_person_phone
                        ? contact_person_phone
                        : "Contact Person Phone"}
                    </span>
                  </p>
                  <p className="text-[black]  Kanit text-base mt-2 data-font-name flex justify-start items-center ">
                    <LuMail
                      size={16}
                      className="text-[black]  mr-2 min-w-[16px]"
                    />
                    <span className="break-all">
                      {contact_person_email
                        ? contact_person_email
                        : "Contact Person Email"}
                    </span>
                  </p>
                  <p className="text-[black]  Kanit text-base mt-2 data-font-name flex justify-start items-center">
                    <RiHome2Line
                      size={16}
                      className="text-[black]  mr-2 min-w-[16px]"
                    />
                    <span className="break-all">
                      {company_address ? company_address : "Company Address"}
                    </span>
                  </p>
                </div>
              </div>
              {/* end opener  */}
            </>
          ) : (
            <>
              <div
                className="flex justify-between resume-section-content flex-row items-start  mt-16 px-16 w-full"
                id="data_opener"
              >
                <p className="text-[black] Kanit text-base w-full data-font-name">
                  Dear HR Manager
                </p>
                <p className="text-[black] Kanit text-base w-full text-right data-font-name">
                  {formattedDate(date)}
                </p>
              </div>
            </>
          )}

          {/* body  */}
          <div
            className="flex flex-col resume-section-content gap-4 mt-10 px-16 w-full"
            id="data_body"
          >
            <p className="text-[black] resume-section-content Kanit text-justify leading-7 text-base w-full whitespace-pre-line data-font-name">
              {experience < 1
                ? "Even though I am just starting, my passion and eagerness to learn make me a valuable addition. Ready to bring my fresh perspective and hunger for growth to your team."
                : experience > 1 && experience <= 9
                  ? `With ${experience} years of hands-on experience under my belt, I bring a proven record of accomplishment and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives.`
                  : experience > 9
                    ? "With 10+ years of hands-on experience under my belt, I bring a proven record of accomplishment and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives."
                    : `With ${experience} year of hands-on experience under my belt, I bring a proven record of accomplishment and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives.`}            </p>

            <p
              className="text-[black] resume-section-content Kanit text-justify leading-7 text-base w-full whitespace-pre-line data-font-name"
              dangerouslySetInnerHTML={{
                __html: opener_detail
                  ? opener_detail
                  : "This is your opportunity to introduce yourself to the organization! Share your passion for the position you are applying for to motivate the reader to interview you",
              }}
            />

            {/* <p className="text-[black] resume-section-content Kanit text-justify leading-7 text-base w-full whitespace-pre-line data-font-name">
              {closer_detail
                ? closer_detail
                : `Thank you for considering my application. I am excited about the possibility of contributing to [Company Name] and am eager to bring my [specific skills or experiences] to your team. I look forward to the opportunity to further discuss how my background, skills, and certifications will be beneficial to your organization. Please feel free to contact me at [your phone number] or via email at [your email address] to schedule an interview at your earliest convenience. Thank you for your time and consideration.`}
            </p> */}
          </div>
          <br></br>
          {/* Signature */}
          <div className="flex Kanit gap-2 flex-col  px-16 w-full data-font-name">
            <span> Sincerely.</span>
            {signature ? (
              <div className="w-[200px] h-[100px] Kanit">
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
          <Branding left={32} />
          {/* end body  */}
        </div>
      </div>
    </section>
  );
};

export default Header;
