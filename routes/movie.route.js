import express from "express";
import {
  addmovie,
  getmoviebyid,
  getmovies,
  getmovietrailer,
  recentmovies,
  allmovies,
  getmoviedetailsbyid,
  updatemvebyid,
  deletemvebyid,
} from "../services/movie.service.js";

const router = express.Router();

router.post("/addmovie", async (req, res) => {
  try {
    const movie = req.body;
    const data = await addmovie(movie);
    res.send({ message: "success" });
  } catch (error) {
    res.send({ message: "something went wrong" });
  }
});

//get all movies

router.get("/allmovies", async (req, res) => {
  try {
    const movies = await getmovies();
    console.log(movies);

    res.status(200).send({ newmve: movies });
  } catch (error) {
    console.log(error);
    res.send({ message: "something went wrong" });
  }
});

router.get("/recentmovies", async (req, res) => {
  try {
    const movies = await recentmovies();
    console.log(movies);

    res.status(200).send({ newmve: movies });
  } catch (error) {
    console.log(error);
    res.send({ message: "something went wrong" });
  }
});

router.get("/allmovies", async (req, res) => {
  try {
    const movies = await allmovies();
    console.log(movies);

    res.status(200).send({ newmve: movies });
  } catch (error) {
    console.log(error);
    res.send({ message: "something went wrong" });
  }
});

router.get("/viewdetails/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movies = await getmoviebyid(id);
    console.log(movies);

    res.status(200).send({ newmve: movies });
  } catch (error) {
    console.log(error);
    res.send({ message: "something went wrong" });
  }
});

router.get("/viewtrailer/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movies = await getmovietrailer(id);
    console.log(movies);

    res.status(200).send({ newmve: movies });
  } catch (error) {
    console.log(error);
    res.send({ message: "something went wrong" });
  }
});

router.get("/getmve/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movies = await getmoviedetailsbyid(id);
    console.log(movies);

    res.status(200).send({ newmve: movies });
  } catch (error) {
    console.log(error);
    res.send({ message: "something went wrong" });
  }
});

router.put("/editmovie/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movies = await updatemvebyid(id, req.body);
    console.log(movies);

    res.status(200).send({ message: "Movie updated successfully " });
  } catch (error) {
    console.log(error);
    res.send({ message: "something went wrong" });
  }
});

router.delete("/delmve/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movies = await deletemvebyid(id);
    console.log(movies);

    res.status(200).send({ message: "Movie deleted successfully " });
  } catch (error) {
    console.log(error);
    res.send({ message: "something went wrong" });
  }
});

export default router;
