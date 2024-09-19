import { useState } from 'react';
import { submitBooking } from '../utils/bookingCall';

export const useBookingForm = () => {
  const [date, setDate] = useState([new Date(), new Date()]);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [reason, setReason] = useState('');
  const [venue, setVenue] = useState('');
  const [expectedStrength, setExpectedStrength] = useState('');
  const [error, setError] = useState('');

  const validateBooking = () => {
    const [startDate, endDate] = date;
    const dateDiff = (endDate - startDate) / (1000 * 60 * 60 * 24);

    if (dateDiff > 7) {
      setError('The booking range cannot exceed 7 days.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (onClose) => {
    if (!validateBooking()) return;

    const bookingStartingTime = new Date(date[0]);
    bookingStartingTime.setHours(startTime.getHours(), startTime.getMinutes());

    const bookingEndingTime = new Date(date[0]);
    bookingEndingTime.setHours(endTime.getHours(), endTime.getMinutes());

    const bookingData = {
      email: "dummy123@gmail.com",
      bookingTime: new Date(),
      startTime: bookingStartingTime,
      endTime: bookingEndingTime,
      approvalStatus: "Pending",
      venue:venue,
      reason:reason,
      expectedStrength:expectedStrength,
    };

    const success = await submitBooking(bookingData);
    if (success) {
      alert('Booking submitted successfully!');
      onClose();
    } else {
      alert('Failed to submit booking.');
    }
  };

  return {
    date,
    setDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    venue,
    setVenue,
    expectedStrength,
    setExpectedStrength,
    reason,
    setReason,
    error,
    setError,
    handleSubmit,
  };
};
