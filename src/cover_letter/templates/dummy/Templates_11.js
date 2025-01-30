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
    contact_person_designation,
    contact_person_email,
    contact_person_name,
    contact_person_phone,
    country_id,
    email_address,
    company_name,
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
      <div className="flex flex-wrap justify-start items-start w-full">
        {/* header  */}
        <div
          className="flex justify-center items-start flex-wrap py-6 mt-8 px-10 w-full"
          id="data_profile"
        >
          <h2
            style={{ textShadow: "0 0 1px #022A36" }}
            className="text-[#443B3B] Sarala uppercase text-4xl w-full text-center font-semibold heading data-font-name"
          >
            {first_name ? first_name : "Your Name"} {last_name ? last_name : ""}
          </h2>
          <p className="text-[#B89764] Sarala tracking-wider capitalize text-lg w-full text-center data-headings-primary sub_heading data-font-name">
            {job_title ? job_title : "Your Job Position"}
          </p>
        </div>

        <div
          className="flex justify-between items-center flex-wrap my-0 px-16 w-[100%]"
          id="data_contacts"
        >
          <p className="text-[#333333]  Roboto text-sm w-full flex justify-start items-center py-2 sub_heading data-font-name">
            <div className="flex-shrink-0 mr-2 flex justify-center items-center w-6 h-6 rounded-full bg-[#B89764] text-[#fff] data-shapes-main">
              <FaEnvelope size={10} />
            </div>
            <div className="break-words">
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
              <p className="text-[#333333] Roboto text-sm w-full flex justify-start items-center py-2 sub_heading data-font-name">
                <div className="flex-shrink-0 mr-2 flex justify-center items-center w-6 h-6 rounded-full bg-[#B89764] text-[#fff] data-shapes-main">
                  <FaMapMarkerAlt size={10} />
                </div>
                <div className="break-words">
                  <>
                    {street_address ? `  ${street_address}` : ""}
                    {city ? `  ${city},` : ""} {state ? `  ${state},` : ""}{" "}
                    {country_id !== 0 &&
                      allCountries.find((con) => con.id === country_id)?.name &&
                      ` ${allCountries.find((con) => con.id === country_id)?.name
                      }`}{" "}
                    {zip_code ? `${zip_code}` : ""}
                  </>
                </div>
              </p>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          <p className="text-[#333333] Roboto text-sm w-full flex justify-start items-center py-2 sub_heading data-font-name">
            <div className="flex-shrink-0 mr-2 flex justify-center items-center w-6 h-6 rounded-full bg-[#B89764] text-[#fff] data-shapes-main">
              <FaPhoneAlt size={10} />
            </div>
            <div className="break-words">
              {phone_number ? phone_number : "phone"}
            </div>
          </p>
        </div>
        {/* end header  */}
        {show_personal_information ? (
          <>
            {/* opener  */}
            <div
              className="flex justify-between mt-10 mx-16 w-full"
              id="data_opener"
            >
              <div>
                <p className="text-[#595454] resume-section-content Sarala text-base w-full  data-font-name">
                  <b className="text-[#291C37] text-lg PlayfairDisplay">
                    Dear{" "}
                  </b>
                  {contact_person_name ? contact_person_name : "John Doe"}
                </p>

                <p className="text-[#595454] resume-section-content Sarala text-base w-full mt-2 data-font-name">
                  {contact_person_designation
                    ? contact_person_designation
                    : "contact_person_designation"}
                </p>

                <p className="text-[#595454] resume-section-content Sarala text-base w-full mt-2 data-font-name">
                  {contact_person_phone
                    ? contact_person_phone
                    : "Contact Person Phone"}
                </p>

                <p className="text-[#595454] resume-section-content Sarala text-base w-full mt-2 data-font-name">
                  {contact_person_email
                    ? contact_person_email
                    : "Contect Person Email"}
                </p>

                <p className="text-[#595454] resume-section-content Sarala text-base w-full mt-2 data-font-name">
                  {company_name
                    ? company_name
                    : "Contact Person Company Name"}
                </p>

                <p className="text-[#595454] resume-section-content Sarala text-base w-full mt-2 data-font-name">
                  {company_address ? company_address : "Company Address"}
                </p>
              </div>
              <div>
                <p className="text-[#595454] resume-section-content font-bold Sarala text-base text-right sub_heading data-font-name">
                  {formattedDate(date)}
                </p>
              </div>
            </div>

            {/* end opener  */}
          </>
        ) : (
          <>
            <div
              className="flex justify-between resume-section-content  mt-10 px-16 w-full"
              id="data_opener"
            >
              <p className="text-[#000000] Sarala text-base  data-font-name">
                <b className="text-[#291C37] text-lg PlayfairDisplay">Dear </b>{" "}
                HR Manager
              </p>
              <p className="text-[#595454] font-bold Sarala text-base  text-right sub_heading data-font-name">
                {formattedDate(date)}
              </p>
            </div>
          </>
        )}

        {/* body  */}

        <div
          className="flex resume-section-content  flex-col gap-4 mt-4 px-16 w-full"
          id="data_body"
        >
          <p className="text-[#595454] resume-section-content Lato text-justify leading-6 text-base w-full whitespace-pre-line data-font-name">
            {experience < 1
              ? "Even though I am just starting, my passion and eagerness to learn make me a valuable addition. Ready to bring my fresh perspective and hunger for growth to your team."
              : experience > 1 && experience <= 9
                ? `With ${experience} years of hands-on experience under my belt, I bring a proven record of accomplishment and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives.`
                : experience > 9
                  ? "With 10+ years of hands-on experience under my belt, I bring a proven record of accomplishment and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives."
                  : `With ${experience} year of hands-on experience under my belt, I bring a proven record of accomplishment and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives.`}          </p>

          <p
            className="text-[#595454] resume-section-content Lato text-justify leading-6 text-base w-full whitespace-pre-line data-font-name"
            dangerouslySetInnerHTML={{
              __html: opener_detail
                ? opener_detail
                : "This is your opportunity to introduce yourself to the organization! Share your passion for the position you are applying for to motivate the reader to interview you",
            }}
          />
          {/* <p className="text-[#595454] resume-section-content Lato text-justify leading-6 text-base w-full whitespace-pre-line data-font-name">
            {closer_detail
              ? closer_detail
              : "Thank you for considering my application. I am excited about the possibility of contributing to [Company Name] and am eager to bring my [specific skills or experiences] to your team. I look forward to the opportunity to further discuss how my background, skills, and certifications will be beneficial to your organization. Please feel free to contact me at [your phone number] or via email at [your email address] to schedule an interview at your earliest convenience. Thank you for your time and consideration."}
            <br />
          </p> */}
        </div>

        {/* end body  */}

        {/* digital signature  */}
        <div
          className="flex flex-col gap-2 py-10 px-16 w-full"
          id="data_closer"
        >
          <span className="text-[#CD9F45] Sarala text-lg w-full mt-10 data-headings-primary data-font-name">
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
                  className="text-[#291C37] Lato text-lg w-full mt-2 data-font-name "
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
