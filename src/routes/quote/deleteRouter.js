const express = require("express");
const { deleteRate } = require("../../db/quote/deleteQuote");

const router = express.Router();

router.delete("/v1/removequote", async (req, res) => {
  const data = req.body;

  const hash = await deleteRate(data.uuid);

  res.status(200).json({
    sucess: true,
    hash: hash,
    message: "FXP has deleted rates from the blockchain or Local Nexus Gateway",
  });
});

module.exports = router;
