const express, {Request, Response}=require("express");
// import cors from "cors";
const { PrismaClient }=require("@prisma/client");

// import { expressjwt as jwt } from "express-jwt";
// import jwkToPem from "jwk-to-pem";
// import path from "path";
const prisma = new PrismaClient();

// async function main() {
//   // ... you will write your Prisma Client queries here
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
interface BookingInput {
  bookingTime: Date;
  startTime: Date;
  endTime: Date;
  approvalStatus: string;
  reason: string;
}

interface UserInput {
  email: string;
  name?: string;
  role: string;
  bookings: BookingInput[];
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post('/create-user', async (req: Request, res: Response) => {
  const { email, name, role, bookings } = req.body;

  try {
      const newUser = await prisma.user.create({
          data: {
              email,
              name,
              role,
              bookings: {
                  create: bookings.map((booking:any) => ({
                      booking: {
                          create: {
                              bookingTime: booking.bookingTime,
                              startTime: booking.startTime,
                              endTime: booking.endTime,
                              approvalStatus: booking.approvalStatus,
                              reason: booking.reason,
                          },
                      },
                  })),
              },
          },
          include: {
              bookings: true,
          },
      });

      res.status(201).json(newUser);
  } catch (error) {
      console.error('Error creating user:', error);
      // res.status(500).json({ error: 'An error occurred while creating the user.' });
  }
});

const PORT = process.env.PORT || 8500;
app.listen(PORT, () => {
  console.log("Connected to Backend on Port", PORT);
});