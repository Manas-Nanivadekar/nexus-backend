// const connect = require("../connection");
// const { Keyring } = require("@polkadot/keyring");

// const getRate = async (source_currency, dest_currency, quote_uuid) => {
//   const api = await connect();
//   // Constuct the keyring after the API (crypto has an async init)
//   const keyring = new Keyring({ type: "sr25519" });

//   // Add Alice to our keyring with a hard-deived path (empty phrase, so uses dev)
//   const alice = keyring.addFromUri("//Alice");

//   const rate = api.tx.nexusApiQuote.getRate(
//     source_currency,
//     dest_currency,
//     quote_uuid
//   );

//   const info = await api.query.system.events((events) => {
//     events.forEach((record) => {
//       const { event, phase } = record;
//       const types = event.typeDef;

//       const eventName = event.section;
//       const eventMethod = event.method;

//       const eventData = event.data;

//       if (eventMethod === "RatesRequested") {
//         return event.data;
//       }
//     });
//   });

//   const hash = await rate.signAndSend(alice);

//   return hash;
// };

// module.exports = { getRate };
