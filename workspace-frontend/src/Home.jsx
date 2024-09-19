import React, { useState } from 'react';
import { Block } from 'baseui/block';
import { VenueSelect } from './venues/VenueSelect';
import { ClockWithBookings } from './components/clockWithBookings/ClocksWithBookings';
import { BookingButton } from './components/bookingButton/BookingButton';
//import { DateClock } from './components/DateClock';
import { mockBookings } from './venues/constants';
import {
  DisplayMedium,
} from "baseui/typography";

import { useEffect } from 'react';

export const Home = () => {
  const [bookings, setBookings] = useState([]);

  const handleBookingsFetched = (fetchedBookings) => {
    setBookings(fetchedBookings);
  };

  const apiUrl = process.env.BACKEND_URL;
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
      <VenueSelect onBookingsFetched={handleBookingsFetched} />
      <Block marginBottom="1rem"></Block>
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
          <ClockWithBookings bookings={bookings} showPMOnly={0}/>
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
            <ClockWithBookings bookings={bookings} showPMOnly={1}/>
          </Block>
        </Block>
      </Block>
      <BookingButton />
    </Block>
  );
};