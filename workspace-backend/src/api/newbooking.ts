import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const newBookingHandler = async (req: Request, res: Response) => {
  const { booking } = req.body;

  try {
    const newBooking = await prisma.booking.create({
      data: {
        booking,
      },
    });

    res.status(201).json(newBooking);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'An error occurred while creating the user.' });
  }
};
