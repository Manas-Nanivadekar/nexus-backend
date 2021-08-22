const express = require("express");
const connect = require("../../db/connection");
const { Keyring } = require("@polkadot/keyring");

const router = express.Router();

const name = "nexusApiFinal";

const method = "FinalData";

router.get("/v1/final", async (req, res) => {
  const foo = [];

  const payment_id = req.body.payment_id;

  const api = await connect();

  const keyring = new Keyring({ types: "sr25519" });

  const alice = keyring.addFromUri("//Alice");

  const transfer = api.tx.nexusApiFinal.getFinalPayment(payment_id);

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
            event: foo[0],
          });
        }
      });
    }
  });
});

module.exports = router;
