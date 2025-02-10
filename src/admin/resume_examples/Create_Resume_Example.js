import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ApiService } from "../../services/ApiService";
import Cookies from "js-cookie";

// Steps Screen
import Header from "./steps/header/Header";
import Summary from "./steps/summary/Summary";
import { useAuth } from "../../services/Auth";

const Create_Resume_Examples = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  const currentPath = location.pathname;

  const [template_example, set_template_example] = useState();
  const [certificate_examples, set_certificate_examples] = useState();
  const [education_examples, set_education_examples] = useState();
  const [experience_examples, set_experience_examples] = useState();
  const [job_positions, set_job_positions] = useState();
  const [soft_skill_examples, set_soft_skill_examples] = useState();
  const [summary_examples, set_summary_examples] = useState();
  const [technical_skill_examples, set_technical_skill_examples] = useState();
  const [countries, set_countries] = useState();

  const [categories, setCategories] = useState();

  const loadDropdownsValues = () => {
    ApiService.getResumeExamplesSuggest(user?.token)
      .then((res) => {
        const {
          template_examples,
          certificate_examples,
          education_examples,
          experience_examples,
          soft_skill_examples,
          summary_examples,
          technical_skill_examples,
          countries,
          job_positions,
          categories,
        } = res.data.data;

        set_template_example(template_examples);
        set_certificate_examples(certificate_examples);
        set_education_examples(education_examples);
        set_experience_examples(experience_examples);
        set_job_positions(job_positions);
        set_soft_skill_examples(soft_skill_examples);
        set_summary_examples(summary_examples);
        set_technical_skill_examples(technical_skill_examples);
        set_countries(countries);
        setCategories(categories);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadDropdownsValues();
  }, []);

  // Extract the last part of the path after the last '/'
  const lastPart = currentPath.substring(currentPath.lastIndexOf("/") + 1);
  const [pageIs, setPageIs] = useState();

  useEffect(() => {
    if (location.pathname.endsWith(lastPart)) {
      setPageIs(lastPart);
    }
  }, [location.pathname]);

  const [resumeHeaderData, setResumeHeaderData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email_address: "",
    job_title: "",
    phone_number: null,
    contact_number: null,
    template_id: null,
    country_id: null,
    state_id: null,
    city_id: null,
    street_address: "",
    postal_code: null,
    date_of_birth: new Date(),
    gander: "",
    martitial_status: "",
    id_no: null,
  });

  const [resumeSummaryData, setResumeSummaryData] = useState({
    summary_id: null,
    certificate_id: null,
    education_id: null,
    experience_id: null,
    soft_skill_id: null,
  });

  useEffect(() => {
    const headerData = Cookies.get("resumeExampleStep1") || null;
    const summaryData = Cookies.get("resumeExampleStep2") || null;

    // Header Data
    if (headerData) {
      const {
        first_name,
        middle_name,
        last_name,
        email_address,
        job_title,
        phone_number,
        contact_number,
        template_id,
        country_id,
        state_id,
        city_id,
        street_address,
        postal_code,
        date_of_birth,
        gander,
        martitial_status,
        id_no,
      } = JSON.parse(headerData);
      setResumeHeaderData((prev) => ({
        ...prev,
        first_name,
        middle_name,
        last_name,
        email_address,
        job_title,
        phone_number,
        contact_number,
        template_id,
        country_id,
        state_id,
        city_id,
        street_address,
        postal_code,
        date_of_birth,
        gander,
        martitial_status,
        id_no,
      }));
    }

    // OPener Data
    if (summaryData) {
      const {
        summary_id,
        certificate_id,
        education_id,
        experience_id,
        soft_skill_id,
        technical_skill_id,
      } = JSON.parse(summaryData);
      setResumeSummaryData((prev) => ({
        summary_id,
        certificate_id,
        education_id,
        experience_id,
        soft_skill_id,
        technical_skill_id,
      }));
    }
  }, [location.pathname]);

  const renderPage = () => {
    switch (pageIs) {
      case "header":
        return (
          <Header
            first_name={resumeHeaderData.first_name}
            middle_name={resumeHeaderData.middle_name}
            last_name={resumeHeaderData.last_name}
            email_address={resumeHeaderData.email_address}
            job_title={resumeHeaderData.job_title}
            phone_number={resumeHeaderData.phone_number}
            contact_number={resumeHeaderData.contact_number}
            template_id={resumeHeaderData.template_id}
            country_id={resumeHeaderData.country_id}
            state_id={resumeHeaderData.state_id}
            city_id={resumeHeaderData.city_id}
            street_address={resumeHeaderData.street_address}
            postal_code={resumeHeaderData.postal_code}
            date_of_birth={resumeHeaderData.date_of_birth}
            gander={resumeHeaderData.gander}
            martitial_status={resumeHeaderData.martitial_status}
            id_no={resumeHeaderData.id_no}
            templates_dropdown_data={template_example}
            countries_dropdow_data={countries}
          />
        );
      case "summary":
        return (
          <Summary
            // Header
            first_name={resumeHeaderData.first_name}
            middle_name={resumeHeaderData.middle_name}
            last_name={resumeHeaderData.last_name}
            email_address={resumeHeaderData.email_address}
            job_title={resumeHeaderData.job_title}
            phone_number={resumeHeaderData.phone_number}
            contact_number={resumeHeaderData.contact_number}
            template_id={resumeHeaderData.template_id}
            country_id={resumeHeaderData.country_id}
            state_id={resumeHeaderData.state_id}
            city_id={resumeHeaderData.city_id}
            street_address={resumeHeaderData.street_address}
            postal_code={resumeHeaderData.postal_code}
            date_of_birth={resumeHeaderData.date_of_birth}
            gander={resumeHeaderData.gander}
            martitial_status={resumeHeaderData.martitial_status}
            id_no={resumeHeaderData.id_no}
            templates_dropdown_data={template_example}
            countries_dropdow_data={countries}
            // Summary
            summary_examples={summary_examples}
            summary_id={resumeSummaryData.summary_id}
            // certificate_examples
            certificate_examples={certificate_examples}
            certificate_id={resumeSummaryData.certificate_id}
            // education_examples
            education_examples={education_examples}
            education_id={resumeSummaryData.education_id}
            // experience_examples
            experience_examples={experience_examples}
            experience_id={resumeSummaryData.experience_id}
            //
            soft_skill_examples={soft_skill_examples}
            soft_skill_id={resumeSummaryData.soft_skill_id}
            // technical_skill_examples
            technical_skill_examples={technical_skill_examples}
            technical_skill_id={resumeSummaryData.technical_skill_id}
            // job_positions
            job_positions={job_positions}
            // categories
            categories={categories}
            // Load Data
            loadData={() => loadDropdownsValues()}
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
            <h1 className="text-2xl font-bold">CREATE RESUME EXAMPLE</h1>
          </div>
          <hr />
          {/* Content */}
          <div className="flex">
            {/* Sidebar */}
            <div className="w-[150px] border-r">
              {/* Links */}
              <div className="flex flex-col gap-4">
                {/* Header */}
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
                {/* Others */}
                <NavLink
                  to={"summary"}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-primary text-white p-4"
                      : "p-4"
                  }
                >
                  Others
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

export default Create_Resume_Examples;
