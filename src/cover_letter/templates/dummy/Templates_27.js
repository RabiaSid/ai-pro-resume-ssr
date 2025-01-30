import axios from "axios";
import { data } from "jquery";
import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
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
    date,
    company_address,
    experience,
    show_personal_information,
    company_name,
  } = coverData;

  console.log(show_personal_information);

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
      className={`chk_height w-full bg-white min-h-[1308px] relative ${activeTheme} ${activeFont}  ${activeFontSize}`}
    >
      <div className="flex flex-wrap justify-start items-start w-full text-justify">
        {/* header  */}
        <div className=" w-full">
          <div className="flex justify-start items-start">
            <div
              className="flex justify-center items-start flex-wrap py-10  px-16 w-[70%]"
              id="data_profile"
            >
              <h2
                style={{ textShadow: "0 0 1px #022A36" }}
                className="text-[black] Manrope uppercase font-bold text-5xl w-full text-left heading data-font-name data-headings-main"
              >
                {first_name ? first_name : "Your Name"}{" "}
                {last_name ? last_name : ""}
              </h2>
              <p className="text-[#000] Manrope tracking-wider uppercase text-lg font-bold w-full text-left sub_heading data-font-name ">
                {job_title ? job_title : "Your Role/Job Postion"}
              </p>
            </div>
            <div
              className="flex justify-end items-end flex-wrap py-10  w-[20%]"
              id="data_profile"
            >
              <div className="w-[100px] h-[100px] border-2 border-[black]  flex items-center justify-center rounded-md">
                <div className="text-5xl Manrope font-bold text-black flex data-headings-main">
                  {last_name ? (
                    <>
                      <div className="mb-5 uppercase">
                        {" "}
                        {first_name ? first_name[0] : "Your Name"}{" "}
                      </div>
                      <div className="mt-5 uppercase">
                        {" "}
                        {last_name ? last_name[0] : ""}
                      </div>
                    </>
                  ) : (
                    <div className="text-center uppercase">
                      {" "}
                      {first_name ? first_name[0] : "Your Name"}{" "}
                    </div>
                  )}
                </div>
              </div>
              <p className="text-[black] Manrope text-base w-full data-font-name font-bold flex items-center justify-end px-1">
                {formattedDate(date)}
              </p>
            </div>
          </div>
          <div
            className="flex justify-evenly gap-2 items-center flex-wrap w-full px-16 pb-5"
            id="data_contacts"
          >
            <p className="text-[black] Manrope text-sm flex justify-center items-center gap-1 sub_heading data-font-name">
              <span className="mr-2 flex justify-center items-center">
                <FaPhoneAlt
                  size={18}
                  className="text-[black] data-headings-main flex-shrink-0"
                />
              </span>
              <div>{phone_number ? phone_number : "Phone"}</div>
            </p>

            <p className="text-[black] Manrope text-sm flex items-center justify-center gap-1 sub_heading data-font-name">
              <span className="mr-2 flex justify-center items-center">
                <MdEmail
                  size={18}
                  className="text-[black] data-headings-main flex-shrink-0"
                />
              </span>
              <div className="break-all">
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
                <p className="flex-shrink-0 text-[black] Manrope text-sm flex items-center gap-1 sub_heading data-font-name">
                  <span className="mr-2 flex justify-center items-center">
                    <FaLocationDot
                      size={18}
                      className="text-[black] data-headings-main flex-shrink-0"
                    />
                  </span>
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
        </div>
        {/* end header  */}

        {/* opener  */}
        <div
          className="flex justify-start items-start flex-wrap mb-5 px-16 w-full"
          id="data_opener"
        >
          <div className="bg-[black] w-full h-[0.15rem] mb-4 flex justify-center items-center"></div>
          <div className="w-[70%] resume-section-content">
            <p className="text-[black] Manrope text-base data-font-name font-bold">
              Dear {contact_person_name ? contact_person_name : "John Doe"}
            </p>
            <p className="text-[black] Manrope text-base mt-2 data-font-name">
              {contact_person_designation
                ? contact_person_designation
                : "Contact Person Designation"}
            </p>
            <p className="text-[black] Manrope text-base mt-2 data-font-name">
              {company_name ? company_name : "Contact Person Company Name"}
            </p>
          </div>
          <div className="w-[30%] resume-section-content">
            <p className="text-[black]  Manrope text-base data-font-name flex justify-start items-center ">
              <FaPhoneAlt
                size={16}
                className="text-[black]  mr-2 min-w-[16px]"
              />
              <span className="break-all">
                {contact_person_phone
                  ? contact_person_phone
                  : "Contact Person Phone"}
              </span>
            </p>
            <p className="text-[black]  Manrope text-base mt-2 data-font-name flex justify-start items-center ">
              <FaEnvelope
                size={16}
                className="text-[black]  mr-2 min-w-[16px]"
              />
              <span className="break-all">
                {contact_person_email
                  ? contact_person_email
                  : "Contact Person Email"}
              </span>
            </p>
            <p className="text-[black]  Manrope text-base mt-2 data-font-name flex justify-start items-center">
              <FaLocationDot
                size={16}
                className="text-[black]  mr-2 min-w-[16px]"
              />
              <span className="break-all">
                {company_address ? company_address : "Company Address"}
              </span>
            </p>
          </div>
          <div className="bg-[black] w-full h-[0.15rem] mb-4 flex justify-center items-center"></div>
        </div>

        {/* end opener  */}

        {/* body  */}

        <div
          className="flex resume-section-content flex-col gap-4 mt-6 px-16 w-full text-[black] text-justify"
          id="data_body"
        >
          <p className="text-[black] resume-section-content Manrope text-justify leading-7 text-base w-full mt-2 whitespace-pre-line data-font-name">
            {experience < 1
              ? "Even though I am just starting, my passion and eagerness to learn make me a valuable addition. Ready to bring my fresh perspective and hunger for growth to your team."
              : experience > 1 && experience <= 9
                ? `With ${experience} years of hands-on experience under my belt, I bring a proven record of accomplishment and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives.`
                : experience > 9
                  ? "With 10+ years of hands-on experience under my belt, I bring a proven record of accomplishment and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives."
                  : `With ${experience} year of hands-on experience under my belt, I bring a proven record of accomplishment and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives.`}          </p>

          <p
            className="text-[black] resume-section-content Manrope text-justify leading-7 text-base w-full mt-2 whitespace-pre-line data-font-name"
            dangerouslySetInnerHTML={{
              __html: opener_detail
                ? opener_detail
                : "This is your opportunity to introduce yourself to the organization! Share your passion for the position you are applying for to motivate the reader to interview you",
            }}
          />

          {/* <p className="text-[black] resume-section-content Manrope text-justify leading-7 text-base w-full mt-2 whitespace-pre-line data-font-name">
            {closer_detail
              ? closer_detail
              : "Thank you for considering my application. I am excited about the possibility of contributing to [Company Name] and am eager to bring my [specific skills or experiences] to your team. I look forward to the opportunity to further discuss how my background, skills, and certifications will be beneficial to your organization. Please feel free to contact me at [your phone number] or via email at [your email address] to schedule an interview at your earliest convenience. Thank you for your time and consideration."}
          </p> */}
        </div>

        {/* end body  */}
        <br></br>
        {/* digital signature  */}
        <div className="flex flex-col gap-2  px-16 w-full" id="data_closer">
          <span className="text-[black] Manrope text-justify leading-7 text-base w-full mt-4 whitespace-pre-line data-font-name font-bold">
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
                  className="text-[#022A36] Manrope uppercase font-bold text-lg w-full mt-6 data-font-name"
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
        {/* end digital signature  */}
      </div>
    </section>
  );
};

export default Header;
