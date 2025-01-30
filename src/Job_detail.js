import React, { useState, useEffect } from "react";

import Header from "./Header";
import Footer from "./Footer";
import { Link, useParams } from "react-router-dom";
import "react-awesome-slider/dist/styles.css";
import axios from "axios";
import { BiSolidChevronsRight } from "react-icons/bi";

import ServicePageBanner from "./components/ServicePageBanner";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";

import MainBanner from "./components/MainBanner";
import { ApiService } from "./services/ApiService";
import { useAuth } from "./services/Auth";

function Pages() {
  const [our_settings, set_our_settings] = useState([]);
  const [job, setJobs] = useState([]);
  const { slug } = useParams();
  const [userDetails, setUserDetails] = useState();

  const { user } = useAuth();
  const shareTitle = "Check out this link!";
  const shareImageUrl = "https://aiproresume.com/favicon.png";
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
    axios
      .get(global.baseurl + "/show-job/" + slug)
      .then((response) => {
        setJobs(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(global.baseurl + "/our-settings")
      .then((response) => {
        set_our_settings(response.data.data.settings);
      })
      .catch((error) => {
        console.log(error);
      });

    ApiService.getUserDetails(user?.token)
      .then((res) => {
        setUserDetails(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Function to split the text and add icons
  const addIconsToText = (text) => {
    if (!text) return;
    const sentences = text.split(".");
    return sentences.map((sentence, index) => {
      if (sentence.trim() !== "") {
        return (
          <div
            key={index}
            className="flex sm:items-center gap-1 text-[#b2b2b2] leading-5 text-sm sm:text-xl"
          >
            <BiSolidChevronsRight className="text-[#0e7eb1] w-5" />
            {sentence + "."}
          </div>
        );
      }
      return null;
    });
  };

  return (
    <div>
      {/* header */}
      <Header />

      <div className="w-full h-[20%]">
        <ServicePageBanner
          startHeadingText={"Embark on Your Future Journey with an"}
          highLightedText={"AI Professional Resume"}
          endText={" to Unlock Career Paths"}
          description={
            "Explore the nuances of each role, understand the latest industry trends, and gain clarity on the where u can fit Yourself"
          }
        />
      </div>

      <section className="w-full bg-[#fff] py-10 px-10 2xl:px-40 flex flex-wrap flex-col justify-between align-middle">
        {ads
          .filter((ad) => ad.slug === "career-detail-top")
          .map((ad) => (
            <div key={ad.id} className="mb-10 lg:mb-20">
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
        {/* Job Name Section */}
        <div className="relative text-left w-full">
          <h1 className="text-[#00caa5] font_1 text-xl sm:text-4xl leading-[1.2]">
            {job.name}
          </h1>
        </div>
        {/* Details Section */}
        <div className="flex flex-col gap-8">
          <div className="flex justify-start items-center flex-wrap">
            <div className="flex flex-col gap-6">
              <div
                id="textWithIcons"
                className="flex flex-col gap-3 blogContent2"
                dangerouslySetInnerHTML={{ __html: job.long_description }}
              ></div>
            </div>
          </div>
          {/* <div className="flex justify-start items-center flex-wrap">
            <div className="flex flex-col gap-6">
              <h1 className="text-[#00caa5] font_1 text-base sm:text-2xl">
                Requirements and skills:
              </h1>
              <div
                id="textWithIcons"
                className="flex flex-col gap-3 blogContent2"
                dangerouslySetInnerHTML={{ __html: job.long_description }}
              ></div>
            </div>
          </div> */}
        </div>
        {/* Apply Button */}
        <div className="my-3">
          <Link
            to={"/apply-now/" + job.id}
            className="block lg:inline-block  text-center hover:shadow-[0_10px_10px_0px_rgba(0,0,0,0.3)] text-white bg-[#0072b1] hover:text-[#0072b1] hover:bg-white font-semibold text-sm rounded-2xl px-6 py-2 mr-4 border-[#0072b1] border-2 transition-all duration-300 ease-linear"
          >
            APPLY NOW
          </Link>
        </div>
        {/* Share Social Pack Section */}
        <div className="mt-4">
          <div className="relative text-left w-full">
            <h1 className="text-[#0072b1] font_1 text-base sm:text-3xl leading-[1.2]">
              Share this Job on{" "}
              <span className="text-[#00caa5]">Social Platforms</span>
            </h1>

            <>
              <div className="mt-4 flex items-center justify-start gap-[20px]">
                <FacebookShareButton
                  url={global.localPath + "job-detail/" + slug}
                  quote={"Dummy text!"}
                  title={shareTitle}
                  hashtag={"#" + job.name}
                  className="shareiconmy]"
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>

                <WhatsappShareButton
                  url={global.localPath + "job-detail/" + slug}
                  title={shareTitle}
                  image={shareImageUrl}
                  quote={"Dummy text!"}
                  hashtag={"#" + job.name}
                  className="shareiconmy"
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>

                <LinkedinShareButton
                  url={global.localPath + "job-detail/" + slug}
                  title={shareTitle}
                  quote={"Dummy text!"}
                  hashtag={"#" + job.name}
                  className="shareiconmy"
                >
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
              </div>
            </>
          </div>
        </div>
        {ads
          .filter((ad) => ad.slug === "career-detail-bottom")
          .map((ad) => (
            <div key={ad.id} className="mt-5">
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
