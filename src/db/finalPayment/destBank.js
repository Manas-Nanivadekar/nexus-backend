const connect = require("../connection");
const { Keyring } = require("@polkadot/keyring");

const bankDestData = async (
  payment_id,
  dest_bank_id,
  dest_bank_acc_number,
  dest_bank_acc_name,
  dest_bank_acc_add,
  dest_bank_acc_dob,
  dest_bank_acc_dop,
  dest_bank_acc_national_id
) => {
  const api = await connect();

  // Constuct the keyring after the API (crypto has an async init)
  const keyring = new Keyring({ type: "sr25519" });

  // Add Alice to our keyring with a hard-deived path (empty phrase, so uses dev)
  const alice = keyring.addFromUri("//Alice");

  const payee = api.tx.nexusApiFinal.setDestBankData(
    payment_id,
    dest_bank_id,
    dest_bank_acc_number,
    dest_bank_acc_name,
    dest_bank_acc_add,
    dest_bank_acc_dob,
    dest_bank_acc_dop,
    dest_bank_acc_national_id
  );

  const hash = await payee.signAndSend(alice);

  return hash;
};

module.exports = { bankDestData };
