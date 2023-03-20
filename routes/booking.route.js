import express from "express";
import { bookticket, getPrice } from "../services/booking.service.js";
import { getmoviebyid } from "../services/movie.service.js";

const router = express.Router();

router.post("/bookticket/:email/:mve_id", async (req, res) => {
  const { email, mve_id } = req.params;

  const theatre_name = req.body.theatre_name;
  let show_name = req.body.show_name;
  console.log(typeof show_name);
  show_name = show_name.split("-")[0];
  console.log(show_name);
  // req.body.show_name = show_name;
  // const price = await getPrice(theatre_name, show_name);

  // console.log(ticket_price);
  console.log(show_name);
  console.log(theatre_name);

  try {
    const { ticket_price } = await getPrice(theatre_name, show_name);
    console.log(ticket_price);
    const movies = await getmoviebyid(mve_id);
    console.log(movies[0].mve_name);

    const movie_name = movies[0].mve_name;

    const bookingData = await bookticket(req.body, mve_id, email, ticket_price,movie_name);
    console.log(req.body);
    res.send({
      book_date: req.body.book_date,
      show_name: req.body.show_name,
      ticket: ticket_price,
      theatre_name: req.body.theatre_name,
      mve_name: movie_name,
    });
    console.log(req.params.mve_name);
    console.log(bookingData);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

export default router;
