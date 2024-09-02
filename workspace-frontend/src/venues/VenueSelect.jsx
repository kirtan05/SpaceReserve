import React from 'react';
import { Select } from 'baseui/select';
import { Venues } from './constants';

export const VenueSelect = ({ selectedVenue, onVenueChange }) => {
  const handleChange = (event) => {
    onVenueChange(event.value);
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
