import React, { useState } from 'react';
import { DatePicker } from "baseui/datepicker";
import { SIZE } from "baseui/input";

export  function DateClock() {
  const [displayDate, setDisplayDate] = React.useState([new Date()]);
  return (
    <DatePicker
      value={displayDate}
      onChange={({ date }) =>
        setDisplayDate(Array.isArray(date) ? date : [date])
      }
      size={SIZE.default}
      displayValueAtRangeIndex={0}
    />
  );
}