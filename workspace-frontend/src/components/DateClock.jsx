import React from 'react';
import { DatePicker } from "baseui/datepicker";
import { SIZE } from "baseui/input";

export function DateClock({ value, onChange }) {
  return (
    <DatePicker
      value={value}
      onChange={onChange}
      size={SIZE.default}
    />
  );
}
