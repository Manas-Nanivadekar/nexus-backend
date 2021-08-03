const connect = require("../connection");

// Constuct the keyring after the API (crypto has an async init)
const keyring = new Keyring({ type: "sr25519" });

// Add Alice to our keyring with a hard-deived path (empty phrase, so uses dev)
const alice = keyring.addFromUri("//Alice");

const setInfo = async (
  iban,
  country_id,
  local_bank_number,
  local_bank_id,
  alias_conversion,
  alias_name,
  alias_format,
  alias_desc,
  max_destination_value,
  payee_type,
  ips_timeout
) => {
  const api = await connect();

  const setInfo = api.tx.nexusApiSld.setInfo(
    iban,
    country_id,
    local_bank_number,
    local_bank_id,
    alias_conversion,
    alias_name,
    alias_format,
    alias_desc,
    max_destination_value,
    payee_type,
    ips_timeout
  );

  const hash = await setInfo.signAndSend(alice);

  return hash;
};

module.exports = { setInfo };
