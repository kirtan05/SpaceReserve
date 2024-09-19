import axios from 'axios';

export const submitBooking = async (bookingData) => {
  try {
    await axios.post('http://localhost:8500/api/newBooking', bookingData);
    return true;
  } catch (error) {
    console.error('Error submitting booking:', error);
    return false;
  }
};
