function log(message){
    console.log(message);
}
function time(message){
    console.log(message)
}
log("messsage from logger module");

module.exports.logFromLogger = log;
// module.exports = time;