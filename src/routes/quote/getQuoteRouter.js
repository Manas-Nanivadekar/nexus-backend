const express = require("express");
const connect = require("../../db/connection");
const { Keyring } = require("@polkadot/keyring");

const { uuidGenerator } = require("../../../utils/uuidGenerator");

const router = express.Router();

const name = "nexusApiSld";

const method = "RatesRequested";

router.get("/v1/quote", async (req, res) => {
  let foo = [];
  const api = await connect();

  const keyring = new Keyring({ type: "sr25519" });

  const quoteId = req.param.quote_id;

  // Add Alice to our keyring with a hard-deived path (empty phrase, so uses dev)
  const alice = keyring.addFromUri("//Alice");

  const source_currency = req.query.source_currency;

  const destination_currency = req.query.destination_currency;

  const data = req.body;

  const transfer = api.tx.nexusApiQuote.getRate(
    source_currency,
    destination_currency,
    data.quote_id
  );
  // Sign and send the transaction using our account
  const hash = await transfer.signAndSend(alice);

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
