const app = require("./app");
const config = include("common/config/");

// Ensure log is defined
const log = console;

let port = config.server.port;
const environment = config.env;
app.listen(port, () => {
      log.info(
        `Server is ready at ${config.server.host}\:${port}, ${environment} environment`
      );
});;