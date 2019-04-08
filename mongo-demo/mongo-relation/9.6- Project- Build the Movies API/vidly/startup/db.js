const winston = require("winston");
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logFile.log' })
    ]
});
module.exports = function(mongoose){
    mongoose.connect('mongodb://localhost/vidly')
        .then(() => logger.info('Connected to MongoDB...'));
}
