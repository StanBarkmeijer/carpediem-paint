const config = require("./config/config");
const app = require("./config/express");

require("./config/mongoose");

if (!module.parent) {
  app.listen(8081, () => {
    console.info(`Server started on port ${config.port} (${config.env})`)
  });
}

module.exports = app;