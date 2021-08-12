const express = require("express");
const setSld = require("./routes/sld/setRouter");
const getSld = require("./routes/sld/getSld");
const setQuote = require("./routes/quote/setRouter");
const getQuote = require("./routes/quote/getQuoteRouter");
const removeQuote = require("./routes/quote/deleteRouter");
const confirmdest = require("./routes/payee/confirmFrom");
const confirmpayee = require("./routes/payee/confirmationTo");
const finalPayment = require("./routes/finalPayment/setInfo");

const app = express();

const port = process.env.PORT || 5000;

function main() {
  app.use(express.json());

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

  app.use(setSld);
  app.use(getSld);
  app.use(finalPayment);
  app.use(getQuote);
  app.use(setQuote);
  app.use(removeQuote);
  app.use(confirmdest);
  app.use(confirmpayee);
}

main();
