import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  addmsg,
  addUser,
  getallusers,
  getcontact,
  getUserByUsername,
  updateUser,
  updateUserByemail,
} from "../services/users.service.js";
import nodemailer from "nodemailer";
import rn from "random-number";

const options = {
  min: 1000,
  max: 9999,
  integer: true,
};

const router = express.Router();

async function generateHashedPassword(password) {
  //console.log(password);
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  // console.log(salt);
  //console.log(hashedPassword);
  return hashedPassword;
}

router.post("/register", async function (req, res) {
  try {
    const userFromDB = await getUserByUsername(req.body.email);

    if (userFromDB) {
      res.status(200).send({ message: "username already exist try others" });
    } else if (req.body.password1.length < 8) {
      res.status(400).send({ message: "password min 8 characters required" });
    } else {
      req.body.password1 = await generateHashedPassword(req.body.password1);
      delete req.body.password2;

      // console.log(req.body.password1);

      await addUser(req.body); //imported from service file

      res.send({ message: "Register successful" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "something went wrong" });
  }
});

//contact message handler
router.post("/contact", async (req, res) => {
  try {
    await addmsg(req.body);
    res.send({ message: "Message sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

router.get("/getcontact", async (req, res) => {
  try {
    // const { id } = req.params;
    const contact = await getcontact();
    console.log(contact);

    res.status(200).send({ newcontact: contact });
  } catch (error) {
    console.log(error);
    res.send({ message: "something went wrong" });
  }
});

//Login
router.post("/login", async function (req, res) {
  try {
    const user = await getUserByUsername(req.body.email);
    if (user) {
      const match = await bcrypt.compare(req.body.password, user.password1);

      if (match) {
        const token = jwt.sign(
          { _id: user._id, name: user.email },
          process.env.SECRET_KEY
        );

        res.status(200).json({
          message: "Successfully Logged in",
          token: token,
          email: user.email,
          role: user.role,
          name: user.username,
        });
      } else {
        res.json({ message: "Invalid credentials" });
      }
    } else {
      res.json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
  }
});

//forgot password nodemailer
router.post("/sendmail", async function (request, response) {
  try {
    const email = request.body.email;
    const user = await getUserByUsername(email);
    if (user) {
      let randomnum = rn(options);
      console.log("body", request.body.email);
      await updateUser({ email: request.body.email, randomnum: randomnum });
      var transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        secure: false,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });

      var mailOptions = {
        from: process.env.EMAIL,
        to: `${request.body.email}`,
        subject: "User verification",
        text: `${randomnum}`,
        //html: `<h2>Password : ${req.body.Password}</h2>`
      };

      await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          response.json({
            message: "Error",
          });
        } else {
          console.log("Email sent: " + info.response);
          response.json({
            message: "Email sent",
          });
        }
      });
    } else {
      response.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
  }
});

//verification
router.post("/verify", async (request, response) => {
  try {
    const { email, vercode } = request.body;
    const user = await getUserByUsername(email);

    if (user.rnm === vercode) {
      response.status(200).json(user);
    } else {
      response.status(400).json({ message: "Invalid Verification Code" });
    }
  } catch (error) {
    console.log(error);
  }
});

//changepassword

router.post("/changepassword/:email", async function (request, response) {
  try {
    let { password1 } = request.body;
    const { email } = request.params;
    const hashedPassword = await generateHashedPassword(password1);
    password1 = hashedPassword;
    delete request.body.password2;

    const result = await updateUserByemail({ email, password1 });
    if (result) {
      response.json({ message: "Reset the password successfully" });
    } else {
      response.json({ message: "Something went wrong" });
    }
  } catch (error) {
    console.log(error);
  }
});

//list users

router.get("/allusers", async (req, res) => {
  try {
    const users = await getallusers();
    console.log(users);

    res.status(200).send({ newuser: users });
  } catch (error) {
    console.log(error);
    res.send({ message: "something went wrong" });
  }
});

export default router;
