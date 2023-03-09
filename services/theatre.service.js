import { client } from "../index.js";

export async function createTheatre(data) {
  return await client.db("bookmyshow").collection("theatres").insertOne(data);
}

export async function getTheatres() {
  return await client
    .db("bookmyshow")
    .collection("theatres")
    .find({})
    .toArray();
}

//Shows collection
export async function addshow(show) {
  return await client.db("bookmyshow").collection("shows").insertOne(show);
}

export async function allshows() {
  return await client.db("bookmyshow").collection("shows").find({}).toArray();
}

// export async function allDetails() {
//   return await client
//     .db("bookmyshow")
//     .collection("shows")
//     .find(
//       {},
// {
// projection: {
//   show_name: 1,
//   theatre_name: 1,
//   show_time: 1,
// },
// }
//     )
//     .toArray();
// }

export async function getshows() {
  return await client
    .db("bookmyshow")
    .collection("shows")
    .aggregate([
      {
        $group: {
          _id: {
            // theatre_name: "$theatre_name",
            show_name: "$show_name",
            show_time: "$show_time",
          },
        },
      },
    ])
    .toArray();
}

export async function getTheatreName() {
  return await client
    .db("bookmyshow")
    .collection("shows")
    .aggregate([
      {
        $group: {
          _id: {
            theatre_name: "$theatre_name",
          },
        },
      },
    ])
    .toArray();
}
