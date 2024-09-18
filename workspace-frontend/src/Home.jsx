import React, { useState } from 'react';
import { Block } from 'baseui/block';
import { VenueSelect } from './venues/VenueSelect';
import { ClockWithBookings } from './ClocksWithBookings';
import { BookingButton } from './components/BookingButton';
import { DateClock } from './components/DateClock';
import { mockBookings } from './venues/constants';
import {
  DisplayMedium,
} from "baseui/typography";

import { useEffect } from 'react';

export const Home = () => {
  const [selectedVenue, setSelectedVenue] = useState('');
  const [displayDate, setDisplayDate] = useState([new Date()]);

  const handleVenueChange = (venue) => {
    setSelectedVenue(venue);
  };

  const handleDateChange = (date) => {
    setDisplayDate(date);
  };

  const apiUrl = process.env.BACKEND_URL;

    useEffect(() => {
    // Check if the selectedVenue and displayDate exist
    if (!selectedVenue || !displayDate) return;

    // Extract venue ID and format the date
    const venueId = selectedVenue.id;
    const formattedDate = displayDate[0].toISOString().split('T')[0]; // Format the date as yyyy-mm-dd

    // Prepare the query object
    const query = {
        venue: venueId,
        date: formattedDate,
    };

    const fetchBookings = async () => {
        try {
            const response = await fetch(`${apiUrl}/getBookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(query),
            });

            // Check if the response is OK
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Parse and handle the response data
            const data = await response.json();
            setBookings(data);
            console.log('Bookings:', data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    fetchBookings();
}, [selectedVenue, displayDate]);

  return (
    <Block
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding="1.5rem"
      backgroundColor="#f0f4f8"
      minHeight="100vh"
    >
      <Block
        as="h1"
        font="1.5rem"
        marginBottom="1rem"
        color="#333"
        textAlign="center"
      >
        Welcome to the Home Page
      </Block>
      <VenueSelect selectedVenue={selectedVenue} onVenueChange={handleVenueChange} />
      <Block marginBottom="1rem"></Block>
      <DateClock displayDate={displayDate} onDateChange={handleDateChange} />
      <Block
        display="flex"
        flexDirection="row"
        justifyContent="center"
        marginTop="1.25rem"
        marginBottom="0rem"
        width="100%"
      >
        <Block>
          <DisplayMedium
            overrides={{
              Block: {
                style: {
                  color: '#000000',
                  fontSize: '1rem',
                  textAlign: 'center',
                  marginBottom: '-2rem',
                },
              },
            }}
          >
            AM
          </DisplayMedium>
          <ClockWithBookings bookings={mockBookings} />
        </Block>
        <Block marginLeft="1rem">
          <Block>
            <DisplayMedium
              overrides={{
                Block: {
                  style: {
                    color: '#000000',
                    fontSize: '1rem',
                    textAlign: 'center',
                    marginBottom: '-2rem',
                  },
                },
              }}
            >
              PM
            </DisplayMedium>
            <ClockWithBookings bookings={mockBookings} />
          </Block>
        </Block>
      </Block>
      <BookingButton />
    </Block>
  );
};
