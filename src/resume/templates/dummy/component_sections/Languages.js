import React from "react";

function Languages({
  data,
  variant,
  colorTitle,
  colorBackground,
  colorForeground,
}) {
  return (
    <>
      {variant === 1 ? (
        data !== "" ? (
          <div
            className={
              colorTitle +
              " w-full data-font-name data-font-size-desc-heading default-font-size-desc-heading mt-2 Arial"
            }
          >
            {data.name}
            <div
              className={colorBackground + " w-full rounded-full my-1 Arial"}
            >
              <div
                className={
                  data.level?.name === "Beginner"
                    ? "w-[30%] " + colorForeground + "  h-3 rounded-full"
                    : data.level?.name === "Intermediate"
                    ? "w-[66%] " + colorForeground + "  h-3 rounded-full"
                    : data.level?.name === "Advanced"
                    ? "w-[100%] " + colorForeground + "  h-3 rounded-full "
                    : colorForeground + "  h-3 w-[33%] rounded-full "
                }
              >
                &nbsp;&nbsp;
              </div>
            </div>
          </div>
        ) : (
          <div
            className={
              colorTitle +
              "  w-full data-font-name data-font-size-desc-heading default-font-size-desc-heading m-1 Arial"
            }
          >
            Name
            <div className={colorBackground + "  w-full rounded-full my-1"}>
              <div
                className={colorForeground + "  h-3 w-[33%] rounded-full"}
              ></div>
            </div>
          </div>
        )
      ) : variant === 2 ? (
        data !== "" ? (
          <div
            className={
              colorTitle +
              "  w-full data-font-name data-font-size-desc-heading default-font-size-desc-heading mt-2 Arial"
            }
          >
            {data.name}
            <div className={colorBackground + "  w-full  my-1"}>
              <div
                className={
                  data.level?.name === "Beginner"
                    ? "w-[30%] " + colorForeground + "  h-3 "
                    : data.level?.name === "Intermediate"
                    ? "w-[66%] " + colorForeground + "  h-3 "
                    : data.level?.name === "Advanced"
                    ? "w-[100%] " + colorForeground + "  h-3  "
                    : colorForeground + "  h-2 w-[33%] "
                }
              >
                &nbsp;&nbsp;
              </div>
            </div>
          </div>
        ) : (
          <div
            className={
              colorTitle +
              "  w-full data-font-name data-font-size-desc-heading default-font-size-desc-heading m-1 Arial"
            }
          >
            Name
            <div className={colorBackground + "  w-full  my-1"}>
              <div className={colorForeground + "  h-3 w-[33%] "}></div>
            </div>
          </div>
        )
      ) : variant === 3 ? (
        data !== "" ? (
          <div
            className={
              colorTitle +
              "  w-full data-font-name data-font-size-desc-heading default-font-size-desc-heading mt-2 Arial"
            }
          >
            {data.name}
            <div className={"flex justify-start gap-x-4 my-2"}>
              <div
                className={
                  colorBackground + "  rounded-full p-1  shadow-slate-600"
                }
              >
                <div
                  className={
                    data.level?.name === "Beginner" ||
                    data.level?.name === "Intermediate" ||
                    data.level?.name === "Advanced"
                      ? colorForeground +
                        "  p-[6px] rounded-full  shadow-slate-700"
                      : "  p-[6px] rounded-full  shadow-slate-700"
                  }
                ></div>
              </div>
              <div
                className={
                  colorBackground + "  rounded-full p-1  shadow-slate-600"
                }
              >
                <div
                  className={
                    data.level?.name === "Intermediate" ||
                    data.level?.name === "Advanced"
                      ? colorForeground +
                        "  p-[6px] rounded-full  shadow-slate-700"
                      : " p-[6px]"
                  }
                ></div>
              </div>
              <div
                className={
                  colorBackground + "  rounded-full p-1  shadow-slate-600"
                }
              >
                <div
                  className={
                    data.level?.name === "Intermediate" ||
                    data.level?.name === "Advanced"
                      ? colorForeground +
                        "  p-[6px] rounded-full  shadow-slate-700"
                      : " p-[6px]"
                  }
                ></div>
              </div>
              <div
                className={
                  colorBackground + "  rounded-full p-1  shadow-slate-600"
                }
              >
                <div
                  className={
                    data.level?.name === "Advanced"
                      ? colorForeground +
                        "  p-[6px] rounded-full  shadow-slate-700"
                      : " p-[6px]"
                  }
                ></div>
              </div>
              <div
                className={
                  colorBackground + "  rounded-full p-1  shadow-slate-600"
                }
              >
                <div
                  className={
                    data.level?.name === "Advanced"
                      ? colorForeground +
                        "  p-[6px] rounded-full  shadow-slate-700"
                      : " p-[6px]"
                  }
                ></div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={
              colorTitle +
              "  w-full data-font-name data-font-size-desc-heading default-font-size-desc-heading mt-2 Arial"
            }
          >
            Name
            <div className={"flex justify-start gap-x-5 my-2"}>
              <div
                className={
                  colorBackground + "  rounded-full p-1  shadow-slate-600"
                }
              >
                <div
                  className={
                    colorForeground + "  p-[6px] rounded-full  shadow-slate-700"
                  }
                ></div>
              </div>

              <div
                className={
                  colorBackground + "  rounded-full p-1  shadow-slate-600"
                }
              >
                <div className={" p-[6px]"}></div>
              </div>
              <div
                className={
                  colorBackground + "  rounded-full p-1  shadow-slate-600"
                }
              >
                <div className={" p-[6px]"}></div>
              </div>
              <div
                className={
                  colorBackground + "  rounded-full p-1  shadow-slate-600"
                }
              >
                <div className={" p-[6px]"}></div>
              </div>
              <div
                className={
                  colorBackground + "  rounded-full p-1  shadow-slate-600"
                }
              >
                <div className={" p-[6px]"}></div>
              </div>
            </div>
          </div>
        )
      ) : variant === 4 ? (
        data !== "" ? (
          <div
            className={
              colorTitle +
              "  w-full data-font-name data-font-size-desc-heading default-font-size-desc-heading mt-2 Arial"
            }
          >
            {data.name}
            <div className={"flex justify-start gap-x-6 my-2"}>
              <div className={colorBackground + "  rounded-[4px]  "}>
                <div
                  className={
                    data.level?.name === "Beginner" ||
                    data.level?.name === "Intermediate" ||
                    data.level?.name === "Advanced"
                      ? colorForeground +
                        "  p-2 rounded-[4px]  shadow-slate-700"
                      : "  p-2 rounded-[4px]  shadow-slate-700"
                  }
                ></div>
              </div>
              <div className={colorBackground + "  rounded-[4px]  "}>
                <div
                  className={
                    data.level?.name === "Intermediate" ||
                    data.level?.name === "Advanced"
                      ? colorForeground +
                        "  p-2 rounded-[4px]  shadow-slate-700"
                      : " p-2"
                  }
                ></div>
              </div>
              <div className={colorBackground + "  rounded-[4px]  "}>
                <div
                  className={
                    data.level?.name === "Intermediate" ||
                    data.level?.name === "Advanced"
                      ? colorForeground +
                        "  p-2 rounded-[4px]  shadow-slate-700"
                      : " p-2"
                  }
                ></div>
              </div>
              <div className={colorBackground + "  rounded-[4px]  "}>
                <div
                  className={
                    data.level?.name === "Advanced"
                      ? colorForeground +
                        "  p-2 rounded-[4px]  shadow-slate-700"
                      : " p-2"
                  }
                ></div>
              </div>
              <div className={colorBackground + "  rounded-[4px]  "}>
                <div
                  className={
                    data.level?.name === "Advanced"
                      ? colorForeground +
                        "  p-2 rounded-[4px]  shadow-slate-700"
                      : " p-2"
                  }
                ></div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={
              colorTitle +
              "  w-full data-font-name data-font-size-desc-heading default-font-size-desc-heading mt-2 Arial"
            }
          >
            Name
            <div className={"flex justify-start gap-x-6 my-2"}>
              <div className={colorBackground + "  rounded-[4px]  "}>
                <div
                  className={
                    colorForeground + "  p-2 rounded-[4px]  shadow-slate-700"
                  }
                ></div>
              </div>

              <div className={colorBackground + "  rounded-[4px]  "}>
                <div className={" p-2"}></div>
              </div>

              <div className={colorBackground + "  rounded-[4px]  "}>
                <div className={" p-2"}></div>
              </div>

              <div className={colorBackground + "  rounded-[4px]  "}>
                <div className={" p-2"}></div>
              </div>

              <div className={colorBackground + "  rounded-[4px]  "}>
                <div className={" p-2"}></div>
              </div>
            </div>
          </div>
        )
      ) : variant === 5 ? (
        data !== "" ? (
          <div
            className={
              colorTitle +
              " flex justify-between items-center w-full data-font-name data-font-size-desc-heading default-font-size-desc-heading mt-2 Arial"
            }
          >
            {data.name}
            <div
              className={
                colorBackground + " w-[30%] rounded-full h-2 Arial ml-6"
              }
            >
              <div
                className={
                  data.level?.name === "Beginner"
                    ? "w-[30%] " + colorForeground + "  h-2 rounded-full"
                    : data.level?.name === "Intermediate"
                    ? "w-[66%] " + colorForeground + "  h-2 rounded-full"
                    : data.level?.name === "Advanced"
                    ? "w-[100%] " + colorForeground + "  h-2 rounded-full "
                    : colorForeground + "  h-2 w-[33%] rounded-full "
                }
              ></div>
            </div>
          </div>
        ) : (
          <div
            className={
              colorTitle +
              " flex justify-between items-center w-full data-font-name data-font-size-desc-heading default-font-size-desc-heading mt-2 Arial"
            }
          >
            Name
            <div
              className={
                colorBackground + " w-[30%] rounded-full h-2 Arial ml-6"
              }
            >
              <div
                className={
                  "w-[100%] " + colorForeground + "  h-2 rounded-full "
                }
              ></div>
            </div>
          </div>
        )
      ) : variant === 6 ? (
        data !== "" ? (
          <div
            className={
              colorTitle +
              " flex justify-between items-center w-full data-font-name data-font-size-desc-heading default-font-size-desc-heading mt-2 Arial"
            }
          >
            {data.name}
            <div className={colorBackground + " w-[30%]  h-2 Arial ml-6"}>
              <div
                className={
                  data.level?.name === "Beginner"
                    ? "w-[30%] " + colorForeground + "  h-2 "
                    : data.level?.name === "Intermediate"
                    ? "w-[66%] " + colorForeground + "  h-2 "
                    : data.level?.name === "Advanced"
                    ? "w-[100%] " + colorForeground + "  h-2 "
                    : colorForeground + "  h-2 w-[33%] "
                }
              ></div>
            </div>
          </div>
        ) : (
          <div
            className={
              colorTitle +
              " flex justify-between items-center w-full data-font-name data-font-size-desc-heading default-font-size-desc-heading mt-2 Arial"
            }
          >
            Name
            <div className={colorBackground + " w-[30%] h-2 Arial ml-6"}>
              <div className={"w-[100%] " + colorForeground + "  h-2 "}></div>
            </div>
          </div>
        )
      ) : (
        ""
      )}
    </>
  );
}

export default Languages;
