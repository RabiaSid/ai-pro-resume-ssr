import React from "react";

function Skills({ ids, length, data, variant, colorText, colorTags }) {
  return (
    <>
      {variant === 1 ? (
        data !== "" ? (
          <>
            {data.map((skill, index) => (
              <span
                key={index}
                className={`skill-tag ${colorText} ${colorTags} inline-block px-3 py-1 mr-1 mt-1 data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial`}
              >
                {skill.trim()} {/* Trim to remove extra spaces */}
              </span>
            ))}
          </>
        ) : (
          <div
            className={
              colorText +
              " " +
              colorTags +
              " px-3 py-1 m-1 data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial"
            }
          >
            Tools / Technology
          </div>
        )
      ) : variant === 2 ? (
        data !== "" ? (
          <>
            {data.map((skill, index) => (
              <span
                key={index}
                className={`skill-tag ${colorText} ${colorTags} inline-block px-3 py-1 mr-1 mt-1 data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial rounded-full`}
              >
                {skill.trim()} {/* Trim to remove extra spaces */}
              </span>
            ))}
          </>
        ) : (
          <div
            className={
              colorText +
              " " +
              colorTags +
              " px-3 py-1 m-1 data-font-name data-font-size-desc-heading default-font-size-desc-heading rounded-full Arial"
            }
          >
            Tools / Technology
          </div>
        )
      ) : variant === 3 ? (
        // <span
        //       className={`skill-tag ${colorText} ${colorTags} break-all py-1 mr-1 mt-1 data-font-name data-font-size-desc-heading default-font-size-desc-heading Arial`}
        //     >
        <>
          {data !== "" ? (
            <>
              {data.map((skill, index) => (
                <>
                  {" "}
                  {skill.trim()}
                  {""}
                  {(ids < length - 1) | (index < data.length - 1) ? ", " : ""}
                </>
              ))}
            </>
          ) : (
            <div
              className={
                colorText +
                " " +
                colorTags +
                " py-1 mr-1 mt-1 data-font-name data-font-size-desc-heading default-font-size-desc-heading rounded-full Arial"
              }
            >
              Tools / Technology
            </div>
          )}{" "}
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default Skills;
