const express = require("express");
const app = express();

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
