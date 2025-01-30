import { Autocomplete, createFilterOptions, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ApiService } from "../../services/ApiService";
import { useAuth } from "../../services/Auth";
import { IoInformationCircle } from "react-icons/io5";

const TechnicalSkillsForm = (props) => {
  const {
    currentSkills,
    currentFildName,
    currentSkillId,
    updateSkills,
    updateFeildName,
    skillsOptions,
    reloadTheData,
    isSaving,
    storePreviewImage,
    closeOpenForms,
    profileId,
  } = props;
  const { user } = useAuth();

  const {
    formState: { errors },
    control,
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      skills: currentSkills,
    },
  });

  useEffect(() => {
    setValue("skills", currentSkills);
    // setValue("section_name", currentFildName);
    setValue("skill_id", currentSkillId);
  }, [currentSkills, setValue]);

  const [resumeIsUpdating, setResumeIsUpdating] = useState(false);
  const [resumeHasSaved, setResumeHasSaved] = useState(false);

  const [job_positions, set_job_positions] = useState([]);
  const [job_search, set_job_search] = useState("");
  const timeoutRef = useRef(null);
  useEffect(() => {
    if (job_search) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current); // Clear the previous timeout
      }

      const job = job_positions.find(
        (job) => job.name.toLowerCase() === job_search.toLowerCase()
      );

      if (job) {
        // Set new timeout
        timeoutRef.current = setTimeout(() => {
          ApiService.showResumeTechnicalSkillsFilter(user?.token, job_search)
            .then((res) => {
              setTechnicalSkillsOptions([]);
              if (res.data?.data[0]?.tech_skills.length === 0) {
                // gen ai
                ApiService.ai_createTechSkills_suggestion(job_search)
                  .then((res) => {
                    setTechnicalSkillsOptions(res.data?.data?.technical_Skills);
                    if (res.data?.data?.technical_Skills?.length > 0) {
                      ApiService.createTechSkills(
                        user?.token,
                        res.data.data.technical_Skills,
                        job.id,
                        0
                      )
                        .then((res) => console.log("Craete:", res))
                        .catch((err) => console.log(err));
                    }
                  })
                  .catch((err) => console.log(err));
              } else {
                const arrr = res.data.data[0]?.tech_skills?.map(
                  (skill) => skill.name
                );
                setTechnicalSkillsOptions(arrr);
              }
            })
            .catch((err) => console.log(err));
        }, 2000);
      }
    }
  }, [job_search]);

  useEffect(() => {
    ApiService.getAllJobPositions(user?.token)
      .then((res) => {
        set_job_positions(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [user?.token]);

  const onSubmit = (data) => {
    isSaving(true);
    setResumeIsUpdating(true);
    if (data.skill_id) {
      ApiService.resumeTechnicalSkillsEdit(user?.token, data)
        .then((res) => {
          console.log(res.data);
          isSaving(false);
          storePreviewImage();
          closeOpenForms();
          setResumeIsUpdating(false);
          setResumeHasSaved(false);
          reloadTheData();
        })
        .catch((err) => {
          console.log(err);
          isSaving(false);
          setResumeIsUpdating(false);
        });
    } else {
      console.log(data);
      ApiService.resumeTechnicalSkillsAdd(user?.token, data, profileId)
        .then((res) => {
          console.log(res.data);
          isSaving(false);
          storePreviewImage();
          closeOpenForms();
          setResumeIsUpdating(false);
          setResumeHasSaved(false);
          reloadTheData();
        })
        .catch((err) => {
          console.log(err);
          isSaving(false);
          setResumeIsUpdating(false);
        });
    }
  };

  const [technicalSkillsOptions, setTechnicalSkillsOptions] = useState([]);
  const [uniqueSkillsOptions, setUniqueSkillsOptions] = useState([]);

  // useEffect(() => {
  //   console.log("uniqueSkillsOptions", uniqueSkillsOptions);
  // }, [uniqueSkillsOptions]);

  // useEffect(() => {
  //   const updatedSkills = Array.from(
  //     new Set(
  //       technicalSkillsOptions?.flatMap((option) => {
  //         return option?.map((t_skill) => t_skill) || [];
  //       })
  //     )
  //   ).filter(Boolean);
  //   console.log("updatedSkills", updatedSkills);
  //   setUniqueSkillsOptions(updatedSkills);
  // }, [technicalSkillsOptions, job_search]);

  const filterOptions = createFilterOptions({
    matchFrom: "start",
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-4 flex-col mb-[300px]"
    >
      {/* is editing id */}
      <p className="font-Lexend text-sm text-primary-blue flex items-center justify-start">
        <IoInformationCircle size={24} className="mr-1" />
        If u want to add a custom skill , type and press enter
      </p>
      <Controller
        name={"skill_id"}
        control={control}
        render={({ field }) => <input {...field} type="hidden" />}
      />
      <div className="hidden">
        <Controller
          name="section_name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ width: "100%" }}
              id="outlined-basic"
              label="Field Name"
              value={"Technical Skills"}
              variant="outlined"
              onChange={(e) => {
                field.onChange(e);
                updateFeildName(e.target.value);
              }}
              onBlur={() => document.getElementById("submitSkills").click()}
              error={!!errors.section_name}
              helperText={errors.section_name?.message}
            />
          )}
        />
      </div>
      <div className="flex flex-col gap-2 mb-4">
        <label className="font-Lexend text-[#A7A7A7]">Job Title</label>

        <Controller
          name="job_title"
          control={control}
          rules={{
            validate: {
              maxLength: (value) => {
                const strValue = value ?? "";
                return (
                  strValue.length <= 100 ||
                  "Job Title must be at most 100 characters"
                );
              },
            },
          }}
          defaultValue=""
          render={({ field }) => (
            <Autocomplete
              {...field}
              freeSolo
              options={job_positions

                ?.sort((a, b) => a.name.localeCompare(b.name))
                .map((option) => option.name)}
              filterOptions={filterOptions}
              onChange={(e, value) => {
                field.onChange(value);
                set_job_search(value);
              }}
              onInputChange={(e, value) => {
                field.onChange(value);
                set_job_search(value);
              }}
              value={field.value}
              sx={{
                "& .MuiInputBase-input": {
                  fontFamily: "'Lexend', Arial, sans-serif", // Example customization
                  fontSize: "16px",
                  padding: "8px 8px",
                  borderColor: "#A7A7A7",
                },
                "& .MuiOutlinedInput-root": {
                  fontFamily: "'Lexend', Arial, sans-serif", // Example customization
                  fontSize: "16px",
                  padding: "0px",
                  borderColor: "#A7A7A7",
                },
              }}
              defaultValue={null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  defaultValue={""}
                  sx={{
                    "& .MuiInputBase-input": {
                      fontFamily: "'Lexend', Arial, sans-serif", // Example customization
                      fontSize: "16px",
                      padding: "8px 8px",
                      borderColor: "#A7A7A7",
                    },
                    "& .MuiOutlinedInput-root": {
                      fontFamily: "'Lexend', Arial, sans-serif", // Example customization
                      fontSize: "16px",
                      padding: "0px",
                      borderColor: "#A7A7A7",
                    },
                  }}
                  label=""
                  error={!!errors.job_title}
                  helperText={
                    errors.job_title ? errors.job_title.message : null
                  }
                />
              )}
            />
          )}
        />
      </div>
      <Controller
        name="skills"
        control={control}
        rules={{
          required: "atleast add one skill",
        }}
        render={({ field }) => (
          <Autocomplete
            {...field}
            multiple
            options={technicalSkillsOptions} // Use only names as options
            freeSolo // Allow users to type and add new skills
            filterSelectedOptions
            onChange={(event, newValue) => {
              field.onChange(newValue);
              updateSkills(newValue);
            }}
            //onBlur={() => document.getElementById("submitSkills").click()}
            value={field.value || []}
            disablePortal
            sx={{ height: "80px" }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Technical Skills"
                placeholder="Search or type your skill"
                error={!!errors.skills}
                helperText={errors.skills?.message}
              />
            )}
          />
        )}
      />
      <div className="w-full">
        {resumeIsUpdating ? (
          <button
            type="button"
            disabled
            className="bg-primary-green w-full py-2 rounded-md text-white font-semibold font-Lexend"
          >
            {!resumeHasSaved ? (
              <>
                <div className="flex justify-center items-center">
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-gray-200 animate-spin  fill-primary-green"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </>
            ) : (
              "Saved"
            )}
          </button>
        ) : (
          <button
            type="submit"
            className="bg-primary-blue hover:bg-primary-green w-full py-2 rounded-md text-white font-semibold font-Lexend"
          >
            Save
          </button>
        )}
      </div>
    </form>
  );
};

export default TechnicalSkillsForm;
