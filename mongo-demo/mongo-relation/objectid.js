// _id:5a724953ab83547957541e6a
//12bytes
    //4 bytes: timestamp
    //3 bytes: machine identifier
    //2 bytes: process identifier
    //3 bytes: counter

const mongoose = require("mongoose");
const id = new mongoose.Types.ObjectId();
console.log(id);
console.log(id.getTimestamp());
const isValid = mongoose.Types.ObjectId.isValid("123");
console.log(isValid);