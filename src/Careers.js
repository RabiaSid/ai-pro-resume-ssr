import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "react-awesome-slider/dist/styles.css";
import axios from "axios";
import {
  BiLeftArrowAlt,
  BiRightArrowAlt,
  BiSolidChevronsRight,
} from "react-icons/bi";
import { Link } from "react-router-dom";
import { useAuth } from "./services/Auth";
import ServicePageBanner from "./components/ServicePageBanner";
import { ApiService } from "./services/ApiService";

function Pages() {
  const [allJobs, setAllJobs] = useState([]);
  //

  const { user } = useAuth();

  const [pagee_offset, set_pagee_offset] = useState(0);
  const [pagee_limit, set_pagee_limit] = useState(9);
  const [pagee_total, set_pagee_total] = useState([]);
  const [cp, set_cp] = useState(1);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    ApiService.getAllAdsWeb(user?.token)
      .then((response) => {
        setAds(response.data.data.ads);
        console.log(response.data.data.ads);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    var pages = [];
    var chk_page = 0;
    axios
      .get(global.baseurl + "/show-jobs")
      .then((response) => {
        setAllJobs(response.data.data);

        const page_total = response.data.data.length / 9;
        const page_without_float = parseInt(
          response.data.data.length / 9
        ).toFixed(0);
        if (Number(page_total) === Number(page_without_float)) {
          chk_page = 0;
        } else {
          chk_page = 1;
        }
        for (let i = 1; i <= page_total + chk_page; i++) {
          pages.push(i);
        }
        set_pagee_total(pages);

        document.getElementsByClassName("page")[0].classList.add("page_active");
      })
      .catch((error) => {
        console.log(error);
      });

    // axios
    //   .get("http://ip-api.com/json/24.48.0.1")
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);

  const page = (p) => {
    set_cp(p);
    set_pagee_offset(p * 9 - 9);
    set_pagee_limit(p * 9);
    const elementsByClass = document.getElementsByClassName("page");
    for (var i = 0; i < elementsByClass.length; i++) {
      elementsByClass[i].classList.remove("page_active");
    }
    const element = document.getElementById("page" + p);
    element.classList.add("page_active");
  };

  const page_back = (p) => {
    set_pagee_offset(parseInt(cp - 1) * 9 - 9);
    set_pagee_limit(parseInt(cp - 1) * 9);
    const elementsByClass = document.getElementsByClassName("page");
    for (var i = 0; i < elementsByClass.length; i++) {
      elementsByClass[i].classList.remove("page_active");
    }
    const element = document.getElementById("page" + parseInt(cp - 1));
    element.classList.add("page_active");
    set_cp(cp - 1);
  };

  const page_next = (p) => {
    set_pagee_offset(parseInt(cp + 1) * 9 - 9);
    set_pagee_limit(parseInt(cp + 1) * 9);
    const elementsByClass = document.getElementsByClassName("page");
    for (var i = 0; i < elementsByClass.length; i++) {
      elementsByClass[i].classList.remove("page_active");
    }
    const element = document.getElementById("page" + parseInt(cp + 1));
    element.classList.add("page_active");
    set_cp(cp + 1);
  };

  return (
    <div>
      {/* header */}
      <Header />

      <div className="w-full h-[20%]">
        <ServicePageBanner
          startText={""}
          startHeadingText={"Innovate Your"}
          highLightedText={"Career Path"}
          endText={"Explore Rewarding opportunities with AI Pro Resume"}
          description={
            "Join our dynamic team at AI Pro Resume and be at the forefront ofartificial intelligence innovation. With cutting-edge technology and a collaborative, forward-thinking work atmosphere, you can shape the future of resumes and job success."
          }
        />
      </div>

      <section className="w-full bg-[#fff] py-10 px-10 2xl:px-40 flex flex-wrap flex-col gap-4 justify-between align-middle">
        {ads
          .filter((ad) => ad.slug === "career-top")
          .map((ad) => (
            <div key={ad.id} className="mb-5">
              {ad.is_script === 0 ? (
                <a href={`${ad.ad_url}`} target="blank">
                  <img
                    className="w-full"
                    src={`${global.imageUrl + ad.image}`}
                    alt={`Ad ${ad.id}`}
                  />
                </a>
              ) : (
                <div className="p-4">
                  <p className="text-xl font-semibold mb-2">{ad.ad_script}</p>
                </div>
              )}
            </div>
          ))}
        <div className="w-full flex text-center justify-center">
          <div className="w-full lg:w-[70%]  relative text-center sm:text-center ">
            <h1 className="text-[#0072b1] font-Lexend font-bold text-lg lg:text-4xl sm:text-2xl sm:leading-[1.7] md:leading-[1.5]  2xl:leading-[1.2] text-center ">
              Revitalize Your
              <span className="text-[#00caa5]">
                {" "}
                Career Journey, Discover
              </span>{" "}
              Fulfilling Prospects with AI Pro Resume{" "}
            </h1>
          </div>
        </div>
        <div>
          <h3 className="text-[#0072b1] font_1 text-lg  sm:text-2xl leading-[1.2]">
            Apply For
          </h3>
          <div className="flex justify-start items-center flex-wrap">
            {allJobs.slice(pagee_offset, pagee_limit).map((job, idx) => {
              let date = new Date(job.updated_at);
              let d = date.getUTCDate();
              let m = date.getUTCMonth();
              let y = date.getUTCFullYear();

              var month = [
                "JAN",
                "FEB",
                "MAR",
                "APR",
                "MAY",
                "JUNE",
                "JULY",
                "AUG",
                "SEPT",
                "OCT",
                "NOV",
                "DEC",
              ];

              let fullDate = `${d} ${month[m]} ${y}`;

              return (
                <div
                  className="m-6 w-[100%] lg:w-[44%] 2xl:w-[29%] bg-gradient-to-t from-[#009fb1] to-[#13b6b5] p-1 rounded-2xl"
                  key={idx}
                >
                  <div className="bg-white p-2 sm:p-4 rounded-2xl relative shadow-[5px_5px_20px_0px_rgba(0,0,0,0.3)] h-auto sm:h-[150px] md-h-[170px] lg:h-[200px]">
                    <div className="relative flex flex-col justify-between h-full">
                      <div className="flex flex-col gap-2">
                        <h1 className="text-slate-700 font-lexend text-lg sm:text-2xl font-semibold w-[90%] m-auto text-center ">
                          <Link
                            to={"/job-detail/" + job.slug}
                            className="text-[#13b6b5] hover:text-[#0072b1]"
                          >
                            {job.name}
                          </Link>
                        </h1>
                        <p className="text-slate-700 font-lexend text-sm sm:text-md w-[90%] sm:h-fit  m-auto text-center ">
                          {job.short_description
                            .split(" ")
                            .slice(0, 15)
                            .join(" ") + "..."}
                        </p>
                      </div>
                      <div className="w-full flex justify-between gap-4 items-center py-2">
                        <div className="flex justify-center items-center bg-[#0072b1] text-white font-semibold px-4 rounded-full text-xs sm:text-sm text-nowrap">
                          {fullDate}
                        </div>
                        {user?.token ? (
                          <Link
                            to={`/apply-now/${job.id}`}
                            className="flex justify-start items-center text-[#0072b1] hover:text-[#13b6b5]"
                          >
                            <BiSolidChevronsRight size={25} />
                            <div className="font-lexend text-xs font-bold xl:text-sm ml-2 cursor-pointer">
                              Apply
                            </div>
                          </Link>
                        ) : (
                          <Link
                            to="/login"
                            className="flex justify-start items-center text-[#0072b1] hover:text-[#13b6b5]"
                          >
                            <BiSolidChevronsRight size={25} />
                            <div className="font-lexend font-bold text-xs xl:text-sm ml-2 cursor-pointer">
                              Login to Apply
                            </div>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pagination */}
        <div className="w-full flex justify-center items-center text-[#0072b1] text-2xl py-2 cursor-pointer">
          {cp > 1 ? (
            <BiLeftArrowAlt
              size={26}
              className="custom-arrow prev-arrow hover:scale-125"
              onClick={() => page_back()}
            />
          ) : (
            ""
          )}

          {pagee_total.map((pagee_total, index_pagee_total) => (
            <div
              className="font_3 text-slate-400 hover:text-[#0072b1] mx-2 hover:scale-125 page"
              id={"page" + pagee_total}
              key={index_pagee_total}
              onClick={(p) => page(pagee_total)}
            >
              {pagee_total}
            </div>
          ))}
          {cp < pagee_total.length ? (
            <BiRightArrowAlt
              size={26}
              className="custom-arrow next-arrow hover:scale-125"
              onClick={() => page_next()}
            />
          ) : (
            ""
          )}
        </div>
      </section>
      {/* footer */}
      <Footer />
    </div>
  );
}

export default Pages;
