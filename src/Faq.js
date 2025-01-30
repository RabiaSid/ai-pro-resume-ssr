import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "react-awesome-slider/dist/styles.css";
import axios from "axios";
import { BiSearch, BiSolidDownArrow } from "react-icons/bi";
import ServicePageBanner from "./components/ServicePageBanner";
import { useAuth } from "./services/Auth";
import { ApiService } from "./services/ApiService";
//
import { Disclosure } from "@headlessui/react";

function Pages() {
  const [faqs, set_faqs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { user } = useAuth();
  const [ads, setAds] = useState([]);
  useEffect(() => {
    ApiService.getAllAdsWeb(user?.token)
      .then((response) => {
        setAds(response.data.data.ads);
        console.log(response.data.data.ads);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleKeyUp = (event) => {
    // Update the state with the input value
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    axios
      .get(global.baseurl + "/our-faqs")
      .then((response) => {
        set_faqs(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {/* header */}
      <Header />

      <div className="w-full h-[20%]">
        <ServicePageBanner
          startText={""}
          startHeadingText={"FAQs of"}
          highLightedText={"AI Pro Resume"}
          endText={"Unlock Success with AI Pro Resume"}
          description={""}
        />
      </div>

      {/* <div className="bg-white border border-1 border-[#00caa5] w-[90%] sm:w-[70%]  lg:w-[665px] m-auto flex lg:justify-between items-center shadow-[0px_0px_30px_0px_rgba(0,0,0,0.2)] rounded-full    text-[#13b6b5] relative lg:top-[40px] p-2">
        <BiSearch
          size={32}
          className="cursor-pointer hover:scale-125 duration-300 transition-all mr-2"
        />
        <input
          type="text"
          id="search"
          onKeyUp={handleKeyUp}
          className="border-slate-200 font-montserrat w-[90%] outline-none lg:font-[20px] font-[12px] text-sm lg:text-lg text-[rgba(184, 184, 184, 1)]"
          placeholder="Search with Creative, Modern, Professional etc"
        />
      </div> */}

      <section className="w-full mb-20">
        {ads
          .filter((ad) => ad.slug === "faq-top")
          .map((ad) => (
            <div key={ad.id} className="flex justify-center">
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
        {faqs
          .filter((faqs) => faqs.question.includes(searchTerm))
          .map((faqs, index_faqs) => (
            <div className="my-6" key={index_faqs}>
              <div className="question bg-white  w-[90%] lg:w-[75%] 2xl:w-[60%] m-auto shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)] rounded-2xl">
                <Disclosure>
                  {({ open }) => (
                    <div>
                      <Disclosure.Button className="gap-1 sm:gap-4 text-xl font-Lexend w-full grid grid-cols-[95%,5%] justify-between rounded-lg  px-6 py-6 text-left  text-[#0072b1] hover:text-[#0072b180] focus:outline-none focus-visible:ring focus-visible:text-[#0072b1]/75">
                        <span>{faqs.question}</span>
                        <div className="flex justify-center items-center font-Lexend">
                          <BiSolidDownArrow
                            className={`${open ? "rotate-180 transform" : ""
                              } h-5 w-5 text-[#0072b1] text-center`}
                          />
                        </div>
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-6 pb-6 pt-4  text-black p-4 outline-none  text-md font-Lexend">
                        {faqs.answer}
                      </Disclosure.Panel>
                    </div>
                  )}
                </Disclosure>
              </div>
            </div>
          ))}
        {ads
          .filter((ad) => ad.slug === "faq-bottom")
          .map((ad) => (
            <div key={ad.id} className="flex justify-center">
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
      </section>

      {/* footer */}
      <Footer />
    </div>
  );
}

export default Pages;
