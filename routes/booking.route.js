import express from "express";
import { bookticket, getPrice } from "../services/booking.service.js";

const router = express.Router();

router.post("/bookticket/:email", async (req, res) => {
  const { email } = req.params;
  const theatre_name = req.body.theatre_name;
  const show_name = req.body.show_name;
  // const price = await getPrice(theatre_name, show_name);

  // console.log(ticket_price);
  console.log(show_name);
  console.log(theatre_name);
  try {
    const { ticket_price } = await getPrice(theatre_name, show_name);

    const bookingData = await bookticket(req.body, email, ticket_price);
    console.log(req.body);
    res.send({
      bookingData: bookingData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

export default router;
