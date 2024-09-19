import { format } from 'date-fns';

export const getClockCoordinates = (hour, minute = 0) => {
  const angle = (hour % 12) * 30 + minute * 0.5;
  const radians = (angle - 90) * (Math.PI / 180);
  const x = 75 + 60 * Math.cos(radians);
  const y = 75 + 60 * Math.sin(radians);
  return { x, y };
};

export const convertTo12Hour = (dateStr, showPMOnly) => {
  const date = new Date(dateStr);
  const hours = date.getHours();
  const timePeriod = hours < 12 ? 'AM' : 'PM';

  // Based on the flag, filter AM or PM bookings
  if (showPMOnly && timePeriod === 'AM') return null;
  if (!showPMOnly && timePeriod === 'PM') return null;

  const time = format(date, "h:mm a");
  return { hour: hours % 12 || 12, minute: date.getMinutes(), time };
};
