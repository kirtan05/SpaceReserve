import React, { useState } from 'react';
import { Popover } from 'baseui/popover';
import { Block } from 'baseui/block';
import { LabelLarge, ParagraphSmall } from 'baseui/typography';
import { FaClock, FaInfoCircle } from 'react-icons/fa';

export const ClockWithBookings = ({ bookings }) => {
  const [hoveredBooking, setHoveredBooking] = useState(null);

  const getClockCoordinates = (hour, minute = 0) => {
    const angle = (hour % 12) * 30 + minute * 0.5;
    const radians = (angle - 90) * (Math.PI / 180);
    const x = 75 + 60 * Math.cos(radians);
    const y = 75 + 60 * Math.sin(radians);
    return { x, y };
  };

  const convertTo12HourFormat = (dateTime) => {
    const date = new Date(dateTime);
    let hour = date.getHours();
    const minute = date.getMinutes();
    const period = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12; // Convert 0 hour to 12 for midnight/noon
    return { hour, minute, period };
  };

  const renderSectors = () => {
    return bookings.map((booking, index) => {
      const start = convertTo12HourFormat(booking.startTime);
      const end = convertTo12HourFormat(booking.endTime);

      const startCoords = getClockCoordinates(start.hour, start.minute);
      const endCoords = getClockCoordinates(end.hour, end.minute);

      return (
        <Popover
          key={index}
          isOpen={hoveredBooking === booking}
          content={
            <Block padding="scale400" maxWidth="180px" backgroundColor="black">
              <LabelLarge
                style={{
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '4px',
                }}
              >
                <FaInfoCircle style={{ marginRight: '6px' }} />
                {booking.name}
              </LabelLarge>
              <ParagraphSmall
                style={{
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '4px',
                }}
              >
                <FaClock style={{ marginRight: '6px' }} />
                {`${start.hour}:${String(start.minute).padStart(2, '0')} ${start.period}`} - {`${end.hour}:${String(end.minute).padStart(2, '0')} ${end.period}`}
              </ParagraphSmall>
              <ParagraphSmall style={{ color: 'white' }}>{booking.reason}</ParagraphSmall>
            </Block>
          }
          placement="auto"
          overrides={{
            Body: {
              style: ({ $theme }) => ({
                zIndex: 10,
                backgroundColor: $theme.colors.backgroundSecondary,
                borderRadius: $theme.borders.radius200,
              }),
            },
            Inner: {
              style: {
                backgroundColor: 'black',
                boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
                color: 'white',
              },
            },
          }}
        >
          <g
            onMouseEnter={() => setHoveredBooking(booking)}
            onMouseLeave={() => setHoveredBooking(null)}
          >
            <path
              d={`M75,75 L${startCoords.x},${startCoords.y} A60,60 0 0,1 ${endCoords.x},${endCoords.y} Z`}
              fill={hoveredBooking === booking ? "rgba(255, 165, 0, 0.8)" : "rgba(255, 165, 0, 0.5)"}
              stroke="black"
            />
          </g>
        </Popover>
      );
    });
  };

  return (
    <svg viewBox="0 0 150 150" width="400" height="400">
      {/* Clock Circle */}
      <circle cx="75" cy="75" r="60" stroke="black" strokeWidth="2" fill="white" />

      {/* Clock Numbers */}
      {[...Array(12)].map((_, i) => {
        const angle = i * 30;
        const x = 75 + 65 * Math.cos((angle - 90) * (Math.PI / 180));
        const y = 75 + 65 * Math.sin((angle - 90) * (Math.PI / 180));
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize="6"
          >
            {i === 0 ? 12 : i}
          </text>
        );
      })}

      {/* Booked Sectors */}
      {renderSectors()}
    </svg>
  );
};

export default ClockWithBookings;
