import React, { useState } from 'react';
import { Box, TextField, FormHelperText } from '@mui/material';
import Autocomplete, { usePlacesWidget } from 'react-google-autocomplete';

interface GoogleInputProps {
  label: string;
  onCoordinatesChange: (lat: number, lng: number, city: string) => void;
  validation?: (value: string) => boolean;
  errorText?: string;
}

const GoogleInput: React.FC<GoogleInputProps> = ({ label, onCoordinatesChange, validation, errorText }) => {
  const [city, setCity] = useState<string>('');
  const [isError, setIsError] = useState(false);

  const { ref } = usePlacesWidget({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    onPlaceSelected: (place) => {
      if (place.geometry?.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setCity(place.formatted_address || '');
        if (validation) {
          setIsError(!validation(place.formatted_address || ''));
        }
        onCoordinatesChange(lat, lng, place.formatted_address || '');
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCity(value);
    if (validation) {
      setIsError(!validation(value));
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <TextField
        label={label}
        variant="outlined"
        fullWidth
        inputRef={ref}
        id="city"
        name="city"
        value={city}
        onChange={handleChange}
        error={isError}
      />
      {isError && <FormHelperText error>{errorText}</FormHelperText>}
    </Box>
  );
};

export default GoogleInput;
