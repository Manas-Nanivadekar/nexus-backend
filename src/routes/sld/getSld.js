const express = require("express");
const connect = require("../../db/connection");
const { Keyring } = require("@polkadot/keyring");

const { uuidGenerator } = require("../../../utils/uuidGenerator");

const router = express.Router();

const name = "nexusApiSld";

const method = "OutputSet";

router.get("/v1/sld", async (req, res) => {
  const foo = [];

  const api = await connect();

  const keyring = new Keyring({ type: "sr25519" });

  // Add Alice to our keyring with a hard-deived path (empty phrase, so uses dev)
  const alice = keyring.addFromUri("//Alice");

  const country_id = req.query.country_id;

  const transfer = api.tx.nexusApiSld.getInfo(country_id);

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
