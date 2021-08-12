const connect = require("../connection");
const { Keyring } = require("@polkadot/keyring");

const bankSourceData = async (
  payment_id,
  source_bank_id,
  source_bank_acc_number,
  source_bank_acc_name,
  source_bank_acc_add,
  source_bank_acc_dob,
  source_bank_acc_dop,
  source_bank_acc_national_id
) => {
  const api = await connect();

  // Constuct the keyring after the API (crypto has an async init)
  const keyring = new Keyring({ type: "sr25519" });

  // Add Alice to our keyring with a hard-deived path (empty phrase, so uses dev)
  const alice = keyring.addFromUri("//Alice");

  const payee = api.tx.nexusApiFinal.setSourceBankData(
    payment_id,
    source_bank_id,
    source_bank_acc_number,
    source_bank_acc_name,
    source_bank_acc_add,
    source_bank_acc_dob,
    source_bank_acc_dop,
    source_bank_acc_national_id
  );

  const hash = await payee.signAndSend(alice);

  return hash;
};

module.exports = { bankSourceData };
