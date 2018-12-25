const EventEmitter = require("events");
class Logger extends EventEmitter{
    log(message){//in class we don't need function key word
        console.log(message);
        this.emit("messageLogged",{id:1,url:"http://"});//alternative emitter.emit...
    }
}
module.exports = Logger