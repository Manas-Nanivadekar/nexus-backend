const express = require("express");
const sld = require("./routes/sld/setRouter");

const app = express();

const port = process.env.PORT || 3000;

function main() {
  app.use(express.json());

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

  app.use(sld);
}

main();
