import React, { useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { Controller, useForm } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";
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

  useEffect(() => {
    console.log("data.body: ", data.body);

    setValue("skills", data?.body ? data?.body.split(",,") : []);
    setValue("skill_id", data ? data.id : "");
    ApiService.showResumeTechnicalSkills(user?.token)
      .then((res) => setTechnicalSkillsOptions(res.data.data))
      .catch((err) => console.log(err));
  }, [data, setValue]);

  const [edit_mode, set_edit_mode] = useState(false);
  const [loader_mode, set_loader_mode] = useState(false);
  const [technicalSkillsOptions, setTechnicalSkillsOptions] = useState([]);
  const [technicalSkillsTitle, setTechnicalSkillsTitle] = useState(
    data?.title || ""
  );

  const submitTechnicalSkills = (dataform) => {
    console.log(dataform);
    set_loader_mode(true);
    if (data) {
      ApiService.resumeSoftSkillsEdit(user?.token, dataform)
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
      ApiService.resumeSoftSkillsAdd(user?.token, dataform)
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

  const uniqueSkillsOptions = Array.from(
    new Set(technicalSkillsOptions?.map((option) => option.name || ""))
  ).filter((name) => name);

  return (
    <div className="mt-4 font-Lexend">
      <form onSubmit={handleSubmit(submitTechnicalSkills)}>
        <div className="flex justify-between items-center text-[#A7A7A7] mb-2">
          Soft Skills:
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
            <p className="font-Lexend text-sm text-primary-blue flex items-start justify-start">
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
                  options={uniqueSkillsOptions}
                  freeSolo
                  filterSelectedOptions
                  onChange={(event, newValue) => {
                    field.onChange(newValue);
                  }}
                  onBlur={() => document.getElementById("submitSkills").click()}
                  value={field.value || []}
                  disablePortal
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=""
                      placeholder="Search or type you skill"
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
