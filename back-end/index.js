const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const PORT = 8000 || process.env.PORT;

app.use(cookieParser());
app.use(express.json());

// CORS setup
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
// app.use(express.urlencoded({ extended: true }));

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
