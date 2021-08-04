const { ApiPromise, WsProvider } = require("@polkadot/api");

// Initialise the provider to connect to the local node
const provider = new WsProvider("ws://127.0.0.1:9944");

async function connect() {
  const api = await ApiPromise.create(provider);

  return api;
}

module.exports = connect;
