const express = require("express");
const router = express.Router();

router.post("/process", (req, res) => {
  console.log(">>>", req.body);
  res.status(200).send({ message: "testing" });
});

module.exports = router;
