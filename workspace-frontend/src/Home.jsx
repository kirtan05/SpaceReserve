import React from 'react';
import { VenueSelect } from './venues/VenueSelect';
import { ClockWithBookings } from './ClocksWithBookings';
import { BookingButton } from './components/BookingButton';
import { DateClock } from './components/DateClock';
import { mockBookings } from './venues/constants';

export const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <VenueSelect /> {/* Use the VenueSelect component */}
      <DateClock/>
      <ClockWithBookings bookings={mockBookings} />
      <ClockWithBookings bookings={mockBookings} />
      
      <BookingButton/>
    </div>
  );
};