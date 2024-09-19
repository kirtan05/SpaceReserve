import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const newBookingHandler = async (req: Request, res: Response) => {
  const { email, bookingTime, startTime, endTime, approvalStatus, venue, reason, expectedStrength } = req.body;
  console.log(email,bookingTime,startTime,endTime,approvalStatus,venue,reason,expectedStrength);
  console.log(startTime,endTime)
  try {
    const newBooking = await prisma.booking.create({
      data: {
        email,
        bookingTime: new Date(),
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        approvalStatus,
        venue,
        reason,
        expectedStrength,
      },
    });

    res.status(201).json(newBooking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'An error occurred while creating the booking.' });
  }
};
