import React from 'react';
import { DatePicker } from 'baseui/datepicker';

export const DateClock = ({ value, onDateChange }) => {
  return (
    <DatePicker
      value={value}
      onChange={({ date }) => {
        onDateChange({ date });
      }}
    />
  );
};
