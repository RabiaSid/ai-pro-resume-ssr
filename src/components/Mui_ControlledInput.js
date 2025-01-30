import { TextField } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const Mui_ControlledInput = ({
  inputName,
  isRequired,
  errorMessage,
  value,
  handleChange,
  defaultValue,
  inputLabel,
}) => {
  const {
    control,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  return (
    <Controller
      name={inputName}
      control={control}
      rules={{ required: isRequired ? errorMessage : false }}
      defaultValue={defaultValue}
      render={({ field }) => (
        <TextField
          {...field}
          id="outlined-basic"
          label={inputLabel}
          variant="outlined"
          value={value}
          onChange={(e) => {
            field.onChange(e);
            handleChange(e);
          }}
          error={!!errors.inputName}
          helperText={errors.inputName?.message}
        />
      )}
    />
  );
};

export default Mui_ControlledInput;
