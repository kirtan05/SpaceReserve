import React, { useState } from 'react';
import { Select } from 'baseui/select'; // Correct import for baseui
import { Venues } from './constants';

export const VenueSelect = () => {
  const [selectedVenue, setSelectedVenue] = useState('');

  const handleChange = (event) => {
    setSelectedVenue(event.value);
  };

  return (
    <Select
      value={selectedVenue}
      onChange={handleChange}
      placeholder="Select a venue"
      options={Object.entries(Venues).map(([key, value]) => ({
        id: key,
        label: value,
        value: value,
      }))}
    />
  );
};

