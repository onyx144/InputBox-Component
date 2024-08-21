import React , { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Input from "./Input";
import Selects from "./Selects";
import {
  LocalizationProvider,
  DatePicker,
  DateTimePicker,
} from "@mui/x-date-pickers";
import dayjs , {Dayjs} from "dayjs";
import GoogleInput from './GoogleInput'

type BaseField<T> = {
  label: string;
  value: T;
  onChange: (value: T) => void;
};

type StringField = BaseField<string> & { type: "string" };
type NumberField = BaseField<number> & { type: "number" };
type DateTimeField = BaseField<Date> & { type: "datetime" };
type PlaceField = BaseField<string> & { 
  type: "place";
  location: { lat: number, lng: number , city: string }[];  
};
type YearField = BaseField<Date> & { 
  type: "year"
};
type SelectField = BaseField<string> & {
  type: "select";
  option: { value: string; label: string }[];
};

type InputField =
  | StringField
  | NumberField
  | DateTimeField
  | YearField
  | PlaceField
  | SelectField;

// Интерфейс для props компонента InputBox
interface InputBoxProps {
  fields: InputField[];
}

const InputBox: React.FC<InputBoxProps> = ({ fields }) => {
  const [temp , setTemp ] =  React.useState<Dayjs | null>(dayjs('2022-04-17'));
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
                    viewRenderers={{
                      hours: null,
                      minutes: null,
                      seconds: null,
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
                   onCoordinatesChange={(lat, lng , city) => {
                     const updatedLocation = [{ lat, lng , city }];
                     const updatedField = { ...field, location: updatedLocation };
                     field.onChange(updatedField.value);
                   }}
                 />
              </div>
            )  
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
                    }}                  />
                </LocalizationProvider>
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
