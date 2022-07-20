import * as dotenv from "dotenv";

dotenv.config();

import express from "express";
import loggerHelper from "./helpers/logger.helper";
import routes from "./routes/routes";
import config from "./config";

const app = express();

app.use(routes);

app.listen(config.port, () => {
  loggerHelper.info(`Example app listening on port ${config.port}`);
});

export default app;
