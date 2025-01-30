import axios from "axios";
import React, { useEffect, useState } from "react";
import { LuCalendarDays } from "react-icons/lu";
import { LuCalendarClock } from "react-icons/lu";
import { HiMapPin } from "react-icons/hi2";
import { SiGooglemaps } from "react-icons/si";

function Experience({
  data,
  countryId,
  allCountries,
  variant,
  colorPosition,
  colorDates,
  colorLocation,
}) {
  const company = data.company_name || "";
  const city = data.city || "";
  const state = data.state || "";
  const country =
    allCountries?.find((con) => con.id === data.country_id)?.name || "";

  const location = [
    company,
    city,
    state && country !== "Empty" ? state : "",
    country !== "Empty" ? country : "",
  ]
    .filter(Boolean) // Removes any empty strings
    .join(", ");

  const formattedDate2 = (inputDate) => {
    if (!inputDate) {
      console.error("Invalid date input:", inputDate);
      return;
    }

    const [year, month] = inputDate.split("-");

    if (!year || !month) {
      console.error("Invalid date format:", inputDate);
      return;
    }

    const date = new Date(year, month - 1);

    const monthName = date.toLocaleString("default", { month: "short" });

    return `${monthName}, ${year}`;
  };
  return (
    <>
      {variant === 1 ? (
        data !== "" ? (
          <table className="w-full mytable">
            <tr>
              <td
                className={
                  colorPosition +
                  " data-font-name data-font-size-main-heading default-font-size-main-heading Arial"
                }
              >
                {data.job_position}
              </td>
              <td
                className={
                  colorDates +
                  " data-font-name data-font-size-desc-heading default-font-size-desc-heading w-[43%] text-right Arial"
                }
              >
                {data.start_date && (
                  <>
                    {formattedDate2(data.start_date)} {" - "}
                    {data.currently_working === 0
                      ? formattedDate2(data.end_date)
                      : "Present"}
                  </>
                )}
              </td>
            </tr>
            <tr>
              <td
                colSpan={2}
                className={
                  colorLocation +
                  " data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial"
                }
              >
                {location}
              </td>
            </tr>
            <tr>
              <td
                className={
                  "data-font-name data-font-size-desc-heading text-justify default-font-size-desc-heading editor_txt Arial"
                }
                colSpan={2}
              >
                <p
                  className="mt-2"
                  dangerouslySetInnerHTML={{
                    __html: data.job_description,
                  }}
                />
              </td>
            </tr>
          </table>
        ) : (
          <table className="w-full mytable">
            <tr>
              <td
                className={
                  colorPosition +
                  " data-font-name data-font-size-main-heading default-font-size-main-heading Arial"
                }
              >
                Position
              </td>
              <td
                className={
                  colorDates +
                  " data-font-name data-font-size-desc-heading default-font-size-desc-heading w-[43%] text-right Arial"
                }
              >
                Date Period
              </td>
            </tr>
            <tr>
              <td
                colSpan={2}
                className={
                  colorLocation +
                  " data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial"
                }
              >
                {" "}
                Company Name Location
              </td>
            </tr>
            <tr>
              <td
                className={
                  "data-font-name data-font-size-desc-heading text-justify default-font-size-desc-heading editor_txt Arial"
                }
                colSpan={2}
              >
                Job Description
              </td>
            </tr>
          </table>
        )
      ) : variant === 2 ? (
        data !== "" ? (
          <table className="w-full mytable">
            <tr>
              <td
                className={
                  colorPosition +
                  " data-font-name data-font-size-main-heading default-font-size-main-heading Arial"
                }
              >
                {data.job_position}
              </td>
            </tr>
            <tr>
              <td
                colSpan={2}
                className={
                  colorDates +
                  " data-font-name data-font-size-desc-heading default-font-size-desc-heading w-[43%] Arial"
                }
              >
                {data.start_date && (
                  <>
                    {formattedDate2(data.start_date)} {" - "}
                    {data.currently_working === 0
                      ? formattedDate2(data.end_date)
                      : "Present"}
                  </>
                )}
              </td>
            </tr>
            <tr>
              <td
                colSpan={2}
                className={
                  colorLocation +
                  " data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial"
                }
              >
                {location}
              </td>
            </tr>
            <tr>
              <td
                className={
                  "data-font-name data-font-size-desc-heading text-justify default-font-size-desc-heading editor_txt Arial"
                }
                colSpan={2}
              >
                <p
                  className="mt-2"
                  dangerouslySetInnerHTML={{
                    __html: data.job_description,
                  }}
                />
              </td>
            </tr>
          </table>
        ) : (
          <table className="w-full mytable">
            <tr>
              <td
                colSpan={2}
                className={
                  colorPosition +
                  " data-font-name data-font-size-main-heading default-font-size-main-heading Arial"
                }
              >
                Position
              </td>
            </tr>
            <tr>
              <td
                colSpan={2}
                className={
                  colorDates +
                  " data-font-name data-font-size-desc-heading default-font-size-desc-heading w-[43%] text-right Arial"
                }
              >
                Date Period
              </td>
            </tr>
            <tr>
              <td
                colSpan={2}
                className={
                  colorLocation +
                  " data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial"
                }
              >
                {" "}
                Company Name Location
              </td>
            </tr>
            <tr>
              <td
                className={
                  "data-font-name data-font-size-desc-heading text-justify default-font-size-desc-heading editor_txt Arial"
                }
                colSpan={2}
              >
                Job Description
              </td>
            </tr>
          </table>
        )
      ) : variant === 3 ? (
        data !== "" ? (
          <table className="w-full mytable">
            <tr>
              <td
                className={
                  colorPosition +
                  " data-font-name data-font-size-main-heading default-font-size-main-heading Arial"
                }
              >
                {data.job_position}
              </td>
              {data.start_date && (
                <td
                  className={
                    colorDates +
                    " data-font-name data-font-size-desc-heading default-font-size-desc-heading w-[43%] text-right Arial"
                  }
                >
                  <div className="flex justify-end items-center">
                    <LuCalendarDays
                      size={18}
                      className="mr-2 relative bottom-[1px]"
                    />{" "}
                    {data.start_date && (
                      <>
                        {formattedDate2(data.start_date)} {" - "}
                        {data.currently_working === 0
                          ? formattedDate2(data.end_date)
                          : "Present"}
                      </>
                    )}
                  </div>
                </td>
              )}
            </tr>
            <tr>
              <td
                colSpan={2}
                className={
                  colorLocation +
                  " data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial"
                }
              >
                <div className="flex items-center">
                  <SiGooglemaps
                    size={18}
                    className="mr-2 relative bottom-[1px]"
                  />{" "}
                  {location}
                </div>
              </td>
            </tr>
            <tr>
              <td
                className={
                  "data-font-name data-font-size-desc-heading text-justify default-font-size-desc-heading editor_txt Arial"
                }
                colSpan={2}
              >
                <p
                  className="mt-2"
                  dangerouslySetInnerHTML={{
                    __html: data.job_description,
                  }}
                />
              </td>
            </tr>
          </table>
        ) : (
          <table className="w-full mytable">
            <tr>
              <td
                className={
                  colorPosition +
                  " data-font-name data-font-size-main-heading default-font-size-main-heading Arial"
                }
              >
                Position
              </td>
              <td
                className={
                  colorDates +
                  " data-font-name data-font-size-desc-heading default-font-size-desc-heading w-[43%] text-right Arial"
                }
              >
                <div className="flex justify-end items-center">
                  <LuCalendarDays
                    size={18}
                    className="mr-2 relative bottom-[1px]"
                  />{" "}
                  Date Period
                </div>
              </td>
            </tr>
            <tr>
              <td
                colSpan={2}
                className={
                  colorLocation +
                  " data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial"
                }
              >
                {" "}
                <div className="flex  items-center">
                  <SiGooglemaps
                    size={18}
                    className="mr-2 relative bottom-[1px]"
                  />{" "}
                  Location
                </div>
              </td>
            </tr>
            <tr>
              <td
                className={
                  "data-font-name data-font-size-desc-heading text-justify default-font-size-desc-heading editor_txt Arial"
                }
                colSpan={2}
              >
                Job Description
              </td>
            </tr>
          </table>
        )
      ) : variant === 4 ? (
        data !== "" ? (
          <table className="w-full mytable">
            <tr>
              <td
                className={
                  colorPosition +
                  " data-font-name data-font-size-main-heading default-font-size-main-heading Arial"
                }
              >
                {data.job_position}
              </td>
            </tr>
            <tr>
              {data.start_date && (
                <td
                  colSpan={2}
                  className={
                    colorDates +
                    " data-font-name data-font-size-desc-heading default-font-size-desc-heading w-[43%] Arial"
                  }
                >
                  <div className="flex items-center">
                    <LuCalendarClock
                      size={15}
                      className="mr-2 relative bottom-[1px]"
                    />{" "}
                    {data.start_date && (
                      <>
                        {formattedDate2(data.start_date)} {" - "}
                        {data.currently_working === 0
                          ? formattedDate2(data.end_date)
                          : "Present"}
                      </>
                    )}
                  </div>
                </td>
              )}
            </tr>
            <tr>
              <td
                colSpan={2}
                className={
                  colorLocation +
                  " data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial"
                }
              >
                <div className="flex items-start">
                  <SiGooglemaps
                    size={15}
                    className="mr-2 relative top-[3px] w-4"
                  />{" "}
                  {location}
                </div>
              </td>
            </tr>
            <tr>
              <td
                className={
                  "data-font-name data-font-size-desc-heading text-justify default-font-size-desc-heading editor_txt Arial"
                }
                colSpan={2}
              >
                <p
                  className="mt-2"
                  dangerouslySetInnerHTML={{
                    __html: data.job_description,
                  }}
                />
              </td>
            </tr>
          </table>
        ) : (
          <table className="w-full mytable">
            <tr>
              <td
                colSpan={2}
                className={
                  colorPosition +
                  " data-font-name data-font-size-main-heading default-font-size-main-heading Arial"
                }
              >
                Position
              </td>
            </tr>
            <tr>
              <td
                colSpan={2}
                className={
                  colorDates +
                  " data-font-name data-font-size-desc-heading default-font-size-desc-heading w-[43%] Arial"
                }
              >
                <div className="flex items-center">
                  <LuCalendarClock
                    size={15}
                    className="mr-2 relative bottom-[1px]"
                  />{" "}
                  Date Period
                </div>
              </td>
            </tr>
            <tr>
              <td
                colSpan={2}
                className={
                  colorLocation +
                  " data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial"
                }
              >
                <div className="flex items-start">
                  <SiGooglemaps
                    size={15}
                    className="mr-2 relative top-[3px] w-4"
                  />{" "}
                  Location
                </div>
              </td>
            </tr>
            <tr>
              <td
                className={
                  "data-font-name data-font-size-desc-heading text-justify default-font-size-desc-heading editor_txt Arial"
                }
                colSpan={2}
              >
                Job Description
              </td>
            </tr>
          </table>
        )
      ) : (
        ""
      )}
    </>
  );
}

export default Experience;
