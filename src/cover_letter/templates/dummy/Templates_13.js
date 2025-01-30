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
    company_name,
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
      <div
        className="absolute bottom-0 h-12 w-full  bg-[#10495B] rotate-180 data-shapes-inner"
        style={{
          "clip-path":
            "polygon(0% 0%, 0% 100%, 3% 15%, 6% 100%,9% 15%, 12% 100%,15% 15%, 18% 100%,21% 15%, 24% 100%, 27% 15%, 30% 100%, 33% 15%, 36% 100%,39% 15%, 42% 100%,45% 15%, 48% 100%,51% 15%, 54% 100%, 57% 15%, 60% 100%, 63% 15%, 66% 100%,69% 15%, 72% 100%,75% 15%, 78% 100%,81% 15%, 84% 100%, 87% 15%, 90% 100%, 93% 15%, 96% 100%, 99% 15%, 102% 100%, 100% 100%, 100% 0%)",
        }}
      ></div>

      <div className="flex flex-wrap justify-between items-start w-full mb-20 ">
        {/* header  */}
        <div className="h-4 w-full mb-2 bg-[#10495B] data-shapes-main"></div>
        <div
          style={{
            "clip-path":
              "polygon(0% 0%, 0% 100%, 3% 85%, 6% 100%,9% 85%, 12% 100%,15% 85%, 18% 100%,21% 85%, 24% 100%, 27% 85%, 30% 100%, 33% 85%, 36% 100%,39% 85%, 42% 100%,45% 85%, 48% 100%,51% 85%, 54% 100%, 57% 85%, 60% 100%, 63% 85%, 66% 100%,69% 85%, 72% 100%,75% 85%, 78% 100%,81% 85%, 84% 100%, 87% 85%, 90% 100%, 93% 85%, 96% 100%, 99% 85%, 102% 100%, 100% 100%, 100% 0%)",
          }}
          className="flex justify-start items-start flex-wrap  w-full py-[40px] mb-20 bg-[#10495B] data-shapes-main"
        >
          <div
            className="flex justify-start items-start flex-wrap  w-full"
            id="data_profile"
          >
            <h2 className="text-[#fff] Gotu capitalize text-4xl w-full text-center heading data-font-name">
              {first_name ? first_name : "Your Name"}{" "}
              {last_name ? last_name : ""}
            </h2>
            <p className="text-[#fff] Gotu capitalize text-lg w-full text-center sub_heading data-font-name">
              {job_title ? job_title : "Your Job Position"}
            </p>
          </div>

          <div
            className="flex justify-evenly gap-4 items-center flex-wrap px-10 w-full py-[20px]"
            id="data_contacts"
          >
            <p className="text-[#fff] Gotu text-sm flex items-center py-2 justify-start  text-right sub_heading data-font-name">
              <div className="mr-2 flex justify-center items-center w-6 h-6 rounded-full  text-[#fff]">
                <FaPhoneAlt size={10} />
              </div>
              <div className="break-words">
                {phone_number ? phone_number : "phone"}
              </div>
            </p>

            <p className="text-[#fff] Gotu text-sm flex items-center py-2 justify-start  text-right sub_heading data-font-name">
              <div className="mr-2 flex justify-center items-center w-6 h-6 rounded-full  text-[#fff]">
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
                <p className="text-[#fff] Gotu text-sm flex items-center py-2 justify-start  text-right sub_heading data-font-name">
                  <div className="mr-2 flex justify-center items-center w-6 h-6 rounded-full  text-[#fff]">
                    <FaMapMarkerAlt size={10} />
                  </div>
                  <div className="break-words">
                    <>
                      {street_address ? `  ${street_address} ` : ""}
                      {city ? `  ${city}, ` : ""} {state ? `  ${state}, ` : ""}{" "}
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
              <p className="text-[#555151] resume-section-content Gotu text-base w-full mt-2 sub_heading data-font-name">
                {formattedDate(date)}
              </p>

              <p className="text-[#10495B] resume-section-content  Gotu text-base w-full mt-10 font-bold data-headings-primary data-font-name">
                <b className="text-[#022A36] text-lg Opensans">Dear </b>
                {contact_person_name ? contact_person_name : "John Doe"}
              </p>

              <p className="text-[#555151] resume-section-content Gotu text-base w-full mt-2 data-font-name">
                {contact_person_designation
                  ? contact_person_designation
                  : "contact_person_designation"}
              </p>

              <p className="text-[#555151] resume-section-content Gotu text-base w-full mt-2 data-font-name">
                {contact_person_phone
                  ? contact_person_phone
                  : "Contact Person Phone"}
              </p>

              <p className="text-[#555151] resume-section-content Gotu text-base w-full mt-2 data-font-name">
                {contact_person_email
                  ? contact_person_email
                  : "Contect Person Email"}
              </p>

              <p className="text-[#555151] resume-section-content Gotu text-base w-full mt-2 data-font-name">
                {company_name
                  ? company_name
                  : "Contact Person Company Name"}
              </p>

              <p className="text-[#555151] resume-section-content  Gotu text-base w-full mt-2 data-font-name">
                {company_address ? company_address : "Company Address"}
              </p>
            </div>

            {/* end opener  */}
          </>
        ) : (
          <>
            <div
              className="flex justify-start items-start flex-wrap resume-section-content  px-16 w-full"
              id="data_opener"
            >
              <p className="text-[#555151] Gotu text-base w-full mt-2 sub_heading data-font-name">
                {formattedDate(date)}
              </p>
              <p className="text-[#10495B] Gotu text-base w-full mt-10 font-bold data-headings-primary data-font-name">
                <b className="text-[#022A36] text-lg Opensans">Dear </b> HR
                Manager
              </p>
            </div>
          </>
        )}

        {/* body  */}

        <div
          className="flex resume-section-content flex-col gap-4 mt-6 px-16 w-full"
          id="data_body"
        >
          <p className="text-[#555151] resume-section-content Gotu text-justify leading-7 text-base w-full whitespace-pre-line data-font-name">
            {experience < 1
              ? "Even though I am just starting, my passion and eagerness to learn make me a valuable addition. Ready to bring my fresh perspective and hunger for growth to your team."
              : experience > 1 && experience <= 9
                ? `With ${experience} years of hands-on experience under my belt, I bring a proven record of accomplishment and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives.`
                : experience > 9
                  ? "With 10+ years of hands-on experience under my belt, I bring a proven record of accomplishment and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives."
                  : `With ${experience} year of hands-on experience under my belt, I bring a proven record of accomplishment and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives.`}          </p>

          <p
            className="text-[#555151] resume-section-content Gotu text-justify leading-7 text-base w-full whitespace-pre-line data-font-name"
            dangerouslySetInnerHTML={{
              __html: opener_detail
                ? opener_detail
                : "This is your opportunity to introduce yourself to the organization! Share your passion for the position you are applying for to motivate the reader to interview you",
            }}
          />

          {/* <p className="text-[#555151] resume-section-content Gotu text-justify leading-7 text-base w-full whitespace-pre-line data-font-name">
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
          <p className="text-[#000] Gotu tracking-wider capitalize text-base w-full data-font-name">
            Sincerely.
          </p>

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
                  style={{ textShadow: "0 0 1px #323433" }}
                  className="text-[#022A36] Gotu text-lg w-full mt-4 data-headings-primary data-font-name"
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
        <Branding bottom={48} left={32} />
        {/* end digital signature  */}
      </div>
    </section>
  );
};

export default Header;
