const os = require('os');
var freeMemory = os.freemem();
var totalMemory = os.totalmem();
console.log("Free memory: " + freeMemory);
console.log(`Total memory: ${totalMemory}`); 
console.log(os.hostname());
console.log(os.platform());
console.log(os.type());