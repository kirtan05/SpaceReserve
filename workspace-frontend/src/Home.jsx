import React from 'react';
import { VenueSelect } from './venues/VenueSelect';

export const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <VenueSelect /> {/* Use the VenueSelect component */}
    </div>
  );
};
