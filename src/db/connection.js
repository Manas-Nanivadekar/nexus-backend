const { ApiPromise, WsProvider } = require("@polkadot/api");

const socket = process.env.SOCKET || "ws://127.0.0.1:9944";

// Initialise the provider to connect to the local node
const provider = new WsProvider(socket);

async function connect() {
  const api = await ApiPromise.create(provider);

  return api;
}

module.exports = connect;
