const connect = require("../connection");
const { Keyring } = require("@polkadot/keyring");

const confirmProcess = async (acc_name, display_name) => {
  const api = await connect();

  // Constuct the keyring after the API (crypto has an async init)
  const keyring = new Keyring({ type: "sr25519" });

  // Add Alice to our keyring with a hard-deived path (empty phrase, so uses dev)
  const alice = keyring.addFromUri("//Alice");

  const confirm = api.tx.nexusApiPayee.confirmSubprocess(
    acc_name,
    display_name
  );

  const hash = await confirm.signAndSend(alice);

  return hash;
};

module.exports = { confirmProcess };
