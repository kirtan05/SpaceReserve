import React from 'react';
import { Block } from 'baseui/block';
import { VenueSelect } from './venues/VenueSelect';
import { ClockWithBookings } from './ClocksWithBookings';
import { BookingButton } from './components/BookingButton';
import { DateClock } from './components/DateClock';
import { mockBookings } from './venues/constants';
import {
  DisplayLarge,
  DisplayMedium,
  DisplaySmall,
  DisplayXSmall,
} from "baseui/typography";
export const Home = () => {
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
      <VenueSelect />
      <Block marginBottom="1rem"></Block>
      <DateClock />
      <Block
        display="flex"
        flexDirection="row"
        justifyContent="center"
        marginTop="1.25rem"
        marginBottom="0rem"
        width="100%"
      >
        <Block>        <DisplayMedium
          overrides={{
            Block: {
              style: {
                color: '#000000', // Black color
                fontSize: '1rem', // Adjust size as needed
                textAlign: 'center', // Center align text
                marginBottom :'-2rem',
              },
            },
          }}
        >
          AM
        </DisplayMedium>
        <ClockWithBookings bookings={mockBookings} /></Block>
        
        <Block marginLeft="1rem">
        <Block>
        <DisplayMedium
          overrides={{
            Block: {
              style: {
                color: '#000000', // Black color
                fontSize: '1rem', // Adjust size as needed
                textAlign: 'center', // Center align text
                marginBottom :'-2rem',
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
