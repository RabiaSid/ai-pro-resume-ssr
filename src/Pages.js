import React, { useState, useEffect, useRef } from "react";
import about_icon_1 from "./assets/images/about_icon_1.webp";
import about_icon_2 from "./assets/images/about_icon_2.webp";
import about_img_3 from "./assets/images/about_img_3.webp";
import about_icon_3 from "./assets/images/about_icon_3.webp";
import Header from "./Header";
import Footer from "./Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import LoadingSpiner from "./components/LoadingSpinner";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "react-router-dom";
import "react-awesome-slider/dist/styles.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ReviewsCard from "./components/shared-components/ReviewsCard";
import Partners from "./components/shared-components/Partners";
import { useAuth } from "./services/Auth";
import { ApiService } from "./services/ApiService";
import shadeImage01 from "./assets/images/pattrens/01.webp";
import shadeImage02 from "./assets/images/pattrens/02.webp";
import shadeImage03 from "./assets/images/pattrens/03.webp";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import resume_created from "./assets/images/resume_made.webp";
import coverCreated from "./assets/images/coverLetterCreated.webp";
import job_articles from "./assets/images/job_articles.webp";
import satisfiedClient from "./assets/images/satisfiedclients.webp";
import ScrollAnimation from "react-animate-on-scroll";
import blog_banner_image from "./assets/images/blog_banner_image.webp";

import ServicesCardAbout from "./components/shared-components/ServiceCardAbout";

function Pages() {
  const current_page = useParams().page;

  const [show_pages, set_show_pages] = useState([]);
  const [show_heading1, set_heading1] = useState([]);
  const [show_heading2, set_heading2] = useState([]);
  const [show_heading3, set_heading3] = useState([]);
  const [our_clients, set_our_clients] = useState([]);
  const [our_reviews, set_our_reviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const reviewsSliderRef = React.useRef(null);

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
  function hideTextAfterTwoWords1(inputString, hideCharacter = " ") {
    // Check if inputString is defined and not empty
    if (inputString && inputString.trim() !== "") {
      // Split the input string into words
      const words = inputString.split(" ");

      // Check if there are at least two words in the input string
      if (words.length >= 3) {
        // Create a substring of asterisks with the same length as the hidden text
        const hiddenText = hideCharacter.repeat(
          inputString.length - words.slice(0, 3).join(" ").length
        );

        // Replace the original text after two words with the hidden text
        const result = `${words.slice(0, 2).join(" ")} ${hiddenText}`;
        return result;
      } else {
        // Return the input string as is if there are fewer than two words
        return inputString;
      }
    } else {
      // Handle the case where the input string is undefined or empty
      return "";
    }
  }

  function hideTextAfterTwoWords2(inputString, hideCharacter = " ") {
    // Check if inputString is defined and not empty
    if (inputString && inputString.trim() !== "") {
      // Split the input string into words
      const words = inputString.split(" ");

      // Check if there are at least two words in the input string
      if (words.length >= 3) {
        // Create a substring of asterisks with the same length as the hidden text
        const hiddenText = hideCharacter.repeat(
          inputString.length - words.slice(0, 3).join(" ").length
        );

        // Replace the original text after two words with the hidden text
        const result = `${words.slice(2, 4).join(" ")} ${hiddenText}`;
        return result;
      } else {
        // Return the input string as is if there are fewer than two words
        return inputString;
      }
    } else {
      // Handle the case where the input string is undefined or empty
      return "";
    }
  }

  function hideTextAfterTwoWords3(inputString, hideCharacter = " ") {
    // Check if inputString is defined and not empty
    if (inputString && inputString.trim() !== "") {
      // Split the input string into words
      const words = inputString.split(" ");

      // Check if there are at least two words in the input string
      if (words.length >= 3) {
        // Create a substring of asterisks with the same length as the hidden text
        const hiddenText = hideCharacter.repeat(
          inputString.length - words.slice(0, 3).join(" ").length
        );

        // Replace the original text after two words with the hidden text
        const result = `${words.slice(4).join(" ")} ${hiddenText}`;
        return result;
      } else {
        // Return the input string as is if there are fewer than two words
        return inputString;
      }
    } else {
      // Handle the case where the input string is undefined or empty
      return "";
    }
  }

  const loadPageData = () => {
    setIsLoading(true);
    axios.get(global.baseurl + "/our-clients").then((response) => {
      set_our_clients(response.data.data.clients);
    });

    axios.get(global.baseurl + "/our-reviews").then((response) => {
      console.log(response.data.data);
      set_our_reviews(response.data.data);
    });

    axios
      .get(global.baseurl + "/page/" + current_page)
      .then((response) => {
        setIsLoading(false);
        set_show_pages(response.data.data);
        set_heading1(hideTextAfterTwoWords1(response.data.data.heading));
        set_heading2(hideTextAfterTwoWords2(response.data.data.heading));
        set_heading3(hideTextAfterTwoWords3(response.data.data.heading));
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const location = useLocation();
  useEffect(() => {
    loadPageData();
  }, [location.pathname]);

  const sliderRef = React.useRef(null);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false, // Hide navigation arrows
    autoplay: true, // Enable auto sliding
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true, // Hide navigation arrows
    autoplay: true, // Enable auto sliding
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 414,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handlePrevClick = () => {
    sliderRef.current.slickPrev(); // Go to previous slide
  };

  const handleNextClick = () => {
    sliderRef.current.slickNext(); // Go to next slide
  };

  const less_more = (e) => {
    const main_id = document.getElementById(e);
    document.getElementById("less").style.display = "none";
    document.getElementById("more").style.display = "none";
    main_id.style.display = "block";
  };

  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Check if the window width is greater than or equal to 450px
      setShouldAnimate(window.innerWidth >= 450);
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const counters = document.querySelectorAll(".counter");
  const speed = 50; // The lower the slower

  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;

      // Lower inc to slow and higher to slow
      const inc = target / speed;

      // console.log(inc);
      // console.log(count);

      // Check if target is reached
      if (count < target) {
        // Add inc to count and output in counter
        counter.innerText = count + inc;
        // Call function every ms
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });

  const [IsAboutUs, setIsAboutUs] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("about-us")) {
      setIsAboutUs(true);
    } else {
      setIsAboutUs(false);
    }
  }, [location.pathname]);

  const VideoPlayer = () => {
    return (
      <video autoPlay muted width="545" height="315" controls>
        <source
          src="https://ik.imagekit.io/matrz1mbp/AI%20PRO%200001%20-%20Made%20with%20Clipchamp%20(1)%20(1).mp4?updatedAt=1718177027956"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    );
  };

  return (
    <div>
      {isLoading && <LoadingSpiner isLoading={isLoading} />}
      {/* header */}
      <Header />

      <div className="relative flex justify-between bg-opacity-25 flex-col">
        {/* {/ Shape Pattrens top Banner /} */}
        <div className="absolute w-full flex justify-center items-center h-auto overflow-hidden -z-50">
          <img
            src={shadeImage01}
            alt="full shade image"
            className="w-[600px]"
          />
          <img
            src={shadeImage03}
            alt="full shade image"
            className="hidden 2xl:block w-[300px] lg:w-[700px] absolute  z-[-10000] top-[-80px] lg:top-[-80px] right-0 lg:left-[400px]"
          />
          <img
            src={shadeImage02}
            alt="full shade image"
            className="hidden 2xl:block w-[500px] lg:w-[600px] absolute z-[-10000] top-[-50px] lg:top-[-150px] right-0 lg:right-[-100px]"
          />
        </div>
        {/* {/ Banner Section /} */}
        <section className="w-full">
          <div>
            <div className="max-w-[1500px] grid lg:grid-cols-2 py-4 m-auto px-4 sm:px-8 2xl:px-0 ">
              {/* {/ Banner Text Section /} */}
              <div className="text-left py-8">
                <h1 className="text-[#0072b1] font-Lexend font-bold text-lg lg:text-4xl sm:text-2xl sm:leading-[1.7] md:leading-[1.5] lg:leading-[1.5] 2xl:leading-[1.2] text-center lg:text-left  ">
                  <span className="">
                    Turning{" "}
                    <span className="text-[#00caa5]">Job Applications </span>
                  </span>{" "}
                  <br />
                  <span className="text-[#0072b1]">into Opportunities</span>
                </h1>

                <p className="m-auto text-justify text-xs sm:text-left sm:text-lg mt-4 text-primary-black font-Lexend font-normal">
                  AI Pro Resume is an all-in-one platform offering everything a
                  job hunter needs. From easy resume format to expert tips, we
                  have all that assist you in landing your dream interview. We
                  have specialized resume templates and examples crafted by
                  certified resume writers to save you time and effort. Make
                  your professional journey stress-free with the AI Pro Resume
                  now!
                </p>
              </div>
              {/* {/ Image Slider Section /} */}
              <div
                className="flex justify-center xl:justify-center relative res_shade"
                id="aboutVideo"
              >
                {IsAboutUs ? (
                  <>
                    <VideoPlayer />
                  </>
                ) : (
                  <div className="flex justify-center xl:justify-center relative res_shade">
                    <img
                      src={blog_banner_image}
                      alt="services_img"
                      className="zoom-in-out-box2 w-[350px] h-[350px] animate-bounce"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      {ads
        .filter((ad) => ad.slug === "about-us-top")
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
      <div className="flex items-center justify-start md:justify-center ">
        <div className="lg:w-[80%] px-4 sm:px-8 lg:px-10">
          <div id="less">
            <p className="w-[100%] lg:w-[100%] xl:w-[100%] mt-4 font_2 text-md leading-[1.6] mb-6 text-primary-black font-Lexend text-justify">
              {show_pages.short_description}
            </p>
            <div
              onClick={(e) => less_more("more")}
              className=" cursor-pointer block lg:inline-block my-2 text-center hover:shadow-[0_10px_10px_0px_rgba(0,0,0,0.3)] text-[#0072b1] bg-white hover:text-[#0072b1] hover:bg-white font_1 rounded-full px-6 py-4 mr-4 border-[#0072b1] border-2 transition-all duration-300 ease-linear hover:animate-bounce"
            >
              LEARN MORE
            </div>
          </div>

          <div id="more" style={{ display: "none" }}>
            <p className="w-[90%] lg:w-[100%] xl:w-[100%] mt-4 font_2 text-md leading-[1.6] mb-12 content blogContent">
              <p
                dangerouslySetInnerHTML={{
                  __html: show_pages.long_description,
                }}
              ></p>
            </p>
            <div
              onClick={(e) => less_more("less")}
              className="cursor-pointer block lg:inline-block my-2 text-center hover:shadow-[0_10px_10px_0px_rgba(0,0,0,0.3)] text-[#0072b1] bg-white hover:text-[#0072b1] hover:bg-white font_1 rounded-full px-6 py-4 mr-4 border-[#0072b1] border-2 transition-all duration-300 ease-linear hover:animate-bounce"
            >
              LEARN LESS
            </div>
          </div>
        </div>
      </div>

      <section className="about_us_background mt-5">
        <div className="w-full py-10 flex flex-wrap justify-center text-[white] bg-[#000000bd]">
          <div className="flex items-center justify-center">
            <p className="w-[100%] xl:w-[60%] px-4 lg:px-10 text-center">
              Start your journey toward your dream job with AI Pro Resume. We
              help you create customized, ATS-friendly resumes that stand out to
              recruiters. As the fast resume builder platform, we have already
              assisted millions of job hunters in landing their perfect jobs.
              Become a successful professional with the smart resume builder
              today.
            </p>
          </div>
          <div className="w-full px-4 py-8 md:px-20 md:py-8">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center lg:text-left">
              {[
                { src: resume_created, count: "2953", text: "Resumes Made" },
                {
                  src: coverCreated,
                  count: "471",
                  text: "Cover Letters Created",
                },
                { src: job_articles, count: "15", text: "AI FEATURES" },
                {
                  src: satisfiedClient,
                  count: "683",
                  text: "Satisfied Clients",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="cursor-pointer w-full m-auto mt-8 text-center"
                >
                  <div className="rounded-full w-[75px] h-[75px] sm:w-[100px] sm:h-[100px] shadow-md flex justify-center bg-[#646464] items-center m-auto">
                    <img
                      src={item.src}
                      alt={item.text}
                      className="w-[35px] sm:w-[45px]"
                    />
                  </div>
                  <div className="flex justify-center hover:text-[#00caa5] font_1 text-2xl sm:text-4xl">
                    <div className="counter" data-target={item.count}>
                      0
                    </div>
                    <span>+</span>
                  </div>
                  <p className="mt-4 md:font_2 md:text-lg sm:text-xl">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>{" "}
      </section>

      <section className="w-full bg-[#fff] sm:py-5  flex flex-wrap justify-between items-center align-middle">
        <div className="flex  flex-wrap justify-between items-center w-full">
          <section className={"relative w-full"}>
            {/* Svg Wave */}
            <div className="absolute bottom-0 w-full hidden sm:block">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path
                  fill="#01b2ac"
                  fillOpacity={1}
                  d="M0,0L40,32C80,64,160,128,240,165.3C320,203,400,213,480,181.3C560,149,640,75,720,48C800,21,880,43,960,74.7C1040,107,1120,149,1200,181.3C1280,213,1360,235,1400,245.3L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
                />
              </svg>
            </div>
            <div className="container m-auto overflow-hidden py-8 px-4">
              <div className="grid grid-cols-1  sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <ScrollAnimation
                  animateIn="bounceInUp"
                  delay={0}
                  animateOnce={true}
                  className="bg-[rgba(255,255,255,0.3)] backdrop-blur-[20px] rounded-lg"
                >
                  <ServicesCardAbout
                    img={about_icon_1}
                    alt={""}
                    title={"Our Mission"}
                    desc={
                      "Our mission is your empowerment, a dynamic partnership extending beyond a typical service. With us, it's about more than templates; it's about a collaborative journey. We're here to enlighten your skills, unfold your story, and place your aspirations center stage."
                    }
                  />
                </ScrollAnimation>

                <ScrollAnimation
                  animateIn="bounceInUp"
                  delay={0}
                  animateOnce={true}
                  className="bg-[rgba(255,255,255,0.3)] backdrop-blur-[20px] rounded-lg"
                >
                  <ServicesCardAbout
                    img={about_icon_2}
                    alt={""}
                    title={"Our Vision"}
                    desc={
                      "our vision is to be the bundle of innovation in the world of professional development. In our vision, inclusivity is key. AI resume builder picture a landscape where cutting-edge technology seamlessly integrates with individual stories, making personalized career services accessible to all. AI Pro Resume is not merely a tool; it's a vibrant community encouraging innovation, authenticity, and adaptability."
                    }
                  />
                </ScrollAnimation>

                <ScrollAnimation
                  animateIn="bounceInUp"
                  delay={0}
                  animateOnce={true}
                  className="bg-[rgba(255,255,255,0.3)] backdrop-blur-[20px] rounded-lg"
                >
                  <ServicesCardAbout
                    img={about_icon_3}
                    alt={""}
                    title={"Our Process"}
                    desc={
                      "Transform your professional journey with AI Pro Resume. Kick start your professional journey by engaging with our user-friendly interface that welcomes you to AI-driven career elevation, where you make a resume by inputting your details to create your unique narrative. Our advanced AI algorithms then analyze this information, crafting a professional masterpiece that authentically represents your skills and experiences."
                    }
                  />
                </ScrollAnimation>

                <ScrollAnimation
                  animateIn="bounceInUp"
                  delay={0}
                  animateOnce={true}
                  className="bg-[rgba(255,255,255,0.3)] backdrop-blur-[20px] rounded-lg"
                >
                  <ServicesCardAbout
                    img={about_img_3}
                    alt={""}
                    title={"Our Goal"}
                    desc={
                      "We have seen fresh graduates struggle to create their Resumes and fail to pass the initial screening tests due to poorly made CVs. Thus, AI Pro Resume aims to provide you with recruiter-approved resumes so you can land the job you have been dreaming of. We have also been working hard to improve and explore creative ways to help you get the best features for creating your resumes. "
                    }
                  />
                </ScrollAnimation>
              </div>
            </div>
          </section>
        </div>
      </section>
      <div className="relative sm:py-5">
        <Partners />
      </div>
      {/* Reviews Section */}

      <section className="bg-[#eeeef0] pt-6  py-10">
        <div className="container m-auto flex flex-col relative">
          <div className="flex flex-col gap-4 lg:grid  xl:grid-cols-[50%,50%]">
            <div className="items-center">
              <div className="px-4  py-2 relative">
                <h3 className="text-[#0072b1] font-lexend font-bold text-2xl lg:text-4xl w-[100%] lg:w-[80%] 2xl:w-[100%]">
                  Recommended by Experts &{" "}
                  <span className="text-[#00caa5]">Community</span>
                </h3>
                <p className=" text-[black] font-lexend font-semibold text-lg pt-4">
                  Community-reviewed, professional-trusted resume builder for
                  career success and confidence{" "}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-opacity-25 flex flex-col w-full h-fit  items-center px-4  relative">
            <div className="w-full our__reviews">
              {our_reviews && (
                <Slider
                  ref={reviewsSliderRef}
                  {...{
                    dots: true,
                    infinite: true,
                    speed: 500,
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    arrows: false,
                  }}
                  responsive={[
                    {
                      breakpoint: 1300,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: true,
                        dots: true,
                      },
                    },
                    {
                      breakpoint: 800,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        initialSlide: 1,
                      },
                    },
                    {
                      breakpoint: 480,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                      },
                    },
                  ]}
                >
                  {our_reviews?.map((review, idx) => {
                    return (
                      <div key={idx}>
                        <div className="m-auto w-full flex justify-center items-center lg:p-[20px]">
                          <ReviewsCard
                            postedData={review.created_at}
                            review={review.description}
                            stars={review.rating}
                            userName={review.user_name}
                          />
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              )}
            </div>
            <div className="absolute -bottom-8 flex justify-between h-8  px-4 gap-8 w-full items-center">
              {/* Prev */}
              <div
                className="z-10 hidden sm:block"
                onClick={() => reviewsSliderRef.current.slickPrev()}
              >
                <FaLongArrowAltLeft className="text-primary-green text-2xl cursor-pointer transition-all hover:text-3xl" />
              </div>
              {/* next */}
              <div
                className="z-10 hidden sm:block"
                onClick={() => reviewsSliderRef.current.slickNext()}
              >
                <FaLongArrowAltRight className="text-primary-green text-2xl cursor-pointer transition-all hover:text-3xl" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {ads
        .filter((ad) => ad.slug === "about-us-bottom")
        .map((ad) => (
          <div key={ad.id} className="flex justify-center py-3">
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
      {/* footer */}
      <Footer />
    </div>
  );
}

export default Pages;
