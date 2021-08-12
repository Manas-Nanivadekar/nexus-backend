const connect = require("../connection");
const { Keyring } = require("@polkadot/keyring");

const deleteRate = async (source_currency, dest_currency, uuid) => {
  const api = await connect();
  // Constuct the keyring after the API (crypto has an async init)
  const keyring = new Keyring({ type: "sr25519" });

  // Add Alice to our keyring with a hard-deived path (empty phrase, so uses dev)
  const alice = keyring.addFromUri("//Alice");

  const rate = api.tx.nexusApiQuote.deleteRate(
    source_currency,
    dest_currency,
    uuid
  );

  const hash = await rate.signAndSend(alice);

  return hash;
};

module.exports = { deleteRate };
