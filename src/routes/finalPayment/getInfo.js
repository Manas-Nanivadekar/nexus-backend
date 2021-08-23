const express = require("express");
const connect = require("../../db/connection");
const { Keyring } = require("@polkadot/keyring");

const { uuidGenerator } = require("../../../utils/uuidGenerator");

const router = express.Router();

const name = "nexusApiFinal";

const method = "FinalData";

router.get("/v1/final", async (req, res) => {
  const foo = [];

  const api = await connect();

  const keyring = new Keyring({ type: "sr25519" });

  const alice = keyring.addFromUri("//Alice");

  const payment_id = req.query.payment_id;

  const payment = await api.tx.nexusApiFinal.getFinalPayment(payment_id);

  const hash = await payment.signAndSend(alice);

  await api.query.system.events((events) => {
    if (foo.length === 0) {
      events.forEach((record) => {
        const { event } = record;
        const types = event.typeDef;
        const eventName = event.section;
        const eventMethod = event.method;
        const eventData = event.data;

        if (eventName === name || eventMethod === method) {
          foo.push(event.data.toHuman());
          res.status(200).json({
            hash: hash,
            event: foo[0],
          });
        }
      });
    }
  });
});

module.exports = router;
