const express = require("express");
const { confirmPayee } = require("../../db/payee/confirmPayee");

const router = express.Router();

router.post("/v1/confirmto", async (req, res) => {
  const data = req.body;

  const hash = await confirmPayee(
    data.destination_country_id,
    data.destination_bank_identifier,
    data.destination_bank_account_number
  );

  res.status(200).json({
    sucess: true,
    hash: hash,
    message: "Payment confirmed the dest gateway",
  });
});

module.exports = router;
