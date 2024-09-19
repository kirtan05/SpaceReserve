import React, { useState } from 'react';
import { Select } from 'baseui/select';
import { Venues } from './constants';
import { DateClock } from '../components/DateClock';
import { useBookings } from './useBookings';

export const VenueSelect = ({ onBookingsFetched }) => {
  const [selectedVenue, setSelectedVenue] = useState('');
  const [selectedDate, setSelectedDate] = useState([new Date()]);

  const handleVenueChange = (event) => {
    setSelectedVenue(event.value);
  };

  const handleDateChange = ({ date }) => {
    if (Array.isArray(date)) {
      setSelectedDate(date);  
    } else if (date instanceof Date) {
      setSelectedDate([date]);  
    }
  };

  const venue = selectedVenue[0]?.label;
  const { bookings, error } = useBookings(venue, selectedDate[0]);

  if (bookings) {
    onBookingsFetched(bookings);
  }
  return (
    <div>
      <Select
        value={selectedVenue}
        onChange={handleVenueChange}
        placeholder="Select a venue"
        options={Object.entries(Venues).map(([key, value]) => ({
          id: key,
          label: value,
          value: value,
        }))}
      />
      <DateClock value={selectedDate[0]} onDateChange={handleDateChange} />
      {error && <div>Error fetching bookings: {error.message}</div>}
    </div>
  );
};
