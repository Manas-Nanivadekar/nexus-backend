const express = require("express");
const connect = require("../../db/connection");
const { Keyring } = require("@polkadot/keyring");

const { uuidGenerator } = require("../../../utils/uuidGenerator");

const router = express.Router();

const { finalInfo } = require("../../db/finalPayment/finalInfo");

const messageId = "message-" + uuidGenerator();
const paymentId = "payment-" + uuidGenerator();
const time = new Date().toISOString();

router.post("/v1/final", async (req, res) => {
  const foo = [];

  const api = await connect();

  const data = req.body;

  const final_transfer = await finalInfo(
    messageId,
    time,
    data.settlement_amount,
    paymentId,
    data.clearing_system_ref,
    data.charge_bearer,
    data.quote_uuid,
    data.ip_source
  );

  res.status(200).json({
    finalHash: final_transfer,
    paymentId: paymentId,
    message: "Payment message has been uploaded to blockchain/Nexus",
  });
});

module.exports = router;
