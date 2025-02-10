import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { ApiService } from "../../services/ApiService";
import Cookies from "js-cookie";

// Steps Screen
import Header from "./steps_update/header/Header";
import Summary from "./steps_update/summary/Summary";
import { useAuth } from "../../services/Auth";

const Create_Resume_Examples = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  const example_id = useParams().id;

  const currentPath = location.pathname;

  const [template_example, set_template_example] = useState();
  const [certificate_examples, set_certificate_examples] = useState();
  const [education_examples, set_education_examples] = useState();
  const [experience_examples, set_experience_examples] = useState();
  const [jobPositionValues, setJobPositionValues] = useState();
  const [soft_skill_examples, set_soft_skill_examples] = useState();
  const [summary_examples, set_summary_examples] = useState();
  const [technical_skill_examples, set_technical_skill_examples] = useState();
  const [countries, set_countries] = useState();
  const [categories, setCategories] = useState();

  const loadDropdownsValues = () => {
    ApiService.getResumeExamplesSuggestEdit(user?.token, example_id)
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
          job_positions: positionValues,
          categories,
        } = res.data.data;
        console.log("mnbnmbnmbmbnmbnmbmbmbnm");
        console.log(res.data.data);

        set_template_example(template_examples);
        set_certificate_examples(certificate_examples);
        set_education_examples(education_examples);
        set_experience_examples(experience_examples);
        setJobPositionValues(positionValues);
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
    phone_number: null,
    contact_number: null,
    country_id: null,
    state: null,
    city: null,
    street_address: "",
    postal_code: null,
    date_of_birth: new Date(),
    gender: "",
    maritial_status: "",
    id_no: null,
  });

  const [resumeSummaryData, setResumeSummaryData] = useState({
    summary_id: null,
    certificate_id: null,
    education_id: null,
    experience_id: null,
    soft_skill_id: null,
    technical_skill_id: null,
    // template
    template_name: "",
    template_category_id: "",
    job_positions: "",
    template_id: 0,
    preview_image: "",
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
        phone_number,
        contact_number,
        country_id,
        state,
        city,
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
        phone_number,
        contact_number,
        country_id,
        state,
        city,
        street_address,
        postal_code,
        date_of_birth,
        gander,
        martitial_status,
        id_no,
      }));
    }
    // Others Data
    if (summaryData) {
      const {
        summary_id,
        certificate_id,
        education_id,
        experience_id,
        soft_skill_id,
        technical_skill_id,
        // template
        job_positions,
        resume_name: template_name,
        category_id: template_category_id,
        template_id,
        preview_image,
      } = JSON.parse(summaryData);
      setResumeSummaryData((prev) => ({
        summary_id,
        certificate_id,
        education_id,
        experience_id,
        soft_skill_id,
        technical_skill_id,
        // template
        template_name,
        template_category_id,
        job_positions,
        template_id,
        preview_image,
      }));
    }
  }, [location.pathname]);

  useEffect(() => {
    ApiService.getResumeExampleByid(user?.token, example_id)
      .then((res) => {
        const {
          first_name,
          middle_name,
          last_name,
          email_address,
          phone_number,
          contact_number,
          country_id,
          state,
          city,
          street_address,
          postal_code,
          date_of_birth,
          gender,
          maritial_status,
          id_no,
          // Summary Data
          tech_skills,
          soft_skills,
          educations,
          certificates,
          summaries,
          experiences,
          // template
          resume_name: template_name,
          job_positions,
          category_id: template_category_id,
          template_id,
          preview_image,
        } = res.data.data.resume_example;

        setResumeHeaderData((prev) => ({
          ...prev,
          first_name,
          middle_name,
          last_name,
          email_address,
          phone_number,
          contact_number,
          country_id,
          state,
          city,
          street_address,
          postal_code,
          date_of_birth,
          gender,
          maritial_status,
          id_no,
        }));

        setResumeSummaryData((prev) => ({
          ...prev,
          certificate_id: certificates,
          education_id: educations,
          experience_id: experiences,
          soft_skill_id: soft_skills,
          summary_id: summaries,
          technical_skill_id: tech_skills,
          // templates
          template_name: template_name,
          job_positions: job_positions,
          template_category_id: template_category_id,
          template_id: template_id,
          preview_image: preview_image,
        }));
      })
      .catch((err) => console.log(err));
  }, [location.pathname]);

  const renderPage = () => {
    switch (pageIs) {
      case "header":
        return (
          <Header
            //
            example_id={example_id}
            //
            first_name={resumeHeaderData.first_name}
            middle_name={resumeHeaderData.middle_name}
            last_name={resumeHeaderData.last_name}
            email_address={resumeHeaderData.email_address}
            phone_number={resumeHeaderData.phone_number}
            contact_number={resumeHeaderData.contact_number}
            country_id={resumeHeaderData.country_id}
            state={resumeHeaderData.state}
            city={resumeHeaderData.city}
            street_address={resumeHeaderData.street_address}
            postal_code={resumeHeaderData.postal_code}
            date_of_birth={resumeHeaderData.date_of_birth}
            gander={resumeHeaderData.gender}
            martitial_status={resumeHeaderData.maritial_status}
            id_no={resumeHeaderData.id_no}
            countries_dropdow_data={countries}
          />
        );
      case "summary":
        return (
          <Summary
            // exmaple get id
            example_id={example_id}
            // header data
            first_name={resumeHeaderData.first_name}
            middle_name={resumeHeaderData.middle_name}
            last_name={resumeHeaderData.last_name}
            email_address={resumeHeaderData.email_address}
            phone_number={resumeHeaderData.phone_number}
            contact_number={resumeHeaderData.contact_number}
            country_id={resumeHeaderData.country_id}
            state={resumeHeaderData.state}
            city={resumeHeaderData.city}
            street_address={resumeHeaderData.street_address}
            postal_code={resumeHeaderData.postal_code}
            date_of_birth={resumeHeaderData.date_of_birth}
            gander={resumeHeaderData.gender}
            martitial_status={resumeHeaderData.maritial_status}
            id_no={resumeHeaderData.id_no}
            templates_dropdown_data={template_example}
            countries_dropdow_data={countries}
            // Summary
            summary_examples={summary_examples}
            summary_ids={resumeSummaryData.summary_id}
            // certificate_examples
            certificate_examples={certificate_examples}
            certificate_ids={resumeSummaryData.certificate_id}
            // education_examples
            education_examples={education_examples}
            education_ids={resumeSummaryData.education_id}
            // experience_examples
            experience_examples={experience_examples}
            experience_ids={resumeSummaryData.experience_id}
            //
            soft_skill_examples={soft_skill_examples}
            soft_skill_ids={resumeSummaryData.soft_skill_id}
            // technical_skill_examples
            technical_skill_examples={technical_skill_examples}
            technical_skill_ids={resumeSummaryData.technical_skill_id}
            // template
            template_id={resumeSummaryData.template_id}
            job_positions={resumeSummaryData.job_positions}
            template_name={resumeSummaryData.template_name}
            category_id={resumeSummaryData.template_category_id}
            preview_image={resumeSummaryData.preview_image}
            //
            jobPositionsDropdownValues={jobPositionValues}
            categories={categories}
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
          {/* Inputs*/}
          <div className="py-6 px-4">
            <h1 className="text-2xl font-bold">UPDATE RESUME EXAMPLE</h1>
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
