const express = require("express");
const router = express.Router();

const User = require("../models/User");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require("jsonwebtoken");
const privateKey = "*&ghgds_12WWe&TgFt@1gguDCXXzwE:kjikohi";

// create a new user
router.post("/sign-up", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user) {
      res.status(200).send({ message: "username exists" });
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          throw err;
        } else {
          const password = hash;
          const newUser = await User.create({ username, password });

          const payload = {
            username: newUser.username,
            id: newUser.id,
          };

          jwt.sign(
            payload,
            privateKey,
            { algorithm: "HS256" },
            function (err, token) {
              if (err) {
                throw err;
              }
              // send the cookie
              res.cookie("jwt", token, {
                maxAge: 1000 * 60 * 60 * 24 * 2,
                httpOnly: true,
                secure: true,
              });
              res
                .status(201)
                .send({ username: newUser.username, message: "user created" });
            }
          );
        }
      });
    }
  } catch (error) {
    console.log(">>>", error.message);
    res.status(500).send({ message: "Internal server error" });
  }
});

// get user details
router.get("/get-user", async (req, res) => {
  try {
    // get all the cookies
    const cookies = req.cookies;
    const token = cookies.jwt;

    // verify the token
    jwt.verify(token, privateKey, async function (err, decoded) {
      const userId = decoded?.id;

      const user = await User.findById(userId, { password: false });
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(401).send({ message: "authentication error" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "authentication error" });
  }
});

// login user
router.post("/log-in", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user) {
      const hash = user.password;
      bcrypt.compare(password, hash, function (err, result) {
        if (result) {
          const payload = {
            username: user.username,
            id: user.id,
          };

          jwt.sign(
            payload,
            privateKey,
            { algorithm: "HS256" },
            function (err, token) {
              if (err) {
                throw err;
              }
              // send the cookie
              res.cookie("jwt", token, {
                maxAge: 1000 * 60 * 60 * 24 * 2,
                httpOnly: true,
                secure: true,
              });
              res.send({ username: user.username, message: "user logged in" });
            }
          );
        } else {
          res.status(401).send({ message: "invalid credentials" });
        }
      });
    } else {
      res.status(401).send({ message: "user does not exist" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

router.get("/log-out", (req, res) => {
  try {
    // delete the cookie
    res.cookie("jwt", "", { expires: new Date(0) });
    res.send({ message: "user logged out" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
