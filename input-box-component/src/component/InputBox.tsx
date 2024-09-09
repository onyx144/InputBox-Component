import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Input from "./Input";
import Selects from "./Selects";
import {
  LocalizationProvider,
  DatePicker,
  DateTimePicker,
} from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import GoogleInput from "./GoogleInput";
import { Checkbox, FormControlLabel, RadioGroup, Radio } from "@mui/material";

// Базовый тип для всех полей
type BaseField<T> = {
  label: string;
  value: T;
  onChange: (value: T) => void;
};

// Типы для разных полей
type StringField = BaseField<string> & { type: "string" };
type NumberField = BaseField<number> & { type: "number" };
type DateTimeField = BaseField<Date> & { type: "datetime" };
type YearField = BaseField<Date> & { type: "year" };
type PlaceField = BaseField<string> & {
  type: "place";
  location: { lat: number; lng: number; city: string }[];
};
type SelectField = BaseField<string> & {
  type: "select";
  option: { value: string; label: string }[];
};
type CheckboxField = BaseField<boolean> & { type: "checkbox" };
type RadioButtonField = BaseField<string> & {
  type: "radio";
  options: { value: string; label: string }[];
};

// Объединяем все поля в один тип
type InputField =
  | StringField
  | NumberField
  | DateTimeField
  | YearField
  | PlaceField
  | SelectField
  | CheckboxField
  | RadioButtonField;

// Интерфейс для props компонента InputBox
interface InputBoxProps {
  fields: InputField[];
}

const InputBox: React.FC<InputBoxProps> = ({ fields }) => {
  const [temp, setTemp] = React.useState<Dayjs | null>(dayjs("2022-04-17"));

  return (
    <div>
      {fields.map((field, index) => {
        switch (field.type) {
          case "string":
            return (
              <div key={index}>
                <Input
                  label={field.label}
                  type="text"
                  value={field.value as string}
                  onChange={(value) => field.onChange(value as string)}
                />
              </div>
            );
          case "select":
            return (
              <div key={index}>
                <Selects
                  label={field.label}
                  options={field.option}
                  value={field.value}
                  onChange={(value) => field.onChange(value as string)}
                />
              </div>
            );
          case "number":
            return (
              <div key={index}>
                <Input
                  label={field.label}
                  type="number"
                  value={field.value as number}
                  onChange={(value) => field.onChange(value as number)}
                />
              </div>
            );
          case "datetime":
            return (
              <div key={index}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label={field.label}
                    value={temp}
                    onChange={(newValue) => setTemp(newValue)}
                  />
                </LocalizationProvider>
              </div>
            );
          case "year":
            return (
              <div key={index}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label={field.label}
                    value={dayjs(field.value)}
                    onChange={(value) => {
                      if (value) {
                        field.onChange(value.toDate());
                      }
                    }}
                  />
                </LocalizationProvider>
              </div>
            );
          case "place":
            return (
              <div key={index}>
                <GoogleInput
                  label={field.label}
                  onCoordinatesChange={(lat, lng, city) => {
                    const updatedLocation = [{ lat, lng, city }];
                    const updatedField = { ...field, location: updatedLocation };
                    field.onChange(updatedField.value);
                  }}
                />
              </div>
            );
          case "checkbox":
            return (
              <div key={index}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={field.value as boolean}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                  label={field.label}
                />
              </div>
            );
          case "radio":
            return (
              <div key={index}>
                <RadioGroup
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                >
                  {field.options.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      value={option.value}
                      control={<Radio />}
                      label={option.label}
                    />
                  ))}
                </RadioGroup>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default InputBox;
