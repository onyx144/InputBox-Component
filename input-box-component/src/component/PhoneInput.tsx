import React, { useState } from 'react';
import Input from './Input'; 

const PhoneInput: React.FC = () => {
  const [phone, setPhone] = useState<string | number>(''); 
  const [isValid, setIsValid] = useState(true); 
  const validatePhone = (value: string | number): boolean => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/; 
    return phoneRegex.test(String(value));
  };

  const handlePhoneChange = (value: string | number) => {
    setPhone(value);
    setIsValid(validatePhone(value));
  };

  return (
    <div>
      <Input
        value={phone}
        onChange={handlePhoneChange}
        label="Phone Number"
        type="text" 
        validation={validatePhone} 
        errorText="Invalid phone number. Please enter a valid number." // Сообщение об ошибке
      />
      {isValid ? (
        <p>Phone number is valid</p>
      ) : (
        <p style={{ color: 'red' }}>Please enter a valid phone number.</p>
      )}
    </div>
  );
};

export default PhoneInput;
