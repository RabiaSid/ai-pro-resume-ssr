import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams, useLocation } from "react-router-dom";
import "react-awesome-slider/dist/styles.css";
import axios from "axios";
import LoadingSpiner from "./components/LoadingSpinner";
// import Ai from "/images/Ai.webp";
// import thumbsup from "/images/thumbsup.webp";
// import blog_banner_image from "/images/blog_banner_image.webp";
// import shadeImage01 from "/images/pattrens/01.webp";
// import shadeImage02 from "/images/pattrens/02.webp";
// import shadeImage03 from "/images/pattrens/03.webp";
import LazyLoadImageComp from "./components/lazyLoadImage/lazyLoadImage";
import { useAuth } from "./services/Auth";
import { ApiService } from "./services/ApiService";
import { Helmet } from "react-helmet";

const Ai = "/images/Ai.webp";
const thumbsup = "/images/thumbsup.webp";
const blog_banner_image = "/images/blog_banner_image.webp";
const shadeImage01 = "/images/pattrens/01.webp";
const shadeImage02 = "/images/pattrens/02.webp";
const shadeImage03 = "/images/pattrens/03.webp";

function Pages() {
  const { user } = useAuth();
  const current_page = useParams().page;
  const [recent_blogs, set_recent_blogs] = useState([]);
  const [single_blogs, set_single_blogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ads, setAds] = useState([]);
  // Og Settings
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogImage, setOgImage] = useState("");

  useEffect(() => {
    ApiService.getAllAdsWeb(user?.token)
      .then((response) => {
        setAds(response.data.data.ads);
      })
      .catch((err) => console.log(err));
  }, []);
  const loadData = () => {
    setIsLoading(true);
    axios
      .get(global.baseurl + "/blog/" + current_page)
      .then((response) => {
        set_single_blogs(response.data.data.blog);

        const { image, meta_description, name } = response.data.data.blog;

        setOgTitle(name);
        setOgDescription(meta_description);
        setOgImage(`https://backend.aiproresume.com/public/images/${image}`);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(global.baseurl + "/all-blogs")
      .then((response) => {
        set_recent_blogs(response.data.data.recent_blogs);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const location = useLocation();

  useEffect(() => {
    loadData();
  }, [location.pathname]);

  return (
    <div>
      {isLoading && <LoadingSpiner isLoading={isLoading} />}
      <Helmet>
        {/* Titles */}
        <meta property="og:title" content={ogTitle} />
        <meta name="twitter:title" content={ogTitle} />
        {/* Descriptions */}
        <meta property="og:description" content={ogDescription} />
        <meta name="twitter:description" content={ogDescription} />
        {/* IMages */}
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>
      {/* header */}
      <Header />

      <section className="w-full">
        <div className="w-full pb-4 bg-no-repeat bg-cover bg-center text-center">
          <div className="max-w-[1500px] grid lg:grid-cols-2  m-auto px-4 relative sm:px-8 2xl:px-0 ">
            <div className="absolute w-full flex justify-center items-center overflow-hidden -z-50">
              <img
                src={shadeImage01}
                alt="full shade image"
                className="w-[600px] overflow-hidden"
              />
              <img
                src={shadeImage03}
                alt="full shade image"
                className="hidden 2xl:block w-[300px] lg:w-[400px] absolute  z-[-10000] top-[-80px] lg:top-[-300px] right-0 lg:left-[400px] overflow-hidden"
              />
              <img
                src={shadeImage02}
                alt="full shade image"
                className="hidden 2xl:block w-[500px] lg:w-[600px] absolute z-[-10000] top-[-80px] lg:top-[-100px] right-0 lg:right-[-100px] overflow-hidden"
              />
            </div>
            {/* {/ Banner Text Section /} */}
            <div className="text-left ">
              <h1 className="text-[#0072b1] font-Lexend mt-[50px] md:mt-[100px] text-2xl md:text-4xl">
                {single_blogs.title}
              </h1>
              <div className="flex items-center">
                <div className="flex justify-start items-center">
                  <p className="text-[#0072b1] text-xs sm:text-lg mt-5 font-bold">
                    Posted :{" "}
                  </p>
                  <div className="text-xs sm:text-lg mt-5 mr-4 font-bold ml-2 text-[#0072b1]">
                    {new Date(single_blogs.created_at).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "2-digit",
                        year: "2-digit",
                      }
                    )}
                  </div>
                </div>

                <div className="flex justify-start gap-5 items-center text-white pl-2 mt-5">
                  <div className="font_4 text-xs sm:text-lg font-bold ml-2 text-[#0072b1]">
                    {single_blogs.author_name}
                  </div>
                </div>

                <div className="flex justify-start items-center text-[#0072b1] mt-5 lg:ml-4">
                  <div className="font_4 text-xs sm:text-lg font-bold ml-2 text-[#0072b1]">
                    {single_blogs.views} Views
                  </div>
                </div>
              </div>
            </div>
            {/* {/ Image Slider Section /} */}
            <div className="flex justify-center xl:justify-center  relative res_shade">
              <img
                src={Ai}
                alt="icon"
                className="absolute top-[240px] left-[15px] xl:absolute xl:top-[215px] xl:left-[190px] z-10 lg:left-[111px] md:top-[134px] md:left-[138px] zoom-in-out-box w-[30px] h-[30px] hidden xl:block"
              />
              <img
                src={thumbsup}
                alt="icon"
                className="absolute top-[85px] left-[240px] xl:absolute xl:top-[92px] xl:left-[435px] z-10 lg:left-[111px] md:top-[134px] md:left-[138px] zoom-in-out-box w-[40px] h-[40px] hidden xl:block"
              />

              <img
                src={blog_banner_image}
                alt="services_img"
                className="zoom-in-out-box2 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full mt-10 py-4 px-10 2xl:px-60">
        {ads
          .filter((ad) => ad.slug === "blog-detail-page-top")
          .map((ad) => (
            <div key={ad.id} className="mb-5">
              {ad.is_script === 0 ? (
                <a href={`${ad.ad_url}`} target="blank">
                  <LazyLoadImageComp
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
        <div className="text-wrapper">
          {/* Mobile View */}
          <div className="block sm:hidden">
            <LazyLoadImageComp
              src={global.imageUrl + single_blogs.image}
              alt="blog_ref_img"
              className="mb-6 w-full object-cover"
            />
            <div
              className="content blogContent mb-3"
              dangerouslySetInnerHTML={{
                __html: single_blogs.long_description,
              }}
            ></div>
          </div>

          {/* Desktop View */}
          <div className="hidden sm:block">
            <LazyLoadImageComp
              src={global.imageUrl + single_blogs.image}
              alt="blog_ref_img"
              className="float-left mr-6 mb-6 w-1/2 lg:w-1/3 object-cover"
            />
            <div
              className="content blogContent mb-3"
              dangerouslySetInnerHTML={{
                __html: single_blogs.long_description,
              }}
            ></div>
          </div>
        </div>
        {ads
          .filter((ad) => ad.slug === "blog-detail-page-bottom")
          .map((ad) => (
            <div key={ad.id} className="">
              {ad.is_script === 0 ? (
                <a href={`${ad.ad_url}`} target="blank">
                  <LazyLoadImageComp
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
