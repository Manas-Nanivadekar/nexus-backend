const express = require("express");
const sld = require("./routes/sld/setRouter");
const quote = require("./routes/quote/setRouter");
const removequote = require("./routes/quote/deleteRouter");
const confirmdest = require("./routes/payee/confirmFrom");
const confirmpayee = require("./routes/payee/confirmationTo");

const app = express();

const port = process.env.PORT || 5000;

function main() {
  app.use(express.json());

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

  app.use(sld);
  app.use(quote);
  app.use(removequote);
  app.use(confirmdest);
  app.use(confirmpayee);
}

main();
