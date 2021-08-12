const connect = require("../connection");
const { Keyring } = require("@polkadot/keyring");

const finalInfo = async (
  message_id,
  creation_time,
  settlement_amount,
  payment_uuid,
  clearing_system_ref,
  charge_bearer,
  quote_uuid,
  ip_source
) => {
  const api = await connect();

  // Constuct the keyring after the API (crypto has an async init)
  const keyring = new Keyring({ type: "sr25519" });

  // Add Alice to our keyring with a hard-deived path (empty phrase, so uses dev)
  const alice = keyring.addFromUri("//Alice");

  const transfer = api.tx.nexusApiFinal.finalPaymentFunc(
    message_id,
    creation_time,
    settlement_amount,
    payment_uuid,
    clearing_system_ref,
    charge_bearer,
    quote_uuid,
    ip_source
  );

  const hash = await transfer.signAndSend(alice);

  return hash;
};

module.exports = { finalInfo };
