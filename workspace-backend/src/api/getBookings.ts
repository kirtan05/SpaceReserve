import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getBookingHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extract venue and date from query parameters
    const venue = req.query.venue as string;
    const dateInIST = req.query.date as string; // Date provided in IST (yyyy-mm-dd format)
    
    if (!venue || !dateInIST) {
      return res.status(400).json({ error: 'Venue and date are required' });
    }
    console.log(dateInIST);
    // Parse the selected date in IST and calculate start and end of the day in IST
    const startOfDayInIST = new Date(dateInIST);
    startOfDayInIST.setHours(0, 0, 0, 0); // Set to the start of the day in IST (00:00:00)

    const endOfDayInIST = new Date(startOfDayInIST);
    endOfDayInIST.setDate(endOfDayInIST.getDate() + 1); // Set to the end of the day in IST (23:59:59)
   console.log(startOfDayInIST,endOfDayInIST);
  //   // Convert startOfDayInIST and endOfDayInIST to UTC
  //   const istOffsetMilliseconds = 5.5 * 60 * 60 * 1000; // Offset for IST is +5:30 hours
  //   const startOfDayInUTC = new Date(startOfDayInIST.getTime() - istOffsetMilliseconds); // IST to UTC
  //   const endOfDayInUTC = new Date(endOfDayInIST.getTime() - istOffsetMilliseconds);     // IST to UTC

  //   // Query the database for bookings in UTC, matching venue and time range
  //   console.log(startOfDayInUTC);
  //   console.log(endOfDayInUTC);
    const bookings = await prisma.booking.findMany({
      where: {
        venue: venue,
        startTime: {
          gte: startOfDayInIST, // Greater than or equal to the start of the day in UTC
          lt: endOfDayInIST    // Less than the end of the day in UTC
        }
      }
    });

    // Return the filtered bookings
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching bookings' });
  }
};
