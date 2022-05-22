const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

router.post("/process", (req, res) => {
  const fileName = req.headers["file-name"];
  const chunkId = req.headers["chunk-id"];
  req.on("data", (chunk) => {
    fs.appendFileSync(fileName, chunk);
  });
  res.status(200).send({ message: "uploaded" });
});

module.exports = router;
