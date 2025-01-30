import React from "react";
import { tip_1_icon, tip_2_icon, tip_3_icon } from "../icons/svgs";

export default function Tips({ pageDetail }) {
  const {
    page_main_title,
    card_heading_one,
    card_heading_two,
    card_heading_three,
    card_description_one,
    card_description_two,
    card_description_three,
  } = pageDetail;
  return (
    <>
      <div className="container m-auto py-5">
        <h3 className="text-[#0072b1] text-center drop-shadow-lg font-Lexend font-bold text-2xl md:text-3xl px-4 sm:px-0">
          {page_main_title}
          <br />
        </h3>
        <div className="grid gap-4 mt-10 sm:grid-cols-2 xl:grid-cols-3 font-Lexend sm:px-0">
          <div className="p-6 shadow-[0_0_50px_0px_rgba(0,0,0,0.15)] rounded-lg bg-white flex">
            <div className="flex-shrink-0">
              {/* <img
                src={service_1}
                alt="My Image"
                width={70}
                height={70}
                className="shadow-[0_0_1px_0px_rgba(0,0,0,0.2)]  w-[60px]  rounded-lg"
              /> */}
              <div
                className="tip_1 animate-pulse"
                dangerouslySetInnerHTML={{
                  __html: tip_1_icon({ w: 60, h: 60 }),
                }}
              ></div>
            </div>
            <div className="ml-4 text-start">
              <h2 className="font-bold text-lg drop-shadow-lg text-primary-black font-Lexend leading-[1.5]">
                {card_heading_one}
              </h2>
              <p className="text-slate-800 mt-2 text-sm leading-[1.5] text-left">
                <p
                  dangerouslySetInnerHTML={{
                    __html: card_description_one,
                  }}
                ></p>
              </p>
            </div>
          </div>
          <div className="p-6 shadow-[0_0_50px_0px_rgba(0,0,0,0.15)] rounded-lg bg-white flex">
            <div className="flex-shrink-0">
              {/* <img
                src={service_2}
                alt="My Image"
                width={70}
                height={70}
                className="shadow-[0_0_1px_0px_rgba(0,0,0,0.2)] w-[60px]  rounded-lg"
              /> */}

              <div
                className="tip_2 animate-pulse"
                dangerouslySetInnerHTML={{
                  __html: tip_2_icon({ w: 60, h: 60 }),
                }}
              ></div>
            </div>
            <div className="ml-4 text-start">
              <h2 className="font-bold drop-shadow-lg text-lg text-primary-black font-Lexend leading-[1.5]">
                {card_heading_two}
              </h2>
              <p className="text-slate-800 mt-2 text-sm leading-[1.5] text-left">
                <p
                  dangerouslySetInnerHTML={{
                    __html: card_description_two,
                  }}
                ></p>
              </p>
            </div>
          </div>
          <div className="p-6 shadow-[0_0_50px_0px_rgba(0,0,0,0.15)] rounded-lg bg-white flex sm:col-span-2 xl:col-span-1">
            <div className="flex-shrink-0">
              {/* <img
                src={service_3}
                alt="My Image"
                widtsh={70}
                height={70}
                className="shadow-[0_0_1px_0px_rgba(0,0,0,0.2)] w-[60px]  rounded-lg"
              /> */}
              <div
                className="tip_3 animate-pulse"
                dangerouslySetInnerHTML={{
                  __html: tip_3_icon({ w: 60, h: 60 }),
                }}
              ></div>
            </div>
            <div className="ml-4 text-start">
              <h2 className="font-bold drop-shadow-lg text-lg text-primary-black font-Lexend leading-[1.5]">
                {card_heading_three}
              </h2>
              <p className="text-slate-800 mt-2 text-sm leading-[1.5] text-left">
                <p
                  dangerouslySetInnerHTML={{
                    __html: card_description_three,
                  }}
                ></p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
