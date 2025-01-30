import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BiGlobe,
  BiSolidMap,
  BiSolidEnvelope,
  BiSolidPhone,
} from "react-icons/bi";

function ProfileInfo({
  phone_number,
  contact_number,
  email_address,
  website,
  street_address,
  postal_code,
  city,
  state,
  countryId,
  allCountries,
  variant,
  colorText,
  colorIcon,
  colorIconBG,
}) {
  //const [allCountries, setAllCountries] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(global.baseurl + "/show-countries")
  //     .then((data) => {
  //       if (data) {
  //         setAllCountries(data.data?.data);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const formattedDate2 = (inputDate) => {
    // Split the inputDate (assuming it's in YYYY-MM-DD format)
    const [year, month] = inputDate.split("-");

    // Create a new Date object with the provided year and month (no timezone issues)
    const date = new Date(year, month - 1); // Subtract 1 from month since Date object uses 0-based months

    // Get the month as a string (short version, like "Dec")
    const monthName = date.toLocaleString("default", { month: "short" });

    // Return the formatted date as "Dec, 2024"
    return `${monthName}, ${year}`;
  };
  return (
    <>
      {variant === 1 ? (
        <table className={colorText + " w-full mytable"}>
          <tr>
            <td className="w-[35px]">
              <BiSolidPhone size={20} className={colorIcon} />
            </td>
            <td className="data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial">
              {phone_number || contact_number ? (
                <>
                  {phone_number ? phone_number : ""}
                  {phone_number && contact_number ? " , " : ""}
                  {contact_number ? contact_number : ""}
                </>
              ) : (
                "Enter Your Phone Number"
              )}
            </td>
          </tr>
          <tr>
            <td className="pt-2">
              <BiSolidEnvelope size={20} className={colorIcon} />
            </td>
            <td className="data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial break-all pt-2">
              {email_address ? email_address : "Enter Your Email"}
            </td>
          </tr>
          {website?.length > 0 && (
            <tr>
              <td className="pt-2">
                <BiGlobe size={20} className={colorIcon} />
              </td>
              <td className="data-font-name data-font-size-desc-heading default-font-size-desc-heading break-all Arial pt-2">
                {website ? website : "Enter your Portfolio Link"}
              </td>
            </tr>
          )}

          {street_address ||
          postal_code ||
          city ||
          state ||
          allCountries?.find((con) => con.id === countryId)?.name != "Empty" ? (
            <tr>
              <td className="pt-2">
                <BiSolidMap size={20} className={colorIcon} />
              </td>
              <td className="data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial pt-2">
                {street_address ? street_address + ", " : ""}
                {city ? `${city}` + ", " : ""}
                {state ? `${state}` + ", " : ""}
                {postal_code ? postal_code + ", " : ""}
                {allCountries?.find((con) => con.id === countryId)?.name !=
                "Empty"
                  ? allCountries?.find((con) => con.id === countryId)?.name
                  : "" || ""}
              </td>
            </tr>
          ) : (
            ""
          )}
        </table>
      ) : variant === 2 ? (
        <table className={colorText + " w-full mytable"}>
          <tr>
            <td className="w-[35px]">
              <div className={colorIconBG + " w-6 h-6 rounded-full p-[4px]"}>
                <BiSolidPhone size={15} className={colorIcon} />
              </div>
            </td>
            <td className="data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial">
              {phone_number || contact_number ? (
                <>
                  {phone_number ? phone_number : ""}
                  {phone_number && contact_number ? " , " : ""}
                  {contact_number ? contact_number : ""}
                </>
              ) : (
                "Enter Your Phone Number"
              )}
            </td>
          </tr>
          <tr>
            <td className="pt-2">
              <div className={colorIconBG + " w-6 h-6 rounded-full p-[4px]"}>
                <BiSolidEnvelope size={15} className={colorIcon} />
              </div>
            </td>
            <td className="data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial break-all pt-2">
              {email_address ? email_address : "Enter Your Email"}
            </td>
          </tr>
          {website?.length > 0 && (
            <tr>
              <td className="pt-2">
                <div className={colorIconBG + " w-6 h-6 rounded-full p-[4px]"}>
                  <BiGlobe size={15} className={colorIcon} />
                </div>
              </td>
              <td className="data-font-name data-font-size-desc-heading default-font-size-desc-heading break-all Arial pt-2">
                {website ? website : "Enter your Portfolio Link"}
              </td>
            </tr>
          )}

          {street_address ||
          postal_code ||
          city ||
          state ||
          allCountries?.find((con) => con.id === countryId)?.name != "Empty" ? (
            <tr>
              <td className="pt-2">
                <div className={colorIconBG + " w-6 h-6 rounded-full p-[4px]"}>
                  <BiSolidMap size={15} className={colorIcon} />
                </div>
              </td>
              <td className="data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial pt-2">
                {street_address ? street_address + ", " : ""}
                {city ? `${city}` + ", " : ""}
                {state ? `${state}` + ", " : ""}
                {postal_code ? postal_code + ", " : ""}
                {allCountries?.find((con) => con.id === countryId)?.name !=
                "Empty"
                  ? allCountries?.find((con) => con.id === countryId)?.name
                  : "" || ""}
              </td>
            </tr>
          ) : (
            ""
          )}
        </table>
      ) : variant === 3 ? (
        <div className="w-full flex flex-wrap justify-start gap-x-2">
          <div className="flex items-center">
            <BiSolidPhone size={16} className={colorIcon + " mr-2"} />
            {phone_number || contact_number ? (
              <div
                className={
                  colorText +
                  " data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial"
                }
              >
                {phone_number ? phone_number : ""}
                {phone_number && contact_number ? ", " : ""}
                {contact_number ? contact_number : ""}
              </div>
            ) : (
              "Enter Your Phone Number"
            )}
          </div>

          <div className="flex items-center">
            <BiSolidEnvelope size={16} className={colorIcon + " mr-2"} />
            <div
              className={
                colorText +
                " data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial"
              }
            >
              {email_address ? email_address : "Enter Your Email"}
            </div>
          </div>

          {website?.length > 0 && (
            <>
              <div className="flex items-center">
                <BiGlobe size={16} className={colorIcon + " mr-2"} />
                <div
                  className={
                    colorText +
                    " data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial"
                  }
                >
                  {website ? website : "Enter your Portfolio Link"}
                </div>
              </div>
            </>
          )}
          {(street_address ||
            postal_code ||
            city ||
            state ||
            allCountries?.find((con) => con.id === countryId)?.name !==
              "Empty") && (
            <div className="flex items-center">
              <BiSolidMap size={16} className={colorIcon + " mr-2"} />
              <div
                className={
                  colorText +
                  " data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial"
                }
              >
                {street_address ? street_address + ", " : ""}
                {city ? `${city}` + ", " : ""}
                {state ? `${state}` + ", " : ""}
                {postal_code ? postal_code + ", " : ""}
                {allCountries?.find((con) => con.id === countryId)?.name !=
                "Empty"
                  ? allCountries?.find((con) => con.id === countryId)?.name
                  : "" || ""}
              </div>
            </div>
          )}
        </div>
      ) : variant === 4 ? (
        <div className="w-full flex flex-wrap justify-center gap-x-2">
          <div className="flex items-center">
            <BiSolidPhone size={16} className={colorIcon + " mr-2"} />
            {phone_number || contact_number ? (
              <div
                className={
                  colorText +
                  " data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial"
                }
              >
                {phone_number ? phone_number : ""}
                {phone_number && contact_number ? ", " : ""}
                {contact_number ? contact_number : ""}
              </div>
            ) : (
              "Enter Your Phone Number"
            )}
          </div>

          <div className="flex items-center">
            <BiSolidEnvelope size={16} className={colorIcon + " mr-2"} />
            <div
              className={
                colorText +
                " data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial"
              }
            >
              {email_address ? email_address : "Enter Your Email"}
            </div>
          </div>

          {website?.length > 0 && (
            <>
              <div className="flex items-center">
                <BiGlobe size={16} className={colorIcon + " mr-2"} />
                <div
                  className={
                    colorText +
                    " data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial"
                  }
                >
                  {website ? website : "Enter your Portfolio Link"}
                </div>
              </div>
            </>
          )}
          {(street_address ||
            postal_code ||
            city ||
            state ||
            allCountries?.find((con) => con.id === countryId)?.name !==
              "Empty") && (
            <div className="flex items-center">
              <BiSolidMap size={16} className={colorIcon + " mr-2"} />
              <div
                className={
                  colorText +
                  " data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial"
                }
              >
                {street_address ? street_address + ", " : ""}
                {city ? `${city}` + ", " : ""}
                {state ? `${state}` + ", " : ""}
                {postal_code ? postal_code + ", " : ""}
                {allCountries?.find((con) => con.id === countryId)?.name !=
                "Empty"
                  ? allCountries?.find((con) => con.id === countryId)?.name
                  : "" || ""}
              </div>
            </div>
          )}
        </div>
      ) : variant === 5 ? (
        <div className="w-full flex flex-wrap justify-end gap-x-2">
          <div className="flex items-center">
            <BiSolidPhone size={16} className={colorIcon + " mr-2"} />
            {phone_number || contact_number ? (
              <div
                className={
                  colorText +
                  " data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial"
                }
              >
                {phone_number ? phone_number : ""}
                {phone_number && contact_number ? ", " : ""}
                {contact_number ? contact_number : ""}
              </div>
            ) : (
              "Enter Your Phone Number"
            )}
          </div>

          <div className="flex items-center">
            <BiSolidEnvelope size={16} className={colorIcon + " mr-2"} />
            <div
              className={
                colorText +
                " data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial"
              }
            >
              {email_address ? email_address : "Enter Your Email"}
            </div>
          </div>

          {website?.length > 0 && (
            <>
              <div className="flex items-center">
                <BiGlobe size={16} className={colorIcon + " mr-2"} />
                <div
                  className={
                    colorText +
                    " data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial"
                  }
                >
                  {website ? website : "Enter your Portfolio Link"}
                </div>
              </div>
            </>
          )}
          {(street_address ||
            postal_code ||
            city ||
            state ||
            allCountries?.find((con) => con.id === countryId)?.name !==
              "Empty") && (
            <div className="flex items-center">
              <BiSolidMap size={16} className={colorIcon + " mr-2"} />
              <div
                className={
                  colorText +
                  " data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial"
                }
              >
                {street_address ? street_address + ", " : ""}
                {city ? `${city}` + ", " : ""}
                {state ? `${state}` + ", " : ""}
                {postal_code ? postal_code + ", " : ""}
                {allCountries?.find((con) => con.id === countryId)?.name !=
                "Empty"
                  ? allCountries?.find((con) => con.id === countryId)?.name
                  : "" || ""}
              </div>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default ProfileInfo;
