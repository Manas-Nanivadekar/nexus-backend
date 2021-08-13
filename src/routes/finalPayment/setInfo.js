const express = require("express");
const connect = require("../../db/connection");
const { Keyring } = require("@polkadot/keyring");

const { uuidGenerator } = require("../../../utils/uuidGenerator");

const router = express.Router();

const { bankDestData } = require("../../db/finalPayment/destBank");
const { bankSourceData } = require("../../db/finalPayment/sourceBank");
const { finalInfo } = require("../../db/finalPayment/finalInfo");

const messageId = "message-" + uuidGenerator();
const paymentId = "payment-" + uuidGenerator();
const time = new Date().toISOString();

router.post("/v1/final", async (req, res) => {
  const foo = [];

  const api = await connect();

  const data = req.body;

  const source_transfer = await bankSourceData(
    paymentId,
    data.source_bank_id,
    data.source_bank_acc_number,
    data.source_bank_acc_name,
    data.source_bank_acc_add,
    data.source_bank_acc_dob,
    data.source_bank_acc_dop,
    data.source_bank_acc_national_id
  );

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

  const dest_transfer = await bankDestData(
    paymentId,
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
    sourceHash: source_transfer,
    finalHash: final_transfer,
    message: "Success",
  });
});

module.exports = router;
