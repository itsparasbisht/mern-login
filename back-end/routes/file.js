const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.post("/process", (req, res) => {
  if (req.files === null) {
    return res.status(400).send({ message: "No file uploaded" });
  }

  const file = req.files.file;
  file.mv(`${path.join(__dirname, "../uploads")}/${file.name}`, (error) => {
    if (error) {
      console.log(error);
      return res.status(500).send(error);
    }

    res.send({ filename: file.name, message: "Uploaded" });
  });
});

module.exports = router;
