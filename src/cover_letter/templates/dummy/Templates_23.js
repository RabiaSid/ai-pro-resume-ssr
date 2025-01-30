import axios from "axios";
import { data } from "jquery";
import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
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
    company_name,
    show_personal_information,
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
        <div className="bg-[black] w-full mb-[15px] data-shapes-main">
          <div
            className="flex justify-center items-start flex-wrap py-10 px-10 w-full"
            id="data_profile"
          >
            <h2
              style={{ textShadow: "0 0 1px #022A36" }}
              className="text-[white] Gotu  font-bold text-5xl w-full text-center heading data-font-name data-headings-fourth"
            >
              {first_name ? first_name : "Your Name"}{" "}
              {last_name ? last_name : ""}
            </h2>
            <p className="text-[white] Gotu tracking-wider text-lg w-full text-center sub_heading data-font-name pt-2">
              {job_title ? job_title : "Your Role/Job Postion"}
            </p>
          </div>

          <div
            className="flex justify-evenly gap-2 items-center flex-wrap py-2 mb-[80px] mt-[-36px] w-full"
            id="data_contacts"
          >
            <p className="text-[white] Gotu text-sm flex justify-center items-center gap-1 sub_heading data-font-name">
              <span className="mr-2 flex justify-center items-center border-2 border-[white] p-2 rounded-full">
                <FiPhone
                  size={16}
                  className="text-[white] data-headings-fourth"
                />
              </span>
              <div>{phone_number ? phone_number : "Phone"}</div>
            </p>

            <p className="text-[white] Gotu text-sm flex items-center justify-center gap-1 sub_heading data-font-name">
              <span className="mr-2 flex justify-center items-center border-2 border-[white] p-2 rounded-full flex-shrink-0">
                <LuMail
                  size={16}
                  className="text-[white] data-headings-fourth"
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
                <p className="flex-shrink-0 text-[white] Gotu text-sm flex items-center gap-1 sub_heading data-font-name">
                  <span className="mr-2 flex justify-center items-center border-2 border-[white] p-2 rounded-full">
                    <RiHome2Line
                      size={16}
                      className="text-[white] data-headings-fourth flex-shrink-0"
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
        {/* main section */}
        <div
          className=" m-[4rem] relative bottom-[8rem] bg-white py-10"
          style={{ boxShadow: "0px 0px 10px  rgba(0,0,0,0.5)" }}
        >
          {/* opener  */}
          <div
            className="flex justify-start items-start flex-wrap  px-[3rem] w-full"
            id="data_opener"
          >
            <p className="text-[black] Gotu text-base w-full data-font-name font-bold">
              {formattedDate(date)}
            </p>
            <div className="w-[70%] resume-section-content pt-8">
              <p className="text-[black] Gotu text-base data-font-name font-bold">
                Dear {contact_person_name ? contact_person_name : "John Doe"}
              </p>
              <p className="text-[black] Gotu text-base mt-2 data-font-name">
                {contact_person_designation
                  ? contact_person_designation
                  : "Contact Person Designation"}
              </p>
              <p className="text-[black] Gotu text-base mt-2 data-font-name">
                {company_name
                  ? company_name
                  : "Contact Person Company Name"}
              </p>
            </div>
            <div className="w-[30%] resume-section-content pt-5">
              <p className="text-[black]  Gotu text-base mt-2 data-font-name flex justify-start items-center ">
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
              <p className="text-[black]   Gotu text-base mt-2 data-font-name flex justify-start items-center ">
                <LuMail size={16} className="text-[black]  mr-2 min-w-[16px]" />
                <span className="break-all">
                  {contact_person_email
                    ? contact_person_email
                    : "Contact Person Email"}
                </span>
              </p>
              <p className="text-[black]   Gotu  text-base mt-2 data-font-name flex justify-start items-center">
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

          {/* body  */}

          <div
            className="flex resume-section-content flex-col gap-4 mt-5 px-[3rem] w-full text-[black] text-justify Gotu"
            id="data_body"
          >
            <p className="text-[black] resume-section-content Gotu text-justify leading-7 text-base w-full mt-2 whitespace-pre-line data-font-name">
              {experience < 1
                ? "Even though I am just starting, my passion and eagerness to learn make me a valuable addition. Ready to bring my fresh perspective and hunger for growth to your team."
                : experience > 1 && experience <= 9
                  ? `With ${experience} years of hands-on experience under my belt, I bring a proven record of accomplishment and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives.`
                  : experience > 9
                    ? "With 10+ years of hands-on experience under my belt, I bring a proven record of accomplishment and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives."
                    : `With ${experience} year of hands-on experience under my belt, I bring a proven record of accomplishment and a deep understanding of the industry. Eager to continue my growth journey and contribute effectively to your team's objectives.`}            </p>

            <p
              className="text-[black] resume-section-content Gotu text-justify leading-7 text-base w-full mt-2 whitespace-pre-line data-font-name"
              dangerouslySetInnerHTML={{
                __html: opener_detail
                  ? opener_detail
                  : "This is your opportunity to introduce yourself to the organization! Share your passion for the position you are applying for to motivate the reader to interview you",
              }}
            />

            {/* <p className="text-[black] Gotu resume-section-content text-justify leading-7 text-base w-full mt-2 whitespace-pre-line data-font-name">
              {closer_detail
                ? closer_detail
                : "Thank you for considering my application. I am excited about the possibility of contributing to [Company Name] and am eager to bring my [specific skills or experiences] to your team. I look forward to the opportunity to further discuss how my background, skills, and certifications will be beneficial to your organization. Please feel free to contact me at [your phone number] or via email at [your email address] to schedule an interview at your earliest convenience. Thank you for your time and consideration."}
            </p> */}
          </div>

          {/* end body  */}

          {/* digital signature  */}
          <div
            className="flex Gotu flex-col gap-2  px-[3rem] w-full"
            id="data_closer"
          >
            <span className="text-[black] Gotu text-justify leading-7 text-base w-full mt-4 whitespace-pre-line data-font-name font-bold">
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
                    className="text-[black] Gotu uppercase font-bold text-lg w-full mt-6 data-font-name"
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

          {/* end digital signature  */}
        </div>
        <Branding bottom={18} left={32} />
      </div>
    </section>
  );
};

export default Header;
