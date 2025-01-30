import React from "react";
import { LuCalendarDays } from "react-icons/lu";
import { LuCalendarClock } from "react-icons/lu";
import { HiMapPin } from "react-icons/hi2";
import { SiGooglemaps } from "react-icons/si";

function Awards({
  data,
  variant,
  colorTitle,
  colorDates,
  colorLocation,
  colorDesc,
}) {
  const formattedDate2 = (inputDate) => {
    // Split the inputDate (assuming it's in YYYY-MM-DD format)
    const [year, month] = inputDate.split("-");

    // Create a new Date object with the provided year and month (no timezone issues)
    const date = new Date(year, month - 1); // desctract 1 from month since Date object uses 0-based months

    // Get the month as a string (short version, like "Dec")
    const monthName = date.toLocaleString("default", { month: "short" });

    // Return the formatted date as "Dec, 2024"
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
                  colorTitle +
                  " data-font-name data-font-size-main-heading default-font-size-main-heading Arial"
                }
              >
                {data.name}
              </td>
              <td
                className={
                  colorDates +
                  " data-font-name data-font-size-desc-heading default-font-size-desc-heading w-[43%] text-right Arial"
                }
              >
                {data.date && <>{formattedDate2(data.date)}</>}
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
                {data.body}
              </td>
            </tr>
            <tr>
              <td
                className={
                  colorDesc +
                  " data-font-name data-font-size-desc-heading text-justify default-font-size-desc-heading editor_txt Arial"
                }
                colSpan={2}
              >
                <p
                  dangerouslySetInnerHTML={{
                    __html: data.description,
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
                  colorTitle +
                  " data-font-name data-font-size-main-heading default-font-size-main-heading Arial"
                }
              >
                Award Name
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
                What Are You Most Of Proud Of?
              </td>
            </tr>
            <tr>
              <td
                className={
                  colorDesc +
                  " data-font-name data-font-size-desc-heading text-justify default-font-size-desc-heading editor_txt Arial"
                }
                colSpan={2}
              >
                Award Description
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
                  colorTitle +
                  " data-font-name data-font-size-main-heading default-font-size-main-heading Arial"
                }
              >
                {data.name}
              </td>
            </tr>
            <tr>
              <td
                className={
                  colorDates +
                  " data-font-name data-font-size-desc-heading default-font-size-desc-heading w-[43%] Arial"
                }
              >
                {data.date && <>{formattedDate2(data.date)}</>}
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
                {data.body}
              </td>
            </tr>
            <tr>
              <td
                className={
                  colorDesc +
                  " data-font-name data-font-size-desc-heading text-justify default-font-size-desc-heading editor_txt Arial"
                }
                colSpan={2}
              >
                <p
                  dangerouslySetInnerHTML={{
                    __html: data.description,
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
                  colorTitle +
                  " data-font-name data-font-size-main-heading default-font-size-main-heading Arial"
                }
              >
                Award Name
              </td>
            </tr>

            <tr>
              <td
                className={
                  colorDates +
                  " data-font-name data-font-size-desc-heading default-font-size-desc-heading w-[43%]  Arial"
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
                What Are You Most Of Proud Of?
              </td>
            </tr>
            <tr>
              <td
                className={
                  colorDesc +
                  " data-font-name data-font-size-desc-heading text-justify default-font-size-desc-heading editor_txt Arial"
                }
                colSpan={2}
              >
                Award Description
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
                  colorTitle +
                  " data-font-name data-font-size-main-heading default-font-size-main-heading Arial"
                }
              >
                {data.name}
              </td>
              <td
                className={
                  colorDates +
                  " data-font-name data-font-size-desc-heading default-font-size-desc-heading w-[43%] text-right Arial"
                }
              >
                {data.date && (
                  <div className="flex justify-end items-center">
                    <LuCalendarDays
                      size={18}
                      className="mr-2 relative bottom-[1px]"
                    />{" "}
                    {data.date && <>{formattedDate2(data.date)}</>}
                  </div>
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
                <div className="flex items-center">
                  <SiGooglemaps
                    size={18}
                    className="mr-2 relative bottom-[1px]"
                  />{" "}
                  {data.body}
                </div>
              </td>
            </tr>
            <tr>
              <td
                className={
                  colorDesc +
                  " data-font-name data-font-size-desc-heading text-justify default-font-size-desc-heading editor_txt Arial"
                }
                colSpan={2}
              >
                <p
                  dangerouslySetInnerHTML={{
                    __html: data.description,
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
                  colorTitle +
                  " data-font-name data-font-size-main-heading default-font-size-main-heading Arial"
                }
              >
                Award Name
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
                <div className="flex items-center">
                  <SiGooglemaps
                    size={18}
                    className="mr-2 relative bottom-[1px]"
                  />{" "}
                  What Are You Most Of Proud Of?
                </div>
              </td>
            </tr>
            <tr>
              <td
                className={
                  colorDesc +
                  " data-font-name data-font-size-desc-heading text-justify default-font-size-desc-heading editor_txt Arial"
                }
                colSpan={2}
              >
                Award Description
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
                  colorTitle +
                  " data-font-name data-font-size-main-heading default-font-size-main-heading Arial"
                }
              >
                {data.name}
              </td>
            </tr>
            {data.date && (
              <tr>
                <td
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
                    {data.date && <>{formattedDate2(data.date)}</>}
                  </div>
                </td>
              </tr>
            )}
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
                  {data.body}
                </div>
              </td>
            </tr>
            <tr>
              <td
                className={
                  colorDesc +
                  " data-font-name data-font-size-desc-heading text-justify default-font-size-desc-heading editor_txt Arial"
                }
                colSpan={2}
              >
                <p
                  dangerouslySetInnerHTML={{
                    __html: data.description,
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
                  colorTitle +
                  " data-font-name data-font-size-main-heading default-font-size-main-heading Arial"
                }
              >
                Award Name
              </td>
            </tr>

            <tr>
              <td
                className={
                  colorDates +
                  " data-font-name data-font-size-desc-heading default-font-size-desc-heading w-[43%]  Arial"
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
                  What Are You Most Of Proud Of?
                </div>
              </td>
            </tr>
            <tr>
              <td
                className={
                  colorDesc +
                  " data-font-name data-font-size-desc-heading text-justify default-font-size-desc-heading editor_txt Arial"
                }
                colSpan={2}
              >
                Award Description
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

export default Awards;
