import React from "react";

function References({
  data,
  variant,
  colorTitle,
  colorDesignation,
  colorLocation,
  colorContactInfo,
}) {
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
                {data.name}{" "}
                <span className={colorDesignation}>({data.designation})</span>
              </td>
            </tr>
            <tr>
              <td
                className={
                  colorLocation +
                  " data-font-name data-font-size-sub-heading default-font-size-sub-heading Arial"
                }
              >
                {data.company ? data.company : ""}
              </td>
            </tr>
            <tr>
              <td
                className={
                  colorContactInfo +
                  " data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial"
                }
              >
                {data.email ? data.email : ""}

                {data.email &&
                data.contact_no &&
                data.contact_no !== "null" &&
                data.contact_no !== undefined &&
                data.contact_no !== "undefined"
                  ? ", "
                  : ""}

                {data.contact_no &&
                data.contact_no !== "null" &&
                data.contact_no !== undefined &&
                data.contact_no !== "undefined"
                  ? data.contact_no
                  : ""}
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
                Name <span className={colorDesignation}>(Designation)</span>
              </td>
            </tr>
            <tr>
              <td
                className={
                  colorLocation +
                  " data-font-name data-font-size-sub-heading default-font-size-sub-heading Arial"
                }
              >
                Company
              </td>
            </tr>
            <tr>
              <td
                className={
                  colorContactInfo +
                  " data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial"
                }
              >
                Email , Contact No
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

export default References;
