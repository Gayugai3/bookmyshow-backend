import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
import usersRouter from "./routes/users.route.js";
import movieRouter from "./routes/movie.route.js";
import bookingsRouter from "./routes/booking.route.js";
import theatersRouter from "./routes/theatre.route.js";

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());
//mongo connection

const MONGO_URL = process.env.DB;
export const client = new MongoClient(MONGO_URL);
client.connect();
console.log("mongo connected");

app.use("/user", usersRouter);
app.use("/movies", movieRouter);
app.use("/bookings", bookingsRouter);
app.use("/theatres", theatersRouter);

app.listen(PORT, () => console.log("app started in PORT", PORT));
