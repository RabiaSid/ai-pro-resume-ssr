import React, { useState } from "react";
import TextAreaGroup from "../../../../components/TextAreaGroup";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import SelectDropdown from "../../../../components/SelectDropdown";

const Opener = ({ experience, opener_detail }) => {
  const navigate = useNavigate();
  const coverID = useParams().id;
  const [coverLetterData, setCoverLetterData] = useState({
    experience: experience ? experience : 0,
    opener_detail: opener_detail ? opener_detail : "",
  });
  const [experienceList] = useState([
    "1 ",
    "2 ",
    "3 ",
    "4 ",
    "5 ",
    "6 ",
    "7 ",
    "8 ",
    "9 ",
    "10 ",
  ]);

  const handleStepData = (e) => {
    e.preventDefault();

    // Set a cookie with options
    Cookies.set(
      "coverLetterExampleUpdateStep2",
      JSON.stringify(coverLetterData),
      {
        expires: 7,
        path: "/",
      }
    );

    navigate(`/admin/cover-examples/show-cover-examples/${coverID}/body`);
  };

  return (
    <div>
      <form
        action="#"
        onSubmit={handleStepData}
        className="flex flex-col justify-between"
      >
        <div className="flex-1">
          {/* experience */}

          <div>
            <SelectDropdown
              htmlFor={"experience"}
              isRequired={true}
              label={"Experience"}
              handleOnChange={(val) =>
                setCoverLetterData((prev) => ({
                  ...prev,
                  experience: val,
                }))
              }
              value={coverLetterData.experience}
              options={experienceList}
            />
          </div>

          {/* opener Details */}
          <div>
            <TextAreaGroup
              cols={4}
              htmlFor={"opener_detail"}
              isRequired={false}
              label={"Opener Detail"}
              onchange={(val) =>
                setCoverLetterData((prev) => ({
                  ...prev,
                  opener_detail: val,
                }))
              }
              value={coverLetterData.opener_detail}
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

export default Opener;
