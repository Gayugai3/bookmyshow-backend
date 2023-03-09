import { client } from "../index.js";

export async function bookticket(data, email, ticket_price) {
  return await client
    .db("bookmyshow")
    .collection("bookings")
    .insertOne({ ...data, email: email, ticket_price: ticket_price });
}

export async function getPrice(theatre_name, show_name) {
  return await client
    .db("bookmyshow")
    .collection("shows")
    .findOne(
      {
        $and: [{ theatre_name: theatre_name }, { show_name: show_name }],
      },
      {
        projection: {
          _id: 0,
          ticket_price: 1,
        },
      }
    );
}
