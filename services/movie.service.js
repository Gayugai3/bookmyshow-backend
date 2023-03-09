import { client } from "../index.js";
import { ObjectId } from "mongodb";

export async function addmovie(movie) {
  return await client.db("bookmyshow").collection("movies").insertOne(movie);
}

export async function getmovies() {
  return await client.db("bookmyshow").collection("movies").find({}).toArray();
}

export async function recentmovies() {
  return await client
    .db("bookmyshow")
    .collection("movies")
    .find({})
    .sort({ release_date: -1 })
    .limit(4)
    .toArray();
}

export async function allmovies() {
  return await client.db("bookmyshow").collection("movies").find({}).toArray();
}

export async function getmoviebyid(id) {
  return await client
    .db("bookmyshow")
    .collection("movies")
    .find(
      { _id: ObjectId(id) },
      {
        projection: {
          _id: 1,
          mve_name: 1,
          director: 1,
          actor: 1,
          actress: 1,
          trailer_link: 1,
          mve_poster: 1,
          description: 1,
        },
      }
    )
    .toArray();
}

export async function getmoviedetailsbyid(id) {
  return await client
    .db("bookmyshow")
    .collection("movies")
    .find(
      { _id: ObjectId(id) },
      {
        projection: {
          _id: 0,
        },
      }
    )
    .toArray();
}

export async function getmovietrailer(id) {
  return await client
    .db("bookmyshow")
    .collection("movies")
    .find(
      { _id: ObjectId(id) },
      {
        projection: {
          _id: 1,
          mve_name: 1,
          trailer_link: 1,
        },
      }
    )
    .toArray();
}

export async function updatemvebyid(id, data) {
  return await client
    .db("bookmyshow")
    .collection("movies")
    .updateOne({ _id: ObjectId(id) }, { $set: data });
}

export async function deletemvebyid(id, data) {
  return await client
    .db("bookmyshow")
    .collection("movies")
    .deleteOne({ _id: ObjectId(id) });
}

