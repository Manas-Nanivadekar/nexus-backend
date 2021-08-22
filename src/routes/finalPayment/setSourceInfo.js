const express = require("express");
const connect = require("../../db/connection");
const { Keyring } = require("@polkadot/keyring");

const { uuidGenerator } = require("../../../utils/uuidGenerator");

const router = express.Router();

const { bankSourceData } = require("../../db/finalPayment/sourceBank");

router.post("/v1/finalsource", async (req, res) => {
  const foo = [];

  const api = await connect();

  const data = req.body;

  const source_transfer = await bankSourceData(
    data.paymentId,
    data.source_bank_id,
    data.source_bank_acc_number,
    data.source_bank_acc_name,
    data.source_bank_acc_add,
    data.source_bank_acc_dob,
    data.source_bank_acc_dop,
    data.source_bank_acc_national_id
  );

  res.status(200).json({
    sourceHash: source_transfer,
    paymentId: data.paymentId,
    message: "Payment message has been uploaded to blockchain/Nexus",
  });
});

module.exports = router;
