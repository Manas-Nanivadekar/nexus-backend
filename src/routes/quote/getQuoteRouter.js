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

  // Add Alice to our keyring with a hard-deived path (empty phrase, so uses dev)
  const alice = keyring.addFromUri("//Alice");

  const source_currency = req.query.source_currency;

  const destination_currency = req.query.destination_currency;

  const uuid = req.query.uuid;

  /// NOTE: UUID is a hard-coded value, but it WILL be passed in as a query parameter
  const transfer = api.tx.nexusApiQuote.getRate(
    source_currency,
    destination_currency,
    "1"
  );
  // Sign and send the transaction using our account
  const hash = await transfer.signAndSend(alice);

  await api.query.system.events((events) => {
    // console.log("check");
    // console.log(foo);
    if (foo.length === 0) {
      events.forEach((record) => {
        const { event } = record;
        const types = event.typeDef;
        const eventName = event.section;
        const eventMethod = event.method;
        const eventData = event.data;

        if (eventName === name || eventMethod === method) {
          foo.push(event.data.toString());
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
