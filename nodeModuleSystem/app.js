function sayHello(name){
    console.log("hello " + name);
}

sayHello("hamid");

var logger = require("./logger");
logger.logFromLogger("this is from logger");
// logger("this is from logger")