const connect = require("../connection");
const { Keyring } = require("@polkadot/keyring");

// Constuct the keyring after the API (crypto has an async init)
const keyring = new Keyring({ type: "sr25519" });

// Add Alice to our keyring with a hard-deived path (empty phrase, so uses dev)
const alice = keyring.addFromUri("//Alice");

const confirmPayee = async (
  destination_country_id,
  destination_bank_identifier,
  destination_bank_account_number
) => {
  const api = await connect();

  const payee = api.tx.nexusApiPayee.confirmationOfPayee(
    destination_country_id,
    destination_bank_identifier,
    destination_bank_account_number
  );

  const hash = await payee.signAndSend(alice);

  return hash;
};

module.exports = { confirmPayee };
