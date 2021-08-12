const express = require("express");
const { confirmProcess } = require("../../db/payee/confirmProcess");

const router = express.Router();

router.post("/v1/confirmfrom", async (req, res) => {
  const data = req.body;

  const hash = await confirmProcess(data.acc_name, data.display_name);

  res.status(200).json({
    sucess: true,
    hash: hash,
    message: "Confirmation received from destination gateway",
  });
});

module.exports = router;
