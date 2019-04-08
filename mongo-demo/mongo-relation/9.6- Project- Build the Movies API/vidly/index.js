const {createLogger,format,transports } = require("winston");
const { combine, timestamp, label, prettyPrint } = format;
const mongoose = require('mongoose');
const express = require('express');
const logger = createLogger({
  format: combine(
    timestamp(),
    prettyPrint()
  ),
  transports: [
      new transports.Console(),
      new transports.File({ filename: 'logFile.log' })
  ]
});
const app = express();
require("./startup/logging");
require("./startup/routes")(app);
require("./startup/db")(mongoose);
require("./startup/config")();
require("./startup/validation")();
// for log of beyond from express you we must do this



const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`Listening on port ${port}...`));
logger.info('hello', { message: 'world' });