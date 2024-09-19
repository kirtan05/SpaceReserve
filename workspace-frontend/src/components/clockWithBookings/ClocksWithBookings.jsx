import React, { useState } from 'react';
import { Popover } from 'baseui/popover';
import { Block } from 'baseui/block';
import { LabelLarge, ParagraphSmall } from 'baseui/typography';
import { FaClock, FaInfoCircle } from 'react-icons/fa';
import { getClockCoordinates, convertTo12Hour } from './utils';

export const ClockWithBookings = ({ bookings, showPMOnly }) => {
  const [hoveredBooking, setHoveredBooking] = useState(null);

  const renderSectors = () => {
    return bookings
      .map((booking, index) => {
        const start = convertTo12Hour(booking.startTime, showPMOnly);
        const end = convertTo12Hour(booking.endTime, showPMOnly);
        if (!start || !end) return null;

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
                  {booking.email}
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
                  {start.time} - {end.time}
                </ParagraphSmall>
                <ParagraphSmall style={{ color: 'white' }}>
                  {booking.reason}
                </ParagraphSmall>
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
      })
      .filter(Boolean); 
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
      {renderSectors()}
    </svg>
  );
};


