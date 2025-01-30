import React, { useEffect, useRef, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { Controller, useForm } from "react-hook-form";
import { Autocomplete, createFilterOptions, TextField } from "@mui/material";
import { ApiService } from "../services/ApiService";
import { useAuth } from "../services/Auth";
import { TbLoader3 } from "react-icons/tb";
import { RxCrossCircled } from "react-icons/rx";
import { IoInformationCircle } from "react-icons/io5";

function Summary({ data, reload }) {
  const { user } = useAuth();
  const {
    formState: { errors },
    control,
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      skills: data ? data : "",
    },
  });
  const [job_positions, set_job_positions] = useState([]);
  const [job_search, set_job_search] = useState("");
  useEffect(() => {
    setValue("skills", data?.body ? data?.body.split(",,") : []);
    setValue("skill_id", data ? data.id : "");
  }, [data, setValue]);

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

  const [edit_mode, set_edit_mode] = useState(false);
  const [loader_mode, set_loader_mode] = useState(false);

  const [technicalSkillsTitle, setTechnicalSkillsTitle] = useState(
    data?.title || ""
  );

  const submitTechnicalSkills = (dataform) => {
    console.log(dataform);
    set_loader_mode(true);
    if (data) {
      ApiService.resumeTechnicalSkillsEdit(user?.token, dataform)
        .then((res) => {
          console.log(res);
          set_edit_mode(false);
          set_loader_mode(false);
          reload();
        })
        .catch((err) => {
          console.log(err);
          set_loader_mode(false);
        });
    } else {
      ApiService.resumeTechnicalSkillsAdd(user?.token, dataform)
        .then((res) => {
          console.log(res);
          set_edit_mode(false);
          set_loader_mode(false);
          reload();
        })
        .catch((err) => {
          console.log(err);
          set_loader_mode(false);
        });
    }
  };

  const [technicalSkillsOptions, setTechnicalSkillsOptions] = useState([]);

  const filterOptions = createFilterOptions({
    matchFrom: "start",
  });

  return (
    <div className="mt-4 font-Lexend">
      <form onSubmit={handleSubmit(submitTechnicalSkills)}>
        <div className="flex justify-between items-center text-[#A7A7A7] mb-2">
          Technical Skills:
          {edit_mode ? (
            <RxCrossCircled
              size={24}
              className="text-[red] hover:text-[#1877F2] cursor-pointer"
              onClick={() => set_edit_mode(!edit_mode)}
            />
          ) : (
            <FaPencil
              className="text-[#A7A7A7] hover:text-[#1877F2] cursor-pointer"
              onClick={() => set_edit_mode(!edit_mode)}
            />
          )}
        </div>
        {edit_mode ? (
          <div className="flex flex-col justify-center">
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
                    label=""
                    value={"Technical Skills"}
                    variant="outlined"
                    onChange={(e) => {
                      field.onChange(e);
                      setTechnicalSkillsTitle(e.target.value);
                    }}
                    onBlur={() =>
                      document.getElementById("submitSkills").click()
                    }
                    error={!!errors.section_name}
                    helperText={errors.section_name?.message}
                  />
                )}
              />
            </div>
            <Controller
              name={"skill_id"}
              control={control}
              render={({ field }) => <input {...field} type="hidden" />}
            />
            <div className="flex flex-col gap-2 mb-4">
              <label className="font-Lexend text-[#A7A7A7]">
                Job Title (For Search Skills)
              </label>

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
                render={({ field }) => {
                  return (
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
                  );
                }}
              />
            </div>
            <p className="font-Lexend text-sm text-primary-blue flex items-start justify-start mb-4">
              <IoInformationCircle size={24} className="mr-1" />
              If u want to add a custom skill , type and press enter
            </p>
            <Controller
              name="skills"
              control={control}
              className="w-full"
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
                    //updateSkills(newValue);
                  }}
                  //onBlur={() => document.getElementById("submitSkills").click()}
                  value={field.value || []}
                  disablePortal
                  //sx={{ height: "80px" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=""
                      placeholder="Search or type your skill"
                      className="w-full"
                      error={!!errors.skills}
                      helperText={errors.skills?.message}
                    />
                  )}
                />
              )}
            />
            <div className="w-full flex justify-center">
              {loader_mode ? (
                <button
                  type="button"
                  className="flex justify-center items-center bg-[#1877F2] text-md text-white rounded-full mt-4 px-6 py-1"
                >
                  <TbLoader3 className="mr-2 animate-spin" /> Saving...
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-[#1877F2] hover:bg-[#343434] text-md text-white rounded-full mt-4 px-6 py-1"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        ) : (
          <p className="text-[#343434] flex justify-start gap-2 flex-wrap text-sm">
            {data
              ? data?.body?.split(",,").map((part, index) => (
                  <p
                    className="bg-[#F5F6FB] border-[#DFE0E2] px-4 py-1 border rounded-full"
                    key={index}
                  >
                    {part.trim()}
                  </p> // Wrapping each part with a <p> tag
                ))
              : "No Skills Found"}
          </p>
        )}
      </form>
    </div>
  );
}

export default Summary;
