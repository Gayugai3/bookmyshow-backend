import express from "express";
import {
  addshow,
  allshows,
  createTheatre,
  getshows,
  getTheatreName,
  getTheatres,
} from "../services/theatre.service.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    await createTheatre(req.body);

    res.send({ message: "Theatre added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

router.get("/listtheatres", async (req, res) => {
  try {
    const theatres = await getTheatres();
    // console.log(theatres);

    res.status(200).send({ newTheatres: theatres });
  } catch (error) {
    console.log(error);
    res.send({ message: "something went wrong" });
  }
});

//Shows Details'
router.post("/addshow", async (req, res) => {
  try {
    const show = req.body;
    const data = await addshow(show);
    res.send({ message: "Show added Successfully" });
  } catch (error) {
    res.send({ message: "something went wrong" });
  }
});

router.get("/allshows", async (req, res) => {
  try {
    const shows = await allshows();
    // console.log(shows);

    res.status(200).send({ newshow: shows });
  } catch (error) {
    console.log(error);
    res.send({ message: "something went wrong" });
  }
});

router.get("/alldetails", async (req, res) => {
  try {
    let details = await getshows();

    let name = await getTheatreName();

    details = details.map((det) => {
      return `${det._id.show_name}- ${det._id.show_time} `;
    });

    name = name.map((det) => {
      return `${det._id.theatre_name}`;
    });

    console.log("Result : ", details);
    // res.status(200).send({ newdetails: result });
    res.status(200).send({ showdetails: details, name: name });
  } catch (error) {
    console.log(error);
    res.send({ message: "something went wrong" });
  }
});

// router.get("/alltheatres", async (req, res) => {
//   try {
//     // let details = await getshows();

//     let name = await getTheatreName();

//     // details = details.map((det) => {
//     //   return `${det._id.show_name} - ${det._id.show_time} `;
//     // });

//     name = name.map((det) => {
//       return `${det._id.theatre_name} `;
//     });

//     console.log("Result : ", name);
//     // res.status(200).send({ newdetails: result });
//     res.status(200).send(name);
//   } catch (error) {
//     console.log(error);
//     res.send({ message: "something went wrong" });
//   }
// });

export default router;
