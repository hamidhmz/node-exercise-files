const EventEmitter = require('events');
const emitter = new EventEmitter();

// Register a listener
// emitter.on('messageLogged',function(arg){
emitter.on('messageLogged',(arg) => {
    console.log("listener Called",arg);
})

// Raise an event
// emitter.emit("messageLogged")
// emitter.emit("messageLogged",1,"hamid");




emitter.emit("messageLogged",{id:1,name:"hamid"});
const Logger = require("./loggerForEvent");
const logger = new Logger();


logger.on("messageLogged",(arg)=>{
    console.log("Listener from class called",arg);
})


logger.log("message");