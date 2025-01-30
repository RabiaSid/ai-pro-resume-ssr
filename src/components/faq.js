import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function OurFaqs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [faqs, set_faqs] = useState([]);
  const location = useLocation();
  const [expanded, setExpanded] = useState(null);
  const handleChange = (panel) => {
    setExpanded(expanded === panel ? null : panel);
  };

  let currentPage = "";
  switch (location.pathname) {
    case "/":
      currentPage = "Home";
      break;
    case "/resume-templates":
      currentPage = "Resume Template";
      break;
    case "/resume-examples":
      currentPage = "Resume Example";
      break;
    case "/cover-letter-templates":
      currentPage = "Cover Template";
      break;
    case "/cover-letter-examples":
      currentPage = "Cover Example";
      break;
    case "/services":
      currentPage = "Services";
      break;
    case "/packages":
      currentPage = "Pricing";
      break;
    case "/ats-checker":
      currentPage = "Ats";
      break;
    default:
      currentPage = "";
  }

  const handleKeyUp = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    axios
      .get(global.baseurl + "/our-faqs")
      .then((response) => {
        const filteredFaqs = response.data.data.filter(
          (faq) => faq.page === currentPage
        );
        set_faqs(filteredFaqs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage]);

  return (
    <>
      {faqs.length > 0 && (
        <section className="w-full bg-white py-4 px-4 sm:px-20 justify-between items-center align-middle rounded-tr-[150px]">
          <div className="text-md sm:text-lg text-center font-bold text-primary flex sm:gap-2 justify-center items-center">
            <h3 className="text-[#0072b1] mt-10 mb-3 font-lexend font-bold text-xl md:text-3xl leading-[1.5] text-center sm:text-left">
              FREQUENTLY <span className="text-[#00caa5]">ASKED </span>{" "}
              QUESTIONS
            </h3>
          </div>

          <div className="accordion-group w-[90%] lg:w-[75%] 2xl:w-[60%] mx-auto">
            {faqs
              .filter((faq) =>
                faq.question.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((faq, i) => (
                <div
                  className="accordion py-6  border-b border-solid border-gray-200"
                  key={i}
                >
                  <button
                    onClick={() => handleChange(i)}
                    className={`accordion-toggle group inline-flex items-center justify-between font-normal leading-8 w-full transition duration-500 text-lg md:text-xl font-Lexend ${expanded === i ? "text-[#0072b180]" : "text-[#0072b1]"
                      }`}
                  >
                    <h5 className="text-left pr-3 w-[90%]">{faq.question}</h5>
                    <svg
                      className={`transition duration-500  ${expanded === i
                        ? "rotate-180 text-[#0072b180]"
                        : "text-[#0072b1]"
                        }`}
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </button>
                  {expanded === i && (
                    <div className="accordion-content w-full px-0 overflow-hidden pr-4 pt-3">
                      <div
                        className="py-2 px-1 text-black text-sm md:text-md font-Lexend faq_editor"
                        dangerouslySetInnerHTML={{
                          __html: faq?.answer,
                        }}
                      />
                      {/* {faq?.answer && /<[^>]+>/.test(faq.answer) ? (
                        <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                      ) : (
                        <p className="text-gray-950 text-sm md:text-md font-Lexend">
                          {faq.answer}
                        </p>
                      )} */}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </section>
      )}
    </>
  );
}
