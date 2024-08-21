import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import Autocomplete, { usePlacesWidget } from 'react-google-autocomplete';

interface GoogleInputProps {
  label: string;
  onCoordinatesChange: (lat: number, lng: number , city: string) => void;
}

const GoogleInput: React.FC<GoogleInputProps> = ({ label, onCoordinatesChange }) => {
  const [city, setCity] = useState<string>('');

  const { ref } = usePlacesWidget({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, 
    onPlaceSelected: (place) => {
      if (place.geometry?.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        console.log('Latitude:', lat);
        console.log('Longitude:', lng);
        setCity(place.formatted_address || '');
        onCoordinatesChange(lat, lng , city);
      }
    },
  });

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
        onChange={(e) => setCity(e.target.value)}
      />     
    </Box>
  );
};

export default GoogleInput;
