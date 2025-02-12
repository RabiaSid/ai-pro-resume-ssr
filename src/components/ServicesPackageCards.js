import React from "react";
import PackageCard from "../components/PackageCard";
import { useState, useEffect } from "react";
import { useAuth } from "../services/Auth";
import { ApiService } from "../services/ApiService";
import axios from "axios";

const payGridImg = "/images/pay_grid.webp";
export default function ServicesPackageCards() {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [packages, setPackages] = useState();
  const [userData, setUserData] = useState();

  useEffect(() => {
    ApiService.showAllPackages(user?.token)
      .then((res) => {
        setPackages(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => console.log(err));

    // User Data
    ApiService.getUserDetails(user?.token)
      .then((res) => {
        console.log(res.data);
        setUserData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${global.baseurl}/web-services`)
      .then((res) => {
        // console.log(res.data.data.services);
        setServices(res.data.data.services);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="w-full bg_image">
        <div className="container m-auto py-6 sm:py-5 px-4 sm:px-0 font-Lexend">
          {/* Content */}
          <div className="flex flex-col gap-20">
            {/* Basic Heading */}
            <div className="flex flex-col gap-2 items-center justify-center">
              <h1 className="font-bold text-xl text-center sm:text-2xl">
                Upgrade Now for Instant Access to All Features
              </h1>
              <span className="text-base text-center mt-2">
                Supercharge Your Resume Creating Experience with our perfectly
                designed plans.
              </span>
            </div>
            {/* Cards */}
            <div className="flex flex-wrap gap-4 items-center justify-center">
              {packages?.map((p, idx) => {
                return (
                  <PackageCard
                    id={p.id}
                    userCurrentId={userData?.package_id}
                    currentPackageEndDate={userData?.end_date}
                    key={idx}
                    daysAccess={p.duration}
                    packageName={p.name}
                    price={p.price}
                    packagefeatures={p.description}
                  />
                );
              })}
            </div>
            {/* Pay Grid */}
            <div>
              <div className="w-[80%] sm:w-[400px] m-auto rounded-lg overflow-hidden">
                <img src={payGridImg} alt="pay grid" className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
