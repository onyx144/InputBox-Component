import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, FormHelperText } from '@mui/material';

interface Option {
  value: string;
  label: string;
}

interface SelectsProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  validation?: (value: string) => boolean; 
  errorText?: string; 
}

const Selects: React.FC<SelectsProps> = ({ label, options, value, onChange, validation, errorText }) => {
  const [isError, setIsError] = useState(false); 
  const handleChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value as string;

    // Перевірка на валідність
    if (validation) {
      setIsError(!validation(selectedValue));
    }

    onChange(selectedValue);
  };

  return (
    <FormControl fullWidth error={isError}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={handleChange}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {isError && <FormHelperText>{errorText}</FormHelperText>}
    </FormControl>
  );
};

export default Selects;
