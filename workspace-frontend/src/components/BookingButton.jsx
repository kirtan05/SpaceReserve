// src/components/BookingModal.js
import React, { useState } from 'react';
import { Button } from 'baseui/button';
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalButton } from 'baseui/modal';
import { DatePicker } from 'baseui/datepicker';
import { TimePicker } from 'baseui/timepicker';
import { Input } from 'baseui/input';
import { Block } from 'baseui/block';
import axios from 'axios';

export const BookingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState([new Date(), new Date()]); // Date range
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    const [startDate, endDate] = date;
    const dateDiff = (endDate - startDate) / (1000 * 60 * 60 * 24); // Difference in days

    if (dateDiff > 7) {
      setError('The booking range cannot exceed 7 days.');
      return;
    }

    setError(''); // Clear previous error

    const bookingData = {
      date: date.map((d) => d.toISOString()),
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      reason,
    };

    try {
      await axios.post('http://localhost:8500/api/newBooking', bookingData);
      alert('Booking submitted successfully!');
      setIsOpen(false);
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Failed to submit booking.');
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Booking</Button>
      <Modal onClose={() => setIsOpen(false)} isOpen={isOpen}>
        <ModalHeader>New Booking</ModalHeader>
        <ModalBody>
          <Block marginBottom="scale500">
            <DatePicker
              value={date}
              onChange={({ date }) => setDate(Array.isArray(date) ? date : [date])}
              range
            />
          </Block>
          <Block marginBottom="scale500">
            <TimePicker value={startTime} onChange={(time) => setStartTime(time)} />
          </Block>
          <Block marginBottom="scale500">
            <TimePicker value={endTime} onChange={(time) => setEndTime(time)} />
          </Block>
          <Block marginBottom="scale500">
            <Input
              value={reason}
              onChange={(e) => setReason(e.currentTarget.value)}
              placeholder="Reason for booking"
            />
          </Block>
          {error && (
            <Block color="red" marginBottom="scale500">
              {error}
            </Block>
          )}
        </ModalBody>
        <ModalFooter>
          <ModalButton kind="tertiary" onClick={() => setIsOpen(false)}>
            Cancel
          </ModalButton>
          <ModalButton onClick={handleSubmit}>Submit</ModalButton>
        </ModalFooter>
      </Modal>
    </>
  );
};
