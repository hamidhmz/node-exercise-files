const winston = require("winston");
// require("winston-mongodb");
require("express-async-errors");

module.exports = function(){
    process.on("uncaughtException",(ex)=>{//this just work for sync code 
        winston.error(ex.message,ex); 
        // this is best practice 
        process.exit(1);
    })
    
    // winston.ExceptionHandler(new winston.transports.File({filename:"uncaughtException.log"}));
    
    process.on("unhandledRejection",(ex)=>{//this just work for async code 
        winston.error(ex.message,ex); 
        // this is best practice 
        process.exit(1);
    })
    // winston.add(new winston.transports.File({filename:"logFile.log"}));
    // winston.add(new winston.transports.Console(),message);
    // winston.add(new winston.transports.MongoDB({db:"mongodb://localhost/vidly"}));
    // if we want to store just error not additional information in other level such as info warn ...
    // winston.add(new winston.transports.MongoDB({
    //     db:"mongodb://localhost/vidly",
    //     level:"error"
    // }));
}