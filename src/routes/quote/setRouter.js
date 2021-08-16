const express = require("express");
const { provideRate } = require("../../db/quote/setQuote");

const { uuidGenerator } = require("../../../utils/uuidGenerator");

const router = express.Router();

router.post("/v1/quote", async (req, res) => {
  const source_currency = req.query.source_currency;

  const destination_currency = req.query.destination_currency;

  const data = req.body;

  const quote_uuid = "quote-" + uuidGenerator();

  const fxp_uuid = "fxp-" + uuidGenerator();

  const hash = await provideRate(
    source_currency,
    destination_currency,
    quote_uuid,
    fxp_uuid,
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
    source_currency: source_currency,
    destination_currency: destination_currency,
    quote_uuid: quote_uuid,
    fxp_uuid: fxp_uuid,
    message: "FXP has provided rates to the blockchain or Local Nexus Gateway",
  });
});

module.exports = router;
