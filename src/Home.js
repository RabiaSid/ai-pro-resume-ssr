import React, { useEffect, useState } from "react";
import service_1 from "./assets/images/service_1.webp";
import service_2 from "./assets/images/service_2.webp";
import service_3 from "./assets/images/service_3.webp";
import banner_about from "./assets/images/main_image.webp";
import icon_1 from "./assets/images/icon_1.webp";
import icon_5 from "./assets/images/icon_5.webp";
import icon_2 from "./assets/images/icon_2.webp";
import icon_6 from "./assets/images/icon_6.webp";
import icon_3 from "./assets/images/icon_3.webp";
import icon_7 from "./assets/images/icon_7.webp";
import icon_4 from "./assets/images/icon_4.webp";
import icon_8 from "./assets/images/icon_8.webp";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import "./css/style2.css";
import { useAuth } from "./services/Auth";
import { ReactTyped } from "react-typed";
import NinaButton from "./components/NinaButton";
import Partners from "./components/shared-components/Partners";
import FeaturesFlipCard from "./components/FeaturesFlipCard";
import ReviewsCard from "./components/shared-components/ReviewsCard";
// Slider Image
import MainSliderImage1 from "./assets/images/home_slider/slider_1.webp";
import MainSliderImage2 from "./assets/images/home_slider/slider_2.webp";
import MainSliderImage3 from "./assets/images/home_slider/slider_3.webp";
import MainSliderImage4 from "./assets/images/home_slider/slider_4.webp";
import MainSliderImage5 from "./assets/images/home_slider/slider_5.webp";
import ScrollAnimation from "react-animate-on-scroll";
import ServicesCard from "./components/shared-components/ServicesCard";
import {
  FaCheckCircle,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
} from "react-icons/fa";
//
import shadeImage01 from "./assets/images/pattrens/01.webp";
import shadeImage02 from "./assets/images/pattrens/02.webp";
import shadeImage03 from "./assets/images/pattrens/03.webp";
import PattrenGreen from "./assets/images/pattrens/multi-liners-blue.webp";
//
import ResumeHomeShow from "./components/ResumeHomeShow";
import { ApiService } from "./services/ApiService.jsx";
import OurFaqs from "./components/faq";
import SeoMetaTags from "./components/seo/seo";
// C:\Users\kamal\OneDrive\Desktop\RIMSHA NAEEM\AiProResume\ai-pro-resume\src\img
function Home() {
  const [random_services, set_random_services] = useState([" ", " "]);
  const [our_reviews, set_our_reviews] = useState([" ", " ", " "]);

  const { user } = useAuth();

  const fetchData = async () => {
    try {
      const reviewsResponse = await axios.get(global.baseurl + "/our-reviews");

      set_our_reviews(reviewsResponse.data.data);

      const servicesResponse = await axios.get(
        global.baseurl + "/random-services"
      );
      set_random_services(servicesResponse.data.data.services);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const reviewsSliderRef = React.useRef(null);

  const images = [
    MainSliderImage1,
    MainSliderImage2,
    MainSliderImage3,
    MainSliderImage4,
    MainSliderImage5,
  ];

  const ZoomCarousel = () => {
    const [cImage, setCurrentIndex] = useState(0);

    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000); // Change the interval time (in milliseconds) as needed

      return () => clearInterval(intervalId); // Cleanup function to clear the interval on component unmount
    }, []);

    return (
      <div className="w-full lg:w-[700px] slick__main__holder">
        {images.map((img, idx) => {
          return (
            <img
              key={idx}
              src={img}
              className={`${idx === cImage ? "active" : "inActive"} skew-y-12`}
              alt={`image${idx + 1}`}
            />
          );
        })}
      </div>
    );
  };

  const points = [
    {
      content: `<strong style="color: #0072b1">Professional</strong> and <strong style="color: #0072b1">Modern</strong> templates  of CV templates`,
    },
    {
      content: `<strong style="color: #0072b1"> Template Customization </strong> ( colors, fonts )`,
    },
    {
      content: `Hassle-free <strong style="color: #0072b1"> Template Switching`,
    },
    {
      content: `<strong style="color: #0072b1"> Drag and Drop </strong>feature`,
    },
    {
      content: `<strong style="color: #0072b1"> Win coins </strong>by referring your friends`,
    },
    {
      content: `<strong style="color: #0072b1"> Discount coupons </strong>for repeated clients
      `,
    },
  ];

  const [faqs, set_faqs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const [seoData, setSeoData] = useState({
    title: "",
    description: "",
    share_image: "",
    image_url: "", // Assuming image_url is also provided
  });

  useEffect(() => {
    ApiService.getSettingForWebsite()
      .then((res) => {
        setSeoData(res.data.data.settings);
        console.log(res.data.data.settings, "api seo object");
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(seoData);

  return (
    <>
      <Header />
      {/* <TawkToWidget /> */}

      {/* Main Banner */}
      <div className="relative flex justify-between  bg-white bg-opacity-25 flex-col">
        {/* Shape Pattrens top Banner */}
        <div className="absolute w-full h-[600px] flex  justify-center items-center -z-10 overflow-hidden">
          <img
            src={shadeImage01}
            alt="full shade image"
            className="w-[800px] relative left-[1000px]  top-[50px] shade_anims"
          />
          <img
            src={shadeImage03}
            alt="full shade image"
            className="w-[1200px] relative left-[400px] top-[-150px] shadee_anim"
          />
          <img
            src={shadeImage02}
            alt="full shade image"
            className="w-[1200px] shadee_anim2 relative top-[50px]"
          />
        </div>
        {/* Banner Section */}
        <section className="w-full">
          <div>
            <div className="max-w-[1500px] grid lg:grid-cols-2 gap-4 sm:py-4 m-auto px-4 sm:px-8 2xl:px-0 ">
              {/* Banner Text Section */}
              <div className="text-left py-6 mt-4">
                <h1 className="text-primary-black font-Lexend font-bold text-2xl lg:text-4xl xl:text-5xl  sm:leading-[1.7] md:leading-[1.5] lg:leading-[1.5] 2xl:leading-[1.2] text-center  sm:text-left  ">
                  <span className="drop-shadow-lg">
                    Let AI Build the Resume
                  </span>{" "}
                  <br />
                  <div className="drop-shadow-lg">
                    <ReactTyped
                      className="text-transparent bg-clip-text bg-gradient-to-r from-primary-blue to-primary-green "
                      strings={["That Builds Your Career"]}
                      loop
                      typeSpeed={30}
                      backSpeed={40}
                      backDelay={4000}
                      showCursor
                    />
                  </div>
                  {/* <br /> Your Path to Crafting a Refined Resume with Ease! */}
                </h1>

                <p className="m-auto text-justify sm:text-left sm:text-lg  mt-4 text-slate-800  font-Lexend font-normal leading-[1.5] ">
                  Build a <b>professional resume</b> with our outstanding{" "}
                  <b>resume maker </b>
                  in no time. AI Pro Resume is an easy, fast, free,{" "}
                  <b>creative resume-building</b> platform with incredible
                  features and services. You can create a professional,
                  eye-catching resume with custom colors and fonts. Our{" "}
                  <b>ATS Friendly templates </b> ensure you get a notice from
                  the employer. Get incredible{" "}
                  <b>resume and cover letter writing services</b> to level up
                  your game. Our smart AI-based cover letter and suggestions
                  increase your chances of landing your dream interview. Make a
                  big move with our resume parser and open global job
                  opportunities effortlessly. Let’s get started!
                </p>
                <div className="flex flex-row items-center gap-2 sm:gap-6 py-5 sm:hidden">
                  <NinaButton
                    className={"w-[80%] m-auto lg:m-0 sm:w-fit"}
                    childClassName={"w-full sm:w-fit"}
                    title={"IMPORT RESUME"}
                    mainColor={"#0072b1"}
                    sliderColor={"#fff59c"}
                    mainTextColor={"#FFFFFF"}
                    hoverTextColor={"#0072b1"}
                    link={user?.token ? "/import-resume" : "/login"}
                  />

                  <NinaButton
                    className={"w-[80%] m-auto lg:m-0 sm:w-fit"}
                    childClassName={"w-full sm:w-fit"}
                    title={"CREATE RESUME"}
                    mainColor={"#0072b1"}
                    sliderColor={"#fff59c"}
                    mainTextColor={"#FFFFFF"}
                    hoverTextColor={"#0072b1"}
                    link={user?.token ? "/resume-templates" : "/login"}
                  />
                </div>

                {/* Image Slider Section */}
                <div className="flex justify-center items-center xl:justify-end sm:hidden">
                  <ZoomCarousel />
                </div>

                <div className="sm:flex mt-10 flex-row items-center gap-2 sm:gap-6 hidden">
                  <NinaButton
                    className={"w-[80%] m-auto lg:m-0 sm:w-fit"}
                    childClassName={"w-full sm:w-fit"}
                    title={"IMPORT RESUME"}
                    mainColor={"#0072b1"}
                    sliderColor={"#fff59c"}
                    mainTextColor={"#FFFFFF"}
                    hoverTextColor={"#0072b1"}
                    link={user?.token ? "/import-resume" : "/login"}
                  />

                  <NinaButton
                    className={"w-[80%] m-auto lg:m-0 sm:w-fit"}
                    childClassName={"w-full sm:w-fit"}
                    title={"CREATE RESUME"}
                    mainColor={"#0072b1"}
                    sliderColor={"#fff59c"}
                    mainTextColor={"#FFFFFF"}
                    hoverTextColor={"#0072b1"}
                    link={user?.token ? "/resume-templates" : "/login"}
                  />
                </div>
              </div>
              {/* Image Slider Section */}
              <div className="sm:flex justify-center items-center xl:justify-end mt-10 hidden">
                <ZoomCarousel />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-2 px-2 flex justify-center items-center flex-wrap relative">
          <h3
            className="sm:leading-[1.7] md:leading-[1.5] lg:leading-[1.5] 2xl:leading-[1.2] text-center  
text-[#0072b1] font-lexend font-bold text-xl md:text-3xl  w-[100%] drop-shadow-lg sm:py-6"
          >
            {" "}
            <span className="text-[#00caa5] ">
              Try Out Our Professional
            </span>{" "}
            {"Resume Templates​ Now!"}
          </h3>

          <div className="w-full lg:w-[80%] lg:flex px-4  sm:justify-center sm:items-center gap-4 xl:gap-4">
            <ResumeHomeShow />
          </div>
          <div className="flex justify-center items-center w-full pt-8 my-4 text-center">
            <NinaButton
              className={""}
              title={"View All Templates"}
              mainColor={"#0072b1"}
              sliderColor={"#fff59c"}
              mainTextColor={"#FFFFFF"}
              hoverTextColor={"#0072b1"}
              link={user?.token ? "/resume-templates" : "/resume-templates"}
            />
          </div>
        </section>

        {/* Tips section */}
        <section className="overflow-x-hidden ">
          <div className="relative">
            <div className="max-w-[1500px] m-auto px-4">
              <div className=" w-full text-center">
                <ScrollAnimation
                  animateIn="bounceInLeft"
                  animateOnce={true}
                  offset={300}
                >
                  <div className="py-5">
                    <h3 className="text-[#0072b1] drop-shadow-lg font-Lexend font-bold text-2xl md:text-3xl px-4 sm:px-0">
                      What Makes Us
                      <span className="text-[#00caa5] ml-4 text-2xl md:text-3xl">
                        The Best Resume Builder
                      </span>{" "}
                      Online?
                      <br />
                    </h3>
                    <div className="grid gap-4 mt-10 sm:grid-cols-2 xl:grid-cols-3 font-Lexend sm:px-0">
                      <div className="p-6 shadow-[0_0_50px_0px_rgba(0,0,0,0.15)] rounded-lg bg-white flex">
                        <div className="flex-shrink-0">
                          <img
                            src={service_1}
                            alt="My Image"
                            width={70}
                            height={70}
                            className="shadow-[0_0_1px_0px_rgba(0,0,0,0.2)]  w-[60px]  rounded-lg"
                          />
                        </div>
                        <div className="ml-4 text-start">
                          <h2 className="font-bold text-lg drop-shadow-lg text-primary-black font-Lexend leading-[1.5]">
                            Personalized AI-Based Suggestions
                          </h2>
                          <p className="text-slate-800 mt-2 text-sm leading-[1.5] text-left">
                            AI Pro Resume is your <b>resume specialist</b> that
                            provides AI-based personalized suggestions based on
                            your skills and experiences. These suggestions can
                            speed up your cover letter and <b>resume-making</b>{" "}
                            process.
                          </p>
                        </div>
                      </div>
                      <div className="p-6 shadow-[0_0_50px_0px_rgba(0,0,0,0.15)] rounded-lg bg-white flex">
                        <div className="flex-shrink-0">
                          <img
                            src={service_2}
                            alt="My Image"
                            width={70}
                            height={70}
                            className="shadow-[0_0_1px_0px_rgba(0,0,0,0.2)] w-[60px]  rounded-lg"
                          />
                        </div>
                        <div className="ml-4 text-start">
                          <h2 className="font-bold drop-shadow-lg text-lg text-primary-black font-Lexend leading-[1.5]">
                            Resume Parser
                          </h2>
                          <p className="text-slate-800 mt-2 text-sm leading-[1.5] text-left">
                            With the <b>perfect resume builder</b>, you do not
                            have to write or copy-paste your data. Just import
                            your current resume and see the magic of our resume
                            parser tool. It fetches all the data from your file
                            and transfers them to <b>creative resume maker</b>.
                          </p>
                        </div>
                      </div>
                      <div className="p-6 shadow-[0_0_50px_0px_rgba(0,0,0,0.15)] rounded-lg bg-white flex sm:col-span-2 xl:col-span-1">
                        <div className="flex-shrink-0">
                          <img
                            src={service_3}
                            alt="My Image"
                            widtsh={70}
                            height={70}
                            className="shadow-[0_0_1px_0px_rgba(0,0,0,0.2)] w-[60px]  rounded-lg"
                          />
                        </div>
                        <div className="ml-4 text-start">
                          <h2 className="font-bold drop-shadow-lg text-lg text-primary-black font-Lexend leading-[1.5]">
                            ATS Friendly Templates
                          </h2>
                          <p className="text-slate-800 mt-2 text-sm leading-[1.5] text-left">
                            AI Pro Resume allows you to create an{" "}
                            <b>ATS-friendly resume</b> that will pass the ATS
                            scan without hassle. We help you{" "}
                            <b>design resumes</b> that maximize your chance of
                            being noticed by employers and application tracking
                            systems.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>
                <ScrollAnimation
                  animateIn="bounceInRight"
                  animateOnce={true}
                  className="bg-transparent"
                >
                  <div className="justify-center hidden xl:flex">
                    <img src={banner_about} alt="about" />
                  </div>
                  <div className="flex justify-center items-center w-full mt-6">
                    <NinaButton
                      className={""}
                      title={"LETS BUILD YOUR RESUME"}
                      mainColor={"#0072b1"}
                      sliderColor={"#fff59c"}
                      mainTextColor={"#FFFFFF"}
                      hoverTextColor={"#0072b1"}
                      link={user?.token ? "/resume-templates" : "/login"}
                    />
                  </div>
                </ScrollAnimation>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Services Section */}
      <section className={"relative"}>
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
        <div className="container m-auto overflow-hidden py-8 px-8">
          <div className="grid grid-cols-1  sm:grid-cols-2 xl:grid-cols-4 gap-2">
            {random_services?.map((service, idx) => (
              <ScrollAnimation
                animateIn="bounceInUp"
                delay={0}
                animateOnce={true}
                className="bg-[rgba(255,255,255,0.4)] hover:bg-[rgba(255,255,255,0.9)] cursor-pointer backdrop-blur-[10px] rounded-lg"
                key={idx}
              >
                <ServicesCard
                  img={global.imageUrl + service.image}
                  alt={service.name}
                  title={service.name}
                  points={service.description}
                />
              </ScrollAnimation>
            ))}
          </div>
          <div className="flex justify-center items-center w-full pt-8">
            <NinaButton
              className={""}
              title={"Let's Explore Services"}
              mainColor={"#0072b1"}
              sliderColor={"#fff59c"}
              mainTextColor={"#FFFFFF"}
              hoverTextColor={"#0072b1"}
              link={user?.token ? "/services" : "/login"}
            />
          </div>
        </div>
      </section>

      <section
        // style={{ backgroundImage: "url('" + banner_bg + "')" }}
        className="bg-[#01b2ac] relative overflow-hidden "
      >
        <div className="absolute bottom-0 w-[800px] right-0 ">
          <img src={PattrenGreen} alt="pattren image" className="animate3d" />
        </div>
        <div className="container m-auto w-full bg-no-repeat bg-cover py-10 xl:flex items-center justify-between px-4 ">
          <div className="w-[100%] xl:w-[30%]">
            <h3 className="text-white drop-shadow-lg font-lexend font-bold text-2xl md:text-4xl leading-[1.5] text-center sm:text-left">
              Features Designed To
              <br />
              Help You Win
              <br />
              <span
                style={{ color: "#0072b1" }}
                className="bg-no-repeat bg-cover pt-4 pb-2 leading-[2] font-lexend font-bold"
              >
                Your Dream Job
              </span>
            </h3>
            <p className="drop-shadow-lg text-white text-lg text-center sm:text-left font-semibold py-2">
              {
                "Make a resume by using our incredible features to stand out from the rest."
              }
            </p>
            <br />
          </div>

          <div className="w-[100%] xl:w-[70%] lg:flex items-center justify-between relative">
            <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
              {/* 1 */}
              <FeaturesFlipCard
                icon={icon_1}
                title={"Tested Templates"}
                text={
                  "Benefit from industry-specific insights and keywords seamlessly infused into your documents."
                }
              />
              {/* 2 */}
              <FeaturesFlipCard
                icon={icon_5}
                title={"ATS Friendly Templates"}
                text={
                  "Built professional resumes and cover letters with our free resume maker that passes the application tracking systems."
                }
              />
              {/* 3 */}
              <FeaturesFlipCard
                icon={icon_2}
                title={"Spell & Grammar Checker"}
                text={
                  "Use AI Pro Resume to build and redefine a resume with our advanced grammar checker that fixes spelling and grammar."
                }
              />
              {/* 4 */}
              <FeaturesFlipCard
                icon={icon_6}
                title={"Pre-Written Examples"}
                text={
                  "Choose from our prewritten resumes and cover letters for popular roles so you spend less time writing and more time applying."
                }
              />
              {/* 5 */}
              <FeaturesFlipCard
                icon={icon_3}
                title={"AI-Powered Content"}
                text={`Use our AI resume assistant for fascinating suggestions regarding engaging summaries, job duties, skills, and body content. 

`}
              />
              {/* 6 */}
              <FeaturesFlipCard
                icon={icon_7}
                title={"Human Review"}
                text={`Get perfectly designed resumes and cover letters with expert human reviews and professional resume writing services. 
`}
              />
              {/* 7 */}
              <FeaturesFlipCard
                icon={icon_4}
                title={"Easy to Edit and Customize"}
                text={`Our resume helper lets you easily modify and adapt content to align with your unique skills and experiences.`}
              />
              {/* 8 */}
              <FeaturesFlipCard
                icon={icon_8}
                title={"Transparent Pricing"}
                text={`What you see is what you pay at the best resume maker. We offer affordable resume writing services, cover letter writing services and review.  
`}
              />
            </div>
          </div>
        </div>
      </section>

      <OurFaqs />
      {/* Our Clients */}
      <div className="relative ">
        <Partners />
      </div>
      {/* Reviews Section */}
      <section className="bg-[#eeeef1] pt-6  py-10">
        <div className="container m-auto flex flex-col relative">
          <div className="flex flex-col gap-4 lg:grid justify-center text-center">
            <div className="items-center">
              <div className="px-4  py-2 relative">
                <h3 className="text-[#0072b1] drop-shadow-lg font-lexend font-bold text-2xl lg:text-4xl w-[100%] lg:w-[80%] 2xl:w-[100%]">
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

          <div className="bg-opacity-25 flex flex-col w-full h-fit  items-center px-4 mb-10 mt-4 relative">
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
                        <div className="font-Lexend m-auto w-full flex justify-center items-center lg:px-[15px] py-[30px]">
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
            <div className="absolute -bottom-8 flex justify-between h-8 px-4 gap-12 w-full items-center">
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

      <Footer />
      <SeoMetaTags seoData={seoData} />
      {/* <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData?.description} />
        <meta property="og:title" content={seoData?.title} />
        <meta property="og:description" content={seoData?.description} />
        <meta
          property="og:image"
          content={`${seoData.image_url}/${seoData.share_image}`}
          // content={`https://backend.aiproresume.com/public/images/${seoData.share_image}`}
        />
      </Helmet> */}
    </>
  );
}

export default Home;
