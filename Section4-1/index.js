const app = require("./app");
const { PORT } = require("config");
const { info } = require("./utils/logger");

app.listen(PORT, () => {
  info(`listening on port ${PORT}`);
});
