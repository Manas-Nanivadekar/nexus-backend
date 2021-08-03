const connect = require("../connection");

// Constuct the keyring after the API (crypto has an async init)
const keyring = new Keyring({ type: "sr25519" });

// Add Alice to our keyring with a hard-deived path (empty phrase, so uses dev)
const alice = keyring.addFromUri("//Alice");

const deleteRate = async (uuid) => {
  const api = await connect();

  const rate = api.tx.nexusApiQuote.deleteRate(uuid);

  const hash = await rate.signAndSend(alice);

  return hash;
};

module.exports = { deleteRate };
