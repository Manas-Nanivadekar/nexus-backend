const { v4: uuid4 } = require("uuid");

const uuidGenerator = () => {
  const uuid = uuid4();

  return uuid;
};

module.exports = { uuidGenerator };
