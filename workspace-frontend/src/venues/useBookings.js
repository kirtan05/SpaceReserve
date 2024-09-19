import { useEffect, useState } from 'react';
import { fetchBookings } from './fetchBookings';

export const useBookings = (venue, date) => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndSetBookings = async () => {
      if (venue && date) {
        try {
          const data = await fetchBookings(venue, date);
          setBookings(data);
        } catch (err) {
          setError(err);
        }
      }
    };

    fetchAndSetBookings();
  }, [venue, date]);

  return { bookings, error };
};
