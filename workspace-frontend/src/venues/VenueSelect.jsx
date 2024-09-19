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
    if (Array.isArray(date)) {
      setSelectedDate(date);  // Ensure the date is an array
    } else if (date instanceof Date) {
      setSelectedDate([date]);  // Convert single date to an array
    }
    console.log("Selected date:", date);  // Log the selected date to verify it's valid
  };

  const fetchBookings = async () => {
    if (selectedVenue && selectedDate[0]) {
      const formattedDate = selectedDate[0].toISOString().split('T')[0];
      const venue = selectedVenue[0]?.label;

      if (!venue) {
        console.error('No venue selected');
        return;
      }

      const url = `http://localhost:8500/api/getBookings?venue=${encodeURIComponent(venue)}&date=${formattedDate}`;

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        onBookingsFetched(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
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
      <DateClock value={selectedDate[0]} onDateChange={handleDateChange} />
    </div>
  );
};
