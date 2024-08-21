import React, { FC } from 'react';
import TextField from '@mui/material/TextField';

interface InputProps {
  value: string | number;
  onChange: (value: string | number) => void;
  label: string;
  type: string;
}

const Input: FC<InputProps> = ({ value, onChange, label , type}) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      if (typeof value == 'number') {
        onChange(Number(inputValue));
      } else {
        onChange(inputValue);
      }
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
    />
  );
};

export default Input;
