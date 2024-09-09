import React, { useState } from 'react';
import InputBox from './component/InputBox';
import { Box, Button, Container } from "@mui/material";

function App() {
  const [fields, setFields] = useState([
    {
      type: "string" as const,
      label: "Name",
      value: "Nikita",
      send: "name",
      onChange: (value: string) => updateField(0, value),
    },
    {
      type: "string" as const,
      label: "Surname",
      value: "Nes",
      send: "surname",
      onChange: (value: string) => updateField(1, value),
    },
    {
      type: "number" as const,
      label: "Age",
      value: 22,
      send: "age",
      onChange: (value: number) => updateField(2, value),
    },
    {
      type: "datetime" as const,
      label: "Appointment",
      value: new Date(),
      send: "appointment",
      onChange: (value: Date) => updateField(3, value),
    },
    {
      type: "place" as const,
      label: "Location",
      value: "",
      location: [{ lat: 0, lng: 0, city: "" }],
      send: "location",
      onChange: (value: string) => updateField(4, value),
    },
    {
      type: "year" as const,
      label: "Birthdate",
      value: new Date(),
      send: "birthdate",
      onChange: (value: Date) => updateField(5, value),
    },
    {
      type: "select" as const,
      label: "Sex",
      value: "men",
      option: [
        { value: "men", label: "Men" },
        { value: "woomen", label: "Women" },
      ],
      send: "sex",
      onChange: (value: string) => updateField(6, value),
    },
    {
      type: "checkbox" as const,
      label: "Agree to terms",
      value: false,
      send: "terms",
      onChange: (value: boolean) => updateField(7, value),
    },
    {
      type: "radio" as const,
      label: "Preferred Contact Method",
      value: "email",
      options: [
        { value: "email", label: "Email" },
        { value: "phone", label: "Phone" },
      ],
      send: "contact_method",
      onChange: (value: string) => updateField(8, value),
    },
  ]);

  const updateField = (index: number, value: string | number | Date | boolean) => {
    const newFields = [...fields];
    newFields[index].value = value;
    setFields(newFields);
  };

  const handleSubmit = () => {
    console.log(fields);
  };

  return (
    <Container maxWidth="xs">
      <InputBox fields={fields} />
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Log Field
        </Button>
      </Box>
    </Container>
  );
}

export default App;
