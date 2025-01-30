import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { ApiService } from "../../services/ApiService";
import Cookies from "js-cookie";

// Steps Screen
import Header from "./steps_update/header/Header";
import Body from "./steps_update/body/Body";
import Opener from "./steps_update/opener/Opener";
import Closer from "./steps_update/closer/Closer";
import { useAuth } from "../../services/Auth";

const Create_Cover_Example = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  const coverID = useParams().id;
  const [examplesSkills, setExampleSkills] = useState();
  const [exampleJobPositions, setExampleJobPositions] = useState();
  const [categories, setCategories] = useState();

  useEffect(() => {
    ApiService.getResumeExamplesSuggest(user?.token)
      .then((res) => {
        console.log(res.data.data);
        const { technical_skill_examples, job_positions, categories } = res.data.data;
        setExampleSkills(technical_skill_examples);
        setExampleJobPositions(job_positions);
        setCategories(categories);
      })
      .catch((err) => console.log(err));
  }, []);

  const [pageIs, setPageIs] = useState();

  useEffect(() => {
    if (location.pathname.endsWith("/header")) {
      setPageIs("header");
    } else if (location.pathname.endsWith("/opener")) {
      setPageIs("opener");
    } else if (location.pathname.endsWith("/body")) {
      setPageIs("body");
    } else if (location.pathname.endsWith("/closer")) {
      setPageIs("closer");
    }
  }, [location.pathname]);

  // Header Data State for Local
  const [headerLocalData, setHeaderLocalData] = useState();
  // Header Data for Api
  const [coverHeaderData, setCoverHeaderData] = useState({
    name: "",
    first_name: "",
    last_name: "",
    cover_template_id: 0,
    category_id: 0,
    phone_number: 0,
    email_address: "",
    street_address: "",
    country_id: 0,
    state: 0,
    city: 0,
    zip_code: 0,
    categories: 0,
  });
  // Opener Data for Local
  const [openerLocalData, setOpenerLocalData] = useState();
  // Opener Data for Api
  const [coverOpenerData, setCoverOpenerData] = useState({
    experience: "",
    opener_detail: "",
  });
  // Body Data for Local
  const [bodyLocalData, setBodyLocalData] = useState();
  // Body Data for Api
  const [coverBodyData, setCoverBodyData] = useState({
    job_title: "",
    employeer_name: "",
    body_skills: [],
    job_positions: [],
    body_detail: "",
    preview_image: "",
  });
  const [closerLocalData, setCloserLocalData] = useState();
  // Body Data for Api
  const [coverCloserData, setCoverCloserData] = useState({
    closer_detail: "",
  });

  useEffect(() => {
    // Header Data Get From Local Storage
    const headerLocalCookieData = Cookies.get("coverLetterExampleUpdateStep1");
    if (headerLocalCookieData) {
      setHeaderLocalData(JSON.parse(headerLocalCookieData));
    }
    // Opener Data From Local
    const openerLocalCookisData = Cookies.get("coverLetterExampleUpdateStep2");
    if (openerLocalCookisData) {
      setOpenerLocalData(JSON.parse(openerLocalCookisData));
    }
    // Body Data Get From Local
    const bodyLocalCookieData = Cookies.get("coverLetterExampleUpdateStep3");
    if (bodyLocalCookieData) {
      setBodyLocalData(JSON.parse(bodyLocalCookieData));
    }
    // Closer Data From Local
    const closerLocalCookieData = Cookies.get("coverLetterExampleUpdateStep4");
    if (closerLocalCookieData) {
      setCloserLocalData(JSON.parse(closerLocalCookieData));
    }
  }, [location.pathname]);

  useEffect(() => {
    ApiService.getCoverExampleById(user?.token, coverID)
      .then((res) => {
        // Header Data
        const {
          name,
          first_name,
          last_name,
          cover_template_id,
          category_id,
          city,
          country_id,
          email_address,
          phone_number,
          state,
          street_address,
          zip_code,
          categories,
        } = res.data.data.cover_example;

        setCoverHeaderData({
          name,
          first_name,
          last_name,
          cover_template_id,
          category_id,
          city,
          country_id,
          email_address,
          phone_number,
          state,
          street_address,
          zip_code,
          categories,
        });
        // Opener Data
        const { experience, opener_detail } = res.data.data.cover_example;

        setCoverOpenerData({
          experience,
          opener_detail,
        });
        // Body Data
        const { job_title, employeer_name, body_skills, job_positions, body_detail } =
          res.data.data.cover_example;

        setCoverBodyData({
          job_title,
          employeer_name,
          body_skills,
          job_positions,
          body_detail,
        });
        // Body Data
        const { closer_detail, preview_image } = res.data.data.cover_example;

        setCoverCloserData({
          closer_detail,
          preview_image,
        });
      })
      .catch((err) => console.log(err));
  }, [location.pathname]);

  const renderPage = () => {
    switch (pageIs) {
      case "header":
        return (
          <Header
            name={headerLocalData ? headerLocalData.name : coverHeaderData.name}
            first_name={
              headerLocalData
                ? headerLocalData.first_name
                : coverHeaderData.first_name
            }
            last_name={
              headerLocalData
                ? headerLocalData.last_name
                : coverHeaderData.last_name
            }
            cover_template_id={
              headerLocalData
                ? headerLocalData.cover_template_id
                : coverHeaderData.cover_template_id
            }
            categories={categories}
            category_id={
              headerLocalData
                ? headerLocalData.category_id
                : coverHeaderData.category_id
            }
            phone_number={
              headerLocalData
                ? headerLocalData.phone_number
                : coverHeaderData.phone_number
            }
            email_address={
              headerLocalData
                ? headerLocalData.email_address
                : coverHeaderData.email_address
            }
            street_address={
              headerLocalData
                ? headerLocalData.street_address
                : coverHeaderData.street_address
            }
            country_id={
              headerLocalData
                ? headerLocalData.country_id
                : coverHeaderData.country_id
            }
            state={
              headerLocalData
                ? headerLocalData.state
                : coverHeaderData.state
            }
            city={
              headerLocalData
                ? headerLocalData.city
                : coverHeaderData.city
            }
            zip_code={
              headerLocalData
                ? headerLocalData.zip_code
                : coverHeaderData.zip_code
            }
          />
        );
      case "opener":
        return (
          <Opener
            experience={
              openerLocalData
                ? openerLocalData.experience
                : coverOpenerData.experience
            }
            opener_detail={
              openerLocalData
                ? openerLocalData.opener_detail
                : coverOpenerData.opener_detail
            }
          />
        );
      case "body":
        return (
          <Body
            body_detail={
              bodyLocalData
                ? bodyLocalData.body_detail
                : coverBodyData.body_detail
            }
            body_skills={
              bodyLocalData
                ? bodyLocalData.body_skills
                : coverBodyData.body_skills
            }
            job_positions={
              bodyLocalData
                ? bodyLocalData.job_positions
                : coverBodyData.job_positions
            }
            employeer_name={
              bodyLocalData
                ? bodyLocalData.employeer_name
                : coverBodyData.employeer_name
            }
            job_title={
              bodyLocalData ? bodyLocalData.job_title : coverBodyData.job_title
            }
            // ExamplesexamplesPositions
            examplesSkills={examplesSkills ? examplesSkills : []}
            exampleJobPositions={exampleJobPositions ? exampleJobPositions : []}
          />
        );
      case "closer":
        return (
          <Closer
            // Header
            name={
              headerLocalData && headerLocalData.name
                ? headerLocalData.name
                : coverHeaderData.name
            }
            first_name={
              headerLocalData && headerLocalData.first_name
                ? headerLocalData.first_name
                : coverHeaderData.first_name
            }
            last_name={
              headerLocalData
                ? headerLocalData.last_name
                : coverHeaderData.last_name
            }
            cover_template_id={
              headerLocalData
                ? headerLocalData.cover_template_id
                : coverHeaderData.cover_template_id
            }
            category_id={
              headerLocalData
                ? headerLocalData.category_id
                : coverHeaderData.category_id
            }

            phone_number={
              headerLocalData
                ? headerLocalData.phone_number
                : coverHeaderData.phone_number
            }
            email_address={
              headerLocalData
                ? headerLocalData.email_address
                : coverHeaderData.email_address
            }
            street_address={
              headerLocalData
                ? headerLocalData.street_address
                : coverHeaderData.street_address
            }
            country_id={
              headerLocalData
                ? headerLocalData.country_id
                : coverHeaderData.country_id
            }
            state={
              headerLocalData
                ? headerLocalData.state
                : coverHeaderData.state
            }
            city={
              headerLocalData
                ? headerLocalData.city
                : coverHeaderData.city
            }
            zip_code={
              headerLocalData
                ? headerLocalData.zip_code
                : coverHeaderData.zip_code
            }
            // Opener
            experience={
              openerLocalData
                ? openerLocalData.experience
                : coverOpenerData.experience
            }
            opener_detail={
              openerLocalData
                ? openerLocalData.opener_detail
                : coverOpenerData.opener_detail
            }
            // Body
            body_detail={
              bodyLocalData
                ? bodyLocalData.body_detail
                : coverBodyData.body_detail
            }
            body_skills={
              bodyLocalData
                ? bodyLocalData.body_skills
                : coverBodyData.body_skills
            }
            job_positions={
              bodyLocalData
                ? bodyLocalData.job_positions
                : coverBodyData.job_positions
            }
            employeer_name={
              bodyLocalData
                ? bodyLocalData.employeer_name
                : coverBodyData.employeer_name
            }
            job_title={
              bodyLocalData ? bodyLocalData.job_title : coverBodyData.job_title
            }
            // Closer
            closer_detail={
              closerLocalData
                ? closerLocalData.closer_detail
                : coverCloserData.closer_detail
            }
            preview_image={
              closerLocalData
                ? closerLocalData.preview_image
                : coverCloserData.preview_image
            }
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="p-2">
        <div className="border h-full">
          {/* Inputs Author */}

          {/* Cover Inputs*/}
          <div className="py-6 px-4">
            <h1 className="text-2xl font-bold">UPDATE COVER EXAMPLE</h1>
          </div>
          <hr />
          {/* Content */}
          <div className="flex">
            {/* Sidebar */}
            <div className="w-[150px] border-r">
              {/* Links */}
              <div className="flex flex-col gap-4">
                <NavLink
                  to={"header"}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                        ? "bg-primary text-white p-4"
                        : "p-4"
                  }
                >
                  Header
                </NavLink>
                <NavLink
                  to={"opener"}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                        ? "bg-primary text-white p-4"
                        : "p-4"
                  }
                >
                  Opener
                </NavLink>
                <NavLink
                  to={"body"}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                        ? "bg-primary text-white p-4"
                        : "p-4"
                  }
                >
                  Body
                </NavLink>
                <NavLink
                  to={"closer"}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                        ? "bg-primary text-white p-4"
                        : "p-4"
                  }
                >
                  Closer
                </NavLink>
              </div>
            </div>
            {/* Content outlet */}
            <div className="flex-1 px-4 py-8 max-h-[650px] min-h-[650px] overflow-y-scroll no-scrollbar">
              {renderPage()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create_Cover_Example;
