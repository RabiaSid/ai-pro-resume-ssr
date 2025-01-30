import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import { ApiService } from "./services/ApiService";
import PackageCard from "./components/PackageCard";
import { useAuth } from "./services/Auth";
import axios from "axios";
import Footer from "./Footer";
import PackageCardSkeleton from "./components/shared-components/PackageCardSkeleton";
import CoinsPurchase from "./components/CoinsPurchase";
import { useLocation } from "react-router-dom";
import OurFaqs from "./components/faq";
import LazyLoadImageComp from "./components/lazyLoadImage/lazyLoadImage";

function Packages({ }) {
  const { user } = useAuth();
  const [packages, setPackages] = useState();
  const [subscription, setSubscription] = useState();
  const [user2, setUser] = useState([]);
  const [packageDetailText, setPackageDetailText] = useState("");
  const [scroll_checking, set_scroll_checking] = useState(0);

  // Coins
  const [ads, setAds] = useState([]);
  const detailSectionRef = useRef(null);

  useEffect(() => {
    ApiService.getAllAdsWeb(user?.token)
      .then((response) => {
        setAds(response.data.data.ads);
        console.log(response.data.data.ads);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (scroll_checking == 1) {
      detailSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    set_scroll_checking(1);
  }, [packageDetailText]);

  useEffect(() => {
    ApiService.showAllPackages()
      .then((res) => {
        setPackages(res.data.data);
      })
      .catch((err) => console.log(err));

    if (user?.token) {
      ApiService.getMyAllServices(user?.token)
        .then((res) => {
          setSubscription(res.data.data.subscription);
        })
        .catch((err) => console.log(err));

      const headers = {
        Authorization: "Bearer " + user?.token,
      };

      axios
        .get(global.baseurl + "/user_details", { headers })
        .then((data) => {
          if (data) {
            setUser(data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#coins_purchase") {
      const element = document.getElementById("coins_purchase");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div>
      <Header />
      <div className="w-full">
        <div className="container m-auto py-6 sm:py-10 px-4 sm:px-0">
          {/* Content */}

          <div className="flex flex-col gap-10">
            {/* Basic Heading */}
            <div className="flex flex-col gap-2 items-center justify-center">
              <h1 className="font-Lexend font-bold text-xl text-center sm:text-2xl">
                Get the Perfect Plan for Your Career Goals
              </h1>
              <span className="font-Lexend text-left">
                Find the perfect plan to create standout resumes and cover
                letters. AI Pro Resume offers incredible features and
                fascinating tools that allow you to create standout documents.
                Explore our professional packages that possess top-notch
                templates, AI-based suggestions, spell & grammar checkers, and
                Resume parser tools. Build your professional resume and cover
                letter that passes ATS scanners and assists you in landing your
                dream interview. Select the perfect package for your needs.
              </span>
              <span className="font-Lexend text-left">
                You have the flexibility to purchase a single premium resume or
                cover letter template at an affordable price. By opting for a
                package, you can enjoy unlimited access to multiple premium
                templates at no additional cost. Additionally, premium cover
                letter and resume creation services are available individually
                on the service page. Our separate pricing gives you more options
                to meet your specific needs.
              </span>
            </div>
            {/* Cards */}
            <div className="flex flex-wrap gap-4 items-center justify-center">
              {packages?.length > 0 ? (
                <>
                  {packages?.map((p, idx) => {
                    return (
                      <PackageCard
                        id={p.id}
                        key={idx}
                        daysAccess={p.duration}
                        packageName={p.name}
                        price={p.price}
                        packagefeatures={p.description}
                        userCurrentId={user2?.package_id}
                        currentPackageEndDate={subscription?.end_date}
                        setPackageDetailText={setPackageDetailText}
                      />
                    );
                  })}
                </>
              ) : (
                <>
                  {[...Array(3)].map((_, index) => (
                    <PackageCardSkeleton key={index} />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        <h1
          ref={detailSectionRef}
          className="container m-auto px-2 text-left flex flex-wrap my-5 items-center justify-center font-Lexend text-primary-black"
        >
          {/* You have the flexibility to purchase a single premium resume or cover letter template at an affordable price. By opting for a package, you can enjoy unlimited access to multiple premium templates at no additional cost. Additionally, premium cover letter and resume creation services are available individually on the service page. Our separate pricing gives you more options to meet your specific needs.
          <br/><br/> */}
          {packageDetailText}
        </h1>
        <div id="coins_purchase">
          <CoinsPurchase />
        </div>

        {/* Pay Grid */}
        {/* <div>
          <div className="w-[80%] mb-[30px] sm:w-[400px] m-auto rounded-lg overflow-hidden">
            <img src={payGridImg} alt="pay grid" className="w-full" />
          </div>
        </div> */}
        <OurFaqs />
      </div>
      {ads
        .filter((ad) => ad.slug === "pricing-bottom")
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
      <Footer />
    </div>
  );
}

export default Packages;
