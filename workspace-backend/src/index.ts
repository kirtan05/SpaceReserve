import express, { Request, Response, NextFunction } from "express";
import { createUserHandler } from "./api/createUser";
import { newBookingHandler } from "./api/newbooking";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/createUser', createUserHandler);
app.use('/api/newBooking', newBookingHandler);

const PORT = process.env.PORT || 8500;
app.listen(PORT, () => {
  console.log("Connected to Backend on Port", PORT);
});
