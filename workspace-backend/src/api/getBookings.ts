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
      const venue = req.query.venue as string;
      const date = req.query.date as string;
  
      if (!venue || !date) {
        return res.status(400).json({ error: 'Venue and date are required' });
      }
  
      // Parse the date components manually
      const [year, month, day] = date.split('-').map(Number);
  
      // Create startOfDay and endOfDay in UTC
      const startOfDay = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
      const endOfDay = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999));
      console.log(venue , startOfDay, date);
      // Query the database for bookings within the UTC range
      const bookings = await prisma.booking.findMany({
        where: {
          venue: venue,
          startTime: {
            gte: startOfDay,
            lt: endOfDay,
          },
        },
      });
  
      res.json(bookings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching bookings' });
    }
  };
  