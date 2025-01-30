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
    company_name,
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
    <div className={`${activeTheme} ${activeFont} ${activeFontSize}`}>
      <section
        id="my_template"
        className={`chk_height w-full bg-white min-h-[1308px] relative border-[16px] border-[#2D2B2B] border-solid data-headings-border `}
      >
        <div className="w-10 h-10 rounded-br-full bg-[#2D2B2B] absolute left-0 top-0 data-shapes-inner"></div>
        <div className="w-10 h-10 rounded-bl-full bg-[#2D2B2B] absolute right-0 top-0 data-shapes-inner "></div>
        <div className="w-10 h-10 rounded-tr-full bg-[#2D2B2B] absolute left-0 bottom-0 data-shapes-inner"></div>
        <div className="w-10 h-10 rounded-tl-full bg-[#2D2B2B] absolute right-0 bottom-0 data-shapes-inner"></div>
        <div className="flex flex-wrap justify-start items-center w-full">
          {/* header  */}
          <div className="flex justify-between items-center w-full  ">
            <div
              className="flex justify-center items-start flex-wrap p-2 bg-[#700A45] z-20 relative left-[50px] top-[20px] rounded-xl data-shapes-main"
              id="data_profile"
            >
              <div className="flex justify-center items-start flex-wrap tracking-wider rounded-lg py-6 px-4 w-[330px] border border-dashed border-[#fff]">
                <h2 className="text-[#fff] Lato uppercase font-bold text-3xl text-center border-b-[1px] leading-10 border-[#fff] border-solid heading data-font-name">
                  {first_name ? first_name : "Your Name"}{" "}
                  {last_name ? last_name : ""}
                </h2>
                <p className="text-[#fff] Lato tracking-wider uppercase text-lg w-full text-center mt-2 data-font-name">
                  {job_title ? job_title : "Your Job Position"}
                </p>
              </div>
            </div>

            <div className="flex justify-center items-start flex-wrap mt-10 w-[40%]">
              <p className="text-[#323433] Lato text-sm w-full flex items-center py-2 sub_heading data-font-name">
                <div className="mr-2 flex justify-center items-center w-6 h-6 flex-shrink-0 rounded-full bg-[#700A45] text-white data-shapes-main">
                  <FaEnvelope size={10} />
                </div>
                <div className="break-all">
                  {email_address ? email_address : "Email"}
                </div>
              </p>

              <p className="text-[#323433] Lato text-sm w-full flex items-center py-2 sub_heading data-font-name">
                <div className="mr-2 flex justify-center items-center w-6 h-6 rounded-full flex-shrink-0 bg-[#700A45] text-white data-shapes-main">
                  <FaPhoneAlt size={10} />
                </div>{" "}
                <div className="break-all">
                  {phone_number ? phone_number : "phone"}
                </div>
              </p>
              {street_address ||
                city ||
                state ||
                zip_code ||
                allCountries.find((con) => con.id === country_id)?.name ? (
                allCountries.find((con) => con.id === country_id)?.name !==
                  "Empty" ? (
                  <p className="text-[#323433] Lato text-sm w-full flex items-center py-2 pr-4 sub_heading data-font-name">
                    <div className=" mr-2 flex justify-center items-center w-6 h-6 rounded-full flex-shrink-0 bg-[#700A45] text-white data-shapes-main">
                      <FaMapMarkerAlt size={10} />
                    </div>
                    <div className="break-words flex-grow">
                      <>
                        {street_address ? `  ${street_address} ` : ""}
                        {city ? `  ${city}, ` : ""}{" "}
                        {state ? `  ${state}, ` : ""}{" "}
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

            <div
              className="flex justify-between items-center flex-wrap px-2 pt-[200px] pb-[100px] w-[150px] bg-[#2D2B2B] absolute top-0 left-[150px] z-10 data-shapes-inner"
              id="data_contacts"
              style={{
                clipPath: "polygon(100% 0, 100% 90%, 50% 100%, 0% 90%, 0 0)",
              }}
            ></div>
          </div>
          {/* end header  */}
          <div
            className="flex justify-start items-start flex-wrap mt-56 px-16 w-full"
            id="data_opener"
          >
            {show_personal_information ? (
              <>
                {/* opener  */}

                <p className="text-[#323433] resume-section-content Lato text-base w-full sub_heading data-font-name">
                  {formattedDate(date)}
                </p>

                <p className="text-[#700A45] resume-section-content Lato text-base w-full mt-2 font-semibold data-headings-primary data-font-name">
                  <b>Dear</b>{" "}
                  {contact_person_name ? contact_person_name : "John Doe"}
                </p>

                <p className="text-[#323433] resume-section-content Lato text-base w-full mt-2 data-font-name">
                  {contact_person_designation
                    ? contact_person_designation
                    : "contact_person_designation"}
                </p>

                <p className="text-[#323433] resume-section-content Lato text-base w-full mt-2 data-font-name">
                  {contact_person_phone
                    ? contact_person_phone
                    : "Contact Person Phone"}
                </p>

                <p className="text-[#323433] resume-section-content Lato text-base w-full mt-2 data-font-name">
                  {contact_person_email
                    ? contact_person_email
                    : "Contect Person Email"}
                </p>

                <p className="text-[#323433] resume-section-content Lato text-base w-full mt-2 data-font-name">
                  {company_name
                    ? company_name
                    : "Contact Person Company Name"}
                </p>

                <p className="text-[#323433] resume-section-content Lato text-base w-full mt-2 data-font-name">
                  {company_address ? company_address : "Company Address"}
                </p>

                {/* end opener  */}
              </>
            ) : (
              <>
                <p className="text-[#323433] Lato text-md resume-section-content w-full sub_heading data-font-name">
                  {formattedDate(date)}
                </p>
                <p className="text-[#323433] Lato text-base resume-section-content w-full mt-6">
                  To
                </p>
                <p className="text-[#700A45] Lato text-base w-full resume-section-content mt-2 font-semibold data-headings-primary data-font-name">
                  <b>Dear</b> HR Manager
                </p>
              </>
            )}
          </div>
          {/* body  */}

          <div
            className="flex resume-section-content flex-col gap-4 mt-6 px-16 w-full"
            id="data_body"
          >
            <p className="text-[#323433] resume-section-content Lato text-justify leading-7 text-base w-full whitespace-pre-line data-font-name">
              {experience < 1
                ? "Even though I am just starting, my passion and eagerness to learn make me a valuable addition. Ready to bring my fresh perspective and hunger for growth to your team."
                : experience > 1 && experience <= 9
                  ? `With ${experience} years of hands-on experience under my belt, I bring a proven record of accomplishment and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives.`
                  : experience > 9
                    ? "With 10+ years of hands-on experience under my belt, I bring a proven record of accomplishment and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives."
                    : `With ${experience} year of hands-on experience under my belt, I bring a proven record of accomplishment and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives.`}            </p>

            <p
              className="text-[#323433] resume-section-content Lato text-justify leading-7 text-base w-full whitespace-pre-line data-font-name"
              dangerouslySetInnerHTML={{
                __html: opener_detail
                  ? opener_detail
                  : "This is your opportunity to introduce yourself to the organization! Share your passion for the position you are applying for to motivate the reader to interview you",
              }}
            />

            {/* <p className="text-[#323433] resume-section-content Lato text-justify leading-7 text-base w-full whitespace-pre-line data-font-name">
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
            <p className="text-[#000] Lato tracking-wider capitalize text-base w-full data-font-name">
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
                  <p className="text-[#700A45] Lato capitalize text-2xl w-full py-4 mb-4 data-headings-primary data-font-name">
                    {signature.value}
                  </p>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
          </div>
          {/* end digital signature  */}
          <Branding left={48} />
        </div>
      </section>
    </div>
  );
};

export default Header;
