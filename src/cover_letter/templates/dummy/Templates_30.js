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
      <div className="flex flex-col h-full min-h-[1308px] w-full chk_height">
        {/* Content */}
        <div className="flex flex-col flex-1">
          {/* header  */}
          <div className="bg-[white] py-16">
            <div className="flex justify-between items-center w-full">
              <div className="w-[40%]">
                <div
                  style={{
                    clipPath: "polygon(44% 0px, 89% 0px, 0px 100%, 0px 47%)", // Triangle from top-right to bottom-left
                  }}
                  className="bg-[yellow] w-[50%] h-[300px] absolute  bottom-0 top-0 left-0 data-shapes-inner"
                ></div>

                <div
                  style={{
                    clipPath:
                      "polygon(24% 0, 100% 0, 100% 89%, 77% 100%, 0 100%, 0 14%)", // Triangle from top-right to bottom-left
                  }}
                  className="bg-[black] w-[20%] h-[238px] absolute  bottom-0 top-[50px] left-[90px] data-shapes-main"
                >
                  <div className="text-9xl Kanit font-bold text-white flex  justify-center items-center py-10">
                    {last_name ? (
                      <>
                        <div className="mb-5 uppercase">
                          {first_name ? first_name[0] : "Your Name"}
                        </div>
                        <div className="mt-5 uppercase">
                          {last_name ? last_name[0] : ""}
                        </div>
                      </>
                    ) : (
                      <div className="text-center uppercase">
                        {first_name ? first_name[0] : "Your Name"}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-[70%]">
                <h2
                  style={{
                    textShadow: "0 0 1px #022A36",
                    display: "inline-block",
                  }}
                  className="text-[black] Kanit uppercase text-5xl heading data-font-name font-bold p-2 border-b-2 border-[black]"
                >
                  {first_name ? first_name : "Your Name"}{" "}
                  {last_name ? last_name : ""}
                </h2>

                <p className="text-[black] Kanit tracking-wider capitalize text-lg sub_heading  font-bold">
                  {job_title ? job_title : "Your Role/Job Position"}
                </p>
                <div className="mt-4">
                  <p className="text-[black] text-center Kanit text-md flex items-center sub_heading mb-2">
                    <FiPhone
                      size={18}
                      className="mr-2 text-[black] min-w-[18px]"
                    />
                    <div className="break-all">
                      {phone_number ? phone_number : "Phone"}
                    </div>
                  </p>
                  <p className="text-[black] Kanit text-md flex items-center sub_heading mb-2">
                    <LuMail
                      size={18}
                      className="mr-2 text-[black] min-w-[18px]"
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
                      <p className="text-[black] Kanit text-md flex items-center sub_heading mb-2">
                        <RiHome2Line
                          size={18}
                          className="mr-2 text-[black] min-w-[18px]"
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
                            ? `, ${allCountries.find(
                              (con) => con.id === country_id
                            )?.name
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
          </div>
          {/* end header */}

          {/* opener */}
          <div className="flex justify-between items-start flex-wrap  px-16 w-full">
            <div className="w-[60%] resume-section-content">
              <p className="text-[black] Kanit text-base data-font-name font-bold">
                Dear {contact_person_name ? contact_person_name : "John Doe"}
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
            <div className="w-[30%] resume-section-content">
              <p className="text-[black] Kanit text-base data-font-name font-bold mb-2">
                {formattedDate(date)}
              </p>
              <p className="text-[black] Kanit text-base data-font-name flex justify-start items-center mb-2">
                <FiPhone size={18} className="text-[black] mr-2 min-w-[18px]" />
                <span className="break-all">
                  {contact_person_phone
                    ? contact_person_phone
                    : "Contact Person Phone"}
                </span>
              </p>
              <p className="text-[black] Kanit text-base mt-2 data-font-name flex justify-start items-center mb-2">
                <LuMail size={18} className="text-[black] mr-2 min-w-[18px]" />
                <span className="break-all">
                  {contact_person_email
                    ? contact_person_email
                    : "Contact Person Email"}
                </span>
              </p>
              <p className="text-[black] Kanit text-base mt-2 data-font-name flex justify-start items-center">
                <RiHome2Line
                  size={18}
                  className="text-[black] mr-2 min-w-[18px]"
                />
                <span className="break-all">
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
            <p className="text-[black] resume-section-content Kanit text-justify leading-7 text-base w-full whitespace-pre-line data-font-name mt-4">
              {experience < 1
                ? "Even though I am just starting, my passion and eagerness to learn make me a valuable addition. Ready to bring my fresh perspective and hunger for growth to your team."
                : experience > 1 && experience <= 9
                  ? `With ${experience} years of hands-on experience under my belt, I bring a proven record of accomplishment and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives.`
                  : experience > 9
                    ? "With 10+ years of hands-on experience under my belt, I bring a proven record of accomplishment and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives."
                    : `With ${experience} year of hands-on experience under my belt, I bring a proven record of accomplishment and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives.`}            </p>

            <p
              className="text-[black] resume-section-content Kanit text-justify leading-7 text-base w-full whitespace-pre-line data-font-name mt-4"
              dangerouslySetInnerHTML={{
                __html: opener_detail
                  ? opener_detail
                  : "This is your opportunity to introduce yourself to the organization! Share your passion for the position you are applying for to motivate the reader to interview you",
              }}
            />

            {/* <p className="text-[black] resume-section-content Kanit text-justify leading-7 text-base w-full whitespace-pre-line data-font-name mt-4">
              {closer_detail
                ? closer_detail
                : `Thank you for considering my application. I am excited about the possibility of contributing to [Company Name] and am eager to bring my [specific skills or experiences] to your team. I look forward to the opportunity to further discuss how my background, skills, and certifications will be beneficial to your organization. Please feel free to contact me at [your phone number] or via email at [your email address] to schedule an interview at your earliest convenience. Thank you for your time and consideration.`}
            </p> */}
          </div>
          {/* end body */}
          <br></br>
          {/* Signature */}
          <div className="flex Kanit gap-2 flex-col  px-16 w-full data-font-name">
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
          <Branding left={32} />
          <div className="w-full h-[160px] flex absolute bottom-0">
            <div
              style={{
                clipPath: "polygon(100% 4%, 0% 100%, 100% 100%)", // Triangle from top-right to bottom-left
              }}
              className="bg-[black] w-[20%] h-full absolute right-0"
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
