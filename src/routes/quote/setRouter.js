const express = require("express");
const { provideRate } = require("../../db/quote/setQuote");

const router = express.Router();

router.post("/v1/quote", async (req, res) => {
  const data = req.body;

  const hash = await provideRate(
    data.uuid,
    data.source_lp,
    data.destination_lp,
    data.rate,
    data.public,
    data.timestamp,
    data.source_bank_id
  );

  res.status(200).json({
    sucess: true,
    hash: hash,
    message: "FXP has provided rates to the blockchain or Local Nexus Gateway",
  });
});

module.exports = router;
