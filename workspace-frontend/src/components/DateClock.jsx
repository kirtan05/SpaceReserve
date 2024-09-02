import React from 'react';
import { DatePicker } from "baseui/datepicker";
import { SIZE } from "baseui/input";

export const DateClock = ({ displayDate, onDateChange }) => {
  const handleChange = ({ date }) => {
    onDateChange(Array.isArray(date) ? date : [date]);
  };

  return (
    <DatePicker
      value={displayDate}
      onChange={handleChange}
      size={SIZE.default}
      displayValueAtRangeIndex={0}
    />
  );
};
