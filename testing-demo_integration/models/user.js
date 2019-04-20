const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require('joi');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    unique:true
  },
  password: {/// we can use joi-password-complexity
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign(/*payload*/{_id:this._id,isAdmin:this.isAdmin},/*privateKey Every thing you want*/config.get("jwtPrivateKey"));
  return token;
}
const User = mongoose.model('User', userSchema);

function validateUser(User) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().email().min(5).max(50).required(),
        password: Joi.string().min(5).max(50).required().strip()
    };

    return Joi.validate(User, schema);
}
  
exports.User = User; 
exports.validate = validateUser;