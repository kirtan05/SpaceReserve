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

export const Home = () => {
  const [selectedVenue, setSelectedVenue] = useState('');
  const [displayDate, setDisplayDate] = useState([new Date()]);

  const handleVenueChange = (venue) => {
    setSelectedVenue(venue);
    sendQuery(venue, displayDate);
  };

  const handleDateChange = (date) => {
    setDisplayDate(date);
    sendQuery(selectedVenue, date);
  };

  useEffect(() => {
    console.log("check");
    if (!selectedVenue || !selectedDate) return;

    const venueId = selectedVenue.id;
    const formattedDate = selectedDate[0].toISOString().split('T')[0]; // Format the date as yyyy-mm-dd

    const query = new URLSearchParams({ venue: venueId, date: formattedDate }).toString();

    fetch(`/api/getBookings?${query}`, {
      method: 'GET',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setBookings(data); // Update state with the received bookings
        console.log('Bookings:', data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, [selectedVenue, selectedDate]); // Re-run when venue or date changes
  
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
