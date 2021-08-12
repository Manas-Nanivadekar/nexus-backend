const connect = require("../connection");
const { Keyring } = require("@polkadot/keyring");

const setStatusFunc = async (status, reason_for_status) => {
  const api = await connect();

  // Constuct the keyring after the API (crypto has an async init)
  const keyring = new Keyring({ type: "sr25519" });

  // Add Alice to our keyring with a hard-deived path (empty phrase, so uses dev)
  const alice = keyring.addFromUri("//Alice");

  const transfer = api.tx.nexusApiFinal.setStatus(status, reason_for_status);

  const hash = await transfer.signAndSend(alice);

  return hash;
};

module.exports = { setStatusFunc };
