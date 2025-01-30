import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ApiService } from "../../services/ApiService";
import Cookies from "js-cookie";
// Steps Screen
import Header from "./steps/header/Header";
import Body from "./steps/body/Body";
import Opener from "./steps/opener/Opener";
import Closer from "./steps/closer/Closer";
import { useAuth } from "../../services/Auth";

const Create_Cover_Example = ({ children }) => {
  const location = useLocation();

  const { user } = useAuth();

  const [examplesSkills, setExampleSkills] = useState();
  const [exampleJobPositions, setExampleJobPositions] = useState();
  const [categories, setCategories] = useState();

  useEffect(() => {
    ApiService.getResumeExamplesSuggest(user?.token)
      .then((res) => {
        console.log(res.data.data);
        const { technical_skill_examples, job_positions, categories } =
          res.data.data;
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

  const [coverHeaderData, setCoverHeaderData] = useState({
    name: "",
    first_name: "",
    last_name: "",
    cover_template_id: 0,
    category_id: 0,
    preview_image: "",
    phone_number: 0,
    email_address: "",
    street_address: "",
    country_id: 0,
    state_id: 0,
    city_id: 0,
    zip_code: 0,

  });

  const [coverOpenerData, setCoverOpenerData] = useState({
    experience: "",
    opener_detail: "",
  });

  const [coverBodyData, setCoverBodyData] = useState({
    job_title: "",
    employeer_name: "",
    body_skills: [],
    job_positions: [],
    body_detail: "",
  });

  useEffect(() => {
    const headerData = Cookies.get("coverLetterExampleStep1") || null;
    const OpenerData = Cookies.get("coverLetterExampleStep2") || null;
    const bodyData = Cookies.get("coverLetterExampleStep3") || null;
    // Header Data
    if (headerData) {
      const {
        name,
        first_name,
        last_name,
        cover_template_id,
        category_id,
        preview_image,
        phone_number,
        email_address,
        street_address,
        country_id,
        state_id,
        city_id,
        zip_code,
        categories,
      } = JSON.parse(headerData);
      setCoverHeaderData((prev) => ({
        ...prev,
        name,
        first_name,
        last_name,
        cover_template_id,
        category_id,
        preview_image,
        phone_number,
        email_address,
        street_address,
        country_id,
        state_id,
        city_id,
        zip_code,
        categories,
      }));
    }
    // OPener Data
    if (OpenerData) {
      const { experience, opener_detail } = JSON.parse(OpenerData);
      setCoverOpenerData((prev) => ({
        ...prev,
        experience,
        opener_detail,
      }));
    }
    // Body Data
    if (bodyData) {
      const { job_title, employeer_name, body_skills, job_positions, body_detail } =
        JSON.parse(bodyData);
      console.log(bodyData);
      setCoverBodyData((prev) => ({
        ...prev,
        job_title,
        employeer_name,
        body_skills,
        job_positions,
        body_detail,
      }));
    }
  }, [location.pathname]);

  const renderPage = () => {
    switch (pageIs) {
      case "header":
        return (
          <Header
            name={coverHeaderData.name}
            first_name={coverHeaderData.first_name}
            last_name={coverHeaderData.last_name}
            cover_template_id={coverHeaderData.cover_template_id}
            category_id={coverHeaderData.category_id}
            preview_image={coverHeaderData.preview_image}
            phone_number={coverHeaderData.phone_number}
            email_address={coverHeaderData.email_address}
            street_address={coverHeaderData.street_address}
            country_id={coverHeaderData.country_id}
            state_id={coverHeaderData.state_id}
            city_id={coverHeaderData.city_id}
            zip_code={coverHeaderData.zip_code}
            categories={categories}
          />
        );
      case "opener":
        return (
          <Opener
            experience={coverOpenerData.experience}
            opener_detail={coverOpenerData.opener_detail}
          />
        );
      case "body":
        return (
          <Body
            body_detail={coverBodyData.body_detail}
            body_skills={coverBodyData.body_skills}
            job_positions={coverBodyData.job_positions}
            employeer_name={coverBodyData.employeer_name}
            // Examples
            examplesSkills={examplesSkills ? examplesSkills : []}
            exampleJobPositions={exampleJobPositions ? exampleJobPositions : []}
          />
        );
      case "closer":
        return <Closer />;

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
            <h1 className="text-2xl font-bold">CREATE COVER EXAMPLE</h1>
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
