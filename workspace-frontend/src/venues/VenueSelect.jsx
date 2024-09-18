import React, { useState } from 'react';
import { Select } from 'baseui/select';
import { Venues } from './constants';
import { DateClock } from '../components/DateClock';

export const VenueSelect = ({ onBookingsFetched }) => {
  const [selectedVenue, setSelectedVenue] = useState('');
  const [selectedDate, setSelectedDate] = useState([new Date()]);

  const handleVenueChange = (event) => {
    setSelectedVenue(event.value);
  };

  const handleDateChange = ({ date }) => {
    setSelectedDate(Array.isArray(date) ? date : [date]);
  };

  const fetchBookings = async () => {
    if (selectedVenue && selectedDate) {
      const formattedDate = selectedDate[0].toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'
      const venue = selectedVenue[0].label; // Assuming you need the venue label
  
      const url = `http://localhost:8500/api/getBookings?venue=${encodeURIComponent(venue)}&date=${formattedDate}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      console.log(data);
      onBookingsFetched(data); // Pass the fetched bookings to parent component
    }
  };
  

  React.useEffect(() => {
    fetchBookings();
  }, [selectedVenue, selectedDate]);

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
      <DateClock value={selectedDate} onChange={handleDateChange} />
    </div>
  );
};
