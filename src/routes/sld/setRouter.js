const express = require("express");
const { setInfo } = require("../../db/sld/setInfo");

const router = express.Router();

router.get("/v1/sld", async (req, res) => {
  const message = await setInfo();

  // const message = "hello world";

  res.status(200).json(message);
});

module.exports = router;
