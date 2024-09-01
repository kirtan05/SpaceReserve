import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUserHandler = async (req: Request, res: Response) => {
  const { email, name, role, approverEmail } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        role,
        approverEmail,  
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'An error occurred while creating the user.' });
  }
};
