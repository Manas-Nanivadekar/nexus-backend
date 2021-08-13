const express = require("express");
const setSld = require("./routes/sld/setRouter");
const getSld = require("./routes/sld/getSld");
const setQuote = require("./routes/quote/setRouter");
const getQuote = require("./routes/quote/getQuoteRouter");
const removeQuote = require("./routes/quote/deleteRouter");
const confirmdest = require("./routes/payee/confirmFrom");
const confirmpayee = require("./routes/payee/confirmationTo");
const finalPayment = require("./routes/finalPayment/setInfo");
const logger = require("morgan");

const app = express();

const port = process.env.PORT || 5000;

function main() {
  app.use(express.json());
  app.use(logger("dev"));

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH"
      );
      return res.status(200).json({});
    }
    next();
  });

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

  app.use((res, req, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
  });

  app.use((req, res, next, error) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message,
      },
    });
  });
}

main();
