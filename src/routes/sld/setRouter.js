const express = require("express");
const { setInfo } = require("../../db/sld/setInfo");

const router = express.Router();

router.post("/v1/sld", async (req, res) => {
  const data = req.body;

  const hash = await setInfo(
    data.iban,
    data.country_id,
    data.local_bank_number,
    data.local_bank_id,
    data.alias_conversion,
    data.alias_name,
    data.alias_format,
    data.alias_desc,
    data.max_destination_value,
    data.account_validation_available,
    data.payee_type,
    data.ips_timeout
  );

  res.status(200).json({
    sucess: true,
    hash: hash,
    message: "IPS has given data to the blockchain or Local Nexus Gateway",
  });
});

module.exports = router;
