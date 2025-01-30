import { TextField } from "@mui/material";
import React from "react";
import { useForm, Controller } from "react-hook-form";

const MuiCutomeDropdown = ({
  name,
  errorMessage,
  errors,
  width,
  options,
  showOptions,
  label,
  setValue,
}) => {
  const { control } = useForm();
  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={{
          required: { errorMessage },
        }}
        defaultValue=""
        render={({ field }) => {
          return (
            <>
              <TextField
                {...field}
                sx={{ width: width }}
                id="outlined-basic"
                label={label}
                variant="outlined"
                onChange={(e) => {
                  field.onChange(e);
                }}
                error={!!errors}
                helperText={errors?.message}
              />
              {showOptions && (
                <div>
                  <ul>
                    {options?.map((opt, idx) => (
                      <li key={idx} onClick={() => setValue(opt.name)}>
                        {opt}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          );
        }}
      />
    </div>
  );
};

export default MuiCutomeDropdown;
