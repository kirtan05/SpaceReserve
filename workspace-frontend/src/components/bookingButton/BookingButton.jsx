import React from 'react';
import { Button } from 'baseui/button';
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalButton } from 'baseui/modal';
import { DatePicker } from 'baseui/datepicker';
import { TimePicker } from 'baseui/timepicker';
import { Input } from 'baseui/input';
import { Block } from 'baseui/block';
import { useModal } from '../hooks/useModal';
import { useBookingForm } from '../hooks/useBookingForm';

export const BookingButton = () => {
  const { isOpen, open, close } = useModal();
  const {
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
    handleSubmit,
  } = useBookingForm();

  return (
    <>
      <Button onClick={open}>Booking</Button>
      <Modal onClose={close} isOpen={isOpen}>
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
            <TimePicker value={startTime} onChange={setStartTime} />
          </Block>
          <Block marginBottom="scale500">
            <TimePicker value={endTime} onChange={setEndTime} />
          </Block>
          <Block marginBottom="scale500">
            <Input
              value={venue}
              onChange={(e) => setVenue(e.currentTarget.value)}
              placeholder="Venue"
            />
          </Block>
          <Block marginBottom="scale500">
            <Input
              value={expectedStrength}
              onChange={(e) => setExpectedStrength(e.currentTarget.value)}
              placeholder="Expected strength"
            />
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
          <ModalButton kind="tertiary" onClick={close}>
            Cancel
          </ModalButton>
          <ModalButton onClick={() => handleSubmit(close)}>Submit</ModalButton>
        </ModalFooter>
      </Modal>
    </>
  );
};
