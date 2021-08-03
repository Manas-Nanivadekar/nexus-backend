const connect = require("../connection");
const { Keyring } = require("@polkadot/keyring");

// Constuct the keyring after the API (crypto has an async init)
const keyring = new Keyring({ type: "sr25519" });

// Add Alice to our keyring with a hard-deived path (empty phrase, so uses dev)
const alice = keyring.addFromUri("//Alice");

const provideRate = async (
  uuid,
  source_lp,
  destination_lp,
  rate,
  public,
  timestamp,
  source_bank_id
) => {
  const api = await connect();

  const rate = api.tx.nexusApiQuote.provideRate(
    uuid,
    source_lp,
    destination_lp,
    rate,
    public,
    timestamp,
    source_bank_id
  );

  const hash = await rate.signAndSend(alice);

  return hash;
};

module.exports = { provideRate };
