const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const PORT = 8000 || process.env.PORT;

app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure response headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// mongoose setup
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/full-stack", (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("connected to database");
  }
});

// request routes
app.get("/", function (req, res) {
  res.json("This is the initial route for our project");
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/file", require("./routes/file"));

// our server
app.listen(PORT, () => {
  console.log(`connected at port ${PORT}`);
});
