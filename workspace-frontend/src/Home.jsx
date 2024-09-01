import React from 'react';
import { VenueSelect } from './venues/VenueSelect';
import { ClockWithBookings } from './ClocksWithBookings';

const mockBookings = [
  {
    start: "4:30",
    end: "6:00",
    name: "NJACK",
    reason: "Coding Workshop"
  },
  {
    start: "8:00",
    end: "10:00",
    name: "SYAHI",
    reason: "Creative Writing Meetup"
  },
  {
    start: "2:00",
    end: "3:30",
    name: "ART CLUB",
    reason: "Painting Session"
  }
];

export const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <VenueSelect /> {/* Use the VenueSelect component */}
      <ClockWithBookings bookings={mockBookings} />
      <ClockWithBookings bookings={mockBookings} />
    </div>
  );
};