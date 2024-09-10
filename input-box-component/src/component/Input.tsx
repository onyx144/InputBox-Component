import React, { FC, useState } from 'react';
import TextField from '@mui/material/TextField';

interface InputProps {
  value: string | number;
  onChange: (value: string | number) => void;
  label: string;
  type: string;
  validation?: (value: string | number) => boolean; 
  errorText?: string; 
}

const Input: FC<InputProps> = ({ value, onChange, label, type, validation, errorText }) => {
  const [isError, setIsError] = useState(false); 

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    let parsedValue: string | number = inputValue;

    if (type === 'number') {
      parsedValue = Number(inputValue);
    }

    // Перевірка на валідність
    if (validation) {
      setIsError(!validation(parsedValue));
    }

    onChange(parsedValue);
  };

  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      type={type}
      margin="normal"
      value={value}
      onChange={handleChange}
      error={isError} 
      helperText={isError ? errorText : ''} 
    />
  );
};

export default Input;
