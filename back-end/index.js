const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());

// configure response headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/full-stack", (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("connected to database");
  }
});

const PORT = 8000 || process.env.PORT;

app.use(express.json());

app.get("/", function (req, res) {
  res.json("This is the initial route for our project");
});

app.use("/api/auth", require("./routes/auth"));

app.listen(PORT, () => {
  console.log(`connected at port ${PORT}`);
});
