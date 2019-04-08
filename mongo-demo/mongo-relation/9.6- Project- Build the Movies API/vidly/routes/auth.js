const bcrypt = require("bcrypt-nodejs");
const _= require("lodash");
const {User} = require('../models/user'); 
const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const router = express.Router();


router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send("Invalid Email or Password.");
    
    // bcrypt.compare(req.body.password,user.password,async function (err, validPassword){
    bcrypt.compare(req.body.password,user.password,async function (err, validPassword){
        console.log(validPassword)
        console.log(err);
        if(!validPassword) return res.status(400).send("Invalid Email or Password.");
        // const token = jwt.sign(/*payload*/{_id:user._id},/*privateKey Every thing you want*/"jwtPrivateKey");
        const token = user.generateAuthToken();
        // const token = jwt.sign(/*payload*/{_id:user._id},/*privateKey Every thing you want*/config.get("jwtPrivateKey"));
        // res.send(token);
        res.header("x-auth-token",token).send(_.pick(user,["name","email"]));

    });    
});
function validate(User) {
    const schema = {
        email: Joi.string().email().min(5).max(50).required(),
        password: Joi.string().min(5).max(50).required().strip()
    };

    return Joi.validate(User, schema);
}
module.exports = router; 