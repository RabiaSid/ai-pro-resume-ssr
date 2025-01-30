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
      <div className="w-[330px]">
        <div
          style={{
            "clip-path": "polygon(0 0, 100% 0, 100% 100%, 50% 100%)",
          }}
          className="bg-[#022A36] w-[300px] h-[250px] absolute right-[0px] top-[0px] data-shapes-main"
        ></div>
        <div
          style={{ "clip-path": "polygon(100% 0, 50% 0, 100% 100%)" }}
          className="bg-[#AA7E3D] w-[300px] h-[250px] absolute right-[0px] top-[0px] "
        ></div>

        <div
          style={{ "clip-path": "polygon(50% 0%, 0% 100%, 100% 100%)" }}
          className="bg-[#01B0B2] w-[180px] h-[150px] absolute right-[150px] top-[100px]  data-shapes-inner "
        ></div>
      </div>
      <div className="flex flex-wrap justify-between items-start w-full mb-20">
        <div className="flex flex-wrap justify-between items-center w-[calc(100%-300px)] py-[70px] mb-10">
          {/* header  */}
          <div
            className="flex justify-start items-start flex-wrap py-2 ml-[50px] w-[300px]"
            id="data_profile"
          >
            <h2
              style={{ textShadow: "0 0 1px #323433" }}
              className="text-[#291C37] Opensans uppercase text-5xl data-headings-primary heading data-font-name"
            >
              {first_name ? first_name : "Your Name"}{" "}
              {last_name ? last_name : ""}
              <p className="text-[#01B0B2] Opensans capitalize text-lg text-center data-headings-primary sub_heading data-font-name">
                {job_title ? job_title : "Your Job Position"}
              </p>
            </h2>
          </div>

          <div
            className="flex justify-evenly items-center flex-wrap pl-[10px] w-[350px]"
            id="data_contacts"
          >
            <p className="text-[#555050] Opensans text-sm flex items-center py-2 justify-start w-full  sub_heading data-font-name">
              <div className="mr-2 flex justify-center items-center w-6 h-6 rounded-full bg-[#323433] text-[#fff] data-shapes-main flex-shrink-0">
                <FaPhoneAlt size={12} />
              </div>
              <div className="break-all">
                {phone_number ? phone_number : "Phone"}
              </div>
            </p>

            <p className="text-[#555050] Opensans text-sm flex items-center py-2 justify-start w-full sub_heading data-font-name">
              <div className="mr-2 flex justify-center items-center w-6 h-6 rounded-full bg-[#323433] text-[#fff] data-shapes-main flex-shrink-0">
                <FaEnvelope size={12} />
              </div>
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
                <p className="text-[#555050] Opensans text-sm flex items-center py-2 justify-start w-full sub_heading data-font-name">
                  <div className=" flex-shrink-0 mr-1  flex justify-center items-center  h-6 w-6 rounded-full bg-[#323433] text-[#fff] data-shapes-main">
                    <FaMapMarkerAlt size={12} />
                  </div>
                  <div className="flex justify-start items-center ">
                    <>
                      {street_address ? `  ${street_address}` : ""}
                      {city ? `  ${city},` : ""} {state ? `  ${state},` : ""}{" "}
                      {country_id !== 0 &&
                        allCountries.find((con) => con.id === country_id)
                          ?.name &&
                        ` ${allCountries.find((con) => con.id === country_id)
                          ?.name
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
          </div>
          {/* end header  */}
        </div>
        {show_personal_information ? (
          <>
            {/* opener  */}
            <div
              className="flex justify-start items-start flex-wrap px-16 w-full"
              id="data_opener"
            >
              <p className="text-[#555050] resume-section-content Opensans text-base w-full mt-2 sub_heading data-font-name">
                {formattedDate(date)}
              </p>

              <p className="text-[#323433] resume-section-content Opensans text-base w-full mt-2 data-font-name">
                Dear {contact_person_name ? contact_person_name : "John Doe"}
              </p>

              <p className="text-[#555050] resume-section-content Opensans text-base w-full mt-2 data-font-name">
                {contact_person_phone
                  ? contact_person_phone
                  : "Contact Person Phone"}
              </p>

              <p className="text-[#555050] resume-section-content Opensans text-base w-full mt-2 data-font-name">
                {contact_person_email
                  ? contact_person_email
                  : "Contect Person Email"}
              </p>

              <p className="text-[#555050] resume-section-content Opensans text-base w-full mt-2 data-font-name">
                {company_name
                  ? company_name
                  : "Contact Person Company Name"}
              </p>

              <p className="text-[#555050] resume-section-content Opensans text-base w-full mt-2 data-font-name">
                {company_address ? company_address : "Company Address"}
              </p>
            </div>

            {/* end opener  */}
          </>
        ) : (
          <>
            <div
              className="flex justify-start resume-section-content items-start flex-wrap  px-16 w-full"
              id="data_opener"
            >
              <p className="text-[#555050] Opensans text-base w-full mt-2 sub_heading data-font-name">
                {formattedDate(date)}
              </p>
              <p className="text-[#000000] Opensans text-base w-full mt-2 data-font-name">
                Dear HR Manager
              </p>
            </div>
          </>
        )}

        {/* body  */}

        <div
          className="flex resume-section-content  flex-col gap-4 mt-6 px-16 w-full"
          id="data_body"
        >
          <p className="text-[#555050] resume-section-content Opensans text-justify leading-7 text-base w-full whitespace-pre-line data-font-name">
            {experience < 1
              ? "Even though I am just starting, my passion and eagerness to learn make me a valuable addition. Ready to bring my fresh perspective and hunger for growth to your team."
              : experience > 1 && experience <= 9
                ? `With ${experience} years of hands-on experience under my belt, I bring a proven record of accomplishment and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives.`
                : experience > 9
                  ? "With 10+ years of hands-on experience under my belt, I bring a proven record of accomplishment and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives."
                  : `With ${experience} year of hands-on experience under my belt, I bring a proven record of accomplishment and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives.`}          </p>

          <p
            className="text-[#555050] resume-section-content Opensans text-justify leading-7 text-base w-full whitespace-pre-line data-font-name"
            dangerouslySetInnerHTML={{
              __html: opener_detail
                ? opener_detail
                : "This is your opportunity to introduce yourself to the organization! Share your passion for the position you are applying for to motivate the reader to interview you",
            }}
          />

          {/* <p className="text-[#555050] resume-section-content Opensans text-justify leading-7 text-base w-full whitespace-pre-line data-font-name">
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
          <h2
            style={{ textShadow: "0 0 1px #323433" }}
            className="text-[#022A36] Opensans text-lg w-full mt-2 data-font-name"
          >
            Sincerely.
          </h2>

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
