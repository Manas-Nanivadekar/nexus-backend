const express = require("express");
const connect = require("../../db/connection");
const { Keyring } = require("@polkadot/keyring");

const { uuidGenerator } = require("../../../utils/uuidGenerator");

const router = express.Router();

const { bankDestData } = require("../../db/finalPayment/destBank");

const messageId = "message-" + uuidGenerator();
const paymentId = "payment-" + uuidGenerator();
const time = new Date().toISOString();

router.post("/v1/finaldest", async (req, res) => {
  const foo = [];

  const api = await connect();

  const data = req.body;

  const dest_transfer = await bankDestData(
    data.paymentId,
    data.dest_bank_id,
    data.dest_bank_acc_number,
    data.dest_bank_acc_name,
    data.dest_bank_acc_add,
    data.dest_bank_acc_dob,
    data.dest_bank_acc_dop,
    data.dest_bank_acc_national_id
  );

  res.status(200).json({
    destHash: dest_transfer,
    paymentId: data.paymentId,
    message: "Payment message has been uploaded to blockchain/Nexus",
  });
});

module.exports = router;
