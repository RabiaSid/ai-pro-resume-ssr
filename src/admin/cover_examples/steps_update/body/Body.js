import React, { useEffect, useState } from "react";
import AllborderInputGroup from "../../../../components/AllborderInputGroup";
import TextAreaGroup from "../../../../components/TextAreaGroup";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const Body = ({
  employeer_name,
  body_skills,
  job_positions,
  body_detail,
  examplesSkills,
  exampleJobPositions,
}) => {
  const coverID = useParams().id;
  const navigate = useNavigate();
  const [coverLetterData, setCoverLetterData] = useState({
    employeer_name: employeer_name ? employeer_name : "",
    body_skills: body_skills ? body_skills : [],
    job_positions: job_positions ? job_positions : [],
    body_detail: body_detail ? body_detail : "",
  });

  useEffect(() => {
    setCoverLetterData({
      job_positions,
      employeer_name,
      body_skills,
      body_detail,
    });

    //setSelectedJobPostion({ value: job_title, label: job_title });
  }, [employeer_name, body_skills, body_detail, job_positions]);

  const [skillsData, setSkillsData] = useState([]);
  const [positionsData, setPositionsData] = useState([]);

  useEffect(() => {
    if (examplesSkills) {
      const total = examplesSkills.map((skill) => ({
        value: skill.name,
        label: skill.name,
      }));

      setSkillsData(total);
    }
    // Job Position
    if (exampleJobPositions) {
      const total2 = exampleJobPositions.map((skill2) => ({
        value: skill2.id.toString(),
        label: skill2.name,
      }));

      setPositionsData(total2);
    }
  }, [examplesSkills, exampleJobPositions]);

  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    if (body_skills && typeof body_skills === "string") {
      const skillsArray = body_skills.split(",").map((skill) => ({
        value: skill,
        label: skill,
      }));
      setSelectedSkills(skillsArray);
      // this is the tas
    }
  }, [body_skills]);

  const [selectedJobPostion, setSelectedJobPostion] = useState([]);

  // useEffect(() => {
  //   if (job_positions) {
  //     const skillsArray2 = job_positions.map((skill2) => ({
  //       value: skill2.id,
  //       label: skill2.name,
  //     }));
  //     setSelectedJobPostion(skillsArray2);
  //     console.log('bhund stack');
  //     console.log(job_positions);
  //   }
  // }, [job_positions]);

  useEffect(() => {
    if (job_positions) {
      if (job_positions.some((item) => item.value === undefined)) {
        setSelectedJobPostion(
          job_positions.map((skill2) => ({
            value: skill2.id.toString(),
            label: skill2.name,
          }))
        );
      } else {
        setSelectedJobPostion(job_positions);
      }
    }
  }, [job_positions]);

  const handleBody_skills = (skillsArray) => {
    setSelectedSkills(skillsArray);
    setCoverLetterData((prev) => ({
      ...prev,
      body_skills: skillsArray.map((item) => item.value).join(","),
    }));
  };

  const handleBody_JobPostion = (skillsArray2) => {
    setSelectedJobPostion(skillsArray2);
    //const itemIds = skillsArray2?.map((item) => item.value);
    setCoverLetterData((prev) => ({ ...prev, job_positions: skillsArray2 }));
  };

  const handleStepData = (e) => {
    e.preventDefault();

    // Set a cookie with options
    Cookies.set(
      "coverLetterExampleUpdateStep3",
      JSON.stringify(coverLetterData),
      {
        expires: 7,
        path: "/",
      }
    );

    navigate(`/admin/cover-examples/show-cover-examples/${coverID}/closer`);
  };

  // const [selectedJobPostion, setSelectedJobPostion] = useState();
  // const handleBody_jobTitle = (obj) => {
  //   setSelectedJobPostion(obj);
  //   setCoverLetterData((prev) => ({
  //     ...prev,
  //     job_title: obj.value,
  //   }));
  // };

  return (
    <div>
      <form action="#" onSubmit={handleStepData}>
        <div>
          {/* Row 1 */}
          <div className="w-full grid lg:grid-cols-2 sm:grid-cols-1 gap-4">
            {/* employees name */}
            <div>
              <AllborderInputGroup
                htmlFor={"employeer_name"}
                isRequired={false}
                label={"Employeer Name"}
                onchange={(val) =>
                  setCoverLetterData((prev) => ({
                    ...prev,
                    employeer_name: val,
                  }))
                }
                value={coverLetterData.employeer_name}
                placeholder={"Employeer Name"}
              />
            </div>
          </div>
          {/* Skills*/}
          <div className="py-2 w-full flex flex-col gap-2">
            <label>Job Positions</label>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              value={selectedJobPostion}
              options={positionsData}
              onChange={(val) => handleBody_JobPostion(val)}
              className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg focus-visible:outline-none border border-[#9b9b9b] focus:border-[#00caa5] outline-none rounded-md"
            />
          </div>

          <div className="py-2 w-full flex flex-col gap-2">
            <label>Skills</label>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              value={selectedSkills}
              options={skillsData}
              onChange={(val) => handleBody_skills(val)}
              className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg focus-visible:outline-none border border-[#9b9b9b] focus:border-[#00caa5] outline-none rounded-md"
            />
          </div>
          {/* body details*/}
          <div>
            <TextAreaGroup
              cols={4}
              htmlFor={"body_details"}
              isRequired={false}
              label={"Body Details"}
              onchange={(val) =>
                setCoverLetterData((prev) => ({
                  ...prev,
                  body_detail: val,
                }))
              }
              value={coverLetterData.body_detail}
              resize={false}
              rows={4}
            />
          </div>
        </div>
        <div className="h-24 justify-end">
          <hr />
          {/* Create */}
          <div className="py-6 px-6 gap-4 flex justify-end">
            <button
              type="submit"
              className="bg-white border-primary border-2 text-lg text-primary font-bold rounded-md px-8 py-2"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-primary text-lg text-white font-bold rounded-md px-8 py-2"
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Body;
