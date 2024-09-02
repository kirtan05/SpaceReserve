import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
type BookingWhereInput = {
    email: String,
    bookingTime: Date,
    startTime: Date, 
    endTime: Date,
    approvalStatus: String,
    venue: String,
    reason: String,
    expectedStrength: String 
  };

export const getBookingHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req);
    // Extract venue and date from request query parameters
    const venue = req.body.venue as string;
    const date = req.body.date as string;
    console.log(venue,date);
    // Validate parameters
    if (!venue || !date) {
      return res.status(400).json({ error: 'Venue and date are required' });
    }

    // Parse the date
    const startOfDay = new Date(date);
    const endOfDay = new Date(date);
    endOfDay.setDate(endOfDay.getDate() + 1);

    // Query the database for bookings
    console.log(date);
    const bookings = await prisma.booking.findMany();

    const filteredBookings = bookings.filter(booking => 
      booking.booking.venue === venue &&
      booking.booking.bookingTime >= startOfDay &&
      booking.booking.bookingTime < endOfDay
    );
    
      

    // Return the bookings
    res.json(filteredBookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching bookings' });
  }
};

