import { client } from "../index.js";

export async function getUserByUsername(email) {
  return await client
    .db("bookmyshow")
    .collection("users")
    .findOne({ email: email });
}

export async function addUser(data) {
  return await client
    .db("bookmyshow")
    .collection("users")
    .insertOne({ ...data, role: "user" });
}

export async function addmsg(msg) {
  return await client.db("bookmyshow").collection("contact").insertOne(msg);
}

export async function getcontact() {
  return await client.db("bookmyshow").collection("contact").find({}).toArray();
}

export async function updateUser({ email, randomnum }) {
  return await client
    .db("bookmyshow")
    .collection("users")
    .updateOne({ email: email }, { $set: { rnm: randomnum } });
}

export async function updateUserByemail({ email, password1 }) {
  return await client
    .db("bookmyshow")
    .collection("users")
    .updateOne({ email: email }, { $set: { password1: password1 } });
}

export async function getallusers() {
  return await client
    .db("bookmyshow")
    .collection("users")
    .find({ role: "user" })
    .toArray();
}
