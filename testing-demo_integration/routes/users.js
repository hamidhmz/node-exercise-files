const jwt =require("jsonwebtoken");
const auth = require("../middleware/auth");
const config = require("config");
const bcrypt = require("bcrypt-nodejs");
const _= require("lodash");
const {User, validate} = require('../models/user'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get("/me",auth,async(req,res)=>{
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
})
//register
router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email:req.body.email});
    if(user) return res.status(400).send("User already registered.");

    // user = new User({ 
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // });
    user = new User(_.pick(req.body,["name","email","password"]));


    // const salt = await bcrypt.genSalt(10);
    // user.password = await bcrypt.hash(user.password, salt);
    bcrypt.genSalt(10, async function (err, salt){
        bcrypt.hash(req.body.password,salt,null,function(err,hash){
            user.password = hash;
        });
    });
    await user.save();
    // const token = jwt.sign(/*payload*/{_id:user._id},/*privateKey Every thing you want*/config.get("jwtPrivateKey"));
    const token = user.generateAuthToken();
    res.header("x-auth-token",token).send(_.pick(user,["name","email"]));
    
    // res.send(user);
});

module.exports = router; 