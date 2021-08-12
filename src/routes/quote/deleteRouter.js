const express = require("express");
const { deleteRate } = require("../../db/quote/deleteQuote");

const router = express.Router();

router.delete("/v1/quote", async (req, res) => {
  const source_currency = req.query.source_currency;

  const dest_currency = req.query.dest_currency;

  const data = req.body;

  const hash = await deleteRate(source_currency, dest_currency, data.uuid);

  res.status(200).json({
    sucess: true,
    hash: hash,
    message: "FXP has deleted rates from the blockchain or Local Nexus Gateway",
  });
});

module.exports = router;
