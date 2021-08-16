const express = require("express");
const connect = require("../../db/connection");
const { confirmPayee } = require("../../db/payee/confirmPayee");

const router = express.Router();

const name = "nexusApiPayee";

const method = "PaymentConfirm";

router.post("/v1/confirmto", async (req, res) => {
  let foo = [];

  const api = await connect();

  const data = req.body;

  const hash = await confirmPayee(
    data.destination_country_id,
    data.destination_bank_identifier,
    data.destination_bank_account_number
  );

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
