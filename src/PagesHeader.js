import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "slick-carousel/slick/slick.css";
import LoadingSpiner from "./components/LoadingSpinner";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "react-router-dom";
import "react-awesome-slider/dist/styles.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import MainBanner from "./components/MainBanner";
import ServicePageBanner from "./components/ServicePageBanner";
import { useAuth } from "./services/Auth";
import { ApiService } from "./services/ApiService";
import Tips from "./components/Tips";
import LazyLoadImageComp from "./components/lazyLoadImage/lazyLoadImage";
function Pages() {
  const current_page = useParams().page;
  const { user } = useAuth();
  const [show_pages, set_show_pages] = useState([]);
  const [show_heading1, set_heading1] = useState([]);
  const [show_heading2, set_heading2] = useState([]);
  const [show_heading3, set_heading3] = useState([]);
  const [our_clients, set_our_clients] = useState([]);
  const [our_reviews, set_our_reviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ads, setAds] = useState([]);
  useEffect(() => {
    ApiService.getAllAdsWeb(user?.token)
      .then((response) => {
        setAds(response.data.data.ads);
        // console.log(response.data.data.ads);
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
      set_our_reviews(response.data.data);
    });

    axios
      .get(global.baseurl + "/page/" + current_page)
      .then((response) => {
        console.log(response.data.data);
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

  return (
    <div>
      {isLoading && <LoadingSpiner isLoading={isLoading} />}
      {/* header */}
      <Header />

      {show_pages.show_boxes === 1 ? <Tips pageDetail={show_pages} /> : ""}

      {ads
        .filter((ad) => ad.slug === "page-header-top")
        .map((ad) => (
          <div key={ad.id} className="flex justify-center my-4">
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

      <section className="w-full py-10 px-10 lg:px-40 flex flex-wrap justify-between">
        <div className="w-[100%] xl:w-[100%]">
          <div id="less">
            <p className="w-[90%] lg:w-[100%] xl:w-[100%] mt-4 text-slate-500 font_2 text-md leading-[1.6] mb-12">
              {show_pages.short_description}
            </p>
          </div>

          <div id="more" className="page_header" style={{ display: "block" }}>
            <p className="w-[90%] lg:w-[100%] xl:w-[100%] mt-4 font_2 text-md leading-[1.6] mb-12 content blogContent">
              <p
                dangerouslySetInnerHTML={{
                  __html: show_pages.long_description,
                }}
              ></p>
            </p>
          </div>
        </div>
      </section>

      {/* footer */}
      <Footer />
    </div>
  );
}

export default Pages;
