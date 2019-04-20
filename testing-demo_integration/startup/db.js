const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logFile.log' })
    ]
});
module.exports = function(mongoose){
    const db = config.get("db")
    mongoose.connect(db)
        .then(() => logger.info(`Connected to ${db}...`));
}
