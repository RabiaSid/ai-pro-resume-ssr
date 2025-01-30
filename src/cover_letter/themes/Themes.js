import React, { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";

const Themes = (props) => {
  const { activeTheme, userDetails, currentTheme: initialTheme } = props;
  const themes = [
    {
      name: "theme1",
      color1: "#4A4E69",
      color2: "#C0C5E4",
    },
    {
      name: "theme2",
      color1: "#29282B",
      color2: "#AE8356",
    },
    {
      name: "theme3",
      color1: "#29282B",
      color2: "#FE9C00",
    },
    {
      name: "theme4",
      color1: "#2B3743",
      color2: "#4F89A6",
    },
    {
      name: "theme5",
      color1: "#323433",
      color2: "#344EAC",
    },
    {
      name: "theme6",
      color1: "#6D4E3A",
      color2: "#AA7A5B",
    },
    {
      name: "theme7",
      color1: "#13355B",
      color2: "#DDE3E8",
    },
    {
      name: "theme8",
      color1: "#180245",
      color2: "#9062ed",
    },
    {
      name: "theme9",
      color1: "#484854",
      color2: "#DBB843",
    },
    {
      name: "theme10",
      color1: "#571266",
      color2: "#e25fff",
    },
    {
      name: "theme11",
      color1: "#3A0303",
      color2: "#08d26d",
    },
    {
      name: "theme12",
      color1: "#024C43",
      color2: "#B89764",
    },
    {
      name: "theme13",
      color1: "#291337",
      color2: "#f1c40f",
    },
    {
      name: "theme14",
      color1: "#2C2C31",
      color2: "#CDD3EB",
    },
    {
      name: "theme15",
      color1: "#2b343d",
      color2: "#ee4539",
    },
    {
      name: "theme16",
      color1: "#35af8f",
      color2: "#22467a",
    },
    {
      name: "theme17",
      color1: "#252551",
      color2: "#d83289",
    },
    {
      name: "theme18",
      color1: "#353a44",
      color2: "#ba5aa8",
    },
    {
      name: "theme19",
      color1: "#003347",
      color2: "#438961",
    },
    {
      name: "theme20",
      color1: "#191919",
      color2: "#28b4a3",
    },
    {
      name: "theme21",
      color1: "#180245",
      color2: "#ff4500",
    },
    {
      name: "theme22",
      color1: "#524A69",
      color2: "#ae00ff",
    },
    {
      name: "theme23",
      color1: "#CE8A66",
      color2: "#3f0231",
    },
    {
      name: "theme24",
      color1: "#1DB9D3",
      color2: "#004741",
    },
    {
      name: "theme25",
      color1: "#007c7c",
      color2: "#000013",
    },
    {
      name: "theme26",
      color1: "#443B3B",
      color2: "#00ffc8",
    },
    {
      name: "theme27",
      color1: "#0E2A49",
      color2: "#ff4500",
    },
    {
      name: "theme28",
      color1: "#291C37",
      color2: "#FAB040",
    },
    {
      name: "theme29",
      color1: "#443B3B",
      color2: "#ff874f",
    },
    {
      name: "theme30",
      color1: "#B89764",
      color2: "#000013",
    },
    {
      name: "theme31",
      color1: "#01B0B2",
      color2: "#022A36",
    },
    {
      name: "theme32",
      color1: "#10495B",
      color2: "#ff3561",
    },
    {
      name: "theme33",
      color1: "#700A45",
      color2: "#2D2B2B",
    },
    {
      name: "theme34",
      color1: "#54767C",
      color2: "#00141a",
    },
    {
      name: "theme35",
      color1: "#ffd200",
      color2: "#000",
    },
    {
      name: "theme36",
      color1: "#1db9d2",
      color2: "#000",
    },
  ];
  const setActiveTheme = (theme) => {
    activeTheme(theme);
  };

  const [count_restriction, set_count_restriction] = useState(0);
  const [currentTheme, setCurrentTheme] = useState(initialTheme);

  useEffect(() => {
    set_count_restriction(
      userDetails?.package_id == Number(1)
        ? 3
        : userDetails?.package_id == Number(2)
          ? 6
          : 50
    );
  }, []);

  return (
    <>
      <div className="flex flex-row-reverse">
        <div className="grid grid-cols-7 lg:grid-cols-10">
          {themes.map((theme, idx) => (
            <div
              key={idx}
              onClick={() => {
                if (idx < count_restriction) {
                  setActiveTheme(theme.name);
                  setCurrentTheme(theme.name);

                }
              }
              }
              // onClick={() => setActiveTheme(theme.name)}
              className="shadow-sm border-2 border-white hover:border-[#01B2AC] rounded-full -rotate-90 relative flex flex-col m-2 justify-center items-center w-[40px] h-[40px] overflow-hidden cursor-pointer"
            >
              {idx >= count_restriction ? (
                <Tooltip title="Upgrade Package to Use">
                  <div className="absolute cursor-not-allowed rotate-90 z-40 bg-primary-blue text-white rounded-full border border-white w-7 h-7 flex justify-center items-center">
                    <FaLock size={15} />
                  </div>
                </Tooltip>
              ) : (
                ""
              )}
              <div
                className={
                  currentTheme === theme.name
                    ? "absolute rounded-full w-[20px] h-[20px] bg-[#01B2AC] border-white border-2 "
                    : "absolute rounded-full w-[20px] h-[20px] bg-slate-100 border-white border-2 "
                }
              ></div>
              {/* <div className="absolute rounded-full w-[18px] h-[18px] bg-[#0F4D76] border-white border "></div> */}
              <div
                style={{ background: theme.color1 }}
                className={`w-full h-full`}
              ></div>
              <div
                style={{ background: theme.color2 }}
                className={`w-full h-full`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Themes;
